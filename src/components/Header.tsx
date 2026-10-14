import React from 'react';
import {
  Compass,
  Sparkles,
  BarChart3,
  GitCompare,
  BookOpen,
  HeartHandshake,
  CheckCircle2,
  Award,
} from 'lucide-react';
import { StudentTryoutSession } from '../types';

interface HeaderProps {
  activeTab: 'dashboard' | 'task' | 'comparison' | 'roadmap' | 'career-info';
  setActiveTab: (tab: 'dashboard' | 'task' | 'comparison' | 'roadmap' | 'career-info') => void;
  sessions: Record<string, StudentTryoutSession>;
  onOpenMission: () => void;
  onOpenCareerGuides?: () => void;
  onOpenProgress: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  sessions,
  onOpenMission,
  onOpenCareerGuides,
  onOpenProgress,
}) => {
  const completedCount = Object.values(sessions).filter((s) => s.evaluation !== null).length;

  return (
    <header className="sticky top-0 z-40 bg-[#FFFCF7]/95 backdrop-blur-md border-b border-[#E8DDCD] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Logo & Brand */}
          <div
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group shrink-0"
            onClick={() => setActiveTab('dashboard')}
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#3E2723] flex items-center justify-center text-[#FFFCF7] shadow-xs group-hover:bg-[#2B1B17] transition-all">
              <Compass className="w-5 h-5 sm:w-5 sm:h-5 text-[#C19A6B]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-extrabold text-lg sm:text-xl tracking-tight text-[#3E2723]">
                  PathPilot<span className="text-[#C19A6B]">.AI</span>
                </span>
                <span className="hidden md:inline-flex items-center gap-1 text-[10px] font-semibold uppercase tracking-wider bg-[#F8F3EB] text-[#795548] border border-[#E8DDCD] px-2 py-0.5 rounded-full">
                  <Sparkles className="w-3 h-3 text-[#C19A6B]" />
                  Try First
                </span>
              </div>
              <p className="text-[11px] text-[#795548] font-medium hidden sm:block">
                Don’t just choose your future. Try it first.
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1 sm:gap-1.5 overflow-x-auto no-scrollbar py-1">
            <button
              onClick={() => setActiveTab('dashboard')}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'dashboard' || activeTab === 'task'
                  ? 'bg-[#F8F3EB] text-[#3E2723] border border-[#E8DDCD] shadow-2xs'
                  : 'text-[#795548] hover:text-[#3E2723] hover:bg-[#F8F3EB]/60'
              }`}
            >
              <BarChart3 className="w-4 h-4 text-[#C19A6B]" />
              <span>Career Tryouts</span>
            </button>

            <button
              onClick={() => {
                if (onOpenCareerGuides) {
                  onOpenCareerGuides();
                } else {
                  setActiveTab('career-info');
                }
              }}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'career-info'
                  ? 'bg-[#F8F3EB] text-[#3E2723] border border-[#E8DDCD] shadow-2xs'
                  : 'text-[#795548] hover:text-[#3E2723] hover:bg-[#F8F3EB]/60'
              }`}
            >
              <BookOpen className="w-4 h-4 text-[#C19A6B]" />
              <span>Career Guides</span>
            </button>

            <button
              onClick={() => setActiveTab('comparison')}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'comparison'
                  ? 'bg-[#F8F3EB] text-[#3E2723] border border-[#E8DDCD] shadow-2xs'
                  : 'text-[#795548] hover:text-[#3E2723] hover:bg-[#F8F3EB]/60'
              }`}
            >
              <GitCompare className="w-4 h-4 text-[#C19A6B]" />
              <span>Compare</span>
              {completedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#3E2723] text-[#FFFCF7] text-[10px] font-black flex items-center justify-center">
                  {completedCount}
                </span>
              )}
            </button>

            <button
              onClick={() => setActiveTab('roadmap')}
              className={`px-2.5 sm:px-3 py-1.5 sm:py-2 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer flex items-center gap-1.5 whitespace-nowrap ${
                activeTab === 'roadmap'
                  ? 'bg-[#F8F3EB] text-[#3E2723] border border-[#E8DDCD] shadow-2xs'
                  : 'text-[#795548] hover:text-[#3E2723] hover:bg-[#F8F3EB]/60'
              }`}
            >
              <Compass className="w-4 h-4 text-[#C19A6B]" />
              <span className="hidden sm:inline">Learning</span>
              <span>Roadmap</span>
            </button>
          </nav>

          {/* Right Action Area */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Tryouts Evaluated Counter */}
            <div className="hidden lg:flex items-center gap-1.5 bg-[#FFFCF7] border border-[#E8DDCD] px-2.5 py-1.5 rounded-full text-xs font-semibold text-[#795548]">
              <CheckCircle2
                className={`w-3.5 h-3.5 ${
                  completedCount > 0 ? 'text-[#C19A6B]' : 'text-[#8D7B70]'
                }`}
              />
              <span>{completedCount}/3 Evaluated</span>
            </div>

            {/* Our Mission Button */}
            <button
              onClick={onOpenMission}
              className="hidden md:flex text-xs font-semibold text-[#795548] hover:text-[#3E2723] items-center gap-1.5 px-2 py-1.5 rounded-lg hover:bg-[#F8F3EB] transition-colors cursor-pointer"
              title="First-Generation College Student Mission"
            >
              <HeartHandshake className="w-4 h-4 text-[#C19A6B]" />
              <span>Mission</span>
            </button>

            {/* My Progress Button (Replaces Auth Profile Dropdown) */}
            <button
              onClick={onOpenProgress}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#FFFCF7] hover:bg-[#F8F3EB] border border-[#E8DDCD] text-xs font-bold text-[#3E2723] transition-all cursor-pointer shadow-2xs"
              title="View your career tryout scores, verified skills, and roadmap progress"
            >
              <Award className="w-4 h-4 text-[#C19A6B]" />
              <span className="hidden sm:inline">My Progress</span>
              {completedCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-[#3E2723] text-[#FFFCF7] text-[10px] font-black flex items-center justify-center">
                  {completedCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
