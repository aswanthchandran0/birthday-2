import { useState } from 'react';
import BirthdayLockScreen from './components/BirthdayLockScreen/BirthdayLockScreen';
import SurprisePage from './components/SurprisePage/SurprisePage';
import InvitationPage from './components/InvitationPage/InvitationPage';
import './App.css';

export default function App() {
  const [page, setPage] = useState('lock'); // 'lock', 'surprise', 'invitation'

  return (
    <div className="app-container">
      {page === 'lock' && (
        <BirthdayLockScreen 
          passcode="0810" 
          onUnlock={() => setPage('surprise')} 
        />
      )}
      
      {page === 'surprise' && (
        <SurprisePage 
          onNextPage={() => setPage('invitation')} 
        />
      )}

      {page === 'invitation' && (
        <InvitationPage />
      )}
    </div>
  );
}