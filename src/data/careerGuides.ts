import { CareerGuide, CareerRole } from '../types';

export const CAREER_GUIDES: Record<CareerRole, CareerGuide> = {
  // =========================================================================
  // 1. SOFTWARE ENGINEER
  // =========================================================================
  'software-engineer': {
    careerId: 'software-engineer',
    title: 'Software Engineer',
    shortTitle: 'Software Engineer',
    heroTagline: 'Design, write, debug, and scale the code and architecture powering modern software applications.',
    lastUpdated: 'October 2024 (Verified Market Benchmarks)',

    overview: {
      plainLanguageSummary:
        'A Software Engineer is a digital builder and problem solver. Just as civil engineers design bridges that carry vehicles safely without collapsing, software engineers design, write, test, and maintain computer code that powers websites, mobile apps, payment systems, and backend services that millions of people rely on every day.',
      coreProblemsSolved: [
        {
          problem: 'Transforming Human Needs into Executable Code',
          description:
            'Turning vague product ideas (e.g., "let users split bills with friends instantly") into precise, automated, fail-safe computer instructions.',
        },
        {
          problem: 'Squashing Bugs and Diagnosing Failures',
          description:
            'Investigating why an application crashed, why a payment failed, or why an edge-case calculation gave an incorrect balance under high concurrency.',
        },
        {
          problem: 'Ensuring Scalability, Security & Speed',
          description:
            'Architecting systems so an application loads in under 200ms whether 10 people or 1,000,000 people are using it simultaneously, while preventing data breaches.',
        },
        {
          problem: 'Long-term System Maintainability',
          description:
            'Refactoring messy legacy code into clean, modular, well-documented components that other engineers can safely extend without breaking existing features.',
        },
      ],
      businessContribution:
        'Software Engineers directly build the product the company sells or the internal automation that keeps operational costs low. A reliable software engineering team enables a business to launch features faster than competitors, protect user customer trust through uptime, and scale revenue without needing linear headcount growth.',
      commonMisconceptions: [
        {
          myth: 'Software engineering is 100% solo coding in a dark room with headphones all day.',
          reality:
            'Up to 40–50% of an engineer’s week is spent collaborating: reviewing teammates’ code, discussing API schemas with product managers, writing technical documentation, and clarifying user requirements.',
        },
        {
          myth: 'You have to be a mathematical genius to write software.',
          reality:
            'Most day-to-day software engineering relies on logical reasoning, pattern recognition, systematic debugging, and reading documentation rather than advanced calculus or differential equations.',
        },
        {
          myth: 'You need to memorize every syntax rule and library function.',
          reality:
            'Professional engineers constantly consult official documentation, search debugging forums, and use language reference manuals. The skill is knowing what architecture to choose and how to isolate problems.',
        },
        {
          myth: 'AI tools like ChatGPT will eliminate junior software engineers immediately.',
          reality:
            'AI tools generate boilerplate code, but engineers must evaluate logic correctness, prevent subtle security flaws, integrate distributed systems, and understand the business context that AI lacks.',
        },
      ],
    },

    actualWork: {
      dailyResponsibilities: [
        'Writing clean, typed, modular code to implement new feature tickets from the sprint backlog.',
        'Reviewing Pull Requests (PRs) submitted by teammates, offering constructive feedback on readability, edge cases, and performance.',
        'Investigating error logs, bug reports, and stack traces to reproduce, isolate, and fix production issues.',
        'Writing automated unit, integration, and end-to-end tests to guarantee existing functionality never breaks during deployments.',
        'Collaborating in agile ceremonies: daily standups, sprint planning, backlog grooming, and post-incident retrospectives.',
        'Participating in architecture discussions to choose data models, API endpoints, caching strategies, and third-party integrations.',
      ],
      realWorkplaceTaskExamples: [
        {
          scenario: 'Payment Gateway Timeout Bug',
          typicalAction:
            'A customer reports being debited without their order being marked confirmed. The engineer digs into Datadog/Sentry logs, reproduces the network timeout in a local sandbox, and implements an idempotent webhook handler with an automated reconciliation fallback.',
          tangibleDeliverable:
            'A tested Git pull request with unit tests verifying webhook retries and zero duplicate charges.',
        },
        {
          scenario: 'Search Feature Performance Degradation',
          typicalAction:
            'Search query response times spike from 80ms to 2.4 seconds as the product catalog reaches 500,000 items. The engineer profiles the SQL query, discovers a missing composite database index, and adds a Redis caching layer for top search terms.',
          tangibleDeliverable:
            'Database migration script, Redis caching layer implementation, and performance benchmark report showing response times back down to 65ms.',
        },
        {
          scenario: 'Student Hardship Grant Calculator Refactor',
          typicalAction:
            'Campus administration changes income eligibility tiers. The engineer refactors the business logic, extracts magic numbers into environment-configured rule tables, and writes 15 edge-case boundary tests.',
          tangibleDeliverable:
            'Clean modular calculation function with 100% test branch coverage and zero regressions.',
        },
      ],
      toolsAndTechnologies: [
        {
          category: 'Programming Languages',
          tools: ['TypeScript / JavaScript', 'Python', 'Java', 'Go', 'C++'],
          purpose: 'Core logic, backend microservices, web and mobile app development.',
        },
        {
          category: 'Frameworks & Runtimes',
          tools: ['Node.js', 'React', 'Next.js', 'Spring Boot', 'FastAPI', 'Express'],
          purpose: 'Building responsive user interfaces, RESTful/GraphQL APIs, and server processes.',
        },
        {
          category: 'Databases & Caching',
          tools: ['PostgreSQL', 'MySQL', 'MongoDB', 'Redis'],
          purpose: 'Structured data persistence, relational joins, indexing, and high-speed in-memory caching.',
        },
        {
          category: 'Version Control & Collaboration',
          tools: ['Git', 'GitHub / GitLab', 'Jira / Linear', 'Slack'],
          purpose: 'Branch management, code reviews, pull requests, sprint tracking, and team communication.',
        },
        {
          category: 'DevOps, Containers & Cloud',
          tools: ['Docker', 'Kubernetes', 'AWS / Google Cloud', 'GitHub Actions CI/CD'],
          purpose: 'Automating build pipelines, running automated test suites, and deploying containerized services.',
        },
        {
          category: 'Observability & Debugging',
          tools: ['Postman', 'Chrome DevTools', 'Sentry', 'Datadog / CloudWatch'],
          purpose: 'Testing API endpoints, inspecting network payloads, analyzing runtime exceptions, and monitoring server health.',
        },
      ],
      crossFunctionalCollaboration: [
        {
          collaborator: 'Product Managers (PMs)',
          dynamic:
            'PMs explain the "what" and "why" (user requirements, business deadlines). Engineers estimate technical feasibility, flag edge cases, and negotiate scope.',
          frequency: 'Daily standups & weekly sprint planning',
        },
        {
          collaborator: 'UX / Product Designers',
          dynamic:
            'Designers provide Figma mockups, design tokens, and interaction flows. Engineers discuss responsive edge cases, component reuse, accessibility, and animations.',
          frequency: 'Multiple times per sprint',
        },
        {
          collaborator: 'QA / Test Engineers',
          dynamic:
            'QA tests builds against acceptance criteria. Engineers provide deployment notes, fix reported defects, and collaborate on automated test coverage.',
          frequency: 'Continuous during sprint delivery',
        },
        {
          collaborator: 'DevOps / Site Reliability Engineers (SRE)',
          dynamic:
            'Coordinating database migrations, environment secrets, infrastructure provisioning, and troubleshooting deployment alerts.',
          frequency: 'Bi-weekly or on-demand during releases',
        },
      ],
      illustrativeDaySchedule: {
        scheduleNote:
          'Note: This timeline is an illustrative example of an agile tech workplace. Actual daily schedules vary significantly based on company culture, sprint deadlines, and remote vs. in-office norms.',
        timeline: [
          {
            time: '09:30 AM – 10:00 AM',
            activity: 'Reviewing overnight Slack alerts, CI/CD build outputs, and responding to teammate comments on pending Pull Requests.',
            category: 'review',
          },
          {
            time: '10:00 AM – 10:20 AM',
            activity: 'Daily Engineering Standup (15 mins): Each engineer shares what they completed yesterday, today’s focus, and any blocking hurdles.',
            category: 'collaboration',
          },
          {
            time: '10:30 AM – 01:00 PM',
            activity: 'Deep Focus Coding Block: Writing code for assigned sprint user story, writing unit tests, and debugging logic in local development environment.',
            category: 'deep-work',
          },
          {
            time: '01:00 PM – 02:00 PM',
            activity: 'Lunch break and informal team catch-up.',
            category: 'planning',
          },
          {
            time: '02:00 PM – 02:45 PM',
            activity: 'Sprint Refinement / Tech Spec Review with Product Manager and UX Designer to clarify upcoming feature requirements.',
            category: 'collaboration',
          },
          {
            time: '02:45 PM – 04:30 PM',
            activity: 'Second Focus Block: Merging branch, testing API integration in staging environment, and submitting Pull Request for code review.',
            category: 'deep-work',
          },
          {
            time: '04:30 PM – 05:30 PM',
            activity: 'Code Review & Mentorship: Reviewing 2 pull requests from peers, helping an intern with a Git merge conflict, and updating Jira tickets.',
            category: 'review',
          },
        ],
      },
    },

    salaryData: {
      disclaimer:
        'All salary data presented is indicative, aggregated from verified public job boards and compensation surveys in India. Salaries depend heavily on company tier (IT Services vs. Product Startup vs. Global Capability Center vs. Big Tech), candidate interview performance, educational institution, city (Bengaluru, Hyderabad, Gurugram, Pune), and negotiated variable components. PathPilot does not guarantee any salary outcome.',
      compensationContext:
        'In India, compensation is typically quoted as Cost to Company (CTC), which includes Base Salary (fixed pay received monthly), Performance Bonus (variable, paid annually), Employee Provident Fund (EPF), and in product firms, Equity / Stock Options (ESOPs or RSUs). Base salary is what directly dictates your monthly in-hand deposit.',
      entryLevel: {
        experienceLabel: 'Entry-Level / Fresher (0–2 Years)',
        indicativeRangeLpa: '₹3.6 Lakhs – ₹14.0 Lakhs per annum',
        monthlyEstimateInHand: '₹26,000 – ₹95,000 / month (approx. fixed)',
        baseVsTotalBreakdown:
          'IT Services (TCS, Infosys, Wipro): typically ₹3.5 – ₹5.0 LPA CTC with 85-90% fixed base. Mid-tier product startups: ₹7.0 – ₹12.0 LPA. Top-tier product companies (FAANG/GCCs): ₹15.0 – ₹25.0+ LPA CTC (with RSUs & joining bonus).',
        variationFactors:
          'Campus tier (Tier-1 vs Tier-3), algorithmic coding proficiency (LeetCode/DSA), full-stack project portfolio, and city cost-of-living adjustments.',
      },
      midLevel: {
        experienceLabel: 'Mid-Level Software Engineer (2–5 Years)',
        indicativeRangeLpa: '₹8.0 Lakhs – ₹24.0 Lakhs per annum',
        monthlyEstimateInHand: '₹55,000 – ₹1,55,000 / month (approx. fixed)',
        baseVsTotalBreakdown:
          'Service-based firms: ₹7.5 – ₹12.0 LPA. High-growth product startups (Fintech, SaaS, E-commerce): ₹14.0 – ₹28.0 LPA CTC (Base ₹12-22L + Performance bonus + ESOPs).',
        variationFactors:
          'Ability to own end-to-end features, system design competence, database optimization skills, and proven record of production stability.',
      },
      seniorLevel: {
        experienceLabel: 'Senior Software Engineer / Tech Lead (5+ Years)',
        indicativeRangeLpa: '₹18.0 Lakhs – ₹50.0+ Lakhs per annum',
        monthlyEstimateInHand: '₹1,20,000 – ₹3,10,000+ / month (approx. fixed)',
        baseVsTotalBreakdown:
          'Established mid-market IT: ₹16 – ₹25 LPA. Top product firms, Unicorns, and Global Tech Centers: ₹35 – ₹70+ LPA total compensation (including substantial liquid stock units/RSUs).',
        variationFactors:
          'Distributed systems architecture, cross-team technical leadership, mentoring junior talent, and driving major technical decisions under high traffic.',
      },
      verifiedSources: [
        {
          sourceName: 'AmbitionBox India — Software Engineer Salaries',
          verifiedUrl: 'https://www.ambitionbox.com/salaries/software-engineer-salaries',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average: ₹7.2 LPA (Range: ₹3.0 LPA to ₹21.0 LPA across 400k+ reported profiles)',
          notes: 'Comprehensive aggregator across both Indian IT services companies and tech product startups.',
        },
        {
          sourceName: 'Glassdoor India — Software Engineer Salary Overview',
          verifiedUrl: 'https://www.glassdoor.co.in/Salaries/software-engineer-salary-SRCH_KO0,17.htm',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average Base Pay: ₹8.5 LPA (Typical range: ₹4.5 LPA – ₹20.0 LPA)',
          notes: 'Separates additional pay (cash bonus, stock) from base monthly salary based on employee disclosures.',
        },
        {
          sourceName: 'Indeed India — Software Engineer Market Insights',
          verifiedUrl: 'https://in.indeed.com/career/software-engineer/salaries',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average Base: ₹5.5 LPA (Fresher) to ₹13.0 LPA (Senior Level)',
          notes: 'Derived from tens of thousands of active job postings and employer compensation disclosures.',
        },
      ],
      compensationDeterminants: [
        'Company Business Model: Pure IT consulting & staff augmentation pays lower entry base than venture-funded product startups or foreign tech GCCs.',
        'Core Technical Breadth: Solid problem-solving in Data Structures, Algorithms (DSA), System Design, and modern web frameworks command high market premiums.',
        'Location: Tech hubs like Bengaluru, Hyderabad, and Gurugram offer 15–30% higher compensation than non-metro locations to offset living expenses.',
        'Negotiation & Multiple Offers: Candidates with multiple competing offers typically negotiate 20–40% higher joining base salaries.',
      ],
    },

    skillsAndQualifications: {
      essentialTechnicalSkills: [
        {
          name: 'Core Programming & Data Structures',
          whyEssential: 'The foundational building block needed to write efficient, clean, readable instructions for computers.',
          keyConcepts: ['Variables & Data Types', 'Loops & Conditionals', 'Arrays & Hash Maps', 'Functions & Recursion', 'Time Complexity (Big-O)'],
        },
        {
          name: 'Version Control with Git & GitHub',
          whyEssential: 'Modern software is written by teams. Git is mandatory to track versions, resolve conflicts, and contribute via pull requests.',
          keyConcepts: ['git clone/checkout', 'branching workflows', 'commit conventions', 'pull request reviews', 'merge conflict resolution'],
        },
        {
          name: 'Web Architecture & APIs',
          whyEssential: 'Connecting user interfaces to databases through robust, secure RESTful or GraphQL endpoints.',
          keyConcepts: ['HTTP methods (GET, POST, PUT, DELETE)', 'Status codes', 'JSON serialization', 'Authentication (JWT, OAuth)', 'CORS'],
        },
        {
          name: 'Relational & NoSQL Databases',
          whyEssential: 'Every application must store, query, and mutate state without corrupting user data.',
          keyConcepts: ['SQL queries & joins', 'Indexing & query plans', 'Primary/Foreign keys', 'Schema design', 'ACID transactions'],
        },
        {
          name: 'Automated Testing & Debugging',
          whyEssential: 'High-performing engineers write tests to catch errors before their users do in production.',
          keyConcepts: ['Unit testing (Jest, PyTest, JUnit)', 'Integration tests', 'Breakpoints & debugger tools', 'Log inspection'],
        },
      ],
      usefulAdditionalSkills: [
        {
          name: 'Docker & Containerization',
          description: 'Package applications with all their dependencies so code runs reliably on any machine or server.',
        },
        {
          name: 'Cloud Fundamentals (AWS / GCP / Azure)',
          description: 'Understanding object storage (S3), serverless functions, compute instances (EC2), and basic managed database hosting.',
        },
        {
          name: 'Basic CI/CD Automation',
          description: 'Configuring GitHub Actions to automatically run tests and lint checks whenever code is pushed.',
        },
        {
          name: 'Cybersecurity Best Practices',
          description: 'Defending against SQL injection, cross-site scripting (XSS), insecure deserialization, and secret leaks.',
        },
      ],
      communicationAndTeamwork: [
        {
          skill: 'Technical Writing & Documentation',
          howUsed: 'Writing clear READMEs, pull request descriptions, architecture decision records (ADRs), and bug reproduction steps.',
        },
        {
          skill: 'Constructive Code Reviews',
          howUsed: 'Critiquing peer code with empathy and clarity, focusing on readability and architecture rather than subjective styling arguments.',
        },
        {
          skill: 'Translating Technical Constraints to Non-Engineers',
          howUsed: 'Explaining to product managers and business stakeholders why a requested feature takes 2 weeks rather than 2 days without using alienating jargon.',
        },
      ],
      educationalBackgrounds: [
        {
          background: 'B.Tech / B.E. in Computer Science or IT',
          description: 'The most traditional on-campus recruitment route in India, covering operating systems, DBMS, networks, and theory of computation.',
          viability: 'Traditional High Hiring Volume on Campus',
        },
        {
          background: 'BCA / MCA / B.Sc Computer Science',
          description: 'Very strong foundation in practical programming and application development; increasingly hired on merit and technical interview rounds.',
          viability: 'Widely Accepted with Strong Portfolio',
        },
        {
          background: 'Non-CS Engineering (Mechanical, Civil, Electrical, Chemical)',
          description: 'Thousands of successful engineers transition into tech every year by self-studying programming, DSA, and building demonstrable web/mobile apps.',
          viability: 'Fully Viable in Product & Off-Campus Drives',
        },
      ],
      alternativeEntryRoutes: [
        {
          route: 'Open Source Contributions',
          recommendations: 'Find beginner-friendly repositories with "good first issue" tags. Submitting merged bug fixes shows employers real collaborative Git skills.',
        },
        {
          route: 'Building & Deploying 3 Full-Stack Independent Projects',
          recommendations: 'Do not build generic todo apps. Build complete apps with auth, database models, payment webhooks, and live URLs on Vercel/Render.',
        },
        {
          route: 'Internships at Early-Stage Startups',
          recommendations: 'Platforms like Wellfound (AngelList), Internshala, or cold DMing startup founders with a deployed project sample can unlock immediate practical experience.',
        },
      ],
      beginnerFriendlyTools: [
        {
          name: 'Visual Studio Code (VS Code)',
          cost: '100% Free & Open Source',
          startAction: 'Install VS Code with the Prettier and GitLens extensions to start writing and editing code locally.',
        },
        {
          name: 'GitHub & Git CLI',
          cost: '100% Free tier for public & private repos',
          startAction: 'Create a free GitHub account, install Git on your machine, and practice pushing your first local project repository.',
        },
        {
          name: 'Postman / Bruno',
          cost: 'Free tier available',
          startAction: 'Use Postman to test public APIs (like GitHub API or weather APIs) to understand JSON requests, headers, and HTTP responses.',
        },
      ],
    },

    careerGrowth: {
      progressionSummary:
        'Software engineering offers one of the most flexible career ladders in the modern economy. You do NOT have to become a people manager to reach high compensation and influence; companies support dual tracks for technical specialists (Individual Contributors) and engineering leadership.',
      dualLadderExplanation:
        'The dual-track model allows engineers who love coding, architecture, and system design to advance to Staff, Principal, and Fellow levels without ever managing direct reports, matching or exceeding management salaries.',
      individualContributorLadder: [
        {
          level: 'Associate / Junior Software Engineer (L1)',
          yoe: '0–2 Years',
          scope: 'Small, well-defined tasks (bug fixes, small endpoint features).',
          dailyFocus: 'Learning the codebase, writing unit tests, mastering Git workflows, and following established team design patterns.',
        },
        {
          level: 'Software Engineer (L2)',
          yoe: '2–4 Years',
          scope: 'Owns end-to-end features with moderate ambiguity.',
          dailyFocus: 'Designing database schemas, building complete APIs, reviewing junior pull requests, and operating in production independently.',
        },
        {
          level: 'Senior Software Engineer (L3)',
          yoe: '5–8 Years',
          scope: 'Owns full subsystem architecture and technical health across a squad.',
          dailyFocus: 'System design, unblocking teammates, planning technical migrations, optimizing performance, and handling critical production incidents.',
        },
        {
          level: 'Staff / Principal Engineer (L4+)',
          yoe: '8+ Years',
          scope: 'Cross-team, company-wide technical strategy.',
          dailyFocus: 'Architecting distributed systems, setting engineering-wide standards, evaluating new technologies, and mentoring senior engineers.',
        },
      ],
      managementLadder: [
        {
          level: 'Engineering Manager (EM)',
          yoe: '6–9 Years',
          scope: 'Directly manages a team of 5–10 engineers.',
          dailyFocus: '1-on-1 mentorship, career progression, hiring, sprint delivery velocity, and shielding engineers from organizational friction.',
        },
        {
          level: 'Director of Engineering',
          yoe: '10–14 Years',
          scope: 'Oversees multiple engineering teams across a business unit.',
          dailyFocus: 'Department headcount budgeting, organizational alignment, vendor procurement, and strategic product delivery.',
        },
        {
          level: 'Vice President of Engineering / CTO',
          yoe: '14+ Years',
          scope: 'Entire organization’s technology stack and engineering culture.',
          dailyFocus: 'Executive strategy, board-level reporting, security compliance, and long-term enterprise technology roadmap.',
        },
      ],
      lateralOrSpecialistTracks: [
        {
          trackName: 'DevOps / Platform / Site Reliability Engineer (SRE)',
          description: 'Focuses on cloud infrastructure, Kubernetes, CI/CD pipelines, uptime, and automated disaster recovery.',
          requiredPivotSkill: 'Infrastructure as Code (Terraform), Docker, Linux internals, cloud networking.',
        },
        {
          trackName: 'Mobile Application Engineer (iOS / Android / Flutter / React Native)',
          description: 'Specializes in native device capabilities, offline caching, smooth 60fps animations, and app store compliance.',
          requiredPivotSkill: 'Swift, Kotlin, or React Native state management and device lifecycle handling.',
        },
        {
          trackName: 'AI / Machine Learning Engineer',
          description: 'Bridges traditional software systems with large language models, vector embeddings, and machine learning inference pipelines.',
          requiredPivotSkill: 'Python, PyTorch/TensorFlow, model fine-tuning, embeddings, and API integration.',
        },
      ],
    },

    workEnvironments: {
      industries: [
        {
          industry: 'Fintech & Digital Payments',
          commonUseCases: 'UPI transactions, fraud detection algorithms, loan disbursement engines, stock trading systems.',
          hiringVolume: 'High (Demands rigorous accuracy and security)',
        },
        {
          industry: 'E-Commerce & Quick Commerce',
          commonUseCases: 'Inventory synchronization, real-time dispatch routing, search recommendation engines, checkout systems.',
          hiringVolume: 'High (High concurrency and distributed systems)',
        },
        {
          industry: 'Software-as-a-Service (B2B SaaS)',
          commonUseCases: 'Multi-tenant cloud architectures, analytics dashboards, collaboration tools, billing automations.',
          hiringVolume: 'Very High (Profitable, sustainable business models)',
        },
        {
          industry: 'Healthtech & Edtech',
          commonUseCases: 'Teleconsultation systems, electronic medical records, interactive video streaming, automated grading.',
          hiringVolume: 'Moderate',
        },
      ],
      companyArchetypes: [
        {
          archetype: 'Global Capability Centers (GCCs) & Multinationals',
          environmentStyle: 'Structured processes, international stakeholders, modern tech stacks, strong work-life balance.',
          compStyle: 'High base pay, generous benefits, corporate bonuses.',
          whatToExpect: 'Clear documentation, specialized task ownership, formal appraisal cycles.',
        },
        {
          archetype: 'Venture-Backed Product Startups (Series A–D / Unicorns)',
          environmentStyle: 'Fast-paced, high autonomy, rapid iteration, shifting sprint priorities.',
          compStyle: 'Competitive cash base plus valuable stock option potential (ESOPs).',
          whatToExpect: 'Steep learning curve, direct business impact, occasional long hours before major product launches.',
        },
        {
          archetype: 'IT Services & Consulting Enterprises',
          environmentStyle: 'Large client projects, structured training academies, bench systems, process-driven delivery.',
          compStyle: 'Modest fresher entry base, stable yearly increments, on-site travel opportunities.',
          whatToExpect: 'Project assignment depends on client demands; great place to learn enterprise delivery processes.',
        },
      ],
      typicalSquadStructure:
        'A standard engineering squad usually consists of 1 Product Manager, 1 UX/Product Designer, 3–5 Software Engineers (Frontend, Backend, or Fullstack), 1 QA Engineer, and a shared DevOps specialist.',
      employerExamplesNotice:
        'Employer names are illustrative examples of established organizations in the Indian tech ecosystem and do NOT imply current hiring or active affiliation.',
      employerExamples: [
        { name: 'Tata Consultancy Services (TCS) / Infosys / Wipro', sector: 'Global IT Services & Enterprise Solutions' },
        { name: 'Swiggy / Zomato / Zepto', sector: 'High-Scale Quick Commerce & Logistics' },
        { name: 'Razorpay / Zerodha / PhonePe', sector: 'Fintech, Payments & Wealth Infrastructure' },
        { name: 'Postman / BrowserStack / Freshworks', sector: 'Developer Tooling & Global B2B SaaS' },
        { name: 'Google / Microsoft / Amazon (India Development Centers)', sector: 'Global Technology Centers' },
      ],
    },

    advantagesAndChallenges: {
      keyAdvantages: [
        {
          title: 'High Career Mobility & Global Demand',
          explanation: 'Code is universal. Software engineering skills apply across virtually every industry and geography worldwide.',
        },
        {
          title: 'Remote & Hybrid Flexibility',
          explanation: 'Software engineering is one of the most remote-friendly professions in the world, allowing substantial work location flexibility.',
        },
        {
          title: 'Tangible Builder Satisfaction',
          explanation: 'Few things equal the rush of writing lines of code, running tests, deploying to production, and seeing real humans use your feature seconds later.',
        },
        {
          title: 'Clear Meritocracy & Open Knowledge',
          explanation: 'Virtually all software knowledge is free online. You don’t need gatekeepers to learn programming, build apps, and prove your capabilities.',
        },
      ],
      realChallenges: [
        {
          title: 'Debugging Frustration & Ambiguity',
          challenge: 'You will spend hours or days stuck on a bug caused by a single misplaced character or unhandled null pointer.',
          howToCope: 'Learn systematic isolation techniques, write tests, take short walks to clear your mind, and learn to love the detective puzzle.',
        },
        {
          title: 'Continuous Tech Churn',
          challenge: 'Frameworks and libraries change constantly. What was standard 4 years ago might be outdated today.',
          howToCope: 'Focus on enduring fundamentals (data structures, HTTP, database design, OS concepts) which never go out of style.',
        },
        {
          title: 'On-Call & Production Pressure',
          challenge: 'If a payment pipeline or login service breaks at 2:00 AM on Saturday, engineers may need to jump on an incident bridge.',
          howToCope: 'Build automated alarms, defensive fallback mechanisms, and work for teams with mature blameless post-mortem cultures.',
        },
      ],
      candidSelfAssessmentQuestions: [
        'Do you enjoy solving logic puzzles or tracking down why a puzzle piece isn’t fitting?',
        'Can you sit through 2 hours of confusion when something isn’t working without giving up in frustration?',
        'Do you prefer knowing the mechanical "how" behind how digital applications work?',
        'Are you willing to keep reading documentation and learning new tools throughout your career?',
      ],
    },

    howToEnter: {
      roadmapSteps: [
        {
          stepNumber: 1,
          title: 'Master One Core Language & Fundamental Logic (Weeks 1–4)',
          estimatedDuration: '4–6 Weeks',
          actionChecklist: [
            'Pick ONE language to start: JavaScript/TypeScript or Python.',
            'Master data types, loops, arrays, objects, functions, and string manipulation.',
            'Solve 40–50 beginner algorithmic problems on free platforms (Codewars, LeetCode Easy, HackerRank).',
            'Learn how to read terminal errors and use the browser console or language debugger.',
          ],
          portfolioHighlight: 'A clean command-line simulation program (e.g., student loan calculator or budget planner) with comprehensive test cases.',
          pitfallToAvoid: 'Do not jump between 4 languages in your first month. Mastery of one language translates easily to others later.',
        },
        {
          stepNumber: 2,
          title: 'Learn Web Fundamentals & Version Control (Weeks 5–8)',
          estimatedDuration: '4 Weeks',
          actionChecklist: [
            'Learn Git commands: init, clone, add, commit, branch, merge, push, pull.',
            'Create a professional GitHub profile with clear READMEs on all repositories.',
            'Understand how HTTP works: client-server model, REST APIs, JSON data transfer.',
            'Build responsive frontends using HTML, modern CSS / Tailwind, and React.',
          ],
          portfolioHighlight: 'A deployed responsive web application that fetches data from an open public API (e.g., GitHub, Weather, or Open Library).',
          pitfallToAvoid: 'Never leave GitHub commits empty or commit files without a descriptive commit message.',
        },
        {
          stepNumber: 3,
          title: 'Full-Stack Integration with Databases (Weeks 9–14)',
          estimatedDuration: '6 Weeks',
          actionChecklist: [
            'Build backend servers using Node.js/Express or Python/FastAPI.',
            'Model relational databases using PostgreSQL or SQLite (tables, primary keys, foreign keys).',
            'Implement user authentication with JWT or OAuth sessions.',
            'Implement server-side input validation and error handling.',
          ],
          portfolioHighlight: 'A production-deployed full-stack web application with authentication, database storage, and a live URL hosted on Vercel or Render.',
          pitfallToAvoid: 'Avoid building trivial tutorial clones that 10,000 other applicants have. Add a unique domain feature (e.g., local campus club manager).',
        },
        {
          stepNumber: 4,
          title: 'DSA Preparation & Code Quality Polishing (Weeks 15–18)',
          estimatedDuration: '4 Weeks',
          actionChecklist: [
            'Practice common interview patterns: Two Pointers, Sliding Window, Binary Search, Hash Maps, Tree Traversals.',
            'Review clean code principles: modular functions, descriptive variable names, eliminating code duplication.',
            'Add automated unit testing with Jest or PyTest to your portfolio projects.',
          ],
          portfolioHighlight: 'All portfolio repositories have passing automated test suites and clean documentation on how to run locally in 2 commands.',
          pitfallToAvoid: 'Do not ignore time and space complexity explanations when answering coding questions.',
        },
        {
          stepNumber: 5,
          title: 'Resume Crafting, Networking & Applying (Weeks 19+)',
          estimatedDuration: 'Ongoing',
          actionChecklist: [
            'Format a 1-page resume highlighting live project URLs, GitHub repos, and specific technical impact.',
            'Connect with 5 software engineers per week on LinkedIn with personalized notes asking about their team’s tech stack.',
            'Apply to entry-level roles and internships on Wellfound, LinkedIn, and company career portals.',
            'Practice mock behavioral and technical coding interviews with peers.',
          ],
          portfolioHighlight: 'A clean 1-page developer portfolio site with direct links to your GitHub and live demos.',
          pitfallToAvoid: 'Do not send generic resumes. Tailor your resume summary to the tech stack listed in the job description.',
        },
      ],
      interviewPreparation: {
        interviewStages: [
          {
            stage: '1. Online Assessment (OA)',
            focus: 'Algorithmic problem-solving (DSA), data structures, and foundational computer science MCQs.',
            preparationAdvice: 'Practice timed coding sessions on LeetCode/HackerRank. Focus on getting clean working code before premature optimization.',
          },
          {
            stage: '2. Technical Coding Round (Live DSA / Problem Solving)',
            focus: 'Solving 1–2 algorithmic problems live with an engineer while verbalizing your thought process.',
            preparationAdvice: 'Always talk out loud! Clarify edge cases before typing code. State brute-force solution first, then optimize time/space complexity.',
          },
          {
            stage: '3. Machine Coding / Practical Project Round',
            focus: 'Building or debugging a functional application module in 90–120 minutes with clean architecture.',
            preparationAdvice: 'Practice setting up boilerplate web projects rapidly and creating modular folder structures with test cases.',
          },
          {
            stage: '4. System Architecture & Project Deep-Dive',
            focus: 'Discussing the technical decisions, database schemas, and performance trade-offs of your portfolio projects.',
            preparationAdvice: 'Be ready to explain every single line of code in your resume projects, including what you would do differently in hindsight.',
          },
          {
            stage: '5. Behavioral & Culture Fit Round',
            focus: 'Teamwork, dealing with conflict, learning from mistakes, and communication style.',
            preparationAdvice: 'Use the STAR method (Situation, Task, Action, Result) to share real stories of team projects, debugging challenges, and deadline pressures.',
          },
        ],
        portfolioOrResumeAdvice: [
          'Every project listed on your resume MUST have a working live demo link and a public GitHub link.',
          'Write bullet points highlighting what YOU built and the measurable outcome (e.g., "Engineered REST API with 12 endpoints and PostgreSQL database, achieving <100ms response time").',
          'Include a clear "Technical Skills" section grouped into Languages, Frameworks, Databases, and Developer Tools.',
        ],
      },
    },
  },

  // =========================================================================
  // 2. DATA ANALYST
  // =========================================================================
  'data-analyst': {
    careerId: 'data-analyst',
    title: 'Data Analyst',
    shortTitle: 'Data Analyst',
    heroTagline: 'Extract, clean, query, visualize, and translate business data into actionable strategic decisions.',
    lastUpdated: 'October 2024 (Verified Market Benchmarks)',

    overview: {
      plainLanguageSummary:
        'A Data Analyst is a commercial detective. Organizations collect billions of raw data points every day — user clicks, sales orders, payment failures, delivery times, and inventory levels. Without an analyst, this is just digital noise. A Data Analyst inspects this data with SQL and spreadsheets, spots trends, identifies root causes of problems, and presents clear recommendations that help executives, marketing teams, and operations managers make confident choices.',
      coreProblemsSolved: [
        {
          problem: 'Discovering the "Why" Behind Business Drops',
          description:
            'When revenue falls by 14% or customer signups slow down, the data analyst investigates the data to reveal exactly which demographic, region, or step in the checkout funnel failed.',
        },
        {
          problem: 'Measuring the True Impact of Changes (A/B Testing)',
          description:
            'Determining whether a new discount promotion, website redesign, or operational policy actually drove higher value or if the change was just random chance.',
        },
        {
          problem: 'Auditing Operational Bottlenecks',
          description:
            'Identifying why student loan applications are taking 9 days instead of 2 days to get approved by analyzing step-by-step transaction timestamps.',
        },
        {
          problem: 'Democratizing Data with Self-Service Dashboards',
          description:
            'Building live, automated reports in Power BI or Tableau so team managers can monitor daily KPIs without having to write SQL queries themselves.',
        },
      ],
      businessContribution:
        'Data Analysts save companies millions of rupees by preventing costly guesswork. They replace "I think" with "the data shows." By identifying which marketing channels yield the highest return, which customers are at risk of churning, and where operational waste occurs, analysts directly influence profitability and strategic growth.',
      commonMisconceptions: [
        {
          myth: 'Data Analysts just create pretty charts all day.',
          reality:
            'Creating the final chart is only 15% of the work. Up to 70% of an analyst’s time is spent hunting for raw data, writing complex SQL queries with joins, and painstakingly cleaning mismatched or duplicate records.',
        },
        {
          myth: 'You must have a PhD in Advanced Statistics or Machine Learning.',
          reality:
            'Most business data analysis requires practical descriptive statistics (means, medians, percentiles, variance, cohort breakdowns) and sharp business intuition rather than deep neural network mathematics.',
        },
        {
          myth: 'Data analysis is entirely automated by AI now.',
          reality:
            'AI can write a quick SQL snippet, but AI does not know which database column has messy corrupt data, why sales dipped during a local festival, or how to convince an executive to change strategy.',
        },
        {
          myth: 'Data Analyst and Data Scientist are the exact same role.',
          reality:
            'Data Analysts focus on explaining what happened and recommending business actions using SQL, BI tools, and data modeling. Data Scientists build predictive machine learning algorithms to automate automated future decisions.',
        },
      ],
    },

    actualWork: {
      dailyResponsibilities: [
        'Writing and optimizing SQL queries to extract data from enterprise data warehouses (Snowflake, BigQuery, PostgreSQL).',
        'Cleaning raw, messy datasets: handling null values, deduplicating records, parsing timestamps, and standardizing categorical fields.',
        'Building, updating, and maintaining interactive executive dashboards in tools like Power BI, Tableau, or Metabase.',
        'Conducting exploratory data analysis (EDA) to answer urgent questions from department heads and business leaders.',
        'Writing concise, plain-English analytical memos summarizing what the metrics mean and recommending 2–3 actionable next steps.',
        'Validating data integrity and setting up automated data sanity alerts to flag anomalies before leadership sees incorrect numbers.',
      ],
      realWorkplaceTaskExamples: [
        {
          scenario: 'E-Commerce Return Rate Spike',
          typicalAction:
            'Fashion returns surge by 22% in North India. The analyst queries order and customer review tables, joining return reason codes with vendor IDs, and discovers that 3 specific shoe suppliers had inaccurate size charts listed on the app.',
          tangibleDeliverable:
            'A 1-page executive memo and dashboard drill-down showing return rate by vendor, leading to an immediate update of the size chart and saving ₹18 lakhs in monthly logistics costs.',
        },
        {
          scenario: 'Student Aid Disbursement Bottleneck',
          typicalAction:
            'College students complain about delays in emergency aid. The analyst pulls application timestamps across four stages, computes median turnaround times, and identifies a 7-day documentation verification backlog in the financial office.',
          tangibleDeliverable:
            'Cohort analysis report recommending a fast-track automated approval path for low-risk applications under ₹5,000.',
        },
        {
          scenario: 'Subscription Churn Cohort Analysis',
          typicalAction:
            'The marketing director wants to know why month-2 user retention dropped. The analyst uses SQL window functions to calculate retention curves across signup channels, discovering that users acquired via discount popups churn 3x faster than organic users.',
          tangibleDeliverable:
            'A Tableau cohort retention heatmap and recommendations to reallocate ad spend to high-intent channels.',
        },
      ],
      toolsAndTechnologies: [
        {
          category: 'Querying & Databases',
          tools: ['SQL (PostgreSQL, MySQL)', 'Google BigQuery', 'Snowflake'],
          purpose: 'Extracting data, filtering, joining multiple tables, writing CTEs, and calculating window functions.',
        },
        {
          category: 'Spreadsheets',
          tools: ['Microsoft Excel (Advanced)', 'Google Sheets'],
          purpose: 'Pivot tables, XLOOKUP, data modeling, quick financial calculations, and sharing lightweight sheets with managers.',
        },
        {
          category: 'Business Intelligence & Visualization',
          tools: ['Power BI (DAX)', 'Tableau', 'Metabase', 'Looker Studio'],
          purpose: 'Designing interactive multi-page dashboards with filters, drill-downs, and automated refresh schedules.',
        },
        {
          category: 'Programming & Automation',
          tools: ['Python (Pandas, NumPy, Matplotlib, Seaborn)', 'Jupyter Notebooks'],
          purpose: 'Advanced data wrangling, automation scripts for repetitive reports, and statistical distributions.',
        },
        {
          category: 'Version Control & Documentation',
          tools: ['Git / GitHub', 'dbt (data build tool)', 'Notion / Confluence'],
          purpose: 'Version controlling SQL transformation scripts, managing data dictionaries, and documenting metric definitions.',
        },
      ],
      crossFunctionalCollaboration: [
        {
          collaborator: 'Business & Department Heads (Sales, Marketing, Operations)',
          dynamic:
            'They bring business questions (e.g., "Why did CAC rise?"). The analyst clarifies the question, defines the metric, and presents visual findings.',
          frequency: 'Daily to weekly project reviews',
        },
        {
          collaborator: 'Data Engineers',
          dynamic:
            'Data engineers build the pipelines and data warehouses. Analysts request new tables, report missing pipeline events, and suggest schema improvements.',
          frequency: 'Weekly sprint planning & ad-hoc data requests',
        },
        {
          collaborator: 'Product Managers',
          dynamic:
            'Analysts define tracking event specs for new app features and analyze A/B experiment test results to decide whether to roll out features.',
          frequency: 'Multiple times per sprint',
        },
        {
          collaborator: 'Financial Planning & Analysis (FP&A)',
          dynamic:
            'Collaborating on revenue reconciliations, unit economics, forecasting, and budget variance analyses.',
          frequency: 'Monthly and quarterly close periods',
        },
      ],
      illustrativeDaySchedule: {
        scheduleNote:
          'Note: This schedule is an illustrative example of an in-office/hybrid analytics workday. Meeting loads and ad-hoc analysis requests vary across companies.',
        timeline: [
          {
            time: '09:30 AM – 10:00 AM',
            activity: 'Checking automated dashboard refresh logs, reviewing key operational numbers from yesterday, and triaging morning data requests.',
            category: 'review',
          },
          {
            time: '10:00 AM – 10:30 AM',
            activity: 'Cross-functional standup with the Growth & Marketing team to align on current campaign performance metrics.',
            category: 'collaboration',
          },
          {
            time: '10:30 AM – 01:00 PM',
            activity: 'Deep Analysis Block: Writing advanced SQL queries using CTEs and window functions to investigate customer churn patterns in BigQuery.',
            category: 'deep-work',
          },
          {
            time: '01:00 PM – 02:00 PM',
            activity: 'Lunch and team catch-up.',
            category: 'planning',
          },
          {
            time: '02:00 PM – 03:30 PM',
            activity: 'Dashboard Building: Updating the Power BI executive reporting suite with new DAX measures and verifying number accuracy against raw database tables.',
            category: 'deep-work',
          },
          {
            time: '03:30 PM – 04:30 PM',
            activity: 'Business Insight Presentation: Walking the VP of Operations through a 5-slide deck explaining why processing bottlenecks occurred last week.',
            category: 'collaboration',
          },
          {
            time: '04:30 PM – 05:30 PM',
            activity: 'Documentation & Data Cataloging: Updating metric definitions in the team data dictionary and planning tomorrow’s query optimizations.',
            category: 'review',
          },
        ],
      },
    },

    salaryData: {
      disclaimer:
        'Data Analyst compensation in India varies markedly based on technical depth (SQL + Python + BI vs basic Excel only), company business model (IT/BPO services vs venture-backed product startups vs global investment banks), city, and analytical communication skills. All numbers are indicative estimates from verified public portals.',
      compensationContext:
        'Salaries in India are presented as annual CTC (Cost to Company). In analytics, base salary accounts for 80–90% of total cash, with the remainder composed of performance bonuses and standard statutory retiral benefits (EPF/Gratuity). Analysts who master SQL and business storytelling typically secure the top quartile of compensation.',
      entryLevel: {
        experienceLabel: 'Entry-Level / Fresher (0–2 Years)',
        indicativeRangeLpa: '₹3.5 Lakhs – ₹8.5 Lakhs per annum',
        monthlyEstimateInHand: '₹25,000 – ₹58,000 / month (approx. fixed)',
        baseVsTotalBreakdown:
          'Service-based IT firms & KPOs (Genpact, WNS, TCS): ₹3.2 – ₹4.8 LPA. Funded startups and mid-size product companies: ₹5.5 – ₹8.5 LPA. Global investment banking analytics centers: ₹8.0 – ₹12.0 LPA.',
        variationFactors:
          'Proficiency in writing multi-table SQL queries, portfolio projects analyzing real-world messy datasets, and degree discipline (Math, Economics, Engineering, Commerce).',
      },
      midLevel: {
        experienceLabel: 'Mid-Level Data Analyst (2–5 Years)',
        indicativeRangeLpa: '₹7.0 Lakhs – ₹16.0 Lakhs per annum',
        monthlyEstimateInHand: '₹48,000 – ₹1,10,000 / month (approx. fixed)',
        baseVsTotalBreakdown:
          'Service-based & IT consulting: ₹6.5 – ₹10.5 LPA. High-growth product tech firms (Fintech, E-commerce, SaaS): ₹11.0 – ₹18.0 LPA CTC (Base + performance bonus).',
        variationFactors:
          'Ability to own end-to-end data modeling (dbt), advanced dashboard design (Power BI/Tableau), and independent translation of complex data into executive recommendations.',
      },
      seniorLevel: {
        experienceLabel: 'Senior Data Analyst / Analytics Lead (5+ Years)',
        indicativeRangeLpa: '₹14.0 Lakhs – ₹32.0+ Lakhs per annum',
        monthlyEstimateInHand: '₹95,000 – ₹2,10,000+ / month (approx. fixed)',
        baseVsTotalBreakdown:
          'Enterprise IT services: ₹12 – ₹18 LPA. Top tier product companies, Unicorns, and Global Tech Centers: ₹22 – ₹40+ LPA CTC (with ESOPs/stocks).',
        variationFactors:
          'Cross-departmental stakeholder influence, predictive statistical modeling, data warehouse architecture guidance, and mentoring junior analysts.',
      },
      verifiedSources: [
        {
          sourceName: 'AmbitionBox India — Data Analyst Salaries',
          verifiedUrl: 'https://www.ambitionbox.com/salaries/data-analyst-salaries',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average: ₹5.6 LPA (Range: ₹2.5 LPA to ₹13.0 LPA based on 100k+ reported salaries)',
          notes: 'Detailed company-by-company salary breakdown covering Bangalore, Mumbai, Gurgaon, Pune, and Hyderabad.',
        },
        {
          sourceName: 'Glassdoor India — Data Analyst Salary Portal',
          verifiedUrl: 'https://www.glassdoor.co.in/Salaries/data-analyst-salary-SRCH_KO0,12.htm',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average Base Pay: ₹6.5 LPA (Typical range: ₹3.5 LPA – ₹14.0 LPA)',
          notes: 'Reports total compensation including cash bonuses and annual profit sharing.',
        },
        {
          sourceName: 'Indeed India — Data Analyst Compensation Overview',
          verifiedUrl: 'https://in.indeed.com/career/data-analyst/salaries',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average Salary: ₹5.2 LPA (Fresher: ₹3.6 LPA; Senior: ₹10.5+ LPA)',
          notes: 'Based on salary submissions from verified employees and job listings in India.',
        },
      ],
      compensationDeterminants: [
        'SQL Fluency: Candidates who write clean, performant SQL with joins, CTEs, and aggregation under live interview pressure earn substantially higher offers.',
        'Business Acumen: Knowing what metrics actually matter to an executive (CAC, LTV, Churn, Contribution Margin) separates top analysts from button-pushers.',
        'Data Visualization Craft: Designing intuitive, non-cluttered dashboards that business teams actually use every day.',
        'Scripting Skills: Adding Python or R for automated data wrangling boosts mid-career earning potential by 25–40%.',
      ],
    },

    skillsAndQualifications: {
      essentialTechnicalSkills: [
        {
          name: 'SQL (Structured Query Language)',
          whyEssential: 'The universal language of data. Every serious company stores records in relational databases; SQL is non-negotiable.',
          keyConcepts: ['SELECT, WHERE, GROUP BY, HAVING', 'INNER, LEFT, RIGHT, FULL OUTER JOINs', 'Aggregate functions (COUNT, SUM, AVG)', 'Common Table Expressions (WITH clauses)', 'Window functions (ROW_NUMBER, RANK, LEAD, LAG)'],
        },
        {
          name: 'Advanced Microsoft Excel & Google Sheets',
          whyEssential: 'The fastest tool for quick data modeling, ad-hoc calculations, and presenting numbers to business stakeholders.',
          keyConcepts: ['XLOOKUP & INDEX/MATCH', 'Pivot Tables & Pivot Charts', 'Conditional formatting', 'Logical formulas (IF, AND, OR, SUMIFS)', 'Data validation'],
        },
        {
          name: 'Business Intelligence Dashboards (Power BI or Tableau)',
          whyEssential: 'Automating visual reporting so managers can monitor operations in real-time.',
          keyConcepts: ['Data modeling & relationships', 'DAX calculations / Calculated fields', 'Interactive filters & slicers', 'Visual design principles & chart selection'],
        },
        {
          name: 'Data Cleaning & Hygiene',
          whyEssential: 'Garbage in, garbage out. Real-world data is notoriously incomplete, duplicated, and inconsistent.',
          keyConcepts: ['Handling null/missing values', 'Deduplication strategies', 'Date and timestamp parsing', 'Data type conversions', 'Anomaly detection'],
        },
        {
          name: 'Core Practical Statistics',
          whyEssential: 'Understanding distributions, avoiding misleading averages, and accurately interpreting customer experiments.',
          keyConcepts: ['Mean vs Median vs Mode', 'Standard deviation & variance', 'Percentiles & quartiles', 'Correlation vs Causation', 'A/B testing sample size & p-values'],
        },
      ],
      usefulAdditionalSkills: [
        {
          name: 'Python for Data Analysis (Pandas & NumPy)',
          description: 'Writing scripts to clean large datasets that crash Excel and automating repetitive weekly spreadsheets.',
        },
        {
          name: 'dbt (Data Build Tool)',
          description: 'Transforming raw database data into clean, tested analytics models directly inside the cloud data warehouse.',
        },
        {
          name: 'Cloud Data Warehouses (BigQuery / Snowflake)',
          description: 'Navigating partitioned tables, optimizing query scanning costs, and working with petabyte-scale datasets.',
        },
      ],
      communicationAndTeamwork: [
        {
          skill: 'Data Storytelling & Executive Presentation',
          howUsed: 'Translating complex query numbers into 3 clear bullets that a busy Chief Operating Officer can understand in 60 seconds.',
        },
        {
          skill: 'Curiosity & Active Business Questioning',
          howUsed: 'Asking managers "What specific decision will you make if this metric is up vs down?" before writing a single line of SQL.',
        },
        {
          skill: 'Intellectual Honesty & Objectivity',
          howUsed: 'Reporting the objective truth even when the numbers show that an executive’s favorite marketing campaign failed.',
        },
      ],
      educationalBackgrounds: [
        {
          background: 'Any Bachelor’s Degree (B.Com, BBA, B.Sc, B.Tech, Economics)',
          description: 'Data analytics is one of the most egalitarian tech fields. Candidates with Commerce, Economics, Mathematics, or Engineering degrees excel.',
          viability: 'Extremely High Accessibility',
        },
        {
          background: 'Mathematics / Statistics / Economics Specialization',
          description: 'Provides strong intuition for quantitative thinking, probability distributions, and metric construction.',
          viability: 'Strong Analytical Advantage',
        },
        {
          background: 'Self-Taught / Career Transitioners',
          description: 'Professionals from sales, customer service, or operations who master SQL and build a public portfolio frequently transition into analytics.',
          viability: 'Fully Viable with Demonstrated Projects',
        },
      ],
      alternativeEntryRoutes: [
        {
          route: 'Internal Lateral Transfer',
          recommendations: 'Start in customer support, operations, or sales. Learn SQL in your spare time and start building automated reports for your current manager.',
        },
        {
          route: 'Public Portfolio of Real-World Case Studies',
          recommendations: 'Analyze open public datasets (Kaggle, data.gov.in, RBI data). Write a public LinkedIn article or GitHub repo explaining the findings.',
        },
        {
          route: 'Junior / Trainee Analyst Programs',
          recommendations: 'Apply for entry-level analyst internships at boutique consulting firms, marketing agencies, and analytics service providers.',
        },
      ],
      beginnerFriendlyTools: [
        {
          name: 'PostgreSQL or SQLite (with DB Browser)',
          cost: '100% Free & Open Source',
          startAction: 'Download SQLite and load sample CSV datasets to practice SELECT, WHERE, and GROUP BY queries locally.',
        },
        {
          name: 'Google Sheets',
          cost: '100% Free with Google Account',
          startAction: 'Import raw transaction data and practice building Pivot Tables and XLOOKUP formulas.',
        },
        {
          name: 'Power BI Desktop',
          cost: '100% Free on Windows for desktop development',
          startAction: 'Download Power BI Desktop, connect to an Excel sheet, and design your first 3-card operational dashboard.',
        },
      ],
    },

    careerGrowth: {
      progressionSummary:
        'Data Analysts have tremendous career breadth. Because analysts understand the core business numbers better than almost anyone else, they can grow into senior analytics leaders, pivot into product management, or specialize into machine learning and data science.',
      dualLadderExplanation:
        'You can advance as an Individual Contributor (Principal Analyst) solving high-stakes commercial modeling problems, or move into people leadership as an Analytics Manager or Head of Business Intelligence.',
      individualContributorLadder: [
        {
          level: 'Junior Data Analyst (L1)',
          yoe: '0–2 Years',
          scope: 'Assists with ad-hoc SQL pulls and standard dashboard maintenance.',
          dailyFocus: 'Executing SQL queries, updating weekly reports, cleaning datasets, and learning company business metrics.',
        },
        {
          level: 'Data Analyst (L2)',
          yoe: '2–4 Years',
          scope: 'Owns analytics for an entire department (e.g., Marketing or Logistics).',
          dailyFocus: 'Designing comprehensive dashboards, investigating performance anomalies, and presenting findings directly to team leads.',
        },
        {
          level: 'Senior Data Analyst (L3)',
          yoe: '5–7 Years',
          scope: 'Leads complex cross-departmental strategic studies.',
          dailyFocus: 'Hypothesis testing, pricing strategy, customer lifetime value modeling, and mentoring junior analysts.',
        },
        {
          level: 'Lead / Principal Analyst (L4+)',
          yoe: '8+ Years',
          scope: 'Enterprise-wide analytical strategy and executive advisement.',
          dailyFocus: 'Defining company-wide metric standards, advising C-suite executives on strategic bets, and evaluating data tooling.',
        },
      ],
      managementLadder: [
        {
          level: 'Analytics Manager',
          yoe: '6–9 Years',
          scope: 'Manages a team of 4–8 data analysts.',
          dailyFocus: 'Prioritizing data requests from business heads, ensuring quality standards, hiring, and team coaching.',
        },
        {
          level: 'Head of Analytics / Director of BI',
          yoe: '10–14 Years',
          scope: 'Oversees the entire corporate business intelligence and analytics function.',
          dailyFocus: 'Data governance, modern data stack investments, cross-functional alignment, and budgeting.',
        },
        {
          level: 'Chief Data Officer (CDO) / VP of Data',
          yoe: '14+ Years',
          scope: 'Overall enterprise data asset strategy, monetization, and compliance.',
          dailyFocus: 'Executive board advisory, data privacy regulations, enterprise AI readiness, and company-wide digital transformation.',
        },
      ],
      lateralOrSpecialistTracks: [
        {
          trackName: 'Product Analyst',
          description: 'Works inside product engineering squads analyzing feature funnels, user drop-offs, and A/B experiments.',
          requiredPivotSkill: 'Amplitude/Mixpanel, user event instrumentation, experiment sample sizing.',
        },
        {
          trackName: 'Analytics Engineer',
          description: 'Bridges data engineering and data analysis by building clean data models using dbt and modern cloud warehouses.',
          requiredPivotSkill: 'dbt, data modeling (Kimball dimensional modeling), Git, Jinja SQL.',
        },
        {
          trackName: 'Data Scientist / ML Practitioner',
          description: 'Applies predictive statistical models and machine learning algorithms to forecast outcomes.',
          requiredPivotSkill: 'Python, Scikit-learn, statistical hypothesis testing, feature engineering.',
        },
      ],
    },

    workEnvironments: {
      industries: [
        {
          industry: 'E-Commerce & Quick Delivery (B2C)',
          commonUseCases: 'Basket size analysis, delivery turnaround optimization, pricing elasticity, customer retention.',
          hiringVolume: 'Extremely High',
        },
        {
          industry: 'Banking, Financial Services & Insurance (BFSI)',
          commonUseCases: 'Credit risk modeling, loan default prediction, fraud detection, wealth portfolio analytics.',
          hiringVolume: 'High (High stability and established corporate hiring)',
        },
        {
          industry: 'B2B Software (SaaS)',
          commonUseCases: 'Monthly Recurring Revenue (MRR) tracking, net revenue retention (NRR), customer health scoring.',
          hiringVolume: 'High (Demands strong metric rigor)',
        },
        {
          industry: 'Telecommunications & Media Streaming',
          commonUseCases: 'Subscriber churn modeling, content recommendation analytics, network usage trends.',
          hiringVolume: 'Moderate to High',
        },
      ],
      companyArchetypes: [
        {
          archetype: 'Global Banks & Capability Centers (GCCs)',
          environmentStyle: 'Strict data security compliance, enterprise data warehouses, structured training programs.',
          compStyle: 'Generous fixed base salary, annual performance bonuses, great benefits.',
          whatToExpect: 'Specialized focus on a specific business domain, formal corporate hierarchies.',
        },
        {
          archetype: 'High-Growth Tech Startups',
          environmentStyle: 'Fast, informal, messy raw datasets, direct collaboration with founders and executives.',
          compStyle: 'Competitive cash base plus equity options (ESOPs).',
          whatToExpect: 'You will wear multiple hats: data cleaning, pipeline writing, dashboard building, and business strategy.',
        },
        {
          archetype: 'Analytics & Management Consultancies',
          environmentStyle: 'Client-facing presentations, rotating across multiple client industries every 6 months.',
          compStyle: 'Standard industry entry pay with steep merit-based increases.',
          whatToExpect: 'Intense learning curve, high polish on slide decks and executive presentation skills.',
        },
      ],
      typicalSquadStructure:
        'A data analyst typically sits embedded within a business function (e.g., Growth Marketing or Operations) or within a centralized Business Intelligence guild that services requests from multiple departments.',
      employerExamplesNotice:
        'Employer names are illustrative examples of established organizations in the Indian tech ecosystem and do NOT imply current hiring or active affiliation.',
      employerExamples: [
        { name: 'Flipkart / Amazon India / Myntra', sector: 'E-Commerce & Consumer Tech' },
        { name: 'HDFC Bank / ICICI / Axis Bank', sector: 'Retail Banking & Financial Analytics' },
        { name: 'Swiggy / Zomato', sector: 'Hyperlocal Logistics & Food Tech' },
        { name: 'Mu Sigma / Fractal Analytics / LatentView', sector: 'Pure-Play Analytics Consultancies' },
        { name: 'American Express / JP Morgan / Barclays (India GCCs)', sector: 'Global Financial Centers' },
      ],
    },

    advantagesAndChallenges: {
      keyAdvantages: [
        {
          title: 'Direct Influence on Strategic Decisions',
          explanation: 'Unlike roles buried deep in code layers, data analysts sit in the room with decision makers and directly shape the company’s direction.',
        },
        {
          title: 'Low Barrier to Entry',
          explanation: 'You do not need a computer science degree. Any student with curiosity, logical thinking, and SQL skills can secure an analyst job.',
        },
        {
          title: 'Diverse Career Pivot Opportunities',
          explanation: 'Data analysts build a comprehensive understanding of business operations, making it easy to pivot into Product Management, Strategy, or Data Science.',
        },
        {
          title: 'Evergreen Market Demand',
          explanation: 'Every organization creates data, but few know how to make sense of it. The demand for clear analytical communicators continues to outpace supply.',
        },
      ],
      realChallenges: [
        {
          title: 'Messy, Broken, Missing Data',
          challenge: 'Real-world data rarely matches neat textbook examples. Dates are in wrong timezones, tracking events fail, and records have nulls.',
          howToCope: 'Learn robust data cleaning techniques, audit upstream tracking schemas, and always cross-check total row counts against source truth.',
        },
        {
          title: 'Vague Stakeholder Requests',
          challenge: 'A manager will say "Can you just look into the numbers and see what is going on?" without defining what question they need answered.',
          howToCope: 'Master stakeholder questioning: ask what business problem they are trying to solve and what specific action they will take with the answer.',
        },
        {
          title: 'Confirmation Bias Pressure',
          challenge: 'Stakeholders often want data to prove their existing theory rather than uncover what is actually happening.',
          howToCope: 'Maintain professional integrity by separating factual observations from hypotheses and transparently showing confidence intervals.',
        },
      ],
      candidSelfAssessmentQuestions: [
        'Do you enjoy looking at a spreadsheet or table and asking: "Why is this number different from that one?"',
        'Can you explain a complex numerical chart in simple words to a friend who is not technical?',
        'Do you have the patience to track down why two database reports disagree by 3%?',
        'Are you interested in understanding how businesses make money and retain customers?',
      ],
    },

    howToEnter: {
      roadmapSteps: [
        {
          stepNumber: 1,
          title: 'Master SQL Fundamentals & Joins (Weeks 1–4)',
          estimatedDuration: '4 Weeks',
          actionChecklist: [
            'Learn SELECT, WHERE, ORDER BY, GROUP BY, HAVING, and aggregate functions.',
            'Master all JOIN types: INNER, LEFT, RIGHT, and FULL OUTER joins.',
            'Practice Common Table Expressions (WITH clauses) and subqueries.',
            'Solve 40+ SQL practice problems on free platforms (SQLZoo, LeetCode Database, Mode Analytics SQL Tutorial).',
          ],
          portfolioHighlight: 'A GitHub repository with 10 well-commented SQL queries analyzing an open database (e.g., Northwind or Chinook music store).',
          pitfallToAvoid: 'Never memorize queries without understanding how the database evaluates FROM, WHERE, GROUP BY, and HAVING order of execution.',
        },
        {
          stepNumber: 2,
          title: 'Master Advanced Excel & Google Sheets (Weeks 5–7)',
          estimatedDuration: '3 Weeks',
          actionChecklist: [
            'Learn XLOOKUP, INDEX/MATCH, and nested conditional logic (SUMIFS, COUNTIFS).',
            'Master Pivot Tables, Pivot Charts, and calculated fields.',
            'Practice data cleaning: removing duplicates, text-to-columns, date formatting, and handling blanks.',
          ],
          portfolioHighlight: 'A clean financial model or sales performance tracker sheet with interactive slicers and dynamic summary cards.',
          pitfallToAvoid: 'Do not rely on mouse-clicking alone; learn keyboard shortcuts to navigate and audit large sheets efficiently.',
        },
        {
          stepNumber: 3,
          title: 'Build Interactive Dashboards in Power BI or Tableau (Weeks 8–11)',
          estimatedDuration: '4 Weeks',
          actionChecklist: [
            'Download Power BI Desktop (free) or Tableau Public.',
            'Learn data modeling: building 1-to-many relationships between dimension and fact tables.',
            'Write basic calculated measures (e.g., DAX formulas for Year-over-Year growth, Churn Rate).',
            'Apply visual hierarchy principles: KPI cards at top, trend lines in middle, detailed tables at bottom.',
          ],
          portfolioHighlight: 'A published interactive 2-page dashboard on Tableau Public or NovyPro analyzing real customer or healthcare datasets.',
          pitfallToAvoid: 'Avoid rainbow colors and visual clutter. Use maximum 3 complementary colors and ensure every chart answers a specific question.',
        },
        {
          stepNumber: 4,
          title: 'Execute an End-to-End Business Case Study (Weeks 12–15)',
          estimatedDuration: '4 Weeks',
          actionChecklist: [
            'Pick a real problem: e.g., analyzing student loan approvals, e-commerce returns, or hospital readmissions.',
            'Clean raw CSV data, write SQL transformation queries, calculate summary metrics, and build a visual dashboard.',
            'Write a 1-page executive memo: Context, Key Findings, Root Causes, and 3 Actionable Business Recommendations.',
          ],
          portfolioHighlight: 'A complete case study published as a LinkedIn article and GitHub project containing SQL scripts, dashboard screenshots, and the memo.',
          pitfallToAvoid: 'Do not stop at describing the data ("sales were 40%"). Always state the "so what?" and the recommended action.',
        },
        {
          stepNumber: 5,
          title: 'Resume Crafting, SQL Mock Rounds & Applications (Weeks 16+)',
          estimatedDuration: 'Ongoing',
          actionChecklist: [
            'Write a 1-page resume linking to your live dashboard and GitHub SQL repo.',
            'Practice live screen-share SQL interviews with peers (writing queries while verbalizing your approach).',
            'Apply for Junior Data Analyst, Business Analyst, and Operations Analyst roles on LinkedIn and Wellfound.',
          ],
          portfolioHighlight: 'A clean 1-page PDF portfolio showcasing your top 2 case studies with clickable links.',
          pitfallToAvoid: 'Never claim skills you cannot defend in a live test. If you list SQL, be ready to write a JOIN with GROUP BY on a whiteboard or coderpad.',
        },
      ],
      interviewPreparation: {
        interviewStages: [
          {
            stage: '1. Screening Call & Resume Review',
            focus: 'Checking your familiarity with tools (SQL, Excel, BI) and verifying passion for data.',
            preparationAdvice: 'Prepare a 90-second elevator pitch explaining your background, why you love data, and a 1-minute walk-through of your best project.',
          },
          {
            stage: '2. Live SQL / Excel Technical Assessment',
            focus: 'Writing live SQL queries (joins, aggregations, window functions) or solving an Excel modeling problem.',
            preparationAdvice: 'Practice on CoderPad or HackerRank without syntax auto-complete. Always speak your logic before writing code.',
          },
          {
            stage: '3. Take-Home Analytics Case Study',
            focus: 'You receive a raw CSV file and have 48 hours to clean it, find insights, and submit a dashboard or presentation deck.',
            preparationAdvice: 'Spend time on data hygiene first. Make sure your final presentation focuses on business recommendations, not just chart descriptions.',
          },
          {
            stage: '4. Case Study Presentation & Stakeholder Interview',
            focus: 'Presenting your case study findings to an analytics manager and business stakeholder.',
            preparationAdvice: 'Anticipate questions like "What if this data is biased?" or "Why did you choose median over mean here?". Defend your reasoning calmly.',
          },
          {
            stage: '5. Behavioral & Culture Interview',
            focus: 'How you handle conflicting priorities, unclear briefs, and constructive feedback.',
            preparationAdvice: 'Share stories demonstrating curiosity, proactive communication, and ability to handle feedback using the STAR framework.',
          },
        ],
        portfolioOrResumeAdvice: [
          'Highlight business outcomes over just tool names (e.g., "Identified ₹12L in billing leakage by querying 50,000 transaction records with PostgreSQL").',
          'Ensure your Tableau Public or Power BI portfolio links work without requiring an enterprise login.',
          'Include a brief "Business Understanding" section in every GitHub project explaining the company scenario.',
        ],
      },
    },
  },

  // =========================================================================
  // 3. UX / PRODUCT DESIGNER
  // =========================================================================
  'ux-designer': {
    careerId: 'ux-designer',
    title: 'UX / Product Designer',
    shortTitle: 'UX Designer',
    heroTagline: 'Research user frustrations, architect intuitive digital interactions, and design beautiful, accessible product experiences.',
    lastUpdated: 'October 2024 (Verified Market Benchmarks)',

    overview: {
      plainLanguageSummary:
        'A UX (User Experience) / Product Designer is an architect of digital experiences and an advocate for the human being using the software. When you use an app that feels smooth, obvious, and stress-free, a UX designer carefully planned that flow. When you use an app that is confusing, makes you fill out unnecessary fields, or hides the "Cancel" button, poor UX design is to blame. UX designers conduct research, interview users, map out journeys, create wireframes, and design the final interactive interfaces that make software intuitive and respectful of human dignity.',
      coreProblemsSolved: [
        {
          problem: 'Eliminating Confusion & Digital Anxiety',
          description:
            'Removing friction from high-stress digital tasks — like applying for financial aid, transferring money, or booking healthcare appointments — so users never feel lost or stupid.',
        },
        {
          problem: 'Discovering Real User Needs (Not Just Assumptions)',
          description:
            'Uncovering what users actually struggle with through direct observation and usability testing rather than relying on what executives guess users want.',
        },
        {
          problem: 'Information Architecture & Workflow Simplification',
          description:
            'Organizing complex corporate workflows (10-step forms, multi-layer dashboards) into clear, progressive steps that feel natural and manageable.',
        },
        {
          problem: 'Ensuring Universal Accessibility (WCAG)',
          description:
            'Designing software so people with visual impairments, motor limitations, low-bandwidth connections, or situational stress can use the product without barriers.',
        },
      ],
      businessContribution:
        'UX design directly drives commercial conversion and customer loyalty. A streamlined checkout or registration flow can double a company’s revenue without spending an extra rupee on advertising. Furthermore, intuitive design drastically reduces customer support calls, increases retention, and protects the brand from reputational damage.',
      commonMisconceptions: [
        {
          myth: 'UX design is just "making things look pretty" or choosing nice colors.',
          reality:
            'Visual styling is UI design, which is only one part of the job. UX is the deep psychological architecture: understanding user mental models, information hierarchy, error prevention, and usability testing.',
        },
        {
          myth: 'You have to be an expert graphic artist or master illustrator to be a UX designer.',
          reality:
            'UX design is about empathy, structured thinking, clear communication, and usability heuristics. Modern product design relies on structured component systems, not freehand sketching.',
        },
        {
          myth: 'Good design is completely subjective; it is just a matter of personal taste.',
          reality:
            'Professional design is evaluated through objective usability heuristics (Nielsen Norman Group), task completion times, error rates, and conversion metrics.',
        },
        {
          myth: 'Designers work entirely separate from business goals.',
          reality:
            'The best Product Designers understand business unit economics, churn, and conversion. They balance user advocacy with commercial viability.',
        },
      ],
    },

    actualWork: {
      dailyResponsibilities: [
        'Conducting qualitative user interviews, concept testing, and usability sessions with real target users.',
        'Mapping user journeys, empathy maps, task flows, and sitemaps to establish intuitive information architecture.',
        'Creating low-fidelity wireframes to rapidly test interaction concepts before committing to visual polish.',
        'Building interactive prototypes in Figma to simulate real application workflows for stakeholder reviews and user testing.',
        'Maintaining and expanding the company design system (design tokens, button states, typography scales, accessibility rules).',
        'Partnering with software engineers during sprint delivery to review implemented interfaces and ensure pixel-perfect fidelity.',
      ],
      realWorkplaceTaskExamples: [
        {
          scenario: 'High Abandonment on Student Financial Grant Form',
          typicalAction:
            '64% of applicants abandon a grant application on Step 2. The designer conducts usability testing with 5 students, discovers that asking for tax documents too early induces panic, and redesigns the flow with progressive disclosure and helpful microcopy explaining why each document is needed.',
          tangibleDeliverable:
            'An audited interactive Figma flow and usability report showing completion rates jumping from 36% to 78%.',
        },
        {
          scenario: 'Mobile Banking App Accessibility Audit',
          typicalAction:
            'Elderly users complain about difficulty reading transfer confirmation details. The designer audits color contrast ratios against WCAG 2.1 AA standards, increases touch targets from 32px to 48px, and introduces dynamic type scaling.',
          tangibleDeliverable:
            'Accessible Figma component update, contrast compliance audit sheet, and implementation guide for frontend engineers.',
        },
        {
          scenario: 'B2B SaaS Dashboard Redesign',
          typicalAction:
            'Logistics managers are overwhelmed by a single screen with 34 disconnected data tables. The designer runs card-sorting exercises with 8 dispatchers to restructure navigation into 3 prioritized tabs: Urgent Alerts, Live Fleet, and Daily Summaries.',
          tangibleDeliverable:
            'High-fidelity interactive prototype, responsive design specifications, and developer handoff documentation.',
        },
      ],
      toolsAndTechnologies: [
        {
          category: 'Interface & Component Design',
          tools: ['Figma', 'FigJam', 'Sketch'],
          purpose: 'Vector UI design, design system components, auto-layout, responsive constraints, and design token libraries.',
        },
        {
          category: 'Prototyping & Motion',
          tools: ['Figma Interactive Components', 'ProtoPie', 'Framer'],
          purpose: 'Building high-fidelity interactive prototypes with realistic transitions, inputs, and micro-interactions.',
        },
        {
          category: 'User Research & Testing',
          tools: ['Maze', 'UserTesting', 'Optimal Workshop (Card Sorting)', 'Google Forms / Typeform'],
          purpose: 'Unmoderated usability testing, tree testing, card sorting, and user feedback surveys.',
        },
        {
          category: 'Collaboration & Handoff',
          tools: ['Miro', 'Zeplin / Figma Dev Mode', 'Notion', 'Loom'],
          purpose: 'Brainstorming workshops, developer asset inspection, async video walkthroughs of design rationale.',
        },
        {
          category: 'Accessibility & Contrast Evaluation',
          tools: ['Stark (Figma plugin)', 'Colour Contrast Analyser (CCA)', 'WebAIM WAVE'],
          purpose: 'Verifying WCAG 2.1 AA/AAA color contrast ratios, screen reader compatibility, and focus states.',
        },
      ],
      crossFunctionalCollaboration: [
        {
          collaborator: 'Product Managers (PMs)',
          dynamic:
            'Co-owners of the product. PMs bring business objectives and timeline constraints; designers advocate for user clarity and experience quality.',
          frequency: 'Daily collaboration and co-designing',
        },
        {
          collaborator: 'Frontend & Mobile Engineers',
          dynamic:
            'Designers provide Figma specs, responsive behaviors, and micro-interactions. Engineers discuss technical feasibility and component reusability.',
          frequency: 'Continuous during sprint design handoff & QA review',
        },
        {
          collaborator: 'Real End-Users & Customers',
          dynamic:
            'Observing users interact with prototypes, listening to their unfiltered complaints, and noting where their mouse hesitates.',
          frequency: 'Bi-weekly user testing sessions',
        },
        {
          collaborator: 'UX Writers / Content Strategists',
          dynamic:
            'Crafting dignified, clear, and reassuring microcopy for error messages, button labels, and onboarding walkthroughs.',
          frequency: 'During wireframe and design polish phases',
        },
      ],
      illustrativeDaySchedule: {
        scheduleNote:
          'Note: This timeline is an illustrative example of a Product Designer’s day in a collaborative tech organization. Design schedules vary with project cycles.',
        timeline: [
          {
            time: '09:30 AM – 10:00 AM',
            activity: 'Reviewing user feedback survey responses from yesterday’s release and reviewing design feedback left by teammates on Figma files.',
            category: 'review',
          },
          {
            time: '10:00 AM – 10:20 AM',
            activity: 'Product Squad Standup: Sharing current design progress, unblocking engineer questions regarding a modal interaction state.',
            category: 'collaboration',
          },
          {
            time: '10:30 AM – 12:00 PM',
            activity: 'User Research Session: Moderating a 45-minute remote usability test with a real user navigating the new onboarding prototype.',
            category: 'deep-work',
          },
          {
            time: '12:00 PM – 01:00 PM',
            activity: 'Synthesizing research notes into FigJam: grouping user quotes, tagging friction points, and noting design iterations needed.',
            category: 'deep-work',
          },
          {
            time: '01:00 PM – 02:00 PM',
            activity: 'Lunch and informal cross-team coffee catchup.',
            category: 'planning',
          },
          {
            time: '02:00 PM – 03:00 PM',
            activity: 'Design Critique Session ("Design Crit"): Presenting wireframe iterations to other company designers to receive constructive peer feedback.',
            category: 'collaboration',
          },
          {
            time: '03:00 PM – 05:00 PM',
            activity: 'Figma Crafting Block: Refining component auto-layout, defining edge-case error states, and setting up Figma interactive prototype connections.',
            category: 'deep-work',
          },
          {
            time: '05:00 PM – 05:30 PM',
            activity: 'Design QA with Frontend Engineer: Reviewing the staging build of a newly coded screen to catch spacing or typography discrepancies.',
            category: 'review',
          },
        ],
      },
    },

    salaryData: {
      disclaimer:
        'UX and Product Design compensation in India is highly skill- and portfolio-dependent. A candidate with an exceptional portfolio showing deep user problem-solving, real metrics, and Figma design system mastery commands premium offers far above average numbers. All figures are indicative from public aggregator sources.',
      compensationContext:
        'Product Designer roles in high-growth technology companies and top-tier consumer apps generally command higher compensation than traditional graphic or visual design roles. Total compensation includes Base Pay, Performance Bonuses, and in product tech firms, substantial ESOPs (Employee Stock Option Plans).',
      entryLevel: {
        experienceLabel: 'Entry-Level / Junior Product Designer (0–2 Years)',
        indicativeRangeLpa: '₹3.6 Lakhs – ₹9.0 Lakhs per annum',
        monthlyEstimateInHand: '₹26,000 – ₹62,000 / month (approx. fixed)',
        baseVsTotalBreakdown:
          'Design studios & IT services firms: ₹3.0 – ₹5.0 LPA. Funded product startups & consumer tech: ₹6.0 – ₹10.0 LPA CTC. Graduates from premier design institutes (NID, IIT IDC) or with exceptional portfolios often start higher.',
        variationFactors:
          'Quality of portfolio case studies (problem framing, user research evidence, iteration) rather than visual eye candy alone.',
      },
      midLevel: {
        experienceLabel: 'Mid-Level UX / Product Designer (2–5 Years)',
        indicativeRangeLpa: '₹8.0 Lakhs – ₹18.0 Lakhs per annum',
        monthlyEstimateInHand: '₹55,000 – ₹1,20,000 / month (approx. fixed)',
        baseVsTotalBreakdown:
          'Agencies and mid-market firms: ₹7.0 – ₹12.0 LPA. High-growth product tech startups (Fintech, Edtech, E-commerce): ₹12.0 – ₹22.0 LPA CTC (Base + performance bonus + stock options).',
        variationFactors:
          'Demonstrated ability to lead end-to-end feature design from ambiguous briefs, run usability tests independently, and design system governance.',
      },
      seniorLevel: {
        experienceLabel: 'Senior Product Designer / Lead Designer (5+ Years)',
        indicativeRangeLpa: '₹16.0 Lakhs – ₹38.0+ Lakhs per annum',
        monthlyEstimateInHand: '₹1,05,000 – ₹2,45,000+ / month (approx. fixed)',
        baseVsTotalBreakdown:
          'Established digital agencies: ₹14 – ₹22 LPA. Top tier product companies, Unicorns, and Global Tech Centers: ₹25 – ₹50+ LPA total compensation.',
        variationFactors:
          'Product strategy vision, influencing executive stakeholders, defining design systems, mentoring team designers, and measurable business impact.',
      },
      verifiedSources: [
        {
          sourceName: 'AmbitionBox India — UI/UX Designer Salaries',
          verifiedUrl: 'https://www.ambitionbox.com/salaries/ui-ux-designer-salaries',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average: ₹5.5 LPA (Range: ₹2.2 LPA to ₹14.0 LPA across 30k+ reported designer profiles)',
          notes: 'Differentiates between junior UI visual designers and mid-to-senior Product Designers.',
        },
        {
          sourceName: 'Glassdoor India — UX Designer Salary Guide',
          verifiedUrl: 'https://www.glassdoor.co.in/Salaries/ux-designer-salary-SRCH_KO0,11.htm',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average Base Pay: ₹7.0 LPA (Typical range: ₹3.8 LPA – ₹16.0 LPA)',
          notes: 'Reflects verified employee salary disclosures in major tech hubs (Bangalore, Mumbai, NCR).',
        },
        {
          sourceName: 'Indeed India — User Experience Designer Salary Insights',
          verifiedUrl: 'https://in.indeed.com/career/ux-designer/salaries',
          lastCheckedDate: 'October 2024',
          reportedAverageOrRange: 'Average Salary: ₹5.8 LPA (Fresher: ₹3.5 LPA; Senior: ₹12.5+ LPA)',
          notes: 'Aggregated across thousands of active employer job listings and reported employee wages.',
        },
      ],
      compensationDeterminants: [
        'Portfolio Strength: In design, your portfolio IS your resume. A portfolio with 2 deep, well-documented case studies showing research and iterations beats 10 dribbble shots every time.',
        'Interaction Rigor: Mastery of auto-layout, component variants, states (hover, active, disabled, error), and accessibility.',
        'Business Framing: Designers who can articulate how their redesign improved conversion or reduced drop-off command significantly higher salaries.',
        'Product Complexity: Experience designing complex enterprise or fintech workflows earns higher compensation than simple marketing websites.',
      ],
    },

    skillsAndQualifications: {
      essentialTechnicalSkills: [
        {
          name: 'Figma Mastery & Component Systems',
          whyEssential: 'The industry standard tool for collaborative interface design, prototyping, and developer handoff.',
          keyConcepts: ['Auto-layout 5.0 (nested flexboxes)', 'Component variants & properties', 'Design tokens & styles', 'Interactive prototyping', 'Dev Mode inspection'],
        },
        {
          name: 'User Research & Usability Testing',
          whyEssential: 'Understanding user pain points and validating whether your design actually works with real humans.',
          keyConcepts: ['User interview protocol design', 'Moderated & unmoderated usability tests', 'Affinity mapping & synthesis', 'Task completion rate measurement'],
        },
        {
          name: 'Information Architecture & Wireframing',
          whyEssential: 'Structuring content logically so users never have to guess where to find what they need.',
          keyConcepts: ['Sitemaps & user flows', 'Low-fidelity wireframing', 'Progressive disclosure', 'Card sorting & tree testing'],
        },
        {
          name: 'Usability Heuristics & Psychology',
          whyEssential: 'Applying proven cognitive principles to prevent user errors before testing even begins.',
          keyConcepts: ['Nielsen Norman 10 Usability Heuristics', 'Hick’s Law (reducing cognitive load)', 'Fitts’s Law (touch target size)', 'Mental models vs conceptual models'],
        },
        {
          name: 'WCAG 2.1 Accessibility & Inclusivity',
          whyEssential: 'Ensuring digital products can be used by everyone, including people with visual, motor, or cognitive disabilities.',
          keyConcepts: ['Color contrast standards (4.5:1 text, 3:1 UI)', 'Focus order & keyboard navigation', 'Screen reader semantics', 'Touch target minimums (48x48px)'],
        },
      ],
      usefulAdditionalSkills: [
        {
          name: 'Basic Frontend Literacy (HTML, CSS, Flexbox)',
          description: 'Understanding how CSS works makes your designs 10x easier for engineers to implement and prevents impractical design handoffs.',
        },
        {
          name: 'UX Writing & Microcopy',
          description: 'Writing empathetic, concise button labels, error alerts, and empty states that guide users without clinical or accusatory phrasing.',
        },
        {
          name: 'Quantitative Product Analytics Literacy',
          description: 'Understanding how to read funnel conversion rates and heatmaps in tools like Mixpanel, Hotjar, or PostHog.',
        },
      ],
      communicationAndTeamwork: [
        {
          skill: 'Articulating Design Rationale',
          howUsed: 'Explaining "why" you made a design choice based on user research and heuristics, rather than saying "I think it looks better this way."',
        },
        {
          skill: 'Receiving Feedback Without Defensiveness',
          howUsed: 'Separating your personal identity from your design file; welcoming stakeholder and user critiques as opportunities to improve.',
        },
        {
          skill: 'Facilitating Cross-Functional Workshops',
          howUsed: 'Leading FigJam brainstorming sessions with product managers and engineers to align on problem definitions.',
        },
      ],
      educationalBackgrounds: [
        {
          background: 'Any Academic Degree (Engineering, Humanities, Commerce, Psychology, Architecture)',
          description: 'UX design has no mandatory degree requirement. Many of the world’s best product designers studied psychology, literature, architecture, or computer science.',
          viability: '100% Viable with Strong Portfolio',
        },
        {
          background: 'B.Des / M.Des / Fine Arts / Architecture',
          description: 'Provides strong training in visual composition, human spatial ergonomics, design thinking, and critique presentation.',
          viability: 'Strong Visual & Conceptual Advantage',
        },
        {
          background: 'Self-Taught & Bootcamp Graduates',
          description: 'Thousands of successful UX designers enter the industry through online courses, community design challenges, and practical portfolio work.',
          viability: 'Widely Hired Based on Portfolio Quality',
        },
      ],
      alternativeEntryRoutes: [
        {
          route: 'Redesigning a High-Friction Public Service App',
          recommendations: 'Pick a clunky government or university portal (e.g., student scholarship portal). Conduct usability tests, document friction, and publish a comprehensive redesign case study.',
        },
        {
          route: 'Pro Bono Design for Non-Profits or Student Startups',
          recommendations: 'Offer to redesign the mobile site or onboarding flow for a local campus charity or early-stage student venture to gain real live user feedback.',
        },
        {
          route: 'Junior UI/UX Design Internships',
          recommendations: 'Apply for summer design internships at boutique digital agencies, where you will learn design system rigor and rapid client delivery.',
        },
      ],
      beginnerFriendlyTools: [
        {
          name: 'Figma',
          cost: '100% Free Starter Plan for up to 3 files and unlimited personal drafts',
          startAction: 'Create a free Figma account, explore the Figma Community UI kits, and practice recreating 3 of your favorite mobile app screens.',
        },
        {
          name: 'FigJam',
          cost: '100% Free on Starter Plan',
          startAction: 'Use FigJam to sketch out user flows, sticky-note brainstorming, and empathy maps before opening design tools.',
        },
        {
          name: 'Mobbin & PageFlows',
          cost: 'Free tier available for browsing real mobile flows',
          startAction: 'Study real screenshot flows from top apps (Spotify, Airbnb, Uber) to understand standard design patterns.',
        },
      ],
    },

    careerGrowth: {
      progressionSummary:
        'Product Design has evolved into a strategic executive discipline. Designers can progress through individual craft excellence (Principal Product Designer) shaping company-wide design systems, or through design management (Head of Design, VP of Design) leading multidisciplinary creative teams.',
      dualLadderExplanation:
        'Companies value top-tier design craft deeply. Staff and Principal Product Designers earn executive-level compensation without managing people by tackling the company’s most ambiguous, complex product problems.',
      individualContributorLadder: [
        {
          level: 'Associate / Junior Product Designer (L1)',
          yoe: '0–2 Years',
          scope: 'Designs individual components, screens, and well-scoped user flows.',
          dailyFocus: 'Executing Figma screens, following design system rules, preparing developer specs, and observing usability tests.',
        },
        {
          level: 'Product Designer (L2)',
          yoe: '2–4 Years',
          scope: 'Owns end-to-end design for an entire feature area or product squad.',
          dailyFocus: 'Conducting user research, mapping interaction flows, designing complex states, and partnering closely with engineers.',
        },
        {
          level: 'Senior Product Designer (L3)',
          yoe: '5–8 Years',
          scope: 'Owns cross-feature customer journeys and drives product strategy.',
          dailyFocus: 'Mentoring junior designers, defining design systems, running strategic research, and presenting design vision to executives.',
        },
        {
          level: 'Staff / Principal Product Designer (L4+)',
          yoe: '8+ Years',
          scope: 'Company-wide design direction, design systems, and multi-product coherence.',
          dailyFocus: 'Solving high-ambiguity product architecture, setting design standards across 10+ squads, and pioneering new interaction paradigms.',
        },
      ],
      managementLadder: [
        {
          level: 'Design Lead / Manager',
          yoe: '6–9 Years',
          scope: 'Manages a team of 4–8 product designers and researchers.',
          dailyFocus: 'Team coaching, design critique facilitation, resource allocation, hiring, and stakeholder relationship management.',
        },
        {
          level: 'Head of Design / Director of Product Design',
          yoe: '10–14 Years',
          scope: 'Oversees the entire design organization across all product lines.',
          dailyFocus: 'Design culture, budget, design system governance, executive alignment, and creative agency partner management.',
        },
        {
          level: 'VP of Design / Chief Design Officer (CDO)',
          yoe: '14+ Years',
          scope: 'Overall enterprise brand, customer experience, and design philosophy.',
          dailyFocus: 'Board-level customer experience advocacy, strategic company pivots, brand differentiation, and organizational scaling.',
        },
      ],
      lateralOrSpecialistTracks: [
        {
          trackName: 'UX Researcher (User Researcher)',
          description: 'Specializes purely in qualitative user studies, ethnographic research, usability testing, and customer insight synthesis.',
          requiredPivotSkill: 'Research methodologies, survey design, statistical validation, video interview moderation.',
        },
        {
          trackName: 'Design Systems Designer / Design Technologist',
          description: 'Focuses entirely on building reusable component libraries, design tokens, accessibility standards, and bridge code for engineers.',
          requiredPivotSkill: 'Figma component architecture, design tokens, basic React / CSS code.',
        },
        {
          trackName: 'Product Manager (PM)',
          description: 'Many designers pivot to Product Management because they already understand user pain points, sprint workflows, and feature prioritization.',
          requiredPivotSkill: 'Business unit economics, PRD writing, roadmap planning, financial modeling.',
        },
      ],
    },

    workEnvironments: {
      industries: [
        {
          industry: 'Consumer Tech & Mobile Apps (B2C)',
          commonUseCases: 'Food delivery, social media, entertainment streaming, quick commerce, gaming.',
          hiringVolume: 'High (High emphasis on delightful micro-interactions and retention)',
        },
        {
          industry: 'Fintech & Digital Banking',
          commonUseCases: 'Personal budgeting, stock trading, credit approval, loan repayments, payment gateways.',
          hiringVolume: 'High (Demands clear trust, clarity, and error prevention)',
        },
        {
          industry: 'Enterprise Software & B2B SaaS',
          commonUseCases: 'Customer Relationship Management (CRM), cloud analytics, HR portals, supply chain management.',
          hiringVolume: 'Very High (High complexity workflows that require simplification)',
        },
        {
          industry: 'Digital Design Agencies & Consultancies',
          commonUseCases: 'Designing 0-to-1 apps and digital branding for diverse global clients on fast turnaround timelines.',
          hiringVolume: 'Moderate to High',
        },
      ],
      companyArchetypes: [
        {
          archetype: 'Tech Unicorns & High-Growth Startups',
          environmentStyle: 'Fast iteration, user testing cycles every week, high design autonomy, direct access to founders.',
          compStyle: 'Competitive cash base plus valuable stock option potential (ESOPs).',
          whatToExpect: 'Fast pace, direct accountability for conversion numbers, great place to build high-visibility case studies.',
        },
        {
          archetype: 'Specialized Design Studios & Agencies',
          environmentStyle: 'Deep focus on creative craft, visual experimentation, working with multiple clients simultaneously.',
          compStyle: 'Standard agency salaries, portfolio-building goldmine.',
          whatToExpect: 'Rapidly exposes you to multiple industries; develops your presentation and client-pitching skills.',
        },
        {
          archetype: 'Global Capability Centers & Mature Enterprises',
          environmentStyle: 'Large established design systems, specialized roles (researcher, writer, visual designer), structured hours.',
          compStyle: 'High base pay, steady annual increments, great work-life balance.',
          whatToExpect: 'Collaborating across time zones, navigating formal corporate approval reviews.',
        },
      ],
      typicalSquadStructure:
        'A Product Designer is embedded inside a product squad with 1 Product Manager and 3–6 Software Engineers, while also participating in weekly cross-product Design Critiques with fellow designers.',
      employerExamplesNotice:
        'Employer names are illustrative examples of established organizations in the Indian tech ecosystem and do NOT imply current hiring or active affiliation.',
      employerExamples: [
        { name: 'Swiggy / Zomato / Zepto', sector: 'Consumer Experience & Hyperlocal Delivery' },
        { name: 'CRED / Razorpay / Zerodha', sector: 'Fintech, Visual Craft & Interface Design' },
        { name: 'Postman / BrowserStack / Freshworks', sector: 'Productivity & Global B2B SaaS' },
        { name: 'Lollypop Design Studio / Fractal Ink', sector: 'Specialized Design Agencies' },
        { name: 'Microsoft / Google / Atlassian (India R&D)', sector: 'Global Design & Enterprise UX' },
      ],
    },

    advantagesAndChallenges: {
      keyAdvantages: [
        {
          title: 'Direct Creative & Human Impact',
          explanation: 'Your work directly touches human feelings. When your redesign helps a student successfully secure a grant without stress, you feel genuine empathy and accomplishment.',
        },
        {
          title: 'Freedom from Deep Programming',
          explanation: 'You get to work at the cutting edge of tech products without having to write or debug thousands of lines of code every day.',
        },
        {
          title: 'High Visual Autonomy & Builder Joy',
          explanation: 'Watching an idea go from rough paper sketches to an interactive Figma prototype to an app on millions of phones is deeply fulfilling.',
        },
        {
          title: 'Strong Executive Visibility',
          explanation: 'People understand visuals much faster than code or spreadsheets. Executives love seeing design prototypes because it makes future ideas tangible.',
        },
      ],
      realChallenges: [
        {
          title: 'Subjective Feedback & Stakeholder Opinions',
          challenge: 'Everyone has an opinion on colors, fonts, and layouts. Managers will often say "I don’t like blue, make it orange."',
          howToCope: 'Ground every design discussion in user research data, usability heuristics, and conversion goals rather than subjective aesthetic arguments.',
        },
        {
          title: 'Engineering Constraints & Trade-Offs',
          challenge: 'You might design a gorgeous animation or complex layout that engineers say will take 3 months to build and slow down the app.',
          howToCope: 'Learn basic CSS/flexbox limitations, consult engineers early during wireframing, and design modular progressive enhancements.',
        },
        {
          title: 'Portfolio Gatekeeping in Hiring',
          challenge: 'Unlike coding where an automated test scores you, design hiring requires showing deep case studies and storytelling.',
          howToCope: 'Build 2 deep case studies showing the messy middle: research notes, early discarded sketches, user feedback, and measurable results.',
        },
      ],
      candidSelfAssessmentQuestions: [
        'When you use a frustrating app, do you find yourself thinking "why did they put this button here? This could be so much simpler"?',
        'Can you listen to someone criticize your work without taking it personally?',
        'Are you genuinely curious about human psychology and why people behave the way they do?',
        'Do you care about visual alignment, typography readability, and spacing consistency?',
      ],
    },

    howToEnter: {
      roadmapSteps: [
        {
          stepNumber: 1,
          title: 'Master Figma & UI Design Fundamentals (Weeks 1–4)',
          estimatedDuration: '4 Weeks',
          actionChecklist: [
            'Learn Figma basics: frames, shapes, typography hierarchy, color styles, and vector networks.',
            'Master Auto-Layout: padding, gap, alignment, fill container, and hug contents.',
            'Practice recreating ("reverse-engineering") 5 top mobile screens (Spotify, Swiggy, Airbnb) to absorb real spacing and typography patterns.',
            'Learn design tokens and building a basic reusable component set (buttons, inputs, cards).',
          ],
          portfolioHighlight: 'A Figma Community file showcasing a reverse-engineered mobile app with pixel-perfect auto-layout components.',
          pitfallToAvoid: 'Do not design without auto-layout. Real design teams require responsive, scalable auto-layout components.',
        },
        {
          stepNumber: 2,
          title: 'Learn Usability Heuristics & Research Methods (Weeks 5–8)',
          estimatedDuration: '4 Weeks',
          actionChecklist: [
            'Study the 10 Nielsen Norman Usability Heuristics in depth.',
            'Learn how to write non-leading user interview questions and usability test protocols.',
            'Conduct a heuristic audit of a clunky real-world website (e.g., student portal or public utility site).',
            'Learn accessibility basics: WCAG contrast checking, screen reader labels, and touch targets.',
          ],
          portfolioHighlight: 'A published heuristic evaluation report pinpointing 5 usability violations on an existing app with proposed wireframe fixes.',
          pitfallToAvoid: 'Do not ask leading questions like "Do you think this app is easy to use?". Ask "Walk me through how you would complete this task."',
        },
        {
          stepNumber: 3,
          title: 'Execute Your First Complete End-to-End Case Study (Weeks 9–14)',
          estimatedDuration: '6 Weeks',
          actionChecklist: [
            'Select a meaningful problem: e.g., redesigning a confusing food pantry application or emergency student aid workflow.',
            'Conduct research with 3–5 potential users to uncover pain points and mental models.',
            'Create empathy maps, user journey maps, and low-fidelity wireframes.',
            'Design high-fidelity interactive prototypes in Figma with full edge states (empty, loading, error, success).',
            'Test the prototype with 3 real users and document the design changes made based on their feedback.',
          ],
          portfolioHighlight: 'A complete, beautifully formatted Notion or web case study documenting the entire research-to-prototype journey.',
          pitfallToAvoid: 'Never show just the polished final screen. Hiring managers want to see the messy sketches, what failed in testing, and how you iterated.',
        },
        {
          stepNumber: 4,
          title: 'Design a Second Specialist Case Study & Portfolio Site (Weeks 15–18)',
          estimatedDuration: '4 Weeks',
          actionChecklist: [
            'Build a second case study focusing on a different domain (e.g., B2B desktop dashboard or complex mobile fintech flow).',
            'Build a clean, responsive personal portfolio website on Framer, Webflow, or Notion.',
            'Write clear elevator summaries for each project: Problem, Role, Constraints, Solution, and Measured / Expected Impact.',
          ],
          portfolioHighlight: 'A live personal portfolio website featuring 2 deep case studies and an "About Me" page highlighting your design philosophy.',
          pitfallToAvoid: 'Do not include 10 shallow projects. 2 outstanding, detailed case studies are worth more than a dozen generic visual mockups.',
        },
        {
          stepNumber: 5,
          title: 'Design Critique Practice, Portfolio Reviews & Applications (Weeks 19+)',
          estimatedDuration: 'Ongoing',
          actionChecklist: [
            'Practice walking through your case study in 15 minutes: 3 mins context, 5 mins research & problems, 5 mins solution & testing, 2 mins learnings.',
            'Request portfolio reviews from senior designers on ADPList.org (a 100% free global mentoring network).',
            'Apply for Junior Product Designer and UX Designer roles on LinkedIn, Wellfound, and design job boards.',
          ],
          portfolioHighlight: 'A prepared 15-slide presentation deck ready for live portfolio walk-through interviews.',
          pitfallToAvoid: 'Never read your case study word-for-word in an interview. Tell the story of the user and your design decision-making process.',
        },
      ],
      interviewPreparation: {
        interviewStages: [
          {
            stage: '1. Recruiter & Portfolio Screening',
            focus: 'Reviewing your portfolio link to verify design thinking, interaction craft, and communication clarity.',
            preparationAdvice: 'Ensure your portfolio loads fast and requires no passwords. Your top case study must be immediately visible above the fold.',
          },
          {
            stage: '2. Past Work Portfolio Presentation (Deep-Dive)',
            focus: 'A 45–60 minute presentation of 1–2 of your best case studies to a design panel.',
            preparationAdvice: 'Prepare a slide deck rather than scrolling a website. Focus on user friction, why you discarded certain ideas, and how you validated the final design.',
          },
          {
            stage: '3. Whiteboard Design Challenge / App Critique',
            focus: 'Solving an ambiguous design problem live in 45 minutes (e.g., "Design an ATM for children" or critiquing an app like Spotify live).',
            preparationAdvice: 'Do not jump to drawing screens! Clarify the user persona, context of use, constraints, and success metrics before sketching.',
          },
          {
            stage: '4. Cross-Functional Collaboration Interview',
            focus: 'Interview with a Product Manager and Engineering Lead to evaluate communication, pushback, and teamwork.',
            preparationAdvice: 'Share examples of how you negotiated design scope with developers and how you handled conflicting stakeholder opinions.',
          },
          {
            stage: '5. Culture & Values Alignment',
            focus: 'Empathy, hunger to learn, receptive attitude to critique, and design ethics.',
            preparationAdvice: 'Be ready to discuss what inspires you in design, your favorite everyday products, and a design mistake you made and learned from.',
          },
        ],
        portfolioOrResumeAdvice: [
          'Lead every case study with a concise "TL;DR Summary": The Problem, The Solution, Your Role, and Key Outcome.',
          'Show before-and-after comparisons to demonstrate the tangible improvement your design made.',
          'Always include quotes from real users you interviewed or tested with to prove your empathy and grounded research.',
        ],
      },
    },
  },
};
