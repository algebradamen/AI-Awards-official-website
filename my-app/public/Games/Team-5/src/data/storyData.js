export const STORY_SCENES = [
  // ============================================
  // ACT I: THE STATIC (scenes 0-3)
  // ============================================
  {
    id: 'intro-void-0',
    act: 1,
    type: 'text',
    content: {
      text: '',
      style: 'distorted',
    },
    audio: {
      sfx: 'tinnitus-intro',
    },
    effects: ['vignette'],
  },
  {
    id: 'intro-void-1',
    act: 1,
    type: 'text',
    content: {
      text: '"...consequences of inaction..."',
      style: 'distorted',
    },
    audio: {
      voice: 'professor-inaction',
    },
    effects: ['vignette'],
  },
  {
    id: 'intro-void-2',
    act: 1,
    type: 'text',
    content: {
      text: '"...saturation point..."',
      style: 'distorted',
    },
    audio: {
      voice: 'professor-saturation',
    },
    effects: ['vignette'],
  },
  {
    id: 'intro-void-3',
    act: 1,
    type: 'text',
    content: {
      text: '"...synaptic calibration complete."',
      style: 'distorted',
    },
    audio: {
      voice: 'professor-calibration',
      sfx: 'heartbeat-riser',
    },
    effects: ['vignette', 'flash-end'],
    transition: 'flash',
  },

  // ============================================
  // ACT II: THE UTOPIA
  // ============================================

  // MORNING ROUTINE (scenes 4-10)
  {
    id: 'awakening',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/bedroom-wakeup.jpg',
      location: 'Kristiansand, Norway. 2075.',
    },
    audio: {
      music: 'utopia-ambient',
    },
    effects: ['fade-in'],
  },
  {
    id: 'bedroom-clock',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/bedroom-clock.jpg',
      caption: 'September 3, 2075. 07:00. Temperature: Perfect. Air quality: Optimal.',
    },
    audio: {
      sfx: 'alarm-notif',
    },
  },
  {
    id: 'bedroom-pill',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/bedside-pill.jpg',
      caption: 'The capsule waits to be consumed. White. Smooth. Familiar.',
    },
    audio: {},
  },
  {
    id: 'morning-pill',
    act: 2,
    type: 'video',
    content: {
      video: 'morning-pill-taking.mp4',
      caption: 'The morning ritual. One capsule. Every day.',
    },
    audio: {},
  },
  {
    id: 'thought-routine',
    act: 2,
    type: 'text',
    content: {
      text: 'Same time. Same pill. Same perfect day ahead.',
      style: 'thought',
    },
    audio: {
      voice: 'hero-routine',
    },
  },
  {
    id: 'leaving-apartment',
    act: 2,
    type: 'video',
    content: {
      video: 'apartment-hallway.mp4',
      caption: 'The building hums quietly. Climate-controlled. Self-cleaning.',
    },
    audio: {
      sfx: 'door-hiss',
    },
    effects: ['fade-in'],
  },
  {
    id: 'elevator',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/elevator-view.png',
      caption: 'Fifty floors down. The city spreads like a garden.',
    },
    audio: {
      sfx: 'elevator-descend',
    },
  },
  {
    id: 'thought-city',
    act: 2,
    type: 'text',
    content: {
      text: "They rebuilt everything after the Transition. That's what the history modules say.",
      style: 'thought',
    },
    audio: {
      voice: 'hero-city',
    },
  },

  // CITY WALK (scenes 11-19)
  {
    id: 'city-panorama',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/city-panorama.jpg',
      caption: 'A city that breathes. Solar spires. Living walls. Zero emissions.',
    },
    audio: {
      music: 'utopia-city',
    },
  },
  {
    id: 'city-street',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/city-street.jpg',
      caption: 'Everyone walks the same pace. Everyone smiles the same way.',
    },
    audio: {},
  },
  {
    id: 'city-above',
    act: 2,
    type: 'video',
    content: {
      video: 'city-above.mp4',
      caption: 'From above, the city looks like a garden. Green rooftops. White towers. No smog.',
    },
    audio: {},
  },
  {
    id: 'city-fountain',
    act: 2,
    type: 'video',
    content: {
      video: 'city-fountain.mp4',
      caption: 'Water catches the light. Crystal clear. Endlessly looping.',
    },
    audio: {},
  },
  {
    id: 'bystranda-beach',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/bystranda-beach.jpg',
      location: 'Bystranda',
      caption: 'The water glows an impossible blue. No one seems to notice.',
    },
    audio: {},
  },
  {
    id: 'bystranda-boardwalk',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/bystranda-boardwalk.jpg',
      caption: 'The air smells like synthetic vanilla and engineered pine. Pleasant. Constant.',
    },
    audio: {},
  },
  {
    id: 'aquarama',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/aquarama-building.jpg',
      caption: "Aquarama. Recreation center. Wellness hub. Everyone's favorite place.",
    },
    audio: {},
  },
  {
    id: 'thought-perfect',
    act: 2,
    type: 'text',
    content: {
      text: 'Perfect. Everything is perfect. It has been perfect for as long as I can remember.',
      style: 'thought',
    },
    audio: {
      voice: 'hero-perfect',
    },
  },
  {
    id: 'school-approach',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/tangen-school-exterior.jpg',
      location: 'Tangen High School',
      caption: '8:00. Right on time. Always on time.',
    },
    audio: {},
  },

  // SCHOOL DAY (scenes 20-25)
  {
    id: 'school-hallway',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/school-hallway.jpg',
      caption: 'The hallways are silent except for footsteps. No shouting. No running. Perfect order.',
    },
    audio: {},
  },
  {
    id: 'classroom-enter',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/classroom-clean.jpg',
      caption: 'Environmental Studies. Today\'s topic: The Transition of 2031.',
    },
    audio: {},
  },
  {
    id: 'classroom-lesson',
    act: 2,
    type: 'text',
    content: {
      text: 'The teacher speaks about the old world. Pollution. Disease. Chaos. How we fixed it all.',
      style: 'normal',
    },
    audio: {
      voice: 'hero-lesson',
    },
  },
  {
    id: 'classroom-clock',
    act: 2,
    type: 'text',
    content: {
      text: 'The hours pass. 09:00. 10:00. 11:00. The lesson drones on.',
      style: 'normal',
    },
    audio: {
      voice: 'hero-clock',
    },
  },
  {
    id: 'missed-dose',
    act: 2,
    type: 'text',
    content: {
      text: '12:00. Lunch period. The dispenser in the cafeteria... I walked right past it.',
      style: 'thought',
    },
    audio: {
      voice: 'hero-missed-dose',
    },
  },
  {
    id: 'thought-fine',
    act: 2,
    type: 'text',
    content: {
      text: "It's fine. Just one dose. I'll take it after class.",
      style: 'thought',
    },
    audio: {
      voice: 'hero-fine',
    },
  },

  // FIRST GLITCHES (scenes 26-33)
  {
    id: 'first-symptom',
    act: 2,
    type: 'text',
    content: {
      text: '13:30. My head throbs. A pressure behind my eyes.',
      style: 'normal',
    },
    audio: {
      music: 'silence',
      sfx: 'heartbeat-single',
      voice: 'hero-symptom',
    },
  },
  {
    id: 'first-glitch',
    act: 2,
    type: 'video',
    content: {
      video: 'hand-tremor.mp4',
    },
    audio: {
      music: 'tension-build',
      sfx: 'heartbeat-rapid',
    },
  },
  {
    id: 'vision-blur',
    act: 2,
    type: 'image',
    content: {
      image: 'glitch/vision-blur.jpg',
      caption: 'The room tilts. Colors bleed at the edges.',
    },
    audio: {
      sfx: 'glitch-bio',
    },
    effects: ['chromatic', 'shake'],
  },
  {
    id: 'classroom-glitch',
    act: 2,
    type: 'glitch',
    content: {
      utopia: 'utopia/classroom-blur.jpg',
      dystopia: 'glitch/classroom-flicker.jpg',
    },
    audio: {
      sfx: 'glitch-bio',
    },
    effects: ['glitch-flicker'],
  },
  {
    id: 'thought-nurse',
    act: 2,
    type: 'text',
    content: {
      text: 'Something is wrong. I need to see the nurse.',
      style: 'thought',
    },
    audio: {
      voice: 'hero-nurse-thought',
    },
  },
  {
    id: 'leaving-class',
    act: 2,
    type: 'text',
    content: {
      text: "Excuse me. I don't feel well. May I be excused?",
      style: 'normal',
    },
    audio: {
      voice: 'hero-excused',
    },
  },
  {
    id: 'nurse-approach',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/nurse-door.jpg',
      caption: "The nurse's office. End of the corridor. White door. No handle.",
    },
    audio: {},
  },
  {
    id: 'nurse-knock',
    act: 2,
    type: 'text',
    content: {
      text: 'I knock twice. The door slides open.',
      style: 'normal',
    },
    audio: {
      sfx: 'door-hiss',
      voice: 'hero-knock',
    },
  },

  // THE NURSE (scenes 34-39)
  {
    id: 'nurse-office-interior',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/nurse-office.jpg',
      caption: 'The room smells like nothing. Absolute sterility.',
    },
    audio: {},
  },
  {
    id: 'nurse-portrait',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/nurse-portrait.jpg',
      caption: "Her smile is precise. Measured. Her eyes don't move when she blinks.",
    },
    audio: {},
  },
  {
    id: 'explain-symptoms',
    act: 2,
    type: 'text',
    content: {
      text: "Everything feels wrong. The room keeps... shifting. My hands won't stop shaking.",
      style: 'normal',
    },
    audio: {
      voice: 'hero-symptoms',
    },
  },
  {
    id: 'nurse-pill',
    act: 2,
    type: 'image',
    content: {
      image: 'utopia/nurse-pill-hand.jpg',
      caption: 'You missed your midday dose. It happens. Take this.',
    },
    audio: {
      voice: 'nurse-consume',
    },
  },
  {
    id: 'takes-pill',
    act: 2,
    type: 'text',
    content: {
      text: 'I swallow the pill. The trembling stops. The edges sharpen. The world snaps back into focus.',
      style: 'normal',
    },
    audio: {
      music: 'silence',
      sfx: 'notification-chime',
      voice: 'hero-takes-pill',
    },
    effects: ['flash'],
  },
  {
    id: 'thought-wrong',
    act: 2,
    type: 'text',
    content: {
      text: 'Better. Everything is better now. So why does it feel like I just made a mistake?',
      style: 'thought',
    },
    audio: {
      voice: 'hero-wrong',
    },
  },

  // ============================================
  // ACT III: THE FRACTURE
  // ============================================

  // WALKING HOME (scenes 40-47)
  {
    id: 'walk-home-start',
    act: 3,
    type: 'video',
    content: {
      video: 'apartment-evening.mp4',
      caption: "15:30. School ends. I walk the same route home. But now I'm watching.",
    },
    audio: {
      music: 'suspense-walk',
    },
  },
  {
    id: 'walk-home-detail-1',
    act: 3,
    type: 'text',
    content: {
      text: "A man passes me. His smile holds for three seconds too long. His eyes don't match it.",
      style: 'thought',
    },
    audio: {
      voice: 'hero-detail-1',
    },
    effects: ['vignette'],
  },
  {
    id: 'walk-home-detail-2',
    act: 3,
    type: 'text',
    content: {
      text: 'Above: birds fly in perfect formation. Too perfect. Like a screensaver.',
      style: 'thought',
    },
    audio: {
      voice: 'hero-detail-2',
    },
    effects: ['vignette'],
  },
  {
    id: 'walk-home-detail-3',
    act: 3,
    type: 'text',
    content: {
      text: "A child laughs on the playground. I see her mouth move. But there's no sound.",
      style: 'thought',
    },
    audio: {
      voice: 'hero-detail-3',
    },
    effects: ['vignette'],
  },
  {
    id: 'walk-home-detail-4',
    act: 3,
    type: 'text',
    content: {
      text: 'The fountain water loops. The same arc. The same splash. Over and over.',
      style: 'thought',
    },
    audio: {
      voice: 'hero-detail-4',
    },
    effects: ['vignette'],
  },
  {
    id: 'bystranda-return',
    act: 3,
    type: 'image',
    content: {
      image: 'utopia/bystranda-beach.jpg',
      caption: 'Bystranda. The water still glows. But now it looks like a screen.',
    },
    audio: {},
  },
  {
    id: 'apartment-evening',
    act: 3,
    type: 'image',
    content: {
      image: 'utopia/apartment-evening-nohand.jpg',
      location: 'Home',
      caption: '18:00. The evening dose sits on the counter. Waiting.',
    },
    audio: {},
  },
  {
    id: 'thought-choice',
    act: 3,
    type: 'text',
    content: {
      text: "I've taken three pills today. Morning. Midday. And now evening. Every day for seventeen years. What happens if I stop?",
      style: 'thought',
    },
    audio: {
      voice: 'hero-choice',
    },
  },

  // THE CHOICE (scenes 48-50)
  {
    id: 'the-choice',
    act: 3,
    type: 'choice',
    content: {
      question: 'The pill sits on the counter. The evening dose.',
      options: [
        { text: 'Take the pill', id: 'take' },
        { text: "Don't take the pill", id: 'refuse' },
      ],
      backgrounds: {
        default: 'utopia/apartment-evening.png',
        take: 'utopia/apartment-evening-good.jpg',
        refuse: 'glitch/apartment-evening-bad.jpg',
      },
    },
    audio: {},
  },
  {
    id: 'choice-result-a',
    act: 3,
    type: 'text',
    content: {
      text: 'I made my decision. My hand closes around the capsule. But my fingers spasm—',
      style: 'normal',
    },
    audio: {
      sfx: 'heartbeat-single',
      voice: 'hero-result-a',
    },
    effects: ['shake'],
  },
  {
    id: 'choice-result-b',
    act: 3,
    type: 'text',
    content: {
      text: 'The pill slips. Falls. Rolls across the counter and drops behind the refrigerator. Gone.',
      style: 'normal',
    },
    audio: {
      voice: 'hero-result-b',
    },
  },

  // THE COLLAPSE (scenes 51-58)
  {
    id: 'collapse-start',
    act: 3,
    type: 'image',
    content: {
      image: 'glitch/hands-dirty.jpg',
      caption: "My hands. They're covered in— no. They're clean. No. Covered in something black.",
    },
    audio: {
      music: 'dystopia-drone',
      sfx: 'heartbeat-rapid',
    },
    effects: ['chromatic', 'vignette'],
  },
  {
    id: 'collapse-nausea',
    act: 3,
    type: 'text',
    content: {
      text: 'The nausea hits like a wave. I drop to my knees. The floor is cold. Too cold. Wrong.',
      style: 'normal',
    },
    audio: {
      voice: 'hero-nausea',
    },
  },
  {
    id: 'collapse-transition',
    act: 3,
    type: 'image',
    content: {
      image: 'glitch/glitch-transition.jpg',
    },
    audio: {
      sfx: 'reality-crash',
    },
    effects: ['shake', 'toxic'],
  },
  {
    id: 'city-flicker',
    act: 3,
    type: 'glitch',
    content: {
      utopia: 'utopia/city-panev.jpg',
      dystopia: 'dystopia/city-ruins.jpg',
    },
    audio: {
      sfx: 'glitch-bio',
    },
    effects: ['glitch-flicker'],
  },
  {
    id: 'window-reveal',
    act: 3,
    type: 'image',
    isDystopia: true,
    content: {
      image: 'dystopia/window-view.jpg',
      caption: 'I crawl to the window. The city... the city is...',
    },
    audio: {},
    effects: ['toxic'],
  },
  {
    id: 'sky-toxic',
    act: 3,
    type: 'image',
    isDystopia: true,
    content: {
      image: 'dystopia/sky-toxic.jpg',
      caption: "The sky. It's not blue. It never was. It's the color of rust. Of smoke. Of poison.",
    },
    audio: {},
    effects: ['toxic'],
  },
  {
    id: 'streets-trash',
    act: 3,
    type: 'image',
    isDystopia: true,
    content: {
      image: 'dystopia/streets-trash.jpg',
      caption: 'The streets below are buried. Trash. Debris. Abandoned vehicles. No people.',
    },
    audio: {},
  },
  {
    id: 'thought-real',
    act: 3,
    type: 'text',
    isDystopia: true,
    content: {
      text: 'This is real. This has always been real. The pills... they were making me see something else.',
      style: 'thought',
    },
    audio: {
      voice: 'hero-real',
    },
  },

  // BYSTRANDA REVEALED (scenes 59-63)
  {
    id: 'bystranda-dead',
    act: 3,
    type: 'image',
    isDystopia: true,
    content: {
      image: 'dystopia/bystranda-dead.jpg',
      location: 'Bystranda',
      caption: 'The beach. The beautiful beach.',
    },
    audio: {
      sfx: 'wave-sludge',
    },
  },
  {
    id: 'sludge-waves',
    act: 3,
    type: 'video',
    isDystopia: true,
    content: {
      video: 'sludge-waves.mp4',
      caption: 'Black sludge instead of blue water. Dead fish floating. The smell of sulfur and rot.',
    },
    audio: {
      sfx: 'wave-sludge',
    },
  },
  {
    id: 'aquarama-collapsed',
    act: 3,
    type: 'image',
    isDystopia: true,
    content: {
      image: 'dystopia/aquarama-collapsed.jpg',
      caption: 'Aquarama. A skeleton of rust and broken glass. When did it fall?',
    },
    audio: {},
  },
  {
    id: 'tangen-ruins',
    act: 3,
    type: 'image',
    isDystopia: true,
    content: {
      image: 'dystopia/tangen-ruins.jpg',
      caption: 'Tangen. My school. Weathered by acid rain. Empty for... how long?',
    },
    audio: {},
  },
  {
    id: 'thought-how-long',
    act: 3,
    type: 'text',
    isDystopia: true,
    content: {
      text: 'How long has the world been like this? How long have we been asleep?',
      style: 'thought',
    },
    audio: {
      voice: 'hero-how-long',
    },
  },

  // ============================================
  // ACT IV: THE LECTURE
  // ============================================
  {
    id: 'montage-intro',
    act: 4,
    type: 'text',
    isDystopia: true,
    content: {
      text: '"In 2026, we knew. The data was there. The warnings were clear. We had every chance to act."',
      style: 'professor',
    },
    audio: {
      music: 'climax-horror',
      voice: 'professor-lecture-1',
    },
  },
  {
    id: 'montage-coral',
    act: 4,
    type: 'montage',
    isDystopia: true,
    content: {
      image: 'dystopia/coral-dead.jpg',
      data: '70% of coral reefs dead by 2050 — NOAA, 2024',
    },
    audio: {},
  },
  {
    id: 'montage-coral-text',
    act: 4,
    type: 'text',
    isDystopia: true,
    content: {
      text: 'The oceans acidified. The reefs bleached. We watched it happen on nature documentaries.',
      style: 'normal',
    },
    audio: {
      voice: 'hero-coral',
    },
  },
  {
    id: 'montage-forest',
    act: 4,
    type: 'montage',
    isDystopia: true,
    content: {
      image: 'dystopia/forest-dead.jpg',
      data: 'Amazon deforestation: 10,000 km² per year',
    },
    audio: {},
  },
  {
    id: 'montage-forest-text',
    act: 4,
    type: 'text',
    isDystopia: true,
    content: {
      text: 'The lungs of the planet. We cut them down for farmland. For profit. For convenience.',
      style: 'normal',
    },
    audio: {
      voice: 'hero-forest',
    },
  },
  {
    id: 'montage-landfill',
    act: 4,
    type: 'montage',
    isDystopia: true,
    content: {
      image: 'dystopia/landfill.jpg',
      data: '8 million tons of plastic enter oceans annually',
    },
    audio: {},
  },
  {
    id: 'montage-smog',
    act: 4,
    type: 'montage',
    isDystopia: true,
    content: {
      image: 'dystopia/smog-city.jpg',
      data: 'Air pollution causes 7 million deaths yearly — WHO',
    },
    audio: {},
  },
  {
    id: 'montage-fish',
    act: 4,
    type: 'montage',
    isDystopia: true,
    content: {
      image: 'dystopia/fish-dead.jpg',
      data: 'Marine life declined 69% since 1970 — WWF',
    },
    audio: {},
  },
  {
    id: 'montage-microplastics',
    act: 4,
    type: 'montage',
    isDystopia: true,
    content: {
      image: 'dystopia/microplastics.jpg',
      data: 'Microplastics found in human blood, lungs, brain',
    },
    audio: {},
  },
  {
    id: 'professor-quote-1',
    act: 4,
    type: 'text',
    isDystopia: true,
    content: {
      text: '"We chose not to fix the environment."',
      style: 'professor',
    },
    audio: {
      voice: 'professor-lecture-2',
    },
    effects: ['vignette'],
  },
  {
    id: 'professor-quote-2',
    act: 4,
    type: 'text',
    isDystopia: true,
    content: {
      text: '"We chose to medicate our perception of it."',
      style: 'professor',
    },
    audio: {
      voice: 'professor-lecture-3',
    },
    effects: ['vignette'],
  },
  {
    id: 'professor-quote-3',
    act: 4,
    type: 'text',
    isDystopia: true,
    content: {
      text: '"We ignored the taste of the poison... until the poison was all that remained."',
      style: 'professor',
    },
    audio: {
      voice: 'professor-lecture-4',
      sfx: 'scream-internal',
    },
    effects: ['vignette', 'shake'],
  },
  {
    id: 'breaking-point',
    act: 4,
    type: 'image',
    isDystopia: true,
    content: {
      image: 'glitch/hands-dirty.jpg',
    },
    audio: {},
    effects: ['shake', 'chromatic'],
  },
  {
    id: 'snap-black',
    act: 4,
    type: 'text',
    content: {
      text: '',
    },
    audio: {
      music: 'silence',
    },
    transition: 'hard-cut',
  },

  // ============================================
  // ACT V: THE RETURN
  // ============================================
  {
    id: 'vr-interior',
    act: 5,
    type: 'text',
    content: {
      text: 'SIMULATION COMPLETE. NEURAL DISCONNECT IN 3... 2... 1...',
      style: 'system',
    },
    audio: {
      sfx: 'vr-shutdown',
      voice: 'system-disconnect',
    },
  },
  {
    id: 'student-wakeup',
    act: 5,
    type: 'video',
    content: {
      video: 'vr-removal.mp4',
    },
    audio: {
      sfx: 'student-gasp',
    },
  },
  {
    id: 'lecture-hall',
    act: 5,
    type: 'image',
    content: {
      image: 'reality/lecture-hall.jpg',
      location: 'University of Agder. 2026.',
      caption: 'A lecture hall. Real desks. Real windows. Real air.',
    },
    audio: {},
    effects: ['fade-in'],
  },
  {
    id: 'professor-speaks',
    act: 5,
    type: 'image',
    content: {
      image: 'reality/professor.jpg',
      caption: 'That was a simulation. A potential trajectory. One possible future.',
    },
    audio: {
      voice: 'professor-closing-1',
      music: 'ending-somber',
    },
  },
  {
    id: 'professor-quote-simulation',
    act: 5,
    type: 'text',
    content: {
      text: '"A future where we treated the symptom... instead of the cause. Where we chose comfort over change."',
      style: 'professor',
    },
    audio: {
      voice: 'professor-closing-2',
    },
  },
  {
    id: 'professor-pill',
    act: 5,
    type: 'text',
    content: {
      text: '"The pill in the simulation? A metaphor. But the environmental data? That was real. 2026 data. Our data."',
      style: 'professor',
    },
    audio: {
      voice: 'professor-pill',
    },
  },
  {
    id: 'pill-crush',
    act: 5,
    type: 'image',
    content: {
      image: 'reality/pill-crush.jpg',
      caption: 'The simulation is over. But the clock? The clock is still ticking.',
    },
    audio: {
      voice: 'professor-closing-3',
    },
  },
  {
    id: 'end-tagline',
    act: 5,
    type: 'end',
    content: {
      tagline: 'THE WORLD REMEMBERS WHAT WE FEED IT.',
      title: 'AFTERTASTE',
    },
    audio: {
      voice: 'professor-tagline',
    },
    effects: ['fade-in'],
  },
];

export const AUDIO_MANIFEST = {
  music: {
    'utopia-ambient': 'assets/audio/music/utopia-ambient.mp3',
    'utopia-city': 'assets/audio/music/utopia-city.mp3',
    'tension-build': 'assets/audio/music/tension-build.mp3',
    'suspense-walk': 'assets/audio/music/suspense-walk.mp3',
    'dystopia-drone': 'assets/audio/music/dystopia-drone.mp3',
    'silence': 'assets/audio/music/silence.mp3',
    'climax-horror': 'assets/audio/music/climax-horror.mp3',
    'ending-somber': 'assets/audio/music/ending-somber.mp3',
  },
  sfx: {
    'tinnitus-intro': 'assets/audio/sfx/tinnitus-intro.mp3',
    'alarm-notif': 'assets/audio/sfx/alarm-notif.mp3',
    'heartbeat-single': 'assets/audio/sfx/heartbeat-single.mp3',
    'heartbeat-riser': 'assets/audio/sfx/heartbeat-riser.mp3',
    'heartbeat-rapid': 'assets/audio/sfx/heartbeat-rapid.mp3',
    'glitch-bio': 'assets/audio/sfx/glitch-bio.mp3',
    'reality-crash': 'assets/audio/sfx/reality-crash.mp3',
    'notification-chime': 'assets/audio/sfx/notification-chime.mp3',
    'door-hiss': 'assets/audio/sfx/door-hiss.mp3',
    'elevator-descend': 'assets/audio/sfx/elevator-descend.mp3',
    'wave-sludge': 'assets/audio/sfx/wave-sludge.mp3',
    'scream-internal': 'assets/audio/sfx/scream-internal.mp3',
    'vr-removal': 'assets/audio/sfx/vr-removal.mp3',
    'vr-shutdown': 'assets/audio/sfx/vr-shutdown.mp3',
    'student-gasp': 'assets/audio/sfx/student-gasp.mp3',
  },
  voice: {
    // Professor voices
    'professor-inaction': 'assets/audio/voice/professor-inaction.mp3',
    'professor-saturation': 'assets/audio/voice/professor-saturation.mp3',
    'professor-calibration': 'assets/audio/voice/professor-calibration.mp3',
    'professor-lecture-1': 'assets/audio/voice/professor-lecture-1.mp3',
    'professor-lecture-2': 'assets/audio/voice/professor-lecture-2.mp3',
    'professor-lecture-3': 'assets/audio/voice/professor-lecture-3.mp3',
    'professor-lecture-4': 'assets/audio/voice/professor-lecture-4.mp3',
    'professor-closing-1': 'assets/audio/voice/professor-closing-1.mp3',
    'professor-closing-2': 'assets/audio/voice/professor-closing-2.mp3',
    'professor-closing-3': 'assets/audio/voice/professor-closing-3.mp3',
    'professor-tagline': 'assets/audio/voice/professor-tagline.mp3',
    'professor-pill': 'assets/audio/voice/professor-pill.mp3',
    // Nurse voices
    'nurse-consume': 'assets/audio/voice/nurse-consume.mp3',
    // System voices
    'system-disconnect': 'assets/audio/voice/system-disconnect.mp3',
    // Hero voices
    'hero-routine': 'assets/audio/voice/hero-routine.mp3',
    'hero-city': 'assets/audio/voice/hero-city.mp3',
    'hero-perfect': 'assets/audio/voice/hero-perfect.mp3',
    'hero-lesson': 'assets/audio/voice/hero-lesson.mp3',
    'hero-clock': 'assets/audio/voice/hero-clock.mp3',
    'hero-missed-dose': 'assets/audio/voice/hero-missed-dose.mp3',
    'hero-fine': 'assets/audio/voice/hero-fine.mp3',
    'hero-symptom': 'assets/audio/voice/hero-symptom.mp3',
    'hero-nurse-thought': 'assets/audio/voice/hero-nurse-thought.mp3',
    'hero-excused': 'assets/audio/voice/hero-excused.mp3',
    'hero-knock': 'assets/audio/voice/hero-knock.mp3',
    'hero-symptoms': 'assets/audio/voice/hero-symptoms.mp3',
    'hero-takes-pill': 'assets/audio/voice/hero-takes-pill.mp3',
    'hero-wrong': 'assets/audio/voice/hero-wrong.mp3',
    'hero-detail-1': 'assets/audio/voice/hero-detail-1.mp3',
    'hero-detail-2': 'assets/audio/voice/hero-detail-2.mp3',
    'hero-detail-3': 'assets/audio/voice/hero-detail-3.mp3',
    'hero-detail-4': 'assets/audio/voice/hero-detail-4.mp3',
    'hero-choice': 'assets/audio/voice/hero-choice.mp3',
    'hero-result-a': 'assets/audio/voice/hero-result-a.mp3',
    'hero-result-b': 'assets/audio/voice/hero-result-b.mp3',
    'hero-nausea': 'assets/audio/voice/hero-nausea.mp3',
    'hero-real': 'assets/audio/voice/hero-real.mp3',
    'hero-how-long': 'assets/audio/voice/hero-how-long.mp3',
    'hero-coral': 'assets/audio/voice/hero-coral.mp3',
    'hero-forest': 'assets/audio/voice/hero-forest.mp3',
  },
};

export const IMAGE_MANIFEST = {
  'utopia/bedroom-wakeup.jpg': 'assets/images/utopia/bedroom-wakeup.jpg',
  'utopia/bedroom-clock.jpg': 'assets/images/utopia/bedroom-clock.jpg',
  'utopia/bedside-pill.jpg': 'assets/images/utopia/bedside-pill.jpg',
  'utopia/elevator-view.png': 'assets/images/utopia/elevator-view.png',
  'utopia/city-panorama.jpg': 'assets/images/utopia/city-panorama.jpg',
  'utopia/city-street.jpg': 'assets/images/utopia/city-street.jpg',
  'utopia/city-street-evening.jpg': 'assets/images/utopia/city-street-evening.jpg',
  'utopia/bystranda-beach.jpg': 'assets/images/utopia/bystranda-beach.jpg',
  'utopia/bystranda-boardwalk.jpg': 'assets/images/utopia/bystranda-boardwalk.jpg',
  'utopia/aquarama-building.jpg': 'assets/images/utopia/aquarama-building.jpg',
  'utopia/tangen-school-exterior.jpg': 'assets/images/utopia/tangen-school-exterior.jpg',
  'utopia/school-hallway.jpg': 'assets/images/utopia/school-hallway.jpg',
  'utopia/classroom-clean.jpg': 'assets/images/utopia/classroom-clean.jpg',
  'utopia/classroom-blur.jpg': 'assets/images/utopia/classroom-blur.jpg',
  'utopia/nurse-office.jpg': 'assets/images/utopia/nurse-office.jpg',
  'utopia/nurse-door.jpg': 'assets/images/utopia/nurse-door.jpg',
  'utopia/nurse-portrait.jpg': 'assets/images/utopia/nurse-portrait.jpg',
  'utopia/nurse-pill-hand.jpg': 'assets/images/utopia/nurse-pill-hand.jpg',
  'utopia/apartment-evening.jpg': 'assets/images/utopia/apartment-evening.jpg',
  'utopia/apartment-evening-nohand.jpg': 'assets/images/utopia/apartment-evening-nohand.jpg',
  'utopia/apartment-evening-good.jpg': 'assets/images/utopia/apartment-evening-good.jpg',
  'glitch/apartment-evening-bad.jpg': 'assets/images/glitch/apartment-evening-bad.jpg',
  'glitch/vision-blur.jpg': 'assets/images/glitch/vision-blur.jpg',
  'glitch/classroom-flicker.jpg': 'assets/images/glitch/classroom-flicker.jpg',
  'glitch/hands-dirty.jpg': 'assets/images/glitch/hands-dirty.jpg',
  'glitch/glitch-transition.jpg': 'assets/images/glitch/glitch-transition.jpg',
  'dystopia/window-view.jpg': 'assets/images/dystopia/window-view.jpg',
  'dystopia/city-ruins.jpg': 'assets/images/dystopia/city-ruins.jpg',
  'dystopia/sky-toxic.jpg': 'assets/images/dystopia/sky-toxic.jpg',
  'dystopia/streets-trash.jpg': 'assets/images/dystopia/streets-trash.jpg',
  'dystopia/bystranda-dead.jpg': 'assets/images/dystopia/bystranda-dead.jpg',
  'dystopia/aquarama-collapsed.jpg': 'assets/images/dystopia/aquarama-collapsed.jpg',
  'dystopia/tangen-ruins.jpg': 'assets/images/dystopia/tangen-ruins.jpg',
  'dystopia/coral-dead.jpg': 'assets/images/dystopia/coral-dead.jpg',
  'dystopia/forest-dead.jpg': 'assets/images/dystopia/forest-dead.jpg',
  'dystopia/landfill.jpg': 'assets/images/dystopia/landfill.jpg',
  'dystopia/smog-city.jpg': 'assets/images/dystopia/smog-city.jpg',
  'dystopia/fish-dead.jpg': 'assets/images/dystopia/fish-dead.jpg',
  'dystopia/microplastics.jpg': 'assets/images/dystopia/microplastics.jpg',
  'reality/lecture-hall.jpg': 'assets/images/reality/lecture-hall.jpg',
  'reality/professor.jpg': 'assets/images/reality/professor.jpg',
  'reality/pill-crush.jpg': 'assets/images/reality/pill-crush.jpg',
  'utopia/city-panev.jpg': 'assets/images/utopia/city-panev.jpg',
};

export const VIDEO_MANIFEST = {
  'morning-pill-taking.mp4': 'assets/videos/morning-pill-taking.mp4',
  'apartment-hallway.mp4': 'assets/videos/apartment-hallway.mp4',
  'city-above.mp4': 'assets/videos/city-above.mp4',
  'city-fountain.mp4': 'assets/videos/city-fountain.mp4',
  'hand-tremor.mp4': 'assets/videos/hand-tremor.mp4',

  'sludge-waves.mp4': 'assets/videos/sludge-waves.mp4',
  'vr-removal.mp4': 'assets/videos/vr-removal.mp4',
  'apartment-evening.mp4': 'assets/videos/apartment-evening.mp4',
};
