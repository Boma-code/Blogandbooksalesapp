# Deployment Guide

This guide explains how to deploy your Colin Stanley Blog & Book Platform.

## 🎯 Current Status

✅ **Your app is already deployed and live!** 

The Figma Make platform automatically handles deployment. Your Supabase backend is configured and running.

## 🔧 Supabase Setup Checklist

### Essential Steps

- [ ] **Upload eBook PDF**
  1. Go to [Supabase Dashboard](https://supabase.com/dashboard/project/ldvafjgiqihdjxbwsjgj/storage/buckets)
  2. Navigate to Storage → Buckets
  3. Open `make-69b1337c-ebooks` bucket
  4. Upload "The African Powerhouse.pdf"

- [ ] **Create Admin Account**
  1. Visit your app
  2. Click "Upload Essay" in navigation
  3. Click "Sign Up"
  4. Register with karimicolin254@gmail.com
  5. Login to access admin dashboard

- [ ] **Publish First Essay**
  1. Login to admin dashboard
  2. Click "New Essay"
  3. Create and publish your first essay

### Optional Enhancements

- [ ] **Email Notifications** (Optional)
  - Configure SMTP in Supabase Auth settings
  - Enable email notifications for new signups
  - Set up password reset emails

- [ ] **Custom Domain** (Optional)
  - Contact Figma Make support for custom domain setup
  - Update DNS records as instructed
  - Configure SSL certificate

- [ ] **Analytics** (Optional)
  - Add Google Analytics tracking code
  - Set up conversion tracking for book purchases
  - Monitor traffic with Supabase analytics

## 🚀 Alternative Deployment Options

If you want to deploy elsewhere in the future, here are options:

### Option 1: Vercel (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Set environment variables in Vercel dashboard
```

**Environment Variables for Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL=https://ldvafjgiqihdjxbwsjgj.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=[your-anon-key]
```

### Option 2: Netlify

```bash
# Install Netlify CLI
npm i -g netlify-cli

# Build and deploy
netlify deploy --prod

# Set environment variables in Netlify dashboard
```

### Option 3: GitHub Pages

Not recommended for this app as it requires backend functionality.

## 🔐 Security Checklist

Before going live, ensure:

- [x] Service Role Key is never exposed in frontend
- [x] CORS is properly configured
- [x] File uploads are to private buckets
- [x] Authentication is required for admin routes
- [x] Input validation on all forms
- [x] Rate limiting on API endpoints (handled by Supabase)

## 📊 Monitoring

### Check Application Health

1. **Backend Health Check**
   ```
   https://ldvafjgiqihdjxbwsjgj.supabase.co/functions/v1/make-server-69b1337c/health
   ```
   Should return: `{"status":"ok"}`

2. **Database Connection**
   - Go to Supabase Dashboard → Database
   - Check connection status
   - Monitor query performance

3. **Storage Usage**
   - Go to Supabase Dashboard → Storage
   - Monitor bucket sizes
   - Check bandwidth usage

### Error Tracking

- Enable Supabase logs in dashboard
- Monitor Edge Function logs
- Check browser console for frontend errors

## 🔄 Updates & Maintenance

### How to Update Content

1. **Essays**: Use admin dashboard
2. **Book Info**: Edit `/components/BookPage.tsx`
3. **Contact Info**: Edit `/components/ContactPage.tsx`
4. **Styling**: Edit `/styles/globals.css`

### How to Update Code

Since you're using Figma Make:
1. Edit files directly in the interface
2. Changes are reflected immediately
3. No build or deployment step needed

### Backup Strategy

1. **Database Backups**
   - Supabase automatically backs up your database
   - Manual backups: Export from Supabase Dashboard

2. **Storage Backups**
   - Download important files periodically
   - Keep local copies of eBook and images

3. **Code Backups**
   - Figma Make maintains version history
   - Optional: Export code to GitHub

## 🌐 Custom Domain Setup

To use your own domain (e.g., colinstandley.com):

1. Purchase domain from registrar (Namecheap, GoDaddy, etc.)
2. Contact Figma Make support for custom domain
3. Update DNS records as instructed:
   ```
   Type: A
   Name: @
   Value: [Provided by Figma Make]
   
   Type: CNAME
   Name: www
   Value: [Provided by Figma Make]
   ```
4. Wait for DNS propagation (24-48 hours)
5. SSL certificate will be auto-configured

## 📈 Performance Optimization

Already implemented:
- ✅ Image optimization
- ✅ Code splitting
- ✅ Lazy loading
- ✅ Efficient state management
- ✅ CDN delivery via Supabase

Future optimizations:
- [ ] Add service worker for offline support
- [ ] Implement caching strategy
- [ ] Compress images further
- [ ] Enable HTTP/2

## 🐛 Troubleshooting Deployment

### Common Issues

**Issue**: Can't access admin dashboard
- **Solution**: Create account via Sign Up first

**Issue**: File uploads fail
- **Solution**: Check Supabase Storage quota in dashboard

**Issue**: eBook download doesn't work
- **Solution**: Ensure PDF is uploaded to correct bucket

**Issue**: Payment confirmation not working
- **Solution**: This is manual confirmation by design. For auto-verification, integrate TronGrid API

### Getting Help

- 📧 Email: karimicolin254@gmail.com
- 🐦 Twitter: @karimicolin254
- 📚 Supabase Docs: https://supabase.com/docs
- 💬 Figma Make Support: Contact through platform

## ✅ Launch Checklist

Before announcing your platform:

- [ ] Upload eBook to Supabase Storage
- [ ] Create admin account
- [ ] Publish at least 3 essays
- [ ] Test all features (signup, login, essay creation, book purchase)
- [ ] Verify eBook download works
- [ ] Test on mobile devices
- [ ] Check all links work
- [ ] Test contact form
- [ ] Test newsletter signup
- [ ] Verify crypto wallet address is correct
- [ ] Create social media posts
- [ ] Prepare launch announcement

## 🎉 Post-Launch

After launching:

1. **Monitor Performance**
   - Check Supabase dashboard daily for first week
   - Monitor view counts and engagement

2. **Engage with Audience**
   - Respond to contact form messages
   - Share new essays on Twitter
   - Send newsletter updates

3. **Iterate**
   - Gather user feedback
   - Make improvements based on usage
   - Add new features as needed

---

**Questions?** Contact karimicolin254@gmail.com
