const state = {
    city: 'bucuresti',
    weather: null,
    refreshInterval: null,
    eventsRefreshInterval: null,
    loadCityTimer: null
};

function loadCityDebounced(cityId) {
    clearTimeout(state.loadCityTimer);
    state.loadCityTimer = setTimeout(() => loadCity(cityId), 200);
}

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
        { sit: 'Ploaie / Intemperii', bonus: '+40-60%', det: 'Multiplicator dinamic automat, volum de comenzi dublat. Clienții sunt mai recunoscători (Tips masiv). Pregătește echipamentul premium de ploaie complet impermeabil.' },
        { sit: 'Weekend Seara (18:00 - 22:00)', bonus: '+30%', det: 'Apogeul industriei. Evită fast-food-urile mici și vânează restaurantele exclusiviste cu platouri mari de familie sau evenimente de grup.' },
        { sit: 'Meciuri de Fotbal / Națională / Evenimente Sportive', bonus: 'Max', det: 'Cerere imensă pentru fast-food și sucuri/beri (ridicări multiple). Fii online cu o oră înainte de startul meciului.' },
        { sit: 'Prânz Corporate (11:30 - 13:30)', bonus: '+15-20%', det: 'Concentrare maximă pe zonele office/business. Comenzi de business lunch care deschid ferestre excelente de bacșiș direct pe card.' }
    ],
    strategy: [
        { title: 'Tranzit Prânz (11:30 - 14:00)', desc: 'Poziționare: Zone office și clădiri comerciale (Business Park). Multiplicator uriaș pe volume de distanțe scurte.' },
        { title: 'Perioada de Calm (14:30 - 17:00)', desc: 'Reîncarcă bateria, igienizează geanta, hidratează-te. Targetează mall-urile periferice și patiseriile pentru gustări ocazionale.' },
        { title: 'Fereastra Elite (18:30 - 21:30)', desc: 'Ridicări lungi, tips masiv numerar. Evită marile bulevarde blocate de trafic. Folosește trasee prin cartiere rezidențiale liniștite.' }
    ],
    rules: [
        { act: 'Verifică Sigiliile & Băuturile ÎNTOTDEAUNA', res: 'Clientul reclamă direct lipsurile ție, nu aplicației. O secundă prețioasă alocată verificării elimină 99% din penalizări și rating 1.' },
        { act: 'Igienizează Geanta Termică Zilnic', res: 'Ambalajele curate scot în evidență profesionalismul și asigură bacșiș extrem. O geantă cu miros greu alterează comanda și se penalizează pe suport!' },
        { act: 'Trasează Rute Alternative & Cunoaște Sensurile', res: 'Waze sau Google Maps nu cunosc barierele fizice temporare (de ex. piețe volante, șantiere de bloc). Fii mai inteligent decât GPS-ul!' },
        { act: 'Folosește Textul Standard la Client', res: 'Anunță clar clientul prin mesaj în aplicație: "Am ajuns. Vă aștept la poartă/intrare." Nu apela din prima secundă, dă preaviz politicos cu 2 minute înainte.' },
        { act: 'Tranzacții Impecabile și Mărunțiș', res: 'Dacă faci livrări cash, ține întotdeauna pe tine minim 50 RON în fracții mici pentru rest. "Nu am rest" garantează zero bacșiș și frustrare.' },
        { act: 'Contact Cu Suportul Când Există Blocaje', res: 'Dacă un tip de mâncare/sos s-a vărsat integral din vina ambalajului, fă poză pe loc și contactează dispeceratul înainte să apeși Livrat! Autocorectează problema.' }
    ],
    mistakes: [
        { mis: 'Viteza Falsă pe Vreme Rea', res: 'Niciun bonus pe ploaie nu acoperă zile de stat în ghips și o bicicletă sau trotinetă distrusă. Rămâi calculat la trecerile de pietoni alunecoase!' },
        { mis: 'Evită Refuzul Artificial Repetat', res: 'Anulările dese scad "Trust Score-ul algoritmului". Vei primi tot mai rar comenzi profitabile, fiind trimis treptat la curse grele/lejere.' },
        { mis: 'Portul Genții Termice ca Decor / Simplu Rucsac', res: 'Temperatura este piesa cheie. Mâncare rece = Muncă degeaba, Tips anulat, Rating Minim.' },
        { mis: 'Nerezolvarea Cererilor Speciale de Acces', res: 'Dacă notele spun clar "Sunați la 14# la interfon", nu ignora și nu bate în geam.' },
        { mis: 'Blocarea Benziilor sau a Stațiilor de Autobuz', res: 'Poliția locală sancționează aspru curierii indisciplinați. O singură amendă de oprire pe trecere de pietoni iți anulează câștigul întregii zile.' }
    ],
    progression: [
        { level: 1, title: 'Inițiat (Luna 1)', desc: 'Acumulează experiență geografică pe sectorul tău. Concentrează-te 100% pe fiabilitate, zero vărsări și zero greșeli. Ratingul determină viitorul.' },
        { level: 2, title: 'Strategic (Luna 2-3)', desc: 'Înțelege ferestrele orare. Învață să filtrezi comanda mică dar ușoară de comanda colosală dar din zone cu timpi uriași de așteptare.' },
        { level: 3, title: 'Veteran (Luna 3-6)', desc: 'Maximizează rutele intercalate și order-urile suprapuse. Salută cu numele managerii și ospătarii, obții status de prioritate în prep-time.' },
        { level: 4, title: 'Dragon Master', desc: 'Flux sistemic. Cunoști fiecare sens unic, resimți din instinct zonele de val înainte de rapoarte și ai un venit constant ridicat indiferent de criză.' }
    ],
    smartZones: [
        { title: 'Complex FoodCourt / Mall', desc: 'Sursă constantă 12:00-22:00. Parcarea complicată este compensată de posibilitatea de pachet dublu/ridicări multiple la un singur trip.' },
        { title: 'Ansambluri Rezidențiale Dense Noi', desc: 'Seara, acestea explodează în comenzi duble, dar necesită atenție majoră la cartografieri (străzi noi lipsă pe GPS, interfoane defecte).' },
        { title: 'Zone Universitare / Cămine', desc: 'Comenzi masive de fast-food (volume mari, recurente, dar tips ceva mai redus). Excelente pentru a face numărul vizat de misiuni scurte (Quest-uri).' }
    ],
    smartRisk: [
        { title: 'Lipsa Echipamentului Termic / Ploaie', desc: 'Risc iminent de distrugere atât a preparatului cât și a telefonului personal. Costurile unui display umezit anulează efortul pe 3 săptămâni.' },
        { title: 'Trafic de Tranziție "Bară la Bară"', desc: 'Evită tranzitul pe arterele principale orizontale (17:00-18:30). Risc enorm de a pierde o oră într-un singur sens. Navighează prin rețea capilară (străduțe).' },
        { title: 'Oboseala vizuală cronică pe timp de noapte', desc: 'Faruri puternice, lipsa de iluminat în zone de șantiere rezidențiale. Poartă mereu ochelari de protecție sau lentile anti-orbire la volan/pe bicicletă.' }
    ],
    smartRoute: [
        { title: 'Analiza Anticipativă a Radarului', desc: 'Când un nor roșu crește (Global Demand), nu alerga spre centrul lui dacă e super aglomerat de trafic. Plasează-te inteligent fix la "marginea frontului" pentru preluări instantanee, libere de trafic.' },
        { title: 'Scurtăturile Informale', desc: 'Trecerea prin gangurile blocurilor, poduri pietonale, alei între parcuri. Învățarea acestor secrete de cartier taie ETA-ul cu 25% la bicicletă.' },
        { title: 'Asocierea cu Clădirea', desc: 'Identifică clădirile mari după detalii, nu doar după număr. Numerele de stradă se pierd noaptea, arhitectura clădirii și vitrinele te ghidează vizual instant.' }
    ]
};

const motivationals = [
    "Geanta termică nu este opțională. Păstrează calitatea, crești șansele la tips.",
    "Zâmbetul aduce bacșiș. Oferă o experiență, nu doar o pungă.",
    "Bazează-te pe date, nu pe intuiție. Folosește Radarul pentru repoziționare rapidă.",
    "Zonele rezidențiale premium seara dublează profitul în comparație cu cele aglomerate din centru.",
    "Prevenția bate viteza. Nu accelera inutil pe vreme rea, siguranța ta e numărul 1.",
    "Verifică băuturile de două ori la restaurant! E cauza principală a rating-urilor slabe.",
    "Ai grijă la scurgerile de sos. Când e nevoie, folosește un strat izolator în geantă.",
    "Folosește ferestrele de vârf tactic. Lucrează inteligent la prânz și seară.",
    "Algoritmul recompensează consistența și acceptarea. Nu anula comenzi dacă nu e absolut necesar.",
    "Comunicarea e cheia. Dacă există întârzieri majore, un scurt mesaj către client face minuni.",
    "Când plouă, multiplicatorii dinamici explodează. Echipează-te corect și capitalizează.",
    "Poziționează-te la jumătatea distanței dintre food-court-uri în orele de tranziție.",
    "Dacă nu ai semnal GPS bun, intră scurt într-o aplicație de hărți pentru recalibrare rapidă.",
    "Păstrează un suport de telefon stabil și curat. Viteza de preluare scade oboseala zilnică.",
    "Nu ignora alertele naționale. Dacă riscul meteorologic e mare, retrage-te spre zone cunoscute.",
    "Bateria e la fel de importantă ca frânele. Ține mereu un power-bank plin de rezervă."
];

function getDailyMotivational(cityId) {
    // Schimba gluma in functie de minutul curent (se actualizeaza la un anumit interval)
    const now = new Date();
    // Fiecare 5 minute se da render din nou
    const minBlock = Math.floor(now.getMinutes() / 5); 
    const seed = cityId + '-' + now.getHours() + '-' + minBlock;
    
    let hash = 0;
    for (let i = 0; i < seed.length; i++) {
        hash = seed.charCodeAt(i) + ((hash << 5) - hash);
    }
    const index = Math.abs(hash) % motivationals.length;
    return "💡 " + motivationals[index];
}

// ====== PWA INSTALL PROMPT ======
let deferredInstallPrompt = null;
window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    deferredInstallPrompt = e;
    const installBtn = document.getElementById('install-btn');
    if (installBtn) installBtn.style.display = 'flex';
});

window.addEventListener('appinstalled', () => {
    deferredInstallPrompt = null;
    const installBtn = document.getElementById('install-btn');
    if (installBtn) installBtn.style.display = 'none';
});

// ====== PREMIUM AUDIO ALERTS ======
function playPremiumSound(type) {
    try {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;
        const ctx = new AudioContext();
        
        if (type === 'maxim') {
            // Urgent, high-energy arpeggio (C5 -> E5 -> G5 -> C6)
            const notes = [523.25, 659.25, 783.99, 1046.50];
            let startTime = ctx.currentTime;
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'triangle';
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(0.3, startTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.15);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.2);
                startTime += 0.1;
            });
            // Add a final ambient bell ringing alongside the last note
            const bellOsc = ctx.createOscillator();
            const bellGain = ctx.createGain();
            bellOsc.type = 'sine';
            bellOsc.frequency.setValueAtTime(1046.50, startTime - 0.1);
            bellGain.gain.setValueAtTime(0, startTime - 0.1);
            bellGain.gain.linearRampToValueAtTime(0.15, startTime - 0.05);
            bellGain.gain.exponentialRampToValueAtTime(0.01, startTime + 1.2);
            bellOsc.connect(bellGain); bellGain.connect(ctx.destination);
            bellOsc.start(startTime - 0.1);
            bellOsc.stop(startTime + 1.3);
            
        } else if (type === 'optim') {
            // Soft, encouraging double-chime (E5 -> A5)
            const notes = [659.25, 880.00];
            let startTime = ctx.currentTime;
            notes.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                osc.type = 'sine';
                osc.frequency.setValueAtTime(freq, startTime);
                gain.gain.setValueAtTime(0, startTime);
                gain.gain.linearRampToValueAtTime(0.2, startTime + 0.05);
                gain.gain.exponentialRampToValueAtTime(0.01, startTime + 0.4);
                osc.connect(gain); gain.connect(ctx.destination);
                osc.start(startTime);
                osc.stop(startTime + 0.5);
                startTime += 0.15;
            });
        }
    } catch(e) { console.log('Audio disabled or unsupported'); }
}


// ====== EVENT BINDINGS ======
document.addEventListener('DOMContentLoaded', () => {


    bindEvents();
    loadCity(state.city);
    
    // Install button click handler
    const installBtn = document.getElementById('install-btn');
    if (installBtn) {
        installBtn.addEventListener('click', async () => {
            if (deferredInstallPrompt) {
                deferredInstallPrompt.prompt();
                const result = await deferredInstallPrompt.userChoice;
                deferredInstallPrompt = null;
                if (result.outcome === 'accepted') {
                    installBtn.style.display = 'none';
                }
            } else {
                // iOS or already installed — show manual instructions
                const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
                if (isIOS) {
                    alert('Pentru a instala Manual DS:\n\n1. Apasa iconita Share (patrat cu sageata)\n2. Alege "Add to Home Screen"\n3. Confirma cu "Add"\n\nGata! Vei avea Manual DS pe ecranul principal.');
                }
            }
        });
        
        // Show install button on iOS (no beforeinstallprompt support)
        const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
        const isStandalone = window.matchMedia('(display-mode: standalone)').matches;
        if (isIOS && !isStandalone) {
            installBtn.style.display = 'flex';
        }
    }
    
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
                loadCityDebounced(closest);
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
            loadCityDebounced(cityId);
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
    

    
    // ====== INFO TOOLTIP SYSTEM ======
    document.querySelectorAll('.info-tip').forEach(tip => {
        tip.addEventListener('click', (e) => {
            e.stopPropagation();
            // Close all other popovers
            document.querySelectorAll('.info-popover').forEach(p => p.remove());
            
            const popover = document.createElement('div');
            popover.className = 'info-popover';
            popover.innerHTML = `<p>${tip.dataset.tip}</p>`;
            document.body.appendChild(popover);
            
            // Position fixed near the tip
            const rect = tip.getBoundingClientRect();
            const popW = 300;
            let left = rect.left + rect.width / 2 - popW / 2;
            if (left < 10) left = 10;
            if (left + popW > window.innerWidth - 10) left = window.innerWidth - popW - 10;
            let top = rect.bottom + 10;
            if (top + 120 > window.innerHeight) top = rect.top - 120;
            popover.style.left = left + 'px';
            popover.style.top = top + 'px';
            
            // Auto-close after 5 seconds
            setTimeout(() => { if (popover.parentNode) popover.remove(); }, 5000);
        });
    });
    // Close tooltips on outside click
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.info-tip')) {
            document.querySelectorAll('.info-popover').forEach(p => p.remove());
        }
    });
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
    
    // Set City Title
    const cityTitle = document.getElementById('selected-city-title');
    if (cityTitle) cityTitle.textContent = data.name;
    
    const mainContent = document.getElementById('main-content');
    if(mainContent) {
        mainContent.classList.remove('loaded');
        mainContent.classList.add('loading');
    }
    
    setTimeout(() => {
        // Header
        // document.getElementById('city-title').innerText = data.name;
        
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
        
        // Peak Hours Highlighting
        updatePeakHours();
        
        // City News API
        fetchNews(data.name);
        
        // ====== NEW SECTIONS (Faza 2) ======
        
        // 7. Gold Tips
        const goldList = document.getElementById('gold-list');
        if (goldList) {
            goldList.innerHTML = commonData.gold.map(g => `
                <div class="gold-item">
                    <div class="gold-sit">${g.sit}</div>
                    <div class="gold-det">${g.det}</div>
                    <span class="gold-bonus notranslate">${g.bonus}</span>
                </div>
            `).join('');
        }
        
        // 8. Volume Zones
        const volZones = document.getElementById('volume-zones');
        if (volZones) {
            volZones.innerHTML = data.volumeZones.map(vz => `
                <div class="vol-item">
                    <span class="vol-icon">${vz.icon}</span>
                    <div class="vol-info">
                        <strong>${vz.name}</strong>
                        <p>${vz.desc}</p>
                    </div>
                </div>
            `).join('');
        }
        
        // 9. Earnings Table (Bike vs Car)
        renderEarningsTable('bike', data);
        // Tab handlers
        const tabBike = document.getElementById('tab-bike');
        const tabCar = document.getElementById('tab-car');
        if (tabBike && tabCar) {
            tabBike.onclick = () => { tabBike.classList.add('active'); tabCar.classList.remove('active'); renderEarningsTable('bike', data); };
            tabCar.onclick = () => { tabCar.classList.add('active'); tabBike.classList.remove('active'); renderEarningsTable('car', data); };
        }
        
        // 10. Rules & Mistakes
        const rulesList = document.getElementById('rules-list');
        const mistakesList = document.getElementById('mistakes-list');
        if (rulesList) {
            rulesList.innerHTML = commonData.rules.map(r => `
                <div class="rule-item do-item">
                    <div class="rule-act">${r.act}</div>
                    <div class="rule-res">${r.res}</div>
                </div>
            `).join('');
        }
        if (mistakesList) {
            mistakesList.innerHTML = commonData.mistakes.map(m => `
                <div class="rule-item dont-item">
                    <div class="rule-act">${m.mis}</div>
                    <div class="rule-res">${m.res}</div>
                </div>
            `).join('');
        }
        
        // 11. Progression
        const progList = document.getElementById('progression-list');
        if (progList) {
            progList.innerHTML = commonData.progression.map(p => `
                <div class="prog-step" data-level="${p.level}">
                    <div class="prog-dot">
                        <span class="prog-level">${p.level}</span>
                    </div>
                    <div class="prog-info">
                        <h4>${p.title}</h4>
                        <p>${p.desc}</p>
                    </div>
                </div>
            `).join('');
        }

        // 12. Smart Data Render (Zones, Risk, Route)
        const renderSmartList = (dataList, rootClass) => {
            if (!dataList) return '';
            return '<div class="smart-grid">' + dataList.map(item => `
                <div class="${rootClass}-item smart-box">
                    <h4 class="sm-title">${item.title}</h4>
                    <p class="sm-desc">${item.desc}</p>
                </div>
            `).join('') + '</div>';
        };

        const szTab = document.getElementById('tab-smart-zones');
        if (szTab) szTab.innerHTML = renderSmartList(commonData.smartZones, 'sm-zone');
        
        const srTab = document.getElementById('tab-smart-risk');
        if (srTab) srTab.innerHTML = renderSmartList(commonData.smartRisk, 'sm-risk');
        
        const sRoTab = document.getElementById('tab-smart-route');
        if (sRoTab) sRoTab.innerHTML = renderSmartList(commonData.smartRoute, 'sm-route');
        
        if (mainContent) {
            mainContent.classList.remove('loading');
            mainContent.classList.add('loaded');
        }
    }, 150);
}

// ====== EARNINGS TABLE RENDER ======
function renderEarningsTable(vehicle, data) {
    const container = document.getElementById('earnings-table');
    if (!container || !data.earnings || !data.earnings[vehicle]) return;
    
    const rows = data.earnings[vehicle];
    const icon = vehicle === 'bike' ? '🚲' : '🚗';
    
    container.innerHTML = `
        <table class="earn-table">
            <thead>
                <tr>
                    <th>${icon} Schimb</th>
                    <th>Comenzi</th>
                    <th>Castig Estimat</th>
                </tr>
            </thead>
            <tbody>
                ${rows.map(r => `
                    <tr>
                        <td class="earn-hours">${r.hours}</td>
                        <td>${r.orders}</td>
                        <td class="earn-amount">${r.earning}</td>
                    </tr>
                `).join('')}
            </tbody>
        </table>
    `;
}

// ====== PEAK HOURS ======
function updatePeakHours() {
    const now = new Date();
    const h = now.getHours();
    const m = now.getMinutes();
    const currentMinutes = h * 60 + m;
    
    const lunchEl = document.getElementById('peak-lunch');
    const eveningEl = document.getElementById('peak-evening');
    
    // Pranz: 10:30 - 15:30 (630 - 930 minutes)
    if (lunchEl) {
        if (currentMinutes >= 630 && currentMinutes <= 930) {
            lunchEl.classList.add('active');
        } else {
            lunchEl.classList.remove('active');
        }
    }
    
    // Cina: 17:00 - 00:00 (1020 - 1440 minutes, which is just >= 1020 since currentMinutes is max 1439)
    if (eveningEl) {
        if (currentMinutes >= 1020) {
            eveningEl.classList.add('active');
        } else {
            eveningEl.classList.remove('active');
        }
    }
}

// ====== EVENTS FEED RENDERER ======
function renderCityEvents(cityEvents) {
    const container = document.getElementById('events-list');
    if (!container) return;
    
    if (!cityEvents || cityEvents.length === 0) {
        container.innerHTML = '<p class="events-empty">Niciun eveniment activ in aceasta zona.</p>';
        return;
    }
    
    const typeIcons = { concert: '🎵', match: '⚽', festival: '🎪', traffic: '🚧', event: '🎫' };
    
    const html = cityEvents.map(ev => {
        const icon = typeIcons[ev.type] || '📌';
        const statusClass = ev.status || 'upcoming';
        const statusLabel = statusClass === 'live' ? '🔴 LIVE' : statusClass === 'upcoming' ? '🟡 UPCOMING' : '⚪ TRECUT';
        
        return `<div class="event-item">
            <span class="event-icon">${icon}</span>
            <div class="event-info">
                <h4>${ev.name}</h4>
                <p>${ev.start} — ${ev.end}</p>
            </div>
            <span class="event-impact">+${ev.impact_score}%</span>
            <span class="event-status ${statusClass}">${statusLabel}</span>
        </div>`;
    }).join('');
    
    container.innerHTML = html;
}

// ====== NEWS API INTEGRATION ======
async function fetchNews(cityName) {
    const newsContainer = document.getElementById('city-news-feed');
    if (!newsContainer) return;
    
    newsContainer.innerHTML = '<div class="news-loading-pulse" style="text-align:center; padding: 10px; color: #aaa; font-style: italic;">Caută știri locale...</div>';
    
    try {
        const query = encodeURIComponent(cityName + ' trafic OR stiri');
        const rssUrl = encodeURIComponent(`https://news.google.com/rss/search?q=${query}&hl=ro&gl=RO&ceid=RO:ro`);
        const apiUrl = `https://api.rss2json.com/v1/api.json?rss_url=${rssUrl}`;
        
        const response = await fetch(apiUrl);
        if (!response.ok) throw new Error('API Error');
        const data = await response.json();
        
        if (data.status === 'ok' && data.items && data.items.length > 0) {
            const articles = data.items.slice(0, 4);
            newsContainer.innerHTML = articles.map(item => {
                const titleParts = item.title.split(' - ');
                const cleanTitle = titleParts[0] || item.title;
                const source = item.source || titleParts.pop() || 'Sursă Locală';
                
                return `
                <a href="${item.link}" target="_blank" rel="noopener noreferrer" class="news-item">
                    <span class="news-title">${cleanTitle}</span>
                    <span class="news-source">${source} &bull; ${new Date(item.pubDate.replace(/-/g, '/')).toLocaleTimeString('ro-RO', {hour:'2-digit', minute:'2-digit'})}</span>
                </a>
                `;
            }).join('');
        } else {
            newsContainer.innerHTML = '<div style="text-align:center; padding: 10px; color: #aaa; font-style: italic;">Momentan nu sunt alerte majore.</div>';
        }
    } catch (error) {
        console.warn('News RSS Rate Limited / Fallback active.');
        newsContainer.innerHTML = '<div style="text-align:center; padding: 10px; color: #666; font-size: 0.8rem; font-style: italic; letter-spacing: 0.5px;">SYSTEM STANDBY: Citire feed locală oprită temporar.</div>';
    }
}

// ====== FETCH LIVE METRICS ======
async function fetchLiveMetrics(lat, lng, cityId) {
    const syncTime = document.getElementById('sync-time');
    if (syncTime) syncTime.innerText = 'Sync: Fetch...';
    
    try {
        const urlW = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,wind_speed_10m,weather_code,relative_humidity_2m&hourly=weather_code&daily=weather_code,temperature_2m_max,temperature_2m_min&timezone=auto`;
        
        // Efectuare requesturi concurente (paralel) pt optimizare rețea
        const [resW, resE] = await Promise.all([
            fetch(urlW),
            fetch('events-live.json?t=' + Date.now()).catch(e => { console.warn("Events API failed", e); return null; })
        ]);
        
        const wData = await resW.json();
        
        let eData = {};
        if (resE && resE.ok) {
            eData = await resE.json();
        }
        
        const cityEvents = eData[cityId] || [];
        const cityNews = eData.news ? (eData.news[cityId] || []) : [];
        const nationalAlert = eData.national_alert || null;
        
        renderCityEvents(cityEvents);
        calculateAndRenderLiveDashboard(wData, cityEvents, cityNews, nationalAlert, cityId);
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

function calculateAndRenderLiveDashboard(wData, cityEvents, cityNews = [], nationalAlert = null, cityId = 'fallback') {
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
        if (ev.status === 'live' || ev.status === 'upcoming' || ev.status === 'active') {
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
    let motivMsg = getDailyMotivational(cityId);
    let mulBadge = 'low', mulText = 'STANDARD';
    
    if (demandScore >= 75) {
        momentum = 'MAXIM';
        mulBadge = 'aggressive'; mulText = 'AGRESIV';
        
        if (state.lastMomentum !== 'MAXIM') {
            state.lastMomentum = 'MAXIM';
            // Haptic Feedback
            if(navigator.vibrate) navigator.vibrate([100, 50, 100, 50, 200]);
            // Premium Audio
            playPremiumSound('maxim');
            
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
        mulBadge = 'high'; mulText = 'RIDICAT';
        
        if (state.lastMomentum !== 'NIVEL OPTIM' && state.lastMomentum !== 'MAXIM') {
            state.lastMomentum = 'NIVEL OPTIM';
            if(navigator.vibrate) navigator.vibrate([120]);
            playPremiumSound('optim');
        } else {
            state.lastMomentum = 'NIVEL OPTIM';
        }
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
        
        // Header (Legacy compatibility)
        const hdrDemand = document.getElementById('hdr-demand');
        if (hdrDemand) hdrDemand.innerText = `${demandScore}%`;
        const hdrProfit = document.getElementById('hdr-profit');
        if (hdrProfit) hdrProfit.innerText = `${earningPotential}%`;
        const hdrMomentum = document.getElementById('hdr-momentum');
        if (hdrMomentum) hdrMomentum.innerText = momentum;
        const msgEl = document.getElementById('motivational-message');
        if (msgEl) msgEl.innerText = motivMsg;
        
        // Snapshot / Tactic Module
        // 1. Meteo
        document.getElementById('snap-w-icon').innerText = getWeatherIcon(code);
        document.getElementById('snap-w-temp').innerText = `${Math.round(temp)}°C`;
        document.getElementById('snap-w-desc').innerText = `${wReason}`;
        document.getElementById('snap-w-desc').className = wImpact > 0 ? 'warning' : 'neutral';
        
        // 2. Trafic Logic (Dedus pe baza algoritmului Smart)
        let trStatus = 'Fluid'; let trDesc = 'Timp ideal'; let trClass = 'positive'; let trIcon = '🚦';
        if (demandScore > 80 || wImpact > 30) { trStatus = 'Aglomerat'; trDesc = 'Intarzieri >10m'; trClass = 'warning'; trIcon = '🚨'; }
        else if (demandScore > 55 || wImpact > 10) { trStatus = 'Moderat'; trDesc = 'Cateva blocaje'; trClass = 'neutral'; trIcon = '🚕'; }
        
        document.getElementById('snap-tr-icon').innerText = trIcon;
        document.getElementById('snap-tr-status').innerText = trStatus;
        document.getElementById('snap-tr-desc').innerText = trDesc;
        document.getElementById('snap-tr-desc').className = trClass;

        // 3. Evenimente
        document.getElementById('snap-e-icon').innerText = activeEvents.length > 0 ? '🎫' : '📍';
        document.getElementById('snap-e-status').innerText = eventStatus;
        document.getElementById('snap-e-desc').innerText = eventDesc;
        document.getElementById('snap-e-desc').className = eImpact > 0 ? 'warning' : 'neutral';

        // 4. News
        if (cityNews.length > 0) {
            document.getElementById('snap-n-icon').innerText = '📰';
            document.getElementById('snap-n-title').innerText = cityNews[0].title;
            document.getElementById('snap-n-desc').innerText = cityNews[0].content;
            document.getElementById('snap-n-desc').className = cityNews[0].sentiment === 'positive' ? 'positive' : 'warning';
        } else {
            document.getElementById('snap-n-icon').innerText = '📰';
            document.getElementById('snap-n-title').innerText = 'Fara Alerte';
            document.getElementById('snap-n-desc').innerText = 'Totul este OK local';
            document.getElementById('snap-n-desc').className = 'positive';
        }

        // National Alert Micro-Popup
        const natBox = document.getElementById('national-alert-box');
        if (nationalAlert && nationalAlert.active && natBox) {
            natBox.style.display = 'flex';
            document.getElementById('nat-alert-title').innerText = nationalAlert.title;
            document.getElementById('nat-alert-desc').innerText = nationalAlert.message;
            document.getElementById('close-nat-btn').onclick = () => {
                natBox.style.display = 'none';
            };
        } else if (natBox) {
            natBox.style.display = 'none';
        }

        // RADAR CURIER (Cerere)
        const demandBar = document.getElementById('demand-bar');
        if (demandBar) {
            demandBar.style.width = `${demandScore}%`;
            document.getElementById('demand-val').innerText = `${demandScore}%`;
            const getLevel = (v) => v < 40 ? 'level-low' : v < 60 ? 'level-mid' : v < 80 ? 'level-high' : 'level-max';
            demandBar.className = `progress-fill ${getLevel(demandScore)}`;
        }
        
        // Radar Recommendation Logic
        const radarRec = document.getElementById('radar-recommendation');
        if (radarRec) {
            let topZoneText = document.getElementById('act-zones');
            let zoneStr = topZoneText ? topZoneText.innerText : "Centrul Orasului";
            if (demandScore > 80) {
                radarRec.innerText = `Directioneaza-te imediat spre ${zoneStr.split(',')[0]} (Volum Maxim) 🚀`;
                radarRec.style.color = '#fff';
            } else if (demandScore > 50) {
                radarRec.innerText = `Zone bune de preluare: ${zoneStr}. Ramai conectat.`;
                radarRec.style.color = '#ddd';
            } else {
                radarRec.innerText = `Cerere scazuta. Repozitioneaza-te spre noduri comerciale.`;
                radarRec.style.color = '#aaa';
            }
        }

        // IMPACT MULTIPLICATOR (Profit & Evenimente combinate)
        const profitBar = document.getElementById('profit-bar');
        if (profitBar) {
            profitBar.style.width = `${earningPotential}%`;
            document.getElementById('profit-val').innerText = `${earningPotential}%`;
            const getLevel = (v) => v < 40 ? 'level-low' : v < 60 ? 'level-mid' : v < 80 ? 'level-high' : 'level-max';
            profitBar.className = `progress-fill earning-grad ${getLevel(earningPotential)}`;
        }
        
        const mulEl = document.getElementById('profit-indicator');
        if (mulEl) {
            mulEl.className = `mul-badge ${mulBadge}`;
            mulEl.innerText = mulText;
        }

        // Sub-indicatori Impact
        const peakInd = document.getElementById('impact-peak-indicator');
        if (peakInd) {
            if (h >= 11 && h <= 14) { peakInd.innerText = "PRANZ (+30% Cerere)"; peakInd.style.color = "#FF9800"; }
            else if (h >= 18 && h <= 21) { peakInd.innerText = "CINA (+45% Cerere)"; peakInd.style.color = "#FF5722"; }
            else { peakInd.innerText = "Normal"; peakInd.style.color = "#4CAF50"; }
        }

        const evInd = document.getElementById('impact-event-indicator');
        if (evInd) {
            if (eImpact > 10) { evInd.innerText = `Major (+${eImpact}%)`; evInd.style.color = "#F44336"; }
            else if (eImpact > 0) { evInd.innerText = `Moderat (+${eImpact}%)`; evInd.style.color = "#FFB800"; }
            else { evInd.innerText = "Fara Impact"; evInd.style.color = "#4CAF50"; }
        }
        
        // 3.2 Pulse on status-badge when demand > 75%
        const hotBadge = document.querySelector('.status-badge.hot');
        if (hotBadge) {
            if (demandScore >= 75) {
                hotBadge.classList.add('pulsing');
            } else {
                hotBadge.classList.remove('pulsing');
            }
        }
        
        // 3.3 Glow effect on cards based on demand
        // Since sections are now tactic/radar/impact, we target those
        const glowCards = document.querySelectorAll('.tactic-card, .radar-card, .impact-card');
        glowCards.forEach(card => {
            card.classList.remove('glow-low', 'glow-mid', 'glow-high', 'glow-max');
            if (demandScore >= 75) card.classList.add('glow-max');
            else if (demandScore >= 55) card.classList.add('glow-high');
            else if (demandScore >= 40) card.classList.add('glow-mid');
        });
    });
}

// ====== LAZY REVEAL (IntersectionObserver) ======
if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });

    // Observe cards after DOM ready
    document.addEventListener('DOMContentLoaded', () => {
    
    // ====== LANGUAGE SELECTOR (GTranslate Injector) ======
    const currentLang = document.getElementById('current-lang');
    const langDropdown = document.getElementById('lang-dropdown');
    
    if (currentLang && langDropdown) {
        currentLang.addEventListener('click', (e) => {
            e.stopPropagation();
            langDropdown.classList.toggle('active');
        });

        document.addEventListener('click', (e) => {
            if (!langDropdown.contains(e.target) && !currentLang.contains(e.target)) {
                langDropdown.classList.remove('active');
            }
        });

        document.querySelectorAll('.lang-opt').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const targetLang = e.target.getAttribute('data-lang');
                const targetFlag = e.target.getAttribute('data-flag');
                
                document.getElementById('current-code').innerText = targetLang.toUpperCase();
                document.getElementById('current-flag').innerText = targetFlag;
                langDropdown.classList.remove('active');
                
                // Trigger Google Translate
                const gtSelect = document.querySelector('.goog-te-combo');
                if (gtSelect) {
                    gtSelect.value = targetLang;
                    gtSelect.dispatchEvent(new Event('change'));
                } else {
                    document.cookie = `googtrans=/ro/${targetLang}; path=/;`;
                    window.location.reload();
                }
            });
        });
        
        // Init visual state based on cookie
        const match = document.cookie.match(/googtrans=\/ro\/([a-z]{2})/);
        if (match && match[1]) {
            const code = match[1];
            const btn = document.querySelector(`.lang-opt[data-lang="${code}"]`);
            if (btn) {
                document.getElementById('current-code').innerText = code.toUpperCase();
                document.getElementById('current-flag').innerText = btn.getAttribute('data-flag');
            }
        }
    }

        document.querySelectorAll('.glass-card').forEach((card, i) => {
            if (i > 2) { // Skip first 3 (above fold)
                card.classList.add('lazy-card');
                revealObserver.observe(card);
            }
        });
    });
}
// tab scripts
document.addEventListener('DOMContentLoaded', () => {
    const hubBtns = document.querySelectorAll('.hub-btn');
    const hubPanes = document.querySelectorAll('.hub-pane');

    hubBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active from all
            hubBtns.forEach(b => b.classList.remove('active'));
            hubPanes.forEach(p => p.style.display = 'none');

            // Add active to clicked
            btn.classList.add('active');

            const tabId = btn.getAttribute('data-tab');
            const targetPane = document.getElementById('tab-' + tabId);
            if (targetPane) {
                targetPane.style.display = 'block';
            }
        });
    });
});

// ====== ONBOARDING TOUR (SNIPER ENGINE) ======
const getTourSteps = () => [
    {
        selector: window.innerWidth <= 768 ? '.mobile-menu-btn' : '#city-sidebar',
        title: 'Selector Oraș',
        text: 'Aici alegi orașul în care operezi. Radarul și statisticile se vor adapta automat zonelor tale.',
        position: 'bottom'
    },
    {
        selector: '.snapshot-card',
        title: 'Modul Tactic Live',
        text: 'Panoul principal de control. Analizează vremea, traficul și alertele majore care pot influența masiv volumul de comenzi.',
        position: 'bottom'
    },
    {
        selector: '.demand-card',
        title: 'Radar Curier',
        text: 'Termometrul pieței. Îți va oferi procentul estimat de efort și cele mai optime zone de preluare în timp real.',
        position: 'top'
    },
    {
        selector: '.earning-card',
        title: 'Impact & Profit',
        text: 'Multiplicatorul vizual. Un status maxim cauzat de aglomerație sau ploi garantează profit extrem prin bonusuri zonale.',
        position: 'top'
    },
    {
        selector: '.hub-card',
        title: 'Înțelepciunea Dragonilor',
        text: 'Manualul de performanță. Glisează lateral peste tab-uri pentru acces rapid la Castiguri Orar, Asa DA/NU și Golden Tips.',
        position: 'top'
    }
];

let currentTourStep = 0;
let isTourActive = false;

function initTour(force = false) {
    if (!force && localStorage.getItem('ds_tour_completed') === 'true') return;
    
    // Close mobile menu if open before tour
    const sidebar = document.getElementById('city-sidebar');
    const overlayMenu = document.getElementById('sidebar-overlay');
    if (sidebar && sidebar.classList.contains('active')) {
        sidebar.classList.remove('active');
        if (overlayMenu) overlayMenu.classList.remove('active');
    }

    currentTourStep = 0;
    isTourActive = true;
    
    const hole = document.getElementById('tour-hole');
    if(hole) hole.classList.add('tour-active');
    
    const stepsArr = getTourSteps();
    const totalEl = document.getElementById('tour-step-total');
    if(totalEl) totalEl.innerText = stepsArr.length;
    
    renderTourStep();
}

function renderTourStep() {
    // Remove previous highlights
    document.querySelectorAll('.tour-highlighted').forEach(el => el.classList.remove('tour-highlighted'));
    
    const stepsArr = getTourSteps();
    const step = stepsArr[currentTourStep];
    const targetEl = document.querySelector(step.selector);
    
    if (!targetEl) { console.warn('Tour target missing:', step.selector); endTour(); return; }
    
    // Scroll into view safely
    targetEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    
    // Slight delay for smooth scroll before highlight
    setTimeout(() => {
        const rect = targetEl.getBoundingClientRect();
        const hole = document.getElementById('tour-hole');
        
        // Position the physical hole using Viewport Coordinates (Fixed position)
        if (hole) {
            hole.style.top = (rect.top - 5) + 'px';
            hole.style.left = (rect.left - 5) + 'px';
            hole.style.width = (rect.width + 10) + 'px';
            hole.style.height = (rect.height + 10) + 'px';
        }
        
        targetEl.classList.add('tour-highlighted');
        
        const box = document.getElementById('tour-box');
        if(!box) return;
        
        document.getElementById('tour-title').innerText = step.title;
        document.getElementById('tour-content').innerText = step.text;
        document.getElementById('tour-step-current').innerText = currentTourStep + 1;
        
        // Buttons
        document.getElementById('tour-btn-prev').style.display = currentTourStep === 0 ? 'none' : 'block';
        document.getElementById('tour-btn-next').innerText = currentTourStep === stepsArr.length - 1 ? 'Finalizare' : 'Următorul';
        
        // Positioning
        const boxHeight = box.offsetHeight || 150;
        let top = rect.bottom + window.scrollY + 20;
        let left = rect.left + window.scrollX + (rect.width / 2) - 150; // Center horiz
        
        if (step.position === 'top') {
            top = rect.top + window.scrollY - boxHeight - 20;
        }

        // Prevent off-screen left/right
        if (left + 320 > window.innerWidth) left = window.innerWidth - 320;
        if (left < 10) left = 10;
        
        // Prevent off-screen top
        if (top < window.scrollY + 10) top = rect.bottom + window.scrollY + 20;
        
        box.style.top = top + 'px';
        box.style.left = left + 'px';
        box.classList.add('tour-box-active');
    }, 450); // delay pt ecran mobil
}

function nextTourStep() {
    const stepsArr = getTourSteps();
    if (currentTourStep >= stepsArr.length - 1) {
        endTour();
    } else {
        currentTourStep++;
        renderTourStep();
    }
}

function prevTourStep() {
    if (currentTourStep > 0) {
        currentTourStep--;
        renderTourStep();
    }
}

function endTour() {
    isTourActive = false;
    document.querySelectorAll('.tour-highlighted').forEach(el => el.classList.remove('tour-highlighted'));
    const hole = document.getElementById('tour-hole');
    const box = document.getElementById('tour-box');
    if(hole) hole.classList.remove('tour-active');
    if(box) box.classList.remove('tour-box-active');
    localStorage.setItem('ds_tour_completed', 'true');
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const btnSkip = document.getElementById('tour-btn-skip');
        const btnNext = document.getElementById('tour-btn-next');
        const btnPrev = document.getElementById('tour-btn-prev');
        
        if (btnSkip) btnSkip.addEventListener('click', endTour);
        if (btnNext) btnNext.addEventListener('click', nextTourStep);
        if (btnPrev) btnPrev.addEventListener('click', prevTourStep);
        
        // Secret reset by clicking the logo
        const topLogo = document.querySelector('.logo');
        if (topLogo) {
            topLogo.addEventListener('click', () => {
                localStorage.removeItem('ds_tour_completed');
                initTour(true);
            });
        }
        
        // Auto-start for new device
        setTimeout(() => initTour(false), 2000);
    }, 800);
});
