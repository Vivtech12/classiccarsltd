/**
 * ================================================================
 * Classic Cars London — app.js
 * Classic Cars UK Ltd · Est. 2002
 * ================================================================
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
        if (!document.body.classList.contains('stock-page') &&
            !document.body.classList.contains('detail-page')) {
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
   VEHICLE DATA — Single Source of Truth
   ================================================================ */

const vehicleData = [
  {
    id: "ferrari-f8-tributo",
    title: "Ferrari F8 Tributo",
    year: 2021,
    reg: "31/03/2021",
    mileage: "12,547",
    engine: "3.9L Twin-Turbo V8",
    power: "710 bhp",
    gearbox: "7-Speed F1 DCT",
    fuel: "Petrol",
    bodyType: "Coupe",
    drive: "RHD",
    colour: "Viola Hong Kong",
    images: ["assets/ferrari-f8-viola-hong-kong.jpg", "assets/ferrari-f8-side-profile-right.jpg", "assets/ferrari-f8-side-profile-left.jpg", "assets/ferrari-f8-side-profile-right2.jpg", "assets/ferrari-f8-front-wheel.jpg", "assets/ferrari-f8-rear-quarter.jpg", "assets/ferrari-f8-rear-wheel.jpg", "assets/ferrari-f8-interior-door.jpg", "assets/ferrari-f8-interior-wide.jpg", "assets/ferrari-f8-steering-wheel.jpg", "assets/ferrari-f8-seats-console.jpg", "assets/ferrari-f8-sill-plate.jpg", "assets/ferrari-f8-tributo-spitfire.jpg", "assets/ferrari-f8-front-manor.jpg"],
    options: ["Carbon Fibre Front Spoiler","Carbon Fibre Side Air Splitter","Carbon Fibre Underdoor Cover","Carbon Fibre Engine Covers","Carbon Fibre Central Bridge","Carbon Fibre Rear Diffuser","Carbon Fibre Inner Sill Trim","Carbon Fibre Dashboard Inserts","Black Ceramic Exhaust Pipes","Glossy Black Exterior Sill Cover","Glossy Black Scuderia Shields","Matte Black Forged Racing Wheels 20\"","Red Brake Calipers","Adaptive Front Lights + SBL","Black Alcantara Headliner","Alcantara Dashboard Upper Part","Nero Alcantara Seats","Red Safety Belts","Leather Tunnel + Central Bridge","Full Electric Seats","Carbon Fibre Steering Wheel + LEDs","JBL Sound System","Front & Rear Parking Cameras","Cruise Control","Carbon Ceramic Brakes","Suspension Lifter","7-Year Maintenance Plan"],
    description: "Finished in the stunning and rare Viola Hong Kong, this 2021 Ferrari F8 Tributo is a truly special example. Powered by the award-winning 3.9-litre twin-turbocharged V8 producing 710 bhp, paired with the lightning-fast 7-speed F1 dual-clutch transmission. Extensively specified with a comprehensive carbon fibre package, Alcantara interior, and carbon ceramic brakes."
  },
  {
    id: "porsche-911-carrera-s",
    title: "Porsche 911 Carrera S Cabriolet",
    subtitle: "992",
    year: 2023,
    reg: "23/06/2023",
    mileage: "12,411",
    engine: "3.0L Twin-Turbo Flat-6",
    power: "450 bhp",
    gearbox: "8-Speed PDK",
    fuel: "Petrol",
    bodyType: "Cabriolet",
    drive: "RHD",
    colour: "Ruby Star Neo",
    images: ["assets/porsche-carrera-s-front.jpg", "assets/porsche-911-carrera-s-ruby-star.jpg", "assets/porsche-carrera-s-front-34.jpg", "assets/porsche-carrera-s-rear-34-right.jpg", "assets/porsche-carrera-s-rear-34-wide.jpg", "assets/porsche-carrera-s-rear-34-left.jpg", "assets/porsche-carrera-s-rear-34-wider.jpg", "assets/porsche-carrera-s-dead-rear.jpg", "assets/porsche-carrera-s-front-showroom.jpg", "assets/porsche-carrera-s-bonnet-crest.jpg", "assets/porsche-carrera-s-front-wheel.jpg", "assets/porsche-carrera-s-rear-wheel.jpg", "assets/porsche-carrera-s-1.jpg", "assets/porsche-carrera-s-2.jpg"],
    options: ["Ruby Star Neo Special Colour","Sport Chrono Package","PDLS Plus","PASM Sport Suspension (-10mm)","Sport Exhaust","14-Way Electric Sports Seats","Heated Steering Wheel","Lane Change Assist","Surround View","BOSE Surround Sound","Porsche Crest on Headrests","Adaptive Cruise Control","Night Vision Assist","Burmester High-End Surround Sound System","Power Steering Plus","Front Axle Lift System"],
    description: "A head-turning 2023 Porsche 911 Carrera S Cabriolet (992) in the incredibly rare Ruby Star Neo. This stunning convertible combines the iconic 3.0-litre twin-turbo flat-six with the joy of open-top motoring. Extensively optioned with Sport Chrono, PASM Sport Suspension, and the premium Burmester sound system."
  },
  {
    id: "porsche-911-carrera-4s",
    title: "Porsche 911 Carrera 4S",
    subtitle: "992",
    year: 2022,
    reg: "19/04/2022",
    mileage: "18,286",
    engine: "3.0L Twin-Turbo Flat-6",
    power: "450 bhp",
    gearbox: "8-Speed PDK",
    fuel: "Petrol",
    bodyType: "Coupe",
    drive: "RHD",
    colour: "Shark Blue",
    images: ["assets/porsche-911-carrera-4s-shark-blue.jpg", "assets/porsche-carrera-4s-side-profile-left.jpg", "assets/porsche-carrera-4s-side-profile-right.jpg", "assets/porsche-carrera-4s-rear-34.jpg", "assets/porsche-carrera-4s-rear-34-wide.jpg", "assets/porsche-carrera-4s-rear-34-close.jpg", "assets/porsche-carrera-4s-dead-rear.jpg", "assets/porsche-carrera-4s-front-quarter.jpg", "assets/porsche-carrera-4s-side-front-wheel.jpg", "assets/porsche-carrera-4s-rear-wheel.jpg", "assets/porsche-carrera-4s-interior-door.jpg", "assets/porsche-carrera-4s-dashboard.jpg", "assets/porsche-carrera-4s-1.jpg", "assets/porsche-carrera-4s-2.jpg", "assets/porsche-carrera-4s-3.jpg"],
    options: ["Shark Blue Special Colour","Sport Chrono Package","PDLS Plus","Rear Axle Steering","Sport Exhaust","PASM Sport Suspension (-10mm)","14-Way Electric Sports Seats Plus","Heated Multi-Function Steering Wheel","Lane Change Assist","Surround View","BOSE Surround Sound","Porsche Crest Embossed on Headrests","Front Axle Lift System","Power Steering Plus","Adaptive Cruise Control","Entry & Drive","Smoking Package","Ioniser","Carbon Interior Package","Sport Design Side Mirrors in Black","Tinted Taillights (Dark)"],
    description: "A striking 2022 Porsche 911 Carrera 4S (992) in the desirable Shark Blue. This all-wheel-drive 992 delivers thrilling performance through its 3.0-litre twin-turbo flat-six with 450 bhp. Comprehensively specified with over £29,000 of factory options including Sport Chrono, Rear Axle Steering, and the Carbon Interior Package."
  },
  {
    id: "rolls-royce-spectre",
    title: "Rolls-Royce Spectre",
    year: 2025,
    reg: "29/08/2025",
    mileage: "80",
    engine: "Dual Electric Motors",
    power: "577 bhp",
    gearbox: "Single-Speed Automatic",
    fuel: "Electric",
    bodyType: "Coupe",
    drive: "RHD",
    colour: "Salamanca Blue",
    images: ["assets/rolls-royce-spectre-1.jpg","assets/rolls-royce-spectre-2.jpg","assets/rolls-royce-spectre-3.jpg","assets/rolls-royce-spectre-4.jpg","assets/rolls-royce-spectre-5.jpg","assets/rolls-royce-spectre-6.jpg","assets/rolls-royce-spectre-7.jpg","assets/rolls-royce-spectre-8.jpg","assets/rolls-royce-spectre-9.jpg","assets/rolls-royce-spectre-10.jpg","assets/rolls-royce-spectre-11.jpg","assets/rolls-royce-spectre-12.jpg","assets/rolls-royce-spectre-blue-front.jpg"],
    options: ["Bespoke Audio System","Spirit of Ecstasy Illuminated","Starlight Headliner","Coach Doors","Shooting Star Headliner Lights","Salamanca Blue Exterior","Mandarin Interior Leather","Contrast Piping","Lambswool Floor Mats","Bespoke Tread Plates","23\" Forged Wheels","Panoramic Glass Roof","Night Vision","Head-Up Display","Rear Entertainment","Rear Champagne Cooler","Individual Rear Seats","Picnic Tables"],
    description: "The ultimate expression of electric luxury — a virtually brand-new 2025 Rolls-Royce Spectre with just 80 miles on the clock. Finished in the bespoke Salamanca Blue with a breathtaking Mandarin interior. This groundbreaking all-electric super coupe produces 577 bhp and features the legendary coach doors, Starlight Headliner, and an extraordinary level of bespoke specification."
  },
  {
    id: "lamborghini-urus",
    title: "Lamborghini Urus",
    subtitle: "V8",
    year: 2021,
    reg: "17/07/2021",
    mileage: "12,315",
    engine: "4.0L Twin-Turbo V8",
    power: "641 bhp",
    gearbox: "8-Speed Automatic",
    fuel: "Petrol",
    bodyType: "SUV",
    drive: "RHD",
    colour: "Nero Noctis (Satin Black)",
    images: ["assets/lambo-urus-2.jpg","assets/lambo-urus-3.jpg","assets/lambo-urus-4.jpg","assets/lambo-urus-6.jpg","assets/lambo-urus-7.jpg","assets/lambo-urus-black-rear.jpg","assets/lambo-urus-5.jpg","assets/lambo-urus-8.jpg","assets/lambo-urus-1.jpg","assets/lambo-urus-9.jpg","assets/lambo-urus-10.jpg"],
    options: ["Bang & Olufsen 3D Sound System","ANIMA Drive Mode Selector","Head-Up Display","Q Citura Stitching","23\" Taigete Forged Wheels in Black","Full Satin PPF","Massage Seats (Front)","Ventilated & Heated Seats","Rear Entertainment Screens","Orange Brake Calipers","Carbon Fibre Roof","Panoramic Glass Roof","Ambient Interior Lighting","Sensonum Sound System Upgrade","Full Body PPF (Satin)"],
    description: "A commanding 2021 Lamborghini Urus V8 in Nero Noctis with a full satin PPF and striking orange accents. This super-SUV combines 641 bhp from its 4.0-litre twin-turbo V8 with everyday practicality. Extensively optioned with the premium Bang & Olufsen sound system, massage seats, head-up display, and 23-inch forged wheels."
  },
  {
    id: "ferrari-488-pista",
    title: "Ferrari 488 Pista",
    year: 2020,
    reg: "01/09/2020",
    mileage: "4,000",
    engine: "3.9L Twin-Turbo V8",
    power: "710 bhp",
    gearbox: "7-Speed F1 DCT",
    fuel: "Petrol",
    bodyType: "Coupe",
    drive: "RHD",
    colour: "Rosso Fuoco (4-Layer)",
    status: "sold",
    images: [
      "assets/ferrari-488-pista/ferrari-488-pista-01.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-02.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-03.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-04.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-05.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-06.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-07.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-08.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-09.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-10.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-11.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-12.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-13.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-14.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-15.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-16.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-17.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-18.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-19.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-20.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-21.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-22.jpg",
      "assets/ferrari-488-pista/ferrari-488-pista-23.jpg"
    ],
    options: ["Rosso Fuoco 4-Layer Paint","Full Carbon Fibre Exterior Pack","Carbon Fibre Front Flaps","Carbon Fibre Side Flicks","Carbon Fibre Rear Diffuser","Carbon Fibre Engine Bay Covers","Carbon Fibre Central Bridge","Carbon Fibre Dashboard Inserts","Carbon Fibre Door Sills","Carbon Fibre Steering Wheel + LEDs","Nero Alcantara Interior","Alcantara Headliner","Racing Harness Prep","Lightweight Alcantara Door Panels","Full Electric Daytona-Style Seats","Red Safety Belts","Matte Black Forged Racing Wheels","Carbon Ceramic Brakes (CCM)","Suspension Lifter","Parking Camera","AFS Adaptive Front Lighting","Nero Roof","Scuderia Ferrari Shields","Sport Exhaust Pipes","JBL Sound System","Cruise Control","7-Year Genuine Maintenance"],
    description: "A breathtaking 2020 Ferrari 488 Pista in the magnificent four-layer Rosso Fuoco with a striking Nero roof. This is the ultimate expression of the 488 lineage — the lightest, most powerful, and most aerodynamically advanced V8 Ferrari ever produced at launch. With just 4,000 miles from new, this RHD example is finished with an extensive carbon fibre package, Alcantara-trimmed interior, carbon ceramic brakes, and the full complement of Pista-specific lightweight components. A true collector's piece."
  },
  {
    id: "sf90-stradale",
    title: "Ferrari SF90 Stradale",
    year: 2021,
    reg: "08/2021",
    mileage: "2,300",
    engine: "4.0L Twin-Turbo V8 + 3 Electric Motors",
    power: "986 bhp",
    gearbox: "8-Speed F1 DCT",
    fuel: "Petrol/Electric (PHEV)",
    bodyType: "Coupe",
    drive: "RHD",
    colour: "Argento Nürburgring / Nero Two-Tone",
    status: "sold",
    images: [
      "assets/sf90-stradale/sf90-stradale-01.jpg",
      "assets/sf90-stradale/sf90-stradale-02.jpg",
      "assets/sf90-stradale/sf90-stradale-03.jpg",
      "assets/sf90-stradale/sf90-stradale-04.jpg",
      "assets/sf90-stradale/sf90-stradale-05.jpg",
      "assets/sf90-stradale/sf90-stradale-06.jpg",
      "assets/sf90-stradale/sf90-stradale-07.jpg",
      "assets/sf90-stradale/sf90-stradale-08.jpg",
      "assets/sf90-stradale/sf90-stradale-09.jpg",
      "assets/sf90-stradale/sf90-stradale-10.jpg",
      "assets/sf90-stradale/sf90-stradale-11.jpg",
      "assets/sf90-stradale/sf90-stradale-12.jpg",
      "assets/sf90-stradale/sf90-stradale-13.jpg",
      "assets/sf90-stradale/sf90-stradale-14.jpg",
      "assets/sf90-stradale/sf90-stradale-15.jpg",
      "assets/sf90-stradale/sf90-stradale-16.jpg",
      "assets/sf90-stradale/sf90-stradale-17.jpg",
      "assets/sf90-stradale/sf90-stradale-18.jpg",
      "assets/sf90-stradale/sf90-stradale-19.jpg",
      "assets/sf90-stradale/sf90-stradale-20.jpg",
      "assets/sf90-stradale/sf90-stradale-21.jpg",
      "assets/sf90-stradale/sf90-stradale-22.jpg",
      "assets/sf90-stradale/sf90-stradale-23.jpg",
      "assets/sf90-stradale/sf90-stradale-24.jpg",
      "assets/sf90-stradale/sf90-stradale-25.jpg",
      "assets/sf90-stradale/sf90-stradale-26.jpg",
      "assets/sf90-stradale/sf90-stradale-27.jpg",
      "assets/sf90-stradale/sf90-stradale-28.jpg",
      "assets/sf90-stradale/sf90-stradale-29.jpg",
      "assets/sf90-stradale/sf90-stradale-30.jpg"
    ],
    options: ["Argento Nürburgring / Nero Two-Tone Livery","Fiorano Pack","Full Carbon Fibre Exterior Pack","Carbon Fibre Rear Spoiler","Carbon Fibre Side Skirts","Carbon Fibre Front Splitter","Carbon Fibre Mirror Caps","Carbon Fibre Engine Covers","Carbon Fibre Central Bridge","Carbon Fibre Dashboard Inserts","Carbon Fibre Door Sills","Carbon Fibre Steering Wheel + LEDs","Nero Alcantara Interior","Alcantara Headliner","Full Electric Daytona Seats","Titanium Exhaust","Matte Black Forged Wheels","Carbon Ceramic Brakes (CCM)","Front Suspension Lifter","Parking Camera","AFS Adaptive Front Lighting","Scuderia Ferrari Shields","JBL Sound System","Cruise Control","eManettino Drive Modes","All-Wheel Drive (RAC-e)"],
    description: "The most powerful Ferrari road car ever produced. This 2021 SF90 Stradale delivers an astonishing 986 bhp from its 4.0-litre twin-turbo V8 and three electric motors. Finished in the stunning Argento Nürburgring and Nero two-tone livery, this RHD example has covered a mere 2,300 miles. Specified with the desirable Fiorano Pack, full carbon fibre exterior and interior packages, titanium exhaust, and carbon ceramic brakes. A technological tour de force."
  },
  {
    id: "porsche-911-carrera-4s-pdk",
    title: "Porsche 911 Carrera 4S PDK",
    subtitle: "992",
    year: 2020,
    reg: "20/10/2020",
    mileage: "22,115",
    engine: "3.0L Twin-Turbo Flat-6",
    power: "450 bhp",
    gearbox: "8-Speed PDK",
    fuel: "Petrol",
    bodyType: "Coupe",
    drive: "RHD",
    colour: "Agate Grey Metallic",
    status: "sold",
    images: [
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-01.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-02.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-03.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-04.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-05.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-06.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-07.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-08.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-09.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-10.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-11.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-12.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-13.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-14.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-15.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-16.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-17.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-18.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-19.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-20.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-21.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-22.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-23.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-24.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-25.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-26.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-27.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-28.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-29.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-30.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-31.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-32.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-33.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-34.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-35.jpg",
      "assets/porsche-911-carrera-4s-pdk/porsche-911-carrera-4s-pdk-36.jpg"
    ],
    options: ["Agate Grey Metallic","Sport Chrono Package","PDLS Plus","PASM Sport Suspension (-10mm)","Sport Exhaust System","Rear Axle Steering","14-Way Electric Sports Seats Plus","Heated Steering Wheel","Heated Front Seats","Lane Change Assist","Surround View Cameras","BOSE Surround Sound System","Porsche Crest Embossed Headrests","Front Axle Lift System","Power Steering Plus","Adaptive Cruise Control","Entry & Drive System","Darkened Rear Lights","Sport Design Side Mirrors in Black","Privacy Glass","Smoking Package","LED Matrix Headlights (PDLS Plus)"],
    description: "A beautifully presented 2020 Porsche 911 Carrera 4S (992) in the ever-popular Agate Grey Metallic. This all-wheel-drive 992 delivers 450 bhp from its 3.0-litre twin-turbo flat-six through the silky 8-speed PDK gearbox. Generously specified with Sport Chrono, Rear Axle Steering, PASM Sport Suspension, and the Sport Exhaust system. A superb all-weather grand tourer with just 22,115 miles."
  },
  {
    id: "lamborghini-urus-s",
    title: "Lamborghini Urus S",
    subtitle: "4.0 V8 BiTurbo",
    year: 2023,
    reg: "26/07/2023",
    mileage: "14,464",
    engine: "4.0L Twin-Turbo V8",
    power: "666 bhp",
    gearbox: "8-Speed Automatic",
    fuel: "Petrol",
    bodyType: "SUV",
    drive: "RHD",
    colour: "Verde Aura (Dark Green)",
    status: "sold",
    images: [
      "assets/lamborghini-urus-s/lamborghini-urus-s-01.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-02.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-03.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-04.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-05.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-06.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-07.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-08.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-09.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-10.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-11.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-12.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-13.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-14.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-15.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-16.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-17.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-18.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-19.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-20.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-21.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-22.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-23.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-24.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-25.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-26.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-27.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-28.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-29.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-30.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-31.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-32.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-33.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-34.jpg",
      "assets/lamborghini-urus-s/lamborghini-urus-s-35.jpg"
    ],
    options: ["Verde Aura (Ad Personam Colour)","Full Leather Interior in Nero","Q Citura Stitching in Verde","Bang & Olufsen 3D Advanced Sound System","ANIMA Drive Mode Selector","Head-Up Display","23\" Leonis Forged Wheels in Gloss Black","Carbon Ceramic Brakes (CCB)","Green Brake Calipers","Panoramic Glass Roof","Ventilated & Heated Front Seats","Massage Seats (Front)","Rear Bench Heating","Privacy Glass","Ambient Interior Lighting","Full Body PPF","360° Surround View Camera","Adaptive Cruise Control","Lane Keeping Assist","Park Assist","Keyless Entry & Go","Power Tailgate","Roof Rails in Gloss Black","Nero Rear Diffuser"],
    description: "A commanding 2023 Lamborghini Urus S in the striking Ad Personam Verde Aura. This updated 'S' model produces an impressive 666 bhp from its 4.0-litre twin-turbo V8, with enhanced dynamics over the standard Urus. Finished in a rare deep green with contrasting Verde stitching throughout the Nero leather interior. Extensively specified with Bang & Olufsen sound, carbon ceramic brakes, panoramic roof, massage seats, and protected with a full body PPF. Just 14,464 miles."
  },
  {
    id: "porsche-911-gt3-992",
    title: "Porsche 911 GT3",
    subtitle: "992",
    year: 2021,
    reg: "25/08/2021",
    mileage: "9,190",
    engine: "4.0L Naturally Aspirated Flat-6",
    power: "503 bhp",
    gearbox: "7-Speed PDK",
    fuel: "Petrol",
    bodyType: "Coupe",
    drive: "RHD",
    colour: "Racing Yellow",
    status: "sold",
    images: [
      "assets/porsche-911-gt3/porsche-911-gt3-05.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-01.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-02.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-03.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-04.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-06.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-07.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-08.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-09.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-10.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-11.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-12.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-13.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-14.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-15.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-16.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-17.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-18.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-19.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-20.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-21.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-22.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-23.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-24.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-25.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-26.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-27.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-28.jpg",
      "assets/porsche-911-gt3/porsche-911-gt3-29.jpg"
    ],
    options: ["Racing Yellow","GT3 Clubsport Package","Front Axle Lift System","LED Matrix Headlights (PDLS Plus)","Sport Chrono Package","Rear Axle Steering","Extended Range Fuel Tank (90L)","14-Way Electric Sports Seats Plus","Heated Seats","Full Bucket Seat Option","Porsche Crest Embossed Headrests","GT3 Interior Package","Carbon Fibre Interior Trim","Alcantara Steering Wheel in Racing Yellow","Chrono Dial in Racing Yellow","Guards Yellow Seatbelts","Surround View Cameras","BOSE Surround Sound System","Adaptive Cruise Control","Entry & Drive","Privacy Glass","Carbon Ceramic Brakes (PCCB)","Centre Lock Wheels in Satin Black"],
    description: "The pinnacle of naturally aspirated Porsche engineering. This 2021 911 GT3 (992) in iconic Racing Yellow is powered by the legendary 4.0-litre flat-six producing 503 bhp, revving to a spine-tingling 9,000 rpm. With just 9,190 miles, this RHD example is specified with the Clubsport Package, carbon ceramic brakes, front axle lift, and the desirable extended range fuel tank. Interior highlights include yellow seatbelts, Alcantara steering wheel, and the full GT3 interior package. A modern-day Porsche icon."
  },
  {
    id: "ferrari-purosangue",
    title: "Ferrari Purosangue",
    subtitle: "6.5 V12",
    year: 2024,
    reg: "20/03/2024",
    mileage: "2,185",
    engine: "6.5L Naturally Aspirated V12",
    power: "715 bhp",
    gearbox: "8-Speed F1 DCT",
    fuel: "Petrol",
    bodyType: "SUV",
    drive: "RHD",
    colour: "Grigio Silverstone (Classic Paint)",
    status: "sold",
    images: [
      "assets/ferrari-purosangue/ferrari-purosangue-04.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-05.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-01.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-06.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-07.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-08.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-09.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-10.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-11.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-12.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-13.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-14.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-15.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-16.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-17.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-18.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-19.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-20.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-21.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-22.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-23.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-24.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-25.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-26.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-27.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-28.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-29.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-30.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-31.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-32.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-33.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-34.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-35.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-02.jpg",
      "assets/ferrari-purosangue/ferrari-purosangue-03.jpg"
    ],
    options: ["Grigio Silverstone Classic Paint","Full Carbon Fibre Exterior Pack","Carbon Fibre Front Splitter","Carbon Fibre Side Skirts","Carbon Fibre Rear Diffuser","Carbon Fibre Mirror Caps","Carbon Fibre Roof","Carbon Fibre Dashboard Inserts","Carbon Fibre Central Bridge","Carbon Fibre Door Sills","Carbon Fibre Steering Wheel + LEDs","Nero Leather Interior","Alcantara Headliner","Full Electric 4-Way Heated & Ventilated Seats","Rear Individual Heated Seats","JBL Professional Sound System","Yellow Brake Calipers","Carbon Ceramic Brakes (CCM)","Suspension Lifter","360° Parking Cameras","AFS Adaptive Front Lighting","Scuderia Ferrari Shields","Privacy Glass","Keyless Entry & Start","Rear Suicide Doors","Four-Wheel Drive","Active Suspension","7-Year Genuine Maintenance"],
    description: "Ferrari's extraordinary first four-door, four-seat grand tourer. This 2024 Purosangue is powered by the magnificent 6.5-litre naturally aspirated V12 producing 715 bhp — the most powerful engine ever fitted to a four-door Ferrari. Finished in the understated Grigio Silverstone Classic Paint with a comprehensive carbon fibre package and Nero leather interior. With just 2,185 miles and featuring rear suicide doors, all-wheel drive, active suspension, and carbon ceramic brakes, this is the ultimate expression of Ferrari versatility. A virtually new example of one of the most sought-after cars in the world."
  }
];

/* ── Helpers ──────────────────────────────────────────────────── */
function formatPrice() {
  return 'POA';
}

function formatMileage(mileage) {
  // mileage is already a formatted string like "12,547"
  return mileage + ' miles';
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

  const displayTitle = vehicle.subtitle
    ? `${vehicle.title} <span class="vehicle-card__subtitle">${vehicle.subtitle}</span>`
    : vehicle.title;

  const allImages = vehicle.images || [];
  const hasMultiple = allImages.length > 1;

  card.innerHTML = `
    <div class="vehicle-card__image-wrap">
      <a href="./vehicle-detail.html?id=${vehicle.id}" class="vehicle-card__img-link" aria-label="View ${vehicle.title}">
        <img
          class="vehicle-card__img"
          src="${allImages[0]}"
          alt="${vehicle.title}"
          loading="lazy"
          onerror="this.src='./assets/lambo-revuelto-purple.jpg'"
        />
      </a>
      <span class="vehicle-card__badge">${vehicle.year}</span>
      ${vehicle.status === 'sold' ? '<span class="vehicle-card__sold-badge">SOLD</span>' : ''}
      ${hasMultiple ? `
        <button class="vc-nav vc-nav--prev" aria-label="Previous image" onclick="cardSlide(this,-1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="15 18 9 12 15 6"/></svg>
        </button>
        <button class="vc-nav vc-nav--next" aria-label="Next image" onclick="cardSlide(this,1)">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="9 18 15 12 9 6"/></svg>
        </button>
        <span class="vc-counter"><span class="vc-counter__current">1</span> / ${allImages.length}</span>
      ` : ''}
    </div>
    <a href="./vehicle-detail.html?id=${vehicle.id}" class="vehicle-card__link" aria-label="View ${vehicle.title}">
      <div class="vehicle-card__body">
        <h3 class="vehicle-card__title">${displayTitle}</h3>
        <p class="vehicle-card__price">${vehicle.status === 'sold' ? 'SOLD' : 'POA'}</p>

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
            ${icons.fuel}
            <div>
              <span class="spec-label">Fuel</span>
              <span class="spec-value">${vehicle.fuel}</span>
            </div>
          </div>
          <div class="spec-item">
            ${icons.gearbox}
            <div>
              <span class="spec-label">Gearbox</span>
              <span class="spec-value">${vehicle.gearbox}</span>
            </div>
          </div>
        </div>
      </div>
    </a>
  `;

  // Store images data on the card element
  card._images = allImages;
  card._slideIndex = 0;

  return card;
}

/* ── Stock card carousel ─────────────────────────────────────── */
function cardSlide(btn, direction) {
  // Prevent click from navigating to detail page
  event.preventDefault();
  event.stopPropagation();

  const card = btn.closest('.vehicle-card');
  if (!card || !card._images) return;

  const total = card._images.length;
  card._slideIndex = ((card._slideIndex || 0) + direction + total) % total;

  const img = card.querySelector('.vehicle-card__img');
  const counter = card.querySelector('.vc-counter__current');

  if (img) img.src = card._images[card._slideIndex];
  if (counter) counter.textContent = card._slideIndex + 1;
}

/* ── Touch swipe support for stock cards ─────────────────────── */
function initCardSwipe(card) {
  if (!card._images || card._images.length <= 1) return;

  let startX = 0;
  let startY = 0;
  const imageWrap = card.querySelector('.vehicle-card__image-wrap');
  if (!imageWrap) return;

  imageWrap.addEventListener('touchstart', (e) => {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
  }, { passive: true });

  imageWrap.addEventListener('touchend', (e) => {
    const dx = e.changedTouches[0].clientX - startX;
    const dy = e.changedTouches[0].clientY - startY;
    if (Math.abs(dx) > 40 && Math.abs(dx) > Math.abs(dy)) {
      const total = card._images.length;
      card._slideIndex = ((card._slideIndex || 0) + (dx < 0 ? 1 : -1) + total) % total;
      const img = card.querySelector('.vehicle-card__img');
      const counter = card.querySelector('.vc-counter__current');
      if (img) img.src = card._images[card._slideIndex];
      if (counter) counter.textContent = card._slideIndex + 1;
    }
  }, { passive: true });
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
    const card = renderCard(v);
    grid.appendChild(card);
    initCardSwipe(card);
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
  const keyword  = (document.getElementById('filterKeyword')?.value || '').trim().toLowerCase();
  const bodyType = document.getElementById('filterBodyType')?.value || 'All';
  const fuel     = document.getElementById('filterFuel')?.value || 'All';

  const results = vehicleData.filter((v) => {
    // Keyword filter
    if (keyword) {
      const searchStr = `${v.title} ${v.subtitle || ''} ${v.engine} ${v.fuel} ${v.gearbox} ${v.bodyType} ${v.year} ${v.colour} ${v.power} ${v.description}`.toLowerCase();
      if (!searchStr.includes(keyword)) return false;
    }
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
  const bt = document.getElementById('filterBodyType');
  const fu = document.getElementById('filterFuel');

  if (kw) kw.value = '';
  if (bt) bt.value = 'All';
  if (fu) fu.value = 'All';

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
if (document.getElementById('stockGrid')) {
  renderStock(vehicleData);
}

/* ================================================================
   VEHICLE DETAIL PAGE
   ================================================================ */

function initDetailPage() {
  const container = document.getElementById('vehicleDetailRoot');
  if (!container) return;

  // Parse vehicle ID from URL
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const vehicle = vehicleData.find(v => v.id === id);

  if (!vehicle) {
    container.innerHTML = `
      <div class="vd-not-found">
        <div class="vd-not-found__inner">
          <h1>Vehicle Not Found</h1>
          <p>Sorry, we couldn't find this vehicle. It may have been sold.</p>
          <a href="./stock.html" class="vd-btn vd-btn--gold" style="margin-top:2rem;">Back to Stock</a>
        </div>
      </div>`;
    return;
  }

  // Update page title
  const titleSuffix = vehicle.subtitle ? ` ${vehicle.subtitle}` : '';
  document.title = `${vehicle.year} ${vehicle.title}${titleSuffix} | Classic Cars London`;

  // Update meta description
  const metaDesc = document.querySelector('meta[name="description"]');
  if (metaDesc) {
    metaDesc.setAttribute('content', `${vehicle.year} ${vehicle.title} — POA. ${vehicle.description.substring(0, 120)}...`);
  }

  const allImages = vehicle.images || [];

  // Build WhatsApp message
  const waMsg = encodeURIComponent(`Hi, I'm interested in the ${vehicle.year} ${vehicle.title}. Could you please provide more information?`);
  const waUrl = `https://wa.me/447447015475?text=${waMsg}`;

  // Build specs table rows
  const specsData = [
    { label: 'Year',            value: vehicle.year },
    { label: 'Registration',    value: vehicle.reg || '—' },
    { label: 'Mileage',         value: formatMileage(vehicle.mileage) },
    { label: 'Engine',          value: vehicle.engine },
    { label: 'Power',           value: vehicle.power || '—' },
    { label: 'Gearbox',         value: vehicle.gearbox },
    { label: 'Fuel Type',       value: vehicle.fuel },
    { label: 'Body Type',       value: vehicle.bodyType },
    { label: 'Colour',          value: vehicle.colour || '—' },
    { label: 'Drive',           value: vehicle.drive || '—' },
    { label: 'Price',           value: vehicle.status === 'sold' ? 'SOLD' : 'POA', highlight: true }
  ];

  const specsHtml = specsData.map(row => `
    <div class="vd-spec-row${row.highlight ? ' vd-spec-row--highlight' : ''}">
      <span class="vd-spec-label">${row.label}</span>
      <span class="vd-spec-value${row.highlight ? ' vd-spec-value--gold' : ''}">${row.value}</span>
    </div>
  `).join('');

  // Build options list
  const opts = vehicle.options || [];
  const optionsHtml = opts.length > 0
    ? `<div class="vd-options-grid">
        <ul class="vd-options-list">
          ${opts.map(o => `<li><span class="vd-opt-check">✓</span> ${o}</li>`).join('')}
        </ul>
      </div>`
    : '<p style="color:var(--text-secondary);">Options list not available.</p>';

  // Build thumbnail strip
  const thumbsHtml = allImages.map((img, i) => `
    <div class="vd-thumb${i === 0 ? ' active' : ''}" data-index="${i}" onclick="goToSlide(${i})">
      <img src="${img}" alt="${vehicle.title} thumbnail ${i + 1}" loading="lazy" />
    </div>
  `).join('');

  // Build display title
  const displayTitle = vehicle.subtitle
    ? `${vehicle.year} ${vehicle.title.toUpperCase()} <span class="vd-title-sub">${vehicle.subtitle.toUpperCase()}</span>`
    : `${vehicle.year} ${vehicle.title.toUpperCase()}`;

  // Key specs bar items
  const keySpecs = [
    { icon: icons.calendar, label: vehicle.year },
    { icon: icons.speedometer, label: formatMileage(vehicle.mileage) },
    { icon: icons.fuel, label: vehicle.fuel },
    { icon: icons.gearbox, label: vehicle.gearbox }
  ];

  const keySpecsHtml = keySpecs.map(s => `
    <div class="vd-key-spec">
      ${s.icon}
      <span>${s.label}</span>
    </div>
  `).join('');

  // Render the full detail page
  container.innerHTML = `
    <!-- Title Bar -->
    <div class="vd-title-bar">
      <div class="vd-title-bar__inner">
        <div class="vd-title-bar__left">
          <a href="./stock.html" class="vd-back-link">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
            Back to Stock
          </a>
          <h1 class="vd-title">${displayTitle}</h1>
        </div>
        <div class="vd-title-bar__right">
          <span class="vd-price-tag${vehicle.status === 'sold' ? ' vd-price-tag--sold' : ''}">${vehicle.status === 'sold' ? 'SOLD' : 'POA'}</span>
        </div>
      </div>
      <div class="vd-key-specs-bar">
        <div class="vd-key-specs-bar__inner">
          ${keySpecsHtml}
        </div>
      </div>
    </div>

    <!-- Main Content: Gallery + Specs -->
    <div class="vd-main">
      <div class="vd-main__inner">

        <!-- LEFT: Image Gallery -->
        <div class="vd-gallery">
          <div class="vd-gallery__main">
            <img id="vdMainImage" src="${allImages[0] || ''}" alt="${vehicle.title}" />
            ${allImages.length > 1 ? `
              <button class="vd-gallery__nav vd-gallery__nav--prev" onclick="changeSlide(-1)" aria-label="Previous image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
              </button>
              <button class="vd-gallery__nav vd-gallery__nav--next" onclick="changeSlide(1)" aria-label="Next image">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
              <div class="vd-gallery__counter"><span id="vdSlideNum">1</span> / ${allImages.length}</div>
            ` : ''}
          </div>
          ${allImages.length > 1 ? `
            <div class="vd-gallery__thumbs">
              ${thumbsHtml}
            </div>
          ` : ''}
        </div>

        <!-- RIGHT: Specs Panel -->
        <div class="vd-sidebar">
          <div class="vd-specs-panel">
            <h2 class="vd-specs-panel__heading">Vehicle Details</h2>
            ${specsHtml}
          </div>

          <div class="vd-actions">
            <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="vd-btn vd-btn--gold">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Enquire Now
            </a>
            <a href="tel:02082024059" class="vd-btn vd-btn--outline">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z"/></svg>
              Call Us
            </a>
            <a href="./stock.html" class="vd-btn vd-btn--outline vd-btn--back">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l4-4m0 0l4 4m-4-4v12M21 15l-4 4m0 0l-4-4m4 4V3"/></svg>
              Back to Stock
            </a>
          </div>
        </div>

      </div>
    </div>

    <!-- Tabs Section -->
    <div class="vd-tabs">
      <div class="vd-tabs__inner">
        <div class="vd-tab-nav" role="tablist">
          <button class="vd-tab-btn active" role="tab" aria-selected="true" onclick="switchTab('description', this)">Description</button>
          <button class="vd-tab-btn" role="tab" aria-selected="false" onclick="switchTab('options', this)">Options</button>
          <button class="vd-tab-btn" role="tab" aria-selected="false" onclick="switchTab('finance', this)">Finance</button>
        </div>

        <div class="vd-tab-panel active" id="tab-description">
          <div class="vd-description">
            <p>${vehicle.description}</p>
          </div>
        </div>

        <div class="vd-tab-panel" id="tab-options">
          <div class="vd-options-section">
            <p class="vd-options-intro">This vehicle is equipped with the following factory options and equipment:</p>
            ${optionsHtml}
          </div>
        </div>

        <div class="vd-tab-panel" id="tab-finance">
          <div id="finance-calculator" class="vd-finance-calc">
            <div class="vd-finance-iframe-wrap">
              <iframe src="https://pf1-prod.auf.co.uk/budget?id=VJfCw4VCnA" scrolling="no" frameborder="0" allowfullscreen></iframe>
            </div>
            <div class="vd-finance-contact">
              <p>Want a personalised quote? Get in touch:</p>
              <a href="tel:02082024059" class="vd-btn vd-btn--outline">Call 020 8202 4059</a>
              <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="vd-btn vd-btn--outline">WhatsApp Us</a>
            </div>
            <div class="vd-finance-disclaimer">
              <p>Classic Cars (UK) Limited T/A classiccarslondon is authorised and regulated by the Financial Conduct Authority. FRN (715677)</p>
              <p>Representative Example: Borrowing £7,500 over 4 years. Representative 19.9% APR fixed. Monthly payment £221.00. Total cost of credit £3,129. Total amount payable £10,629. Rates from 9.9% APR.</p>
              <p>We act as a credit broker not a lender. We work with a number of carefully selected credit providers who typically will be able to offer you finance for your purchase. (Written quotations available on request). Whichever lender we introduce you to, we will typically receive a fee from them (either a fixed fee or a percentage of the amount you borrow). The lenders we work with could pay commissions at different rates. All finance is subject to status and income. Terms and conditions apply. Applicants must be 18 years or over.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;

  // Init carousel state
  window._vdSlideIndex = 0;
  window._vdAllImages = allImages;
}

/* ── Gallery controls ─────────────────────────────────────────── */
function goToSlide(index) {
  const allImages = window._vdAllImages || [];
  const thumbs = document.querySelectorAll('.vd-thumb');
  const mainImage = document.getElementById('vdMainImage');
  const counter = document.getElementById('vdSlideNum');

  if (!allImages.length || !mainImage) return;

  // Clamp
  index = Math.max(0, Math.min(index, allImages.length - 1));
  window._vdSlideIndex = index;

  // Update main image
  mainImage.src = allImages[index];

  // Update thumbnail active state
  thumbs.forEach((t, i) => t.classList.toggle('active', i === index));
  if (counter) counter.textContent = index + 1;

  // Scroll active thumb into view
  const activeThumb = thumbs[index];
  if (activeThumb) {
    activeThumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }
}

function changeSlide(direction) {
  const allImages = window._vdAllImages || [];
  const total = allImages.length;
  if (!total) return;
  const newIndex = ((window._vdSlideIndex || 0) + direction + total) % total;
  goToSlide(newIndex);
}

/* ── Tab switching ────────────────────────────────────────────── */
function switchTab(tabId, btn) {
  document.querySelectorAll('.vd-tab-btn').forEach(b => {
    b.classList.remove('active');
    b.setAttribute('aria-selected', 'false');
  });
  document.querySelectorAll('.vd-tab-panel').forEach(p => p.classList.remove('active'));

  btn.classList.add('active');
  btn.setAttribute('aria-selected', 'true');
  const panel = document.getElementById(`tab-${tabId}`);
  if (panel) panel.classList.add('active');
}

/* ── Keyboard carousel support ───────────────────────────────── */
document.addEventListener('keydown', (e) => {
  if (!document.getElementById('vehicleDetailRoot')) return;
  if (e.key === 'ArrowLeft') changeSlide(-1);
  if (e.key === 'ArrowRight') changeSlide(1);
});

/* ── Init detail page if root element present ─────────────────── */
if (document.getElementById('vehicleDetailRoot')) {
  document.addEventListener('DOMContentLoaded', initDetailPage);
  if (document.readyState !== 'loading') initDetailPage();
}
