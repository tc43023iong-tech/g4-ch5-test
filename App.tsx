import React, { useState } from 'react';
import VerbExercise from './components/VerbExercise';
import VocabExercise from './components/VocabExercise';
import GenericChoiceExercise from './components/GenericChoiceExercise';
import SimplePastExercise from './components/SimplePastExercise';
import StoryExercise from './components/StoryExercise';
import Confetti from './components/Confetti';
import { ExerciseSection } from './types';
import { PRONOUN_QUESTIONS, EXISTENCE_QUESTIONS, BONUS_QUESTIONS } from './constants';
import { Pencil, BookOpen, Trophy, MessageCircle, HelpCircle, Clock, CheckCircle2 } from 'lucide-react';

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<ExerciseSection>('verbs');
  const [showConfetti, setShowConfetti] = useState(false);
  
  // Progress tracking
  const [progress, setProgress] = useState<Record<ExerciseSection, boolean>>({
    verbs: false,
    vocabulary: false,
    pronouns: false,
    existence: false,
    story: false,
    simplePast: false,
    bonus: false
  });

  const handleComplete = (section: ExerciseSection) => (score: number, total: number) => {
    if (score === total) {
      if (!progress[section]) {
        setProgress(prev => ({ ...prev, [section]: true }));
        triggerCelebration();
      }
    }
  };

  const triggerCelebration = () => {
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 5000);
  };

  const navItems = [
    { id: 'verbs', label: 'Verbs', icon: <Pencil size={20} />, color: 'text-pink-600 bg-pink-100 border-pink-300' },
    { id: 'vocabulary', label: 'Vocab', icon: <BookOpen size={20} />, color: 'text-blue-600 bg-blue-100 border-blue-300' },
    { id: 'pronouns', label: 'Pronouns', icon: <HelpCircle size={20} />, color: 'text-purple-600 bg-purple-100 border-purple-300' },
    { id: 'existence', label: 'Was/Were', icon: <CheckCircle2 size={20} />, color: 'text-orange-600 bg-orange-100 border-orange-300' },
    { id: 'story', label: 'Story', icon: <MessageCircle size={20} />, color: 'text-yellow-600 bg-yellow-100 border-yellow-300' },
    { id: 'simplePast', label: 'Past Tense', icon: <Clock size={20} />, color: 'text-red-600 bg-red-100 border-red-300' },
    { id: 'bonus', label: 'Be Verbs', icon: <Trophy size={20} />, color: 'text-teal-600 bg-teal-100 border-teal-300' },
  ] as const;

  return (
    <div className="min-h-screen text-gray-800 pb-12 selection:bg-yellow-200">
      <Confetti isActive={showConfetti} />
      
      {/* Header */}
      <header className="bg-white/90 backdrop-blur-md border-b-4 border-green-200 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-green-400 rounded-2xl flex items-center justify-center text-white shadow-[4px_4px_0_#15803d] border-2 border-green-600 transform -rotate-3 hover:rotate-0 transition-transform cursor-pointer">
              <BookOpen size={28} strokeWidth={3} />
            </div>
            <h1 className="text-2xl md:text-4xl font-black text-green-600 tracking-tight drop-shadow-sm hidden md:block">
              Grammar Garden
            </h1>
            <h1 className="text-2xl font-black text-green-600 tracking-tight drop-shadow-sm md:hidden">
              Grammar
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-yellow-100 px-4 py-2 rounded-2xl border-b-4 border-yellow-300 shadow-sm">
            <Trophy size={24} className="text-yellow-500 fill-yellow-400" />
            <span className="font-black text-yellow-700 text-xl">
              {Object.values(progress).filter(Boolean).length}/{Object.keys(progress).length}
            </span>
          </div>
        </div>
        
        {/* Compact Scrollable Navigation */}
        <div className="bg-white/50 backdrop-blur-sm border-b border-green-100 overflow-x-auto no-scrollbar">
          <div className="max-w-7xl mx-auto px-2 py-2 flex gap-3 min-w-max">
            {navItems.map((item) => {
              const isActive = activeSection === item.id;
              const isDone = progress[item.id as ExerciseSection];
              
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id as ExerciseSection)}
                  className={`
                    flex items-center gap-2 px-4 py-2 rounded-2xl font-bold transition-all duration-200 border-b-4 active:scale-95 text-lg whitespace-nowrap
                    ${isActive 
                      ? `${item.color} -translate-y-1 shadow-md` 
                      : 'bg-white border-transparent text-gray-400 hover:bg-gray-50 border-gray-100'
                    }
                  `}
                >
                  {item.icon}
                  {item.label}
                  {isDone && <CheckCircle2 size={18} strokeWidth={3} className="text-green-500 fill-green-100" />}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-2 md:px-4 mt-6 md:mt-8">
        <div className="transition-all duration-300">
          {activeSection === 'verbs' && <VerbExercise onComplete={handleComplete('verbs')} />}
          {activeSection === 'vocabulary' && <VocabExercise onComplete={handleComplete('vocabulary')} />}
          
          {activeSection === 'pronouns' && (
            <GenericChoiceExercise 
              title="E. Pronouns Party!"
              instruction="Fill in with: anybody, nobody, everybody."
              questions={PRONOUN_QUESTIONS}
              options={['anybody', 'nobody', 'everybody']}
              onComplete={handleComplete('pronouns')}
              colorTheme="purple"
            />
          )}

          {activeSection === 'existence' && (
            <GenericChoiceExercise 
              title="F. Was & Were!"
              instruction="Check the sign (✓/✗) and choose!"
              questions={EXISTENCE_QUESTIONS}
              options={['was', 'wasn\'t', 'were', 'weren\'t']}
              onComplete={handleComplete('existence')}
              colorTheme="orange"
            />
          )}

          {activeSection === 'story' && <StoryExercise />}

          {activeSection === 'simplePast' && <SimplePastExercise onComplete={handleComplete('simplePast')} />}

          {activeSection === 'bonus' && (
             <GenericChoiceExercise 
              title="Be Verbs"
              instruction="Choose the correct 'to be' verb."
              questions={BONUS_QUESTIONS}
              options={['is', 'am', 'are', 'was', 'were']}
              onComplete={handleComplete('bonus')}
              colorTheme="teal"
            />
          )}
        </div>
      </main>
      
      <footer className="text-center py-10 text-green-700/50 text-base font-bold">
        <p>Keep growing your brain! 🌱</p>
      </footer>
    </div>
  );
};

export default App;