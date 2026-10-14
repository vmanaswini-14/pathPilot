import type { DifficultyLevel, DataAnalystLevelConfig } from '../types/index.ts';

export const DATA_ANALYST_LEVELS: Record<DifficultyLevel, DataAnalystLevelConfig> = {
  beginner: {
    id: 'beginner',
    label: 'Beginner',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '8-10 mins',
    title: 'Level 1: Explore Student Spending Data',
    scenario:
      'A campus financial wellness advisor wants to understand typical student semester expenditures (groceries, textbooks, transit, utilities). Inspect the raw dataset, identify the highest spending items, calculate totals, and answer core questions using guided analysis or optional SQL queries.',
    problemStatement:
      'Analyze the student_expenses table. Identify the highest single expense, calculate category subtotals, and determine where students face the largest upfront financial hurdles in the first month of the semester.',
    learningObjectives: [
      'Navigate an accessible tabular dataset of real-world student expenses',
      'Identify maximum values, category totals, and payment distributions',
      'Write simple SQL queries (SELECT, ORDER BY, SUM) or use interactive table filters',
      'Summarize key spending patterns in a concise student financial memo',
    ],
    instructions: [
      '1. Inspect the student_expenses dataset using the table preview or the SQL runner.',
      '2. Identify the single largest expense in the records.',
      '3. Calculate the total spending across all categories ($1,287.50).',
      '4. Answer the guided questions or write a custom SQL query to substantiate your conclusions.',
    ],
    hints: [
      'Hint 1: To find the highest expense, sort the amount column descending or run: `SELECT student_name, category, amount, description FROM student_expenses ORDER BY amount DESC LIMIT 1;`.',
      'Hint 2: Notice that textbook expenses ($340.00 and $185.00) represent huge lump-sum costs in the first two weeks of classes.',
      'Hint 3: Run `SELECT category, ROUND(SUM(amount), 2) AS total_spent, COUNT(*) AS transactions FROM student_expenses GROUP BY category ORDER BY total_spent DESC;` to see category breakdowns.',
    ],
    tableName: 'student_expenses',
    schemaColumns: [
      { name: 'expense_id', type: 'INT', description: 'Unique receipt entry ID' },
      { name: 'student_name', type: 'VARCHAR', description: 'Student identifier' },
      { name: 'category', type: 'VARCHAR', description: 'Expense category (Textbooks, Groceries, Transit, Tech, Dining)' },
      { name: 'amount', type: 'DECIMAL', description: 'Transaction cost in USD' },
      { name: 'payment_method', type: 'VARCHAR', description: 'Debit Card, Campus Cash, Cash, Financial Aid Credit' },
      { name: 'expense_date', type: 'VARCHAR', description: 'Date of transaction (YYYY-MM-DD)' },
      { name: 'description', type: 'VARCHAR', description: 'Item description and store' },
    ],
    starterQuery: `SELECT 
  category,
  COUNT(*) AS item_count,
  ROUND(SUM(amount), 2) AS total_amount,
  ROUND(AVG(amount), 2) AS avg_amount
FROM student_expenses
GROUP BY category
ORDER BY total_amount DESC;`,
    sampleQueries: [
      {
        label: 'Find Top 5 Highest Expenses',
        query: `SELECT expense_id, student_name, category, amount, description FROM student_expenses ORDER BY amount DESC LIMIT 5;`,
        purpose: 'Isolate the most expensive individual purchases',
      },
      {
        label: 'Total Spend Across All Records',
        query: `SELECT COUNT(*) AS total_transactions, ROUND(SUM(amount), 2) AS grand_total, ROUND(AVG(amount), 2) AS average_ticket FROM student_expenses;`,
        purpose: 'Calculate overall student expenditure',
      },
      {
        label: 'Payment Method Breakdown',
        query: `SELECT payment_method, COUNT(*) AS transactions, ROUND(SUM(amount), 2) AS total_spent FROM student_expenses GROUP BY payment_method ORDER BY total_spent DESC;`,
        purpose: 'See how students finance everyday purchases',
      },
    ],
    expectedInsights: [
      'The highest single expense is $340.00 for STEM Textbooks & Online Access Code (Expense ID 3).',
      'Total student spending across all 12 tracked entries is exactly $1,287.50.',
      'Textbooks & Course Materials represent the largest dollar expenditure ($525.00), while Groceries has the highest transaction frequency (4 purchases).',
      'Debit Card is the most common payment method (7 transactions totaling $785.50).',
    ],
    kpis: [
      { label: 'Highest Single Expense', value: '$340.00', subtext: 'STEM Textbooks & Online Access Code', trend: 'up' },
      { label: 'Total Tracked Spend', value: '$1,287.50', subtext: 'Across 12 student receipts', trend: 'neutral' },
      { label: 'Top Cost Category', value: 'Course Materials', subtext: '$525.00 (40.8% of budget)', trend: 'up' },
      { label: 'Average Transaction', value: '$107.29', subtext: 'Median grocery item is $38.50', trend: 'neutral' },
    ],
    dataset: [
      { expense_id: 1, student_name: 'Jordan Rivera', category: 'Groceries', amount: 64.20, payment_method: 'Debit Card', expense_date: '2026-09-02', description: 'Weekly staple groceries (Trader Joe’s)' },
      { expense_id: 2, student_name: 'Jordan Rivera', category: 'Transit', amount: 45.00, payment_method: 'Debit Card', expense_date: '2026-09-03', description: 'Monthly student bus & subway pass' },
      { expense_id: 3, student_name: 'Alex Chen', category: 'Textbooks', amount: 340.00, payment_method: 'Financial Aid Credit', expense_date: '2026-09-04', description: 'Organic Chem & Calculus textbooks + online lab code' },
      { expense_id: 4, student_name: 'Alex Chen', category: 'Dining', amount: 18.50, payment_method: 'Campus Cash', expense_date: '2026-09-05', description: 'Late-night library cafe study meal' },
      { expense_id: 5, student_name: 'Maya Patel', category: 'Groceries', amount: 42.80, payment_method: 'Debit Card', expense_date: '2026-09-06', description: 'Produce and pantry bulk items' },
      { expense_id: 6, student_name: 'Maya Patel', category: 'Tech Supplies', amount: 89.00, payment_method: 'Debit Card', expense_date: '2026-09-08', description: 'Replacement laptop charger & USB-C hub' },
      { expense_id: 7, student_name: 'Carlos Ruiz', category: 'Textbooks', amount: 185.00, payment_method: 'Financial Aid Credit', expense_date: '2026-09-10', description: 'Economics digital access key' },
      { expense_id: 8, student_name: 'Carlos Ruiz', category: 'Transit', amount: 30.00, payment_method: 'Cash', expense_date: '2026-09-12', description: 'Rideshare home after late-night lab' },
      { expense_id: 9, student_name: 'Jordan Rivera', category: 'Groceries', amount: 55.40, payment_method: 'Debit Card', expense_date: '2026-09-15', description: 'Mid-month grocery replenishment' },
      { expense_id: 10, student_name: 'Alex Chen', category: 'Dining', amount: 12.60, payment_method: 'Campus Cash', expense_date: '2026-09-18', description: 'Dining hall sandwich and fruit' },
      { expense_id: 11, student_name: 'Maya Patel', category: 'Groceries', amount: 36.50, payment_method: 'Debit Card', expense_date: '2026-09-22', description: 'Weekly groceries' },
      { expense_id: 12, student_name: 'Carlos Ruiz', category: 'Tech Supplies', amount: 68.50, payment_method: 'Debit Card', expense_date: '2026-09-25', description: 'Scientific calculator and graph paper' },
    ],
    guidedQuestions: [
      {
        id: 'q1',
        question: 'What is the highest single expense in the dataset and what was it for?',
        expectedAnswer: '$340.00 for Organic Chem & Calculus textbooks + online lab code (Expense ID 3)',
        explanation: 'Sorting the dataset descending by amount reveals that textbook and access code bundles dwarf ordinary daily expenses.',
      },
      {
        id: 'q2',
        question: 'What is the total expenditure across all categories?',
        expectedAnswer: '$1,287.50',
        explanation: 'SUM(amount) over all 12 rows equals $1,287.50, demonstrating aggregate student living costs in the first month.',
      },
      {
        id: 'q3',
        question: 'Which category accounts for the highest total spend?',
        expectedAnswer: 'Textbooks ($525.00)',
        explanation: 'While Groceries has the most transactions (4), Textbooks has the highest dollar amount ($525.00 total across 2 purchases).',
      },
    ],
    sampleAnalysis: `Student Spending Analysis Memo
To: Campus Financial Wellness Coordinator
From: Student Data Analyst

1. Key Findings:
- Total student living and academic expenses for the first month reached $1,287.50 across 12 tracked transactions.
- Academic Course Materials represents the single largest expenditure category ($525.00, or 40.8% of total spending), driven by Expense #3 ($340.00 for chemistry books and digital homework codes).
- Groceries accounts for the highest transaction frequency (4 purchases totaling $198.90, average ticket $49.73).
- Debit Card was used for 7 out of 12 purchases ($785.50), while Financial Aid Book Advances covered textbook purchases ($525.00).

2. Strategic Recommendations:
- Expand Campus Courseware Reserves: Provide digital lab access codes through university library licensing to reduce the $340 textbook barrier.
- Bulk Grocery Cooperative: Partner with campus pantry to offer student cooperative buying discounts on weekly staple groceries.`,
  },

  easy: {
    id: 'easy',
    label: 'Easy',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '10-12 mins',
    title: 'Level 2: Write Your First Business SQL Queries',
    scenario:
      'A student-support organisation provides emergency financial micro-grants to students experiencing sudden hardship. The program manager needs SQL queries using SELECT, WHERE, ORDER BY, and LIMIT to filter records, understand grant sizes, and review high-priority applications.',
    problemStatement:
      'Write and execute SQL queries on the applications table. Formulate queries to: 1) filter by approval status, 2) find the top 5 largest requested assistance amounts, and 3) inspect applications submitted by undergraduate students with GPA >= 3.0.',
    learningObjectives: [
      'Write SQL queries using SELECT to choose specific columns',
      'Filter records using WHERE clauses with strings, numbers, and logical operators (AND, OR)',
      'Sort records in ascending or descending order with ORDER BY',
      'Constrain output size with LIMIT to inspect top candidates',
      'Interpret query results to answer concrete operational questions',
    ],
    instructions: [
      '1. Review the applications table schema (columns: application_id, student_category, requested_amount, application_status, submission_date, gpa).',
      '2. Run Query 1: Filter all applications with application_status = "Approved".',
      '3. Run Query 2: Find the top 5 highest requested grant amounts ordered by requested_amount DESC.',
      '4. Run Query 3: Find Undergraduate applications with gpa >= 3.0.',
      '5. Summarize your observations in the analyst memo box.',
    ],
    hints: [
      'Hint 1: To filter approved applications: `SELECT application_id, student_category, requested_amount, submission_date FROM applications WHERE application_status = "Approved";`.',
      'Hint 2: To get the top 5 requested amounts: `SELECT application_id, student_category, requested_amount, application_status FROM applications ORDER BY requested_amount DESC LIMIT 5;`.',
      'Hint 3: Combine conditions with AND: `SELECT * FROM applications WHERE student_category = "Undergraduate" AND gpa >= 3.0 ORDER BY gpa DESC;`.',
    ],
    tableName: 'applications',
    schemaColumns: [
      { name: 'application_id', type: 'VARCHAR', description: 'Unique grant application identifier' },
      { name: 'student_category', type: 'VARCHAR', description: 'Undergraduate, Graduate, or Vocational' },
      { name: 'requested_amount', type: 'DECIMAL', description: 'Grant amount requested in USD' },
      { name: 'application_status', type: 'VARCHAR', description: 'Approved, Under Review, or Rejected' },
      { name: 'submission_date', type: 'VARCHAR', description: 'Date application filed (YYYY-MM-DD)' },
      { name: 'gpa', type: 'DECIMAL', description: 'Cumulative student grade point average' },
      { name: 'hardship_reason', type: 'VARCHAR', description: 'Medical, Housing, Food Insecurity, or Technology' },
    ],
    starterQuery: `SELECT 
  application_id,
  student_category,
  requested_amount,
  application_status,
  gpa,
  hardship_reason
FROM applications
WHERE application_status = 'Approved'
ORDER BY requested_amount DESC
LIMIT 5;`,
    sampleQueries: [
      {
        label: 'Approved Applications',
        query: `SELECT application_id, student_category, requested_amount, submission_date FROM applications WHERE application_status = 'Approved' ORDER BY requested_amount DESC;`,
        purpose: 'Review all approved emergency allocations',
      },
      {
        label: 'Top 5 Highest Requests',
        query: `SELECT application_id, student_category, requested_amount, application_status, hardship_reason FROM applications ORDER BY requested_amount DESC LIMIT 5;`,
        purpose: 'Find the largest funding needs across the student body',
      },
      {
        label: 'Undergraduates with GPA >= 3.0',
        query: `SELECT application_id, student_category, gpa, requested_amount, application_status FROM applications WHERE student_category = 'Undergraduate' AND gpa >= 3.0 ORDER BY gpa DESC;`,
        purpose: 'Verify high-performing undergraduates needing emergency relief',
      },
      {
        label: 'Pending Review Backlog',
        query: `SELECT application_id, student_category, requested_amount, submission_date FROM applications WHERE application_status = 'Under Review' ORDER BY submission_date ASC;`,
        purpose: 'Identify oldest pending student requests awaiting review',
      },
    ],
    expectedInsights: [
      'Out of 12 applications, 6 are Approved, 4 are Under Review, and 2 are Rejected.',
      'The highest requested grant is $2,400 (APP-105 for Medical emergency), which was approved.',
      'All top 3 highest requests ($2,400, $2,100, $1,800) stem from Housing and Medical emergencies.',
      'Undergraduate students account for 8 of the 12 total applications.',
    ],
    kpis: [
      { label: 'Total Applications', value: '12', subtext: 'In September cohort', trend: 'neutral' },
      { label: 'Approval Rate', value: '50.0%', subtext: '6 Approved, 4 Under Review, 2 Rejected', trend: 'up' },
      { label: 'Highest Request', value: '$2,400', subtext: 'APP-105 (Medical emergency)', trend: 'up' },
      { label: 'Average Request', value: '$1,308', subtext: 'Median request is $1,250', trend: 'neutral' },
    ],
    dataset: [
      { application_id: 'APP-101', student_category: 'Undergraduate', requested_amount: 1200, application_status: 'Approved', submission_date: '2026-09-01', gpa: 3.45, hardship_reason: 'Housing' },
      { application_id: 'APP-102', student_category: 'Undergraduate', requested_amount: 800, application_status: 'Approved', submission_date: '2026-09-02', gpa: 2.85, hardship_reason: 'Food Insecurity' },
      { application_id: 'APP-103', student_category: 'Graduate', requested_amount: 1500, application_status: 'Under Review', submission_date: '2026-09-03', gpa: 3.80, hardship_reason: 'Technology' },
      { application_id: 'APP-104', student_category: 'Undergraduate', requested_amount: 600, application_status: 'Approved', submission_date: '2026-09-04', gpa: 3.10, hardship_reason: 'Food Insecurity' },
      { application_id: 'APP-105', student_category: 'Undergraduate', requested_amount: 2400, application_status: 'Approved', submission_date: '2026-09-05', gpa: 3.65, hardship_reason: 'Medical' },
      { application_id: 'APP-106', student_category: 'Vocational', requested_amount: 950, application_status: 'Rejected', submission_date: '2026-09-06', gpa: 2.20, hardship_reason: 'Transportation' },
      { application_id: 'APP-107', student_category: 'Undergraduate', requested_amount: 1800, application_status: 'Under Review', submission_date: '2026-09-07', gpa: 3.25, hardship_reason: 'Housing' },
      { application_id: 'APP-108', student_category: 'Graduate', requested_amount: 2100, application_status: 'Approved', submission_date: '2026-09-08', gpa: 3.90, hardship_reason: 'Housing' },
      { application_id: 'APP-109', student_category: 'Undergraduate', requested_amount: 750, application_status: 'Approved', submission_date: '2026-09-09', gpa: 3.40, hardship_reason: 'Technology' },
      { application_id: 'APP-110', student_category: 'Undergraduate', requested_amount: 1300, application_status: 'Under Review', submission_date: '2026-09-10', gpa: 2.95, hardship_reason: 'Medical' },
      { application_id: 'APP-111', student_category: 'Vocational', requested_amount: 500, application_status: 'Rejected', submission_date: '2026-09-11', gpa: 2.40, hardship_reason: 'Technology' },
      { application_id: 'APP-112', student_category: 'Graduate', requested_amount: 1700, application_status: 'Under Review', submission_date: '2026-09-12', gpa: 3.75, hardship_reason: 'Housing' },
    ],
    sampleAnalysis: `Executive Application Screening Memo
To: Emergency Assistance Review Board
From: Junior Business Data Analyst

1. SQL Analysis Findings:
- Using \`SELECT ... WHERE application_status = 'Approved'\`, we verified that 6 of 12 requests ($8,850 total) were approved in the first two weeks of September.
- Running \`ORDER BY requested_amount DESC LIMIT 5\` reveals that the largest grant requests are concentrated in Housing ($2,100 and $1,800) and Medical Emergency ($2,400).
- Filtering for \`student_category = 'Undergraduate' AND gpa >= 3.0\` identifies 5 high-achieving undergraduates (GPAs 3.10 to 3.65) requesting assistance, with an average request of $1,380.

2. Operational Recommendation:
- Accelerate the 4 applications currently \`Under Review\` ($6,900 pending), as all 4 were submitted over 5 days ago and represent urgent Housing and Medical needs.`,
  },

  intermediate: {
    id: 'intermediate',
    label: 'Intermediate',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '12-15 mins',
    title: 'Level 3: Find Patterns in Assistance Applications',
    scenario:
      'The University Financial Aid taskforce wants to understand how emergency grants translate into actual disbursements across student demographic cohorts. Combine relational tables (applications, students, disbursements) using JOIN, GROUP BY, and aggregations (COUNT, SUM, AVG) to discover patterns in funding allocation and identify underserved student groups.',
    problemStatement:
      'Write multi-table SQL queries joining applications, students, and disbursements. Calculate: 1) average disbursement amount and total aid disbursed per major, 2) funding distribution by first-generation student status, and 3) the disbursement gap between requested vs. received funding.',
    learningObjectives: [
      'Write relational SQL queries using INNER JOIN on primary/foreign keys (student_id, application_id)',
      'Aggregate metrics across cohorts using GROUP BY with COUNT(), SUM(), and AVG()',
      'Calculate percentage ratios and gap metrics (requested vs disbursed)',
      'Discover equity patterns in student funding across academic disciplines and first-gen status',
    ],
    instructions: [
      '1. Review the 3 relational tables: applications, students, and disbursements in the explorer.',
      '2. Write a SQL query joining applications and students to calculate total and average requested funding grouped by major.',
      '3. Write a 3-table JOIN including disbursements to calculate the actual disbursed amount per cohort.',
      '4. Compare outcomes for first-generation students (first_gen = 1) versus continuing-generation students (first_gen = 0).',
      '5. Summarize your data insights in the executive memo box.',
    ],
    hints: [
      'Hint 1: To join students and applications: `SELECT s.major, COUNT(a.application_id) AS total_apps, ROUND(AVG(a.requested_amount), 2) AS avg_req FROM students s JOIN applications a ON s.student_id = a.student_id GROUP BY s.major;`.',
      'Hint 2: To join all three tables: `SELECT s.first_gen, COUNT(d.disbursement_id) AS disbursed_count, ROUND(SUM(d.disbursed_amount), 2) AS total_disbursed FROM students s JOIN applications a ON s.student_id = a.student_id JOIN disbursements d ON a.application_id = d.application_id GROUP BY s.first_gen;`.',
      'Hint 3: Notice that Engineering & Nursing students have 100% disbursement fulfillment, whereas Education & Arts majors experience higher reduction in disbursed amounts.',
    ],
    tableName: 'applications',
    schemaColumns: [
      { name: 'application_id', type: 'VARCHAR', description: 'Application primary key' },
      { name: 'student_id', type: 'VARCHAR', description: 'Foreign key referencing students.student_id' },
      { name: 'requested_amount', type: 'DECIMAL', description: 'Requested grant in USD' },
      { name: 'application_status', type: 'VARCHAR', description: 'Approved or Partial' },
      { name: 'term', type: 'VARCHAR', description: 'Academic term (Fall 2026)' },
    ],
    starterQuery: `SELECT 
  s.major,
  COUNT(a.application_id) AS applications_count,
  ROUND(AVG(a.requested_amount), 2) AS avg_requested,
  ROUND(SUM(d.disbursed_amount), 2) AS total_disbursed,
  ROUND(AVG(d.disbursed_amount), 2) AS avg_disbursed
FROM students s
JOIN applications a ON s.student_id = a.student_id
JOIN disbursements d ON a.application_id = d.application_id
GROUP BY s.major
ORDER BY total_disbursed DESC;`,
    sampleQueries: [
      {
        label: 'Disbursement by Student Major',
        query: `SELECT s.major, COUNT(a.application_id) AS apps, ROUND(SUM(a.requested_amount), 2) AS total_requested, ROUND(SUM(d.disbursed_amount), 2) AS total_disbursed FROM students s JOIN applications a ON s.student_id = a.student_id JOIN disbursements d ON a.application_id = d.application_id GROUP BY s.major ORDER BY total_disbursed DESC;`,
        purpose: 'Compare aid requested vs aid actually disbursed across academic majors',
      },
      {
        label: 'First-Gen Equity Breakdown',
        query: `SELECT s.first_gen, COUNT(a.application_id) AS student_count, ROUND(AVG(s.household_income), 2) AS avg_income, ROUND(AVG(d.disbursed_amount), 2) AS avg_disbursement, ROUND(SUM(d.disbursed_amount), 2) AS total_paid FROM students s JOIN applications a ON s.student_id = a.student_id JOIN disbursements d ON a.application_id = d.application_id GROUP BY s.first_gen;`,
        purpose: 'Analyze whether first-gen students receive equitable funding',
      },
      {
        label: 'Payment Method Distribution',
        query: `SELECT d.payment_channel, COUNT(*) AS payment_count, ROUND(SUM(d.disbursed_amount), 2) AS channel_total FROM disbursements d GROUP BY d.payment_channel ORDER BY channel_total DESC;`,
        purpose: 'Determine the fastest and most utilized disbursement channels',
      },
    ],
    expectedInsights: [
      'Nursing & Engineering majors received the highest total disbursements ($3,800 and $3,200) with 100% of requested funds granted.',
      'First-generation students (first_gen = 1) accounted for 60% of all disbursements ($7,450 out of $12,400 total), with an average household income of $22,400.',
      'Direct Deposit accounts for 75% of disbursements, delivering aid within 24 hours of approval.',
      'Education and Humanities students experienced a 15% reduction between requested and disbursed amounts due to departmental budget allocations.',
    ],
    kpis: [
      { label: 'Total Aid Disbursed', value: '$12,400', subtext: 'Across 10 approved grants', trend: 'up' },
      { label: 'First-Gen Allocation', value: '60.1%', subtext: '$7,450 disbursed to first-gen students', trend: 'up' },
      { label: 'Average Disbursement', value: '$1,240', subtext: 'Range: $600 to $2,400', trend: 'neutral' },
      { label: 'Fulfillment Ratio', value: '94.2%', subtext: 'Disbursed vs Requested', trend: 'up' },
    ],
    dataset: [
      { application_id: 'APP-201', student_id: 'STU-01', requested_amount: 1500, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-202', student_id: 'STU-02', requested_amount: 800, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-203', student_id: 'STU-03', requested_amount: 2400, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-204', student_id: 'STU-04', requested_amount: 1200, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-205', student_id: 'STU-05', requested_amount: 1800, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-206', student_id: 'STU-06', requested_amount: 600, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-207', student_id: 'STU-07', requested_amount: 1400, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-208', student_id: 'STU-08', requested_amount: 900, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-209', student_id: 'STU-09', requested_amount: 1100, application_status: 'Approved', term: 'Fall 2026' },
      { application_id: 'APP-210', student_id: 'STU-10', requested_amount: 700, application_status: 'Approved', term: 'Fall 2026' },
    ],
    extraTables: [
      {
        tableName: 'students',
        schemaColumns: [
          { name: 'student_id', type: 'VARCHAR', description: 'Primary key' },
          { name: 'full_name', type: 'VARCHAR', description: 'Student full name' },
          { name: 'major', type: 'VARCHAR', description: 'Academic major' },
          { name: 'household_income', type: 'DECIMAL', description: 'Annual household income' },
          { name: 'first_gen', type: 'INT', description: '1 if first-generation college student, 0 otherwise' },
        ],
        dataset: [
          { student_id: 'STU-01', full_name: 'Elena Rostova', major: 'Nursing', household_income: 18500, first_gen: 1 },
          { student_id: 'STU-02', full_name: 'Marcus Bell', major: 'Computer Science', household_income: 34000, first_gen: 0 },
          { student_id: 'STU-03', full_name: 'Aisha Al-Mansoor', major: 'Nursing', household_income: 16200, first_gen: 1 },
          { student_id: 'STU-04', full_name: 'David Kim', major: 'Mechanical Engineering', household_income: 29000, first_gen: 0 },
          { student_id: 'STU-05', full_name: 'Brianna Jackson', major: 'Mechanical Engineering', household_income: 21000, first_gen: 1 },
          { student_id: 'STU-06', full_name: 'Lucas Silva', major: 'Education', household_income: 24500, first_gen: 1 },
          { student_id: 'STU-07', full_name: 'Samantha Wu', major: 'Education', household_income: 27000, first_gen: 0 },
          { student_id: 'STU-08', full_name: 'Tyler Vance', major: 'Fine Arts', household_income: 31000, first_gen: 0 },
          { student_id: 'STU-09', full_name: 'Jamal Washington', major: 'Computer Science', household_income: 19500, first_gen: 1 },
          { student_id: 'STU-10', full_name: 'Sofia Gomez', major: 'Fine Arts', household_income: 22000, first_gen: 1 },
        ],
      },
      {
        tableName: 'disbursements',
        schemaColumns: [
          { name: 'disbursement_id', type: 'VARCHAR', description: 'Disbursement primary key' },
          { name: 'application_id', type: 'VARCHAR', description: 'Foreign key to applications.application_id' },
          { name: 'disbursed_amount', type: 'DECIMAL', description: 'Actual funds released to student' },
          { name: 'disbursement_date', type: 'VARCHAR', description: 'Date payment initiated' },
          { name: 'payment_channel', type: 'VARCHAR', description: 'Direct Deposit, Prepaid Card, or Campus Cash' },
        ],
        dataset: [
          { disbursement_id: 'DISB-01', application_id: 'APP-201', disbursed_amount: 1500, disbursement_date: '2026-09-04', payment_channel: 'Direct Deposit' },
          { disbursement_id: 'DISB-02', application_id: 'APP-202', disbursed_amount: 800, disbursement_date: '2026-09-05', payment_channel: 'Direct Deposit' },
          { disbursement_id: 'DISB-03', application_id: 'APP-203', disbursed_amount: 2300, disbursement_date: '2026-09-06', payment_channel: 'Direct Deposit' },
          { disbursement_id: 'DISB-04', application_id: 'APP-204', disbursed_amount: 1200, disbursement_date: '2026-09-07', payment_channel: 'Prepaid Card' },
          { disbursement_id: 'DISB-05', application_id: 'APP-205', disbursed_amount: 1800, disbursement_date: '2026-09-08', payment_channel: 'Direct Deposit' },
          { disbursement_id: 'DISB-06', application_id: 'APP-206', disbursed_amount: 550, disbursement_date: '2026-09-09', payment_channel: 'Campus Cash' },
          { disbursement_id: 'DISB-07', application_id: 'APP-207', disbursed_amount: 1250, disbursement_date: '2026-09-10', payment_channel: 'Direct Deposit' },
          { disbursement_id: 'DISB-08', application_id: 'APP-208', disbursed_amount: 850, disbursement_date: '2026-09-11', payment_channel: 'Direct Deposit' },
          { disbursement_id: 'DISB-09', application_id: 'APP-209', disbursed_amount: 1100, disbursement_date: '2026-09-12', payment_channel: 'Direct Deposit' },
          { disbursement_id: 'DISB-10', application_id: 'APP-210', disbursed_amount: 650, disbursement_date: '2026-09-13', payment_channel: 'Prepaid Card' },
        ],
      },
    ],
    sampleAnalysis: `Multi-Table Demographic & Disbursement Audit Memo
To: University Financial Aid Oversight Committee
From: Financial Aid Data Analyst

1. Core Relational Findings:
- By executing an INNER JOIN across students, applications, and disbursements, we audited $12,400 in emergency aid distributed across 10 approved students.
- Nursing ($3,800 total) and Mechanical Engineering ($3,000 total) represented 54.8% of all distributed emergency funding, reflecting high courseware, lab gear, and clinical commute expenses.
- First-Generation Equity: First-gen college students (first_gen = 1) accounted for 60.1% of all funding ($7,450) and had an average household income of $20,200 (vs $30,250 for continuing-generation students). This confirms the emergency fund successfully reaches high-need populations.

2. Strategic Recommendations:
- Expand Direct Deposit Setup Assistance: 75% of disbursements use Direct Deposit, clearing in <24 hours. The remaining 25% using physical prepaid cards suffered a 3-day pickup delay. Provide automated banking linkage during orientation.`,
  },

  advanced: {
    id: 'advanced',
    label: 'Advanced',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '15-18 mins',
    title: 'Level 4: Investigate a Drop in Application Approvals',
    scenario:
      'The Director of Student Financial Services noticed that emergency grant approval rates suddenly dropped from 78% in Spring to only 38% in Fall, leaving hundreds of vulnerable students without promised relief. Leadership assumes students are submitting fraudulent or unqualified applications. Investigate the application_audits table, uncover the true root cause, and respond to an urgent mid-task manager update.',
    problemStatement:
      'Write advanced analytical SQL queries to investigate approval trends across academic terms and rejection reasons. Identify the operational policy shift that caused the approval collapse. Then, respond to the Manager Update by calculating how many first-generation students would be saved if a 7-day document grace period were introduced.',
    learningObjectives: [
      'Analyze longitudinal trends across time periods (Spring vs Fall term)',
      'Calculate conditional approval percentages using CASE WHEN and SUM()',
      'Isolate the administrative root cause (MISSING_SECONDARY_DOCS) vs financial ineligibility',
      'Adapt analysis in real-time to respond to an urgent mid-task manager requirement',
      'Formulate high-impact policy recommendations backed by quantifiable evidence',
    ],
    instructions: [
      '1. Review the application_audits table schema (columns: audit_id, application_id, term, student_category, first_gen_status, requested_amount, approval_status, rejection_reason, doc_delay_days).',
      '2. Query approval rates comparing Spring 2026 vs Fall 2026.',
      '3. Break down rejection reasons: is the collapse due to income ineligibility or procedural document disqualification?',
      '4. Manager Update: The Director asks: "How many rejected first-generation students had submitted documents within 7 days, and what would the revised approval rate be under a 7-day grace period?" Run the revised query to answer.',
      '5. Write an executive brief summarizing your findings and operational remedies.',
    ],
    hints: [
      'Hint 1: Compare terms: `SELECT term, COUNT(*) AS total_apps, ROUND(AVG(CASE WHEN approval_status = "Approved" THEN 1.0 ELSE 0.0 END) * 100, 1) AS approval_rate_pct FROM application_audits GROUP BY term;`.',
      'Hint 2: Group by rejection_reason in Fall 2026: Notice that `MISSING_SECONDARY_DOCS` accounts for 83% of all Fall rejections!',
      'Hint 3: For the Manager Update: Check `WHERE term = "Fall 2026" AND first_gen_status = 1 AND rejection_reason = "MISSING_SECONDARY_DOCS" AND doc_delay_days <= 7`.',
    ],
    tableName: 'application_audits',
    schemaColumns: [
      { name: 'audit_id', type: 'INT', description: 'Audit record key' },
      { name: 'application_id', type: 'VARCHAR', description: 'Application ID' },
      { name: 'term', type: 'VARCHAR', description: 'Spring 2026 or Fall 2026' },
      { name: 'student_category', type: 'VARCHAR', description: 'Undergraduate, Graduate, or Vocational' },
      { name: 'first_gen_status', type: 'INT', description: '1 if first-in-family student, 0 otherwise' },
      { name: 'requested_amount', type: 'DECIMAL', description: 'Grant amount requested' },
      { name: 'approval_status', type: 'VARCHAR', description: 'Approved or Rejected' },
      { name: 'rejection_reason', type: 'VARCHAR', description: 'None, MISSING_SECONDARY_DOCS, INCOME_EXCEEDS_CAP, or DUPLICATE_CLAIM' },
      { name: 'doc_delay_days', type: 'INT', description: 'Days taken to upload supplemental tax/lease verification' },
      { name: 'policy_version', type: 'VARCHAR', description: 'v1.2 (Flexible) or v2.0 (Strict 72-hr rule)' },
    ],
    starterQuery: `SELECT 
  term,
  COUNT(*) AS total_applications,
  SUM(CASE WHEN approval_status = 'Approved' THEN 1 ELSE 0 END) AS approved_count,
  SUM(CASE WHEN approval_status = 'Rejected' THEN 1 ELSE 0 END) AS rejected_count,
  ROUND(AVG(CASE WHEN approval_status = 'Approved' THEN 1.0 ELSE 0.0 END) * 100, 1) AS approval_rate_pct
FROM application_audits
GROUP BY term
ORDER BY term DESC;`,
    sampleQueries: [
      {
        label: 'Rejection Reason Breakdown (Fall 2026)',
        query: `SELECT rejection_reason, COUNT(*) AS rejection_count FROM application_audits WHERE term = 'Fall 2026' AND approval_status = 'Rejected' GROUP BY rejection_reason ORDER BY rejection_count DESC;`,
        purpose: 'Discover the root cause behind the Fall approval crash',
      },
      {
        label: 'Manager Update: 7-Day Grace Period Impact',
        query: `SELECT first_gen_status, COUNT(*) AS students_recoverable, ROUND(SUM(requested_amount), 2) AS aid_to_restore FROM application_audits WHERE term = 'Fall 2026' AND rejection_reason = 'MISSING_SECONDARY_DOCS' AND doc_delay_days <= 7 GROUP BY first_gen_status;`,
        purpose: 'Calculate how many students are restored by relaxing the 72-hr rule to 7 days',
      },
      {
        label: 'Document Delay Distribution',
        query: `SELECT doc_delay_days, COUNT(*) AS application_count, approval_status FROM application_audits WHERE term = 'Fall 2026' GROUP BY doc_delay_days, approval_status ORDER BY doc_delay_days ASC;`,
        purpose: 'See how the 3-day strict cutoff penalized working students who submitted on days 4-6',
      },
    ],
    expectedInsights: [
      'Approval rate plummeted from 77.8% in Spring 2026 (7/9 approved) down to 36.4% in Fall 2026 (4/11 approved).',
      'The crash was NOT caused by student ineligibility: only 1 student exceeded income limits. Instead, 6 out of 7 rejections in Fall were triggered by "MISSING_SECONDARY_DOCS" due to a new strict 72-hour document upload window instituted in August.',
      'Manager Update Impact: 5 out of the 6 rejected students had submitted their documents between Day 4 and Day 7! Adopting a 7-day grace period restores 5 students ($7,100 in aid), of whom 4 are first-generation college attendees.',
      'Under the proposed 7-day grace period, the Fall approval rate rebounds from 36.4% back to 81.8%.',
    ],
    kpis: [
      { label: 'Spring Approval Rate', value: '77.8%', subtext: 'Under flexible policy v1.2', trend: 'up' },
      { label: 'Fall Approval Rate', value: '36.4%', subtext: 'Crashed under strict 72-hr rule', trend: 'down' },
      { label: 'Procedural Rejections', value: '85.7%', subtext: '6 of 7 rejections due to doc timer', trend: 'down' },
      { label: 'Recoverable With 7-Day Grace', value: '5 Students', subtext: '$7,100 aid restored (4 first-gen)', trend: 'up' },
    ],
    dataset: [
      // Spring 2026 Cohort (Flexible Policy)
      { audit_id: 1, application_id: 'SP-01', term: 'Spring 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 1200, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 2, policy_version: 'v1.2' },
      { audit_id: 2, application_id: 'SP-02', term: 'Spring 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 800, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 4, policy_version: 'v1.2' },
      { audit_id: 3, application_id: 'SP-03', term: 'Spring 2026', student_category: 'Graduate', first_gen_status: 0, requested_amount: 1500, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 3, policy_version: 'v1.2' },
      { audit_id: 4, application_id: 'SP-04', term: 'Spring 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 1800, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 6, policy_version: 'v1.2' },
      { audit_id: 5, application_id: 'SP-05', term: 'Spring 2026', student_category: 'Vocational', first_gen_status: 1, requested_amount: 600, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 1, policy_version: 'v1.2' },
      { audit_id: 6, application_id: 'SP-06', term: 'Spring 2026', student_category: 'Undergraduate', first_gen_status: 0, requested_amount: 1000, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 5, policy_version: 'v1.2' },
      { audit_id: 7, application_id: 'SP-07', term: 'Spring 2026', student_category: 'Graduate', first_gen_status: 0, requested_amount: 2200, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 3, policy_version: 'v1.2' },
      { audit_id: 8, application_id: 'SP-08', term: 'Spring 2026', student_category: 'Vocational', first_gen_status: 1, requested_amount: 900, approval_status: 'Rejected', rejection_reason: 'INCOME_EXCEEDS_CAP', doc_delay_days: 2, policy_version: 'v1.2' },
      { audit_id: 9, application_id: 'SP-09', term: 'Spring 2026', student_category: 'Undergraduate', first_gen_status: 0, requested_amount: 1400, approval_status: 'Rejected', rejection_reason: 'DUPLICATE_CLAIM', doc_delay_days: 1, policy_version: 'v1.2' },

      // Fall 2026 Cohort (Strict 72-Hour Rule)
      { audit_id: 10, application_id: 'FA-01', term: 'Fall 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 1400, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 2, policy_version: 'v2.0' },
      { audit_id: 11, application_id: 'FA-02', term: 'Fall 2026', student_category: 'Graduate', first_gen_status: 0, requested_amount: 2000, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 1, policy_version: 'v2.0' },
      { audit_id: 12, application_id: 'FA-03', term: 'Fall 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 1100, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 2, policy_version: 'v2.0' },
      { audit_id: 13, application_id: 'FA-04', term: 'Fall 2026', student_category: 'Vocational', first_gen_status: 0, requested_amount: 750, approval_status: 'Approved', rejection_reason: 'None', doc_delay_days: 3, policy_version: 'v2.0' },
      { audit_id: 14, application_id: 'FA-05', term: 'Fall 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 1600, approval_status: 'Rejected', rejection_reason: 'MISSING_SECONDARY_DOCS', doc_delay_days: 5, policy_version: 'v2.0' },
      { audit_id: 15, application_id: 'FA-06', term: 'Fall 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 1300, approval_status: 'Rejected', rejection_reason: 'MISSING_SECONDARY_DOCS', doc_delay_days: 4, policy_version: 'v2.0' },
      { audit_id: 16, application_id: 'FA-07', term: 'Fall 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 1500, approval_status: 'Rejected', rejection_reason: 'MISSING_SECONDARY_DOCS', doc_delay_days: 6, policy_version: 'v2.0' },
      { audit_id: 17, application_id: 'FA-08', term: 'Fall 2026', student_category: 'Graduate', first_gen_status: 0, requested_amount: 1800, approval_status: 'Rejected', rejection_reason: 'MISSING_SECONDARY_DOCS', doc_delay_days: 5, policy_version: 'v2.0' },
      { audit_id: 18, application_id: 'FA-09', term: 'Fall 2026', student_category: 'Vocational', first_gen_status: 1, requested_amount: 900, approval_status: 'Rejected', rejection_reason: 'MISSING_SECONDARY_DOCS', doc_delay_days: 7, policy_version: 'v2.0' },
      { audit_id: 19, application_id: 'FA-10', term: 'Fall 2026', student_category: 'Undergraduate', first_gen_status: 0, requested_amount: 2500, approval_status: 'Rejected', rejection_reason: 'INCOME_EXCEEDS_CAP', doc_delay_days: 2, policy_version: 'v2.0' },
      { audit_id: 20, application_id: 'FA-11', term: 'Fall 2026', student_category: 'Undergraduate', first_gen_status: 1, requested_amount: 1250, approval_status: 'Rejected', rejection_reason: 'MISSING_SECONDARY_DOCS', doc_delay_days: 12, policy_version: 'v2.0' },
    ],
    managerUpdate: {
      author: 'Marcus Chen',
      role: 'Director of Student Financial Services',
      timestamp: 'Mid-Task Update (Urgent Inquiry)',
      subject: 'Inquiry: Quantify First-Gen Impact of the 7-Day Document Grace Window',
      message:
        'Team: I just reviewed preliminary numbers and suspect our automated 72-hour document cancellation rule is disqualifying legitimate low-income students who simply cannot get tax returns from parents on a weekday. Please run a query to quantify how many rejected first-generation students uploaded documents within 7 days, and estimate what our approval rate would look like if we adopt a 7-day grace window.',
      revisedTask:
        'Calculate how many rejected Fall 2026 first-generation students had submitted supplemental documents within 7 days (`doc_delay_days <= 7`), the total aid to restore, and the revised approval percentage.',
      revisedQueryHint:
        'SELECT first_gen_status, COUNT(*) AS recoverable_students, SUM(requested_amount) AS restored_aid FROM application_audits WHERE term = "Fall 2026" AND rejection_reason = "MISSING_SECONDARY_DOCS" AND doc_delay_days <= 7 GROUP BY first_gen_status;',
    },
    sampleAnalysis: `Executive Investigation Memo: Approval Rate Drop Root Cause & Grace Period Proposal
To: Director Marcus Chen, Student Financial Services
From: Senior Financial Aid Data Analyst

1. Executive Summary:
- The catastrophic drop in emergency grant approval rates from 77.8% (Spring) to 36.4% (Fall) was NOT driven by fraudulent claims or student financial ineligibility.
- Only 1 of 11 Fall applicants exceeded the household income cap ($2,500 request, APP FA-10).
- Instead, 85.7% of all rejections (6 out of 7 students) were caused purely by the administrative "MISSING_SECONDARY_DOCS" trigger, enacted when Policy v2.0 imposed an inflexible 72-hour document deadline in August.

2. Manager Inquiry Response (7-Day Grace Period Quantification):
- Querying \`WHERE term = 'Fall 2026' AND rejection_reason = 'MISSING_SECONDARY_DOCS' AND doc_delay_days <= 7\`:
  * 5 out of the 6 rejected students successfully submitted their documents between Day 4 and Day 7.
  * 4 of these 5 students are first-generation college attendees (80%), representing $5,300 in critically needed rent and food aid.
  * Implementing an immediate 7-day grace period restores 5 students and elevates the Fall approval rate from 36.4% back to 81.8% (9 approved out of 11).

3. Recommended Operational Remedies:
- Replace the automated 72-hour hard cutoff with a 7-day active grace period.
- Implement automated SMS reminders on Day 2 and Day 5 with mobile upload links.
- Retroactively approve and disburse the $7,100 in pending grants to the 5 affected Fall applicants.`,
  },
};
