import React, { useState } from 'react';
import {
  BookOpen,
  Sparkles,
  CheckCircle2,
  Calendar,
  Layers,
  FolderGit2,
  ExternalLink,
  ShieldCheck,
  RefreshCw,
  Award,
  AlertCircle,
  Clock,
  Printer,
  ChevronRight,
  ChevronDown,
  ChevronUp,
  Target,
  Check,
  Code2,
  Database,
  Smartphone,
  Flame,
  ArrowRight,
  RotateCcw,
  HelpCircle,
} from 'lucide-react';
import {
  PersonalizedRoadmap,
  StudentTryoutSession,
  RoadmapQuestionnaireAnswers,
  AdaptiveProgressInput,
  CareerRole,
} from '../types';
import { RoadmapQuestionnaire } from './RoadmapQuestionnaire';
import { AdaptiveRoadmapModal } from './AdaptiveRoadmapModal';

interface RoadmapViewProps {
  roadmap: PersonalizedRoadmap | null;
  isLoading: boolean;
  errorMessage?: string | null;
  onGenerateRoadmap: (
    answers: RoadmapQuestionnaireAnswers,
    adaptiveUpdate?: AdaptiveProgressInput
  ) => Promise<void>;
  sessions: Record<string, StudentTryoutSession>;
  onToggleMilestoneItem?: (milestoneId: string, itemIdx: number) => void;
  completedItems: Record<string, boolean>;
  selectedCareerId: CareerRole;
  initialAnswers?: RoadmapQuestionnaireAnswers | null;
}

export const RoadmapView: React.FC<RoadmapViewProps> = ({
  roadmap,
  isLoading,
  errorMessage,
  onGenerateRoadmap,
  sessions,
  onToggleMilestoneItem,
  completedItems,
  selectedCareerId,
  initialAnswers,
}) => {
  const [isRetaking, setIsRetaking] = useState(false);
  const [isAdaptiveModalOpen, setIsAdaptiveModalOpen] = useState(false);
  const [lastSubmittedAnswers, setLastSubmittedAnswers] = useState<RoadmapQuestionnaireAnswers | null>(
    roadmap?.userAnswers || initialAnswers || null
  );
  const [expandedPhases, setExpandedPhases] = useState<Record<string, boolean>>({
    '0': true,
    'phase-1': true,
  });
  const [priorityFilter, setPriorityFilter] = useState<'all' | 'first' | 'next' | 'wait'>('all');

  const handlePrint = () => {
    window.print();
  };

  const togglePhase = (phaseKey: string) => {
    setExpandedPhases((prev) => ({
      ...prev,
      [phaseKey]: !prev[phaseKey],
    }));
  };

  // If no roadmap exists yet or user explicitly chose to retake the questionnaire
  if ((!roadmap && !isLoading) || isRetaking) {
    return (
      <RoadmapQuestionnaire
        initialCareerId={roadmap?.targetCareerId || selectedCareerId || 'software-engineer'}
        initialAnswers={lastSubmittedAnswers || roadmap?.userAnswers || initialAnswers}
        isLoading={isLoading}
        onGenerate={async (answers) => {
          setLastSubmittedAnswers(answers);
          setIsRetaking(false);
          await onGenerateRoadmap(answers);
        }}
        onCancel={roadmap ? () => setIsRetaking(false) : undefined}
      />
    );
  }

  // Loading State
  if (isLoading) {
    return (
      <div className="max-w-2xl mx-auto py-20 text-center space-y-6 animate-in fade-in">
        <div className="w-16 h-16 rounded-2xl bg-blue-50 border border-blue-200 text-blue-600 mx-auto flex items-center justify-center shadow-lg shadow-blue-500/10">
          <Sparkles className="w-8 h-8 animate-spin" />
        </div>
        <div className="space-y-2">
          <h2 className="text-2xl font-black text-slate-900">
            Synthesizing Your Personalized AI Roadmap
          </h2>
          <p className="text-xs sm:text-sm text-slate-500 max-w-md mx-auto leading-relaxed">
            Gemini is analyzing your current skill level, missing prerequisites, daily schedule, and target deadline to build a customized, step-by-step learning journey...
          </p>
        </div>
        <div className="flex items-center justify-center gap-1.5 text-xs text-blue-600 font-semibold">
          <Clock className="w-3.5 h-3.5 animate-pulse" />
          <span>Typically takes 3-6 seconds</span>
        </div>
      </div>
    );
  }

  // Error State (e.g. Gemini unavailable or network error)
  if (errorMessage && !roadmap) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-5 animate-in fade-in">
        <div className="w-14 h-14 rounded-2xl bg-red-50 border border-red-200 text-red-600 mx-auto flex items-center justify-center shadow-sm">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h2 className="text-xl font-extrabold text-slate-900">Roadmap Generation Issue</h2>
          <p className="text-xs sm:text-sm text-red-600 leading-relaxed font-medium px-4">{errorMessage}</p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => setIsRetaking(true)}
            className="px-4 py-2.5 rounded-xl border border-slate-300 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer"
          >
            Review Questionnaire Answers
          </button>
          <button
            onClick={() => {
              const answersToRetry = lastSubmittedAnswers || initialAnswers;
              if (answersToRetry) {
                onGenerateRoadmap(answersToRetry);
              } else {
                setIsRetaking(true);
              }
            }}
            className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-xs cursor-pointer flex items-center gap-1.5"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Retry Generation</span>
          </button>
        </div>
      </div>
    );
  }

  if (!roadmap) return null;

  // Calculate Overall Checklist Progress
  const totalWeeklyMilestones = (roadmap.weeklyPlan || []).reduce(
    (acc, week) => acc + (week.milestones?.length || 0),
    0
  );

  const completedMilestonesCount = (roadmap.weeklyPlan || []).reduce((acc, week) => {
    return (
      acc +
      (week.milestones || []).filter((m, idx) => {
        const key = `${m.id || `w${week.weekNumber}-m${idx}`}`;
        return Boolean(completedItems[key]);
      }).length
    );
  }, 0);

  const progressPercentage =
    totalWeeklyMilestones > 0
      ? Math.round((completedMilestonesCount / totalWeeklyMilestones) * 100)
      : 0;

  // Filter priority skills
  const filteredSkills = (roadmap.prioritySkills || []).filter((s) => {
    if (priorityFilter === 'first') return s.timing === 'Learn First';
    if (priorityFilter === 'next') return s.timing === 'Learn Next';
    if (priorityFilter === 'wait') return s.timing === 'Can Wait';
    return true;
  });

  return (
    <div className="space-y-8 pb-20 text-slate-800 animate-in fade-in">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-blue-700 via-blue-800 to-indigo-900 rounded-3xl p-6 sm:p-8 text-white shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/20 text-blue-100 text-xs font-semibold mb-3">
              <Sparkles className="w-3.5 h-3.5 text-blue-300" />
              <span>Personalized AI Learning Track</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
              {roadmap.primaryFocus}
            </h1>
            <p className="text-blue-100/90 text-xs sm:text-sm mt-1 max-w-2xl font-normal leading-relaxed">
              Customized for {roadmap.roleTitle || 'your career path'} based on your verified questionnaire responses.
              Paced at {roadmap.recommendedPacing || `${roadmap.totalEstimatedWeeks || 8} weeks`}.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <button
              onClick={() => setIsAdaptiveModalOpen(true)}
              disabled={isLoading}
              className="px-4 py-2.5 bg-white text-blue-800 hover:bg-blue-50 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <RefreshCw className={`w-3.5 h-3.5 ${isLoading ? 'animate-spin' : ''}`} />
              <span>Update My Roadmap</span>
            </button>

            <button
              onClick={() => setIsRetaking(true)}
              className="px-3.5 py-2.5 bg-blue-900/60 hover:bg-blue-900 text-blue-100 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-blue-400/30"
              title="Retake questionnaire from scratch"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Retake</span>
            </button>

            <button
              onClick={handlePrint}
              className="px-3.5 py-2.5 bg-blue-900/60 hover:bg-blue-900 text-blue-100 rounded-xl text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer border border-blue-400/30"
              title="Print or Save PDF"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Print / PDF</span>
            </button>
          </div>
        </div>

        {/* Adaptive update notice banner if applicable */}
        {roadmap.isAdaptiveUpdate && (
          <div className="mt-5 p-3 rounded-xl bg-blue-950/60 border border-blue-400/30 text-xs text-blue-200 flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-300 shrink-0" />
            <span>
              <strong>Adaptive Update Applied:</strong> This roadmap was recalibrated using your latest progress notes.
            </span>
          </div>
        )}

        {/* Educational Disclaimer */}
        <div className="mt-6 pt-4 border-t border-blue-600/50 flex items-start gap-2 text-xs text-blue-200">
          <ShieldCheck className="w-4 h-4 text-blue-300 shrink-0 mt-0.5" />
          <span>
            <strong>Educational Guidance Disclaimer:</strong> Roadmaps and pacing are advisory recommendations synthesized by Gemini. All recommended resources are 100% free with zero paywalls.
          </span>
        </div>
      </div>

      {/* Progress Dashboard Card */}
      <div className="bg-white rounded-3xl border border-blue-200 p-6 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-blue-600" />
            <h3 className="font-bold text-slate-900 text-base">Your Overall Roadmap Progress</h3>
          </div>
          <p className="text-xs text-slate-500">
            {completedMilestonesCount} of {totalWeeklyMilestones} milestones completed across{' '}
            {roadmap.phases?.length || 3} learning phases.
          </p>
        </div>

        <div className="flex items-center gap-4 w-full sm:w-72 shrink-0">
          <div className="w-full bg-slate-100 h-3 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-blue-600 to-emerald-500 h-full rounded-full transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
          <span className="font-mono font-bold text-sm text-slate-800 shrink-0">
            {progressPercentage}%
          </span>
        </div>
      </div>

      {/* Section A: Diagnostic Summary & Starting Point */}
      <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-xs space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-bold">
              A
            </div>
            <h2 className="text-lg font-bold text-slate-900">Personalized Diagnostic Summary</h2>
          </div>

          {roadmap.startingPoint && (
            <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200">
              Starting Point: {roadmap.startingPoint}
            </span>
          )}
        </div>

        <p className="text-sm text-slate-700 leading-relaxed font-normal">{roadmap.summary}</p>

        {roadmap.recommendedPacing && (
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 flex items-start gap-2">
            <Clock className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
            <span>
              <strong>Pacing & Availability:</strong> {roadmap.recommendedPacing}
            </span>
          </div>
        )}
      </div>

      {/* Section B: Priority Skills Matrix */}
      {roadmap.prioritySkills && roadmap.prioritySkills.length > 0 && (
        <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
                  B
                </div>
                <h2 className="text-lg font-bold text-slate-900">Priority Skills Matrix</h2>
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Prerequisite-aware breakdown: what you must learn first vs. what can safely wait.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl">
              {(
                [
                  { id: 'all', label: 'All Skills' },
                  { id: 'first', label: 'Learn First' },
                  { id: 'next', label: 'Learn Next' },
                  { id: 'wait', label: 'Can Wait' },
                ] as const
              ).map((f) => (
                <button
                  key={f.id}
                  onClick={() => setPriorityFilter(f.id)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    priorityFilter === f.id
                      ? 'bg-white text-blue-700 shadow-2xs'
                      : 'text-slate-500 hover:text-slate-800'
                  }`}
                >
                  {f.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSkills.map((sk, idx) => {
              const isFirst = sk.timing === 'Learn First';
              const isNext = sk.timing === 'Learn Next';

              return (
                <div
                  key={idx}
                  className={`p-4 rounded-2xl border transition-all flex flex-col justify-between ${
                    isFirst
                      ? 'bg-blue-50/60 border-blue-200'
                      : isNext
                      ? 'bg-indigo-50/50 border-indigo-200'
                      : 'bg-slate-50/70 border-slate-200'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                          isFirst
                            ? 'bg-blue-600 text-white'
                            : isNext
                            ? 'bg-indigo-600 text-white'
                            : 'bg-slate-200 text-slate-700'
                        }`}
                      >
                        {sk.timing}
                      </span>
                    </div>

                    <h4 className="font-bold text-slate-900 text-sm mb-1.5">{sk.skill}</h4>
                    <p className="text-xs text-slate-600 leading-relaxed font-normal">{sk.why}</p>
                  </div>

                  {sk.prerequisites && sk.prerequisites.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 text-[11px] text-slate-500">
                      <strong className="text-slate-700">Prerequisites:</strong>{' '}
                      {sk.prerequisites.join(', ')}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section C: Flexible Learning Phases */}
      {roadmap.phases && roadmap.phases.length > 0 && (
        <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-600 flex items-center justify-center font-bold">
                C
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">
                  Flexible Learning Phases ({roadmap.phases.length} Phases)
                </h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Ordered strictly according to prerequisite progression. Complete exercises and criteria to graduate each phase.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {roadmap.phases.map((phase, pIdx) => {
              const phaseKey = phase.id || String(pIdx);
              const isExpanded = Boolean(expandedPhases[phaseKey]);

              return (
                <div
                  key={phaseKey}
                  className="rounded-2xl border border-slate-200 bg-white overflow-hidden transition-all shadow-2xs"
                >
                  <button
                    onClick={() => togglePhase(phaseKey)}
                    className="w-full p-5 text-left flex items-center justify-between hover:bg-slate-50 transition-colors cursor-pointer"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-blue-100 text-blue-700 font-bold text-xs flex items-center justify-center shrink-0">
                        {pIdx + 1}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 text-sm sm:text-base">
                            {phase.name}
                          </h3>
                          <span className="text-[11px] font-semibold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-full border border-blue-200">
                            {phase.estimatedDuration}
                          </span>
                        </div>
                        <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">
                          {phase.expectedOutcome}
                        </p>
                      </div>
                    </div>

                    <div className="text-slate-400">
                      {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </div>
                  </button>

                  {isExpanded && (
                    <div className="p-5 pt-2 border-t border-slate-100 bg-slate-50/40 space-y-5 text-xs text-slate-700">
                      {/* Learning Objectives */}
                      <div>
                        <span className="font-bold text-slate-900 block mb-1.5 uppercase text-[10px] tracking-wider">
                          Learning Objectives:
                        </span>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {phase.learningObjectives.map((obj, i) => (
                            <li key={i} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0 mt-0.5" />
                              <span>{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Specific Topics */}
                      <div>
                        <span className="font-bold text-slate-900 block mb-1.5 uppercase text-[10px] tracking-wider">
                          Specific Topics to Study:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {phase.specificTopics.map((topic, i) => (
                            <span
                              key={i}
                              className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 text-slate-800 text-[11px] font-medium"
                            >
                              {topic}
                            </span>
                          ))}
                        </div>
                      </div>

                      {/* Hands-On Exercises */}
                      {phase.handsOnExercises && phase.handsOnExercises.length > 0 && (
                        <div>
                          <span className="font-bold text-slate-900 block mb-2 uppercase text-[10px] tracking-wider">
                            Hands-On Practice Exercises:
                          </span>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {phase.handsOnExercises.map((ex, i) => (
                              <div
                                key={i}
                                className="p-3.5 rounded-xl bg-white border border-slate-200 space-y-1"
                              >
                                <div className="flex items-center justify-between font-bold text-slate-900">
                                  <span>{ex.title}</span>
                                  {ex.estimatedTime && (
                                    <span className="text-[10px] text-slate-400 font-normal">
                                      {ex.estimatedTime}
                                    </span>
                                  )}
                                </div>
                                <p className="text-[11px] text-slate-600 leading-relaxed font-normal">
                                  {ex.description}
                                </p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Practical Task or Mini-Project */}
                      {phase.practicalTaskOrProject && (
                        <div className="p-4 rounded-xl bg-blue-50/80 border border-blue-200 space-y-1.5">
                          <span className="text-[10px] font-bold text-blue-700 uppercase tracking-wider block">
                            Phase Milestone Project Deliverable:
                          </span>
                          <h4 className="font-bold text-blue-950 text-sm">
                            {phase.practicalTaskOrProject.title}
                          </h4>
                          <p className="text-xs text-blue-800 leading-relaxed font-normal">
                            {phase.practicalTaskOrProject.description}
                          </p>
                          <div className="text-[11px] text-blue-900 pt-1 font-semibold">
                            Deliverable: {phase.practicalTaskOrProject.deliverable}
                          </div>
                        </div>
                      )}

                      {/* Completion Criteria */}
                      <div>
                        <span className="font-bold text-slate-900 block mb-1.5 uppercase text-[10px] tracking-wider">
                          Ready to Advance Criteria:
                        </span>
                        <div className="space-y-1">
                          {phase.completionCriteria.map((crit, i) => (
                            <div key={i} className="flex items-center gap-2 text-slate-600">
                              <span className="w-1.5 h-1.5 rounded-full bg-blue-600 shrink-0" />
                              <span>{crit}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Section D: Personalized Weekly Plan with Interactive Checkpoints */}
      {roadmap.weeklyPlan && roadmap.weeklyPlan.length > 0 && (
        <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-xs space-y-6">
          <div className="pb-4 border-b border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                D
              </div>
              <div>
                <h2 className="text-lg font-bold text-slate-900">Personalized Weekly Plan</h2>
                <p className="text-xs text-slate-500 mt-0.5">
                  Check off items as you complete them. Your progress saves automatically to your private cloud profile.
                </p>
              </div>
            </div>

            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200 self-start sm:self-auto">
              Interactive Checklist
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {roadmap.weeklyPlan.map((week) => (
              <div
                key={week.weekNumber}
                className="p-5 rounded-2xl border border-slate-200 bg-slate-50/60 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[11px] font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded-md border border-blue-200">
                      Week {week.weekNumber}
                    </span>
                    <span className="text-[11px] text-slate-500 font-semibold">
                      {week.recommendedDailyTime}
                    </span>
                  </div>

                  <h3 className="font-bold text-slate-900 text-sm mb-1">{week.title}</h3>
                  <p className="text-[11px] text-slate-500 mb-3">{week.weeklyGoal}</p>

                  {/* Milestones Checkbox List */}
                  <div className="space-y-2 pt-2 border-t border-slate-200">
                    {week.milestones.map((m, idx) => {
                      const itemKey = `${m.id || `w${week.weekNumber}-m${idx}`}`;
                      const isDone = Boolean(completedItems[itemKey]);

                      return (
                        <label
                          key={idx}
                          className={`flex items-start gap-2.5 p-2 rounded-xl text-xs cursor-pointer transition-all ${
                            isDone
                              ? 'bg-white text-slate-800 border border-emerald-300 shadow-2xs'
                              : 'hover:bg-white text-slate-700'
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={isDone}
                            onChange={() => onToggleMilestoneItem?.(m.id || `w${week.weekNumber}`, idx)}
                            className="mt-0.5 rounded text-blue-600 focus:ring-blue-500 cursor-pointer"
                          />
                          <div className="leading-tight">
                            <span className={isDone ? 'line-through text-slate-400 font-medium' : 'font-semibold text-slate-900'}>
                              {m.title}
                            </span>
                            <p className="text-[11px] text-slate-500 mt-0.5">{m.details}</p>
                          </div>
                        </label>
                      );
                    })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section E: Portfolio Project Recommendations */}
      {roadmap.projects && roadmap.projects.length > 0 && (
        <div className="bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl p-6 sm:p-8 text-white shadow-xl space-y-6">
          <div className="pb-4 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold">
                E
              </div>
              <div>
                <span className="text-[11px] font-bold text-blue-300 uppercase tracking-wider block">
                  Standout Resume Evidence
                </span>
                <h3 className="text-xl sm:text-2xl font-bold text-white mt-0.5">
                  Recommended Portfolio Capstones
                </h3>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {roadmap.projects.map((proj, idx) => (
              <div
                key={proj.id || idx}
                className="p-6 rounded-2xl bg-white/5 border border-white/10 space-y-4 hover:border-blue-400/40 transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider bg-blue-500/20 text-blue-300 border border-blue-400/30 px-2.5 py-0.5 rounded-full">
                      {proj.level} Project
                    </span>
                  </div>
                  <h4 className="text-lg font-bold text-white mb-2">{proj.title}</h4>
                  <p className="text-xs text-slate-300 leading-relaxed font-normal">
                    {proj.elevatorPitch}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-black/20 border border-white/10 text-xs text-blue-200">
                    <strong className="text-white block mb-0.5">Why recruiters care:</strong>
                    {proj.whyItMattersForHiring}
                  </div>
                </div>

                <div className="pt-2">
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block mb-1.5">
                    Demonstrates Competency In:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {proj.skillsDemonstrated.map((sk, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 rounded-md bg-white/10 text-white text-[11px] font-mono"
                      >
                        {sk}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Section F: Curated 100% Free Learning Resources */}
      {roadmap.freeResources && roadmap.freeResources.length > 0 && (
        <div className="bg-white rounded-3xl border border-blue-200 p-6 sm:p-8 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
                F
              </div>
              <h3 className="text-lg font-bold text-slate-900">Curated Free Learning Resources</h3>
            </div>
            <span className="text-xs font-semibold text-emerald-800 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
              100% Free Forever
            </span>
          </div>

          <p className="text-xs text-slate-500">
            Vetted, high-quality open-source platforms and educational grants with zero paywalls:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            {roadmap.freeResources.map((res, idx) => (
              <a
                key={idx}
                href={res.url}
                target="_blank"
                rel="noopener noreferrer"
                className="p-4 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all group flex flex-col justify-between bg-white hover:bg-blue-50/20"
              >
                <div>
                  <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 uppercase mb-1">
                    <span>{res.provider}</span>
                    <span className="text-blue-700 bg-blue-50 px-1.5 py-0.5 rounded-md border border-blue-200">
                      {res.type}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 text-sm group-hover:text-blue-600 transition-colors flex items-center gap-1">
                    <span>{res.title}</span>
                    <ExternalLink className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 shrink-0" />
                  </h4>
                  <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal">
                    {res.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-bold">
                  <span>Access Platform</span>
                  <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Adaptive Roadmap Modal */}
      <AdaptiveRoadmapModal
        isOpen={isAdaptiveModalOpen}
        onClose={() => setIsAdaptiveModalOpen(false)}
        isLoading={isLoading}
        currentDailyTime={roadmap.userAnswers?.dailyTime}
        currentGoal={roadmap.userAnswers?.primaryGoal}
        onSubmitUpdate={async (updateData) => {
          setIsAdaptiveModalOpen(false);
          if (roadmap.userAnswers) {
            await onGenerateRoadmap(roadmap.userAnswers, updateData);
          }
        }}
      />
    </div>
  );
};
