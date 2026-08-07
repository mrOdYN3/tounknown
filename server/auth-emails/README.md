# Auth emails

The sign-in email currently arrives from **"Supabase Auth"**, titled *"Confirm your email
address"*, and footed with *"powered by Supabase ⚡"*. None of that is ours. These files replace
it. Both steps are done in the Supabase dashboard — they are project settings, not code, so they
cannot be deployed from this repo.

## 1. Send from our own address (do this first)

**Dashboard → Project Settings → Authentication → SMTP Settings → Enable Custom SMTP.**

This matters for more than branding. Supabase's built-in mailer is explicitly not for
production and is rate limited to a handful of messages per hour across the whole project. Two
people signing in at the same time can be enough for the second to silently get nothing — and
with magic-link auth, no email means no way in at all.

Any transactional provider works. Resend, Postmark and Brevo all have a free tier that covers
this scale:

| field | value |
|---|---|
| Sender email | `hello@tounknown.com` (or `noreply@`) |
| Sender name | `toUnknown` |
| Host / port / user / pass | from your provider |

Add the SPF and DKIM records the provider gives you to the `tounknown.com` DNS, or the mail
lands in spam — which for a passwordless product means locked out, not just unnoticed.

## 2. Replace the templates

**Dashboard → Authentication → Email Templates.** Paste the matching file into each one:

| template | file | subject |
|---|---|---|
| Confirm signup | `confirm-signup.html` | Your first sitting is waiting |
| Magic Link | `magic-link.html` | Your link to toUnknown |

Both templates are needed. Supabase sends *Confirm signup* to an address it has never seen and
*Magic Link* to one it has, so a first-time reader and a returning one get different emails —
that is why the screenshot said "finish signing up" when the app had only asked someone to sign
in.

`{{ .ConfirmationURL }}` is Supabase's placeholder for the link; leave it exactly as written.

## Note on the logo

The templates reference `https://tounknown.com/ds/assets/wordmark-black.png`, which is already
live and public. Some clients block remote images by default, so the wordmark is a progressive
enhancement — every template still reads correctly with images turned off, and the link is a
real `<a>`, never an image.
