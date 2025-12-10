import React, { useState, useMemo, useEffect } from 'react';
import { ChoiceQuestion } from '../types';
import { Trophy } from 'lucide-react';

interface GenericChoiceExerciseProps {
  title: string;
  instruction: string;
  questions: ChoiceQuestion[];
  options: string[];
  onComplete: (score: number, total: number) => void;
  colorTheme: 'blue' | 'purple' | 'orange' | 'teal';
}

const GenericChoiceExercise: React.FC<GenericChoiceExerciseProps> = ({ 
  title, instruction, questions, options, onComplete, colorTheme 
}) => {
  const shuffledQuestions = useMemo(() => {
    return [...questions].sort(() => Math.random() - 0.5);
  }, [questions]);

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [perfect, setPerfect] = useState(false);

  useEffect(() => {
    let correctCount = 0;
    shuffledQuestions.forEach(q => {
      if (userAnswers[q.id]?.toLowerCase() === q.answer.toLowerCase()) correctCount++;
    });
    if (correctCount === shuffledQuestions.length) {
      setPerfect(true);
      onComplete(correctCount, shuffledQuestions.length);
    }
  }, [userAnswers]);
  
  const handleSelect = (qId: number, val: string) => {
    setUserAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const reset = () => {
    setUserAnswers({});
    setPerfect(false);
  };

  const themeConfig = {
    blue:   { text: 'text-blue-500',   bg: 'bg-blue-50',   border: 'border-blue-200',   btn: 'bg-blue-500',   icon: 'bg-blue-100', accent: 'text-blue-600' },
    purple: { text: 'text-purple-500', bg: 'bg-purple-50', border: 'border-purple-200', btn: 'bg-purple-500', icon: 'bg-purple-100', accent: 'text-purple-600' },
    orange: { text: 'text-orange-500', bg: 'bg-orange-50', border: 'border-orange-200', btn: 'bg-orange-500', icon: 'bg-orange-100', accent: 'text-orange-600' },
    teal:   { text: 'text-teal-500',   bg: 'bg-teal-50',   border: 'border-teal-200',   btn: 'bg-teal-500',   icon: 'bg-teal-100', accent: 'text-teal-600' },
  };
  const theme = themeConfig[colorTheme];

  return (
    <div className={`cute-card rounded-3xl p-4 md:p-8 cute-shadow border-2 ${theme.border} h-full animate-pop`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className={`text-3xl font-black ${theme.text} tracking-tight flex items-center gap-2`}>
           <span className={`p-2 rounded-xl ${theme.icon} ${theme.text}`}>★</span>
           {title}
        </h2>
        <div className="flex gap-2">
           {perfect && <span className="text-green-500 font-bold flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full"><Trophy size={16}/> Perfect!</span>}
           <button onClick={reset} className={`p-2 rounded-xl text-gray-400 hover:text-gray-600 ${theme.bg}`}>Reset</button>
        </div>
      </div>
      <p className="mb-6 text-gray-500 font-bold text-lg bg-gray-50 p-3 rounded-xl border border-gray-100 inline-block">{instruction}</p>

      <div className="grid gap-4">
        {shuffledQuestions.map((q, idx) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer?.toLowerCase() === q.answer.toLowerCase();
          const hasAnswered = !!userAnswer;
          
          return (
            <div key={q.id} className={`${theme.bg} p-4 rounded-3xl border-2 border-white shadow-sm transition-all duration-300 hover:shadow-md`}>
              <div className="flex items-start gap-3 mb-4">
                 <div className={`mt-1 w-8 h-8 rounded-xl flex items-center justify-center text-lg font-black text-white shrink-0 shadow-sm ${theme.text.replace('text-', 'bg-')}`}>
                   {idx + 1}
                 </div>
                 <div className="text-xl md:text-2xl text-gray-700 leading-snug font-bold">
                   {q.hint === 'check' && <span className="text-green-500 mr-2 drop-shadow-sm font-black text-3xl align-middle">✓</span>}
                   {q.hint === 'cross' && <span className="text-red-500 mr-2 drop-shadow-sm font-black text-3xl align-middle">✗</span>}
                   {q.question.split('___').map((part, i, arr) => (
                     <React.Fragment key={i}>
                       {part}
                       {i < arr.length - 1 && (
                         <span className={`inline-block mx-2 min-w-[90px] border-b-4 text-center px-2 font-black transition-colors rounded-lg
                           ${hasAnswered 
                             ? (isCorrect ? 'text-green-600 border-green-500 bg-green-100' : 'text-red-500 border-red-500 bg-red-100 line-through') 
                             : (userAnswer ? `text-gray-800 border-gray-400 ${theme.icon}` : 'text-gray-300 border-gray-300 bg-white')
                           }
                         `}>
                           {userAnswer || "..."}
                         </span>
                       )}
                     </React.Fragment>
                   ))}
                   {hasAnswered && !isCorrect && <span className="text-green-600 bg-green-200 px-3 py-1 rounded-xl ml-2 text-xl font-black shadow-sm inline-block">({q.answer})</span>}
                 </div>
              </div>
              
              <div className="flex flex-wrap gap-2 ml-11">
                {options.map(opt => {
                  const isSelected = userAnswer === opt;
                  let btnStyle = "bg-white border-2 border-white text-gray-400 hover:border-gray-200 hover:text-gray-600";
                  
                  if (isSelected) {
                      if (isCorrect) {
                          btnStyle = "bg-green-100 border-2 border-green-400 text-green-700 font-black shadow-none ring-0";
                      } else {
                          btnStyle = "bg-red-100 border-2 border-red-300 text-red-500 opacity-80 shadow-none ring-0";
                      }
                  } else if (hasAnswered) {
                       btnStyle = "opacity-30 border-transparent shadow-none";
                  }

                  return (
                    <button
                      key={opt}
                      onClick={() => handleSelect(q.id, opt)}
                      className={`px-4 py-2 rounded-xl text-lg font-bold transition-all transform active:scale-95 ${btnStyle}`}
                    >
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default GenericChoiceExercise;