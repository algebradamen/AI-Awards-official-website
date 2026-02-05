import React, { useState, useEffect, useRef, useCallback, memo } from 'react';
import {
    Moon, Sun, Menu, X, ArrowRight, Leaf, Cpu,
    MapPin, Zap, Users, Play, CheckCircle,
    Layers, Info, Heart, Share2,
    Trees, Factory, Bike, ShoppingBag, Utensils,
    Car, Footprints, Bus, HelpCircle, ArrowUpRight, Navigation, Search, Mail, LocateFixed,
    Lightbulb, Droplets, Recycle, Thermometer, ShieldCheck, Trophy, Coffee, Award, Star, Target, Globe, User, Smartphone, Shirt, Trash2, Battery,
    Lock, LogOut, Settings, Clock, Anchor, CloudRain, Copy, BrainCircuit, Timer, Coins, Pointer, Store, Sprout, Swords, Bell, Calendar, Languages
} from 'lucide-react';

// --- OVERSETTELSER (UI TEXT) ---
const UI_TEXT = {
    no: {
        nav: { home: "Hjem", impact: "Dine Valg", transport: "Transport", facts: "Fakta", about: "Om oss", login: "Logg inn / Bli med", logout: "Logg ut", settings: "Innstillinger", account: "Konto", join: "Bli med" },
        hero: { pill: "Din Fremtid // Dine Valg", title1: "TA KONTROLL OVER", title2: "DIN FREMTID.", subtitle: "Simuler effekten av dine reisevaner og livsstilsvalg. Se endringen skje i sanntid.", card1_title: "Level Up Your Life", card1_desc: "Samle poeng, lås opp badges og bli en klima-helt. Små vaner, stor effekt.", card1_link: "SE DINE VALG", card2_title: "Mobilitets-sjekken", card2_desc: "Se hvor mye tid, penger og CO2 du sparer på å velge smart. Planlegg din rute nå.", card2_link: "START REISEPLANLEGGER", btn_facts: "GRØNNE FAKTA", btn_facts_desc: "Lær noe nytt om verden i dag", btn_quiz: "DAGENS QUIZ", btn_quiz_desc: "Test din kunnskap & vinn XP", partners: "I samarbeid med" },
        transport: { pill: "Simulator", title: "SJEKK REISEN DIN", subtitle: "Hva koster turen egentlig? For deg og for kloden.", from: "Fra (Start)", to: "Til (Destinasjon)", map_select: "Velg i kart", my_pos: "Min posisjon", calculating: "Beregner rute...", calculate: "Beregn Rute & Fotavtrykk", choose_mode: "Velg transportmiddel for", analysis: "Analyse", co2: "CO2 Utslipp", cal: "Kalorier", saved: "Spart", reset: "Nullstill Rute", map_mode: "KLIKK PÅ KARTET FOR Å VELGE", live_map: "Live Kart", dist: "Total Distanse", bike_save: "Sykkel sparer", emissions_label: "Utslipp:" },
        impact: { pill: "Ditt Avtrykk", title: "DINE VALG. DIN SCORE.", subtitle: "Ingen er perfekte, men alle kan 'levele opp'. Se hvordan små justeringer gir store utslag.", leaderboard: "Global Leaderboard", all_time: "All Time", monthly: "Denne Måneden", this_month: "Denne Mnd", total: "Totalt", no_players: "Ingen spillere ennå. Bli den første!", duel: "1v1 Duell", new_group: "Ny Gruppe", current_level: "Nåværende Nivå", xp_collected: "XP samlet", next_level: "Neste Nivå", badges: "Dine Badges", show_less: "Vis færre", show_all: "Vis alle badges", week_challenge: "Ukens Utfordring", ends_in: "Slutter om:", resets_in: "Nullstilles om:", challenge_title: "\"Den Store Bytte-Dagen\"", challenge_desc: "Arranger en byttedag med venner eller familie denne uken! Ta med 3 plagg du ikke bruker lenger, og bytt til deg noe nytt (gammelt).", reward: "Belønning:", accepted: "Utfordring Akseptert!", accept: "Jeg tar utfordringen!", habit_cats: { all: "Alle", food: "Mat", energy: "Energi", lifestyle: "Livsstil", consumption: "Forbruk" } },
        facts: { pill: "Visste du at?", title: "GRØNNE", title_span: "FAKTA", subtitle: "Lær noe nytt om verden i dag, eller test deg selv.", btn_knowledge: "Kunnskapsbank", btn_quiz: "Dagens Quiz", categories: { all: "Alle", food: "Mat & Avfall", tech: "Teknologi & Energi", fashion: "Mote & Forbruk", nature: "Natur & Mangfold" }, quiz_q: "Dagens Spørsmål", score_today: "Score i dag:", correct: "Riktig!", wrong: "Feil svar.", next_q: "Neste Spørsmål", finish_q: "Fullfør Quiz", quiz_done: "Dagens Quiz Fullført!", you_got: "Du fikk", new_q_tmrw: "Nye spørsmål kommer i morgen.", next_quiz_in: "Neste quiz om" },
        about: { pill: "Behind the scenes", title: "TEAM", title_span: "GREENSHIFT", subtitle: "Vi bygger broen mellom tunge klimadata og din hverdag. GreenShift er et digitalt eksperiment for fremtidens verden.", mission_title: "Oppdraget", mission_text: "Vårt oppdrag er å kommunisere utfordrende temaer innen klima og miljø på en engasjerende måte for ungdom mellom 17–25 år. Vi fokuserer på nærområdet, forbruk, fremtiden og smart mobilitet. Gjennom interaktive verktøy og lokale data ønsker vi å vise at bærekraft ikke bare handler om forsakelse, men om smartere valg som gagner både deg og kloden. Vi tror på at kunnskap som er nær, relevant og visuell har kraften til å endre vaner.", join_title: "Bli en av oss?", join_text: "Vi trenger kodere, drømmere, data-nerder og realister. Vil du bruke dine skills til å løse klimakrisen?", contact_btn: "Kontakt Oss", contact_info: "Kontaktinfo", email: "E-post", phone: "Telefon", address: "Adresse" },
        footer: { title: "Fremtiden starter nå", subtitle: "Sammen skaper vi en grønnere hverdag.", join_net: "Bli med i nettverket", share: "Del siden", collab: "I samarbeid med" },
        auth: { welcome_back: "Velkommen tilbake", join_gs: "Bli med i GreenShift", register: "Registrer", login: "Logg inn", logout: "Logg ut", username: "Brukernavn (Privat)", displayname: "Visningsnavn (Offentlig)", create_profile: "Opprett Profil", account: "Konto", save_changes: "Lagre Endringer", delete_profile: "Slett Min Profil", join: "Bli med" },
        modals: { confirm_habit: "Bekreft Fullføring", confirm_challenge: "Bekreft Utfordring", did_you: "Har du gjennomført", are_you_ready: "Er du klar for dette?", today: "i dag?", yes_verify: "Ja, godkjenn!", yes_accept: "Ja, start!", is_doing: "Har du gjort det?", is_preparing: "Gjør klar...", cancel: "Avbryt", group_name: "Gruppenavn", find_opponent: "Finn motstander", find_members: "Finn medlemmer", search_placeholder: "Søk etter visningsnavn...", selected_members: "Valgte Medlemmer", create_group: "Opprett Gruppe", share_title: "Del GreenShift", share_text: "Hjelp oss å spre ordet! Del lenken med venner og kjente.", copy_btn: "Kopier Lenke", challenge_btn: "Utfordre", add_btn: "Legg til" },
        notif: { title: "Dine Varsler", clear: "Tøm liste", empty: "Ingen nye varsler", mark_all: "Merk alle som lest", copied: "Lenke kopiert!", copy_fail: "Kunne ikke kopiere.", welcome: "Velkommen til GreenShift", level_up: "Bra jobba! Du fikk", challenge_sent: "Duell-utfordring sendt til", group_created: "opprettet med", members: "medlemmer", group_name_missing: "Gi gruppen et navn!", members_missing: "Legg til minst ett medlem!", logged_out: "Du er nå logget ut.", profile_updated: "Profil oppdatert!", profile_deleted: "Profil slettet.", already_joined: "Du er allerede med", guest: "Gjest" },
        messages: {
            user_not_found: "Brukeren finnes ikke.",
            username_taken: "Opptatt brukernavn.",
            welcome_back: "Velkommen tilbake, {name}! Godt å se deg igjen. Klar for å gjøre en forskjell i dag? 🌱",
            welcome_new: "Velkommen til GreenShift-familien, {name}! Din reise mot en grønnere fremtid starter nå. 🚀",
            delete_confirm: "Slette profilen din? Dette kan ikke angres.",
            challenge_accepted_reward: "Utfordring akseptert! Du fikk {xp} XP 🔥",
            habit_completed: "Fantastisk innsats! Du fullførte \"{title}\" og sikret deg {score} XP. Kloden takker deg! 🌍✨",
            quiz_correct: "Helt riktig! Kunnskap er makt. Du fikk +10 XP 🧠💡",
            may_best_win: "Må den beste miljøhelten vinne! ⚔️",
            copy_error: "Feil ved kopiering.",
            geo_not_supported: "Geolokasjon støttes ikke.",
            geo_error: "Kunne ikke hente posisjon.",
            my_position: "Min posisjon",
            fetching_address: "Henter adresse...",
            start: "Start",
            goal: "Mål",
            you: "(Deg)",
            example_group: "F.eks. Familien Hansen",
            username_placeholder: "Ditt unike brukernavn",
            displayname_placeholder: "Vises på topplisten"
        },
        levels: { newcomer: "Nykommer" },
        units: { d: "d", h: "t", m: "m", s: "s" }
    },
    en: {
        nav: { home: "Home", impact: "Your Impact", transport: "Transport", facts: "Facts", about: "About", login: "Login / Join", logout: "Log out", settings: "Settings", account: "Account", join: "Join" },
        hero: { pill: "Your Future // Your Choices", title1: "TAKE CONTROL OF", title2: "YOUR FUTURE.", subtitle: "Simulate the effect of your travel habits and lifestyle choices. See the change happen in real-time.", card1_title: "Level Up Your Life", card1_desc: "Collect points, unlock badges and become a climate hero. Small habits, big impact.", card1_link: "SEE YOUR IMPACT", card2_title: "Mobility Check", card2_desc: "See how much time, money and CO2 you save by choosing smart. Plan your route now.", card2_link: "START PLANNER", btn_facts: "GREEN FACTS", btn_facts_desc: "Learn something new today", btn_quiz: "DAILY QUIZ", btn_quiz_desc: "Test your knowledge & win XP", partners: "In collaboration with" },
        transport: { pill: "Simulator", title: "CHECK YOUR JOURNEY", subtitle: "What does the trip actually cost? For you and the planet.", from: "From (Start)", to: "To (Destination)", map_select: "Select on map", my_pos: "My position", calculating: "Calculating route...", calculate: "Calculate Route & Footprint", choose_mode: "Choose transport for", analysis: "Analysis", co2: "CO2 Emission", cal: "Calories", saved: "Saved", reset: "Reset Route", map_mode: "CLICK MAP TO SELECT", live_map: "Live Map", dist: "Total Distance", bike_save: "Bike saves", emissions_label: "Emissions:" },
        impact: { pill: "Your Footprint", title: "YOUR CHOICES. YOUR SCORE.", subtitle: "No one is perfect, but everyone can 'level up'. See how small adjustments make a big difference.", leaderboard: "Global Leaderboard", all_time: "All Time", monthly: "This Month", this_month: "This Month", total: "Total", no_players: "No players yet. Be the first!", duel: "1v1 Duel", new_group: "New Group", current_level: "Current Level", xp_collected: "XP collected", next_level: "Next Level", badges: "Your Badges", show_less: "Show fewer", show_all: "Show all badges", week_challenge: "Weekly Challenge", ends_in: "Ends in:", resets_in: "Resets in:", challenge_title: "\"The Big Swap Day\"", challenge_desc: "Arrange a swap day with friends or family this week! Bring 3 items you no longer use, and swap for something new (old).", reward: "Reward:", accepted: "Challenge Accepted!", accept: "I accept the challenge!", habit_cats: { all: "All", food: "Food", energy: "Energy", lifestyle: "Lifestyle", consumption: "Consumption" } },
        facts: { pill: "Did you know?", title: "GREEN", title_span: "FACTS", subtitle: "Learn something new about the world today, or test yourself.", btn_knowledge: "Knowledge Bank", btn_quiz: "Daily Quiz", categories: { all: "All", food: "Food & Waste", tech: "Tech & Energy", fashion: "Fashion & Consumption", nature: "Nature & Diversity" }, quiz_q: "Question of the Day", score_today: "Score today:", correct: "Correct!", wrong: "Wrong answer.", next_q: "Next Question", finish_q: "Finish Quiz", quiz_done: "Daily Quiz Completed!", you_got: "You got", new_q_tmrw: "New questions coming tomorrow.", next_quiz_in: "Next quiz in" },
        about: { pill: "Behind the scenes", title: "TEAM", title_span: "GREENSHIFT", subtitle: "We bridge the gap between heavy climate data and your everyday life. GreenShift is a digital experiment for the future.", mission_title: "The Mission", mission_text: "Our mission is to communicate challenging topics within climate and environment in an engaging way for youth aged 17–25. We focus on the local area, consumption, the future, and smart mobility. Through interactive tools and local data, we want to show that sustainability isn't just about sacrifice, but about smarter choices that benefit both you and the planet. We believe that knowledge that is close, relevant, and visual has the power to change habits.", join_title: "Join us?", join_text: "We need coders, dreamers, data nerds, and realists. Do you want to use your skills to solve the climate crisis?", contact_btn: "Contact Us", contact_info: "Contact Info", email: "Email", phone: "Phone", address: "Address" },
        footer: { title: "The future starts now", subtitle: "Together we create a greener everyday.", join_net: "Join the network", share: "Share page", collab: "In collaboration with" },
        auth: { welcome_back: "Welcome back", join_gs: "Join GreenShift", register: "Register", login: "Login", logout: "Log out", username: "Username (Private)", displayname: "Display Name (Public)", create_profile: "Create Profile", account: "Account", save_changes: "Save Changes", delete_profile: "Delete My Profile", join: "Join" },
        modals: { confirm_habit: "Confirm Completion", confirm_challenge: "Confirm Challenge", did_you: "Did you complete", are_you_ready: "Are you ready?", today: "today?", yes_verify: "Yes, verify!", yes_accept: "Yes, start!", is_doing: "Did you do it?", is_preparing: "Preparing...", cancel: "Cancel", group_name: "Group Name", find_opponent: "Find opponent", find_members: "Find members", search_placeholder: "Search display name...", selected_members: "Selected Members", create_group: "Create Group", share_title: "Share GreenShift", share_text: "Help us spread the word! Share the link with friends.", copy_btn: "Copy Link", challenge_btn: "Challenge", add_btn: "Add" },
        notif: { title: "Your Notifications", clear: "Clear list", empty: "No new notifications", mark_all: "Mark all as read", copied: "Link copied!", copy_fail: "Could not copy.", welcome: "Welcome to GreenShift", level_up: "Good job! You got", challenge_sent: "Duel challenge sent to", group_created: "created with", members: "members", group_name_missing: "Please name the group!", members_missing: "Add at least one member!", logged_out: "You are now logged out.", profile_updated: "Profile updated!", profile_deleted: "Profile deleted.", already_joined: "You are already in", guest: "Guest" },
        messages: {
            user_not_found: "User not found.",
            username_taken: "Username taken.",
            welcome_back: "Welcome back, {name}! Good to see you again. Ready to make a difference today? 🌱",
            welcome_new: "Welcome to the GreenShift family, {name}! Your journey towards a greener future starts now. 🚀",
            delete_confirm: "Delete your profile? This cannot be undone.",
            challenge_accepted_reward: "Challenge accepted! You got {xp} XP 🔥",
            habit_completed: "Fantastic effort! You completed \"{title}\" and secured {score} XP. The planet thanks you! 🌍✨",
            quiz_correct: "Correct! Knowledge is power. You got +10 XP 🧠💡",
            may_best_win: "May the best eco-hero win! ⚔️",
            copy_error: "Error copying.",
            geo_not_supported: "Geolocation is not supported.",
            geo_error: "Could not retrieve position.",
            my_position: "My position",
            fetching_address: "Fetching address...",
            start: "Start",
            goal: "Goal",
            you: "(You)",
            example_group: "E.g. The Hansen Family",
            username_placeholder: "Your unique username",
            displayname_placeholder: "Shown on leaderboard"
        },
        levels: { newcomer: "Newcomer" },
        units: { d: "d", h: "h", m: "m", s: "s" }
    }
};

// --- DATA CONSTANTS ---


const HABIT_PERKS = {
    no: [
        { id: 'meat', category: 'food', title: 'Kjøttfri Dag', icon: Leaf, score: 25, color: 'text-green-400', desc: 'Spar 1500L vann ved å droppe kjøtt én dag.' },
        { id: 'vintage', category: 'consumption', title: 'Kjøp Brukt', icon: ShoppingBag, score: 20, color: 'text-purple-400', desc: 'Spar utslipp fra produksjon av nye klær.' },
        { id: 'wash', category: 'energy', title: 'Vask Kaldt', icon: Thermometer, score: 15, color: 'text-blue-400', desc: '30 grader er ofte nok. Sparer strøm.' },
        { id: 'full_load', category: 'energy', title: 'Full Maskin', icon: Layers, score: 20, color: 'text-blue-500', desc: 'Vent til oppvask/vaskemaskin er helt full.' },
        { id: 'repair', category: 'consumption', title: 'Reparer Ting', icon: ShieldCheck, score: 30, color: 'text-yellow-400', desc: 'Fiks det i stedet for å kaste det.' },
        { id: 'foodwaste', category: 'food', title: 'Spis Opp Maten', icon: Utensils, score: 20, color: 'text-orange-400', desc: 'Bruk restene til lunsj i morgen.' },
        { id: 'shower', category: 'energy', title: 'Kjapp Dusj', icon: Droplets, score: 15, color: 'text-cyan-400', desc: '5 minutter sparer mye varmtvann.' },
        { id: 'shower_cold', category: 'energy', title: 'Kald Dusj', icon: CloudRain, score: 30, color: 'text-cyan-600', desc: 'Skru av varmtvannet de siste 30 sek.' },
        { id: 'temp', category: 'energy', title: 'Ta på Genser', icon: Thermometer, score: 25, color: 'text-red-400', desc: 'Senk innetemperaturen med 1 grad.' },
        { id: 'standby', category: 'energy', title: 'Skru Helt Av', icon: Zap, score: 10, color: 'text-yellow-300', desc: 'Unngå standby-strøm på PC og TV.' },
        { id: 'walk', category: 'lifestyle', title: 'Bruk Beina', icon: Footprints, score: 20, color: 'text-emerald-400', desc: 'Gå til butikken i stedet for å kjøre.' },
        { id: 'cup', category: 'consumption', title: 'Egen Kopp', icon: Coffee, score: 10, color: 'text-amber-700', desc: 'Dropp engangskoppen på kafé.' },
        { id: 'bottle', category: 'consumption', title: 'Egen Flaske', icon: Droplets, score: 10, color: 'text-blue-300', desc: 'Bruk gjenbruksflaske til vann.' },
        { id: 'plastic', category: 'consumption', title: 'Dropp Plast', icon: Recycle, score: 30, color: 'text-blue-500', desc: 'Velg produkter uten unødvendig plast.' },
        { id: 'recycle', category: 'lifestyle', title: 'Kildesortering', icon: Trash2, score: 15, color: 'text-green-600', desc: 'Sorter alt avfall korrekt i dag.' },
        { id: 'pant', category: 'lifestyle', title: 'Pant Alt', icon: Coins, score: 20, color: 'text-yellow-500', desc: 'Pant alle flasker og bokser.' },
        { id: 'led', category: 'energy', title: 'Smart Lys', icon: Lightbulb, score: 15, color: 'text-yellow-200', desc: 'Bytt til LED og slukk lys i tomme rom.' },
        { id: 'trash', category: 'lifestyle', title: 'Plukk Søppel', icon: Trash2, score: 40, color: 'text-gray-400', desc: 'Ta med deg søppel du ser på gata.' },
        { id: 'digital', category: 'energy', title: 'Digital Rydding', icon: Mail, score: 15, color: 'text-blue-300', desc: 'Slett gamle e-poster for å spare server-energi.' },
        { id: 'tote', category: 'consumption', title: 'Bruk Handlenett', icon: ShoppingBag, score: 10, color: 'text-amber-600', desc: 'Si nei til plastpose i butikken.' },
        { id: 'borrow', category: 'consumption', title: 'Lån, ikke kjøp', icon: Share2, score: 35, color: 'text-purple-500', desc: 'Lån verktøy eller utstyr av nabo/venn.' },
        { id: 'plant', category: 'lifestyle', title: 'Plant Noe', icon: Sprout, score: 50, color: 'text-green-500', desc: 'Plant en blomst eller et tre.' },
        { id: 'local', category: 'food', title: 'Kjøp Lokalt', icon: Store, score: 25, color: 'text-indigo-400', desc: 'Støtt lokale produsenter og spar transport.' },
        { id: 'no_palm', category: 'food', title: 'Unngå Palmeolje', icon: Trees, score: 20, color: 'text-orange-600', desc: 'Sjekk innholdsfortegnelsen på maten.' },
    ],
    en: [
        { id: 'meat', category: 'food', title: 'Meat Free Day', icon: Leaf, score: 25, color: 'text-green-400', desc: 'Save 1500L of water by skipping meat one day.' },
        { id: 'vintage', category: 'consumption', title: 'Buy Vintage', icon: ShoppingBag, score: 20, color: 'text-purple-400', desc: 'Save emissions from new clothing production.' },
        { id: 'wash', category: 'energy', title: 'Wash Cold', icon: Thermometer, score: 15, color: 'text-blue-400', desc: '30 degrees is often enough. Saves electricity.' },
        { id: 'full_load', category: 'energy', title: 'Full Load', icon: Layers, score: 20, color: 'text-blue-500', desc: 'Wait until the dishwasher/washing machine is full.' },
        { id: 'repair', category: 'consumption', title: 'Repair Things', icon: ShieldCheck, score: 30, color: 'text-yellow-400', desc: 'Fix it instead of throwing it away.' },
        { id: 'foodwaste', category: 'food', title: 'Eat Leftovers', icon: Utensils, score: 20, color: 'text-orange-400', desc: 'Use leftovers for lunch tomorrow.' },
        { id: 'shower', category: 'energy', title: 'Quick Shower', icon: Droplets, score: 15, color: 'text-cyan-400', desc: '5 minutes saves a lot of hot water.' },
        { id: 'shower_cold', category: 'energy', title: 'Cold Shower', icon: CloudRain, score: 30, color: 'text-cyan-600', desc: 'Turn off hot water for the last 30 seconds.' },
        { id: 'temp', category: 'energy', title: 'Wear a Sweater', icon: Thermometer, score: 25, color: 'text-red-400', desc: 'Lower indoor temperature by 1 degree.' },
        { id: 'standby', category: 'energy', title: 'Turn Off Standby', icon: Zap, score: 10, color: 'text-yellow-300', desc: 'Avoid standby power on PC and TV.' },
        { id: 'walk', category: 'lifestyle', title: 'Walk', icon: Footprints, score: 20, color: 'text-emerald-400', desc: 'Walk to the store instead of driving.' },
        { id: 'cup', category: 'consumption', title: 'Own Cup', icon: Coffee, score: 10, color: 'text-amber-700', desc: 'Skip the disposable cup at the cafe.' },
        { id: 'bottle', category: 'consumption', title: 'Own Bottle', icon: Droplets, score: 10, color: 'text-blue-300', desc: 'Use a reusable bottle for water.' },
        { id: 'plastic', category: 'consumption', title: 'Skip Plastic', icon: Recycle, score: 30, color: 'text-blue-500', desc: 'Choose products without unnecessary plastic.' },
        { id: 'recycle', category: 'lifestyle', title: 'Recycle', icon: Trash2, score: 15, color: 'text-green-600', desc: 'Sort all waste correctly today.' },
        { id: 'pant', category: 'lifestyle', title: 'Recycle Bottles', icon: Coins, score: 20, color: 'text-yellow-500', desc: 'Return all bottles and cans.' },
        { id: 'led', category: 'energy', title: 'Smart Lights', icon: Lightbulb, score: 15, color: 'text-yellow-200', desc: 'Switch to LED and turn off lights in empty rooms.' },
        { id: 'trash', category: 'lifestyle', title: 'Pick Trash', icon: Trash2, score: 40, color: 'text-gray-400', desc: 'Pick up trash you see on the street.' },
        { id: 'digital', category: 'energy', title: 'Digital Cleanup', icon: Mail, score: 15, color: 'text-blue-300', desc: 'Delete old emails to save server energy.' },
        { id: 'tote', category: 'consumption', title: 'Use Tote Bag', icon: ShoppingBag, score: 10, color: 'text-amber-600', desc: 'Say no to plastic bags at the store.' },
        { id: 'borrow', category: 'consumption', title: 'Borrow, Don\'t Buy', icon: Share2, score: 35, color: 'text-purple-500', desc: 'Borrow tools or equipment from a neighbor.' },
        { id: 'plant', category: 'lifestyle', title: 'Plant Something', icon: Sprout, score: 50, color: 'text-green-500', desc: 'Plant a flower or a tree.' },
        { id: 'local', category: 'food', title: 'Buy Local', icon: Store, score: 25, color: 'text-indigo-400', desc: 'Support local producers and save transport.' },
        { id: 'no_palm', category: 'food', title: 'No Palm Oil', icon: Trees, score: 20, color: 'text-orange-600', desc: 'Check ingredients for palm oil.' },
    ]
};

const BADGES = {
    no: [
        { id: 1, title: 'Nysgjerrig Spire', minScore: 0, icon: Leaf },
        { id: 2, title: 'Miljø-Agent', minScore: 50, icon: Search },
        { id: 3, title: 'Bevisst Forbruker', minScore: 150, icon: ShoppingBag },
        { id: 4, title: 'Grønn Pioner', minScore: 500, icon: Star },
        { id: 5, title: 'Jordens Vokter', minScore: 1000, icon: ShieldCheck },
        { id: 6, title: 'Energi-Mester', minScore: 2500, icon: Zap },
        { id: 7, title: 'Skogens Venn', minScore: 5000, icon: Trees },
        { id: 8, title: 'Klima-Legende', minScore: 10000, icon: Award },
        { id: 9, title: 'Gaia-Beskytter', minScore: 25000, icon: Heart },
        { id: 10, title: 'Solstråle', minScore: 50000, icon: Sun },
        { id: 11, title: 'Bærekraft-Ikon', minScore: 100000, icon: Trophy },
        { id: 12, title: 'Planet-Redder', minScore: 250000, icon: Globe },
        { id: 13, title: 'Fremtids-Arkitekt', minScore: 500000, icon: Cpu },
        { id: 14, title: 'Universets Håp', minScore: 1000000, icon: BrainCircuit },
    ],
    en: [
        { id: 1, title: 'Curious Sprout', minScore: 0, icon: Leaf },
        { id: 2, title: 'Eco-Agent', minScore: 50, icon: Search },
        { id: 3, title: 'Conscious Consumer', minScore: 150, icon: ShoppingBag },
        { id: 4, title: 'Green Pioneer', minScore: 500, icon: Star },
        { id: 5, title: 'Earth Guardian', minScore: 1000, icon: ShieldCheck },
        { id: 6, title: 'Energy Master', minScore: 2500, icon: Zap },
        { id: 7, title: 'Forest Friend', minScore: 5000, icon: Trees },
        { id: 8, title: 'Climate Legend', minScore: 10000, icon: Award },
        { id: 9, title: 'Gaia Protector', minScore: 25000, icon: Heart },
        { id: 10, title: 'Sunray', minScore: 50000, icon: Sun },
        { id: 11, title: 'Sustainability Icon', minScore: 100000, icon: Trophy },
        { id: 12, title: 'Planet Saver', minScore: 250000, icon: Globe },
        { id: 13, title: 'Future Architect', minScore: 500000, icon: Cpu },
        { id: 14, title: 'Universal Hope', minScore: 1000000, icon: BrainCircuit },
    ]
};

const FACTS_DATA = {
    no: [
        {
            category: "Mat & Avfall",
            items: [
                {
                    title: "Kjøtt vs. Grønt",
                    icon: Utensils,
                    color: "text-red-500",
                    bg: "bg-red-500/20",
                    text: "Å produsere 1 kg storfekjøtt krever ca. 15.000 liter vann. Til sammenligning krever 1 kg poteter bare 287 liter.",
                    source: "Kilde: Water Footprint Network"
                },
                {
                    title: "Matkast",
                    icon: Trash2,
                    color: "text-orange-500",
                    bg: "bg-orange-500/20",
                    text: "Hver nordmann kaster i snitt 42,6 kg spiselig mat i året. Det tilsvarer å kaste hver femte handlepose rett i søpla.",
                    source: "Kilde: Matvett (2021)"
                },
                {
                    title: "Globalt matsvinn",
                    icon: Globe,
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/20",
                    text: "En tredjedel av all mat som produseres i verden blir aldri spist. Hvis matsvinn var et land, ville det hatt verdens tredje største utslipp.",
                    source: "Kilde: FAO"
                },
                {
                    title: "Kaffe-koppen",
                    icon: Coffee,
                    color: "text-amber-700",
                    bg: "bg-amber-700/20",
                    text: "Vi bruker 2.5 milliarder engangskopper hvert år. Hvis du bruker din egen kopp sparer du naturen for mye plast og papir.",
                    source: "Kilde: Clean Water Action"
                },
                {
                    title: "Kortreist Mat",
                    icon: Leaf,
                    color: "text-green-500",
                    bg: "bg-green-500/20",
                    text: "Mat som er fraktet med fly har 50 ganger høyere CO2-utslipp enn mat fraktet med båt. Velg sesongvarer!",
                    source: "Kilde: Framtiden i våre hender"
                },
                {
                    title: "Bananens reise",
                    icon: Anchor,
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/20",
                    text: "Bananer reiser ofte tusenvis av kilometer. Selv om båttransport er effektivt, er det lurt å velge norsk frukt når det er i sesong.",
                    source: "Kilde: Frukt.no"
                },
                {
                    title: "Best før?",
                    icon: Info,
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/20",
                    text: "'Best før' betyr ikke 'dårlig etter'. Se, lukt og smak før du kaster maten. Egg kan ofte spises måneder etter datoen.",
                    source: "Kilde: Mattilsynet"
                }
            ]
        },
        {
            category: "Teknologi & Energi",
            items: [
                {
                    title: "Smarttelefonen din",
                    icon: Smartphone,
                    color: "text-blue-500",
                    bg: "bg-blue-500/20",
                    text: "80-90% av klimaavtrykket til en mobiltelefon skjer under produksjonen. Å beholde mobilen i 4 år i stedet for 2 halverer utslippet.",
                    source: "Kilde: Naturvernforbundet"
                },
                {
                    title: "E-avfall",
                    icon: Trash2,
                    color: "text-gray-500",
                    bg: "bg-gray-500/20",
                    text: "Elektronisk avfall er verdens raskest voksende avfallsstrøm. Kun 17,4% ble forsvarlig resirkulert i 2019 globalt.",
                    source: "Kilde: Global E-waste Monitor"
                },
                {
                    title: "E-post & Data",
                    icon: Zap,
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/20",
                    text: "Datasentre bruker nå ca. 1-2% av all verdens strøm. Å strømme video i 4K krever enormt mye mer energi enn vanlig HD.",
                    source: "Kilde: IEA (Det internasjonale energibyrået)"
                },
                {
                    title: "Streaming",
                    icon: Play,
                    color: "text-red-400",
                    bg: "bg-red-400/20",
                    text: "Å strømme video står for 60% av verdens internettrafikk og genererer 300 millioner tonn CO2 årlig.",
                    source: "Kilde: The Shift Project"
                },
                {
                    title: "Innetemp",
                    icon: Thermometer,
                    color: "text-red-500",
                    bg: "bg-red-500/20",
                    text: "Ved å senke innetemperaturen med bare 1 grad, sparer du ca. 5% av strømforbruket til oppvarming.",
                    source: "Kilde: Enova"
                },
                {
                    title: "Batterier",
                    icon: Battery,
                    color: "text-green-400",
                    bg: "bg-green-400/20",
                    text: "Gjenvinning av batterier sparer opptil 75% av energien sammenlignet med å utvinne nye metaller.",
                    source: "Kilde: Batteriretur"
                },
                {
                    title: "Gaming-PC",
                    icon: Cpu,
                    color: "text-purple-500",
                    bg: "bg-purple-500/20",
                    text: "En kraftig gaming-PC kan bruke like mye strøm som et kjøleskap. Husk å skru den helt av når du ikke spiller.",
                    source: "Kilde: Enova"
                }
            ]
        },
        {
            category: "Mote & Forbruk",
            items: [
                {
                    title: "Klesindustrien",
                    icon: Shirt,
                    color: "text-purple-500",
                    bg: "bg-purple-500/20",
                    text: "Moteindustrien står for 10% av verdens klimagassutslipp. Det er mer enn all internasjonal flytrafikk og sjøfart til sammen.",
                    source: "Kilde: FN (UN Environment Programme)"
                },
                {
                    title: "Vann til Bomull",
                    icon: Droplets,
                    color: "text-cyan-500",
                    bg: "bg-cyan-500/20",
                    text: "Det kreves 2700 liter vann for å produsere én eneste bomulls t-skjorte. Det er nok drikkevann for en person i 900 dager.",
                    source: "Kilde: World Wildlife Fund (WWF)"
                },
                {
                    title: "Retur av klær",
                    icon: ArrowRight,
                    color: "text-red-500",
                    bg: "bg-red-500/20",
                    text: "Mange klær som returneres til nettbutikker blir aldri solgt på nytt, men kastet eller brent, fordi det er billigere.",
                    source: "Kilde: BBC Earth"
                },
                {
                    title: "Reparasjon",
                    icon: Recycle,
                    color: "text-green-500",
                    bg: "bg-green-500/20",
                    text: "Å reparere en smarttelefon i stedet for å kjøpe ny sparer like mye energi som å lade den i 10 år.",
                    source: "Kilde: Restarters Norway"
                },
                {
                    title: "Syntetiske Klær",
                    icon: Factory,
                    color: "text-gray-500",
                    bg: "bg-gray-500/20",
                    text: "Når du vasker syntetiske klær (polyester, nylon), løsner tusenvis av mikroplastfibre som havner i havet.",
                    source: "Kilde: Ocean Clean Wash"
                },
                {
                    title: "Bruktkupp",
                    icon: ShoppingBag,
                    color: "text-orange-500",
                    bg: "bg-orange-500/20",
                    text: "Hvis hver nordmann bytter ut ett nykjøp med et bruktkjøp i året, kutter vi utslipp tilsvarende 30 000 biler.",
                    source: "Kilde: Finn.no / Schibsted"
                }
            ]
        },
        {
            category: "Natur & Mangfold",
            items: [
                {
                    title: "Myr er Gull",
                    icon: Layers,
                    color: "text-amber-600",
                    bg: "bg-amber-600/20",
                    text: "Myr lagrer mer karbon per kvadratmeter enn noen annen naturtype. Å bygge ned myr frigjør enorme mengder CO2.",
                    source: "Kilde: NINA (Norsk institutt for naturforskning)"
                },
                {
                    title: "Havforsuring",
                    icon: CloudRain,
                    color: "text-cyan-600",
                    bg: "bg-cyan-600/20",
                    text: "Havet har absorbert ca. 30% av menneskeskapt CO2, noe som gjør havet surere og truer korallrev og skalldyr.",
                    source: "Kilde: NOAA"
                },
                {
                    title: "Biene Dør",
                    icon: Globe,
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/20",
                    text: "En tredjedel av maten vi spiser er avhengig av pollinering fra insekter. Villbier er truet av utbygging og sprøytemidler.",
                    source: "Kilde: FNs naturpanel"
                },
                {
                    title: "Plast i havet",
                    icon: Trash2,
                    color: "text-blue-500",
                    bg: "bg-blue-500/20",
                    text: "Innen 2050 kan det være mer plast enn fisk i havet (i vekt) hvis vi fortsetter som i dag.",
                    source: "Kilde: Ellen MacArthur Foundation"
                },
                {
                    title: "Skogens Ro",
                    icon: Trees,
                    color: "text-emerald-600",
                    bg: "bg-emerald-600/20",
                    text: "Norsk skog binder opp ca. halvparten av Norges årlige klimagassutslipp. Gammel skog er spesielt viktig for artsmangfold.",
                    source: "Kilde: Landbruksdirektoratet"
                }
            ]
        }
    ],
    en: [
        {
            category: "Food & Waste",
            items: [
                {
                    title: "Meat vs. Greens",
                    icon: Utensils,
                    color: "text-red-500",
                    bg: "bg-red-500/20",
                    text: "Producing 1 kg of beef requires approx. 15,000 liters of water. In comparison, 1 kg of potatoes requires only 287 liters.",
                    source: "Source: Water Footprint Network"
                },
                {
                    title: "Food Waste",
                    icon: Trash2,
                    color: "text-orange-500",
                    bg: "bg-orange-500/20",
                    text: "Each Norwegian throws away an average of 42.6 kg of edible food per year. That corresponds to throwing every fifth shopping bag straight into the trash.",
                    source: "Source: Matvett (2021)"
                },
                {
                    title: "Global Food Waste",
                    icon: Globe,
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/20",
                    text: "One third of all food produced in the world is never eaten. If food waste were a country, it would have the world's third largest emissions.",
                    source: "Source: FAO"
                },
                {
                    title: "The Coffee Cup",
                    icon: Coffee,
                    color: "text-amber-700",
                    bg: "bg-amber-700/20",
                    text: "We use 2.5 billion disposable cups every year. If you use your own cup, you save nature a lot of plastic and paper.",
                    source: "Source: Clean Water Action"
                },
                {
                    title: "Local Food",
                    icon: Leaf,
                    color: "text-green-500",
                    bg: "bg-green-500/20",
                    text: "Food transported by air has 50 times higher CO2 emissions than food transported by boat. Choose seasonal products!",
                    source: "Source: Framtiden i våre hender"
                },
                {
                    title: "The Banana's Journey",
                    icon: Anchor,
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/20",
                    text: "Bananas often travel thousands of kilometers. Although boat transport is efficient, it is wise to choose local fruit when it is in season.",
                    source: "Source: Frukt.no"
                },
                {
                    title: "Best Before?",
                    icon: Info,
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/20",
                    text: "'Best before' does not mean 'bad after'. Look, smell, and taste before throwing food away. Eggs can often be eaten months after the date.",
                    source: "Source: Mattilsynet"
                }
            ]
        },
        {
            category: "Tech & Energy",
            items: [
                {
                    title: "Your Smartphone",
                    icon: Smartphone,
                    color: "text-blue-500",
                    bg: "bg-blue-500/20",
                    text: "80-90% of a mobile phone's climate footprint occurs during production. Keeping the mobile for 4 years instead of 2 halves the emissions.",
                    source: "Source: Naturvernforbundet"
                },
                {
                    title: "E-waste",
                    icon: Trash2,
                    color: "text-gray-500",
                    bg: "bg-gray-500/20",
                    text: "Electronic waste is the world's fastest growing waste stream. Only 17.4% was properly recycled globally in 2019.",
                    source: "Source: Global E-waste Monitor"
                },
                {
                    title: "Email & Data",
                    icon: Zap,
                    color: "text-yellow-500",
                    bg: "bg-yellow-500/20",
                    text: "Data centers now use approx. 1-2% of all the world's electricity. Streaming video in 4K requires enormously more energy than regular HD.",
                    source: "Source: IEA"
                },
                {
                    title: "Streaming",
                    icon: Play,
                    color: "text-red-400",
                    bg: "bg-red-400/20",
                    text: "Streaming video accounts for 60% of the world's internet traffic and generates 300 million tons of CO2 annually.",
                    source: "Source: The Shift Project"
                },
                {
                    title: "Indoor Temp",
                    icon: Thermometer,
                    color: "text-red-500",
                    bg: "bg-red-500/20",
                    text: "By lowering the indoor temperature by just 1 degree, you save approx. 5% of electricity consumption for heating.",
                    source: "Source: Enova"
                },
                {
                    title: "Batteries",
                    icon: Battery,
                    color: "text-green-400",
                    bg: "bg-green-400/20",
                    text: "Recycling batteries saves up to 75% of energy compared to extracting new metals.",
                    source: "Source: Batteriretur"
                },
                {
                    title: "Gaming PC",
                    icon: Cpu,
                    color: "text-purple-500",
                    bg: "bg-purple-500/20",
                    text: "A powerful gaming PC can use as much electricity as a refrigerator. Remember to turn it completely off when not playing.",
                    source: "Source: Enova"
                }
            ]
        },
        {
            category: "Fashion & Consumption",
            items: [
                {
                    title: "Fashion Industry",
                    icon: Shirt,
                    color: "text-purple-500",
                    bg: "bg-purple-500/20",
                    text: "The fashion industry accounts for 10% of global greenhouse gas emissions. That is more than all international aviation and shipping combined.",
                    source: "Source: UN Environment Programme"
                },
                {
                    title: "Water for Cotton",
                    icon: Droplets,
                    color: "text-cyan-500",
                    bg: "bg-cyan-500/20",
                    text: "It takes 2,700 liters of water to produce a single cotton t-shirt. That is enough drinking water for one person for 900 days.",
                    source: "Source: World Wildlife Fund (WWF)"
                },
                {
                    title: "Clothing Returns",
                    icon: ArrowRight,
                    color: "text-red-500",
                    bg: "bg-red-500/20",
                    text: "Many clothes returned to online stores are never resold, but thrown away or burned, because it is cheaper.",
                    source: "Source: BBC Earth"
                },
                {
                    title: "Repair",
                    icon: Recycle,
                    color: "text-green-500",
                    bg: "bg-green-500/20",
                    text: "Repairing a smartphone instead of buying a new one saves as much energy as charging it for 10 years.",
                    source: "Source: Restarters Norway"
                },
                {
                    title: "Synthetic Clothes",
                    icon: Factory,
                    color: "text-gray-500",
                    bg: "bg-gray-500/20",
                    text: "When you wash synthetic clothes (polyester, nylon), thousands of microplastic fibers come loose and end up in the ocean.",
                    source: "Source: Ocean Clean Wash"
                },
                {
                    title: "Second Hand",
                    icon: ShoppingBag,
                    color: "text-orange-500",
                    bg: "bg-orange-500/20",
                    text: "If every Norwegian replaces one new purchase with a used purchase a year, we cut emissions equivalent to 30,000 cars.",
                    source: "Source: Finn.no / Schibsted"
                }
            ]
        },
        {
            category: "Nature & Diversity",
            items: [
                {
                    title: "Peat is Gold",
                    icon: Layers,
                    color: "text-amber-600",
                    bg: "bg-amber-600/20",
                    text: "Peatlands store more carbon per square meter than any other nature type. Developing peatlands releases enormous amounts of CO2.",
                    source: "Source: NINA"
                },
                {
                    title: "Ocean Acidification",
                    icon: CloudRain,
                    color: "text-cyan-600",
                    bg: "bg-cyan-600/20",
                    text: "The ocean has absorbed approx. 30% of man-made CO2, making the ocean more acidic and threatening coral reefs and shellfish.",
                    source: "Source: NOAA"
                },
                {
                    title: "Bees are Dying",
                    icon: Globe,
                    color: "text-yellow-400",
                    bg: "bg-yellow-400/20",
                    text: "One third of the food we eat depends on pollination from insects. Wild bees are threatened by development and pesticides.",
                    source: "Source: UN IPBES"
                },
                {
                    title: "Plastic in Ocean",
                    icon: Trash2,
                    color: "text-blue-500",
                    bg: "bg-blue-500/20",
                    text: "By 2050, there could be more plastic than fish in the ocean (by weight) if we continue as we do today.",
                    source: "Source: Ellen MacArthur Foundation"
                },
                {
                    title: "Forest Peace",
                    icon: Trees,
                    color: "text-emerald-600",
                    bg: "bg-emerald-600/20",
                    text: "Norwegian forests bind approx. half of Norway's annual greenhouse gas emissions. Old forest is especially important for biodiversity.",
                    source: "Source: Landbruksdirektoratet"
                }
            ]
        }
    ]
};

const TRANSPORT_MODES = {
    car: {
        title: { no: 'Diesel/Bensinbil', en: 'Diesel/Petrol Car' },
        icon: Car,
        color: 'bg-red-500',
        textColor: 'text-red-500',
        co2PerKm: 0.17, spaceFactor: 12, costPerKm: 5.0,
        why: {
            no: "Referansepunktet. En bil tar mye plass i byen (kø/parkering) og slipper ut CO2 direkte fra eksosrøret. I tillegg sitter du stille.",
            en: "The baseline. A car takes up a lot of space in the city (traffic/parking) and emits CO2 directly from the tailpipe. Plus, you're sitting still."
        },
        deep: {
            no: "En gjennomsnittlig bilist i Norge slipper ut ca. 2 tonn CO2 årlig. Mye av byens areal går til parkering i stedet for parker eller boliger. Asfalt absorberer varme og forverrer klimaet lokalt.",
            en: "An average driver in Norway emits approx. 2 tons of CO2 annually. Much of the city's area goes to parking instead of parks or housing. Asphalt absorbs heat and worsens the local climate."
        }
    },
    electric_car: { // NEW MODE
        title: { no: 'El-bil', en: 'Electric Car' },
        icon: Zap,
        color: 'bg-blue-500',
        textColor: 'text-blue-500',
        co2PerKm: 0.0, spaceFactor: 12, costPerKm: 2.0,
        why: {
            no: "Ingen direkte utslipp, men tar like mye plass i trafikken som en vanlig bil. Billigere i drift.",
            en: "No direct emissions, but takes up as much space in traffic as a regular car. Cheaper to run."
        },
        deep: {
            no: "El-bil løser utslippsproblemet lokalt, men løser ikke kø-problemet eller areal-problemet i byene. Produksjon av batterier krever også mye ressurser.",
            en: "EVs solve local emissions, but not traffic congestion or space issues. Battery production also requires significant resources."
        }
    },
    bus: {
        title: { no: 'Buss / El-Buss', en: 'Bus / E-Bus' },
        icon: Bus,
        color: 'bg-yellow-500',
        textColor: 'text-yellow-500',
        co2PerKm: 0.05, spaceFactor: 1, costPerKm: 2.0,
        why: {
            no: "Effektiv deling! Bussen frakter 50 personer på plassen til 3 biler. Mindre kø betyr at trafikken flyter bedre, som sparer utslipp for alle.",
            en: "Efficient sharing! The bus carries 50 people in the space of 3 cars. Less traffic means better flow, saving emissions for everyone."
        },
        deep: {
            no: "Selv om bussen bruker strøm og dekk (mikroplast), er gevinsten enorm fordi utslippet deles på mange passasjerer. Én full buss fjerner en halv kilometer med bilkø.",
            en: "Even though the bus uses electricity and tires (microplastics), the gain is enormous because emissions are shared among many passengers. One full bus removes half a kilometer of car traffic."
        }
    },
    bike: {
        title: { no: 'El-Sykkel / Sykkel', en: 'E-Bike / Bike' },
        icon: Bike,
        color: 'bg-emerald-500',
        textColor: 'text-emerald-500',
        co2PerKm: 0, spaceFactor: 2, costPerKm: 0,
        why: {
            no: "Null utslipp under bruk. Du blir motoren! Du frigjør plass på veien for de som MÅ kjøre, og du belaster ikke strømnettet nevneverdig.",
            en: "Zero emissions during use. You are the engine! You free up space on the road for those who MUST drive, and you don't burden the power grid significantly."
        },
        deep: {
            no: "Sykling har en dobbel effekt: Du reduserer CO2 direkte, men du reduserer også behovet for tung infrastruktur (store veier). Helsegevinsten reduserer presset på sykehusene, som også er en stor 'klimasynder'.",
            en: "Cycling has a double effect: You reduce CO2 directly, but you also reduce the need for heavy infrastructure. The health benefit reduces pressure on hospitals, which are also large 'climate offenders'."
        }
    },
    walk: {
        title: { no: 'Gå / Beina', en: 'Walk / On Foot' },
        icon: Footprints,
        color: 'bg-green-500',
        textColor: 'text-green-500',
        co2PerKm: 0, spaceFactor: 0.5, costPerKm: 0,
        why: {
            no: "Den ultimate klimaløsningen. Krever ingen ressurser til produksjon av kjøretøy, ingen drivstoff, og minimalt med areal.",
            en: "The ultimate climate solution. Requires no resources for vehicle production, no fuel, and minimal space."
        },
        deep: {
            no: "Hvis alle korte turer (under 3 km) ble tatt til fots, ville luftkvaliteten i norske byer blitt dramatisk bedre umiddelbart. Det er den mest arealeffektive transportformen som finnes.",
            en: "If all short trips (under 3 km) were taken on foot, air quality in cities would improve dramatically immediately. It is the most space-efficient form of transport available."
        }
    }
};

const LOCAL_LOCATIONS = [
    { name: "Tangen VGS, Kristiansand", lat: 58.1485, lon: 8.0055 },
    { name: "Kvadraturen VGS, Kristiansand", lat: 58.1458, lon: 7.9940 },
    { name: "UiA, Kristiansand", lat: 58.1633, lon: 8.0028 },
    { name: "Sørlandssenteret, Kristiansand", lat: 58.1770, lon: 8.1250 },
    { name: "Dyreparken, Kristiansand", lat: 58.1830, lon: 8.1430 },
    { name: "Bystranda, Kristiansand", lat: 58.1465, lon: 8.0080 },
    { name: "Kilden Teater, Kristiansand", lat: 58.1395, lon: 7.9930 },
    { name: "Fiskebrygga, Kristiansand", lat: 58.1420, lon: 7.9910 },
    { name: "Rutebilstasjonen, Kristiansand", lat: 58.1450, lon: 7.9890 },
    { name: "Aquarama, Kristiansand", lat: 58.1460, lon: 8.0070 },
    { name: "Kjevik Lufthavn", lat: 58.2000, lon: 8.0800 },
    { name: "Vågsbygd Senter", lat: 58.1180, lon: 7.9600 },
    { name: "Lund, Kristiansand", lat: 58.1520, lon: 8.0100 },
    { name: "Grim, Kristiansand", lat: 58.1500, lon: 7.9800 },
    { name: "Søgne Sentrum", lat: 58.0930, lon: 7.8300 },
    { name: "Lillesand Sentrum", lat: 58.2500, lon: 8.3700 },
    { name: "Vennesla Sentrum", lat: 58.2680, lon: 7.9730 }
];

const QUIZ_QUESTIONS = {
    no: [
        {
            question: "Hvor mange liter vann kreves ca. for å produsere 1 kg storfekjøtt?",
            options: ["15 000 liter", "287 liter", "1 500 liter", "50 000 liter"],
            correct: 0,
            explanation: "Det kreves enorme mengder vann til fôrproduksjon og dyrehold. Poteter krever til sammenligning bare 287 liter. (Kilde: Water Footprint Network)"
        },
        {
            question: "Når skjer den største delen av klimaavtrykket til en smarttelefon?",
            options: ["Under lading", "Under produksjonen", "Ved resirkulering", "Under transport"],
            correct: 1,
            explanation: "80-90% av utslippene skjer før du i det hele tatt har kjøpt telefonen, under utvinning av metaller og produksjon. (Kilde: Naturvernforbundet)"
        },
        {
            question: "Hvor stor andel av maten vår er avhengig av insektspollinering?",
            options: ["Nesten ingenting", "10%", "En tredjedel", "Alt sammen"],
            correct: 2,
            explanation: "En tredjedel av matfatet vårt, spesielt frukt og grønt, trenger hjelp fra bier og insekter. (Kilde: FNs naturpanel)"
        },
        {
            question: "Hvor mye vann kreves for å lage én bomulls t-skjorte?",
            options: ["100 liter", "500 liter", "2 700 liter", "10 000 liter"],
            correct: 2,
            explanation: "Bomull er en veldig tørst plante. 2700 liter tilsvarer drikkevann for en person i 900 dager. (Kilde: WWF)"
        },
        {
            question: "Hva sparer mest energi i forhold til utvinning av nye metaller?",
            options: ["Kaste batterier i restavfall", "Gjenvinning av batterier", "Brenne batterier", "Lade batterier ofte"],
            correct: 1,
            explanation: "Gjenvinning sparer opptil 75% energi sammenlignet med gruvedrift for nye metaller. (Kilde: Batteriretur)"
        },
        {
            question: "Hvor mye mat kaster hver nordmann i snitt i året?",
            options: ["10 kg", "25,5 kg", "42,6 kg", "80 kg"],
            correct: 2,
            explanation: "Det tilsvarer at hver femte handlepose går rett i søpla. En enorm sløsing av ressurser. (Kilde: Matvett)"
        },
        {
            question: "Hvorfor er myr viktig for klimaet?",
            options: ["Den ser pen ut", "Den lagrer karbon", "Den produserer olje", "Den reflekterer sollys"],
            correct: 1,
            explanation: "Myr lagrer mer karbon per kvadratmeter enn noen annen naturtype. Nedbygging frigjør dette som CO2. (Kilde: NINA)"
        },
        {
            question: "Hvor mye av verdens mat går tapt eller kastes?",
            options: ["1/10", "1/5", "1/3", "1/2"],
            correct: 2,
            explanation: "Omtrent en tredjedel av all mat som produseres i verden for humant konsum går tapt eller kastes. (Kilde: FAO)"
        },
        {
            question: "Hvor mye energi sparer man ved å resirkulere aluminium sammenlignet med å produsere nytt?",
            options: ["20%", "50%", "75%", "95%"],
            correct: 3,
            explanation: "Gjenvinning av aluminium krever bare 5% av energien som trengs for å produsere nytt aluminium fra bauksitt. (Kilde: The Aluminum Association)"
        },
        {
            question: "Hva er den anbefalte øvre grensen for global oppvarming ifølge Parisavtalen for å unngå de verste konsekvensene?",
            options: ["1.0 grader", "1.5 grader", "2.0 grader", "3.0 grader"],
            correct: 1,
            explanation: "Målet er å begrense økningen til 1.5 grader over førindustrielt nivå for å redusere risikoen for alvorlige klimaendringer. (Kilde: IPCC)"
        },
        {
            question: "Hvor mye plast havner omtrent i havet hvert år?",
            options: ["1 million tonn", "4 millioner tonn", "8 millioner tonn", "20 millioner tonn"],
            correct: 2,
            explanation: "Det anslås at minst 8 millioner tonn plast havner i havet årlig, noe som truer dyreliv og økosystemer. (Kilde: IUCN)"
        },
        {
            question: "Hvor stor andel av energien i bensin utnyttes til fremdrift i en bensinbil?",
            options: ["Ca. 20%", "Ca. 50%", "Ca. 70%", "Ca. 90%"],
            correct: 0,
            explanation: "Bensinmotorer er ineffektive; kun ca. 20% av energien går til hjulene. Elbiler utnytter ca. 60-70% fra strømnettet til hjulene. (Source: fueleconomy.gov)"
        }
    ],
    en: [
        {
            question: "Approximately how many liters of water are required to produce 1 kg of beef?",
            options: ["15,000 liters", "287 liters", "1,500 liters", "50,000 liters"],
            correct: 0,
            explanation: "Enormous amounts of water are required for fodder production and animal husbandry. Potatoes, in comparison, require only 287 liters. (Source: Water Footprint Network)"
        },
        {
            question: "When does the largest part of a smartphone's climate footprint occur?",
            options: ["During charging", "During production", "During recycling", "During transport"],
            correct: 1,
            explanation: "80-90% of emissions occur before you have even bought the phone, during metal extraction and production. (Source: Naturvernforbundet)"
        },
        {
            question: "How large a proportion of our food depends on insect pollination?",
            options: ["Almost nothing", "10%", "One third", "Everything"],
            correct: 2,
            explanation: "One third of our food, especially fruits and vegetables, needs help from bees and insects. (Source: IPBES)"
        },
        {
            question: "How much water is required to make one cotton t-shirt?",
            options: ["100 liters", "500 liters", "2,700 liters", "10,000 liters"],
            correct: 2,
            explanation: "Cotton is a very thirsty plant. 2,700 liters corresponds to drinking water for one person for 900 days. (Source: WWF)"
        },
        {
            question: "What saves the most energy compared to extracting new metals?",
            options: ["Throwing batteries in general waste", "Recycling batteries", "Burning batteries", "Charging batteries often"],
            correct: 1,
            explanation: "Recycling saves up to 75% energy compared to mining for new metals. (Source: Batteriretur)"
        },
        {
            question: "How much food does every Norwegian throw away on average per year?",
            options: ["10 kg", "25.5 kg", "42.6 kg", "80 kg"],
            correct: 2,
            explanation: "This corresponds to every fifth shopping bag going straight into the bin. An enormous waste of resources. (Source: Matvett)"
        },
        {
            question: "Why are peatlands important for the climate?",
            options: ["They look pretty", "They store carbon", "They produce oil", "They reflect sunlight"],
            correct: 1,
            explanation: "Peat stores more carbon per square meter than any other nature type. Development releases this as CO2. (Source: NINA)"
        },
        {
            question: "How much of the world's food is lost or wasted?",
            options: ["1/10", "1/5", "1/3", "1/2"],
            correct: 2,
            explanation: "About one third of all food produced in the world for human consumption is lost or wasted. (Source: FAO)"
        },
        {
            question: "How much energy is saved by recycling aluminum compared to producing new?",
            options: ["20%", "50%", "75%", "95%"],
            correct: 3,
            explanation: "Recycling aluminum requires only 5% of the energy needed to produce new aluminum from bauxite. (Source: The Aluminum Association)"
        },
        {
            question: "What is the recommended upper limit for global warming according to the Paris Agreement to avoid the worst consequences?",
            options: ["1.0 degrees", "1.5 degrees", "2.0 degrees", "3.0 degrees"],
            correct: 1,
            explanation: "The goal is to limit the increase to 1.5 degrees above pre-industrial levels to reduce the risk of severe climate change. (Source: IPCC)"
        },
        {
            question: "How much plastic ends up in the ocean approximately every year?",
            options: ["1 million tons", "4 million tons", "8 million tons", "20 million tons"],
            correct: 2,
            explanation: "It is estimated that at least 8 million tons of plastic end up in the ocean annually, threatening wildlife and ecosystems. (Source: IUCN)"
        },
        {
            question: "How large a proportion of the energy in gasoline is used for propulsion in a gasoline car?",
            options: ["Approx. 20%", "Approx. 50%", "Approx. 70%", "Approx. 90%"],
            correct: 0,
            explanation: "Gasoline engines are inefficient; only approx. 20% of the energy goes to the wheels. Electric cars utilize approx. 60-70% from the grid to the wheels. (Source: fueleconomy.gov)"
        }
    ]
};

const SearchInputs = memo(({
    routeInput,
    handleInputChange,
    activeField,
    suggestions,
    selectSuggestion,
    clearInput,
    mapSelectionMode,
    setMapSelectionMode,
    handleUseMyLocation,
    calculateRoute,
    isCalculating,
    t,
    cardClass,
    accentBg,
    darkMode
}) => {
    return (
        <div className={`mb-12 p-6 rounded-2xl border space-y-4 ${cardClass} relative z-30 shadow-xl`}>
            <div className="grid md:grid-cols-2 gap-6">
                {/* FROM INPUT */}
                <div className="space-y-2 relative">
                    <label className="text-xs font-bold uppercase tracking-wider opacity-50 flex justify-between">
                        {t('transport.from')}
                        <div className="flex gap-2">
                            <button onClick={() => setMapSelectionMode('from')} className={`flex items-center gap-1 text-[10px] ${mapSelectionMode === 'from' ? 'text-emerald-300 font-bold' : 'text-emerald-500 hover:text-emerald-400'} transition-colors`}>
                                <Pointer size={12} /> {t('transport.map_select')}
                            </button>
                            <button onClick={handleUseMyLocation} className="flex items-center gap-1 text-[10px] text-emerald-500 hover:text-emerald-400 transition-colors">
                                <LocateFixed size={12} /> {t('transport.my_pos')}
                            </button>
                        </div>
                    </label>
                    <div className={`flex items-center gap-2 border-b py-2 transition-colors ${mapSelectionMode === 'from' ? 'border-emerald-500' : 'border-gray-500'}`}>
                        <MapPin size={16} className={mapSelectionMode === 'from' ? 'text-emerald-400 animate-pulse' : 'text-emerald-500'} />
                        <input
                            type="text"
                            placeholder={mapSelectionMode === 'from' ? t('transport.map_mode') : "..."}
                            value={routeInput.from}
                            readOnly={mapSelectionMode === 'from'}
                            onChange={(e) => handleInputChange('from', e.target.value)}
                            className="bg-transparent w-full focus:outline-none font-bold"
                            autoComplete="off"
                        />
                        {routeInput.from && (
                            <button onClick={() => clearInput('from')} className="text-gray-500 hover:text-white"><X size={16} /></button>
                        )}
                    </div>
                    {/* Autocomplete */}
                    {activeField === 'from' && suggestions.length > 0 && !mapSelectionMode && (
                        <div className={`absolute left-0 top-full w-full mt-1 z-50 rounded-lg shadow-xl overflow-hidden border max-h-60 overflow-y-auto ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                            {suggestions.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); selectSuggestion(item); }}
                                    className={`px-4 py-3 cursor-pointer text-sm flex items-center gap-2 hover:bg-emerald-500 hover:text-white transition-colors border-b last:border-0 ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
                                >
                                    <MapPin size={14} className={`opacity-50 ${item.type === 'local' ? 'text-emerald-400' : ''}`} /> {item.display_name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* TO INPUT */}
                <div className="space-y-2 relative">
                    <label className="text-xs font-bold uppercase tracking-wider opacity-50 flex justify-between">
                        {t('transport.to')}
                        <button onClick={() => setMapSelectionMode('to')} className={`flex items-center gap-1 text-[10px] ${mapSelectionMode === 'to' ? 'text-blue-300 font-bold' : 'text-blue-500 hover:text-blue-400'} transition-colors`}>
                            <Pointer size={12} /> {t('transport.map_select')}
                        </button>
                    </label>
                    <div className={`flex items-center gap-2 border-b py-2 transition-colors ${mapSelectionMode === 'to' ? 'border-blue-500' : 'border-gray-500'}`}>
                        <Navigation size={16} className={mapSelectionMode === 'to' ? 'text-blue-400 animate-pulse' : 'text-blue-500'} />
                        <input
                            type="text"
                            placeholder={mapSelectionMode === 'to' ? t('transport.map_mode') : "..."}
                            value={routeInput.to}
                            readOnly={mapSelectionMode === 'to'}
                            onChange={(e) => handleInputChange('to', e.target.value)}
                            className="bg-transparent w-full focus:outline-none font-bold"
                            autoComplete="off"
                        />
                        {routeInput.to && (
                            <button onClick={() => clearInput('to')} className="text-gray-500 hover:text-white"><X size={16} /></button>
                        )}
                    </div>
                    {/* Autocomplete */}
                    {activeField === 'to' && suggestions.length > 0 && !mapSelectionMode && (
                        <div className={`absolute left-0 top-full w-full mt-1 z-50 rounded-lg shadow-xl overflow-hidden border max-h-60 overflow-y-auto ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                            {suggestions.map((item, idx) => (
                                <div
                                    key={idx}
                                    onClick={(e) => { e.stopPropagation(); selectSuggestion(item); }}
                                    className={`px-4 py-3 cursor-pointer text-sm flex items-center gap-2 hover:bg-emerald-500 hover:text-white transition-colors border-b last:border-0 ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
                                >
                                    <MapPin size={14} className={`opacity-50 ${item.type === 'local' ? 'text-emerald-400' : ''}`} /> {item.display_name}
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>

            <button
                onClick={calculateRoute}
                disabled={isCalculating || !routeInput.from || !routeInput.to}
                className={`w-full py-3 rounded-lg font-bold uppercase tracking-wide mt-2 ${isCalculating ? 'bg-gray-700 cursor-wait' : `${accentBg}`
                    }`}
            >
                {isCalculating ? t('transport.calculating') : t('transport.calculate')}
            </button>
        </div>
    );
});

const WeeklyTimer = memo(({ t }) => {
    const [timeLeft, setTimeLeft] = useState({ d: 0, h: 0, m: 0, s: 0 });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date();
            const nextMonday = new Date(now);
            nextMonday.setDate(now.getDate() + (1 + 7 - now.getDay()) % 7);
            nextMonday.setHours(0, 0, 0, 0);

            if (nextMonday <= now) {
                nextMonday.setDate(nextMonday.getDate() + 7);
            }

            const difference = nextMonday - now;

            if (difference > 0) {
                return {
                    d: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    h: Math.floor((difference / (1000 * 60 * 60)) % 24),
                    m: Math.floor((difference / 1000 / 60) % 60),
                    s: Math.floor((difference / 1000) % 60)
                };
            }
            return { d: 0, h: 0, m: 0, s: 0 };
        };

        const timer = setInterval(() => {
            setTimeLeft(calculateTimeLeft());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="font-mono tracking-tight text-xs font-bold opacity-60">
            {t('impact.ends_in')} {timeLeft.d}{t('units.d')} {timeLeft.h}{t('units.h')} {timeLeft.m}{t('units.m')} {timeLeft.s}{t('units.s')}
        </div>
    );
});

const QuizTimer = memo(({ completed, t }) => {
    const [timeToNextQuiz, setTimeToNextQuiz] = useState('');

    useEffect(() => {
        if (!completed) return;

        const updateTimer = () => {
            const now = new Date();
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);

            const diff = tomorrow - now;
            if (diff < 0) return;

            const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diff / (1000 * 60)) % 60);
            const s = Math.floor((diff / 1000) % 60);

            setTimeToNextQuiz(`${h}${t('units.h')} ${m}${t('units.m')} ${s}${t('units.s')}`);
        };

        const interval = setInterval(updateTimer, 1000);
        updateTimer();
        return () => clearInterval(interval);
    }, [completed, t]);

    if (!completed) return null;

    return <div className="font-mono text-xl font-bold">{timeToNextQuiz}</div>;
});

const MonthEndTimer = memo(({ lang }) => {
    const [time, setTime] = useState('');
    useEffect(() => {
        const update = () => {
            const now = new Date();
            const units = lang === 'no' ? { d: 'd', h: 't', m: 'm' } : { d: 'd', h: 'h', m: 'm' };
            const nextMonth = new Date(now.getFullYear(), now.getMonth() + 1, 1);
            const diffMonth = nextMonth - now;
            const dM = Math.floor(diffMonth / (1000 * 60 * 60 * 24));
            const hM = Math.floor((diffMonth / (1000 * 60 * 60)) % 24);
            setTime(`${dM}${units.d} ${hM}${units.h}`);
        };
        update();
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, [lang]);
    return <>{time}</>;
});

const MidnightTimer = memo(({ lang }) => {
    const [time, setTime] = useState('');
    useEffect(() => {
        const update = () => {
            const now = new Date();
            const units = lang === 'no' ? { d: 'd', h: 't', m: 'm' } : { d: 'd', h: 'h', m: 'm' };
            const tomorrow = new Date(now);
            tomorrow.setDate(tomorrow.getDate() + 1);
            tomorrow.setHours(0, 0, 0, 0);
            const diffDay = tomorrow - now;
            const h = Math.floor((diffDay / (1000 * 60 * 60)) % 24);
            const m = Math.floor((diffDay / (1000 * 60)) % 60);
            setTime(`${h}${units.h} ${m}${units.m}`);
        };
        update();
        const interval = setInterval(update, 60000);
        return () => clearInterval(interval);
    }, [lang]);
    return <>{time}</>;
});

const App = () => {
    const [lang, setLang] = useState('no'); // 'no' or 'en'
    const t = useCallback((key, params = {}) => {
        const keys = key.split('.');
        let val = UI_TEXT[lang];
        for (const k of keys) {
            val = val?.[k];
        }
        let text = val || key;
        Object.keys(params).forEach(param => {
            text = text.replace(`{${param}}`, params[param]);
        });
        return text;
    }, [lang]);

    const [darkMode, setDarkMode] = useState(true);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [activeSection, setActiveSection] = useState('home');
    const [currentPage, setCurrentPage] = useState('home');

    // User & Auth State
    const [user, setUser] = useState(null);
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [showSettingsModal, setShowSettingsModal] = useState(false);
    const [isLoginMode, setIsLoginMode] = useState(false);
    const [authFormData, setAuthFormData] = useState({ username: '', displayName: '' });
    const [showUserMenu, setShowUserMenu] = useState(false);
    const [authError, setAuthError] = useState('');

    // Game State
    const [activeHabits, setActiveHabits] = useState([]);
    const [userLevel, setUserLevel] = useState({ title: "...", progress: 0, score: 0, nextGoal: 50, totalScore: 0 });
    const [challengeAccepted, setChallengeAccepted] = useState(false);
    const [showAllBadges, setShowAllBadges] = useState(false);
    const [pendingHabit, setPendingHabit] = useState(null);
    const [confirmCount, setConfirmCount] = useState(0);
    const [activeHabitCategory, setActiveHabitCategory] = useState('all');

    // NEW CHALLENGE STATE
    const [pendingChallenge, setPendingChallenge] = useState(false);
    const [confirmChallengeCount, setConfirmChallengeCount] = useState(0);

    // Challenge Mode State
    const [showChallengeModal, setShowChallengeModal] = useState(false);
    const [challengeMode, setChallengeMode] = useState(null); // '1v1' | 'group'
    const [userSearchQuery, setUserSearchQuery] = useState('');
    const [userSearchResults, setUserSearchResults] = useState([]);
    const [groupName, setGroupName] = useState('');
    const [selectedGroupMembers, setSelectedGroupMembers] = useState([]);

    // Leaderboard Toggle State
    const [activeLeaderboardTab, setActiveLeaderboardTab] = useState('alltime'); // 'alltime' | 'monthly'

    // Transport State
    const [mobilityMode, setMobilityMode] = useState('car');
    const [routeInput, setRouteInput] = useState({ from: '', to: '' });
    const [routeCoords, setRouteCoords] = useState({ from: null, to: null });
    const [suggestions, setSuggestions] = useState([]);
    const [activeField, setActiveField] = useState(null);
    const [routeResult, setRouteResult] = useState(null);
    const [routesData, setRoutesData] = useState([]); // Stores multiple route objects from OSRM
    const [selectedRouteIndex, setSelectedRouteIndex] = useState(0);
    const [isCalculating, setIsCalculating] = useState(false);
    const [isLocating, setIsLocating] = useState(false);
    const [mapStyle, setMapStyle] = useState('street');
    const [mapInitialized, setMapInitialized] = useState(false);
    const [activeFactCategory, setActiveFactCategory] = useState("Alle");
    const [mapSelectionMode, setMapSelectionMode] = useState(null); // 'from' or 'to'

    // Quiz State (DAILY)
    const [factsView, setFactsView] = useState('facts');
    const [dailyQuestions, setDailyQuestions] = useState([]);
    const [currentQuizQuestion, setCurrentQuizQuestion] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [answerStatus, setAnswerStatus] = useState(null);
    const [dailyQuizState, setDailyQuizState] = useState({ completed: false, score: 0, date: null });

    // Notification State
    const [notifications, setNotifications] = useState([]);
    const [showNotifCenter, setShowNotifCenter] = useState(false);
    const [showContactInfo, setShowContactInfo] = useState(false);

    // Leaderboard State
    const [leaderboardData, setLeaderboardData] = useState([]);

    const mapContainerRef = useRef(null);
    const mapInstanceRef = useRef(null);
    const tileLayerRef = useRef(null);
    const lastActionTimeRef = useRef(0);
    const routeLayersRef = useRef([]); // To keep track of route layers for clearing/updating
    const [leafletLoaded, setLeafletLoaded] = useState(false);
    const mapSelectionModeRef = useRef(null);
    const routesDataRef = useRef([]);

    const toggleTheme = () => setDarkMode(!darkMode);
    const toggleLang = () => setLang(prev => prev === 'no' ? 'en' : 'no');

    const navigateTo = (page) => {
        setCurrentPage(page);
        setIsMenuOpen(false);
        window.scrollTo(0, 0);
    };

    // --- NOTIFICATION SYSTEM (UPDATED) ---
    const addNotification = (message, type = 'success') => {
        const newNotif = {
            id: Date.now(),
            message,
            type,
            read: false,
            timestamp: new Date()
        };
        setNotifications(prev => [newNotif, ...prev]);
    };

    const markAsRead = (id) => {
        setNotifications(prev => prev.map(n => n.id === id ? { ...n, read: true } : n));
    };

    const markAllAsRead = () => {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
    };

    const clearNotifications = () => {
        setNotifications([]);
    };

    const deleteNotification = (e, id) => {
        e.stopPropagation();
        setNotifications(prev => prev.filter(n => n.id !== id));
    };

    const unreadCount = notifications.filter(n => !n.read).length;

    // Wrapper to keep existing calls working, but redirected to new system
    const showNotification = (message) => {
        addNotification(message);
    };

    // --- CHALLENGE / GROUP LOGIC ---
    const handleUserSearch = (query) => {
        setUserSearchQuery(query);
        if (!query || query.length < 2) {
            setUserSearchResults([]);
            return;
        }
        const db = getMockDB();
        // Only search real users from local DB
        const allUsers = db.users;
        const uniqueUsers = Array.from(new Set(allUsers.map(u => u.username))).map(username => allUsers.find(u => u.username === username));
        const results = uniqueUsers.filter(u => u.displayName.toLowerCase().includes(query.toLowerCase()) && (!user || u.username !== user.username));
        setUserSearchResults(results.slice(0, 5));
    };

    const handleSendChallenge = (targetUser) => {
        setShowChallengeModal(false);
        showNotification(`${t('notif.challenge_sent')} ${targetUser.displayName}. ${t('messages.may_best_win')}`);
        setUserSearchQuery('');
        setUserSearchResults([]);
    };

    const handleAddGroupMember = (member) => {
        if (!selectedGroupMembers.find(m => m.username === member.username)) {
            setSelectedGroupMembers([...selectedGroupMembers, member]);
            setUserSearchQuery('');
            setUserSearchResults([]);
        }
    };

    const handleCreateGroup = () => {
        if (!groupName) {
            alert(t('notif.group_name_missing'));
            return;
        }
        if (selectedGroupMembers.length === 0) {
            alert(t('notif.members_missing'));
            return;
        }

        setShowChallengeModal(false);
        showNotification(`"${groupName}" ${t('notif.group_created')} ${selectedGroupMembers.length} ${t('notif.members')}! 🚀`);
        setGroupName('');
        setSelectedGroupMembers([]);
        setUserSearchQuery('');
    };


    // --- DAILY QUIZ INIT ---
    useEffect(() => {
        const today = new Date().toISOString().split('T')[0];
        const savedState = JSON.parse(localStorage.getItem('greenShiftDailyQuiz')) || {};

        const getQuestionsForDate = (dateStr) => {
            const seed = parseInt(dateStr.split('-').join(''));
            const seededRandom = (s) => {
                let x = Math.sin(s++) * 10000;
                return x - Math.floor(x);
            };

            // Use current language questions
            let pool = [...QUIZ_QUESTIONS[lang]];
            let selected = [];
            for (let i = 0; i < 5; i++) {
                if (pool.length === 0) break;
                const randomIndex = Math.floor(seededRandom(seed + i) * pool.length);
                selected.push(pool[randomIndex]);
                pool.splice(randomIndex, 1);
            }
            return selected;
        };

        // Re-fetch questions when language changes to update text
        setDailyQuestions(getQuestionsForDate(today));

        if (savedState.date !== today) {
            setDailyQuizState({ completed: false, score: 0, date: today });
            localStorage.setItem('greenShiftDailyQuiz', JSON.stringify({ completed: false, score: 0, date: today }));
        } else {
            setDailyQuizState(savedState);
        }
    }, [lang]); // Depend on lang to update quiz text

    useEffect(() => {
        // Reset category filter when language changes
        setActiveFactCategory(UI_TEXT[lang].facts.categories.all);
        setActiveHabitCategory('all');
    }, [lang]);

    const handleQuizAnswer = (optionIndex) => {
        if (selectedAnswer !== null) return;

        setSelectedAnswer(optionIndex);
        const isCorrect = optionIndex === dailyQuestions[currentQuizQuestion].correct;

        if (isCorrect) {
            setAnswerStatus('correct');
            const newDailyScore = dailyQuizState.score + 10;

            const updatedState = { ...dailyQuizState, score: newDailyScore };
            setDailyQuizState(updatedState);
            localStorage.setItem('greenShiftDailyQuiz', JSON.stringify(updatedState));

            const newGlobalScore = userLevel.score + 10;
            setUserLevel(prev => ({ ...prev, score: newGlobalScore }));

            if (user) {
                const db = getMockDB();
                const userIndex = db.users.findIndex(u => u.username === user.username);
                if (userIndex !== -1) {
                    db.users[userIndex].xp = newGlobalScore;
                    // Update Monthly XP as well
                    db.users[userIndex].monthlyXp = (db.users[userIndex].monthlyXp || 0) + 10;
                    saveMockDB(db);
                }
            }

            showNotification(t('messages.quiz_correct'));
        } else {
            setAnswerStatus('wrong');
        }
    };

    const nextQuestion = () => {
        if (currentQuizQuestion < dailyQuestions.length - 1) {
            setCurrentQuizQuestion(prev => prev + 1);
            setSelectedAnswer(null);
            setAnswerStatus(null);
        } else {
            const finalState = { ...dailyQuizState, completed: true };
            setDailyQuizState(finalState);
            localStorage.setItem('greenShiftDailyQuiz', JSON.stringify(finalState));
        }
    };

    const getMockDB = () => {
        const db = localStorage.getItem('greenShiftDB');
        return db ? JSON.parse(db) : { users: [] };
    };

    const saveMockDB = (db) => {
        localStorage.setItem('greenShiftDB', JSON.stringify(db));
    };

    useEffect(() => {
        const sessionUser = sessionStorage.getItem('greenShiftSession');
        if (sessionUser) {
            const parsedUser = JSON.parse(sessionUser);
            setUser(parsedUser);
            const db = getMockDB();
            const dbUser = db.users.find(u => u.username === parsedUser.username);
            if (dbUser) {
                setActiveHabits(dbUser.habits || []);
                setUserLevel(prev => ({ ...prev, score: dbUser.xp || 0 }));
                if (dbUser.challengeAccepted) setChallengeAccepted(true);
            }
        }
    }, []);

    const handleAuth = (e) => {
        e.preventDefault();
        setAuthError('');
        const db = getMockDB();
        const { username, displayName } = authFormData;

        if (isLoginMode) {
            const existingUser = db.users.find(u => u.username === username);
            if (existingUser) {
                const sessionData = { username: existingUser.username, displayName: existingUser.displayName };
                setUser(sessionData);
                sessionStorage.setItem('greenShiftSession', JSON.stringify(sessionData));
                setActiveHabits(existingUser.habits || []);
                setChallengeAccepted(existingUser.challengeAccepted || false);
                setUserLevel(prev => ({ ...prev, score: existingUser.xp || 0 }));
                setShowAuthModal(false);
                setAuthFormData({ username: '', displayName: '' });
                showNotification(t('messages.welcome_back', { name: existingUser.displayName }));
            } else {
                setAuthError(t('messages.user_not_found'));
            }
        } else {
            if (!username || !displayName) return;
            if (db.users.find(u => u.username === username)) {
                setAuthError(t('messages.username_taken'));
                return;
            }
            const newUser = {
                username,
                displayName,
                xp: 0,
                monthlyXp: 0, // Init monthly score
                habits: [],
                challengeAccepted: false
            };
            db.users.push(newUser);
            saveMockDB(db);
            const sessionData = { username, displayName };
            setUser(sessionData);
            sessionStorage.setItem('greenShiftSession', JSON.stringify(sessionData));
            setActiveHabits([]);
            setChallengeAccepted(false);
            setShowAuthModal(false);
            setAuthFormData({ username: '', displayName: '' });
            showNotification(t('messages.welcome_new', { name: displayName }));
        }
    };

    const handleLogout = () => {
        setUser(null);
        sessionStorage.removeItem('greenShiftSession');
        setActiveHabits([]);
        setUserLevel({ title: t('levels.newcomer'), progress: 0, score: 0, nextGoal: 50, totalScore: 0 });
        setChallengeAccepted(false);
        setShowUserMenu(false);
        setNotifications([]);
        showNotification(t('notif.logged_out'));
    };

    const handleUpdateProfile = (e) => {
        e.preventDefault();
        const db = getMockDB();
        const userIndex = db.users.findIndex(u => u.username === user.username);
        if (userIndex !== -1) {
            db.users[userIndex].displayName = authFormData.displayName;
            saveMockDB(db);
            const newSession = { ...user, displayName: authFormData.displayName };
            setUser(newSession);
            sessionStorage.setItem('greenShiftSession', JSON.stringify(newSession));
            setShowSettingsModal(false);
            showNotification(t('notif.profile_updated'));
        }
    };

    const handleDeleteAccount = () => {
        if (confirm(t('messages.delete_confirm'))) {
            const db = getMockDB();
            const newUsers = db.users.filter(u => u.username !== user.username);
            saveMockDB({ users: newUsers });
            handleLogout();
            setShowSettingsModal(false);
            showNotification(t('notif.profile_deleted'));
        }
    };

    // --- CHALLENGE HANDLING WITH DELAY ---
    const handleAcceptChallenge = () => {
        if (challengeAccepted) return;
        setPendingChallenge(true); // Open modal instead of immediate accept
        setConfirmChallengeCount(5); // Start 5s countdown
    };

    useEffect(() => {
        let timer;
        if (pendingChallenge && confirmChallengeCount > 0) {
            timer = setTimeout(() => setConfirmChallengeCount(c => c - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [confirmChallengeCount, pendingChallenge]);

    const confirmChallengeAccept = () => {
        if (confirmChallengeCount > 0) return;
        setChallengeAccepted(true);
        const xpReward = 100; // Increased to 100 XP
        showNotification(t('messages.challenge_accepted_reward', { xp: xpReward }));

        if (user) {
            const db = getMockDB();
            const userIndex = db.users.findIndex(u => u.username === user.username);
            if (userIndex !== -1) {
                db.users[userIndex].challengeAccepted = true;
                db.users[userIndex].xp = (db.users[userIndex].xp || 0) + xpReward;
                // Update Monthly
                db.users[userIndex].monthlyXp = (db.users[userIndex].monthlyXp || 0) + xpReward;
                saveMockDB(db);
                setUserLevel(prev => ({ ...prev, score: prev.score + xpReward }));
            }
        } else {
            // Guest update
            setUserLevel(prev => ({ ...prev, score: prev.score + xpReward }));
        }
        setPendingChallenge(false);
    };

    const handleShare = () => {
        const text = "https://greenshift.netlify.app";
        // Fallback method for iFrame/Sandboxed environments where navigator.clipboard might be blocked
        const textArea = document.createElement("textarea");
        textArea.value = text;

        // Ensure it's not visible but part of DOM to allow selection
        textArea.style.top = "0";
        textArea.style.left = "0";
        textArea.style.position = "fixed";
        textArea.style.opacity = "0";

        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();

        try {
            const successful = document.execCommand('copy');
            if (successful) {
                alert(t('notif.copied'));
            } else {
                alert(t('notif.copy_fail'));
            }
        } catch (err) {
            alert(t('messages.copy_error'));
        }

        document.body.removeChild(textArea);
    };

    const handleJoinNetwork = () => {
        if (user) {
            showNotification(`${t('notif.already_joined')}, ${user.displayName}!`);
        } else {
            setShowAuthModal(true);
            setIsLoginMode(false);
        }
    };

    const handleContactScroll = () => {
        setShowContactInfo(true);
        setTimeout(() => {
            const contactSection = document.getElementById('contact-section');
            if (contactSection) {
                contactSection.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }, 100);
    };

    // NEW HABIT LOGIC WITH CONFIRMATION
    const handleHabitClick = (habitId) => {
        const now = Date.now();
        if (now - lastActionTimeRef.current < 1000) {
            return;
        }
        lastActionTimeRef.current = now;

        if (activeHabits.includes(habitId)) {
            // If already active, just toggle off (no confirmation needed to remove)
            toggleHabit(habitId);
        } else {
            // If adding, show confirmation modal
            const habit = HABIT_PERKS[lang].find(h => h.id === habitId);
            setPendingHabit(habit);
            setConfirmCount(5); // 5 seconds delay
        }
    };

    useEffect(() => {
        let timer;
        if (pendingHabit && confirmCount > 0) {
            timer = setTimeout(() => setConfirmCount(c => c - 1), 1000);
        }
        return () => clearTimeout(timer);
    }, [confirmCount, pendingHabit]);

    const confirmHabitToggle = () => {
        if (pendingHabit && confirmCount === 0) {
            toggleHabit(pendingHabit.id);
            showNotification(t('messages.habit_completed', { title: pendingHabit.title, score: pendingHabit.score }));
            setPendingHabit(null);
        }
    };

    const toggleHabit = (habitId) => {
        let newHabits = [];
        if (activeHabits.includes(habitId)) {
            newHabits = activeHabits.filter(h => h !== habitId);
        } else {
            newHabits = [...activeHabits, habitId];
        }
        setActiveHabits(newHabits);

        if (user) {
            const db = getMockDB();
            const userIndex = db.users.findIndex(u => u.username === user.username);
            if (userIndex !== -1) {
                db.users[userIndex].habits = newHabits;
                saveMockDB(db);
            }
        }
    };

    useEffect(() => {
        const habits = HABIT_PERKS[lang];
        const badges = BADGES[lang];

        const habitScore = activeHabits.reduce((acc, curr) => {
            const perk = habits.find(p => p.id === curr);
            return acc + (perk ? perk.score : 0);
        }, 0);

        const totalDisplayScore = userLevel.score + habitScore;

        let title = totalDisplayScore === 0 ? t('levels.newcomer') : badges[0].title;
        let nextGoal = badges[1].minScore;

        for (let i = 0; i < badges.length; i++) {
            if (totalDisplayScore >= badges[i].minScore) {
                title = badges[i].title;
                // Use 1.5M as cap if max level reached
                nextGoal = badges[i + 1] ? badges[i + 1].minScore : 1500000;
            }
        }

        const prevGoal = badges.find(b => b.title === title)?.minScore || 0;
        let progressPercent = 0;
        if (nextGoal > prevGoal) {
            progressPercent = ((totalDisplayScore - prevGoal) / (nextGoal - prevGoal)) * 100;
        } else {
            progressPercent = 100;
        }

        setUserLevel(prev => ({
            ...prev,
            title,
            progress: progressPercent,
            nextGoal,
            totalScore: totalDisplayScore // Nytt felt for total score
        }));

    }, [activeHabits, challengeAccepted, userLevel.score, lang]);


    useEffect(() => {
        const habits = HABIT_PERKS[lang];
        const db = getMockDB();
        const realUsers = db.users.map(u => {
            const hScore = (u.habits || []).reduce((acc, curr) => {
                const perk = habits.find(p => p.id === curr);
                return acc + (perk ? perk.score : 0);
            }, 0);

            // Ensure monthly score exists, mock it if undefined for old users
            const monthlyBase = u.monthlyXp !== undefined ? u.monthlyXp : Math.floor((u.xp || 0) * 0.3); // Mock value for old data

            return {
                name: u.displayName,
                xp: (u.xp || 0) + hScore,          // All Time
                monthly: monthlyBase + hScore,     // Monthly
                isUser: user && u.username === user.username,
            };
        });

        if (!user && (userLevel.score > 0 || activeHabits.length > 0)) {
            const habitScore = activeHabits.reduce((acc, curr) => {
                const perk = habits.find(p => p.id === curr);
                return acc + (perk ? perk.score : 0);
            }, 0);

            realUsers.push({
                name: t('notif.guest'),
                xp: userLevel.score + habitScore,
                monthly: userLevel.score + habitScore,
                isUser: true
            });
        }

        // Sort based on active tab
        const sorted = realUsers.sort((a, b) => {
            if (activeLeaderboardTab === 'monthly') return b.monthly - a.monthly;
            return b.xp - a.xp;
        }).slice(0, 10);

        setLeaderboardData(sorted);
    }, [userLevel.score, user, activeHabits, activeLeaderboardTab, lang]);

    // --- MAP SELECTION MODE LOGIC ---
    useEffect(() => {
        mapSelectionModeRef.current = mapSelectionMode;
        routesDataRef.current = routesData; // Keep Ref updated

        // Update map cursor style directly if map is mounted
        if (mapContainerRef.current) {
            const leafletContainer = mapContainerRef.current.querySelector('.leaflet-container');
            if (leafletContainer) {
                leafletContainer.style.cursor = mapSelectionMode ? 'crosshair' : 'grab';
            }
        }
    }, [mapSelectionMode, routesData]); // Added routesData dependency for ref sync

    useEffect(() => {
        if (typeof window !== 'undefined' && !document.getElementById('leaflet-css')) {
            const link = document.createElement('link');
            link.id = 'leaflet-css';
            link.rel = 'stylesheet';
            link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
            document.head.appendChild(link);

            const script = document.createElement('script');
            script.id = 'leaflet-js';
            script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
            script.async = true;
            script.onload = () => setLeafletLoaded(true);
            document.body.appendChild(script);
        } else if (window.L) {
            setLeafletLoaded(true);
        }
    }, []);

    useEffect(() => {
        if (leafletLoaded && mapContainerRef.current && currentPage === 'transport') {
            const L = window.L;
            if (!L) return;

            if (!mapInstanceRef.current) {
                const map = L.map(mapContainerRef.current).setView([58.1467, 7.9956], 13);
                mapInstanceRef.current = map;
                setMapInitialized(true);

                const tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                const attribution = '&copy; OpenStreetMap contributors';

                tileLayerRef.current = L.tileLayer(tileUrl, {
                    attribution: attribution,
                    subdomains: ['a', 'b', 'c'],
                    maxZoom: 19
                }).addTo(map);

                // --- MAP CLICK LISTENER ---
                map.on('click', async (e) => {
                    const mode = mapSelectionModeRef.current;
                    if (mode) {
                        // Handling Start/End selection
                        const { lat, lng } = e.latlng;
                        const fixedLat = parseFloat(lat.toFixed(6));
                        const fixedLon = parseFloat(lng.toFixed(6));

                        // Fly to the clicked location for visual confirmation
                        map.flyTo([fixedLat, fixedLon], 16, {
                            animate: true,
                            duration: 1.5
                        });

                        // Set coordinates directly
                        setRouteCoords(prev => ({ ...prev, [mode]: { lat: fixedLat, lon: fixedLon } }));

                        // Temporary placeholder while fetching address
                        setRouteInput(prev => ({ ...prev, [mode]: t('messages.fetching_address') }));

                        try {
                            const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${fixedLat}&lon=${fixedLon}`);
                            if (res.ok) {
                                const data = await res.json();
                                let displayName = data.display_name;
                                // Simplify address
                                if (data.address) {
                                    const road = data.address.road || '';
                                    const number = data.address.house_number || '';
                                    if (road) displayName = `${road} ${number}`;
                                    else displayName = data.display_name.split(',')[0];
                                }
                                setRouteInput(prev => ({ ...prev, [mode]: displayName }));
                            } else {
                                setRouteInput(prev => ({ ...prev, [mode]: `${fixedLat}, ${fixedLon}` }));
                            }
                        } catch (err) {
                            setRouteInput(prev => ({ ...prev, [mode]: `${fixedLat}, ${fixedLon}` }));
                        }

                        setMapSelectionMode(null); // Exit selection mode
                    } else {
                        // Handling Route Selection (Clicking on lines)
                        // Check if click is close to any route
                        // Actually, Leaflet layers handle clicks better.
                        // We add 'click' listeners to layers in drawRoutesOnMap.
                    }
                });

                setTimeout(() => {
                    map.invalidateSize();
                }, 200);
            }
        } else if (currentPage !== 'transport') {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
                tileLayerRef.current = null;
                setMapInitialized(false);
            }
        }
    }, [leafletLoaded, currentPage]);

    // --- MAP LAYER UPDATER ---
    useEffect(() => {
        if (mapInitialized && mapInstanceRef.current && window.L) {
            const map = mapInstanceRef.current;
            const L = window.L;

            // Update Base Tile Layer
            if (tileLayerRef.current) {
                map.removeLayer(tileLayerRef.current);
            }

            let tileUrl, attribution;
            if (mapStyle === 'satellite') {
                tileUrl = 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}';
                attribution = 'Tiles &copy; Esri';
            } else {
                tileUrl = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
                attribution = '&copy; OpenStreetMap contributors';
            }

            tileLayerRef.current = L.tileLayer(tileUrl, {
                attribution: attribution,
                subdomains: mapStyle === 'satellite' ? [] : ['a', 'b', 'c'],
                maxZoom: 19
            }).addTo(map);

            // Draw Routes
            drawRoutesOnMap(map, routesData, selectedRouteIndex, routeCoords.from, routeCoords.to);
        }
    }, [mapInitialized, mapStyle, routesData, selectedRouteIndex, routeCoords]); // Added dependencies to redraw


    const drawRoutesOnMap = (map, routes, selectedIndex, start, end) => {
        const L = window.L;
        if (!map || !L) return;

        // Clear existing route layers
        routeLayersRef.current.forEach(layer => map.removeLayer(layer));
        routeLayersRef.current = [];

        // Clear Markers (except user location if separate, but here we redraw start/end)
        map.eachLayer((layer) => {
            if (layer instanceof L.Marker) {
                map.removeLayer(layer);
            }
        });

        // Helper for Start/End Icons
        const createMarkerIcon = (color) => L.divIcon({
            className: 'custom-div-icon',
            html: `<div style="background-color: ${color}; width: 14px; height: 14px; border-radius: 50%; border: 3px solid white; box-shadow: 0 0 10px ${color};"></div>`,
            iconSize: [14, 14],
            iconAnchor: [7, 7]
        });

        if (start) L.marker([start.lat, start.lon], { icon: createMarkerIcon('#16a34a') }).addTo(map).bindPopup(t('messages.start'));
        if (end) L.marker([end.lat, end.lon], { icon: createMarkerIcon('#ef4444') }).addTo(map).bindPopup(t('messages.goal'));

        // Draw Routes
        if (routes && routes.length > 0) {
            let bounds = L.latLngBounds([]);

            routes.forEach((route, index) => {
                const isSelected = index === selectedIndex;
                const lineColor = isSelected ? (mapStyle === 'satellite' ? '#34d399' : '#16a34a') : '#9ca3af'; // Green if selected, Gray if not
                const lineWeight = isSelected ? 6 : 4;
                const lineOpacity = isSelected ? 0.9 : 0.6;
                const zIndex = isSelected ? 1000 : 500;

                let layer;

                if (route.geometry) {
                    // If pure geometry array (fallback) or OSRM encoded string? 
                    // Note: OSRM usually returns encoded string unless 'geometries=geojson'.
                    // My calculateRoute requests geojson.
                    if (route.geometry.type) {
                        // GeoJSON object
                        layer = L.geoJSON(route.geometry, {
                            style: { color: lineColor, weight: lineWeight, opacity: lineOpacity },
                            onEachFeature: (feature, l) => {
                                l.on('click', () => {
                                    setSelectedRouteIndex(index);
                                });
                                l.on('mouseover', () => {
                                    if (index !== selectedIndex) l.setStyle({ color: '#6ee7b7', opacity: 0.8 });
                                });
                                l.on('mouseout', () => {
                                    if (index !== selectedIndex) l.setStyle({ color: '#9ca3af', opacity: 0.6 });
                                });
                            }
                        }).addTo(map);
                    } else if (Array.isArray(route.geometry)) {
                        // Fallback array of coords
                        layer = L.polyline(route.geometry, {
                            color: lineColor, weight: lineWeight, opacity: lineOpacity
                        }).addTo(map);
                        layer.on('click', () => setSelectedRouteIndex(index));
                    }

                    if (layer) {
                        // Add Time Label
                        if (route.duration) {
                            const durationMin = Math.round(route.duration / 60);
                            const center = layer.getBounds().getCenter();

                            const labelIcon = L.divIcon({
                                className: 'route-label-icon',
                                html: `<div style="
                                background: ${isSelected ? '#10b981' : '#f3f4f6'}; 
                                color: ${isSelected ? 'white' : 'black'}; 
                                padding: 2px 6px; 
                                border-radius: 6px; 
                                font-size: 10px; 
                                font-weight: bold; 
                                border: 1px solid ${isSelected ? '#059669' : '#d1d5db'};
                                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                                white-space: nowrap;
                            ">${durationMin} min</div>`,
                                iconSize: [40, 20],
                                iconAnchor: [20, 10]
                            });
                            const labelMarker = L.marker(center, { icon: labelIcon, zIndexOffset: zIndex + 100 }).addTo(map);
                            // Add click to label too
                            labelMarker.on('click', () => setSelectedRouteIndex(index));
                            routeLayersRef.current.push(labelMarker);
                        }

                        routeLayersRef.current.push(layer);
                        bounds.extend(layer.getBounds());
                    }
                }
            });

            if (bounds.isValid()) {
                map.fitBounds(bounds, { padding: [50, 50] });
            }
        }
    };

    useEffect(() => {
        const handleScroll = () => {
            let sections = [];
            if (currentPage === 'home') sections = ['home'];
            if (currentPage === 'transport') sections = ['transport-sim', 'route-calc'];
            if (currentPage === 'impact') sections = ['impact-intro', 'habits-grid', 'leaderboard', 'achievements', 'challenge'];
            if (currentPage === 'facts') sections = ['facts-intro', 'facts-grid'];

            const scrollPosition = window.scrollY + 200;
            for (const section of sections) {
                const element = document.getElementById(section);
                if (element && element.offsetTop <= scrollPosition && (element.offsetTop + element.offsetHeight) > scrollPosition) {
                    setActiveSection(section);
                }
            }
        };

        // Reset animations slightly when switching views to ensure they trigger
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.05 });

        // Small timeout to allow DOM to update before observing
        const animationTimer = setTimeout(() => {
            const hiddenElements = document.querySelectorAll('.reveal-on-scroll');
            hiddenElements.forEach((el) => observer.observe(el));
        }, 50);

        // Safety fallback
        const safetyTimer = setTimeout(() => {
            document.querySelectorAll('.reveal-on-scroll').forEach(el => {
                el.classList.add('is-visible');
            });
        }, 800);

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearTimeout(animationTimer);
            clearTimeout(safetyTimer);
        };
    }, [currentPage, factsView]); // Lagt til factsView her for å trigge animasjon ved bytte

    // --- OPTIMALISERING: useCallback og Functional Updates for SearchInputs props ---

    const handleInputChange = useCallback((field, value) => {
        setRouteInput(prev => ({ ...prev, [field]: value }));
        setActiveField(field);
        setRouteCoords(prev => ({ ...prev, [field]: null }));
    }, []);

    useEffect(() => {
        const query = routeInput[activeField];
        if (!activeField || !query || query.length < 1) {
            setSuggestions([]);
            return;
        }

        const lowerQuery = query.toLowerCase();

        const localMatches = LOCAL_LOCATIONS.filter(item =>
            item.name.toLowerCase().includes(lowerQuery)
        ).map(item => ({
            display_name: item.name,
            lat: item.lat,
            lon: item.lon,
            type: 'local'
        })).sort((a, b) => {
            const aStarts = a.display_name.toLowerCase().startsWith(lowerQuery);
            const bStarts = b.display_name.toLowerCase().startsWith(lowerQuery);
            if (aStarts && !bStarts) return -1;
            if (!aStarts && bStarts) return 1;
            return 0;
        });

        setSuggestions(localMatches);

        const isPureNumber = /^\d+$/.test(query);

        if (query.length > 2 && localMatches.length < 3 && !isPureNumber) {
            const timerId = setTimeout(async () => {
                try {
                    const response = await fetch(
                        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&countrycodes=no&limit=5&addressdetails=1`
                    );
                    if (response.ok) {
                        const data = await response.json();
                        const apiMatches = data.map(item => {
                            let label = item.display_name.split(',')[0];
                            if (item.address) {
                                const road = item.address.road || '';
                                const number = item.address.house_number || '';
                                const city = item.address.city || item.address.town || item.address.village || '';
                                if (road) {
                                    label = road;
                                    if (number) label += ` ${number}`;
                                    if (city) label += `, ${city}`;
                                } else {
                                    label = item.display_name.split(',')[0];
                                }
                            }
                            return {
                                display_name: label,
                                lat: parseFloat(item.lat),
                                lon: parseFloat(item.lon),
                                type: 'api'
                            };
                        }).filter(item => {
                            const itemText = item.display_name.toLowerCase();
                            const queryParts = lowerQuery.split(/\s+/).filter(p => p.length > 0);
                            return queryParts.every(part => itemText.includes(part));
                        });

                        setSuggestions(prev => {
                            const existingNames = new Set(prev.map(p => p.display_name));
                            const newUnique = apiMatches.filter(m => !existingNames.has(m.display_name));
                            return [...prev, ...newUnique].slice(0, 5);
                        });
                    }
                } catch (e) { }
            }, 300);
            return () => clearTimeout(timerId);
        }
    }, [routeInput, activeField]);

    const selectSuggestion = useCallback((item) => {
        setRouteInput(prev => ({ ...prev, [activeField]: item.display_name }));
        if (item.lat && item.lon) {
            setRouteCoords(prev => ({ ...prev, [activeField]: { lat: item.lat, lon: item.lon } }));
        }
        setSuggestions([]);
        setActiveField(null);
    }, [activeField]);

    const clearInput = useCallback((field) => {
        setRouteInput(prev => ({ ...prev, [field]: '' }));
        setRouteCoords(prev => ({ ...prev, [field]: null }));
        setSuggestions([]);
        setRouteResult(null);
        setRoutesData([]);
    }, []);

    const calculateRoute = useCallback(async () => {
        // Note: We need the current state values here, so routeInput and routeCoords must be dependencies or accessed via ref if we wanted zero deps.
        // However, recreating calculateRoute when inputs change is acceptable as user action triggers it.
        if (!routeInput.from || !routeInput.to) return;
        setIsCalculating(true);
        setRouteResult(null);
        // Avoid clearing routesData immediately to prevent flash if possible, or keep it.
        // setRoutesData([]); 
        setSelectedRouteIndex(0);

        const resolveCoords = async (text, currentCoords) => {
            if (currentCoords) return currentCoords;
            const local = LOCAL_LOCATIONS.find(l => l.name.toLowerCase() === text.toLowerCase());
            if (local) return { lat: local.lat, lon: local.lon };

            try {
                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(text)}&limit=1`);
                const data = await res.json();
                if (data.length > 0) return { lat: parseFloat(data[0].lat), lon: parseFloat(data[0].lon) };
            } catch (e) { }

            return { lat: 58.1467, lon: 7.9956 };
        };

        const start = await resolveCoords(routeInput.from, routeCoords.from);
        const end = await resolveCoords(routeInput.to, routeCoords.to);

        setRouteCoords({ from: start, to: end });

        let distanceKm = 0;
        let fetchedRoutes = [];

        try {
            const controller = new AbortController();
            const timeoutId = setTimeout(() => controller.abort(), 4000);

            // REQUEST ALTERNATIVES
            const osrmUrl = `https://router.project-osrm.org/route/v1/driving/${start.lon},${start.lat};${end.lon},${end.lat}?overview=full&geometries=geojson&alternatives=true`;
            const response = await fetch(osrmUrl, { signal: controller.signal });
            clearTimeout(timeoutId);

            const data = await response.json();

            if (data.code === 'Ok' && data.routes.length > 0) {
                fetchedRoutes = data.routes.map(r => ({
                    geometry: r.geometry,
                    distance: (r.distance / 1000).toFixed(1),
                    duration: r.duration // seconds
                }));
                // Sort by duration (fastest first)
                fetchedRoutes.sort((a, b) => a.duration - b.duration);

                distanceKm = fetchedRoutes[0].distance; // Default shortest/fastest
            } else {
                throw new Error("No route");
            }
        } catch (error) {
            const R = 6371;
            const dLat = (end.lat - start.lat) * Math.PI / 180;
            const dLon = (end.lon - start.lon) * Math.PI / 180;
            const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) + Math.cos(start.lat * Math.PI / 180) * Math.cos(end.lat * Math.PI / 180) * Math.sin(dLon / 2) * Math.sin(dLon / 2);
            const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
            distanceKm = (R * c * 1.4).toFixed(1); // 1.4 factor for road approx

            fetchedRoutes = [{
                geometry: [[start.lat, start.lon], [end.lat, end.lon]], // Simple LineString style for polyline
                distance: distanceKm,
                duration: distanceKm * 60 * 1.5 // Rough guess 
            }];
        }

        setRoutesData(fetchedRoutes);

        // UPDATE ROUTE RESULT STATE FOR UI
        if (fetchedRoutes.length > 0) {
            setRouteResult({
                distance: fetchedRoutes[0].distance,
                duration: fetchedRoutes[0].duration,
                carCo2: (fetchedRoutes[0].distance * TRANSPORT_MODES.car.co2PerKm).toFixed(2)
            });
        }

        setIsCalculating(false);
    }, [routeInput, routeCoords]);

    const handleUseMyLocation = useCallback(() => {
        if (!navigator.geolocation) {
            alert(t('messages.geo_not_supported'));
            return;
        }
        setIsLocating(true);
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                setRouteCoords(prev => ({ ...prev, from: { lat: latitude, lon: longitude } }));
                setRouteInput(prev => ({ ...prev, from: t('messages.my_position') }));
                setIsLocating(false);

                // FLY TO LOCATION
                if (mapInstanceRef.current) {
                    mapInstanceRef.current.flyTo([latitude, longitude], 16, {
                        animate: true,
                        duration: 1.5
                    });
                }
            },
            () => {
                setIsLocating(false);
                alert(t('messages.geo_error'));
            }
        );
    }, []);

    const handleSetMapSelectionMode = useCallback((mode) => {
        setMapSelectionMode(mode);
        if (mode && mapContainerRef.current) {
            // SCROLL MAP INTO VIEW FOR BETTER MOBILE UX
            mapContainerRef.current.scrollIntoView({ behavior: 'smooth', block: 'center' });
        }
    }, []);

    const resetRoute = () => {
        setRouteResult(null);
        setRouteInput({ from: '', to: '' });
        setRouteCoords({ from: null, to: null });
        setRoutesData([]);

        if (mapInstanceRef.current && window.L) {
            const map = mapInstanceRef.current;
            const L = window.L;
            map.eachLayer((layer) => {
                if (layer instanceof L.Marker || layer instanceof L.Polyline || layer instanceof L.GeoJSON) {
                    map.removeLayer(layer);
                }
            });
            map.setView([58.1467, 7.9956], 13);
        }
    };

    // --- HELPER FOR CURRENT MODE ---
    const currentModeData = TRANSPORT_MODES[mobilityMode];

    // Dynamic Stats Calculation
    const getSelectedStats = () => {
        if (routesData.length === 0) return null;
        const route = routesData[selectedRouteIndex];
        const dist = parseFloat(route.distance);
        const carCost = dist * TRANSPORT_MODES.car.costPerKm;
        const currentCost = dist * currentModeData.costPerKm;
        const savings = Math.max(0, carCost - currentCost);

        return {
            distance: dist,
            co2: (dist * currentModeData.co2PerKm).toFixed(2) + ' kg',
            space: currentModeData.spaceFactor + ' m²',
            cost: savings.toFixed(0) + ' kr'
        };
    };

    const activeStats = getSelectedStats();
    // If no route calculated yet, show placeholder stats for 10km
    const displayStats = activeStats || {
        co2: (10 * currentModeData.co2PerKm).toFixed(2) + ' kg',
        space: currentModeData.spaceFactor + ' m²',
        cost: (Math.max(0, 10 * 5.0 - 10 * currentModeData.costPerKm)).toFixed(0) + ' kr'
    };

    // --- Design Tokens ---
    const themeBase = darkMode ? "bg-[#0a0a0a] text-gray-100" : "bg-[#f4f4f5] text-gray-900";
    const gridPattern = darkMode
        ? "bg-[linear-gradient(to_right,#202020_1px,transparent_1px),linear-gradient(to_bottom,#202020_1px,transparent_1px)] bg-[size:40px_40px]"
        : "bg-[linear-gradient(to_right,#e4e4e7_1px,transparent_1px),linear-gradient(to_bottom,#e4e4e7_1px,transparent_1px)] bg-[size:40px_40px]";

    const cardClass = darkMode
        ? "bg-[#121212] border border-gray-800"
        : "bg-white border border-gray-200";

    const accentText = darkMode ? "text-[#cbf382]" : "text-[#16a34a]";
    const accentBg = darkMode ? "bg-[#cbf382] text-black hover:bg-[#b5e855]" : "bg-[#16a34a] text-white hover:bg-[#15803d]";
    const monoFont = "font-mono tracking-tight";

    return (
        <div className={`min-h-screen w-full overflow-x-hidden transition-colors duration-500 font-sans selection:bg-[#cbf382] selection:text-black ${themeBase} ${gridPattern}`}>

            {/* --- REPLACED NOTIFICATION TOAST WITH NOTIFICATION CENTER IN NAVBAR --- */}

            {/* --- CHALLENGE / GROUP MODAL --- */}
            {showChallengeModal && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 animate-fade-in">
                    <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl relative ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <button
                            onClick={() => { setShowChallengeModal(false); setGroupName(''); setSelectedGroupMembers([]); setUserSearchQuery(''); }}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-black uppercase mb-6 text-center">
                            {challengeMode === '1v1' ? t('modals.duel') : t('modals.create_group')}
                        </h2>

                        {/* Group Name Input */}
                        {challengeMode === 'group' && (
                            <div className="mb-6">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2 block">
                                    {t('modals.group_name')}
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-4 rounded-xl border bg-transparent focus:outline-none focus:border-emerald-500 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                    placeholder={t('messages.example_group')}
                                    value={groupName}
                                    onChange={(e) => setGroupName(e.target.value)}
                                />
                            </div>
                        )}

                        {/* Search Users */}
                        <div className="mb-6 relative">
                            <label className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2 block">
                                {challengeMode === '1v1' ? t('modals.find_opponent') : t('modals.find_members')}
                            </label>
                            <div className="flex items-center gap-2 border-b border-gray-500 py-2">
                                <Search size={16} className="text-emerald-500" />
                                <input
                                    type="text"
                                    className="bg-transparent w-full focus:outline-none font-bold"
                                    placeholder={t('modals.search_placeholder')}
                                    value={userSearchQuery}
                                    onChange={(e) => handleUserSearch(e.target.value)}
                                />
                            </div>

                            {/* Search Results */}
                            {userSearchResults.length > 0 && (
                                <div className={`absolute left-0 top-full w-full mt-2 z-50 rounded-xl shadow-xl border overflow-hidden ${darkMode ? 'bg-black border-gray-700' : 'bg-white border-gray-200'}`}>
                                    {userSearchResults.map((u, idx) => (
                                        <div key={idx} className="flex items-center justify-between p-3 border-b last:border-0 border-gray-700/50 hover:bg-gray-800/50 transition-colors">
                                            <span className="font-bold text-sm">{u.displayName}</span>
                                            <button
                                                onClick={() => challengeMode === '1v1' ? handleSendChallenge(u) : handleAddGroupMember(u)}
                                                className={`text-xs font-bold px-3 py-1 rounded uppercase ${accentBg}`}
                                            >
                                                {challengeMode === '1v1' ? t('modals.challenge_btn') : t('modals.add_btn')}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Selected Group Members */}
                        {challengeMode === 'group' && selectedGroupMembers.length > 0 && (
                            <div className="mb-6">
                                <label className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2 block">
                                    {t('modals.selected_members')} ({selectedGroupMembers.length})
                                </label>
                                <div className="flex flex-wrap gap-2">
                                    {selectedGroupMembers.map((m, idx) => (
                                        <div key={idx} className={`px-3 py-1 rounded-full text-xs font-bold border flex items-center gap-2 ${darkMode ? 'bg-gray-800 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
                                            {m.displayName}
                                            <button onClick={() => setSelectedGroupMembers(prev => prev.filter(p => p.username !== m.username))} className="hover:text-red-500">
                                                <X size={12} />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Create Group Button */}
                        {challengeMode === 'group' && (
                            <button
                                onClick={handleCreateGroup}
                                className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest ${accentBg}`}
                            >
                                {t('modals.create_group')}
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* --- CONFIRMATION MODAL FOR HABITS --- */}
            {pendingHabit && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
                    <div className={`w-full max-w-sm rounded-2xl relative overflow-hidden transform transition-all ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border-gray-200'}`}>

                        {/* Close Button */}
                        <button
                            onClick={() => setPendingHabit(null)}
                            className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-20 ${darkMode ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 flex flex-col items-center">

                            {/* Icon Container with animation */}
                            <div className={`relative mb-6 group`}>
                                <div className={`absolute inset-0 ${pendingHabit.color} opacity-20 blur-xl rounded-full animate-pulse`}></div>
                                <div className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center text-4xl shadow-2xl ${darkMode ? 'bg-black border-zinc-800' : 'bg-white border-gray-100'}`}>
                                    <pendingHabit.icon size={40} className={pendingHabit.color} />
                                </div>
                                <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-500 text-black border-4 ${darkMode ? 'border-zinc-900' : 'border-white'}`}>
                                    +{pendingHabit.score} XP
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold uppercase tracking-wide mb-2">{t('modals.confirm_habit')}</h3>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {t('modals.did_you')} <span className={`${pendingHabit.color} font-bold`}>{pendingHabit.title}</span> {t('modals.today')}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="w-full space-y-3">
                                <button
                                    onClick={confirmHabitToggle}
                                    disabled={confirmCount > 0}
                                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group ${confirmCount > 0
                                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                            : `bg-white text-black hover:bg-emerald-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-emerald-500/20`
                                        }`}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-2">
                                        {confirmCount > 0 ? (
                                            <>
                                                <Clock size={16} className="animate-spin-slow" />
                                                <span>{t('modals.is_doing')} ({confirmCount})</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{t('modals.yes_verify')}</span>
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </div>
                                </button>

                                <button
                                    onClick={() => setPendingHabit(null)}
                                    className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-colors ${darkMode ? 'text-zinc-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}
                                >
                                    {t('modals.cancel')}
                                </button>
                            </div>

                        </div>

                        {/* Progress bar for timer */}
                        {confirmCount > 0 && (
                            <div className="absolute bottom-0 left-0 h-1 bg-emerald-500/30 w-full">
                                <div
                                    className="h-full bg-emerald-500 transition-all duration-1000 ease-linear"
                                    style={{ width: `${(confirmCount / 5) * 100}%` }}
                                ></div>
                            </div>
                        )}

                    </div>
                </div>
            )}

            {/* --- CONFIRMATION MODAL FOR CHALLENGE (NEW) --- */}
            {pendingChallenge && (
                <div className="fixed inset-0 z-[2000] flex items-center justify-center bg-black/80 backdrop-blur-md p-4 animate-fade-in">
                    <div className={`w-full max-w-sm rounded-2xl relative overflow-hidden transform transition-all ${darkMode ? 'bg-zinc-900 border border-zinc-800' : 'bg-white border-gray-200'}`}>

                        {/* Close Button */}
                        <button
                            onClick={() => setPendingChallenge(false)}
                            className={`absolute top-4 right-4 p-2 rounded-full transition-colors z-20 ${darkMode ? 'text-gray-500 hover:text-white hover:bg-white/10' : 'text-gray-400 hover:text-black hover:bg-black/5'}`}
                        >
                            <X size={20} />
                        </button>

                        <div className="p-8 flex flex-col items-center">

                            {/* Icon Container with animation */}
                            <div className={`relative mb-6 group`}>
                                <div className={`absolute inset-0 text-purple-500 opacity-20 blur-xl rounded-full animate-pulse`}></div>
                                <div className={`relative w-24 h-24 rounded-full border-4 flex items-center justify-center text-4xl shadow-2xl ${darkMode ? 'bg-black border-zinc-800' : 'bg-white border-gray-100'}`}>
                                    <Target size={40} className="text-purple-500" />
                                </div>
                                <div className={`absolute -bottom-2 -right-2 px-3 py-1 rounded-full text-xs font-black uppercase tracking-widest bg-emerald-500 text-black border-4 ${darkMode ? 'border-zinc-900' : 'border-white'}`}>
                                    +100 XP
                                </div>
                            </div>

                            {/* Text Content */}
                            <div className="text-center mb-8">
                                <h3 className="text-xl font-bold uppercase tracking-wide mb-2">{t('modals.confirm_challenge')}</h3>
                                <p className={`text-sm leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                    {t('modals.are_you_ready')}
                                </p>
                            </div>

                            {/* Actions */}
                            <div className="w-full space-y-3">
                                <button
                                    onClick={confirmChallengeAccept}
                                    disabled={confirmChallengeCount > 0}
                                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest text-sm transition-all relative overflow-hidden group ${confirmChallengeCount > 0
                                            ? 'bg-zinc-800 text-zinc-500 cursor-not-allowed'
                                            : `bg-white text-black hover:bg-purple-400 hover:scale-[1.02] hover:shadow-lg hover:shadow-purple-500/20`
                                        }`}
                                >
                                    <div className="relative z-10 flex items-center justify-center gap-2">
                                        {confirmChallengeCount > 0 ? (
                                            <>
                                                <Clock size={16} className="animate-spin-slow" />
                                                <span>{t('modals.is_preparing')} ({confirmChallengeCount})</span>
                                            </>
                                        ) : (
                                            <>
                                                <span>{t('modals.yes_accept')}</span>
                                                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                                            </>
                                        )}
                                    </div>
                                </button>

                                <button
                                    onClick={() => setPendingChallenge(false)}
                                    className={`w-full py-3 text-xs font-bold uppercase tracking-widest transition-colors ${darkMode ? 'text-zinc-500 hover:text-white' : 'text-gray-400 hover:text-black'}`}
                                >
                                    {t('modals.cancel')}
                                </button>
                            </div>

                        </div>

                        {/* Progress bar for timer */}
                        {confirmChallengeCount > 0 && (
                            <div className="absolute bottom-0 left-0 h-1 bg-purple-500/30 w-full">
                                <div
                                    className="h-full bg-purple-500 transition-all duration-1000 ease-linear"
                                    style={{ width: `${(confirmChallengeCount / 5) * 100}%` }}
                                ></div>
                            </div>
                        )}

                    </div>
                </div>
            )}

            {/* --- SETTINGS MODAL --- */}
            {showSettingsModal && user && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl relative animate-fade-in ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <button
                            onClick={() => setShowSettingsModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <h2 className="text-2xl font-black uppercase mb-6 text-center">{t('auth.account')}</h2>

                        <form onSubmit={handleUpdateProfile} className="space-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2 block">
                                    {t('auth.displayname')}
                                </label>
                                <input
                                    type="text"
                                    className={`w-full p-4 rounded-xl border bg-transparent focus:outline-none focus:border-emerald-500 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                    defaultValue={user.displayName}
                                    onChange={e => setAuthFormData({ ...authFormData, displayName: e.target.value })}
                                />
                            </div>

                            <div className="pt-4 flex flex-col gap-3">
                                <button type="submit" className={`w-full py-3 rounded-xl font-bold uppercase tracking-widest ${accentBg}`}>
                                    {t('auth.save_changes')}
                                </button>

                                <button
                                    type="button"
                                    onClick={handleDeleteAccount}
                                    className="w-full py-3 rounded-xl font-bold uppercase tracking-widest text-red-500 border border-red-500/30 hover:bg-red-500/10"
                                >
                                    {t('auth.delete_profile')}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}

            {/* --- AUTH MODAL --- */}
            {showAuthModal && (
                <div className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/80 backdrop-blur-sm p-4">
                    <div className={`w-full max-w-md p-8 rounded-3xl border shadow-2xl relative animate-fade-in ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                        <button
                            onClick={() => setShowAuthModal(false)}
                            className="absolute top-4 right-4 text-gray-500 hover:text-white"
                        >
                            <X size={24} />
                        </button>

                        <div className="text-center mb-6">
                            <h2 className="text-3xl font-black uppercase mb-2">
                                {isLoginMode ? t('auth.welcome_back') : t('auth.join_gs')}
                            </h2>
                            <div className="flex justify-center gap-4 text-sm mt-4">
                                <button
                                    onClick={() => { setIsLoginMode(false); setAuthError(''); }}
                                    className={`pb-1 border-b-2 transition-colors ${!isLoginMode ? 'border-emerald-500 text-emerald-500 font-bold' : 'border-transparent opacity-50'}`}
                                >
                                    {t('auth.register')}
                                </button>
                                <button
                                    onClick={() => { setIsLoginMode(true); setAuthError(''); }}
                                    className={`pb-1 border-b-2 transition-colors ${isLoginMode ? 'border-emerald-500 text-emerald-500 font-bold' : 'border-transparent opacity-50'}`}
                                >
                                    {t('auth.login')}
                                </button>
                            </div>
                        </div>

                        <form onSubmit={handleAuth} className="space-y-6">
                            <div>
                                <label className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2 flex items-center gap-2">
                                    <Lock size={12} /> {t('auth.username')}
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder={t('messages.username_placeholder')}
                                    className={`w-full p-4 rounded-xl border bg-transparent focus:outline-none focus:border-emerald-500 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                    value={authFormData.username}
                                    onChange={e => setAuthFormData(prev => ({ ...prev, username: e.target.value }))}
                                />
                            </div>

                            {!isLoginMode && (
                                <div className="animate-fade-in">
                                    <label className="text-xs font-bold uppercase tracking-widest opacity-50 mb-2 flex items-center gap-2">
                                        <Globe size={12} /> {t('auth.displayname')}
                                    </label>
                                    <input
                                        type="text"
                                        required
                                        placeholder={t('messages.displayname_placeholder')}
                                        className={`w-full p-4 rounded-xl border bg-transparent focus:outline-none focus:border-emerald-500 ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}
                                        value={authFormData.displayName}
                                        onChange={e => setAuthFormData(prev => ({ ...prev, displayName: e.target.value }))}
                                    />
                                </div>
                            )}

                            {authError && <p className="text-red-500 text-sm text-center font-bold">{authError}</p>}

                            <button type="submit" className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest ${accentBg}`}>
                                {isLoginMode ? t('auth.login') : t('auth.create_profile')}
                            </button>
                        </form>
                    </div>
                </div>
            )}

            {/* --- NAVIGATION --- */}
            <nav className={`fixed w-full z-50 transition-all duration-300 backdrop-blur-md border-b ${darkMode ? 'bg-black/80 border-gray-800' : 'bg-white/80 border-gray-200'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex items-center gap-2 cursor-pointer group" onClick={() => navigateTo('home')}>
                            <div className={`w-8 h-8 flex items-center justify-center rounded ${accentBg} transition-transform group-hover:rotate-180`}>
                                <ArrowRight size={20} strokeWidth={3} className="transform -rotate-45" />
                            </div>
                            <span className="font-bold text-xl tracking-tighter uppercase">
                                Green<span className={accentText}>Shift_</span>
                            </span>
                        </div>

                        {/* Desktop Menu */}
                        <div className="hidden md:flex items-center gap-8">
                            <button onClick={() => navigateTo('home')} className={`text-sm font-medium uppercase tracking-wider transition-colors hover:${accentText} ${currentPage === 'home' ? accentText : 'opacity-60'}`}>{t('nav.home')}</button>
                            <button onClick={() => navigateTo('impact')} className={`text-sm font-medium uppercase tracking-wider transition-colors hover:${accentText} ${currentPage === 'impact' ? accentText : 'opacity-60'}`}>{t('nav.impact')}</button>
                            <button onClick={() => navigateTo('transport')} className={`text-sm font-medium uppercase tracking-wider transition-colors hover:${accentText} ${currentPage === 'transport' ? accentText : 'opacity-60'}`}>{t('nav.transport')}</button>
                            <button onClick={() => navigateTo('facts')} className={`text-sm font-medium uppercase tracking-wider transition-colors hover:${accentText} ${currentPage === 'facts' ? accentText : 'opacity-60'}`}>{t('nav.facts')}</button>
                            <button onClick={() => navigateTo('about')} className={`text-sm font-medium uppercase tracking-wider transition-colors hover:${accentText} ${currentPage === 'about' ? accentText : 'opacity-60'}`}>{t('nav.about')}</button>

                            {/* --- NOTIFICATION CENTER BELL --- */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowNotifCenter(!showNotifCenter)}
                                    className={`relative p-2 rounded-full transition-colors ${showNotifCenter ? 'bg-gray-800 text-white' : 'opacity-60 hover:opacity-100'}`}
                                >
                                    <Bell size={20} />
                                    {unreadCount > 0 && (
                                        <span className="absolute top-0 right-0 w-3 h-3 bg-red-500 rounded-full border-2 border-black"></span>
                                    )}
                                </button>

                                {showNotifCenter && (
                                    <div className={`absolute right-0 top-full mt-4 w-80 rounded-2xl shadow-2xl border overflow-hidden animate-fade-in z-[100] ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                                        <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}>
                                            <span className="font-bold text-sm uppercase tracking-wider">{t('notif.title')}</span>
                                            {notifications.length > 0 && (
                                                <button onClick={clearNotifications} className="text-xs text-red-500 hover:text-red-400">
                                                    {t('notif.clear')}
                                                </button>
                                            )}
                                        </div>

                                        <div className="max-h-80 overflow-y-auto custom-scrollbar">
                                            {notifications.length === 0 ? (
                                                <div className="p-8 text-center opacity-50 text-sm">
                                                    <div className="mb-2 flex justify-center"><Bell size={24} /></div>
                                                    {t('notif.empty')}
                                                </div>
                                            ) : (
                                                notifications.map((notif) => (
                                                    <div
                                                        key={notif.id}
                                                        onClick={() => markAsRead(notif.id)}
                                                        className={`p-4 border-b last:border-0 cursor-pointer transition-colors relative group ${notif.read
                                                                ? (darkMode ? 'bg-transparent text-gray-500 hover:bg-white/5' : 'bg-transparent text-gray-500 hover:bg-black/5')
                                                                : (darkMode ? 'bg-white/5 border-gray-800' : 'bg-blue-50 border-blue-100')
                                                            }`}
                                                    >
                                                        <div className="flex gap-3">
                                                            <div className={`mt-1 w-2 h-2 rounded-full flex-shrink-0 ${notif.read ? 'bg-transparent' : 'bg-emerald-500'}`}></div>
                                                            <div className="flex-1">
                                                                <p className={`text-sm leading-snug ${notif.read ? '' : 'font-medium'}`}>{notif.message}</p>
                                                                <p className="text-[10px] mt-1 opacity-50">
                                                                    {notif.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                                </p>
                                                            </div>
                                                            <button
                                                                onClick={(e) => deleteNotification(e, notif.id)}
                                                                className="opacity-0 group-hover:opacity-100 transition-opacity p-1 hover:text-red-500"
                                                            >
                                                                <Trash2 size={14} />
                                                            </button>
                                                        </div>
                                                    </div>
                                                ))
                                            )}
                                        </div>

                                        {notifications.length > 0 && (
                                            <button
                                                onClick={markAllAsRead}
                                                className={`w-full py-3 text-xs font-bold uppercase tracking-widest hover:bg-white/5 border-t ${darkMode ? 'border-gray-800' : 'border-gray-100'}`}
                                            >
                                                {t('notif.mark_all')}
                                            </button>
                                        )}
                                    </div>
                                )}
                            </div>

                            {/* AUTH BUTTON DESKTOP */}
                            {user ? (
                                <div className="relative group">
                                    <button
                                        onClick={() => setShowUserMenu(!showUserMenu)}
                                        className="flex items-center gap-2 pl-4 border-l border-gray-700 hover:opacity-80"
                                    >
                                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs ${accentBg}`}>
                                            {user.displayName.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-bold text-sm">{user.displayName}</span>
                                    </button>

                                    {/* Dropdown */}
                                    {showUserMenu && (
                                        <div className={`absolute right-0 top-full mt-2 w-48 rounded-xl shadow-2xl border p-2 z-[100] ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                                            <button onClick={() => { setShowSettingsModal(true); setShowUserMenu(false); }} className="w-full text-left px-4 py-2 rounded-lg hover:bg-gray-800 flex items-center gap-2 text-sm">
                                                <Settings size={16} /> {t('auth.account')}
                                            </button>
                                            <button onClick={handleLogout} className="w-full text-left px-4 py-2 rounded-lg hover:bg-red-900/20 text-red-500 flex items-center gap-2 text-sm">
                                                <LogOut size={16} /> {t('auth.logout')}
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <button
                                    onClick={() => { setShowAuthModal(true); setIsLoginMode(false); }}
                                    className={`ml-4 px-4 py-2 rounded-lg font-bold text-xs uppercase tracking-widest border transition-all ${darkMode ? 'border-emerald-500 text-emerald-400 hover:bg-emerald-500/10' : 'border-emerald-600 text-emerald-700 hover:bg-emerald-50'}`}
                                >
                                    {t('auth.join')}
                                </button>
                            )}

                            {/* LANGUAGE TOGGLE DESKTOP */}
                            <button onClick={toggleLang} className="opacity-60 hover:opacity-100 transition-opacity ml-2 flex items-center gap-1 font-mono text-xs font-bold">
                                <Languages size={16} /> {lang.toUpperCase()}
                            </button>

                            <button onClick={toggleTheme} className="opacity-60 hover:opacity-100 transition-opacity ml-2">
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                        </div>

                        {/* Mobile Toggle */}
                        <div className="md:hidden flex items-center gap-2 sm:gap-4">
                            <button
                                onClick={() => setShowNotifCenter(!showNotifCenter)}
                                className="relative opacity-60 hover:opacity-100"
                            >
                                <Bell size={20} />
                                {unreadCount > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-black"></span>}
                            </button>

                            <button onClick={toggleLang} className="opacity-60 font-mono text-xs font-bold border px-1 rounded">
                                {lang.toUpperCase()}
                            </button>

                            <button onClick={toggleTheme} className="opacity-60">
                                {darkMode ? <Sun size={20} /> : <Moon size={20} />}
                            </button>
                            <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
                                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* MOBILE NOTIFICATION DROPDOWN (If opened on mobile) */}
                {showNotifCenter && (
                    <div className={`md:hidden border-t shadow-inner ${darkMode ? 'bg-gray-900 border-gray-800' : 'bg-gray-50 border-gray-200'}`}>
                        <div className={`p-4 border-b flex justify-between items-center ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}>
                            <span className="font-bold text-sm uppercase tracking-wider">{t('notif.title')}</span>
                            <div className="flex gap-4">
                                {notifications.length > 0 && (
                                    <button onClick={clearNotifications} className="text-xs text-red-500 hover:text-red-400 font-bold uppercase">
                                        {t('notif.clear')}
                                    </button>
                                )}
                                <button onClick={() => setShowNotifCenter(false)}><X size={16} /></button>
                            </div>
                        </div>

                        <div className="max-h-[60vh] overflow-y-auto">
                            {notifications.length === 0 ? (
                                <div className="p-8 text-center opacity-50 text-sm">
                                    <div className="mb-2 flex justify-center"><Bell size={24} /></div>
                                    {t('notif.empty')}
                                </div>
                            ) : (
                                notifications.map((notif) => (
                                    <div
                                        key={notif.id}
                                        onClick={() => markAsRead(notif.id)}
                                        className={`p-4 border-b last:border-0 cursor-pointer transition-colors relative ${notif.read
                                                ? (darkMode ? 'bg-transparent text-gray-500' : 'bg-transparent text-gray-500')
                                                : (darkMode ? 'bg-white/5 border-gray-800' : 'bg-blue-50 border-blue-100')
                                            } ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                                    >
                                        <div className="flex gap-3 items-start">
                                            <div className={`mt-1.5 w-2 h-2 rounded-full flex-shrink-0 ${notif.read ? 'bg-transparent' : 'bg-emerald-500'}`}></div>
                                            <div className="flex-1">
                                                <p className={`text-sm leading-snug ${notif.read ? '' : 'font-medium'}`}>{notif.message}</p>
                                                <p className="text-[10px] mt-1 opacity-50">
                                                    {notif.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                </p>
                                            </div>
                                            <button
                                                onClick={(e) => deleteNotification(e, notif.id)}
                                                className="p-2 text-gray-500 hover:text-red-500"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {notifications.length > 0 && (
                            <button
                                onClick={() => { markAllAsRead(); setShowNotifCenter(false); }}
                                className={`w-full py-4 text-xs font-bold uppercase tracking-widest hover:bg-white/5 border-t ${darkMode ? 'border-gray-800' : 'border-gray-200'}`}
                            >
                                {t('notif.mark_all')}
                            </button>
                        )}
                    </div>
                )}

                {/* --- STATUS BAR (LEVEL & XP) --- */}
                <div className={`w-full border-t ${darkMode ? 'border-gray-800 bg-gray-900/90' : 'border-gray-200 bg-gray-50/90'} backdrop-blur-md`}>
                    <div className="max-w-7xl mx-auto px-4 md:px-6 py-1 flex items-center justify-between text-[10px] font-bold uppercase tracking-widest">
                        <div className="flex items-center gap-2">
                            <span className={accentText}>{userLevel.title}</span>
                            <span className="opacity-50 hidden sm:inline">Lvl {Math.floor((userLevel.totalScore || 0) / 50) + 1}</span>
                        </div>
                        <div className="flex items-center gap-4 flex-1 mx-4">
                            <div className="h-1 w-full bg-gray-700/30 rounded-full overflow-hidden">
                                <div className={`h-full ${accentBg} transition-all duration-1000`} style={{ width: `${userLevel.progress}%` }}></div>
                            </div>
                        </div>
                        <div className="opacity-50">
                            {userLevel.totalScore || 0} / {userLevel.nextGoal} XP
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {isMenuOpen && (
                    <div className={`md:hidden absolute top-16 left-0 w-full px-6 py-8 shadow-xl border-b ${darkMode ? 'bg-black border-gray-800' : 'bg-white border-gray-200'}`}>
                        <div className="flex flex-col space-y-6">
                            <button onClick={() => navigateTo('home')} className="text-2xl font-bold uppercase tracking-tight text-left">{t('nav.home')}</button>
                            <button onClick={() => navigateTo('impact')} className="text-2xl font-bold uppercase tracking-tight text-left">{t('nav.impact')}</button>
                            <button onClick={() => navigateTo('transport')} className="text-2xl font-bold uppercase tracking-tight text-left">{t('nav.transport')}</button>
                            <button onClick={() => navigateTo('facts')} className="text-2xl font-bold uppercase tracking-tight text-left">{t('nav.facts')}</button>
                            <button onClick={() => navigateTo('about')} className="text-2xl font-bold uppercase tracking-tight text-left">{t('nav.about')}</button>

                            {user ? (
                                <>
                                    <div className="h-px bg-gray-800 my-2"></div>
                                    <div className="flex items-center gap-4">
                                        <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${accentBg}`}>
                                            {user.displayName.charAt(0).toUpperCase()}
                                        </div>
                                        <span className="font-bold">{user.displayName}</span>
                                    </div>
                                    <button onClick={() => { setShowSettingsModal(true); setIsMenuOpen(false); }} className="text-lg font-bold uppercase tracking-tight text-left flex items-center gap-2"><Settings size={20} /> {t('auth.settings')}</button>
                                    <button onClick={handleLogout} className="text-lg font-bold uppercase tracking-tight text-left text-red-500 flex items-center gap-2"><LogOut size={20} /> {t('nav.logout')}</button>
                                </>
                            ) : (
                                <button onClick={() => { setIsMenuOpen(false); setShowAuthModal(true); setIsLoginMode(false); }} className="text-xl font-bold uppercase tracking-tight text-left text-emerald-500 mt-4">{t('nav.login')}</button>
                            )}
                        </div>
                    </div>
                )}
            </nav>

            {/* --- CONTENT SWITCHER --- */}
            {currentPage === 'home' && (
                <>
                    {/* --- HERO SECTION --- */}
                    <section id="home" className="relative pt-40 pb-32 px-6 flex flex-col items-center justify-center min-h-[90vh] overflow-hidden">
                        <div className={`absolute top-1/4 left-1/4 w-96 h-96 rounded-full blur-[100px] opacity-20 animate-pulse ${darkMode ? 'bg-green-500' : 'bg-green-400'}`}></div>
                        <div className={`absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full blur-[120px] opacity-20 ${darkMode ? 'bg-blue-600' : 'bg-cyan-400'}`}></div>

                        <div className="max-w-5xl mx-auto text-center relative z-10 reveal-on-scroll">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border mb-10 ${monoFont} text-xs uppercase ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-300 bg-white/50'}`}>
                                <span className={`w-2 h-2 rounded-full ${darkMode ? 'bg-[#cbf382]' : 'bg-green-600'} animate-pulse`}></span>
                                {t('hero.pill')}
                            </div>

                            <h1 className="text-6xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]">
                                {t('hero.title1')} <br />
                                <span className={`bg-clip-text text-transparent bg-gradient-to-r ${darkMode ? 'from-[#cbf382] to-emerald-400' : 'from-green-600 to-teal-600'}`}>
                                    {t('hero.title2')}
                                </span>
                            </h1>

                            <p className={`max-w-xl mx-auto text-xl md:text-2xl font-medium mb-12 leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {t('hero.subtitle')}
                            </p>

                            <div className="grid md:grid-cols-2 gap-6 w-full max-w-4xl mx-auto">

                                {/* Card 2: Habits (Reordered First) */}
                                <div
                                    onClick={() => navigateTo('impact')}
                                    className={`group relative p-8 rounded-3xl border-2 text-left transition-all hover:-translate-y-2 cursor-pointer overflow-hidden ${darkMode ? 'bg-gray-900/50 border-gray-800 hover:border-emerald-500' : 'bg-white border-gray-200 hover:border-emerald-500'
                                        }`}
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="text-emerald-500" size={32} />
                                    </div>
                                    <div className="mb-6 p-4 bg-emerald-500/10 rounded-2xl w-fit">
                                        <Trophy className="text-emerald-500" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold uppercase mb-2">{t('hero.card1_title')}</h3>
                                    <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {t('hero.card1_desc')}
                                    </p>
                                    <span className="text-sm font-bold text-emerald-500 uppercase tracking-widest group-hover:underline">{t('hero.card1_link')}</span>
                                </div>

                                {/* Card 1: Transport */}
                                <div
                                    onClick={() => navigateTo('transport')}
                                    className={`group relative p-8 rounded-3xl border-2 text-left transition-all hover:-translate-y-2 cursor-pointer overflow-hidden ${darkMode ? 'bg-gray-900/50 border-gray-800 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'
                                        }`}
                                >
                                    <div className="absolute top-0 right-0 p-4 opacity-50 group-hover:opacity-100 transition-opacity">
                                        <ArrowUpRight className="text-blue-500" size={32} />
                                    </div>
                                    <div className="mb-6 p-4 bg-blue-500/10 rounded-2xl w-fit">
                                        <Navigation className="text-blue-500" size={32} />
                                    </div>
                                    <h3 className="text-2xl font-bold uppercase mb-2">{t('hero.card2_title')}</h3>
                                    <p className={`mb-6 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {t('hero.card2_desc')}
                                    </p>
                                    <span className="text-sm font-bold text-blue-500 uppercase tracking-widest group-hover:underline">{t('hero.card2_link')}</span>
                                </div>

                            </div>

                            {/* FACTS & QUIZ BUTTONS */}
                            <div className="w-full max-w-4xl mx-auto mt-6 grid md:grid-cols-2 gap-6">
                                {/* Facts Button */}
                                <button
                                    onClick={() => { setFactsView('facts'); navigateTo('facts'); }}
                                    className={`w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all hover:-translate-y-2 group ${darkMode ? 'bg-gray-900/50 border-gray-800 hover:border-yellow-500' : 'bg-white border-gray-200 hover:border-yellow-500'
                                        }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-yellow-500/10 rounded-2xl">
                                            <Lightbulb className="text-yellow-500" size={32} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-bold uppercase">{t('hero.btn_facts')}</h3>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('hero.btn_facts_desc')}</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="text-yellow-500 opacity-50 group-hover:opacity-100 transition-opacity" size={32} />
                                </button>

                                {/* Quiz Button */}
                                <button
                                    onClick={() => { setFactsView('quiz'); navigateTo('facts'); }}
                                    className={`w-full p-6 rounded-3xl border-2 flex items-center justify-between transition-all hover:-translate-y-2 group ${darkMode ? 'bg-gray-900/50 border-gray-800 hover:border-purple-500' : 'bg-white border-gray-200 hover:border-purple-500'
                                        }`}
                                >
                                    <div className="flex items-center gap-6">
                                        <div className="p-4 bg-purple-500/10 rounded-2xl">
                                            <BrainCircuit className="text-purple-500" size={32} />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="text-xl font-bold uppercase">{t('hero.btn_quiz')}</h3>
                                            <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{t('hero.btn_quiz_desc')}</p>
                                        </div>
                                    </div>
                                    <ArrowUpRight className="text-purple-500 opacity-50 group-hover:opacity-100 transition-opacity" size={32} />
                                </button>
                            </div>

                        </div>
                    </section>
                </>
            )}

            {currentPage === 'transport' && (
                <>
                    {/* --- MODUL 4: MOBILITET (HOVEDFOKUS) --- */}
                    <section id="transport-sim" className="relative pt-40 pb-32 px-6 min-h-screen">
                        <div className="max-w-6xl mx-auto reveal-on-scroll">
                            <div className="text-center mb-16">
                                <div className={`inline-block px-3 py-1 rounded border mb-8 ${monoFont} text-xs uppercase ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-300 bg-white/50'}`}>
                                    <span className={`w-2 h-2 rounded-full ${accentBg} inline-block mr-2`}></span>
                                    {t('transport.pill')}
                                </div>
                                <h2 className="text-5xl font-bold tracking-tight mt-4">{t('transport.title')}</h2>
                                <p className="mt-4 text-lg opacity-60">{t('transport.subtitle')}</p>
                            </div>

                            {/* FULL WIDTH INPUT SECTION - MOVED TO TOP */}
                            <SearchInputs
                                routeInput={routeInput}
                                handleInputChange={handleInputChange}
                                activeField={activeField}
                                suggestions={suggestions}
                                selectSuggestion={selectSuggestion}
                                clearInput={clearInput}
                                mapSelectionMode={mapSelectionMode}
                                setMapSelectionMode={handleSetMapSelectionMode}
                                handleUseMyLocation={handleUseMyLocation}
                                calculateRoute={calculateRoute}
                                isCalculating={isCalculating}
                                t={t}
                                cardClass={cardClass}
                                accentBg={accentBg}
                                darkMode={darkMode}
                            />

                            <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:h-[600px]">
                                {/* Left: Stats Section */}
                                <div className="lg:col-span-4 flex flex-col gap-4 lg:overflow-y-auto lg:pr-2 custom-scrollbar">

                                    {/* STATS SECTION - Now Dynamic based on route */}
                                    <div>
                                        <h3 className="text-sm font-bold uppercase opacity-60 mb-4">
                                            {t('transport.choose_mode')} {routeResult ? `${routeResult.distance} km` : '10 km'}
                                        </h3>

                                        <div className="grid gap-3">
                                            {Object.entries(TRANSPORT_MODES).map(([key, data]) => {
                                                // Calculate dynamic stats
                                                const dist = routeResult ? parseFloat(routeResult.distance) : 10;
                                                const co2 = (dist * data.co2PerKm).toFixed(2);

                                                return (
                                                    <button
                                                        key={key}
                                                        onClick={() => { setMobilityMode(key); }}
                                                        className={`group p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden ${mobilityMode === key
                                                                ? `${accentBg} border-transparent text-black shadow-lg scale-[1.02]`
                                                                : `${cardClass} hover:border-gray-500`
                                                            }`}
                                                    >
                                                        <div className="flex items-center justify-between">
                                                            <div className="flex items-center gap-4">
                                                                <div className={`p-2 rounded-lg ${mobilityMode === key ? 'bg-white/20' : 'bg-gray-800'}`}>
                                                                    <data.icon size={20} className={mobilityMode === key ? 'text-black' : 'text-white'} />
                                                                </div>
                                                                <div>
                                                                    <span className="font-bold block text-sm md:text-base">{data.title[lang]}</span>
                                                                    <span className="text-[10px] md:text-xs opacity-70">{t('transport.emissions_label')} {co2} kg CO2</span>
                                                                </div>
                                                            </div>
                                                            {mobilityMode === key && <CheckCircle size={20} />}
                                                        </div>
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {/* DETAIL CARD */}
                                        <div className={`mt-6 p-6 rounded-2xl border ${darkMode ? 'bg-gray-800/50 border-gray-700' : 'bg-gray-50 border-gray-200'}`}>
                                            <div className="flex items-center justify-between mb-4">
                                                <h4 className="font-bold text-lg flex items-center gap-2">
                                                    <HelpCircle size={18} className={currentModeData.textColor} /> {t('transport.analysis')}
                                                </h4>
                                                <span className="text-xs font-mono opacity-50">
                                                    {routeResult ? `${routeResult.distance} km` : '10 km'}
                                                </span>
                                            </div>

                                            <p className="opacity-90 text-sm leading-relaxed mb-4">
                                                {currentModeData.why[lang]}
                                            </p>

                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-center">
                                                <div className={`p-3 rounded-lg ${darkMode ? 'bg-black/30' : 'bg-white'}`}>
                                                    <div className={`text-lg font-bold ${currentModeData.textColor}`}>{displayStats.co2}</div>
                                                    <div className="text-[8px] uppercase tracking-wide opacity-50">{t('transport.co2')}</div>
                                                </div>
                                                <div className={`p-3 rounded-lg ${darkMode ? 'bg-black/30' : 'bg-white'}`}>
                                                    <div className="text-lg font-bold text-emerald-500">{displayStats.cost}</div>
                                                    <div className="text-[8px] uppercase tracking-wide opacity-50">{t('transport.saved')}</div>
                                                </div>
                                            </div>
                                            {/* RESET BUTTON */}
                                            <button
                                                onClick={resetRoute}
                                                className="w-full mt-4 text-xs font-bold uppercase tracking-widest opacity-50 hover:opacity-100 flex items-center justify-center gap-2"
                                            >
                                                <ArrowRight size={12} className="rotate-180" /> {t('transport.reset')}
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* RIGHT COLUMN: Sticky Map */}
                                <div className="lg:col-span-8 h-[400px] lg:h-full relative w-full">
                                    <div className={`h-full rounded-2xl overflow-hidden border border-gray-700 shadow-2xl bg-[#0e0e0e] group relative`}>
                                        <div ref={mapContainerRef} className="absolute inset-0 z-0 h-full w-full"></div>

                                        <div className="absolute top-4 right-4 z-[400] flex flex-col gap-2">
                                            <div className={`px-3 py-2 rounded-lg shadow-lg backdrop-blur-md text-xs font-medium border bg-white/80 border-white text-slate-700`}>
                                                {mapSelectionMode ? (
                                                    <span className="flex items-center gap-2 text-red-600 font-bold animate-pulse">
                                                        <Pointer size={12} /> {t('transport.map_mode')}
                                                    </span>
                                                ) : t('transport.live_map')}
                                            </div>
                                            <button
                                                onClick={() => setMapStyle(prev => prev === 'street' ? 'satellite' : 'street')}
                                                className="p-2 bg-white text-black rounded-lg shadow-lg hover:bg-gray-100 transition-colors"
                                                title="Bytt kartvisning"
                                            >
                                                <Globe size={20} />
                                            </button>
                                        </div>

                                        {/* Floating Stats on Map */}
                                        {routeResult && (
                                            <div className="absolute bottom-6 left-6 right-6 z-[400]">
                                                <div className="bg-black/80 backdrop-blur-md p-4 rounded-xl border border-gray-700 text-white flex justify-between items-center shadow-xl">
                                                    <div>
                                                        <div className="text-xs text-gray-400 uppercase">{t('transport.dist')}</div>
                                                        <div className="text-xl font-bold">{routeResult.distance} km</div>
                                                    </div>
                                                    <div className="text-right">
                                                        <div className="text-xs text-emerald-400 uppercase">{t('transport.bike_save')}</div>
                                                        <div className="text-xl font-bold">{routeResult.carCo2} kg CO2</div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                            </div>
                        </div>
                    </section>
                </>
            )}

            {currentPage === 'impact' && (
                <>
                    {/* --- IMPACT INTRO --- */}
                    <section id="impact-intro" className="relative pt-40 pb-16 px-6">
                        <div className="max-w-4xl mx-auto text-center reveal-on-scroll">
                            <div className={`inline-block px-3 py-1 rounded border mb-8 ${monoFont} text-xs uppercase ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-300 bg-white/50'}`}>
                                <span className={`w-2 h-2 rounded-full ${accentBg} inline-block mr-2`}></span>
                                {t('impact.pill')}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
                                {t('impact.title')}
                            </h1>
                            <p className={`max-w-2xl mx-auto text-xl font-medium leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {t('impact.subtitle')}
                            </p>
                        </div>
                    </section>

                    {/* --- GLOBAL LEADERBOARD (NEW) --- */}
                    <section id="leaderboard" className={`py-12 px-6 border-b ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
                        <div className="max-w-4xl mx-auto">
                            <div className={`p-8 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
                                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                                    <div className="flex items-center gap-4">
                                        <Trophy className="text-yellow-400" size={32} />
                                        <h3 className="text-2xl font-black uppercase tracking-tight">{t('impact.leaderboard')}</h3>
                                    </div>

                                    {/* Leaderboard Toggle */}
                                    <div className={`flex items-center p-1 rounded-full border ${darkMode ? 'border-gray-700 bg-black/30' : 'border-gray-300 bg-gray-100'}`}>
                                        <button
                                            onClick={() => setActiveLeaderboardTab('alltime')}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all ${activeLeaderboardTab === 'alltime'
                                                    ? 'bg-emerald-500 text-white shadow-lg'
                                                    : 'opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            {t('impact.all_time')}
                                        </button>
                                        <button
                                            onClick={() => setActiveLeaderboardTab('monthly')}
                                            className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wide transition-all flex items-center gap-2 ${activeLeaderboardTab === 'monthly'
                                                    ? 'bg-emerald-500 text-white shadow-lg'
                                                    : 'opacity-60 hover:opacity-100'
                                                }`}
                                        >
                                            <Calendar size={12} /> {t('impact.monthly')}
                                        </button>
                                    </div>
                                </div>

                                {/* Monthly Timer Display */}
                                {activeLeaderboardTab === 'monthly' && (
                                    <div className="flex justify-center md:justify-end mb-6 -mt-4 animate-fade-in">
                                        <div className={`flex items-center gap-2 px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-widest border ${darkMode ? 'bg-emerald-900/20 border-emerald-500/30 text-emerald-400' : 'bg-emerald-50 border-emerald-200 text-emerald-600'}`}>
                                            <Clock size={12} />
                                            {t('impact.ends_in')} <MonthEndTimer lang={lang} />
                                        </div>
                                    </div>
                                )}

                                <div className="space-y-4">
                                    {leaderboardData.length > 0 ? (
                                        leaderboardData.map((player, idx) => (
                                            <div key={idx} className={`flex items-center justify-between p-4 rounded-xl border ${player.isUser ? 'border-emerald-500 bg-emerald-500/10' : 'border-transparent bg-gray-800/30'}`}>
                                                <div className="flex items-center gap-4">
                                                    <span className={`font-mono text-lg font-bold w-8 ${idx < 3 ? 'text-yellow-400' : 'text-gray-500'}`}>#{idx + 1}</span>
                                                    <div className="flex items-center gap-3">
                                                        <div className={`p-2 rounded-full ${player.isUser ? 'bg-emerald-500 text-white' : 'bg-gray-700 text-gray-400'}`}>
                                                            <User size={16} />
                                                        </div>
                                                        <div>
                                                            <span className={`font-bold block ${player.isUser ? 'text-emerald-400' : ''}`}>{player.name} {player.isUser && t('messages.you')}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-mono font-bold text-lg block">
                                                        {activeLeaderboardTab === 'monthly' ? player.monthly : player.xp} XP
                                                    </span>
                                                    <span className="text-[10px] opacity-40 uppercase tracking-widest">
                                                        {activeLeaderboardTab === 'monthly' ? t('impact.this_month') : t('impact.total')}
                                                    </span>
                                                </div>
                                            </div>
                                        ))
                                    ) : (
                                        <p className="opacity-50 text-center">{t('impact.no_players')}</p>
                                    )}
                                </div>
                            </div>

                            {/* CHALLENGE BUTTONS */}
                            <div className="grid grid-cols-2 gap-4 mt-6">
                                <button
                                    onClick={() => { setChallengeMode('1v1'); setShowChallengeModal(true); }}
                                    className={`p-4 rounded-xl border font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-2 hover:-translate-y-1 transition-transform ${darkMode ? 'bg-gray-900 border-gray-700 hover:border-red-500' : 'bg-white border-gray-200 hover:border-red-500'}`}
                                >
                                    <Swords size={24} className="text-red-500" />
                                    {t('impact.duel')}
                                </button>
                                <button
                                    onClick={() => { setChallengeMode('group'); setShowChallengeModal(true); }}
                                    className={`p-4 rounded-xl border font-bold uppercase tracking-wider flex flex-col items-center justify-center gap-2 hover:-translate-y-1 transition-transform ${darkMode ? 'bg-gray-900 border-gray-700 hover:border-blue-500' : 'bg-white border-gray-200 hover:border-blue-500'}`}
                                >
                                    <Users size={24} className="text-blue-500" />
                                    {t('impact.new_group')}
                                </button>
                            </div>
                        </div>
                    </section>

                    {/* --- MODUL 2: VANE-VENDEREN (GAMIFIED) --- */}
                    <section id="habits-grid" className={`py-24 px-6 border-t ${darkMode ? 'border-gray-800' : 'border-gray-300'}`}>
                        <div className="max-w-7xl mx-auto">

                            {/* Gamification Dashboard */}
                            <div className={`mb-16 p-8 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-gradient-to-r from-gray-900 to-black border-gray-800' : 'bg-white border-gray-200'}`}>
                                <div className="flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                                    <div className="flex items-center gap-6">
                                        <div className={`w-24 h-24 rounded-full flex items-center justify-center border-4 text-3xl ${userLevel.progress >= 100 ? 'border-emerald-400 text-emerald-400' : 'border-gray-700 text-gray-500'
                                            }`}>
                                            <Trophy size={40} />
                                        </div>
                                        <div>
                                            <div className={`${monoFont} text-xs uppercase tracking-widest opacity-60 mb-1`}>{t('impact.current_level')}</div>
                                            <h2 className="text-4xl font-black uppercase italic">{userLevel.title}</h2>
                                            <p className="text-sm opacity-60 mt-1">{userLevel.totalScore || 0} {t('impact.xp_collected')}</p>
                                        </div>
                                    </div>

                                    <div className="w-full md:w-1/2">
                                        <div className="flex justify-between text-xs font-bold uppercase tracking-widest mb-2">
                                            <span>{t('impact.next_level')}</span>
                                            <span>{Math.round(userLevel.progress)}%</span>
                                        </div>
                                        <div className="h-4 bg-gray-700 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full transition-all duration-1000 ${accentBg}`}
                                                style={{ width: `${Math.min(userLevel.progress, 100)}%` }}
                                            ></div>
                                        </div>
                                        <p className="text-right text-xs mt-2 opacity-50">{userLevel.totalScore || 0} / {userLevel.nextGoal} XP</p>
                                    </div>
                                </div>

                                {/* Background Glow */}
                                <div className={`absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 blur-[100px] rounded-full pointer-events-none`}></div>
                            </div>

                            {/* Achievements / Badges Section */}
                            <div id="achievements" className="mb-24">
                                <div className="flex justify-between items-end mb-8">
                                    <h3 className="text-2xl font-bold uppercase tracking-tight">{t('impact.badges')}</h3>
                                </div>

                                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                                    {(showAllBadges ? BADGES[lang] : BADGES[lang].slice(0, 4)).map(badge => {
                                        const isUnlocked = userLevel.score >= badge.minScore;
                                        const BadgeIcon = badge.icon;
                                        return (
                                            <div key={badge.id} className={`p-6 rounded-xl border flex flex-col items-center text-center transition-all ${isUnlocked
                                                    ? `${darkMode ? 'bg-emerald-900/20 border-emerald-500/50' : 'bg-emerald-50 border-emerald-200'} opacity-100 scale-105`
                                                    : `opacity-30 grayscale border-gray-700`
                                                }`}>
                                                <div className={`p-3 rounded-full mb-3 ${isUnlocked ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-500'}`}>
                                                    <BadgeIcon size={24} />
                                                </div>
                                                <h4 className="font-bold text-sm uppercase">{badge.title}</h4>
                                                <p className="text-xs opacity-60 mt-1">{badge.minScore} XP</p>
                                            </div>
                                        )
                                    })}
                                </div>

                                {BADGES[lang].length > 4 && (
                                    <div className="text-center">
                                        <button
                                            onClick={() => setShowAllBadges(!showAllBadges)}
                                            className={`px-6 py-2 rounded-full border text-xs font-bold uppercase tracking-widest transition-all ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-100'}`}
                                        >
                                            {showAllBadges ? t('impact.show_less') : t('impact.show_all')}
                                        </button>
                                    </div>
                                )}
                            </div>

                            {/* HABIT CATEGORY FILTER */}
                            <div className="flex flex-wrap justify-center gap-4 mb-8">
                                {Object.entries(UI_TEXT[lang].impact.habit_cats).map(([key, label]) => (
                                    <button
                                        key={key}
                                        onClick={() => setActiveHabitCategory(key)}
                                        className={`px-6 py-2 rounded-full font-bold border transition-all ${activeHabitCategory === key
                                                ? `${accentBg} border-transparent text-white`
                                                : `${darkMode ? 'border-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`
                                            }`}
                                    >
                                        {label}
                                    </button>
                                ))}
                            </div>

                            {/* Habits Timer */}
                            <div className="flex justify-center mb-10">
                                <div className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border ${darkMode ? 'bg-blue-900/20 border-blue-500/30 text-blue-400' : 'bg-blue-50 border-blue-200 text-blue-600'}`}>
                                    <Clock size={14} />
                                    <span>{t('impact.resets_in')} <MidnightTimer lang={lang} /></span>
                                </div>
                            </div>

                            {/* Perk Grid */}
                            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                {HABIT_PERKS[lang]
                                    .filter(p => activeHabitCategory === 'all' || p.category === activeHabitCategory)
                                    .map((perk) => {
                                        const isActive = activeHabits.includes(perk.id);
                                        const IconComponent = perk.icon;
                                        return (
                                            <button
                                                key={perk.id}
                                                onClick={() => handleHabitClick(perk.id)}
                                                className={`relative p-8 rounded-2xl border-2 text-left transition-all group overflow-hidden ${isActive
                                                        ? `${darkMode ? 'bg-gray-900 border-emerald-500' : 'bg-emerald-50 border-emerald-500'}`
                                                        : `${cardClass} hover:border-gray-500`
                                                    }`}
                                            >
                                                <div className="flex justify-between items-start mb-6 relative z-10">
                                                    <div className={`p-4 rounded-xl ${darkMode ? 'bg-black' : 'bg-white'} ${isActive ? perk.color : 'text-gray-500'}`}>
                                                        <IconComponent size={28} />
                                                    </div>
                                                    <div className={`${monoFont} text-xs px-2 py-1 rounded border ${isActive ? 'border-emerald-500 text-emerald-500' : 'border-gray-700 text-gray-500'}`}>
                                                        +{perk.score} XP
                                                    </div>
                                                </div>

                                                <div className="relative z-10">
                                                    <h3 className={`text-xl font-bold uppercase mb-2 ${isActive ? 'text-white' : ''}`}>{perk.title}</h3>
                                                    <p className="opacity-60 text-sm">{perk.desc}</p>
                                                    <span className="text-[10px] uppercase opacity-40 mt-3 block tracking-widest">
                                                        {UI_TEXT[lang].impact.habit_cats[perk.category] || perk.category}
                                                    </span>
                                                </div>

                                                {/* Reset Timer for Active Habits */}
                                                {isActive && (
                                                    <div className="absolute bottom-4 right-4 z-20 text-[10px] font-bold uppercase tracking-widest opacity-70 text-white flex items-center gap-1">
                                                        <Clock size={10} /> {t('impact.resets_in')} <MidnightTimer lang={lang} />
                                                    </div>
                                                )}

                                                {/* Active Glow */}
                                                {isActive && (
                                                    <div className={`absolute inset-0 opacity-10 bg-emerald-500`}></div>
                                                )}
                                            </button>
                                        );
                                    })
                                }
                            </div>

                            {/* Weekly Challenge Section */}
                            <div id="challenge" className="mt-24">
                                <div className={`p-10 rounded-3xl border ${darkMode ? 'bg-gradient-to-br from-purple-900/20 to-black border-purple-500/30' : 'bg-purple-50 border-purple-200'}`}>
                                    <div className="flex items-start gap-6">
                                        <div className="p-4 bg-purple-500 text-white rounded-2xl shadow-lg shadow-purple-500/20 hidden md:block">
                                            <Target size={40} />
                                        </div>
                                        <div>
                                            <div className="flex justify-between items-center mb-2">
                                                <div className={`${monoFont} text-purple-400 text-xs uppercase tracking-widest`}>{t('impact.week_challenge')}</div>
                                                <WeeklyTimer t={t} />
                                            </div>
                                            <h3 className="text-3xl font-black uppercase mb-4">{t('impact.challenge_title')}</h3>
                                            <p className="opacity-80 max-w-2xl mb-6">
                                                {t('impact.challenge_desc')}
                                                <br /><br />
                                                <strong>{t('impact.reward')}</strong> 100 XP.
                                            </p>
                                            <button
                                                onClick={handleAcceptChallenge}
                                                className={`px-6 py-3 font-bold rounded-lg transition-colors ${challengeAccepted ? 'bg-green-600 text-white cursor-default' : 'bg-purple-600 text-white hover:bg-purple-500'}`}
                                            >
                                                {challengeAccepted ? t('impact.accepted') : t('impact.accept')}
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </section>
                </>
            )}

            {currentPage === 'facts' && (
                /* --- FACTS PAGE CONTENT --- */
                <section className="relative pt-40 pb-32 px-6 min-h-screen">
                    <div className="max-w-6xl mx-auto">

                        {/* Header */}
                        <div className="text-center mb-12 reveal-on-scroll">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border mb-6 ${monoFont} text-xs uppercase ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-300 bg-white/50'}`}>
                                <span className={`w-2 h-2 rounded-full ${accentBg} animate-pulse`}></span>
                                {t('facts.pill')}
                            </div>
                            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6">
                                {t('facts.title')} <span className={accentText}>{t('facts.title_span')}</span>
                            </h1>
                            <p className={`max-w-2xl mx-auto text-xl leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {t('facts.subtitle')}
                            </p>
                        </div>

                        {/* MODE SWITCHER */}
                        <div className="flex justify-center mb-16 reveal-on-scroll">
                            <div className={`p-1 rounded-full border flex ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
                                <button
                                    onClick={() => setFactsView('facts')}
                                    className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all ${factsView === 'facts' ? `${accentBg} shadow-lg` : 'opacity-60 hover:opacity-100'}`}
                                >
                                    {t('facts.btn_knowledge')}
                                </button>
                                <button
                                    onClick={() => setFactsView('quiz')}
                                    className={`px-8 py-3 rounded-full font-bold text-sm uppercase tracking-wide transition-all ${factsView === 'quiz' ? `${accentBg} shadow-lg` : 'opacity-60 hover:opacity-100'}`}
                                >
                                    {t('facts.btn_quiz')}
                                </button>
                            </div>
                        </div>

                        {factsView === 'facts' ? (
                            <>
                                {/* Category Buttons */}
                                <div className="flex flex-wrap justify-center gap-4 mb-12 reveal-on-scroll">
                                    {Object.entries(UI_TEXT[lang].facts.categories).map(([key, label]) => (
                                        <button
                                            key={key}
                                            onClick={() => setActiveFactCategory(label)}
                                            className={`px-6 py-2 rounded-full font-bold border transition-all ${activeFactCategory === label
                                                    ? `${accentBg} border-transparent text-white`
                                                    : `${darkMode ? 'border-gray-700 hover:border-gray-500' : 'border-gray-300 hover:border-gray-400'}`
                                                }`}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>

                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 reveal-on-scroll">
                                    {FACTS_DATA[lang].filter(cat => activeFactCategory === UI_TEXT[lang].facts.categories.all || cat.category === activeFactCategory).map((cat, idx) => (
                                        <React.Fragment key={idx}>
                                            {cat.items.map((item, i) => (
                                                <div key={i} className={`p-8 rounded-3xl border ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
                                                    <div className={`mb-4 p-3 rounded-xl w-fit ${item.bg} ${item.color}`}>
                                                        <item.icon size={32} />
                                                    </div>
                                                    <h3 className="text-xl font-bold uppercase mb-2">{item.title}</h3>
                                                    <p className="opacity-70 leading-relaxed mb-4">{item.text}</p>
                                                    <p className="text-xs opacity-40 uppercase tracking-widest">{item.source}</p>
                                                </div>
                                            ))}
                                        </React.Fragment>
                                    ))}
                                </div>
                            </>
                        ) : (
                            /* --- QUIZ MODE --- */
                            <div className="max-w-2xl mx-auto reveal-on-scroll">
                                {!dailyQuizState.completed && dailyQuestions.length > 0 ? (
                                    <div className={`p-8 md:p-12 rounded-3xl border relative overflow-hidden ${darkMode ? 'bg-gray-900/50 border-gray-700' : 'bg-white border-gray-200 shadow-xl'}`}>

                                        <div className="flex justify-between items-center mb-8">
                                            <span className={`text-xs font-bold uppercase tracking-widest px-3 py-1 rounded border ${darkMode ? 'border-gray-700' : 'border-gray-300'}`}>
                                                {t('facts.quiz_q')} {currentQuizQuestion + 1} / {dailyQuestions.length}
                                            </span>
                                            <div className="flex items-center gap-2">
                                                <BrainCircuit size={20} className="text-purple-500" />
                                                <span className="font-bold">{t('facts.score_today')} {dailyQuizState.score}</span>
                                            </div>
                                        </div>

                                        <h2 className="text-2xl md:text-3xl font-black mb-8 leading-tight">
                                            {dailyQuestions[currentQuizQuestion].question}
                                        </h2>

                                        <div className="space-y-3">
                                            {dailyQuestions[currentQuizQuestion].options.map((option, idx) => {
                                                let btnClass = darkMode ? 'bg-gray-800 border-gray-700 hover:border-gray-500' : 'bg-gray-50 border-gray-200 hover:border-gray-400';

                                                if (selectedAnswer !== null) {
                                                    if (idx === dailyQuestions[currentQuizQuestion].correct) {
                                                        btnClass = 'bg-emerald-500 text-white border-emerald-500';
                                                    } else if (idx === selectedAnswer) {
                                                        btnClass = 'bg-red-500 text-white border-red-500';
                                                    } else {
                                                        btnClass = 'opacity-50';
                                                    }
                                                }

                                                return (
                                                    <button
                                                        key={idx}
                                                        onClick={() => handleQuizAnswer(idx)}
                                                        disabled={selectedAnswer !== null}
                                                        className={`w-full p-4 rounded-xl border-2 font-bold text-left transition-all flex justify-between items-center ${btnClass}`}
                                                    >
                                                        {option}
                                                        {selectedAnswer !== null && idx === dailyQuestions[currentQuizQuestion].correct && <CheckCircle size={20} />}
                                                    </button>
                                                )
                                            })}
                                        </div>

                                        {selectedAnswer !== null && (
                                            <div className="mt-8 animate-fade-in">
                                                <div className={`p-4 rounded-xl mb-6 ${answerStatus === 'correct' ? 'bg-emerald-500/20 text-emerald-400' : 'bg-red-500/20 text-red-400'}`}>
                                                    <p className="font-bold mb-1">{answerStatus === 'correct' ? t('facts.correct') : t('facts.wrong')}</p>
                                                    <p className="text-sm opacity-80 text-white">{dailyQuestions[currentQuizQuestion].explanation}</p>
                                                </div>
                                                <button
                                                    onClick={nextQuestion}
                                                    className={`w-full py-4 rounded-xl font-bold uppercase tracking-widest ${accentBg}`}
                                                >
                                                    {currentQuizQuestion < dailyQuestions.length - 1 ? t('facts.next_q') : t('facts.finish_q')}
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div className={`p-12 rounded-3xl border text-center ${darkMode ? 'bg-gray-900 border-gray-700' : 'bg-white border-gray-200'}`}>
                                        <div className="w-20 h-20 rounded-full bg-yellow-500 text-black flex items-center justify-center mx-auto mb-6 text-4xl">
                                            <Trophy />
                                        </div>
                                        <h2 className="text-4xl font-black mb-4">{t('facts.quiz_done')}</h2>
                                        <p className="text-xl opacity-70 mb-2">{t('facts.you_got')} {dailyQuizState.score} XP.</p>
                                        <p className="text-sm opacity-50 mb-8">{t('facts.new_q_tmrw')}</p>

                                        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-xl border ${darkMode ? 'bg-black border-gray-700' : 'bg-gray-100 border-gray-300'}`}>
                                            <Timer size={20} className="text-emerald-500 animate-pulse" />
                                            <div className="text-left">
                                                <div className="text-[10px] uppercase tracking-widest opacity-50">{t('facts.next_quiz_in')}</div>
                                                <QuizTimer completed={dailyQuizState.completed} t={t} />
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </section>
            )}

            {currentPage === 'about' && (
                /* --- ABOUT PAGE CONTENT --- */
                <section id="about" className="relative pt-28 md:pt-40 pb-20 md:pb-32 px-6 min-h-screen">
                    <div className="max-w-5xl mx-auto">

                        {/* Header */}
                        <div className="text-center mb-12 md:mb-20 reveal-on-scroll">
                            <div className={`inline-flex items-center gap-2 px-3 py-1 rounded border mb-6 ${monoFont} text-xs uppercase ${darkMode ? 'border-gray-700 bg-gray-900/50' : 'border-gray-300 bg-white/50'}`}>
                                <span className={`w-2 h-2 rounded-full ${accentBg} animate-pulse`}></span>
                                {t('about.pill')}
                            </div>
                            <h1 className="text-4xl md:text-7xl font-black tracking-tighter mb-6">
                                {t('about.title')} <span className={accentText}>{t('about.title_span')}</span>
                            </h1>
                            <p className={`max-w-2xl mx-auto text-lg md:text-xl leading-relaxed ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                {t('about.subtitle')}
                            </p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 reveal-on-scroll">

                            {/* Mission Card - Spans 2 cols */}
                            <div className={`md:col-span-2 p-8 md:p-12 rounded-3xl border relative overflow-hidden group hover:border-emerald-500/30 transition-all ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
                                <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity transform group-hover:scale-110 duration-700">
                                    <Target size={150} />
                                </div>
                                <div className="relative z-10">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${darkMode ? 'bg-gray-800 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                                        <Info size={28} />
                                    </div>
                                    <h3 className="text-2xl md:text-3xl font-bold uppercase mb-6 flex items-center gap-3">
                                        {t('about.mission_title')}
                                    </h3>
                                    <div className={`text-lg leading-relaxed max-w-3xl ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        <p>{t('about.mission_text')}</p>
                                    </div>
                                </div>
                            </div>

                            {/* Recruitment Card */}
                            <div className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Heart size={100} />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${darkMode ? 'bg-gray-800 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                                        <Users size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold uppercase mb-4">{t('about.join_title')}</h3>
                                    <p className={`text-base mb-8 flex-grow ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {t('about.join_text')}
                                    </p>
                                    <button
                                        onClick={handleContactScroll}
                                        className={`w-full py-4 rounded-xl font-bold uppercase tracking-wide transition-all group-hover:translate-x-1 flex items-center justify-center gap-2 ${accentBg}`}
                                    >
                                        {t('about.contact_btn')} <ArrowRight size={18} />
                                    </button>
                                </div>
                            </div>

                            {/* Contact Info Card */}
                            <div id="contact-section" className={`p-8 md:p-10 rounded-3xl border relative overflow-hidden group hover:border-emerald-500/30 transition-all flex flex-col ${darkMode ? 'bg-gray-900/50 border-gray-800' : 'bg-white border-gray-200'}`}>
                                <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-10 transition-opacity">
                                    <Mail size={100} />
                                </div>
                                <div className="relative z-10 flex flex-col h-full">
                                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${darkMode ? 'bg-gray-800 text-emerald-400' : 'bg-emerald-100 text-emerald-600'}`}>
                                        <Mail size={28} />
                                    </div>
                                    <h3 className="text-2xl font-bold uppercase mb-4">{t('about.contact_info')}</h3>

                                    <div className="space-y-4 mt-auto">
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">{t('about.email')}</p>
                                            <a href="mailto:hei@greenshift.no" className={`text-xl font-medium hover:text-emerald-500 transition-colors ${darkMode ? 'text-white' : 'text-black'}`}>hei@greenshift.no</a>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">{t('about.phone')}</p>
                                            <p className={`text-xl font-medium ${darkMode ? 'text-white' : 'text-black'}`}>+47 38 00 00 00</p>
                                        </div>
                                        <div>
                                            <p className="text-xs font-bold uppercase tracking-widest opacity-50 mb-1">{t('about.address')}</p>
                                            <p className={`text-base ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                                Tangen 8<br />4608 Kristiansand
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </section>
            )}

            {/* --- FOOTER --- */}
            <footer className={`py-24 px-6 border-t ${darkMode ? 'border-gray-800 bg-[#050505]' : 'border-gray-300 bg-gray-50'}`}>
                <div className="max-w-3xl mx-auto text-center reveal-on-scroll">
                    <h2 className="text-4xl font-bold tracking-tighter mb-6 uppercase">{t('footer.title')}</h2>
                    <p className={`text-lg mb-10 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        {t('footer.subtitle')}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
                        <button
                            onClick={handleJoinNetwork}
                            className={`px-8 py-3 rounded font-bold uppercase tracking-wide ${accentBg}`}
                        >
                            {t('footer.join_net')}
                        </button>
                        <button
                            onClick={handleShare}
                            className={`px-8 py-3 rounded font-bold uppercase tracking-wide border flex items-center gap-2 justify-center ${darkMode ? 'border-gray-700 hover:bg-gray-800' : 'border-gray-300 hover:bg-gray-200'}`}
                        >
                            <Copy size={18} /> {t('footer.share')}
                        </button>
                    </div>

                    <p className="text-xs uppercase tracking-widest mb-4 opacity-40">{t('footer.collab')}</p>
                    <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 text-sm font-bold opacity-40 uppercase tracking-widest">
                        <span>Kartverket</span>
                        <span>Norkart</span>
                        <span>Digin</span>
                        <span>Bølgen</span>
                        <span>Tangen VGS</span>
                    </div>
                </div>
            </footer>

            {/* --- GLOBAL STYLES --- */}
            <style>{`
        html { scroll-behavior: smooth; }
        @keyframes fade-in { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .animate-fade-in { animation: fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
        .animate-spin-slow { animation: spin 2s linear infinite; }
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        .reveal-on-scroll { opacity: 0; transform: translateY(40px) scale(0.98); transition: all 1s cubic-bezier(0.16, 1, 0.3, 1); }
        .reveal-on-scroll.is-visible { opacity: 1; transform: translateY(0) scale(1); }
        .custom-div-icon { background: transparent; border: none; }
        /* Custom scrollbar for stats list */
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: transparent; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #555; border-radius: 4px; }
      `}</style>
        </div>
    );
};

export default App;