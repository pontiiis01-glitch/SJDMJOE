/**
 * JOE Planning Dashboard Logic
 * COCB-M 2026
 */

// --- FIREBASE CONFIG (PASTE YOUR CONFIG HERE) ---
const firebaseConfig = {
    apiKey: "SUA_API_KEY",
    authDomain: "SEU_PROJETO.firebaseapp.com",
    databaseURL: "https://SEU_PROJETO-default-rtdb.firebaseio.com",
    projectId: "SEU_PROJETO",
    storageBucket: "SEU_PROJETO.appspot.com",
    messagingSenderId: "SEU_ID",
    appId: "SEU_APP_ID"
};

// Initialize Firebase if config is filled
let db = null;
if (firebaseConfig.apiKey !== "SUA_API_KEY") {
    firebase.initializeApp(firebaseConfig);
    db = firebase.database();
}

// --- DATA ---
const DEFAULT_JOE_DATA = [
    { id: 1, name: "Cortejo", dateString: "05 de junho de 2026", p1: { daysJun: 1, daysJul: 0, days: 1, efetivo: 40, unitCost: 350, risk: "Nível III", vehicles: { ar: 2, ur: 1, abt: 1 } }, p2: { daysJun: 0, daysJul: 0, days: 0, efetivo: 0, unitCost: 300, risk: "Nível II", vehicles: { ar: 0, ur: 0, abt: 0 } } },
    { id: 2, name: "Ceprama (Festança)", dateString: "29 a 31 de maio de 2026", p1: { daysJun: 3, daysJul: 0, days: 3, efetivo: 8, unitCost: 350, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } }, p2: { daysJun: 0, daysJul: 0, days: 0, efetivo: 0, unitCost: 300, risk: "Nível II", vehicles: { ar: 0, ur: 0, abt: 0 } } },
    { id: 3, name: "São João da Thay", dateString: "06 de junho de 2026", p1: { daysJun: 1, daysJul: 0, days: 1, efetivo: 0, unitCost: 350, risk: "Nível III", vehicles: { ar: 2, ur: 1, abt: 1 } }, p2: { daysJun: 0, daysJul: 0, days: 0, efetivo: 0, unitCost: 300, risk: "Nível II", vehicles: { ar: 0, ur: 0, abt: 0 } } },
    { id: 4, name: "Maranhão de Reencontros", dateString: "10, 17, 24 e 31 de maio de 2026", p1: { daysJun: 4, daysJul: 0, days: 4, efetivo: 0, unitCost: 350, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } }, p2: { daysJun: 0, daysJul: 0, days: 0, efetivo: 0, unitCost: 300, risk: "Nível II", vehicles: { ar: 0, ur: 0, abt: 0 } } },
    { id: 5, name: "Bumba Meu São João", dateString: "06, 12, 13, 14, 19, 24 e 29/jun e 05/jul", p1: { daysJun: 7, daysJul: 1, days: 8, efetivo: 40, unitCost: 350, risk: "Nível III", vehicles: { ar: 2, ur: 1, abt: 1 } }, p2: { daysJun: 0, daysJul: 0, days: 0, efetivo: 0, unitCost: 300, risk: "Nível II", vehicles: { ar: 0, ur: 0, abt: 0 } } },
    { id: 6, name: "Arraial do IPEM", dateString: "06 de junho a 05 de julho de 2026", p1: { daysJun: 13, daysJul: 2, days: 15, efetivo: 8, unitCost: 350, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } }, p2: { daysJun: 12, daysJul: 3, days: 15, efetivo: 8, unitCost: 300, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } } },
    { id: 7, name: "Arraial da Vila Palmeira", dateString: "03 a 07, 11 a 14, 18 a 21 e 25 a 29 de jun", p1: { daysJun: 10, daysJul: 0, days: 10, efetivo: 8, unitCost: 350, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } }, p2: { daysJun: 8, daysJul: 0, days: 8, efetivo: 8, unitCost: 300, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } } },
    { id: 8, name: "Arraial do Parque da Juçara", dateString: "13, 14, 18 a 21, 24 a 29/jun e 02 a 05/jul", p1: { daysJun: 8, daysJul: 2, days: 10, efetivo: 8, unitCost: 350, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } }, p2: { daysJun: 6, daysJul: 2, days: 8, efetivo: 8, unitCost: 300, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } } },
    { id: 9, name: "Caminhos da Cultura", dateString: "19-21, 26-28 jun; 03-05, 10-12 jul", p1: { daysJun: 6, daysJul: 6, days: 12, efetivo: 4, unitCost: 350, risk: "Nível I", vehicles: { ar: 1, ur: 0, abt: 0 } }, p2: { daysJun: 0, daysJul: 0, days: 0, efetivo: 0, unitCost: 300, risk: "Nível I", vehicles: { ar: 0, ur: 0, abt: 0 } } },
    { id: 10, name: "Capela de São Pedro", dateString: "28 e 29 de junho de 2026", p1: { daysJun: 2, daysJul: 0, days: 2, efetivo: 20, unitCost: 350, risk: "Nível III", vehicles: { ar: 2, ur: 1, abt: 1 } }, p2: { daysJun: 0, daysJul: 0, days: 0, efetivo: 0, unitCost: 300, risk: "Nível III", vehicles: { ar: 0, ur: 0, abt: 0 } } },
    { id: 11, name: "Festejo de São Marçal", dateString: "30 de junho de 2026", p1: { daysJun: 1, daysJul: 0, days: 1, efetivo: 120, unitCost: 350, risk: "Nível III", vehicles: { ar: 4, ur: 2, abt: 2 } }, p2: { daysJun: 0, daysJul: 0, days: 0, efetivo: 0, unitCost: 300, risk: "Nível III", vehicles: { ar: 0, ur: 0, abt: 0 } } },
    { id: 12, name: "São João da Prefeitura", dateString: "07 a 29 de junho de 2026", p1: { daysJun: 11, daysJul: 0, days: 11, efetivo: 10, unitCost: 350, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } }, p2: { daysJun: 12, daysJul: 0, days: 12, efetivo: 10, unitCost: 300, risk: "Nível II", vehicles: { ar: 1, ur: 1, abt: 1 } } }
];

function toggleEventVisibility(id) {
    const eventIdx = JOE_DATA.findIndex(e => e.id === id);
    if (eventIdx !== -1) {
        JOE_DATA[eventIdx].hidden = !JOE_DATA[eventIdx].hidden;
        saveToStorage();
        refreshUI();
    }
}

function calculateTotals(event) {
    if (!event.p1.vehicles) event.p1.vehicles = { ar: 0, ur: 0, abt: 0 };
    if (!event.p2.vehicles) event.p2.vehicles = { ar: 0, ur: 0, abt: 0 };

    // Initialize lists if missing
    if (!event.p1.daysMayList) event.p1.daysMayList = [];
    if (!event.p1.daysJunList) event.p1.daysJunList = [];
    if (!event.p1.daysJulList) event.p1.daysJulList = [];
    if (!event.p2.daysMayList) event.p2.daysMayList = [];
    if (!event.p2.daysJunList) event.p2.daysJunList = [];
    if (!event.p2.daysJulList) event.p2.daysJulList = [];

    // Sync counts
    event.p1.daysMay = event.p1.daysMayList.length;
    event.p1.daysJun = event.p1.daysJunList.length;
    event.p1.daysJul = event.p1.daysJulList.length;
    event.p2.daysMay = event.p2.daysMayList.length;
    event.p2.daysJun = event.p2.daysJunList.length;
    event.p2.daysJul = event.p2.daysJulList.length;

    event.p1.days = event.p1.daysMay + event.p1.daysJun + event.p1.daysJul;
    event.p2.days = event.p2.daysMay + event.p2.daysJun + event.p2.daysJul;

    // Auto-generate date strings
    const formatDayList = (list, month) => {
        if (list.length === 0) return "";
        return list.sort((a,b) => a-b).join(', ') + " de " + month;
    };
    
    event.p1.dateString = [formatDayList(event.p1.daysMayList, 'Maio'), formatDayList(event.p1.daysJunList, 'Junho'), formatDayList(event.p1.daysJulList, 'Julho')].filter(s => s).join(' e ');
    event.p2.dateString = [formatDayList(event.p2.daysMayList, 'Maio'), formatDayList(event.p2.daysJunList, 'Junho'), formatDayList(event.p2.daysJulList, 'Julho')].filter(s => s).join(' e ');
    event.dateString = event.p1.dateString;

    event.p1.coord = event.p1.coord || 0;
    event.p2.coord = event.p2.coord || 0;

    const md1 = event.p1.days * (event.p1.efetivo + event.p1.coord);
    const md2 = event.p2.days * (event.p2.efetivo + event.p2.coord);
    event.manDays = md1 + md2;
    event.totalCost = (md1 * event.p1.unitCost) + (md2 * event.p2.unitCost);
    
    event.coordManDays = (event.p1.days * event.p1.coord) + (event.p2.days * event.p2.coord);
    event.coordCost = (event.p1.days * event.p1.coord * event.p1.unitCost) + (event.p2.days * event.p2.coord * event.p2.unitCost);
    
    event.costMay = (event.p1.daysMay * (event.p1.efetivo + event.p1.coord) * event.p1.unitCost) + (event.p2.daysMay * (event.p2.efetivo + event.p2.coord) * event.p2.unitCost);
    event.costJun = (event.p1.daysJun * (event.p1.efetivo + event.p1.coord) * event.p1.unitCost) + (event.p2.daysJun * (event.p2.efetivo + event.p2.coord) * event.p2.unitCost);
    event.costJul = (event.p1.daysJul * (event.p1.efetivo + event.p1.coord) * event.p1.unitCost) + (event.p2.daysJul * (event.p2.efetivo + event.p2.coord) * event.p2.unitCost);
    
    event.manDaysMay = (event.p1.daysMay * (event.p1.efetivo + event.p1.coord)) + (event.p2.daysMay * (event.p2.efetivo + event.p2.coord));
    event.manDaysJun = (event.p1.daysJun * (event.p1.efetivo + event.p1.coord)) + (event.p2.daysJun * (event.p2.efetivo + event.p2.coord));
    event.manDaysJul = (event.p1.daysJul * (event.p1.efetivo + event.p1.coord)) + (event.p2.daysJul * (event.p2.efetivo + event.p2.coord));
    
    return event;
}

// Load from storage or use defaults
let JOE_DATA = [];
try {
    const stored = localStorage.getItem('JOE_PLAN_2026');
    if (stored) {
        JOE_DATA = JSON.parse(stored);
        
        JOE_DATA = JOE_DATA.map(event => {
            const defEvent = DEFAULT_JOE_DATA.find(d => d.id === event.id);
            if (defEvent) {
                if (!event.p1.vehicles && defEvent.p1.vehicles) event.p1.vehicles = { ...defEvent.p1.vehicles };
                if (!event.p2.vehicles && defEvent.p2.vehicles) event.p2.vehicles = { ...defEvent.p2.vehicles };
            }
            
            // Migration to Day Arrays
            if (!event.p1.daysMayList) event.p1.daysMayList = [];
            if (!event.p1.daysJunList) event.p1.daysJunList = [];
            if (!event.p1.daysJulList) event.p1.daysJulList = [];
            if (!event.p2.daysMayList) event.p2.daysMayList = [];
            if (!event.p2.daysJunList) event.p2.daysJunList = [];
            if (!event.p2.daysJulList) event.p2.daysJulList = [];

            return calculateTotals(event);
        });

        if (!JOE_DATA.some(e => e.id === 12)) {
            const ids = new Set(JOE_DATA.map(e => e.id));
            DEFAULT_JOE_DATA.forEach(def => {
                if (!ids.has(def.id)) JOE_DATA.push(calculateTotals(def));
            });
        }
    } else {
        JOE_DATA = DEFAULT_JOE_DATA.map(calculateTotals);
    }
} catch (e) {
    console.error("Erro ao carregar dados:", e);
    JOE_DATA = DEFAULT_JOE_DATA.map(calculateTotals);
}


function saveToStorage() {
    localStorage.setItem('JOE_PLAN_2026', JSON.stringify(JOE_DATA));
}

const LOGISTICS_DATA = {
    "Nível III": {
        title: "Nível III (Alto Risco)",
        vtrs: "01 AR, 01 UR, 01 ABT",
        special: "04+ Guarnições a pé (04 BMs), 01 Piloto de RPA",
        units: "1º BBM, BBS, BBEM, NUARP",
        class: "high"
    },
    "Nível II": {
        title: "Nível II (Médio Risco)",
        vtrs: "01 AR, 01 UR, 01 ABT",
        special: "Até 02 Guarnições a pé (04 BMs)",
        units: "2º BBM, 10º BBM",
        class: "med"
    },
    "Nível I": {
        title: "Nível I (Baixo Risco)",
        vtrs: "01 AR",
        special: "Guarnição a pé de até 04 BMs",
        units: "Diversas",
        class: "low"
    }
};

// --- UTILS ---
function getVtrIcon(type) {
    if (type === 'ar') {
        // Custom Pickup SVG
        return `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="vtr-ar" style="width: 18px; height: 18px;"><path d="M2 17h4M10 17h6M20 17h2"/><path d="M14 17V9a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v8"/><path d="M14 11h7l1 2v4h-2"/><circle cx="8" cy="17" r="2"/><circle cx="18" cy="17" r="2"/></svg>`;
    }
    if (type === 'ur') {
        return `<i data-lucide="ambulance" class="vtr-ur" style="width: 18px; height: 18px;"></i>`;
    }
    // ABT (Fire Truck) - Robust truck
    return `<i data-lucide="truck" class="vtr-abt" style="width: 18px; height: 18px;"></i>`;
}

// Color palette for events (High Contrast)
const EVENT_COLORS = [
    { bg: '#e11d48', border: '#be123c' }, // Crimson
    { bg: '#10b981', border: '#047857' }, // Emerald
    { bg: '#2563eb', border: '#1d4ed8' }, // Royal Blue
    { bg: '#ea580c', border: '#c2410c' }, // Burnt Orange
    { bg: '#7e22ce', border: '#6b21a8' }, // Deep Purple
    { bg: '#0f766e', border: '#115e59' }, // Teal
    { bg: '#be185d', border: '#9d174d' }, // Magenta
    { bg: '#b45309', border: '#92400e' }, // Dark Gold
    { bg: '#1d4ed8', border: '#1e3a8a' }, // Navy
    { bg: '#4d7c0f', border: '#3f6212' }  // Olive
];

function getEventColor(name) {
    if (!name) return EVENT_COLORS[0];
    let hash = 5381;
    for (let i = 0; i < name.length; i++) {
        hash = ((hash << 5) + hash) ^ name.charCodeAt(i); /* hash * 33 ^ c */
    }
    const index = Math.abs(hash) % EVENT_COLORS.length;
    return EVENT_COLORS[index];
}

const formatCurrency = (val) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(val);
};

const formatNumber = (val) => {
    return new Intl.NumberFormat('pt-BR').format(val);
};

const parseVehicleInput = (val) => {
    if (!val) return 0;
    val = String(val).trim();
    if (val === "0") return 0;
    if (/^\d+$/.test(val)) return parseInt(val, 10);
    return val;
};

const countVehicles = (val) => {
    if (typeof val === 'number') return val;
    if (typeof val === 'string') {
        if (!val.trim() || val === "0") return 0;
        return val.split(',').filter(s => s.trim().length > 0).length;
    }
    return 0;
};

// --- MAP LOGIC ---
const VENUE_COORDS = {
    "Arraial do IPEM": [-2.4925, -44.2750],
    "Arraial da Vila Palmeira": [-2.5535, -44.2715],
    "Ceprama": [-2.5365, -44.2985],
    "Bumba Meu São João": [-2.5510, -44.2570],
    "Arraial do Parque da Juçara": [-2.6080, -44.2650],
    "Arraial do Anjo da Guarda": [-2.5780, -44.3310],
    "Caminhos da Cultura": [-2.5280, -44.3050],
    "Cortejo": [-2.5300, -44.3000],
    "Arraial da Liberdade": [-2.5350, -44.2850],
    "Arraial da Cidade Operária": [-2.5750, -44.2050]
};

let map = null;
let mapMarkers = {}; // Changed to object to find by ID

function initMap() {
    if (map) return; // Already initialized

    const mapEl = document.getElementById('map');
    if (!mapEl) return;

    map = L.map('map').setView([-2.5307, -44.2755], 12);

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    updateMapMarkers();
}

function updateMapMarkers() {
    if (!map) return;

    // Clear existing markers
    for (let id in mapMarkers) {
        map.removeLayer(mapMarkers[id]);
    }
    mapMarkers = {};

    const filteredEvents = getFilteredEvents().filter(e => !e.hidden);

    filteredEvents.forEach(event => {
        let coords = null;
        
        if (event.coords && event.coords.lat && event.coords.lng) {
            coords = [event.coords.lat, event.coords.lng];
        } else {
            // Fallback to name search
            for (let name in VENUE_COORDS) {
                if (event.name.toLowerCase().includes(name.toLowerCase())) {
                    coords = VENUE_COORDS[name];
                    break;
                }
            }
        }

        if (coords) {
            const marker = L.marker(coords, { draggable: true }).addTo(map);
            
            // Handle Dragging
            marker.on('dragend', function(e) {
                const newLatLng = e.target.getLatLng();
                const eventIdx = JOE_DATA.findIndex(ev => ev.id === event.id);
                if (eventIdx !== -1) {
                    JOE_DATA[eventIdx].coords = { 
                        lat: parseFloat(newLatLng.lat.toFixed(6)), 
                        lng: parseFloat(newLatLng.lng.toFixed(6)) 
                    };
                    saveToStorage();
                    // Optional: show a small toast or feedback
                    console.log(`Posição de ${event.name} atualizada.`);
                }
            });

            const popupContent = `
                <div class="map-popup-header">
                    <h4>${event.name}</h4>
                </div>
                <div class="map-popup-body">
                    <p><strong>Efetivo:</strong> ${(event.p1.efetivo || 0) + (event.p1.coord || 0) + (event.p2.efetivo || 0) + (event.p2.coord || 0)} BMs</p>
                    <p><strong>VTRs:</strong> AR: ${event.p1.vehicles.ar}, UR: ${event.p1.vehicles.ur}, ABT: ${event.p1.vehicles.abt}</p>
                    <p><strong>Período:</strong> ${event.dateString}</p>
                </div>
                <div class="map-popup-footer">
                    ${event.p1.risk}
                </div>
            `;

            marker.bindPopup(popupContent);
            mapMarkers[event.id] = marker;
        }
    });
}

function focusEventOnMap(id) {
    const event = JOE_DATA.find(e => e.id === id);
    if (!event) return;

    // Switch Tab
    const logisticsTab = document.querySelector('.nav-item[data-tab="logistics"]');
    if (logisticsTab) logisticsTab.click();

    // Small delay to let tab switch and map initialize
    setTimeout(() => {
        const marker = mapMarkers[id];
        if (marker) {
            map.setView(marker.getLatLng(), 15);
            marker.openPopup();
        } else {
            alert(`O local "${event.name}" ainda não possui coordenadas mapeadas.`);
        }
    }, 300);
}

function getFilteredEvents() {
    const searchInput = document.getElementById('search-event');
    const searchTerm = searchInput ? searchInput.value.toLowerCase() : "";
    return JOE_DATA.filter(event => 
        event.name.toLowerCase().includes(searchTerm) || 
        event.dateString.toLowerCase().includes(searchTerm)
    );
}

const formatVehicleDisplay = (val1, val2, label) => {
    if (typeof val1 === 'number' && typeof val2 === 'number') {
        const sum = (val1 || 0) + (val2 || 0);
        return sum > 0 ? `${String(sum).padStart(2, '0')} ${label}` : '';
    }
    
    let items = [];
    if (typeof val1 === 'number' && val1 > 0) items.push(`${String(val1).padStart(2, '0')} ${label}`);
    else if (typeof val1 === 'string' && val1.trim() && val1 !== "0") items.push(val1);

    if (typeof val2 === 'number' && val2 > 0) items.push(`${String(val2).padStart(2, '0')} ${label}`);
    else if (typeof val2 === 'string' && val2.trim() && val2 !== "0") items.push(val2);

    return items.join(' | ');
};

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    initDashboard();
    initTabs();
});

function initDashboard() {
    refreshUI();
    
    // Search Listener
    document.getElementById('event-search')?.addEventListener('input', refreshUI);

    // 4. Render Risk Cards (Logistics)
    renderRiskCards();

    // 5. Initialize Chart
    initChart();

    // 6. Init Modal Listeners
    initModalListeners();

    // 7. Load Planning Notes
    loadPlanningNotes();
    
    // 8. Add Notes Listeners
    ['note-obs', 'note-logistics', 'note-critical'].forEach(id => {
        document.getElementById(id)?.addEventListener('input', savePlanningNotes);
    });

    // 9. Sync Listeners
    document.getElementById('btn-export-json')?.addEventListener('click', exportDataJSON);
    document.getElementById('btn-import-json')?.addEventListener('click', () => document.getElementById('input-import-json').click());
    document.getElementById('input-import-json')?.addEventListener('change', importDataJSON);
    document.getElementById('btn-cloud-sync')?.addEventListener('click', syncWithCloud);


    // 11. Finances Toggle
    initFinancesToggle();

    // Initial Cloud Pull if enabled
    if (db) {
        pullFromCloud();
    }
}

// --- FINANCES TOGGLE (Modo Apresentação) ---
function initFinancesToggle() {
    const btn = document.getElementById('btn-toggle-finances');
    if (!btn) return;

    // Restore saved state
    const isHidden = localStorage.getItem('JOE_FINANCES_HIDDEN') === 'true';
    if (isHidden) {
        document.body.classList.add('finances-hidden');
        btn.classList.add('finances-active');
        btn.querySelector('i')?.setAttribute('data-lucide', 'eye');
        btn.title = 'Exibir valores financeiros';
        lucide.createIcons();
        // Inicializa o gráfico alternativo com pequeno delay para o canvas estar visível
        setTimeout(initEfetivoChart, 100);
    }

    btn.addEventListener('click', () => {
        const hidden = document.body.classList.toggle('finances-hidden');
        btn.classList.toggle('finances-active', hidden);
        const icon = btn.querySelector('i');
        if (icon) {
            icon.setAttribute('data-lucide', hidden ? 'eye' : 'eye-off');
        }
        btn.title = hidden ? 'Exibir valores financeiros' : 'Ocultar valores financeiros';
        localStorage.setItem('JOE_FINANCES_HIDDEN', hidden);
        lucide.createIcons();

        // Atualizar grfico de efetivo alternativo se necessário
        if (hidden && !window.efetivoChart) {
            initEfetivoChart();
        } else if (!hidden && window.efetivoChart) {
            window.efetivoChart.destroy();
            window.efetivoChart = null;
        }
    });
}

// --- CLOUD SYNC LOGIC ---
async function syncWithCloud() {
    if (!db) {
        alert("Firebase não configurado. Cole suas credenciais no script.js");
        return;
    }
    
    const btn = document.getElementById('btn-cloud-sync');
    const originalHtml = btn.innerHTML;
    btn.innerHTML = '<i data-lucide="loader-2" class="spin"></i> <span>Sincronizando...</span>';
    lucide.createIcons();

    try {
        const dataToSync = {
            events: JOE_DATA,
            notes: JSON.parse(localStorage.getItem('JOE_PLAN_NOTES_2026')) || {},
            lastSync: new Date().toISOString()
        };
        
        await db.ref('joe_plan_2026').set(dataToSync);
        alert("Dados sincronizados com a nuvem com sucesso!");
    } catch (error) {
        console.error("Erro na sincronização:", error);
        alert("Erro ao sincronizar. Verifique as regras do seu Database.");
    } finally {
        btn.innerHTML = originalHtml;
        lucide.createIcons();
    }
}

async function pullFromCloud() {
    if (!db) return;
    try {
        const snapshot = await db.ref('joe_plan_2026').once('value');
        const cloudData = snapshot.val();
        if (cloudData && cloudData.events) {
            // Merge or replace? For now, we'll replace to ensure consistency across Netlify deploys
            JOE_DATA = cloudData.events;
            localStorage.setItem('JOE_PLAN_2026', JSON.stringify(JOE_DATA));
            if (cloudData.notes) {
                localStorage.setItem('JOE_PLAN_NOTES_2026', JSON.stringify(cloudData.notes));
            }
            refreshUI();
            loadPlanningNotes();
            console.log("Dados carregados da nuvem.");
        }
    } catch (error) {
        console.error("Erro ao baixar dados da nuvem:", error);
    }
}

// --- BACKUP LOGIC ---
function exportDataJSON() {
    const data = {
        events: JOE_DATA,
        notes: JSON.parse(localStorage.getItem('JOE_PLAN_NOTES_2026')) || {},
        version: "1.0",
        exportDate: new Date().toISOString()
    };
    
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `Backup_Planejamento_JOE_${new Date().toLocaleDateString().replace(/\//g, '-')}.json`;
    link.click();
}

function importDataJSON(e) {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = function(event) {
        try {
            const data = JSON.parse(event.target.result);
            if (data.events && Array.isArray(data.events)) {
                if (confirm("Isso substituirá todos os dados atuais. Deseja continuar?")) {
                    JOE_DATA = data.events;
                    saveToStorage();
                    if (data.notes) {
                        localStorage.setItem('JOE_PLAN_NOTES_2026', JSON.stringify(data.notes));
                    }
                    refreshUI();
                    loadPlanningNotes();
                    alert("Dados importados com sucesso!");
                }
            } else {
                alert("Arquivo JSON inválido.");
            }
        } catch (err) {
            alert("Erro ao ler o arquivo.");
        }
    };
    reader.readAsText(file);
}

function savePlanningNotes() {
    const notes = {
        obs: document.getElementById('note-obs').value,
        logistics: document.getElementById('note-logistics').value,
        critical: document.getElementById('note-critical').value
    };
    localStorage.setItem('JOE_PLAN_NOTES_2026', JSON.stringify(notes));
}

function loadPlanningNotes() {
    const stored = localStorage.getItem('JOE_PLAN_NOTES_2026');
    if (stored) {
        const notes = JSON.parse(stored);
        if (document.getElementById('note-obs')) document.getElementById('note-obs').value = notes.obs || '';
        if (document.getElementById('note-logistics')) document.getElementById('note-logistics').value = notes.logistics || '';
        if (document.getElementById('note-critical')) document.getElementById('note-critical').value = notes.critical || '';
    } else {
        // Defaults if none stored
        if (document.getElementById('note-critical')) {
            document.getElementById('note-critical').value = "Muitos arraiais não são regularizados pela Diretoria de Atividades Técnicas (DAT).";
        }
    }
}

function refreshUI() {
    // 1. Calculate Totals
    const query = (document.getElementById('event-search')?.value || '').toLowerCase();
    
    const filteredData = JOE_DATA.filter(event => {
        const nameMatch = event.name.toLowerCase().includes(query);
        const dateMatch = (event.dateString || '').toLowerCase().includes(query) || 
                          (event.p1.dateString || '').toLowerCase().includes(query) || 
                          (event.p2.dateString || '').toLowerCase().includes(query);
        return nameMatch || dateMatch;
    });

    const visibleData = filteredData.filter(e => !e.hidden);

    const totalBudget = visibleData.reduce((acc, item) => acc + item.totalCost, 0);
    const budgetJun = visibleData.reduce((acc, item) => acc + (item.costJun || 0), 0);
    const budgetJul = visibleData.reduce((acc, item) => acc + (item.costJul || 0), 0);
    
    // Coordination extraction for overview card
    const coordTotalManDays = visibleData.reduce((acc, item) => acc + (item.coordManDays || 0), 0);
    const totalManDays = visibleData.reduce((acc, item) => acc + item.manDays, 0);
    
    // Peak manpower calculation needs to be smarter - checking every day
    let peak = 0;
    for (let d = 1; d <= 31; d++) {
        const statsJun = getDailyStats(d, 5);
        const statsJul = getDailyStats(d, 6);
        
        peak = Math.max(peak, statsJun.efetivo, statsJul.efetivo);
    }
    const peakManpower = peak;

    // 2. Update UI Metrics
    document.getElementById('total-budget').textContent = formatCurrency(totalBudget);
    document.getElementById('budget-jun').textContent = formatCurrency(budgetJun);
    document.getElementById('budget-jul').textContent = formatCurrency(budgetJul);
    document.getElementById('total-man-days').textContent = formatNumber(totalManDays);
    if (document.getElementById('total-coord-man-days')) {
        document.getElementById('total-coord-man-days').textContent = formatNumber(coordTotalManDays);
    }
    document.getElementById('peak-manpower').textContent = `${peakManpower} BMs`;
    
    // 3. Update Calendar if visible
    if (document.getElementById('calendar').classList.contains('active')) {
        renderOperationalCalendar();
    }

    // 4. Render Event List
    renderEventList(filteredData);
    

    // 4. Update Chart if exists
    if (costChart && costChart.canvas) {
        updateChartData();
    }

    // 5. Update Report Preview
    generateReportPreview();
    updateMapMarkers();
}

function renderEventList(data = JOE_DATA) {
    const listContainer = document.getElementById('event-list');
    
    // Sort so important events come first
    const sortedData = [...data].sort((a, b) => {
        if (a.isImportant && !b.isImportant) return -1;
        if (!a.isImportant && b.isImportant) return 1;
        return a.id - b.id;
    });

    listContainer.innerHTML = sortedData.map(event => {
        const totalDays = event.p1.days + event.p2.days;
        const maxRisk = event.p1.risk; // Simplify by showing primary risk
        const efetivoDisplay = event.p2.days > 0 && event.p1.efetivo !== event.p2.efetivo 
            ? `${event.p1.efetivo}/${event.p2.efetivo}` 
            : event.p1.efetivo;
            
        const starIcon = event.isImportant ? `<i data-lucide="star" style="color: var(--accent); fill: var(--accent); width: 18px; height: 18px; margin-right: 6px;"></i>` : '';
        const importantClass = event.isImportant ? ' important' : '';

        // Vehicle Badges
        const displayAR = formatVehicleDisplay(event.p1.vehicles?.ar, event.p2.vehicles?.ar, 'AR');
        const displayUR = formatVehicleDisplay(event.p1.vehicles?.ur, event.p2.vehicles?.ur, 'UR');
        const displayABT = formatVehicleDisplay(event.p1.vehicles?.abt, event.p2.vehicles?.abt, 'ABT');

        let vtrHtml = '';
        if (displayAR) vtrHtml += `<div class="vtr-badge">${getVtrIcon('ar')} <span>${displayAR}</span></div>`;
        if (displayUR) vtrHtml += `<div class="vtr-badge">${getVtrIcon('ur')} <span>${displayUR}</span></div>`;
        if (displayABT) vtrHtml += `<div class="vtr-badge">${getVtrIcon('abt')} <span>${displayABT}</span></div>`;

        let detailsHtml = `
            <div class="event-details-panel details-cost-panel" id="details-${event.id}" style="display: none; margin-top: 15px; border-top: 1px dashed var(--border-color); padding-top: 10px;">
                <h5 style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 8px; text-transform: uppercase;">Cálculo da JOE</h5>
                <div style="display: flex; flex-direction: column; gap: 4px; font-size: 0.8rem;">
                    <div style="display: flex; justify-content: space-between;">
                        <span>P1 (${event.p1.risk}): ${event.p1.days}d x ${event.p1.efetivo + event.p1.coord}BMs x ${formatCurrency(event.p1.unitCost)}</span>
                        <strong>${formatCurrency(event.p1.days * (event.p1.efetivo + event.p1.coord) * event.p1.unitCost)}</strong>
                    </div>
        `;

        if (event.p2.days > 0) {
            detailsHtml += `
                    <div style="display: flex; justify-content: space-between;">
                        <span>P2 (${event.p2.risk}): ${event.p2.days}d x ${event.p2.efetivo + event.p2.coord}BMs x ${formatCurrency(event.p2.unitCost)}</span>
                        <strong>${formatCurrency(event.p2.days * (event.p2.efetivo + event.p2.coord) * event.p2.unitCost)}</strong>
                    </div>
            `;
        }

        detailsHtml += `
                </div>
            </div>
        `;

        let dateHtml = '';
        const p1Dates = event.p1.dateString || event.dateString || '-';
        dateHtml += `<div style="margin-bottom: 2px; font-size: 0.8rem;"><strong style="font-weight: 600; color: var(--secondary);">P1 (Finais de Semana):</strong> ${p1Dates}</div>`;
        if (event.p2.days > 0) {
            const p2Dates = event.p2.dateString || '-';
            dateHtml += `<div style="font-size: 0.8rem;"><strong style="font-weight: 600; color: var(--secondary);">P2 (Dias Úteis):</strong> ${p2Dates}</div>`;
        }

        return `
        <div class="event-item${importantClass} ${event.hidden ? 'is-hidden' : ''}">
            <div class="event-item-header">
                <h4 style="display: flex; align-items: center;">${starIcon}${event.name} ${event.hidden ? '<span style="font-size: 0.6rem; color: #ef4444; margin-left: 8px;">(OCULTO)</span>' : ''}</h4>
                <div class="event-item-header-actions" style="display: flex; gap: 0.25rem; align-items: center;">
                    <span class="badge ${getBadgeClass(maxRisk)}">${maxRisk}</span>
                    <button class="btn-edit-small" onclick="toggleDetails(${event.id})" title="Ver Cálculos">
                        <i data-lucide="calculator"></i>
                    </button>
                    <div class="card-actions">
                        <button class="btn-icon ${event.hidden ? 'hidden-active' : ''}" onclick="toggleEventVisibility(${event.id})" title="${event.hidden ? 'Mostrar no Planejamento' : 'Ocultar do Planejamento'}">
                            <i data-lucide="${event.hidden ? 'eye-off' : 'eye'}"></i>
                        </button>
                        <button class="btn-icon" onclick="focusEventOnMap(${event.id})" title="Ver no Mapa">
                            <i data-lucide="map-pin"></i>
                        </button>
                        <button class="btn-icon" onclick="openEditModal(${event.id})" title="Editar">
                            <i data-lucide="edit-3"></i>
                        </button>
                        <button class="btn-icon delete" onclick="deleteEvent(${event.id})" title="Excluir">
                            <i data-lucide="trash-2"></i>
                        </button>
                    </div>
                </div>
            </div>
            <div class="event-item-date-subtitle" style="display: flex; flex-direction: column; align-items: flex-start; padding: 0.5rem 0; border-bottom: 1px dashed var(--border-color); margin-bottom: 0.5rem;">
                ${dateHtml}
            </div>
            ${(event.timeStart || event.timeEnd || event.units) ? `<div style="font-size: 0.75rem; color: var(--text-muted); margin-bottom: 0.5rem; display: flex; align-items: center; gap: 10px;">
                ${(event.timeStart || event.timeEnd) ? `<span><i data-lucide="clock" style="width:14px;height:14px;vertical-align:middle;margin-right:2px;"></i> ${[event.timeStart, event.timeEnd].filter(Boolean).join(' às ')}</span>` : ''}
                ${event.units ? `<span><i data-lucide="shield" style="width:14px;height:14px;vertical-align:middle;margin-right:2px;"></i> ${event.units}</span>` : ''}
            </div>` : ''}
            <div class="event-item-stats">
                <div class="stat-group"><i data-lucide="calendar"></i> ${totalDays} dias</div>
                <div class="stat-group" title="Efetivo Diário"><i data-lucide="users"></i> ${efetivoDisplay} BMs/dia</div>
                ${event.p1.coord || event.p2.coord ? `<div class="stat-group" title="Efetivo Diário Coordenação"><i data-lucide="shield" style="color: var(--secondary);"></i> Coord: ${Math.max(event.p1.coord, event.p2.coord)} BMs/dia</div>` : ''}
                ${totalDays > 1 ? `<div class="stat-group" title="Efetivo Total Acumulado"><i data-lucide="users" style="color: var(--secondary);"></i> Total: ${event.manDays} BMs</div>` : ''}
                <div class="stat-group stat-cost" style="font-weight: 600; color: var(--primary);"><i data-lucide="dollar-sign"></i> ${formatCurrency(event.totalCost)}</div>
            </div>
            <div class="event-item-vtrs">
                ${vtrHtml || '<span style="font-size: 0.7rem; color: var(--text-muted);">Sem viaturas designadas</span>'}
            </div>
            ${detailsHtml}
        </div>
    `}).join('');
    lucide.createIcons(); // Refresh icons
}

function getBadgeClass(risk) {
    if (risk === 'Nível III') return 'badge-high';
    if (risk === 'Nível II') return 'badge-med';
    return 'badge-low';
}

function toggleDetails(id) {
    const detailsPanel = document.getElementById(`details-${id}`);
    if (detailsPanel) {
        if (detailsPanel.style.display === 'none') {
            detailsPanel.style.display = 'block';
        } else {
            detailsPanel.style.display = 'none';
        }
    }
}


function renderRiskCards() {
    const riskContainer = document.getElementById('risk-levels');
    const levels = ["Nível III", "Nível II", "Nível I"];
    
    // Calculate current fleet assignment with names
    const fleet = { 
        ar: { count: 0, names: new Set() }, 
        ur: { count: 0, names: new Set() }, 
        abt: { count: 0, names: new Set() } 
    };

    const processVtr = (val, type) => {
        if (!val || val === "0") return;
        if (typeof val === 'number') {
            fleet[type].count += val;
        } else if (typeof val === 'string') {
            const parts = val.split(',').map(s => s.trim()).filter(s => s.length > 0);
            parts.forEach(p => {
                if (/^\d+$/.test(p)) fleet[type].count += parseInt(p);
                else fleet[type].names.add(p);
            });
        }
    };

    JOE_DATA.filter(e => !e.hidden).forEach(e => {
        processVtr(e.p1.vehicles?.ar, 'ar');
        processVtr(e.p1.vehicles?.ur, 'ur');
        processVtr(e.p1.vehicles?.abt, 'abt');
        processVtr(e.p2.vehicles?.ar, 'ar');
        processVtr(e.p2.vehicles?.ur, 'ur');
        processVtr(e.p2.vehicles?.abt, 'abt');
    });

    const getVtrDisplay = (type, label) => {
        const namesArr = Array.from(fleet[type].names);
        let display = '';
        if (namesArr.length > 0) {
            display = namesArr.join(', ');
            if (fleet[type].count > 0) display += ` (+ ${fleet[type].count} planejadas)`;
        } else {
            display = fleet[type].count > 0 ? `${fleet[type].count} ${label} (Planejadas)` : 'Nenhuma designada';
        }
        return display;
    };

    let html = `
        <div class="risk-card high" style="grid-column: 1 / -1; background: var(--secondary); color: white; padding: 2rem;">
            <h3 style="margin-bottom: 1.5rem; font-size: 1.25rem;">Frota Específica Designada (Prefixos)</h3>
            <div class="vehicle-grid-premium">
                <div class="vtr-summary-box">
                    <div class="vtr-header ar"><i data-lucide="truck"></i> PICAPES (AR)</div>
                    <div class="vtr-list">${getVtrDisplay('ar', 'AR')}</div>
                </div>
                <div class="vtr-summary-box">
                    <div class="vtr-header ur"><i data-lucide="ambulance"></i> AMBULÂNCIAS (UR)</div>
                    <div class="vtr-list">${getVtrDisplay('ur', 'UR')}</div>
                </div>
                <div class="vtr-summary-box">
                    <div class="vtr-header abt"><i data-lucide="truck"></i> CAMINHÕES (ABT)</div>
                    <div class="vtr-list">${getVtrDisplay('abt', 'ABT')}</div>
                </div>
            </div>
        </div>
    `;

    html += levels.map(lvl => {
        const data = LOGISTICS_DATA[lvl];
        return `
            <div class="risk-card ${data.class}">
                <h3>${data.title}</h3>
                <div class="risk-detail">
                    <span class="detail-label">Viaturas (VTRs)</span>
                    <span class="detail-value">${data.vtrs}</span>
                </div>
                <div class="risk-detail">
                    <span class="detail-label">Especializada / Atividade</span>
                    <span class="detail-value">${data.special}</span>
                </div>
                <div class="risk-detail">
                    <span class="detail-label">Unidades Base</span>
                    <span class="detail-value">${data.units}</span>
                </div>
            </div>
        `;
    }).join('');

    riskContainer.innerHTML = html;
    lucide.createIcons();
}

// --- CHARTS ---
let costChart;
function initChart() {
    const ctx = document.getElementById('costDistributionChart').getContext('2d');
    
    const labels = JOE_DATA.map(i => i.name.replace('São João ', ''));
    const dataValues = JOE_DATA.map(i => i.totalCost);
    const colors = JOE_DATA.map(i => i.risk === 'Nível III' ? '#ef4444' : (i.risk === 'Nível II' ? '#f59e0b' : '#22c55e'));

    costChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Custo Total (R$)',
                data: dataValues,
                backgroundColor: colors,
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 24,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => {
                            const filterType = document.getElementById('chart-filter').value;
                            if (filterType === 'efetivo') {
                                return `Efetivo: ${formatNumber(ctx.raw)}`;
                            }
                            return `Custo: ${formatCurrency(ctx.raw)}`;
                        }
                    }
                }
            },
            scales: {
                x: { 
                    grid: { display: false },
                    ticks: { callback: value => 'R$ ' + value / 1000 + 'k' }
                },
                y: { 
                    grid: { display: false },
                    ticks: { font: { size: 10 } }
                }
            }
        }
    });

    // Chart Filter Logic
    document.getElementById('chart-filter').addEventListener('change', (e) => {
        updateChartData();
    });
}

function updateChartData() {
    const filterType = document.getElementById('chart-filter').value;
    const visibleEvents = JOE_DATA.filter(e => !e.hidden);
    
    // Update labels to match visible events
    costChart.data.labels = visibleEvents.map(i => i.name);
    
    if (filterType === 'efetivo') {
        costChart.data.datasets[0].data = visibleEvents.map(i => i.manDays);
        costChart.data.datasets[0].label = 'Efetivo Total';
        costChart.options.scales.x.ticks.callback = value => value;
    } else if (filterType === 'cost-jun') {
        costChart.data.datasets[0].data = visibleEvents.map(i => i.costJun || 0);
        costChart.data.datasets[0].label = 'Custo Junho (R$)';
        costChart.options.scales.x.ticks.callback = value => 'R$ ' + value / 1000 + 'k';
    } else if (filterType === 'cost-jul') {
        costChart.data.datasets[0].data = visibleEvents.map(i => i.costJul || 0);
        costChart.data.datasets[0].label = 'Custo Julho (R$)';
        costChart.options.scales.x.ticks.callback = value => 'R$ ' + value / 1000 + 'k';
    } else {
        costChart.data.datasets[0].data = visibleEvents.map(i => i.totalCost);
        costChart.data.datasets[0].label = 'Custo Total (R$)';
        costChart.options.scales.x.ticks.callback = value => 'R$ ' + value / 1000 + 'k';
    }
    costChart.update();
}

// Gráfico alternativo de efetivo (exibido no modo apresentação)
function initEfetivoChart() {
    const canvas = document.getElementById('efetivoDistributionChart');
    if (!canvas) return;

    const visibleEvents = JOE_DATA.filter(e => !e.hidden);
    const labels = visibleEvents.map(i => i.name);
    const data = visibleEvents.map(i => i.manDays);
    const colors = visibleEvents.map(i =>
        i.p1.risk === 'Nível III' ? '#ef4444' :
        i.p1.risk === 'Nível II' ? '#f59e0b' : '#22c55e'
    );

    if (window.efetivoChart) {
        window.efetivoChart.destroy();
    }

    window.efetivoChart = new Chart(canvas.getContext('2d'), {
        type: 'bar',
        data: {
            labels,
            datasets: [{
                label: 'Efetivo Total (BM-Dia)',
                data,
                backgroundColor: colors,
                borderRadius: 8,
                borderSkipped: false,
                barThickness: 24,
            }]
        },
        options: {
            indexAxis: 'y',
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: { display: false },
                tooltip: {
                    callbacks: {
                        label: (ctx) => `Efetivo: ${formatNumber(ctx.raw)} BM-Dia`
                    }
                }
            },
            scales: {
                x: { grid: { display: false }, ticks: { callback: v => v } },
                y: { grid: { display: false }, ticks: { font: { size: 10 } } }
            }
        }
    });
}

// --- UNIFIED CALENDAR STATE ---
let calendarState = {}; // key: "month-day" → 'p1' | 'p2'
let stepperValues = { p1: { ar: 0, ur: 0, abt: 0 }, p2: { ar: 0, ur: 0, abt: 0 } };
let activeCalendarMonth = 4;
let activeVtrPeriod = 'p1';

function initCalendarState(event) {
    calendarState = {};
    if (!event) return;
    (event.p1.daysMayList || []).forEach(d => calendarState[`4-${d}`] = 'p1');
    (event.p1.daysJunList || []).forEach(d => calendarState[`5-${d}`] = 'p1');
    (event.p1.daysJulList || []).forEach(d => calendarState[`6-${d}`] = 'p1');
    (event.p2.daysMayList || []).forEach(d => calendarState[`4-${d}`] = 'p2');
    (event.p2.daysJunList || []).forEach(d => calendarState[`5-${d}`] = 'p2');
    (event.p2.daysJulList || []).forEach(d => calendarState[`6-${d}`] = 'p2');
}

function renderUnifiedCalendar(month) {
    activeCalendarMonth = month;
    const container = document.getElementById('unified-calendar');
    if (!container) return;
    container.innerHTML = '';
    document.querySelectorAll('.cal-tab').forEach(t =>
        t.classList.toggle('active', parseInt(t.dataset.month) === month)
    );
    const year = 2026;
    const daysInMonth = month === 5 ? 30 : 31;
    for (let day = 1; day <= daysInMonth; day++) {
        const key = `${month}-${day}`;
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'day-btn';
        btn.textContent = day;
        const date = new Date(year, month, day);
        if (date.getDay() === 0 || date.getDay() === 6) btn.classList.add('weekend');
        const state = calendarState[key];
        if (state === 'p1') btn.classList.add('day-p1');
        else if (state === 'p2') btn.classList.add('day-p2');
        btn.onclick = () => {
            const cur = calendarState[key];
            if (!cur) calendarState[key] = 'p1';
            else if (cur === 'p1') calendarState[key] = 'p2';
            else delete calendarState[key];
            renderUnifiedCalendar(month);
            updateModalSummary();
        };
        container.appendChild(btn);
    }
}

function getCalendarDays() {
    const p1 = { may: [], jun: [], jul: [] };
    const p2 = { may: [], jun: [], jul: [] };
    for (const [key, val] of Object.entries(calendarState)) {
        const [m, d] = key.split('-').map(Number);
        const target = val === 'p1' ? p1 : p2;
        if (m === 4) target.may.push(d);
        else if (m === 5) target.jun.push(d);
        else if (m === 6) target.jul.push(d);
    }
    return { p1, p2 };
}

function renderSteppers() {
    ['ar', 'ur', 'abt'].forEach(type => {
        const el = document.getElementById(`stepper-val-${type}`);
        if (el) el.textContent = stepperValues[activeVtrPeriod][type] || 0;
    });
}

function changeVtr(type, delta) {
    const cur = stepperValues[activeVtrPeriod][type] || 0;
    stepperValues[activeVtrPeriod][type] = Math.max(0, cur + delta);
    renderSteppers();
}

// --- MODAL LOGIC ---
const modal = document.getElementById('edit-modal');
const editForm = document.getElementById('edit-form');

function openEditModal(id = null) {
    // Reset state
    calendarState = {};
    stepperValues = { p1: { ar: 0, ur: 0, abt: 0 }, p2: { ar: 0, ur: 0, abt: 0 } };
    activeVtrPeriod = 'p1';
    activeCalendarMonth = 4;

    if (id) {
        document.getElementById('modal-title').textContent = 'Editar Evento';
        const event = JOE_DATA.find(e => e.id === id);
        if (!event) return;

        document.getElementById('edit-id').value = event.id;
        document.getElementById('edit-name').value = event.name;
        document.getElementById('edit-important').checked = !!event.isImportant;
        document.getElementById('edit-units').value = event.units || '';
        document.getElementById('edit-time-start').value = event.timeStart || '';
        document.getElementById('edit-time-end').value = event.timeEnd || '';
        document.getElementById('edit-lat').value = event.coords?.lat || '';
        document.getElementById('edit-lng').value = event.coords?.lng || '';

        document.getElementById('edit-p1-efetivo').value = event.p1.efetivo || 0;
        document.getElementById('edit-p1-coord').value = event.p1.coord || 0;
        document.getElementById('edit-p1-unit-cost').value = event.p1.unitCost || 350;
        document.getElementById('edit-p1-risk').value = event.p1.risk || 'Nível III';
        document.getElementById('edit-p2-efetivo').value = event.p2.efetivo || 0;
        document.getElementById('edit-p2-coord').value = event.p2.coord || 0;
        document.getElementById('edit-p2-unit-cost').value = event.p2.unitCost || 300;
        document.getElementById('edit-p2-risk').value = event.p2.risk || 'Nível II';

        // Load vehicle values as numbers
        stepperValues.p1.ar = typeof event.p1.vehicles?.ar === 'number' ? event.p1.vehicles.ar : countVehicles(event.p1.vehicles?.ar);
        stepperValues.p1.ur = typeof event.p1.vehicles?.ur === 'number' ? event.p1.vehicles.ur : countVehicles(event.p1.vehicles?.ur);
        stepperValues.p1.abt = typeof event.p1.vehicles?.abt === 'number' ? event.p1.vehicles.abt : countVehicles(event.p1.vehicles?.abt);
        stepperValues.p2.ar = typeof event.p2.vehicles?.ar === 'number' ? event.p2.vehicles.ar : countVehicles(event.p2.vehicles?.ar);
        stepperValues.p2.ur = typeof event.p2.vehicles?.ur === 'number' ? event.p2.vehicles.ur : countVehicles(event.p2.vehicles?.ur);
        stepperValues.p2.abt = typeof event.p2.vehicles?.abt === 'number' ? event.p2.vehicles.abt : countVehicles(event.p2.vehicles?.abt);

        initCalendarState(event);
    } else {
        document.getElementById('modal-title').textContent = 'Novo Evento';
        document.getElementById('edit-form').reset();
        document.getElementById('edit-id').value = '';
        document.getElementById('edit-units').value = '';
        document.getElementById('edit-time-start').value = '';
        document.getElementById('edit-time-end').value = '';
        document.getElementById('edit-p1-efetivo').value = 0;
        document.getElementById('edit-p1-coord').value = 0;
        document.getElementById('edit-p2-efetivo').value = 0;
        document.getElementById('edit-p2-coord').value = 0;
        document.getElementById('edit-p1-unit-cost').value = 350;
        document.getElementById('edit-p2-unit-cost').value = 300;
        document.getElementById('edit-p1-risk').value = 'Nível III';
        document.getElementById('edit-p2-risk').value = 'Nível II';
    }

    // Reset VTR tab to P1
    document.querySelectorAll('.vtr-tab').forEach(t => t.classList.toggle('active', t.dataset.vtrPeriod === 'p1'));
    renderSteppers();
    renderUnifiedCalendar(4);
    updateModalSummary();
    modal.classList.add('active');
}

// renderDatePicker and getSelectedDays replaced by unified calendar (initCalendarState / renderUnifiedCalendar / getCalendarDays)

function closeEditModal() {
    modal.classList.remove('active');
}

function updateModalSummary() {
    let p1Days = 0, p2Days = 0;
    for (const [, val] of Object.entries(calendarState)) {
        if (val === 'p1') p1Days++;
        else p2Days++;
    }
    const p1Efetivo = parseInt(document.getElementById('edit-p1-efetivo')?.value) || 0;
    const p1Coord = parseInt(document.getElementById('edit-p1-coord')?.value) || 0;
    const p1Cost = parseFloat(document.getElementById('edit-p1-unit-cost')?.value) || 0;
    const p2Efetivo = parseInt(document.getElementById('edit-p2-efetivo')?.value) || 0;
    const p2Coord = parseInt(document.getElementById('edit-p2-coord')?.value) || 0;
    const p2Cost = parseFloat(document.getElementById('edit-p2-unit-cost')?.value) || 0;

    const totalDays = p1Days + p2Days;
    const manDays = (p1Days * (p1Efetivo + p1Coord)) + (p2Days * (p2Efetivo + p2Coord));
    const totalCost = (p1Days * (p1Efetivo + p1Coord) * p1Cost) + (p2Days * (p2Efetivo + p2Coord) * p2Cost);

    const daysEl = document.getElementById('summary-days');
    if (daysEl) daysEl.textContent = totalDays;
    const manDaysEl = document.getElementById('summary-man-days');
    if (manDaysEl) manDaysEl.textContent = formatNumber(manDays);
    const costEl = document.getElementById('summary-total-cost');
    if (costEl) costEl.textContent = formatCurrency(totalCost);
}

function initModalListeners() {
    document.getElementById('close-modal').addEventListener('click', closeEditModal);
    document.getElementById('cancel-edit').addEventListener('click', closeEditModal);

    // Auto-update summary on efetivo/cost/coord change
    ['edit-p1-efetivo', 'edit-p1-coord', 'edit-p1-unit-cost', 'edit-p2-efetivo', 'edit-p2-coord', 'edit-p2-unit-cost'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('input', updateModalSummary);
    });

    // Calendar month tabs
    document.querySelectorAll('.cal-tab').forEach(tab => {
        tab.addEventListener('click', () => renderUnifiedCalendar(parseInt(tab.dataset.month)));
    });

    // Vehicle period tabs
    document.querySelectorAll('.vtr-tab').forEach(tab => {
        tab.addEventListener('click', () => {
            activeVtrPeriod = tab.dataset.vtrPeriod;
            document.querySelectorAll('.vtr-tab').forEach(t => t.classList.toggle('active', t === tab));
            renderSteppers();
        });
    });

    // GPS collapse toggle
    const gpsToggle = document.getElementById('gps-toggle');
    const gpsBody = document.getElementById('gps-body');
    if (gpsToggle && gpsBody) {
        gpsToggle.addEventListener('click', () => {
            const isOpen = gpsBody.classList.toggle('open');
            gpsToggle.classList.toggle('open', isOpen);
        });
    }

    // Sidebar Toggle
    const toggleBtn = document.getElementById('toggle-sidebar');
    if (toggleBtn) {
        toggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('sidebar-collapsed');
            const sidebar = document.querySelector('.sidebar');
            sidebar.classList.toggle('collapsed');
            
            // Ensure Chart.js resizes to new container dimensions
            setTimeout(() => {
                if (window.costChart) window.costChart.resize();
            }, 310);

            lucide.createIcons(); 
        });
    }

    document.getElementById('close-day-modal').addEventListener('click', () => {
        document.getElementById('day-modal').classList.remove('active');
    });

    document.getElementById('day-modal').addEventListener('click', (e) => {
        if (e.target === document.getElementById('day-modal')) {
            document.getElementById('day-modal').classList.remove('active');
        }
    });

    // Scale Preview Modal Listeners
    const scaleModal = document.getElementById('scale-modal');
    if (scaleModal) {
        document.getElementById('close-scale-modal')?.addEventListener('click', () => {
            scaleModal.classList.remove('active');
        });
        scaleModal.addEventListener('click', (e) => {
            if (e.target === scaleModal) scaleModal.classList.remove('active');
        });
        document.getElementById('btn-download-scale')?.addEventListener('click', downloadScalePDF);
    }

    document.getElementById('btn-add-event').addEventListener('click', () => openEditModal());

    // Form Submit
    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idVal = document.getElementById('edit-id').value;
        const id = idVal ? parseInt(idVal) : null;
        
        const name = document.getElementById('edit-name').value;
        const isImportant = document.getElementById('edit-important').checked;
        const units = document.getElementById('edit-units').value;
        const timeStart = document.getElementById('edit-time-start').value;
        const timeEnd = document.getElementById('edit-time-end').value;
        const latRaw = document.getElementById('edit-lat').value.trim().replace(',', '.');
        const lngRaw = document.getElementById('edit-lng').value.trim().replace(',', '.');
        
        const lat = parseFloat(latRaw);
        const lng = parseFloat(lngRaw);
        const coords = (!isNaN(lat) && !isNaN(lng)) ? { lat, lng } : null;

        const { p1: calP1, p2: calP2 } = getCalendarDays();

        const p1 = {
            daysMayList: calP1.may,
            daysJunList: calP1.jun,
            daysJulList: calP1.jul,
            efetivo: parseInt(document.getElementById('edit-p1-efetivo').value) || 0,
            coord: parseInt(document.getElementById('edit-p1-coord').value) || 0,
            unitCost: parseFloat(document.getElementById('edit-p1-unit-cost').value) || 0,
            risk: document.getElementById('edit-p1-risk').value,
            vehicles: {
                ar: stepperValues.p1.ar,
                ur: stepperValues.p1.ur,
                abt: stepperValues.p1.abt
            }
        };

        const p2 = {
            daysMayList: calP2.may,
            daysJunList: calP2.jun,
            daysJulList: calP2.jul,
            efetivo: parseInt(document.getElementById('edit-p2-efetivo').value) || 0,
            coord: parseInt(document.getElementById('edit-p2-coord').value) || 0,
            unitCost: parseFloat(document.getElementById('edit-p2-unit-cost').value) || 0,
            risk: document.getElementById('edit-p2-risk').value,
            vehicles: {
                ar: stepperValues.p2.ar,
                ur: stepperValues.p2.ur,
                abt: stepperValues.p2.abt
            }
        };

        let updatedEvent = { name, isImportant, coords, p1, p2, units, timeStart, timeEnd };
        updatedEvent = calculateTotals(updatedEvent);

        if (id) {
            const eventIdx = JOE_DATA.findIndex(e => e.id === id);
            if (eventIdx !== -1) {
                JOE_DATA[eventIdx] = { ...JOE_DATA[eventIdx], ...updatedEvent };
            }
        } else {
            // Add new event
            const newId = JOE_DATA.length > 0 ? Math.max(...JOE_DATA.map(e => e.id)) + 1 : 1;
            updatedEvent.id = newId;
            JOE_DATA.push(updatedEvent);
        }

        saveToStorage();
        refreshUI();
        closeEditModal();
    });

    // Close on click outside
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeEditModal();
    });
}

function deleteEvent(id) {
    if (confirm('Tem certeza que deseja apagar este evento do seu planejamento?')) {
        JOE_DATA = JOE_DATA.filter(e => e.id !== id);
        saveToStorage();
        refreshUI();
    }
}

// --- TABS ---
function initTabs() {
    const tabs = document.querySelectorAll('.nav-item');
    const tabContents = document.querySelectorAll('.tab-content');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            
            tab.classList.add('active');
            const target = tab.dataset.tab;
            document.getElementById(target).classList.add('active');
            
            if (target === 'calendar') {
                renderOperationalCalendar();
            } else if (target === 'logistics') {
                setTimeout(initMap, 100); // Small delay to ensure div is visible
                renderRiskSummaries();
            }
        });
    });

    // Setup PDF Download Button
    const btnDownload = document.getElementById('btn-download-pdf');
    if (btnDownload) {
        btnDownload.addEventListener('click', downloadPDF);
    }

    // Setup Excel Download Button
    const btnExcel = document.getElementById('btn-download-excel');
    if (btnExcel) {
        btnExcel.addEventListener('click', downloadExcel);
    }
}

// --- REPORT / PDF GENERATION ---
function generateReportPreview() {
    const visibleEvents = JOE_DATA.filter(e => !e.hidden);
    
    const totalBudget = visibleEvents.reduce((acc, item) => acc + item.totalCost, 0);
    const budgetMay = visibleEvents.reduce((acc, item) => acc + (item.costMay || 0), 0);
    const budgetJun = visibleEvents.reduce((acc, item) => acc + (item.costJun || 0), 0);
    const budgetJul = visibleEvents.reduce((acc, item) => acc + (item.costJul || 0), 0);
    const totalManDays = visibleEvents.reduce((acc, item) => acc + item.manDays, 0);
    const manDaysMay = visibleEvents.reduce((acc, item) => acc + (item.manDaysMay || 0), 0);
    const manDaysJun = visibleEvents.reduce((acc, item) => acc + (item.manDaysJun || 0), 0);
    const manDaysJul = visibleEvents.reduce((acc, item) => acc + (item.manDaysJul || 0), 0);
    
    let peak = 0;
    for (let d = 1; d <= 31; d++) {
        const statsJun = getDailyStats(d, 5);
        const statsJul = getDailyStats(d, 6);
        peak = Math.max(peak, statsJun.efetivo, statsJul.efetivo);
    }
    const peakManpower = peak;

    document.getElementById('pdf-total-budget').textContent = formatCurrency(totalBudget);
    if (document.getElementById('pdf-budget-may')) document.getElementById('pdf-budget-may').textContent = formatCurrency(budgetMay);
    if (document.getElementById('pdf-mandays-may')) document.getElementById('pdf-mandays-may').textContent = formatNumber(manDaysMay);
    document.getElementById('pdf-budget-jun').textContent = formatCurrency(budgetJun);
    document.getElementById('pdf-mandays-jun').textContent = formatNumber(manDaysJun);
    document.getElementById('pdf-budget-jul').textContent = formatCurrency(budgetJul);
    document.getElementById('pdf-mandays-jul').textContent = formatNumber(manDaysJul);
    document.getElementById('pdf-total-mandays').textContent = formatNumber(totalManDays);
    document.getElementById('pdf-peak-manpower').textContent = `${peakManpower} BMs`;

    const tbody = document.getElementById('pdf-events-tbody');
    if (!tbody) return;
    
    tbody.innerHTML = '';

    visibleEvents.forEach(event => {
        // P1 Row
        let p1Row = `<tr>
            <td style="border: 1px solid #cbd5e1; padding: 8px;"><strong>${event.name}</strong><br><span style="font-size: 9px; color: #64748b;">P1: ${event.p1.dateString || event.dateString || '-'}</span></td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">Período 1</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${event.p1.risk}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${event.p1.days}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${event.p1.efetivo + event.p1.coord}</td>
            <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${event.p1.days * (event.p1.efetivo + event.p1.coord)}</td>
            <td class="pdf-cost-col" style="border: 1px solid #cbd5e1; padding: 8px; text-align: right;">${formatCurrency(event.p1.unitCost)}</td>
            <td class="pdf-cost-col" style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; font-weight: 500;">${formatCurrency(event.p1.days * (event.p1.efetivo + event.p1.coord) * event.p1.unitCost)}</td>
        </tr>`;
        tbody.innerHTML += p1Row;

        // P2 Row (if exists)
        if (event.p2.days > 0) {
            let p2Row = `<tr>
                <td style="border: 1px solid #cbd5e1; padding: 8px; border-top: none;"><span style="font-size: 9px; color: #64748b;">P2: ${event.p2.dateString || '-'}</span></td>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">Período 2</td>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${event.p2.risk}</td>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${event.p2.days}</td>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${event.p2.efetivo + event.p2.coord}</td>
                <td style="border: 1px solid #cbd5e1; padding: 8px; text-align: center;">${event.p2.days * (event.p2.efetivo + event.p2.coord)}</td>
                <td class="pdf-cost-col" style="border: 1px solid #cbd5e1; padding: 8px; text-align: right;">${formatCurrency(event.p2.unitCost)}</td>
                <td class="pdf-cost-col" style="border: 1px solid #cbd5e1; padding: 8px; text-align: right; font-weight: 500;">${formatCurrency(event.p2.days * (event.p2.efetivo + event.p2.coord) * event.p2.unitCost)}</td>
            </tr>`;
            tbody.innerHTML += p2Row;
        }
    });


}

function downloadPDF() {
    const element = document.getElementById('pdf-content');
    const opt = {
        margin:       0,
        filename:     'Planejamento_Operacional_JOE_2026.pdf',
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };

    // Use html2pdf
    html2pdf().set(opt).from(element).save();
}

function downloadExcel() {
    // UTF-8 BOM helps Excel recognize accents correctly
    let csvContent = "\uFEFF";
    
    // Headers
    csvContent += "ID;Evento;Datas;Periodo;Nivel de Risco;Dias Maio;Dias Junho;Dias Julho;Dias Total;Efetivo Diário;Efetivo Total;Custo Unitario;Subtotal Maio;Subtotal Junho;Subtotal Julho;Subtotal Total\n";
    
    JOE_DATA.filter(e => !e.hidden).forEach(event => {
        // Helper to format currency/numbers for CSV
        const fmtCost = (val) => val.toFixed(2).replace('.', ',');
        
        // P1
        let p1SubtotalMay = event.p1.daysMay * (event.p1.efetivo + event.p1.coord) * event.p1.unitCost;
        let p1SubtotalJun = event.p1.daysJun * (event.p1.efetivo + event.p1.coord) * event.p1.unitCost;
        let p1SubtotalJul = event.p1.daysJul * (event.p1.efetivo + event.p1.coord) * event.p1.unitCost;
        let p1Subtotal = p1SubtotalMay + p1SubtotalJun + p1SubtotalJul;
        let p1EfetivoTotal = event.p1.days * (event.p1.efetivo + event.p1.coord);
        csvContent += `${event.id};"${event.name}";"${event.dateString || ''}";Periodo 1;"${event.p1.risk}";${event.p1.daysMay};${event.p1.daysJun};${event.p1.daysJul};${event.p1.days};${event.p1.efetivo + event.p1.coord};${p1EfetivoTotal};"${fmtCost(event.p1.unitCost)}";"${fmtCost(p1SubtotalMay)}";"${fmtCost(p1SubtotalJun)}";"${fmtCost(p1SubtotalJul)}";"${fmtCost(p1Subtotal)}"\n`;
        
        // P2
        if (event.p2.days > 0) {
            let p2SubtotalMay = event.p2.daysMay * (event.p2.efetivo + event.p2.coord) * event.p2.unitCost;
            let p2SubtotalJun = event.p2.daysJun * (event.p2.efetivo + event.p2.coord) * event.p2.unitCost;
            let p2SubtotalJul = event.p2.daysJul * (event.p2.efetivo + event.p2.coord) * event.p2.unitCost;
            let p2Subtotal = p2SubtotalMay + p2SubtotalJun + p2SubtotalJul;
            let p2EfetivoTotal = event.p2.days * (event.p2.efetivo + event.p2.coord);
            csvContent += `${event.id};"${event.name}";"${event.dateString || ''}";Periodo 2;"${event.p2.risk}";${event.p2.daysMay};${event.p2.daysJun};${event.p2.daysJul};${event.p2.days};${event.p2.efetivo + event.p2.coord};${p2EfetivoTotal};"${fmtCost(event.p2.unitCost)}";"${fmtCost(p2SubtotalMay)}";"${fmtCost(p2SubtotalJun)}";"${fmtCost(p2SubtotalJul)}";"${fmtCost(p2Subtotal)}"\n`;
        }
    });

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", "Planejamento_Operacional_JOE_2026.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// --- CALENDAR LOGIC ---
function renderOperationalCalendar() {
    const mayContainer = document.getElementById('calendar-may');
    const junContainer = document.getElementById('calendar-jun');
    const julContainer = document.getElementById('calendar-jul');
    
    if (!mayContainer || !junContainer || !julContainer) return;

    mayContainer.innerHTML = renderMonth(4, 2026, "Maio");
    junContainer.innerHTML = renderMonth(5, 2026, "Junho");
    julContainer.innerHTML = renderMonth(6, 2026, "Julho");
    
    lucide.createIcons();
}

function renderMonth(month, year, monthName) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const firstDay = new Date(year, month, 1).getDay();
    
    // --- Pre-calculate Event Tracks (Lanes) for the Month ---
    const monthStats = []; // Array of day stats
    for (let d = 1; d <= daysInMonth; d++) {
        monthStats[d] = getDailyStats(d, month);
    }

    // Assign tracks
    const eventTracks = {}; // { eventName: trackIndex }
    const tracksOccupied = []; // tracksOccupied[day][trackIndex] = boolean

    // First, find all unique events in this month
    const allEventsInMonth = [];
    JOE_DATA.filter(e => !e.hidden).forEach(event => {
        let active = false;
        for (let d = 1; d <= daysInMonth; d++) {
            if (isEventActiveOnDay(event, d, month)) {
                active = true;
                break;
            }
        }
        if (active) allEventsInMonth.push(event);
    });

    // Sort events by start date to optimize track packing
    allEventsInMonth.sort((a, b) => {
        const startA = getEventStartDayInMonth(a, month, daysInMonth);
        const startB = getEventStartDayInMonth(b, month, daysInMonth);
        return startA - startB;
    });

    allEventsInMonth.forEach(event => {
        let assignedTrack = -1;
        let trackToTry = 0;

        while (assignedTrack === -1) {
            let collision = false;
            for (let d = 1; d <= daysInMonth; d++) {
                if (isEventActiveOnDay(event, d, month)) {
                    if (!tracksOccupied[d]) tracksOccupied[d] = [];
                    if (tracksOccupied[d][trackToTry]) {
                        collision = true;
                        break;
                    }
                }
            }

            if (!collision) {
                assignedTrack = trackToTry;
                // Mark occupied
                for (let d = 1; d <= daysInMonth; d++) {
                    if (isEventActiveOnDay(event, d, month)) {
                        if (!tracksOccupied[d]) tracksOccupied[d] = [];
                        tracksOccupied[d][assignedTrack] = true;
                    }
                }
            } else {
                trackToTry++;
            }
        }
        eventTracks[event.name] = assignedTrack;
    });

    let maxTrackCount = 0;
    for (let d = 1; d <= daysInMonth; d++) {
        if (tracksOccupied[d]) {
            maxTrackCount = Math.max(maxTrackCount, tracksOccupied[d].length);
        }
    }
    
    const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];
    
    let html = `
        <div class="month-title"><i data-lucide="calendar-range"></i> ${monthName} ${year}</div>
        <div class="calendar-grid">
            ${weekDays.map(d => `<div class="calendar-day-head">${d}</div>`).join('')}
    `;
    
    // Empty days before first day
    for (let i = 0; i < firstDay; i++) {
        html += `<div class="calendar-day other-month"></div>`;
    }
    
    // Days of the month
    for (let day = 1; day <= daysInMonth; day++) {
        const stats = monthStats[day];
        const alertClass = stats.efetivo > 150 ? 'visible' : ''; // Alert if > 150 BMs

        const renderResourceCell = (type, count) => {
            if (count === 0) return '';
            let display = `${count} ${type.toUpperCase()}`;
            
            // If only one event, show its specific prefix
            if (stats.events.length === 1) {
                const raw = stats.events[0].vRaw[type];
                if (typeof raw === 'string' && raw.length > 1 && isNaN(raw)) {
                    display = raw;
                }
            }
            
            return `<div class="day-resource ${type}">${getVtrIcon(type)} ${display}</div>`;
        };

        // Render Bars for each track
        let barsHtml = '';
        for (let t = 0; t < maxTrackCount; t++) {
            const eventOnTrack = stats.events.find(e => eventTracks[e.name] === t);
            if (eventOnTrack) {
                const color = getEventColor(eventOnTrack.name);
                const isActiveYesterday = day > 1 && isEventActiveOnDayByName(eventOnTrack.name, day - 1, month);
                const isActiveTomorrow = day < daysInMonth && isEventActiveOnDayByName(eventOnTrack.name, day + 1, month);
                
                let stateClass = 'single';
                if (isActiveYesterday && isActiveTomorrow) stateClass = 'middle';
                else if (isActiveYesterday) stateClass = 'end';
                else if (isActiveTomorrow) stateClass = 'start';

                const textHtml = `<span class="bar-text">${eventOnTrack.name}</span>`;
                
                barsHtml += `
                    <div class="day-event-bar ${stateClass}" 
                         style="background: ${color.bg}; border: 1px solid ${color.border};" 
                         onclick="event.stopPropagation(); showDayDetails(${day}, ${month})"
                         title="${eventOnTrack.name}">
                        ${textHtml}
                    </div>
                `;
            } else {
                barsHtml += `<div class="day-event-bar empty"></div>`;
            }
        }
        
        html += `
            <div class="calendar-day" onclick="showDayDetails(${day}, ${month})">
                <div class="day-total-alert ${alertClass}"></div>
                <div class="day-number">${day}</div>
                <div class="day-stats">
                    ${stats.efetivo > 0 ? `<div class="day-resource bm"><i data-lucide="users"></i> ${stats.efetivo}</div>` : ''}
                    ${renderResourceCell('ar', stats.ar)}
                    ${renderResourceCell('ur', stats.ur)}
                    ${renderResourceCell('abt', stats.abt)}
                </div>
                <div class="day-events-list">
                    ${barsHtml}
                </div>
            </div>
        `;
    }
    
    html += `</div>`;
    return html;
}

// --- HELPER FUNCTIONS FOR TIMELINE ---
function isEventActiveOnDay(event, day, month) {
    if (month === 4) return event.p1.daysMayList?.includes(day) || event.p2.daysMayList?.includes(day);
    if (month === 5) return event.p1.daysJunList?.includes(day) || event.p2.daysJunList?.includes(day);
    if (month === 6) return event.p1.daysJulList?.includes(day) || event.p2.daysJulList?.includes(day);
    return false;
}

function isEventActiveOnDayByName(name, day, month) {
    const event = JOE_DATA.find(e => e.name === name);
    if (!event) return false;
    return isEventActiveOnDay(event, day, month);
}

function getEventStartDayInMonth(event, month, daysInMonth) {
    for (let d = 1; d <= daysInMonth; d++) {
        if (isEventActiveOnDay(event, d, month)) return d;
    }
    return 99;
}

function getDailyStats(day, month) {
    const stats = { efetivo: 0, ar: 0, ur: 0, abt: 0, events: [] };

    JOE_DATA.forEach(event => {
        if (event.hidden) return;
        let activeP1 = false;
        let activeP2 = false;

        if (month === 4) {
            activeP1 = event.p1.daysMayList?.includes(day);
            activeP2 = event.p2.daysMayList?.includes(day);
        } else if (month === 5) {
            activeP1 = event.p1.daysJunList?.includes(day);
            activeP2 = event.p2.daysJunList?.includes(day);
        } else if (month === 6) {
            activeP1 = event.p1.daysJulList?.includes(day);
            activeP2 = event.p2.daysJulList?.includes(day);
        }

        if (activeP1 || activeP2) {
            const ef = (activeP1 ? ((event.p1.efetivo || 0) + (event.p1.coord || 0)) : 0) + (activeP2 ? ((event.p2.efetivo || 0) + (event.p2.coord || 0)) : 0);
            
            // Get raw vehicle data (prefixes)
            const vRaw = {
                ar: activeP1 ? event.p1.vehicles?.ar : event.p2.vehicles?.ar,
                ur: activeP1 ? event.p1.vehicles?.ur : event.p2.vehicles?.ur,
                abt: activeP1 ? event.p1.vehicles?.abt : event.p2.vehicles?.abt
            };

            const arCount = countVehicles(vRaw.ar);
            const urCount = countVehicles(vRaw.ur);
            const abtCount = countVehicles(vRaw.abt);

            stats.efetivo += ef;
            stats.ar += arCount;
            stats.ur += urCount;
            stats.abt += abtCount;
            
            stats.events.push({ 
                name: event.name, 
                risk: event.p1.risk,
                ef: ef,
                vtrs: { ar: arCount, ur: urCount, abt: abtCount },
                vRaw: vRaw
            });
        }
    });

    return stats;
}

function getBadgeClass(risk) {
    if (risk === 'Nível III') return 'high';
    if (risk === 'Nível II') return 'med';
    return 'low';
}

// Simple heuristic parser for the text dates
function isDateInString(day, month, dateStr) {
    if (!dateStr || dateStr === '-') return false;
    const str = dateStr.toLowerCase();
    const mName = month === 5 ? 'jun' : (month === 6 ? 'jul' : 'maio');
    
    // If the string specifies a month, check it
    if (str.includes('jun') && mName !== 'jun') return false;
    if (str.includes('jul') && mName !== 'jul') return false;
    
    // Match "06" or "06/jun" or "13, 14"
    const dayStr = day.toString().padStart(2, '0');
    
    // Pattern: 13 a 15
    const rangeMatch = str.match(/(\d+)\s*a\s*(\d+)/);
    if (rangeMatch) {
        const start = parseInt(rangeMatch[1]);
        const end = parseInt(rangeMatch[2]);
        if (day >= start && day <= end) return true;
    }

    // Pattern: 06, 12, 13
    if (str.includes(dayStr)) return true;
    if (str.includes(day.toString()) && !/\d\d/.test(str.replace(day.toString(), ''))) return true;

    // Specific logic for "Arraial do IPEM" style ranges: "06 de junho a 05 de julho"
    if (str.includes('junho a') && str.includes('julho')) {
        if (mName === 'jun' && day >= 6) return true;
        if (mName === 'jul' && day <= 5) return true;
    }

    return false;
}

function showDayDetails(day, month) {
    const stats = getDailyStats(day, month);
    if (stats.events.length === 0) return;
    
    const monthName = month === 4 ? 'Maio' : (month === 5 ? 'Junho' : 'Julho');
    
    // Populate Modal
    document.getElementById('day-modal-title').textContent = `${day} de ${monthName}`;
    document.getElementById('day-total-efetivo').textContent = stats.efetivo;
    document.getElementById('day-total-ar').textContent = stats.ar;
    document.getElementById('day-total-ur').textContent = stats.ur;
    document.getElementById('day-total-abt').textContent = stats.abt;
    
    const container = document.getElementById('day-events-container');
    
    const formatVtrDay = (type, raw, count) => {
        if (!count || count === 0) return '';
        const display = (typeof raw === 'string' && raw.length > 1 && isNaN(raw)) ? raw : `${count.toString().padStart(2, '0')} ${type.toUpperCase()}`;
        return `<div class="res-summary-item" style="display: flex; align-items: center; gap: 6px;">${getVtrIcon(type)}<strong>${display}</strong></div>`;
    };

    container.innerHTML = stats.events.map(e => `
        <div class="day-event-detail-card">
            <div class="event-main-info">
                <span class="badge ${getBadgeClass(e.risk)}">${e.risk}</span>
                <h5>${e.name}</h5>
            </div>
            <div class="event-resources-summary">
                <div class="res-summary-item">
                    <span>Efetivo</span>
                    <strong>${e.ef} BM</strong>
                </div>
                ${formatVtrDay('ar', e.vRaw.ar, e.vtrs.ar)}
                ${formatVtrDay('ur', e.vRaw.ur, e.vtrs.ur)}
                ${formatVtrDay('abt', e.vRaw.abt, e.vtrs.abt)}
            </div>
        </div>
    `).join('');
    
    document.getElementById('day-modal').classList.add('active');
    lucide.createIcons();
}

// --- ESCALA / PDF DA ESCALA ---
function previewScale(month) {
    const monthNames = { 4: 'MAIO', 5: 'JUNHO', 6: 'JULHO' };
    const monthName = monthNames[month] || '';
    document.getElementById('scale-pdf-title').textContent = `ESCALA OPERACIONAL - ${monthName} 2026`;
    
    const bodyContainer = document.getElementById('scale-pdf-body');
    bodyContainer.innerHTML = '';
    
    const visibleEvents = JOE_DATA.filter(e => !e.hidden);
    
    const daysInMonth = month === 5 ? 30 : 31; // May=31, Jun=30, Jul=31
    let html = '';
    
    for (let d = 1; d <= daysInMonth; d++) {
        // Find events on this day
        const eventsToday = visibleEvents.filter(e => {
            if (month === 4) return e.p1.daysMayList.includes(d) || e.p2.daysMayList.includes(d);
            if (month === 5) return e.p1.daysJunList.includes(d) || e.p2.daysJunList.includes(d);
            if (month === 6) return e.p1.daysJulList.includes(d) || e.p2.daysJulList.includes(d);
            return false;
        });
        
        if (eventsToday.length > 0) {
            html += `
                <div style="margin-bottom: 12px; page-break-inside: avoid;">
                    <div style="background: #f1f5f9; padding: 6px 10px; font-weight: bold; border-left: 3px solid #0f172a; margin-bottom: 6px; font-size: 14px;">
                        Dia ${String(d).padStart(2, '0')}/${String(month+1).padStart(2, '0')}
                    </div>
                    <table style="width: 100%; border-collapse: collapse; font-size: 12px;">
                        <tbody>
            `;
            
            eventsToday.forEach(e => {
                const time = (e.timeStart || e.timeEnd) ? [e.timeStart, e.timeEnd].filter(Boolean).join(' às ') : '-';
                const units = e.units || '-';
                
                html += `
                    <tr>
                        <td style="padding: 4px 8px; border-bottom: 1px solid #e2e8f0; width: 50%; font-weight: 500;">${e.name}</td>
                        <td style="padding: 4px 8px; border-bottom: 1px solid #e2e8f0; width: 20%; color: #64748b;">${time}</td>
                        <td style="padding: 4px 8px; border-bottom: 1px solid #e2e8f0; width: 30%;">${units}</td>
                    </tr>
                `;
            });
            
            html += `
                        </tbody>
                    </table>
                </div>
            `;
        }
    }
    
    if (html === '') {
        html = '<p style="text-align: center; color: #64748b; padding: 20px;">Nenhum evento agendado para este mês.</p>';
    }
    
    bodyContainer.innerHTML = html;
    
    // Open modal
    document.getElementById('scale-modal').classList.add('active');
}

function downloadScalePDF() {
    const element = document.getElementById('scale-pdf-content');
    const titleText = document.getElementById('scale-pdf-title').textContent.replace(/ /g, '_');
    const opt = {
        margin:       0,
        filename:     `${titleText}.pdf`,
        image:        { type: 'jpeg', quality: 0.98 },
        html2canvas:  { scale: 2 },
        jsPDF:        { unit: 'in', format: 'a4', orientation: 'portrait' }
    };
    html2pdf().set(opt).from(element).save();
}
