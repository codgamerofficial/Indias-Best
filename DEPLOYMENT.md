# Deployment Guide

## Prerequisites
- Node.js 18+ installed
- Supabase account and project
- Vercel account (recommended) or other hosting platform

## Environment Setup

1. Copy `.env.example` to `.env.local`
2. Update with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key
   ```

## Database Setup

1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the commands from `supabase-setup.sql`

## Local Development

```bash
npm install
npm run dev
```

## Production Deployment

### Vercel (Recommended)
1. Connect your GitHub repository to Vercel
2. Add environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Manual Build
```bash
npm run build
npm start
```

## Health Check
Visit `/api/health` to verify deployment status

## Features Included
- ✅ Authentication system
- ✅ College search and filtering
- ✅ Scholarship listings
- ✅ Comparison tool
- ✅ User dashboard
- ✅ Responsive design
- ✅ SEO optimization
- ✅ PWA support