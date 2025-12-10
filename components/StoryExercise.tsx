import React, { useState, useEffect } from 'react';
import { STORY_DATA } from '../constants';
import { RefreshCw, MessageCircle, Sparkles } from 'lucide-react';

const StoryExercise: React.FC = () => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [perfect, setPerfect] = useState(false);

  // Check overall completion
  useEffect(() => {
    let correct = true;
    let filledCount = 0;
    const totalInputs = STORY_DATA.reduce((acc, line) => acc + line.answers.length, 0);

    STORY_DATA.forEach(line => {
      line.answers.forEach((ans, idx) => {
         const key = `${line.id}-${idx}`;
         const userAns = answers[key] || '';
         if (userAns.toLowerCase() !== ans.toLowerCase()) correct = false;
         if (userAns) filledCount++;
      });
    });
    
    if (correct && filledCount === totalInputs) {
      setPerfect(true);
    }
  }, [answers]);

  const handleInput = (lineId: number, idx: number, val: string) => {
    setAnswers(prev => ({ ...prev, [`${lineId}-${idx}`]: val }));
  };

  const handleBlur = (lineId: number, idx: number) => {
    setTouched(prev => ({ ...prev, [`${lineId}-${idx}`]: true }));
  };

  const reset = () => {
    setAnswers({});
    setTouched({});
    setPerfect(false);
  };

  return (
    <div className="cute-card rounded-3xl p-4 md:p-8 cute-shadow border-2 border-yellow-200 h-full flex flex-col animate-pop">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-yellow-500 flex items-center gap-2 tracking-tight">
          <span className="bg-yellow-100 p-2 rounded-xl text-yellow-500"><MessageCircle size={32} /></span>
          Story Time
        </h2>
         <div className="flex gap-2">
            {perfect && <span className="text-green-500 font-bold flex items-center gap-1 bg-green-100 px-3 py-1 rounded-full"><Sparkles size={16}/> Wonderful!</span>}
            <button onClick={reset} className="p-2 bg-yellow-50 rounded-xl text-yellow-500 hover:bg-yellow-100 hover:text-yellow-600 transition-colors">
            <RefreshCw size={24} />
            </button>
        </div>
      </div>
      
      <div className="space-y-6 p-2 rounded-3xl max-h-[70vh] overflow-y-auto pr-2">
        {STORY_DATA.map((line) => (
          <div key={line.id} className={`flex gap-4 ${line.speaker === 'Alice' ? 'flex-row' : 'flex-row-reverse'}`}>
            <div className={`w-16 h-16 rounded-2xl flex items-center justify-center text-4xl shadow-md border-2 shrink-0 transform hover:scale-110 transition-transform
              ${line.speaker === 'Alice' ? 'bg-pink-200 border-pink-300 rotate-2' : 'bg-blue-200 border-blue-300 -rotate-2'}
            `}>
              {line.speaker === 'Alice' ? '👧' : '👴'}
            </div>
            
            <div className={`max-w-[85%] p-5 rounded-3xl shadow-sm text-xl md:text-2xl leading-loose border-2 relative
              ${line.speaker === 'Alice' ? 'bg-white rounded-tl-none border-pink-100 text-gray-800' : 'bg-blue-50 rounded-tr-none border-blue-100 text-blue-900'}
            `}>
              <div className="absolute -top-3 px-3 py-0.5 rounded-full text-xs font-black uppercase tracking-widest text-white shadow-sm
                  ${line.speaker === 'Alice' ? 'left-0 bg-pink-300' : 'right-0 bg-blue-300'}
              " style={{ [line.speaker === 'Alice' ? 'left' : 'right']: '1rem' }}>
                {line.speaker}
              </div>
              
              <div className="flex flex-wrap gap-1 items-baseline font-bold mt-1">
                {line.textParts.map((part, idx) => {
                  const isInputIndex = idx < line.textParts.length - 1;
                  let status = 'neutral';
                  let userAns = '';
                  let answerText = '';

                  if (isInputIndex) {
                    const key = `${line.id}-${idx}`;
                    userAns = answers[key] || '';
                    const isTouched = touched[key];
                    answerText = line.answers[idx];
                    const isCorrect = userAns.toLowerCase() === answerText.toLowerCase();
                    status = (isTouched && userAns) || perfect ? (isCorrect ? 'correct' : 'incorrect') : 'neutral';
                  }

                  return (
                  <React.Fragment key={idx}>
                    <span>{part}</span>
                    {isInputIndex && (
                      <span className="inline-flex flex-col items-center mx-1 align-middle">
                        <div className="flex items-center gap-1">
                            <input
                            type="text"
                            value={userAns}
                            onChange={(e) => handleInput(line.id, idx, e.target.value)}
                            onBlur={() => handleBlur(line.id, idx)}
                            className={`
                                border-b-4 text-center px-1 h-12 focus:outline-none min-w-[80px] font-black rounded-lg transition-all input-pop
                                ${status === 'neutral' 
                                  ? (line.speaker === 'Alice' ? 'border-pink-200 focus:border-pink-400 bg-pink-50/50' : 'border-blue-200 focus:border-blue-400 bg-blue-100/50') 
                                  : ''}
                                ${status === 'correct' ? '!text-green-600 !border-green-500 !bg-green-100' : ''}
                                ${status === 'incorrect' ? '!text-red-500 !border-red-500 !bg-red-100' : ''}
                            `}
                            />
                            {/* Render Hint if available */}
                            {line.hints && line.hints[idx] && (
                                <span className="text-sm text-gray-400 font-bold bg-gray-100 px-1.5 rounded-md border border-gray-200">
                                    {line.hints[idx]}
                                </span>
                            )}
                        </div>
                         {status === 'incorrect' && (
                            <span className="text-sm text-green-700 font-black bg-green-200 px-2 py-1 rounded-lg shadow-md mt-1 border border-green-300 absolute z-20 transform translate-y-12">
                              {answerText}
                            </span>
                         )}
                      </span>
                    )}
                  </React.Fragment>
                )})}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StoryExercise;