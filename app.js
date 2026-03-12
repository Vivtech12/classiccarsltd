/**
 * ================================================================
 * Classic Cars London — app.js
 * Classic Cars UK Ltd · Est. 2002
 * ================================================================
 *
 * ────────────────────────────────────────────────────────────────
 * AUTO TRADER CONNECT INTEGRATION NOTES
 * ────────────────────────────────────────────────────────────────
 * To integrate Auto Trader Connect (or any live stock feed):
 *
 * 1. Replace the `vehicleData` array below with data fetched from
 *    your Auto Trader Connect API endpoint, e.g.:
 *
 *      async function loadVehicles() {
 *        const response = await fetch('https://your-api-endpoint.com/vehicles');
 *        const data = await response.json();
 *        return data; // Map to the same schema as vehicleData below
 *      }
 *
 * 2. Each vehicle object should map to the same schema used below:
 *    { id, title, price, year, mileage, engine, gearbox, fuel,
 *      bodyType, image, autoTraderUrl }
 *
 * 3. Update the `autoTraderUrl` field for each vehicle with the
 *    real Auto Trader listing URL (e.g. https://www.autotrader.co.uk/car-details/...)
 *
 * 4. Call renderStock(vehicles) after fetching the data, replacing
 *    the renderStock(vehicleData) call at the bottom of this file.
 *
 * 5. Optionally add error handling and a loading state in the
 *    #stockGrid element while the API call resolves.
 * ────────────────────────────────────────────────────────────────
 */

'use strict';

/* ── Navigation: Scroll behaviour & Hamburger ─────────────────── */
(function initNav() {
  const nav = document.getElementById('mainNav');
  const hamburger = document.getElementById('navHamburger');
  const overlay = document.getElementById('navMobileOverlay');

  // Scroll class
  if (nav) {
    const onScroll = () => {
      if (window.scrollY > 20) {
        nav.classList.add('scrolled');
      } else {
        // Only remove on pages that start transparent (home)
        if (!document.body.classList.contains('stock-page')) {
          nav.classList.remove('scrolled');
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll(); // initial check
  }

  // Hamburger toggle
  if (hamburger && overlay) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      if (isOpen) {
        overlay.classList.add('open');
        document.body.style.overflow = 'hidden';
      } else {
        overlay.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }
})();

// Global close menu (called by inline onclick on overlay links)
function closeMenu() {
  const hamburger = document.getElementById('navHamburger');
  const overlay = document.getElementById('navMobileOverlay');
  if (hamburger) hamburger.classList.remove('open');
  if (overlay) overlay.classList.remove('open');
  document.body.style.overflow = '';
}

/* ── Hero background ──────────────────────────────────────────── */
(function initHero() {
  const heroBg = document.getElementById('heroBg');
  if (!heroBg) return;
  // Trigger the slow zoom-out after the image loads
  const img = new Image();
  img.onload = () => heroBg.classList.add('loaded');
  img.src = './assets/lambo-revuelto-purple.jpg';
})();

/* ── Scroll-triggered fade-in (IntersectionObserver) ─────────── */
(function initScrollAnimations() {
  const elements = document.querySelectorAll('.fade-in');
  if (!elements.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  elements.forEach((el) => observer.observe(el));
})();

/* ================================================================
   STOCK PAGE — Vehicle Data & Filtering
   ================================================================ */

/**
 * ────────────────────────────────────────────────────────────────
 * VEHICLE DATA — PLACEHOLDER
 * ────────────────────────────────────────────────────────────────
 * This array is the single source of truth for the stock listing.
 *
 * TO REPLACE WITH LIVE DATA:
 *   - Fetch from your Auto Trader Connect API (see header notes)
 *   - Or replace with your own CMS/back-end feed
 *   - Schema: { id, title, price, year, mileage, engine,
 *               gearbox, fuel, bodyType, image, autoTraderUrl }
 *
 * autoTraderUrl: Replace "#" with real listing URLs, e.g.:
 *   "https://www.autotrader.co.uk/car-details/YOUR_LISTING_ID"
 * ────────────────────────────────────────────────────────────────
 */
const vehicleData = [
  {
    id: 1,
    title: "McLaren Senna",
    price: 849995,
    year: 2019,
    mileage: 900,
    engine: "4.0L Twin-Turbo V8",
    gearbox: "SSG Automatic",
    fuel: "Petrol",
    bodyType: "Coupe",
    image: "./assets/mclaren-senna-front.jpg",
    autoTraderUrl: "#"
  },
  {
    id: 2,
    title: "Lamborghini Revuelto",
    price: 449995,
    year: 2024,
    mileage: 1200,
    engine: "6.5L V12 Hybrid",
    gearbox: "Automatic",
    fuel: "Hybrid",
    bodyType: "Coupe",
    image: "./assets/lambo-revuelto-purple.jpg",
    autoTraderUrl: "#"
  },
  {
    id: 3,
    title: "Ferrari Purosangue",
    price: 389995,
    year: 2024,
    mileage: 3500,
    engine: "6.5L V12",
    gearbox: "F1 Dual-Clutch",
    fuel: "Petrol",
    bodyType: "SUV",
    image: "./assets/ferrari-purosangue-front-manor.jpg",
    autoTraderUrl: "#"
  },
  {
    id: 4,
    title: "Ferrari 812 GTS",
    price: 329995,
    year: 2021,
    mileage: 6800,
    engine: "6.5L V12",
    gearbox: "F1 Dual-Clutch",
    fuel: "Petrol",
    bodyType: "Convertible",
    image: "./assets/ferrari-812gts-full.jpg",
    autoTraderUrl: "#"
  },
  {
    id: 5,
    title: "Porsche 911 GT3 RS (992)",
    price: 249995,
    year: 2023,
    mileage: 2100,
    engine: "4.0L Flat-6",
    gearbox: "PDK Automatic",
    fuel: "Petrol",
    bodyType: "Coupe",
    image: "./assets/porsche-gt3rs-yellow-showroom.jpg",
    autoTraderUrl: "#"
  },
  {
    id: 6,
    title: "Porsche 911 Turbo S (992)",
    price: 189995,
    year: 2022,
    mileage: 8200,
    engine: "3.8L Twin-Turbo Flat-6",
    gearbox: "PDK Automatic",
    fuel: "Petrol",
    bodyType: "Coupe",
    image: "./assets/porsche-911-turbo-s-silver.jpg",
    autoTraderUrl: "#"
  },
  {
    id: 7,
    title: "Rolls-Royce Wraith",
    price: 189995,
    year: 2020,
    mileage: 14500,
    engine: "6.6L Twin-Turbo V12",
    gearbox: "ZF Automatic",
    fuel: "Petrol",
    bodyType: "Coupe",
    image: "./assets/rolls-royce-wraith-blue.jpg",
    autoTraderUrl: "#"
  },
  {
    id: 8,
    title: "McLaren 600LT",
    price: 149995,
    year: 2019,
    mileage: 11400,
    engine: "3.8L Twin-Turbo V8",
    gearbox: "SSG Automatic",
    fuel: "Petrol",
    bodyType: "Coupe",
    image: "./assets/mclaren-600lt-green-front.jpg",
    autoTraderUrl: "#"
  }
];

/* ── Helpers ──────────────────────────────────────────────────── */
function formatPrice(price) {
  return '£' + price.toLocaleString('en-GB');
}

function formatMileage(mileage) {
  return mileage.toLocaleString('en-GB') + ' miles';
}

/* ── Spec icon SVGs ───────────────────────────────────────────── */
const icons = {
  calendar: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="4" width="18" height="18" rx="2"/><path d="M16 2v4M8 2v4M3 10h18"/></svg>`,
  speedometer: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M12 12m-9 0a9 9 0 1018 0 9 9 0 00-18 0"/><path d="M12 12L15.5 8"/><circle cx="12" cy="12" r="1" fill="currentColor"/></svg>`,
  engine: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><rect x="3" y="8" width="6" height="8" rx="1"/><path d="M9 12h6M15 9h2a2 2 0 012 2v2a2 2 0 01-2 2h-2"/><path d="M6 8V6M6 16v2"/></svg>`,
  gearbox: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><circle cx="5" cy="6" r="2"/><circle cx="12" cy="6" r="2"/><circle cx="19" cy="6" r="2"/><circle cx="5" cy="18" r="2"/><circle cx="12" cy="18" r="2"/><path d="M5 8v8M12 8v8M19 8v4"/></svg>`,
  fuel: `<svg class="spec-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" aria-hidden="true"><path d="M3 22V5a2 2 0 012-2h8a2 2 0 012 2v17"/><path d="M3 11h12M15 7h2a2 2 0 012 2v3a1 1 0 001 1h0a1 1 0 001-1V8l-2-2"/></svg>`
};

/* ── Render a single vehicle card ─────────────────────────────── */
function renderCard(vehicle) {
  const card = document.createElement('article');
  card.className = 'vehicle-card fade-in';
  card.setAttribute('data-id', vehicle.id);
  card.setAttribute('data-body', vehicle.bodyType);
  card.setAttribute('data-fuel', vehicle.fuel);
  card.setAttribute('data-price', vehicle.price);

  card.innerHTML = `
    <div class="vehicle-card__image-wrap">
      <img
        src="${vehicle.image}"
        alt="${vehicle.title}"
        loading="lazy"
        onerror="this.src='./assets/lambo-revuelto-purple.jpg'"
      />
      <span class="vehicle-card__badge">${vehicle.year}</span>
    </div>
    <div class="vehicle-card__body">
      <h3 class="vehicle-card__title">${vehicle.title}</h3>
      <p class="vehicle-card__price">${formatPrice(vehicle.price)}</p>

      <div class="vehicle-card__specs">
        <div class="spec-item">
          ${icons.calendar}
          <div>
            <span class="spec-label">Year</span>
            <span class="spec-value">${vehicle.year}</span>
          </div>
        </div>
        <div class="spec-item">
          ${icons.speedometer}
          <div>
            <span class="spec-label">Mileage</span>
            <span class="spec-value">${formatMileage(vehicle.mileage)}</span>
          </div>
        </div>
        <div class="spec-item">
          ${icons.engine}
          <div>
            <span class="spec-label">Engine</span>
            <span class="spec-value">${vehicle.engine}</span>
          </div>
        </div>
        <div class="spec-item">
          ${icons.gearbox}
          <div>
            <span class="spec-label">Gearbox</span>
            <span class="spec-value">${vehicle.gearbox}</span>
          </div>
        </div>
        <div class="spec-item">
          ${icons.fuel}
          <div>
            <span class="spec-label">Fuel</span>
            <span class="spec-value">${vehicle.fuel}</span>
          </div>
        </div>
      </div>

      <div class="vehicle-card__actions">
        <button class="btn btn-outline-gold btn-sm" onclick="handleViewDetails(${vehicle.id}, '${vehicle.title.replace(/'/g, "\\'")}')">
          View Details
        </button>
        <!--
          AUTO TRADER URL — Replace vehicle.autoTraderUrl with the real listing URL
          from Auto Trader Connect, e.g.:
          "https://www.autotrader.co.uk/car-details/YOUR_LISTING_ID"
        -->
        <a
          href="${vehicle.autoTraderUrl}"
          target="_blank"
          rel="noopener noreferrer"
          class="btn btn-outline btn-sm"
        >
          Auto Trader ↗
        </a>
      </div>
    </div>
  `;

  return card;
}

/* ── View Details handler ─────────────────────────────────────── */
function handleViewDetails(id, title) {
  // Placeholder: replace with a modal, detail page, or CRM link
  alert(`Enquire about: ${title}\n\nCall us on 020 8202 4059 or WhatsApp: +44 7447 015475`);
}

/* ── Render the stock grid ────────────────────────────────────── */
function renderStock(vehicles) {
  const grid = document.getElementById('stockGrid');
  const countEl = document.getElementById('stockCount');
  if (!grid) return;

  grid.innerHTML = '';

  if (vehicles.length === 0) {
    grid.innerHTML = '<p class="no-results">No vehicles match your search. <button class="filter-reset" onclick="resetFilters()">Clear filters</button></p>';
    if (countEl) countEl.textContent = '0 vehicles found';
    return;
  }

  vehicles.forEach((v) => {
    grid.appendChild(renderCard(v));
  });

  // Re-observe new elements for scroll animations
  initCardAnimations();

  if (countEl) {
    countEl.textContent = `${vehicles.length} vehicle${vehicles.length !== 1 ? 's' : ''} found`;
  }
}

/* ── Re-observe dynamically rendered cards ────────────────────── */
function initCardAnimations() {
  const newCards = document.querySelectorAll('.vehicle-card.fade-in:not(.observed)');
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -20px 0px' }
  );
  newCards.forEach((card, i) => {
    card.classList.add('observed');
    card.style.transitionDelay = `${(i % 3) * 0.08}s`;
    observer.observe(card);
  });
}

/* ── Filter logic ─────────────────────────────────────────────── */
function applyFilters() {
  const keyword    = (document.getElementById('filterKeyword')?.value || '').trim().toLowerCase();
  const minPrice   = parseFloat(document.getElementById('filterMinPrice')?.value || '0');
  const maxPrice   = parseFloat(document.getElementById('filterMaxPrice')?.value || 'Infinity');
  const bodyType   = document.getElementById('filterBodyType')?.value || 'All';
  const fuel       = document.getElementById('filterFuel')?.value || 'All';

  const results = vehicleData.filter((v) => {
    // Keyword filter
    if (keyword) {
      const searchStr = `${v.title} ${v.engine} ${v.fuel} ${v.gearbox} ${v.bodyType} ${v.year}`.toLowerCase();
      if (!searchStr.includes(keyword)) return false;
    }
    // Price filter
    if (v.price < minPrice) return false;
    if (v.price > maxPrice) return false;
    // Body type filter
    if (bodyType !== 'All' && v.bodyType !== bodyType) return false;
    // Fuel filter
    if (fuel !== 'All' && v.fuel !== fuel) return false;

    return true;
  });

  renderStock(results);
}

function resetFilters() {
  const kw = document.getElementById('filterKeyword');
  const min = document.getElementById('filterMinPrice');
  const max = document.getElementById('filterMaxPrice');
  const bt = document.getElementById('filterBodyType');
  const fu = document.getElementById('filterFuel');

  if (kw)  kw.value  = '';
  if (min) min.value = '0';
  if (max) max.value = 'Infinity';
  if (bt)  bt.value  = 'All';
  if (fu)  fu.value  = 'All';

  renderStock(vehicleData);
}

/* ── Live search on Enter key ─────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const kw = document.getElementById('filterKeyword');
  if (kw) {
    kw.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') applyFilters();
    });
  }
});

/* ── Init stock page if #stockGrid present ────────────────────── */
/*
 * ────────────────────────────────────────────────────────────────
 * AUTO TRADER CONNECT — INTEGRATION POINT
 * ────────────────────────────────────────────────────────────────
 * Replace the line below:
 *
 *   renderStock(vehicleData);
 *
 * with a fetch call like:
 *
 *   fetch('https://your-api.com/stock')
 *     .then(res => res.json())
 *     .then(data => renderStock(data))
 *     .catch(err => {
 *       console.error('Stock feed error:', err);
 *       renderStock(vehicleData); // fallback to static data
 *     });
 *
 * Ensure the API returns an array matching the vehicleData schema.
 * ────────────────────────────────────────────────────────────────
 */
if (document.getElementById('stockGrid')) {
  renderStock(vehicleData);
}
