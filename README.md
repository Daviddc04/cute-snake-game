# Cute Snake Game

A pink, cute Snake game built with React + Vite — just for you!

- **Cat head** (your image at `public/assets/cat.JPG`) leads the snake; body segments are 🐱; food is 🐟.
- **Win** at exactly 25 points.
- **Phone**: use on-screen arrow buttons. **Computer**: use Arrow keys or WASD.

---

## Run locally

**Requirements:** Node.js 18 or newer (recommended). If you have an older Node, the app may still run with `npm run dev`; for building and deploying, Vercel/Netlify use Node 18+.

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Start the dev server**
   ```bash
   npm run dev
   ```
   Open the URL shown (e.g. `http://localhost:5173`) in your browser.

3. **Optional: add the cat image**  
   Place your cat image at `public/assets/cat.JPG`. If it’s missing, the snake head will show 🐱 until you add it.

---

## Deploy for free (so she can play from a link)

She only needs to open the link — no setup. You can use either Vercel or Netlify.

### Option A – Vercel (recommended)

1. **Put the project on GitHub**
   - Create a new repository on [github.com](https://github.com).
   - In your project folder, run:
     ```bash
     git init
     git add .
     git commit -m "Cute snake game"
     git branch -M main
     git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
     git push -u origin main
     ```
   - Replace `YOUR_USERNAME` and `YOUR_REPO_NAME` with your repo details.

2. **Sign up at Vercel**
   - Go to [vercel.com](https://vercel.com) and sign in with GitHub.

3. **Import and deploy**
   - Click **Add New…** → **Project**.
   - Import your GitHub repo.
   - Leave the settings as-is (Framework Preset: **Vite**).
   - Click **Deploy**.

4. **Share the link**  
   When the deploy finishes, copy the URL (e.g. `https://cute-char-game.vercel.app`) and text it to her. She can open it on her phone or computer with zero setup.

5. **Optional: add the cat image**  
   Add `cat.JPG` to `public/assets/` in your repo, commit, and push. Vercel will redeploy automatically.

---

### Option B – Netlify

1. **Put the project on GitHub**  
   Same as step 1 under Vercel (create repo, `git init`, add, commit, push).

2. **Sign up at Netlify**  
   Go to [netlify.com](https://netlify.com) and sign in with GitHub.

3. **Import and deploy**
   - Click **Add new site** → **Import an existing project**.
   - Choose **GitHub** and select your repo.
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
   - Click **Deploy site**.

4. **Share the link**  
   Use the generated URL (e.g. `https://your-site-name.netlify.app`). She can open it with zero setup.

5. **Optional: add the cat image**  
   Add `cat.JPG` to `public/assets/` in your repo, commit, and push. Netlify will redeploy automatically.

---

## Build for production (optional)

```bash
npm run build
```

Output is in the `dist` folder. You can upload `dist` to any static host.
