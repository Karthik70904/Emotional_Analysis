import React, { useState } from 'react';
import { Heart, Home, RotateCcw, Star } from 'lucide-react';
import { LovedOne } from '../types/app';

interface CallEndScreenProps {
  lovedOne: LovedOne;
  callType: 'voice' | 'video';
  moodBefore: number;
  moodAfter: number;
  onHome: () => void;
  onCallAgain: () => void;
}

export default function CallEndScreen({ 
  lovedOne, 
  callType, 
  moodBefore, 
  moodAfter, 
  onHome, 
  onCallAgain 
}: CallEndScreenProps) {
  const [rating, setRating] = useState(5);
  const [feedback, setFeedback] = useState('');

  const moodImprovement = moodAfter - moodBefore;
  const improvementText = moodImprovement > 0 
    ? `+${moodImprovement} points better!` 
    : moodImprovement < 0 
    ? `${moodImprovement} points` 
    : 'Same as before';

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="p-6 text-center">
        <div className={`w-24 h-24 bg-gradient-to-br ${lovedOne.color} rounded-full flex items-center justify-center mx-auto mb-4 shadow-xl`}>
          <span className="text-4xl">{lovedOne.avatar}</span>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Call Ended</h1>
        <p className="text-gray-600">Hope you feel better after talking with {lovedOne.name}</p>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6">
        {/* Mood Comparison */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="font-bold text-gray-900 text-lg mb-4 text-center">How did the call help?</h3>
          
          <div className="grid grid-cols-2 gap-4 mb-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-gray-600 mb-1">{moodBefore}/10</div>
              <div className="text-sm text-gray-500">Before Call</div>
              <div className="text-2xl mt-2">😔</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-1">{moodAfter}/10</div>
              <div className="text-sm text-gray-500">After Call</div>
              <div className="text-2xl mt-2">😊</div>
            </div>
          </div>
          
          <div className="text-center">
            <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
              moodImprovement > 0 ? 'bg-green-100 text-green-700' : 
              moodImprovement < 0 ? 'bg-red-100 text-red-700' : 
              'bg-gray-100 text-gray-700'
            }`}>
              <Heart className="w-4 h-4" />
              <span className="font-semibold">{improvementText}</span>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="bg-white rounded-3xl p-6 shadow-lg mb-6">
          <h3 className="font-bold text-gray-900 text-lg mb-4">Rate this call</h3>
          
          <div className="flex justify-center gap-2 mb-4">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                onClick={() => setRating(star)}
                className="transition-all duration-300 transform hover:scale-110"
              >
                <Star 
                  className={`w-8 h-8 ${
                    star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                  }`} 
                />
              </button>
            ))}
          </div>
          
          <textarea
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            placeholder="How was your experience? (Optional)"
            className="w-full p-4 bg-gray-50 border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300 text-gray-900 resize-none h-20"
          />
        </div>

        {/* Motivational Message */}
        <div className="bg-gradient-to-r from-yellow-400 to-green-400 rounded-3xl p-6 shadow-lg mb-6 text-white">
          <div className="text-center">
            <div className="text-3xl mb-3">🌟</div>
            <h3 className="font-bold text-lg mb-2">You're doing great!</h3>
            <p className="text-sm opacity-90">
              Remember, it's okay to reach out when you need support. 
              Your {lovedOne.relationship.toLowerCase()} will always be here for you.
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={onCallAgain}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-4 px-6 rounded-2xl border border-gray-200 transition-all duration-300 flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-5 h-5" />
            Call {lovedOne.name} Again
          </button>
          
          <button
            onClick={onHome}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-4 px-6 rounded-2xl transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}