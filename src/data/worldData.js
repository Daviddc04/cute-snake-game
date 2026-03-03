// World: 30x30 (2x snake game 15x15). Tiles: road = path emoji, building = house emoji.
export const WORLD_SIZE = 30

export const TILE = {
  ROAD: '🟫',
  GRASS: '🟩',
  HOUSE: '🏠',
}

// Build a 30x30 map: roads in a simple pattern, some houses, rest grass.
function buildMap() {
  const map = Array(WORLD_SIZE)
    .fill(null)
    .map(() => Array(WORLD_SIZE).fill(TILE.GRASS))

  // Horizontal and vertical roads
  for (let i = 0; i < WORLD_SIZE; i++) {
    map[10][i] = TILE.ROAD
    map[20][i] = TILE.ROAD
    map[i][10] = TILE.ROAD
    map[i][20] = TILE.ROAD
  }
  // Houses (avoid center and roads for variety)
  const houses = [
    [3, 3], [5, 7], [25, 5], [7, 25], [22, 22], [2, 18], [18, 2], [28, 15], [15, 28],
  ]
  houses.forEach(([r, c]) => { map[r][c] = TILE.HOUSE })
  return map
}

export const worldMap = buildMap()

// 5 NPCs: emoji, position [row, col], name, dialogue (3 prompts, 4 options each with response)
export const NPCs = [
  {
    id: 'npc1',
    name: 'Luna',
    emoji: '🐱',
    position: [8, 8],
    dialogue: [
      {
        prompt: 'Hey! Do you like the weather today?',
        options: [
          { label: "It's perfect!", response: 'Right? I could stay here forever.' },
          { label: 'A bit hot...', response: 'Same! Let\'s find some shade.' },
          { label: "I didn't notice.", response: 'You were probably exploring. Fair enough!' },
          { label: 'What weather?', response: 'Haha, you\'re funny. I like you!' },
        ],
      },
      {
        prompt: 'What do you like to do for fun?',
        options: [
          { label: 'Play games!', response: 'Me too! Have you tried the snake game?' },
          { label: 'Explore places.', response: 'Exploring is the best. So many corners!' },
          { label: 'Talk to friends.', response: 'Aw, that\'s sweet. I\'m glad we\'re talking!' },
          { label: 'Eat snacks.', response: 'Same. Snacks make everything better.' },
        ],
      },
      {
        prompt: 'Well, it was nice meeting you!',
        options: [
          { label: 'Bye Luna!', response: 'Bye! Come back anytime! 💕' },
          { label: 'See you later!', response: 'See you! Take care!' },
          { label: 'Thanks for chatting!', response: 'Thank you too! You\'re the best!' },
          { label: 'Stay cute!', response: 'You too! Bye bye!' },
        ],
      },
    ],
  },
  {
    id: 'npc2',
    name: 'Stella',
    emoji: '⭐',
    position: [12, 18],
    dialogue: [
      {
        prompt: 'Hi there! Are you new around here?',
        options: [
          { label: 'Yes, just exploring!', response: 'Welcome! You\'ll love it here.' },
          { label: 'I\'ve been here a while.', response: 'Oh cool! Maybe we\'ve crossed paths.' },
          { label: 'Sort of?', response: 'Well, either way, nice to meet you!' },
          { label: 'I live here!', response: 'Really? I feel like I\'d remember you!' },
        ],
      },
      {
        prompt: 'What\'s your favorite thing in this world?',
        options: [
          { label: 'The houses!', response: 'They are so cozy. I want one!' },
          { label: 'The roads.', response: 'Good for walking. Very practical!' },
          { label: 'The people.', response: 'Aww, that\'s so kind. We love you too!' },
          { label: 'Everything!', response: 'Same! It\'s all so pretty and pink.' },
        ],
      },
      {
        prompt: 'I have to go now. Bye!',
        options: [
          { label: 'Bye Stella!', response: 'Bye! Shine bright! ✨' },
          { label: 'See you!', response: 'See you around!' },
          { label: 'Take care!', response: 'You too! Bye!' },
          { label: 'Goodbye!', response: 'Goodbye! Come back soon!' },
        ],
      },
    ],
  },
  {
    id: 'npc3',
    name: 'Peach',
    emoji: '🍑',
    position: [18, 12],
    dialogue: [
      {
        prompt: 'Hello! You look sweet. Want to chat?',
        options: [
          { label: 'Yes please!', response: 'Yay! I love making new friends.' },
          { label: 'Just a little.', response: 'A little is perfect. Hi!' },
          { label: 'I was just passing by.', response: 'That\'s okay. Quick hi then!' },
          { label: 'Sure, you seem nice!', response: 'Thanks! You seem nice too!' },
        ],
      },
      {
        prompt: 'If you could have one superpower, what would it be?',
        options: [
          { label: 'Flying!', response: 'That would be so cool. I\'d fly everywhere!' },
          { label: 'Invisibility.', response: 'Ooh, sneaky. I like it!' },
          { label: 'Super speed.', response: 'You\'d finish exploring in a second!' },
          { label: 'Making people happy.', response: 'That\'s the sweetest answer. You already do that!' },
        ],
      },
      {
        prompt: 'Okay, I\'ll let you go explore. Bye!',
        options: [
          { label: 'Bye Peach!', response: 'Bye! Stay sweet! 🍑' },
          { label: 'Thanks for talking!', response: 'Anytime! Bye!' },
          { label: 'See you later!', response: 'See you! Bye bye!' },
          { label: 'Bye!', response: 'Bye! Have fun!' },
        ],
      },
    ],
  },
  {
    id: 'npc4',
    name: 'Bubble',
    emoji: '🫧',
    position: [5, 22],
    dialogue: [
      {
        prompt: 'Blub blub! I mean... hi! Do you like bubbles?',
        options: [
          { label: 'I love bubbles!', response: 'Yay! We\'re gonna get along great.' },
          { label: 'They\'re okay.', response: 'Okay is good. I\'ll take it!' },
          { label: 'Never thought about it.', response: 'Well, now you have. Hi!' },
          { label: 'You\'re cute!', response: 'No you! Thanks though. Blub!' },
        ],
      },
      {
        prompt: 'What do you think this place is missing?',
        options: [
          { label: 'More bubbles!', response: 'YES! You read my mind!' },
          { label: 'More colors.', response: 'Pink is nice but variety could be fun!' },
          { label: 'Nothing, it\'s perfect.', response: 'Aww, that made my day. Thank you!' },
          { label: 'A lake?', response: 'I could float there. Good idea!' },
        ],
      },
      {
        prompt: 'I\'m gonna go float somewhere. Bye!',
        options: [
          { label: 'Bye Bubble!', response: 'Bye! Stay floaty! 🫧' },
          { label: 'Have fun!', response: 'I will! You too! Bye!' },
          { label: 'See you!', response: 'See you! Blub!' },
          { label: 'Bye!', response: 'Bye bye!' },
        ],
      },
    ],
  },
  {
    id: 'npc5',
    name: 'Coco',
    emoji: '🐻',
    position: [22, 25],
    dialogue: [
      {
        prompt: 'Hey! I\'m Coco. Nice to meet you!',
        options: [
          { label: 'Nice to meet you too!', response: 'You seem really nice. Let\'s be friends!' },
          { label: 'Hi Coco!', response: 'Hi! Thanks for saying hi!' },
          { label: 'Hello!', response: 'Hello! Welcome to the neighborhood!' },
          { label: 'Hey Coco!', response: 'Hey! What\'s up? Good to see you!' },
        ],
      },
      {
        prompt: 'What\'s the best advice you\'ve ever gotten?',
        options: [
          { label: 'Be kind.', response: 'Always. Kindness costs nothing. I agree!' },
          { label: 'Have fun.', response: 'Life\'s short. Have fun. Yes!' },
          { label: 'Stay curious.', response: 'Curiosity leads to cool places. Like here!' },
          { label: 'Be yourself.', response: 'The best advice. You\'re doing great!' },
        ],
      },
      {
        prompt: 'Alright, I\'m off. Take care!',
        options: [
          { label: 'Bye Coco!', response: 'Bye! Hugs! 🐻' },
          { label: 'You too!', response: 'Thanks! Bye!' },
          { label: 'See you around!', response: 'See you! Bye!' },
          { label: 'Bye!', response: 'Bye bye! Stay awesome!' },
        ],
      },
    ],
  },
]
