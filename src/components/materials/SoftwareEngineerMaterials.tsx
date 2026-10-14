import React, { useState, useEffect, useRef } from 'react';
import {
  DifficultyLevel,
  ProgrammingLanguage,
  CodeExecutionResult,
  TestCaseResult,
} from '../../types';
import { SWE_LEVELS, SWE_MANAGER_UPDATE } from '../../data/sweTaskData';
import {
  Play,
  RotateCcw,
  Trash2,
  Send,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  HelpCircle,
  Terminal,
  Code2,
  Clock,
  Sparkles,
  Info,
  ChevronDown,
  ChevronUp,
  MessageSquare,
  ShieldCheck,
  Check,
  FileCode,
  Layers,
  Flame,
} from 'lucide-react';

interface SoftwareEngineerMaterialsProps {
  onDirectSubmit?: (payload: {
    code: string;
    language: ProgrammingLanguage;
    level: DifficultyLevel;
    explanation: string;
    executionResults: CodeExecutionResult | null;
    managerRequirementMet: boolean;
  }) => Promise<void>;
  isLoadingEvaluation?: boolean;
}

export const SoftwareEngineerMaterials: React.FC<SoftwareEngineerMaterialsProps> = ({
  onDirectSubmit,
  isLoadingEvaluation = false,
}) => {
  const [level, setLevel] = useState<DifficultyLevel>('easy');
  const [language, setLanguage] = useState<ProgrammingLanguage>('javascript');

  // Maintain code per level + language
  const [codeMap, setCodeMap] = useState<Record<string, string>>(() => {
    const initial: Record<string, string> = {};
    (Object.keys(SWE_LEVELS) as DifficultyLevel[]).forEach((lvl) => {
      (['javascript', 'python', 'java', 'cpp'] as ProgrammingLanguage[]).forEach((lang) => {
        initial[`${lvl}-${lang}`] = SWE_LEVELS[lvl].starterCodes[lang];
      });
    });
    return initial;
  });

  const currentLevelConfig = SWE_LEVELS[level];
  const currentKey = `${level}-${language}`;
  const currentCode = codeMap[currentKey] || currentLevelConfig.starterCodes[language];

  // Output states
  const [activeOutputTab, setActiveOutputTab] = useState<'tests' | 'stdout' | 'compile' | 'stderr'>('tests');
  const [executionResult, setExecutionResult] = useState<CodeExecutionResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [showEngineInfo, setShowEngineInfo] = useState<boolean>(false);

  // Hints & Manager Update States
  const [expandedHint, setExpandedHint] = useState<number | null>(null);
  const [showManagerUpdate, setShowManagerUpdate] = useState<boolean>(true);
  const [showNoviceGuide, setShowNoviceGuide] = useState<boolean>(false);

  // Language switch confirmation modal state
  const [pendingLanguage, setPendingLanguage] = useState<ProgrammingLanguage | null>(null);

  // Student written explanation
  const [studentExplanation, setStudentExplanation] = useState<string>('');
  const [validationError, setValidationError] = useState<string | null>(null);

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Current file extension
  const getFilename = () => {
    switch (language) {
      case 'javascript':
        return 'grantCalculator.js';
      case 'python':
        return 'grant_calculator.py';
      case 'java':
        return 'GrantCalculator.java';
      case 'cpp':
        return 'grant_calculator.cpp';
    }
  };

  // Run code against local test runner / server
  const handleRunCode = async () => {
    setIsExecuting(true);
    try {
      const response = await fetch('/api/execute-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          code: currentCode,
          language,
          level,
          testCases: currentLevelConfig.testCases,
        }),
      });

      if (!response.ok) {
        throw new Error(`Execution error: ${response.statusText}`);
      }

      const data: CodeExecutionResult = await response.json();
      setExecutionResult(data);

      if (data.compileErrors) {
        setActiveOutputTab('compile');
      } else if (data.stderr && !data.allPassed) {
        setActiveOutputTab('stderr');
      } else {
        setActiveOutputTab('tests');
      }
    } catch (err: any) {
      // Client-side fallback runner for JavaScript
      if (language === 'javascript') {
        runClientJsEvaluation();
      } else {
        setExecutionResult({
          success: false,
          stdout: '',
          stderr: 'Network request to runner failed. Running in demo mode.',
          compileErrors: '',
          testResults: currentLevelConfig.testCases.map((tc) => ({
            id: tc.id,
            name: tc.name,
            passed: false,
            expected: tc.expected,
            actual: 'Unavailable',
            input: tc.input,
            errorMessage: 'Unable to reach backend execution worker.',
          })),
          allPassed: false,
          isDemo: true,
          provider: 'Local Client Fallback',
          timestamp: new Date().toLocaleTimeString(),
        });
      }
    } finally {
      setIsExecuting(false);
    }
  };

  // Safe client-side JS evaluation fallback
  const runClientJsEvaluation = () => {
    const testResults: TestCaseResult[] = [];
    let stdout = '';
    let compileErrors = '';
    let hasError = false;

    try {
      const mockConsole = {
        log: (...args: any[]) => {
          stdout += args.map((a) => (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') + '\n';
        },
      };

      let fnName = '';
      if (level === 'beginner') {
        fnName = 'calculateLoanEMI';
      } else if (level === 'easy') {
        fnName = 'isApplicationPalindrome';
      } else if (level === 'intermediate') {
        fnName = 'checkLoanEligibility';
      } else {
        fnName = 'calculateEmergencyGrant';
      }

      // Check if function exists
      const fn = new Function('console', `${currentCode}\nreturn typeof ${fnName} !== 'undefined' ? ${fnName} : null;`)(mockConsole);

      if (typeof fn !== 'function') {
        compileErrors = `Expected global function "${fnName}" not found. Please ensure the main function is defined.`;
      } else {
        currentLevelConfig.testCases.forEach((tc) => {
          try {
            let actual: any;
            if (level === 'beginner') {
              actual = fn(tc.input.principal, tc.input.annualRate, tc.input.years);
            } else if (level === 'easy') {
              actual = fn(tc.input.refString);
            } else {
              actual = fn(JSON.parse(JSON.stringify(tc.input)));
            }

            let passed = false;
            if (typeof tc.expected === 'boolean') {
              passed = Boolean(actual) === tc.expected;
            } else if (typeof tc.expected === 'number') {
              passed = Math.abs(Number(actual) - Number(tc.expected)) < 0.05;
            } else {
              passed = String(actual) === String(tc.expected);
            }

            testResults.push({
              id: tc.id,
              name: tc.name,
              passed,
              expected: tc.expected,
              actual,
              input: tc.input,
              isEdgeCase: tc.isEdgeCase,
              isManagerRequirement: tc.isManagerRequirement,
              errorMessage: passed ? undefined : `Expected ${JSON.stringify(tc.expected)}, but got ${JSON.stringify(actual)}`,
            });
          } catch (e: any) {
            hasError = true;
            testResults.push({
              id: tc.id,
              name: tc.name,
              passed: false,
              expected: tc.expected,
              actual: 'Error',
              input: tc.input,
              errorMessage: e.message || String(e),
            });
          }
        });
      }
    } catch (e: any) {
      compileErrors = e.message || String(e);
      hasError = true;
    }

    const allPassed = testResults.length > 0 && testResults.every((t) => t.passed);
    setExecutionResult({
      success: !hasError && allPassed,
      stdout,
      stderr: '',
      compileErrors,
      testResults,
      allPassed,
      isDemo: true,
      provider: 'Client-Side JavaScript Engine',
      timestamp: new Date().toLocaleTimeString(),
    });
  };

  // Run automatically when level or language changes
  useEffect(() => {
    handleRunCode();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [level, language]);

  // Code modification handler
  const handleCodeChange = (newCode: string) => {
    setCodeMap((prev) => ({
      ...prev,
      [currentKey]: newCode,
    }));
  };

  // Handle Tab key in code editor
  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const target = e.currentTarget;
      const start = target.selectionStart;
      const end = target.selectionEnd;
      const val = target.value;
      const updated = val.substring(0, start) + '  ' + val.substring(end);
      handleCodeChange(updated);
      setTimeout(() => {
        target.selectionStart = target.selectionEnd = start + 2;
      }, 0);
    }
  };

  // Handle Language Selection with safe confirmation
  const handleSelectLanguage = (newLang: ProgrammingLanguage) => {
    if (newLang === language) return;

    const isStarter =
      currentCode.trim() === currentLevelConfig.starterCodes[language].trim();

    if (!isStarter) {
      setPendingLanguage(newLang);
    } else {
      setLanguage(newLang);
    }
  };

  const confirmLanguageSwitch = () => {
    if (pendingLanguage) {
      setLanguage(pendingLanguage);
      setPendingLanguage(null);
    }
  };

  // Reset to starter code
  const handleResetCode = () => {
    const starter = currentLevelConfig.starterCodes[language];
    handleCodeChange(starter);
  };

  // Clear execution output
  const handleClearOutput = () => {
    setExecutionResult(null);
  };

  // Check if student met the manager requirement
  const checkManagerRequirementMet = (): boolean => {
    if (currentCode.includes('medicalHardship') || currentCode.includes('medical_hardship')) {
      return true;
    }
    return false;
  };

  // Submit entire solution with code, test results, and student explanation
  const handleSubmit = async () => {
    if (!studentExplanation || studentExplanation.trim().length < 20) {
      setValidationError(
        'Please write a technical diagnosis (at least 20 characters) explaining what bug you fixed.'
      );
      return;
    }

    setValidationError(null);

    if (onDirectSubmit) {
      await onDirectSubmit({
        code: currentCode,
        language,
        level,
        explanation: studentExplanation,
        executionResults: executionResult,
        managerRequirementMet: checkManagerRequirementMet(),
      });
    }
  };

  const handleLoadSampleExplanation = () => {
    if (level === 'beginner') {
      setStudentExplanation(
        `I diagnosed the loan EMI calculation bugs: 1) The annual interest rate was not converted to a monthly rate by dividing by 12 and 100, which inflated repayments massively. 2) Zero percent promotional loans caused a division by zero producing NaN; I added a special branch returning principal / months. 3) Added defensive guards returning 0.0 for non-positive principals, non-positive years, or negative rates, and rounded the result to 2 decimal places.`
      );
    } else if (level === 'easy') {
      setStudentExplanation(
        `I updated the palindrome checker utility: 1) Converted the input string to lowercase and removed all non-alphanumeric characters and whitespace to support mixed-case phrases like "Ref 8448 fer". 2) Verified that single-character vouchers and empty strings correctly return true as identity palindromes. 3) Ensured strings with mismatched characters safely evaluate to false without throwing errors.`
      );
    } else if (level === 'intermediate') {
      setStudentExplanation(
        `I implemented the institutional loan eligibility policy: 1) Enforced the minimum annual income requirement of $15,000 using inclusive comparison (>= 15000). 2) Calculated monthly income as annualIncome / 12, then verified that monthly debt / monthly income does not exceed the repaymentCapacityLimit (0.40). 3) Capped borrowing at 50% of annual income. 4) Added guards returning 0 for negative income, negative debt, or non-positive loan amounts.`
      );
    } else {
      setStudentExplanation(
        `I resolved interacting defects in the emergency assistance engine: 1) Handled string type coercion by parsing student.dependentAllowance to prevent "500" + "250" becoming "500250". 2) Closed the boundary gap at $20,000 using inclusive inequality. 3) Integrated Marcus Chen's urgent policy amendment adding a $300 supplement for student.medicalHardship. 4) Clamped the final output between $500 minimum floor and $2,500 maximum ceiling.`
      );
    }
    setValidationError(null);
  };

  const testResults = executionResult?.testResults || [];
  const passedTestsCount = testResults.filter((t) => t.passed).length;
  const totalTestsCount = testResults.length;
  const codeLines = currentCode.split('\n');

  return (
    <div className="space-y-6 text-[#4A3028]">
      {/* 4 Difficulty Levels Selector Bar */}
      <div className="bg-white rounded-xl border border-[#D9C7B5] p-4 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D9C7B5]">
          <div>
            <span className="text-xs font-bold text-[#806B5E] uppercase tracking-wider">
              Select Practical Tryout Level
            </span>
            <p className="text-xs text-[#806B5E] mt-0.5">
              Change difficulty levels freely without losing written code.
            </p>
          </div>
          <span className="text-xs bg-[#E8D6C3] text-[#4A3028] px-2.5 py-1 rounded-full font-semibold self-start sm:self-auto">
            4 Selectable Levels
          </span>
        </div>

        {/* 4 Level Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-2.5 mt-3">
          {(['beginner', 'easy', 'intermediate', 'advanced'] as DifficultyLevel[]).map((lvl) => {
            const cfg = SWE_LEVELS[lvl];
            const isActive = level === lvl;
            return (
              <button
                key={lvl}
                onClick={() => setLevel(lvl)}
                className={`p-3 rounded-xl border text-left transition-all cursor-pointer ${
                  isActive
                    ? 'border-[#B9825B] bg-[#E8D6C3]/40 ring-2 ring-[#B9825B]/40 shadow-xs'
                    : 'border-[#D9C7B5] bg-white hover:border-[#B9825B] hover:bg-[#F8F3EB]'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-full border bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]">
                    {cfg.label}
                  </span>
                  {isActive && <CheckCircle2 className="w-3.5 h-3.5 text-[#B9825B]" />}
                </div>
                <div className="font-bold text-xs text-[#4A3028] truncate">{cfg.title.split(':')[1] || cfg.title}</div>
                <div className="text-[10px] text-[#806B5E] mt-0.5">{cfg.estimatedTime}</div>
              </button>
            );
          })}
        </div>

        {/* Level Overview & Learning Objectives */}
        <div className="mt-4 pt-3 border-t border-[#D9C7B5] flex flex-col md:flex-row md:items-start justify-between gap-4 text-xs">
          <div className="space-y-1.5 flex-1">
            <h4 className="font-bold text-[#4A3028] text-sm">{currentLevelConfig.title}</h4>
            <p className="text-[#806B5E] leading-relaxed">{currentLevelConfig.summary}</p>
            {level === 'beginner' && (
              <div className="p-2.5 bg-[#FAF7F2] rounded-lg border border-[#D9C7B5] text-[11px] text-[#806B5E] flex items-center gap-2">
                <Info className="w-4 h-4 text-[#B9825B] shrink-0" />
                <span>
                  <strong>Educational Planning Simulator:</strong> This task illustrates software calculation logic and reducing-balance formula implementation for students. It does not constitute professional financial advice.
                </span>
              </div>
            )}
            <div className="pt-1 flex flex-wrap gap-1.5">
              <span className="font-bold text-[#806B5E] text-[11px]">Core Skills:</span>
              {currentLevelConfig.learningObjectives.map((obj, i) => (
                <span
                  key={i}
                  className="bg-[#F8F3EB] text-[#4A3028] px-2 py-0.5 rounded-md text-[10px] font-medium border border-[#D9C7B5]"
                >
                  {obj}
                </span>
              ))}
            </div>
          </div>

          <button
            onClick={() => setShowNoviceGuide(!showNoviceGuide)}
            className="text-xs font-semibold text-[#B9825B] hover:text-[#A06D48] flex items-center gap-1 shrink-0 cursor-pointer self-start"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>{showNoviceGuide ? 'Hide Coding Guide' : 'Beginner Friendly Guide'}</span>
          </button>
        </div>

        {/* Novice Explanations Drawer */}
        {showNoviceGuide && (
          <div className="mt-3 p-4 bg-[#FAF7F2] rounded-xl border border-[#D9C7B5] text-xs text-[#806B5E] space-y-2">
            <span className="font-bold text-[#4A3028] block text-xs">
              💡 New to Programming? Plain-English Primer:
            </span>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-[11px] leading-relaxed">
              <div>
                <strong className="text-[#4A3028]">Parameters (`student`):</strong> The input package of information passed into the function (like annual income and dependent allowance).
              </div>
              <div>
                <strong className="text-[#4A3028]">Return Value (`return total`):</strong> The final number that the function sends back to the university aid portal.
              </div>
              <div>
                <strong className="text-[#4A3028]">Relational Operators (`&lt;=`):</strong> `&lt;` means strictly less than, while `&lt;=` includes the exact number (like $20,000).
              </div>
              <div>
                <strong className="text-[#4A3028]">Clamping (`Math.min` / `max`):</strong> A way to guarantee a number never exceeds an upper ceiling or drops below a minimum floor.
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simulated Teammate Manager Update Banner */}
      <div className="bg-[#4A3028] rounded-2xl p-4 sm:p-5 text-white shadow-md border border-[#35221C] relative overflow-hidden">
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-[#B9825B] text-white font-bold flex items-center justify-center text-sm shadow-inner">
                {SWE_MANAGER_UPDATE.avatarInitials}
              </div>
              <div className="w-3 h-3 rounded-full bg-emerald-400 border-2 border-[#4A3028] absolute -bottom-0.5 -right-0.5" />
            </div>

            <div>
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-bold text-sm text-white">{SWE_MANAGER_UPDATE.author}</span>
                <span className="text-[11px] text-[#E8D6C3] font-medium">({SWE_MANAGER_UPDATE.role})</span>
                <span className="text-[10px] bg-[#35221C] text-[#E8D6C3] px-2 py-0.5 rounded-full border border-[#D9C7B5]/30">
                  {SWE_MANAGER_UPDATE.timestamp}
                </span>
              </div>
              <h4 className="text-xs sm:text-sm font-bold text-amber-300 mt-1 flex items-center gap-1.5">
                <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0" />
                <span>{SWE_MANAGER_UPDATE.subject}</span>
              </h4>
              <p className="text-xs text-amber-100/90 mt-1 leading-relaxed">
                “{SWE_MANAGER_UPDATE.message}”
              </p>
              <div className="mt-2.5 inline-flex items-center gap-1.5 text-[11px] font-semibold bg-[#35221C] text-[#E8D6C3] px-2.5 py-1 rounded-lg border border-[#D9C7B5]/30">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Requirement: {SWE_MANAGER_UPDATE.newRequirement}</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setShowManagerUpdate(!showManagerUpdate)}
            className="text-xs text-[#E8D6C3] hover:text-white p-1 cursor-pointer"
          >
            {showManagerUpdate ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Main Coding Workspace */}
      <div className="bg-[#2D1B16] rounded-2xl border border-[#4A3028] shadow-2xl overflow-hidden">
        {/* Workspace Top Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 bg-[#241511] border-b border-[#3D251F]">
          {/* File & Language Selector */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5 text-xs font-mono text-amber-100/80">
              <FileCode className="w-4 h-4 text-[#B9825B]" />
              <span className="font-bold text-white">{getFilename()}</span>
            </div>

            <div className="h-4 w-px bg-[#3D251F] hidden sm:block" />

            <div className="flex items-center gap-1">
              <span className="text-[11px] text-[#D9C7B5] font-sans hidden sm:inline">Language:</span>
              <div className="flex items-center bg-[#1A0E0B] rounded-lg p-0.5 border border-[#3D251F]">
                {(['javascript', 'python', 'java', 'cpp'] as ProgrammingLanguage[]).map((lang) => {
                  const labels: Record<string, string> = {
                    javascript: 'JS',
                    python: 'Python',
                    java: 'Java',
                    cpp: 'C++',
                  };
                  const isSelected = language === lang;
                  return (
                    <button
                      key={lang}
                      onClick={() => handleSelectLanguage(lang)}
                      className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                        isSelected
                          ? 'bg-[#B9825B] text-white shadow-xs'
                          : 'text-[#D9C7B5] hover:text-white hover:bg-[#3D251F]/60'
                      }`}
                    >
                      {labels[lang]}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetCode}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#D9C7B5] hover:text-white bg-[#1A0E0B] hover:bg-[#3D251F] border border-[#3D251F] transition-colors flex items-center gap-1 cursor-pointer"
              title="Reset code to default starter template"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Reset Code</span>
            </button>

            <button
              onClick={handleClearOutput}
              className="px-2.5 py-1.5 rounded-lg text-xs font-semibold text-[#D9C7B5] hover:text-white bg-[#1A0E0B] hover:bg-[#3D251F] border border-[#3D251F] transition-colors flex items-center gap-1 cursor-pointer"
              title="Clear execution output"
            >
              <Trash2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Clear Console</span>
            </button>

            <button
              onClick={handleRunCode}
              disabled={isExecuting}
              className="px-4 py-1.5 rounded-lg text-xs font-bold text-white bg-[#B9825B] hover:bg-[#A06D48] shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
            >
              {isExecuting ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>Executing...</span>
                </>
              ) : (
                <>
                  <Play className="w-3.5 h-3.5 fill-current" />
                  <span>Run Code</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Editor Area with Line Numbers */}
        <div className="relative flex font-mono text-xs sm:text-sm bg-[#2D1B16] text-[#F8F3EB] min-h-[340px]">
          {/* Line Numbers Gutter */}
          <div className="select-none py-4 pl-3 pr-4 text-right text-[#806B5E] bg-[#241511] border-r border-[#3D251F] w-12 shrink-0 space-y-1">
            {codeLines.map((_, i) => (
              <div key={i} className="leading-6">
                {i + 1}
              </div>
            ))}
          </div>

          {/* Code Textarea */}
          <div className="flex-1 relative overflow-hidden">
            <textarea
              ref={textareaRef}
              value={currentCode}
              onChange={(e) => handleCodeChange(e.target.value)}
              onKeyDown={handleKeyDown}
              spellCheck={false}
              className="w-full h-full p-4 bg-transparent text-[#F8F3EB] font-mono text-xs sm:text-sm leading-6 resize-none outline-none focus:ring-0 whitespace-pre overflow-x-auto"
              style={{ minHeight: `${Math.max(340, codeLines.length * 24 + 40)}px` }}
            />
          </div>
        </div>

        {/* Output & Test Runner Partition */}
        <div className="border-t border-[#3D251F] bg-[#241511]">
          {/* Output Tabs Header */}
          <div className="flex flex-wrap items-center justify-between px-4 py-2 bg-[#1E110E] border-b border-[#3D251F] gap-2">
            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setActiveOutputTab('tests')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeOutputTab === 'tests'
                    ? 'bg-[#B9825B] text-white font-bold'
                    : 'text-[#D9C7B5] hover:text-white'
                }`}
              >
                <Terminal className="w-3.5 h-3.5" />
                <span>Test Cases</span>
                {totalTestsCount > 0 && (
                  <span
                    className={`text-[10px] px-1.5 py-0.2 rounded-full font-bold ${
                      passedTestsCount === totalTestsCount
                        ? 'bg-emerald-500/20 text-emerald-300'
                        : 'bg-rose-500/20 text-rose-300'
                    }`}
                  >
                    {passedTestsCount}/{totalTestsCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveOutputTab('stdout')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeOutputTab === 'stdout'
                    ? 'bg-[#B9825B] text-white font-bold'
                    : 'text-[#D9C7B5] hover:text-white'
                }`}
              >
                <span>Output (stdout)</span>
              </button>

              <button
                onClick={() => setActiveOutputTab('compile')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeOutputTab === 'compile'
                    ? 'bg-[#B9825B] text-white font-bold'
                    : 'text-[#D9C7B5] hover:text-white'
                }`}
              >
                <span>Compilation</span>
                {executionResult?.compileErrors && (
                  <span className="w-2 h-2 rounded-full bg-rose-500 animate-pulse" />
                )}
              </button>

              <button
                onClick={() => setActiveOutputTab('stderr')}
                className={`px-3 py-1 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors cursor-pointer ${
                  activeOutputTab === 'stderr'
                    ? 'bg-[#B9825B] text-white font-bold'
                    : 'text-[#D9C7B5] hover:text-white'
                }`}
              >
                <span>Runtime Errors</span>
                {executionResult?.stderr && (
                  <span className="w-2 h-2 rounded-full bg-amber-500" />
                )}
              </button>
            </div>

            {/* Sandbox Execution Provider Badge */}
            <div className="flex items-center gap-2">
              <div
                onClick={() => setShowEngineInfo(!showEngineInfo)}
                className="inline-flex items-center gap-1.5 text-[11px] font-mono text-[#D9C7B5] bg-[#1A0E0B] px-2 py-0.5 rounded-md border border-[#3D251F] cursor-pointer hover:border-[#B9825B]"
                title="Click to view sandboxed execution details"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400" />
                <span>
                  {executionResult?.isDemo
                    ? '[Execution: Sandboxed Node VM]'
                    : '[Execution: Active Runner]'}
                </span>
                <Info className="w-3 h-3 text-[#D9C7B5]" />
              </div>
            </div>
          </div>

          {/* Engine Info Dropdown */}
          {showEngineInfo && (
            <div className="p-3 bg-[#1A0E0B] border-b border-[#3D251F] text-[11px] text-[#D9C7B5] leading-relaxed flex items-start gap-2">
              <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <div>
                <strong className="text-white">Execution Security:</strong> Arbitrary submitted code is strictly isolated inside Node.js vm with timeout boundaries and zero server host access.
              </div>
            </div>
          )}

          {/* Tab 1: Test Cases Results */}
          {activeOutputTab === 'tests' && (
            <div className="p-4 space-y-3 max-h-72 overflow-y-auto font-sans text-xs">
              {testResults.length === 0 ? (
                <div className="text-[#806B5E] text-center py-6">
                  Click <strong className="text-[#D9C7B5]">Run Code</strong> to execute your solution against the test suite.
                </div>
              ) : (
                testResults.map((tc) => (
                  <div
                    key={tc.id}
                    className={`p-3 rounded-xl border flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                      tc.passed
                        ? 'bg-emerald-950/40 border-emerald-800/60 text-[#F8F3EB]'
                        : 'bg-rose-950/40 border-rose-800/60 text-[#F8F3EB]'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        {tc.passed ? (
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                        ) : (
                          <XCircle className="w-4 h-4 text-rose-400 shrink-0" />
                        )}
                        <span className="font-bold text-white text-xs">{tc.name}</span>
                        {tc.isEdgeCase && (
                          <span className="text-[10px] bg-amber-500/20 text-amber-300 px-1.5 py-0.5 rounded-sm font-semibold border border-amber-500/30">
                            Edge Case
                          </span>
                        )}
                        {tc.isManagerRequirement && (
                          <span className="text-[10px] bg-[#B9825B]/30 text-[#E8D6C3] px-1.5 py-0.5 rounded-full font-semibold border border-[#B9825B]/40">
                            Manager Update
                          </span>
                        )}
                      </div>
                      <div className="font-mono text-[11px] text-[#D9C7B5] pl-6">
                        Input: {JSON.stringify(tc.input)}
                      </div>
                      {tc.errorMessage && (
                        <div className="text-rose-300 text-[11px] pl-6 font-mono">
                          {tc.errorMessage}
                        </div>
                      )}
                    </div>

                    <div className="flex items-center gap-4 pl-6 sm:pl-0">
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-[#806B5E] block">Expected</span>
                        <span className="font-mono font-bold text-emerald-400">${tc.expected}</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] uppercase font-bold text-[#806B5E] block">Actual</span>
                        <span
                          className={`font-mono font-bold ${
                            tc.passed ? 'text-emerald-400' : 'text-rose-400'
                          }`}
                        >
                          {typeof tc.actual === 'number' ? `$${tc.actual}` : String(tc.actual)}
                        </span>
                      </div>
                      <div className="text-right text-[10px] text-[#806B5E] font-mono">
                        {tc.executionTimeMs}ms
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Tab 2: Standard Output (stdout) */}
          {activeOutputTab === 'stdout' && (
            <div className="p-4 font-mono text-xs text-[#F8F3EB] min-h-28 max-h-60 overflow-y-auto whitespace-pre-wrap">
              {executionResult?.stdout ? (
                executionResult.stdout
              ) : (
                <span className="text-[#806B5E] italic">No output logged to standard output. Use console.log / print to trace values.</span>
              )}
            </div>
          )}

          {/* Tab 3: Compilation Errors */}
          {activeOutputTab === 'compile' && (
            <div className="p-4 font-mono text-xs min-h-28 max-h-60 overflow-y-auto whitespace-pre-wrap">
              {executionResult?.compileErrors ? (
                <div className="text-rose-400 bg-rose-950/40 border border-rose-800 p-3 rounded-lg">
                  {executionResult.compileErrors}
                </div>
              ) : (
                <div className="text-emerald-400 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>No syntax or compilation errors found!</span>
                </div>
              )}
            </div>
          )}

          {/* Tab 4: Runtime Errors */}
          {activeOutputTab === 'stderr' && (
            <div className="p-4 font-mono text-xs min-h-28 max-h-60 overflow-y-auto whitespace-pre-wrap">
              {executionResult?.stderr ? (
                <div className="text-amber-400 bg-amber-950/40 border border-amber-800 p-3 rounded-lg">
                  {executionResult.stderr}
                </div>
              ) : (
                <span className="text-[#806B5E] italic">No runtime errors or unhandled exceptions thrown.</span>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Step-by-Step Progressive Hints Accordion */}
      <div className="bg-white rounded-xl border border-[#D9C7B5] p-5 shadow-xs space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#B9825B]" />
            <h4 className="font-bold text-sm text-[#4A3028]">
              Need a nudge? Progressive Step-by-Step Hints
            </h4>
          </div>
          <span className="text-xs text-[#806B5E] font-medium">Reveal one at a time</span>
        </div>

        <div className="space-y-2 mt-2">
          {currentLevelConfig.hints.map((hint, idx) => {
            const isRevealed = expandedHint === idx;
            return (
              <div
                key={idx}
                className="border border-[#D9C7B5] rounded-xl overflow-hidden text-xs"
              >
                <button
                  onClick={() => setExpandedHint(isRevealed ? null : idx)}
                  className="w-full px-4 py-2.5 bg-[#F8F3EB] hover:bg-[#E8D6C3]/40 flex items-center justify-between font-semibold text-[#4A3028] text-left transition-colors cursor-pointer"
                >
                  <span>Hint {idx + 1}</span>
                  {isRevealed ? <ChevronUp className="w-4 h-4 text-[#806B5E]" /> : <ChevronDown className="w-4 h-4 text-[#806B5E]" />}
                </button>
                {isRevealed && (
                  <div className="px-4 py-3 bg-white text-[#4A3028] leading-relaxed border-t border-[#D9C7B5]/60">
                    {hint}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Student Solution Justification & Submission Section */}
      <div className="bg-white rounded-xl border border-[#D9C7B5] p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D9C7B5]">
          <div>
            <h4 className="font-bold text-base text-[#4A3028]">
              Submit Your Solution for Gemini AI Evaluation
            </h4>
            <p className="text-xs text-[#806B5E] mt-0.5">
              Explain what bug you diagnosed and how your fix handles edge cases and the manager's hardship update.
            </p>
          </div>

          <button
            onClick={handleLoadSampleExplanation}
            className="px-3 py-1.5 bg-[#E8D6C3] hover:bg-[#D9C7B5] text-[#4A3028] text-xs font-bold rounded-lg border border-[#D9C7B5] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
            title="Load sample engineer explanation"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#B9825B]" />
            <span>Load Sample Explanation</span>
          </button>
        </div>

        <div>
          <label className="block text-xs font-bold text-[#4A3028] uppercase tracking-wider mb-1.5">
            Technical Diagnosis & Justification:
          </label>
          <textarea
            value={studentExplanation}
            onChange={(e) => {
              setStudentExplanation(e.target.value);
              if (e.target.value.trim().length >= 20 && validationError) {
                setValidationError(null);
              }
            }}
            rows={4}
            placeholder="Example: I identified an off-by-one boundary bug on line 14 where students earning exactly $20,000 received $0 bonus. I repaired the condition to '<= 20000', integrated Marcus's medical hardship update, and enforced the $2,500 ceiling..."
            className="w-full p-3 text-xs sm:text-sm rounded-xl border border-[#D9C7B5] focus:border-[#B9825B] focus:ring-2 focus:ring-[#B9825B]/20 outline-none font-sans bg-white"
          />
          <div className="flex items-center justify-between text-[11px] text-[#806B5E] mt-1">
            <span>{studentExplanation.trim().split(/\s+/).filter(Boolean).length} words</span>
            <span>All code and test results are packaged automatically</span>
          </div>
        </div>

        {validationError && (
          <div className="p-3 bg-rose-50 border border-rose-200 rounded-xl text-xs text-rose-800 flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0" />
            <span>{validationError}</span>
          </div>
        )}

        {/* Submit Action */}
        <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-[#806B5E] flex items-center gap-2">
            {passedTestsCount === totalTestsCount && totalTestsCount > 0 ? (
              <span className="text-emerald-700 font-bold flex items-center gap-1">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                All {totalTestsCount} test cases passing! Ready for review.
              </span>
            ) : (
              <span className="text-amber-800 font-medium flex items-center gap-1">
                <AlertTriangle className="w-4 h-4 text-amber-700" />
                {passedTestsCount}/{totalTestsCount} tests passing. You can still submit for feedback on incomplete code.
              </span>
            )}
          </div>

          <button
            onClick={handleSubmit}
            disabled={isLoadingEvaluation}
            className="w-full sm:w-auto px-6 py-3 bg-[#B9825B] hover:bg-[#A06D48] disabled:opacity-50 text-white font-bold text-sm rounded-xl shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            {isLoadingEvaluation ? (
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Evaluating Against Software Engineer Rubric...</span>
              </div>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Submit Solution for AI Evaluation</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Language Switch Confirmation Modal */}
      {pendingLanguage && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 space-y-4 shadow-2xl border border-[#D9C7B5]">
            <div className="flex items-center gap-3 text-[#4A3028] font-bold text-base">
              <div className="w-10 h-10 rounded-xl bg-[#E8D6C3] text-[#4A3028] flex items-center justify-center">
                <AlertTriangle className="w-5 h-5 text-[#B9825B]" />
              </div>
              <h3>Switch to {pendingLanguage.toUpperCase()}?</h3>
            </div>

            <p className="text-xs text-[#806B5E] leading-relaxed">
              You have modified the code in <strong className="text-[#4A3028]">{language.toUpperCase()}</strong>. Switching languages will load the starter template for <strong className="text-[#4A3028]">{pendingLanguage.toUpperCase()}</strong>.
            </p>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                onClick={() => setPendingLanguage(null)}
                className="px-4 py-2 rounded-xl text-xs font-semibold text-[#806B5E] hover:bg-[#F8F3EB] transition-colors cursor-pointer"
              >
                Keep Current Code
              </button>
              <button
                onClick={confirmLanguageSwitch}
                className="px-4 py-2 rounded-xl text-xs font-bold bg-[#B9825B] hover:bg-[#A06D48] text-white transition-colors cursor-pointer shadow-xs"
              >
                Switch Language
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
