import React, { useState, useEffect } from 'react';
import { ComplimentGenerator } from '@/components/ComplimentGenerator';
import { StatsPanel } from '@/components/StatsPanel';
import { HistoryPanel } from '@/components/HistoryPanel';
import { MoodSelector } from '@/components/MoodSelector';
import { Header } from '@/components/Header';
import { ParticleBackground } from '@/components/ParticleBackground';
import { ConfettiEffect } from '@/components/ConfettiEffect';
import { useComplimentData } from '@/hooks/useComplimentData';
import { generateCompliment } from '@/utils/complimentGenerator';

const Index = () => {
  const {
    currentCompliment,
    setCurrentCompliment,
    stats,
    history,
    favorites,
    addToHistory,
    toggleFavorite,
    incrementDailyCount
  } = useComplimentData();

  const [selectedMood, setSelectedMood] = useState('general');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleGenerateCompliment = async () => {
    setIsGenerating(true);
    
    // Simulate AI thinking time for better UX
    setTimeout(() => {
      const newCompliment = generateCompliment(selectedMood);
      setCurrentCompliment(newCompliment);
      addToHistory(newCompliment);
      incrementDailyCount();
      setIsGenerating(false);
      
      // Trigger confetti effect
      setShowConfetti(true);
    }, 800);
  };

  // Generate initial compliment for new users
  useEffect(() => {
    if (!currentCompliment) {
      const initialCompliment = generateCompliment('general');
      setCurrentCompliment(initialCompliment);
      addToHistory(initialCompliment);
    }
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 via-pink-50 to-blue-100 relative overflow-hidden">
      {/* Particle Background */}
      <ParticleBackground />
      
      {/* Confetti Effect */}
      <ConfettiEffect 
        trigger={showConfetti} 
        onComplete={() => setShowConfetti(false)}
      />
      
      <div className="container mx-auto px-4 py-3 max-w-6xl relative z-10">
        <Header />
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 mt-4">
          {/* Main Generator Section */}
          <div className="lg:col-span-2 flex flex-col items-center">
            <div className="fade-in-scale">
              <ComplimentGenerator
                compliment={currentCompliment}
                onGenerate={handleGenerateCompliment}
                isGenerating={isGenerating}
                isFavorite={currentCompliment ? favorites.includes(currentCompliment.id) : false}
                onToggleFavorite={() => currentCompliment && toggleFavorite(currentCompliment.id)}
              />
            </div>
            <div className="mt-3 w-full max-w-xl slide-in-left">
              <MoodSelector 
                selectedMood={selectedMood}
                onMoodChange={setSelectedMood}
              />
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-4 slide-in-right">
            <StatsPanel stats={stats} />
            <HistoryPanel 
              history={history}
              favorites={favorites}
              onSelectCompliment={(compliment) => {
                setCurrentCompliment(compliment);
                setSelectedMood(compliment.mood);
              }}
              onToggleFavorite={toggleFavorite}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
