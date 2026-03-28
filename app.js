const state = {
    lang: 'ro',
    city: 'bucuresti',
    weather: null,
    refreshInterval: null
};

// Data Store
const citiesData = {
    bucuresti: {
        id: 'bucuresti', name: 'Bucuresti', icon: '🏛️', center: 'Piata Unirii, Victoriei', radius: '1 - 10 km', coords: { lat: 44.4268, lng: 26.1025 },
        zones: [
            { icon: '⭐', name: 'Zona Nord', desc: 'Floreasca, Dorobanti, Herastrau (tips mari)' },
            { icon: '🏢', name: 'Zona Centru', desc: 'Universitate, Unirii, Romana (volum masiv)' }
        ],
        volumeZones: [ { icon: '🍔', name: 'Mall-uri', desc: 'AFI, Mega Mall, Promenada - ridicari rapide Multiple' } ],
        orderTypes: [
            { type: 'Scurta', dist: '0.5 - 2 km', bike: '6-8/zi', car: '2-4/zi', freq: 'Frecvent' },
            { type: 'Medie', dist: '2 - 5 km', bike: '8-12/zi', car: '10-15/zi', freq: 'Foarte Frecvent' },
            { type: 'Lunga', dist: '5 - 10 km', bike: 'Rar', car: '12-18/zi', freq: 'Zilnic' }
        ],
        earnings: {
            bike: [ { hours: '4h', orders: '8 - 12', earning: '150 - 250 RON' }, { hours: '8h', orders: '16 - 24', earning: '250 - 400 RON' } ],
            car: [ { hours: '4h', orders: '6 - 10', earning: '120 - 200 RON' }, { hours: '8h', orders: '15 - 25', earning: '250 - 450 RON' } ]
        }
    },
    timisoara: {
        id: 'timisoara', name: 'Timisoara', icon: '🌹', center: 'Piata Unirii, Iulius Town', radius: '1 - 7 km', coords: { lat: 45.7489, lng: 21.2087 },
        zones: [ { icon: '⭐', name: 'Iulius Town', desc: 'Comenzi corporate, tips excelent' }, { icon: '🏢', name: 'Complex Studentesc', desc: 'Volum urias seara, distante scurte' } ],
        volumeZones: [ { icon: '🍔', name: 'Shopping City', desc: 'Food court aglomerat' } ],
        orderTypes: [
            { type: 'Scurta', dist: '0.5 - 1.5 km', bike: '10-15/zi', car: '5-8/zi', freq: 'Frecvent' },
            { type: 'Medie', dist: '1.5 - 4 km', bike: '5-10/zi', car: '10-15/zi', freq: 'Foarte Frecvent' },
            { type: 'Lunga', dist: '4 - 7 km', bike: 'Rar', car: '5-12/zi', freq: 'Normal' }
        ],
        earnings: {
            bike: [ { hours: '4h', orders: '10 - 15', earning: '180 - 250 RON' }, { hours: '8h', orders: '20 - 28', earning: '300 - 450 RON' } ],
            car: [ { hours: '4h', orders: '8 - 12', earning: '150 - 220 RON' }, { hours: '8h', orders: '18 - 25', earning: '280 - 400 RON' } ]
        }
    },
    cluj: {
        id: 'cluj', name: 'Cluj-Napoca', icon: '🏔️', center: 'Piata Unirii, Iulius', radius: '1 - 8 km', coords: { lat: 46.7712, lng: 23.5901 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Restaurante premium' }, { icon: '🏢', name: 'Marasti', desc: 'Studenti' } ],
        volumeZones: [ { icon: '🍔', name: 'VIVO!', desc: 'Preluari grupate' } ],
        orderTypes: [
            { type: 'Scurta', dist: '1 - 2.5 km', bike: '12-18/zi', car: '4-8/zi', freq: 'Frecvent' },
            { type: 'Medie', dist: '2.5 - 5 km', bike: '4-8/zi', car: '12-20/zi', freq: 'Frecvent' },
            { type: 'Lunga', dist: '5+ km', bike: 'Evitat', car: '8-15/zi', freq: 'Normal' }
        ],
        earnings: {
            bike: [ { hours: '5h', orders: '12 - 18', earning: '200 - 300 RON' }, { hours: '10h', orders: '25 - 35', earning: '400 - 600 RON' } ],
            car: [ { hours: '5h', orders: '10 - 15', earning: '180 - 280 RON' }, { hours: '10h', orders: '20 - 30', earning: '350 - 550 RON' } ]
        }
    },
    iasi: {
        id: 'iasi', name: 'Iasi', icon: '🏰', center: 'Palas, Copou', radius: '1 - 7 km', coords: { lat: 47.1585, lng: 27.5681 },
        zones: [ { icon: '⭐', name: 'Palas', desc: 'Corporate' }, { icon: '🏢', name: 'Copou', desc: 'Seara' } ],
        volumeZones: [ { icon: '🍔', name: 'Tudor', desc: 'Campus' } ],
        orderTypes: [ { type: 'Scurta', dist: '1-3 km', bike: '8-12/zi', car: '6-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-6 km', bike: '5-8/zi', car: '10-16/zi', freq: 'Frecvent' }, { type: 'Lunga', dist: '6+ km', bike: 'Rar', car: '5-10/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '8-12', earning: '130-180 RON' }, { hours: '8h', orders: '16-24', earning: '250-350 RON' } ], car: [ { hours: '4h', orders: '8-10', earning: '120-160 RON' }, { hours: '8h', orders: '16-22', earning: '240-320 RON' } ] }
    },
    brasov: {
        id: 'brasov', name: 'Brasov', icon: '⛰️', center: 'AFI, Centru', radius: '1 - 8 km', coords: { lat: 45.6427, lng: 25.5887 },
        zones: [ { icon: '⭐', name: 'Centru Vechi', desc: 'Turisti, tips' }, { icon: '🏢', name: 'Coresi', desc: 'Rezidential' } ],
        volumeZones: [ { icon: '🍔', name: 'AFI', desc: 'Food court' } ],
        orderTypes: [ { type: 'Scurta', dist: '1-3 km', bike: 'E-Bike', car: '6-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-6 km', bike: 'E-Bike', car: '12-18/zi', freq: 'Foarte Frecvent' }, { type: 'Lunga', dist: '6+ km', bike: 'Nu', car: '5-12/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '8-12', earning: '150-220 RON' }, { hours: '8h', orders: '15-22', earning: '280-400 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '140-200 RON' }, { hours: '8h', orders: '16-24', earning: '260-380 RON' } ] }
    },
    sibiu: {
        id: 'sibiu', name: 'Sibiu', icon: '🏘️', center: 'Piata Mare', radius: '1 - 6 km', coords: { lat: 45.7983, lng: 24.1256 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Turisti' }, { icon: '🏢', name: 'Selimbar', desc: 'Comenzi mari' } ],
        volumeZones: [ { icon: '🍔', name: 'Promenada', desc: 'Ridicari grupate' } ],
        orderTypes: [ { type: 'Scurta', dist: '1-2 km', bike: '10-15/zi', car: '5-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '2-5 km', bike: '5-10/zi', car: '10-15/zi', freq: 'Frecvent' }, { type: 'Lunga', dist: '5+ km', bike: 'Rar', car: '5-10/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '10-14', earning: '140-200 RON' }, { hours: '8h', orders: '20-25', earning: '260-350 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '130-180 RON' }, { hours: '8h', orders: '16-22', earning: '250-320 RON' } ] }
    },
    arad: {
        id: 'arad', name: 'Arad', icon: '🌉', center: 'Bulevardul Revolutiei', radius: '1 - 5 km', coords: { lat: 46.1866, lng: 21.3123 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Restaurante' }, { icon: '🏢', name: 'Micalaca', desc: 'Cartier dens' } ],
        volumeZones: [ { icon: '🍔', name: 'Atrium', desc: 'Fast food' } ],
        orderTypes: [ { type: 'Scurta', dist: '1-3 km', bike: '10-16/zi', car: '6-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-5 km', bike: '5-8/zi', car: '10-15/zi', freq: 'Frecvent' }, { type: 'Lunga', dist: '5+ km', bike: 'Rar', car: '4-8/zi', freq: 'Rar' } ],
        earnings: { bike: [ { hours: '4h', orders: '10-15', earning: '130-180 RON' }, { hours: '8h', orders: '20-28', earning: '250-330 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '120-170 RON' }, { hours: '8h', orders: '16-24', earning: '230-310 RON' } ] }
    },
    oradea: {
        id: 'oradea', name: 'Oradea', icon: '♨️', center: 'Piata Unirii', radius: '1 - 6 km', coords: { lat: 47.0465, lng: 21.9189 },
        zones: [ { icon: '⭐', name: 'Piata Unirii', desc: 'Restaurante premium' }, { icon: '🏢', name: 'Nufarul', desc: 'Distante medii' } ],
        volumeZones: [ { icon: '🍔', name: 'Lotus Center', desc: 'Ridicari multiple' } ],
        orderTypes: [ { type: 'Scurta', dist: '1-2.5 km', bike: '12-18/zi', car: '5-10/zi', freq: 'Foarte Frecvent' }, { type: 'Medie', dist: '2.5-5 km', bike: '5-10/zi', car: '12-18/zi', freq: 'Frecvent' }, { type: 'Lunga', dist: '5+ km', bike: 'Rar', car: '5-10/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '12-16', earning: '150-200 RON' }, { hours: '8h', orders: '24-30', earning: '280-380 RON' } ], car: [ { hours: '4h', orders: '10-14', earning: '140-190 RON' }, { hours: '8h', orders: '20-26', earning: '260-350 RON' } ] }
    },
    'targu-mures': {
        id: 'targu-mures', name: 'Targu Mures', icon: '🌷', center: 'Centru', radius: '1 - 5 km', coords: { lat: 46.5425, lng: 24.5575 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Restaurante' }, { icon: '🏢', name: 'Tudor', desc: 'Cartierul mare' } ],
        volumeZones: [ { icon: '🍔', name: 'Shopping City', desc: 'Volum bun' } ],
        orderTypes: [ { type: 'Scurta', dist: '1-3 km', bike: '10-15/zi', car: '5-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-5 km', bike: '5-8/zi', car: '10-15/zi', freq: 'Frecvent' }, { type: 'Lunga', dist: '5+ km', bike: 'Rar', car: '4-8/zi', freq: 'Rar' } ],
        earnings: { bike: [ { hours: '4h', orders: '10-14', earning: '120-170 RON' }, { hours: '8h', orders: '20-26', earning: '230-310 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '110-160 RON' }, { hours: '8h', orders: '16-22', earning: '220-300 RON' } ] }
    },
    ploiesti: {
        id: 'ploiesti', name: 'Ploiesti', icon: '🛢️', center: 'AFI, Centru', radius: '1 - 6 km', coords: { lat: 44.9367, lng: 26.0125 },
        zones: [ { icon: '⭐', name: 'Centru', desc: 'Restaurante diverse' }, { icon: '🏢', name: 'Republicii', desc: 'Cartiere mari' } ],
        volumeZones: [ { icon: '🍔', name: 'AFI', desc: 'Zona de flux' } ],
        orderTypes: [ { type: 'Scurta', dist: '1-2.5 km', bike: '10-15/zi', car: '6-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '2.5-5 km', bike: '5-10/zi', car: '10-16/zi', freq: 'Frecvent' }, { type: 'Lunga', dist: '5+ km', bike: 'Rar', car: '5-10/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '10-14', earning: '130-180 RON' }, { hours: '8h', orders: '20-25', earning: '240-330 RON' } ], car: [ { hours: '4h', orders: '8-12', earning: '120-170 RON' }, { hours: '8h', orders: '16-24', earning: '230-320 RON' } ] }
    },
    constanta: {
        id: 'constanta', name: 'Constanta', icon: '⚓', center: 'Tomis, City Park', radius: '1 - 8 km', coords: { lat: 44.1792, lng: 28.6499 },
        zones: [ { icon: '⭐', name: 'Mamaia (Vara)', desc: 'Tips urias, noapte' }, { icon: '🏢', name: 'Faleza Nord', desc: 'Zone premium' } ],
        volumeZones: [ { icon: '🍔', name: 'City Park', desc: 'Volum stabil' } ],
        orderTypes: [ { type: 'Scurta', dist: '1-3 km', bike: '12-18/zi', car: '5-10/zi', freq: 'Frecvent' }, { type: 'Medie', dist: '3-6 km', bike: '5-10/zi', car: '12-18/zi', freq: 'Frecvent' }, { type: 'Lunga', dist: '6+ km', bike: 'Rar', car: '6-12/zi', freq: 'Normal' } ],
        earnings: { bike: [ { hours: '4h', orders: '12-16', earning: '160-220 RON' }, { hours: '8h', orders: '24-30', earning: '300-420 RON' } ], car: [ { hours: '4h', orders: '10-14', earning: '150-200 RON' }, { hours: '8h', orders: '20-28', earning: '280-380 RON' } ] }
    }
};

const commonData = {
    gold: [
        { sit: 'Ploaie / Ninsoare', bonus: '+20-40%', det: 'Multiplicator dinamic pe aplicatie + tips cash marit.' },
        { sit: 'Vineri - Duminica seara', bonus: '+30%', det: 'Cea mai aglomerata perioada (18:00 - 22:00).' },
        { sit: 'Meciuri / Sarbatori', bonus: 'Max', det: 'Cerere uriasa de fast-food.' }
    ],
    strategy: [
        { title: 'Pranz (11:30 - 14:00)', desc: 'Stai langa zone de birouri. Comenzi multe dar scurte.' },
        { title: 'Dupa-masa (14:30 - 17:00)', desc: 'Tranzitie spre Mall-uri / Fast-food.' },
        { title: 'Seara (18:30 - 21:30)', desc: 'Vaneaza restaurante premium. Tips-ul este cel mai mare aici.' }
    ],
    rules: [
        { act: 'Ai grija la geanta', res: 'Foloseste intotdeauna izolarea termica. Clientul taxeaza mancarea rece.' },
        { act: 'Suna o singura data', res: 'Daca nu raspunde, da SMS, asteapta 2 min. Respecta protocolul platformei.' },
        { act: 'Verifica bauturile', res: '90% din rating-urile slabe vin de la bauturi uitate sau varsate.' }
    ],
    mistakes: [
        { mis: 'Stai in fata unui singur restaurant', res: 'Aplicatia prefera curierii in miscare (chiar si usoara).' },
        { mis: 'Anulezi comenzi', res: 'Iti scade rata de acceptare, iar algoritmul iti va da comenzi mai putine.' }
    ],
    progression: [
        { level: 1, title: 'Rookie (Luna 1)', desc: 'Invata zonele si scurtaturile. Nu te stresa pe viteza, focuseaza-te pe livrari sigure.' },
        { level: 2, title: 'Avansat (Luna 2-3)', desc: 'Incepi sa recunosti clientii recurenti si sa faci o medie buna per ora.' },
        { level: 3, title: 'Veteran (Luna 3-6)', desc: 'Ai strategia ta. Stii ce comenzi aduc bacsis si ce zone sa eviti.' },
        { level: 4, title: 'PRO / Top 10%', desc: 'Venit maxim. Echipament complet, folosesti multiplicatorii.' }
    ]
};

// ====== EVENT BINDINGS ======
document.addEventListener('DOMContentLoaded', () => {
    bindEvents();
    loadCity(state.city);
    
    // Notification Permission
    if ('Notification' in window && Notification.permission !== 'granted' && Notification.permission !== 'denied') {
        Notification.requestPermission();
    }
    
    // Auto Geo-Snap
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            let closest = null;
            let minDist = Infinity;
            for (let c in citiesData) {
                const cLat = citiesData[c].coords.lat;
                const cLng = citiesData[c].coords.lng;
                const dist = Math.sqrt(Math.pow(lat - cLat, 2) + Math.pow(lng - cLng, 2));
                if (dist < minDist) { minDist = dist; closest = c; }
            }
            if (closest && closest !== state.city) {
                document.querySelectorAll('.city-btn').forEach(b => b.classList.remove('active'));
                const btn = document.querySelector(`.city-btn[data-city="${closest}"]`);
                if(btn) btn.classList.add('active');
                loadCity(closest);
            }
        });
    }
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
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    }
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if(sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => toggleMobileMenu(false));
    }
    
    const langBtn = document.getElementById('lang-btn');
    const langMenu = document.getElementById('lang-menu');
    if (langBtn && langMenu) {
        langBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            langMenu.classList.toggle('show');
        });
        document.addEventListener('click', (e) => {
            if (!e.target.closest('.language-selector')) {
                langMenu.classList.remove('show');
            }
        });
        document.querySelectorAll('.lang-opt').forEach(opt => {
            opt.addEventListener('click', (e) => {
                const l = e.currentTarget.dataset.lang;
                document.getElementById('lang-btn').innerHTML = `🌐 ${l.toUpperCase()} <span class="arrow">▼</span>`;
                langMenu.classList.remove('show');
            });
        });
    }
}

function toggleMobileMenu(force) {
    const btn = document.getElementById('mobile-menu-btn');
    const sidebar = document.getElementById('city-sidebar');
    const overlay = document.getElementById('sidebar-overlay');
    if (!btn || !sidebar || !overlay) return;
    if (force) {
        btn.classList.add('active'); sidebar.classList.add('show'); overlay.classList.add('show');
    } else {
        btn.classList.remove('active'); sidebar.classList.remove('show'); overlay.classList.remove('show');
    }
}

// ====== RENDER LOGIC ======
function loadCity(cityId) {
    state.city = cityId;
    const data = citiesData[cityId];
    if (!data) return;
    
    const mainContent = document.getElementById('main-content');
    if(mainContent) {
        mainContent.classList.remove('loaded');
        mainContent.classList.add('loading');
    }
    
    setTimeout(() => {
        // Header
        document.getElementById('city-title').innerText = data.name;
        
        // Sectiunea 4: Best Action Plan
        const topZones = data.zones.map(z => z.name).join(', ');
        document.getElementById('act-zones').innerText = topZones;
        document.getElementById('act-center').innerText = data.center;
        document.getElementById('act-radius').innerText = data.radius;
        
        // Sectiunea 5: Comenzi Compact
        if (document.getElementById('orders-mini-cards')) {
            const ordersHTML = data.orderTypes.map(ot => {
                const icon = ot.type.includes('Scurta') ? '🚲' : ot.type.includes('Medie') ? '🏍️' : '🚗';
                return `<div class="m-card">
                    <span class="mc-type"><span class="mc-icon">${icon}</span> ${ot.type} (${ot.dist})</span>
                    <span class="mc-freq">${ot.freq}</span>
                </div>`;
            }).join('');
            document.getElementById('orders-mini-cards').innerHTML = ordersHTML;
        }

        // Sectiunea 6: Strategy
        if (document.getElementById('strategy-steps-container')) {
            const stratHTML = `
                <div class="step">
                    <span class="step-num">START</span>
                    <div class="step-txt"><strong>Initiere Segment:</strong> Aliniaza-te cu arterele comerciale (${data.center}). Mentine mobilitatea.</div>
                </div>
                <div class="step">
                    <span class="step-num">MID</span>
                    <div class="step-txt"><strong>Ajustare Traseu:</strong> Calibreaza spre food-court-uri si lanturi fast-food majore.</div>
                </div>
                <div class="step">
                    <span class="step-num">PEAK</span>
                    <div class="step-txt"><strong>Feriestra de Varf:</strong> Valorifica impulsul maximal. Targeteaza directiile rezidentiale: (${topZones}).</div>
                </div>
            `;
            document.getElementById('strategy-steps-container').innerHTML = stratHTML;
        }
        
        // Update Live Metrics (Weather + Events) + Auto Refresh
        fetchLiveMetrics(data.coords.lat, data.coords.lng, cityId);
        if (state.refreshInterval) clearInterval(state.refreshInterval);
        state.refreshInterval = setInterval(() => {
            fetchLiveMetrics(data.coords.lat, data.coords.lng, cityId);
        }, 5 * 60 * 1000); // 5 min interval
        
        if (mainContent) {
            mainContent.classList.remove('loading');
            mainContent.classList.add('loaded');
        }
    }, 150);
}

// ====== FETCH LIVE METRICS ======
async function fetchLiveMetrics(lat, lng, cityId) {
    const syncTime = document.getElementById('sync-time');
    if (syncTime) syncTime.innerText = 'Sync: Fetch...';
    
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
        calculateAndRenderLiveDashboard(wData, cityEvents);
    } catch (err) {
        console.error("Live metrics fetch error", err);
        if (syncTime) syncTime.innerText = 'Sync: Eroare';
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

function calculateAndRenderLiveDashboard(wData, cityEvents) {
    const cur = wData.current;
    if (!cur) return;
    
    const temp = cur.temperature_2m;
    const code = cur.weather_code;
    const wind = cur.wind_speed_10m;
    const h = new Date().getHours();
    
    // 1. Meteo Impact
    let wImpact = 0;
    let wReason = 'Vreme normala';
    
    if (code >= 51 && code <= 67) { wImpact = 25; wReason = 'Ploaie'; }
    else if (code >= 71 && code <= 77) { wImpact = 40; wReason = 'Zapada / Viscol'; }
    else if (code >= 95) { wImpact = 45; wReason = 'Furtuna'; }
    else if (temp < 0) { wImpact = 20; wReason = 'Inghet'; }
    else if (temp > 35) { wImpact = 20; wReason = 'Canicula'; }
    else if (wind > 25) { wImpact = 15; wReason = 'Vant puternic'; }
    else if (code <= 3) { wImpact = 0; wReason = 'Vreme optima'; }
    
    // 2. Event Impact
    let eImpact = 0;
    let activeEvents = [];
    cityEvents.forEach(ev => {
        if (ev.status === 'active') {
            eImpact += ev.impact_score || ev.impactScore || 0;
            activeEvents.push(ev.name);
        }
    });
    
    const eventStatus = activeEvents.length > 0 ? 'Activ' : 'Tranzit';
    const eventDesc = activeEvents.length > 0 ? `${activeEvents[0]}` : 'Niciun eveniment';

    // 3. Base Demand (Hour Logic)
    let baseDemand = 35; 
    if (h >= 11 && h <= 14) baseDemand = 65; // lunch
    else if (h >= 18 && h <= 21) baseDemand = 80; // dinner
    else if (h >= 22 || h < 7) baseDemand = 20; // late night

    // 4. Final Math
    let demandScore = baseDemand + wImpact + eImpact;
    if (demandScore > 100) demandScore = 100;
    
    let earningPotential = demandScore;
    if (wImpact > 0 || eImpact > 10) { 
        earningPotential = Math.min(100, Math.round(demandScore * 1.15)); 
    } else if (demandScore > 60) {
        earningPotential = Math.round(demandScore * 1.05);
    }

    // 5. Trend Logic (Next 3h)
    let trendIcon = '↘️';
    let trendReason = 'Plafon Tactic Moderat';
    let trendClass = 'neutral';
    
    if (wData.hourly && wData.hourly.weather_code) {
        let rainApproaching = false;
        for (let i = h+1; i <= h+3 && i < 24; i++) {
            if (wData.hourly.weather_code[i] >= 51) rainApproaching = true;
        }
        if (rainApproaching) {
            trendIcon = '↗️'; trendReason = 'Ploaie asteptata (3h) - Potential Crestere'; trendClass = 'warning';
        } else if (h >= 15 && h < 18) {
            trendIcon = '↗️'; trendReason = 'Avans spre Fereastra de Varf'; trendClass = 'neutral';
        }
    }

    // 6. Labels & Momentum
    let momentum = 'ACTIV';
    let motivMsg = 'Potential selectiv. Mentine un ritm controlat si intercepteaza curse adiacente.';
    let mulBadge = 'low', mulText = 'STANDARD';
    
    if (demandScore >= 75) {
        momentum = 'MAXIM';
        motivMsg = '🔥🔥🔥 OPORTUNITATE MAJORA! Profita de moment, timing perfect pentru distante medii in target zones!';
        mulBadge = 'aggressive'; mulText = 'AGRESIV';
        
        if (state.lastMomentum !== 'MAXIM') {
            state.lastMomentum = 'MAXIM';
            // Haptic Feedback
            if(navigator.vibrate) navigator.vibrate([100, 50, 100]);
            // Audio Feedback
            try {
                const ctx = new (window.AudioContext || window.webkitAudioContext)();
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine'; osc.frequency.setValueAtTime(440, ctx.currentTime);
                osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.1);
                gain.gain.setValueAtTime(0.5, ctx.currentTime);
                gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.3);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(); osc.stop(ctx.currentTime + 0.3);
            } catch(e) {}
            // Push Notification
            if ('Notification' in window && Notification.permission === 'granted') {
                new Notification('Oportunitate Majora Activata!', {
                    body: 'Cerere exploziva detectata in zona. Pregateste-te pentru curse.',
                    icon: 'dragon-logo.png'
                });
            }
        }
    } else if (demandScore >= 55) {
        momentum = 'NIVEL OPTIM';
        motivMsg = '👍 Fereastra tactica buna. Distributie consistenta. Pozitioneaza-te optim.';
        mulBadge = 'high'; mulText = 'RIDICAT';
        state.lastMomentum = 'NIVEL_OPTIM';
    } else {
        state.lastMomentum = 'ACTIV';
    }

    // ==========================================
    // INJECT TO DOM WITH ANIMATIONS
    // ==========================================
    
    // Night Mode Check (Red Alert System)
    if (h >= 22 || h < 6) {
        document.body.classList.add('night-mode');
    } else {
        document.body.classList.remove('night-mode');
    }
    requestAnimationFrame(() => {
        const syncEl = document.getElementById('sync-time');
        if (syncEl) syncEl.innerText = `Sync: ${new Date().toLocaleTimeString('ro-RO', {hour:'2-digit', minute:'2-digit'})}`;
        
        // Header
        document.getElementById('hdr-demand').innerText = `${demandScore}%`;
        document.getElementById('hdr-profit').innerText = `${earningPotential}%`;
        document.getElementById('hdr-momentum').innerText = momentum;
        document.getElementById('motivational-message').innerText = motivMsg;
        
        // Snapshot
        document.getElementById('snap-w-icon').innerText = getWeatherIcon(code);
        document.getElementById('snap-w-temp').innerText = `${Math.round(temp)}°C`;
        document.getElementById('snap-w-desc').innerText = `${wReason} (+${wImpact}%)`;
        document.getElementById('snap-w-desc').className = wImpact > 0 ? 'warning' : 'neutral';
        
        document.getElementById('snap-e-status').innerText = eventStatus;
        document.getElementById('snap-e-desc').innerText = `${eventDesc} (+${eImpact}%)`;
        document.getElementById('snap-e-desc').className = eImpact > 0 ? 'warning' : 'neutral';

        document.getElementById('snap-t-icon').innerText = trendIcon;
        document.getElementById('snap-t-desc').innerText = trendReason;
        document.getElementById('snap-t-desc').className = trendClass;

        // Progress Bars
        document.getElementById('demand-bar').style.width = `${demandScore}%`;
        document.getElementById('demand-val').innerText = `${demandScore}%`;
        document.getElementById('demand-reason').innerText = `Ora curenta (${baseDemand}%) + Eveniment (${eImpact}%) + Meteo (${wImpact}%)`;

        document.getElementById('profit-bar').style.width = `${earningPotential}%`;
        document.getElementById('profit-val').innerText = `${earningPotential}%`;
        
        const mulEl = document.getElementById('profit-indicator');
        mulEl.className = `mul-badge ${mulBadge}`;
        mulEl.innerText = mulText;
    });
}
