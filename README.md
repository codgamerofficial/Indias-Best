# India's Best - Education Platform

A comprehensive education platform built with Next.js and Supabase for finding colleges, scholarships, and educational opportunities in India.

## Setup Instructions

### 1. Install Dependencies
```bash
npm install
```

### 2. Supabase Setup
1. Create a new project at [supabase.com](https://supabase.com)
2. Go to Settings > API to get your project URL and anon key
3. Update `.env.local` with your Supabase credentials:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

### 3. Database Setup
1. Go to your Supabase project dashboard
2. Navigate to SQL Editor
3. Run the SQL commands from `supabase-setup.sql` to create tables and sample data

### 4. Run Development Server
```bash
npm run dev
```

## Features

- **College Search**: Search and filter colleges by name, type (government/private)
- **Scholarship Listings**: Browse available scholarships with eligibility criteria
- **Responsive Design**: Mobile-first design with dark mode support
- **Real-time Data**: Connected to Supabase for live data updates

## Tech Stack

- **Frontend**: Next.js 14, React, TypeScript
- **Styling**: Tailwind CSS
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (ready for implementation)

## API Endpoints

- `GET /api/colleges` - Fetch colleges with optional search and type filters
- `POST /api/colleges` - Add new college (admin only)
- `GET /api/scholarships` - Fetch all scholarships
- `POST /api/scholarships` - Add new scholarship (admin only)

## Database Schema

### Colleges
- id, name, type, location, description, rating, fees, courses, created_at

### Scholarships  
- id, title, description, amount, eligibility, deadline, provider, created_at

### Users
- id, email, full_name, avatar_url, created_at