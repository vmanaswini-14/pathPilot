import { DifficultyLevel, UxDesignerLevelConfig } from '../types';

export const UX_DESIGNER_LEVELS: Record<DifficultyLevel, UxDesignerLevelConfig> = {
  beginner: {
    id: 'beginner',
    label: 'Beginner',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '8-10 mins',
    title: 'Level 1: Spot the Usability Problems',
    scenario:
      'The University Student Care Network launched a mobile app for students to anonymously reserve free weekly grocery hampers from the campus food pantry. While 4,200 students start a pantry cart, 68% abandon the order at the final confirmation screen. The Care Network Director asks you to identify the psychological barriers and design flaws.',
    problemStatement:
      'Inspect the final reservation screen mockup. Identify 4 design flaws that trigger social stigma, privacy fear, and logistical anxiety. Click on the interactive hotspot pins to audit each issue and select the core usability and emotional barriers.',
    screenTitle: 'CampusPantry — Final Reserve Step',
    screenSubtitle: 'High-friction checkout screen causing 68% student abandonment',
    learningObjectives: [
      'Conduct a heuristic evaluation targeting emotional safety and dignity in public services',
      'Identify dark patterns, aggressive countdown timers, and institutional jargon',
      'Craft empathetic microcopy and accessible self-service pickup options',
      'Translate user interviews into actionable design recommendations',
    ],
    instructions: [
      '1. Review the interactive mobile phone preview of the CampusPantry confirmation screen.',
      '2. Click on the 4 hotspot pins located directly on the screen to inspect each usability issue.',
      '3. Review student interview quotes highlighting anxiety around stigma and basement buzzers.',
      '4. Formulate your findings and recommendations in the design audit summary.',
    ],
    hints: [
      'Hint 1: Look at Callout 1: "CRITICAL NEED SUBSIDY #84102". Red warning banners activate feelings of shame and poverty stigma.',
      'Hint 2: Callout 2 shows a ticking 10-minute cancellation countdown. High-stress countdown timers induce panic rather than confidence.',
      'Hint 3: In your recommendation, suggest a discreet 24/7 smart locker pickup with a 4-digit QR code, eliminating the fear of being seen outside a basement buzzer.',
    ],
    mockupCallouts: [
      {
        id: 1,
        title: 'Institutional Stigmatizing Banner',
        component: 'Header Warning Bar',
        issue: 'Red alert banner reading "CRITICAL NEED SUBSIDY #84102: You are claiming an emergency poverty benefit allocation." activates social shame and fear that financial aid will be alerted.',
        heuristicViolated: 'Match Between System and Real World / Dignity-First UX',
        studentQuote: '"When the screen said EMERGENCY NEED SUBSIDY, I closed the app immediately. I thought my scholarship might get revoked if financial aid thought I couldn’t afford groceries."',
        recommendation: 'Replace with warm, welcoming phrasing: "Your Fresh Pantry Box is ready to reserve." Add an explicit shield badge: "100% Confidential. Never shared with professors, registrar, or financial aid."',
      },
      {
        id: 2,
        title: 'Artificial Panic Timer',
        component: 'Reservation Countdown Clock',
        issue: 'Ticking 10:00 countdown clock threatens: "Cart expires in 10 mins. Forfeited boxes will be reallocated to urgent waitlist." forcing panic-driven abandonment.',
        heuristicViolated: 'Aesthetic and Minimalist Design / Psychological Safety',
        studentQuote: '"A countdown clock ticking down 10 minutes while I was walking between lectures made me panic. It felt like I was being penalized for taking a second to think."',
        recommendation: 'Replace aggressive countdown with a generous, calm reservation window: "Reserved for you today until 7:00 PM." Allow 1-click renewal.',
      },
      {
        id: 3,
        title: 'High-Anxiety Physical Pickup Instructions',
        component: 'Basement Buzzer Location Card',
        issue: '"Location: Room B-12 North Basement - Ring buzzer 3 times. Show physical Student ID to desk monitor." provides zero privacy reassurance and forces an intimidating personal encounter.',
        heuristicViolated: 'Flexibility and Efficiency of Use / Privacy Assurance',
        studentQuote: '"I walked to the basement twice and turned around because there was a loud buzzer and I didn’t want anyone to see me standing outside an emergency pantry door."',
        recommendation: 'Offer choice of: 1) "Smart Locker Pickup" (private 4-digit QR code to unlock exterior lockers 24/7 with zero human contact), or 2) "Discreet Curbside Quick-Bag" with clear photos of the side entrance.',
      },
      {
        id: 4,
        title: 'Aggressive Bureaucratic CTA Button',
        component: 'Primary Action Button',
        issue: 'Button text reads "EXECUTE FINAL TRANSACTION & BIND STUDENT ID" in stark black-and-red styling, looking like a punitive judicial process.',
        heuristicViolated: 'Consistency and Standards / Clear Affordance',
        studentQuote: '"The button looked like I was signing away my privacy or getting in trouble with campus police."',
        recommendation: 'Change button text to: "Reserve My Box (Free)" with helper subtext: "Always free for all enrolled students. No payment or credit card ever requested."',
      },
    ],
    userQuotes: [
      {
        author: 'Maya S.',
        role: 'Sophomore (Commuter Student)',
        quote: 'When the screen said "EXECUTE TRANSACTION & BIND ID", I closed the app immediately. I thought my scholarship might get revoked if financial aid thought I couldn’t afford groceries.',
      },
      {
        author: 'David T.',
        role: 'Junior (First-Generation College Student)',
        quote: 'I walked to the basement twice and turned around because there was a buzzer and I didn’t want anyone to see me standing outside an emergency pantry door.',
      },
      {
        author: 'Amina K.',
        role: 'Graduate Student (International)',
        quote: 'A countdown clock ticking down 10 minutes while I was walking between lab lectures made me panic. It felt like I was being penalized for taking a minute to think.',
      },
    ],
    heuristics: [
      { name: 'Match Between System and Real World', principle: 'Speak the user’s language with words and concepts familiar to students, rather than institutional bureaucratic jargon.', application: 'Replace "EXECUTE SUBSIDY" with "Reserve My Pantry Box".' },
      { name: 'Visibility of System Status', principle: 'Keep users informed about what is happening, with appropriate feedback within reasonable time.', application: 'Show clear confirmation steps: Reserved → Locker Code Ready → Picked Up.' },
      { name: 'Psychological Safety & Dignity', principle: 'Design interfaces that treat users in vulnerable circumstances with respect, privacy, and zero moral judgment.', application: 'Prominent privacy guarantee that order history is never shared with university administration.' },
    ],
    sampleAnswer: `CampusPantry Confirmation Flow Redesign Audit
1. Three Critical Usability & Emotional Barriers:
- Stigmatizing & Threatening Visual Language: The red alert banner ("EMERGENCY NEED SUBSIDY #84102") and aggressive button label ("EXECUTE FINAL TRANSACTION & BIND STUDENT ID") activate social shame and fear of financial penalties.
- Severe Anxiety Around Physical Pickup Logistics: "Room B-12 North Basement - Ring buzzer" provides no privacy reassurance, no operating hours, and no clarity on whether someone will look at them. This drives the 68% drop-off because students dread an uncomfortable physical encounter.
- High-Stress Artificial Urgency: The ticking 10-minute cancellation timer forces panic-induced abandonment rather than thoughtful scheduling.

2. UX & UI Redesign Solutions:
- Humanized, Warm Header: Replace the clinical warning with a welcoming, calming card: "Your Fresh Pantry Box is ready to reserve." Add an explicit shield badge: "100% Confidential. Never shared with professors, registrar, or financial aid."
- Dignified Pickup Options (Self-Service Smart Locker): Provide a private 4-digit QR code to unlock a discreet exterior locker available 24/7 with no human interaction required.
- Reassuring Call to Action: Change the button to: "Reserve My Box (Free)" with secondary helper microcopy: "Always free for all enrolled students."`,
  },

  easy: {
    id: 'easy',
    label: 'Easy',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '10-12 mins',
    title: 'Level 2: Improve a Confusing Application Form',
    scenario:
      'Students applying for semester relief grants are failing to complete the registration form. The current interface was built by an administrative database programmer: field order asks for tax transcripts before the student’s name, labels are cryptic database column names (e.g. BURSAR_SUB_REQ), and error messages display raw system error codes.',
    problemStatement:
      'Use the interactive Form Redesign Workspace to repair this form. Reorder the fields into a logical sequence (Name → Email/ID → Requested Amount → Reason → Documents), rewrite the confusing labels into human-friendly language, replace system error codes with constructive validation messages, and update the primary button text.',
    screenTitle: 'Student Relief Grant Application Form',
    screenSubtitle: 'Confusing administrative layout with poor labels and cryptic errors',
    learningObjectives: [
      'Reorder form fields to follow natural cognitive flow and progressive disclosure',
      'Translate technical database field names into conversational, student-friendly labels',
      'Write constructive, plain-English validation error messages that guide error recovery',
      'Optimize primary action button labels for clarity and confidence',
    ],
    instructions: [
      '1. Review the initial confusing form layout in the live screen preview.',
      '2. Use the Move Up / Move Down buttons to reorder fields logically.',
      '3. Edit field labels to plain English (e.g. replace "LEGAL_SUBJECT_FULL_DESIGNATION" with "Full Legal Name").',
      '4. Replace raw error codes (e.g. "FATAL_ERR_0x9: FILE MISSING") with helpful recovery instructions.',
      '5. Customize the Primary Button text from "SUBMIT_RAW_STREAM" to an action-oriented label like "Submit Emergency Grant Application".',
    ],
    hints: [
      'Hint 1: Standard form cognitive hierarchy should start with easy, familiar fields (Full Name, Student ID) before asking for sensitive financial amounts or heavy document uploads.',
      'Hint 2: Good error messages explain what went wrong and how to fix it: "Please upload your parent’s 2025 W-2 or signed tax return in PDF format" instead of "ERR_0x9".',
      'Hint 3: Action buttons should declare the outcome: "Submit Application" or "Save & Continue" rather than "SUBMIT_DATA".',
    ],
    mockupCallouts: [],
    userQuotes: [
      {
        author: 'Marcus P.',
        role: 'Freshman applicant',
        quote: 'The first thing the form asked me for was BURSAR_ANNEX_W2 before even asking my name! I thought I was in the wrong department portal.',
      },
      {
        author: 'Elena R.',
        role: 'Working student',
        quote: 'When I hit submit, a red banner popped up saying VALUE_OUT_OF_BOUNDS_FLOAT without telling me what number was invalid.',
      },
    ],
    heuristics: [
      { name: 'Error Prevention & Recovery', principle: 'Help users recognize, diagnose, and recover from errors using plain language, indicating precisely what needs correction.', application: 'Specify exact allowed formats and ranges in helper text.' },
      { name: 'Recognition Rather Than Recall', principle: 'Make elements, actions, and options visible. The user should not have to remember information from one part of the form to another.', application: 'Clear logical field ordering.' },
    ],
    formFields: [
      {
        id: 'field_docs',
        originalLabel: 'BURSAR_ANNEX_PARENT_W2_TRANSCRIPT',
        suggestedLabel: 'Parent Tax Transcript / W-2 (PDF)',
        type: 'file',
        order: 5,
        required: true,
        originalError: 'FATAL_ERR_0x9: FILE MISSING',
        suggestedError: 'Please upload a PDF or clear photo of your 2025 tax transcript.',
        helperText: 'Required for household income verification. Accepted formats: PDF, PNG, JPG.',
      },
      {
        id: 'field_id',
        originalLabel: 'GOVT_IDENTIFIER_NUM_RAW',
        suggestedLabel: 'Student ID Number (9 Digits)',
        type: 'text',
        order: 2,
        required: true,
        originalError: 'ERR: DIGITS REQUIRED',
        suggestedError: 'Please enter your 9-digit campus Student ID (e.g. 109847291).',
        helperText: 'Found on the front of your campus card.',
      },
      {
        id: 'field_name',
        originalLabel: 'LEGAL_SUBJECT_FULL_DESIGNATION',
        suggestedLabel: 'Full Legal Name',
        type: 'text',
        order: 1,
        required: true,
        originalError: 'ERR_NAME_INVALID',
        suggestedError: 'Please enter your first and last name as listed on university records.',
        helperText: 'As registered in the student portal.',
      },
      {
        id: 'field_amount',
        originalLabel: 'DISBURSEMENT_REQUISITION_FLOAT',
        suggestedLabel: 'Requested Assistance Amount ($)',
        type: 'number',
        order: 3,
        required: true,
        originalError: 'VALUE OUT OF BOUNDS',
        suggestedError: 'Please enter an amount between $100 and $2,500.',
        helperText: 'University emergency grants are awarded up to $2,500 per semester.',
      },
      {
        id: 'field_reason',
        originalLabel: 'SUBSTANTIATION_JUSTIFICATION_BLOB',
        suggestedLabel: 'Brief Description of Emergency Circumstances',
        type: 'text',
        order: 4,
        required: true,
        originalError: 'TEXT TOO SHORT',
        suggestedError: 'Please provide at least 2-3 sentences explaining your sudden financial hardship.',
        helperText: 'Explain the unexpected expense (e.g. medical copay, rent shortfall, utility cut-off).',
      },
    ],
    sampleAnswer: `Form Redesign Specification Memo
1. Cognitive Reordering:
- Moved Full Legal Name and Student ID to the top (Positions 1 & 2) to establish cognitive orientation and psychological safety.
- Placed Requested Assistance Amount and Emergency Explanation in the middle (Positions 3 & 4).
- Moved Parent Tax Transcript / W-2 Document Upload to the end (Position 5) so students only face heavy file uploads after completing simple personal fields.

2. Plain-English Label & Error Upgrades:
- Replaced "LEGAL_SUBJECT_FULL_DESIGNATION" with "Full Legal Name".
- Replaced "DISBURSEMENT_REQUISITION_FLOAT" with "Requested Assistance Amount ($)" and added explicit ceiling guidance (up to $2,500).
- Replaced cryptic system errors like "FATAL_ERR_0x9: FILE MISSING" with clear recovery steps: "Please upload a PDF or clear photo of your 2025 tax transcript."

3. Button & Action Clarity:
- Replaced "SUBMIT_RAW_STREAM" with "Submit Emergency Grant Application (Secure)".`,
  },

  intermediate: {
    id: 'intermediate',
    label: 'Intermediate',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '12-15 mins',
    title: 'Level 3: Design for Accessibility and Competing Needs',
    scenario:
      'Students accessing the financial aid portal have diverse needs: many apply late at night on low-cost smartphones with cracked screens, students with ADHD report feeling overwhelmed by dense text blocks, and visually impaired students using screen readers encounter unlabelled icon buttons. Audit and configure the accessibility settings to meet WCAG 2.1 AA standards.',
    problemStatement:
      'Configure the accessibility and usability controls for the relief portal. Optimize color contrast (4.5:1 ratio minimum), enable visible keyboard focus rings, activate touch-friendly 48px tap targets, implement inline validation helpers, and provide screen reader aria-labels.',
    screenTitle: 'Financial Aid Portal — Accessibility & Inclusivity Mode',
    screenSubtitle: 'Multi-device responsive portal adhering to WCAG 2.1 AA standards',
    learningObjectives: [
      'Apply WCAG 2.1 AA accessibility guidelines (contrast ratios, focus states, text resizing)',
      'Design accessible mobile touch targets (minimum 48x48px clickable areas)',
      'Structure error prevention and recovery with persistent inline validation helpers',
      'Support keyboard navigation and screen reader assistive technology',
    ],
    instructions: [
      '1. Review the accessibility controls panel in the workspace.',
      '2. Toggle high-contrast color mode and observe readability changes in the screen preview.',
      '3. Enable enhanced keyboard focus indicator rings for keyboard-only navigation.',
      '4. Switch from cramped links to 48px touch targets for mobile accessibility.',
      '5. Enable inline validation helpers with icons to support neurodivergent students.',
      '6. Write an accessibility audit memo detailing how your choices satisfy WCAG 2.1 AA.',
    ],
    hints: [
      'Hint 1: Low contrast text (e.g. light gray on white) fails WCAG AA 4.5:1 ratio, making forms illegible outdoors or on older smartphone screens.',
      'Hint 2: Touch targets smaller than 48px cause mis-clicks and rage taps on mobile devices.',
      'Hint 3: Inline validation gives immediate feedback so students do not fill out an entire 5-step form only to be confronted with 6 errors at the end.',
    ],
    mockupCallouts: [
      {
        id: 1,
        title: 'Contrast Ratio Failure',
        component: 'Form Labels & Helper Text',
        issue: 'Light gray #A0A0A0 text on white background has a 2.4:1 contrast ratio, failing WCAG AA (requires 4.5:1 for normal text).',
        heuristicViolated: 'WCAG 1.4.3 Contrast (Minimum)',
        recommendation: 'Increase text color contrast to #4A3028 on #F8F3EB (exceeds 7:1 contrast ratio).',
      },
      {
        id: 2,
        title: 'Missing Focus State for Keyboard Users',
        component: 'Interactive Input Fields',
        issue: 'Input fields have outline: none with zero visual indication when focused via Tab key.',
        heuristicViolated: 'WCAG 2.4.7 Focus Visible',
        recommendation: 'Add high-visibility 2px solid #B9825B focus outline ring with 2px offset.',
      },
      {
        id: 3,
        title: 'Cramped Mobile Touch Targets',
        component: 'Action Buttons & Checkboxes',
        issue: 'Checkbox tap area is only 16x16px, causing mobile users to accidentally trigger adjacent terms links.',
        heuristicViolated: 'WCAG 2.5.5 Target Size',
        recommendation: 'Enlarge touch target bounding box to 48x48px with generous padding.',
      },
    ],
    userQuotes: [
      {
        author: 'Jordan K.',
        role: 'Student with low vision',
        quote: 'The light gray text was impossible to read on my phone while sitting on the bus. I gave up on applying until a friend told me to use a desktop computer.',
      },
      {
        author: 'Samira M.',
        role: 'Keyboard-only user',
        quote: 'When I hit Tab, the cursor disappeared into thin air. There was no blue or brown outline showing which box I was typing in.',
      },
    ],
    heuristics: [
      { name: 'Perceivable (WCAG)', principle: 'Information and user interface components must be presentable to users in ways they can perceive (sufficient contrast, alternative text).', application: 'High-contrast palette #4A3028 with 7.2:1 ratio.' },
      { name: 'Operable (WCAG)', principle: 'User interface components and navigation must be operable via keyboard, with generous target sizes and clear focus rings.', application: '48px minimum touch targets and visible outline.' },
      { name: 'Understandable (WCAG)', principle: 'Information and the operation of user interface must be understandable, with intuitive error guidance.', application: 'Persistent inline helper text and icon indicators.' },
    ],
    sampleAnswer: `Accessibility & Inclusivity Design Specification Memo
1. WCAG 2.1 AA Compliance Strategy:
- Contrast Enhancement: Replaced low-contrast #A0A0A0 gray text with warm espresso #4A3028 text on cream #F8F3EB surfaces, delivering a 7.2:1 contrast ratio (far surpassing the 4.5:1 AA requirement).
- Visible Keyboard Focus Indicator: Implemented a 3px bold #B9825B focus ring with a 2px white gap offset, ensuring students using Tab key navigation always know their exact cursor location.
- Ergonomic 48px Touch Targets: Expanded checkbox and action button tap targets from 18px to a minimum 48x48px bounding box to eliminate mobile mis-taps.
- Inline Error Guidance & ARIA Landmarks: Replaced post-submission error popups with live inline validation and SVG check/warning icons so students with colorblindness or cognitive load challenges receive clear feedback immediately.`,
  },

  advanced: {
    id: 'advanced',
    label: 'Advanced',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '15-18 mins',
    title: 'Level 4: Respond to a Changing Product Requirement',
    scenario:
      'You designed a streamlined 1-page emergency assistance request flow that reduced student drop-off by 45%. However, 2 days before launch, an urgent regulatory mandate arrives from university legal counsel: the university MUST collect Emergency Contact details and Student Dependent Status for compliance. The Product Manager warns that adding two heavy sections could undo your drop-off gains.',
    problemStatement:
      'Incorporate the new compliance requirements without cluttering the screen or overwhelming students. Use progressive disclosure (expandable accordion card, contextual drawer, or smart conditional revealing), prioritize essential fields first, and write reassuring microcopy explaining why compliance data is collected.',
    screenTitle: 'Emergency Assistance Portal — Progressive Compliance Flow',
    screenSubtitle: 'Balancing streamlined user flow with mandatory state compliance fields',
    learningObjectives: [
      'Implement progressive disclosure to manage complex form requirements without cognitive overload',
      'Balance regulatory/compliance constraints with human-centered student agency',
      'Craft reassuring microcopy that prevents abandonment when asking for sensitive data',
      'Articulate design trade-offs in an executive product management memo',
    ],
    instructions: [
      '1. Review the initial streamlined flow in the screen preview.',
      '2. Read the urgent mid-task Manager Update from Marcus Chen.',
      '3. Select your progressive disclosure strategy (Expandable Compliance Card, Multi-Step Drawer, or Conditional Reveal).',
      '4. Add reassuring privacy microcopy explaining how emergency contact information is protected.',
      '5. Write your design rationale memo detailing how you balanced compliance with low friction.',
    ],
    hints: [
      'Hint 1: Progressive disclosure hides complexity until the user needs it. Instead of cluttering the main screen with 6 new inputs, keep them inside a secondary accordion card: "Optional Family & Emergency Verification (Required for Grants > $1,000)".',
      'Hint 2: Reassuring microcopy prevents panic: "Emergency contact is only used if student safety is at risk; never contacted for financial debt collection."',
      'Hint 3: Prioritize essential fields (Name, Amount, Reason) upfront so students feel immediate progress.',
    ],
    mockupCallouts: [],
    userQuotes: [
      {
        author: 'Marcus Chen',
        role: 'Product Lead',
        quote: 'If we put a giant legal compliance box right in the middle of the screen, our mobile abandonment will spike right back to 60%. We need a clever progressive disclosure design.',
      },
      {
        author: 'Priya N.',
        role: 'First-generation junior',
        quote: 'When apps suddenly demand emergency contact and parental info, I worry they are going to call my family or report my financial situation.',
      },
    ],
    heuristics: [
      { name: 'Progressive Disclosure', principle: 'Show only what is necessary on the primary screen. Defer advanced or compliance details until relevant to reduce cognitive clutter.', application: 'Collapsible accordion card for compliance verification.' },
      { name: 'Psychological Safety & Reassurance', principle: 'Explain why sensitive data is collected and how it will (and will not) be used.', application: 'Explicit privacy guarantee badge.' },
    ],
    managerUpdate: {
      author: 'Marcus Chen',
      role: 'Lead Product Manager & Compliance Liaison',
      timestamp: 'Mid-Sprint Emergency Update',
      subject: 'URGENT: State Compliance Mandate (Emergency Contact & Dependency Status)',
      message:
        'Team: University Legal just notified us that HB-402 mandates collecting: 1) Secondary Emergency Contact Name & Phone, and 2) Dependent Student Household Status before releasing university grants over $500. However, our user testing proved students abandon when faced with long forms! We need you to integrate these fields using progressive disclosure so casual applicants aren’t overwhelmed, while keeping the audit trail 100% compliant.',
      newRequirement:
        'Incorporate Emergency Contact and Dependent Status using progressive disclosure with reassuring privacy microcopy.',
    },
    sampleAnswer: `Progressive Compliance Architecture & Trade-Off Memo
To: Marcus Chen, Product Lead
From: Senior UX / Product Designer

1. The UX Dilemma:
State compliance requires collecting secondary Emergency Contact info and Dependent Household Status, but displaying them upfront introduces form fatigue and privacy anxiety, threatening our 45% reduction in drop-off.

2. Selected Solution: Contextual Progressive Disclosure:
- Tiered Information Architecture: We retain our clean 3-field primary form (Name, Student ID, Requested Amount).
- Conditional Accordion Card: If the requested grant is over $500 (the statutory threshold), an elegant expandable accordion gracefully expands: "Mandatory State Compliance Details (Quick 2-minute step)".
- Explicit Privacy Shield Microcopy: Right beside the emergency contact field, we place a prominent privacy reassurance badge:
  "Confidentiality Notice: Emergency contact information is strictly archived for safety welfare checks. Your emergency contact is NEVER notified regarding grant amounts or financial records."
- Auto-fill Integration: If the student previously entered contact info in the campus registrar portal, provide a 1-click "Import from Student Profile" button to reduce typing to 0 seconds.

3. Measurable Impact:
This satisfies 100% of state audit criteria while preserving the frictionless feel of our single-page experience, protecting completion rates above 80%.`,
  },
};
