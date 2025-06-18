import React, { useState } from 'react';
import { AppScreen, LovedOne, User } from './types/app';
import LandingScreen from './components/LandingScreen';
import RegisterScreen from './components/RegisterScreen';
import EmotionSelectionScreen from './components/EmotionSelectionScreen';
import CallSetupScreen from './components/CallSetupScreen';
import VoiceCallScreen from './components/VoiceCallScreen';
import VideoCallScreen from './components/VideoCallScreen';
import CallEndScreen from './components/CallEndScreen';

interface CallConfig {
  language: string;
  topic: string;
  description: string;
  moodBefore: number;
}

function App() {
  const [currentScreen, setCurrentScreen] = useState<AppScreen>('landing');
  const [user, setUser] = useState<User | null>(null);
  const [selectedLovedOne, setSelectedLovedOne] = useState<LovedOne | null>(null);
  const [callType, setCallType] = useState<'voice' | 'video'>('voice');
  const [callConfig, setCallConfig] = useState<CallConfig | null>(null);
  const [moodAfter, setMoodAfter] = useState<number>(5);

  const handleRegister = () => {
    setCurrentScreen('register');
  };

  const handleFreeTrial = () => {
    setCurrentScreen('selection');
  };

  const handleSignUp = (userData: { name: string; email: string; password: string }) => {
    const newUser: User = {
      id: Date.now().toString(),
      name: userData.name,
      email: userData.email,
      createdAt: new Date()
    };
    setUser(newUser);
    setCurrentScreen('selection');
  };

  const handleSelectCall = (lovedOne: LovedOne, type: 'voice' | 'video') => {
    setSelectedLovedOne(lovedOne);
    setCallType(type);
    setCurrentScreen('setup');
  };

  const handleStartCall = (config: CallConfig) => {
    setCallConfig(config);
    setCurrentScreen(callType === 'voice' ? 'voice-call' : 'video-call');
  };

  const handleEndCall = (mood: number) => {
    setMoodAfter(mood);
    setCurrentScreen('call-end');
  };

  const handleBackToHome = () => {
    setCurrentScreen('selection');
    setSelectedLovedOne(null);
    setCallConfig(null);
  };

  const handleCallAgain = () => {
    if (selectedLovedOne) {
      setCurrentScreen('setup');
    }
  };

  const handleBack = () => {
    switch (currentScreen) {
      case 'register':
        setCurrentScreen('landing');
        break;
      case 'selection':
        setCurrentScreen(user ? 'selection' : 'landing');
        break;
      case 'setup':
        setCurrentScreen('selection');
        break;
      default:
        setCurrentScreen('landing');
    }
  };

  return (
    <div className="min-h-screen">
      {currentScreen === 'landing' && (
        <LandingScreen 
          onRegister={handleRegister}
          onFreeTrial={handleFreeTrial}
        />
      )}
      
      {currentScreen === 'register' && (
        <RegisterScreen 
          onBack={handleBack}
          onSignUp={handleSignUp}
        />
      )}
      
      {currentScreen === 'selection' && (
        <EmotionSelectionScreen 
          onBack={handleBack}
          onSelectCall={handleSelectCall}
        />
      )}
      
      {currentScreen === 'setup' && selectedLovedOne && (
        <CallSetupScreen 
          lovedOne={selectedLovedOne}
          callType={callType}
          onBack={handleBack}
          onStartCall={handleStartCall}
        />
      )}
      
      {currentScreen === 'voice-call' && selectedLovedOne && (
        <VoiceCallScreen 
          lovedOne={selectedLovedOne}
          onEndCall={handleEndCall}
        />
      )}
      
      {currentScreen === 'video-call' && selectedLovedOne && (
        <VideoCallScreen 
          lovedOne={selectedLovedOne}
          onEndCall={handleEndCall}
        />
      )}
      
      {currentScreen === 'call-end' && selectedLovedOne && callConfig && (
        <CallEndScreen 
          lovedOne={selectedLovedOne}
          callType={callType}
          moodBefore={callConfig.moodBefore}
          moodAfter={moodAfter}
          onHome={handleBackToHome}
          onCallAgain={handleCallAgain}
        />
      )}
    </div>
  );
}

export default App;