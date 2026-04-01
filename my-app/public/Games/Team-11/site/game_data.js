/* =================================================================
   GAME DATA & CONFIGURATION
   =================================================================
*/

// --- CONSTANTS ---
const TIMER_MINUTES = 30;
const EVH_DAMAGE_THRESHOLD = 1000; 

// --- UPGRADES CONFIG ---
const config = {
    industrial: [
        { id: 'ind1', type: 'industrial', name: 'Diesel Generator', baseCost: 20, moneyGain: 1, evhGain: 3, desc: "Burns cheap fuel. Loud, dirty, and produces 1,095 tons of CO2 yearly.", source: "Source: Annual Industrial Output Report" },
        { id: 'ind2', type: 'industrial', name: 'Textile Factory', baseCost: 150, moneyGain: 5, evhGain: 12, desc: "Mass production at a cost. Dumps chemicals into local rivers. 4,380 tons CO2/yr.", source: "Source: Global Manufacturing Index" },
        { id: 'ind3', type: 'industrial', name: 'Coal Mine', baseCost: 600, moneyGain: 20, evhGain: 35, desc: "Extracts ancient carbon. Scars the landscape and releases 12,775 tons CO2/yr.", source: "Source: Mining Gazette Weekly" },
        { id: 'ind4', type: 'industrial', name: 'Smelter', baseCost: 1500, moneyGain: 55, evhGain: 80, desc: "Melts ore into metal. The smoke turns the sky grey. 29,200 tons CO2/yr.", source: "Source: Heavy Metals Monthly" },
        { id: 'ind5', type: 'industrial', name: 'Coal Power Plant', baseCost: 4000, moneyGain: 120, evhGain: 200, desc: "Powers the city, but blackens the clouds. A massive 73,000 tons CO2/yr.", source: "Source: National Energy Grid Stats" },
        { id: 'ind6', type: 'industrial', name: 'Chemical Plant', baseCost: 10000, moneyGain: 350, evhGain: 500, desc: "Synthesizes profit. Leaks toxic byproducts. 182,500 tons CO2/yr.", source: "Source: Chemical Safety Board" },
        { id: 'ind7', type: 'industrial', name: 'Oil Rig', baseCost: 25000, moneyGain: 800, evhGain: 1200, desc: "Drills the deep sea. Risk of catastrophic spills. 438,000 tons CO2/yr.", source: "Source: Deep Sea Drilling Corp" },
        { id: 'ind8', type: 'industrial', name: 'Plastics Factory', baseCost: 60000, moneyGain: 2000, evhGain: 3000, desc: "Creates eternal waste. Microplastics everywhere. 1,095,000 tons CO2/yr.", source: "Source: Polymer Production Analysis" },
        { id: 'ind9', type: 'industrial', name: 'Crypto Mining Lab', baseCost: 150000, moneyGain: 5500, evhGain: 7000, desc: "Thousands of GPUs solving math puzzles. Consumes massive energy. 2.5M tons CO2/yr.", source: "Source: Blockchain Energy Monitor" },
        { id: 'ind10', type: 'industrial', name: 'AI DATACENTER', baseCost: 750000, moneyGain: 15000, evhGain: 25000, desc: "Consumes a small country's energy. Generates heat and 9.1M tons CO2/yr.", source: "Source: Future Tech Estimates" }
    ],
    eco: [
        { id: 'eco1', type: 'eco', name: 'Recycling', baseCost: 75, moneyGain: 0, evhGain: -1, desc: "Reduces waste by 365 tons/yr. \n\nRISK: Requires significant fresh water for cleaning.", source: "Source: Waste Management Data 2025" },
        { id: 'eco2', type: 'eco', name: 'Composting', baseCost: 300, moneyGain: 0, evhGain: -3, desc: "Turns waste to soil. Saves 1,095 tons/yr. \n\nRISK: Methane pockets can form if mismanaged.", source: "Source: Soil Science Journal" },
        { id: 'eco3', type: 'eco', name: 'Electric Bus Fleet', baseCost: 1000, moneyGain: -5, evhGain: -10, desc: "Replaces diesel engines. Saves 3,650 tons/yr. \n\nTRADEOFF: High battery disposal costs.", source: "Source: City Transit Authority" },
        { id: 'eco4', type: 'eco', name: 'Solar Farm', baseCost: 3000, moneyGain: 2, evhGain: -25, desc: "Clean energy. Saves 9,125 tons/yr. \n\nDAMAGE: Requires clearing large areas of natural habitat.", source: "Source: Renewable Energy Annual" },
        { id: 'eco5', type: 'eco', name: 'Wind Farm', baseCost: 8000, moneyGain: 5, evhGain: -60, desc: "Harnesses the wind. Saves 21,900 tons/yr. \n\nDAMAGE: Blades pose a danger to migratory birds.", source: "Source: Environmental Impact Study" },
        { id: 'eco6', type: 'eco', name: 'Hydroelectric Dam', baseCost: 20000, moneyGain: 10, evhGain: -150, desc: "Powerful flow. Saves 54,750 tons/yr. \n\nDAMAGE: Floods upstream valleys and disrupts fish spawning.", source: "Source: River Ecology Report" },
        { id: 'eco7', type: 'eco', name: 'Artificial Trees', baseCost: 50000, moneyGain: -50, evhGain: -400, desc: "Bio-engineered algie panels. Removes 146,000 tons/yr. \n\nRISK: Requires constant nutrient fluid replacements.", source: "Source: Biotech Weekly" },
        { id: 'eco8', type: 'eco', name: 'Ocean Cleanup', baseCost: 150000, moneyGain: -200, evhGain: -1000, desc: "Filters the sea. Removes 365,000 tons/yr. \n\nDAMAGE: Nets accidentally trap marine life.", source: "Source: Marine Biology Stats" },
        { id: 'eco9', type: 'eco', name: 'Nature Reserve', baseCost: 400000, moneyGain: -500, evhGain: -3000, desc: "Protected land. Absorbs 1M tons/yr. \n\nCOST: Prevents housing expansion, increasing city density.", source: "Source: Global Conservation Fund" },
        { id: 'eco10', type: 'eco', name: 'SpaceX Rocket', baseCost: 1500000, moneyGain: 0, evhGain: 0, desc: "Escape plan. \n\nDoes not affect CO2 or Money. \n\nLimit: 1", source: "Source: Aerospace Futures" }
    ],
    click: [
        { id: 'clk1', type: 'click', name: 'Iron Crowbar', baseCost: 150, clickPower: 1, evhGain: 1, desc: "Heavy iron leverage. Manual labor is now 100% more effective.", source: "Source: Tool Manufacturer Specs" },
        { id: 'clk2', type: 'click', name: 'Pneumatic Actuator', baseCost: 750, clickPower: 5, evhGain: 2, desc: "Compressed air driven tools. Faster, harder strikes.", source: "Source: Hydraulic Systems Inc." },
        { id: 'clk3', type: 'click', name: 'Hydraulic Gauntlet', baseCost: 3500, clickPower: 20, evhGain: 10, desc: "Crushing grip. Can bend steel beams with bare hands.", source: "Source: Heavy Machinery Catalog" },
        { id: 'clk4', type: 'click', name: 'Automated Servo-Arm', baseCost: 15000, clickPower: 100, evhGain: 50, desc: "A robotic third arm attached to your spine. Efficiency is mandatory.", source: "Source: Cybernetics Monthly" },
        { id: 'clk5', type: 'click', name: 'Android', baseCost: 100000, clickPower: 1000, evhGain: 200, desc: "Autonomous worker units. Efficiency is mandatory.", source: "Source: Future Human Tech" }
    ]
};

// --- ACHIEVEMENTS & ENDINGS ---
const achievementConfig = [
    // UPDATED PATHS
    { id: 1, name: "Green Hero", flavor: "Life continues thanks to you!", desc: "Beat the game with over -1,000,000 CO2.", img: "images/green_hero.png", unlocked: false },
    { id: 2, name: "Nature's Doom", flavor: "You destroyed it all...", desc: "End the game with high CO2 (> 1,000,000).", img: "images/natures_doom.png", unlocked: false },
    { id: 4, name: "Reluctant saviour", flavor: "I mean, its still intact?", desc: "Beat the game with an average amount of CO2 (0 - 10,000).", img: "images/reluctant_saviour.png", unlocked: false },
    { id: 5, name: "Skynet", flavor: "Honestly, i think the world is in better hands with them...", desc: "Beat the game with over 50 Androids and high CO2.", img: "images/skynet.png", unlocked: false },
    { id: 6, name: "Digital Nuisance", flavor: "Annoy the game by wasting its time", desc: "Press the tutorial button again after already beating the tutorial.", img: "images/digital_nuiscance.png", unlocked: false },
    { id: 7, name: "Impressive", flavor: "End the game with having no impact", desc: "End the game with exactly 0 CO2.", img: "images/impressive.png", unlocked: false },
    { id: 8, name: "Elon's Envy", flavor: "I can almost hear his ego shattering from here", desc: "Make $100,000,000 in one game.", img: "images/elons_envy.png", unlocked: false },
    { id: 9, name: "The wrong choice", flavor: "This is Teto Territory, no Miku Maniacs allowed!", desc: "Choose 'Miku' when asked to choose.", img: "images/the_wrong_choice.png", unlocked: false },
    { id: 10, name: "The right choice", flavor: "Teto Supremacy!", desc: "Choose 'Teto' when asked to choose.", img: "images/the_right_choice.png", unlocked: false }
];

const endingConfig = [
    // UPDATED PATHS
    { 
        id: 'good', 
        name: "NATURE PREVAILS", 
        unlocked: false,
        msg: "Time is up. You sacrificed short-term profit to save the planet. The air is clean, and the forests have reclaimed the land.",
        img: "images/nature_prevails.png"
    },
    { 
        id: 'bad', 
        name: "ECOLOGICAL COLLAPSE", 
        unlocked: false,
        msg: "Time is up. You accumulated massive CO2. The world is a barren wasteland plagued by toxic air and dead landscapes.",
        img: "images/ecological_collapse.png"
    },
    { 
        id: 'random', 
        name: "ANDROID ASCENSION", 
        unlocked: false,
        msg: "The AI network has achieved singularity. Optimization protocols have determined humanity is the primary source of inefficiency. Deletion imminent.",
        img: "images/android_ascension.png"
    },
    { 
        id: 'mars', 
        name: "RED RETIREMENT", 
        unlocked: false, 
        msg: "Earth was just the office. Mars is the country club. Enjoy the view.", 
        img: "images/red_retirement.png" 
    },
    { 
        id: 'miku', 
        name: "GAME OVER (MIKU)", 
        unlocked: false,
        msg: "How dare you!",
        img: "images/how_dare_you.png"
    }
];

// --- COMPLETE REVAMPED TUTORIAL SCENARIO ---
const tutorialScenario = [
    { 
        type: 'intro', 
        text: "Welcome, Operator. I am your Handler.<br><br>Your goal is simple: <strong>Maximize Capital.</strong><br><br>The Board has given you 20 minutes before the fiscal year ends. Don't disappoint us."
    },
    { 
        type: 'action', 
        trigger: 'click', 
        targetId: 'manual-click',
        count: 3, 
        text: "Let's begin with manual labor. It's tedious, but necessary.<br><br><strong>TASK:</strong> Click the 'MANUAL LABOR' button 3 times."
    },
    { 
        type: 'action', 
        trigger: 'buy', 
        targetId: 'ind1', // Diesel Generator
        text: "Good. Now, automate. <strong style='color:#f44336'>Red Buildings</strong> generate passive income, but they pollute the air.<br><br><strong>TASK:</strong> Buy 1 'Diesel Generator'.",
        onStart: () => { gameState.money = 25; } 
    },
    { 
        type: 'info', 
        text: "Notice the <strong>CO2 Level</strong> rising? Pollution isn't just bad for PR; it destroys <strong>Efficiency</strong>.<br><br>If CO2 gets too high, your income will be slashed. We must maintain balance... or exploit it."
    },
    { 
        type: 'action', 
        trigger: 'buy', 
        targetId: 'eco1', // Recycling
        text: "<strong style='color:#4caf50'>Green Projects</strong> reduce CO2 and restore Efficiency, but they cost money to run.<br><br><strong>TASK:</strong> Buy 1 'Recycling' project to scrub the air.",
        onStart: () => { gameState.money = 100; }
    },
    { 
        type: 'info', 
        text: "Excellent. Now, let's talk about <strong>Executive Powers</strong>. You have 3 active skills. They deplete upon use."
    },
    { 
        type: 'action', 
        trigger: 'skill_activate', 
        targetId: 'circle-co2',
        text: "The <strong>Green Skill</strong> acts as a CO2 shield. It temporarily halts pollution accumulation, perfect for heavy industrial bursts.<br><br><strong>TASK:</strong> Activate the Green Circle.",
        onStart: () => { gameState.skillsUsed['co2'] = false; }
    },
    { 
        type: 'action', 
        trigger: 'skill_activate', 
        targetId: 'circle-money',
        text: "The <strong>Yellow Skill</strong> floods the market, temporarily doubling ALL income. Time this with high Efficiency for maximum profit.<br><br><strong>TASK:</strong> Activate the Yellow Circle.",
        onStart: () => { gameState.skillsUsed['money'] = false; }
    },
    { 
        type: 'action', 
        trigger: 'skill_activate', 
        targetId: 'circle-free',
        text: "Finally, the <strong>Blue Skill</strong>. It allows you to clone any building you own for FREE.<br><br><strong>TASK:</strong> Click the Blue Circle to activate Duplication Mode.",
        onStart: () => { 
            gameState.skillsUsed['free'] = false;
            // Ensure they have a Diesel Generator to clone
            const gen = gameState.allUpgrades.find(u => u.id === 'ind1');
            if(gen.count === 0) gen.count = 1;
        }
    },
    { 
        type: 'action', 
        trigger: 'skill_use', 
        targetId: 'ind1', // Target the generator in the list
        text: "Now, select the building you want to copy.<br><br><strong>TASK:</strong> Click the 'Diesel Generator' in the list to duplicate it."
    },
    { 
        type: 'action', 
        trigger: 'crate_click', 
        targetId: 'money-crate',
        text: "Occasional <strong>Money Crates</strong> will float by. They contain corporate bonuses.<br><br><strong>TASK:</strong> Click the floating crate.",
        onStart: () => { spawnTutorialCrate(); }
    },
    { 
        type: 'action', 
        trigger: 'bm_action', 
        targetId: 'black-market',
        text: "Warning: <strong>Black Market</strong> signal detected. It appears randomly and sells illegal tech. Buying illegal goods risks stability, but offers power.<br><br><strong>TASK:</strong> Buy the 'First Taste' from the market window.",
        onStart: () => { spawnTutorialBlackMarket(); }
    },
    { 
        type: 'info', 
        text: "<strong>FINAL BRIEFING:</strong><br>1. Survive 20 Minutes.<br>2. Manage Efficiency.<br>3. Discover all Endings.<br><br>The clock starts now. Get to work."
    }
];