/* toUnknown app data — lifted verbatim from tounknown-app.html #tu-config */
window.TU = {
  logo: "../../assets/logo-black.png",
  hero: "../../assets/pagoda.jpg",
  monkBowl: "../../assets/monk-bowl.jpg",
  monksWindow: "../../assets/monks-window.jpg",
  monksLine: "../../assets/monks-line.jpg",
  // Sangha header. The Burma frame was three stops under and unrecoverable; this one carries the
  // same light the rest of the site is built on. lee bernd / Unsplash — credited on /legal.
  sanghaHall: "../../assets/sangha-hall.jpg",
  masterpiece: "../../assets/covers/tounknown-com.png",
  trustpilot: "../../assets/covers/trustpilot-vipassana-life.png",
  satsang: "../../assets/covers/true-meditation.jpg",
  danaImg: "../../assets/covers/dana.jpg",
  brand: {
    tagline: "KNOW THYSELF THROUGH SPIRITUAL STRENGTH",
    subline: "this is not religion — this is inner universe",
    philosophy: "WE DON'T GIVE ANSWERS. WE CREATE A SPACE WHERE YOU HEAR YOUR OWN",
  },
  teacher: {
    id: "dyn", name: "DYNN", lineage: "Vipassana · S.N. Goenka & Pa-Auk traditions",
    parampara: ["Gautama Buddha","Ledi Sayadaw","Saya Thetgyi","Sayagyi U Ba Khin","S.N. Goenka","DYNN"],
    bio: "Founder. 20+ Vipassana courses, retreats in 15+ countries. Hatha Yoga since 2017, Ashtanga since 2020.",
    avatar: "../../assets/covers/dyn.jpg",
  },
  paths: [
    { id: "vipassana", name: "The Vipassana Path", tradition: "Theravāda Buddhism", source: "Pali Canon · ~5th c. BCE",
      essence: "See things as they are. Sīla, Samādhi, Pañña.",
      image: "../../assets/covers/vipassana-meditation-course-part-1-anapanasati-onlin.jpg",
      steps: [
        { t: "Anapanasati — the first breath", min: 15, free: true, done: true },
        { t: "Day 1 · Arriving in the body", min: 15, next: true },
        { t: "Day 2 · The breath at the nostrils", min: 15 },
        { t: "Day 3 · Equanimity with sensation", min: 15 },
        { t: "DĪKṢĀ GATE · reflection & seal", gate: true },
        { t: "Part 2 · deepening (opens beyond the gate)", min: 20 },
      ]},
    { id: "tantra", name: "The Tantra Path", tradition: "Kashmir Shaivism", source: "Vigyan Bhairav Tantra · ~8th c.",
      essence: "112 doorways of Shiva — breath, sound, presence.",
      image: "../../assets/covers/1749811476032-covercopy.jpg",
      steps: [
        { t: "Technique 6 · Breathing in the throat", min: 15, free: true, next: true },
        { t: "Technique 7 · Savoring the taste of existence", min: 15 },
        { t: "Technique 11 · Passage of breath through the nose", min: 15 },
        { t: "DĪKṢĀ GATE · reflection & seal", gate: true },
        { t: "Parts I–XI · all 112 techniques (43 h 11 min)", min: 15 },
      ]},
    { id: "vedanta", name: "The Vedanta Path", tradition: "Advaita Vedanta", source: "Upaniṣadic non-duality",
      essence: "I am — before every thought. Himalayan silence.",
      image: "../../assets/covers/1750926107990-covercopy.jpg",
      steps: [
        { t: "I Am · resting as presence", min: 23, free: true, next: true },
        { t: "The witness and the witnessed", min: 27 },
        { t: "Silence beyond thought", min: 30 },
        { t: "DĪKṢĀ GATE · reflection & seal", gate: true },
        { t: "Merging with cosmic awareness", min: 35 },
      ]},
    { id: "bhakti", name: "The Bhakti Path", tradition: "Bhakti Yoga", source: "The way of devotion",
      essence: "Whispers of God — surrender, prayer, unconditional love.",
      image: "../../assets/covers/1751001777618-cover-copy-n6ztvgd.jpg",
      steps: [
        { t: "Opening the heart · breath as prayer", min: 18, free: true, next: true },
        { t: "Surrender · letting the Divine hold", min: 25 },
        { t: "Selfless service of the heart", min: 30 },
        { t: "DĪKṢĀ GATE · reflection & seal", gate: true },
        { t: "All ten whispers (6 h 45 min)", min: 40 },
      ]},
    { id: "stoic", name: "The Stoic Path", tradition: "Greco-Roman philosophy", source: "Meditations of Marcus Aurelius · 2nd c. CE",
      essence: "The inner citadel — 25 meditations of the philosopher-emperor.",
      image: "../../assets/covers/1701949520573-cover.jpg",
      steps: [
        { t: "Book I · Debts and lessons", min: 15, free: true, next: true },
        { t: "Book II · On the river Gran", min: 15 },
        { t: "DĪKṢĀ GATE · reflection & seal", gate: true },
        { t: "All 25 meditations", min: 15 },
      ]},
  ],
  futurePaths: [
    { name: "The Zen Path", tradition: "Chan / Zen Buddhism", source: "Zazen · Shikantaza · ~6th c." },
    { name: "The Tibetan Path", tradition: "Vajrayāna · Dzogchen", source: "Rigpa & Mahāmudrā" },
    { name: "The Yoga Path", tradition: "Rāja Yoga", source: "Yoga Sūtras of Patañjali · ~2nd c. BCE" },
    { name: "The Sufi Path", tradition: "Islamic mysticism", source: "Dhikr & Muraqaba" },
    { name: "The Taoist Path", tradition: "Taoism", source: "Zuowang · Tao Te Ching · ~4th c. BCE" },
    { name: "The Hesychast Path", tradition: "Christian mysticism", source: "Prayer of the Heart · Philokalia" },
    { name: "The Kabbalistic Path", tradition: "Jewish mysticism", source: "Hitbodedut & contemplation" },
  ],
  reviews: [
      {
          "text": "Beautifully read. Love the calm steady voice and tone. Thank you for the work to bring this together and share this. You have accompanied me daily for many many days, very grateful!",
          "author": "Anonymous",
          "date": "2025-12-23"
      },
      {
          "text": "Thank you for this beautiful blessing, to better understand the true/divine self, soul, collective consciousness, that we are connected to it all.",
          "author": "HZRDL",
          "date": "2025-10-28"
      },
      {
          "text": "Beautiful guided meditations based on Shivas words to Devi. Highly recommend trying them out!!",
          "author": "Anjani",
          "date": "2025-08-04"
      },
      {
          "text": "Very informative and interesting Classic mediations and obviously can't beat the price",
          "author": "Caleb Roseberry",
          "date": "2025-08-21"
      },
      {
          "text": "Very much appreciate the free meditations",
          "author": "Brian",
          "date": "2025-10-06"
      },
      {
          "text": "Great teachings",
          "author": "omar nour",
          "date": "2025-11-06"
      },
      {
          "text": "Really good",
          "author": "lisa king",
          "date": "2025-10-22"
      }
  ],
  circles: [
    ["Vipassana Circle", "Sīla, sits and honest questions"],
    ["Tantra Circle", "112 doorways, one at a time"],
    ["Vedanta Circle", "Self-inquiry beyond thought"],
    ["Kids & Family Grove", "Mindfulness for little ones"],
  ],
};
