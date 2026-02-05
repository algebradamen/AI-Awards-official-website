/**
 * NATURENS LIV - Systematisk AI med individuelle lydknapper
 */

const apiKey = "AIzaSyDTerFa3TI_p4mSGPAadO8pQUoGPLyVg84";
const aiModel = "gemini-2.0-flash"; 
const deathSound = new Audio('ES_Sad, Dark - Epidemic Sound.mp3');
const synth = window.speechSynthesis;

const emojiMap = { 
    'fugl': '🦅', 'pattedyr': '🐺', 'fisk': '🐟', 'insekt': '🦋', 
    'amfibie': '🐸', 'reptil': '🐍', 'sommerfugl': '🦋', 'bløtdyr': '🐌', 'annet': '🐾' 
};

const speciesDatabase = [
    { name: "Ulv", group: "pattedyr", status: "Kritisk truet", maxAge: 12 },
    { name: "Hubro", group: "fugl", status: "Sterkt truet", maxAge: 20 },
    { name: "Ål", group: "fisk", status: "Sårbar", maxAge: 50 },
    { name: "Gaupe", group: "pattedyr", status: "Sterkt truet", maxAge: 13 },
    { name: "Vipe", group: "fugl", status: "Kritisk truet", maxAge: 10 },
    { name: "Fjellrev", group: "pattedyr", status: "Kritisk truet", maxAge: 8 }
];

const scenarios = [
    {
        title: "JEGERE I OMRÅDET",
        desc: "Du lukter kruttrøyk og hører hunder bjeffe i det fjerne. En jakt pågår.",
        choices: [
            { text: "Gjem deg i en dyp hule", effect: { happiness: -20, fatigue: 10 }, log: "Du satt musestille i mørket mens hundene passerte." },
            { text: "Flykt over elva", effect: { strength: 5, fatigue: 30 }, log: "Du svømte over den iskalde elva for å slette spor." },
            { text: "Prøv å jage vekk hundene", effect: { health: -40, strength: 15 }, log: "Du sloss mot hundene. Du vant, men ble stygt bitt." },
            { text: "Søk mot veien (Fare)", effect: { capture: 0.4, health: -20 }, log: "Du løp mot veien og ble nesten påkjørt." }
        ]
    },
    {
        title: "DYREPASSERE!",
        desc: "Folk fra Dyreparken har satt ut feller. De vil fange deg!",
        choices: [
            { text: "Spis agnet i fella", effect: { capture: 0.9 }, log: "Maten var god, men fella klappet igjen." },
            { text: "Styr unna", effect: { experience: 10 }, log: "Du kjente menneskelukten og snek deg unna." },
            { text: "Angrip menneskene", effect: { health: -50, capture: 0.5 }, log: "Du ble truffet av en bedøvelsespil." },
            { text: "Gå i skjul", effect: { happiness: -30, fatigue: 40 }, log: "Du lå lavt i terrenget i flere uker." }
        ]
    }
];

let player = {
    species: null, months: 0, health: 100, happiness: 100, strength: 0,
    fatigue: 0, experience: 0, isAlive: true, partner: null, family: [], location: "Agder-naturen"
};

window.onload = function() { setupSelection(); setupEventListeners(); };

function setupSelection() {
    const grid = document.getElementById('species-grid'); grid.innerHTML = "";
    const shuffled = [...speciesDatabase].sort(() => 0.5 - Math.random());
    shuffled.forEach(s => {
        const div = document.createElement('div'); div.className = "emoji-card";
        div.innerHTML = `<span class="emo">${emojiMap[s.group] || '🐾'}</span><span>${s.name}</span>`;
        div.onclick = () => startLife(s); grid.appendChild(div);
    });
}

function setupEventListeners() {
    document.getElementById('btn-age-up').onclick = ageUp;
    document.getElementById('btn-open-status').onclick = () => openModal('status-modal');
    document.getElementById('btn-open-family').onclick = () => { renderFamily(); openModal('family-modal'); };
    
    document.getElementById('btn-train').onclick = () => performActivity('train');
    document.getElementById('btn-explore').onclick = () => performActivity('explore');
    document.getElementById('btn-hunt').onclick = () => performActivity('hunt');
    document.getElementById('btn-forage').onclick = () => performActivity('forage');
    document.getElementById('btn-partner').onclick = () => findPartner();
    document.getElementById('btn-rival').onclick = () => triggerScenario();
}

function speak(text) {
    if(!text) return;
    synth.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'no-NO'; u.rate = 0.95;
    synth.speak(u);
}

async function askAI(prompt) {
    const years = Math.floor(player.months / 12);
    const context = `Natur-forteller for en ${player.species.name} (${years} år) i ${player.location}. Handling: ${prompt}. Maks 45 ord.`;
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${apiKey}`, { 
            method: "POST", headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: context }] }] }) 
        });
        const data = await res.json(); 
        return data.candidates[0].content.parts[0].text.trim();
    } catch (e) { return "Naturen endrer seg."; }
}

async function startLife(species) {
    player = { species, months: 0, health: 100, happiness: 100, strength: 0, fatigue: 0, experience: 0, isAlive: true, partner: null, family: generateFamily(), location: "Agder-naturen" };
    document.getElementById('selection-screen').classList.add('hidden');
    document.getElementById('life-screen').classList.remove('hidden');
    document.getElementById('player-emoji').innerText = emojiMap[species.group];
    document.getElementById('player-name').innerText = species.name;
    document.getElementById('event-log').innerHTML = "";
    updateUI();
    const intro = await askAI(`Fødsel i villmarka.`);
    addToLog(intro, 'story');
}

async function ageUp() {
    if (!player.isAlive) return;
    player.months += 2; player.fatigue = 0;
    updateUI();
    const years = Math.floor(player.months / 12);
    if (player.months % 12 === 0) addToLog(`--- DU ER NÅ ${years} ÅR ---`, 'age');
    setTimeout(() => triggerScenario(), 400);
}

function triggerScenario() {
    const sc = scenarios[Math.floor(Math.random() * scenarios.length)];
    document.getElementById('choice-title').innerText = sc.title;
    document.getElementById('choice-desc').innerText = sc.desc;
    const cont = document.getElementById('choice-buttons'); cont.innerHTML = "";
    sc.choices.forEach(c => {
        const btn = document.createElement('button'); btn.className = "btn-choice"; btn.innerText = c.text;
        btn.onclick = () => { closeAllModals(); handleScenarioChoice(c); };
        cont.appendChild(btn);
    });
    openModal('choice-modal');
}

async function handleScenarioChoice(choice) {
    if(choice.effect.health) player.health = Math.max(0, player.health + choice.effect.health);
    if(choice.effect.happiness) player.happiness = Math.max(0, player.happiness + choice.effect.happiness);
    if(choice.effect.strength) player.strength = Math.min(100, player.strength + choice.effect.strength);
    if(choice.effect.capture && Math.random() < choice.effect.capture) { player.location = "Dyrehage"; addToLog("FANGET! Du bor nå i dyrehage.", 'event'); }
    else { addToLog(choice.log, 'event'); }
    updateUI();
    const story = await askAI(choice.log);
    addToLog(story, 'story');
    checkDeath();
}

async function performActivity(type) {
    if (player.fatigue >= 100) return;
    addFatigue();
    let p = (type === 'train') ? "Trente styrke." : "Søkte føde.";
    if(type === 'train') player.strength = Math.min(100, player.strength + 10);
    closeAllModals(); updateUI();
    const s = await askAI(p); addToLog(s, 'story');
}

function generateFamily() { return [{ relation: "Mor", name: "Mamma", relationship: 80 }, { relation: "Far", name: "Pappa", relationship: 70 }]; }
function renderFamily() {
    const list = document.getElementById('family-list'); list.innerHTML = "";
    player.family.forEach(m => {
        const btn = document.createElement('button'); btn.className = "btn-choice";
        btn.innerHTML = `<b>${m.relation}:</b> ${m.name} (${m.relationship}%)`;
        btn.onclick = () => { closeAllModals(); addToLog(`Du besøkte ${m.name}.`, 'event'); player.happiness += 10; addFatigue(15); updateUI(); };
        list.appendChild(btn);
    });
}

function checkDeath() { if (player.health <= 0 || player.months / 12 >= 15) endGame(); }
function endGame() { player.isAlive = false; deathSound.play().catch(()=>{}); openModal('death-modal'); }

function addToLog(text, type = '') {
    const log = document.getElementById('event-log');
    const entry = document.createElement('div');
    entry.className = `log-entry ${type}`;
    
    const textSpan = document.createElement('span');
    textSpan.innerText = text;
    entry.appendChild(textSpan);

    if (type === 'story') {
        const audioBtn = document.createElement('button');
        audioBtn.innerHTML = '🔊';
        audioBtn.className = 'inline-audio-btn';
        audioBtn.onclick = () => speak(text);
        entry.appendChild(audioBtn);
    }
    
    log.prepend(entry);
}

function updateUI() {
    const y = Math.floor(player.months / 12), m = player.months % 12;
    document.getElementById('age-display').innerText = `${y} år, ${m} mnd`;
    document.getElementById('health-bar').style.width = player.health + "%";
    document.getElementById('happiness-bar').style.width = player.happiness + "%";
    document.getElementById('fatigue-bar').style.width = player.fatigue + "%";
    document.getElementById('strength-bar').style.width = player.strength + "%";
}

function openModal(id) { document.getElementById(id).classList.remove('hidden'); document.getElementById('overlay').classList.remove('hidden'); }
function closeAllModals() { document.querySelectorAll('.modal').forEach(m => m.classList.add('hidden')); document.getElementById('overlay').classList.add('hidden'); }
