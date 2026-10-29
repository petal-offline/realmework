# Realme Care Janakpuri — Authorised Service Studio

Apple-inspired hardware care studio, interactive repair price & turnaround estimator, live 5-stage repair telemetry tracker, and priority walk-in slot booking for **Realme Authorised Service Center — Janakpuri District Center (Shop No. F19, Plot 7A, DDA Building, New Delhi 110058)**.

---

## Deploying Live from `main` to `.github.io` (GitHub Pages)

This project is pre-configured with:
- **Relative asset resolution (`base: './'`)** in `vite.config.ts` so it works on both user/organization root domains (`https://<username>.github.io/`) and project sub-paths (`https://<username>.github.io/<repo-name>/`).
- **Automated GitHub Actions workflow** (`.github/workflows/deploy.yml`) that builds the TypeScript + Vite bundle and publishes `./dist` directly to GitHub Pages whenever you push to `main`.

### 3-Step Setup on GitHub:
1. Push this repository to GitHub on the **`main`** branch.
2. Open your repository on GitHub and go to **Settings → Pages**.
3. Under **Build and deployment → Source**, select **GitHub Actions**.

Once selected, the **Deploy to GitHub Pages** workflow will automatically run and publish your site live at `https://<your-username>.github.io/<repo-name>/` (or `https://<your-username>.github.io/`).

---

## Local Development

```bash
npm install
npm run dev
```

To test the production static build locally:

```bash
npm run build
npm run preview
```
