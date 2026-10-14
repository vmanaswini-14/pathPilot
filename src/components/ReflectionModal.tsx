import React, { useState } from 'react';
import { X, Heart, AlertCircle, Compass, CheckCircle2, Sparkles } from 'lucide-react';
import { CareerRole, TryoutReflection } from '../types';
import { CAREER_LIST } from '../data/careers';

interface ReflectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  careerId: CareerRole;
  initialReflection?: TryoutReflection | null;
  onSaveReflection: (careerId: CareerRole, reflection: TryoutReflection) => void;
}

export const ReflectionModal: React.FC<ReflectionModalProps> = ({
  isOpen,
  onClose,
  careerId,
  initialReflection,
  onSaveReflection,
}) => {
  if (!isOpen) return null;

  const career = CAREER_LIST.find((c) => c.id === careerId) || CAREER_LIST[0];

  const [enjoyment, setEnjoyment] = useState<'loved' | 'liked' | 'neutral' | 'disliked'>(
    initialReflection?.enjoyment || 'liked'
  );
  const [enjoymentDetails, setEnjoymentDetails] = useState<string>(
    initialReflection?.enjoymentDetails || ''
  );

  const [difficulties, setDifficulties] = useState<string[]>(
    initialReflection?.difficulties || []
  );
  const [difficultyNote, setDifficultyNote] = useState<string>(
    initialReflection?.difficultyNote || ''
  );

  const [exploreFurther, setExploreFurther] = useState<
    'yes_enthusiastic' | 'maybe_more_prep' | 'unlikely_prefer_others'
  >(initialReflection?.exploreFurther || 'yes_enthusiastic');

  const commonDifficulties = [
    'Synthesizing tabular data with SQL',
    'Writing aggregations and WHERE filters',
    'Stepping into users’ emotional perspective',
    'Understanding type coercion & boundary checks',
    'Formulating actionable recommendations',
    'Structuring clear professional memos',
  ];

  const toggleDifficulty = (tag: string) => {
    if (difficulties.includes(tag)) {
      setDifficulties(difficulties.filter((d) => d !== tag));
    } else {
      setDifficulties([...difficulties, tag]);
    }
  };

  const handleSave = () => {
    const reflection: TryoutReflection = {
      enjoyment,
      enjoymentDetails,
      difficulties,
      difficultyNote,
      exploreFurther,
      submittedAt: new Date().toISOString(),
    };
    onSaveReflection(careerId, reflection);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D9C7B5] p-6 sm:p-7 space-y-6 text-[#4A3028]">
        {/* Header */}
        <div className="flex items-start justify-between pb-4 border-b border-[#D9C7B5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]">
                {career.title}
              </span>
              <span className="text-xs text-[#806B5E] font-medium">Post-Tryout Reflection</span>
            </div>
            <h2 className="text-xl font-bold text-[#4A3028] mt-1">
              Reflect on Your Experience
            </h2>
            <p className="text-xs text-[#806B5E] mt-0.5">
              Your honest feelings directly shape your personalized roadmap.
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-[#806B5E] hover:text-[#4A3028] p-1.5 rounded-lg hover:bg-[#F8F3EB] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Question 1: Enjoyment */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3028]">
            1. Did you enjoy this task?
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {[
              { id: 'loved', label: 'Loved it! 🔥', desc: 'Energizing and fun' },
              { id: 'liked', label: 'Liked it 👍', desc: 'Interesting work' },
              { id: 'neutral', label: 'Neutral 😐', desc: 'Felt like homework' },
              { id: 'disliked', label: 'Disliked it 👎', desc: 'Draining or tedious' },
            ].map((opt) => (
              <button
                key={opt.id}
                type="button"
                onClick={() => setEnjoyment(opt.id as any)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  enjoyment === opt.id
                    ? 'border-[#B9825B] bg-[#E8D6C3]/50 ring-2 ring-[#B9825B]/30'
                    : 'border-[#D9C7B5] hover:border-[#B9825B] bg-white'
                }`}
              >
                <div className="font-bold text-xs text-[#4A3028]">{opt.label}</div>
                <div className="text-[10px] text-[#806B5E] mt-0.5">{opt.desc}</div>
              </button>
            ))}
          </div>
          <input
            type="text"
            value={enjoymentDetails}
            onChange={(e) => setEnjoymentDetails(e.target.value)}
            placeholder="Optional: What part felt the most satisfying or engaging?"
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9C7B5] focus:border-[#B9825B] focus:ring-1 focus:ring-[#B9825B]/20 outline-none"
          />
        </div>

        {/* Question 2: Difficulties */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3028]">
            2. What felt difficult or challenging?
          </label>
          <div className="flex flex-wrap gap-2">
            {commonDifficulties.map((tag) => {
              const isSelected = difficulties.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleDifficulty(tag)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                    isSelected
                      ? 'bg-[#B9825B] text-white shadow-xs'
                      : 'bg-[#F8F3EB] hover:bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
          <input
            type="text"
            value={difficultyNote}
            onChange={(e) => setDifficultyNote(e.target.value)}
            placeholder="Optional: Any specific roadblock you encountered?"
            className="w-full px-3 py-2 text-xs rounded-lg border border-[#D9C7B5] focus:border-[#B9825B] focus:ring-1 focus:ring-[#B9825B]/20 outline-none"
          />
        </div>

        {/* Question 3: Explore Further */}
        <div className="space-y-3">
          <label className="block text-xs font-bold uppercase tracking-wider text-[#4A3028]">
            3. Would you like to explore this career path further?
          </label>
          <div className="space-y-2">
            {[
              {
                id: 'yes_enthusiastic',
                title: 'Yes, definitely!',
                sub: 'I want to build my first portfolio project in this domain.',
              },
              {
                id: 'maybe_more_prep',
                title: 'Maybe, with more foundation first.',
                sub: 'Intriguing, but I want to take a gentle free beginner tutorial first.',
              },
              {
                id: 'unlikely_prefer_others',
                title: 'Unlikely, I prefer exploring other fields.',
                sub: 'Valuable to experience, but not what I see myself doing full-time.',
              },
            ].map((opt) => (
              <label
                key={opt.id}
                className={`flex items-start gap-3 p-3 rounded-xl border cursor-pointer transition-all ${
                  exploreFurther === opt.id
                    ? 'border-[#B9825B] bg-[#E8D6C3]/40'
                    : 'border-[#D9C7B5] hover:border-[#B9825B] bg-white'
                }`}
              >
                <input
                  type="radio"
                  name="exploreFurther"
                  checked={exploreFurther === opt.id}
                  onChange={() => setExploreFurther(opt.id as any)}
                  className="mt-1 text-[#B9825B] focus:ring-[#B9825B]"
                />
                <div>
                  <div className="font-bold text-xs text-[#4A3028]">{opt.title}</div>
                  <div className="text-[11px] text-[#806B5E]">{opt.sub}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="pt-4 border-t border-[#D9C7B5] flex items-center justify-between">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-xs font-semibold text-[#806B5E] hover:text-[#4A3028] transition-colors cursor-pointer"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-5 py-2.5 bg-[#B9825B] hover:bg-[#A06D48] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <CheckCircle2 className="w-4 h-4" />
            <span>Save Reflection & Update Roadmap</span>
          </button>
        </div>
      </div>
    </div>
  );
};
