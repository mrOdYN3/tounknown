/* toUnknown live backend glue — Supabase auth + content + gated audio + Stripe.
   Plain JS, exposed as window.TULive. Requires supabase-js UMD + window.TU_SUPABASE. */
(function () {
  const cfg = window.TU_SUPABASE;
  const client = window.supabase.createClient(cfg.url, cfg.publishableKey);
  let session = null;
  let member = null; // { tier, active_until }
  const listeners = new Set();

  function emit() { listeners.forEach((f) => f(session, member)); }

  async function refreshMember() {
    if (!session) { member = null; return; }
    try {
      const r = await fetch(cfg.url + "/rest/v1/members?select=tier,active_until&id=eq." + session.user.id, {
        headers: { apikey: cfg.publishableKey, Authorization: "Bearer " + session.access_token },
      });
      member = r.ok ? (await r.json())[0] || null : null;
    } catch (e) { member = null; }
  }

  async function setSession(s) {
    session = s || null;
    await refreshMember();
    emit();
  }

  client.auth.getSession().then(({ data }) => setSession(data.session));
  client.auth.onAuthStateChange((_e, s) => setSession(s));

  async function rest(path) {
    const r = await fetch(cfg.url + "/rest/v1/" + path, {
      headers: { apikey: cfg.publishableKey, Authorization: "Bearer " + cfg.publishableKey },
    });
    if (!r.ok) throw new Error("supabase " + r.status);
    return r.json();
  }
  function authHeaders(extra) {
    return Object.assign({
      apikey: cfg.publishableKey,
      Authorization: "Bearer " + (session ? session.access_token : cfg.publishableKey),
      "Content-Type": "application/json",
    }, extra || {});
  }

  // DB row -> the shape the UI components already expect
  function toPath(p) {
    // Thirteen rows of catalogue copy live in tu-i18n.js rather than in the database. The DB
    // keeps `lang` for courses and tracks, where the content is genuinely per-language; a Path's
    // name, tradition line and one-sentence essence are UI strings, and belong beside the rest
    // of them where a diff can review the translation. TR falls through to the DB value when a
    // key is absent, so English is untouched.
    const tr = (field, value) => (window.TR ? window.TR("path." + p.id + "." + field, value) : value);
    return {
      id: p.id, name: tr("title", p.title), tradition: tr("tradition", p.tradition || ""),
      source: tr("source", p.source || ""), essence: tr("description", p.description || ""),
      image: p.cover_url || "", kind: p.kind || "lineage",
      status: p.status, steps: [],
    };
  }

  window.TULive = {
    client,
    session: () => session,
    member: () => member,
    isMember: () => !!(member && member.active_until && new Date(member.active_until) > new Date()),
    // The tier was fetched from the first day and read by nothing, so $33 bought what $11 bought.
    tier: () => (member && member.active_until && new Date(member.active_until) > new Date())
      ? (member.tier || "student") : "seeker",
    isSadhaka: () => !!(member && member.tier === "sadhaka" &&
      member.active_until && new Date(member.active_until) > new Date()),
    onAuth(f) { listeners.add(f); f(session, member); return () => listeners.delete(f); },

    async signIn(email) {
      const { error } = await client.auth.signInWithOtp({
        email,
        options: { emailRedirectTo: window.location.origin + window.location.pathname },
      });
      if (error) throw error;
      return true;
    },
    signOut: () => client.auth.signOut(),

    // ---- content ----
    async loadPaths() {
      // Serve the reader's language when that catalogue exists; otherwise fall back to English
      // rather than showing an empty library, which is what a hard filter produced.
      const lang = window.TU_LOCALE || "en";
      let rows = await rest("paths?lang=eq." + lang +
        "&order=sort&select=id,title,tradition,source,description,cover_url,status,kind");
      if (!rows.length && lang !== "en") {
        rows = await rest("paths?lang=eq.en" +
          "&order=sort&select=id,title,tradition,source,description,cover_url,status,kind");
      }
      return rows.map(toPath);
    },
    // includes a track count per course, so the picker can show weight at a glance
    async loadPathCourses(pathId) {
      const lang = window.TU_LOCALE || "en";
      const sel = "&order=sort&select=id,title,free,is_trial,cover_url,description,tracks(count),sittings:tracks(count)&sittings.is_sitting=is.true";
      let rows = await rest("courses?path_id=eq." + encodeURIComponent(pathId) + "&lang=eq." + lang + sel);
      if (!rows.length && lang !== "en") {
        rows = await rest("courses?path_id=eq." + encodeURIComponent(pathId) + "&lang=eq.en" + sel);
      }
      return rows.map((c) => ({ ...c,
        trackCount: (c.tracks && c.tracks[0] && c.tracks[0].count) || 0,
        // guided sittings only — introductions and talks are not what the count promises
        sittingCount: (c.sittings && c.sittings[0] && c.sittings[0].count) || 0 }));
    },
    loadCourseTracks(courseId) {
      return rest("tracks?course_id=eq." + encodeURIComponent(courseId) + "&order=sort&select=id,title,sort,is_gate,seconds,is_sitting,free_preview");
    },
    async loadPathCourse(pathId) {
      const courses = await this.loadPathCourses(pathId);
      const course = courses[0];
      if (!course) return { course: null, tracks: [] };
      return { course, tracks: await this.loadCourseTracks(course.id) };
    },

    // total minutes + track count per course
    loadCourseStats() {
      return rest("course_stats?select=course_id,tracks,seconds");
    },

    // ---- progress ----
    // { pathId: {done, total, pct} } — totals are public, done needs a session
    async loadProgress() {
      const totals = await rest("path_track_counts?select=path_id,total");
      const out = {};
      totals.forEach((t) => { out[t.path_id] = { done: 0, total: t.total, pct: 0 }; });
      if (session) {
        try {
          const r = await fetch(cfg.url + "/rest/v1/unlocks?select=track_id,tracks(courses(path_id))&member_id=eq." + session.user.id,
            { headers: authHeaders() });
          if (r.ok) {
            (await r.json()).forEach((u) => {
              const pid = u.tracks && u.tracks.courses && u.tracks.courses.path_id;
              if (pid && out[pid]) out[pid].done++;
            });
          }
        } catch (e) { /* progress is decoration; never block the UI */ }
      }
      Object.values(out).forEach((p) => { p.pct = p.total ? Math.round((p.done / p.total) * 100) : 0; });
      return out;
    },

    async loadUnlocks(trackIds) {
      if (!session || !trackIds.length) return new Set();
      const r = await fetch(cfg.url + "/rest/v1/unlocks?select=track_id&member_id=eq." + session.user.id,
        { headers: authHeaders() });
      if (!r.ok) return new Set();
      const mine = new Set((await r.json()).map((x) => x.track_id));
      return new Set(trackIds.filter((id) => mine.has(id)));
    },
    // The server grants the unlock, and only once the sitting has actually taken the time.
    // Returns true when granted; false when the track was scrubbed rather than sat.
    async saveUnlock(trackId) {
      if (!session) return false;
      try {
        const r = await fetch("/api/unlock", {
          method: "POST",
          headers: { "Content-Type": "application/json", Authorization: "Bearer " + session.access_token },
          body: JSON.stringify({ track_id: trackId }),
        });
        return r.ok;
      } catch (e) { return false; }
    },
    async recordPractice(trackId, seconds, completed) {
      if (!session) return;
      await fetch(cfg.url + "/rest/v1/practice_events", {
        method: "POST",
        headers: authHeaders(),
        body: JSON.stringify({
          member_id: session.user.id, track_id: trackId,
          seconds_listened: Math.round(seconds || 0), completed: !!completed,
        }),
      });
    },
    async loadStats() {
      if (!session) return null;
      const r = await fetch(cfg.url + "/rest/v1/practice_events?select=seconds_listened,completed&member_id=eq." + session.user.id,
        { headers: authHeaders() });
      if (!r.ok) return null;
      const rows = await r.json();
      return {
        minutes: Math.round(rows.reduce((s, x) => s + (x.seconds_listened || 0), 0) / 60),
        completed: rows.filter((x) => x.completed).length,
      };
    },

    // ---- audio ----
    streamUrl(trackId) {
      let u = "/api/audio/" + encodeURIComponent(trackId);
      if (session) u += "?token=" + encodeURIComponent(session.access_token);
      return u;
    },

    // ---- practice discount ----
    async practiceSummary() {
      if (!session) return null;
      const r = await fetch("/api/practice/summary",
        { headers: { Authorization: "Bearer " + session.access_token } });
      return r.ok ? r.json() : null;
    },
    async giftMonth(rewardId) {
      if (!session) throw new Error("Sign in first.");
      const r = await fetch("/api/practice/gift", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session.access_token },
        body: JSON.stringify({ reward_id: rewardId }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Could not gift that month.");
      return j.code;
    },

    async poolMonth(rewardId) {
      const r = await fetch("/api/practice/pool", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session.access_token },
        body: JSON.stringify({ reward_id: rewardId }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Could not release that month.");
      return true;
    },
    async redeemCode(code) {
      if (!session) throw new Error("Sign in first.");
      const r = await fetch("/api/practice/redeem", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session.access_token },
        body: JSON.stringify({ code }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Could not redeem that code.");
      return j.granted_until;
    },

    // ---- Dīkṣā gates ----
    async loadGatesPassed(trackIds) {
      if (!session || !trackIds.length) return new Set();
      const list = trackIds.map((t) => '"' + t + '"').join(",");
      const r = await fetch(cfg.url + "/rest/v1/gate_reflections?select=track_id&track_id=in.(" +
        encodeURIComponent(list) + ")", { headers: authHeaders() });
      if (!r.ok) return new Set();
      return new Set((await r.json()).map((x) => x.track_id));
    },
    async submitReflection(trackId, text) {
      if (!session) throw new Error("Sign in first.");
      const r = await fetch("/api/reflection", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session.access_token },
        body: JSON.stringify({ track_id: trackId, reflection: text }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok) throw new Error(j.error || "Could not submit.");
      return j;   // carries willBeRead — only the circle is promised a reply
    },

    // ---- where to begin ----
    async loadIntake() {
      if (!session) return null;
      const r = await fetch(cfg.url + "/rest/v1/members?select=intake,suggested_path,intake_at&id=eq." + session.user.id,
        { headers: authHeaders() });
      if (!r.ok) return null;
      return (await r.json())[0] || null;
    },
    async saveIntake(answers, pathId) {
      if (!session) return false;
      const r = await fetch(cfg.url + "/rest/v1/members?id=eq." + session.user.id, {
        method: "PATCH",
        headers: authHeaders({ Prefer: "return=minimal" }),
        body: JSON.stringify({ intake: answers, suggested_path: pathId, intake_at: new Date().toISOString() }),
      });
      return r.ok;
    },

    // ---- membership / dāna ----
    // the member's own billing page — change card, see invoices, cancel
    async portal() {
      if (!session) throw new Error("Sign in first.");
      const r = await fetch("/api/portal", {
        method: "POST", headers: { Authorization: "Bearer " + session.access_token },
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.url) throw new Error(j.error || "Could not open billing.");
      return j.url;
    },

    // resolves to a Stripe Checkout URL, or throws with a readable message
    async checkout(plan) {
      if (!session) throw new Error("Sign in from the Sādhana tab first — your membership follows your email.");
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + session.access_token },
        body: JSON.stringify({ plan }),
      });
      const j = await r.json().catch(() => ({}));
      if (!r.ok || !j.url) throw new Error(j.error || "Could not open checkout.");
      return j.url;
    },
  };
})();
