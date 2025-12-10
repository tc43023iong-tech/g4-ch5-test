import React, { useState, useMemo, useEffect } from 'react';
import { VOCAB_QUESTIONS, VOCAB_OPTIONS } from '../constants';
import { RefreshCw, CheckCircle2, Trophy } from 'lucide-react';

interface VocabExerciseProps {
  onComplete: (score: number, total: number) => void;
}

const VocabExercise: React.FC<VocabExerciseProps> = ({ onComplete }) => {
  const shuffledQuestions = useMemo(() => {
    return [...VOCAB_QUESTIONS].sort(() => Math.random() - 0.5);
  }, []);

  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [allCorrect, setAllCorrect] = useState(false);

  useEffect(() => {
    let correctCount = 0;
    shuffledQuestions.forEach(q => {
      if (userAnswers[q.id] === q.answer) correctCount++;
    });
    if (correctCount === shuffledQuestions.length) {
      setAllCorrect(true);
      onComplete(correctCount, shuffledQuestions.length);
    }
  }, [userAnswers]);

  const handleOptionSelect = (questionId: number, option: string) => {
    setUserAnswers(prev => ({ ...prev, [questionId]: option }));
  };

  const reset = () => {
    setUserAnswers({});
    setAllCorrect(false);
  };

  return (
    <div className="cute-card rounded-3xl p-4 md:p-8 cute-shadow border-2 border-blue-200 flex flex-col h-full animate-pop">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-blue-500 tracking-tight flex items-center gap-2">
          <span className="bg-blue-100 p-2 rounded-xl text-blue-500">🧩</span>
          B. Vocabulary
        </h2>
        <div className="flex gap-2">
           {allCorrect && <span className="text-green-500 font-bold flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full"><Trophy size={16}/> Done!</span>}
           <button onClick={reset} className="p-2 bg-blue-50 rounded-xl text-blue-400 hover:bg-blue-100 hover:text-blue-600 transition-colors">
             <RefreshCw size={24} />
           </button>
        </div>
      </div>

      <div className="grid gap-4">
        {shuffledQuestions.map((q, index) => {
          const userAnswer = userAnswers[q.id];
          const isCorrect = userAnswer === q.answer;
          // Status depends on whether the user has answered THIS specific question
          const status = !userAnswer ? 'neutral' : isCorrect ? 'correct' : 'incorrect';

          return (
            <div key={q.id} className={`rounded-2xl p-4 border-2 transition-all duration-300
              ${status === 'neutral' ? 'bg-white border-blue-50 hover:border-blue-200' : ''}
              ${status === 'correct' ? 'bg-green-50 border-green-200' : ''}
              ${status === 'incorrect' ? 'bg-red-50 border-red-200' : ''}
            `}>
              <div className="flex items-start gap-4 mb-3">
                <div className={`mt-1.5 w-8 h-8 flex items-center justify-center rounded-xl text-lg font-black shrink-0 transition-colors
                   ${status === 'correct' ? 'bg-green-400 text-white' : status === 'incorrect' ? 'bg-red-400 text-white' : 'bg-blue-200 text-blue-600'}
                `}>
                  {index + 1}
                </div>
                <div className="text-xl md:text-2xl leading-relaxed text-gray-700 font-bold">
                  <span>{q.sentencePart1}</span>
                  <span className={`inline-block mx-2 px-3 py-1 rounded-lg border-b-4 text-center min-w-[120px] transition-all
                      ${!userAnswer ? 'border-gray-200 bg-gray-50 text-gray-400' : 'text-blue-600 border-blue-300 bg-blue-50'}
                      ${status === 'correct' ? '!text-green-700 !border-green-400 !bg-green-200' : ''}
                      ${status === 'incorrect' ? '!text-red-500 !border-red-300 !bg-red-100 line-through' : ''}
                    `}>
                    {userAnswer || "..."}
                  </span>
                  {status === 'incorrect' && <span className="inline-block text-green-600 bg-green-100 px-2 py-1 rounded-lg text-lg font-black ml-1 shadow-sm">{q.answer}</span>}
                  <span>{q.sentencePart2}</span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 pl-12">
                {VOCAB_OPTIONS.map((option) => {
                  const isSelected = userAnswer === option;
                  const isCorrectAnswer = option === q.answer;
                  
                  // Logic for button styles:
                  // 1. If this option is selected:
                  //    - If correct: Green
                  //    - If incorrect: Red
                  // 2. If this option is NOT selected, but another IS:
                  //    - If this option IS the correct one (user picked wrong): Maybe highlight it? Or keep it neutral.
                  //    Let's keep it neutral but fade it out slightly.
                  
                  let btnClass = "border-2 border-gray-100 bg-white text-gray-500 hover:border-blue-300 hover:text-blue-500 hover:shadow-md transform hover:-translate-y-0.5";
                  
                  if (isSelected) {
                      if (isCorrect) {
                           btnClass = "border-2 border-green-500 bg-green-100 text-green-800 font-black shadow-none ring-0";
                      } else {
                           btnClass = "border-2 border-red-300 bg-red-100 text-red-400 opacity-80 shadow-none ring-0";
                      }
                  } else if (userAnswer) {
                      // User has answered, but this isn't the selected one.
                      btnClass = "border-gray-100 text-gray-300 opacity-40 shadow-none";
                  }

                  return (
                    <button
                      key={option}
                      onClick={() => handleOptionSelect(q.id, option)}
                      className={`py-2 px-4 rounded-xl text-lg font-bold transition-all duration-200 ${btnClass}`}
                    >
                      {option}
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

export default VocabExercise;