
import React from 'react';
import { Calendar, Target, Heart, Flame } from 'lucide-react';

interface Stats {
  dailyCount: number;
  totalCount: number;
  favoriteCount: number;
  streak: number;
  mostUsedMood: string;
}

interface StatsPanelProps {
  stats: Stats;
}

export const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  const statItems = [
    {
      label: 'Today',
      value: stats.dailyCount,
      icon: Calendar,
      color: 'from-blue-400 to-cyan-400'
    },
    {
      label: 'Total',
      value: stats.totalCount,
      icon: Target,
      color: 'from-purple-400 to-pink-400'
    },
    {
      label: 'Favorites',
      value: stats.favoriteCount,
      icon: Heart,
      color: 'from-red-400 to-pink-400'
    },
    {
      label: 'Streak',
      value: stats.streak,
      icon: Flame,
      color: 'from-orange-400 to-red-400'
    }
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-3xl p-6 shadow-xl border border-white/50">
      <h3 className="text-xl font-semibold text-gray-800 mb-4 text-center">
        Your Stats
      </h3>
      
      <div className="grid grid-cols-2 gap-4">
        {statItems.map((item, index) => {
          const Icon = item.icon;
          
          return (
            <div
              key={index}
              className="text-center p-4 bg-gradient-to-br from-white/50 to-gray-50/50 rounded-2xl shadow-md"
            >
              <div 
                className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${item.color} mb-2`}
              >
                <Icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-2xl font-bold text-gray-800">
                {item.value}
              </div>
              <div className="text-sm text-gray-600">
                {item.label}
              </div>
            </div>
          );
        })}
      </div>

      {stats.mostUsedMood && (
        <div className="mt-4 p-3 bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl">
          <div className="text-center">
            <div className="text-sm text-gray-600">Most Used Mood</div>
            <div className="text-lg font-semibold text-purple-800 capitalize">
              {stats.mostUsedMood}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
