import React, { useState } from 'react';
import {
  X,
  RefreshCw,
  Sparkles,
  CheckCircle2,
  Clock,
  Target,
  AlertCircle,
  HelpCircle,
  Loader2,
} from 'lucide-react';
import { AdaptiveProgressInput } from '../types';

interface AdaptiveRoadmapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmitUpdate: (updateData: AdaptiveProgressInput) => void;
  isLoading: boolean;
  currentDailyTime?: string;
  currentGoal?: string;
}

export const AdaptiveRoadmapModal: React.FC<AdaptiveRoadmapModalProps> = ({
  isOpen,
  onClose,
  onSubmitUpdate,
  isLoading,
  currentDailyTime = '1 hour per day',
  currentGoal = 'Become job-ready',
}) => {
  const [completedNotes, setCompletedNotes] = useState('');
  const [difficultiesNotes, setDifficultiesNotes] = useState('');
  const [availableTimeNow, setAvailableTimeNow] = useState(currentDailyTime);
  const [goalChanges, setGoalChanges] = useState('Keep current goal');
  const [customGoal, setCustomGoal] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const finalGoal = goalChanges === 'Change goal' ? customGoal.trim() || currentGoal : currentGoal;

    onSubmitUpdate({
      completedNotes: completedNotes.trim() || 'Completed planned weekly milestones.',
      difficultiesNotes: difficultiesNotes.trim() || 'No major blockers.',
      availableTimeNow,
      goalChanges: finalGoal,
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Modal Header */}
        <div className="px-6 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-white/20 border border-white/30 flex items-center justify-center">
              <RefreshCw className="w-4 h-4 text-white" />
            </div>
            <div>
              <h2 className="text-base sm:text-lg font-bold text-white">Update My Roadmap</h2>
              <p className="text-xs text-blue-100 font-normal">
                Adjust remaining milestones while keeping completed work intact
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            disabled={isLoading}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 overflow-y-auto space-y-5 text-xs text-slate-700">
          {/* Question 1: What have you completed? */}
          <div>
            <label className="block font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>1. What have you completed so far?</span>
            </label>
            <textarea
              value={completedNotes}
              onChange={(e) => setCompletedNotes(e.target.value)}
              placeholder="e.g., Completed SQLBolt lessons, solved the easy coding challenge, or created basic Figma wireframes..."
              rows={3}
              disabled={isLoading}
              className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 outline-hidden transition-all"
            />
          </div>

          {/* Question 2: What is still difficult? */}
          <div>
            <label className="block font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
              <AlertCircle className="w-4 h-4 text-amber-600" />
              <span>2. What is still difficult or taking longer than expected?</span>
            </label>
            <textarea
              value={difficultiesNotes}
              onChange={(e) => setDifficultiesNotes(e.target.value)}
              placeholder="e.g., Multi-table JOINs, recursion in algorithms, accessibility contrast standards..."
              rows={2}
              disabled={isLoading}
              className="w-full p-3 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 outline-hidden transition-all"
            />
          </div>

          {/* Question 3: Available Time Now */}
          <div>
            <label className="block font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-blue-600" />
              <span>3. How much time can you dedicate per day now?</span>
            </label>
            <select
              value={availableTimeNow}
              onChange={(e) => setAvailableTimeNow(e.target.value)}
              disabled={isLoading}
              className="w-full p-2.5 rounded-xl border border-slate-300 bg-white focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 outline-hidden cursor-pointer"
            >
              <option value="30 minutes per day">30 minutes per day</option>
              <option value="1 hour per day">1 hour per day</option>
              <option value="2 hours per day">2 hours per day</option>
              <option value="3+ hours per day">3+ hours per day</option>
              <option value="Different amounts on different days">Different amounts on different days</option>
            </select>
          </div>

          {/* Question 4: Goal Changes */}
          <div>
            <label className="block font-bold text-slate-900 text-xs mb-1.5 flex items-center gap-1.5">
              <Target className="w-4 h-4 text-indigo-600" />
              <span>4. Has your goal changed?</span>
            </label>
            <div className="flex gap-4 mb-2">
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="radio"
                  name="goalRadio"
                  checked={goalChanges === 'Keep current goal'}
                  onChange={() => setGoalChanges('Keep current goal')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Keep current goal ({currentGoal})</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer font-medium">
                <input
                  type="radio"
                  name="goalRadio"
                  checked={goalChanges === 'Change goal'}
                  onChange={() => setGoalChanges('Change goal')}
                  className="text-blue-600 focus:ring-blue-500"
                />
                <span>Set new goal</span>
              </label>
            </div>

            {goalChanges === 'Change goal' && (
              <input
                type="text"
                value={customGoal}
                onChange={(e) => setCustomGoal(e.target.value)}
                placeholder="e.g., Target upcoming summer internship placement"
                disabled={isLoading}
                className="w-full p-2.5 rounded-xl border border-slate-300 focus:border-blue-600 focus:ring-2 focus:ring-blue-100 text-xs text-slate-800 outline-hidden transition-all"
              />
            )}
          </div>

          {/* Notice on Preservation */}
          <div className="p-3 rounded-xl bg-blue-50 border border-blue-200 text-[11px] text-blue-800 leading-relaxed">
            <strong>Preservation Guarantee:</strong> All previously completed milestone checkmarks and your original profile answers will be retained. Gemini will recalibrate only the remaining phases to target your updated pacing and difficulties.
          </div>

          {/* Action Buttons */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={onClose}
              disabled={isLoading}
              className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={isLoading}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 disabled:opacity-50 text-white font-bold text-xs shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  <span>Recalibrating with Gemini...</span>
                </>
              ) : (
                <>
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Update My Roadmap</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
