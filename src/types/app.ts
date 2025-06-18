export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: Date;
}

export interface LovedOne {
  id: string;
  name: string;
  relationship: string;
  avatar: string;
  color: string;
  description: string;
}

export interface CallSession {
  id: string;
  lovedOneId: string;
  type: 'voice' | 'video';
  language: string;
  topic: string;
  description?: string;
  startTime: Date;
  endTime?: Date;
  moodBefore: number;
  moodAfter?: number;
  emotions: EmotionAnalysis[];
}

export interface EmotionAnalysis {
  timestamp: Date;
  emotions: string[];
  sentiment: 'positive' | 'negative' | 'neutral';
  intensity: number;
  confidence: number;
}

export type AppScreen = 
  | 'landing'
  | 'register'
  | 'selection'
  | 'setup'
  | 'voice-call'
  | 'video-call'
  | 'call-end';