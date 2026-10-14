export type CareerRole = 'data-analyst' | 'ux-designer' | 'software-engineer';

export type ProgrammingLanguage = 'javascript' | 'python' | 'java' | 'cpp';
export type DifficultyLevel = 'beginner' | 'easy' | 'intermediate' | 'advanced';

// Software Engineer Types
export interface TestCaseResult {
  id: number;
  name: string;
  passed: boolean;
  expected: any;
  actual: any;
  input: any;
  errorMessage?: string;
  executionTimeMs?: number;
  isEdgeCase?: boolean;
  isManagerRequirement?: boolean;
}

export interface CodeExecutionResult {
  success: boolean;
  stdout: string;
  stderr: string;
  compileErrors: string;
  testResults: TestCaseResult[];
  allPassed: boolean;
  isDemo: boolean;
  provider: string;
  timestamp: string;
}

// Data Analyst SQL & Level Types
export interface SqlQueryResult {
  success: boolean;
  columns: string[];
  rows: Record<string, any>[];
  rowCount: number;
  executionTimeMs: number;
  errorMessage?: string;
  query: string;
  timestamp: string;
}

export interface DataAnalystLevelConfig {
  id: DifficultyLevel;
  label: string;
  badgeColor: string;
  estimatedTime: string;
  title: string;
  scenario: string;
  problemStatement: string;
  learningObjectives: string[];
  instructions: string[];
  hints: string[];
  tableName: string;
  schemaColumns: Array<{ name: string; type: string; description: string }>;
  dataset: Record<string, any>[];
  starterQuery: string;
  sampleQueries: Array<{ label: string; query: string; purpose: string }>;
  expectedInsights: string[];
  kpis: Array<{ label: string; value: string; subtext: string; trend?: 'up' | 'down' | 'neutral' }>;
  sampleAnalysis: string;
  extraTables?: Array<{
    tableName: string;
    schemaColumns: Array<{ name: string; type: string; description: string }>;
    dataset: Record<string, any>[];
  }>;
  guidedQuestions?: Array<{
    id: string;
    question: string;
    expectedAnswer: string;
    explanation: string;
  }>;
  managerUpdate?: {
    author: string;
    role: string;
    timestamp: string;
    subject: string;
    message: string;
    revisedTask: string;
    revisedQueryHint?: string;
  };
}

// UX Designer Types
export interface UxMockupCallout {
  id: number;
  title: string;
  component: string;
  issue: string;
  heuristicViolated: string;
  studentQuote?: string;
  recommendation: string;
}

export interface UxFormFieldConfig {
  id: string;
  originalLabel: string;
  suggestedLabel: string;
  type: 'text' | 'number' | 'file' | 'select';
  order: number;
  required: boolean;
  originalError: string;
  suggestedError: string;
  helperText?: string;
}

export interface UxDesignerLevelConfig {
  id: DifficultyLevel;
  label: string;
  badgeColor: string;
  estimatedTime: string;
  title: string;
  scenario: string;
  problemStatement: string;
  screenTitle: string;
  screenSubtitle: string;
  learningObjectives: string[];
  instructions: string[];
  hints: string[];
  mockupCallouts: UxMockupCallout[];
  userQuotes: Array<{ author: string; role: string; quote: string }>;
  heuristics: Array<{ name: string; principle: string; application: string }>;
  sampleAnswer: string;
  formFields?: UxFormFieldConfig[];
  managerUpdate?: {
    author: string;
    role: string;
    timestamp: string;
    subject: string;
    message: string;
    newRequirement: string;
  };
}

// Universal Evaluation and Rubric Types
export type PerformanceTier = 'Exceptional' | 'Strong Start' | 'Developing' | 'Needs Depth';

export interface EvidenceQuote {
  quote: string;
  analysis: string;
  isDirectQuote: boolean;
}

export interface DemonstratedSkill {
  skill: string;
  why: string;
  level: 'Emerging' | 'Solid' | 'Advanced';
}

export interface RubricCriterion {
  criterion: string;
  score: number;
  maxScore: number;
  feedback: string;
}

export interface EvaluationResult {
  overallScore: number;
  performanceTier: PerformanceTier;
  whatStudentDidWell: string;
  evidenceQuotes: EvidenceQuote[];
  skillsDemonstrated: DemonstratedSkill[];
  areasForImprovement: string[];
  practicalSuggestion: string;
  revisedExample: string;
  rubricBreakdown: RubricCriterion[];
  realityCheck: string;
  isDemo?: boolean;
  providerNote?: string;
  evaluatedAt?: string;
}

export interface TryoutReflection {
  enjoyment: 'loved' | 'liked' | 'neutral' | 'disliked';
  enjoymentDetails?: string;
  difficulties: string[];
  difficultyNote?: string;
  exploreFurther: 'yes_enthusiastic' | 'maybe_more_prep' | 'unlikely_prefer_others';
  submittedAt: string;
}

export interface StudentTryoutSession {
  careerId: CareerRole;
  answer: string;
  submittedAt?: string;
  level?: DifficultyLevel;
  evaluation: EvaluationResult | null;
  reflection: TryoutReflection | null;
}

export interface RoadmapQuestionnaireAnswers {
  careerId: CareerRole;
  skillLevel: string; // 'Complete beginner' | 'Know the basics' | 'Intermediate' | 'Already have project experience'
  learnedSkills: string[];
  primaryGoal: string; // 'Get an internship' | 'Prepare for placements' | 'Become job-ready' | 'Build projects for my portfolio' | 'Explore whether this career suits me' | 'Improve my existing skills'
  dailyTime: string; // '30 minutes per day' | '1 hour per day' | '2 hours per day' | '3+ hours per day' | 'Different amounts on different days'
  deadline: string; // 'Within 1 month' | 'Within 3 months' | 'Within 6 months' | 'Within 12 months' | 'No fixed deadline'
  challenges: string[];
  learningStyle: string; // 'Learn concepts first, then practise' | 'Learn by building projects' | 'Solve challenges and exercises' | 'A mixture of all three'
  currentPriority: string; // 'Fundamentals' | 'Practical skills' | 'Portfolio projects' | 'Interview preparation' | 'Advanced skills'
}

export interface PrioritySkill {
  skill: string;
  timing: 'Learn First' | 'Learn Next' | 'Can Wait';
  why: string;
  prerequisites: string[];
}

export interface PhaseExercise {
  title: string;
  description: string;
  estimatedTime?: string;
}

export interface PhasePracticalTask {
  title: string;
  description: string;
  deliverable: string;
}

export interface LearningPhase {
  id: string;
  name: string;
  estimatedDuration: string;
  learningObjectives: string[];
  specificTopics: string[];
  handsOnExercises: PhaseExercise[];
  practicalTaskOrProject: PhasePracticalTask;
  completionCriteria: string[];
  expectedOutcome: string;
}

export interface WeeklyMilestoneItem {
  id: string;
  title: string;
  details: string;
  estimatedMinutes?: number;
}

export interface WeeklyPlanItem {
  weekNumber: number;
  title: string;
  phaseRef: string;
  recommendedDailyTime: string;
  weeklyGoal: string;
  milestones: WeeklyMilestoneItem[];
}

export interface RoadmapProjectRecommendation {
  id: string;
  title: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  elevatorPitch: string;
  skillsDemonstrated: string[];
  keyFeatures: string[];
  whyItMattersForHiring: string;
}

export interface AdaptiveProgressInput {
  completedNotes: string;
  difficultiesNotes: string;
  availableTimeNow: string;
  goalChanges: string;
}

export interface Milestone {
  id: string;
  timeframe: string;
  title: string;
  description: string;
  actionItems: string[];
  completed?: boolean;
}

export interface BeginnerProject {
  title: string;
  elevatorPitch: string;
  whyItMatters: string;
  steps: string[];
  techOrTools: string[];
}

export interface FreeResource {
  title: string;
  provider: string;
  url: string;
  type: 'Course' | 'Interactive' | 'Documentation' | 'Community' | string;
  isFreeForever: boolean;
  description: string;
}

export interface PersonalizedRoadmap {
  primaryFocus: string;
  roleTitle?: string;
  targetCareerId?: CareerRole;
  summary: string;
  startingPoint?: string;
  recommendedPacing?: string;
  totalEstimatedWeeks?: number;

  // Section B: Priority Skills
  prioritySkills?: PrioritySkill[];

  // Section C: Flexible Learning Phases
  phases?: LearningPhase[];

  // Section D: Personalized Weekly Plan
  weeklyPlan?: WeeklyPlanItem[];

  // Section E: Project Recommendations
  projects?: RoadmapProjectRecommendation[];

  // Section F: Curated Free Learning Resources
  freeResources: FreeResource[];

  // Metadata, Answers & Adaptive Tracking
  userAnswers?: RoadmapQuestionnaireAnswers;
  isAdaptiveUpdate?: boolean;
  updateNotes?: string;
  generatedAt?: string;
  isDemo?: boolean;

  // Legacy compatibility fields
  topStrengths?: Array<{ strength: string; evidence: string }>;
  skillGaps?: Array<{ gap: string; whyItMatters: string }>;
  milestones?: Milestone[];
  beginnerProject?: BeginnerProject;
  trackerNotes?: string;
}

export interface CareerInfo {
  id: CareerRole;
  title: string;
  shortTitle: string;
  category: string;
  badge: string;
  tagline: string;
  dayInTheLife: string;
  keySkills: string[];
  taskDuration: string;
  colorScheme: {
    bg: string;
    border: string;
    badgeBg: string;
    badgeText: string;
    accent: string;
  };
  overview: string;
}

// ==========================================
// Career Information & Reality Guide Types
// ==========================================
export interface SalaryTier {
  experienceLabel: string;
  indicativeRangeLpa: string;
  monthlyEstimateInHand: string;
  baseVsTotalBreakdown: string;
  variationFactors: string;
}

export interface SalarySourceLink {
  sourceName: string;
  verifiedUrl: string;
  lastCheckedDate: string;
  reportedAverageOrRange: string;
  notes: string;
}

export interface CareerSalaryData {
  disclaimer: string;
  compensationContext: string;
  entryLevel: SalaryTier;
  midLevel: SalaryTier;
  seniorLevel: SalaryTier;
  verifiedSources: SalarySourceLink[];
  compensationDeterminants: string[];
}

export interface CareerGuide {
  careerId: CareerRole;
  title: string;
  shortTitle: string;
  heroTagline: string;
  lastUpdated: string;
  
  // Section A: Career Overview
  overview: {
    plainLanguageSummary: string;
    coreProblemsSolved: Array<{ problem: string; description: string }>;
    businessContribution: string;
    commonMisconceptions: Array<{ myth: string; reality: string }>;
  };

  // Section B: What They Actually Do
  actualWork: {
    dailyResponsibilities: string[];
    realWorkplaceTaskExamples: Array<{ scenario: string; typicalAction: string; tangibleDeliverable: string }>;
    toolsAndTechnologies: Array<{ category: string; tools: string[]; purpose: string }>;
    crossFunctionalCollaboration: Array<{ collaborator: string; dynamic: string; frequency: string }>;
    illustrativeDaySchedule: {
      scheduleNote: string;
      timeline: Array<{ time: string; activity: string; category: 'deep-work' | 'collaboration' | 'review' | 'planning' }>;
    };
  };

  // Section C: Salary in India
  salaryData: CareerSalaryData;

  // Section D: Skills and Qualifications
  skillsAndQualifications: {
    essentialTechnicalSkills: Array<{ name: string; whyEssential: string; keyConcepts: string[] }>;
    usefulAdditionalSkills: Array<{ name: string; description: string }>;
    communicationAndTeamwork: Array<{ skill: string; howUsed: string }>;
    educationalBackgrounds: Array<{ background: string; description: string; viability: string }>;
    alternativeEntryRoutes: Array<{ route: string; recommendations: string }>;
    beginnerFriendlyTools: Array<{ name: string; cost: string; startAction: string }>;
  };

  // Section E: Career Growth
  careerGrowth: {
    progressionSummary: string;
    dualLadderExplanation: string;
    individualContributorLadder: Array<{ level: string; yoe: string; scope: string; dailyFocus: string }>;
    managementLadder: Array<{ level: string; yoe: string; scope: string; dailyFocus: string }>;
    lateralOrSpecialistTracks: Array<{ trackName: string; description: string; requiredPivotSkill: string }>;
  };

  // Section F: Where Professionals Work
  workEnvironments: {
    industries: Array<{ industry: string; commonUseCases: string; hiringVolume: string }>;
    companyArchetypes: Array<{ archetype: string; environmentStyle: string; compStyle: string; whatToExpect: string }>;
    typicalSquadStructure: string;
    employerExamplesNotice: string;
    employerExamples: Array<{ name: string; sector: string }>;
  };

  // Section G: Advantages and Challenges
  advantagesAndChallenges: {
    keyAdvantages: Array<{ title: string; explanation: string }>;
    realChallenges: Array<{ title: string; challenge: string; howToCope: string }>;
    candidSelfAssessmentQuestions: string[];
  };

  // Section H: How to Enter the Career
  howToEnter: {
    roadmapSteps: Array<{
      stepNumber: number;
      title: string;
      estimatedDuration: string;
      actionChecklist: string[];
      portfolioHighlight: string;
      pitfallToAvoid: string;
    }>;
    interviewPreparation: {
      interviewStages: Array<{ stage: string; focus: string; preparationAdvice: string }>;
      portfolioOrResumeAdvice: string[];
    };
  };
}

export interface AuthUser {
  uid: string;
  email: string;
  name: string;
  role?: string;
  isDemoAccount?: boolean;
  avatar?: string;
  createdAt?: string;
}


