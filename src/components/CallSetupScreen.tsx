import React, { useState } from 'react';
import { ArrowLeft, Settings, Heart } from 'lucide-react';
import { LovedOne } from '../types/app';

interface CallSetupScreenProps {
  lovedOne: LovedOne;
  callType: 'voice' | 'video';
  onBack: () => void;
  onStartCall: (config: CallConfig) => void;
}

interface CallConfig {
  language: string;
  topic: string;
  description: string;
  moodBefore: number;
}

const languages = [
  { code: 'en', name: 'English' },
  { code: 'te', name: 'Telugu' },
  { code: 'ta', name: 'Tamil' },
  { code: 'hi', name: 'Hindi' },
  { code: 'es', name: 'Spanish' }
];

const topics = [
  'Love & Affection',
  'Loneliness',
  'Breakup Support',
  'Celebration',
  'Work Stress',
  'Family Issues',
  'General Chat',
  'Motivation'
];

export default function CallSetupScreen({ lovedOne, callType, onBack, onStartCall }: CallSetupScreenProps) {
  const [config, setConfig] = useState<CallConfig>({
    language: 'en',
    topic: 'General Chat',
    description: '',
    moodBefore: 5
  });

  const handleStartCall = () => {
    onStartCall(config);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="flex items-center justify-between p-6">
        <button
          onClick={onBack}
          className="p-3 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
        >
          <ArrowLeft className="w-6 h-6 text-gray-600" />
        </button>
        <h1 className="text-xl font-bold text-gray-900">Call Setup</h1>
        <div className="w-12"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6">
        {/* Selected Person */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <div className="flex items-center gap-4">
            <div className={`w-16 h-16 bg-gradient-to-br ${lovedOne.color} rounded-2xl flex items-center justify-center shadow-lg`}>
              <span className="text-2xl">{lovedOne.avatar}</span>
            </div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-900 text-xl">{lovedOne.name}</h3>
              <p className="text-gray-500">{callType === 'voice' ? 'Voice Call' : 'Video Call'}</p>
            </div>
            <div className="p-3 bg-yellow-100 rounded-2xl">
              <Settings className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </div>

        {/* Mood Check */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="font-bold text-gray-900 text-lg mb-4">How are you feeling right now?</h3>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-sm text-gray-500">😢 Sad</span>
            <div className="flex-1 flex gap-1">
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((mood) => (
                <button
                  key={mood}
                  onClick={() => setConfig({ ...config, moodBefore: mood })}
                  className={`flex-1 h-3 rounded-full transition-all duration-300 ${
                    mood <= config.moodBefore
                      ? 'bg-gradient-to-r from-yellow-400 to-green-400'
                      : 'bg-gray-200'
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-gray-500">😊 Happy</span>
          </div>
          <p className="text-center text-sm text-gray-600">Current mood: {config.moodBefore}/10</p>
        </div>

        {/* Settings */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Call Preferences</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
              <select
                value={config.language}
                onChange={(e) => setConfig({ ...config, language: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900"
              >
                {languages.map((lang) => (
                  <option key={lang.code} value={lang.code}>{lang.name}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Topic</label>
              <select
                value={config.topic}
                onChange={(e) => setConfig({ ...config, topic: e.target.value })}
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900"
              >
                {topics.map((topic) => (
                  <option key={topic} value={topic}>{topic}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Additional Details (Optional)</label>
              <textarea
                value={config.description}
                onChange={(e) => setConfig({ ...config, description: e.target.value })}
                placeholder="Tell us more about what's on your mind..."
                className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 resize-none h-24"
              />
            </div>
          </div>
        </div>

        {/* Start Call Button */}
        <button
          onClick={handleStartCall}
          className="w-full bg-gradient-to-r from-yellow-400 to-green-400 hover:from-yellow-500 hover:to-green-500 text-white font-bold py-5 px-8 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 text-lg"
        >
          <Heart className="w-6 h-6" />
          Start {callType === 'voice' ? 'Voice' : 'Video'} Call
        </button>
      </div>
    </div>
  );
}