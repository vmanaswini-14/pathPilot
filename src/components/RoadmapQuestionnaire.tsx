import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Code2,
  Database,
  Smartphone,
  Check,
  RotateCcw,
  Clock,
  Target,
  Brain,
  Layers,
} from 'lucide-react';
import { CareerRole, RoadmapQuestionnaireAnswers } from '../types';

interface RoadmapQuestionnaireProps {
  initialCareerId?: CareerRole;
  initialAnswers?: RoadmapQuestionnaireAnswers | null;
  onGenerate: (answers: RoadmapQuestionnaireAnswers) => void;
  isLoading: boolean;
  onCancel?: () => void;
}

const CAREER_OPTIONS: Array<{
  id: CareerRole;
  title: string;
  badge: string;
  desc: string;
  icon: 'code' | 'data' | 'design';
}> = [
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    badge: 'Code & Systems',
    desc: 'Algorithms, data structures, full-stack APIs, defensive validation, and deployment.',
    icon: 'code',
  },
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    badge: 'SQL & Insights',
    desc: 'Data extraction, SQL filtering, cohort metrics, visualization, and business recommendations.',
    icon: 'data',
  },
  {
    id: 'ux-designer',
    title: 'UX / Product Designer',
    badge: 'Human-Centered',
    desc: 'Heuristic audits, wireframing, Figma components, usability testing, and WCAG accessibility.',
    icon: 'design',
  },
];

const SKILLS_BY_CAREER: Record<CareerRole, string[]> = {
  'software-engineer': [
    'Programming fundamentals',
    'Data structures and algorithms',
    'HTML/CSS/JavaScript',
    'Frontend development',
    'Backend development and APIs',
    'Databases and SQL',
    'Git and GitHub',
    'Projects and deployment',
  ],
  'data-analyst': [
    'Excel or spreadsheets',
    'SQL',
    'Python',
    'Statistics',
    'Data cleaning',
    'Data visualization',
    'Power BI or Tableau',
    'Projects and business insights',
  ],
  'ux-designer': [
    'UI design fundamentals',
    'User research',
    'Wireframing',
    'Prototyping',
    'Figma',
    'Usability testing',
    'Accessibility',
    'Product thinking and case studies',
  ],
};

const SKILL_LEVELS = [
  'Complete beginner',
  'Know the basics',
  'Intermediate',
  'Already have project experience',
];

const GOAL_OPTIONS = [
  'Get an internship',
  'Prepare for placements',
  'Become job-ready',
  'Build projects for my portfolio',
  'Explore whether this career suits me',
  'Improve my existing skills',
];

const TIME_OPTIONS = [
  '30 minutes per day',
  '1 hour per day',
  '2 hours per day',
  '3+ hours per day',
  'Different amounts on different days',
];

const DEADLINE_OPTIONS = [
  'Within 1 month',
  'Within 3 months',
  'Within 6 months',
  'Within 12 months',
  'No fixed deadline',
];

const CHALLENGES_OPTIONS = [
  'Weak fundamentals',
  'Difficulty solving problems',
  'Lack of practical experience',
  'Not knowing what to learn next',
  'Difficulty building projects',
  'Lack of confidence',
  'Interview preparation',
  'Staying consistent',
];

const LEARNING_STYLES = [
  'Learn concepts first, then practise',
  'Learn by building projects',
  'Solve challenges and exercises',
  'A mixture of all three',
];

const PRIORITIES_OPTIONS = [
  'Fundamentals',
  'Practical skills',
  'Portfolio projects',
  'Interview preparation',
  'Advanced skills',
];

export const RoadmapQuestionnaire: React.FC<RoadmapQuestionnaireProps> = ({
  initialCareerId = 'software-engineer',
  initialAnswers,
  onGenerate,
  isLoading,
  onCancel,
}) => {
  const [selectedCareer, setSelectedCareer] = useState<CareerRole>(
    initialAnswers?.careerId || initialCareerId
  );
  const [step, setStep] = useState<number>(1);

  const [skillLevel, setSkillLevel] = useState<string>(
    initialAnswers?.skillLevel || 'Complete beginner'
  );
  const [learnedSkills, setLearnedSkills] = useState<string[]>(
    initialAnswers?.learnedSkills || []
  );
  const [primaryGoal, setPrimaryGoal] = useState<string>(
    initialAnswers?.primaryGoal || 'Become job-ready'
  );
  const [dailyTime, setDailyTime] = useState<string>(
    initialAnswers?.dailyTime || '1 hour per day'
  );
  const [deadline, setDeadline] = useState<string>(
    initialAnswers?.deadline || 'Within 6 months'
  );
  const [challenges, setChallenges] = useState<string[]>(
    initialAnswers?.challenges || ['Not knowing what to learn next']
  );
  const [learningStyle, setLearningStyle] = useState<string>(
    initialAnswers?.learningStyle || 'A mixture of all three'
  );
  const [currentPriority, setCurrentPriority] = useState<string>(
    initialAnswers?.currentPriority || 'Practical skills'
  );

  const totalSteps = 8;
  const progressPercent = Math.round((step / totalSteps) * 100);

  const toggleLearnedSkill = (skill: string) => {
    setLearnedSkills((prev) =>
      prev.includes(skill) ? prev.filter((s) => s !== skill) : [...prev, skill]
    );
  };

  const toggleChallenge = (challenge: string) => {
    setChallenges((prev) =>
      prev.includes(challenge) ? prev.filter((c) => c !== challenge) : [...prev, challenge]
    );
  };

  const handleNext = () => {
    if (step < totalSteps) {
      setStep((prev) => prev + 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    } else {
      handleSubmit();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep((prev) => prev - 1);
      window.scrollTo({ top: 120, behavior: 'smooth' });
    }
  };

  const handleSubmit = () => {
    onGenerate({
      careerId: selectedCareer,
      skillLevel,
      learnedSkills,
      primaryGoal,
      dailyTime,
      deadline,
      challenges,
      learningStyle,
      currentPriority,
    });
  };

  const renderCareerIcon = (icon: string) => {
    if (icon === 'code') return <Code2 className="w-5 h-5 text-[#C19A6B]" />;
    if (icon === 'data') return <Database className="w-5 h-5 text-[#C19A6B]" />;
    return <Smartphone className="w-5 h-5 text-[#C19A6B]" />;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in pb-16">
      {/* Top Banner & Career Switcher */}
      <div className="bg-[#FFFCF7] rounded-3xl border border-[#E8DDCD] p-6 sm:p-8 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E8DDCD]/60">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F8F3EB] border border-[#E8DDCD] text-[#795548] text-xs font-semibold mb-2">
              <Sparkles className="w-3.5 h-3.5 text-[#C19A6B]" />
              <span>Personalized Career Roadmap Generator</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[#3E2723] tracking-tight">
              Interactive Career Questionnaire
            </h1>
            <p className="text-xs sm:text-sm text-[#795548] mt-1">
              Answer 8 brief questions to generate an evidence-based, prerequisite-aware learning plan tailored to your exact starting level and schedule.
            </p>
          </div>

          {onCancel && (
            <button
              onClick={onCancel}
              className="text-xs font-bold text-[#795548] hover:text-[#3E2723] px-3 py-1.5 rounded-xl border border-[#E8DDCD] hover:bg-[#F8F3EB] transition-colors self-start cursor-pointer"
            >
              Cancel
            </button>
          )}
        </div>

        {/* Selected Career Tabs */}
        <div className="pt-6">
          <label className="block text-xs font-bold text-[#3E2723] uppercase tracking-wider mb-2.5">
            Step 0: Target Career Role
          </label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {CAREER_OPTIONS.map((c) => {
              const isSelected = selectedCareer === c.id;
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => {
                    setSelectedCareer(c.id);
                    setLearnedSkills([]);
                  }}
                  className={`p-3.5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between ${
                    isSelected
                      ? 'border-[#C19A6B] bg-[#F8F3EB] shadow-sm ring-2 ring-[#C19A6B]/20'
                      : 'border-[#E8DDCD] bg-[#FFFCF7] hover:border-[#C19A6B]/50 hover:bg-[#F8F3EB]/40'
                  }`}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-8 h-8 rounded-xl bg-[#F8F3EB] border border-[#E8DDCD] flex items-center justify-center">
                      {renderCareerIcon(c.icon)}
                    </div>
                    {isSelected && (
                      <span className="w-5 h-5 rounded-full bg-[#3E2723] text-[#FFFCF7] flex items-center justify-center">
                        <Check className="w-3 h-3 stroke-[3]" />
                      </span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-[#3E2723] text-xs sm:text-sm">{c.title}</h3>
                    <p className="text-[11px] text-[#795548] mt-1 line-clamp-2 leading-relaxed">
                      {c.desc}
                    </p>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="bg-[#FFFCF7] rounded-2xl border border-[#E8DDCD] p-5 shadow-xs">
        <div className="flex items-center justify-between text-xs font-bold mb-2">
          <span className="text-[#3E2723]">
            Question {step} of {totalSteps}
          </span>
          <span className="text-[#795548]">{progressPercent}% Completed</span>
        </div>
        <div className="w-full h-2.5 rounded-full bg-[#F8F3EB] overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-[#C19A6B] to-[#795548] rounded-full transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Main Questionnaire Card */}
      <div className="bg-[#FFFCF7] rounded-3xl border border-[#E8DDCD] p-6 sm:p-8 shadow-xs space-y-6">
        {/* Q1: Skill Level */}
        {step === 1 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question 1 of 8
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                What is your current skill level in this career?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Be honest! We adapt your starting point so you don’t repeat what you already know or jump in over your head.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SKILL_LEVELS.map((lvl) => {
                const isSelected = skillLevel === lvl;
                return (
                  <button
                    key={lvl}
                    type="button"
                    onClick={() => setSkillLevel(lvl)}
                    className={`p-4 rounded-2xl border text-left font-medium text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{lvl}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Q2: Skills Already Learned */}
        {step === 2 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question 2 of 8 • Multiple Selections Allowed
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                Which skills have you already learned?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select all that apply. If you haven’t started yet, you can leave all unselected.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {SKILLS_BY_CAREER[selectedCareer].map((sk) => {
                const isSelected = learnedSkills.includes(sk);
                return (
                  <button
                    key={sk}
                    type="button"
                    onClick={() => toggleLearnedSkill(sk)}
                    className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{sk}</span>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-slate-500 pt-2 flex items-center justify-between">
              <span>{learnedSkills.length} skills selected</span>
              {learnedSkills.length > 0 && (
                <button
                  type="button"
                  onClick={() => setLearnedSkills([])}
                  className="text-blue-600 hover:text-blue-700 font-bold cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}

        {/* Q3: Primary Goal */}
        {step === 3 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question 3 of 8
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                What is your primary goal?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Different goals require different milestone priorities (e.g., placements vs exploratory curiosity).
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {GOAL_OPTIONS.map((g) => {
                const isSelected = primaryGoal === g;
                return (
                  <button
                    key={g}
                    type="button"
                    onClick={() => setPrimaryGoal(g)}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{g}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Q4: Daily Time Commitment */}
        {step === 4 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question 4 of 8
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                How much time can you dedicate to learning?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We pace your weekly milestones to fit your real schedule so you don’t burn out.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {TIME_OPTIONS.map((t) => {
                const isSelected = dailyTime === t;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setDailyTime(t)}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{t}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Q5: Target Deadline */}
        {step === 5 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question 5 of 8
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                What is your target deadline?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                If you have no fixed deadline, our AI will recommend a realistic timeline based on your available hours.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {DEADLINE_OPTIONS.map((d) => {
                const isSelected = deadline === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setDeadline(d)}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{d}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Q6: Biggest Challenges */}
        {step === 6 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question 6 of 8 • Multiple Selections Allowed
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                What are your biggest challenges?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                We build direct scaffolding and focused exercises into your roadmap to target these exact friction points.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {CHALLENGES_OPTIONS.map((c) => {
                const isSelected = challenges.includes(c);
                return (
                  <button
                    key={c}
                    type="button"
                    onClick={() => toggleChallenge(c)}
                    className={`p-3.5 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{c}</span>
                    <div
                      className={`w-5 h-5 rounded-md border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-slate-500 pt-2 flex items-center justify-between">
              <span>{challenges.length} challenges selected</span>
              {challenges.length > 0 && (
                <button
                  type="button"
                  onClick={() => setChallenges([])}
                  className="text-blue-600 hover:text-blue-700 font-bold cursor-pointer"
                >
                  Clear all
                </button>
              )}
            </div>
          </div>
        )}

        {/* Q7: Learning Style */}
        {step === 7 && (
          <div className="space-y-4 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question 7 of 8
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                What learning style do you prefer?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                This dictates the balance between conceptual tutorials, hands-on katas, and portfolio projects in your weekly plan.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
              {LEARNING_STYLES.map((ls) => {
                const isSelected = learningStyle === ls;
                return (
                  <button
                    key={ls}
                    type="button"
                    onClick={() => setLearningStyle(ls)}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{ls}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Q8: Current Priority & Review */}
        {step === 8 && (
          <div className="space-y-6 animate-in fade-in">
            <div>
              <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block mb-1">
                Question 8 of 8 • Final Step
              </span>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900">
                What is your current priority for {selectedCareer === 'software-engineer' ? 'Software Engineering' : selectedCareer === 'data-analyst' ? 'Data Analytics' : 'UX Design'}?
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 mt-1">
                Select your top focus area for Phase 1.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PRIORITIES_OPTIONS.map((p) => {
                const isSelected = currentPriority === p;
                return (
                  <button
                    key={p}
                    type="button"
                    onClick={() => setCurrentPriority(p)}
                    className={`p-4 rounded-2xl border text-left text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                      isSelected
                        ? 'border-blue-600 bg-blue-50/80 text-blue-900 font-bold shadow-xs'
                        : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                    }`}
                  >
                    <span>{p}</span>
                    <div
                      className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 ${
                        isSelected
                          ? 'border-blue-600 bg-blue-600 text-white'
                          : 'border-slate-300 bg-white'
                      }`}
                    >
                      {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Answers Summary Preview */}
            <div className="p-4 rounded-2xl bg-blue-50/70 border border-blue-200 text-xs text-blue-900 space-y-2">
              <span className="font-bold text-blue-900 block">Summary of Your Selections:</span>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-[11px] text-blue-800">
                <div>
                  <strong className="block text-slate-500">Track:</strong>
                  <span>{selectedCareer}</span>
                </div>
                <div>
                  <strong className="block text-slate-500">Level:</strong>
                  <span>{skillLevel}</span>
                </div>
                <div>
                  <strong className="block text-slate-500">Goal:</strong>
                  <span>{primaryGoal}</span>
                </div>
                <div>
                  <strong className="block text-slate-500">Time/Day:</strong>
                  <span>{dailyTime}</span>
                </div>
                <div>
                  <strong className="block text-slate-500">Target:</strong>
                  <span>{deadline}</span>
                </div>
                <div>
                  <strong className="block text-slate-500">Priority:</strong>
                  <span>{currentPriority}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Buttons */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-100">
          <button
            type="button"
            onClick={handleBack}
            disabled={step === 1 || isLoading}
            className="px-4 py-2.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 hover:text-slate-900 hover:bg-slate-50 disabled:opacity-30 disabled:cursor-not-allowed transition-all flex items-center gap-1.5 cursor-pointer"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back</span>
          </button>

          {step < totalSteps ? (
            <button
              type="button"
              onClick={handleNext}
              className="px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-xs transition-all flex items-center gap-1.5 cursor-pointer"
            >
              <span>Continue</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          ) : (
            <button
              id="btn-get-personalized-roadmap"
              type="button"
              onClick={handleSubmit}
              disabled={isLoading}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 disabled:opacity-50 text-white text-xs sm:text-sm font-extrabold shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
            >
              <Sparkles className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
              <span>{isLoading ? 'Synthesizing with Gemini...' : 'Get My Personalized Roadmap'}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
