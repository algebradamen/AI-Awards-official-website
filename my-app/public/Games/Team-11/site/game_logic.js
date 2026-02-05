/* =================================================================
   GAME LOGIC & FUNCTIONS
   =================================================================
*/

// --- GLOBAL VARIABLES ---
let timerInterval;
let gameLoopInterval;
let crateInterval;
let eventInterval;
let blackMarketInterval;
let popupTimeout = null; 
let audioFadeInterval = null;

// --- GAME STATE ---
let gameState = {
    money: 0,
    evh: 0,
    incomeRate: 0,
    harmRate: 0,
    clickStrength: 1, 
    efficiency: 1.0, 
    timerActive: false,
    timeLeft: TIMER_MINUTES * 60,
    gameActive: false,
    isPaused: false, 
    moneyMultiplier: 1.0,
    isNightmare: false,
    allUpgrades: [],
    tutorialCompleted: false,
    tutorialStep: 0,
    menuOrigin: 'main',
    idolEventTriggered: false,
    totalClicks: 0,
    lastEnding: null, // NEW: Tracks the ID of the last triggered ending
    
    // DEV MODE
    inputBuffer: '',
    devSpeed: false,

    // NEW FEATURES
    buffs: {
        co2Shield: false,
        moneyBoost: false,
        costMultiplier: 1.0
    },
    skillsUsed: {
        co2: false,
        money: false,
        free: false
    },
    duplicationMode: false,

    blackMarketTimer: 0,
    blackMarketPurchases: 0,
    
    factoryCounts: {}, 

    pendingCityUrl: "",
    cityTimer: 0,

    audio: {
        master: 1.0,
        music: 1.0,
        sfx: 1.0
    }
};

// TUTORIAL HELPERS
let currentTutorialProgress = 0; 
let isTutorialActive = false;

// --- INITIALIZATION ---
document.addEventListener('DOMContentLoaded', () => {
    loadGameData();
    initGameData();
    setupMenuListeners();
    setupDevConsole();
    setupGameFeatures();
    setupAudioSystem();
});

function safeAttach(id, event, handler) {
    const el = document.getElementById(id);
    if (el) {
        el.addEventListener(event, handler);
    } else {
        console.warn(`Warning: Element with ID '${id}' not found.`);
    }
}

function initGameData() {
    const ind = config.industrial.map(item => ({ ...item, count: 0, hasOwned: false }));
    const eco = config.eco.map(item => ({ ...item, count: 0, hasOwned: false }));
    const clk = config.click.map(item => ({ ...item, count: 0, hasOwned: false }));
    
    let merged = [...ind, ...eco, ...clk];
    merged.sort((a, b) => a.baseCost - b.baseCost);

    gameState.allUpgrades = merged;
    updateImages(); 
    
    safeAttach('manual-click', 'click', handleManualClick);
    
    document.addEventListener('keydown', (e) => {
        if (e.key === "Escape") togglePause();
        handleCheatCode(e.key);
    });
}

function setupGameFeatures() {
    safeAttach('circle-co2', 'click', () => activateCircle('co2'));
    safeAttach('circle-money', 'click', () => activateCircle('money'));
    safeAttach('circle-free', 'click', () => activateCircle('free'));
    safeAttach('money-crate', 'click', collectMoneyCrate);
    safeAttach('btn-market-ok', 'click', () => {
        const modal = document.getElementById('market-modal');
        if (modal) modal.classList.add('hidden');
    });
    safeAttach('btn-close-bm', 'click', () => {
        document.getElementById('black-market').classList.add('hidden');
    });
    
    // UPDATED: Now calls handleEndingContinue to check for credits
    safeAttach('btn-ending-reset', 'click', handleEndingContinue);
}

// --- AUDIO SYSTEM ---
function setupAudioSystem() {
    const bgm = document.getElementById('bgm-player');
    const sMaster = document.getElementById('slider-master');
    const sMusic = document.getElementById('slider-music');
    const sSfx = document.getElementById('slider-sfx');

    function updateVolume() {
        gameState.audio.master = sMaster.value / 100;
        gameState.audio.music = sMusic.value / 100;
        gameState.audio.sfx = sSfx.value / 100;
        if (bgm) bgm.volume = gameState.audio.master * gameState.audio.music;
    }

    sMaster.addEventListener('input', updateVolume);
    sMusic.addEventListener('input', updateVolume);
    sSfx.addEventListener('input', updateVolume);

    document.body.addEventListener('click', () => {
        if (bgm && bgm.paused) {
            bgm.play().catch(e => console.log("Audio waiting for user interaction"));
        }
    }, { once: true });
}

function fadeAudioOut() {
    const bgm = document.getElementById('bgm-player');
    if (!bgm) return;
    const startVol = bgm.volume;
    let currentVol = startVol;
    if (audioFadeInterval) clearInterval(audioFadeInterval);
    audioFadeInterval = setInterval(() => {
        currentVol -= (startVol / 20);
        if (currentVol <= 0) {
            bgm.volume = 0;
            clearInterval(audioFadeInterval);
        } else {
            bgm.volume = currentVol;
        }
    }, 100);
}

function fadeAudioIn() {
    const bgm = document.getElementById('bgm-player');
    if (!bgm) return;
    const targetVol = gameState.audio.master * gameState.audio.music;
    let currentVol = 0;
    bgm.volume = 0;
    bgm.play().catch(e => {});
    if (audioFadeInterval) clearInterval(audioFadeInterval);
    audioFadeInterval = setInterval(() => {
        currentVol += (targetVol / 20);
        if (currentVol >= targetVol) {
            bgm.volume = targetVol;
            clearInterval(audioFadeInterval);
        } else {
            bgm.volume = currentVol;
        }
    }, 100);
}

function saveGameData() {
    const data = {
        unlockedAchievements: achievementConfig.filter(a => a.unlocked).map(a => a.id),
        unlockedEndings: endingConfig.filter(e => e.unlocked).map(e => e.id),
        tutorialCompleted: gameState.tutorialCompleted
    };
    localStorage.setItem('pop_save_data', JSON.stringify(data));
}

function loadGameData() {
    try {
        const data = JSON.parse(localStorage.getItem('pop_save_data'));
        if (data) {
            if (data.unlockedAchievements) {
                data.unlockedAchievements.forEach(id => {
                    const ach = achievementConfig.find(a => a.id === id);
                    if (ach) ach.unlocked = true;
                });
            }
            if (data.unlockedEndings) {
                data.unlockedEndings.forEach(id => {
                    const end = endingConfig.find(e => e.id === id);
                    if (end) end.unlocked = true;
                });
            }
            if (data.tutorialCompleted) {
                gameState.tutorialCompleted = true;
            }
        }
    } catch (e) {
        console.error("Save data corrupted, resetting.");
    }
}

// --- CORE GAME FUNCTIONS ---

window.selectDifficulty = function(multiplier, isNightmare) {
    const diffScreen = document.getElementById('difficulty-screen');
    diffScreen.classList.add('fade-out'); 
    setTimeout(() => {
        diffScreen.classList.add('hidden');
        diffScreen.classList.remove('fade-out'); 
        startGame(multiplier, isNightmare);
    }, 1000); 
};

function startGame(multiplier, isNightmare) {
    gameState.moneyMultiplier = multiplier;
    gameState.isNightmare = isNightmare;
    gameState.gameActive = true;
    
    // BUG FIX: Force pause state to false when starting a new game
    gameState.isPaused = false; 
    
    recalculateRates();
    renderShop();
    updateDisplay();
    updateTimerDisplay();
    startTimer(); 
}

function startTimer() {
    if (timerInterval) clearInterval(timerInterval);
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    if (crateInterval) clearInterval(crateInterval);
    if (eventInterval) clearInterval(eventInterval);
    if (blackMarketInterval) clearInterval(blackMarketInterval);

    const intervalSpeed = gameState.devSpeed ? 10 : 1000;
    gameState.timerActive = true;
    
    timerInterval = setInterval(() => {
        // Safe check for pause
        if (!gameState.gameActive || gameState.isPaused) return; 
        
        // UPDATED: Trigger Idol Event at exactly 15 minutes remaining (900 seconds)
        if (gameState.timeLeft === 900 && !gameState.idolEventTriggered) {
            triggerIdolEvent();
        }

        gameState.timeLeft--;
        updateTimerDisplay();
        updateNewsTicker();
        
        if (!document.getElementById('black-market').classList.contains('hidden')) {
            if (!isTutorialActive) {
                gameState.blackMarketTimer--;
                const bmVal = document.getElementById('bm-timer-val');
                if(bmVal) bmVal.innerText = gameState.blackMarketTimer;
                
                if (gameState.blackMarketTimer <= 0) {
                    document.getElementById('black-market').classList.add('hidden');
                }
            }
        }

        if (gameState.timeLeft <= 0) endGame();
    }, intervalSpeed);

    gameLoopInterval = setInterval(() => {
        if (!gameState.gameActive || gameState.isPaused) return; 
        gameLoop();
        checkGameEvents(); 
    }, intervalSpeed);

    if (!isTutorialActive) {
        crateInterval = setInterval(() => {
            if (!gameState.gameActive || gameState.isPaused) return;
            showMoneyCrate();
        }, 150000);

        eventInterval = setInterval(() => {
            if (!gameState.gameActive || gameState.isPaused) return;
            triggerMarketEvent();
            if (Math.random() < 0.33) triggerBlackMarket();
        }, 300000);
    }
}

function gameLoop() {
    gameState.money += gameState.incomeRate;
    gameState.evh += gameState.harmRate;
    recalculateRates();
    if (!gameState.duplicationMode) {
        renderShop();
    }
    updateDisplay();
    updateImages();
}

function updateTimerDisplay() {
    const el = document.getElementById('timer-display');
    if(!el) return;
    const minutes = Math.floor(gameState.timeLeft / 60);
    const seconds = gameState.timeLeft % 60;
    el.innerText = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
}

function restartGameLoop() {
    if (gameState.gameActive) startTimer();
}

function updateNewsTicker() {
    // Optional news ticker logic
}

function showMoneyCrate() {
    const crate = document.getElementById('money-crate');
    if(!crate) return;
    const top = Math.random() * 80 + 10; 
    const left = Math.random() * 80 + 10;
    crate.style.top = top + '%';
    crate.style.left = left + '%';
    crate.classList.remove('hidden');
    setTimeout(() => { crate.classList.add('hidden'); }, 10000);
}

function collectMoneyCrate(e) {
    const crate = document.getElementById('money-crate');
    let reward = Math.max(100, gameState.money * 0.15) * (0.8 + Math.random() * 0.4); 
    
    if (isTutorialActive) {
        reward = 500; 
        checkTutorialGoal('crate_click', 'money-crate');
    }

    gameState.money += reward;
    updateDisplay();
    if(crate) crate.classList.add('hidden');

    let x, y;
    if (e && e.clientX) {
        x = e.clientX;
        y = e.clientY;
    } else if (crate) {
        const rect = crate.getBoundingClientRect();
        x = rect.left + (rect.width / 2);
        y = rect.top;
    } else {
        x = window.innerWidth / 2;
        y = window.innerHeight / 2;
    }
    spawnFloatingText(x, y, reward);
}

function spawnFloatingText(x, y, amount) {
    const el = document.createElement('div');
    el.className = 'floating-text';
    el.innerText = `+$${Math.floor(amount).toLocaleString()}`;
    el.style.left = `${x}px`;
    el.style.top = `${y}px`;
    document.body.appendChild(el);
    setTimeout(() => { el.remove(); }, 1500);
}

// --- UPDATED SKILL LOGIC WITH VISUAL TIMER ---
function activateCircle(type) {
    if (isTutorialActive) {
        checkTutorialGoal('skill_activate', `circle-${type}`);
    }

    if (gameState.skillsUsed[type]) return; 

    if (type === 'free') {
        gameState.duplicationMode = !gameState.duplicationMode;
        const container = document.getElementById('unified-upgrade-list');
        const circle = document.getElementById('circle-free');
        if (gameState.duplicationMode) {
            if(container) container.classList.add('duplication-active');
            if(circle) circle.style.borderColor = '#fff'; 
            renderShop(); // Force re-render to show blue glow on items
        } else {
            if(container) container.classList.remove('duplication-active');
            if(circle) circle.style.borderColor = ''; 
            renderShop(); // Force re-render to remove glow
        }
        return; 
    }

    gameState.skillsUsed[type] = true;
    const circleEl = document.getElementById(`circle-${type}`);
    const overlay = circleEl ? circleEl.querySelector('.cooldown-overlay') : null;
    
    if(circleEl) {
        circleEl.classList.add('skill-depleted');
        circleEl.title = "Ability Depleted";
    }

    let duration = 0;
    if (type === 'co2') {
        duration = 180000;
        gameState.buffs.co2Shield = true;
        recalculateRates();
        setTimeout(() => { 
            gameState.buffs.co2Shield = false; 
            recalculateRates();
            if(overlay) {
                overlay.style.transition = 'none';
                overlay.style.height = '0%';
            }
        }, duration);
    } 
    else if (type === 'money') {
        duration = 90000;
        gameState.buffs.moneyBoost = true;
        recalculateRates();
        setTimeout(() => { 
            gameState.buffs.moneyBoost = false; 
            recalculateRates(); 
            if(overlay) {
                overlay.style.transition = 'none';
                overlay.style.height = '0%';
            }
        }, duration);
    } 

    if (overlay && duration > 0) {
        overlay.style.transition = 'none';
        overlay.style.height = '100%';
        void overlay.offsetWidth;
        overlay.style.transition = `height ${duration}ms linear`;
        overlay.style.height = '0%';
    }
}

function triggerMarketEvent() {
    const fluctuation = Math.random() < 0.5 ? -1 : 1; 
    const amount = Math.random() * 0.5; 
    gameState.buffs.costMultiplier = 1 + (fluctuation * amount);
    const msg = document.getElementById('market-msg');
    const type = fluctuation < 0 ? "CRASH" : "BOOM";
    const percent = Math.floor(amount * 100);
    
    triggerPopup({ name: `MARKET ${type}`, desc: `Costs shifted by ${percent}%.`, source: "Global Economy", type: 'click', evhGain: 0 });
    
    renderShop();
}

function triggerBlackMarket() {
    const bm = document.getElementById('black-market');
    const list = document.getElementById('bm-items');
    if(!bm || !list) return;

    list.innerHTML = '';
    gameState.blackMarketTimer = 60; 
    gameState.blackMarketPurchases = 0; 
    
    const pool = [
        { type: 'money', name: "OFFSHORE ACCOUNTS", desc: "Safe, hidden capital.", costFactor: 0.1, action: (c) => { gameState.money += c * 2; } },
        { type: 'money_risk', name: "TOXIC CONTRACT", desc: "Huge cash, huge pollution.", costFactor: 0.15, action: (c) => { gameState.money += c * 3; gameState.evh += 2500; } },
        { type: 'co2_clean', name: "CARBON SCRUBBERS", desc: "Expensive air filtration.", costFactor: 0.25, action: (c) => { gameState.evh -= 1500; } },
        { type: 'sale', name: "INSIDER INFO", desc: "90% off next purchase.", costFactor: 0.05, action: (c) => { gameState.buffs.costMultiplier = 0.1; renderShop(); } },
        { type: 'click', name: "ADRENALINE SHOTS", desc: "+10 Base Click Power.", costFactor: 0.1, action: (c) => { gameState.clickStrength += 10; } },
        { type: 'efficiency', name: "UNION BUSTING", desc: "Ignore efficiency drop briefly.", costFactor: 0.2, action: (c) => { gameState.money += c * 1.5; } },
        { type: 'gamble', name: "MYSTERY CRATE", desc: "Random Effect.", costFactor: 0.05, action: (c) => { if(Math.random()>0.5) gameState.money += c*4; else gameState.evh += 1000; } },
        { type: 'launder', name: "MONEY LAUNDERING", desc: "Convert Cash to Clean Air?", costFactor: 0.3, action: (c) => { gameState.evh -= 500; } }
    ];

    pool.sort(() => Math.random() - 0.5);
    const selected = pool.slice(0, 4);

    selected.forEach(item => {
        const div = generateBlackMarketItem(item);
        list.appendChild(div);
    });

    bm.classList.remove('hidden');
}

window.spawnTutorialBlackMarket = function() {
    const bm = document.getElementById('black-market');
    const list = document.getElementById('bm-items');
    if(!bm || !list) return;

    list.innerHTML = '';
    
    const div = document.createElement('div');
    div.className = 'bm-item';
    div.innerHTML = `
        <span style="color:var(--red); font-weight:bold;">FIRST TASTE</span>
        <span style="font-size:8px; color:#888;">A sample of power. Illegal.</span>
        <span style="color:var(--yellow); text-align:right;">FREE</span>
    `;
    
    div.onclick = () => {
        gameState.money += 1000;
        updateDisplay();
        div.remove(); 
        bm.classList.add('hidden');
        checkTutorialGoal('bm_action', 'black-market');
    };
    
    list.appendChild(div);
    bm.classList.remove('hidden');
    gameState.blackMarketTimer = 999;
}

function generateBlackMarketItem(itemData) {
    const div = document.createElement('div');
    div.className = 'bm-item';
    const cost = Math.floor(Math.max(500, gameState.money * itemData.costFactor));

    div.innerHTML = `
        <span style="color:var(--red); font-weight:bold;">${itemData.name}</span>
        <span style="font-size:8px; color:#888;">${itemData.desc}</span>
        <span style="color:var(--yellow); text-align:right;">$${cost.toLocaleString()}</span>
    `;
    
    div.onclick = () => {
        if (gameState.money >= cost) {
            gameState.money -= cost;
            itemData.action(cost);
            gameState.blackMarketPurchases++;
            updateDisplay();
            recalculateRates();
            div.remove(); 
            if (gameState.blackMarketPurchases >= 2) {
                const bm = document.getElementById('black-market');
                if(bm) bm.classList.add('hidden');
                triggerPopup({ name: "MARKET CLOSED", desc: "The seller got spooked and left.", source: "Black Market", type: 'click', evhGain: 0 });
            }
        }
    };
    return div;
}

function handleManualClick() {
    if (!gameState.gameActive || gameState.isPaused) return; 
    
    checkTutorialGoal('click', 'manual-click');

    let gain = gameState.clickStrength * gameState.moneyMultiplier * gameState.efficiency;
    if (gameState.buffs.moneyBoost) gain *= 2;
    gameState.money += gain;
    let clickHarm = gameState.clickStrength;
    if (gameState.isNightmare) clickHarm *= 2;
    gameState.evh += clickHarm;
    gameState.totalClicks++; 
    checkGameEvents();
    recalculateRates();
    renderShop();
    updateDisplay();
    updateImages();
}

function handleCheatCode(key) {
    if (key.length === 1) {
        gameState.inputBuffer += key.toLowerCase();
        if (gameState.inputBuffer.length > 20) gameState.inputBuffer = gameState.inputBuffer.slice(-20);
        if (gameState.inputBuffer.endsWith("kasaneteto")) {
            const consoleEl = document.getElementById('dev-console');
            if(consoleEl) consoleEl.classList.toggle('hidden');
            gameState.inputBuffer = ""; 
        }
    }
}

function setupDevConsole() {
    const consoleEl = document.getElementById('dev-console');
    const headerEl = consoleEl ? consoleEl.querySelector('.dev-header') : null;
    
    safeAttach('dev-speed', 'click', () => {
        gameState.devSpeed = !gameState.devSpeed;
        restartGameLoop(); 
        const btn = document.getElementById('dev-speed');
        if(btn) {
            btn.innerText = gameState.devSpeed ? ">> NORMAL" : ">> 100x";
            btn.style.color = gameState.devSpeed ? "#ff0000" : "#00ff00";
        }
    });
    safeAttach('dev-money', 'click', () => { gameState.money += 10000000; updateDisplay(); });
    safeAttach('dev-crate', 'click', showMoneyCrate);
    safeAttach('dev-market', 'click', triggerBlackMarket);
    safeAttach('dev-reset', 'click', () => { gameState.money = 0; gameState.evh = 0; updateDisplay(); recalculateRates(); });

    if (consoleEl && headerEl) {
        let isDown = false;
        let offset = [0, 0];
        headerEl.addEventListener('mousedown', (e) => {
            isDown = true;
            e.preventDefault(); 
            offset = [consoleEl.offsetLeft - e.clientX, consoleEl.offsetTop - e.clientY];
        }, true);
        document.addEventListener('mouseup', () => { isDown = false; }, true);
        document.addEventListener('mousemove', (e) => {
            if (isDown) {
                e.preventDefault();
                consoleEl.style.left = (e.clientX + offset[0]) + 'px';
                consoleEl.style.top = (e.clientY + offset[1]) + 'px';
                consoleEl.style.bottom = 'auto';
                consoleEl.style.right = 'auto';
            }
        }, true);
    }
}

function checkGameEvents() {
    if (gameState.money >= 100000000) unlockAchievement(8); 
}

function unlockAchievement(id) {
    const ach = achievementConfig.find(a => a.id === id);
    if (ach && !ach.unlocked) {
        ach.unlocked = true;
        showAchievementToast(ach);
        saveGameData();
    }
}

function unlockEnding(id) {
    const end = endingConfig.find(e => e.id === id);
    if (end && !end.unlocked) {
        end.unlocked = true;
        saveGameData();
    }
}

function showAchievementToast(ach) {
    const toast = document.getElementById('achievement-toast');
    const img = document.getElementById('toast-img');
    const title = document.getElementById('toast-title');
    if(!toast) return;
    img.src = ach.img;
    img.onerror = () => { img.src = "https://via.placeholder.com/75"; };
    title.innerText = ach.name;
    toast.classList.remove('hidden');
    setTimeout(() => { toast.classList.add('hidden'); }, 5000);
}

function triggerIdolEvent() {
    gameState.idolEventTriggered = true;
    gameState.isPaused = true;
    document.getElementById('idol-modal').classList.remove('hidden');
}

function setupMenuListeners() {
    safeAttach('btn-vote-miku', 'click', () => {
        unlockAchievement(9); 
        document.getElementById('idol-modal').classList.add('hidden');
        triggerMikuGameOver();
    });
    safeAttach('btn-vote-teto', 'click', () => {
        unlockAchievement(10); 
        document.getElementById('idol-modal').classList.add('hidden');
        gameState.isPaused = false; 
    });

    safeAttach('btn-main-start', 'click', () => {
        const overlay = document.getElementById('fade-overlay');
        overlay.style.opacity = '1';
        setTimeout(() => {
            document.getElementById('main-menu').classList.add('hidden');
            const diffScreen = document.getElementById('difficulty-screen');
            diffScreen.classList.remove('hidden');
            diffScreen.classList.remove('fade-out');
            overlay.style.opacity = '0';
        }, 1000);
    });

    safeAttach('btn-main-achievements', 'click', () => {
        gameState.menuOrigin = 'main';
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('achievements-menu').classList.remove('hidden');
        renderAchievements();
    });

    safeAttach('btn-main-endings', 'click', () => {
        gameState.menuOrigin = 'main';
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('endings-menu').classList.remove('hidden');
        document.getElementById('endings-view-list').classList.remove('hidden');
        document.getElementById('endings-view-preview').classList.add('hidden');
        renderEndings();
    });

    safeAttach('btn-main-sound', 'click', () => {
        gameState.menuOrigin = 'main';
        document.getElementById('main-menu').classList.add('hidden');
        document.getElementById('sound-menu').classList.remove('hidden');
    });

    safeAttach('btn-main-tutorial', 'click', startTutorial);

    safeAttach('btn-close-ach-modal', 'click', () => {
        document.getElementById('achievement-modal').classList.add('hidden');
    });
    safeAttach('btn-tutorial-next', 'click', nextTutorialStep);
    safeAttach('btn-snark-confirm', 'click', () => {
        document.getElementById('snark-modal').classList.add('hidden');
        launchTutorial();
    });

    safeAttach('btn-reset-ach-trigger', 'click', () => {
        document.getElementById('reset-confirm-modal').classList.remove('hidden');
    });
    safeAttach('btn-cancel-reset', 'click', () => {
        document.getElementById('reset-confirm-modal').classList.add('hidden');
    });
    safeAttach('btn-confirm-reset', 'click', () => {
        achievementConfig.forEach(ach => ach.unlocked = false);
        endingConfig.forEach(end => end.unlocked = false);
        gameState.tutorialCompleted = false; 
        saveGameData();
        renderAchievements();
        renderEndings();
        document.getElementById('reset-confirm-modal').classList.add('hidden');
    });

    safeAttach('btn-continue', 'click', togglePause);
    
    safeAttach('btn-achievements', 'click', () => {
        gameState.menuOrigin = 'pause';
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('achievements-menu').classList.remove('hidden');
        renderAchievements();
    });

    safeAttach('btn-endings', 'click', () => {
        gameState.menuOrigin = 'pause';
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('endings-menu').classList.remove('hidden');
        document.getElementById('endings-view-list').classList.remove('hidden');
        document.getElementById('endings-view-preview').classList.add('hidden');
        renderEndings();
    });
    
    safeAttach('btn-sound', 'click', () => {
        gameState.menuOrigin = 'pause';
        document.getElementById('pause-menu').classList.add('hidden');
        document.getElementById('sound-menu').classList.remove('hidden');
    });
    
    safeAttach('btn-restart', 'click', () => location.reload());

    const backHandler = (menuId) => {
        document.getElementById(menuId).classList.add('hidden');
        if (gameState.menuOrigin === 'main') document.getElementById('main-menu').classList.remove('hidden');
        else document.getElementById('pause-menu').classList.remove('hidden');
    };

    safeAttach('btn-back-ach', 'click', () => backHandler('achievements-menu'));
    safeAttach('btn-back-end', 'click', () => backHandler('endings-menu'));
    safeAttach('btn-back-snd', 'click', () => backHandler('sound-menu'));

    safeAttach('btn-preview-back', 'click', () => {
        document.getElementById('endings-view-preview').classList.add('hidden');
        document.getElementById('endings-view-list').classList.remove('hidden');
    });
}

function renderAchievements() {
    const unlocked = achievementConfig.filter(a => a.unlocked).length;
    const total = achievementConfig.length;
    const percent = Math.floor((unlocked / total) * 100);
    document.getElementById('ach-percent').innerText = `${percent}%`;
    document.getElementById('ach-bar').style.width = `${percent}%`;

    const list = document.getElementById('achievement-list');
    if(!list) return;
    list.innerHTML = '';
    achievementConfig.forEach(ach => {
        const div = document.createElement('div');
        div.className = `achievement-item ${ach.unlocked ? '' : 'locked'}`;
        div.innerText = `${ach.name}: [${ach.unlocked ? 'UNLOCKED' : 'LOCKED'}]`;
        div.onclick = () => showAchievementDetails(ach);
        list.appendChild(div);
    });
}

function renderEndings() {
    const unlocked = endingConfig.filter(e => e.unlocked).length;
    const total = endingConfig.length;
    const percent = Math.floor((unlocked / total) * 100);
    document.getElementById('end-percent').innerText = `${percent}%`;
    document.getElementById('end-bar').style.width = `${percent}%`;

    const list = document.getElementById('ending-list');
    if(!list) return;
    list.innerHTML = '';
    endingConfig.forEach(end => {
        const div = document.createElement('div');
        div.className = `achievement-item ${end.unlocked ? '' : 'locked'}`;
        div.innerText = `${end.name}: [${end.unlocked ? 'DISCOVERED' : 'LOCKED'}]`;
        if (end.unlocked) div.onclick = () => showEndingPreview(end);
        list.appendChild(div);
    });
}

function showEndingPreview(end) {
    document.getElementById('endings-view-list').classList.add('hidden');
    document.getElementById('endings-view-preview').classList.remove('hidden');
    document.getElementById('preview-title').innerText = end.name;
    document.getElementById('preview-msg').innerText = end.msg || "No description available.";
    const imgContainer = document.getElementById('preview-img-container');
    const img = document.getElementById('preview-img');
    img.src = end.img || "https://via.placeholder.com/600x400";
    img.onerror = () => { img.src = "https://via.placeholder.com/600x400?text=Image+Not+Found"; };
    if (end.id === 'miku') { imgContainer.style.width = '512px'; imgContainer.style.height = '512px'; } 
    else { imgContainer.style.width = '600px'; imgContainer.style.height = '400px'; }
}

function showAchievementDetails(ach) {
    const modal = document.getElementById('achievement-modal');
    const img = document.getElementById('ach-modal-img');
    const title = document.getElementById('ach-modal-title');
    const flavor = document.getElementById('ach-modal-flavor');
    const desc = document.getElementById('ach-modal-desc');
    title.innerText = ach.name;
    img.src = ach.img;
    img.onerror = () => { img.src = "https://via.placeholder.com/150"; }; 
    if (ach.unlocked) {
        img.style.filter = "none";
        flavor.innerText = ach.flavor; 
        desc.innerText = ach.desc;     
        img.parentElement.style.borderColor = "#ffeb3b";
        flavor.style.display = "block";
    } else {
        img.style.filter = "grayscale(100%) brightness(40%)";
        flavor.style.display = "none";
        desc.innerText = "??? (Locked)";
        img.parentElement.style.borderColor = "#333";
    }
    modal.classList.remove('hidden');
}

function togglePause() {
    if (!gameState.gameActive) return;
    gameState.isPaused = !gameState.isPaused;
    const ids = ['pause-menu', 'achievements-menu', 'endings-menu', 'sound-menu', 'achievement-modal'];
    const idolModal = document.getElementById('idol-modal');
    if (gameState.isPaused) {
        document.getElementById('pause-menu').classList.remove('hidden');
    } else {
        ids.forEach(id => document.getElementById(id).classList.add('hidden'));
        if (!idolModal.classList.contains('hidden')) gameState.isPaused = true;
    }
}

function triggerPopup(item) {
    const popup = document.getElementById('notification-popup');
    const title = document.getElementById('popup-title');
    const stat = document.getElementById('popup-stat');
    const desc = document.getElementById('popup-desc');
    const source = document.getElementById('popup-source');
    if (popupTimeout) { clearTimeout(popupTimeout); popupTimeout = null; }
    popup.classList.remove('fade-out');
    popup.classList.remove('hidden');
    void popup.offsetWidth;
    if (item.name === "SpaceX Rocket") {
        title.innerText = "READY FOR LAUNCH";
        stat.innerText = "";
        desc.innerText = "Systems Nominal.";
        source.innerText = "";
    } else {
        title.innerText = item.name;
        desc.innerText = item.desc;
        source.innerText = item.source;
        if (item.type === 'industrial') {
            const yearly = item.evhGain * 365;
            stat.style.color = '#ff5252';
            stat.innerText = `OUTPUT: +${yearly.toLocaleString()} tons CO2/yr`;
        } else if (item.type === 'eco') {
            const yearly = Math.abs(item.evhGain) * 365;
            stat.style.color = '#69f0ae';
            stat.innerText = `REDUCTION: -${yearly.toLocaleString()} tons CO2/yr`;
        } else {
            stat.style.color = '#fff';
            stat.innerText = `CLICK POWER INCREASED`;
        }
    }
    popupTimeout = setTimeout(() => {
        popup.classList.add('fade-out');
        setTimeout(() => { popup.classList.add('hidden'); popup.classList.remove('fade-out'); }, 1000);
    }, 5000);
}

function purchaseById(id) {
    if (!gameState.gameActive || gameState.isPaused) return;
    const item = gameState.allUpgrades.find(u => u.id === id);
    if (!item) return;
    if (item.name === "SpaceX Rocket" && item.count >= 1) return;

    if (gameState.duplicationMode) {
        if (item.count > 0) { 
            item.count++;
            triggerPopup({ name: "DUPLICATION COMPLETE", desc: `Successfully cloned 1x ${item.name}`, source: "Executive Override", type: 'click', evhGain: 0 });
            gameState.skillsUsed['free'] = true;
            gameState.duplicationMode = false;
            
            // Tutorial Check for using skill
            if(isTutorialActive) checkTutorialGoal('skill_use', id);

            const circle = document.getElementById('circle-free');
            const container = document.getElementById('unified-upgrade-list');
            if(circle) { circle.classList.add('skill-depleted'); circle.title = "Ability Depleted"; circle.style.borderColor = ''; }
            if(container) container.classList.remove('duplication-active');
            if (item.type !== 'click') spawnFactoryItem(item.id);
            recalculateRates();
            renderShop();
            updateDisplay();
        }
        return; 
    }

    // BALANCED: Cost multiplier reduced to 1.12
    const basePrice = Math.floor(item.baseCost * Math.pow(1.12, item.count));
    const cost = Math.floor(basePrice * gameState.buffs.costMultiplier);
    if (gameState.money >= cost) {
        gameState.money -= cost;
        item.count++;
        if (!item.hasOwned) { item.hasOwned = true; triggerPopup(item); }
        if (item.type !== 'click') spawnFactoryItem(item.id);
        
        checkTutorialGoal('buy', id);
        
        recalculateRates();
        renderShop(); 
        updateDisplay();
    }
}

function spawnFactoryItem(id) {
    if (!gameState.factoryCounts[id]) gameState.factoryCounts[id] = 0;
    if (gameState.factoryCounts[id] >= 5) return;
    const container = document.getElementById('factory-items-container');
    if(!container) return;
    const existing = document.querySelectorAll('.factory-item');
    let safe = false;
    let x, y;
    let attempts = 0;
    const maxAttempts = 50; 
    while (!safe && attempts < maxAttempts) {
        x = Math.random() * 90 + 5; 
        y = Math.random() * 80 + 10;
        safe = true;
        existing.forEach(el => {
            const exX = parseFloat(el.style.left);
            const exY = parseFloat(el.style.top);
            const dist = Math.sqrt(Math.pow(x - exX, 2) + Math.pow(y - exY, 2));
            if (dist < 9) safe = false;
        });
        attempts++;
    }
    if (!safe) return; 
    const img = document.createElement('img');
    img.className = 'factory-item';
    img.dataset.id = id;
    // UPDATED PATH
    img.src = `images/icon_${id}.png`; 
    img.onerror = () => { img.src = 'https://via.placeholder.com/48?text=' + id; };
    img.style.left = x + '%';
    img.style.top = y + '%';
    container.appendChild(img);
    gameState.factoryCounts[id]++;
}

function sellById(id) {
    if (!gameState.gameActive || gameState.isPaused) return;
    const item = gameState.allUpgrades.find(u => u.id === id);
    if (!item || item.count <= 0) return;
    const prevCost = Math.floor(item.baseCost * Math.pow(1.15, item.count - 1));
    const refund = Math.floor(prevCost * 0.20); 
    item.count--;
    gameState.money += refund;
    const visual = document.querySelector(`.factory-item[data-id="${id}"]`);
    if (visual) {
        visual.remove();
        if (gameState.factoryCounts[id] && gameState.factoryCounts[id] > 0) gameState.factoryCounts[id]--;
    }
    recalculateRates();
    renderShop();
    updateDisplay();
}

function recalculateRates() {
    let rawIncome = 0;
    let grossHarm = 0;
    let grossHealing = 0;
    let clickPower = 1;

    gameState.allUpgrades.forEach(item => {
        if (item.type === 'industrial') {
            rawIncome += (item.moneyGain * item.count);
            grossHarm += (item.evhGain * item.count);
        } else if (item.type === 'eco') {
            rawIncome += (item.moneyGain * item.count);
            grossHealing += (item.evhGain * item.count);
        } else if (item.type === 'click') {
            clickPower += (item.clickPower * item.count);
            grossHarm += (item.evhGain * item.count * 0.1);
        }
    });

    if (gameState.isNightmare) grossHarm *= 2;
    if (gameState.buffs.co2Shield) grossHarm *= 0.5; 
    if (gameState.buffs.moneyBoost) rawIncome *= 2.0; 
    
    // UPDATED: Efficiency Logic
    let eff = 1.0;

    if (gameState.evh > EVH_DAMAGE_THRESHOLD) {
        // Penalty logic (unchanged)
        let excess = gameState.evh - EVH_DAMAGE_THRESHOLD;
        eff = 1 / (1 + (excess / 2000));
        if (eff < 0.1) eff = 0.1; 
    } else if (gameState.evh < 0) {
        // BONUS Logic: Negative CO2 boosts efficiency up to 200%
        // Using an asymptotic curve so it never exceeds 2.0 mathematically
        // Formula: 1 + ( |CO2| / (|CO2| + 5000) )
        // At -5000 CO2, you get 1.5 (150%)
        // At -Infinite CO2, you approach 2.0 (200%)
        const absCo2 = Math.abs(gameState.evh);
        eff = 1.0 + (absCo2 / (absCo2 + 5000));
    }

    gameState.efficiency = eff;
    gameState.incomeRate = rawIncome * gameState.moneyMultiplier * gameState.efficiency;
    gameState.harmRate = grossHarm + grossHealing;
    gameState.clickStrength = clickPower;
}

function updateDisplay() {
    const moneyEl = document.getElementById('money-display');
    const evhEl = document.getElementById('evh-display');
    if(!moneyEl || !evhEl) return;
    moneyEl.innerText = `$${Math.floor(gameState.money)}`;
    evhEl.innerText = Math.floor(gameState.evh);
    document.getElementById('income-rate').innerText = gameState.incomeRate.toFixed(1);
    document.getElementById('harm-rate').innerText = gameState.harmRate.toFixed(1);
    const effPercent = Math.floor(gameState.efficiency * 100);
    const effEl = document.getElementById('efficiency-display');
    effEl.innerText = `${effPercent}%`;
    let clickVal = gameState.clickStrength * gameState.moneyMultiplier * gameState.efficiency;
    if (gameState.buffs.moneyBoost) clickVal *= 2;
    document.getElementById('click-strength').innerText = clickVal.toFixed(1);
}

function renderShop() {
    const container = document.getElementById('unified-upgrade-list');
    if(!container) return;
    container.innerHTML = '';

    gameState.allUpgrades.forEach(item => {
        // BALANCED: Cost multiplier usage in display
        const baseCost = Math.floor(item.baseCost * Math.pow(1.12, item.count));
        const cost = Math.floor(baseCost * gameState.buffs.costMultiplier);
        
        let statsHtml = '';
        let cardClass = 'upgrade-card';
        let isAffordable = gameState.money >= cost;
        
        // UPDATED: Logic for Duplication Mode
        // If duplicating, any owned item is valid, regardless of cost
        let isDuplicationTarget = false;
        if (gameState.duplicationMode && item.count > 0) {
            isDuplicationTarget = true;
        }

        let displayName = item.name;
        if (item.count === 0) {
            if (item.type === 'industrial') displayName = "UNKNOWN MACHINE";
            else if (item.type === 'eco') displayName = "UNKNOWN PROJECT";
            else displayName = "UNKNOWN TOOL";
        }
        
        // CSS Class Logic
        if (isDuplicationTarget) {
            cardClass += ' duplication-candidate'; // New class for blue glow
        } else if (!isAffordable) {
            cardClass += ' disabled';
        }

        let costDisplay = `$${cost}`;
        if (gameState.buffs.costMultiplier < 1.0) costDisplay += " (SALE!)";
        if (gameState.buffs.costMultiplier > 1.0) costDisplay += " (HIGH!)";
        
        // Stats generation (unchanged)
        if (item.type === 'click') {
            cardClass += ' type-click';
            let displayedEVH = gameState.isNightmare ? item.evhGain * 2 : item.evhGain;
            statsHtml = `<span class="upgrade-stats stat-click">+${item.clickPower} Clicks, +${displayedEVH.toFixed(1)} CO2/c</span>`;
        } else if (item.type === 'industrial') {
            cardClass += ' type-industrial';
            const adjustedIncome = (item.moneyGain * gameState.moneyMultiplier * gameState.efficiency).toFixed(1);
            let displayedEVH = gameState.isNightmare ? item.evhGain * 2 : item.evhGain;
            statsHtml = `<span class="upgrade-stats stat-bad">+$${adjustedIncome}/s, +${displayedEVH} CO2</span>`;
        } else if (item.type === 'eco') {
            cardClass += ' type-eco';
            let moneySign = item.moneyGain >= 0 ? '+' : ''; 
            statsHtml = `<span class="upgrade-stats stat-good">${moneySign}$${item.moneyGain}/s, ${item.evhGain} CO2</span>`;
        }

        const btn = document.createElement('div');
        btn.className = cardClass;
        btn.oncontextmenu = (e) => { e.preventDefault(); sellById(item.id); return false; };
        
        btn.innerHTML = `
            <div class="upgrade-header">
                <span class="upgrade-name">${displayName}</span>
                <span class="upgrade-owned">Owned: ${item.count}</span>
            </div>
            <span class="upgrade-cost">Cost: ${costDisplay}</span>
            ${statsHtml}
        `;
        
        // UPDATED: Click handler allows purchase if affordable OR if it's a valid duplication target
        if (isAffordable || isDuplicationTarget) { 
            btn.onclick = () => purchaseById(item.id); 
        }
        
        container.appendChild(btn);
    });
}

function updateImages() {
    const cityImg = document.getElementById('city-img');
    const factoryBg = document.getElementById('factory-bg'); 
    if(!cityImg || !factoryBg) return;
    let targetCityUrl = "";
    
    // UPDATED PATHS for dynamic images
    if (gameState.evh >= 1000) {
        if (gameState.evh < 10000) targetCityUrl = "images/citystate_-1.png";
        else if (gameState.evh < 50000) targetCityUrl = "images/citystate_-2.png";
        else if (gameState.evh < 200000) targetCityUrl = "images/citystate_-3.png";
        else if (gameState.evh < 500000) targetCityUrl = "images/citystate_-4.png";
        else targetCityUrl = "images/citystate_-5.png"; // Cap at 5
    } else if (gameState.evh <= -1000) {
        const absCO2 = Math.abs(gameState.evh);
        if (absCO2 < 10000) targetCityUrl = "images/citystate_+1.png";
        else if (absCO2 < 50000) targetCityUrl = "images/citystate_+2.png";
        else if (absCO2 < 200000) targetCityUrl = "images/citystate_+3.png";
        else if (absCO2 < 500000) targetCityUrl = "images/citystate_+4.png";
        else targetCityUrl = "images/citystate_+5.png"; // Cap at 5
    } else {
        targetCityUrl = "images/citystate_0.png";
    }
    
    const now = Date.now();
    if (targetCityUrl !== gameState.pendingCityUrl) {
        gameState.pendingCityUrl = targetCityUrl;
        gameState.cityTimer = now;
    } else if (now - gameState.cityTimer > 1000) {
        if (!cityImg.src.endsWith(targetCityUrl)) { cityImg.src = targetCityUrl; }
    }
    if (cityImg.src === "" || cityImg.src.includes("Loading")) cityImg.src = targetCityUrl;
    // UPDATED PATH
    if (factoryBg.src.indexOf('images/factory_floor.png') === -1) { factoryBg.src = "images/factory_floor.png"; }
}

function startTutorial() {
    if (gameState.tutorialCompleted) {
        document.getElementById('snark-modal').classList.remove('hidden');
        unlockAchievement(6); 
        saveGameData();
    } else {
        launchTutorial();
    }
}

function launchTutorial() {
    isTutorialActive = true;
    gameState.tutorialStep = 0;
    currentTutorialProgress = 0;
    if (!gameState.gameActive) {
        startGame(1.0, false); 
        clearInterval(timerInterval); 
    }
    document.getElementById('main-menu').classList.add('hidden'); 
    document.getElementById('tutorial-modal').classList.remove('hidden');
    updateTutorialContent();
}

function nextTutorialStep() {
    gameState.tutorialStep++;
    currentTutorialProgress = 0;
    
    // Remove previous highlights
    document.querySelectorAll('.tutorial-highlight').forEach(el => el.classList.remove('tutorial-highlight'));

    if (gameState.tutorialStep >= tutorialScenario.length) {
        // END TUTORIAL
        gameState.money = 0;
        gameState.evh = 0;
        gameState.allUpgrades.forEach(u => u.count = 0);
        gameState.skillsUsed = { co2: false, money: false, free: false };
        document.querySelectorAll('.ability-circle').forEach(el => {
            el.classList.remove('skill-depleted');
            if(el.id === 'circle-co2') el.title = "Reduce CO2 by 50% (ONE TIME USE)";
            if(el.id === 'circle-money') el.title = "2x Cash Gain (ONE TIME USE)";
            if(el.id === 'circle-free') el.title = "Free Building Copy (ONE TIME USE)";
        });
        
        // Remove spawned crate if it exists
        const crate = document.getElementById('money-crate');
        if(crate) crate.classList.add('hidden');

        recalculateRates();
        renderShop();
        updateDisplay();
        updateImages();
        document.getElementById('tutorial-modal').classList.add('hidden');
        document.getElementById('main-menu').classList.remove('hidden'); 
        gameState.tutorialCompleted = true;
        isTutorialActive = false;
        saveGameData();
    } else {
        updateTutorialContent();
    }
}

function spawnTutorialCrate() {
    const crate = document.getElementById('money-crate');
    if(!crate) return;
    crate.style.top = '50%';
    crate.style.left = '30%';
    crate.classList.remove('hidden');
    // We do NOT set a timeout to hide it, forcing the player to click it
}

function updateTutorialContent() {
    const step = tutorialScenario[gameState.tutorialStep];
    const content = document.getElementById('tutorial-content');
    const btn = document.getElementById('btn-tutorial-next');
    const modal = document.getElementById('tutorial-modal');
    content.innerHTML = step.text;
    modal.style.top = '50%';
    modal.style.left = '50%';
    
    // Trigger special logic (giving money, spawning crates)
    if (step.onStart) {
        step.onStart();
        updateDisplay();
        renderShop(); // Refresh shop to show affordability
    }

    if (step.type === 'action') {
        btn.classList.add('hidden');
        modal.style.top = '20%';
        modal.style.left = '70%';
        
        // ADD HIGHLIGHT
        if (step.targetId) {
            let targetEl;
            if (step.trigger === 'buy' || step.trigger === 'skill_use') {
                if(step.trigger === 'skill_use') targetEl = document.getElementById('unified-upgrade-list'); // Highlight whole list
                else targetEl = document.getElementById('unified-upgrade-list'); 
            } else {
                targetEl = document.getElementById(step.targetId);
            }
            
            if (targetEl) targetEl.classList.add('tutorial-highlight');
        }

    } else {
        btn.classList.remove('hidden');
        if (gameState.tutorialStep === tutorialScenario.length - 1) { btn.innerText = "FINISH"; } else { btn.innerText = "NEXT"; }
    }
}

function checkTutorialGoal(triggerType, target) {
    if (!isTutorialActive) return;
    const step = tutorialScenario[gameState.tutorialStep];
    
    if (step && step.type === 'action' && step.trigger === triggerType) {
        let completed = false;
        
        if (triggerType === 'click') {
            if (target === step.targetId) {
                currentTutorialProgress++;
                if (currentTutorialProgress >= step.count) completed = true;
            }
        } 
        else if (triggerType === 'buy') { 
            if (target === step.targetId) completed = true; 
        } 
        else if (triggerType === 'skill_activate') { 
            if (target === step.targetId) completed = true; 
        }
        else if (triggerType === 'skill_use') {
            // Target checks if they duplicated the correct item
            if (target === step.targetId) completed = true;
        }
        else if (triggerType === 'crate_click') {
            completed = true;
        }
        else if (triggerType === 'bm_action') {
            completed = true;
        }

        if (completed) {
            setTimeout(nextTutorialStep, 500);
        }
    }
}

function triggerMikuGameOver() {
    clearInterval(timerInterval);
    clearInterval(gameLoopInterval);
    gameState.gameActive = false;
    gameState.lastEnding = 'miku'; // NEW: Track this specific ending
    unlockEnding('miku'); 
    fadeAudioOut();

    const overlay = document.getElementById('fade-overlay');
    overlay.style.opacity = '1';

    setTimeout(() => {
        const endingScreen = document.getElementById('ending-screen');
        const imgContainer = endingScreen.querySelector('.ending-image-container');
        const title = document.getElementById('ending-title');
        const msg = document.getElementById('ending-message');
        const img = document.getElementById('ending-img');

        endingScreen.classList.remove('hidden');
        imgContainer.style.width = '512px';
        imgContainer.style.height = '512px';

        title.innerText = "GAME OVER";
        title.style.color = "#39c5bb";
        msg.innerText = "How dare you!";
        // UPDATED PATH
        img.src = "images/how_dare_you.png";
        img.onerror = () => { img.src = "https://via.placeholder.com/512"; };

        overlay.style.opacity = '0';
    }, 2000);
}

function endGame() {
    clearInterval(timerInterval);
    clearInterval(gameLoopInterval);
    gameState.gameActive = false;
    fadeAudioOut();

    if (gameState.evh < -1000000) unlockAchievement(1);
    if (gameState.evh > 1000000) unlockAchievement(2);
    // Removed Achievement 3 Logic
    if (gameState.evh >= 0 && gameState.evh < 10000) unlockAchievement(4);
    if (Math.abs(Math.floor(gameState.evh)) === 0) unlockAchievement(7);

    const androids = gameState.allUpgrades.find(u => u.name === "Android");
    const isSkynet = (androids && androids.count >= 50 && gameState.evh > 100000);
    if (isSkynet) unlockAchievement(5);

    const rocket = gameState.allUpgrades.find(u => u.name === "SpaceX Rocket");
    // BALANCED: Mars Requirement 15,000,000
    const isMars = (rocket && rocket.count > 0 && gameState.money >= 15000000);

    const overlay = document.getElementById('fade-overlay');
    overlay.style.opacity = '1';

    setTimeout(() => {
        const endingScreen = document.getElementById('ending-screen');
        const title = document.getElementById('ending-title');
        const msg = document.getElementById('ending-message');
        const img = document.getElementById('ending-img');

        endingScreen.classList.remove('hidden');
        
        let endingId = '';

        if (isSkynet) {
            endingId = 'random';
            unlockEnding('random'); 
            const endData = endingConfig.find(e => e.id === 'random');
            title.innerText = endData.name;
            title.style.color = "#9c27b0";
            msg.innerText = endData.msg;
            img.src = endData.img;
        } 
        else if (isMars) {
            endingId = 'mars';
            unlockEnding('mars');
            const endData = endingConfig.find(e => e.id === 'mars');
            title.innerText = endData.name;
            title.style.color = "#ff9800"; 
            msg.innerText = endData.msg;
            img.src = endData.img;
        }
        else if (gameState.evh <= 0) {
            endingId = 'good';
            unlockEnding('good');
            const endData = endingConfig.find(e => e.id === 'good');
            title.innerText = endData.name;
            title.style.color = "#4caf50";
            msg.innerText = endData.msg;
            img.src = endData.img;
        } 
        else {
            endingId = 'bad';
            unlockEnding('bad');
            const endData = endingConfig.find(e => e.id === 'bad');
            title.innerText = endData.name;
            title.style.color = "#f44336";
            msg.innerText = `Time is up. You accumulated ${Math.floor(gameState.evh)} CO2. The world is a barren wasteland plagued by toxic air and dead landscapes.`;
            img.src = endData.img;
        }
        
        gameState.lastEnding = endingId; // Track for credits sequence
        img.onerror = () => { img.src = "https://via.placeholder.com/1024x768"; };
        overlay.style.opacity = '0';
    }, 2000);
}

// NEW FUNCTION: Handles transition to credits or main menu
function handleEndingContinue() {
    // If it was Miku ending, or any error state, just reset immediately
    if (gameState.lastEnding === 'miku' || !gameState.lastEnding) {
        resetGame();
        return;
    }

    // Otherwise, play credits sequence
    const endingScreen = document.getElementById('ending-screen');
    const creditsScreen = document.getElementById('credits-screen');
    const thankYouMsg = document.getElementById('credits-thankyou');
    
    // Hide ending, show credits
    endingScreen.classList.add('hidden');
    creditsScreen.classList.remove('hidden');

    // Sequence:
    // 0s: Credits Fade In (handled by CSS animation)
    // 6s: Show "Thank You"
    setTimeout(() => {
        thankYouMsg.classList.remove('hidden');
    }, 6000);

    // 10s (6s + 4s): Go to Main Menu
    setTimeout(() => {
        // Hide credits again for next time
        creditsScreen.classList.add('hidden');
        thankYouMsg.classList.add('hidden');
        resetGame();
    }, 10000);
}

// --- RESET GAME LOGIC (Allows Audio Fade In) ---
function resetGame() {
    // Explicitly stop any lingering intervals
    if (timerInterval) clearInterval(timerInterval);
    if (gameLoopInterval) clearInterval(gameLoopInterval);
    if (crateInterval) clearInterval(crateInterval);
    if (eventInterval) clearInterval(eventInterval);
    if (blackMarketInterval) clearInterval(blackMarketInterval);

    // Explicitly set game as inactive
    gameState.gameActive = false;

    const endingScreen = document.getElementById('ending-screen');
    const creditsScreen = document.getElementById('credits-screen');
    const overlay = document.getElementById('fade-overlay');
    
    // Fade out visuals
    overlay.style.opacity = '1';
    
    setTimeout(() => {
        endingScreen.classList.add('hidden');
        creditsScreen.classList.add('hidden'); // Ensure closed
        document.getElementById('main-menu').classList.remove('hidden');
        
        // Reset State
        gameState.money = 0;
        gameState.evh = 0;
        gameState.timeLeft = TIMER_MINUTES * 60;
        gameState.allUpgrades.forEach(u => u.count = 0);
        gameState.factoryCounts = {};
        gameState.skillsUsed = { co2: false, money: false, free: false };
        gameState.buffs = { co2Shield: false, moneyBoost: false, costMultiplier: 1.0 };
        gameState.lastEnding = null; 
        document.getElementById('factory-items-container').innerHTML = '';
        
        // Reset Visuals
        document.querySelectorAll('.ability-circle').forEach(el => {
            el.classList.remove('skill-depleted');
            const overlay = el.querySelector('.cooldown-overlay');
            if(overlay) {
                overlay.style.transition = 'none';
                overlay.style.height = '0%';
            }
        });
        
        recalculateRates();
        updateDisplay();
        updateImages();
        
        // Fade Music Back In
        fadeAudioIn();
        
        overlay.style.opacity = '0';
    }, 1000);
}