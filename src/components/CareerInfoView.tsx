import React, { useState } from 'react';
import {
  Compass,
  ArrowRight,
  GitCompare,
  ArrowLeft,
  Calendar,
  Building2,
  TrendingUp,
  Award,
  AlertTriangle,
  HelpCircle,
  ExternalLink,
  Clock,
  CheckCircle2,
  DollarSign,
  Briefcase,
  Layers,
  Sparkles,
  BookOpen,
  Users,
  ShieldAlert,
  ChevronRight,
  Code2,
  Database,
  Smartphone,
  Info,
  Check,
  ChevronDown,
} from 'lucide-react';
import { CareerRole } from '../types';
import { CAREER_GUIDES } from '../data/careerGuides';
import { CAREER_LIST } from '../data/careers';

interface CareerInfoViewProps {
  careerId: CareerRole;
  onSelectCareerToView: (careerId: CareerRole) => void;
  onExploreCareerTryout: (careerId: CareerRole) => void;
  onCompareCareers: () => void;
  onBackToDashboard: () => void;
  hasCompletedTryout?: boolean;
}

export const CareerInfoView: React.FC<CareerInfoViewProps> = ({
  careerId,
  onSelectCareerToView,
  onExploreCareerTryout,
  onCompareCareers,
  onBackToDashboard,
  hasCompletedTryout = false,
}) => {
  const guide = CAREER_GUIDES[careerId] || CAREER_GUIDES['software-engineer'];
  const [activeSection, setActiveSection] = useState<string>('overview');
  const [ladderMode, setLadderMode] = useState<'ic' | 'management'>('ic');

  const sections = [
    { id: 'overview', label: 'A. Career Overview' },
    { id: 'daily-work', label: 'B. What They Actually Do' },
    { id: 'salary-india', label: 'C. Salary in India' },
    { id: 'skills', label: 'D. Skills & Qualifications' },
    { id: 'growth', label: 'E. Career Growth' },
    { id: 'workplace', label: 'F. Where They Work' },
    { id: 'pros-cons', label: 'G. Advantages & Challenges' },
    { id: 'how-to-enter', label: 'H. How to Enter the Career' },
  ];

  const scrollToSection = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      const yOffset = -120;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  const getRoleIcon = (role: CareerRole) => {
    if (role === 'data-analyst') return <Database className="w-5 h-5 text-[#B9825B]" />;
    if (role === 'ux-designer') return <Smartphone className="w-5 h-5 text-[#B9825B]" />;
    return <Code2 className="w-5 h-5 text-[#B9825B]" />;
  };

  return (
    <div className="space-y-8 pb-24 text-[#4A3028]">
      {/* Top Breadcrumb & Role Switcher */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9C7B5]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToDashboard}
            className="p-2 rounded-xl bg-white border border-[#D9C7B5] hover:bg-[#E8D6C3]/40 text-[#4A3028] transition-colors cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]">
                Career Reality & Information Guide
              </span>
              <span className="text-[#D9C7B5]">•</span>
              <span className="text-xs text-[#806B5E] font-medium flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-[#B9825B]" /> {guide.lastUpdated}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-[#4A3028] mt-1 tracking-tight">
              {guide.title} Reality Guide
            </h1>
          </div>
        </div>

        {/* Career Switcher Tabs */}
        <div className="flex items-center gap-1.5 bg-[#E8D6C3]/40 p-1 rounded-xl border border-[#D9C7B5] overflow-x-auto">
          {CAREER_LIST.map((c) => {
            const isSelected = c.id === careerId;
            return (
              <button
                key={c.id}
                onClick={() => onSelectCareerToView(c.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-[#B9825B] text-white shadow-xs'
                    : 'text-[#4A3028] hover:text-[#B9825B] hover:bg-white/60'
                }`}
              >
                {getRoleIcon(c.id)}
                <span>{c.shortTitle}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Hero Header Card */}
      <section className="relative overflow-hidden rounded-3xl bg-[#4A3028] text-white p-7 sm:p-10 shadow-xl border border-[#3D251F]">
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-80 h-80 rounded-full bg-[#B9825B]/15 blur-3xl pointer-events-none" />
        <div className="relative z-10 max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8D6C3]/20 border border-[#D9C7B5]/30 text-[#E8D6C3] text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5 text-[#B9825B]" />
            <span>Comprehensive Student Career Guide & Reality Check</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold text-white tracking-tight leading-snug">
            {guide.heroTagline}
          </h2>

          <p className="text-[#F8F3EB]/90 text-sm sm:text-base leading-relaxed">
            {guide.overview.plainLanguageSummary}
          </p>

          {/* Dual Action Buttons */}
          <div className="pt-4 flex flex-wrap items-center gap-3">
            <button
              onClick={() => onExploreCareerTryout(careerId)}
              className="px-6 py-3 bg-[#B9825B] hover:bg-[#A06D48] text-white font-bold text-sm rounded-xl shadow-lg shadow-[#B9825B]/30 transition-all flex items-center gap-2 cursor-pointer group"
            >
              <span>{hasCompletedTryout ? 'Retake Hands-On Tryout' : 'Explore This Career (Tryout)'}</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>

            <button
              onClick={onCompareCareers}
              className="px-5 py-3 bg-[#35221C] hover:bg-[#281813] text-[#E8D6C3] text-sm font-semibold rounded-xl border border-[#D9C7B5]/30 transition-colors flex items-center gap-2 cursor-pointer"
            >
              <GitCompare className="w-4 h-4 text-[#B9825B]" />
              <span>Compare Careers Matrix</span>
            </button>
          </div>
        </div>
      </section>

      {/* Sticky Quick-Jump Navigation Bar */}
      <div className="sticky top-20 z-30 bg-[#F8F3EB]/95 backdrop-blur-md py-2.5 px-2 rounded-2xl border border-[#D9C7B5] shadow-xs overflow-x-auto flex items-center gap-2">
        <span className="text-[11px] font-bold text-[#806B5E] uppercase tracking-wider pl-2 pr-1 shrink-0">
          Jump to Section:
        </span>
        {sections.map((sec) => (
          <button
            key={sec.id}
            onClick={() => scrollToSection(sec.id)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all whitespace-nowrap cursor-pointer shrink-0 ${
              activeSection === sec.id
                ? 'bg-[#B9825B] text-white shadow-xs'
                : 'bg-white hover:bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]'
            }`}
          >
            {sec.label}
          </button>
        ))}
      </div>

      {/* =====================================================================
          SECTION A: CAREER OVERVIEW
         ===================================================================== */}
      <section id="overview" className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-28">
        <div className="border-b border-[#D9C7B5] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B9825B] uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Section A</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
            Career Overview & Core Problems
          </h3>
          <p className="text-sm text-[#806B5E] mt-1">
            Understanding what a {guide.shortTitle} actually does in simple, non-jargon language.
          </p>
        </div>

        {/* Problems Solved Grid */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3 flex items-center gap-2">
            <span>What Real Problems Do They Solve?</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guide.overview.coreProblemsSolved.map((prob, i) => (
              <div key={i} className="p-4 rounded-xl bg-[#F8F3EB] border border-[#D9C7B5]">
                <h5 className="font-bold text-sm text-[#4A3028] flex items-center gap-2">
                  <span className="w-5 h-5 rounded-full bg-[#B9825B] text-white text-xs font-black flex items-center justify-center shrink-0">
                    {i + 1}
                  </span>
                  {prob.problem}
                </h5>
                <p className="text-xs text-[#806B5E] mt-2 leading-relaxed">
                  {prob.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Business Contribution */}
        <div className="p-4 rounded-xl bg-[#E8D6C3]/40 border border-[#D9C7B5]">
          <h4 className="font-bold text-sm text-[#4A3028] mb-1 flex items-center gap-2">
            <Building2 className="w-4 h-4 text-[#B9825B]" />
            <span>How Their Work Directly Contributes to a Company</span>
          </h4>
          <p className="text-xs text-[#4A3028] leading-relaxed">
            {guide.overview.businessContribution}
          </p>
        </div>

        {/* Common Misconceptions Debunked */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3 flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#B9825B]" />
            <span>Common Misconceptions Debunked</span>
          </h4>
          <div className="space-y-3">
            {guide.overview.commonMisconceptions.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-rose-800 bg-rose-100 px-2 py-0.5 rounded-md border border-rose-200">
                    Myth
                  </span>
                  <p className="text-xs font-semibold text-[#4A3028] pt-1">
                    “{item.myth}”
                  </p>
                </div>
                <div className="space-y-1 md:border-l md:border-[#D9C7B5] md:pl-4">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-md border border-emerald-200">
                    Workplace Reality
                  </span>
                  <p className="text-xs text-[#806B5E] pt-1 leading-relaxed">
                    {item.reality}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION B: WHAT THEY ACTUALLY DO
         ===================================================================== */}
      <section id="daily-work" className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-28">
        <div className="border-b border-[#D9C7B5] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B9825B] uppercase tracking-wider">
            <Briefcase className="w-4 h-4" />
            <span>Section B</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
            What They Actually Do Daily
          </h3>
          <p className="text-sm text-[#806B5E] mt-1">
            Typical responsibilities, real workplace scenarios, tools utilized, and collaboration dynamics.
          </p>
        </div>

        {/* Daily Responsibilities Checklist */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3">
            Typical Daily Responsibilities
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
            {guide.actualWork.dailyResponsibilities.map((resp, i) => (
              <div key={i} className="flex items-start gap-2.5 p-3 rounded-xl bg-[#F8F3EB] border border-[#D9C7B5]">
                <CheckCircle2 className="w-4 h-4 text-[#B9825B] shrink-0 mt-0.5" />
                <span className="text-xs text-[#4A3028] leading-relaxed">{resp}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Real Workplace Task Examples */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3">
            Real Workplace Task Scenarios
          </h4>
          <div className="space-y-3">
            {guide.actualWork.realWorkplaceTaskExamples.map((item, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <h5 className="font-bold text-sm text-[#4A3028] flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded-md bg-[#E8D6C3] text-[11px] font-bold text-[#4A3028]">
                      Scenario {idx + 1}
                    </span>
                    {item.scenario}
                  </h5>
                </div>
                <p className="text-xs text-[#806B5E] leading-relaxed">
                  <strong className="text-[#4A3028]">Typical Action: </strong>
                  {item.typicalAction}
                </p>
                <div className="p-2.5 rounded-lg bg-white border border-[#D9C7B5] text-xs">
                  <span className="font-bold text-[#B9825B]">Tangible Deliverable: </span>
                  <span className="text-[#4A3028]">{item.tangibleDeliverable}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tools and Technologies */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3">
            Tools & Technologies Commonly Used
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {guide.actualWork.toolsAndTechnologies.map((cat, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs uppercase tracking-wider text-[#B9825B] mb-2">
                    {cat.category}
                  </h5>
                  <div className="flex flex-wrap gap-1.5 mb-2">
                    {cat.tools.map((tool) => (
                      <span
                        key={tool}
                        className="text-xs font-semibold px-2 py-0.5 rounded-md bg-white text-[#4A3028] border border-[#D9C7B5]"
                      >
                        {tool}
                      </span>
                    ))}
                  </div>
                </div>
                <p className="text-[11px] text-[#806B5E] leading-normal pt-2 border-t border-[#D9C7B5]">
                  {cat.purpose}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Cross-Functional Collaboration */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3 flex items-center gap-2">
            <Users className="w-4 h-4 text-[#B9825B]" />
            <span>How They Collaborate Across Teams</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {guide.actualWork.crossFunctionalCollaboration.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] space-y-1.5">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-xs text-[#4A3028]">{item.collaborator}</h5>
                  <span className="text-[10px] font-semibold text-[#806B5E] bg-white px-2 py-0.5 rounded border border-[#D9C7B5]">
                    {item.frequency}
                  </span>
                </div>
                <p className="text-xs text-[#806B5E] leading-relaxed">
                  {item.dynamic}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Illustrative Working-Day Timeline */}
        <div className="p-5 rounded-xl bg-[#F8F3EB] border border-[#D9C7B5] space-y-4">
          <div className="flex items-center justify-between gap-3">
            <h4 className="font-bold text-[#4A3028] text-sm flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#B9825B]" />
              <span>An Illustrative Working-Day Timeline (Example Schedule)</span>
            </h4>
          </div>

          <div className="p-3 rounded-lg bg-white border border-[#D9C7B5] text-xs text-[#806B5E] flex items-start gap-2">
            <Info className="w-4 h-4 text-[#B9825B] shrink-0 mt-0.5" />
            <p className="leading-relaxed">
              {guide.actualWork.illustrativeDaySchedule.scheduleNote}
            </p>
          </div>

          <div className="space-y-3 pt-2">
            {guide.actualWork.illustrativeDaySchedule.timeline.map((item, idx) => {
              const getCategoryBadge = () => {
                if (item.category === 'deep-work')
                  return (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-100 text-amber-900 border border-amber-300">
                      Focus Work
                    </span>
                  );
                if (item.category === 'collaboration')
                  return (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-100 text-emerald-900 border border-emerald-300">
                      Collaboration
                    </span>
                  );
                if (item.category === 'review')
                  return (
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-purple-100 text-purple-900 border border-purple-300">
                      Review / Quality
                    </span>
                  );
                return (
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]">
                    Break / Planning
                  </span>
                );
              };

              return (
                <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#D9C7B5]">
                  <div className="w-32 shrink-0 font-mono text-xs font-bold text-[#B9825B]">
                    {item.time}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex items-center gap-2">
                      {getCategoryBadge()}
                    </div>
                    <p className="text-xs text-[#4A3028] leading-relaxed pt-0.5">
                      {item.activity}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION C: SALARY IN INDIA
         ===================================================================== */}
      <section id="salary-india" className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-28">
        <div className="border-b border-[#D9C7B5] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B9825B] uppercase tracking-wider">
            <DollarSign className="w-4 h-4" />
            <span>Section C</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
            Indicative Salary in India & Compensation Realities
          </h3>
          <p className="text-sm text-[#806B5E] mt-1">
            Verified market ranges across experience levels, base pay vs total CTC, and clickable public salary sources.
          </p>
        </div>

        {/* Mandatory Transparency Disclaimer */}
        <div className="p-4 rounded-xl bg-[#E8D6C3]/40 border border-[#D9C7B5] space-y-2">
          <div className="flex items-center gap-2 text-xs font-bold text-[#4A3028]">
            <ShieldAlert className="w-4 h-4 text-[#B9825B]" />
            <span>Critical Compensation Notice & Public Data Disclaimer</span>
          </div>
          <p className="text-xs text-[#4A3028] leading-relaxed">
            {guide.salaryData.disclaimer}
          </p>
          <div className="pt-2 border-t border-[#D9C7B5] text-[11px] text-[#806B5E] leading-relaxed">
            <strong className="text-[#4A3028]">Base vs Total CTC Context: </strong>
            {guide.salaryData.compensationContext}
          </div>
        </div>

        {/* 3 Salary Tier Cards: Entry, Mid, Senior */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Entry Level */}
          <div className="p-5 rounded-2xl border-2 border-[#D9C7B5] bg-[#F8F3EB] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]">
                Level 1: Entry / Fresher
              </span>
              <h4 className="font-black text-lg text-[#4A3028] mt-2">
                {guide.salaryData.entryLevel.experienceLabel}
              </h4>

              <div className="mt-3 p-3 rounded-xl bg-white border border-[#D9C7B5]">
                <div className="text-2xl font-black text-[#B9825B]">
                  {guide.salaryData.entryLevel.indicativeRangeLpa}
                </div>
                <div className="text-xs text-[#806B5E] font-medium mt-0.5">
                  Est. In-Hand: <strong className="text-[#4A3028]">{guide.salaryData.entryLevel.monthlyEstimateInHand}</strong>
                </div>
              </div>

              <div className="mt-3 text-xs text-[#806B5E] space-y-2 leading-relaxed">
                <p>
                  <strong className="text-[#4A3028]">Market Profile: </strong>
                  {guide.salaryData.entryLevel.baseVsTotalBreakdown}
                </p>
                <p>
                  <strong className="text-[#4A3028]">Key Determinants: </strong>
                  {guide.salaryData.entryLevel.variationFactors}
                </p>
              </div>
            </div>
            <div className="text-[10px] text-[#806B5E] italic pt-2 border-t border-[#D9C7B5]">
              Figures derived from recent public fresher recruitment benchmarks.
            </div>
          </div>

          {/* Mid Level */}
          <div className="p-5 rounded-2xl border-2 border-[#B9825B] bg-white shadow-md flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#B9825B] text-white">
                Level 2: Experienced Mid-Tier
              </span>
              <h4 className="font-black text-lg text-[#4A3028] mt-2">
                {guide.salaryData.midLevel.experienceLabel}
              </h4>

              <div className="mt-3 p-3 rounded-xl bg-[#F8F3EB] border border-[#D9C7B5]">
                <div className="text-2xl font-black text-[#B9825B]">
                  {guide.salaryData.midLevel.indicativeRangeLpa}
                </div>
                <div className="text-xs text-[#806B5E] font-medium mt-0.5">
                  Est. In-Hand: <strong className="text-[#4A3028]">{guide.salaryData.midLevel.monthlyEstimateInHand}</strong>
                </div>
              </div>

              <div className="mt-3 text-xs text-[#806B5E] space-y-2 leading-relaxed">
                <p>
                  <strong className="text-[#4A3028]">Market Profile: </strong>
                  {guide.salaryData.midLevel.baseVsTotalBreakdown}
                </p>
                <p>
                  <strong className="text-[#4A3028]">Key Determinants: </strong>
                  {guide.salaryData.midLevel.variationFactors}
                </p>
              </div>
            </div>
            <div className="text-[10px] text-[#806B5E] italic pt-2 border-t border-[#D9C7B5]">
              High variance between service firms vs funded product startups.
            </div>
          </div>

          {/* Senior Level */}
          <div className="p-5 rounded-2xl border-2 border-[#D9C7B5] bg-[#F8F3EB] flex flex-col justify-between space-y-4">
            <div>
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#4A3028] text-white">
                Level 3: Senior / Lead
              </span>
              <h4 className="font-black text-lg text-[#4A3028] mt-2">
                {guide.salaryData.seniorLevel.experienceLabel}
              </h4>

              <div className="mt-3 p-3 rounded-xl bg-white border border-[#D9C7B5]">
                <div className="text-2xl font-black text-[#B9825B]">
                  {guide.salaryData.seniorLevel.indicativeRangeLpa}
                </div>
                <div className="text-xs text-[#806B5E] font-medium mt-0.5">
                  Est. In-Hand: <strong className="text-[#4A3028]">{guide.salaryData.seniorLevel.monthlyEstimateInHand}</strong>
                </div>
              </div>

              <div className="mt-3 text-xs text-[#806B5E] space-y-2 leading-relaxed">
                <p>
                  <strong className="text-[#4A3028]">Market Profile: </strong>
                  {guide.salaryData.seniorLevel.baseVsTotalBreakdown}
                </p>
                <p>
                  <strong className="text-[#4A3028]">Key Determinants: </strong>
                  {guide.salaryData.seniorLevel.variationFactors}
                </p>
              </div>
            </div>
            <div className="text-[10px] text-[#806B5E] italic pt-2 border-t border-[#D9C7B5]">
              May include significant equity / ESOPs in unicorn product companies.
            </div>
          </div>
        </div>

        {/* Public Verified Sources Links */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3 flex items-center gap-2">
            <ExternalLink className="w-4 h-4 text-[#B9825B]" />
            <span>Public Verified Salary Portals & Benchmarks (Clickable Sources)</span>
          </h4>
          <div className="space-y-2.5">
            {guide.salaryData.verifiedSources.map((src, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div className="space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-xs text-[#4A3028]">{src.sourceName}</span>
                    <span className="text-[10px] font-semibold text-[#806B5E] bg-white px-2 py-0.5 rounded border border-[#D9C7B5]">
                      Checked {src.lastCheckedDate}
                    </span>
                  </div>
                  <p className="text-xs text-[#806B5E]">
                    <strong className="text-[#4A3028]">Reported Benchmark: </strong>
                    {src.reportedAverageOrRange}
                  </p>
                  <p className="text-[11px] text-[#806B5E] italic">
                    {src.notes}
                  </p>
                </div>

                <a
                  href={src.verifiedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1.5 rounded-lg bg-white hover:bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5] text-xs font-bold transition-colors inline-flex items-center gap-1.5 shrink-0 self-start sm:self-center"
                >
                  <span>Open Public Portal</span>
                  <ExternalLink className="w-3.5 h-3.5 text-[#B9825B]" />
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Compensation Determinants */}
        <div className="p-4 rounded-xl bg-white border border-[#D9C7B5] space-y-2">
          <h5 className="font-bold text-xs uppercase tracking-wider text-[#4A3028]">
            What Explains the Wide Range in Salaries?
          </h5>
          <ul className="text-xs text-[#806B5E] space-y-1.5 list-disc pl-4 leading-relaxed">
            {guide.salaryData.compensationDeterminants.map((det, idx) => (
              <li key={idx}>{det}</li>
            ))}
          </ul>
        </div>
      </section>

      {/* =====================================================================
          SECTION D: SKILLS AND QUALIFICATIONS
         ===================================================================== */}
      <section id="skills" className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-28">
        <div className="border-b border-[#D9C7B5] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B9825B] uppercase tracking-wider">
            <Award className="w-4 h-4" />
            <span>Section D</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
            Skills, Qualifications & Free Tools
          </h3>
          <p className="text-sm text-[#806B5E] mt-1">
            Essential technical skills, educational pathways, non-traditional entry routes, and beginner tools.
          </p>
        </div>

        {/* Essential Technical Skills */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3">
            1. Essential Technical & Practical Skills
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {guide.skillsAndQualifications.essentialTechnicalSkills.map((sk, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] space-y-2">
                <div className="flex items-center justify-between">
                  <h5 className="font-bold text-sm text-[#4A3028]">{sk.name}</h5>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]">
                    Core Foundation
                  </span>
                </div>
                <p className="text-xs text-[#806B5E] leading-relaxed">{sk.whyEssential}</p>
                <div className="pt-2 border-t border-[#D9C7B5] flex flex-wrap gap-1">
                  {sk.keyConcepts.map((c) => (
                    <span
                      key={c}
                      className="text-[10px] font-semibold bg-white text-[#4A3028] px-2 py-0.5 rounded border border-[#D9C7B5]"
                    >
                      {c}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Useful Additional Skills & Teamwork */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] space-y-3">
            <h5 className="font-bold text-sm text-[#4A3028] flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#B9825B]" />
              <span>Useful Additional Superpowers</span>
            </h5>
            <div className="space-y-2">
              {guide.skillsAndQualifications.usefulAdditionalSkills.map((add, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#D9C7B5] text-xs">
                  <strong className="text-[#4A3028]">{add.name}: </strong>
                  <span className="text-[#806B5E]">{add.description}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] space-y-3">
            <h5 className="font-bold text-sm text-[#4A3028] flex items-center gap-2">
              <Users className="w-4 h-4 text-[#B9825B]" />
              <span>Communication & Collaboration Skills</span>
            </h5>
            <div className="space-y-2">
              {guide.skillsAndQualifications.communicationAndTeamwork.map((comm, idx) => (
                <div key={idx} className="p-2.5 rounded-lg bg-white border border-[#D9C7B5] text-xs">
                  <strong className="text-[#4A3028]">{comm.skill}: </strong>
                  <span className="text-[#806B5E]">{comm.howUsed}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Educational Backgrounds & Alternative Entry */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          <div>
            <h4 className="font-bold text-[#4A3028] text-sm mb-3">
              Common Educational Backgrounds
            </h4>
            <div className="space-y-2.5">
              {guide.skillsAndQualifications.educationalBackgrounds.map((edu, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB]">
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-xs text-[#4A3028]">{edu.background}</span>
                    <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-300">
                      {edu.viability}
                    </span>
                  </div>
                  <p className="text-xs text-[#806B5E] mt-1 leading-relaxed">{edu.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-bold text-[#4A3028] text-sm mb-3">
              Alternative & Self-Taught Entry Routes
            </h4>
            <div className="space-y-2.5">
              {guide.skillsAndQualifications.alternativeEntryRoutes.map((alt, idx) => (
                <div key={idx} className="p-3 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB]">
                  <span className="font-bold text-xs text-[#4A3028]">{alt.route}</span>
                  <p className="text-xs text-[#806B5E] mt-1 leading-relaxed">{alt.recommendations}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Beginner-Friendly Tools to Start Learning Today */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-[#B9825B]" />
            <span>Beginner-Friendly Tools to Start Learning (Zero Cost)</span>
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {guide.skillsAndQualifications.beginnerFriendlyTools.map((tool, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#4A3028]">{tool.name}</h5>
                  <span className="inline-block mt-1 text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded border border-emerald-200">
                    {tool.cost}
                  </span>
                </div>
                <p className="text-xs text-[#806B5E] mt-2 pt-2 border-t border-[#D9C7B5] leading-relaxed">
                  <strong className="text-[#4A3028]">First Action: </strong>
                  {tool.startAction}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION E: CAREER GROWTH & DUAL LADDER
         ===================================================================== */}
      <section id="growth" className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-28">
        <div className="border-b border-[#D9C7B5] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B9825B] uppercase tracking-wider">
            <TrendingUp className="w-4 h-4" />
            <span>Section E</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
            Realistic Career Growth & The Dual Ladder
          </h3>
          <p className="text-sm text-[#806B5E] mt-1">
            You do not have to become a people manager to reach high compensation and influence.
          </p>
        </div>

        {/* Dual Ladder Explanation */}
        <div className="p-4 rounded-xl bg-[#E8D6C3]/40 border border-[#D9C7B5] text-xs text-[#4A3028] leading-relaxed">
          <strong className="font-bold text-[#4A3028]">The Dual Ladder Philosophy: </strong>
          {guide.careerGrowth.dualLadderExplanation}
        </div>

        {/* Toggle between Individual Contributor vs Management */}
        <div className="flex items-center justify-center">
          <div className="inline-flex p-1 rounded-xl bg-[#F8F3EB] border border-[#D9C7B5]">
            <button
              onClick={() => setLadderMode('ic')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                ladderMode === 'ic'
                  ? 'bg-[#B9825B] text-white shadow-xs'
                  : 'text-[#806B5E] hover:text-[#4A3028]'
              }`}
            >
              <Code2 className="w-4 h-4" />
              <span>Technical Specialist / Individual Contributor (IC) Track</span>
            </button>
            <button
              onClick={() => setLadderMode('management')}
              className={`px-4 py-2 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-2 ${
                ladderMode === 'management'
                  ? 'bg-[#B9825B] text-white shadow-xs'
                  : 'text-[#806B5E] hover:text-[#4A3028]'
              }`}
            >
              <Users className="w-4 h-4" />
              <span>Engineering / Team Management Track</span>
            </button>
          </div>
        </div>

        {/* Selected Ladder Stages */}
        <div className="space-y-3">
          {(ladderMode === 'ic'
            ? guide.careerGrowth.individualContributorLadder
            : guide.careerGrowth.managementLadder
          ).map((stage, idx) => (
            <div key={idx} className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="w-6 h-6 rounded-lg bg-[#4A3028] text-white text-xs font-black flex items-center justify-center shrink-0">
                    {idx + 1}
                  </span>
                  <h5 className="font-bold text-sm text-[#4A3028]">{stage.level}</h5>
                  <span className="text-[11px] font-semibold text-[#806B5E] bg-white px-2 py-0.5 rounded border border-[#D9C7B5]">
                    {stage.yoe}
                  </span>
                </div>
                <p className="text-xs text-[#806B5E] pl-8">
                  <strong className="text-[#4A3028]">Scope of Ownership: </strong>
                  {stage.scope}
                </p>
                <p className="text-xs text-[#806B5E] pl-8 leading-relaxed">
                  <strong className="text-[#4A3028]">Daily Focus: </strong>
                  {stage.dailyFocus}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Lateral & Alternative Specialization Tracks */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3">
            Alternative & Lateral Specialization Pivots
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            {guide.careerGrowth.lateralOrSpecialistTracks.map((lat, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#4A3028]">{lat.trackName}</h5>
                  <p className="text-xs text-[#806B5E] mt-1.5 leading-relaxed">{lat.description}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-[#D9C7B5] text-[11px]">
                  <span className="font-bold text-[#B9825B]">Pivot Skill: </span>
                  <span className="text-[#4A3028]">{lat.requiredPivotSkill}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION F: WHERE THEY WORK
         ===================================================================== */}
      <section id="workplace" className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-28">
        <div className="border-b border-[#D9C7B5] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B9825B] uppercase tracking-wider">
            <Building2 className="w-4 h-4" />
            <span>Section F</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
            Where Professionals Work
          </h3>
          <p className="text-sm text-[#806B5E] mt-1">
            Industries, company environments, squad arrangements, and representative organization profiles.
          </p>
        </div>

        {/* Industries Grid */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3">
            Key Hiring Industries
          </h4>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {guide.workEnvironments.industries.map((ind, idx) => (
              <div key={idx} className="p-3.5 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] flex flex-col justify-between">
                <div>
                  <h5 className="font-bold text-xs text-[#4A3028] mb-1">{ind.industry}</h5>
                  <p className="text-[11px] text-[#806B5E] leading-relaxed">{ind.commonUseCases}</p>
                </div>
                <span className="mt-3 text-[10px] font-bold text-[#B9825B] bg-white px-2 py-0.5 rounded border border-[#D9C7B5] inline-block self-start">
                  {ind.hiringVolume}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Company Archetypes */}
        <div>
          <h4 className="font-bold text-[#4A3028] text-base mb-3">
            Company Archetypes & Work Cultures
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guide.workEnvironments.companyArchetypes.map((arch, idx) => (
              <div key={idx} className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB] space-y-3">
                <h5 className="font-bold text-xs text-[#4A3028] uppercase tracking-wider border-b border-[#D9C7B5] pb-2">
                  {arch.archetype}
                </h5>
                <div className="text-xs space-y-1.5 leading-relaxed">
                  <p>
                    <strong className="text-[#4A3028]">Culture: </strong>
                    <span className="text-[#806B5E]">{arch.environmentStyle}</span>
                  </p>
                  <p>
                    <strong className="text-[#4A3028]">Compensation: </strong>
                    <span className="text-[#806B5E]">{arch.compStyle}</span>
                  </p>
                  <p>
                    <strong className="text-[#4A3028]">What to Expect: </strong>
                    <span className="text-[#806B5E]">{arch.whatToExpect}</span>
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Squad Structure & Representative Employers */}
        <div className="p-4 rounded-xl bg-white border border-[#D9C7B5] space-y-3">
          <h5 className="font-bold text-xs uppercase tracking-wider text-[#4A3028]">
            Typical Cross-Functional Squad Setup
          </h5>
          <p className="text-xs text-[#806B5E] leading-relaxed">
            {guide.workEnvironments.typicalSquadStructure}
          </p>

          <div className="pt-3 border-t border-[#D9C7B5]">
            <div className="flex items-center justify-between mb-2">
              <span className="font-bold text-xs text-[#4A3028]">Representative Employer Examples</span>
              <span className="text-[10px] text-[#806B5E] italic">
                {guide.workEnvironments.employerExamplesNotice}
              </span>
            </div>
            <div className="flex flex-wrap gap-2">
              {guide.workEnvironments.employerExamples.map((emp, idx) => (
                <div key={idx} className="text-xs px-3 py-1.5 rounded-lg bg-[#F8F3EB] border border-[#D9C7B5] text-[#4A3028]">
                  <strong>{emp.name}</strong> <span className="text-[#806B5E]">({emp.sector})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION G: ADVANTAGES AND CHALLENGES
         ===================================================================== */}
      <section id="pros-cons" className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-28">
        <div className="border-b border-[#D9C7B5] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B9825B] uppercase tracking-wider">
            <ShieldAlert className="w-4 h-4" />
            <span>Section G</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
            Advantages, Difficulties & Candid Self-Assessment
          </h3>
          <p className="text-sm text-[#806B5E] mt-1">
            An honest look at the fulfilling perks, real pressures, and questions to ask yourself before choosing.
          </p>
        </div>

        {/* Realistic Advantages vs Difficulties */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Key Advantages */}
          <div className="p-5 rounded-2xl border-2 border-emerald-300 bg-emerald-50/50 space-y-4">
            <h4 className="font-black text-emerald-950 text-base flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-700" />
              <span>Genuine Workplace Advantages</span>
            </h4>
            <div className="space-y-3">
              {guide.advantagesAndChallenges.keyAdvantages.map((adv, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-emerald-200">
                  <h5 className="font-bold text-xs text-emerald-950">{adv.title}</h5>
                  <p className="text-xs text-emerald-900/80 mt-1 leading-relaxed">
                    {adv.explanation}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Common Difficulties & Coping */}
          <div className="p-5 rounded-2xl border-2 border-amber-300 bg-amber-50/50 space-y-4">
            <h4 className="font-black text-amber-950 text-base flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-700" />
              <span>Common Difficulties & How to Cope</span>
            </h4>
            <div className="space-y-3">
              {guide.advantagesAndChallenges.realChallenges.map((chal, idx) => (
                <div key={idx} className="p-3 rounded-xl bg-white border border-amber-200 space-y-1.5">
                  <h5 className="font-bold text-xs text-amber-950">{chal.title}</h5>
                  <p className="text-xs text-amber-900/80 leading-relaxed">
                    <strong className="text-amber-950">The Difficulty: </strong>
                    {chal.challenge}
                  </p>
                  <p className="text-[11px] text-[#4A3028] bg-amber-100/60 p-2 rounded-lg border border-amber-200">
                    <strong className="text-amber-950">How to Cope: </strong>
                    {chal.howToCope}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Candid Self-Assessment Quiz */}
        <div className="p-5 rounded-xl bg-[#F8F3EB] border border-[#D9C7B5] space-y-3">
          <h4 className="font-bold text-[#4A3028] text-sm flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-[#B9825B]" />
            <span>Candid Self-Assessment: Is This Career Right for You?</span>
          </h4>
          <p className="text-xs text-[#806B5E]">
            Reflect honestly on these 4 questions. If you find yourself nodding "yes" to most, you will likely thrive in this role:
          </p>
          <div className="space-y-2 pt-1">
            {guide.advantagesAndChallenges.candidSelfAssessmentQuestions.map((q, idx) => (
              <div key={idx} className="flex items-start gap-3 p-3 rounded-xl bg-white border border-[#D9C7B5]">
                <div className="w-5 h-5 rounded-full bg-[#E8D6C3] text-[#4A3028] text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
                  ?
                </div>
                <span className="text-xs font-semibold text-[#4A3028] leading-relaxed">{q}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          SECTION H: HOW TO ENTER THE CAREER
         ===================================================================== */}
      <section id="how-to-enter" className="bg-white rounded-2xl border border-[#D9C7B5] p-6 sm:p-8 shadow-xs space-y-6 scroll-mt-28">
        <div className="border-b border-[#D9C7B5] pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-[#B9825B] uppercase tracking-wider">
            <Compass className="w-4 h-4" />
            <span>Section H</span>
          </div>
          <h3 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
            How to Enter the Career: Step-by-Step Sequence
          </h3>
          <p className="text-sm text-[#806B5E] mt-1">
            A practical sequential roadmap from learning fundamentals to building proof-of-work and conquering interviews.
          </p>
        </div>

        {/* 5-Phase Roadmap Steps */}
        <div className="space-y-4">
          {guide.howToEnter.roadmapSteps.map((step) => (
            <div key={step.stepNumber} className="p-5 rounded-2xl border border-[#D9C7B5] bg-[#F8F3EB] space-y-3">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[#D9C7B5] pb-2">
                <div className="flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded-xl bg-[#B9825B] text-white font-black text-sm flex items-center justify-center shrink-0">
                    {step.stepNumber}
                  </span>
                  <h4 className="font-bold text-sm text-[#4A3028]">{step.title}</h4>
                </div>
                <span className="text-xs font-semibold text-[#806B5E] bg-white px-2.5 py-1 rounded-lg border border-[#D9C7B5] self-start sm:self-auto">
                  {step.estimatedDuration}
                </span>
              </div>

              {/* Action Checklist */}
              <div className="space-y-1.5 pt-1">
                {step.actionChecklist.map((act, i) => (
                  <div key={i} className="flex items-start gap-2 text-xs text-[#4A3028]">
                    <Check className="w-4 h-4 text-[#B9825B] shrink-0 mt-0.5" />
                    <span>{act}</span>
                  </div>
                ))}
              </div>

              {/* Portfolio Highlight & Pitfall */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
                <div className="p-3 rounded-xl bg-white border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-900 block mb-0.5">
                    Portfolio Deliverable:
                  </span>
                  <span className="text-emerald-950/80">{step.portfolioHighlight}</span>
                </div>
                <div className="p-3 rounded-xl bg-white border border-rose-200 text-xs">
                  <span className="font-bold text-rose-900 block mb-0.5">
                    Common Pitfall to Avoid:
                  </span>
                  <span className="text-rose-950/80">{step.pitfallToAvoid}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Interview Preparation Rounds Breakdown */}
        <div className="p-5 rounded-xl bg-[#F8F3EB] border border-[#D9C7B5] space-y-4">
          <h4 className="font-bold text-[#4A3028] text-sm flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B9825B]" />
            <span>Interview Preparation: Typical Interview Stages</span>
          </h4>
          <div className="space-y-2.5">
            {guide.howToEnter.interviewPreparation.interviewStages.map((stage, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-white border border-[#D9C7B5] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-xs text-[#4A3028]">{stage.stage}</span>
                </div>
                <p className="text-xs text-[#806B5E]">
                  <strong className="text-[#4A3028]">Focus: </strong>
                  {stage.focus}
                </p>
                <p className="text-xs text-[#806B5E] pt-1 leading-relaxed">
                  <strong className="text-[#B9825B]">Pro Preparation Tip: </strong>
                  {stage.preparationAdvice}
                </p>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-xl bg-white border border-[#D9C7B5] space-y-1.5">
            <span className="font-bold text-xs text-[#4A3028]">Golden Resume & Portfolio Rules:</span>
            <ul className="text-xs text-[#806B5E] space-y-1 list-disc pl-4 leading-relaxed">
              {guide.howToEnter.interviewPreparation.portfolioOrResumeAdvice.map((rule, idx) => (
                <li key={idx}>{rule}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* Sticky Bottom Call-to-Action Bar */}
      <div className="sticky bottom-4 z-40 bg-white/95 backdrop-blur-md rounded-2xl border-2 border-[#B9825B] p-4 sm:p-5 shadow-2xl flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-center sm:text-left">
          <h4 className="font-extrabold text-[#4A3028] text-sm sm:text-base">
            Ready to experience what a {guide.shortTitle} actually does?
          </h4>
          <p className="text-xs text-[#806B5E] mt-0.5">
            Try our 4-level hands-on simulator with real SQL, code, or design challenges and get instant AI feedback.
          </p>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <button
            onClick={onCompareCareers}
            className="flex-1 sm:flex-initial px-4 py-2.5 rounded-xl text-xs font-bold bg-[#E8D6C3] hover:bg-[#D9C7B5] text-[#4A3028] transition-colors cursor-pointer flex items-center justify-center gap-1.5"
          >
            <GitCompare className="w-4 h-4 text-[#B9825B]" />
            <span>Compare Roles</span>
          </button>

          <button
            onClick={() => onExploreCareerTryout(careerId)}
            className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl text-xs font-bold bg-[#B9825B] hover:bg-[#A06D48] text-white shadow-md shadow-[#B9825B]/20 transition-all cursor-pointer flex items-center justify-center gap-2 group"
          >
            <span>{hasCompletedTryout ? 'Retake Tryout Studio' : 'Explore This Career (Tryout)'}</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>
    </div>
  );
};
