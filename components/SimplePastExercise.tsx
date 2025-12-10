import React, { useState, useMemo, useEffect } from 'react';
import { SIMPLE_PAST_QUESTIONS } from '../constants';
import { RefreshCw, Sparkles } from 'lucide-react';

interface SimplePastExerciseProps {
  onComplete: (score: number, total: number) => void;
}

const SimplePastExercise: React.FC<SimplePastExerciseProps> = ({ onComplete }) => {
  const shuffledQuestions = useMemo(() => {
    return [...SIMPLE_PAST_QUESTIONS].sort(() => Math.random() - 0.5);
  }, []);

  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [allCorrect, setAllCorrect] = useState(false);

  const totalInputs = shuffledQuestions.reduce((acc, q) => acc + q.answers.length, 0);

  // Check overall completion
  useEffect(() => {
    let correct = true;
    let filledCount = 0;
    
    shuffledQuestions.forEach(q => {
      q.answers.forEach((ans, idx) => {
        const userAns = answers[`${q.id}-${idx}`]?.trim();
        const normalizedUser = userAns?.toLowerCase().replace(/\s+/g, '');
        const normalizedCorrect = ans.toLowerCase().replace(/\s+/g, '');
        if (normalizedUser !== normalizedCorrect) correct = false;
        if (userAns) filledCount++;
      });
    });

    if (correct && filledCount === totalInputs) {
      setAllCorrect(true);
      onComplete(shuffledQuestions.length, shuffledQuestions.length);
    }
  }, [answers]);

  const handleInput = (qId: number, idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [`${qId}-${idx}`]: val }));
  };
  
  const handleBlur = (qId: number, idx: number) => {
    setTouched(prev => ({ ...prev, [`${qId}-${idx}`]: true }));
  };

  const reset = () => {
    setAnswers({});
    setTouched({});
    setAllCorrect(false);
  };

  return (
    <div className="cute-card rounded-3xl p-4 md:p-8 cute-shadow border-2 border-red-200 animate-pop">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-red-500 tracking-tight flex items-center gap-2">
          <span className="bg-red-100 p-2 rounded-xl text-red-500">⚡</span>
          H. Past Tense
        </h2>
        <div className="flex gap-2">
            {allCorrect && <span className="text-green-500 font-bold flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full"><Sparkles size={16}/> Correct!</span>}
            <button onClick={reset} className="p-2 bg-red-50 rounded-xl text-red-400 hover:bg-red-100 hover:text-red-600 transition-colors">
            <RefreshCw size={24} />
            </button>
        </div>
      </div>

      <div className="grid gap-4">
        {shuffledQuestions.map((q, qIdx) => (
          <div key={q.id} className="bg-red-50/50 rounded-3xl p-4 flex items-start md:items-center gap-4 border-2 border-red-100 hover:border-red-200 transition-colors">
             <div className="bg-red-400 text-white w-10 h-10 rounded-xl flex items-center justify-center text-xl font-black shrink-0 shadow-sm mt-1 md:mt-0 transform -rotate-2">
               {qIdx + 1}
             </div>
             <div className="flex flex-wrap items-baseline gap-1 text-xl md:text-2xl text-gray-700 font-bold leading-relaxed w-full">
               {q.parts.map((part, pIdx) => {
                 const isInputIndex = pIdx < q.parts.length - 1;
                 let status = 'neutral';
                 let userAns = '';
                 let answerText = '';
                 let inputWidthClass = 'w-24';

                 if (isInputIndex) {
                    const key = `${q.id}-${pIdx}`;
                    userAns = answers[key] || '';
                    const isTouched = touched[key];
                    answerText = q.answers[pIdx];
                    const isCorrect = userAns.toLowerCase().replace(/\s/g,'') === answerText.toLowerCase().replace(/\s/g,'');
                    status = (isTouched && userAns) || allCorrect ? (isCorrect ? 'correct' : 'incorrect') : 'neutral';
                    inputWidthClass = answerText.length > 6 ? 'w-40' : 'w-24';
                 }
                 
                 return (
                 <React.Fragment key={pIdx}>
                   <span>{part}</span>
                   {isInputIndex && (
                     <div className="inline-flex flex-col items-center align-middle mx-1">
                       <input
                         type="text"
                         value={userAns}
                         onChange={(e) => handleInput(q.id, pIdx, e.target.value)}
                         onBlur={() => handleBlur(q.id, pIdx)}
                         className={`border-b-4 text-center px-1 py-1 focus:outline-none rounded-t-lg font-black transition-all input-pop
                           ${inputWidthClass}
                           ${status === 'neutral' ? 'border-red-200 bg-white text-gray-800 focus:border-red-400' : ''}
                           ${status === 'correct' ? 'text-green-600 border-green-500 bg-green-100' : ''}
                           ${status === 'incorrect' ? 'text-red-500 border-red-500 bg-red-100' : ''}
                         `}
                         autoComplete="off"
                       />
                       {status === 'incorrect' && (
                         <span className="text-base text-green-600 font-black mt-1 bg-green-100 px-2 py-0.5 rounded shadow-sm border border-green-200 absolute transform translate-y-8 z-10">
                           {answerText}
                         </span>
                       )}
                     </div>
                   )}
                 </React.Fragment>
               )})}
             </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SimplePastExercise;