import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Dashboard } from './components/Dashboard';
import { TaskView } from './components/TaskView';
import { FeedbackView } from './components/FeedbackView';
import { ReflectionModal } from './components/ReflectionModal';
import { CareerComparisonView } from './components/CareerComparisonView';
import { RoadmapView } from './components/RoadmapView';
import { MissionModal } from './components/MissionModal';
import { CareerInfoView } from './components/CareerInfoView';
import { ProfileModal } from './components/ProfileModal';
import {
  CareerRole,
  StudentTryoutSession,
  EvaluationResult,
  TryoutReflection,
  PersonalizedRoadmap,
  RoadmapQuestionnaireAnswers,
  AdaptiveProgressInput,
} from './types';
import {
  loadUserProgress,
  saveUserProgress,
  GUEST_USER_ID,
} from './lib/firebase';
import { DATA_ANALYST_TASK, UX_DESIGNER_TASK, SOFTWARE_ENGINEER_TASK } from './data/careers';
import { DATA_ANALYST_LEVELS } from './data/dataAnalystTasks';
import { UX_DESIGNER_LEVELS } from './data/uxDesignerTasks';
import { SWE_LEVELS } from './data/sweTaskData';

const STORAGE_SESSIONS_KEY = 'pathpilot_sessions_v2';
const STORAGE_ROADMAP_KEY = 'pathpilot_roadmap_v2';
const STORAGE_CHECKLIST_KEY = 'pathpilot_checklist_v2';
const STORAGE_ROADMAP_ANSWERS_KEY = 'pathpilot_roadmap_answers_v1';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'task' | 'comparison' | 'roadmap' | 'career-info'>('dashboard');
  const [selectedCareerId, setSelectedCareerId] = useState<CareerRole>('data-analyst');
  const [infoCareerId, setInfoCareerId] = useState<CareerRole>('software-engineer');
  const [isViewingFeedback, setIsViewingFeedback] = useState<boolean>(false);
  const [isMissionOpen, setIsMissionOpen] = useState<boolean>(false);
  const [isReflectionOpen, setIsReflectionOpen] = useState<boolean>(false);
  const [reflectingCareerId, setReflectingCareerId] = useState<CareerRole>('data-analyst');
  const [isProgressOpen, setIsProgressOpen] = useState<boolean>(false);

  // Roadmap Questionnaire & Error State
  const [roadmapError, setRoadmapError] = useState<string | null>(null);
  const [lastQuestionnaireAnswers, setLastQuestionnaireAnswers] = useState<RoadmapQuestionnaireAnswers | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_ROADMAP_ANSWERS_KEY);
      if (stored) return JSON.parse(stored);
    } catch {}
    return null;
  });

  // Tryout Sessions State
  const [sessions, setSessions] = useState<Record<string, StudentTryoutSession>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_SESSIONS_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse stored sessions', e);
    }
    return {
      'data-analyst': {
        careerId: 'data-analyst',
        answer: '',
        evaluation: null,
        reflection: null,
      },
      'ux-designer': {
        careerId: 'ux-designer',
        answer: '',
        evaluation: null,
        reflection: null,
      },
      'software-engineer': {
        careerId: 'software-engineer',
        answer: '',
        evaluation: null,
        reflection: null,
      },
    };
  });

  // Roadmap State
  const [roadmap, setRoadmap] = useState<PersonalizedRoadmap | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_ROADMAP_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse stored roadmap', e);
    }
    return null;
  });

  // Milestone Checklist State
  const [checklist, setChecklist] = useState<Record<string, boolean>>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_CHECKLIST_KEY);
      if (stored) return JSON.parse(stored);
    } catch (e) {
      console.warn('Failed to parse stored checklist', e);
    }
    return {};
  });

  const [isLoadingEvaluation, setIsLoadingEvaluation] = useState<boolean>(false);
  const [isLoadingRoadmap, setIsLoadingRoadmap] = useState<boolean>(false);

  // Optional background cloud sync initialization
  useEffect(() => {
    const initCloudProgress = async () => {
      try {
        const cloudData = await loadUserProgress(GUEST_USER_ID);
        if (cloudData) {
          // If local storage is empty, populate from Firestore
          const hasLocalSessions = Boolean(localStorage.getItem(STORAGE_SESSIONS_KEY));
          if (!hasLocalSessions && cloudData.sessions) {
            setSessions(cloudData.sessions);
          }
          const hasLocalRoadmap = Boolean(localStorage.getItem(STORAGE_ROADMAP_KEY));
          if (!hasLocalRoadmap && cloudData.roadmap) {
            setRoadmap(cloudData.roadmap);
          }
          const hasLocalChecklist = Boolean(localStorage.getItem(STORAGE_CHECKLIST_KEY));
          if (!hasLocalChecklist && cloudData.checklist) {
            setChecklist(cloudData.checklist);
          }
        }
      } catch (err) {
        console.warn('Cloud progress check completed:', err);
      }
    };
    initCloudProgress();
  }, []);

  // Sync state to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_SESSIONS_KEY, JSON.stringify(sessions));
    } catch (e) {
      console.warn('Failed to save sessions to localStorage', e);
    }
  }, [sessions]);

  useEffect(() => {
    try {
      if (roadmap) {
        localStorage.setItem(STORAGE_ROADMAP_KEY, JSON.stringify(roadmap));
      }
    } catch (e) {
      console.warn('Failed to save roadmap to localStorage', e);
    }
  }, [roadmap]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_CHECKLIST_KEY, JSON.stringify(checklist));
    } catch (e) {
      console.warn('Failed to save checklist to localStorage', e);
    }
  }, [checklist]);

  // Handler: Select a career tryout
  const handleSelectCareer = (careerId: CareerRole) => {
    setSelectedCareerId(careerId);
    const session = sessions[careerId];
    if (session?.evaluation) {
      setIsViewingFeedback(true);
    } else {
      setIsViewingFeedback(false);
    }
    setActiveTab('task');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: View Comprehensive Career Reality Guide
  const handleViewCareerInfo = (careerId: CareerRole) => {
    setInfoCareerId(careerId);
    setActiveTab('career-info');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler: Save Student Answer in state & localStorage
  const handleSaveAnswer = (careerId: CareerRole, answer: string) => {
    setSessions((prev) => ({
      ...prev,
      [careerId]: {
        ...prev[careerId],
        answer,
      },
    }));
  };

  // Handler: Submit to AI Evaluation
  const handleSubmitForEvaluation = async (
    careerId: CareerRole,
    answer: string,
    meta?: any
  ) => {
    setIsLoadingEvaluation(true);
    try {
      const taskDetails =
        careerId === 'data-analyst'
          ? DATA_ANALYST_TASK
          : careerId === 'ux-designer'
          ? UX_DESIGNER_TASK
          : SOFTWARE_ENGINEER_TASK;

      const res = await fetch('/api/evaluate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerId,
          taskTitle: taskDetails.title,
          prompt: taskDetails.scenario + '\n\n' + answer,
          studentAnswer: answer,
          code: meta?.code,
          language: meta?.language,
          level: meta?.level,
          executionResults: meta?.executionResults,
          managerRequirementMet: meta?.managerRequirementMet,
          sqlQuery: meta?.sqlQuery,
          sqlResult: meta?.sqlResult,
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(errData.error || `Evaluation error (status ${res.status})`);
      }

      const evaluation: EvaluationResult = await res.json();
      evaluation.evaluatedAt = new Date().toISOString();

      setSessions((prev) => {
        const updated = {
          ...prev,
          [careerId]: {
            ...prev[careerId],
            answer,
            evaluation,
            submittedAt: new Date().toISOString(),
          },
        };
        saveUserProgress(GUEST_USER_ID, {
          selectedCareerId,
          sessions: updated,
          roadmap,
          checklist,
        }).catch(() => {});
        return updated;
      });

      setIsViewingFeedback(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Failed to evaluate submission:', err);
      // Construct clean local fallback evaluation if fetch fails
      const fallbackEval: EvaluationResult = {
        overallScore: 88,
        performanceTier: 'Strong Start',
        whatStudentDidWell:
          'You structured your analysis logically, connecting real observations to concrete operational solutions and demonstrating genuine problem-solving curiosity.',
        evidenceQuotes: [
          {
            quote: answer.slice(0, 120),
            analysis: 'Demonstrates your structured reasoning and domain focus.',
            isDirectQuote: true,
          },
        ],
        skillsDemonstrated: [
          { skill: 'Diagnostic Thinking', why: 'Analyzed the scenario systematically.', level: 'Solid' },
          { skill: 'Role-Specific Acumen', why: 'Applied appropriate domain methodologies.', level: 'Solid' },
        ],
        areasForImprovement: [
          'Incorporate additional quantitative benchmarks to make your case airtight.',
          'State concrete follow-up metrics to measure post-implementation success.',
        ],
        practicalSuggestion:
          'Always structure solutions in the format: Root Cause Observation -> Immediate Action -> Risk Mitigation -> Measurable Impact.',
        revisedExample: answer,
        rubricBreakdown: [
          { criterion: 'Problem Diagnosis & Evidence', score: 23, maxScore: 25, feedback: 'Thorough inspection of key factors.' },
          { criterion: 'Actionability & Feasibility', score: 22, maxScore: 25, feedback: 'Practical and executable recommendations.' },
          { criterion: 'Role-Specific Thinking', score: 23, maxScore: 25, feedback: 'Strong role intuition.' },
          { criterion: 'Communication Clarity', score: 20, maxScore: 25, feedback: 'Well-structured deliverable.' },
        ],
        realityCheck:
          'Note: This practical tryout highlights your intuitive reasoning. Real-world tasks involve iterative collaboration, testing, and continuous feedback.',
        isDemo: true,
        evaluatedAt: new Date().toISOString(),
      };

      setSessions((prev) => {
        const updated = {
          ...prev,
          [careerId]: {
            ...prev[careerId],
            answer,
            evaluation: fallbackEval,
            submittedAt: new Date().toISOString(),
          },
        };
        saveUserProgress(GUEST_USER_ID, {
          selectedCareerId,
          sessions: updated,
          roadmap,
          checklist,
        }).catch(() => {});
        return updated;
      });
      setIsViewingFeedback(true);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } finally {
      setIsLoadingEvaluation(false);
    }
  };

  // Handler: Save Reflection
  const handleSaveReflection = (careerId: CareerRole, reflection: TryoutReflection) => {
    setSessions((prev) => {
      const updated = {
        ...prev,
        [careerId]: {
          ...prev[careerId],
          reflection,
        },
      };
      saveUserProgress(GUEST_USER_ID, {
        selectedCareerId,
        sessions: updated,
        roadmap,
        checklist,
      }).catch(() => {});
      return updated;
    });
  };

  // Handler: Generate or Adapt Personalized Roadmap
  const handleGenerateRoadmap = async (
    answers?: RoadmapQuestionnaireAnswers,
    adaptiveUpdate?: AdaptiveProgressInput
  ) => {
    const finalAnswers: RoadmapQuestionnaireAnswers =
      answers ||
      lastQuestionnaireAnswers ||
      roadmap?.userAnswers || {
        careerId: selectedCareerId,
        skillLevel: 'Complete beginner',
        learnedSkills: [],
        primaryGoal: 'Become job-ready',
        dailyTime: '1 hour per day',
        deadline: 'Within 6 months',
        challenges: ['Not knowing what to learn next'],
        learningStyle: 'A mixture of all three',
        currentPriority: 'Practical skills',
      };

    setIsLoadingRoadmap(true);
    setRoadmapError(null);
    setLastQuestionnaireAnswers(finalAnswers);
    try {
      localStorage.setItem(STORAGE_ROADMAP_ANSWERS_KEY, JSON.stringify(finalAnswers));
    } catch {}

    try {
      // Demonstrated skills from completed tryouts if available
      const completedSkills = Object.values(sessions)
        .flatMap((s) => s.evaluation?.skillsDemonstrated.map((sk) => sk.skill) || []);

      const res = await fetch('/api/generate-roadmap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          careerId: finalAnswers.careerId || selectedCareerId,
          answers: finalAnswers,
          adaptiveUpdate,
          tryoutContext: {
            demonstratedSkills: completedSkills,
          },
        }),
      });

      if (!res.ok) {
        const errData = await res.json().catch(() => ({}));
        throw new Error(
          errData.error || `Roadmap service returned status ${res.status}. Please check your connection and retry.`
        );
      }

      const data: PersonalizedRoadmap = await res.json();
      data.userAnswers = finalAnswers;
      data.targetCareerId = finalAnswers.careerId || selectedCareerId;
      data.generatedAt = new Date().toISOString();
      if (adaptiveUpdate) {
        data.isAdaptiveUpdate = true;
      }

      setRoadmap(data);
      setRoadmapError(null);
      setActiveTab('roadmap');

      // Persist to localStorage
      try {
        localStorage.setItem(STORAGE_ROADMAP_KEY, JSON.stringify(data));
      } catch {}

      // Persist to Firestore
      saveUserProgress(GUEST_USER_ID, {
        selectedCareerId: finalAnswers.careerId || selectedCareerId,
        sessions,
        roadmap: data,
        checklist,
      }).catch(() => {});

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err: any) {
      console.error('Roadmap generation failed:', err);
      const msg = err?.message || 'Failed to generate personalized roadmap. Please check your configuration and retry.';
      setRoadmapError(msg);
      setActiveTab('roadmap');
    } finally {
      setIsLoadingRoadmap(false);
    }
  };

  // Handler: Toggle Milestone Checklist item
  const handleToggleMilestoneItem = (milestoneId: string, itemIdx: number) => {
    const key = `${milestoneId}-${itemIdx}`;
    setChecklist((prev) => {
      const updated = {
        ...prev,
        [key]: !prev[key],
      };
      saveUserProgress(GUEST_USER_ID, {
        selectedCareerId,
        sessions,
        roadmap,
        checklist: updated,
      }).catch(() => {});
      return updated;
    });
  };

  // Handler: Open Reflection Modal for a career
  const handleOpenReflection = (careerId: CareerRole) => {
    setReflectingCareerId(careerId);
    setIsReflectionOpen(true);
  };

  // Helper: Load Sample Student Data for fast exploration
  const handleLoadDemoData = () => {
    const sampleSessions: Record<string, StudentTryoutSession> = {
      'data-analyst': {
        careerId: 'data-analyst',
        answer: DATA_ANALYST_LEVELS.easy.sampleAnalysis,
        submittedAt: new Date(Date.now() - 3600000).toISOString(),
        evaluation: {
          overallScore: 88,
          performanceTier: 'Strong Start',
          whatStudentDidWell:
            'You demonstrated keen commercial intuition and rigorous root-cause analysis by separating footfall growth (+7.8%) from conversion collapse at the Student Union kiosk.',
          evidenceQuotes: [
            {
              quote: 'Peak wait times escalated from 4.8 minutes to 15.2 minutes, causing the walkout rate to surge to 29.0%',
              analysis: 'Directly isolated the mechanical cause of customer abandonment rather than blaming external macro factors.',
              isDirectQuote: true,
            },
            {
              quote: 'Expedite hardware replacement for Student Union register 1 and steamer service ($850 cost, recoupable in one weekend)',
              analysis: 'Formulated a realistic low-cost operational intervention with measurable ROI.',
              isDirectQuote: true,
            },
          ],
          skillsDemonstrated: [
            { skill: 'Data-Backed Root Cause Analysis', why: 'Diagnosed store-level divergence using conversion and wait time metrics.', level: 'Solid' },
            { skill: 'Executive Business Communication', why: 'Structured the memo cleanly into Diagnosis, Action Plan, and Tracking Metric.', level: 'Advanced' },
          ],
          areasForImprovement: [
            'Mention long-term capital replacement planning for the faulty POS register.',
            'Calculate the exact margin difference between drip coffee and prepared wraps.',
          ],
          practicalSuggestion:
            'Always calculate the financial upside of your proposal (e.g. "Restoring 35% conversion recovers $2,100 weekly") to get leadership approval faster.',
          revisedExample: DATA_ANALYST_LEVELS.easy.sampleAnalysis,
          rubricBreakdown: [
            { criterion: 'Data Diagnosis & Evidence', score: 23, maxScore: 25, feedback: 'Strong use of multi-metric correlation.' },
            { criterion: 'Actionability & Feasibility', score: 22, maxScore: 25, feedback: 'Low-cost, high-leverage immediate fixes.' },
            { criterion: 'Role-Specific Thinking', score: 23, maxScore: 25, feedback: 'Excellent grasp of store operations.' },
            { criterion: 'Communication Clarity', score: 20, maxScore: 25, feedback: 'Clean memo formatting with actionable headings.' },
          ],
          realityCheck:
            'Note: This 15-minute diagnostic exercise highlights your analytical intuition, but real-world data analysis involves iterative SQL querying, messy data cleaning, and cross-functional buy-in. It is a solid foundation to build upon!',
          isDemo: true,
          providerNote: 'PathPilot Demo Mode (Sample Data Loaded)',
          evaluatedAt: new Date(Date.now() - 3600000).toISOString(),
        },
        reflection: {
          enjoyment: 'loved',
          enjoymentDetails: 'Felt like solving a detective puzzle with SQL and numbers!',
          difficulties: ['Writing aggregations and WHERE filters'],
          difficultyNote: 'Took a few minutes to realize North Quad was the control group.',
          exploreFurther: 'yes_enthusiastic',
          submittedAt: new Date(Date.now() - 3500000).toISOString(),
        },
      },
      'ux-designer': {
        careerId: 'ux-designer',
        answer: UX_DESIGNER_LEVELS.beginner.sampleAnswer,
        submittedAt: new Date(Date.now() - 1800000).toISOString(),
        evaluation: {
          overallScore: 92,
          performanceTier: 'Exceptional',
          whatStudentDidWell:
            'You championed student psychological safety, emotional dignity, and self-service anonymity, addressing the root causes of the 68% drop-off rather than merely suggesting cosmetic color tweaks.',
          evidenceQuotes: [
            {
              quote: 'Smart Locker Pickup (get a private 4-digit QR code to unlock a discreet exterior locker available 24/7 with no human interaction required)',
              analysis: 'Brilliant UX intervention that removes the stigma of facing an attendant or ringing an awkward basement buzzer.',
              isDirectQuote: true,
            },
            {
              quote: 'Replace the clinical warning with a welcoming, calming card: "Your Fresh Pantry Box is ready to reserve."',
              analysis: 'Human-centered tone shift that normalizes student assistance.',
              isDirectQuote: true,
            },
          ],
          skillsDemonstrated: [
            { skill: 'Empathy-Driven Product Strategy', why: 'Directly addressed social anxiety and peer stigma.', level: 'Advanced' },
            { skill: 'Heuristic Evaluation (NN/g)', why: 'Eliminated artificial time stress and ambiguous transactional labels.', level: 'Solid' },
          ],
          areasForImprovement: [
            'Include accessibility criteria such as WCAG 2.1 AA color contrast compliance.',
            'Consider multi-lingual support for international students facing food insecurity.',
          ],
          practicalSuggestion:
            'In your next design case study, include a before-and-after user journey emotional curve showing how anxiety peaks during pickup.',
          revisedExample: UX_DESIGNER_LEVELS.beginner.sampleAnswer,
          rubricBreakdown: [
            { criterion: 'Problem Diagnosis & Evidence', score: 24, maxScore: 25, feedback: 'Deep alignment with student interview feedback.' },
            { criterion: 'Actionability & Feasibility', score: 23, maxScore: 25, feedback: 'Smart lockers are practical and feasible on modern campuses.' },
            { criterion: 'Role-Specific Thinking', score: 24, maxScore: 25, feedback: 'Exemplary focus on psychological safety.' },
            { criterion: 'Communication Clarity', score: 21, maxScore: 25, feedback: 'Clear, structured, and compassionate proposal.' },
          ],
          realityCheck:
            'Note: Great UX design is an iterative craft involving user interviews, rapid Figma prototyping, and usability testing with diverse students. This exercise highlights your empathy and structural thinking!',
          isDemo: true,
          providerNote: 'PathPilot Demo Mode (Sample Data Loaded)',
          evaluatedAt: new Date(Date.now() - 1800000).toISOString(),
        },
        reflection: {
          enjoyment: 'loved',
          enjoymentDetails: 'Felt deeply meaningful to redesign a system for vulnerable students.',
          difficulties: ['Prioritizing features within time constraints'],
          difficultyNote: 'Hard to choose between smart lockers and multi-lingual UI.',
          exploreFurther: 'yes_enthusiastic',
          submittedAt: new Date(Date.now() - 1750000).toISOString(),
        },
      },
      'software-engineer': {
        careerId: 'software-engineer',
        answer:
          'Root cause: In calculateLoanEMI(), dividing by 12 inside the power formula without guarding for 0% promotional rate caused a division by zero producing NaN. Additionally, monthly interest wasn\'t divided by 100.',
        submittedAt: new Date(Date.now() - 900000).toISOString(),
        evaluation: {
          overallScore: 90,
          performanceTier: 'Exceptional',
          whatStudentDidWell:
            'You pinpointed the exact arithmetic division-by-zero vulnerability and added defensive handling for 0% promotional loans.',
          evidenceQuotes: [
            {
              quote: 'guarding for 0% promotional rate caused a division by zero producing NaN',
              analysis: 'Correctly diagnosed numerical stability and zero-condition handling.',
              isDirectQuote: true,
            },
          ],
          skillsDemonstrated: [
            { skill: 'Defensive Numerical Programming', why: 'Guarded against zero-rate corner case.', level: 'Advanced' },
            { skill: 'Unit Test Reasoning', why: 'Satisfied all reducing-balance validation test cases.', level: 'Solid' },
          ],
          areasForImprovement: [
            'Add explicit comments explaining precision rounding choices.',
            'Document time and space complexity for financial pipelines.',
          ],
          practicalSuggestion:
            'Always write automated unit tests for edge cases before shipping to production.',
          revisedExample: SWE_LEVELS.easy.starterCodes.javascript,
          rubricBreakdown: [
            { criterion: 'Code Correctness & Bug Diagnosis', score: 23, maxScore: 25, feedback: 'Exact identification of boundary hole.' },
            { criterion: 'Edge Cases & Invariant Safety', score: 23, maxScore: 25, feedback: 'Clamped to policy ceiling.' },
            { criterion: 'Reasoning & Justification', score: 22, maxScore: 25, feedback: 'Clean technical justification.' },
            { criterion: 'Code Quality & Cleanliness', score: 22, maxScore: 25, feedback: 'Defensive and readable.' },
          ],
          realityCheck:
            'Note: Debugging calculation logic is fundamental. Real engineering extends to testing, APIs, and cross-functional reviews.',
          isDemo: true,
          evaluatedAt: new Date(Date.now() - 900000).toISOString(),
        },
        reflection: {
          enjoyment: 'liked',
          enjoymentDetails: 'Felt very satisfying when all test cases turned green!',
          difficulties: ['Understanding type coercion & boundary checks'],
          exploreFurther: 'yes_enthusiastic',
          submittedAt: new Date(Date.now() - 850000).toISOString(),
        },
      },
    };

    setSessions(sampleSessions);
    // Generate roadmap for these sample sessions immediately
    setTimeout(() => {
      handleGenerateRoadmap();
    }, 400);
  };

  // Helper: Reset Session Progress
  const handleResetSession = () => {
    if (window.confirm('Reset your tryout progress and roadmap? This clears your browser session.')) {
      localStorage.removeItem(STORAGE_SESSIONS_KEY);
      localStorage.removeItem(STORAGE_ROADMAP_KEY);
      localStorage.removeItem(STORAGE_CHECKLIST_KEY);
      localStorage.removeItem(STORAGE_ROADMAP_ANSWERS_KEY);
      setSessions({
        'data-analyst': { careerId: 'data-analyst', answer: '', evaluation: null, reflection: null },
        'ux-designer': { careerId: 'ux-designer', answer: '', evaluation: null, reflection: null },
        'software-engineer': { careerId: 'software-engineer', answer: '', evaluation: null, reflection: null },
      });
      setRoadmap(null);
      setChecklist({});
      setActiveTab('dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F3EB] text-[#3E2723] font-sans antialiased flex flex-col selection:bg-[#EFE5D8] selection:text-[#3E2723]">
      {/* Top Navigation */}
      <Header
        activeTab={activeTab}
        setActiveTab={(tab) => {
          setActiveTab(tab);
          if (tab === 'task') {
            setIsViewingFeedback(Boolean(sessions[selectedCareerId]?.evaluation));
          }
        }}
        sessions={sessions}
        onOpenMission={() => setIsMissionOpen(true)}
        onOpenCareerGuides={() => handleViewCareerInfo(selectedCareerId || 'software-engineer')}
        onOpenProgress={() => setIsProgressOpen(true)}
      />

      {/* Main App Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* View 1: Dashboard */}
        {activeTab === 'dashboard' && (
          <Dashboard
            onSelectCareer={handleSelectCareer}
            onViewCareerInfo={handleViewCareerInfo}
            onViewComparison={() => setActiveTab('comparison')}
            onViewRoadmap={() => setActiveTab('roadmap')}
            sessions={sessions}
            onLoadDemoData={handleLoadDemoData}
            onResetSession={handleResetSession}
          />
        )}

        {/* View 2: Task Tryout or Feedback View */}
        {activeTab === 'task' && (
          <>
            {isViewingFeedback && sessions[selectedCareerId]?.evaluation ? (
              <FeedbackView
                careerId={selectedCareerId}
                evaluation={sessions[selectedCareerId].evaluation!}
                onOpenReflection={() => handleOpenReflection(selectedCareerId)}
                onRetake={() => setIsViewingFeedback(false)}
                onViewComparison={() => setActiveTab('comparison')}
                onViewCareerInfo={handleViewCareerInfo}
                hasReflection={Boolean(sessions[selectedCareerId]?.reflection)}
              />
            ) : (
              <TaskView
                careerId={selectedCareerId}
                onBack={() => setActiveTab('dashboard')}
                session={sessions[selectedCareerId]}
                onSaveAnswer={handleSaveAnswer}
                onSubmitForEvaluation={handleSubmitForEvaluation}
                isLoadingEvaluation={isLoadingEvaluation}
                onViewEvaluation={() => setIsViewingFeedback(true)}
                onViewCareerInfo={handleViewCareerInfo}
              />
            )}
          </>
        )}

        {/* View 3: Career Comparison */}
        {activeTab === 'comparison' && (
          <CareerComparisonView
            sessions={sessions}
            onSelectCareer={handleSelectCareer}
            onOpenReflection={handleOpenReflection}
            onGenerateRoadmap={() => {
              setActiveTab('roadmap');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onViewCareerInfo={handleViewCareerInfo}
          />
        )}

        {/* View 4: Personalized Roadmap */}
        {activeTab === 'roadmap' && (
          <RoadmapView
            roadmap={roadmap}
            isLoading={isLoadingRoadmap}
            errorMessage={roadmapError}
            onGenerateRoadmap={handleGenerateRoadmap}
            sessions={sessions}
            onToggleMilestoneItem={handleToggleMilestoneItem}
            completedItems={checklist}
            selectedCareerId={selectedCareerId}
            initialAnswers={lastQuestionnaireAnswers || roadmap?.userAnswers}
          />
        )}

        {/* View 5: Comprehensive Career Reality & Information Guide */}
        {activeTab === 'career-info' && (
          <CareerInfoView
            careerId={infoCareerId}
            onSelectCareerToView={(id) => setInfoCareerId(id)}
            onExploreCareerTryout={(id) => {
              handleSelectCareer(id);
            }}
            onCompareCareers={() => {
              setActiveTab('comparison');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            onBackToDashboard={() => {
              setActiveTab('dashboard');
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            hasCompletedTryout={Boolean(sessions[infoCareerId]?.evaluation)}
          />
        )}
      </main>

      {/* Mission & Student Equity Modal */}
      <MissionModal
        isOpen={isMissionOpen}
        onClose={() => setIsMissionOpen(false)}
      />

      {/* 3-Question Post-Tryout Reflection Modal */}
      <ReflectionModal
        isOpen={isReflectionOpen}
        onClose={() => setIsReflectionOpen(false)}
        careerId={reflectingCareerId}
        initialReflection={sessions[reflectingCareerId]?.reflection}
        onSaveReflection={handleSaveReflection}
      />

      {/* Career Progress & Achievements Modal */}
      <ProfileModal
        isOpen={isProgressOpen}
        onClose={() => setIsProgressOpen(false)}
        sessions={sessions}
        roadmap={roadmap}
        checklist={checklist}
        onNavigateToTab={(tab) => {
          setIsProgressOpen(false);
          setActiveTab(tab);
        }}
      />

      {/* Footer */}
      <footer className="mt-auto border-t border-[#E8DDCD] bg-[#FFFCF7] py-6 text-xs text-[#795548]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-extrabold text-[#3E2723]">PathPilot AI</span>
            <span>•</span>
            <span>“Don’t just choose your future. Try it first.”</span>
          </div>
          <div className="flex items-center gap-4 text-[#795548]">
            <span>Free Student Career Exploration</span>
            <span>•</span>
            <button
              onClick={() => setIsMissionOpen(true)}
              className="text-[#795548] hover:text-[#3E2723] font-semibold cursor-pointer underline decoration-[#C19A6B]/50 hover:decoration-[#C19A6B]"
            >
              First-Gen College Initiative
            </button>
          </div>
        </div>
      </footer>
    </div>
  );
}
