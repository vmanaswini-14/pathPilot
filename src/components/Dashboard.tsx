import React from 'react';
import {
  ArrowRight,
  Clock,
  Sparkles,
  CheckCircle2,
  Code2,
  Award,
  Layers,
  BookOpen,
  TrendingUp,
  Database,
  Smartphone,
  RotateCcw,
} from 'lucide-react';
import { CAREER_LIST } from '../data/careers';
import { CareerRole, StudentTryoutSession } from '../types';

interface DashboardProps {
  onSelectCareer: (careerId: CareerRole) => void;
  onViewCareerInfo: (careerId: CareerRole) => void;
  onViewComparison: () => void;
  onViewRoadmap: () => void;
  sessions: Record<string, StudentTryoutSession>;
  onLoadDemoData: () => void;
  onResetSession: () => void;
}

export const Dashboard: React.FC<DashboardProps> = ({
  onSelectCareer,
  onViewCareerInfo,
  onViewComparison,
  onViewRoadmap,
  sessions,
  onLoadDemoData,
  onResetSession,
}) => {
  const completedSessions = Object.values(sessions).filter((s) => s.evaluation !== null);
  const completedCount = completedSessions.length;

  // Collect skills demonstrated so far across sessions
  const unlockedSkills = Array.from(
    new Set(
      completedSessions.flatMap((s) => s.evaluation?.skillsDemonstrated.map((sk) => sk.skill) || [])
    )
  );

  return (
    <div className="space-y-8 sm:space-y-10 pb-16 text-[#3F3028]">
      {/* Redesigned Hero Section: Light Cream, Centered, Clean SaaS/Edtech Design */}
      <section className="bg-white rounded-3xl border border-[#E7DDD2] p-6 sm:p-10 md:p-12 shadow-xs">
        <div className="max-w-3xl mx-auto text-center flex flex-col items-center">
          {/* Subtle Platform Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#F1E8DE] border border-[#E7DDD2] text-[#75665B] text-xs font-semibold mb-4">
            <Sparkles className="w-3.5 h-3.5 text-[#A66F4D]" />
            <span>PathPilot AI Career Simulation Platform</span>
          </div>

          {/* Clean, Bold, Responsive Headline (Without wavy underline) */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#3F3028] leading-[1.15]">
            Don’t just choose your future.{' '}
            <span className="text-[#A66F4D]">Try it first.</span>
          </h1>

          {/* Readable Introduction */}
          <p className="mt-4 text-sm sm:text-base md:text-lg text-[#75665B] leading-relaxed max-w-2xl font-normal">
            Most college students choose careers blindly without ever touching the actual work.
            PathPilot lets you try realistic career tasks across 4 difficulty levels, execute real SQL & code, receive evidence-based AI feedback, and get a personalized learning roadmap.
          </p>

          {/* Action Buttons: Start Tryout as Primary CTA, Preserving All Handlers */}
          <div className="mt-6 sm:mt-8 flex flex-wrap items-center justify-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => onSelectCareer('data-analyst')}
              className="w-full sm:w-auto px-6 py-3 bg-[#A66F4D] hover:bg-[#8E5B3F] text-white font-bold text-sm sm:text-base rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 group cursor-pointer focus:outline-hidden focus:ring-2 focus:ring-[#A66F4D] focus:ring-offset-2"
            >
              <span>Start First Tryout</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={() => onViewCareerInfo('software-engineer')}
              className="w-full sm:w-auto px-5 py-3 bg-[#F1E8DE] hover:bg-[#E7DDD2] text-[#3F3028] text-sm font-semibold rounded-xl border border-[#E7DDD2] transition-colors flex items-center justify-center gap-2 cursor-pointer focus:outline-hidden"
            >
              <BookOpen className="w-4 h-4 text-[#A66F4D]" />
              <span>Career Reality Guides</span>
            </button>

            {completedCount === 0 && (
              <button
                onClick={onLoadDemoData}
                className="w-full sm:w-auto px-4 py-3 bg-white hover:bg-[#FAF7F2] text-[#75665B] hover:text-[#3F3028] text-sm font-semibold rounded-xl border border-[#E7DDD2] transition-colors flex items-center justify-center gap-2 cursor-pointer"
                title="Populate sample student work to test the comparison and roadmap features immediately"
              >
                <Sparkles className="w-4 h-4 text-[#A66F4D]" />
                <span>Load Sample Submissions</span>
              </button>
            )}

            {completedCount > 0 && (
              <button
                onClick={onResetSession}
                className="w-full sm:w-auto px-3.5 py-2.5 bg-transparent hover:bg-[#F1E8DE] text-[#75665B] hover:text-[#3F3028] text-xs font-semibold rounded-lg border border-[#E7DDD2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                title="Reset session progress"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Reset Session Progress</span>
              </button>
            )}
          </div>
        </div>
      </section>

      {/* Progress & Exploration Status Section */}
      <section className="bg-white rounded-2xl border border-[#E7DDD2] p-5 sm:p-7 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-[#E7DDD2]">
          <div>
            <div className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-[#A66F4D]" />
              <h2 className="text-base sm:text-lg font-bold text-[#3F3028]">Your Career Exploration Progress</h2>
            </div>
            <p className="text-xs sm:text-sm text-[#75665B] mt-0.5">
              Experience all three career tryouts to unlock a comparative suitability matrix and 8-week customized roadmap.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="text-right">
              <span className="text-2xl font-black text-[#3F3028]">{completedCount}</span>
              <span className="text-[#75665B] text-sm font-semibold"> / 3</span>
              <p className="text-[11px] text-[#75665B] font-medium">Tryouts Completed</p>
            </div>
            <div className="w-11 h-11 rounded-full border-3 border-[#F1E8DE] border-t-[#A66F4D] flex items-center justify-center font-bold text-xs text-[#3F3028]">
              {Math.round((completedCount / 3) * 100)}%
            </div>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-4 w-full bg-[#FAF7F2] rounded-full h-2.5 overflow-hidden border border-[#E7DDD2]">
          <div
            className="bg-[#A66F4D] h-2.5 rounded-full transition-all duration-500 ease-out"
            style={{ width: `${Math.max(6, (completedCount / 3) * 100)}%` }}
          />
        </div>

        {/* Quick action badges & unlocked skills */}
        <div className="mt-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[11px] font-semibold text-[#75665B] uppercase tracking-wider">
              Skills Demonstrated:
            </span>
            {unlockedSkills.length === 0 ? (
              <span className="text-xs text-[#75665B] italic">
                None yet. Complete a tryout to see your verified skills!
              </span>
            ) : (
              unlockedSkills.slice(0, 6).map((skill) => (
                <span
                  key={skill}
                  className="inline-flex items-center gap-1 text-xs font-semibold bg-[#F1E8DE] text-[#3F3028] border border-[#E7DDD2] px-2.5 py-0.5 rounded-full"
                >
                  <Award className="w-3 h-3 text-[#A66F4D]" />
                  {skill}
                </span>
              ))
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={onViewComparison}
              className="px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer bg-[#FFFCF7] hover:bg-[#F8F3EB] text-[#3E2723] border border-[#E8DDCD]"
            >
              <Layers className="w-3.5 h-3.5 text-[#C19A6B]" />
              <span>Compare Careers ({completedCount}/3)</span>
            </button>

            <button
              id="btn-open-roadmap-dashboard"
              onClick={onViewRoadmap}
              className="px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer bg-[#3E2723] hover:bg-[#2B1B17] text-[#FFFCF7] shadow-xs"
            >
              <BookOpen className="w-3.5 h-3.5 text-[#C19A6B]" />
              <span>Personalized Roadmap</span>
            </button>
          </div>
        </div>
      </section>

      {/* 3 Interactive Career Tryout Cards */}
      <section className="space-y-5 sm:space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl sm:text-2xl font-extrabold text-[#3F3028] tracking-tight">
              Select a Career Tryout
            </h2>
            <p className="text-xs sm:text-sm text-[#75665B] mt-1">
              Each career features 4 distinct selectable levels, an interactive practical workspace, real execution (SQL/Code), and evidence-based AI feedback.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 sm:gap-6">
          {CAREER_LIST.map((career) => {
            const session = sessions[career.id];
            const isCompleted = Boolean(session?.evaluation);
            const score = session?.evaluation?.overallScore;

            // Icon by role
            const renderIcon = () => {
              if (career.id === 'data-analyst') return <Database className="w-5 h-5 text-[#A66F4D]" />;
              if (career.id === 'ux-designer') return <Smartphone className="w-5 h-5 text-[#A66F4D]" />;
              return <Code2 className="w-5 h-5 text-[#A66F4D]" />;
            };

            return (
              <div
                key={career.id}
                className="group relative flex flex-col justify-between rounded-2xl bg-white border border-[#E7DDD2] hover:border-[#A66F4D] hover:shadow-md transition-all duration-200 p-5 sm:p-6"
              >
                <div>
                  {/* Card Header & Badge */}
                  <div className="flex items-start justify-between gap-3 mb-4">
                    <div className="w-11 h-11 rounded-xl bg-[#FAF7F2] border border-[#E7DDD2] flex items-center justify-center group-hover:scale-105 transition-transform">
                      {renderIcon()}
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#F1E8DE] text-[#3F3028] border border-[#E7DDD2]">
                        {career.badge}
                      </span>
                      {isCompleted && (
                        <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                          Score: {score}/100
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Tagline */}
                  <h3 className="text-lg sm:text-xl font-bold text-[#3F3028] group-hover:text-[#A66F4D] transition-colors">
                    {career.title}
                  </h3>
                  <p className="text-xs font-semibold text-[#75665B] mt-0.5">{career.category}</p>

                  <p className="mt-3 text-xs sm:text-sm text-[#75665B] leading-relaxed font-normal">
                    {career.tagline}
                  </p>

                  {/* Overview of 4 Levels */}
                  <div className="mt-4 p-3 rounded-xl bg-[#FAF7F2] border border-[#E7DDD2] text-xs">
                    <p className="font-bold text-[#3F3028] mb-1">
                      Interactive Workspace & 4 Levels:
                    </p>
                    <p className="text-[#75665B] leading-normal">{career.overview}</p>
                  </div>

                  {/* Key Skills Tags */}
                  <div className="mt-4">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-[#75665B] mb-2">
                      Key Competencies:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {career.keySkills.map((skill) => (
                        <span
                          key={skill}
                          className="text-[11px] font-medium bg-[#F1E8DE] text-[#3F3028] px-2 py-0.5 rounded-md border border-[#E7DDD2]"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer with Duration & Action */}
                <div className="mt-6 pt-4 border-t border-[#E7DDD2] flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5">
                  <div className="flex items-center gap-1.5 text-xs text-[#75665B] font-medium">
                    <Clock className="w-3.5 h-3.5 text-[#A66F4D]" />
                    <span>{career.taskDuration}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onViewCareerInfo(career.id)}
                      className="flex-1 sm:flex-initial px-3 py-2 text-xs font-bold rounded-xl bg-[#FAF7F2] hover:bg-[#F1E8DE] text-[#3F3028] border border-[#E7DDD2] transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
                      title={`Read comprehensive in-depth career and salary guide for ${career.shortTitle}`}
                    >
                      <BookOpen className="w-3.5 h-3.5 text-[#A66F4D]" />
                      <span>Reality Guide</span>
                    </button>

                    <button
                      onClick={() => onSelectCareer(career.id)}
                      className={`flex-1 sm:flex-initial px-3.5 py-2 text-xs font-bold rounded-xl transition-all flex items-center justify-center gap-1.5 cursor-pointer ${
                        isCompleted
                          ? 'bg-[#F1E8DE] hover:bg-[#E7DDD2] text-[#3F3028] border border-[#E7DDD2]'
                          : 'bg-[#A66F4D] hover:bg-[#8E5B3F] text-white shadow-2xs'
                      }`}
                    >
                      <span>{isCompleted ? 'Review / Retake' : 'Start Tryout'}</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* How PathPilot Works Guide */}
      <section className="bg-white rounded-2xl border border-[#E7DDD2] p-5 sm:p-7 shadow-xs">
        <div className="max-w-2xl mb-5">
          <h3 className="text-base sm:text-lg font-bold text-[#3F3028]">How the PathPilot Journey Works</h3>
          <p className="text-xs text-[#75665B] mt-0.5">
            Designed for first-generation and under-resourced students with zero previous experience in tech or corporate roles.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#A66F4D] text-white font-bold text-xs flex items-center justify-center shrink-0">
              1
            </div>
            <div>
              <h4 className="font-bold text-[#3F3028] text-xs sm:text-sm">Pick a Real Work Challenge</h4>
              <p className="text-xs text-[#75665B] mt-1 leading-relaxed">
                Choose from 4 difficulty levels: execute SQL queries on real tables, critique interactive mobile app mockups, or debug financial aid logic.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#8E5B3F] text-white font-bold text-xs flex items-center justify-center shrink-0">
              2
            </div>
            <div>
              <h4 className="font-bold text-[#3F3028] text-xs sm:text-sm">Evidence-Based AI Feedback</h4>
              <p className="text-xs text-[#75665B] mt-1 leading-relaxed">
                Receive quotes of your exact submitted work, detected skills, areas to polish, and an exemplary revised answer.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3">
            <div className="w-7 h-7 rounded-lg bg-[#3F3028] text-white font-bold text-xs flex items-center justify-center shrink-0">
              3
            </div>
            <div>
              <h4 className="font-bold text-[#3F3028] text-xs sm:text-sm">Personalized Roadmap</h4>
              <p className="text-xs text-[#75665B] mt-1 leading-relaxed">
                Reflect on your enjoyment and get an 8-week structured roadmap with verified 100% free learning resources and a portfolio project.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
