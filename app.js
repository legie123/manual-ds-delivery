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

// ====== EVENT BINDINGS ======
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
    
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    if(mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => toggleMobileMenu(true));
    }
    const sidebarOverlay = document.getElementById('sidebar-overlay');
    if(sidebarOverlay) {
        sidebarOverlay.addEventListener('click', () => toggleMobileMenu(false));
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
                const icon = ot.type.includes('Scurtă') ? '🚲' : ot.type.includes('Medie') ? '🏍️' : '🚗';
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
                    <span class="step-num">1</span>
                    <span class="step-txt"><strong>Start Ușor:</strong> Începe în zonele de mall-uri și birouri (${data.center}).</span>
                </div>
                <div class="step">
                    <span class="step-num">2</span>
                    <span class="step-txt"><strong>Shift Amiază:</strong> Mută cursorul spre zonele intens populate de fast-food-uri.</span>
                </div>
                <div class="step">
                    <span class="step-num">3</span>
                    <span class="step-txt"><strong>Vârful de Seară:</strong> Atrage comenzile lungi (peste 5km) spre zone populare pentru tips.</span>
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
    let wReason = 'Vreme normală';
    
    if (code >= 51 && code <= 67) { wImpact = 25; wReason = 'Ploaie'; }
    else if (code >= 71 && code <= 77) { wImpact = 40; wReason = 'Zăpadă / Viscol'; }
    else if (code >= 95) { wImpact = 45; wReason = 'Furtună'; }
    else if (temp < 0) { wImpact = 20; wReason = 'Îngheț'; }
    else if (temp > 35) { wImpact = 20; wReason = 'Caniculă'; }
    else if (wind > 25) { wImpact = 15; wReason = 'Vânt puternic'; }
    else if (code <= 3) { wImpact = 0; wReason = 'Vreme optimă'; }
    
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
    let trendReason = 'Stabil / Scădere';
    let trendClass = 'neutral';
    
    if (wData.hourly && wData.hourly.weather_code) {
        let rainApproaching = false;
        for (let i = h+1; i <= h+3 && i < 24; i++) {
            if (wData.hourly.weather_code[i] >= 51) rainApproaching = true;
        }
        if (rainApproaching) {
            trendIcon = '↗️'; trendReason = 'Ploaie așteptată (3h)'; trendClass = 'warning';
        } else if (h >= 15 && h < 18) {
            trendIcon = '↗️'; trendReason = 'Creștere spre Vârful Serii'; trendClass = 'neutral';
        }
    }

    // 6. Labels & Momentum
    let momentum = 'LOW';
    let motivMsg = 'Ritm relaxat. Menține energia pentru vârful de comenzi.';
    let mulBadge = 'low', mulText = 'NORMAL';
    
    if (demandScore >= 75) {
        momentum = 'HIGH';
        motivMsg = '🔥🔥🔥 CERERE URIAȘĂ! Profită acum de multiplicatori, ieși pe zonele premium!';
        mulBadge = 'aggressive'; mulText = 'AGRESIV';
    } else if (demandScore >= 55) {
        momentum = 'MEDIUM';
        motivMsg = '👍 Cerere în creștere. Targetează mall-uri și fast-food.';
        mulBadge = 'high'; mulText = 'RIDICAT';
    }

    // ==========================================
    // INJECT TO DOM WITH ANIMATIONS
    // ==========================================
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
        document.getElementById('demand-reason').innerText = `Ora curentă (${baseDemand}%) + Eveniment (${eImpact}%) + Meteo (${wImpact}%)`;

        document.getElementById('profit-bar').style.width = `${earningPotential}%`;
        document.getElementById('profit-val').innerText = `${earningPotential}%`;
        
        const mulEl = document.getElementById('profit-indicator');
        mulEl.className = `mul-badge ${mulBadge}`;
        mulEl.innerText = mulText;
    });
}
