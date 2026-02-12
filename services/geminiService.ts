
import { Vibe, Gift, Language } from "../types";

const MESSAGES: Record<Language, Record<Vibe, string[]>> = {
  EN: {
    ROMANTIC: [
      "My dearest {name}, resistance is futile. My heart is yours forever! ❤️",
      "{name}, you are the main character in my favorite love story. ✨",
      "You're not just my Valentine, you're my absolute everything. 🌹",
      "Every breath I take is filled with the thought of you, {name}. 💖",
      "Falling for you was the best decision my heart ever made. 🥰",
      "Your love is the anchor that keeps me steady in the storm. ⚓❤️",
      "To the world you may be one person, but to me you are the world. 🌍",
      "My love for you grows stronger with every heartbeat, {name}. 💓",
      "You are my dream come true, and I never want to wake up. 💤✨",
      "I'm sending you this {gift} as a small token of my infinite love. 🎁"
    ],
    FUNNY: [
      "Hey {name}! You're so irresistible that even my cats are jealous! 🐱😂",
      "I'd choose you over a 100% charged battery. That's real power! 🔋❤️",
      "Are you a magician? Because whenever I look at you, everyone else disappears! 🎩✨",
      "I love you more than pizza, and that's saying a lot! 🍕❤️",
      "You're the 'cheese' to my macaroni, {name}. Stay delicious! 🧀",
      "I'm not a photographer, but I can definitely picture us together. 📸",
      "Do you have a map? I just got lost in your eyes... again. 🗺️😍",
      "I'd share my last fry with you. If that isn't true love, I don't know what is. 🍟",
      "You must be tired because you've been running through my mind all day! 🏃‍♂️",
      "Sending you this {gift} because you're the only one I'd share my snacks with. 🍿"
    ],
    NERDY: [
      "You're the root access to my soul, {name}. Unstoppable love! 💻✨",
      "Our chemistry is so strong it violates the laws of physics. 🤓",
      "You had me at 'Hello World', {name}. 🌐❤️",
      "You're the CSS to my HTML. You make my life beautiful. 🎨💻",
      "My love for you is like a Pi: infinite and non-repeating. 🥧♾️",
      "Are you made of Copper and Tellurium? Because you're CuTe! 🧪",
      "You're the semicolon to my code. Without you, nothing works. ;",
      "My heart beats in binary, and it's all 1s for you. 010101! 🤖",
      "You're the legendary item I've been grinding for my whole life. 🎮💎",
      "Sending you this {gift} to upgrade our connection to 5G speeds! 📶"
    ],
    POETIC: [
      "In the symphony of existence, you are the most captivating note. 🎶",
      "Your love is the sunrise that ends my every winter. 🌅",
      "Like a moth to a flame, I am drawn to your ethereal light, {name}. 🦋",
      "Your laughter is the melody my soul has been searching for. 🎵",
      "Stars pale in comparison to the sparkle in your eyes. ⭐✨",
      "Our love is a poem written by the universe itself. 📜🌌",
      "In the garden of my life, you are the rarest bloom. 🌸",
      "Time stands still when I am held in your gaze, {name}. ⏳❤️",
      "Your spirit is a wild ocean, and I am happy to drown in it. 🌊",
      "This {gift} is but a shadow compared to the light you bring me. 🕯️"
    ]
  },
  FR: {
    ROMANTIC: [
      "Mon amour {name}, toute résistance est inutile. Mon cœur t'appartient ! ❤️",
      "{name}, tu es la lumière de ma vie, plus éclatante que mille étoiles. ✨",
      "Tu n'es pas seulement ma Valentine, tu es mon univers tout entier. 🌹",
      "Chaque battement de mon cœur prononce ton nom, {name}. 💓",
      "T'aimer est la plus belle aventure que j'ai jamais vécue. 🥰",
      "Ton amour est l'ancre qui me garde serein dans la tempête. ⚓❤️",
      "Pour le monde tu es quelqu'un, mais pour moi tu es le monde. 🌍",
      "Mon amour pour toi grandit à chaque seconde, {name}. ⏳❤️",
      "Tu es mon rêve devenu réalité, et je ne veux plus jamais me réveiller. 💤✨",
      "Je t'envoie ces {gift} comme un humble témoignage de mon amour infini. 🎁"
    ],
    FUNNY: [
      "Salut {name} ! Tu es si irrésistible que même ma pizza a fondu de jalousie ! 🍕😂",
      "Je t'aime plus que le bouton 'Skip Ad' sur YouTube ! ❤️",
      "Tu es le 'fromage' de mes pâtes, {name}. Reste délicieuse ! 🧀",
      "Je ne suis pas photographe, mais je nous imagine très bien ensemble. 📸",
      "Tu as un plan ? Je me suis encore perdu dans tes yeux. 🗺️😍",
      "Je partagerais ma dernière frite avec toi. Si ça c'est pas de l'amour... 🍟",
      "Ton père est un voleur, il a volé toutes les étoiles pour les mettre dans tes yeux. ✨",
      "Tu dois être fatiguée, car tu as couru dans ma tête toute la journée ! 🏃‍♂️",
      "Es-tu un magicien ? Car dès que je te vois, tout le monde disparaît ! 🎩✨",
      "Je t'envoie ces {gift} parce que tu es la seule personne avec qui je partage mes snacks. 🍿"
    ],
    NERDY: [
      "Tu es le code source de mon bonheur, {name}. Amour illimité ! 💻✨",
      "Notre amour est plus puissant qu'un supercalculateur. 🤓",
      "Tu m'as eu au premier 'Hello World', {name}. 🌐❤️",
      "Tu es le CSS de mon HTML. Tu rends ma vie magnifique. 🎨💻",
      "Mon amour pour toi est comme Pi : infini et sans répétition. 🥧♾️",
      "Es-tu faite de Cuivre et de Tellure ? Parce que tu es CuTe ! 🧪",
      "Tu es le point-virgule de mon code. Sans toi, rien ne fonctionne. ;",
      "Mon cœur bat en binaire, et il n'y a que des 1 pour toi. 010101! 🤖",
      "Tu es l'item légendaire que je cherche depuis toujours. 🎮💎",
      "Je t'envoie ces {gift} pour booster notre connexion en 5G ! 📶"
    ],
    POETIC: [
      "Dans la poésie de la vie, tu es le plus beau des vers. 🎶",
      "Ton regard est un océan où j'aime me perdre sans fin. 🌊",
      "Ton sourire est l'aube qui met fin à mes hivers, {name}. 🌅",
      "Ton rire est la mélodie que mon âme a toujours cherchée. 🎵",
      "Les étoiles ne sont que des ombres face à l'éclat de tes yeux. ⭐✨",
      "Notre amour est un poème écrit par l'univers lui-même. 📜🌌",
      "Dans le jardin de mon existence, tu es la fleur la plus rare. 🌸",
      "Le temps s'arrête quand je suis plongé dans ton regard, {name}. ⏳❤️",
      "Ton âme est un océan sauvage, et je suis ravi d'y sombrer. 🌊",
      "Ces {gift} ne sont qu'une étincelle face à la lumière que tu m'apportes. 🕯️"
    ]
  }
};

export const generateSweetMessage = async (name: string, vibe: Vibe, gift: Gift, lang: Language): Promise<string> => {
  // Simulate a small loading delay for "enchantment" feel
  await new Promise(resolve => setTimeout(resolve, 1500));

  const giftTranslations: Record<Language, Record<Gift, string>> = {
    EN: { FLOWERS: 'flowers', KITTEN: 'kitten', PIZZA: 'pizza', MUSIC: 'music' },
    FR: { FLOWERS: 'fleurs', KITTEN: 'chaton', PIZZA: 'pizza', MUSIC: 'musique' }
  };

  const giftStr = giftTranslations[lang][gift];
  const possibleMessages = MESSAGES[lang][vibe];
  const randomMessage = possibleMessages[Math.floor(Math.random() * possibleMessages.length)];

  return randomMessage.replace('{name}', name).replace('{gift}', giftStr);
};
