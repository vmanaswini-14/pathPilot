import React, { useState } from 'react';
import { UX_DESIGNER_LEVELS } from '../../data/uxDesignerTasks';
import { DifficultyLevel } from '../../types';
import {
  Eye,
  MessageSquare,
  Sparkles,
  HelpCircle,
  Clock,
  Send,
  AlertCircle,
  FileText,
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Info,
  ShieldAlert,
  Smartphone,
  Layers,
  Check,
  RotateCcw,
  ArrowUp,
  ArrowDown,
  Sliders,
  ShieldCheck,
  Edit3,
} from 'lucide-react';

interface UxDesignerMaterialsProps {
  onDirectSubmit?: (payload: {
    level: DifficultyLevel;
    designProposal: string;
    identifiedFlaws: number[];
  }) => Promise<void>;
  isLoadingEvaluation?: boolean;
}

export const UxDesignerMaterials: React.FC<UxDesignerMaterialsProps> = ({
  onDirectSubmit,
  isLoadingEvaluation = false,
}) => {
  const [level, setLevel] = useState<DifficultyLevel>('beginner');
  const currentConfig = UX_DESIGNER_LEVELS[level];

  // Tab navigation
  const [activeTab, setActiveTab] = useState<'workspace' | 'quotes' | 'heuristics' | 'hints'>('workspace');
  const [expandedHint, setExpandedHint] = useState<number | null>(null);

  // Proposal state per level
  const [proposals, setProposals] = useState<Record<DifficultyLevel, string>>({
    beginner: '',
    easy: '',
    intermediate: '',
    advanced: '',
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const currentProposal = proposals[level];

  // LEVEL 1 STATE: Selected Callout Pin
  const [selectedCallout, setSelectedCallout] = useState<number>(1);

  // LEVEL 2 STATE: Interactive Form Builder & Reordering
  const [formFields, setFormFields] = useState([
    {
      id: 'field_docs',
      label: 'BURSAR_ANNEX_PARENT_W2_TRANSCRIPT',
      error: 'FATAL_ERR_0x9: FILE MISSING',
      type: 'file',
      required: true,
      helper: 'Required for household income verification. Accepted formats: PDF, PNG, JPG.',
    },
    {
      id: 'field_id',
      label: 'GOVT_IDENTIFIER_NUM_RAW',
      error: 'ERR: DIGITS REQUIRED',
      type: 'text',
      required: true,
      helper: 'Found on the front of your campus card.',
    },
    {
      id: 'field_name',
      label: 'LEGAL_SUBJECT_FULL_DESIGNATION',
      error: 'ERR_NAME_INVALID',
      type: 'text',
      required: true,
      helper: 'As registered in the student portal.',
    },
    {
      id: 'field_amount',
      label: 'DISBURSEMENT_REQUISITION_FLOAT',
      error: 'VALUE OUT OF BOUNDS',
      type: 'number',
      required: true,
      helper: 'University emergency grants are awarded up to $2,500 per semester.',
    },
    {
      id: 'field_reason',
      label: 'SUBSTANTIATION_JUSTIFICATION_BLOB',
      error: 'TEXT TOO SHORT',
      type: 'text',
      required: true,
      helper: 'Explain the unexpected expense (e.g. medical copay, rent shortfall).',
    },
  ]);
  const [buttonLabel, setButtonLabel] = useState('SUBMIT_RAW_STREAM');

  // LEVEL 3 STATE: WCAG Accessibility Toggles
  const [wcagContrast, setWcagContrast] = useState(false);
  const [wcagFocusRings, setWcagFocusRings] = useState(false);
  const [wcagTouchTargets, setWcagTouchTargets] = useState(false);
  const [wcagInlineValidation, setWcagInlineValidation] = useState(false);

  // LEVEL 4 STATE: Progressive Disclosure Strategy & Microcopy
  const [disclosureStrategy, setDisclosureStrategy] = useState<'accordion' | 'drawer' | 'step'>('accordion');
  const [privacyMicrocopy, setPrivacyMicrocopy] = useState(
    'Confidentiality Notice: Emergency contact details are strictly archived for health welfare checks and are NEVER shared or contacted regarding financial assistance.'
  );
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);

  // Handlers
  const handleProposalChange = (val: string) => {
    setProposals((prev) => ({ ...prev, [level]: val }));
    if (val.trim().length >= 25 && validationError) {
      setValidationError(null);
    }
  };

  const handleLoadSampleProposal = () => {
    setProposals((prev) => ({ ...prev, [level]: currentConfig.sampleAnswer }));
    setValidationError(null);
  };

  const handleMoveField = (index: number, direction: 'up' | 'down') => {
    const newFields = [...formFields];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newFields.length) return;
    const temp = newFields[index];
    newFields[index] = newFields[targetIndex];
    newFields[targetIndex] = temp;
    setFormFields(newFields);
  };

  const handleApplyRecommendedFormLabels = () => {
    setFormFields([
      {
        id: 'field_name',
        label: 'Full Legal Name',
        error: 'Please enter your first and last name as listed on university records.',
        type: 'text',
        required: true,
        helper: 'As registered in the student portal.',
      },
      {
        id: 'field_id',
        label: 'Student ID Number (9 Digits)',
        error: 'Please enter your 9-digit campus Student ID (e.g. 109847291).',
        type: 'text',
        required: true,
        helper: 'Found on the front of your campus card.',
      },
      {
        id: 'field_amount',
        label: 'Requested Assistance Amount ($)',
        error: 'Please enter an amount between $100 and $2,500.',
        type: 'number',
        required: true,
        helper: 'University emergency grants are awarded up to $2,500 per semester.',
      },
      {
        id: 'field_reason',
        label: 'Emergency Hardship Explanation',
        error: 'Please provide at least 2-3 sentences explaining your sudden financial hardship.',
        type: 'text',
        required: true,
        helper: 'Explain the unexpected expense (e.g. medical copay, rent shortfall).',
      },
      {
        id: 'field_docs',
        label: 'Parent Tax Transcript / W-2 (PDF)',
        error: 'Please upload a PDF or clear photo of your 2025 tax transcript.',
        type: 'file',
        required: true,
        helper: 'Required for household income verification. Accepted formats: PDF, PNG, JPG.',
      },
    ]);
    setButtonLabel('Submit Emergency Grant Application (Secure)');
  };

  const handleSubmit = async () => {
    if (!currentProposal || currentProposal.trim().length < 25) {
      setValidationError(
        'Please write a substantive design proposal (at least 25 characters) before submitting for AI evaluation.'
      );
      return;
    }
    setValidationError(null);
    if (onDirectSubmit) {
      await onDirectSubmit({
        level,
        designProposal: currentProposal,
        identifiedFlaws: (currentConfig.mockupCallouts || []).map((c) => c.id),
      });
    }
  };

  const currentCalloutData =
    (currentConfig.mockupCallouts || []).find((c) => c.id === selectedCallout) ||
    currentConfig.mockupCallouts?.[0];

  return (
    <div className="space-y-6 text-[#4A3028]">
      {/* 4 Difficulty Level Selector Bar */}
      <div className="bg-white p-3.5 sm:p-4 rounded-xl border border-[#D9C7B5] shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#D9C7B5]">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-wider text-[#806B5E]">
                Select Practical Tryout Level
              </span>
              <span className="text-[11px] bg-[#E8D6C3] text-[#4A3028] px-2 py-0.5 rounded-full font-semibold">
                4 Distinct UX Challenges
              </span>
            </div>
            <p className="text-xs text-[#806B5E] mt-0.5">
              Explore 4 realistic high-friction student flows: food pantry stigma, form cognitive load, WCAG accessibility, and compliance disclosure.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F8F3EB] p-1 rounded-lg border border-[#D9C7B5]">
            {(['beginner', 'easy', 'intermediate', 'advanced'] as DifficultyLevel[]).map((lvl) => {
              const cfg = UX_DESIGNER_LEVELS[lvl];
              const isSelected = level === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => {
                    setLevel(lvl);
                    setSelectedCallout(1);
                  }}
                  className={`px-3 py-1.5 rounded-md text-xs font-bold transition-all cursor-pointer flex items-center gap-1 ${
                    isSelected
                      ? 'bg-[#B9825B] text-white shadow-xs'
                      : 'text-[#4A3028] hover:bg-[#E8D6C3]/60'
                  }`}
                >
                  <span>{cfg.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Level Overview Banner */}
        <div className="mt-3.5 flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <span className="px-2 py-0.5 rounded-md text-[11px] font-bold bg-[#E8D6C3] text-[#4A3028] border border-[#D9C7B5]">
                {currentConfig.label} Difficulty
              </span>
              <span className="text-xs text-[#806B5E] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#B9825B]" /> {currentConfig.estimatedTime}
              </span>
              <span className="text-xs text-[#806B5E] flex items-center gap-1">
                <Smartphone className="w-3.5 h-3.5 text-[#B9825B]" /> Screen: <strong className="text-[#4A3028]">{currentConfig.screenTitle}</strong>
              </span>
            </div>
            <h3 className="text-base sm:text-lg font-bold text-[#4A3028] mt-1.5">
              {currentConfig.title}
            </h3>
            <p className="text-xs sm:text-sm text-[#806B5E] mt-1 leading-relaxed">
              {currentConfig.scenario}
            </p>
          </div>
        </div>

        {/* Problem Statement Box */}
        <div className="mt-3.5 p-3 rounded-lg bg-[#F8F3EB] border border-[#D9C7B5] text-xs">
          <div className="font-bold text-[#4A3028] flex items-center gap-1.5 mb-1">
            <Sparkles className="w-3.5 h-3.5 text-[#B9825B]" />
            <span>Design Challenge & Heuristic Objective:</span>
          </div>
          <p className="text-[#4A3028] leading-relaxed">
            {currentConfig.problemStatement}
          </p>
        </div>
      </div>

      {/* Navigation Subtabs for Materials */}
      <div className="flex flex-wrap items-center gap-2 border-b border-[#D9C7B5] pb-2">
        <button
          onClick={() => setActiveTab('workspace')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'workspace'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'bg-white text-[#4A3028] hover:bg-[#E8D6C3]/40 border border-[#D9C7B5]'
          }`}
        >
          <Eye className="w-3.5 h-3.5" />
          <span>Interactive UX Workspace</span>
        </button>

        <button
          onClick={() => setActiveTab('quotes')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'quotes'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'bg-white text-[#4A3028] hover:bg-[#E8D6C3]/40 border border-[#D9C7B5]'
          }`}
        >
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Student Voice Quotes ({currentConfig.userQuotes.length})</span>
        </button>

        <button
          onClick={() => setActiveTab('heuristics')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'heuristics'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'bg-white text-[#4A3028] hover:bg-[#E8D6C3]/40 border border-[#D9C7B5]'
          }`}
        >
          <Info className="w-3.5 h-3.5" />
          <span>Design Principles & Heuristics</span>
        </button>

        <button
          onClick={() => setActiveTab('hints')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'hints'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'bg-white text-[#4A3028] hover:bg-[#E8D6C3]/40 border border-[#D9C7B5]'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Design Hints ({currentConfig.hints.length})</span>
        </button>
      </div>

      {/* TAB 1: WORKSPACE (ADAPTED PER LEVEL) */}
      {activeTab === 'workspace' && (
        <div className="space-y-6">
          {/* ===================== LEVEL 1: SPOT USABILITY PROBLEMS ===================== */}
          {level === 'beginner' && currentCalloutData && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Phone Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[310px] sm:w-[330px] bg-[#4A3028] rounded-[36px] p-3 shadow-xl border-4 border-[#35221C] relative">
                  <div className="w-28 h-3.5 bg-[#35221C] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1C120F] mr-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B9825B]" />
                  </div>

                  <div className="bg-[#FAF7F2] rounded-[26px] overflow-hidden p-3.5 text-[#4A3028] min-h-[500px] flex flex-col justify-between relative text-xs">
                    <div className="space-y-3">
                      <div className="text-center pb-2 border-b border-[#D9C7B5]">
                        <span className="font-extrabold text-[11px] text-[#4A3028] uppercase tracking-wider">
                          CampusPantry — Reserve Step
                        </span>
                      </div>

                      {currentConfig.mockupCallouts.map((callout) => {
                        const isSelected = selectedCallout === callout.id;
                        return (
                          <div
                            key={callout.id}
                            onClick={() => setSelectedCallout(callout.id)}
                            className={`cursor-pointer transition-all p-3 rounded-xl border relative ${
                              isSelected
                                ? 'ring-2 ring-[#B9825B] bg-[#E8D6C3] border-[#B9825B] shadow-xs'
                                : 'bg-white border-[#D9C7B5] hover:border-[#B9825B]'
                            }`}
                          >
                            <div
                              className={`absolute -top-2 -right-2 w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] shadow-xs text-white ${
                                isSelected ? 'bg-[#B9825B]' : 'bg-[#4A3028]'
                              }`}
                            >
                              {callout.id}
                            </div>
                            <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-[#B9825B]">
                              <AlertCircle className="w-3 h-3" />
                              <span>{callout.component}</span>
                            </div>
                            <div className="font-bold text-[11px] text-[#4A3028] mt-0.5">
                              {callout.title}
                            </div>
                            <p className="text-[10px] text-[#806B5E] mt-1 line-clamp-2">
                              {callout.issue}
                            </p>
                          </div>
                        );
                      })}
                    </div>

                    <div className="text-[10px] text-center text-[#806B5E] pt-2 border-t border-[#D9C7B5]/60 mt-3">
                      Click any numbered callout to inspect the heuristic critique
                    </div>
                  </div>
                </div>
              </div>

              {/* Inspector Panel */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#D9C7B5] p-4 shadow-xs space-y-4">
                <div className="flex items-center justify-between pb-3 border-b border-[#D9C7B5]">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-[#B9825B] text-white flex items-center justify-center font-bold text-xs">
                      {currentCalloutData.id}
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase text-[#B9825B]">
                        Inspected Flaw
                      </span>
                      <h4 className="text-sm font-bold text-[#4A3028]">
                        {currentCalloutData.title}
                      </h4>
                    </div>
                  </div>
                  <span className="text-xs bg-[#E8D6C3] text-[#4A3028] px-2.5 py-1 rounded-md font-medium">
                    {currentCalloutData.component}
                  </span>
                </div>

                <div className="p-3 rounded-lg bg-[#F8F3EB] border border-[#D9C7B5] text-xs">
                  <span className="font-bold text-[#4A3028] block mb-1">
                    Observed Usability Barrier:
                  </span>
                  <p className="text-[#806B5E] leading-relaxed">
                    {currentCalloutData.issue}
                  </p>
                </div>

                <div className="p-3 rounded-lg bg-amber-50/70 border border-amber-200 text-xs">
                  <span className="font-bold text-amber-900 block mb-1">
                    Heuristic Violated:
                  </span>
                  <p className="text-amber-800 leading-relaxed font-semibold">
                    {currentCalloutData.heuristicViolated}
                  </p>
                </div>

                {currentCalloutData.studentQuote && (
                  <div className="p-3 rounded-lg bg-white border border-[#D9C7B5] text-xs italic text-[#4A3028]">
                    <span className="font-bold not-italic text-[#806B5E] block mb-1 text-[11px]">
                      Student Reaction in User Testing:
                    </span>
                    {currentCalloutData.studentQuote}
                  </div>
                )}

                <div className="p-3 rounded-lg bg-emerald-50/80 border border-emerald-200 text-xs">
                  <span className="font-bold text-emerald-900 block mb-1">
                    Recommended Redesign Solution:
                  </span>
                  <p className="text-emerald-800 leading-relaxed">
                    {currentCalloutData.recommendation}
                  </p>
                </div>

                <div className="pt-2 flex items-center gap-2">
                  <span className="text-[11px] font-bold text-[#806B5E]">Jump to Flaw:</span>
                  {currentConfig.mockupCallouts.map((c) => (
                    <button
                      key={c.id}
                      onClick={() => setSelectedCallout(c.id)}
                      className={`px-2.5 py-1 rounded text-xs font-bold transition-all cursor-pointer ${
                        selectedCallout === c.id
                          ? 'bg-[#B9825B] text-white'
                          : 'bg-[#F8F3EB] text-[#4A3028] hover:bg-[#E8D6C3] border border-[#D9C7B5]'
                      }`}
                    >
                      #{c.id}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ===================== LEVEL 2: IMPROVE CONFUSING APPLICATION FORM ===================== */}
          {level === 'easy' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Form Builder & Reordering Studio */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#D9C7B5] p-4 shadow-xs space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-[#D9C7B5]">
                  <div>
                    <h4 className="text-sm font-bold text-[#4A3028] flex items-center gap-1.5">
                      <Sliders className="w-4 h-4 text-[#B9825B]" />
                      <span>Form Cognitive Hierarchy & Plain-English Builder</span>
                    </h4>
                    <p className="text-xs text-[#806B5E] mt-0.5">
                      Reorder fields into a natural sequence (Name → ID → Amount → Reason → Docs), rewrite cryptic labels, and replace raw system error codes.
                    </p>
                  </div>

                  <button
                    onClick={handleApplyRecommendedFormLabels}
                    className="px-3 py-1.5 bg-[#E8D6C3] hover:bg-[#D9C7B5] text-[#4A3028] text-xs font-bold rounded-lg border border-[#D9C7B5] transition-colors flex items-center gap-1.5 cursor-pointer self-start sm:self-auto"
                  >
                    <Sparkles className="w-3.5 h-3.5 text-[#B9825B]" />
                    <span>Auto-Fix Sequence & Labels</span>
                  </button>
                </div>

                <div className="space-y-3">
                  {formFields.map((field, idx) => (
                    <div
                      key={field.id}
                      className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D9C7B5] space-y-2 text-xs"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="w-5 h-5 rounded-full bg-[#B9825B] text-white font-bold text-[10px] flex items-center justify-center">
                            {idx + 1}
                          </span>
                          <span className="font-mono text-[11px] text-[#806B5E] font-semibold">
                            ID: {field.id} ({field.type})
                          </span>
                        </div>

                        <div className="flex items-center gap-1">
                          <button
                            onClick={() => handleMoveField(idx, 'up')}
                            disabled={idx === 0}
                            className="p-1 rounded bg-white border border-[#D9C7B5] hover:bg-[#E8D6C3] disabled:opacity-30 cursor-pointer"
                            title="Move Up"
                          >
                            <ArrowUp className="w-3.5 h-3.5 text-[#4A3028]" />
                          </button>
                          <button
                            onClick={() => handleMoveField(idx, 'down')}
                            disabled={idx === formFields.length - 1}
                            className="p-1 rounded bg-white border border-[#D9C7B5] hover:bg-[#E8D6C3] disabled:opacity-30 cursor-pointer"
                            title="Move Down"
                          >
                            <ArrowDown className="w-3.5 h-3.5 text-[#4A3028]" />
                          </button>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#806B5E] mb-1">
                            Field Label:
                          </label>
                          <input
                            type="text"
                            value={field.label}
                            onChange={(e) => {
                              const updated = [...formFields];
                              updated[idx].label = e.target.value;
                              setFormFields(updated);
                            }}
                            className="w-full p-2 bg-white rounded-lg border border-[#D9C7B5] text-xs text-[#4A3028] outline-none focus:border-[#B9825B]"
                          />
                        </div>

                        <div>
                          <label className="block text-[10px] font-bold uppercase text-[#806B5E] mb-1">
                            Validation / Error Message:
                          </label>
                          <input
                            type="text"
                            value={field.error}
                            onChange={(e) => {
                              const updated = [...formFields];
                              updated[idx].error = e.target.value;
                              setFormFields(updated);
                            }}
                            className="w-full p-2 bg-white rounded-lg border border-[#D9C7B5] text-xs text-[#4A3028] outline-none focus:border-[#B9825B]"
                          />
                        </div>
                      </div>
                    </div>
                  ))}

                  {/* Primary Action Button text */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D9C7B5] space-y-1.5 text-xs">
                    <label className="block text-[10px] font-bold uppercase text-[#806B5E]">
                      Primary Action Button Microcopy:
                    </label>
                    <input
                      type="text"
                      value={buttonLabel}
                      onChange={(e) => setButtonLabel(e.target.value)}
                      className="w-full p-2 bg-white rounded-lg border border-[#D9C7B5] text-xs text-[#4A3028] outline-none focus:border-[#B9825B] font-semibold"
                    />
                  </div>
                </div>
              </div>

              {/* Live Responsive Mobile Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[310px] sm:w-[330px] bg-[#4A3028] rounded-[36px] p-3 shadow-xl border-4 border-[#35221C] relative">
                  <div className="w-28 h-3.5 bg-[#35221C] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1C120F] mr-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B9825B]" />
                  </div>

                  <div className="bg-[#FAF7F2] rounded-[26px] overflow-hidden p-3.5 text-[#4A3028] min-h-[500px] flex flex-col justify-between text-xs space-y-3">
                    <div>
                      <div className="text-center pb-2 border-b border-[#D9C7B5]">
                        <span className="font-extrabold text-[11px] text-[#4A3028] uppercase tracking-wider block">
                          Emergency Relief Application
                        </span>
                        <span className="text-[10px] text-[#806B5E]">Live Prototype Preview</span>
                      </div>

                      <div className="space-y-2.5 mt-3">
                        {formFields.map((f, i) => (
                          <div key={f.id} className="space-y-1">
                            <label className="block text-[11px] font-bold text-[#4A3028]">
                              {f.label}
                            </label>
                            <div className="p-2 bg-white rounded-lg border border-[#D9C7B5] text-[11px] text-[#806B5E]">
                              {f.type === 'file' ? '📁 Choose PDF document...' : `Enter ${f.label.toLowerCase()}...`}
                            </div>
                            <span className="text-[9px] text-amber-700 block font-medium">
                              Note: {f.error}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button className="w-full py-2.5 bg-[#B9825B] text-white rounded-xl font-bold text-xs shadow-xs text-center">
                        {buttonLabel}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== LEVEL 3: WCAG ACCESSIBILITY & INCLUSIVITY STUDIO ===================== */}
          {level === 'intermediate' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* WCAG Controls Panel */}
              <div className="lg:col-span-6 bg-white rounded-xl border border-[#D9C7B5] p-5 shadow-xs space-y-4">
                <div>
                  <h4 className="text-sm font-bold text-[#4A3028] flex items-center gap-1.5">
                    <ShieldCheck className="w-4 h-4 text-[#B9825B]" />
                    <span>WCAG 2.1 AA Accessibility Controls</span>
                  </h4>
                  <p className="text-xs text-[#806B5E] mt-0.5">
                    Toggle accessibility features and watch the financial aid portal preview adapt immediately.
                  </p>
                </div>

                <div className="space-y-3">
                  {/* Toggle 1: Contrast */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D9C7B5] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#4A3028]">
                        High-Contrast Color Palette (WCAG 1.4.3)
                      </div>
                      <div className="text-[11px] text-[#806B5E] mt-0.5">
                        {wcagContrast
                          ? 'Active: 7.2:1 contrast ratio (#4A3028 on #F8F3EB) — Passes AAA!'
                          : 'Inactive: 2.4:1 contrast (#A0A0A0 on white) — Fails AA!'}
                      </div>
                    </div>
                    <button
                      onClick={() => setWcagContrast(!wcagContrast)}
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${
                        wcagContrast ? 'bg-[#B9825B]' : 'bg-[#D9C7B5]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                          wcagContrast ? 'left-6.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle 2: Focus Rings */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D9C7B5] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#4A3028]">
                        Visible Keyboard Focus Rings (WCAG 2.4.7)
                      </div>
                      <div className="text-[11px] text-[#806B5E] mt-0.5">
                        {wcagFocusRings
                          ? 'Active: Bold 3px #B9825B outline ring with 2px offset for Tab navigation.'
                          : 'Inactive: outline: none (disappears for keyboard users).'}
                      </div>
                    </div>
                    <button
                      onClick={() => setWcagFocusRings(!wcagFocusRings)}
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${
                        wcagFocusRings ? 'bg-[#B9825B]' : 'bg-[#D9C7B5]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                          wcagFocusRings ? 'left-6.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle 3: Touch Targets */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D9C7B5] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#4A3028]">
                        Ergonomic 48px Mobile Touch Targets (WCAG 2.5.5)
                      </div>
                      <div className="text-[11px] text-[#806B5E] mt-0.5">
                        {wcagTouchTargets
                          ? 'Active: Minimum 48x48px bounding boxes prevent rage taps on phones.'
                          : 'Inactive: Cramped 18px tap targets causing mis-clicks.'}
                      </div>
                    </div>
                    <button
                      onClick={() => setWcagTouchTargets(!wcagTouchTargets)}
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${
                        wcagTouchTargets ? 'bg-[#B9825B]' : 'bg-[#D9C7B5]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                          wcagTouchTargets ? 'left-6.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>

                  {/* Toggle 4: Inline Validation */}
                  <div className="p-3 bg-[#FAF7F2] rounded-xl border border-[#D9C7B5] flex items-center justify-between">
                    <div>
                      <div className="font-bold text-xs text-[#4A3028]">
                        Persistent Inline Error Guidance (WCAG 3.3.1)
                      </div>
                      <div className="text-[11px] text-[#806B5E] mt-0.5">
                        {wcagInlineValidation
                          ? 'Active: Real-time icon indicators and explicit format guides.'
                          : 'Inactive: Cryptic popups after full submission failure.'}
                      </div>
                    </div>
                    <button
                      onClick={() => setWcagInlineValidation(!wcagInlineValidation)}
                      className={`w-12 h-6 rounded-full transition-colors cursor-pointer relative ${
                        wcagInlineValidation ? 'bg-[#B9825B]' : 'bg-[#D9C7B5]'
                      }`}
                    >
                      <div
                        className={`w-5 h-5 rounded-full bg-white transition-transform absolute top-0.5 ${
                          wcagInlineValidation ? 'left-6.5' : 'left-0.5'
                        }`}
                      />
                    </button>
                  </div>
                </div>

                <div className="p-3 bg-[#E8D6C3]/50 rounded-xl border border-[#D9C7B5] flex items-center justify-between text-xs">
                  <span className="font-bold text-[#4A3028]">
                    WCAG AA Compliance Score:
                  </span>
                  <span className="font-black text-[#B9825B]">
                    {[wcagContrast, wcagFocusRings, wcagTouchTargets, wcagInlineValidation].filter(Boolean).length} / 4 Standards Passed
                  </span>
                </div>
              </div>

              {/* Live Preview of Accessible Form */}
              <div className="lg:col-span-6 flex justify-center">
                <div className="w-[310px] sm:w-[330px] bg-[#4A3028] rounded-[36px] p-3 shadow-xl border-4 border-[#35221C] relative">
                  <div className="w-28 h-3.5 bg-[#35221C] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1C120F] mr-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B9825B]" />
                  </div>

                  <div className={`rounded-[26px] overflow-hidden p-3.5 min-h-[500px] flex flex-col justify-between text-xs transition-colors ${
                    wcagContrast ? 'bg-[#F8F3EB] text-[#4A3028]' : 'bg-white text-zinc-400'
                  }`}>
                    <div>
                      <div className="text-center pb-2 border-b border-[#D9C7B5]">
                        <span className="font-extrabold text-[11px] uppercase tracking-wider block">
                          Student Relief Portal
                        </span>
                        <span className="text-[10px] text-[#806B5E]">WCAG Compliance Inspector</span>
                      </div>

                      <div className="space-y-3 mt-3">
                        {/* Field 1 */}
                        <div className="space-y-1">
                          <label className={`block text-[11px] font-bold ${wcagContrast ? 'text-[#4A3028]' : 'text-zinc-400'}`}>
                            Student ID Number
                          </label>
                          <div
                            tabIndex={0}
                            className={`p-2 rounded-lg text-[11px] bg-white border border-[#D9C7B5] ${
                              wcagFocusRings ? 'ring-3 ring-[#B9825B] ring-offset-2' : 'outline-none'
                            }`}
                          >
                            902184920
                          </div>
                          {wcagInlineValidation && (
                            <span className="text-[10px] text-emerald-700 font-medium flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                              Valid 9-digit university identifier
                            </span>
                          )}
                        </div>

                        {/* Field 2 */}
                        <div className="space-y-1">
                          <label className={`block text-[11px] font-bold ${wcagContrast ? 'text-[#4A3028]' : 'text-zinc-400'}`}>
                            Requested Amount ($)
                          </label>
                          <div className="p-2 rounded-lg text-[11px] bg-white border border-[#D9C7B5]">
                            $1,250.00
                          </div>
                        </div>

                        {/* Checkbox with Touch Target Preview */}
                        <div className="pt-1">
                          <label className={`flex items-center gap-2 cursor-pointer ${
                            wcagTouchTargets ? 'p-3 bg-[#E8D6C3]/40 rounded-xl border border-[#D9C7B5]' : 'p-1'
                          }`}>
                            <input type="checkbox" defaultChecked className="w-4 h-4 accent-[#B9825B]" />
                            <span className="text-[11px] font-semibold">I certify unexpected hardship</span>
                          </label>
                        </div>
                      </div>
                    </div>

                    <div className="pt-2">
                      <button className={`w-full bg-[#B9825B] text-white rounded-xl font-bold text-xs shadow-xs text-center ${
                        wcagTouchTargets ? 'py-3.5' : 'py-2'
                      }`}>
                        Submit Verification (WCAG Ready)
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ===================== LEVEL 4: PROGRESSIVE DISCLOSURE COMPLIANCE FLOW ===================== */}
          {level === 'advanced' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
              {/* Strategy & Microcopy Editor */}
              <div className="lg:col-span-7 bg-white rounded-xl border border-[#D9C7B5] p-5 shadow-xs space-y-4">
                {/* Mid-Task Urgent Alert */}
                <div className="bg-[#FAF7F2] rounded-xl border-2 border-[#B9825B]/40 p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-[#B9825B] text-white font-bold text-xs flex items-center justify-center">
                        MC
                      </div>
                      <div>
                        <div className="text-xs font-bold text-[#4A3028]">Marcus Chen (Product Lead)</div>
                        <div className="text-[10px] text-[#806B5E]">Mid-Sprint Compliance Mandate</div>
                      </div>
                    </div>
                    <span className="text-[10px] font-bold bg-[#E8D6C3] text-[#4A3028] px-2 py-0.5 rounded-full">
                      HB-402 Mandate
                    </span>
                  </div>
                  <p className="text-xs text-[#806B5E] leading-relaxed">
                    State compliance requires collecting <strong>Emergency Contact Phone</strong> and <strong>Dependent Household Status</strong> before releasing emergency funds. Use progressive disclosure to prevent form fatigue!
                  </p>
                </div>

                {/* Strategy Selector */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#806B5E]">
                    Choose Progressive Disclosure Pattern:
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'accordion', label: 'Expandable Accordion', desc: 'Embedded collapsible card' },
                      { id: 'drawer', label: 'Slide-in Drawer', desc: 'Contextual modal sheet' },
                      { id: 'step', label: '2-Step Wizard', desc: 'Sequential progressive flow' },
                    ].map((st) => (
                      <button
                        key={st.id}
                        onClick={() => setDisclosureStrategy(st.id as any)}
                        className={`p-2.5 rounded-xl border text-left cursor-pointer transition-all ${
                          disclosureStrategy === st.id
                            ? 'bg-[#E8D6C3] border-[#B9825B] ring-2 ring-[#B9825B]/40'
                            : 'bg-white border-[#D9C7B5] hover:bg-[#FAF7F2]'
                        }`}
                      >
                        <div className="font-bold text-xs text-[#4A3028]">{st.label}</div>
                        <div className="text-[10px] text-[#806B5E] mt-0.5">{st.desc}</div>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Privacy Microcopy Editor */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold uppercase text-[#806B5E]">
                    Reassuring Privacy Microcopy (Prevents Social Anxiety):
                  </label>
                  <textarea
                    value={privacyMicrocopy}
                    onChange={(e) => setPrivacyMicrocopy(e.target.value)}
                    rows={3}
                    className="w-full p-2.5 bg-white rounded-lg border border-[#D9C7B5] text-xs text-[#4A3028] outline-none focus:border-[#B9825B] leading-relaxed"
                  />
                </div>
              </div>

              {/* Live Preview */}
              <div className="lg:col-span-5 flex justify-center">
                <div className="w-[310px] sm:w-[330px] bg-[#4A3028] rounded-[36px] p-3 shadow-xl border-4 border-[#35221C] relative">
                  <div className="w-28 h-3.5 bg-[#35221C] rounded-full mx-auto mb-2 flex items-center justify-center">
                    <div className="w-2.5 h-2.5 rounded-full bg-[#1C120F] mr-2" />
                    <div className="w-1.5 h-1.5 rounded-full bg-[#B9825B]" />
                  </div>

                  <div className="bg-[#FAF7F2] rounded-[26px] overflow-hidden p-3.5 text-[#4A3028] min-h-[500px] flex flex-col justify-between text-xs space-y-3">
                    <div>
                      <div className="text-center pb-2 border-b border-[#D9C7B5]">
                        <span className="font-extrabold text-[11px] uppercase tracking-wider block">
                          Emergency Relief Application
                        </span>
                        <span className="text-[10px] text-[#806B5E]">Progressive Disclosure Active</span>
                      </div>

                      {/* Primary Clean Fields */}
                      <div className="space-y-2 mt-3">
                        <div className="p-2 bg-white rounded-lg border border-[#D9C7B5]">
                          <span className="text-[10px] text-[#806B5E] block font-bold">Full Name</span>
                          <span className="text-[11px] font-semibold text-[#4A3028]">Alex Rivera</span>
                        </div>
                        <div className="p-2 bg-white rounded-lg border border-[#D9C7B5]">
                          <span className="text-[10px] text-[#806B5E] block font-bold">Requested Assistance</span>
                          <span className="text-[11px] font-semibold text-[#4A3028]">$850.00</span>
                        </div>
                      </div>

                      {/* Progressive Disclosure Component */}
                      <div className="mt-3 border border-[#B9825B] rounded-xl overflow-hidden bg-white shadow-xs">
                        <button
                          onClick={() => setIsAccordionOpen(!isAccordionOpen)}
                          className="w-full p-2.5 bg-[#E8D6C3] flex items-center justify-between font-bold text-xs text-[#4A3028] text-left cursor-pointer"
                        >
                          <span className="flex items-center gap-1.5">
                            <ShieldCheck className="w-3.5 h-3.5 text-[#B9825B]" />
                            <span>Mandatory State Compliance</span>
                          </span>
                          {isAccordionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>

                        {isAccordionOpen && (
                          <div className="p-2.5 space-y-2 bg-[#FAF7F2] border-t border-[#D9C7B5]">
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#4A3028] block">Emergency Contact Phone:</label>
                              <input type="text" placeholder="(555) 000-0000" className="w-full p-1.5 bg-white rounded border border-[#D9C7B5] text-[11px]" />
                            </div>
                            <div className="space-y-1">
                              <label className="text-[10px] font-bold text-[#4A3028] block">Dependent Household Status:</label>
                              <select className="w-full p-1.5 bg-white rounded border border-[#D9C7B5] text-[11px]">
                                <option>Independent Adult</option>
                                <option>Claimed on Parent Tax Return</option>
                              </select>
                            </div>
                            <div className="p-2 bg-white rounded border border-[#D9C7B5] text-[10px] text-[#806B5E] italic">
                              🛡️ {privacyMicrocopy}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="pt-2">
                      <button className="w-full py-2.5 bg-[#B9825B] text-white rounded-xl font-bold text-xs shadow-xs text-center">
                        Submit Verified Application
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Student UX Redesign Proposal Box (Common to all 4 levels) */}
          <div className="bg-white rounded-xl border border-[#D9C7B5] p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-[#4A3028] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#B9825B]" />
                  <span>Student UX Redesign Proposal & Heuristic Justification</span>
                </h4>
                <p className="text-xs text-[#806B5E] mt-0.5">
                  Draft your overhaul: explain the identified flaws, proposed UI elements/microcopy, and how it protects student dignity.
                </p>
              </div>

              <button
                onClick={handleLoadSampleProposal}
                className="text-xs font-semibold text-[#B9825B] hover:text-[#A06D48] cursor-pointer self-start sm:self-auto"
              >
                Load Sample Proposal
              </button>
            </div>

            <textarea
              value={currentProposal}
              onChange={(e) => handleProposalChange(e.target.value)}
              rows={7}
              className="w-full p-3.5 rounded-lg border border-[#D9C7B5] text-xs sm:text-sm text-[#4A3028] bg-white focus:ring-2 focus:ring-[#B9825B] focus:border-transparent outline-none leading-relaxed"
              placeholder="Write your UX redesign proposal here (e.g., 1. Critical barriers identified, 2. Proposed UI & microcopy redesign, 3. How user agency/dignity is preserved)..."
            />

            {validationError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#806B5E]">
                {currentProposal.trim().length} characters (min. 25 required)
              </span>

              <button
                onClick={handleSubmit}
                disabled={isLoadingEvaluation}
                className="px-5 py-2 bg-[#B9825B] hover:bg-[#A06D48] text-white text-xs sm:text-sm font-bold rounded-lg transition-all shadow-xs flex items-center gap-2 cursor-pointer disabled:opacity-50"
              >
                <Send className="w-4 h-4" />
                <span>{isLoadingEvaluation ? 'Evaluating with Gemini...' : 'Submit for AI Evaluation'}</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: STUDENT INTERVIEWS */}
      {activeTab === 'quotes' && (
        <div className="space-y-4">
          <div className="bg-[#F8F3EB] p-3.5 rounded-xl border border-[#D9C7B5] text-xs text-[#806B5E]">
            Direct user research quotes gathered during student usability testing sessions for <strong className="text-[#4A3028]">{currentConfig.title}</strong>:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {currentConfig.userQuotes.map((q, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#D9C7B5] shadow-xs space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold text-[#4A3028]">
                  <MessageSquare className="w-4 h-4 text-[#B9825B]" />
                  <span>{q.author}</span>
                  <span className="text-[#806B5E] font-normal">— {q.role}</span>
                </div>
                <p className="text-xs italic text-[#4A3028] bg-[#FAF7F2] p-3 rounded-lg border border-[#D9C7B5]/60 leading-relaxed">
                  "{q.quote}"
                </p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: HEURISTICS */}
      {activeTab === 'heuristics' && (
        <div className="space-y-4">
          <div className="bg-[#F8F3EB] p-3.5 rounded-xl border border-[#D9C7B5] text-xs text-[#806B5E]">
            Core usability heuristics applied to evaluate this level:
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {currentConfig.heuristics.map((h, idx) => (
              <div key={idx} className="bg-white p-4 rounded-xl border border-[#D9C7B5] shadow-xs space-y-2">
                <div className="text-xs font-bold text-[#4A3028] flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#B9825B]" />
                  <span>{h.name}</span>
                </div>
                <p className="text-xs text-[#806B5E] leading-relaxed">
                  {h.principle}
                </p>
                <div className="pt-2 border-t border-[#D9C7B5]/50 text-[11px] text-[#4A3028]">
                  <strong className="text-[#B9825B]">Application:</strong> {h.application}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 4: HINTS */}
      {activeTab === 'hints' && (
        <div className="space-y-3">
          <div className="bg-[#F8F3EB] p-3 rounded-lg border border-[#D9C7B5] text-xs text-[#806B5E]">
            Need inspiration or wondering how to structure your proposal? Expand the hints below.
          </div>

          {currentConfig.hints.map((hint, idx) => {
            const isExpanded = expandedHint === idx;
            return (
              <div key={idx} className="bg-white rounded-xl border border-[#D9C7B5] overflow-hidden shadow-xs">
                <button
                  onClick={() => setExpandedHint(isExpanded ? null : idx)}
                  className="w-full px-4 py-3 flex items-center justify-between text-left text-xs font-bold text-[#4A3028] hover:bg-[#F8F3EB]/60 cursor-pointer"
                >
                  <span className="flex items-center gap-2">
                    <HelpCircle className="w-4 h-4 text-[#B9825B]" />
                    <span>Design Clue #{idx + 1}</span>
                  </span>
                  {isExpanded ? <ChevronUp className="w-4 h-4 text-[#806B5E]" /> : <ChevronDown className="w-4 h-4 text-[#806B5E]" />}
                </button>
                {isExpanded && (
                  <div className="px-4 pb-3 pt-1 text-xs text-[#806B5E] leading-relaxed border-t border-[#D9C7B5]/50 bg-[#FAF7F2]">
                    {hint}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
