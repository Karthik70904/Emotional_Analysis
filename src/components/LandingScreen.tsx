import React from 'react';
import { Heart, ArrowRight } from 'lucide-react';

interface LandingScreenProps {
  onRegister: () => void;
  onFreeTrial: () => void;
}

export default function LandingScreen({ onRegister, onFreeTrial }: LandingScreenProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 to-green-50 flex flex-col">
      {/* Header */}
      <div className="flex-1 flex flex-col justify-center items-center px-6 py-12">
        <div className="w-32 h-32 bg-gradient-to-br from-yellow-400 to-green-400 rounded-full flex items-center justify-center mb-8 shadow-2xl">
          <Heart className="w-16 h-16 text-white" />
        </div>
        
        <h1 className="text-5xl font-bold text-gray-900 text-center mb-4">
          EmoFelix
        </h1>
        
        <p className="text-xl text-gray-600 text-center mb-4 max-w-sm font-medium">
          Connect with virtual versions of your loved ones
        </p>
        
        <p className="text-lg text-gray-500 text-center mb-12 max-w-md">
          Get emotional comfort and support through AI-powered conversations that understand your feelings
        </p>
        
        <div className="w-full max-w-sm space-y-4">
          <button
            onClick={onRegister}
            className="w-full bg-yellow-400 hover:bg-yellow-500 text-gray-900 font-bold py-5 px-8 rounded-3xl transition-all duration-300 transform hover:scale-105 shadow-xl flex items-center justify-center gap-3 text-lg"
          >
            Register
            <ArrowRight className="w-6 h-6" />
          </button>
          
          <button
            onClick={onFreeTrial}
            className="w-full bg-white hover:bg-gray-50 text-gray-700 font-semibold py-5 px-8 rounded-3xl border-2 border-gray-200 transition-all duration-300 text-lg shadow-lg"
          >
            Free Trial
          </button>
        </div>
      </div>
      
      {/* Bottom decoration */}
      <div className="pb-8 flex justify-center">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
          <div className="w-8 h-3 bg-yellow-300 rounded-full"></div>
          <div className="w-3 h-3 bg-yellow-200 rounded-full"></div>
        </div>
      </div>
    </div>
  );
}