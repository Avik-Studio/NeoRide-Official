# Google Maps API Setup Instructions

## Step 1: Get Google Maps API Key

1. Go to the [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the following APIs:
   - Maps JavaScript API
   - Places API
   - Geocoding API
   - Directions API

4. Go to "Credentials" and create a new API key
5. Restrict the API key to your domain for security

## Step 2: Configure the API Key

1. Copy the `.env.example` file to `.env`:
   ```bash
   cp .env.example .env
   ```

2. Open the `.env` file and replace `your_google_maps_api_key_here` with your actual API key:
   ```
   VITE_GOOGLE_MAPS_API_KEY=your_actual_api_key_here
   ```

## Step 3: Restart the Development Server

After adding the API key, restart your development server:
```bash
npm run dev
```

## Features Enabled with Google Maps API

- Interactive map display
- Route visualization between pickup and destination
- Click-to-select locations on the map
- Real-time directions
- Location geocoding

## Fallback Mode

If no API key is configured, the application will show a fallback map preview with route information displayed in text format.

## Security Note

Never commit your actual API key to version control. The `.env` file is already included in `.gitignore`.