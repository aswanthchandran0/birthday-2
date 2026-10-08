import { useState, useRef, useEffect } from 'react';
import BirthdayLockScreen from './components/BirthdayLockScreen/BirthdayLockScreen';
import SurprisePage from './components/SurprisePage/SurprisePage';
import InvitationPage from './components/InvitationPage/InvitationPage';
import backgroundMusic from './assets/bg.mp3';
import './App.css';

export default function App() {
  const [page, setPage] = useState('lock'); // 'lock' | 'surprise' | 'invitation'
  const audioRef = useRef(null);

  // Handle music playback based on current page
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    if (page === 'surprise' || page === 'invitation') {
      // Music plays on SurprisePage AND InvitationPage
      audio.volume = 0.4;
      audio.loop = true;
      audio.play().catch(() => {
        console.log('Autoplay blocked - waiting for user interaction');
      });
    } else {
      // Lock screen → no music
      audio.pause();
      audio.currentTime = 0;
    }
  }, [page]);

  return (
    <div className="app-container">
      {/* Global background music element */}
      <audio ref={audioRef} src={backgroundMusic} preload="auto" />

      {page === 'lock' && (
        <BirthdayLockScreen
          passcode="0810"
          onUnlock={() => setPage('surprise')}
        />
      )}

      {page === 'surprise' && (
        <SurprisePage onNextPage={() => setPage('invitation')} />
      )}

      {page === 'invitation' && (
        <InvitationPage bgMusicRef={audioRef} />
      )}
    </div>
  );
}