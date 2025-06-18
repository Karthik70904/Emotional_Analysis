import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Volume2 } from 'lucide-react';
import { LovedOne } from '../types/app';

interface VoiceCallScreenProps {
  lovedOne: LovedOne;
  onEndCall: (moodAfter: number) => void;
}

export default function VoiceCallScreen({ lovedOne, onEndCall }: VoiceCallScreenProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [currentEmotion, setCurrentEmotion] = useState('Listening...');
  const [isListening, setIsListening] = useState(true);

  // Simulate call connection
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsConnected(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  // Call duration timer
  useEffect(() => {
    if (!isConnected) return;

    const timer = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [isConnected]);

  // Simulate emotion detection
  useEffect(() => {
    if (!isConnected) return;

    const emotions = ['Happy', 'Calm', 'Thoughtful', 'Grateful', 'Peaceful', 'Loved'];
    const timer = setInterval(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
    }, 5000);

    return () => clearInterval(timer);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onEndCall(8); // Default mood after call
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col items-center justify-center text-white">
        <div className={`w-32 h-32 bg-gradient-to-br ${lovedOne.color} rounded-full flex items-center justify-center mb-8 shadow-2xl animate-pulse`}>
          <span className="text-4xl">{lovedOne.avatar}</span>
        </div>
        
        <h2 className="text-2xl font-bold mb-2">Calling {lovedOne.name}...</h2>
        <p className="text-gray-300 mb-8">Connecting you with love and care</p>
        
        <div className="flex gap-4">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex flex-col text-white">
      {/* Header */}
      <div className="p-6 text-center">
        <div className="text-sm text-gray-300 mb-1">Voice Call</div>
        <div className="text-lg font-semibold">{formatDuration(callDuration)}</div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className={`w-40 h-40 bg-gradient-to-br ${lovedOne.color} rounded-full flex items-center justify-center mb-8 shadow-2xl ${isListening ? 'animate-pulse' : ''}`}>
          <span className="text-6xl">{lovedOne.avatar}</span>
        </div>
        
        <h2 className="text-3xl font-bold mb-2">{lovedOne.name}</h2>
        <p className="text-gray-300 mb-8">Connected with love</p>

        {/* Emotion Detection */}
        <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-sm">Emotion detected: <span className="font-semibold text-yellow-400">{currentEmotion}</span></span>
          </div>
        </div>

        {/* Audio Visualization */}
        <div className="flex items-center gap-1 mb-12">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="w-1 bg-yellow-400 rounded-full animate-pulse"
              style={{
                height: `${Math.random() * 40 + 10}px`,
                animationDelay: `${i * 0.1}s`
              }}
            />
          ))}
        </div>
      </div>

      {/* Controls */}
      <div className="p-6">
        <div className="flex items-center justify-center gap-8">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-16 h-16 rounded-full flex items-center justify-center transition-all duration-300 ${
              isMuted ? 'bg-red-500' : 'bg-white/20'
            }`}
          >
            {isMuted ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
          </button>

          <button
            onClick={handleEndCall}
            className="w-20 h-20 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl"
          >
            <PhoneOff className="w-10 h-10" />
          </button>

          <button className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center transition-all duration-300">
            <Volume2 className="w-8 h-8" />
          </button>
        </div>
      </div>
    </div>
  );
}