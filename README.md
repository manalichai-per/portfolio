# Manal Chaib — Photography Portfolio

A personal photography portfolio website. Pure HTML + CSS + vanilla JS — no build step, no dependencies. Designed for GitHub Pages hosting.

## 🚀 Deploying to GitHub Pages

1. Push this repo to GitHub
2. Go to **Settings → Pages**
3. Under *Source*, select **Deploy from a branch**
4. Set branch to `main` (or `master`) and folder to `/ (root)`
5. Click **Save** — your site will be live at `https://yourusername.github.io/portfolio/`

## 📁 File Structure

```
portfolio/
├── index.html      ← Landing page (hero, project list, contact)
├── gallery.html    ← Full portfolio grid with filters
├── about.html      ← About & bio page
├── styles.css      ← All styles
├── script.js       ← Animations, cursor, filters, lightbox
└── images/         ← Add your photos here (create this folder)
```

## 📸 Adding Your Photos

1. Create an `images/` folder in the project root
2. Add your photos (JPG/WebP recommended, optimized for web)
3. In each HTML file, replace `<div class="img-placeholder">` with:

```html
<img src="images/your-photo.jpg" alt="Description of photo" loading="lazy" />
```

### Hero image (index.html)
Replace the `.hero-placeholder` div with:
```html
<img src="images/hero.jpg" alt="Hero photo" />
```

## ✏️ Customizing Content

| What | Where |
|---|---|
| Your name | All 3 HTML files — search "Manal Chaib" |
| Email address | `index.html` contact section + `about.html` |
| Social links | `index.html` footer + `about.html` |
| Project series names | `index.html` project list |
| Bio text | `about.html` |
| Accent color | `styles.css` → `--accent: #c9a96e` |

## 🎨 Design Features

- Dark cinematic aesthetic with film grain overlay
- Custom cursor with smooth lag (desktop)
- Large editorial typography (bpowell-style project list)
- Horizontal auto-scrolling filmstrip
- Animated marquee footer
- Scroll-triggered reveal animations
- Gallery with category filters + lightbox
- Light ↔ dark section transitions
- Fully responsive (mobile-first)

## 📄 License

Personal use. Photography and content © Manal Chaib.
