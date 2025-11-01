# 🚀 Deployment Guide

## 📦 Push to GitHub

### Step 1: Initialize Git Repository

```bash
cd /Users/manishkumar/Desktop/AI-SASS
git init
git add .
git commit -m "🎉 Initial commit: AI Content Transformer with Google Gemini"
```

### Step 2: Create GitHub Repository

1. Go to https://github.com/new
2. Repository name: `ai-content-transformer`
3. Description: `AI-powered content transformation platform using Google Gemini Pro`
4. Choose Public or Private
5. **DO NOT** initialize with README (we already have one)
6. Click "Create repository"

### Step 3: Push to GitHub

```bash
# Add your GitHub repository as remote
git remote add origin https://github.com/YOUR-USERNAME/ai-content-transformer.git

# Push to GitHub
git branch -M main
git push -u origin main
```

Replace `YOUR-USERNAME` with your actual GitHub username.

---

## 🌐 Deploy to Vercel (Frontend)

### Option 1: Deploy via Vercel Dashboard (Easiest)

1. **Go to Vercel**: https://vercel.com
2. **Sign in** with GitHub
3. **Click "New Project"**
4. **Import** your `ai-content-transformer` repository
5. **Configure:**
   - Framework Preset: `Vite`
   - Root Directory: `client`
   - Build Command: `npm run build`
   - Output Directory: `dist`
6. **Click "Deploy"**

### Option 2: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy frontend
cd client
vercel --prod

# Follow the prompts:
# - Link to existing project? N
# - What's your project's name? ai-content-transformer
# - In which directory is your code located? ./
# - Want to modify settings? N
```

**Your frontend will be live at:** `https://ai-content-transformer.vercel.app`

---

## 🔧 Deploy Backend API

### Option 1: Railway (Recommended)

1. **Go to Railway**: https://railway.app
2. **Sign in** with GitHub
3. **Click "New Project"**
4. **Select "Deploy from GitHub repo"**
5. **Choose** `ai-content-transformer`
6. **Add Service** → Start from a Repo
7. **Configure:**
   - Root Directory: `server`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
8. **Add Environment Variables:**
   - `GOOGLE_API_KEY`: Your API key
   - `PORT`: 3001
   - `NODE_ENV`: production
9. **Deploy**

**Copy your Railway URL** (e.g., `https://your-app.railway.app`)

### Option 2: Render

1. **Go to Render**: https://render.com
2. **Sign in** with GitHub
3. **New** → **Web Service**
4. **Connect** your repository
5. **Configure:**
   - Name: `ai-content-transformer-api`
   - Region: Choose closest to you
   - Branch: `main`
   - Root Directory: `server`
   - Runtime: `Node`
   - Build Command: `npm install && npm run build`
   - Start Command: `npm start`
6. **Environment Variables:**
   - `GOOGLE_API_KEY`: Your API key
   - `PORT`: 3001
   - `NODE_ENV`: production
7. **Create Web Service**

**Copy your Render URL** (e.g., `https://ai-content-transformer-api.onrender.com`)

---

## 🔗 Connect Frontend to Backend

After deploying backend, update your frontend to use the production API:

1. **Edit** `client/src/App.tsx`

Find this line:
```typescript
const response = await fetch('/api/transform', {
```

Change to:
```typescript
const API_URL = import.meta.env.PROD 
  ? 'https://your-backend-url.railway.app' 
  : 'http://localhost:3001';

const response = await fetch(`${API_URL}/api/transform`, {
```

2. **Redeploy Frontend**
```bash
cd client
vercel --prod
```

---

## 🎯 Quick Deploy Commands (All-in-One)

```bash
# 1. Initialize and push to GitHub
cd /Users/manishkumar/Desktop/AI-SASS
git init
git add .
git commit -m "🎉 Initial commit: AI Content Transformer"
git remote add origin https://github.com/YOUR-USERNAME/ai-content-transformer.git
git push -u origin main

# 2. Deploy frontend to Vercel
cd client
vercel --prod

# 3. Deploy backend to Railway
railway login
cd ../server
railway init
railway up
railway variables set GOOGLE_API_KEY=your-key-here
```

---

## ✅ Verify Deployment

### Test Backend API
```bash
curl https://your-backend-url.railway.app/api/health
```

Expected response:
```json
{
  "status": "ok",
  "message": "AI Content Transformer API is running",
  "model": "Google Gemini Pro",
  "aiProvider": "Google"
}
```

### Test Frontend
Open your Vercel URL in browser and try a transformation!

---

## 📝 Update README with Live URLs

After deployment, update `README.md`:

```markdown
### Live Demo
🔗 **[Try it live](https://your-vercel-url.vercel.app)**

### API Documentation
📚 **[API Docs](https://your-backend-url.railway.app/api/health)**
```

Commit and push:
```bash
git add README.md
git commit -m "📝 Add live demo URLs"
git push
```

---

## 🎨 Optional: Add GitHub Repository Enhancements

### Add Topics to Repository
Go to your GitHub repo → Settings → Topics:
- `ai`
- `artificial-intelligence`
- `google-gemini`
- `typescript`
- `react`
- `nodejs`
- `content-transformation`
- `prompt-engineering`
- `saas`
- `fullstack`

### Add Repository Description
"AI-powered content transformation platform using Google Gemini Pro. Transform text instantly with advanced prompt engineering."

### Add Website URL
Add your Vercel URL to the repository website field

---

## 🔐 Security Reminder

**NEVER commit your API key!**

Make sure `.env` is in `.gitignore`:
```bash
cat .gitignore | grep .env
```

If you accidentally committed your key:
1. Delete the commit
2. Regenerate API key at https://ai.google.dev/
3. Update environment variables in Railway/Render

---

## 🎉 You're Done!

Your AI Content Transformer is now:
- ✅ Pushed to GitHub
- ✅ Frontend deployed on Vercel
- ✅ Backend deployed on Railway/Render
- ✅ Ready to share with the world!

Share it on:
- LinkedIn
- Twitter
- Your portfolio
- Job applications

**Congratulations!** 🚀

