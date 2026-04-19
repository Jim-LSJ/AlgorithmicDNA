# Deployment Guide: Algorithmic DNA

The Algorithmic DNA platform is built with Next.js, making it highly compatible with modern static and server-side hosting platforms.

## Recommended Hosting: Vercel

Vercel is the creator of Next.js and provides the most "zero-maintenance" experience.

### Steps to Deploy
1. **Push your code** to a GitHub repository.
2. **Connect to Vercel**:
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub.
   - Click "Add New" -> "Project".
   - Select the `AlgorithmicDNA` repository.
3. **Configure & Deploy**:
   - Vercel will automatically detect Next.js.
   - Click **Deploy**.
   - Your site will be live at `your-project.vercel.app`.

> [!TIP]
> **Why Vercel?** It handles automatic deployments every time you push to GitHub, image optimization, and global edge hosting with zero manual configuration.

---

## Alternative: GitHub Pages

GitHub Pages is free and integrated directly into your repository.

### Steps to Deploy
1. **Update `next.config.js`**:
   Add `output: 'export'` and `basePath: '/AlgorithmicDNA'` (if using a subfolder).
2. **Build the Project**:
   Run `npm run build`. This generates a `out/` folder.
3. **Deploy to GitHub**:
   - Go to your Repository **Settings** -> **Pages**.
   - Under **Build and deployment**, set the source to "GitHub Actions" (recommended for Next.js).
   - Use the official [Next.js Static Site Export action](https://github.com/actions/configure-pages).

---

## Alternative: Netlify

Netlify is another excellent zero-config option similar to Vercel.

### Steps to Deploy
1. Connect your GitHub repository on [Netlify](https://www.netlify.com/).
2. Netlify will detect the `npm run build` command and the `.next` output directory.
3. Click **Deploy Site**.

---

## Final Verification Checklist

Before deploying, ensure you have:
- [x] Run `npm run build` locally to check for errors.
- [x] Verified that all images in `/public/patterns/` are present.
- [x] Checked that `src/data/patterns/index.ts` exports all patterns correctly.
- [x] Added any necessary environment variables (none required for this static build).
