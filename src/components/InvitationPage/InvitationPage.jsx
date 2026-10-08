import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './invitation.css';

// --- IMPORT YOUR ASSETS HERE ---
import mainInvitePhoto from '../../assets/photo1.jpeg';
import memory1 from '../../assets/photo5.PNG';
import memory2 from '../../assets/photo2.jpeg';
import memory3 from '../../assets/photo3.PNG';

// Videos
import video1 from '../../assets/video1.mp4';
import Video2 from '../../assets/IMG_2401.mp4';
import video3 from '../../assets/IMG_2402.mp4';
import video4 from '../../assets/IMG_2403.mp4';

const PHOTOS = [mainInvitePhoto, memory1, memory2, memory3];

// --- REUSABLE VIDEO COMPONENT ---
function VideoSection({ videoSrc, poster }) {
  return (
    <div className="px-6 py-6">
      <div className="relative w-full aspect-video rounded-lg overflow-hidden shadow-lg border-2 border-[#e8e0d5] bg-black">
        <video 
          src={videoSrc} 
          controls 
          preload="metadata"
          playsInline
          className="w-full h-full object-contain"
          poster={poster}
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>
  );
}

// --- DECORATIVE DIVIDER COMPONENT ---
function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-2">
      <span className="w-12 h-px bg-[#d8cfc0]"></span>
      <span className="text-[#a89b8c] text-xs tracking-widest">✧ ✦ ✧</span>
      <span className="w-12 h-px bg-[#d8cfc0]"></span>
    </div>
  );
}

export default function InvitationPage() {
  const [currentPhoto, setCurrentPhoto] = useState(0);

  const nextPhoto = () => setCurrentPhoto((prev) => (prev + 1) % PHOTOS.length);
  const prevPhoto = () => setCurrentPhoto((prev) => (prev - 1 + PHOTOS.length) % PHOTOS.length);

  return (
    <div className="min-h-screen bg-[#f4f0e6] text-[#3a2e2a] flex justify-center py-10 px-4">
      <div className="w-full max-w-md bg-[#fdfaf3] shadow-2xl rounded-sm overflow-hidden border border-[#d8cfc0]">
        
        {/* --- HEADER --- */}
        <div className="text-center pt-10 pb-6 px-6">
          <h1 className="text-4xl font-serif text-[#8b6f5e] tracking-wide" style={{ fontFamily: 'Great Vibes, cursive' }}>
            Kirthiiii
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2 text-xs tracking-[0.3em] text-[#8b6f5e]">
            <span className="w-8 h-px bg-[#8b6f5e]"></span>
            <span>HAPPY BIRTHDAY</span>
            <span className="w-8 h-px bg-[#8b6f5e]"></span>
          </div>
        </div>

        {/* --- PHOTO SWAP SECTION --- */}
        <div className="relative w-full aspect-[4/5] bg-[#e8e0d5] overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.img
              key={currentPhoto}
              src={PHOTOS[currentPhoto]}
              alt={`Memory ${currentPhoto + 1}`}
              initial={{ opacity: 0, scale: 1.1 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.8, ease: "easeInOut" }}
              className="absolute inset-0 w-full h-full object-cover"
            />
          </AnimatePresence>
          
          <button onClick={prevPhoto} className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur text-[#8b6f5e] flex items-center justify-center shadow-md hover:bg-white transition">←</button>
          <button onClick={nextPhoto} className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/70 backdrop-blur text-[#8b6f5e] flex items-center justify-center shadow-md hover:bg-white transition">→</button>

          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
            {PHOTOS.map((_, i) => (
              <div key={i} className={`w-2 h-2 rounded-full transition-all ${i === currentPhoto ? 'bg-white scale-125' : 'bg-white/50'}`} />
            ))}
          </div>
        </div>

        {/* --- VIDEO 1 --- */}
        <VideoSection videoSrc={Video2} poster={mainInvitePhoto} />

        {/* --- DIVIDER --- */}
        <Divider />

        {/* --- VIDEO 2 --- */}
        <VideoSection videoSrc={video1} poster={mainInvitePhoto} />

        {/* --- DIVIDER --- */}
        <Divider />

        {/* --- VIDEO 3 --- */}
        <VideoSection videoSrc={video3} poster={mainInvitePhoto} />

        {/* --- DIVIDER --- */}
        <Divider />

        {/* --- VIDEO 4 --- */}
        <VideoSection videoSrc={video4} poster={mainInvitePhoto} />

        {/* --- FINAL PARAGRAPH --- */}
        <div className="py-10 px-8 text-center bg-[#f4f0e6] mt-4">
          <p className="text-xs tracking-[0.3em] text-[#8b6f5e] mb-4">A WISH FROM MY HEART</p>
          
          <p className="text-sm text-[#5a4e46] leading-relaxed font-light mb-4">
            Once again, wishing you the happiest of birthdays! 🎂 
            May this year bring you endless joy, beautiful moments, and everything your heart desires. 
            I hope all the good things you deserve find their way to you — because you truly light up every life you touch.
          </p>

          <p className="text-sm text-[#5a4e46] leading-relaxed font-light mb-6">
            Thank you for being you. Here's to more laughter, more memories, and a year filled with love and success.
          </p>

          <div className="w-16 h-px bg-[#d8cfc0] mx-auto mb-6"></div>

          <p className="text-2xl text-[#8b6f5e]" style={{ fontFamily: 'Great Vibes, cursive' }}>
            With love,
          </p>
          <p className="text-3xl text-[#8b6f5e] mt-2" style={{ fontFamily: 'Great Vibes, cursive' }}>
             Sayooooj😜
          </p>
        </div>

      </div>
    </div>
  );
}