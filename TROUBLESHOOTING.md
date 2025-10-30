# Troubleshooting Guide

## Common Issues & Solutions

### 1. Development Server Crashes

**Issue**: `npm run dev` crashes or fails to start

**Solutions**:
```bash
# Clear Next.js cache
rm -rf .next
npm run dev

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install
npm run dev

# Check port availability (default 3000)
netstat -ano | findstr :3000
# Kill process if needed, then restart
```

### 2. Supabase Connection Issues

**Issue**: Database connection errors

**Solutions**:
- Verify `.env.local` has correct Supabase credentials
- Check Supabase project is active
- Run database setup script in Supabase SQL Editor

### 3. Build Errors

**Issue**: TypeScript or build errors

**Solutions**:
```bash
# Type check
npm run type-check

# Fix common issues
npm run lint --fix

# Clean build
rm -rf .next
npm run build
```

### 4. Authentication Issues

**Issue**: Login/signup not working

**Solutions**:
- Check Supabase Auth settings
- Verify callback URL in Supabase dashboard
- Clear browser cookies/localStorage

### 5. Styling Issues

**Issue**: Tailwind CSS not loading

**Solutions**:
- Restart development server
- Check `tailwind.config.js` paths
- Verify `globals.css` imports

## Quick Fixes

### Reset Development Environment
```bash
# Stop all processes
# Delete .next folder
# Reinstall dependencies
npm install
npm run dev
```

### Database Reset
```bash
# Re-run supabase-setup.sql in Supabase SQL Editor
# Check RLS policies are enabled
# Verify table permissions
```

### Environment Check
```bash
# Verify all required env vars are set
# Check .env.local exists and has correct values
# Restart server after env changes
```