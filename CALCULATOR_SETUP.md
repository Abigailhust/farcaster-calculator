# Farcaster Calculator Mini-App

A simple, beautiful calculator built as a Farcaster Mini App using the MiniKit framework.

## Features

- ✨ Beautiful, responsive calculator interface
- 🔐 Farcaster authentication integration
- 🧮 Basic arithmetic operations (addition, subtraction, multiplication, division)
- 📱 Mobile-optimized design
- 🎨 Modern UI with gradient backgrounds and smooth animations
- 👤 User profile display after authentication

## Quick Start

The app is already configured and ready to run locally:

```bash
# Install dependencies (already done)
yarn install

# Start development server
yarn dev
```

The app will be available at `http://localhost:3000`

## For Farcaster Preview

To preview this app on Farcaster, you'll need to:

### 1. Set up a tunnel service
Use one of these services to expose your local development server:
- [NGROK](https://ngrok.com): `ngrok http 3000`
- [Local Tunnel](https://theboroer.github.io/localtunnel-www/): `npx localtunnel --port 3000`

### 2. Generate Farcaster Manifest
1. Visit [Warpcast Manifest Tool](https://warpcast.com/~/developers/mini-apps/manifest)
2. Enter your tunnel URL (e.g., `https://abc123.ngrok.io`)
3. Copy the generated manifest values

### 3. Update Environment Variables
Update your `.env.local` with the real values:

```bash
# Update with your tunnel URL
NEXT_PUBLIC_URL=https://your-tunnel-url.ngrok.io

# Update with generated manifest values
NEXT_PUBLIC_FARCASTER_HEADER=your-generated-header
NEXT_PUBLIC_FARCASTER_PAYLOAD=your-generated-payload
NEXT_PUBLIC_FARCASTER_SIGNATURE=your-generated-signature

# Get from https://neynar.com
NEYNAR_API_KEY=your-neynar-api-key

# Generate a secure random string
JWT_SECRET=your-secure-jwt-secret
```

### 4. Optional: Set up Redis (for notifications)
If you want to enable notifications:
1. Create a free Redis instance at [Upstash](https://upstash.com)
2. Update the Redis environment variables in `.env.local`

### 5. Test Your Mini App
1. Restart your development server: `yarn dev`
2. Visit your tunnel URL to test
3. The app should show proper Farcaster frame metadata
4. Test in Warpcast by sharing your tunnel URL

## App Structure

- **Calculator Component**: Main calculator interface with authentication
- **Farcaster Integration**: Proper frame metadata and manifest configuration
- **Authentication**: Uses Farcaster sign-in with user profile display
- **Responsive Design**: Works great on mobile and desktop

## Customization

The calculator is fully customizable:
- Colors and styling in `components/Calculator/index.tsx`
- Frame metadata in `app/page.tsx`
- Manifest details in `lib/warpcast.ts`

Enjoy calculating on Farcaster! 🧮✨