# PitchPulse
PitchPulse is a dark, modern football updates website that aggregates:
- Trending football headlines
- Transfer rumors
- Fan discussions
- Latest scores and global fixtures

It is a static site designed for GitHub Pages deployment.

## Project structure
- `index.html` - page layout
- `styles.css` - dark UI/UX styling
- `app.js` - live data fetching and rendering logic
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow

## Local run
You can open `index.html` directly, but using a local server is recommended:

```bash
python3 -m http.server 8080
```

Then open `http://localhost:8080`.

## Deploy to GitHub Pages
1. Create a new GitHub repository and push this folder.
2. Ensure your default branch is `main`.
3. In GitHub repo settings, go to **Pages** and confirm **Build and deployment** uses **GitHub Actions**.
4. Push to `main`; the workflow in `.github/workflows/deploy.yml` deploys automatically.

