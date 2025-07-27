# Google Maps API Troubleshooting Guide

## Current Issue: Map not loading despite API key being set

### Step 1: Verify Environment Variables
1. Make sure you have a `.env` file (not `.env.example`) in the root directory
2. The file should contain:
   ```
   VITE_GOOGLE_MAPS_API_KEY=AIzaSyBijSpKeKls2NnnAV-S9BRIay897AIBGyg
   ```
3. Restart your development server after creating/modifying the `.env` file

### Step 2: Check Google Cloud Console Settings

#### Required APIs to Enable:
1. **Maps JavaScript API** - For displaying the map
2. **Places API** - For location search and autocomplete
3. **Geocoding API** - For converting addresses to coordinates
4. **Directions API** - For route calculation

#### How to Enable APIs:
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Select your project
3. Go to "APIs & Services" > "Library"
4. Search for each API above and click "Enable"

### Step 3: Check API Key Restrictions

#### Remove Restrictions (for testing):
1. Go to "APIs & Services" > "Credentials"
2. Click on your API key
3. Under "API restrictions", select "Don't restrict key" (temporarily)
4. Under "Application restrictions", select "None" (temporarily)
5. Save the changes

#### Proper Restrictions (for production):
- **Application restrictions**: HTTP referrers
- **Website restrictions**: Add your domain (e.g., `localhost:5173/*` for development)
- **API restrictions**: Select only the APIs you need

### Step 4: Verify Billing

Google Maps API requires billing to be enabled:
1. Go to "Billing" in Google Cloud Console
2. Make sure billing is enabled for your project
3. You get $200 free credits per month for Maps API

### Step 5: Test API Key

You can test your API key directly in the browser:
```
https://maps.googleapis.com/maps/api/js?key=AIzaSyBijSpKeKls2NnnAV-S9BRIay897AIBGyg&libraries=places
```

### Step 6: Check Browser Console

1. Open browser developer tools (F12)
2. Go to Console tab
3. Look for any error messages related to Google Maps
4. Common errors:
   - "This API project is not authorized to use this API"
   - "The provided API key is invalid"
   - "This API key is not authorized for this service"

### Step 7: Common Solutions

#### If you see "RefererNotAllowedMapError":
- Add your domain to API key restrictions
- For localhost: `localhost:5173/*`

#### If you see "ApiNotActivatedMapError":
- Enable the required APIs in Google Cloud Console

#### If you see "RequestDeniedMapError":
- Check if billing is enabled
- Verify API key is correct

### Step 8: Alternative Testing

If the issue persists, try this simple HTML test:
```html
<!DOCTYPE html>
<html>
<head>
    <title>Google Maps Test</title>
</head>
<body>
    <div id="map" style="height: 400px; width: 100%;"></div>
    <script>
        function initMap() {
            const map = new google.maps.Map(document.getElementById("map"), {
                zoom: 13,
                center: { lat: 28.6139, lng: 77.2090 },
            });
        }
    </script>
    <script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyBijSpKeKls2NnnAV-S9BRIay897AIBGyg&callback=initMap"></script>
</body>
</html>
```

### Next Steps:
1. Check browser console for specific error messages
2. Verify all required APIs are enabled
3. Ensure billing is enabled
4. Test with unrestricted API key first
5. Add proper restrictions once working