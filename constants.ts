import { VerbRow, VocabularyQuestion, ChoiceQuestion, TextFillQuestion, StoryLine } from './types';

// --- Part A: Verbs ---
export const VERB_DATA: VerbRow[] = [
  { id: 1, chinese: '打', base: 'hit', past: 'hit', pastParticiple: 'hit', presentParticiple: 'hitting', hiddenFields: ['past', 'pastParticiple', 'presentParticiple'] },
  { id: 2, chinese: '受傷 / 使痛', base: 'hurt', past: 'hurt', pastParticiple: 'hurt', presentParticiple: 'hurting', hiddenFields: ['past', 'pastParticiple', 'presentParticiple'] },
  { id: 3, chinese: '知道', base: 'know', past: 'knew', pastParticiple: 'known', presentParticiple: 'knowing', hiddenFields: ['past', 'pastParticiple', 'presentParticiple'] },
  { id: 4, chinese: '保持', base: 'keep', past: 'kept', pastParticiple: 'kept', presentParticiple: 'keeping', hiddenFields: ['past', 'pastParticiple', 'presentParticiple'] },
  { id: 5, chinese: '握住 / 舉辦', base: 'hold', past: 'held', pastParticiple: 'held', presentParticiple: 'holding', hiddenFields: ['past', 'pastParticiple', 'presentParticiple'] },
];

// --- Part B: Vocabulary ---
export const VOCAB_OPTIONS = ['airport', 'factory', 'food online', 'shopping centre', 'use smartphone', 'air conditioners'];
export const VOCAB_QUESTIONS: VocabularyQuestion[] = [
  { id: 1, sentencePart1: 'We went to the', sentencePart2: 'to buy new clothes for school.', answer: 'shopping centre' },
  { id: 2, sentencePart1: 'My mom likes to buy', sentencePart2: 'because it is easy and fast.', answer: 'food online' },
  { id: 3, sentencePart1: 'People take a plane to other countries from an', sentencePart2: '.', answer: 'airport' },
  { id: 4, sentencePart1: 'There weren’t any', sentencePart2: 'so it was hot.', answer: 'air conditioners' },
  { id: 5, sentencePart1: 'Many toys are made in a', sentencePart2: '.', answer: 'factory' },
  { id: 6, sentencePart1: 'I like to', sentencePart2: 'to play games and chat with friends.', answer: 'use smartphone' },
  { id: 7, sentencePart1: 'Please turn on the', sentencePart2: ', the room is very warm.', answer: 'air conditioners' },
  { id: 8, sentencePart1: 'My uncle works at the', sentencePart2: ', he helps fix the big machines.', answer: 'factory' },
  { id: 9, sentencePart1: 'We arrived at the', sentencePart2: 'two hours before our flight.', answer: 'airport' },
  { id: 10, sentencePart1: 'Let’s meet at the', sentencePart2: 'to watch the new movie.', answer: 'shopping centre' },
];

// --- Part E: Pronouns (anybody, nobody, everybody) ---
export const PRONOUN_QUESTIONS: ChoiceQuestion[] = [
  { id: 1, question: "Did ___ use electronic money 50 years ago?", answer: "anybody" },
  { id: 2, question: "___ uses smartphones today.", answer: "Everybody" },
  { id: 3, question: "___ drove electric cars 100 years ago.", answer: "Nobody" },
  { id: 4, question: "___ lived a simple life in the past!", answer: "Everybody" },
  { id: 5, question: "Does ___ want to try this new game with me?", answer: "anybody" },
  { id: 6, question: "Can ___ hear me?", answer: "anybody" },
  { id: 7, question: "___ was happy at the party.", answer: "Everybody" },
  { id: 8, question: "There is ___ in the room, it's empty.", answer: "nobody" },
  { id: 9, question: "Does ___ have a pencil I can borrow?", answer: "anybody" },
  { id: 10, question: "___ likes getting sick.", answer: "Nobody" },
  { id: 11, question: "___ needs water to live.", answer: "Everybody" },
  { id: 12, question: "Is ___ home?", answer: "anybody" },
  { id: 13, question: "___ knew the answer, it was too hard.", answer: "Nobody" },
  { id: 14, question: "___ clapped their hands after the show.", answer: "Everybody" },
  { id: 15, question: "Did ___ call you yesterday?", answer: "anybody" },
];

// --- Part F: Existence (was, wasn't, were, weren't) ---
export const EXISTENCE_QUESTIONS: ChoiceQuestion[] = [
  { id: 1, hint: 'check', question: "There ___ a big fun fair in the park last Sunday.", answer: "was" },
  { id: 2, hint: 'cross', question: "There ___ a shop in my village 50 years ago.", answer: "wasn't" },
  { id: 3, hint: 'cross', question: "There ___ any smartphones 80 years ago.", answer: "weren't" },
  { id: 4, hint: 'check', question: "There ___ many students at school yesterday.", answer: "were" },
  { id: 5, hint: 'check', question: "There ___ a Christmas tree in the classroom last month.", answer: "was" },
  { id: 6, hint: 'check', question: "There ___ a cute dog in the park.", answer: "was" },
  { id: 7, hint: 'cross', question: "There ___ any clouds in the sky yesterday.", answer: "weren't" },
  { id: 8, hint: 'check', question: "There ___ two cakes on the table.", answer: "were" },
  { id: 9, hint: 'cross', question: "There ___ a computer in the room.", answer: "wasn't" },
  { id: 10, hint: 'check', question: "There ___ a beautiful rainbow.", answer: "was" },
  { id: 11, hint: 'cross', question: "There ___ any flowers in the garden in winter.", answer: "weren't" },
  { id: 12, hint: 'check', question: "There ___ five birds on the tree.", answer: "were" },
  { id: 13, hint: 'cross', question: "There ___ any milk left in the fridge.", answer: "wasn't" },
  { id: 14, hint: 'check', question: "There ___ a big storm last night.", answer: "was" },
  { id: 15, hint: 'cross', question: "There ___ many people at the beach.", answer: "weren't" },
];

// --- Part H: Simple Past (Text Input) - REVISED SUBJECTS/OBJECTS ---
export const SIMPLE_PAST_QUESTIONS: TextFillQuestion[] = [
  { id: 1, parts: ["The dog ", " (not hit) the cat."], answers: ["didn't hit"], verbPrompt: "not hit" },
  { id: 2, parts: ["My father ", " (know) the truth immediately."], answers: ["knew"], verbPrompt: "know" },
  { id: 3, parts: ["He ", " (not hold) the umbrella yesterday."], answers: ["didn't hold"], verbPrompt: "not hold" },
  { id: 4, parts: ["", " we ", " (do) the dishes?"], answers: ["Did", "do"], verbPrompt: "do" },
  { id: 5, parts: ["They ", " (have) pasta for dinner."], answers: ["had"], verbPrompt: "have" },
  // Extra
  { id: 6, parts: ["Alice ", " (go) to the library."], answers: ["went"], verbPrompt: "go" },
  { id: 7, parts: ["The boy ", " (not buy) the toy car."], answers: ["didn't buy"], verbPrompt: "not buy" },
  { id: 8, parts: ["", " the cat ", " (see) the mouse?"], answers: ["Did", "see"], verbPrompt: "see" },
  { id: 9, parts: ["The athlete ", " (run) very fast."], answers: ["ran"], verbPrompt: "run" },
  { id: 10, parts: ["The baby ", " (sleep) all night."], answers: ["slept"], verbPrompt: "sleep" },
  { id: 11, parts: ["She ", " (write) an email to her boss."], answers: ["wrote"], verbPrompt: "write" },
  { id: 12, parts: ["", " Tom ", " (play) basketball?"], answers: ["Did", "play"], verbPrompt: "play" },
  { id: 13, parts: ["The plane ", " (fly) above the clouds."], answers: ["flew"], verbPrompt: "fly" },
  { id: 14, parts: ["We ", " (not eat) the cake."], answers: ["didn't eat"], verbPrompt: "not eat" },
  { id: 15, parts: ["The kids ", " (drink) orange juice."], answers: ["drank"], verbPrompt: "drink" },
];

// --- Bonus: To Be (REVISED SUBJECTS/OBJECTS) ---
export const BONUS_QUESTIONS: ChoiceQuestion[] = [
  { id: 1, question: "The moon ___ shining last night.", answer: "was" },
  { id: 2, question: "The babies ___ sleeping now.", answer: "are" },
  { id: 3, question: "She ___ so cute when she was young.", answer: "was" },
  { id: 4, question: "His dad ___ a teacher five years ago.", answer: "was" },
  { id: 5, question: "We ___ playing football now.", answer: "are" },
  // Extra
  { id: 6, question: "I ___ very hungry right now.", answer: "am" },
  { id: 7, question: "The students ___ tired yesterday.", answer: "were" },
  { id: 8, question: "This ___ a beautiful flower.", answer: "is" },
  { id: 9, question: "You ___ my best friend.", answer: "are" },
  { id: 10, question: "The sky ___ grey last week.", answer: "was" },
  { id: 11, question: "The birds ___ singing today.", answer: "are" },
  { id: 12, question: "You ___ very fast.", answer: "are" },
  { id: 13, question: "It ___ sunny yesterday.", answer: "was" },
  { id: 14, question: "I ___ at the park last Sunday.", answer: "was" },
  { id: 15, question: "The cookies ___ delicious.", answer: "are" },
];

// --- Story Data (UPDATED: More natural dialogue) ---
export const STORY_DATA: StoryLine[] = [
  { id: 1, speaker: 'Alice', textParts: ["Grandpa, ", " there ", " computer room in your old school?"], answers: ["was", "a"], hints: ["be", "a / an / any"] },
  { id: 2, speaker: 'Grandpa', textParts: ["No, there ", ". We read paper books!"], answers: ["wasn't"], hints: ["be"] },
  { id: 3, speaker: 'Alice', textParts: ["How ", " you ", " your homework?"], answers: ["did", "do"], hints: ["do", "do"] },
  { id: 4, speaker: 'Grandpa', textParts: ["We wrote on paper. ", " had tablets back then."], answers: ["Nobody"], hints: ["anybody / nobody / everybody"] },
  { id: 5, speaker: 'Alice', textParts: ["", " ", " bring mobile phones?"], answers: ["Did", "anybody"], hints: ["do", "anybody / nobody / everybody"] },
  { id: 6, speaker: 'Grandpa', textParts: ["No, ", " had phones. We talked face-to-face."], answers: ["nobody"], hints: ["anybody / nobody / everybody"] },
  { id: 7, speaker: 'Alice', textParts: ["", " there ", " air conditioners?"], answers: ["Were", "any"], hints: ["be", "a / an / any"] },
  { id: 8, speaker: 'Grandpa', textParts: ["No, there ", ". It was very hot!"], answers: ["weren't"], hints: ["be"] },
  { id: 9, speaker: 'Alice', textParts: ["Did students ", " electric fans?"], answers: ["have"], hints: ["have"] },
  { id: 10, speaker: 'Grandpa', textParts: ["No, ", " used hand fans!"], answers: ["everybody"], hints: ["anybody / nobody / everybody"] },
];