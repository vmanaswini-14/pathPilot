import { DifficultyLevel, ProgrammingLanguage } from '../types';

export interface LevelConfig {
  id: DifficultyLevel;
  label: string;
  badgeColor: string;
  estimatedTime: string;
  title: string;
  summary: string;
  learningObjectives: string[];
  instructions: string[];
  hints: string[];
  functionName: string;
  starterCodes: Record<ProgrammingLanguage, string>;
  testCases: Array<{
    id: number;
    name: string;
    description: string;
    input: any;
    expected: any;
    isEdgeCase?: boolean;
    isManagerRequirement?: boolean;
  }>;
}

export const SWE_MANAGER_UPDATE = {
  author: 'Marcus Chen',
  role: 'Lead Systems Engineer & Student Aid Liaison',
  avatarInitials: 'MC',
  timestamp: 'Mid-Task Update (Slack #student-aid-core)',
  subject: 'URGENT: Hardship Policy Amendment (+ $300 Medical Relief)',
  message:
    'Hey team! The Financial Aid Board just passed an emergency policy update: If a student record contains `medicalHardship: true`, award an additional $300 emergency supplement to assist with health copays. However, the university grant limit of $2,500 remains strictly capped! Please update your calculation function to support this flag and verify that edge cases still pass.',
  newRequirement: 'If student.medicalHardship === true, add $300 bonus, clamped at $2,500 maximum.',
};

export const SWE_LEVELS: Record<DifficultyLevel, LevelConfig> = {
  beginner: {
    id: 'beginner',
    label: 'Beginner',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '6-8 mins',
    title: 'Level 1: Student Loan EMI Calculator',
    summary:
      'A student wants to understand the monthly repayment (EMI) for a hypothetical education loan. Fix the calculation formula and input guards.',
    learningObjectives: [
      'Implement the reducing-balance monthly EMI formula: E = [P * r * (1 + r)^n] / [(1 + r)^n - 1]',
      'Convert annual interest rate to monthly rate: r = annualRate / 12 / 100',
      'Handle zero-interest (0%) promotional loans safely without division by zero',
      'Validate inputs: return 0 for non-positive principal or years, or negative rates',
      'Display output rounded to two decimal places',
    ],
    instructions: [
      '1. Review the reducing-balance formula in the starter code.',
      '2. The current code has a bug where annual rate is not converted to a monthly rate, and 0% loans cause division by zero (NaN)!',
      '3. Ensure that when annualRate === 0, EMI is simply principal / (years * 12).',
      '4. Return 0 for invalid inputs (principal <= 0, years <= 0, or annualRate < 0).',
      '5. Round the result to 2 decimal places (e.g. 106.07).',
    ],
    hints: [
      'Hint 1: The monthly interest rate is `r = annualRate / (12 * 100)`. Do not use annual rate directly!',
      'Hint 2: When annualRate is 0, the formula reduces to: `emi = principal / (years * 12)`.',
      'Hint 3: In JavaScript, return `Math.round(emi * 100) / 100` or `Number(emi.toFixed(2))`. In Python, use `round(emi, 2)`.',
    ],
    functionName: 'calculateLoanEMI',
    starterCodes: {
      javascript: `// Level 1 (Beginner): Student Loan EMI Calculator
// Disclaimer: For educational planning only; not professional financial advice.
function calculateLoanEMI(principal, annualRate, years) {
  // Input validation
  if (principal <= 0 || years <= 0 || annualRate < 0) {
    return 0;
  }

  const months = years * 12;

  // BUG 1: Forgot to divide by 12 months (using annual rate as monthly rate!)
  // BUG 2: Division by zero when annualRate is 0!
  const monthlyRate = annualRate / 100;

  if (monthlyRate === 0) {
    // Fix: Handle 0% interest loan
    return Math.round((principal / months) * 100) / 100;
  }

  const factor = Math.pow(1 + monthlyRate, months);
  const emi = (principal * monthlyRate * factor) / (factor - 1);

  return Math.round(emi * 100) / 100;
}
`,
      python: `# Level 1 (Beginner): Student Loan EMI Calculator
# Disclaimer: For educational planning only; not professional financial advice.
def calculate_loan_emi(principal, annual_rate, years):
    if principal <= 0 or years <= 0 or annual_rate < 0:
        return 0.0

    months = years * 12

    # BUG: Forgot to divide by 12 months!
    monthly_rate = annual_rate / 100.0

    if monthly_rate == 0:
        return round(principal / months, 2)

    factor = (1 + monthly_rate) ** months
    emi = (principal * monthly_rate * factor) / (factor - 1)

    return round(emi, 2)
`,
      java: `// Level 1 (Beginner): Student Loan EMI Calculator
// Disclaimer: For educational planning only; not professional financial advice.
public class LoanCalculator {
    public static double calculateLoanEMI(double principal, double annualRate, int years) {
        if (principal <= 0 || years <= 0 || annualRate < 0) {
            return 0.0;
        }

        int months = years * 12;

        // BUG: Forgot to divide by 12 months!
        double monthlyRate = annualRate / 100.0;

        if (monthlyRate == 0) {
            return Math.round((principal / months) * 100.0) / 100.0;
        }

        double factor = Math.pow(1 + monthlyRate, months);
        double emi = (principal * monthlyRate * factor) / (factor - 1);

        return Math.round(emi * 100.0) / 100.0;
    }
}
`,
      cpp: `// Level 1 (Beginner): Student Loan EMI Calculator
// Disclaimer: For educational planning only; not professional financial advice.
#include <iostream>
#include <cmath>

double calculateLoanEMI(double principal, double annualRate, int years) {
    if (principal <= 0 || years <= 0 || annualRate < 0) {
        return 0.0;
    }

    int months = years * 12;

    // BUG: Forgot to divide by 12 months!
    double monthlyRate = annualRate / 100.0;

    if (monthlyRate == 0) {
        return std::round((principal / months) * 100.0) / 100.0;
    }

    double factor = std::pow(1 + monthlyRate, months);
    double emi = (principal * monthlyRate * factor) / (factor - 1);

    return std::round(emi * 100.0) / 100.0;
}
`,
    },
    testCases: [
      {
        id: 1,
        name: 'Standard Undergraduate Loan ($10,000 at 5% for 10 years)',
        description: 'Standard reducing-balance repayment should equal $106.07/month.',
        input: { principal: 10000, annualRate: 5, years: 10 },
        expected: 106.07,
      },
      {
        id: 2,
        name: 'Zero-Interest Promotional Loan ($6,000 at 0% for 5 years)',
        description: 'Must handle zero interest without division by zero: $6,000 / 60 months = $100.00/month.',
        input: { principal: 6000, annualRate: 0, years: 5 },
        expected: 100,
        isEdgeCase: true,
      },
      {
        id: 3,
        name: 'Short-Term Emergency Loan ($3,000 at 6% for 2 years)',
        description: '24 monthly installments at 6% per annum = $132.96/month.',
        input: { principal: 3000, annualRate: 6, years: 2 },
        expected: 132.96,
      },
      {
        id: 4,
        name: 'Invalid Negative Input Protection (-$5,000 principal)',
        description: 'Negative loan amount must return 0 without calculating.',
        input: { principal: -5000, annualRate: 5, years: 3 },
        expected: 0,
        isEdgeCase: true,
      },
    ],
  },

  easy: {
    id: 'easy',
    label: 'Easy',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '8-10 mins',
    title: 'Level 2: Palindrome Reference String Checker',
    summary:
      'The student relief portal needs a utility that verifies whether an application voucher reference code is a valid palindrome.',
    learningObjectives: [
      'Clean strings by removing whitespace and non-alphanumeric characters',
      'Normalize character casing (case-insensitive comparison)',
      'Handle empty strings ("") and single-character strings ("A") as valid palindromes',
      'Use efficient two-pointer or reverse comparison logic',
    ],
    instructions: [
      '1. Accept a string reference code `refString`.',
      '2. Check whether it reads identically forwards and backwards.',
      '3. Ignore spaces and letter case (e.g. "Ref 8448 fer" should be recognized as a palindrome).',
      '4. Return boolean `true` if it is a palindrome, or `false` otherwise.',
      '5. Handle empty strings and single characters correctly (both evaluate to `true`).',
    ],
    hints: [
      'Hint 1: In JavaScript, strip spaces and lowercase: `const cleaned = refString.toLowerCase().replace(/[^a-z0-9]/g, "");`.',
      'Hint 2: Compare `cleaned === cleaned.split("").reverse().join("")` or use two pointers (`left < right`).',
      'Hint 3: An empty string `""` or single character `"A"` is considered a valid palindrome (reads identical forwards & backwards).',
    ],
    functionName: 'isApplicationPalindrome',
    starterCodes: {
      javascript: `// Level 2 (Easy): Application Voucher Palindrome Checker
function isApplicationPalindrome(refString) {
  if (typeof refString !== 'string') {
    return false;
  }

  // BUG 1: Only removes spaces, but does not convert to lowercase!
  // BUG 2: Off-by-one pointer loop can read out of bounds or fail on symbols
  const cleaned = refString.replace(/\\s+/g, '');

  let left = 0;
  let right = cleaned.length - 1;

  while (left < right) {
    if (cleaned[left] !== cleaned[right]) {
      return false;
    }
    left++;
    right--;
  }

  return true;
}
`,
      python: `# Level 2 (Easy): Application Voucher Palindrome Checker
import re

def is_application_palindrome(ref_string):
    if not isinstance(ref_string, str):
        return False

    # BUG: Does not convert to lowercase and does not strip punctuation!
    cleaned = ref_string.replace(" ", "")

    return cleaned == cleaned[::-1]
`,
      java: `// Level 2 (Easy): Application Voucher Palindrome Checker
public class PalindromeChecker {
    public static boolean isApplicationPalindrome(String refString) {
        if (refString == null) return false;

        // BUG: Does not lowercase and does not strip non-alphanumeric characters
        String cleaned = refString.replaceAll("\\\\s+", "");

        int left = 0;
        int right = cleaned.length() - 1;

        while (left < right) {
            if (cleaned.charAt(left) != cleaned.charAt(right)) {
                return false;
            }
            left++;
            right--;
        }

        return true;
    }
}
`,
      cpp: `// Level 2 (Easy): Application Voucher Palindrome Checker
#include <iostream>
#include <string>
#include <cctype>
#include <algorithm>

bool isApplicationPalindrome(std::string refString) {
    // BUG: Only removes spaces, doesn't lowercase or remove punctuation
    std::string cleaned = "";
    for (char c : refString) {
        if (c != ' ') {
            cleaned += c;
        }
    }

    int left = 0;
    int right = cleaned.length() - 1;
    while (left < right) {
        if (cleaned[left] != cleaned[right]) {
            return false;
        }
        left++;
        right--;
    }
    return true;
}
`,
    },
    testCases: [
      {
        id: 1,
        name: 'Standard Palindrome Code ("RADAR")',
        description: 'Exact matching uppercase palindrome should return true.',
        input: { refString: 'RADAR' },
        expected: true,
      },
      {
        id: 2,
        name: 'Mixed-Case with Spaces ("Ref 8448 fer")',
        description: 'Ignoring spaces and case, "ref8448fer" reads identically forwards and backwards -> true.',
        input: { refString: 'Ref 8448 fer' },
        expected: true,
      },
      {
        id: 3,
        name: 'Non-Palindrome Application Key ("AID2026GRANT")',
        description: 'Different letters forward vs backwards -> false.',
        input: { refString: 'AID2026GRANT' },
        expected: false,
      },
      {
        id: 4,
        name: 'Single Character Boundary ("A")',
        description: 'Single character string is an identity palindrome -> true.',
        input: { refString: 'A' },
        expected: true,
        isEdgeCase: true,
      },
      {
        id: 5,
        name: 'Empty String Boundary ("")',
        description: 'Empty string is trivially a palindrome -> true.',
        input: { refString: '' },
        expected: true,
        isEdgeCase: true,
      },
    ],
  },

  intermediate: {
    id: 'intermediate',
    label: 'Intermediate',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '12-15 mins',
    title: 'Level 3: Student Loan Eligibility Calculator',
    summary:
      'A financial assistance team wants to evaluate student loan eligibility against clear policy rules and debt-to-income thresholds.',
    learningObjectives: [
      'Enforce institutional eligibility thresholds: minimum income of $15,000',
      'Calculate debt-to-income repayment ratio: (monthlyDebt / monthlyIncome) <= repaymentCapacityLimit',
      'Enforce maximum borrowing ceiling: requestedLoan <= 50% of annual income',
      'Validate negative, zero, and missing inputs defensively',
      'Return approved loan amount if eligible, or 0 if ineligible',
    ],
    instructions: [
      'The university relief board enforces these simplified lending rules:',
      '1. Minimum Income: Annual household income must be at least $15,000 (`annualIncome >= 15000`).',
      '2. Repayment Capacity: Monthly debt ratio `existingMonthlyDebt / (annualIncome / 12)` cannot exceed `repaymentCapacityLimit` (e.g. 0.40 for 40%).',
      '3. Loan Ceiling: The requested loan cannot exceed 50% of annual income (`requestedLoan <= 0.50 * annualIncome`).',
      '4. Input Guards: All financial amounts must be positive numbers. If income <= 0, debt < 0, or loan <= 0, return 0.',
      '5. Output: Return the approved loan amount (`requestedLoan`) if fully eligible, or `0` if rejected.',
    ],
    hints: [
      'Hint 1: Calculate monthly income: `const monthlyIncome = annualIncome / 12;`. Check `if (monthlyIncome <= 0) return 0;`.',
      'Hint 2: Debt ratio is `existingMonthlyDebt / monthlyIncome`. If `debtRatio > repaymentCapacityLimit`, return 0.',
      'Hint 3: Boundary check: Students with income of EXACTLY $15,000 must qualify (`annualIncome >= 15000`, not `>`).',
    ],
    functionName: 'checkLoanEligibility',
    starterCodes: {
      javascript: `// Level 3 (Intermediate): Student Loan Eligibility Calculator
// Fictional educational policy simulation
function checkLoanEligibility(application) {
  const { annualIncome, existingMonthlyDebt, requestedLoan, repaymentCapacityLimit = 0.4 } = application || {};

  // BUG 1: Negative numbers are not guarded properly!
  if (!annualIncome || !requestedLoan) {
    return 0;
  }

  // BUG 2: Boundary bug: rejects student making exactly 15,000!
  if (annualIncome < 15000) {
    return 0;
  }

  // BUG 3: Multiplies by 12 instead of dividing to get monthly income!
  const monthlyIncome = annualIncome * 12;
  const debtRatio = existingMonthlyDebt / monthlyIncome;

  if (debtRatio > repaymentCapacityLimit) {
    return 0;
  }

  // Loan ceiling check (max 50% of annual income)
  if (requestedLoan > annualIncome * 0.5) {
    return 0;
  }

  return requestedLoan;
}
`,
      python: `# Level 3 (Intermediate): Student Loan Eligibility Calculator
def check_loan_eligibility(application):
    if not isinstance(application, dict):
        return 0

    annual_income = application.get("annualIncome", 0)
    existing_debt = application.get("existingMonthlyDebt", 0)
    requested_loan = application.get("requestedLoan", 0)
    capacity_limit = application.get("repaymentCapacityLimit", 0.40)

    # BUG 1: Missing negative input guards
    if annual_income <= 0 or existing_debt < 0 or requested_loan <= 0:
        return 0

    # BUG 2: Boundary check should be >= 15000
    if annual_income < 15000:
        return 0

    # BUG 3: Calculation bug on monthly income
    monthly_income = annual_income * 12 
    debt_ratio = existing_debt / monthly_income if monthly_income > 0 else 1

    if debt_ratio > capacity_limit:
        return 0

    if requested_loan > annual_income * 0.5:
        return 0

    return requested_loan
`,
      java: `// Level 3 (Intermediate): Student Loan Eligibility Calculator
import java.util.Map;

public class LoanEligibilityCalculator {
    public static int checkLoanEligibility(Map<String, Object> application) {
        if (application == null) return 0;

        int annualIncome = ((Number) application.getOrDefault("annualIncome", 0)).intValue();
        int existingDebt = ((Number) application.getOrDefault("existingMonthlyDebt", 0)).intValue();
        int requestedLoan = ((Number) application.getOrDefault("requestedLoan", 0)).intValue();
        double capacityLimit = application.containsKey("repaymentCapacityLimit") 
            ? ((Number) application.get("repaymentCapacityLimit")).doubleValue() 
            : 0.40;

        // Input guard
        if (annualIncome <= 0 || existingDebt < 0 || requestedLoan <= 0) return 0;

        // BUG: Boundary check
        if (annualIncome < 15000) return 0;

        // BUG: Monthly income calculation
        double monthlyIncome = annualIncome * 12.0;
        double debtRatio = existingDebt / monthlyIncome;

        if (debtRatio > capacityLimit) return 0;
        if (requestedLoan > annualIncome * 0.5) return 0;

        return requestedLoan;
    }
}
`,
      cpp: `// Level 3 (Intermediate): Student Loan Eligibility Calculator
#include <iostream>

int checkLoanEligibility(int annualIncome, int existingMonthlyDebt, int requestedLoan, double repaymentCapacityLimit = 0.40) {
    if (annualIncome <= 0 || existingMonthlyDebt < 0 || requestedLoan <= 0) {
        return 0;
    }

    // Boundary check
    if (annualIncome < 15000) {
        return 0;
    }

    // BUG: monthly income calculation
    double monthlyIncome = annualIncome * 12.0;
    double debtRatio = existingMonthlyDebt / monthlyIncome;

    if (debtRatio > repaymentCapacityLimit) {
        return 0;
    }

    if (requestedLoan > annualIncome * 0.5) {
        return 0;
    }

    return requestedLoan;
}
`,
    },
    testCases: [
      {
        id: 1,
        name: 'Fully Eligible Application ($40k income, $500 debt, $15k loan)',
        description: 'Income >= 15k, debt ratio 15% <= 40%, loan 15k <= 20k (50% cap) -> Approved $15,000.',
        input: { annualIncome: 40000, existingMonthlyDebt: 500, requestedLoan: 15000, repaymentCapacityLimit: 0.4 },
        expected: 15000,
      },
      {
        id: 2,
        name: 'Exact Threshold Boundary ($15,000 income boundary)',
        description: 'Income exactly $15,000 meets the threshold condition -> Approved $5,000.',
        input: { annualIncome: 15000, existingMonthlyDebt: 100, requestedLoan: 5000, repaymentCapacityLimit: 0.4 },
        expected: 5000,
        isEdgeCase: true,
      },
      {
        id: 3,
        name: 'Excessive Debt Burden ($30k income, $1,200 monthly debt)',
        description: 'Monthly income is $2,500. Debt ratio $1,200 / $2,500 = 48% > 40% limit -> Rejected $0.',
        input: { annualIncome: 30000, existingMonthlyDebt: 1200, requestedLoan: 8000, repaymentCapacityLimit: 0.4 },
        expected: 0,
      },
      {
        id: 4,
        name: 'Loan Exceeds 50% Income Ceiling ($30k income, $20k loan)',
        description: 'Max allowable loan is 50% ($15,000). Requesting $20,000 violates policy -> Rejected $0.',
        input: { annualIncome: 30000, existingMonthlyDebt: 200, requestedLoan: 20000, repaymentCapacityLimit: 0.4 },
        expected: 0,
      },
      {
        id: 5,
        name: 'Invalid Negative Income Guard (-$5,000)',
        description: 'Negative accounting input safely returns 0 without crashing.',
        input: { annualIncome: -5000, existingMonthlyDebt: 0, requestedLoan: 1000, repaymentCapacityLimit: 0.4 },
        expected: 0,
        isEdgeCase: true,
      },
    ],
  },

  advanced: {
    id: 'advanced',
    label: 'Advanced',
    badgeColor: 'bg-[#E8D6C3] text-[#4A3028] border-[#D9C7B5]',
    estimatedTime: '15-20 mins',
    title: 'Level 4: Debug the Financial Assistance Processing System',
    summary:
      'Remediate string coercion, boundary gaps, institutional grant ceilings, and integrate an urgent manager policy update.',
    learningObjectives: [
      'Debug implicit type coercion and string concatenation bugs',
      'Enforce institutional system boundaries (maximum cap and minimum floor)',
      'Adapt code to dynamic mid-sprint requirements from a simulated manager',
      'Write clear technical justifications explaining the fix and edge cases',
    ],
    instructions: [
      'Fix all interacting bugs in the financial aid disbursement engine:',
      '1. Type Coercion: `student.dependentAllowance` comes from form inputs as a string (e.g. "250"), resulting in `500 + "250"` -> `"500250"`. Coerce it to a real number.',
      '2. Boundary Gap: Ensure income <= 20,000 is inclusive.',
      '3. Policy Clamping: Institutional rules dictate the total grant must NEVER exceed $2,500, and never drop below $500.',
      '4. Manager Hardship Update: If `student.medicalHardship === true`, add a $300 emergency medical supplement (still strictly subject to the $2,500 max cap!).',
      '5. Provide a brief explanation of how your solution protects system invariants.',
    ],
    hints: [
      'Hint 1: Use `Number(student.dependentAllowance) || 0` or `parseInt` to prevent string concatenation.',
      'Hint 2: Check `if (student.medicalHardship === true) total += 300;`.',
      'Hint 3: Use `Math.min(2500, Math.max(500, total))` (or `min(2500, max(500, total))` in Python) to enforce the bounds.',
    ],
    functionName: 'calculateEmergencyGrant',
    starterCodes: {
      javascript: `// Level 4 (Advanced): Multi-bug fix with policy capping & manager hardship update
function calculateEmergencyGrant(student) {
  const BASE_GRANT = 500;
  const MAX_GRANT = 2500;

  // Defensive object check
  if (!student || typeof student !== 'object') {
    return BASE_GRANT;
  }

  // BUG 1: String type coercion bug! "250" creates "500250"
  let total = BASE_GRANT + student.dependentAllowance;

  // BUG 2: Boundary gap at exactly 20,000
  if (student.annualIncome < 20000) {
    total += 1000;
  } else if (student.annualIncome > 20000 && student.annualIncome <= 35000) {
    total += 500;
  }

  // NEW REQUIREMENT (Manager Update):
  // If student.medicalHardship is true, add $300 supplement
  // TODO: Implement medical hardship check here

  // BUG 3: Must enforce MAX_GRANT cap ($2,500) and BASE_GRANT min ($500)
  // TODO: Clamp total between BASE_GRANT and MAX_GRANT

  console.log("Calculated final emergency grant:", total);
  return total;
}
`,
      python: `# Level 4 (Advanced): Multi-bug fix with policy capping & manager hardship update
def calculate_emergency_grant(student):
    BASE_GRANT = 500
    MAX_GRANT = 2500

    if not student or not isinstance(student, dict):
        return BASE_GRANT

    # BUG 1: String type coercion if dependentAllowance is passed as "250"
    raw_dep = student.get("dependentAllowance", 0)
    total = BASE_GRANT + raw_dep

    # BUG 2: Boundary gap at exactly 20,000
    income = student.get("annualIncome", 0)
    if income < 20000:
        total += 1000
    elif income > 20000 and income <= 35000:
        total += 500

    # NEW REQUIREMENT (Manager Update):
    # If student.get("medicalHardship") is True, add $300 supplement
    # TODO: Implement medical hardship check here

    # BUG 3: Must enforce MAX_GRANT cap ($2,500) and BASE_GRANT min ($500)
    # TODO: Clamp total between BASE_GRANT and MAX_GRANT

    print(f"Calculated final emergency grant: {total}")
    return total
`,
      java: `// Level 4 (Advanced): Multi-bug fix with policy capping & manager hardship update
import java.util.Map;

public class GrantCalculator {
    public static final int BASE_GRANT = 500;
    public static final int MAX_GRANT = 2500;

    public static int calculateEmergencyGrant(Map<String, Object> student) {
        if (student == null) return BASE_GRANT;

        // BUG 1: Parse dependentAllowance defensively (could be String or Number)
        Object rawDep = student.get("dependentAllowance");
        int dependentAllowance = 0;
        if (rawDep instanceof Number) {
            dependentAllowance = ((Number) rawDep).intValue();
        } else if (rawDep instanceof String) {
            dependentAllowance = Integer.parseInt((String) rawDep);
        }

        int total = BASE_GRANT + dependentAllowance;

        // BUG 2: Boundary gap at 20,000
        Object rawIncome = student.get("annualIncome");
        int income = rawIncome != null ? ((Number) rawIncome).intValue() : 0;
        if (income < 20000) {
            total += 1000;
        } else if (income > 20000 && income <= 35000) {
            total += 500;
        }

        // NEW REQUIREMENT (Manager Update):
        // If Boolean.TRUE.equals(student.get("medicalHardship")), add 300
        // TODO: Implement medical hardship check here

        // BUG 3: Must enforce MAX_GRANT cap ($2,500) and BASE_GRANT min ($500)
        // TODO: Clamp total between BASE_GRANT and MAX_GRANT

        System.out.println("Calculated final emergency grant: " + total);
        return total;
    }
}
`,
      cpp: `// Level 4 (Advanced): Multi-bug fix with policy capping & manager hardship update
#include <iostream>
#include <string>
#include <algorithm>

int calculateEmergencyGrant(int annualIncome, std::string dependentAllowanceStr = "0", bool medicalHardship = false) {
    const int BASE_GRANT = 500;
    const int MAX_GRANT = 2500;

    // BUG 1: Need to parse dependentAllowanceStr into integer safely
    int dependentAllowance = 0;
    try {
        dependentAllowance = std::stoi(dependentAllowanceStr);
    } catch (...) {
        dependentAllowance = 0;
    }

    int total = BASE_GRANT + dependentAllowance;

    // BUG 2: Boundary gap at 20,000
    if (annualIncome < 20000) {
        total += 1000;
    } else if (annualIncome > 20000 && annualIncome <= 35000) {
        total += 500;
    }

    // NEW REQUIREMENT (Manager Update):
    // If medicalHardship is true, add $300 supplement
    // TODO: Implement medical hardship check

    // BUG 3: Must clamp total between BASE_GRANT and MAX_GRANT
    // TODO: Apply clamping

    std::cout << "Calculated final emergency grant: " << total << std::endl;
    return total;
}
`,
    },
    testCases: [
      {
        id: 1,
        name: 'Type Coercion Prevention (String allowance "250")',
        description: 'Input has dependentAllowance as string "250". Must evaluate to $1,750, not "500250".',
        input: { annualIncome: 18000, dependentAllowance: '250', medicalHardship: false },
        expected: 1750,
      },
      {
        id: 2,
        name: 'Exact Threshold Boundary ($20,000 income)',
        description: 'Income exactly $20,000 must receive full $1,000 tier bonus + $500 base = $1,500.',
        input: { annualIncome: 20000, dependentAllowance: 0, medicalHardship: false },
        expected: 1500,
        isEdgeCase: true,
      },
      {
        id: 3,
        name: 'Manager Hardship Requirement (+ $300 medical relief)',
        description: 'Student with medicalHardship: true receives additional $300 supplement -> $1,800 total.',
        input: { annualIncome: 20000, dependentAllowance: 0, medicalHardship: true },
        expected: 1800,
        isManagerRequirement: true,
      },
      {
        id: 4,
        name: 'Institutional Policy Ceiling Clamping (Max $2,500)',
        description: 'Large grant calculation ($500 base + $1500 allowance + $1000 tier + $300 medical = $3300) must clamp strictly at $2,500.',
        input: { annualIncome: 10000, dependentAllowance: '1500', medicalHardship: true },
        expected: 2500,
        isEdgeCase: true,
      },
      {
        id: 5,
        name: 'Missing / Null Fields Safety',
        description: 'Missing dependentAllowance and annualIncome default safely without crashing or returning NaN.',
        input: { annualIncome: undefined, dependentAllowance: null, medicalHardship: false },
        expected: 1500,
        isEdgeCase: true,
      },
    ],
  },
};
