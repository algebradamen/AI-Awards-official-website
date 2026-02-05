/**
 * RØDLISTET - Spill-logikk
 */

// --- KONFIGURASJON ---
const mapStart = [58.5, 8.0]; 

// --- GLOBALE VARIABLER ---
let health = 100, day = 1, streak = 0;
let map, geoJsonLayer, allDataFeatures = [];
let layer2d, layer3d, is3d = false;
let speciesPool = { invasive: [], endangered: [], neutral: [] };
let currentDifficulty = 'medium', isDifficultySet = false;
let audioStarted = false, hintsLeft = 3;
let currentQuizOptions = [], localLeaderboard = JSON.parse(localStorage.getItem('rodlistet_leaderboard')) || [];
let isAiThinking = false, currentSpeciesInInfo = null, recentlySeen = [];

// --- KI & LYD ---
const apiKey = "AIzaSyDTerFa3TI_p4mSGPAadO8pQUoGPLyVg84", aiModel = "gemini-2.5-flash";
function fixAudioPath(name) { return encodeURIComponent(name).replace(/%20/g, ' '); }
const bgMusic = new Audio('Silent Circuits.mp3'); bgMusic.loop = true; bgMusic.volume = 0.3;
const startSound = new Audio(fixAudioPath('Style_Clean,_tech-in_#4-1767785643771.mp3'));
const correctSound = new Audio(fixAudioPath('Style_Clean,_tech-in_#3-1767786160447.mp3'));
const wrongSound = new Audio(fixAudioPath('Style_Clean,_tech-in_#4-1767785841191.mp3'));

// --- DYREFAKTA DATABASE (Forkortet for oversikt, full database beholdes i bakgrunnen) ---
// (Jeg inkluderer hele databasen her for å være sikker på at ingenting mangler)
const animalDatabase = {
    "svartand": { t: "En dykkand sårbar for kystforstyrrelser.", s: "truet" },
    "lappfiskand": { t: "Trenger klare fiskevann. Sårbar.", s: "truet" },
    "ærfugl": { t: "Kjent for sin myke dun. Bestandene sliter.", s: "truet" },
    "alke": { t: "Fanger fisk på store dyp.", s: "truet" },
    "lomvi": { t: "Kritisk truet sjøfugl. Hekker i fuglefjell.", s: "truet" },
    "hettemåke": { t: "Liten måke med mørkt hode. Kraftig tilbakegang.", s: "truet" },
    "fiskemåke": { t: "Vanlig måke som nå sliter med næringstilgang.", s: "truet" },
    "storspove": { t: "Har et langt, buet nebb. Truet av jordbruk.", s: "truet" },
    "gråmåke": { t: "Stor og kraftig måke. Naturens renovatør.", s: "vanlig" },
    "granmeis": { t: "Liten meis som hamstrer mat til vinteren.", s: "vanlig" },
    "sivhøne": { t: "Lever i tett vegetasjon ved vann.", s: "vanlig" },
    "gulspurv": { t: "Viktig frøspreder i kulturlandskapet.", s: "truet" },
    "sandsvale": { t: "Graver redeganger i sandtak.", s: "truet" },
    "makrellterne": { t: "Langdistansetrekkfugl.", s: "truet" },
    "vipe": { t: "Bonden sin beste venn! Spiser skadeinsekter.", s: "truet" },
    "havørn": { t: "Vår største rovfugl.", s: "vanlig" },
    "tyrkerdue": { t: "En liten dueart.", s: "vanlig" },
    "sanglerke": { t: "Kjent for sin vakre sang.", s: "truet" },
    "bjørkefink": { t: "En fargerik fink.", s: "vanlig" },
    "taksvale": { t: "Bygger rede av leire.", s: "truet" },
    "heipiplerke": { t: "Vanlig fugl i hei og myr.", s: "vanlig" },
    "stær": { t: "Etterligner lyder.", s: "truet" },
    "bergirisk": { t: "Trives i karrig landskap.", s: "vanlig" },
    "grønnfink": { t: "Kraftig nebb for å knekke frø.", s: "truet" },
    "tårnseiler": { t: "Lever nesten hele livet på vingene.", s: "truet" },
    "tjeld": { t: "Kystens vaktpost.", s: "vanlig" },
    "gråspurv": { t: "Kulturlandskapets faste følgesvenn.", s: "truet" },
    "storskarv": { t: "Dyktig fisker.", s: "vanlig" },
    "rødstilk": { t: "Vadefugl med røde bein.", s: "truet" },
    "svartbak": { t: "Vår største måke.", s: "vanlig" },
    "sothøne": { t: "Svart fugl med hvitt nebb.", s: "truet" },
    "brunsisik": { t: "Liten fink som liker bjørkefrø.", s: "vanlig" },
    "hvitryggspett": { t: "Sjelden hakkespett.", s: "truet" },
    "gråspett": { t: "Ligner grønnspett.", s: "vanlig" },
    "svartrødstjert": { t: "Sjelden gjest.", s: "truet" },
    "vandrefalk": { t: "Verdens raskeste dyr i stup!", s: "vanlig" },
    "småspove": { t: "Ligner storspove.", s: "truet" },
    "kornkråke": { t: "Sosial kråkefugl.", s: "truet" },
    "dvergfalk": { t: "Vår minste falk.", s: "vanlig" },
    "lerkefalk": { t: "Fanger øyenstikkere i lufta.", s: "truet" },
    "krykkje": { t: "Liten måke.", s: "truet" },
    "sjøorre": { t: "Sjøfugl. Hannen er svart.", s: "truet" },
    "skjærpiplerke": { t: "Lever i fjæra.", s: "vanlig" },
    "hønsehauk": { t: "Skogens store jeger.", s: "truet" },
    "nattergal": { t: "Kjent for sin vakre sang.", s: "truet" },
    "furukorsnebb": { t: "Spesialist på furukongler.", s: "vanlig" },
    "konglebit": { t: "Stor og fargerik fink.", s: "truet" },
    "nordflaggermus": { t: "Viktig naturlig myggkontroll.", s: "vanlig" },
    "piggsvin": { t: "Hagens vokter mot snegler.", s: "truet" },
    "mink": { t: "En fremmed art som raserer fuglereder.", s: "fremmed" },
    "bisam": { t: "Stor gnager fra Nord-Amerika.", s: "fremmed" },
    "havert": { t: "Stor selart. Lever i ytre kyststrøk.", s: "truet" },
    "skimmelflaggermus": { t: "Tofarget flaggermus.", s: "truet" },
    "karminspinner": { t: "Nattflyver.", s: "truet" },
    "harlekinmarihøne": { t: "Invasiv marihøne.", s: "fremmed" },
    "brunskogsnegl": { t: "Den forhatte 'mordersneglen'.", s: "fremmed" },
    "boakjølsnegl": { t: "Stor snegl med mønster.", s: "fremmed" },
    "mørk jordhumle": { t: "Innført humle.", s: "fremmed" },
    "brakkvannsrur": { t: "Skalldyr som gror igjen rør.", s: "fremmed" },
    "alvesmyger": { t: "Sjelden sommerfugl.", s: "truet" },
    "hvit tigerspinner": { t: "Hvit nattsommerfugl.", s: "truet" },
    "tiriltungesmalmott": { t: "Lite insekt på tiriltunge.", s: "truet" },
    "hagtornsigdvikler": { t: "Liten sommerfugl.", s: "truet" },
    "almegulfly": { t: "Nattfly knyttet til almetrær.", s: "truet" },
    "almepraktmåler": { t: "Vakker måler som lever på alm.", s: "truet" },
    "hvit dammott": { t: "Lever ved vann.", s: "truet" },
    "trollheggsigdvikler": { t: "Liten vikler. Sjelden.", s: "truet" },
    "rotstrekmosemott": { t: "Sjelden art. Lever i mose.", s: "truet" },
    "fjærepraktvikler": { t: "Lever i strandsonen.", s: "truet" },
    "sandsmalmott": { t: "Knyttet til sanddyner.", s: "truet" },
    "karminpraktvikler": { t: "Fargerik liten sommerfugl.", s: "truet" },
    "piggknopprørfly": { t: "Lever i takrør.", s: "truet" },
    "almestjertvinge": { t: "Sommerfugl avhengig av alm.", s: "truet" },
    "langsabeledderkopp": { t: "Sjelden edderkopp.", s: "truet" },
    "rappnebbmott": { t: "Lite møllinsekt.", s: "truet" },
    "båndringspinner": { t: "Spinnerart i lynghei.", s: "truet" },
    "myrstengelfly": { t: "Lever på myr.", s: "truet" },
    "almebladsikade": { t: "Lite insekt på alm.", s: "truet" },
    "linjefly": { t: "Nattfly med linjer.", s: "truet" },
    "hvitbåndnellikfly": { t: "Knyttet til nellikplanter.", s: "truet" },
    "malurtdvergmåler": { t: "Liten måler.", s: "truet" },
    "hagtornfrøvikler": { t: "Larven lever i hagtornbær.", s: "truet" },
    "slåpetornvikler": { t: "Knyttet til slåpetornkratt.", s: "truet" },
    "irisrørfly": { t: "Lever ved vannkanter.", s: "truet" },
    "hagelupin": { t: "Vakker blomst, men kveler alt.", s: "fremmed" },
    "rynkerose": { t: "Spre seg raskt på strender.", s: "fremmed" },
    "parkslirekne": { t: "Vokser ekstremt raskt.", s: "fremmed" },
    "kjempebjørnekjeks": { t: "Giftig plante.", s: "fremmed" },
    "torsk": { t: "Havets konge i krise.", s: "truet" },
    "pukkellaks": { t: "Invasiv laks som dør etter gyting.", s: "fremmed" },
    "dypvannsreke": { t: "Viktig næringskilde i havet.", s: "vanlig" },
    "kanadagås": { t: "Stor gås som forurenser.", s: "fremmed" },
    "fasan": { t: "Settes ut for jakt.", s: "fremmed" },
    "elg": { t: "Skogens konge.", s: "vanlig" },
    "rådyr": { t: "Vårt minste hjortedyr.", s: "vanlig" },
    "hjort": { t: "Stor og staselig.", s: "vanlig" },
    "nrf-ku": { t: "Norsk Rødt Fe.", s: "vanlig" },
    "gammelnorsk spælsau": { t: "Hardfør sauerase.", s: "vanlig" },
    "geit": { t: "Sprek klatrer.", s: "vanlig" },
    "fjordhest": { t: "Norges nasjonalhest.", s: "vanlig" },
    "rødrev": { t: "Luringen i skogen.", s: "vanlig" },
    "grevling": { t: "Nattaktiv.", s: "vanlig" },
    "ekorn": { t: "Klatremester.", s: "vanlig" },
    "hare": { t: "Skifter pelsfarge.", s: "vanlig" },
    "bever": { t: "Naturens ingeniør.", s: "vanlig" },
    "ulv": { t: "Vårt mest omdiskuterte rovdyr.", s: "truet" },
    "brunbjørn": { t: "Går i hi om vinteren.", s: "truet" },
    "gaupe": { t: "Vårt eneste viltlevende kattedyr.", s: "truet" },
    "jerv": { t: "Fjellets åtseleter.", s: "truet" },
    "huggorm": { t: "Norges eneste giftige slange.", s: "vanlig" },
    "stålorm": { t: "Øgle uten bein.", s: "vanlig" },
    "buttsnutefrosk": { t: "Vår vanligste frosk.", s: "vanlig" },
    "låvesvale": { t: "Blåsvart rygg.", s: "nær truet" },
    "kjøttmeis": { t: "Vanlig ved fuglebrettet.", s: "vanlig" },
    "blåmeis": { t: "Liten og kvikk meis.", s: "vanlig" },
    "skjære": { t: "Svart og hvit fugl.", s: "vanlig" },
    "kråke": { t: "Klok fugl.", s: "vanlig" },
    "gråtrost": { t: "Lager mye lyd.", s: "vanlig" },
    "skogmus": { t: "Liten gnager.", s: "vanlig" },
    "husmus": { t: "Trives inne i vegger.", s: "vanlig" },
    "meitemark": { t: "Gjør jorda fruktbar.", s: "vanlig" }
};

// --- INITIALISERING ---
window.onload = function() {
    setupEvents(); // Aktiver knapper først!
    
    map = L.map('map', { zoomControl: false, attributionControl: false }).setView(mapStart, 8);
    
    layer2d = L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png');
    layer3d = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}');
    
    layer2d.addTo(map);

    window.addEventListener('click', () => { 
        if(!audioStarted) { bgMusic.play().catch(()=>{}); audioStarted=true; } 
    }, { once: true });

    updateUI();
    loadData();
};

function loadData() {
    const files = ['test2.geojson', 'ArtNasjonal_42_agder_4326_GEOJSON.json'];
    
    Promise.all(files.map(file => 
        fetch(file)
            .then(res => {
                if (!res.ok) throw new Error(`Kunne ikke finne ${file}`);
                return res.json();
            })
            .catch(err => {
                console.warn(err.message);
                return { type: "FeatureCollection", features: [] };
            })
    )).then(dataArrays => {
        let combinedFeatures = dataArrays.flatMap(data => data.features || []);

        allDataFeatures = combinedFeatures.filter(f => {
            const p = f.properties;
            const harNavn = p.norskNavn && p.norskNavn.trim() !== "" && p.norskNavn.toLowerCase() !== "ukjent";
            if (!harNavn) return false;

            const group = p.artsgruppe ? p.artsgruppe.toLowerCase() : "";
            const whitelist = ['fugl', 'pattedyr', 'fisk', 'insekt', 'amfibie', 'reptil', 'krepsdyr', 'edderkoppdyr', 'bløtdyr', 'storkrepser', 'sommerfugl', 'mott'];
            const blacklist = ['karplanter', 'moser', 'lav', 'sopp', 'alger'];
            
            const isWhitelisted = whitelist.some(w => group.includes(w));
            const isBlacklisted = blacklist.some(b => group.includes(b));

            return isWhitelisted && !isBlacklisted;
        });

        const uniqueMap = new Map();
        allDataFeatures.forEach(f => {
            const name = f.properties.norskNavn.toLowerCase().trim();
            if (!uniqueMap.has(name)) {
                uniqueMap.set(name, f);
            }
        });
        allDataFeatures = Array.from(uniqueMap.values());
        
        injectMockData();
        drawMap();
        categorize();
    });
}

function injectMockData() {
    const extraAnimals = ["elg", "rådyr", "hjort", "nrf-ku", "gammelnorsk spælsau", "geit", "fjordhest", "rødrev", "grevling", "ekorn", "hare", "bever", "ulv", "brunbjørn", "gaupe", "jerv", "huggorm", "stålorm", "buttsnutefrosk", "låvesvale", "kjøttmeis", "blåmeis", "skjære", "kråke", "gråtrost", "skogmus", "husmus", "meitemark"];
    const currentNames = new Set(allDataFeatures.map(f => f.properties.norskNavn));

    extraAnimals.forEach(name => {
        if (!currentNames.has(name)) {
            const lat = 58.2 + Math.random() * 1.3;
            const lon = 6.5 + Math.random() * 2.5;
            allDataFeatures.push({
                type: "Feature",
                properties: { norskNavn: name, vitenskapeligNavn: "Gen. species", artsgruppe: "annet", listeStatus_beskrivelse: animalDatabase[name]?.s === "truet" ? "Sårbar" : "Livskraftig" },
                geometry: { type: "Point", coordinates: [lon, lat] }
            });
        }
    });

    const invasiveExtras = ["mink", "brunskogsnegl", "harlekinmarihøne", "boakjølsnegl", "mørk jordhumle", "pukkellaks", "brakkvannsrur", "bisam", "kanadagås", "fasan"];
    invasiveExtras.forEach(name => {
        for(let i=0; i<30; i++) {
            const lat = 58.0 + Math.random() * 1.5;
            const lon = 6.5 + Math.random() * 3.0;
            allDataFeatures.push({
                type: "Feature",
                properties: { norskNavn: name, vitenskapeligNavn: "Invasivus Sp.", artsgruppe: "insekt", listeStatus_beskrivelse: "Svært høy risiko", forvaltningskategori_beskrivelse: "Fremmede arter" },
                geometry: { type: "Point", coordinates: [lon, lat] }
            });
        }
    });
}

function drawMap() {
    if(geoJsonLayer) map.removeLayer(geoJsonLayer);
    geoJsonLayer = L.geoJSON({type:"FeatureCollection", features:allDataFeatures}, {
        pointToLayer: (f,l) => L.circleMarker(l, { radius: 7, fillColor: getCol(f.properties.artsgruppe), color:"#fff", weight:2, fillOpacity:0.9 }),
        onEachFeature: (f,l) => l.on('click', () => showInfo(f.properties))
    }).addTo(map);
}

function categorize() {
    speciesPool = { invasive: [], endangered: [], neutral: [] };
    allDataFeatures.forEach(f => {
        const p = f.properties, n = p.norskNavn;
        const db = animalDatabase[n.toLowerCase()];
        const isAlien = (db && db.s === "fremmed") || (p.forvaltningskategori_beskrivelse === "Fremmede arter");
        const isEndangered = (db && db.s === "truet") || (["Kritisk truet", "Sterkt truet", "Sårbar", "Nær truet"].includes(p.listeStatus_beskrivelse));
        const obj = { name: n, group: p.artsgruppe, alien: isAlien, status: isEndangered ? "truet" : (isAlien ? "fremmed" : "vanlig"), sciName: p.vitenskapeligNavn };
        if(obj.alien) speciesPool.invasive.push(obj); else if(isEndangered) speciesPool.endangered.push(obj); else speciesPool.neutral.push(obj);
    });
}

function getCol(g) { g = g?.toLowerCase() || ""; if(g.includes('fugl')) return '#3498db'; if(g.includes('pattedyr')) return '#e67e22'; if(g.includes('fisk')) return '#1abc9c'; return '#9b59b6'; }

function showInfo(p) {
    currentSpeciesInInfo = p;
    const db = animalDatabase[p.norskNavn.toLowerCase()];
    document.getElementById('info-title').innerText = p.norskNavn;
    document.getElementById('info-latin').innerText = p.vitenskapeligNavn;
    document.getElementById('info-group').innerText = `ART: ${p.artsgruppe.toUpperCase()}`;
    
    let factHtml = `<b>Artsgruppe:</b> ${p.artsgruppe}<br>`;
    factHtml += `<b>Fakta:</b> ${db ? db.t : 'Dette dyret er en del av det unike biologiske mangfoldet i Agder.'}<br>`;
    factHtml += `<b>Status:</b> ${p.listeStatus_beskrivelse || 'Livskraftig'}`;
    
    document.getElementById('info-fact-box').innerHTML = factHtml;
    
    const img = document.getElementById('info-img');
    img.src = `images/${p.norskNavn}.jpg`;
    img.onerror = () => handleImageError(img, p.norskNavn, p.vitenskapeligNavn);
    openModal('info-modal');
}

async function handleImageError(img, name, sciName) {
    if (!img.dataset.triedDyr) {
        img.dataset.triedDyr = "true";
        img.src = `dyr/${name}.jpg`;
        return;
    }
    if (!img.dataset.triedWiki) {
        img.dataset.triedWiki = "true";
        try {
            const res = await fetch(`https://no.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(name)}`);
            const data = await res.json();
            if (data.originalimage) {
                img.src = data.originalimage.source;
                return;
            }
        } catch (e) {}
    }
    img.src = 'https://placehold.co/300?text=Bilde+mangler';
}

// --- SPILL LOGIKK & VANSKELIGHETSGRAD ---
function selectDifficulty(l) {
    currentDifficulty = l;
    isDifficultySet = true;
    
    // NY REGEL: Hint basert på vanskelighetsgrad
    if(l === 'easy') hintsLeft = 5;
    else if(l === 'medium') hintsLeft = 3;
    else hintsLeft = 1;
    
    updateUI();
    closeModal('difficulty-modal');
    generateChoices();
}

function generateChoices() {
    // Skjul og tøm hint
    document.getElementById('hint-text').classList.add('hidden');
    document.getElementById('hint-text').innerText = "";
    
    let selection = [];
    
    // Hjelpefunksjon for å trekke tilfeldig UNIKT dyr
    const pick = (arr) => {
        // Filtrer bort dyr som allerede er valgt i denne runden
        const available = arr.filter(a => !selection.some(s => s.name === a.name));
        if (available.length === 0) return null;
        return available[Math.floor(Math.random() * available.length)];
    };

    // NY REGEL: Kort-distribusjon
    if (currentDifficulty === 'easy') {
        // 2 Riktige (Alien), 1 Feil (Endangered/Neutral)
        selection.push(pick(speciesPool.invasive));
        selection.push(pick(speciesPool.invasive));
        
        let badPool = Math.random() > 0.5 ? speciesPool.endangered : speciesPool.neutral;
        selection.push(pick(badPool));
        
    } else if (currentDifficulty === 'hard') {
        // 1 Riktig, 2 Katastrofe (Endangered)
        selection.push(pick(speciesPool.invasive));
        selection.push(pick(speciesPool.endangered));
        selection.push(pick(speciesPool.endangered));
        
    } else {
        // Medium: 1 Riktig, 1 Ubalanse, 1 Katastrofe
        selection.push(pick(speciesPool.invasive));
        selection.push(pick(speciesPool.endangered));
        selection.push(pick(speciesPool.neutral));
    }
    
    // Filtrer bort evt null og bland
    currentQuizOptions = selection.filter(s => s).sort(() => Math.random() - 0.5);

    const container = document.getElementById('choices-container'); container.innerHTML = "";
    currentQuizOptions.forEach(s => {
        const div = document.createElement('div'); div.className = 'choice-card';
        div.innerHTML = `<div class="choice-img-wrapper"><img src="images/${s.name}.jpg" class="choice-img" onerror="handleImageError(this, '${s.name}', '${s.sciName}')"></div><h3>${s.name}</h3><p class="badge">${s.group}</p>`;
        div.onclick = () => handleChoice(s, div); 
        container.appendChild(div);
    });
    openModal('choice-modal');
}

function handleChoice(s, cardElement) {
    // Animasjon & Lyd & Farge-feedback
    const isCorrect = s.alien;
    cardElement.classList.add(isCorrect ? 'correct' : 'wrong');
    cardElement.classList.add(isCorrect ? 'anim-pop' : 'anim-shake');
    
    if(isCorrect) { correctSound.play(); streak++; } else { wrongSound.play(); streak = 0; }

    setTimeout(() => {
        closeModal('choice-modal');
        
        let dmg = 0;
        let resultTitle = "";
        let resultMsg = "";

        // NY REGEL: Skadeberegning
        if (s.alien) {
            // RIKTIG SVAR
            resultTitle = "Bra valg!";
            resultMsg = `Du fjernet ${s.name}, en fremmed art.`;
            if(currentDifficulty === 'easy') {
                dmg = -10; // +10 Helse (negativ skade)
                resultMsg += " Du fikk +10 helse!";
            } else if(currentDifficulty === 'medium') {
                 dmg = -5;
                 resultMsg += " Du fikk +5 helse!";
            }
        } else {
            // FEIL SVAR
            resultTitle = "Uff da...";
            resultMsg = `Du fjernet ${s.name}, som hører til her.`;
            
            if (currentDifficulty === 'easy') {
                if (s.status === 'truet') { dmg = 20; resultMsg += " Katastrofe! (-20 helse)"; }
                else { dmg = 10; resultMsg += " Ubalanse. (-10 helse)"; }
            } else if (currentDifficulty === 'medium') {
                if (s.status === 'truet') { dmg = 35; resultMsg += " Stor Katastrofe! (-35 helse)"; }
                else { dmg = 20; resultMsg += " Ubalanse. (-20 helse)"; }
            } else {
                // HARD
                dmg = Math.max(20, Math.floor(health / 2)); // 50% av helsa
                resultMsg += ` KRISE! Du mistet ${dmg} helse!`;
            }
        }
        
        health = Math.max(0, Math.min(100, health - dmg));
        updateUI();
        
        document.getElementById('result-title').innerText = resultTitle;
        document.getElementById('result-title').className = s.alien ? 'result-good' : 'result-bad';
        document.getElementById('result-body').innerHTML = `<p>${resultMsg}</p>`;
        openModal('result-modal');
    }, 600);
}

// NY REGEL: AI Hint System
async function useHint() {
    if (hintsLeft <= 0) return;
    
    const correct = currentQuizOptions.find(o => o.alien);
    if (!correct) return;

    const hintBox = document.getElementById('hint-text');
    hintBox.classList.remove('hidden');
    hintBox.innerText = "Vokteren tenker ut et hint...";
    
    hintsLeft--;
    updateUI();

    try {
        const prompt = `Lag et veldig kort, kryptisk hint (1 setning) om dyret "${correct.name}" (en fremmed art i Norge) uten å si navnet. Hint til at den er uønsket eller skadelig.`;
        
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${apiKey}`, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: prompt }] }] }) 
        });
        
        const data = await res.json();
        const hintText = data.candidates[0].content.parts[0].text;
        
        hintBox.innerText = `HINT: ${hintText}`;
    } catch (e) {
        hintBox.innerText = `HINT: Se etter arten som ikke hører hjemme her... (AI feilet)`;
    }
}

function updateUI() { 
    document.getElementById('health-bar-fill').style.width = health + "%"; 
    document.getElementById('day-counter').innerText = day; 
    document.getElementById('streak-counter').innerText = streak; 
    
    document.getElementById('hint-count').innerText = hintsLeft;
    document.getElementById('btn-hint').disabled = (hintsLeft <= 0);

    if(health <= 0) endGame("NATUREN KOLLAPSET", `Du overlevde i ${day} dager.`); 
}

function nextDay() { closeModal('result-modal'); day++; checkAchievements(); updateUI(); }
function endGame(t, m) { document.getElementById('end-title').innerText = t; document.getElementById('game-over-text').innerText = m; openModal('game-over-modal'); }
function openModal(id) { document.getElementById(id).classList.remove('hidden'); document.getElementById('overlay').classList.remove('hidden'); }
function closeModal(id) { 
    stopSpeech(); 
    document.getElementById(id).classList.add('hidden'); 
    document.getElementById('overlay').classList.add('hidden'); 
}

// --- PRESTASJONER DATABASE ---
const achievementsDB = [
    { id: 'first_day', title: 'Første steg', desc: 'Fullfør din første dag.', icon: '🌱' },
    { id: 'nature_lover', title: 'Naturvenn', desc: 'Fullfør 3 dager uten å miste helse.', icon: '🍃' },
    { id: 'streak_5', title: 'Varm i trøya', desc: 'Oppnå en streak på 5.', icon: '🔥' },
    { id: 'streak_10', title: 'Øko-kriger', desc: 'Oppnå en streak på 10.', icon: '🛡️' },
    { id: 'streak_25', title: 'Arts-ekspert', desc: 'Oppnå en streak på 25!', icon: '🧠' },
    { id: 'streak_50', title: 'Ustoppelig', desc: 'Oppnå en sinnssyk streak på 50!', icon: '⚡' },
    { id: 'survive_10', title: 'Stabil natur', desc: 'Overlev i 10 dager.', icon: '🌲' },
    { id: 'survive_20', title: 'Overleveren', desc: 'Overlev i 20 dager.', icon: '🏔️' },
    { id: 'survive_50', title: 'Legende', desc: 'Overlev i 50 dager!', icon: '👑' },
    { id: 'survive_100', title: 'Guddommelig', desc: 'Overlev i 100 dager. Helt utrolig!', icon: '🪐' },
    { id: 'low_health', title: 'På kanten', desc: 'Ha under 10% helse og overlev dagen.', icon: '⚠️' },
    { id: 'perfect_health', title: 'Urørt natur', desc: 'Ha 100% helse etter dag 5.', icon: '💎' },
    { id: 'perfect_run_20', title: 'Perfeksjonist', desc: 'Ha 100% helse på dag 20.', icon: '✨' },
    { id: 'ai_user', title: 'Lærevillig', desc: 'Spør Naturens Vokter om hjelp.', icon: '🤖' },
    { id: 'fast_learner', title: 'Kjapp oppfattelse', desc: 'Fullfør 5 dager på under 2 minutter.', icon: '⏱️' },
    
    // NYE SUPER-VANSKELIGE ACHIEVEMENTS
    { id: 'bronze_soldier', title: 'Bronze Soldier', desc: '10 dager + 10 i streak.', icon: '🥉' },
    { id: 'silver_soldier', title: 'Silver Soldier', desc: '25 dager + 25 i streak.', icon: '🥈' },
    { id: 'golden_soldier', title: 'Golden Soldier', desc: '50 dager + 50 i streak.', icon: '🥇' },
    { id: 'diamond_general', title: 'Diamond General', desc: '100 dager + 100 i streak!', icon: '💎' },
    { id: 'platinum_leader', title: 'Platinum Leader', desc: '200 dager + 200 i streak!!', icon: '🏆' },
    
    { id: 'completionist', title: 'Naturens Mester', desc: 'Lås opp ALLE andre prestasjoner.', icon: '🏆' }
];

let unlockedAchievements = JSON.parse(localStorage.getItem('rodlistet_achievements')) || [];
let startTime = Date.now();
let perfectDays = 0;

function checkAchievements() {
    const timeSpent = (Date.now() - startTime) / 1000;

    if (day >= 1 && !unlockedAchievements.includes('first_day')) unlock('first_day');
    if (day >= 10 && !unlockedAchievements.includes('survive_10')) unlock('survive_10');
    if (day >= 20 && !unlockedAchievements.includes('survive_20')) unlock('survive_20');
    if (day >= 50 && !unlockedAchievements.includes('survive_50')) unlock('survive_50');
    if (day >= 100 && !unlockedAchievements.includes('survive_100')) unlock('survive_100');
    
    if (streak >= 5 && !unlockedAchievements.includes('streak_5')) unlock('streak_5');
    if (streak >= 10 && !unlockedAchievements.includes('streak_10')) unlock('streak_10');
    if (streak >= 25 && !unlockedAchievements.includes('streak_25')) unlock('streak_25');
    if (streak >= 50 && !unlockedAchievements.includes('streak_50')) unlock('streak_50');

    // SJEKK FOR DE NYE SOLDAT-RANGENE (Krever både dag og streak)
    if (day >= 10 && streak >= 10 && !unlockedAchievements.includes('bronze_soldier')) unlock('bronze_soldier');
    if (day >= 25 && streak >= 25 && !unlockedAchievements.includes('silver_soldier')) unlock('silver_soldier');
    if (day >= 50 && streak >= 50 && !unlockedAchievements.includes('golden_soldier')) unlock('golden_soldier');
    if (day >= 100 && streak >= 100 && !unlockedAchievements.includes('diamond_general')) unlock('diamond_general');
    if (day >= 200 && streak >= 200 && !unlockedAchievements.includes('platinum_leader')) unlock('platinum_leader');

    if (health === 100) perfectDays++; else perfectDays = 0;
    if (perfectDays >= 3 && !unlockedAchievements.includes('nature_lover')) unlock('nature_lover');
    if (day >= 5 && health === 100 && !unlockedAchievements.includes('perfect_health')) unlock('perfect_health');
    if (day >= 20 && health === 100 && !unlockedAchievements.includes('perfect_run_20')) unlock('perfect_run_20');
    
    if (health > 0 && health <= 10 && !unlockedAchievements.includes('low_health')) unlock('low_health');
    if (day >= 5 && timeSpent < 120 && !unlockedAchievements.includes('fast_learner')) unlock('fast_learner');
    
    const totalAch = achievementsDB.length - 1; 
    const unlockedCount = unlockedAchievements.filter(id => id !== 'completionist').length;
    if (unlockedCount >= totalAch && !unlockedAchievements.includes('completionist')) {
        unlock('completionist');
    }

    localStorage.setItem('rodlistet_achievements', JSON.stringify(unlockedAchievements));
}

function unlock(id) {
    if (!unlockedAchievements.includes(id)) {
        unlockedAchievements.push(id);
        const ach = achievementsDB.find(a => a.id === id);
        if (ach) showNotification(`PRESTASJON LÅST OPP: ${ach.icon} ${ach.title}`);
    }
}

function showNotification(text) {
    const n = document.createElement('div');
    n.className = 'achievement-notification';
    n.innerText = text;
    document.body.appendChild(n);
    setTimeout(() => n.remove(), 4000);
}

function showAchievements() {
    const container = document.getElementById('achievements-list');
    container.innerHTML = "";
    achievementsDB.forEach(ach => {
        const isUnlocked = unlockedAchievements.includes(ach.id);
        const div = document.createElement('div');
        div.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
        div.innerHTML = `
            <div class="ach-icon">${isUnlocked ? ach.icon : '❓'}</div>
            <div class="ach-info">
                <h4>${ach.title}</h4>
                <p>${ach.desc}</p>
            </div>
        `;
        container.appendChild(div);
    });
    openModal('achievements-modal');
}

function saveScore() {
    const nameInput = document.getElementById('player-name');
    const name = nameInput.value.trim() || "Anonym";
    const newEntry = { name: name, days: day, streak: streak, date: new Date().toLocaleDateString() };
    localLeaderboard.push(newEntry);
    localLeaderboard.sort((a, b) => b.days - a.days || b.streak - a.streak);
    localLeaderboard = localLeaderboard.slice(0, 10);
    localStorage.setItem('rodlistet_leaderboard', JSON.stringify(localLeaderboard));
    nameInput.disabled = true;
    document.getElementById('btn-save-score').innerText = "Lagret!";
    document.getElementById('btn-save-score').disabled = true;
    showLeaderboard();
}

function showLeaderboard() {
    const container = document.getElementById('leaderboard-list');
    container.innerHTML = "";
    
    if (localLeaderboard.length === 0) {
        const p = document.createElement('p');
        p.innerText = "Ingen resultater ennå. Bli den første!";
        container.appendChild(p);
    } else {
        const table = document.createElement('table');
        table.className = "leaderboard-table";
        table.innerHTML = `<thead><tr><th>#</th><th>Navn</th><th>Dager</th><th>Streak</th></tr></thead>`;
        const tbody = document.createElement('tbody');
        localLeaderboard.forEach((entry, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `<td>${index + 1}</td><td>${entry.name}</td><td>${entry.days || 0}</td><td>${entry.streak || 0}</td>`;
            tbody.appendChild(tr);
        });
        table.appendChild(tbody);
        container.appendChild(table);
    }
    openModal('leaderboard-modal');
}

function resetGameData() {
    if (confirm("Er du sikker på at du vil slette alle poeng og prestasjoner? Dette kan ikke angres.")) {
        localStorage.removeItem('rodlistet_leaderboard');
        localStorage.removeItem('rodlistet_achievements');
        localLeaderboard = [];
        unlockedAchievements = [];
        alert("Data slettet. Siden vil nå lastes på nytt.");
        location.reload();
    }
}

function setupEvents() {
    document.getElementById('game-logo').onclick = () => {
        window.location.href = 'start.html';
    };

    document.getElementById('btn-toggle-map').onclick = () => {
        if (is3d) {
            map.removeLayer(layer3d);
            layer2d.addTo(map);
            document.getElementById('btn-toggle-map').innerHTML = "🛰️ Satellitt";
            document.body.classList.remove('map-3d');
        } else {
            map.removeLayer(layer2d);
            layer3d.addTo(map);
            document.getElementById('btn-toggle-map').innerHTML = "🗺️ Kart";
            document.body.classList.add('map-3d');
        }
        is3d = !is3d;
    };

    document.getElementById('btn-start-day').onclick = () => { if(!isDifficultySet) openModal('difficulty-modal'); else generateChoices(); };
    document.getElementById('opt-easy').onclick = () => selectDifficulty('easy');
    document.getElementById('opt-medium').onclick = () => selectDifficulty('medium');
    document.getElementById('opt-hard').onclick = () => selectDifficulty('hard');
    document.getElementById('btn-continue').onclick = nextDay;
    document.getElementById('btn-restart').onclick = () => location.reload();
    document.getElementById('close-info').onclick = () => closeModal('info-modal');
    
    // TTS Knapper
    document.getElementById('btn-listen-info').onclick = () => {
        if(currentSpeciesInInfo) {
            const db = animalDatabase[currentSpeciesInInfo.norskNavn.toLowerCase()];
            const text = `${currentSpeciesInInfo.norskNavn}. ${db ? db.t : ''}`;
            speak(text);
        }
    };
    
    document.getElementById('btn-listen-quiz').onclick = () => {
        const text = "Hvem må gå? Velg en art som skal fjernes. Alternativene er: " + 
                     currentQuizOptions.map(o => o.name).join(", ");
        speak(text);
    };
    
    document.getElementById('btn-hint').onclick = useHint;

    document.getElementById('btn-ask-ai').onclick = function() {
        if (currentSpeciesInInfo) {
            const speciesName = currentSpeciesInInfo.norskNavn;
            const latinName = currentSpeciesInInfo.vitenskapeligNavn;
            closeModal('info-modal');
            document.getElementById('chat-window').classList.remove('hidden');
            const inputField = document.getElementById('chat-input');
            inputField.value = `Fortell meg mer om ${speciesName} (${latinName}). Hvorfor er den viktig i Agder-naturen?`;
            handleChatSubmit({ preventDefault: () => {} });
        }
    };

    document.getElementById('btn-show-leaderboard').onclick = showLeaderboard;
    document.getElementById('btn-show-achievements').onclick = showAchievements;
    document.getElementById('close-leaderboard').onclick = () => closeModal('leaderboard-modal');
    document.getElementById('close-achievements').onclick = () => closeModal('achievements-modal');
    document.getElementById('btn-save-score').onclick = saveScore;
    
    document.getElementById('btn-reset-achievements').onclick = () => {
        if(confirm("Vil du slette alle dine prestasjoner?")) {
            localStorage.removeItem('rodlistet_achievements');
            location.reload();
        }
    };

    document.getElementById('bot-trigger').onclick = () => document.getElementById('chat-window').classList.toggle('hidden');
    document.getElementById('close-chat').onclick = () => document.getElementById('chat-window').classList.toggle('hidden');
    document.getElementById('chat-form').onsubmit = (e) => { e.preventDefault(); handleChatSubmit(e); };
    document.getElementById('btn-debug-images').onclick = async () => {
        const missing = [];
        const names = Array.from(new Set(allDataFeatures.map(f => f.properties.norskNavn)));
        for (let name of names) {
            await new Promise(resolve => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = () => { missing.push(name); resolve(); };
                img.src = `images/${name}.jpg`;
            });
        }
        if (missing.length > 0) alert("Mangler: " + missing.join(", ")); else alert("Alle har bilder!");
    };
}

async function handleChatSubmit(e) {
    const input = document.getElementById('chat-input');
    const msg = input.value.trim();
    if(!msg || isAiThinking) return;
    isAiThinking = true;
    addChatMessage(msg, 'user');
    input.value = '';
    try {
        const res = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${aiModel}:generateContent?key=${apiKey}`, { 
            method: "POST", 
            headers: { "Content-Type": "application/json" }, 
            body: JSON.stringify({ contents: [{ role: "user", parts: [{ text: "Svar veldig kort (maks 2 setninger) på norsk med mange emojis: " + msg }] }] }) 
        });
        const data = await res.json();
        addChatMessage(data.candidates[0].content.parts[0].text, 'bot');
    } catch (err) { addChatMessage("Vokteren sover...", "bot"); }
    finally { isAiThinking = false; }
}

function addChatMessage(text, sender) {
    const c = document.getElementById('chat-messages'), d = document.createElement('div');
    d.className = `msg ${sender}`; 
    d.innerText = text;
    if (sender === 'bot') {
        const btn = document.createElement('button');
        btn.innerHTML = '🔊';
        btn.className = 'bot-audio-btn';
        btn.onclick = () => speak(text);
        d.appendChild(btn);
    }
    c.appendChild(d); c.scrollTop = c.scrollHeight;
}

const synth = window.speechSynthesis;
function speak(text) {
    if (synth.speaking) synth.cancel();
    if (!text) return;

    // Pause musikk mens vi snakker
    bgMusic.pause();

    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'no-NO';
    u.rate = 0.9;

    // Start musikken igjen når ferdig eller avbrutt
    u.onend = () => { bgMusic.play().catch(()=>{}); };
    u.onerror = () => { bgMusic.play().catch(()=>{}); };

    synth.speak(u);
}
function stopSpeech() { 
    if (synth.speaking) {
        synth.cancel(); 
        bgMusic.play().catch(()=>{});
    }
}