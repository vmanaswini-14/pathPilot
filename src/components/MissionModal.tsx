import React from 'react';
import { X, HeartHandshake, CheckCircle2, ShieldCheck, Target, Sparkles, GraduationCap } from 'lucide-react';

interface MissionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MissionModal: React.FC<MissionModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#D9C7B5] p-6 sm:p-8 text-[#4A3028]">
        <div className="flex items-start justify-between pb-4 border-b border-[#D9C7B5]">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-[#E8D6C3] text-[#4A3028] flex items-center justify-center">
              <HeartHandshake className="w-6 h-6 text-[#B9825B]" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-bold text-[#4A3028]">
                Why We Built PathPilot AI
              </h2>
              <p className="text-sm text-[#806B5E] font-medium">
                Democratizing career discovery for every college student
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-[#806B5E] hover:text-[#4A3028] p-1.5 rounded-lg hover:bg-[#F8F3EB] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mt-6 space-y-5 text-[#4A3028] text-sm leading-relaxed">
          <div className="bg-[#F8F3EB] border border-[#D9C7B5] rounded-xl p-4">
            <div className="flex items-center gap-2 text-[#4A3028] font-bold text-base mb-1">
              <GraduationCap className="w-5 h-5 text-[#B9825B]" />
              <span>The Opportunity Gap We Are Solving</span>
            </div>
            <p className="text-[#806B5E]">
              Millions of college students—particularly first-generation students, working students, and students at community or under-resourced colleges—are asked to choose life-defining majors and career paths without ever seeing what the day-to-day work looks like.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-[#4A3028] text-base mb-2">Our Three Core Principles:</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B9825B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A3028]">Try before committing:</strong> Don't rely on glamorous social media clips or sterile career questionnaires. Experience realistic, messy work briefs like executing SQL on real tables or debugging financial aid logic.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B9825B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A3028]">Evidence-based coaching, never gatekeeping:</strong> Our AI evaluator only cites direct quotes from your actual submission. We never claim a 15-minute exercise defines your capability; we highlight your natural instincts and show you how to level up.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-[#B9825B] shrink-0 mt-0.5" />
                <div>
                  <strong className="text-[#4A3028]">Zero-cost, accessible learning roadmaps:</strong> Every suggested roadmap points only to vetted, 100% free educational resources and community-driven projects that you can build without expensive bootcamps or subscriptions.
                </div>
              </li>
            </ul>
          </div>

          <div className="border-t border-[#D9C7B5] pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#806B5E]">
            <div className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#B9825B]" />
              <span>No signup fees • No data selling • Pure student empowerment</span>
            </div>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-[#B9825B] hover:bg-[#A06D48] text-white font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            >
              Start Exploring
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
