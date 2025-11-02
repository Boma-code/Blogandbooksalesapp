# Colin Stanley's Blog & Book Sales Platform

A modern, professional blog and book sales web application with Supabase integration for essay management, authentication, file storage, and crypto payments.

## 🚀 Features

- **Blog Management**: Create, edit, publish, and delete essays with rich text editor
- **Authentication**: Secure admin login/signup using Supabase Auth
- **File Storage**: Upload thumbnails, essay files, and eBooks to Supabase Storage
- **Search & Filter**: Search essays by title/keyword and filter by tags
- **Book Sales**: Sell "The African Powerhouse" eBook with USDT (TRC20) payments
- **Newsletter**: Email subscription system for updates
- **Contact Form**: Message submission with backend storage
- **Responsive Design**: Black, white, and gold theme - mobile-friendly

## 📋 Prerequisites

Your Supabase project is already configured with:
- **Project URL**: https://ldvafjgiqihdjxbwsjgj.supabase.co
- **Anon Key**: Already configured in the app

## 🔧 Setup Instructions

### 1. Upload Your eBook

To enable eBook downloads:

1. Go to your Supabase Dashboard: https://supabase.com/dashboard
2. Navigate to **Storage** in the sidebar
3. You should see a bucket named `make-69b1337c-ebooks` (created automatically)
4. Click on the bucket
5. Upload your PDF file: "The African Powerhouse.pdf"

### 2. Create Your Admin Account

1. Open the app
2. Click **Upload Essay** in the navigation
3. Click **Sign Up** at the bottom
4. Enter your details:
   - Name: Colin Stanley
   - Email: karimicolin254@gmail.com
   - Password: (choose a secure password)
5. After signup, click **Login** and enter your credentials

### 3. Publish Your First Essay

1. After logging in, you'll see the Admin Dashboard
2. Click **New Essay**
3. Fill in the form:
   - Title
   - Description
   - Content (supports HTML formatting)
   - Upload a thumbnail image
   - Add tags
   - Check "Publish immediately"
4. Click **Save Essay**

## 💾 Database Structure

The app uses Supabase's key-value store with these prefixes:

- `essay:{id}` - Essay data
- `newsletter:{email}` - Newsletter subscribers
- `contact:{id}` - Contact form submissions

## 🎨 Color Theme

- **Black** (`#000000`) - Primary background, text
- **White** (`#FFFFFF`) - Backgrounds, contrast
- **Gold/Yellow** (`#EAB308`) - Accents, CTAs, brand color

## 💰 Crypto Payment Setup

The book sells for **30 USDT (TRC20)** to wallet:
```
TSBGJuVMXhC2TPGse3g2ZW767zBMNDLzib
```

Current implementation:
- Shows payment modal with wallet address
- User confirms payment manually
- Downloads eBook after confirmation

**⚠️ Important**: This is a prototype. For production:
1. Integrate TronGrid API for automatic payment verification
2. Or use a payment processor like CoinPayments, NOWPayments, or Binance Pay
3. Store payment records in the database
4. Send confirmation emails

## 📧 Contact Information

- **Email**: karimicolin254@gmail.com
- **Twitter**: @karimicolin254

## 🔒 Security Notes

1. **Never share your Service Role Key** - it's already configured in Supabase Edge Functions
2. The frontend uses the **Anon Key** which is safe to expose
3. All admin operations require authentication
4. File uploads are private and use signed URLs

## 🚀 Deployment

This app is ready for deployment on:
- Vercel
- Netlify
- Any static hosting service

The Supabase backend is already live and configured.

## 📱 Usage Tips

### For Admin (You):
1. **Login** to access the admin dashboard
2. **Create essays** with rich content and images
3. **Publish/Unpublish** to control visibility
4. **Monitor views** on each essay
5. Upload the eBook PDF to Supabase Storage

### For Visitors:
1. **Browse essays** on the homepage
2. **Search and filter** by tags
3. **Read full essays** with view counter
4. **Subscribe** to newsletter
5. **Purchase book** with crypto payment
6. **Contact you** via contact form

## 🛠️ Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Supabase Edge Functions (Deno + Hono)
- **Database**: Supabase (PostgreSQL)
- **Storage**: Supabase Storage
- **Auth**: Supabase Auth
- **UI Components**: shadcn/ui
- **Icons**: Lucide React

## 📝 API Endpoints

All endpoints are prefixed with: `/make-server-69b1337c/`

- `GET /essays` - Get all essays
- `GET /essays/:id` - Get essay by ID (increments views)
- `POST /essays` - Create essay (auth required)
- `PUT /essays/:id` - Update essay (auth required)
- `DELETE /essays/:id` - Delete essay (auth required)
- `POST /upload` - Upload file (auth required)
- `POST /newsletter/subscribe` - Subscribe to newsletter
- `POST /contact` - Send contact message
- `GET /ebook/download` - Get eBook download URL

## 🎯 Next Steps

1. ✅ Upload your eBook PDF to Supabase Storage
2. ✅ Create your admin account
3. ✅ Write and publish your first essay
4. ⬜ Integrate real payment verification (optional)
5. ⬜ Set up email notifications (optional)
6. ⬜ Add analytics tracking (optional)

## 🐛 Troubleshooting

**Can't login?**
- Make sure you've created an account via Sign Up first
- Check console for error messages

**File upload not working?**
- Ensure you're logged in
- Check file size (max 50MB)
- Check file type (images, PDFs, DOCX, TXT)

**eBook download not working?**
- Make sure you've uploaded the PDF to the `make-69b1337c-ebooks` bucket in Supabase Storage

## 📄 License

© 2025 Colin Stanley | All Rights Reserved.
