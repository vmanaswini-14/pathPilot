import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Sparkles,
  Send,
  FileText,
  Database,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  RotateCcw,
  BookOpen,
  Code2,
  Smartphone,
  Eye,
} from 'lucide-react';
import { CAREER_LIST } from '../data/careers';
import { DATA_ANALYST_LEVELS } from '../data/dataAnalystTasks';
import { UX_DESIGNER_LEVELS } from '../data/uxDesignerTasks';
import { SWE_LEVELS } from '../data/sweTaskData';
import { CareerRole, StudentTryoutSession, DifficultyLevel } from '../types';
import { DataAnalystMaterials } from './materials/DataAnalystMaterials';
import { UxDesignerMaterials } from './materials/UxDesignerMaterials';
import { SoftwareEngineerMaterials } from './materials/SoftwareEngineerMaterials';

interface TaskViewProps {
  careerId: CareerRole;
  onBack: () => void;
  session: StudentTryoutSession;
  onSaveAnswer: (careerId: CareerRole, answer: string) => void;
  onSubmitForEvaluation: (
    careerId: CareerRole,
    answer: string,
    meta?: any
  ) => Promise<void>;
  isLoadingEvaluation: boolean;
  onViewEvaluation: () => void;
  onViewCareerInfo?: (careerId: CareerRole) => void;
}

export const TaskView: React.FC<TaskViewProps> = ({
  careerId,
  onBack,
  session,
  onSaveAnswer,
  onSubmitForEvaluation,
  isLoadingEvaluation,
  onViewEvaluation,
  onViewCareerInfo,
}) => {
  const career = CAREER_LIST.find((c) => c.id === careerId) || CAREER_LIST[0];
  const [activeTab, setActiveTab] = useState<'materials' | 'brief' | 'rubric'>('materials');

  // Direct submission handlers for each role
  const handleDataAnalystDirectSubmit = async (payload: {
    level: DifficultyLevel;
    sqlQuery: string;
    analysisMemo: string;
    sqlResult: any;
  }) => {
    const formatted = `CAREER TRYOUT: DATA ANALYST
DIFFICULTY LEVEL: ${payload.level.toUpperCase()}
TASK TITLE: ${DATA_ANALYST_LEVELS[payload.level].title}

EXECUTED SQL QUERY:
\`\`\`sql
${payload.sqlQuery}
\`\`\`

SQL QUERY EXECUTION SUMMARY:
Status: ${payload.sqlResult?.success ? 'SUCCESS' : 'FAILED'}
Rows Returned: ${payload.sqlResult?.rowCount ?? 0}
Execution Time: ${payload.sqlResult?.executionTimeMs ?? 0} ms

STUDENT ANALYST MEMO & RECOMMENDATION:
${payload.analysisMemo}`;

    onSaveAnswer(careerId, formatted);
    await onSubmitForEvaluation(careerId, formatted, {
      level: payload.level,
      sqlQuery: payload.sqlQuery,
      sqlResult: payload.sqlResult,
      analysisMemo: payload.analysisMemo,
    });
  };

  const handleUxDesignerDirectSubmit = async (payload: {
    level: DifficultyLevel;
    designProposal: string;
    identifiedFlaws: number[];
  }) => {
    const formatted = `CAREER TRYOUT: UX / PRODUCT DESIGNER
DIFFICULTY LEVEL: ${payload.level.toUpperCase()}
TASK TITLE: ${UX_DESIGNER_LEVELS[payload.level].title}
SCREEN AUDITED: ${UX_DESIGNER_LEVELS[payload.level].screenTitle}

INSPECTED USABILITY FLAW PINS:
Pins Audited: ${payload.identifiedFlaws.join(', ')}

STUDENT DESIGN PROPOSAL & HEURISTIC JUSTIFICATION:
${payload.designProposal}`;

    onSaveAnswer(careerId, formatted);
    await onSubmitForEvaluation(careerId, formatted, {
      level: payload.level,
      designProposal: payload.designProposal,
      identifiedFlaws: payload.identifiedFlaws,
    });
  };

  const handleSweDirectSubmit = async (payload: {
    code: string;
    language: any;
    level: any;
    explanation: string;
    executionResults: any;
    managerRequirementMet: boolean;
  }) => {
    const formatted = `CAREER TRYOUT: SOFTWARE ENGINEER
DIFFICULTY LEVEL: ${payload.level.toUpperCase()}
PROGRAMMING LANGUAGE: ${payload.language.toUpperCase()}
TASK TITLE: ${SWE_LEVELS[payload.level as DifficultyLevel].title}

TECHNICAL DIAGNOSIS & EXPLANATION:
${payload.explanation}

SUBMITTED CODE IMPLEMENTATION:
\`\`\`${payload.language}
${payload.code}
\`\`\`

TEST SUITE EXECUTION SUMMARY:
Tests Passed: ${payload.executionResults?.testResults?.filter((t: any) => t.passed).length || 0} / ${payload.executionResults?.testResults?.length || 0}
All Tests Passed: ${payload.executionResults?.allPassed ? 'YES' : 'NO'}
Compiler / Syntax Errors: ${payload.executionResults?.compileErrors || 'None'}
Manager Hardship Requirement Met: ${payload.managerRequirementMet ? 'YES' : 'NO'}`;

    onSaveAnswer(careerId, formatted);
    await onSubmitForEvaluation(careerId, formatted, {
      code: payload.code,
      language: payload.language,
      level: payload.level,
      executionResults: payload.executionResults,
      managerRequirementMet: payload.managerRequirementMet,
    });
  };

  const isCompleted = Boolean(session?.evaluation);

  return (
    <div className="space-y-6 pb-20 text-[#4A3028]">
      {/* Top Header & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#D9C7B5]">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="p-2 rounded-xl bg-white border border-[#D9C7B5] hover:bg-[#E8D6C3]/40 text-[#4A3028] transition-colors cursor-pointer"
            title="Back to Dashboard"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]">
                {career.title}
              </span>
              <span className="text-[#D9C7B5]">•</span>
              <span className="text-xs text-[#806B5E] font-medium flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B9825B]" /> {career.taskDuration}
              </span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
              {career.title} Practical Tryout Workspace
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {onViewCareerInfo && (
            <button
              onClick={() => onViewCareerInfo(careerId)}
              className="px-3 py-1.5 bg-white hover:bg-[#E8D6C3]/40 border border-[#D9C7B5] text-[#4A3028] text-xs font-bold rounded-xl transition-colors flex items-center gap-1.5 cursor-pointer shadow-xs"
              title={`Read full in-depth reality guide for ${career.shortTitle}`}
            >
              <BookOpen className="w-3.5 h-3.5 text-[#B9825B]" />
              <span>Reality Guide</span>
            </button>
          )}

          {isCompleted && (
            <button
              onClick={onViewEvaluation}
              className="px-4 py-2 bg-[#B9825B] hover:bg-[#A06D48] text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 cursor-pointer"
            >
              <CheckCircle2 className="w-4 h-4" />
              <span>View Your Evaluation ({session.evaluation?.overallScore}/100)</span>
            </button>
          )}
        </div>
      </div>

      {/* Main Workspace Navigation Pill Tabs */}
      <div className="flex items-center gap-2 bg-[#E8D6C3]/50 p-1 rounded-xl w-fit border border-[#D9C7B5]">
        <button
          onClick={() => setActiveTab('materials')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'materials'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'text-[#4A3028] hover:text-[#B9825B]'
          }`}
        >
          {careerId === 'data-analyst' && <Database className="w-3.5 h-3.5" />}
          {careerId === 'ux-designer' && <Smartphone className="w-3.5 h-3.5" />}
          {careerId === 'software-engineer' && <Code2 className="w-3.5 h-3.5" />}
          <span>Interactive Tryout Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('brief')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'brief'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'text-[#4A3028] hover:text-[#B9825B]'
          }`}
        >
          <FileText className="w-3.5 h-3.5" />
          <span>Role Overview & Expectations</span>
        </button>

        <button
          onClick={() => setActiveTab('rubric')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'rubric'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'text-[#4A3028] hover:text-[#B9825B]'
          }`}
        >
          <BookOpen className="w-3.5 h-3.5" />
          <span>Evidence-Based Rubric</span>
        </button>
      </div>

      {/* TAB 1: INTERACTIVE WORKSPACE PER CAREER */}
      {activeTab === 'materials' && (
        <div className="space-y-4">
          {careerId === 'data-analyst' && (
            <DataAnalystMaterials
              onDirectSubmit={handleDataAnalystDirectSubmit}
              isLoadingEvaluation={isLoadingEvaluation}
            />
          )}

          {careerId === 'ux-designer' && (
            <UxDesignerMaterials
              onDirectSubmit={handleUxDesignerDirectSubmit}
              isLoadingEvaluation={isLoadingEvaluation}
            />
          )}

          {careerId === 'software-engineer' && (
            <SoftwareEngineerMaterials
              onDirectSubmit={handleSweDirectSubmit}
              isLoadingEvaluation={isLoadingEvaluation}
            />
          )}
        </div>
      )}

      {/* TAB 2: ROLE BRIEF & CONTEXT */}
      {activeTab === 'brief' && (
        <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 space-y-4 shadow-xs text-[#4A3028]">
          <h3 className="font-bold text-base text-[#4A3028]">What a {career.title} Actually Does</h3>
          <p className="text-sm leading-relaxed text-[#806B5E]">{career.dayInTheLife}</p>

          <div className="bg-[#F8F3EB] border border-[#D9C7B5] rounded-xl p-4 mt-4">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#4A3028] mb-2">
              Key Competencies Practiced in This Tryout:
            </h4>
            <div className="flex flex-wrap gap-2">
              {career.keySkills.map((skill, idx) => (
                <span
                  key={idx}
                  className="bg-[#E8D6C3] text-[#4A3028] px-2.5 py-1 rounded-md text-xs font-medium border border-[#D9C7B5]"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>

          <div className="pt-3 border-t border-[#D9C7B5]">
            <h4 className="font-bold text-xs uppercase tracking-wider text-[#4A3028] mb-1">
              4 Distinct Progressive Levels Available:
            </h4>
            <p className="text-xs text-[#806B5E] leading-relaxed">
              In the Interactive Studio tab, use the level selector to switch between Beginner, Easy, Intermediate, and Advanced challenges. Each level loads unique scenarios, real datasets/code/mockups, and tailored rubrics.
            </p>
          </div>

          {onViewCareerInfo && (
            <div className="p-4 rounded-xl bg-[#E8D6C3]/40 border border-[#D9C7B5] flex flex-col sm:flex-row sm:items-center justify-between gap-3 mt-4">
              <div>
                <h4 className="font-bold text-sm text-[#4A3028] flex items-center gap-1.5">
                  <BookOpen className="w-4 h-4 text-[#B9825B]" />
                  <span>Looking for verified salary data & daily workplace realities?</span>
                </h4>
                <p className="text-xs text-[#806B5E] mt-0.5">
                  Read our full in-depth reality guide for {career.title}: indicative salaries in India (Entry, Mid, Senior), verified public sources, skills, and dual IC/management career ladders.
                </p>
              </div>
              <button
                onClick={() => onViewCareerInfo(careerId)}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#B9825B] hover:bg-[#A06D48] text-white shadow-xs transition-colors shrink-0 flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
              >
                <span>Read Full Reality Guide</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      )}

      {/* TAB 3: RUBRIC */}
      {activeTab === 'rubric' && (
        <div className="bg-white rounded-2xl border border-[#D9C7B5] p-6 shadow-xs space-y-4">
          <h3 className="font-bold text-base text-[#4A3028]">
            Evidence-Based AI Evaluation Rubric
          </h3>
          <p className="text-xs text-[#806B5E]">
            Our AI evaluation model analyzes your actual query outputs, code execution, or heuristic audit, quoting exact excerpts from your submission across 4 structured criteria:
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs mt-3">
            <div className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB]">
              <div className="flex justify-between font-bold text-[#4A3028] mb-1">
                <span>1. Problem Diagnosis & Evidence</span>
                <span className="text-[#B9825B]">25 pts</span>
              </div>
              <p className="text-[#806B5E] leading-relaxed">
                Did you identify the root operational causes, specific failure points, or boundary gaps with concrete evidence?
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB]">
              <div className="flex justify-between font-bold text-[#4A3028] mb-1">
                <span>2. Actionability & Feasibility</span>
                <span className="text-[#B9825B]">25 pts</span>
              </div>
              <p className="text-[#806B5E] leading-relaxed">
                Are your recommendations practical, grounded in reality, and realistic for a real organization or codebase?
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB]">
              <div className="flex justify-between font-bold text-[#4A3028] mb-1">
                <span>3. Role-Specific Thinking</span>
                <span className="text-[#B9825B]">25 pts</span>
              </div>
              <p className="text-[#806B5E] leading-relaxed">
                Did you exhibit genuine role intuition (e.g., student dignity for UX, defensive parsing for SWE, SQL aggregation for Data)?
              </p>
            </div>

            <div className="p-4 rounded-xl border border-[#D9C7B5] bg-[#F8F3EB]">
              <div className="flex justify-between font-bold text-[#4A3028] mb-1">
                <span>4. Communication Clarity</span>
                <span className="text-[#B9825B]">25 pts</span>
              </div>
              <p className="text-[#806B5E] leading-relaxed">
                Is your answer well-structured, scannable, and free of vague fluff or superficial claims?
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
