import React, { useState } from 'react';
import { ArrowLeft, Phone, Video } from 'lucide-react';
import { LovedOne } from '../types/app';

interface EmotionSelectionScreenProps {
  onBack: () => void;
  onSelectCall: (lovedOne: LovedOne, type: 'voice' | 'video') => void;
}

const lovedOnes: LovedOne[] = [
  {
    id: 'mom',
    name: 'Mom',
    relationship: 'Mother',
    avatar: '👩‍🦳',
    color: 'from-pink-400 to-rose-400',
    description: 'Caring and nurturing'
  },
  {
    id: 'dad',
    name: 'Dad',
    relationship: 'Father',
    avatar: '👨‍🦳',
    color: 'from-blue-400 to-indigo-400',
    description: 'Wise and supportive'
  },
  {
    id: 'sister',
    name: 'Sister',
    relationship: 'Sister',
    avatar: '👩',
    color: 'from-purple-400 to-pink-400',
    description: 'Understanding and fun'
  },
  {
    id: 'brother',
    name: 'Brother',
    relationship: 'Brother',
    avatar: '👨',
    color: 'from-green-400 to-teal-400',
    description: 'Protective and loyal'
  },
  {
    id: 'lover',
    name: 'Partner',
    relationship: 'Romantic Partner',
    avatar: '💕',
    color: 'from-red-400 to-pink-400',
    description: 'Loving and intimate'
  },
  {
    id: 'bestfriend',
    name: 'Best Friend',
    relationship: 'Best Friend',
    avatar: '👫',
    color: 'from-yellow-400 to-orange-400',
    description: 'Always there for you'
  }
];

export default function EmotionSelectionScreen({ onBack, onSelectCall }: EmotionSelectionScreenProps) {
  const [selectedPerson, setSelectedPerson] = useState<LovedOne | null>(null);

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
        <h1 className="text-xl font-bold text-gray-900">Who do you miss today?</h1>
        <div className="w-12"></div>
      </div>

      {/* Content */}
      <div className="flex-1 px-6 pb-6">
        <div className="grid grid-cols-2 gap-4 mb-8">
          {lovedOnes.map((person) => (
            <div
              key={person.id}
              onClick={() => setSelectedPerson(person)}
              className={`bg-white rounded-3xl p-6 shadow-lg border-2 transition-all duration-300 cursor-pointer ${
                selectedPerson?.id === person.id
                  ? 'border-yellow-400 shadow-xl transform scale-105'
                  : 'border-transparent hover:shadow-xl hover:scale-102'
              }`}
            >
              <div className={`w-16 h-16 bg-gradient-to-br ${person.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                <span className="text-2xl">{person.avatar}</span>
              </div>
              
              <div className="text-center">
                <h3 className="font-bold text-gray-900 text-lg mb-1">{person.name}</h3>
                <p className="text-sm text-gray-500 mb-3">{person.description}</p>
                
                <div className="flex gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCall(person, 'voice');
                    }}
                    className="flex-1 bg-green-100 hover:bg-green-200 text-green-700 py-2 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 text-sm font-medium"
                  >
                    <Phone className="w-4 h-4" />
                    Voice
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelectCall(person, 'video');
                    }}
                    className="flex-1 bg-blue-100 hover:bg-blue-200 text-blue-700 py-2 px-3 rounded-xl transition-all duration-300 flex items-center justify-center gap-1 text-sm font-medium"
                  >
                    <Video className="w-4 h-4" />
                    Video
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Others Option */}
        <div className="bg-white rounded-3xl p-6 shadow-lg border border-gray-200">
          <div className="text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-gray-300 to-gray-400 rounded-2xl flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">👥</span>
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">Others</h3>
            <p className="text-sm text-gray-500 mb-4">Connect with someone else special</p>
            <button className="w-full bg-gray-100 hover:bg-gray-200 text-gray-700 py-3 px-6 rounded-2xl transition-all duration-300 font-medium">
              Customize
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}