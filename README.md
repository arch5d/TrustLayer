# TrustLayer (Frontend + Chrome Extension Prototype)

This is a **frontend-only** visual prototype with **simulated/mock data** (no backend, no AI models).

## Frontend (React + Vite)

From `trustlayer/frontend`:

```bash
npm install
npm run dev
```

Then open `http://localhost:5173/`.

- Dashboard: `/`
- Scan Simulator: `/scan`

## Chrome Extension (Manifest v3)

Load `trustlayer/extension` in Chrome:

- Chrome → `chrome://extensions`
- Enable **Developer mode**
- **Load unpacked** → select the `trustlayer/extension` folder

What you’ll see:

- Popup UI: click the extension icon
- Floating widget: appears bottom-right on any page; click to expand

No network/backend calls are performed; scores are simulated/random.

