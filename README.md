# Classic Cars London — Website Documentation

**Classic Cars UK Ltd** · Trading as Classic Cars London · Est. 2002

---

## Project Structure

```
classic-cars-london/
├── index.html      — Home page
├── stock.html      — Vehicle stock listing
├── style.css       — Global styles (all pages share this)
├── app.js          — JavaScript: navigation, animations, stock logic
└── README.md       — This file
```

---

## 1. Updating Contact Details, Address & Social Links

### Phone number
- **File:** `index.html` → search for `020 XXXX XXXX` (appears in the showroom section ~line 204 and in the footer ~line 273)
- **File:** `stock.html` → search for `020 XXXX XXXX` (footer ~line 131)
- **File:** `app.js` → search for `020 XXXX XXXX` (inside `handleViewDetails` ~line 285)

### Email address
- **File:** `index.html` → search for `info@classiccarslondon.com` (~line 205 and footer ~line 274)
- **File:** `stock.html` → search for `info@classiccarslondon.com` (~line 132)

### WhatsApp number
The WhatsApp number is embedded in all `wa.me` links. Search for `447447015475` across `index.html` and replace with your real number (format: country code without `+`, no spaces — e.g. `447911123456`).
- **File:** `index.html` → ~lines 62, 135, 175, 245

### Physical address
- **File:** `index.html` → search for `[Your Address Here]` (~line 204)

### Social handles (Instagram / TikTok)
- Both pages link to `https://instagram.com/classiccarsldn` and `https://tiktok.com/@classiccarsldn`
- Search and replace `classiccarsldn` with your actual handle across `index.html` and `stock.html`
- The handle text displayed to users also says `@classiccarsldn` — update those too

---

## 2. Vehicle Stock Data

### Where is it?
- **File:** `app.js`
- **Variable:** `vehicleData` (array declared around **line 115**)

### How to edit manually
Each vehicle is a JavaScript object in the array. Edit any field directly:
```js
{
  id: 1,
  title: "Lamborghini Huracán LP 610-4",
  price: 169995,           // number, no £ symbol
  year: 2016,
  mileage: 18500,          // number, no "miles"
  engine: "5.2L V10",
  gearbox: "Automatic",
  fuel: "Petrol",          // Petrol / Diesel / Hybrid / Electric
  bodyType: "Coupe",       // Coupe / Saloon / SUV / Convertible / Hatchback / Estate
  image: "https://...",    // direct image URL (Unsplash, your CDN, etc.)
  autoTraderUrl: "#"       // replace with real Auto Trader listing URL
}
```

Add new vehicles by appending objects to the array. Remove vehicles by deleting them from the array.

---

## 3. Auto Trader Connect Integration

The site is pre-structured to make API integration straightforward.

### Where to make the change
**File:** `app.js` — bottom of the file (~line 455–470)

**Current code (static):**
```js
if (document.getElementById('stockGrid')) {
  renderStock(vehicleData);
}
```

**Replace with (live API fetch):**
```js
if (document.getElementById('stockGrid')) {
  fetch('https://your-autotrader-connect-api-endpoint.com/vehicles')
    .then(res => res.json())
    .then(data => renderStock(data))
    .catch(err => {
      console.error('Stock feed error:', err);
      renderStock(vehicleData); // fallback to static data
    });
}
```

### Schema mapping
Your Auto Trader Connect API response should map to this schema:
```js
{
  id:           Number,   // unique identifier
  title:        String,   // e.g. "Porsche 911 Turbo S"
  price:        Number,   // numeric price in GBP, e.g. 189950
  year:         Number,   // e.g. 2021
  mileage:      Number,   // numeric mileage, e.g. 8200
  engine:       String,   // e.g. "3.8L Twin-Turbo Flat-6"
  gearbox:      String,   // e.g. "PDK Automatic"
  fuel:         String,   // "Petrol" | "Diesel" | "Hybrid" | "Electric"
  bodyType:     String,   // "Coupe" | "Saloon" | "SUV" | etc.
  image:        String,   // direct image URL
  autoTraderUrl: String   // full URL to the Auto Trader listing
}
```

If the API returns different field names, add a mapping step before `renderStock(data)`:
```js
.then(apiData => {
  const mapped = apiData.map(v => ({
    id:           v.listing_id,
    title:        v.make + ' ' + v.model,
    price:        v.price_gbp,
    // ... map all fields
    autoTraderUrl: `https://www.autotrader.co.uk/car-details/${v.listing_id}`
  }));
  renderStock(mapped);
})
```

### Auto Trader listing URLs
Each card has a "View on Auto Trader" button. The URL comes from `vehicle.autoTraderUrl` in the data.
- Currently set to `"#"` as a placeholder
- Replace with the real Auto Trader listing URL for each vehicle in the `vehicleData` array
- If using a live API, the URL will come directly from the feed

---

## 4. Replacing the Map Placeholder

**File:** `index.html` — search for `MAP EMBED` (~line 196)

To embed a real Google Map:
1. Go to [Google Maps](https://maps.google.com) and find your showroom location
2. Click **Share → Embed a map**
3. Copy the `<iframe>` code provided by Google
4. In `index.html`, replace the entire `<div class="map-placeholder">...</div>` block with your `<iframe>` code
5. Recommended: add a dark filter to match the site aesthetic:
   ```html
   <iframe
     src="https://www.google.com/maps/embed?pb=YOUR_CODE_HERE"
     width="100%"
     height="350"
     style="border:0; filter:grayscale(1) invert(0.9) contrast(1.1); display:block;"
     allowfullscreen=""
     loading="lazy"
     referrerpolicy="no-referrer-when-downgrade">
   </iframe>
   ```

---

## 5. Deploying to a Standard Web Host (cPanel / FTP)

### Via cPanel File Manager
1. Log in to your cPanel account
2. Open **File Manager** and navigate to `public_html/` (or a subdomain folder)
3. Click **Upload** and upload all files in this folder:
   - `index.html`
   - `stock.html`
   - `style.css`
   - `app.js`
4. Ensure `index.html` is at the root of `public_html/`
5. Visit your domain — the site is live

### Via FTP (FileZilla, Cyberduck, etc.)
1. Connect using your FTP credentials (host, username, password, port 21)
2. Navigate to `/public_html/` on the remote server
3. Drag and drop all site files from your local machine
4. Done — no build step required (plain HTML/CSS/JS)

### Notes
- No server-side code, database, or special server configuration required
- The site works on any basic shared hosting plan
- For best performance, enable **GZIP compression** and **browser caching** in cPanel (via `.htaccess`)

---

## Quick Reference

| Task | File | Search for |
|------|------|------------|
| Change phone number | `index.html`, `stock.html`, `app.js` | `020 XXXX XXXX` |
| Change email | `index.html`, `stock.html` | `info@classiccarslondon.com` |
| Change WhatsApp | `index.html` | `447447015475` |
| Change address | `index.html` | `[Your Address Here]` |
| Change social handles | `index.html`, `stock.html` | `classiccarsldn` |
| Edit vehicle data | `app.js` | `vehicleData` (line ~115) |
| Connect live stock API | `app.js` | `renderStock(vehicleData)` (line ~455) |
| Add Google Maps | `index.html` | `MAP EMBED` comment |

---

*Classic Cars UK Ltd — Registered in England & Wales*
