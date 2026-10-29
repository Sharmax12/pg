# PGFinders marketing website

A responsive static marketing site for PGFinders, using the forest-green / warm-ivory / muted-gold brand identity. It is intentionally separate from the Expo mobile app repository so marketing-site changes don't destabilize the app.

## What's included

- `index.html` — homepage, value propositions, how-it-works, early-access form, and FAQs
- `styles.css` — responsive layouts and brand styling
- `script.js` — mobile navigation, current footer year, and waitlist API submission
- `mail.js` — Express API that sends waitlist confirmation emails through SMTP
- `thanks.html` — post-signup confirmation page
- `privacy.html` — launch-stage privacy notice for early-access signups
- `robots.txt` and `sitemap.xml` — basic discovery metadata
- `assets/pgfinders-mark.svg` — brand mark / favicon
- `assets/pgfinders-linkedin-cover.png` — current LinkedIn cover artwork
- `netlify.toml` — static publish configuration and basic response headers

## Preview locally

Because this is a static site, you can open `index.html` directly. For a more realistic preview, run a local server from this folder:

```bash
python3 -m http.server 8080
```

Then visit `http://localhost:8080`.

The waitlist form deliberately does not save data in local preview. This prevents accidentally implying that a signup was saved when no backend is attached.

When `mail.js` is running locally on port `3000`, the waitlist form posts to
`http://localhost:3000/api/subscribe` and redirects to `thanks.html` after the
confirmation email is sent. If the API is deployed separately, define
`window.PGFINDERS_API_URL` before loading `script.js`, for example:

```html
<script>
  window.PGFINDERS_API_URL = 'https://api.example.com';
</script>
<script src="/script.js" defer></script>
```

The API URL should use HTTPS in production and must allow requests from the
website's origin.

## Deploy with Netlify

1. Create a new Netlify site or use the site currently serving `pgfinders.com`.
2. Deploy this folder as the publish directory; no build command is required.
3. In Netlify, open **Forms** and ensure form detection is enabled, then trigger a fresh deploy so Netlify scans the HTML form.
4. Confirm a form named `pgfinders-waitlist` appears in the Forms panel.
5. Submit a real test using an email you control and check that the entry appears in Netlify Forms before pointing the production domain at this build.
6. Once verified, attach `pgfinders.com` to this site or replace the existing site's deployed files.

The form is configured using Netlify's native HTML form attributes. If your current hosting provider is not Netlify, do not expect the form to capture submissions until you connect an equivalent form endpoint.

## Before production

- Replace the sample accommodation photography with PGFinders-owned photos or licensed images before a large public launch. Current imagery is loaded from Unsplash URLs and requires internet access.
- Verify Netlify form capture in a deployed preview.
- Add the production app link once the mobile/web app has a stable public URL; do not send users to an unfinished login flow.
- Review the launch-stage `privacy.html` and confirm your data-retention process/contact channel with the team before collecting signups at scale. The page does not invent an email address or claim live listing verification.
- Confirm the copy about the Delhi launch is still accurate.

## Suggested architecture

- `pgfinders.com`: marketing, product story, FAQs, SEO, and early access
- `app.pgfinders.com` (later): authenticated web experience, if/when you deploy one
- Mobile app: Expo application from `application_Pg_finders`

This is a proposed split, not a claim that the subdomain or app is configured today.
