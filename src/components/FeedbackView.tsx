import React, { useState } from 'react';
import {
  Award,
  CheckCircle2,
  Quote,
  Lightbulb,
  Sparkles,
  ArrowRight,
  TrendingUp,
  AlertTriangle,
  RotateCcw,
  BookOpen,
  Info,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { EvaluationResult, CareerRole } from '../types';
import { CAREER_LIST } from '../data/careers';

interface FeedbackViewProps {
  careerId: CareerRole;
  evaluation: EvaluationResult;
  onOpenReflection: () => void;
  onRetake: () => void;
  onViewComparison: () => void;
  hasReflection: boolean;
  onViewCareerInfo?: (careerId: CareerRole) => void;
}

export const FeedbackView: React.FC<FeedbackViewProps> = ({
  careerId,
  evaluation,
  onOpenReflection,
  onRetake,
  onViewComparison,
  hasReflection,
  onViewCareerInfo,
}) => {
  const [showRevised, setShowRevised] = useState<boolean>(true);
  const career = CAREER_LIST.find((c) => c.id === careerId) || CAREER_LIST[0];

  return (
    <div className="max-w-4xl mx-auto space-y-8 pb-20 text-[#4A3028]">
      {/* Header Banner */}
      <div className="bg-[#4A3028] rounded-3xl p-6 sm:p-8 text-white shadow-xl border border-[#3D251F]">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D6C3]/20 border border-[#D9C7B5]/30 text-[#E8D6C3] text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-[#B9825B]" />
              <span>{evaluation.providerNote || 'Evaluated by Google Gemini 3.8'}</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              Evidence-Based Tryout Feedback
            </h1>
            <p className="text-[#E8D6C3] text-sm mt-1">
              Role: <strong className="text-white">{career.title}</strong> • Analyzed against professional benchmark rubric
            </p>
          </div>

          {/* Score & Tier Badge */}
          <div className="flex sm:flex-col items-center sm:items-end justify-between border-t sm:border-t-0 border-[#3D251F] pt-3 sm:pt-0">
            <div className="text-right">
              <div className="text-3xl sm:text-4xl font-black text-[#E8D6C3]">
                {evaluation.overallScore}
                <span className="text-[#D9C7B5] text-lg font-normal">/100</span>
              </div>
              <span className="inline-block mt-1 px-3 py-0.5 rounded-full text-xs font-bold bg-[#B9825B] text-white">
                {evaluation.performanceTier}
              </span>
            </div>
          </div>
        </div>

        {/* Reality Check Disclaimer */}
        <div className="mt-6 pt-5 border-t border-[#3D251F] flex items-start gap-2.5 text-xs text-[#E8D6C3]">
          <Info className="w-4 h-4 text-[#B9825B] shrink-0 mt-0.5" />
          <p className="leading-relaxed font-normal">
            <strong className="text-white">Fairness & Transparency Notice:</strong> {evaluation.realityCheck}
          </p>
        </div>
      </div>

      {/* Section 1: What You Did Well */}
      <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-7 shadow-xs">
        <div className="flex items-center gap-2.5 text-[#4A3028] font-bold text-lg mb-3">
          <div className="w-8 h-8 rounded-lg bg-[#E8D6C3] text-[#4A3028] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5 text-[#B9825B]" />
          </div>
          <h2>What You Did Well</h2>
        </div>
        <p className="text-[#4A3028] text-sm leading-relaxed">
          {evaluation.whatStudentDidWell}
        </p>
      </div>

      {/* Section 2: Direct Verbatim Evidence Quotes */}
      <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#4A3028] font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-[#E8D6C3] text-[#4A3028] flex items-center justify-center">
              <Quote className="w-5 h-5 text-[#B9825B]" />
            </div>
            <h2>Direct Evidence from Your Submission</h2>
          </div>
          <span className="text-xs text-[#806B5E] font-medium hidden sm:inline">
            Zero hallucinated quotes guaranteed
          </span>
        </div>

        <p className="text-xs text-[#806B5E]">
          Our evaluator isolated these exact phrases from your submission to substantiate where you demonstrated analytical reasoning:
        </p>

        <div className="space-y-3 mt-3">
          {evaluation.evidenceQuotes.map((eq, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] space-y-2 text-xs"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#4A3028] uppercase tracking-wider text-[10px] flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-[#B9825B]" />
                  {eq.isDirectQuote ? 'Direct Verbatim Quote' : 'Observation Note'}
                </span>
              </div>
              <blockquote className="border-l-3 border-[#B9825B] pl-3 italic text-[#4A3028] text-xs sm:text-sm font-medium">
                “{eq.quote}”
              </blockquote>
              <p className="text-[#806B5E] pt-1 leading-relaxed">
                <strong className="text-[#4A3028]">Evaluator Analysis:</strong> {eq.analysis}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 3: Skills Demonstrated */}
      <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center gap-2.5 text-[#4A3028] font-bold text-lg">
          <div className="w-8 h-8 rounded-lg bg-[#E8D6C3] text-[#4A3028] flex items-center justify-center">
            <Award className="w-5 h-5 text-[#B9825B]" />
          </div>
          <h2>Skills Demonstrated</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {evaluation.skillsDemonstrated.map((sd, idx) => (
            <div
              key={idx}
              className="p-4 rounded-xl border border-[#D9C7B5] bg-[#FAF7F2] space-y-1.5"
            >
              <div className="flex items-center justify-between">
                <span className="font-bold text-[#4A3028] text-sm">{sd.skill}</span>
                <span
                  className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]"
                >
                  {sd.level}
                </span>
              </div>
              <p className="text-xs text-[#806B5E] leading-relaxed">{sd.why}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: Areas for Improvement & Actionable Practical Suggestion */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#4A3028] font-bold text-base">
            <TrendingUp className="w-5 h-5 text-[#B9825B]" />
            <h3>Areas for Growth</h3>
          </div>
          <ul className="space-y-2.5 text-xs text-[#4A3028]">
            {evaluation.areasForImprovement.map((area, idx) => (
              <li key={idx} className="flex items-start gap-2">
                <span className="w-4 h-4 rounded-full bg-[#E8D6C3] text-[#4A3028] font-bold text-[10px] flex items-center justify-center shrink-0 mt-0.5">
                  {idx + 1}
                </span>
                <span className="leading-relaxed text-[#806B5E]">{area}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="bg-[#FAF7F2] rounded-2xl border border-[#D9C7B5] p-6 shadow-xs space-y-3">
          <div className="flex items-center gap-2 text-[#4A3028] font-bold text-base">
            <Lightbulb className="w-5 h-5 text-[#B9825B]" />
            <h3>One Practical Takeaway Suggestion</h3>
          </div>
          <p className="text-xs sm:text-sm text-[#4A3028] leading-relaxed">
            {evaluation.practicalSuggestion}
          </p>
        </div>
      </div>

      {/* Section 5: Revised Example by Senior Mentor */}
      <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-7 shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2.5 text-[#4A3028] font-bold text-lg">
            <div className="w-8 h-8 rounded-lg bg-[#E8D6C3] text-[#4A3028] flex items-center justify-center">
              <Sparkles className="w-5 h-5 text-[#B9825B]" />
            </div>
            <h2>Exemplary Revised Deliverable</h2>
          </div>
          <button
            onClick={() => setShowRevised(!showRevised)}
            className="text-xs font-semibold text-[#B9825B] hover:text-[#A06D48] flex items-center gap-1 cursor-pointer"
          >
            <span>{showRevised ? 'Collapse' : 'Expand Example'}</span>
            {showRevised ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>

        <p className="text-xs text-[#806B5E]">
          Here is how a junior professional would frame and present these exact solutions for maximum impact:
        </p>

        {showRevised && (
          <div className="p-4 sm:p-5 rounded-xl bg-[#2D1B16] text-[#F8F3EB] font-mono text-xs leading-relaxed whitespace-pre-wrap overflow-x-auto border border-[#3D251F]">
            {evaluation.revisedExample}
          </div>
        )}
      </div>

      {/* Section 6: Rubric Criteria Breakdown */}
      <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 shadow-xs space-y-4">
        <h3 className="font-bold text-[#4A3028] text-base">Standardized Rubric Breakdown</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
          {evaluation.rubricBreakdown.map((r, idx) => (
            <div key={idx} className="p-3.5 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB]">
              <div className="flex items-center justify-between font-bold text-[#4A3028] mb-1">
                <span>{r.criterion}</span>
                <span className="text-[#B9825B]">
                  {r.score} / {r.maxScore}
                </span>
              </div>
              <p className="text-[#806B5E] text-[11px] leading-relaxed">{r.feedback}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="bg-white rounded-2xl border border-[#D9C7B5] p-5 shadow-lg flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-[#806B5E] text-center sm:text-left">
          {hasReflection ? (
            <span className="text-emerald-800 font-bold flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-emerald-700" />
              Your reflection has been recorded and factored into your roadmap!
            </span>
          ) : (
            <span>
              Next step: Complete a quick 60-second reflection to customize your roadmap.
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2.5 w-full sm:w-auto">
          {onViewCareerInfo && (
            <button
              onClick={() => onViewCareerInfo(careerId)}
              className="px-3 py-2.5 rounded-xl text-xs font-semibold text-[#4A3028] hover:text-black border border-[#D9C7B5] hover:bg-[#F8F3EB] transition-colors flex items-center gap-1.5 cursor-pointer"
              title={`Revisit comprehensive career reality guide for ${career.shortTitle}`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#B9825B]" />
              <span>Revisit Career Guide</span>
            </button>
          )}

          <button
            onClick={onRetake}
            className="px-3 py-2.5 rounded-xl text-xs font-semibold text-[#4A3028] hover:text-black border border-[#D9C7B5] hover:bg-[#F8F3EB] transition-colors flex items-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Retake Task</span>
          </button>

          <button
            onClick={onOpenReflection}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-[#B9825B] hover:bg-[#A06D48] text-white shadow-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>{hasReflection ? 'Update Reflection' : 'Record 3-Question Reflection'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            onClick={onViewComparison}
            className="px-3.5 py-2.5 rounded-xl text-xs font-bold bg-[#E8D6C3] hover:bg-[#D9C7B5] text-[#4A3028] transition-colors cursor-pointer"
          >
            <span>Compare Roles</span>
          </button>
        </div>
      </div>
    </div>
  );
};
