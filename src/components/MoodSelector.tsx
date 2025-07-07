import React from 'react';
import { 
  Smile, 
  Zap, 
  Crown, 
  Palette, 
  Leaf, 
  Heart, 
  Shield, 
  Star 
} from 'lucide-react';

const moods = [
  { id: 'general', name: 'General', icon: Smile, gradient: 'linear-gradient(135deg, #667eea, #764ba2)' },
  { id: 'motivation', name: 'Motivation', icon: Zap, gradient: 'linear-gradient(135deg, #f093fb, #f5576c)' },
  { id: 'confidence', name: 'Confidence', icon: Crown, gradient: 'linear-gradient(135deg, #ffecd2, #fcb69f)' },
  { id: 'creative', name: 'Creative', icon: Palette, gradient: 'linear-gradient(135deg, #a8edea, #fed6e3)' },
  { id: 'calm', name: 'Calm', icon: Leaf, gradient: 'linear-gradient(135deg, #d299c2, #fef9d7)' },
  { id: 'grateful', name: 'Grateful', icon: Heart, gradient: 'linear-gradient(135deg, #89f7fe, #66a6ff)' },
  { id: 'strong', name: 'Strong', icon: Shield, gradient: 'linear-gradient(135deg, #fa709a, #fee140)' },
  { id: 'inspiring', name: 'Inspiring', icon: Star, gradient: 'linear-gradient(135deg, #43e97b, #38f9d7)' },
];

interface MoodSelectorProps {
  selectedMood: string;
  onMoodChange: (mood: string) => void;
}

export const MoodSelector: React.FC<MoodSelectorProps> = ({ selectedMood, onMoodChange }) => {
  return (
    <div className="bg-white/80 backdrop-blur-md rounded-3xl p-6 shadow-xl border border-white/60">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Choose Your Mood
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {moods.map((mood) => {
          const Icon = mood.icon;
          const isSelected = selectedMood === mood.id;
          
          return (
            <button
              key={mood.id}
              onClick={() => onMoodChange(mood.id)}
              className={`
                relative p-4 rounded-2xl transition-all duration-300 transform hover:scale-105 border-2
                ${isSelected 
                  ? 'shadow-lg shadow-purple-200/50 scale-105 border-white/80' 
                  : 'shadow-md hover:shadow-lg border-transparent hover:border-white/40'
                }
              `}
              style={{
                background: isSelected 
                  ? mood.gradient
                  : 'linear-gradient(135deg, rgba(255, 255, 255, 0.9), rgba(248, 250, 252, 0.8))'
              }}
            >
              <div className="flex flex-col items-center space-y-2 relative z-10">
                <Icon 
                  className={`w-6 h-6 transition-colors duration-300 ${
                    isSelected ? 'text-white drop-shadow-sm' : 'text-gray-600'
                  }`} 
                />
                <span 
                  className={`text-sm font-medium transition-colors duration-300 ${
                    isSelected ? 'text-white drop-shadow-sm' : 'text-gray-700'
                  }`}
                >
                  {mood.name}
                </span>
              </div>
              
              {isSelected && (
                <div className="absolute inset-0 rounded-2xl ring-2 ring-white/60 ring-offset-2 ring-offset-transparent"></div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};
