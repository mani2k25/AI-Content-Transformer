# 🚀 Quick Deployment Guide

## ✅ Backend is LIVE!
Your backend is already deployed and working at:
```
https://ai-content-transform-git-b0781c-manish-kumars-projects-c42fb5fc.vercel.app
```

**Test it:** Visit `/api/health` to verify:
```
https://ai-content-transform-git-b0781c-manish-kumars-projects-c42fb5fc.vercel.app/api/health
```

---

## 🎯 Deploy Frontend to Vercel

### **Method 1: Via Vercel Dashboard (Recommended)**

1. **Go to:** https://vercel.com/new

2. **Import your repository:** `AI-Content-Transformer`

3. **Configure the project:**
   - **Project Name:** `ai-content-transformer-frontend` (or any name you like)
   - **Framework Preset:** Vite
   - **Root Directory:** `client` ← **IMPORTANT!** Click "Edit" and set this
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`

4. **Add Environment Variable:**
   - Click "Environment Variables"
   - **Name:** `VITE_API_URL`
   - **Value:** `https://ai-content-transform-git-b0781c-manish-kumars-projects-c42fb5fc.vercel.app`

5. **Click "Deploy"**

6. Wait 1-2 minutes for deployment to complete

7. **Test your app!** Visit the URL Vercel gives you (something like `https://ai-content-transformer-frontend.vercel.app`)

---

### **Method 2: Via Vercel CLI**

If you prefer command line:

```bash
# Install Vercel CLI globally (one time only)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy from the client directory
cd client
vercel --prod

# Follow the prompts:
# - Link to existing project? No
# - Project name: ai-content-transformer-frontend
# - Root directory: (leave as is, since you're already in client/)
```

---

## 🎉 After Deployment

Once your frontend is deployed:

1. **Visit your frontend URL**
2. **Click "Load Example"** to test with sample text
3. **Click "Transform Text"** to see the AI magic! ✨

The frontend will automatically connect to your backend API.

---

## 🐛 Troubleshooting

### Frontend shows "API error"
- Check that `VITE_API_URL` environment variable is set correctly in Vercel
- Make sure the backend URL doesn't have a trailing slash

### Backend gives 404
- Your working backend URL is: `https://ai-content-transform-git-b0781c-manish-kumars-projects-c42fb5fc.vercel.app`
- Ignore the other URL: `https://ai-content-transformer-mxb3.vercel.app/` (old deployment)

### Need to update backend URL?
Go to Vercel Dashboard → Your Frontend Project → Settings → Environment Variables → Edit `VITE_API_URL`

---

## 📝 Summary

**Backend (Working):**
- URL: `https://ai-content-transform-git-b0781c-manish-kumars-projects-c42fb5fc.vercel.app`
- Status: ✅ Deployed and Running
- API Key: Already configured

**Frontend (To Deploy):**
- Root Directory: `client`
- Environment Variable: `VITE_API_URL` = your backend URL above
- Framework: Vite

---

**Ready to deploy?** Follow Method 1 above - it's the easiest! 🚀

