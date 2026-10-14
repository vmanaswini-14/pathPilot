import React, { useState, useEffect } from 'react';
import alasql from 'alasql';
import { DATA_ANALYST_LEVELS } from '../../data/dataAnalystTasks';
import { DifficultyLevel, SqlQueryResult } from '../../types';
import {
  Database,
  Play,
  RotateCcw,
  Sparkles,
  Clock,
  HelpCircle,
  TrendingDown,
  TrendingUp,
  Table,
  CheckCircle2,
  AlertCircle,
  FileText,
  Send,
  Layers,
  ChevronDown,
  ChevronUp,
  Info,
  Code2,
  Loader2,
} from 'lucide-react';

// Safely resolve the AlaSQL instance across Vite/Rollup dev & prod environments
function getAlaSqlEngine(): any {
  if (typeof window !== 'undefined' && typeof (window as any).alasql === 'function') {
    return (window as any).alasql;
  }
  const raw: any = alasql;
  if (typeof raw === 'function') return raw;
  if (raw && typeof raw.default === 'function') return raw.default;
  return null;
}

interface DataAnalystMaterialsProps {
  onDirectSubmit?: (payload: {
    level: DifficultyLevel;
    sqlQuery: string;
    analysisMemo: string;
    sqlResult: SqlQueryResult | null;
  }) => Promise<void>;
  isLoadingEvaluation?: boolean;
}

export const DataAnalystMaterials: React.FC<DataAnalystMaterialsProps> = ({
  onDirectSubmit,
  isLoadingEvaluation = false,
}) => {
  const [level, setLevel] = useState<DifficultyLevel>('beginner');
  const currentConfig = DATA_ANALYST_LEVELS[level];

  // Queries state per level
  const [queries, setQueries] = useState<Record<DifficultyLevel, string>>({
    beginner: DATA_ANALYST_LEVELS.beginner.starterQuery,
    easy: DATA_ANALYST_LEVELS.easy.starterQuery,
    intermediate: DATA_ANALYST_LEVELS.intermediate.starterQuery,
    advanced: DATA_ANALYST_LEVELS.advanced.starterQuery,
  });

  // Memos state per level
  const [memos, setMemos] = useState<Record<DifficultyLevel, string>>({
    beginner: '',
    easy: '',
    intermediate: '',
    advanced: '',
  });

  const [activeTab, setActiveTab] = useState<'workspace' | 'schema' | 'dataset' | 'hints'>('workspace');
  const [queryResult, setQueryResult] = useState<SqlQueryResult | null>(null);
  const [isExecuting, setIsExecuting] = useState<boolean>(false);
  const [expandedHint, setExpandedHint] = useState<number | null>(null);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [selectedTableIndex, setSelectedTableIndex] = useState<number>(0);

  const currentQuery = queries[level];
  const currentMemo = memos[level];

  const allTables = [
    {
      tableName: currentConfig.tableName,
      columns: currentConfig.schemaColumns,
      dataset: currentConfig.dataset,
    },
    ...(currentConfig.extraTables || []).map((t) => ({
      tableName: t.tableName,
      columns: t.schemaColumns,
      dataset: t.dataset,
    })),
  ];

  const activeTableInfo = allTables[selectedTableIndex] || allTables[0];

  // Reset selected table index and execute query when level changes
  useEffect(() => {
    setSelectedTableIndex(0);
    const initialQuery = queries[level] || currentConfig.starterQuery;
    executeSql(initialQuery);
  }, [level]);

  const executeSql = async (sqlText: string): Promise<SqlQueryResult> => {
    setIsExecuting(true);
    setValidationError(null);

    const cleanQuery = (sqlText || '').trim();
    if (!cleanQuery) {
      const emptyRes: SqlQueryResult = {
        success: false,
        columns: [],
        rows: [],
        rowCount: 0,
        executionTimeMs: 0,
        errorMessage: 'Please enter a SQL query before clicking Run.',
        query: sqlText,
        timestamp: new Date().toLocaleTimeString(),
      };
      setQueryResult(emptyRes);
      setIsExecuting(false);
      return emptyRes;
    }

    // Preprocess SQL: strip trailing semicolons, normalize bracketed aliases for reserved words
    let sanitizedSql = cleanQuery.replace(/;+\s*$/, '');
    sanitizedSql = sanitizedSql
      .replace(/\bAS\s+count\b/gi, 'AS [count]')
      .replace(/\bAS\s+total\b/gi, 'AS [total]')
      .replace(/\bAS\s+order\b/gi, 'AS [order]')
      .replace(/\bAS\s+key\b/gi, 'AS [key]')
      .replace(/\bAS\s+value\b/gi, 'AS [value]')
      .replace(/\bORDER\s+BY\s+total\b/gi, 'ORDER BY [total]')
      .replace(/\bORDER\s+BY\s+count\b/gi, 'ORDER BY [count]')
      .replace(/\bGROUP\s+BY\s+total\b/gi, 'GROUP BY [total]')
      .replace(/\bGROUP\s+BY\s+count\b/gi, 'GROUP BY [count]');

    let executedResult: SqlQueryResult | null = null;

    // Strategy 1: Attempt in-browser client AlaSQL execution
    const engine = getAlaSqlEngine();
    if (engine && typeof engine === 'function') {
      try {
        const t0 = performance.now();
        if (typeof window !== 'undefined' && !(window as any).alasql) {
          (window as any).alasql = engine;
        }

        // Setup primary table in memory
        try { engine(`DROP TABLE IF EXISTS ${currentConfig.tableName}`); } catch {}
        engine(`CREATE TABLE ${currentConfig.tableName}`);
        if (!engine.tables) {
          engine.tables = engine.databases?.alasql?.tables || {};
        }
        if (engine.tables[currentConfig.tableName]) {
          engine.tables[currentConfig.tableName].data = JSON.parse(JSON.stringify(currentConfig.dataset));
        }

        // Setup extra tables in memory (e.g., students and disbursements for Level 3)
        if (currentConfig.extraTables && Array.isArray(currentConfig.extraTables)) {
          for (const extra of currentConfig.extraTables) {
            try { engine(`DROP TABLE IF EXISTS ${extra.tableName}`); } catch {}
            engine(`CREATE TABLE ${extra.tableName}`);
            if (engine.tables[extra.tableName]) {
              engine.tables[extra.tableName].data = JSON.parse(JSON.stringify(extra.dataset));
            }
          }
        }

        const raw = engine(sanitizedSql);
        const dt = Math.round((performance.now() - t0) * 10) / 10;

        if (Array.isArray(raw)) {
          const columns = raw.length > 0 ? Object.keys(raw[0]) : [];
          executedResult = {
            success: true,
            columns,
            rows: raw,
            rowCount: raw.length,
            executionTimeMs: dt,
            query: sqlText,
            timestamp: new Date().toLocaleTimeString(),
          };
        } else {
          executedResult = {
            success: true,
            columns: ['Result'],
            rows: [{ Result: JSON.stringify(raw) }],
            rowCount: 1,
            executionTimeMs: dt,
            query: sqlText,
            timestamp: new Date().toLocaleTimeString(),
          };
        }
      } catch (clientErr: any) {
        const msg = clientErr?.message || String(clientErr);
        // If it is a standard SQL grammar/syntax error, present it directly
        if (msg.includes('Parse error') || msg.includes('syntax') || msg.includes('Column') || msg.includes('Table')) {
          executedResult = {
            success: false,
            columns: [],
            rows: [],
            rowCount: 0,
            executionTimeMs: 0,
            errorMessage: msg,
            query: sqlText,
            timestamp: new Date().toLocaleTimeString(),
          };
        }
      }
    }

    // Strategy 2: If in-browser execution failed or was unavailable, call backend /api/execute-sql endpoint
    if (!executedResult) {
      try {
        const resp = await fetch('/api/execute-sql', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ query: sqlText, level }),
        });
        const data = await resp.json();
        executedResult = {
          success: Boolean(data.success),
          columns: Array.isArray(data.columns) ? data.columns : [],
          rows: Array.isArray(data.rows) ? data.rows : [],
          rowCount: typeof data.rowCount === 'number' ? data.rowCount : 0,
          executionTimeMs: typeof data.executionTimeMs === 'number' ? data.executionTimeMs : 0,
          errorMessage: data.errorMessage,
          query: sqlText,
          timestamp: data.timestamp || new Date().toLocaleTimeString(),
        };
      } catch (networkErr: any) {
        executedResult = {
          success: false,
          columns: [],
          rows: [],
          rowCount: 0,
          executionTimeMs: 0,
          errorMessage: networkErr?.message || 'Failed to execute SQL query.',
          query: sqlText,
          timestamp: new Date().toLocaleTimeString(),
        };
      }
    }

    setQueryResult(executedResult);
    setIsExecuting(false);
    return executedResult;
  };

  const handleQueryChange = (val: string) => {
    setQueries((prev) => ({ ...prev, [level]: val }));
  };

  const handleMemoChange = (val: string) => {
    setMemos((prev) => ({ ...prev, [level]: val }));
    if (val.trim().length >= 25 && validationError) {
      setValidationError(null);
    }
  };

  const handleResetQuery = () => {
    const starter = currentConfig.starterQuery;
    setQueries((prev) => ({ ...prev, [level]: starter }));
    executeSql(starter);
  };

  const handleLoadSampleAnalysis = () => {
    setMemos((prev) => ({ ...prev, [level]: currentConfig.sampleAnalysis }));
    setValidationError(null);
  };

  const handleSubmit = async () => {
    if (!currentMemo || currentMemo.trim().length < 25) {
      setValidationError(
        'Please write a substantive analyst memo (at least 25 characters) interpreting the data before submitting.'
      );
      return;
    }
    setValidationError(null);

    // If query has changed since last run or hasn't run yet, execute it first
    let activeResult = queryResult;
    if (!activeResult || activeResult.query !== currentQuery) {
      activeResult = await executeSql(currentQuery);
    }

    if (onDirectSubmit) {
      await onDirectSubmit({
        level,
        sqlQuery: currentQuery,
        analysisMemo: currentMemo,
        sqlResult: activeResult,
      });
    }
  };

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
                4 Distinct SQL Tasks
              </span>
            </div>
            <p className="text-xs text-[#806B5E] mt-0.5">
              Change levels freely without losing written work. Each level features a different campus scenario, schema, and dataset.
            </p>
          </div>

          <div className="flex items-center gap-1.5 self-start sm:self-auto bg-[#F8F3EB] p-1 rounded-lg border border-[#D9C7B5]">
            {(['beginner', 'easy', 'intermediate', 'advanced'] as DifficultyLevel[]).map((lvl) => {
              const cfg = DATA_ANALYST_LEVELS[lvl];
              const isSelected = level === lvl;
              return (
                <button
                  key={lvl}
                  onClick={() => setLevel(lvl)}
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
                <Database className="w-3.5 h-3.5 text-[#B9825B]" /> Table: <code className="bg-[#F8F3EB] px-1 py-0.2 rounded text-[11px] font-mono text-[#4A3028]">{currentConfig.tableName}</code>
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
            <span>Core Analytical Challenge:</span>
          </div>
          <p className="text-[#4A3028] leading-relaxed">
            {currentConfig.problemStatement}
          </p>
        </div>
      </div>

      {/* KPI Highlight Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {currentConfig.kpis.map((kpi, idx) => (
          <div key={idx} className="bg-white p-3.5 rounded-xl border border-[#D9C7B5] shadow-xs">
            <div className="flex items-center justify-between text-xs font-semibold text-[#806B5E]">
              <span>{kpi.label}</span>
              {kpi.trend === 'up' && <TrendingUp className="w-3.5 h-3.5 text-[#B9825B]" />}
              {kpi.trend === 'down' && <TrendingDown className="w-3.5 h-3.5 text-amber-700" />}
              {kpi.trend === 'neutral' && <Info className="w-3.5 h-3.5 text-[#806B5E]" />}
            </div>
            <div className="text-xl sm:text-2xl font-black text-[#4A3028] mt-1">
              {kpi.value}
            </div>
            <p className="text-[11px] text-[#806B5E] mt-0.5">{kpi.subtext}</p>
          </div>
        ))}
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
          <Code2 className="w-3.5 h-3.5" />
          <span>Interactive SQL Studio</span>
        </button>

        <button
          onClick={() => setActiveTab('schema')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'schema'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'bg-white text-[#4A3028] hover:bg-[#E8D6C3]/40 border border-[#D9C7B5]'
          }`}
        >
          <Database className="w-3.5 h-3.5" />
          <span>Table Schema ({currentConfig.schemaColumns.length} Columns)</span>
        </button>

        <button
          onClick={() => setActiveTab('dataset')}
          className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
            activeTab === 'dataset'
              ? 'bg-[#B9825B] text-white shadow-xs'
              : 'bg-white text-[#4A3028] hover:bg-[#E8D6C3]/40 border border-[#D9C7B5]'
          }`}
        >
          <Table className="w-3.5 h-3.5" />
          <span>Raw Records ({currentConfig.dataset.length} Rows)</span>
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
          <span>Analytical Hints ({currentConfig.hints.length})</span>
        </button>
      </div>

      {/* TAB 1: WORKSPACE */}
      {activeTab === 'workspace' && (
        <div className="space-y-5">
          {/* Mid-Task Manager Inquiry Update Card (Level 4) */}
          {currentConfig.managerUpdate && (
            <div className="bg-[#FAF7F2] rounded-xl border-2 border-[#B9825B]/40 p-4 shadow-xs space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-[#B9825B] text-white font-bold text-xs flex items-center justify-center">
                    MC
                  </div>
                  <div>
                    <div className="text-xs font-bold text-[#4A3028]">
                      {currentConfig.managerUpdate.author} ({currentConfig.managerUpdate.role})
                    </div>
                    <div className="text-[10px] text-[#806B5E]">
                      {currentConfig.managerUpdate.timestamp}
                    </div>
                  </div>
                </div>
                <span className="text-[10px] font-bold bg-[#E8D6C3] text-[#4A3028] px-2 py-0.5 rounded-full border border-[#D9C7B5]">
                  Urgent Manager Request
                </span>
              </div>

              <div className="text-xs text-[#4A3028] bg-white p-3 rounded-lg border border-[#D9C7B5] leading-relaxed">
                <strong className="block font-bold text-[#4A3028] mb-1">
                  {currentConfig.managerUpdate.subject}
                </strong>
                <p className="text-[#806B5E]">{currentConfig.managerUpdate.message}</p>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-1 text-xs">
                <div className="text-[11px] text-[#806B5E]">
                  <strong className="text-[#4A3028]">Inquiry:</strong> {currentConfig.managerUpdate.revisedTask}
                </div>
                {currentConfig.managerUpdate.revisedQueryHint && (
                  <button
                    onClick={() => {
                      handleQueryChange(currentConfig.managerUpdate!.revisedQueryHint!);
                      executeSql(currentConfig.managerUpdate!.revisedQueryHint!);
                    }}
                    className="px-3 py-1 bg-[#B9825B] hover:bg-[#A06D48] text-white rounded-lg text-xs font-bold transition-all shrink-0 cursor-pointer"
                  >
                    Load Grace Period Query
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Guided Questions / Analytical Prompts if available */}
          {currentConfig.guidedQuestions && currentConfig.guidedQuestions.length > 0 && (
            <div className="bg-white rounded-xl border border-[#D9C7B5] p-4 shadow-xs space-y-2.5">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-[#B9825B]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4A3028]">
                  Guided Analysis Questions to Answer in Your Memo:
                </h4>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                {currentConfig.guidedQuestions.map((gq, i) => (
                  <div key={i} className="p-2.5 bg-[#F8F3EB] rounded-lg border border-[#D9C7B5] space-y-1">
                    <span className="font-bold text-[#4A3028] block">Q{i + 1}: {gq.question}</span>
                    <span className="text-[11px] text-[#806B5E] block">Key Insight: {gq.explanation}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SQL Editor Card */}
          <div className="bg-white rounded-xl border border-[#D9C7B5] overflow-hidden shadow-xs">
            {/* Header / Controls */}
            <div className="bg-[#F8F3EB] px-4 py-2.5 border-b border-[#D9C7B5] flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Database className="w-4 h-4 text-[#B9825B]" />
                <span className="text-xs font-bold text-[#4A3028] font-mono">
                  query.sql — {currentConfig.tableName}
                </span>
                <span className="text-[10px] bg-[#E8D6C3] text-[#4A3028] px-1.5 py-0.5 rounded font-mono">
                  Engine: Client SQL (AlaSQL)
                </span>
              </div>

              {/* Sample queries 1-click */}
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] text-[#806B5E] hidden sm:inline">Pre-built:</span>
                {currentConfig.sampleQueries.map((sq, i) => (
                  <button
                    key={i}
                    onClick={() => {
                      handleQueryChange(sq.query);
                      executeSql(sq.query);
                    }}
                    title={sq.purpose}
                    className="text-[11px] bg-white hover:bg-[#E8D6C3]/50 text-[#4A3028] px-2 py-0.5 rounded border border-[#D9C7B5] cursor-pointer transition-colors"
                  >
                    {sq.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Code Textarea */}
            <div className="p-3 bg-[#FAF7F2]">
              <textarea
                value={currentQuery}
                onChange={(e) => handleQueryChange(e.target.value)}
                rows={5}
                className="w-full font-mono text-xs sm:text-sm p-3 bg-white border border-[#D9C7B5] rounded-lg text-[#4A3028] focus:ring-2 focus:ring-[#B9825B] focus:border-transparent outline-none resize-y leading-relaxed"
                placeholder="Write your SQL SELECT query here..."
                spellCheck={false}
              />
            </div>

            {/* Action Bar */}
            <div className="bg-[#F8F3EB] px-4 py-2 border-t border-[#D9C7B5] flex items-center justify-between">
              <div className="text-[11px] text-[#806B5E]">
                Supports: <code className="text-[#4A3028] font-bold">SELECT, WHERE, GROUP BY, HAVING, ORDER BY, SUM, AVG, COUNT</code>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={handleResetQuery}
                  className="px-2.5 py-1 text-xs font-semibold text-[#806B5E] hover:text-[#4A3028] flex items-center gap-1 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Reset Starter</span>
                </button>

                <button
                  type="button"
                  onClick={() => executeSql(currentQuery)}
                  disabled={isExecuting}
                  className="px-4 py-1.5 bg-[#B9825B] hover:bg-[#A06D48] text-white text-xs font-bold rounded-lg transition-all shadow-xs flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
                  title="Execute your SQL query against the dataset"
                >
                  {isExecuting ? (
                    <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  ) : (
                    <Play className="w-3.5 h-3.5 fill-current" />
                  )}
                  <span>{isExecuting ? 'Running Query...' : 'Run SQL Query'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Results Table Output */}
          <div className="bg-white rounded-xl border border-[#D9C7B5] overflow-hidden shadow-xs">
            <div className="bg-[#F8F3EB] px-4 py-2 border-b border-[#D9C7B5] flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Table className="w-4 h-4 text-[#B9825B]" />
                <span className="text-xs font-bold text-[#4A3028]">Execution Results</span>
                {queryResult && (
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded font-mono font-bold ${
                      queryResult.success
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-rose-100 text-rose-800'
                    }`}
                  >
                    {queryResult.success
                      ? `${queryResult.rowCount} rows (${queryResult.executionTimeMs} ms)`
                      : 'SQL Execution Error'}
                  </span>
                )}
              </div>
              {queryResult && (
                <span className="text-[11px] text-[#806B5E]">
                  Executed at {queryResult.timestamp}
                </span>
              )}
            </div>

            <div className="p-3">
              {/* Error Message */}
              {queryResult && !queryResult.success && (
                <div className="p-3 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-start gap-2">
                  <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">SQL Syntax Error:</span>
                    <p className="font-mono mt-0.5">{queryResult.errorMessage}</p>
                  </div>
                </div>
              )}

              {/* Success Empty Rows */}
              {queryResult && queryResult.success && queryResult.rowCount === 0 && (
                <div className="p-6 text-center text-xs text-[#806B5E]">
                  Query executed successfully, but returned 0 rows matching your WHERE criteria.
                </div>
              )}

              {/* Data Table */}
              {queryResult && queryResult.success && queryResult.rowCount > 0 && (
                <div className="overflow-x-auto max-h-[340px] rounded-lg border border-[#D9C7B5]">
                  <table className="w-full text-left text-xs border-collapse">
                    <thead className="bg-[#F8F3EB] text-[#4A3028] sticky top-0 border-b border-[#D9C7B5]">
                      <tr>
                        {queryResult.columns.map((col, idx) => (
                          <th key={idx} className="p-2.5 font-bold font-mono uppercase tracking-wider text-[11px]">
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#D9C7B5]/60 bg-white">
                      {queryResult.rows.map((row, rIdx) => (
                        <tr key={rIdx} className="hover:bg-[#F8F3EB]/60 transition-colors">
                          {queryResult.columns.map((col, cIdx) => {
                            const val = row[col];
                            return (
                              <td key={cIdx} className="p-2.5 font-mono text-[11px] text-[#4A3028]">
                                {val !== null && val !== undefined ? String(val) : <span className="text-[#806B5E] italic">NULL</span>}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Expected Insights Checklist */}
          <div className="bg-[#F8F3EB] border border-[#D9C7B5] rounded-xl p-4 text-xs">
            <div className="flex items-center gap-2 font-bold text-[#4A3028] mb-2">
              <Sparkles className="w-4 h-4 text-[#B9825B]" />
              <span>Key Analytical Inferences to Look For:</span>
            </div>
            <ul className="space-y-1.5 text-[#806B5E]">
              {currentConfig.expectedInsights.map((insight, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-[#B9825B] shrink-0 mt-0.5" />
                  <span>{insight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Analyst Written Recommendation / Memo Section */}
          <div className="bg-white rounded-xl border border-[#D9C7B5] p-4 shadow-xs space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h4 className="text-sm font-bold text-[#4A3028] flex items-center gap-1.5">
                  <FileText className="w-4 h-4 text-[#B9825B]" />
                  <span>Student Analyst Memo & Strategic Recommendation</span>
                </h4>
                <p className="text-xs text-[#806B5E] mt-0.5">
                  Synthesize what the SQL results revealed. State observations, root cause, and concrete next steps.
                </p>
              </div>

              <button
                onClick={handleLoadSampleAnalysis}
                className="text-xs font-semibold text-[#B9825B] hover:text-[#A06D48] cursor-pointer self-start sm:self-auto"
              >
                Load Sample Analysis
              </button>
            </div>

            <textarea
              value={currentMemo}
              onChange={(e) => handleMemoChange(e.target.value)}
              rows={6}
              className="w-full p-3.5 rounded-lg border border-[#D9C7B5] text-xs sm:text-sm text-[#4A3028] bg-white focus:ring-2 focus:ring-[#B9825B] focus:border-transparent outline-none leading-relaxed"
              placeholder="Write your diagnostic memo here (e.g., Problem identified from SQL data, primary root cause, and 2 concrete operational recommendations)..."
            />

            {validationError && (
              <div className="p-2.5 rounded-lg bg-rose-50 border border-rose-200 text-rose-800 text-xs flex items-center gap-2">
                <AlertCircle className="w-4 h-4 text-rose-600 shrink-0" />
                <span>{validationError}</span>
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <span className="text-xs text-[#806B5E]">
                {currentMemo.trim().length} characters (min. 25 required)
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

      {/* TAB 2: SCHEMA */}
      {activeTab === 'schema' && (
        <div className="bg-white rounded-xl border border-[#D9C7B5] overflow-hidden shadow-xs space-y-3">
          {/* Table Selector if multiple tables exist */}
          {allTables.length > 1 && (
            <div className="p-3 bg-[#FAF7F2] border-b border-[#D9C7B5] flex items-center gap-2">
              <span className="text-xs font-bold text-[#806B5E]">Select Table:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {allTables.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTableIndex(idx)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedTableIndex === idx
                        ? 'bg-[#B9825B] text-white shadow-xs'
                        : 'bg-white text-[#4A3028] border border-[#D9C7B5] hover:bg-[#E8D6C3]/40'
                    }`}
                  >
                    {t.tableName}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#F8F3EB] px-4 py-3 border-b border-[#D9C7B5]">
            <h4 className="text-sm font-bold text-[#4A3028]">
              Schema Definition for Table: <code className="font-mono text-[#B9825B]">{activeTableInfo.tableName}</code>
            </h4>
            <p className="text-xs text-[#806B5E] mt-0.5">
              Available fields and data types for constructing SQL queries.
            </p>
          </div>
          <div className="p-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-[#F8F3EB] text-[#4A3028] border-b border-[#D9C7B5]">
                <tr>
                  <th className="p-2.5 font-bold">Column Name</th>
                  <th className="p-2.5 font-bold">Data Type</th>
                  <th className="p-2.5 font-bold">Field Description</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9C7B5]/60 font-mono">
                {activeTableInfo.columns.map((col, idx) => (
                  <tr key={idx} className="hover:bg-[#F8F3EB]/50">
                    <td className="p-2.5 font-bold text-[#4A3028]">{col.name}</td>
                    <td className="p-2.5 text-[#B9825B]">{col.type}</td>
                    <td className="p-2.5 font-sans text-[#806B5E]">{col.description}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 3: RAW DATASET */}
      {activeTab === 'dataset' && (
        <div className="bg-white rounded-xl border border-[#D9C7B5] overflow-hidden shadow-xs">
          {/* Table Selector if multiple tables exist */}
          {allTables.length > 1 && (
            <div className="p-3 bg-[#FAF7F2] border-b border-[#D9C7B5] flex items-center gap-2">
              <span className="text-xs font-bold text-[#806B5E]">Select Table:</span>
              <div className="flex items-center gap-1.5 flex-wrap">
                {allTables.map((t, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedTableIndex(idx)}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-bold transition-all cursor-pointer ${
                      selectedTableIndex === idx
                        ? 'bg-[#B9825B] text-white shadow-xs'
                        : 'bg-white text-[#4A3028] border border-[#D9C7B5] hover:bg-[#E8D6C3]/40'
                    }`}
                  >
                    {t.tableName} ({t.dataset.length})
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="bg-[#F8F3EB] px-4 py-3 border-b border-[#D9C7B5] flex items-center justify-between">
            <div>
              <h4 className="text-sm font-bold text-[#4A3028]">
                Table Records: {activeTableInfo.tableName}
              </h4>
              <p className="text-xs text-[#806B5E] mt-0.5">
                Complete preloaded dataset ({activeTableInfo.dataset.length} total rows)
              </p>
            </div>
            <span className="text-xs bg-[#E8D6C3] text-[#4A3028] px-2.5 py-1 rounded-md font-mono font-bold">
              {activeTableInfo.dataset.length} Records
            </span>
          </div>

          <div className="p-4 overflow-x-auto max-h-[420px]">
            <table className="w-full text-left text-xs border-collapse">
              <thead className="bg-[#F8F3EB] text-[#4A3028] sticky top-0 border-b border-[#D9C7B5]">
                <tr>
                  {Object.keys(activeTableInfo.dataset[0] || {}).map((col, idx) => (
                    <th key={idx} className="p-2 font-mono text-[11px] font-bold uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D9C7B5]/60">
                {activeTableInfo.dataset.map((row, rIdx) => (
                  <tr key={rIdx} className="hover:bg-[#F8F3EB]/60">
                    {Object.values(row).map((val, cIdx) => (
                      <td key={cIdx} className="p-2 font-mono text-[11px] text-[#4A3028]">
                        {String(val)}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 4: HINTS */}
      {activeTab === 'hints' && (
        <div className="space-y-3">
          <div className="bg-[#F8F3EB] p-3 rounded-lg border border-[#D9C7B5] text-xs text-[#806B5E]">
            Stuck on query structure or interpretation? Expand the progressive hints below.
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
                    <span>Progressive Clue #{idx + 1}</span>
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
