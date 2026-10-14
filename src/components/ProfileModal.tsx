import React from 'react';
import {
  X,
  Award,
  Compass,
  CheckCircle2,
  Sparkles,
} from 'lucide-react';
import { StudentTryoutSession, PersonalizedRoadmap } from '../types';

export interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessions: Record<string, StudentTryoutSession>;
  roadmap: PersonalizedRoadmap | null;
  checklist: Record<string, boolean>;
  onNavigateToTab: (tab: 'dashboard' | 'task' | 'comparison' | 'roadmap') => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({
  isOpen,
  onClose,
  sessions,
  roadmap,
  checklist,
  onNavigateToTab,
}) => {
  if (!isOpen) return null;

  const completedTryouts = Object.values(sessions).filter((s) => s.evaluation !== null);
  const checkedMilestonesCount = Object.values(checklist).filter(Boolean).length;

  // Collect unique demonstrated skills from all completed evaluations
  const demonstratedSkills = Array.from(
    new Set(
      completedTryouts.flatMap((s) => s.evaluation?.skillsDemonstrated.map((sk) => sk.skill) || [])
    )
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-slate-900/60 backdrop-blur-xs animate-in fade-in">
      <div className="bg-[#FFFCF7] rounded-3xl border border-[#E8DDCD] shadow-2xl max-w-2xl w-full overflow-hidden flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-5 bg-[#3E2723] text-[#FFFCF7] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-[#C19A6B]/20 border border-[#C19A6B]/40 flex items-center justify-center text-[#C19A6B]">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg font-extrabold text-[#FFFCF7]">My Career Progress & Achievements</h2>
              <p className="text-xs text-[#C19A6B] font-normal">
                Hands-on simulation scores, verified skills, and roadmap checkpoints
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-[#FFFCF7] transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Summary Stats */}
          <div className="grid grid-cols-3 gap-3">
            <div className="p-3.5 rounded-2xl bg-[#F8F3EB] border border-[#E8DDCD] text-center">
              <span className="text-2xl font-black text-[#3E2723]">{completedTryouts.length}/3</span>
              <span className="text-[11px] font-semibold text-[#795548] block mt-0.5">Tryouts Tested</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#FFFCF7] border border-[#E8DDCD] text-center">
              <span className="text-2xl font-black text-[#3E2723]">
                {roadmap ? `${roadmap.totalEstimatedWeeks || 8}w` : '0w'}
              </span>
              <span className="text-[11px] font-semibold text-[#795548] block mt-0.5">Roadmap Track</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-[#F8F3EB] border border-[#E8DDCD] text-center">
              <span className="text-2xl font-black text-[#3E2723]">{checkedMilestonesCount}</span>
              <span className="text-[11px] font-semibold text-[#795548] block mt-0.5">Milestones Done</span>
            </div>
          </div>

          {/* Verified Skills Unlocked */}
          {demonstratedSkills.length > 0 && (
            <div className="p-4 rounded-2xl bg-[#F8F3EB] border border-[#E8DDCD] space-y-2.5">
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#3E2723]">
                <Sparkles className="w-4 h-4 text-[#C19A6B]" />
                <span>Verified Problem-Solving Skills ({demonstratedSkills.length})</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {demonstratedSkills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="inline-flex items-center gap-1 text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-[#FFFCF7] text-[#3E2723] border border-[#E8DDCD]"
                  >
                    <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Career Tryouts List */}
          <div className="space-y-3">
            <h4 className="text-xs font-bold uppercase text-[#795548] tracking-wider">
              Career Simulation Status
            </h4>

            {[
              { id: 'software-engineer', name: 'Software Engineer' },
              { id: 'data-analyst', name: 'Data Analyst' },
              { id: 'ux-designer', name: 'UX / Product Designer' },
            ].map((c) => {
              const s = sessions[c.id];
              const evalResult = s?.evaluation;

              return (
                <div
                  key={c.id}
                  className="p-4 rounded-xl border border-[#E8DDCD] bg-[#F8F3EB]/70 flex items-center justify-between text-xs"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-[#3E2723] text-sm">{c.name}</span>
                      {evalResult ? (
                        <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-200">
                          Score: {evalResult.overallScore}/100
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full bg-[#E8DDCD]/60 text-[#795548] text-[10px] font-semibold">
                          Not Started
                        </span>
                      )}
                    </div>
                    <p className="text-[11px] text-[#795548] mt-1">
                      {evalResult
                        ? `Tier: ${evalResult.performanceTier} • ${evalResult.skillsDemonstrated?.length || 2} verified skills`
                        : 'Explore realistic workplace problems across multiple challenge levels.'}
                    </p>
                  </div>

                  <button
                    onClick={() => {
                      onClose();
                      onNavigateToTab('task');
                    }}
                    className="px-3.5 py-1.5 rounded-lg bg-[#FFFCF7] border border-[#E8DDCD] hover:border-[#C19A6B] hover:text-[#3E2723] text-[#795548] font-bold transition-all cursor-pointer shrink-0"
                  >
                    {evalResult ? 'View Feedback' : 'Try Now'}
                  </button>
                </div>
              );
            })}
          </div>

          {/* Roadmap Status */}
          <div className="p-4 rounded-2xl bg-[#FFFCF7] border border-[#E8DDCD] shadow-xs flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-[#C19A6B]" />
                <span className="font-bold text-[#3E2723] text-xs sm:text-sm">
                  {roadmap?.primaryFocus || 'Personalized Learning Roadmap'}
                </span>
              </div>
              <p className="text-[11px] text-[#795548] mt-1">
                {roadmap
                  ? `Adaptive plan with ${roadmap.phases?.length || 3} learning phases and weekly checkpoints.`
                  : 'Take the questionnaire to generate your custom AI learning roadmap.'}
              </p>
            </div>

            <button
              onClick={() => {
                onClose();
                onNavigateToTab('roadmap');
              }}
              className="px-3.5 py-2 rounded-xl bg-[#3E2723] hover:bg-[#2B1B17] text-[#FFFCF7] font-bold text-xs transition-colors cursor-pointer shrink-0"
            >
              {roadmap ? 'Open Roadmap' : 'Generate Roadmap'}
            </button>
          </div>

          {/* Footer Action */}
          <div className="flex justify-end pt-2">
            <button
              onClick={onClose}
              className="px-6 py-2.5 rounded-xl bg-[#3E2723] hover:bg-[#2B1B17] text-[#FFFCF7] font-bold text-xs shadow-xs transition-colors cursor-pointer"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
