# portfolio-site

Personal embedded-systems portfolio for [Michael Ladderbush](https://github.com/mikeladderbush).

**Live:** https://mikeladderbush.github.io/portfolio-site/

## Stack

Plain HTML/CSS/JS. No framework, no build step, no dependencies beyond a Google Fonts link.

- `index.html` — page structure and content
- `styles.css` — theming (CSS custom properties), layout, dark/light mode
- `script.js` — theme toggle (persisted to `localStorage`), footer year, animated LED-matrix demo
- `assets/` — background image and other static assets

## Develop

Open `index.html` directly in a browser, or serve it locally so relative asset paths resolve the same way they will in production:

```bash
python -m http.server 8000
```

Then visit `http://localhost:8000`.

## Deploy

Hosted on GitHub Pages, served from the `main` branch root. Any push to `main` updates the live site — no build/CI step involved.

To point Pages at a different branch or path: repo **Settings → Pages**.
