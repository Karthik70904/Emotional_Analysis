import React, { useState, useEffect } from 'react';
import { Phone, PhoneOff, Mic, MicOff, Video, VideoOff } from 'lucide-react';
import { LovedOne } from '../types/app';

interface VideoCallScreenProps {
  lovedOne: LovedOne;
  onEndCall: (moodAfter: number) => void;
}

export default function VideoCallScreen({ lovedOne, onEndCall }: VideoCallScreenProps) {
  const [isConnected, setIsConnected] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [currentEmotion, setCurrentEmotion] = useState('Analyzing...');

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

    const emotions = ['Happy', 'Calm', 'Excited', 'Grateful', 'Peaceful', 'Joyful'];
    const timer = setInterval(() => {
      const randomEmotion = emotions[Math.floor(Math.random() * emotions.length)];
      setCurrentEmotion(randomEmotion);
    }, 4000);

    return () => clearInterval(timer);
  }, [isConnected]);

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleEndCall = () => {
    onEndCall(9); // Default mood after video call
  };

  if (!isConnected) {
    return (
      <div className="min-h-screen bg-black flex flex-col items-center justify-center text-white">
        <div className="text-center mb-8">
          <div className="w-32 h-32 bg-gray-800 rounded-2xl flex items-center justify-center mb-4">
            <Video className="w-16 h-16 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Connecting to {lovedOne.name}...</h2>
          <p className="text-gray-300">Setting up video call</p>
        </div>
        
        <div className="flex gap-4">
          <div className="w-4 h-4 bg-white rounded-full animate-bounce"></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
          <div className="w-4 h-4 bg-white rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col text-white relative">
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 z-10 p-4 bg-gradient-to-b from-black/50 to-transparent">
        <div className="flex items-center justify-between">
          <div>
            <div className="text-lg font-semibold">{lovedOne.name}</div>
            <div className="text-sm text-gray-300">{formatDuration(callDuration)}</div>
          </div>
          
          {/* Emotion Detection */}
          <div className="bg-black/50 backdrop-blur-lg rounded-xl px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-yellow-400">{currentEmotion}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Video Area */}
      <div className="flex-1 relative">
        {/* Main video (loved one) */}
        <div className="w-full h-full bg-gradient-to-br from-purple-900 to-pink-900 flex items-center justify-center relative">
          <div className="text-center">
            <div className={`w-48 h-48 bg-gradient-to-br ${lovedOne.color} rounded-3xl flex items-center justify-center mb-6 shadow-2xl`}>
              <span className="text-8xl">{lovedOne.avatar}</span>
            </div>
            <h3 className="text-2xl font-bold text-white/90">Your {lovedOne.relationship}</h3>
            <p className="text-white/70">Here to listen and support you</p>
          </div>
          
          {/* Floating hearts animation */}
          <div className="absolute inset-0 pointer-events-none">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute text-2xl animate-bounce opacity-30"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: '3s'
                }}
              >
                💖
              </div>
            ))}
          </div>
        </div>

        {/* User video (small overlay) */}
        <div className="absolute bottom-20 right-4 w-24 h-32 bg-gray-800 rounded-2xl border-2 border-white/20 overflow-hidden">
          {isVideoOff ? (
            <div className="w-full h-full flex items-center justify-center">
              <VideoOff className="w-8 h-8 text-gray-400" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-500 to-purple-500 flex items-center justify-center">
              <span className="text-2xl">😊</span>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
        <div className="flex items-center justify-center gap-6">
          <button
            onClick={() => setIsMuted(!isMuted)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
              isMuted ? 'bg-red-500' : 'bg-white/20 backdrop-blur-lg'
            }`}
          >
            {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
          </button>

          <button
            onClick={handleEndCall}
            className="w-16 h-16 bg-red-500 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:scale-110 shadow-2xl"
          >
            <PhoneOff className="w-8 h-8" />
          </button>

          <button
            onClick={() => setIsVideoOff(!isVideoOff)}
            className={`w-14 h-14 rounded-full flex items-center justify-center transition-all duration-300 ${
              isVideoOff ? 'bg-red-500' : 'bg-white/20 backdrop-blur-lg'
            }`}
          >
            {isVideoOff ? <VideoOff className="w-6 h-6" /> : <Video className="w-6 h-6" />}
          </button>
        </div>
      </div>
    </div>
  );
}