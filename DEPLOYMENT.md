# Deployment Guide for Agrikart

This guide covers multiple deployment options for the Agrikart React application.

## Prerequisites

1. Build the production version:
```bash
npm run build
```

This creates an optimized production build in the `build/` folder.

## Deployment Options

### Option 1: Vercel (Recommended - Easiest)

Vercel is the easiest way to deploy React apps with zero configuration.

#### Steps:

1. **Install Vercel CLI** (optional, you can also use the web interface):
```bash
npm install -g vercel
```

2. **Deploy**:
```bash
vercel
```

3. **Or use the web interface**:
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect React and deploy

4. **Environment Variables** (if needed):
   - In Vercel dashboard, go to Project Settings → Environment Variables
   - Add any required environment variables

**Advantages:**
- Free tier available
- Automatic HTTPS
- Global CDN
- Automatic deployments on git push
- Zero configuration needed

---

### Option 2: Netlify

Netlify is another excellent option for React deployments.

#### Steps:

1. **Install Netlify CLI** (optional):
```bash
npm install -g netlify-cli
```

2. **Build the project**:
```bash
npm run build
```

3. **Deploy**:
```bash
netlify deploy --prod --dir=build
```

4. **Or use the web interface**:
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Drag and drop the `build` folder
   - Or connect your Git repository for continuous deployment

5. **Configure redirects** (create `public/_redirects` file):
```
/*    /index.html   200
```

**Advantages:**
- Free tier available
- Easy drag-and-drop deployment
- Continuous deployment from Git
- Form handling and serverless functions

---

### Option 3: GitHub Pages

Deploy directly from your GitHub repository.

#### Steps:

1. **Install gh-pages package**:
```bash
npm install --save-dev gh-pages
```

2. **Update package.json**:
Add these scripts:
```json
"homepage": "https://yourusername.github.io/agrikart-frontend",
"scripts": {
  "predeploy": "npm run build",
  "deploy": "gh-pages -d build"
}
```

3. **Deploy**:
```bash
npm run deploy
```

4. **Enable GitHub Pages**:
   - Go to repository Settings → Pages
   - Select source branch: `gh-pages`
   - Save

**Note:** For React Router, you'll need to add a `404.html` file that redirects to `index.html`.

---

### Option 4: Firebase Hosting

Google's Firebase provides free hosting.

#### Steps:

1. **Install Firebase CLI**:
```bash
npm install -g firebase-tools
```

2. **Login**:
```bash
firebase login
```

3. **Initialize Firebase**:
```bash
firebase init hosting
```
   - Select your Firebase project
   - Public directory: `build`
   - Single-page app: Yes
   - Overwrite index.html: No

4. **Deploy**:
```bash
npm run build
firebase deploy
```

**Advantages:**
- Free tier with generous limits
- Fast global CDN
- Easy integration with other Firebase services

---

### Option 5: AWS Amplify

Amazon's hosting solution for web apps.

#### Steps:

1. **Go to AWS Amplify Console**
2. **Connect your Git repository**
3. **Configure build settings** (auto-detected for React):
   - Build command: `npm run build`
   - Output directory: `build`
4. **Deploy**

**Advantages:**
- Free tier available
- Integrated with AWS services
- Custom domain support

---

### Option 6: Traditional Web Hosting (cPanel, FTP)

For traditional hosting providers.

#### Steps:

1. **Build the project**:
```bash
npm run build
```

2. **Upload contents of `build/` folder**:
   - Use FTP client (FileZilla, WinSCP)
   - Upload all files from `build/` to `public_html/` or `www/`

3. **Configure server**:
   - Ensure server supports SPA routing
   - Add `.htaccess` file (for Apache) or server config (for Nginx)

**Apache `.htaccess` file** (create in `public/` folder before build):
```apache
Options -MultiViews
RewriteEngine On
RewriteCond %{REQUEST_FILENAME} !-f
RewriteRule ^ index.html [QR,L]
```

**Nginx configuration**:
```nginx
location / {
  try_files $uri $uri/ /index.html;
}
```

---

## Environment Variables

If your app uses environment variables:

1. **Create `.env.production` file**:
```env
REACT_APP_API_URL=https://api.agrikart.com
REACT_APP_ENV=production
```

2. **Build will automatically use production variables**

3. **Set in deployment platform**:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Environment Variables
   - Others: Check platform documentation

---

## Post-Deployment Checklist

- [ ] Test all routes work correctly
- [ ] Verify API endpoints are accessible
- [ ] Check mobile responsiveness
- [ ] Test authentication flow
- [ ] Verify HTTPS is enabled
- [ ] Set up custom domain (if needed)
- [ ] Configure analytics (if needed)
- [ ] Set up error tracking (Sentry, etc.)

---

## Troubleshooting

### Routes not working (404 errors)
- Ensure SPA routing is configured
- Add redirect rules (see Option 6)

### Build fails
- Check Node.js version (should be 14+)
- Clear `node_modules` and reinstall
- Check for TypeScript errors if using TS

### Environment variables not working
- Ensure variables start with `REACT_APP_`
- Rebuild after adding variables
- Check deployment platform settings

---

## Recommended: Vercel or Netlify

For easiest deployment, we recommend **Vercel** or **Netlify**:
- Zero configuration
- Free tier
- Automatic HTTPS
- Continuous deployment
- Global CDN

Choose based on your preference or existing accounts!

