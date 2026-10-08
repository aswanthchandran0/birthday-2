import { useState } from 'react';
import { motion } from 'framer-motion';

export default function SurprisePage({ onNextPage }) {
  const [step, setStep] = useState(1);
  const [noPosition, setNoPosition] = useState({ x: 0, y: 0 });

  const moveNoButton = () => {
    const randomX = (Math.random() - 0.5) * 400;
    const randomY = (Math.random() - 0.5) * 300;
    setNoPosition({ x: randomX, y: randomY });
  };

  const balloons = [...Array(12)].map((_, i) => ({
    id: i,
    color: ['#FF5E5E', '#FFD166', '#06D6A0', '#118AB2', '#EF476F', '#F78C6B', '#9D4EDD'][Math.floor(Math.random() * 7)],
    left: Math.random() * 100,
    delay: Math.random() * 2,
    duration: Math.random() * 5 + 8,
    size: Math.random() * 30 + 30,
  }));

  return (
    <div className={`relative flex min-h-screen items-center justify-center overflow-hidden transition-colors duration-1000 ${step === 5 ? 'bg-black' : step === 6 ? 'bg-[#2a1a3a]' : step === 4 ? 'bg-[#1a0505]' : 'bg-[#0a0a0f]'}`}>
      
      {/* Particles */}
      {step < 4 && [...Array(15)].map((_, i) => (
        <motion.div key={i} className="absolute h-2 w-2 rounded-full bg-red-500 blur-[2px]"
          initial={{ x: Math.random() * window.innerWidth, y: Math.random() * window.innerHeight, opacity: 0 }}
          animate={{ y: [null, Math.random() * -200 - 100], opacity: [0, 1, 0] }}
          transition={{ duration: Math.random() * 3 + 2, repeat: Infinity, delay: Math.random() * 2 }}
        />
      ))}

      {/* String Lights */}
      {step === 4 && (
        <div className="absolute top-0 left-0 w-full flex justify-around px-2 z-20">
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05, duration: 0.5 }} className="flex flex-col items-center">
              <div className="w-0.5 h-4 bg-gray-600/50" />
              <div className="w-3 h-3 rounded-full bg-yellow-200 shadow-[0_0_10px_rgba(255,255,150,0.9)]" />
            </motion.div>
          ))}
        </div>
      )}

      {/* Balloons */}
      {(step === 4 || step === 5) && balloons.map((b) => (
        <motion.div key={b.id} className="absolute bottom-[-100px] rounded-full" style={{ left: `${b.left}%`, width: b.size, height: b.size * 1.2, backgroundColor: b.color, boxShadow: `inset -5px -5px 10px rgba(0,0,0,0.2), 0 0 15px ${b.color}40` }}
          initial={{ y: 0, opacity: 0 }} animate={{ y: [0, -window.innerHeight - 200], opacity: [0, 1, 1, 0], x: [0, Math.random() * 40 - 20, 0] }}
          transition={{ duration: b.duration, repeat: Infinity, delay: b.delay, ease: "linear" }}
        >
          <div className="absolute bottom-[-40px] left-1/2 w-0.5 h-10 bg-white/30 -translate-x-1/2" />
        </motion.div>
      ))}

      {/* Curtains */}
      {step === 5 && (
        <>
          <motion.div initial={{ x: '-100%' }} animate={{ x: '-50%' }} transition={{ duration: 2, ease: "easeInOut" }} className="absolute top-0 left-0 w-1/2 h-full z-40 bg-[#8b0000]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #8b0000, #8b0000 40px, #6b0000 40px, #6b0000 80px)', boxShadow: 'inset -20px 0 50px rgba(0,0,0,0.5)' }} />
          <motion.div initial={{ x: '100%' }} animate={{ x: '50%' }} transition={{ duration: 2, ease: "easeInOut" }} className="absolute top-0 right-0 w-1/2 h-full z-40 bg-[#8b0000]" style={{ backgroundImage: 'repeating-linear-gradient(90deg, #6b0000, #6b0000 40px, #8b0000 40px, #8b0000 80px)', boxShadow: 'inset 20px 0 50px rgba(0,0,0,0.5)' }} />
        </>
      )}

      {/* Central Content */}
      <motion.div key={step} initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: "easeOut" }} className="relative z-30 mx-4 w-full max-w-md rounded-2xl p-8 text-center">
        
        {step === 1 && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="mb-4 text-3xl font-bold text-white" style={{ fontFamily: 'Playfair Display, serif' }}>Have a look at it Madam Jii</h1>
            <div className="mb-6 text-red-500">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mx-auto animate-pulse" fill="currentColor" viewBox="0 0 24 24"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
            </div>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStep(2)} className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-8 py-3 font-bold text-white shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all hover:shadow-[0_0_30px_rgba(255,0,0,0.9)]">Open Surprise</motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.5 }}>
            <h1 className="mb-8 text-4xl font-bold text-white tracking-wide" style={{ fontFamily: 'Playfair Display, serif' }}>Ready for Surprise? <br /><span className="text-red-500 text-5xl">Let's go!</span></h1>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStep(3)} className="rounded-full bg-gradient-to-r from-red-600 to-orange-500 px-10 py-4 text-lg font-bold text-white shadow-[0_0_20px_rgba(255,0,0,0.6)] transition-all hover:shadow-[0_0_30px_rgba(255,0,0,0.9)]">Let's Go</motion.button>
          </motion.div>
        )}

        {step === 3 && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1, delay: 0.3 }}>
            <h1 className="mb-8 text-3xl font-bold text-white/90" style={{ fontFamily: 'Playfair Display, serif' }}>The stage is set...</h1>
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 25px rgba(255, 165, 0, 0.6)" }} whileTap={{ scale: 0.95 }} onClick={() => setStep(4)} className="rounded-full bg-black border-2 border-orange-500 px-8 py-3 font-bold text-orange-500 shadow-[0_0_15px_rgba(255,165,0,0.3)] transition-all duration-300 hover:bg-orange-500 hover:text-black">Turn on the Light</motion.button>
          </motion.div>
        )}

        {step === 4 && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 1 }} className="flex flex-col items-center">
            <h1 className="mb-6 text-lg font-bold tracking-[0.2em] text-white/90 uppercase" style={{ fontFamily: 'Playfair Display, serif' }}>Almost there...</h1>
            <motion.button whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(255, 50, 50, 0.8)" }} whileTap={{ scale: 0.95 }} onClick={() => setStep(5)} className="relative rounded-full bg-black px-8 py-4 font-bold text-white border-2 border-red-500 shadow-[0_0_20px_rgba(255,50,50,0.5)] transition-all duration-300 hover:bg-red-500/10">
              <span className="flex items-center gap-2"><span className="text-red-500 text-xl">▶</span> SHOW THE MESSAGE</span>
            </motion.button>
          </motion.div>
        )}

        {step === 5 && (
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1, delay: 2.5 }} className="bg-black/80 backdrop-blur-md border border-white/10 rounded-2xl p-8 shadow-2xl">
            <h1 className="mb-4 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-400 to-pink-500" style={{ fontFamily: 'Playfair Display, serif' }}>My Dearest Ridhi,</h1>
            <p className="text-sm text-gray-300 leading-relaxed mb-6">Today isn't just a date on the calendar; it's a celebration of the light you bring into my life. Every moment with you is like a frame from a beautiful movie, and I'm so lucky to be your co-star. May this year be filled with as much magic as you give to everyone around you.</p>
            <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} onClick={() => setStep(6)} className="rounded-full border border-white/20 px-6 py-2 text-xs font-bold tracking-[0.2em] text-white/80 transition-all hover:bg-white/10 hover:text-white">ONE LAST SURPRISE</motion.button>
          </motion.div>
        )}

        {step === 6 && (
          <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} className="flex flex-col items-center justify-center">
            <div className="mb-[-15px] z-10">
              <svg width="100" height="80" viewBox="0 0 100 80" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 30 L10 5 L40 20 Z" fill="#fce4ec" stroke="#5b3fa0" strokeWidth="2" strokeLinejoin="round"/>
                <path d="M80 30 L90 5 L60 20 Z" fill="#fce4ec" stroke="#5b3fa0" strokeWidth="2" strokeLinejoin="round"/>
                <circle cx="50" cy="45" r="30" fill="#fce4ec" stroke="#5b3fa0" strokeWidth="2"/>
                <circle cx="35" cy="40" r="3" fill="#5b3fa0" /><circle cx="65" cy="40" r="3" fill="#5b3fa0" />
                <ellipse cx="28" cy="50" rx="5" ry="3" fill="#f48fb1" opacity="0.6"/><ellipse cx="72" cy="50" rx="5" ry="3" fill="#f48fb1" opacity="0.6"/>
                <path d="M45 50 Q50 55 55 50" stroke="#5b3fa0" strokeWidth="2" fill="none" strokeLinecap="round"/>
                <path d="M50 50 L50 53" stroke="#5b3fa0" strokeWidth="2" strokeLinecap="round"/>
                <circle cx="20" cy="65" r="8" fill="#fce4ec" stroke="#5b3fa0" strokeWidth="2"/><circle cx="80" cy="65" r="8" fill="#fce4ec" stroke="#5b3fa0" strokeWidth="2"/>
              </svg>
            </div>
            <div className="relative bg-[#fce4ec] border-4 border-[#8f6fd6] rounded-3xl p-6 mb-10 shadow-xl max-w-xs">
              <h2 className="text-xl font-bold text-[#5b3fa0] leading-tight" style={{ fontFamily: 'Fredoka, sans-serif' }}>I have little surprise for you. Wanna see it?</h2>
              <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[15px] border-l-transparent border-r-[15px] border-r-transparent border-t-[16px] border-t-[#8f6fd6]"></div>
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[12px] border-l-transparent border-r-[12px] border-r-transparent border-t-[13px] border-t-[#fce4ec]"></div>
            </div>
            <div className="flex gap-6 relative w-full justify-center h-20">
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={onNextPage} className="px-8 py-3 bg-[#8f6fd6] text-white font-bold rounded-full shadow-lg border-b-4 border-[#6f4fb8] hover:bg-[#7c5bc5] transition-all" style={{ fontFamily: 'Fredoka, sans-serif' }}>YES</motion.button>
              <motion.button animate={{ x: noPosition.x, y: noPosition.y }} transition={{ type: "spring", stiffness: 300, damping: 20 }} onMouseEnter={moveNoButton} onClick={moveNoButton} className="px-8 py-3 bg-[#fce4ec] text-[#5b3fa0] font-bold rounded-full shadow-lg border-b-4 border-[#d1b3e0] transition-all absolute" style={{ fontFamily: 'Fredoka, sans-serif' }}>NO</motion.button>
            </div>
          </motion.div>
        )}

      </motion.div>
    </div>
  );
}