# Colin Stanley's Blog & Book Platform

A modern, professional blog and book sales platform built with React, TypeScript, and Supabase. Features essay management, authentication, file storage, and cryptocurrency payments for selling "The African Powerhouse" eBook.

![Platform Preview](https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=1200&h=600&fit=crop)

## ✨ Features

### 📝 Essay Management
- Rich text editor with HTML support
- Create, edit, publish, and delete essays
- Upload thumbnails and attachments
- Tag-based organization
- View counter for analytics
- Search and filter functionality

### 🔐 Authentication
- Secure signup and login with Supabase Auth
- Protected admin routes
- Session management

### 📁 File Storage
- Upload essay thumbnails
- Attach downloadable files (PDF, DOCX, TXT)
- eBook storage for sales
- Secure signed URLs via Supabase Storage

### 💰 Book Sales
- Dedicated book promotion page
- USDT (TRC20) cryptocurrency payments
- Wallet: `TSBGJuVMXhC2TPGse3g2ZW767zBMNDLzib`
- Price: 30 USDT
- Automated eBook delivery

### 📧 Communication
- Newsletter subscription system
- Contact form with backend storage
- Email: karimicolin254@gmail.com
- Twitter: @karimicolin254

### 🎨 Design
- Modern black, white, and gold theme
- Fully responsive (mobile, tablet, desktop)
- Smooth animations and transitions
- Professional UI with shadcn/ui components

## 🚀 Live Demo

Visit the live platform: [Your deployment URL]

## 📋 Prerequisites

- Node.js 18+ (or use the deployed version)
- Supabase account (already configured)

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript
- **Styling**: Tailwind CSS v4
- **UI Components**: shadcn/ui
- **Backend**: Supabase Edge Functions (Deno + Hono)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Authentication**: Supabase Auth
- **Icons**: Lucide React
- **Notifications**: Sonner

## 📦 Installation

### Quick Start (Recommended)

The app is already deployed and running. Simply visit the URL and start using it!

### Local Development

If you want to run locally:

```bash
# This is a Figma Make project - already configured
# Just edit the components and see changes live
```

## ⚙️ Configuration

### Supabase Setup

The app is pre-configured with:
```
Project URL: https://ldvafjgiqihdjxbwsjgj.supabase.co
Anon Key: [Already configured]
```

### Required Setup Steps

1. **Upload eBook**:
   - Go to Supabase Dashboard → Storage
   - Open `make-69b1337c-ebooks` bucket
   - Upload "The African Powerhouse.pdf"

2. **Create Admin Account**:
   - Visit the app
   - Click "Upload Essay"
   - Click "Sign Up"
   - Use email: karimicolin254@gmail.com

3. **Start Publishing**:
   - Login to admin dashboard
   - Create and publish essays

## 📚 Usage

### For Administrators

1. **Access Admin Dashboard**
   - Click "Upload Essay" in navigation
   - Login with your credentials

2. **Create Essay**
   - Click "New Essay"
   - Fill in title, description, content
   - Upload thumbnail image
   - Add tags for categorization
   - Attach files if needed
   - Check "Publish immediately" or save as draft

3. **Manage Essays**
   - View all essays in dashboard
   - Edit existing content
   - Toggle publish/unpublish status
   - Delete essays
   - Monitor view counts

4. **View Analytics**
   - Check view counts per essay
   - Monitor newsletter subscriptions (in Supabase)
   - Review contact form submissions (in Supabase)

### For Visitors

1. **Browse Essays**
   - Homepage displays all published essays
   - Click any card to read full essay
   - Use search bar to find specific content
   - Filter by tags

2. **Purchase Book**
   - Click "My Book" in navigation
   - Read about "The African Powerhouse"
   - Click "Buy Now - 30 USDT"
   - Send USDT to provided TRC20 wallet
   - Confirm payment
   - Download eBook

3. **Stay Connected**
   - Subscribe to newsletter for updates
   - Use contact form to send messages
   - Follow on Twitter: @karimicolin254

## 🗂️ Database Structure

### KV Store Keys

- `essay:{id}` - Essay data with metadata
- `newsletter:{email}` - Newsletter subscriber info
- `contact:{id}` - Contact form submissions

### Storage Buckets

- `make-69b1337c-essays` - Essay file attachments
- `make-69b1337c-thumbnails` - Essay thumbnail images
- `make-69b1337c-ebooks` - Book PDF for sales

## 🔌 API Endpoints

Base URL: `https://ldvafjgiqihdjxbwsjgj.supabase.co/functions/v1/make-server-69b1337c`

### Public Endpoints

```
GET  /essays                    - Get all essays
GET  /essays/:id                - Get essay by ID (increments views)
POST /newsletter/subscribe      - Subscribe to newsletter
POST /contact                   - Send contact message
GET  /ebook/download            - Get eBook download URL
```

### Protected Endpoints (Require Authentication)

```
POST   /essays                  - Create new essay
PUT    /essays/:id              - Update essay
DELETE /essays/:id              - Delete essay
POST   /upload                  - Upload file
```

### Authentication Endpoints

```
POST /auth/signup               - Create admin account
POST /auth/login                - Login to admin account
```

## 🎨 Customization

### Colors

The theme uses:
- **Black** (`#000000`) - Primary backgrounds, text
- **White** (`#FFFFFF`) - Backgrounds, contrast
- **Gold** (`#EAB308` / `yellow-500`) - Accents, CTAs, brand

To customize, edit `styles/globals.css`

### Content

Update essay content through the admin dashboard or directly in the initial state in `App.tsx`

## 🔒 Security

- ✅ Service Role Key secured in backend (never exposed)
- ✅ Anon Key safe for frontend use
- ✅ All admin operations require authentication
- ✅ File uploads use private buckets with signed URLs
- ✅ CORS properly configured
- ✅ Input validation on all forms

## 📱 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🚀 Deployment

The app is already deployed and live! No additional deployment needed.

### For Future Updates

Simply edit the code in Figma Make and changes will be reflected automatically.

## 🐛 Troubleshooting

### Authentication Issues

**Can't login?**
- Ensure you created an account first (Sign Up)
- Check browser console for errors
- Verify Supabase is accessible

**Session expired?**
- Login again to refresh session
- Sessions persist in localStorage

### File Upload Issues

**Upload fails?**
- Ensure you're logged in
- Check file size (< 50MB recommended)
- Verify file type is supported
- Check Supabase Storage quota

**eBook download not working?**
- Verify PDF is uploaded to `make-69b1337c-ebooks` bucket
- Check Supabase Storage is accessible
- Ensure bucket permissions are correct

### Payment Issues

**Note**: Current implementation uses manual payment confirmation. For production:
- Integrate TronGrid API for automatic verification
- Or use payment processor (CoinPayments, NOWPayments)
- Store payment records in database

## 📈 Performance

- ⚡ Fast page loads with optimized images
- 📦 Code splitting for better performance
- 🎯 Lazy loading for images
- 💾 Efficient state management
- 🔄 Optimistic UI updates

## 🤝 Contributing

This is a personal project. For suggestions or issues, contact:
- Email: karimicolin254@gmail.com
- Twitter: @karimicolin254

## 📄 License

© 2025 Colin Stanley | All Rights Reserved.

## 🙏 Acknowledgments

- Built with [Figma Make](https://figma.com/make)
- UI components by [shadcn/ui](https://ui.shadcn.com)
- Icons by [Lucide](https://lucide.dev)
- Backend by [Supabase](https://supabase.com)
- Styled with [Tailwind CSS](https://tailwindcss.com)

## 📞 Support

For questions or support:
- 📧 Email: karimicolin254@gmail.com
- 🐦 Twitter: @karimicolin254
- 📖 Documentation: See SETUP.md

---

**Built with ❤️ by Colin Stanley**
