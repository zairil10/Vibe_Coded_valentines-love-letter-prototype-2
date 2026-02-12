
import React, { useState, useEffect, useRef } from 'react';
import { 
  Heart, Rocket, Quote, Languages, Cat, Sparkles, Volume2, VolumeX, Wand2, Star, Zap, Ghost
} from 'lucide-react';
import { generateSweetMessage } from './services/geminiService';
import HeartCanvas from './components/HeartCanvas';
import Confetti from './components/Confetti';
import { Vibe, Gift, AppState, Language } from './types';

const App: React.FC = () => {
  const [step, setStep] = useState<AppState>('IDLE');
  const [language, setLanguage] = useState<Language>('EN');
  const [targetName, setTargetName] = useState('');
  const [selectedVibe, setSelectedVibe] = useState<Vibe>('ROMANTIC');
  const [selectedGift, setSelectedGift] = useState<Gift>('FLOWERS');
  const [noCount, setNoCount] = useState(0);
  const [noButtonPos, setNoButtonPos] = useState({ x: 0, y: 0 });
  const [sweetMessage, setSweetMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [charmLevel, setCharmLevel] = useState(0);
  const [quizStep, setQuizStep] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isIrresistible, setIsIrresistible] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const translations = {
    EN: {
      title: "Irresistible Love",
      subtitle: "Preparing a charm you can't refuse...",
      inputPlaceholder: "Enter your name, beautiful... ❤️",
      startButton: "Begin The Enchantment",
      compatibility: "Calibrating Charm...",
      match: "Charm Level: UNSTOPPABLE! ✨",
      chooseMood: `Choose your Irresistible Aura for ${targetName}:`,
      pickGift: "Select a token of your affection...",
      asking: `Dear ${targetName}, I have cast a spell on you... Will you be my Valentine? 🌹`,
      yes: "YES, ABSOLUTELY! 😍",
      no: "No",
      cantFind: "Is your heart guiding you to the right button? ❤️",
      successTitle: "Soulbound Forever! ♾️",
      thinking: "Summoning the spirits of love...",
      giftSent: "Aura Captured",
      loveLevel: "Irresistibility",
      infinity: "MAXIMUM",
      spreadMore: "Enchant another?",
      noPhrases: [
        "No", "Are you sure? 🥺", "Look at this kitten! 🐱", "I'll be sad... 💔", 
        "Don't do it! ✨", "The kitten is crying! 😿", "My heart is breaking! 🥀", 
        "You're breaking the internet! 🌐", "Okay, this is getting awkward... 😂",
        "Fine, I'll send more cats! 🐾", "Error: Heart Overflow! ❤️"
      ],
      quiz: [
        { q: "If we were in a movie, it would be...", options: ["A Grand Romance 💃", "A Fun Adventure 🎢", "A Sci-Fi Epic 🚀", "A Dreamy Indie ☁️"] },
        { q: "Our energy together is...", options: ["Electric ⚡", "Cozy 🔥", "Pure Chaos 🌪️", "Deep Peace 🌊"] },
        { q: "How much power do I have over you?", options: ["A Tiny Bit...", "A Huge Amount!", "Total Control! 👑", "I'm already yours! ❤️"] }
      ],
      vibes: { ROMANTIC: 'MESMERIZING', FUNNY: 'MAGNETIC', NERDY: 'BRILLIANT', POETIC: 'ETHEREAL' },
      gifts: { FLOWERS: 'ROSE GARDEN', KITTEN: 'FLUFFY LOVE', PIZZA: 'FEAST OF HEARTS', MUSIC: 'SOUL SERENADE' }
    },
    FR: {
      title: "Amour Irrésistible",
      subtitle: "Préparation d'un charme inoubliable...",
      inputPlaceholder: "Entre ton nom, merveille... ❤️",
      startButton: "Commencer l'Enchantement",
      compatibility: "Calibrage du Charme...",
      match: "Niveau de Charme : IMBATTABLE ! ✨",
      chooseMood: `Choisis ton Aura Irrésistible pour ${targetName} :`,
      pickGift: "Sélectionne un gage d'affection...",
      asking: `Cher/Chère ${targetName}, je t'ai jeté un sort... Veux-tu être ma Valentine ? 🌹`,
      yes: "OUI, ÉVIDEMMENT ! 😍",
      no: "Non",
      cantFind: "Ton cœur te guide-t-il vers le bon bouton ? ❤️",
      successTitle: "Âmes Sœurs pour Toujours ! ♾️",
      thinking: "Préparation des mots parfaits...",
      giftSent: "Aura Capturée",
      loveLevel: "Irrésistibilité",
      infinity: "MAXIMUM",
      spreadMore: "Enchanter quelqu'un d'autre ?",
      noPhrases: [
        "Non", "Tu es sûr(e) ? 🥺", "Regarde ce chaton ! 🐱", "Je vais être triste... 💔",
        "Ne fais pas ça ! ✨", "Le chaton pleure ! 😿", "Mon cœur se brise ! 🥀",
        "Tu casses internet ! 🌐", "Ok, ça devient gênant... 😂",
        "C'est bon, j'envoie plus de chats ! 🐾", "Erreur : Cœur en trop plein ! ❤️"
      ],
      quiz: [
        { q: "Si on était dans un film, ce serait...", options: ["Une Grande Romance 💃", "Une Aventure Folle 🎢", "Une Épopée Sci-Fi 🚀", "Un Indé de Rêve ☁️"] },
        { q: "Notre énergie ensemble est...", options: ["Électrique ⚡", "Chaleureuse 🔥", "Pur Chaos 🌪️", "Paix Profonde 🌊"] },
        { q: "Quel pouvoir ai-je sur toi ?", options: ["Un tout petit peu...", "Énormément !", "Contrôle Total ! 👑", "Je suis déjà à toi ! ❤️"] }
      ],
      vibes: { ROMANTIC: 'FASCINANT', FUNNY: 'MAGNÉTIQUE', NERDY: 'BRILLANT', POETIC: 'ÉTHÉRÉ' },
      gifts: { FLOWERS: 'JARDIN DE ROSES', KITTEN: 'AMOUR DUVEUTEUX', PIZZA: 'FESTIN DES CŒURS', MUSIC: 'SÉRÉNADE DE L\'ÂME' }
    }
  };

  const t = translations[language];

  useEffect(() => {
    if (step === 'SUCCESS' && targetName) {
      const updateMsg = async () => {
        setIsLoading(true);
        const msg = await generateSweetMessage(targetName, selectedVibe, selectedGift, language);
        setSweetMessage(msg);
        setIsLoading(false);
      };
      updateMsg();
    }
  }, [language, step, targetName, selectedVibe, selectedGift]);

  useEffect(() => {
    if (step === 'SUCCESS' && audioRef.current) {
      audioRef.current.play().catch(() => {});
    } else if (step === 'IDLE' && audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [step]);

  const handleStart = (e: React.FormEvent) => {
    e.preventDefault();
    if (targetName.trim()) setStep('QUIZ');
  };

  const handleQuizAnswer = () => {
    if (quizStep < t.quiz.length - 1) {
      setQuizStep(prev => prev + 1);
      setCharmLevel(Math.floor(((quizStep + 1) / t.quiz.length) * 100));
    } else {
      setCharmLevel(100);
      setIsIrresistible(true);
      setTimeout(() => setStep('CHOOSING_VIBE'), 800);
    }
  };

  const teleportNo = () => {
    setNoCount(prev => prev + 1);
    const x = Math.random() * (window.innerWidth - 200) + 100;
    const y = Math.random() * (window.innerHeight - 200) + 100;
    setNoButtonPos({ x, y });
  };

  const handleYes = () => {
    setStep('SUCCESS');
  };

  const yesButtonScale = Math.min(5, 1 + (noCount * 0.4));
  const yesButtonFontSize = Math.min(90, 20 + noCount * 6);

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 transition-colors duration-1000 ${isIrresistible ? 'bg-[#ffebf0]' : 'bg-[#fff5f7]'} relative overflow-hidden`}>
      <HeartCanvas />
      
      <audio ref={audioRef} src="https://assets.mixkit.co/music/preview/mixkit-romantic-slow-piano-162.mp3" loop muted={isMuted} />

      {/* Iridescent Glow Particles */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-rose-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700" />
      </div>

      {/* Floating UI Elements */}
      <div className="fixed top-6 right-6 z-[100] flex gap-3 slide-up">
        <button onClick={() => setIsMuted(!isMuted)} className="glass p-3 rounded-full flex items-center justify-center text-rose-500 shadow-xl hover:scale-110 transition-all">
          {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
        </button>
        <button onClick={() => setLanguage(l => l === 'EN' ? 'FR' : 'EN')} className="glass px-5 py-2 rounded-full flex items-center gap-2 text-rose-500 font-bold shadow-xl hover:scale-110 transition-all">
          <Languages size={18} />
          <span>{language}</span>
        </button>
      </div>

      {/* Irresistible No Button */}
      {step === 'ASKING' && noCount > 0 && (
        <button 
          onMouseEnter={teleportNo}
          onClick={teleportNo}
          className="fixed px-8 py-3 glass text-rose-400 rounded-full font-bold shadow-2xl border-2 border-pink-200 transition-all duration-300 z-[100] active:scale-90 flex items-center gap-2"
          style={{ left: `${noButtonPos.x}px`, top: `${noButtonPos.y}px`, transform: 'translate(-50%, -50%)' }}
        >
          {noCount > 5 && <Ghost size={18} className="animate-bounce" />}
          {t.noPhrases[Math.min(noCount, t.noPhrases.length - 1)]}
          {noCount < 6 && <Cat size={18} className="animate-pulse" />}
        </button>
      )}

      {step === 'IDLE' && (
        <div className="glass p-12 rounded-[4rem] shadow-[0_30px_100px_rgba(255,105,180,0.4)] w-full max-w-md text-center slide-up shimmer">
          <div className="bg-white p-6 rounded-full inline-block shadow-2xl mb-8 heartbeat-animation">
            <Heart size={80} className="text-rose-500 fill-rose-500" />
          </div>
          <h1 className="text-5xl font-bold text-rose-600 mb-2 font-script tracking-tight">{t.title}</h1>
          <p className="text-rose-400 mb-10 font-medium tracking-wide">{t.subtitle}</p>
          <form onSubmit={handleStart} className="space-y-8">
            <div className="relative group">
              <input
                type="text"
                placeholder={t.inputPlaceholder}
                className="w-full px-10 py-5 rounded-full border-4 border-pink-100 focus:border-rose-400 focus:outline-none text-center text-2xl transition-all glass hover:bg-white/50 relative z-[200]"
                value={targetName}
                onChange={(e) => setTargetName(e.target.value)}
                required
              />
              <Sparkles className="absolute right-6 top-1/2 -translate-y-1/2 text-rose-300 group-hover:text-rose-500 transition-colors" />
            </div>
            <button className="w-full bg-gradient-to-r from-rose-500 to-pink-500 text-white font-black py-6 rounded-full hover:scale-105 active:scale-95 transition-all shadow-[0_20px_50px_rgba(244,63,94,0.3)] text-xl flex items-center justify-center gap-3">
              {t.startButton} <Zap size={24} className="animate-pulse" />
            </button>
          </form>
        </div>
      )}

      {step === 'QUIZ' && (
        <div className="glass p-12 rounded-[4rem] shadow-2xl w-full max-w-2xl text-center border-4 border-pink-100 slide-up">
           <div className="mb-10 flex justify-between items-center px-4">
             <div className="flex items-center gap-3">
               <div className={`p-3 rounded-full ${charmLevel === 100 ? 'bg-yellow-400' : 'bg-rose-100'} transition-colors duration-500`}>
                 <Star className={charmLevel === 100 ? 'text-white' : 'text-rose-400'} fill={charmLevel === 100 ? 'white' : 'none'} />
               </div>
               <span className="text-rose-500 font-black text-xl">{charmLevel}% CHARM</span>
             </div>
             <Cat size={40} className="text-rose-300 float-animation" />
           </div>
          <h2 className="text-4xl font-bold text-rose-600 mb-12 font-script leading-tight">{t.quiz[quizStep].q}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {t.quiz[quizStep].options.map((opt, i) => (
              <button
                key={i}
                onClick={handleQuizAnswer}
                className="p-8 rounded-[2rem] bg-white/50 border-2 border-pink-100 hover:border-rose-400 hover:bg-rose-50 hover:scale-[1.02] transition-all font-bold text-gray-700 shadow-lg text-xl"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'CHOOSING_VIBE' && (
        <div className="glass p-12 rounded-[4rem] shadow-2xl w-full max-w-3xl text-center slide-up">
          <div className="mb-4 inline-flex items-center gap-2 bg-rose-500 text-white px-6 py-2 rounded-full font-black text-sm tracking-widest uppercase">
            {t.match}
          </div>
          <h2 className="text-4xl font-bold text-rose-600 mb-10 font-script">{t.chooseMood}</h2>
          <div className="grid grid-cols-2 gap-6">
            {(['ROMANTIC', 'FUNNY', 'NERDY', 'POETIC'] as Vibe[]).map(v => (
              <button
                key={v}
                onClick={() => { setSelectedVibe(v); setStep('CHOOSING_GIFT'); }}
                className="group relative p-10 rounded-[2.5rem] bg-white/60 border-4 border-transparent hover:border-rose-400 hover:bg-white transition-all transform hover:scale-105 shadow-xl flex flex-col items-center gap-4 overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-rose-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                <Wand2 className="text-rose-300 group-hover:text-rose-500 group-hover:rotate-12 transition-all" size={32} />
                <span className="font-black text-2xl tracking-tight text-rose-700">{t.vibes[v]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'CHOOSING_GIFT' && (
        <div className="glass p-12 rounded-[4rem] shadow-2xl w-full max-w-3xl text-center slide-up">
          <h2 className="text-4xl font-bold text-rose-600 mb-12 font-script">{t.pickGift}</h2>
          <div className="grid grid-cols-2 gap-6">
            {(['FLOWERS', 'KITTEN', 'PIZZA', 'MUSIC'] as Gift[]).map(g => (
              <button
                key={g}
                onClick={() => { setSelectedGift(g); setStep('ASKING'); }}
                className="p-10 rounded-[2.5rem] bg-rose-50/50 text-rose-600 border-4 border-white hover:border-rose-400 hover:bg-white transition-all transform hover:scale-105 shadow-xl flex flex-col items-center gap-4"
              >
                {g === 'KITTEN' && <Cat size={40} className="text-rose-400" />}
                {g === 'FLOWERS' && <Sparkles size={40} className="text-rose-400" />}
                <span className="font-black text-2xl tracking-tighter">{t.gifts[g]}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {step === 'ASKING' && (
        <div className="glass p-16 rounded-[5rem] shadow-[0_40px_120px_rgba(244,63,94,0.3)] w-full max-w-3xl text-center slide-up relative">
          <div className="absolute -top-10 -right-10 bg-rose-600 text-white p-6 rounded-full shadow-2xl rotate-12 glow-effect">
            <Heart size={32} fill="white" />
          </div>
          <div className="mb-12 relative inline-block">
            <img src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExOHpmeXpsMnR4YmZzZzJ3YmZzZzJ3YmZzZzJ3YmZzZzJ3YmZzZyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/c76IJLufpN2GULPMEn/giphy.gif" alt="Irresistible Cat" className="rounded-[3rem] h-64 w-64 object-cover shadow-2xl border-8 border-white glow-effect" />
            {noCount > 0 && <div className="absolute -bottom-6 -right-6 bg-white p-3 rounded-2xl shadow-lg border-2 border-pink-100 flex items-center gap-2"><Cat size={20} className="text-rose-400" /> <span className="text-xs font-bold text-rose-500">Wait... please?</span></div>}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-rose-600 mb-20 font-script leading-tight px-4 slide-up">
            {t.asking}
          </h1>
          <div className="flex flex-col items-center justify-center gap-16">
            <button 
              onClick={() => { handleYes(); }} 
              className="bg-rose-500 text-white font-black rounded-full shadow-[0_20px_60px_rgba(244,63,94,0.5)] transition-all transform hover:scale-110 active:scale-90 group flex items-center justify-center gap-6 shimmer glow-effect" 
              style={{ scale: yesButtonScale, fontSize: `${yesButtonFontSize}px`, padding: `${yesButtonFontSize/1.2}px ${yesButtonFontSize * 2}px` }}
            >
              {t.yes} <Heart className="fill-white animate-bounce" size={Math.min(50, yesButtonFontSize + 10)} />
            </button>
            {noCount === 0 && (
              <button onMouseEnter={teleportNo} onClick={teleportNo} className="px-12 py-5 bg-white/50 text-gray-400 rounded-full font-bold hover:bg-white hover:text-rose-400 transition-all border-2 border-transparent hover:border-rose-100">
                {t.no}
              </button>
            )}
            {noCount > 0 && (
              <div className="text-rose-300 font-bold animate-pulse text-lg flex items-center gap-2">
                <Sparkles size={20} /> {t.cantFind}
              </div>
            )}
          </div>
        </div>
      )}

      {step === 'SUCCESS' && (
        <div className="glass p-16 rounded-[5rem] shadow-[0_0_150px_rgba(255,105,180,0.6)] w-full max-w-3xl text-center slide-up relative shimmer">
          <Confetti />
          <div className="absolute -top-12 -left-12 bg-rose-600 text-white px-10 py-6 rounded-[2rem] rotate-[-15deg] font-black shadow-[0_20px_50px_rgba(244,63,94,0.4)] text-3xl border-4 border-white animate-bounce flex items-center gap-3">
            VICTORY! <Zap size={32} />
          </div>
          <div className="mb-12 slide-up">
            <Heart size={120} className="text-rose-600 fill-rose-600 heartbeat-animation mx-auto" />
          </div>
          <h1 className="text-7xl font-bold text-rose-600 mb-10 font-script leading-none slide-up">{t.successTitle}</h1>
          <div className="bg-white/60 p-10 rounded-[3rem] border-4 border-dashed border-rose-300 italic text-gray-900 shadow-inner mb-12 relative slide-up overflow-hidden min-h-[200px] flex items-center justify-center">
            <Quote className="absolute -top-4 -left-4 text-rose-300 opacity-50" size={60} />
            {isLoading ? (
              <div className="flex flex-col items-center gap-4">
                <Cat size={40} className="text-rose-400 animate-spin" />
                <p className="text-rose-400 font-black animate-pulse text-2xl">{t.thinking}</p>
              </div>
            ) : (
              <p className="text-3xl md:text-4xl leading-relaxed text-rose-900 font-bold font-script transition-all duration-700">"{sweetMessage}"</p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-6 mb-12 slide-up">
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-rose-100 flex flex-col items-center shadow-lg hover:rotate-2 transition-transform">
              <span className="text-sm text-rose-400 font-black uppercase tracking-[0.2em] mb-2">{t.giftSent}</span>
              <span className="font-bold text-rose-700 text-2xl">{t.gifts[selectedGift]}</span>
            </div>
            <div className="bg-white p-8 rounded-[2.5rem] border-2 border-rose-100 flex flex-col items-center shadow-lg hover:-rotate-2 transition-transform">
              <span className="text-sm text-rose-400 font-black uppercase tracking-[0.2em] mb-2">{t.loveLevel}</span>
              <span className="font-bold text-rose-700 text-2xl animate-pulse">{t.infinity}</span>
            </div>
          </div>
          <button 
            onClick={() => { setStep('IDLE'); setNoCount(0); setTargetName(''); setSweetMessage(''); setQuizStep(0); setCharmLevel(0); setIsIrresistible(false); }} 
            className="text-rose-400 hover:text-rose-600 font-black underline text-lg tracking-tight transition-colors flex items-center justify-center gap-2 mx-auto"
          >
            <Sparkles size={20} /> {t.spreadMore}
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
