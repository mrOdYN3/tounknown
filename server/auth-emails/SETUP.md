# Two dashboard jobs, about 35 minutes

Both are Supabase project settings, so neither can be deployed from this repo. The app code for
both is already live and waiting.

Project ref: `qugmxlqtvqhpatprhsgu`

---

## 1. Google sign-in (~15 min)

The "Continue with Google" button is already deployed. It reads the enabled-provider list from
`/auth/v1/settings`, so it is invisible right now and appears by itself the moment this is on —
no code change, no redeploy.

**a. Google Cloud Console** → APIs & Services → Credentials → Create OAuth client ID → Web
application.

| field | value |
|---|---|
| Authorised redirect URI | `https://qugmxlqtvqhpatprhsgu.supabase.co/auth/v1/callback` |

Copy the Client ID and Client Secret.

**b. Supabase** → Authentication → Providers → Google → enable, paste both, save.

**c. Supabase** → Authentication → URL Configuration → Redirect URLs. The app asks to be sent
back to whichever page you signed in from, so all three entry points need to be allowed or the
round trip dumps people on the home screen:

```
https://tounknown.com/
https://tounknown.com/ru
https://tounknown.com/ds/ui_kits/app/
```

A single wildcard entry `https://tounknown.com/**` covers all three and anything added later.

**On existing members:** Supabase links a Google identity to an existing user when the email
matches and is verified. Everyone here signed in through a link they clicked, so their address is
verified — the same person lands on the same account, membership and practice intact.

---

## 2. Custom SMTP (~20 min) — the more urgent one

Supabase's built-in mailer is rate limited to a handful of messages per hour across the whole
project and is explicitly not for production. With magic-link auth an undelivered email is a
locked door, so this is a reliability fix before it is a branding one.

**Supabase** → Project Settings → Authentication → SMTP Settings → Enable Custom SMTP.

| field | value |
|---|---|
| Sender email | `hello@tounknown.com` |
| Sender name | `toUnknown` |
| Host / port / user / pass | from your provider |

Resend, Postmark and Brevo all cover this scale free. Add the SPF and DKIM records the provider
gives you to `tounknown.com` DNS — without them the mail lands in spam, which for passwordless
auth means locked out rather than merely unread.

**Then** paste the two templates from this folder into Authentication → Email Templates:

| template | file |
|---|---|
| Confirm signup | `confirm-signup.html` |
| Magic Link | `magic-link.html` |

Both are needed. Supabase sends the first to an address it has never seen and the second to one
it has, which is why a returning reader was being told to "finish signing up".

---

## Checking it worked

```
curl -s "https://qugmxlqtvqhpatprhsgu.supabase.co/auth/v1/settings" \
  -H "apikey: sb_publishable_bLnUokPSRrPY8fh0IEAE8Q__Hl5J6T_" | grep -o '"google":[a-z]*'
```

`"google":true` means the button is live on the site. Then sign in with a fresh address, and
confirm the mail arrives from toUnknown rather than from Supabase Auth.
