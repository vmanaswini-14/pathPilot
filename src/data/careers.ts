import { CareerInfo, CareerRole } from '../types';
import { DATA_ANALYST_LEVELS } from './dataAnalystTasks';
import { UX_DESIGNER_LEVELS } from './uxDesignerTasks';
import { SWE_LEVELS, SWE_MANAGER_UPDATE } from './sweTaskData';

export { DATA_ANALYST_LEVELS, UX_DESIGNER_LEVELS, SWE_LEVELS, SWE_MANAGER_UPDATE };

export const CAREER_LIST: CareerInfo[] = [
  {
    id: 'data-analyst',
    title: 'Data Analyst',
    shortTitle: 'Data Analyst',
    category: 'Analytics & Decision Science',
    badge: 'SQL & Business Insights',
    tagline: 'Turn scattered operational datasets and SQL queries into clear recommendations.',
    dayInTheLife:
      'Data analysts pull records from databases with SQL, spot operational bottlenecks, build dashboards, and translate metrics into plain-English advice so leaders make confident choices.',
    keySkills: ['SQL Querying & Aggregation', 'Root-Cause Analysis', 'Hypothesis Testing', 'Business Storytelling', 'Metric Auditing'],
    taskDuration: '4 Levels (8-18 mins)',
    colorScheme: {
      bg: 'bg-white',
      border: 'border-[#D9C7B5]',
      badgeBg: 'bg-[#E8D6C3]',
      badgeText: 'text-[#4A3028]',
      accent: '#B9825B',
    },
    overview:
      'Practice hands-on SQL across 4 levels: explore student living expenses, write essential business SQL queries, discover multi-table demographic patterns with JOINs, and investigate approval drops with mid-task manager requirements.',
  },
  {
    id: 'ux-designer',
    title: 'UX / Product Designer',
    shortTitle: 'UX Designer',
    category: 'Human-Centered Design',
    badge: 'Empathy & Interaction',
    tagline: 'Design digital experiences that feel intuitive, welcoming, and dignified.',
    dayInTheLife:
      'UX designers talk to users to understand frustrations, sketch wireframes, prototype flows, and redesign high-friction software interfaces to make technology human and accessible.',
    keySkills: ['Heuristic Evaluation', 'Trauma-Informed Design', 'Information Architecture', 'WCAG 2.1 Accessibility', 'Microcopy & Dignity'],
    taskDuration: '4 Levels (8-18 mins)',
    colorScheme: {
      bg: 'bg-white',
      border: 'border-[#D9C7B5]',
      badgeBg: 'bg-[#E8D6C3]',
      badgeText: 'text-[#4A3028]',
      accent: '#B9825B',
    },
    overview:
      'Audit and redesign 4 high-stakes workflows: spot food pantry usability flaws, reorder and rewrite confusing application forms with live previews, configure WCAG 2.1 AA accessibility controls, and adapt to regulatory mandates via progressive disclosure.',
  },
  {
    id: 'software-engineer',
    title: 'Software Engineer',
    shortTitle: 'Software Engineer',
    category: 'Engineering & Logic',
    badge: 'Systems & Code',
    tagline: 'Build resilient software systems, solve algorithmic puzzles, and squash bugs.',
    dayInTheLife:
      'Software engineers write code that powers products, debug unexpected runtime behavior, design clean data structures, and automate tests to ensure millions have reliable apps.',
    keySkills: ['Code Tracing', 'Multi-Language (JS, Python, Java, C++)', 'Boundary Condition Testing', 'Type Coercion', 'Defensive Programming'],
    taskDuration: '4 Levels (6-15 mins)',
    colorScheme: {
      bg: 'bg-white',
      border: 'border-[#D9C7B5]',
      badgeBg: 'bg-[#E8D6C3]',
      badgeText: 'text-[#4A3028]',
      accent: '#B9825B',
    },
    overview:
      'Solve 4 distinct programming challenges: student loan EMI calculator, palindrome reference code verification, loan eligibility policy engine, and multi-defect emergency grant debugging with live manager updates.',
  },
];

// Backwards-compatible exports for default single task references
export const DATA_ANALYST_TASK = {
  title: DATA_ANALYST_LEVELS.easy.title,
  scenario: DATA_ANALYST_LEVELS.easy.scenario,
  instructions: DATA_ANALYST_LEVELS.easy.instructions,
  sampleAnswer: DATA_ANALYST_LEVELS.easy.sampleAnalysis,
};

export const UX_DESIGNER_TASK = {
  title: UX_DESIGNER_LEVELS.beginner.title,
  scenario: UX_DESIGNER_LEVELS.beginner.scenario,
  instructions: UX_DESIGNER_LEVELS.beginner.instructions,
  mockupCallouts: UX_DESIGNER_LEVELS.beginner.mockupCallouts,
  userQuotes: UX_DESIGNER_LEVELS.beginner.userQuotes,
  sampleAnswer: UX_DESIGNER_LEVELS.beginner.sampleAnswer,
};

export const SOFTWARE_ENGINEER_TASK = {
  title: SWE_LEVELS.easy.title,
  scenario: SWE_LEVELS.easy.summary,
  promptInstructions: SWE_LEVELS.easy.instructions,
  sampleAnswer: `1. Bug Diagnosis: Line 6 type coercion and off-by-one boundary gap. 2. Fix using Number() parsing and <= 20000. 3. Clamping bounds between 500 and 2500.`,
};

export const DATA_ANALYST_DATASET = DATA_ANALYST_LEVELS.easy.dataset;
