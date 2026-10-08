import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import './invitation.css';

// --- IMPORT YOUR ASSETS HERE ---
import photo1 from '../../assets/photo1.jpeg';
import photo2 from '../../assets/photo5.PNG';
import photo3 from '../../assets/photo2.jpeg';
import photo4 from '../../assets/photo3.PNG';
import photo5 from '../../assets/photo4.PNG';
import photo6 from '../../assets/photo6.PNG';

// Videos
import video1 from '../../assets/video1.mp4';
import Video2 from '../../assets/IMG_2401.mp4';
import video3 from '../../assets/IMG_2402.mp4';
import video4 from '../../assets/IMG_2403.mp4';

const COLLAGE_PHOTOS = [photo1, photo2, photo3, photo4, photo5, photo6];
const REELS = [Video2, video1, video3, video4];

// --- AUTO-PLAYING REEL COMPONENT ---
function ReelVideo({ videoSrc, bgMusicRef }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [needsTap, setNeedsTap] = useState(false);

  const pauseBgMusic = () => {
    const bgMusic = bgMusicRef?.current;
    if (bgMusic && !bgMusic.paused) bgMusic.pause();
  };

  const resumeBgMusic = () => {
    const bgMusic = bgMusicRef?.current;
    if (bgMusic && bgMusic.paused) bgMusic.play().catch(() => {});
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            video.muted = false;
            const playPromise = video.play();

            if (playPromise !== undefined) {
              playPromise
                .then(() => {
                  setIsPlaying(true);
                  setIsMuted(false);
                  setNeedsTap(false);
                  pauseBgMusic();
                })
                .catch(() => {
                  video.muted = true;
                  setIsMuted(true);
                  video
                    .play()
                    .then(() => {
                      setIsPlaying(true);
                      setNeedsTap(false);
                      pauseBgMusic();
                    })
                    .catch(() => {
                      setIsPlaying(false);
                      setNeedsTap(true);
                      resumeBgMusic();
                    });
                });
            }
          } else {
            video.pause();
            setIsPlaying(false);
          }
        });
      },
      {
        threshold: 0.35,
        rootMargin: '100px 0px 100px 0px',
      }
    );

    observer.observe(video);
    return () => observer.unobserve(video);
  }, [bgMusicRef]);

  const handleTap = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.muted = false;
      video
        .play()
        .then(() => {
          setIsPlaying(true);
          setIsMuted(false);
          setNeedsTap(false);
          pauseBgMusic();
        })
        .catch(() => {
          video.muted = true;
          setIsMuted(true);
          video.play().then(() => {
            setIsPlaying(true);
            setNeedsTap(false);
            pauseBgMusic();
          });
        });
    } else {
      video.pause();
      setIsPlaying(false);
      resumeBgMusic();
    }
  };

  const handleVideoEnd = () => {
    setIsPlaying(false);
    resumeBgMusic();
  };

  return (
    <div
      className="relative w-full h-screen snap-start snap-always bg-black overflow-hidden cursor-pointer flex items-center justify-center"
      onClick={handleTap}
    >
      <video
        ref={videoRef}
        src={videoSrc}
        loop
        playsInline
        preload="auto"
        className="w-full h-full object-contain"
        onEnded={handleVideoEnd}
      />

      {/* Big center play button */}
      {needsTap && !isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-20 h-20 rounded-full bg-black/60 backdrop-blur-sm flex items-center justify-center border-2 border-white/40">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Small pause indicator */}
      {!isPlaying && !needsTap && (
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-16 h-16 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Tap for sound hint (top of screen) */}
      {isMuted && isPlaying && (
        <div className="absolute top-6 left-1/2 -translate-x-1/2 bg-black/60 backdrop-blur-sm rounded-full px-4 py-2 flex items-center gap-2 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2" />
          </svg>
          <span className="text-white text-xs">Tap for sound</span>
        </div>
      )}

      {/* "Keep Scrolling" hint — shows on EVERY video */}
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.8 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
        >
          <span
            className="text-white/90 text-xs tracking-[0.25em] font-light"
            style={{ textShadow: '0 2px 8px rgba(0,0,0,0.9)' }}
          >
            KEEP SCROLLING
          </span>

          {/* Bouncing arrow */}
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-white/80"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              style={{ filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.9))' }}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}

// --- DECORATIVE DIVIDER ---
function Divider() {
  return (
    <div className="flex items-center justify-center gap-3 py-4 bg-[#fdfaf3]">
      <span className="w-12 h-px bg-[#d8cfc0]"></span>
      <span className="text-[#a89b8c] text-xs tracking-widest">✧ ✦ ✧</span>
      <span className="w-12 h-px bg-[#d8cfc0]"></span>
    </div>
  );
}

export default function InvitationPage({ bgMusicRef }) {
  return (
    <div className="min-h-screen bg-[#f4f0e6] text-[#3a2e2a] flex flex-col items-center">

      {/* --- CARD SECTION (Header + Collage) --- */}
      <div className="w-full max-w-md bg-[#fdfaf3] shadow-2xl sm:rounded-sm overflow-hidden border border-[#d8cfc0]">

        {/* --- HEADER --- */}
        <div className="text-center pt-10 pb-6 px-6">
          <h1 className="text-4xl font-serif text-[#8b6f5e] tracking-wide" style={{ fontFamily: 'Great Vibes, cursive' }}>
            krithiiii
          </h1>
          <div className="flex items-center justify-center gap-3 mt-2 text-xs tracking-[0.3em] text-[#8b6f5e]">
            <span className="w-8 h-px bg-[#8b6f5e]"></span>
            <span>HAPPY BIRTHDAY</span>
            <span className="w-8 h-px bg-[#8b6f5e]"></span>
          </div>
        </div>

        {/* --- 6 PHOTO COLLAGE --- */}
        <div className="px-6 pb-6">
          <p className="text-xs tracking-[0.3em] text-[#8b6f5e] text-center mb-4">OUR MOMENTS</p>

          <div className="grid grid-cols-3 gap-2 auto-rows-[100px] grid-flow-dense">
            <motion.div
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              initial={{ rotate: -2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="col-span-2 row-span-2 bg-white p-1.5 shadow-md rounded-sm"
            >
              <img src={COLLAGE_PHOTOS[0]} alt="Memory 1" className="w-full h-full object-cover rounded-sm" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              initial={{ rotate: 3 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="col-span-1 row-span-1 bg-white p-1.5 shadow-md rounded-sm"
            >
              <img src={COLLAGE_PHOTOS[1]} alt="Memory 2" className="w-full h-full object-cover rounded-sm" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              initial={{ rotate: -4 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="col-span-1 row-span-1 bg-white p-1.5 shadow-md rounded-sm"
            >
              <img src={COLLAGE_PHOTOS[2]} alt="Memory 3" className="w-full h-full object-cover rounded-sm" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              initial={{ rotate: 2 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="col-span-1 row-span-1 bg-white p-1.5 shadow-md rounded-sm"
            >
              <img src={COLLAGE_PHOTOS[3]} alt="Memory 4" className="w-full h-full object-cover rounded-sm" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              initial={{ rotate: -3 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="col-span-1 row-span-1 bg-white p-1.5 shadow-md rounded-sm"
            >
              <img src={COLLAGE_PHOTOS[4]} alt="Memory 5" className="w-full h-full object-cover rounded-sm" />
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 0, zIndex: 10 }}
              initial={{ rotate: 5 }}
              transition={{ type: 'spring', stiffness: 300 }}
              className="col-span-1 row-span-1 bg-white p-1.5 shadow-md rounded-sm"
            >
              <img src={COLLAGE_PHOTOS[5]} alt="Memory 6" className="w-full h-full object-cover rounded-sm" />
            </motion.div>
          </div>
        </div>

        {/* --- DIVIDER --- */}
        <Divider />
      </div>

      {/* --- REELS LABEL --- */}
      <div className="w-full max-w-md bg-[#fdfaf3] border border-t-0 border-[#d8cfc0]">
        <p className="text-xs tracking-[0.3em] text-[#8b6f5e] text-center py-4 uppercase">
          A Gift For You
        </p>
      </div>

      {/* --- FULL-SCREEN REELS --- */}
      {REELS.map((videoSrc, index) => (
        <ReelVideo
          key={index}
          videoSrc={videoSrc}
          bgMusicRef={bgMusicRef}
        />
      ))}

      {/* --- FINAL PARAGRAPH --- */}
      <div className="w-full max-w-md bg-[#f4f0e6] border border-[#d8cfc0]">
        <div className="py-10 px-8 text-center">
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