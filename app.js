const state = {
    lang: 'ro',
    city: 'bucuresti',
    weather: null,
    refreshInterval: null
};

// Data Store
const citiesData = {
    bucuresti: {
        id: 'bucuresti', name: 'București', icon: '🏛️', center: 'Piața Unirii, Victoriei', radius: '1 - 10 km', coords: { lat: 44.4268, lng: 26.1025 },
        zones: [
            { icon: '⭐', name: 'Zona Nord', desc: 'Floreasca, Dorobanți, Herăstrău (tips mari)' },
            { icon: '🏢', name: 'Zona Centru', desc: 'Universitate, Unirii, Romană (volum masiv)' }
        ],
        volumeZones: [ { icon: '🍔', name: 'Mall-uri', desc: 'AFI, Mega Mall, Promenada - ridicări rapide Multiple' } ],
        orderTypes: [
            { type: 'Scurtă', dist: '0.5 - 2 km', bike: '6-8/zi', car: '2-4/zi', freq: 'Frecvent' },
            { type: 'Medie', dist: '2 - 5 km', bike: '8-12/zi', car: '10-15/zi', freq: 'Foarte Frecvent' },
            { type: 'Lungă', dist: '5 - 10 km', bike: 'Rar', car: '12-18/zi', freq: 'Zilnic' }
        ],
        earnings: {
            bike: [ { hours: '4h', orders: '8 - 12', earning: '150 - 250 RON' }, { hours: '8h', orders: '16 - 24', earning: '250 - 400 RON' } ],
            car: [ { hours: '4h', orders: '6 - 10', earning: '120 - 200 RON' }, { hours: '8h', orders: '15 - 25', earning: '250 - 450 RON' } ]
        }
    },
    timisoara: {
        id: 'timisoara', name: 'Timișoara', icon: '🌹', center: 'Piața Unirii, Iulius Town', radius: '1 - 7 km', coords: { lat: 45.7489, lng: 21.2087 },
        zones: [ { icon: '⭐', name: 'Iulius Town', desc: 'Comenzi corporate, tips excelent' }, { icon: '🏢', name: 'Complex Studențesc', desc: 'Volum uriaș seara, distanțe scurte' } ],
        volumeZones: [ { icon: '🍔', name: 'Shopping City', desc: 'Food court aglomerat' } ],
        orderTypes: [
            { type: 'Scurtă', dist: '0.5 - 1.5 km', bike: '10-15/zi', car: '5-8/zi', freq: 'Frecvent' },
            { type: 'Medie', dist: '1.5 - 4 km', bike: '5-10/zi', car: '10-15/zi', freq: 'Foarte Frecvent' },
            { type: 'Lungă', dist: '4 - 7 km', bike: 'Rar', car: '5-12/zi', freq: 'Normal' }
        ],
        earnings: {
            bike: [ { hours: '4h', orders: '10 - 15', earning: '180 - 250 RON' }, { hours: '8h', orders: '20 - 28', earning: '300 - 450 RON' } ],
            car: [ { hours: '4h', orders: '8 - 12', earning: '150 - 220 RON' }, { hours: '8h', orders: '18 - 25', earning: '280 - 400 RON' } ]
        }
    },
    cluj: {
        id: 'cluj', name: 'Cluj-Napoca', icon: '🏔️', center: 'Piața Unirii, Iulius', radius: '1 - 8 km', coords: { lat: 46.7712, lng: 23.5901 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Restaurante premium' }, { icon: '🏢', name: 'Mărăști', desc: 'Studenți' } ],
        volumeZones: [ { icon: '🍔', name: 'VIVO!', desc: 'Preluări grupate' } ],
        orderTypes: [
            { type: 'Scurtă', dist: '1 - 2.5 km', bike: '12-18/zi', car: '4-8/zi', freq: 'Frecvent' },
            { type: 'Medie', dist: '2.5 - 5 km', bike: '4-8/zi', car: '12-20/zi', freq: 'Frecvent' },
            { type: 'Lungă', dist: '5+ km', bike: 'Evitat', car: '8-15/zi', freq: 'Normal' }
        ],
        earnings: {
            bike: [ { hours: '5h', orders: '12 - 18', earning: '200 - 300 RON' }, { hours: '10h', orders: '25 - 35', earning: '400 - 600 RON' } ],
            car: [ { hours: '5h', orders: '10 - 15', earning: '180 - 280 RON' }, { hours: '10h', orders: '20 - 30', earning: '350 - 550 RON' } ]
        }
    },
    iasi: {
        id: 'iasi', name: 'Iași', icon: '🏰', center: 'Palas, Copou', radius: '1 - 7 km', coords: { lat: 47.1585, lng: 27.5681 },
        zones: [ { icon: '⭐', name: 'Palas', desc: 'Corporate' }, { icon: '🏢', name: 'Copou', desc: 'Seara' } ],
        volumeZones: [ { icon: '🍔', name: 'Tudor', desc: 'Campus' } ],
        orderTypes: [ { type: 'Scurtă', dist: '1-3 km', bike: '8-12/zi', car: '6-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-6 km', bike: '5-8/zi', car: '10-16/zi', freq: 'Frecvent' }, { type: 'Lungă', dist: '6+ km', bike: 'Rar', car: '5-10/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '8-12', earning: '130-180 RON' }, { hours: '8h', orders: '16-24', earning: '250-350 RON' } ], car: [ { hours: '4h', orders: '8-10', earning: '120-160 RON' }, { hours: '8h', orders: '16-22', earning: '240-320 RON' } ] }
    },
    brasov: {
        id: 'brasov', name: 'Brașov', icon: '⛰️', center: 'AFI, Centru', radius: '1 - 8 km', coords: { lat: 45.6427, lng: 25.5887 },
        zones: [ { icon: '⭐', name: 'Centru Vechi', desc: 'Turiști, tips' }, { icon: '🏢', name: 'Coresi', desc: 'Rezidențial' } ],
        volumeZones: [ { icon: '🍔', name: 'AFI', desc: 'Food court' } ],
        orderTypes: [ { type: 'Scurtă', dist: '1-3 km', bike: 'E-Bike', car: '6-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-6 km', bike: 'E-Bike', car: '12-18/zi', freq: 'Foarte Frecvent' }, { type: 'Lungă', dist: '6+ km', bike: 'Nu', car: '5-12/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '8-12', earning: '150-220 RON' }, { hours: '8h', orders: '15-22', earning: '280-400 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '140-200 RON' }, { hours: '8h', orders: '16-24', earning: '260-380 RON' } ] }
    },
    sibiu: {
        id: 'sibiu', name: 'Sibiu', icon: '🏘️', center: 'Piața Mare', radius: '1 - 6 km', coords: { lat: 45.7983, lng: 24.1256 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Turiști' }, { icon: '🏢', name: 'Șelimbăr', desc: 'Comenzi mari' } ],
        volumeZones: [ { icon: '🍔', name: 'Promenada', desc: 'Ridicări grupate' } ],
        orderTypes: [ { type: 'Scurtă', dist: '1-2 km', bike: '10-15/zi', car: '5-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '2-5 km', bike: '5-10/zi', car: '10-15/zi', freq: 'Frecvent' }, { type: 'Lungă', dist: '5+ km', bike: 'Rar', car: '5-10/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '10-14', earning: '140-200 RON' }, { hours: '8h', orders: '20-25', earning: '260-350 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '130-180 RON' }, { hours: '8h', orders: '16-22', earning: '250-320 RON' } ] }
    },
    arad: {
        id: 'arad', name: 'Arad', icon: '🌉', center: 'Bulevardul Revoluției', radius: '1 - 5 km', coords: { lat: 46.1866, lng: 21.3123 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Restaurante' }, { icon: '🏢', name: 'Micalaca', desc: 'Cartier dens' } ],
        volumeZones: [ { icon: '🍔', name: 'Atrium', desc: 'Fast food' } ],
        orderTypes: [ { type: 'Scurtă', dist: '1-3 km', bike: '10-16/zi', car: '6-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-5 km', bike: '5-8/zi', car: '10-15/zi', freq: 'Frecvent' }, { type: 'Lungă', dist: '5+ km', bike: 'Rar', car: '4-8/zi', freq: 'Rar' } ],
        earnings: { bike: [ { hours: '4h', orders: '10-15', earning: '130-180 RON' }, { hours: '8h', orders: '20-28', earning: '250-330 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '120-170 RON' }, { hours: '8h', orders: '16-24', earning: '230-310 RON' } ] }
    },
    oradea: {
        id: 'oradea', name: 'Oradea', icon: '♨️', center: 'Piața Unirii', radius: '1 - 6 km', coords: { lat: 47.0465, lng: 21.9189 },
        zones: [ { icon: '⭐', name: 'Piața Unirii', desc: 'Restaurante premium' }, { icon: '🏢', name: 'Nufărul', desc: 'Distanțe medii' } ],
        volumeZones: [ { icon: '🍔', name: 'Lotus Center', desc: 'Ridicări multiple' } ],
        orderTypes: [ { type: 'Scurtă', dist: '1-2.5 km', bike: '12-18/zi', car: '5-10/zi', freq: 'Foarte Frecvent' }, { type: 'Medie', dist: '2.5-5 km', bike: '5-10/zi', car: '12-18/zi', freq: 'Frecvent' }, { type: 'Lungă', dist: '5+ km', bike: 'Rar', car: '5-10/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '12-16', earning: '150-200 RON' }, { hours: '8h', orders: '24-30', earning: '280-380 RON' } ], car: [ { hours: '4h', orders: '10-14', earning: '140-190 RON' }, { hours: '8h', orders: '20-26', earning: '260-350 RON' } ] }
    },
    'targu-mures': {
        id: 'targu-mures', name: 'Târgu Mureș', icon: '🌷', center: 'Centru', radius: '1 - 5 km', coords: { lat: 46.5425, lng: 24.5575 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Restaurante' }, { icon: '🏢', name: 'Tudor', desc: 'Cartierul mare' } ],
        volumeZones: [ { icon: '🍔', name: 'Shopping City', desc: 'Volum bun' } ],
        orderTypes: [ { type: 'Scurtă', dist: '1-3 km', bike: '10-15/zi', car: '5-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-5 km', bike: '5-8/zi', car: '10-15/zi', freq: 'Frecvent' }, { type: 'Lungă', dist: '5+ km', bike: 'Rar', car: '4-8/zi', freq: 'Rar' } ],
        earnings: { bike: [ { hours: '4h', orders: '10-14', earning: '120-170 RON' }, { hours: '8h', orders: '20-26', earning: '230-310 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '110-160 RON' }, { hours: '8h', orders: '16-22', earning: '220-300 RON' } ] }
    },
    ploiesti: {
        id: 'ploiesti', name: 'Ploiești', icon: '🛢️', center: 'AFI, Centru', radius: '1 - 6 km', coords: { lat: 44.9367, lng: 26.0125 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Restaurante diverse' }, { icon: '🏢', name: 'Republicii', desc: 'Cartiere mari' } ],
        volumeZones: [ { icon: '🍔', name: 'AFI', desc: 'Zonă de flux' } ],
        orderTypes: [ { type: 'Scurtă', dist: '1-2.5 km', bike: '10-15/zi', car: '6-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '2.5-5 km', bike: '5-10/zi', car: '10-16/zi', freq: 'Frecvent' }, { type: 'Lungă', dist: '5+ km', bike: 'Rar', car: '5-10/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '10-14', earning: '130-180 RON' }, { hours: '8h', orders: '20-25', earning: '240-330 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '120-170 RON' }, { hours: '8h', orders: '16-24', earning: '230-320 RON' } ] }
    },
    constanta: {
        id: 'constanta', name: 'Constanța', icon: '⚓', center: 'Tomis, City Park', radius: '1 - 8 km', coords: { lat: 44.1792, lng: 28.6499 },
        zones: [ { icon: '⭐', name: 'Mamaia (Vara)', desc: 'Tips uriaș, noapte' }, { icon: '🏢', name: 'Faleza Nord', desc: 'Zone premium' } ],
        volumeZones: [ { icon: '🍔', name: 'City Park', desc: 'Volum stabil' } ],
        orderTypes: [ { type: 'Scurtă', dist: '1-3 km', bike: '12-18/zi', car: '5-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-6 km', bike: '5-10/zi', car: '12-18/zi', freq: 'Frecvent' }, { type: 'Lungă', dist: '6+ km', bike: 'Rar', car: '6-12/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '12-16', earning: '160-220 RON' }, { hours: '8h', orders: '24-30', earning: '300-420 RON' } ], car: [ { hours: '4h', orders: '10-14', earning: '150-200 RON' }, { hours: '8h', orders: '20-28', earning: '280-380 RON' } ] }
    }
};

const commonData = {
    gold: [
        { sit: 'Ploaie / Ninsoare', bonus: '+20-40%', det: 'Multiplicator dinamic pe aplicație + tips cash mărit.' },
        { sit: 'Vineri - Duminică seara', bonus: '+30%', det: 'Cea mai aglomerată perioadă (18:00 - 22:00).' },
        { sit: 'Meciuri / Sărbători', bonus: 'Max', det: 'Cerere uriașă de fast-food.' }
    ],
    strategy: [
        { title: 'Prânz (11:30 - 14:00)', desc: 'Stai lângă zone de birouri. Comenzi multe dar scurte.' },
        { title: 'După-masă (14:30 - 17:00)', desc: 'Tranziție spre Mall-uri / Fast-food.' },
        { title: 'Seara (18:30 - 21:30)', desc: 'Vânează restaurante premium. Tips-ul este cel mai mare aici.' }
    ],
    rules: [
        { act: 'Ai grijă la geantă', res: 'Folosește întotdeauna izolarea termică. Clientul taxează mâncarea rece.' },
        { act: 'Sună o singură dată', res: 'Dacă nu răspunde, dă SMS, așteaptă 2 min. Respectă protocolul platformei.' },
        { act: 'Verifică băuturile', res: '90% din rating-urile slabe vin de la băuturi uitate sau vărsate.' }
    ],
    mistakes: [
        { mis: 'Stai în fața unui singur restaurant', res: 'Aplicația preferă curierii în mișcare (chiar și ușoară).' },
        { mis: 'Anulezi comenzi', res: 'Îți scade rata de acceptare, iar algoritmul îți va da comenzi mai puține.' }
    ],
    progression: [
        { level: 1, title: 'Rookie (Lună 1)', desc: 'Învață zonele și scurtăturile. Nu te stresa pe viteză, focusează-te pe livrări sigure.' },
        { level: 2, title: 'Avansat (Luna 2-3)', desc: 'Începi să recunoști clienții recurenți și să faci o medie bună per oră.' },
        { level: 3, title: 'Veteran (Luna 3-6)', desc: 'Ai strategia ta. Știi ce comenzi aduc bacșiș și ce zone să eviți.' },
        { level: 4, title: 'PRO / Top 10%', desc: 'Venit maxim. Echipament complet, folosești multiplicatorii.' }
    ]
};

// Logic
document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadCity(state.city);
});

function bindEvents() {
    document.querySelectorAll('.city-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const cityId = e.currentTarget.dataset.city;
            document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
            e.currentTarget.classList.add('active');
            if (window.innerWidth <= 768) toggleMobileMenu(false);
            loadCity(cityId);
        });
    });
    
    // UI toggles
    document.getElementById('mobile-menu-btn').addEventListener('click', () => toggleMobileMenu(true));
    document.getElementById('sidebar-overlay').addEventListener('click', () => toggleMobileMenu(false));
    
    const langBtn = document.getElementById('lang-btn');
    const langDrop = document.getElementById('lang-dropdown');
    langBtn.addEventListener('click', () => langDrop.classList.toggle('show'));
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.language-selector')) langDrop.classList.remove('show');
    });
}

function toggleMobileMenu(force) {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('city-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (force) {
        btn.classList.add('active'); sidebar.classList.add('show'); overlay.classList.add('show');
    } else {
        btn.classList.remove('active'); sidebar.classList.remove('show'); overlay.classList.remove('show');
    }
}

function loadCity(cityId) {
    state.city = cityId;
    const data = citiesData[cityId];
    if (!data) return;
    
    // Header
    document.getElementById('city-display-name').innerText = data.name;
    document.getElementById('center-name').innerHTML = `<span class="meta-icon">📍</span> <span class="meta-text">Centru: ${data.center}</span>`;
    document.getElementById('city-radius').innerHTML = `<span class="meta-icon">📏</span> <span class="meta-text">Rază: ${data.radius}</span>`;
    
    // Update Live Metrics (Weather + Events) + Auto Refresh
    fetchLiveMetrics(data.coords.lat, data.coords.lng, cityId);
    if (state.refreshInterval) clearInterval(state.refreshInterval);
    state.refreshInterval = setInterval(() => {
        fetchLiveMetrics(data.coords.lat, data.coords.lng, cityId);
    }, 5 * 60 * 1000); // 5 min interval
    
    // Insert Tables/Cards
    document.getElementById('tbody-order-types').innerHTML = data.orderTypes.map(ot => `<tr><td><strong>${ot.type}</strong></td><td>${ot.dist}</td><td>${ot.bike}</td><td>${ot.car}</td><td>${ot.freq}</td></tr>`).join('');
    document.getElementById('tbody-earnings-bike').innerHTML = data.earnings.bike.map(e => `<tr><td>${e.hours}</td><td>${e.orders}</td><td><strong>${e.earning}</strong></td></tr>`).join('');
    document.getElementById('tbody-earnings-car').innerHTML = data.earnings.car.map(e => `<tr><td>${e.hours}</td><td>${e.orders}</td><td><strong>${e.earning}</strong></td></tr>`).join('');
    document.getElementById('tbody-gold').innerHTML = commonData.gold.map(g => `<tr><td><strong>${g.sit}</strong></td><td style="color:var(--accent); font-weight:700;">${g.bonus}</td><td>${g.det}</td></tr>`).join('');
    
    // Zones
    document.getElementById('zones-grid').innerHTML = data.zones.map(z => `<div class="zone-item"><span class="zone-icon">${z.icon}</span><div class="zone-details"><h4>${z.name}</h4><p>${z.desc}</p></div></div>`).join('');
    document.getElementById('zones-volume').innerHTML = data.volumeZones.map(z => `<div class="zone-item volume-zone" style="margin-top: 16px;"><span class="zone-icon">${z.icon}</span><div class="zone-details"><h4>${z.name} (Volum Ridicat)</h4><p>${z.desc}</p></div></div>`).join('');
    
    // Global Strategy
    document.getElementById('strategy-timeline').innerHTML = commonData.strategy.map((s, i) => `<div class="timeline-item"><div class="timeline-dot">${i+1}</div><div class="timeline-content"><h4>${s.title}</h4><p>${s.desc}</p></div></div>`).join('');
    document.getElementById('rules-list').innerHTML = commonData.rules.map(r => `<div class="rule-item"><span class="rule-icon">✅</span><div class="rule-text"><h4>${r.act}</h4><p>${r.res}</p></div></div>`).join('');
    document.getElementById('mistakes-list').innerHTML = commonData.mistakes.map(m => `<div class="mistake-item"><span class="rule-icon">❌</span><div class="rule-text"><h4>${m.mis}</h4><p>${m.res}</p></div></div>`).join('');
    document.getElementById('progression-levels').innerHTML = commonData.progression.map((p, i) => `<div class="level-card level-${p.level}"><div class="level-icon">${i===0?'🚲':i===1?'🚀':i===2?'💎':'👑'}</div><h4>${p.title}</h4><p>${p.desc}</p></div>`).join('');
}

// Live API Logic (Weather + Events)
async function fetchLiveMetrics(lat, lng, cityId) {
    const el = document.getElementById('live-dashboard-container');
    if (!el) return;
    
    el.innerHTML = '<div class="live-dashboard"><p>Se calculează metricile live...</p></div>';
    
    try {
        const urlW = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&hourly=weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        const resW = await fetch(urlW);
        const wData = await resW.json();
        
        let eData = {};
        try {
            const resE = await fetch('events-live.json?t=' + Date.now());
            eData = await resE.json();
        } catch(e) { console.warn("No events file found or parsing error"); }
        
        const cityEvents = eData[cityId] || [];
        calculateAndRenderLiveDashboard(wData, cityEvents, el);
    } catch (err) {
        console.error("Live metrics fetch error", err);
        el.innerHTML = '<div class="live-dashboard"><p>Datele live indisponibile momentan.</p></div>';
    }
}

function getWeatherIcon(code) {
    if (code === 0) return '☀️'; // Clear
    if (code >= 1 && code <= 3) return '⛅'; // Partly cloudy
    if (code >= 45 && code <= 48) return '🌫️'; // Fog
    if (code >= 51 && code <= 67) return '🌧️'; // Rain
    if (code >= 71 && code <= 77) return '❄️'; // Snow
    if (code >= 80 && code <= 82) return '🌦️'; // Showers
    if (code >= 95 && code <= 99) return '⛈️'; // ThunderStorm
    return '☁️';
}

function getWeatherDesc(code) {
    if (code === 0) return 'Senin';
    if (code >= 1 && code <= 3) return 'Parțial noros';
    if (code >= 45 && code <= 48) return 'Ceață / Vizibilitate redusă';
    if (code >= 51 && code <= 67) return 'Ploaie';
    if (code >= 71 && code <= 77) return 'Ninsoare';
    if (code >= 80 && code <= 82) return 'Averse de ploaie';
    if (code >= 95 && code <= 99) return 'Furtună';
    return 'Noros';
}

function calculateAndRenderLiveDashboard(wData, cityEvents, el) {
    const cur = wData.current;
    if (!cur) return;
    
    const h = new Date().getHours();
    
    // 1. Base Demand per hour
    let baseDemand = 30; // default low
    if (h >= 11 && h <= 14) baseDemand = 50;
    else if (h >= 18 && h <= 22) baseDemand = 80;
    else if (h >= 7 && h <= 10) baseDemand = 40;
    else if (h < 7 || h > 22) baseDemand = 15;
    
    // 2. Weather Impact
    let wImpact = 0;
    let wReason = 'Vreme normală';
    const code = cur.weather_code;
    const temp = cur.temperature_2m;
    const wind = cur.wind_speed_10m;
    
    if (code >= 51) { wImpact = 30; wReason = 'Precipitații active'; }
    else if (temp < 0) { wImpact = 15; wReason = 'Temperaturi negative'; }
    else if (temp > 32) { wImpact = 15; wReason = 'Caniculă extremă'; }
    else if (wind > 25) { wImpact = 15; wReason = 'Vânt puternic'; }
    
    // 3. Event Impact
    let eImpact = 0;
    let activeEvents = [];
    cityEvents.forEach(ev => {
        eImpact += ev.impact_score;
        activeEvents.push(ev.name);
    });
    if (eImpact > 50) eImpact = 50; // Cap
    
    // 4. Calculate Scores
    let demandScore = baseDemand + wImpact + eImpact;
    if (demandScore > 100) demandScore = 100;
    
    let earningPotential = demandScore;
    if (wImpact > 0 || eImpact > 20) {
        earningPotential = Math.min(100, Math.round(demandScore * 1.15));
    }
    
    // 5. Trend Logic
    let trendIcon = '↘️';
    let trendReason = 'Cerere calmă/scădere';
    let trendClass = 'neutral';
    
    if (wData.hourly && wData.hourly.weather_code) {
        let rainApproaching = false;
        for (let i = h+1; i <= h+3 && i < 24; i++) {
            if (wData.hourly.weather_code[i] >= 51) rainApproaching = true;
        }
        if (rainApproaching) {
            trendIcon = '↗️';
            trendReason = 'Ploaie așteptată (3h)';
            trendClass = 'negative'; // displays green for drivers (more money)
        } else if (h >= 15 && h < 18) {
            trendIcon = '↗️';
            trendReason = 'Creștere spre Vârful Serii';
            trendClass = 'negative';
        }
    }
    
    // 6. Motivational Message
    let motiveIcon = '🚀';
    let motiveTitle = '';
    let motiveText = '';
    
    if (demandScore > 85) {
        motiveIcon = '🔥';
        motiveTitle = 'CERERE URIAȘĂ!';
        motiveText = 'Profită acum de multiplicatori, plouă cu comenzi. Ieși pe zonele premium!';
    } else if (demandScore >= 65) {
        motiveIcon = '👍';
        motiveTitle = 'CERERE BUNĂ';
        motiveText = 'Fără timpi morți. Rămâi targetat pe zone de volum și fast-food.';
    } else {
        motiveIcon = '☕';
        motiveTitle = 'CERERE SLABĂ';
        motiveText = 'Ritm relaxat. Perfect pentru o tură pe e-bike sau pauză scurtă. Mergi spre mall-uri pentru grupate.';
    }

    const wIcon = getWeatherIcon(code);
    const eventStr = activeEvents.length > 0 ? activeEvents.join(', ') : 'Niciun eveniment live';
    const eventImpactTxt = eImpact > 0 ? `+${eImpact}%` : '0%';
    const wImpactTxt = wImpact > 0 ? `+${wImpact}%` : '0%';
    
    let forecastHTML = '';
    if (wData.daily) {
        for(let i=1; i<=3; i++) {
            const date = new Date(wData.daily.time[i]);
            const dayStr = date.toLocaleDateString('ro-RO', { weekday: 'short' });
            const dayIcon = getWeatherIcon(wData.daily.weather_code[i]);
            const tMax = Math.round(wData.daily.temperature_2m_max[i]);
            const tMin = Math.round(wData.daily.temperature_2m_min[i]);
            
            forecastHTML += `
                <div class="forecast-day">
                    <span class="f-day">${dayStr}</span>
                    <span class="f-icon">${dayIcon}</span>
                    <span class="f-temp">${tMax}° <sub>${tMin}°</sub></span>
                </div>
            `;
        }
    }
    
    el.innerHTML = `
        <div class="live-dashboard">
            <div class="dashboard-metrics">
                <div class="metric-card">
                    <span class="metric-title">Live Meteo 🌤️</span>
                    <span class="metric-value">${wIcon} ${Math.round(temp)}°C</span>
                    <span class="metric-sub ${wImpact > 0 ? 'negative' : 'neutral'}">${wReason} (${wImpactTxt})</span>
                </div>
                <div class="metric-card">
                    <span class="metric-title">Evenimente Majore 🎫</span>
                    <span class="metric-value">${activeEvents.length > 0 ? '🎉 Activ' : 'Tranzit'}</span>
                    <span class="metric-sub ${eImpact > 0 ? 'negative' : 'neutral'}">${eventStr} (${eventImpactTxt})</span>
                </div>
                <div class="metric-card highlight">
                    <span class="metric-title">Cerere Estimativă (Acum)</span>
                    <span class="metric-value">${demandScore}%</span>
                    <span class="metric-sub neutral">Plafon zilnic activ: ${baseDemand}%</span>
                </div>
                <div class="metric-card highlight" style="border-color: #ffd700;">
                    <span class="metric-title">Potențial Câștig</span>
                    <span class="metric-value" style="color:#ffd700;">${earningPotential}%</span>
                    <span class="metric-sub neutral">Include surge multiplier live</span>
                </div>
                <div class="metric-card" style="border-style: dashed; border-color: rgba(255,255,255,0.2);">
                    <span class="metric-title">Tendință (Urm. 3 Ore)</span>
                    <span class="metric-value" style="font-size: 1.5rem;">${trendIcon}</span>
                    <span class="metric-sub ${trendClass}">${trendReason}</span>
                    <span style="font-size: 0.65rem; color: var(--text-muted); margin-top: auto;">Sync: ${new Date().toLocaleTimeString('ro-RO', {hour:'2-digit', minute:'2-digit'})}</span>
                </div>
            </div>
            
            <div class="motivational-box">
                <span class="motivational-icon">${motiveIcon}</span>
                <div class="motivational-text">
                    <h4>${motiveTitle}</h4>
                    <p>${motiveText}</p>
                </div>
            </div>
            
            <div class="weather-widget" style="margin-top: 0;">
                <div class="weather-details" style="border:none; padding:0;">
                    <div class="w-detail">
                        <span class="w-detail-icon">💨</span>
                        <span class="w-detail-val">${Math.round(wind)} km/h</span>
                        <span class="w-detail-label">Vânt</span>
                    </div>
                    <div class="w-detail">
                        <span class="w-detail-icon">💧</span>
                        <span class="w-detail-val">${cur.relative_humidity_2m}%</span>
                        <span class="w-detail-label">Umiditate</span>
                    </div>
                </div>
                ${forecastHTML ? `<div class="weather-forecast">${forecastHTML}</div>` : ''}
            </div>
        </div>
    `;
}
