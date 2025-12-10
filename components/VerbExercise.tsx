import React, { useState, useEffect } from 'react';
import { Check, X, Sparkles } from 'lucide-react';
import { VerbRow } from '../types';
import { VERB_DATA } from '../constants';

interface VerbExerciseProps {
  onComplete: (score: number, total: number) => void;
}

const VerbExercise: React.FC<VerbExerciseProps> = ({ onComplete }) => {
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [completed, setCompleted] = useState(false);

  const totalInputs = VERB_DATA.reduce((acc, row) => acc + row.hiddenFields.length, 0);

  // Check overall completion
  useEffect(() => {
    let correctCount = 0;
    let allFilled = true;
    
    VERB_DATA.forEach((row) => {
      row.hiddenFields.forEach((field) => {
        const key = `${row.id}-${field}`;
        const userAnswer = answers[key]?.trim().toLowerCase() || '';
        const correctAnswer = row[field as keyof VerbRow] as string;
        
        if (userAnswer === correctAnswer) {
          correctCount++;
        }
        if (!userAnswer) allFilled = false;
      });
    });

    if (correctCount === totalInputs && !completed) {
      setCompleted(true);
      onComplete(correctCount, totalInputs);
    }
  }, [answers]);

  const handleInputChange = (id: number, field: string, value: string) => {
    setAnswers((prev) => ({ ...prev, [`${id}-${field}`]: value }));
  };

  const handleBlur = (id: number, field: string) => {
    setTouched((prev) => ({ ...prev, [`${id}-${field}`]: true }));
  };

  const getInputStatus = (id: number, field: string) => {
    const key = `${id}-${field}`;
    if (!touched[key] && !completed) return 'neutral';
    
    const row = VERB_DATA.find((r) => r.id === id);
    if (!row) return 'neutral';
    
    const userAnswer = answers[key]?.trim().toLowerCase() || '';
    if (!userAnswer && !completed) return 'neutral'; // Don't mark empty as wrong immediately unless completed

    const correctAnswer = (row[field as keyof VerbRow] as string).toLowerCase();
    return userAnswer === correctAnswer ? 'correct' : 'incorrect';
  };

  return (
    <div className="cute-card rounded-3xl p-4 md:p-8 cute-shadow border-2 border-pink-200 animate-pop">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-black text-pink-500 tracking-tight flex items-center gap-2">
          <span className="bg-pink-100 p-2 rounded-xl text-pink-500">🏃</span>
          A. Verb Table
        </h2>
        {completed && <span className="text-green-500 font-bold flex items-center gap-1 animate-bounce"><Sparkles size={20}/> Perfect!</span>}
      </div>
      
      <div className="overflow-x-auto rounded-xl border border-pink-100">
        <table className="w-full min-w-[700px] border-separate border-spacing-0">
          <thead>
            <tr className="bg-pink-50 text-pink-400 text-lg md:text-xl font-bold">
              <th className="py-4 px-3 text-center w-1/5 border-b-2 border-pink-100 first:rounded-tl-xl">Chinese</th>
              <th className="py-4 px-3 text-center w-1/5 border-b-2 border-pink-100">Base Form</th>
              <th className="py-4 px-3 text-center w-1/5 border-b-2 border-pink-100">Past Tense</th>
              <th className="py-4 px-3 text-center w-1/5 border-b-2 border-pink-100">Past Participle</th>
              <th className="py-4 px-3 text-center w-1/5 border-b-2 border-pink-100 last:rounded-tr-xl">Present Participle</th>
            </tr>
          </thead>
          <tbody>
            {VERB_DATA.map((row) => (
              <tr key={row.id} className="hover:bg-pink-50/30 transition-colors group">
                 {/* Chinese Column */}
                 <td className="p-2 border-b border-pink-50">
                    <div className="text-center font-bold text-gray-500 text-lg md:text-xl py-2">
                      {row.chinese}
                    </div>
                 </td>
                {['base', 'past', 'pastParticiple', 'presentParticiple'].map((field) => {
                  const isHidden = row.hiddenFields.includes(field as any);
                  const status = getInputStatus(row.id, field);
                  
                  return (
                    <td key={field} className="p-2 border-b border-pink-50">
                      {isHidden ? (
                        <div className="relative h-full">
                          <input
                            type="text"
                            value={answers[`${row.id}-${field}`] || ''}
                            onChange={(e) => handleInputChange(row.id, field, e.target.value)}
                            onBlur={() => handleBlur(row.id, field)}
                            className={`
                              w-full text-center py-3 px-2 rounded-xl border-2 outline-none transition-all font-bold text-xl md:text-2xl input-pop
                              ${status === 'neutral' ? 'border-pink-100 bg-white text-gray-700 focus:border-pink-300' : ''}
                              ${status === 'correct' ? 'border-green-400 bg-green-50 text-green-600' : ''}
                              ${status === 'incorrect' ? 'border-red-300 bg-red-50 text-red-500' : ''}
                            `}
                          />
                          {status === 'correct' && <Check size={24} strokeWidth={3} className="absolute right-2 top-1/2 -translate-y-1/2 text-green-500" />}
                          {status === 'incorrect' && <X size={24} strokeWidth={3} className="absolute right-2 top-1/2 -translate-y-1/2 text-red-400" />}
                        </div>
                      ) : (
                        <div className="text-center font-black text-pink-400 text-xl md:text-2xl py-3 rounded-lg mx-1">
                          {row[field as keyof VerbRow]}
                        </div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default VerbExercise;