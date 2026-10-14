import React from 'react';
import {
  GitCompare,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  Award,
  Heart,
  AlertCircle,
  HelpCircle,
  Info,
  Layers,
  Flame,
  BookOpen,
} from 'lucide-react';
import { CAREER_LIST } from '../data/careers';
import { CareerRole, StudentTryoutSession } from '../types';

interface CareerComparisonViewProps {
  sessions: Record<string, StudentTryoutSession>;
  onSelectCareer: (careerId: CareerRole) => void;
  onOpenReflection: (careerId: CareerRole) => void;
  onGenerateRoadmap: () => void;
  onViewCareerInfo?: (careerId: CareerRole) => void;
}

export const CareerComparisonView: React.FC<CareerComparisonViewProps> = ({
  sessions,
  onSelectCareer,
  onOpenReflection,
  onGenerateRoadmap,
  onViewCareerInfo,
}) => {
  const completedCount = Object.values(sessions).filter((s) => s.evaluation !== null).length;

  return (
    <div className="space-y-8 pb-20 text-[#4A3028]">
      {/* Header */}
      <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#E8D6C3] border border-[#D9C7B5] text-[#4A3028] text-xs font-semibold mb-2">
              <GitCompare className="w-3.5 h-3.5 text-[#B9825B]" />
              <span>Multi-Role Diagnostic Matrix</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#4A3028] tracking-tight">
              Compare Career Tryouts
            </h1>
            <p className="text-sm text-[#806B5E] mt-1 max-w-2xl">
              Compare your performance, natural problem-solving inclinations, and personal reflections across all three career simulations.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onGenerateRoadmap}
              disabled={completedCount === 0}
              className="px-5 py-2.5 bg-[#B9825B] hover:bg-[#A06D48] disabled:bg-[#F8F3EB] disabled:text-[#806B5E] text-white font-bold text-xs rounded-xl shadow-xs transition-colors flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className="w-4 h-4 text-white" />
              <span>Generate Personalized Roadmap</span>
            </button>
          </div>
        </div>

        {/* Legend: Observed Evidence vs AI Suggestions */}
        <div className="mt-6 pt-4 border-t border-[#D9C7B5] flex flex-wrap items-center gap-4 text-xs">
          <span className="font-bold text-[#806B5E] uppercase tracking-wider text-[11px]">
            Data Legend:
          </span>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B9825B]" />
            <strong className="text-[#4A3028]">[Observed Evidence]:</strong>
            <span className="text-[#806B5E]">Directly quoted & verified from your actual submission</span>
          </div>
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-[#806B5E]" />
            <strong className="text-[#4A3028]">[AI Suggestion]:</strong>
            <span className="text-[#806B5E]">Curated next steps & growth coaching</span>
          </div>
        </div>
      </div>

      {/* Comparison Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CAREER_LIST.map((career) => {
          const session = sessions[career.id];
          const isDone = Boolean(session?.evaluation);
          const evalData = session?.evaluation;
          const reflection = session?.reflection;

          return (
            <div
              key={career.id}
              className="bg-white rounded-2xl border border-[#D9C7B5] shadow-xs flex flex-col justify-between overflow-hidden"
            >
              {/* Card Top Title Banner */}
              <div className="p-6 border-b border-[#D9C7B5] bg-[#F8F3EB]">
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]`}>
                    {career.shortTitle}
                  </span>
                  {isDone ? (
                    <span className="text-xs font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md flex items-center gap-1 border border-emerald-300">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-700" />
                      Score: {evalData?.overallScore}/100
                    </span>
                  ) : (
                    <span className="text-xs font-semibold text-[#806B5E] bg-[#E8D6C3]/60 px-2 py-0.5 rounded-md">
                      Not Started
                    </span>
                  )}
                </div>
                <h3 className="text-lg font-bold text-[#4A3028]">{career.title}</h3>
                <p className="text-xs text-[#806B5E] mt-1 line-clamp-2">{career.tagline}</p>
              </div>

              {/* Main Comparison Sections */}
              <div className="p-6 space-y-6 text-xs flex-1">
                {/* 1. Observed Skills */}
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-[#4A3028] mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#B9825B]" />
                    <span>[Observed Evidence] Skills Verified:</span>
                  </div>
                  {isDone && evalData?.skillsDemonstrated && evalData.skillsDemonstrated.length > 0 ? (
                    <div className="space-y-1.5">
                      {evalData.skillsDemonstrated.map((s, idx) => (
                        <div
                          key={idx}
                          className="p-2 rounded-lg bg-[#E8D6C3] border border-[#D9C7B5] text-[#4A3028] flex items-center justify-between"
                        >
                          <span className="font-semibold">{s.skill}</span>
                          <span className="text-[10px] bg-white text-[#4A3028] px-1.5 py-0.5 rounded-sm font-bold border border-[#D9C7B5]">
                            {s.level}
                          </span>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-[#806B5E] italic">
                      Complete this tryout to verify your hands-on skills.
                    </p>
                  )}
                </div>

                {/* 2. Direct Quote from Submission */}
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-[#4A3028] mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#B9825B]" />
                    <span>[Observed Evidence] Your Submission Quote:</span>
                  </div>
                  {isDone && evalData?.evidenceQuotes?.[0] ? (
                    <blockquote className="p-3 rounded-xl bg-[#F8F3EB] border-l-3 border-[#B9825B] italic text-[#4A3028] text-[11px] leading-relaxed">
                      “{evalData.evidenceQuotes[0].quote}”
                    </blockquote>
                  ) : (
                    <p className="text-[#806B5E] italic">No submission quotes yet.</p>
                  )}
                </div>

                {/* 3. AI Growth Suggestion */}
                <div>
                  <div className="flex items-center gap-1.5 font-bold text-[#4A3028] mb-2">
                    <span className="w-2 h-2 rounded-full bg-[#806B5E]" />
                    <span>[AI Suggestion] Practical Takeaway:</span>
                  </div>
                  {isDone && evalData?.practicalSuggestion ? (
                    <div className="p-3 rounded-xl bg-[#FAF7F2] border border-[#D9C7B5] text-[#4A3028] text-[11px] leading-relaxed">
                      {evalData.practicalSuggestion}
                    </div>
                  ) : (
                    <p className="text-[#806B5E] italic">
                      Practical recommendation will unlock after tryout.
                    </p>
                  )}
                </div>

                {/* 4. Student Reflection Summary */}
                <div className="pt-4 border-t border-[#D9C7B5]">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-bold text-[#4A3028] text-xs">Your Reflection:</span>
                    {isDone && (
                      <button
                        onClick={() => onOpenReflection(career.id)}
                        className="text-[11px] text-[#B9825B] hover:text-[#A06D48] font-semibold cursor-pointer"
                      >
                        {reflection ? 'Edit' : 'Add Reflection'}
                      </button>
                    )}
                  </div>

                  {reflection ? (
                    <div className="space-y-2 p-3 bg-[#F8F3EB] rounded-xl text-[#4A3028] text-[11px] border border-[#D9C7B5]">
                      <div className="flex items-center justify-between">
                        <span className="text-[#806B5E]">Enjoyment:</span>
                        <strong className="capitalize text-[#4A3028]">{reflection.enjoyment}</strong>
                      </div>
                      <div>
                        <span className="text-[#806B5E] block mb-0.5">Difficulties flagged:</span>
                        {reflection.difficulties.length > 0 ? (
                          <div className="flex flex-wrap gap-1">
                            {reflection.difficulties.map((d, i) => (
                              <span
                                key={i}
                                className="bg-white border border-[#D9C7B5] px-1.5 py-0.5 rounded-sm text-[10px]"
                              >
                                {d}
                              </span>
                            ))}
                          </div>
                        ) : (
                          <span className="italic text-[#806B5E]">None flagged</span>
                        )}
                      </div>
                      <div className="flex items-center justify-between pt-1">
                        <span className="text-[#806B5E]">Explore further?</span>
                        <span className="font-semibold text-[#B9825B]">
                          {reflection.exploreFurther === 'yes_enthusiastic'
                            ? 'Yes!'
                            : reflection.exploreFurther === 'maybe_more_prep'
                            ? 'Maybe'
                            : 'Unlikely'}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="p-3 bg-[#F8F3EB] rounded-xl text-[#806B5E] text-center italic border border-[#D9C7B5]/60">
                      {isDone ? 'Reflection not recorded yet' : 'Complete tryout first'}
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="p-4 bg-[#F8F3EB] border-t border-[#D9C7B5] space-y-2">
                <button
                  onClick={() => onSelectCareer(career.id)}
                  className="w-full py-2.5 px-3 rounded-xl bg-[#B9825B] hover:bg-[#A06D48] text-white font-bold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer shadow-xs"
                >
                  <span>{isDone ? 'View Detailed Feedback & Rubric' : 'Start This Tryout'}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>

                {onViewCareerInfo && (
                  <button
                    onClick={() => onViewCareerInfo(career.id)}
                    className="w-full py-2 px-3 rounded-xl bg-white hover:bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5] font-semibold text-xs transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <BookOpen className="w-3.5 h-3.5 text-[#B9825B]" />
                    <span>{career.shortTitle} Reality & Salary Guide</span>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
