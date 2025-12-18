import React, { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  startCheckerSession,
  fetchCheckerSymptoms,
  fetchCommonCheckerSymptoms,
  saveSessionSymptoms,
  matchConditions,
  fetchConditionDetails,
  fetchTreatmentDetails,
  createReportSnapshot,
} from '../services/api';

const steps = [
  'Info',
  'Symptoms',
  'Condition Matches',
  'Condition Details',
  'Treatment',
  'Report',
];

const StepIndicator = ({ activeStep }) => (
  <div className="mb-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
    {steps.map((label, index) => {
      const isActive = index === activeStep;
      const isDone = index < activeStep;
      return (
        <div
          key={label}
          className={[
            'flex items-center gap-3 rounded-2xl border px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em]',
            isActive ? 'border-[#0d7120] bg-[#e8f7ed] text-[#0d7120]' : 'border-slate-200 bg-white text-slate-600',
          ].join(' ')}
        >
          <span
            className={[
              'inline-flex h-7 w-7 items-center justify-center rounded-full text-sm font-bold',
              isDone
                ? 'bg-[#0d7120] text-white'
                : isActive
                ? 'bg-[#ccff2e] text-[#0d7120]'
                : 'bg-slate-100 text-slate-500',
            ].join(' ')}
          >
            {isDone ? '✓' : index + 1}
          </span>
          <span>{label}</span>
        </div>
      );
    })}
  </div>
);

const Disclaimer = ({ message }) => (
  <div className="mb-4 rounded-2xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
    <strong className="font-semibold">Important: </strong>
    {message}
  </div>
);

const SymptomChip = ({ label, selected, onToggle }) => (
  <button
    type="button"
    onClick={onToggle}
    className={[
      'rounded-full border px-4 py-2 text-sm font-semibold transition',
      selected
        ? 'border-[#0d7120] bg-[#e8f7ed] text-[#0d7120] shadow-sm'
        : 'border-slate-200 bg-white text-slate-700 hover:border-[#0d7120]/70',
    ].join(' ')}
  >
    {label}
  </button>
);

const ConditionCard = ({ condition, onSelect }) => (
  <button
    type="button"
    onClick={() => onSelect(condition)}
    className="flex w-full flex-col gap-3 rounded-2xl border border-slate-200 bg-white p-4 text-left shadow-sm transition hover:-translate-y-0.5 hover:border-[#0d7120]/60 hover:shadow-md"
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Condition that may match your symptoms</p>
        <p className="text-lg font-semibold text-slate-900">{condition.name}</p>
      </div>
      <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
        {condition.matchLevel}
      </span>
    </div>
    <div className="h-2 w-full rounded-full bg-slate-100">
      <div
        className="h-2 rounded-full bg-gradient-to-r from-[#0d7120] to-[#9be15d]"
        style={{ width: `${condition.score}%` }}
      />
    </div>
    <p className="text-sm text-slate-600">
      Match score: <span className="font-semibold text-[#0d7120]">{condition.score}%</span>
    </p>
  </button>
);

const ReportRow = ({ title, children }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-4">
    <p className="text-xs uppercase tracking-[0.18em] text-slate-500">{title}</p>
    <div className="mt-2 text-slate-800">{children}</div>
  </div>
);

const SymptomChecker = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [sessionId, setSessionId] = useState('');
  const [age, setAge] = useState('');
  const [sex, setSex] = useState('female');
  const [bodyPartFilter, setBodyPartFilter] = useState('all');
  const [symptomSearch, setSymptomSearch] = useState('');
  const [symptoms, setSymptoms] = useState([]);
  const [commonSymptoms, setCommonSymptoms] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [treatment, setTreatment] = useState(null);
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const bodyPartOptions = useMemo(
    () => [
      { key: 'all', label: 'All areas' },
      { key: 'general', label: 'General symptoms' },
      { key: 'skin', label: 'Skin' },
      { key: 'head', label: 'Head' },
      { key: 'neck', label: 'Neck' },
      { key: 'chest', label: 'Chest' },
      { key: 'arms', label: 'Arms' },
      { key: 'abdomen', label: 'Abdomen' },
      { key: 'pelvis', label: 'Pelvis' },
      { key: 'back', label: 'Back' },
      { key: 'buttocks', label: 'Buttocks' },
      { key: 'legs', label: 'Legs' },
    ],
    []
  );

  useEffect(() => {
    if (!sessionId) return;

    const timeout = setTimeout(async () => {
          try {
            setError('');
            const { symptoms: payload } = await fetchCheckerSymptoms({
              age,
              sex,
              category: bodyPartFilter !== 'all' ? bodyPartFilter : undefined,
              search: symptomSearch || undefined,
            });
            setSymptoms(payload || []);
          } catch (err) {
            setError(err?.response?.data?.message || 'Unable to load symptoms right now.');
      }
    }, 250);

    return () => {
      clearTimeout(timeout);
    };
  }, [age, sex, sessionId, bodyPartFilter, symptomSearch]);

  useEffect(() => {
    if (!sessionId) return;

    const loadCommon = async () => {
      try {
        const { symptoms: payload } = await fetchCommonCheckerSymptoms({
          age,
          sex,
          selected: selectedSymptoms.join(','),
        });
        setCommonSymptoms(payload || []);
      } catch {
        // soft fail
      }
    };

    loadCommon();
  }, [age, sex, sessionId, selectedSymptoms]);

  const toggleSymptom = symptomId => {
    setSelectedSymptoms(prev =>
      prev.includes(symptomId) ? prev.filter(id => id !== symptomId) : [...prev, symptomId]
    );
  };

  const handleStartSession = async () => {
    setLoading(true);
    setError('');
    try {
      const { sessionId: createdSessionId } = await startCheckerSession({ age: Number(age), sex });
      setSessionId(createdSessionId);
      setActiveStep(1);
    } catch (err) {
      setError(err?.response?.data?.message || 'Could not start a session. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSaveSymptomsAndMatch = async () => {
    if (!sessionId) return;
    setLoading(true);
    setError('');
    try {
      await saveSessionSymptoms(sessionId, selectedSymptoms);
      const { conditions: results } = await matchConditions(sessionId, {
        selectedSymptoms,
        age: Number(age),
        sex,
      });
      setConditions(results || []);
      setActiveStep(2);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to match conditions right now.');
    } finally {
      setLoading(false);
    }
  };

  const handleSelectCondition = async conditionItem => {
    setSelectedCondition(null);
    setTreatment(null);
    setLoading(true);
    setError('');
    try {
      const [{ condition: conditionDetails }, { treatment: treatmentData }] = await Promise.all([
        fetchConditionDetails(conditionItem.slug),
        fetchTreatmentDetails(conditionItem.condition || conditionItem._id || conditionItem.conditionId),
      ]);
      setSelectedCondition(conditionDetails);
      setTreatment(treatmentData || null);
      setActiveStep(3);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to load condition details.');
    } finally {
      setLoading(false);
    }
  };

  const handleMoveToTreatment = () => {
    if (selectedCondition) {
      setActiveStep(4);
    }
  };

  const handleGenerateReport = async () => {
    setLoading(true);
    setError('');
    try {
      const { report: snapshot } = await createReportSnapshot(sessionId);
      setReport(snapshot);
      setActiveStep(5);
    } catch (err) {
      setError(err?.response?.data?.message || 'Unable to generate the report.');
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="bg-[#f4fbe7] px-4 py-10 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-6xl">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.25em] text-[#0d7120]">Natural Immunotherapy</p>
          <h1 className="mt-1 text-3xl font-bold text-slate-900 sm:text-4xl">
            Symptom Checker (Non-diagnostic)
          </h1>
          <p className="mt-2 text-sm text-slate-600">
            Explore conditions that may match your symptoms. This tool does not provide medical diagnosis and is for
            educational guidance only.
          </p>
        </div>

        <StepIndicator activeStep={activeStep} />

        {error && <div className="mb-4 rounded-2xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</div>}

        {activeStep === 0 && (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm"
          >
            <Disclaimer message="This flow is not a medical diagnosis. Always consult a licensed clinician for urgent or serious concerns." />
            <div className="grid gap-6 sm:grid-cols-2">
              <div>
                <label className="text-sm font-semibold text-slate-800">Age</label>
                <input
                  type="number"
                  min="0"
                  max="120"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  className="mt-2 w-full rounded-xl border border-slate-200 px-4 py-3 text-slate-900 shadow-inner shadow-slate-100 focus:border-[#0d7120] focus:outline-none"
                  placeholder="e.g. 32"
                />
              </div>
              <div>
                <label className="text-sm font-semibold text-slate-800">Sex</label>
                <div className="mt-2 grid grid-cols-2 gap-3">
                  {['female', 'male'].map(option => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSex(option)}
                      className={[
                        'rounded-xl border px-4 py-3 text-sm font-semibold uppercase tracking-[0.14em] transition',
                        sex === option
                          ? 'border-[#0d7120] bg-[#e8f7ed] text-[#0d7120]'
                          : 'border-slate-200 bg-white text-slate-700',
                      ].join(' ')}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <p className="text-xs text-slate-600">
                Data is stored per-session for this flow only and expires automatically.
              </p>
              <button
                type="button"
                disabled={!age || loading}
                onClick={handleStartSession}
                className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d7120] to-[#5fcf6a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-[#0d7120]/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {loading ? 'Starting...' : 'Continue'}
              </button>
            </div>
          </motion.div>
        )}

        {activeStep === 1 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <Disclaimer message="Selections help surface conditions that may match your symptoms. This is not a substitute for professional care." />
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex flex-col gap-1">
                  <label className="text-sm font-semibold text-slate-800" htmlFor="bodyPartSelect">
                    Filter by body part / category
                  </label>
                  <select
                    id="bodyPartSelect"
                    value={bodyPartFilter}
                    onChange={e => setBodyPartFilter(e.target.value)}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3 text-sm text-slate-900 shadow-inner shadow-slate-100 focus:border-[#0d7120] focus:outline-none sm:w-72"
                  >
                    {bodyPartOptions.map(option => (
                      <option key={option.key} value={option.key}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-[1fr,280px]">
                <div>
                  <div className="relative">
                    <input
                      type="text"
                      value={symptomSearch}
                      onChange={e => setSymptomSearch(e.target.value)}
                      placeholder="Search symptoms (e.g., fatigue, rash)"
                      className="w-full rounded-2xl border border-slate-200 px-4 py-3 pl-10 text-sm text-slate-900 shadow-inner shadow-slate-100 focus:border-[#0d7120] focus:outline-none"
                    />
                    <span className="absolute left-3 top-3 text-slate-400">
                      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6">
                        <circle cx="9" cy="9" r="6" />
                        <path d="m13.5 13.5 3 3" />
                      </svg>
                    </span>
                  </div>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2">
                    {symptoms.map(symptom => (
                      <label
                        key={symptom._id}
                        className="flex cursor-pointer items-start gap-3 rounded-2xl border border-slate-200 p-3 transition hover:border-[#0d7120]/60"
                      >
                        <input
                          type="checkbox"
                          checked={selectedSymptoms.includes(symptom._id)}
                          onChange={() => toggleSymptom(symptom._id)}
                          className="mt-1 h-5 w-5 rounded border-slate-300 text-[#0d7120] focus:ring-[#0d7120]"
                        />
                        <div>
                          <p className="text-sm font-semibold text-slate-900">{symptom.name}</p>
                          <p className="text-xs text-slate-500 capitalize">{symptom.category}</p>
                          {symptom.redFlag && (
                            <span className="mt-1 inline-block rounded-full bg-rose-100 px-2 py-0.5 text-[11px] font-semibold text-rose-700">
                              Red flag
                            </span>
                          )}
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50/70 p-4">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Dynamic Common Symptoms</p>
                  <p className="text-sm text-slate-700">Based on what you selected, these are frequently paired.</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {commonSymptoms.map(symptom => (
                      <SymptomChip
                        key={symptom._id}
                        label={symptom.name}
                        selected={selectedSymptoms.includes(symptom._id)}
                        onToggle={() => toggleSymptom(symptom._id)}
                      />
                    ))}
                  </div>
                </div>
              </div>
              <div className="mt-6 flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep(0)}
                  className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
                >
                  Previous
                </button>
                <button
                  type="button"
                  disabled={!selectedSymptoms.length || loading}
                  onClick={handleSaveSymptomsAndMatch}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d7120] to-[#5fcf6a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-[#0d7120]/30 transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {loading ? 'Matching...' : 'Continue'}
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeStep === 2 && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Disclaimer message="Results list conditions that may match your symptoms. They are not a diagnosis or treatment plan." />
            <div className="grid gap-4 sm:grid-cols-2">
              {conditions.map(condition => (
                <ConditionCard key={condition.slug} condition={condition} onSelect={handleSelectCondition} />
              ))}
              {!conditions.length && (
                <div className="rounded-2xl border border-slate-200 bg-white p-4 text-slate-700">
                  No conditions surfaced for the current selection. Try adjusting symptoms.
                </div>
              )}
            </div>
            <div className="mt-6 flex flex-wrap justify-between gap-3">
              <button
                type="button"
                onClick={() => setActiveStep(1)}
                className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
              >
                Previous
              </button>
            </div>
          </motion.div>
        )}

        {activeStep === 3 && selectedCondition && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Disclaimer message="Natural Immunotherapy perspective is supportive and educational. Always work with qualified healthcare providers for diagnosis and urgent care." />
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Condition Overview</p>
                  <h3 className="text-2xl font-bold text-slate-900">{selectedCondition.name}</h3>
                  <p className="text-sm text-slate-600">{selectedCondition.description || 'No description available.'}</p>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                  {selectedCondition.prevalence || 'Prevalence info pending'}
                </span>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ReportRow title="Common Symptoms">
                  <ul className="list-disc space-y-1 pl-4 text-sm">
                    {selectedCondition.commonSymptoms?.length
                      ? selectedCondition.commonSymptoms.map(item => <li key={item}>{item}</li>)
                      : (selectedCondition.symptoms || []).map(item => <li key={item.symptomId?._id}>{item.symptomId?.name}</li>)}
                  </ul>
                </ReportRow>
                <ReportRow title="Risk Factors">
                  <ul className="list-disc space-y-1 pl-4 text-sm">
                    {selectedCondition.riskFactors?.length
                      ? selectedCondition.riskFactors.map(item => <li key={item}>{item}</li>)
                      : [<li key="placeholder">Risk factors will appear here when provided.</li>]}
                  </ul>
                </ReportRow>
                <ReportRow title="When to Seek Help">
                  <p className="text-sm">
                    {selectedCondition.whenToSeekHelp ||
                      'Seek immediate medical attention for severe, sudden, or worsening symptoms.'}
                  </p>
                </ReportRow>
                <ReportRow title="NIT Perspective (Non-diagnostic)">
                  <p className="text-sm">
                    {selectedCondition.nitPerspective ||
                      'We focus on supportive nutrition, detox pathways, and immune balance to complement clinical care.'}
                  </p>
                </ReportRow>
              </div>
              <div className="mt-6 flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep(2)}
                  className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
                >
                  Back to matches
                </button>
                <button
                  type="button"
                  onClick={handleMoveToTreatment}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d7120] to-[#5fcf6a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-[#0d7120]/30 transition hover:-translate-y-0.5"
                >
                  Continue to treatment
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeStep === 4 && treatment && selectedCondition && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Disclaimer message="Treatment content is for education and Natural Immunotherapy perspective. It is not a diagnosis, prescription, or substitute for professional care." />
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-col gap-2">
                <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Condition</p>
                <h3 className="text-2xl font-bold text-slate-900">{selectedCondition.name}</h3>
              </div>
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <ReportRow title="Treatment Overview">
                  <p className="text-sm text-slate-700">{treatment.overview || 'Overview to be provided.'}</p>
                </ReportRow>
                <ReportRow title="Lifestyle Guidance">
                  <ul className="list-disc space-y-1 pl-4 text-sm">
                    {(treatment.lifestyle || []).map(item => (
                      <li key={item}>{item}</li>
                    ))}
                    {!treatment.lifestyle?.length && <li>Focus on restorative sleep, hydration, and movement.</li>}
                  </ul>
                </ReportRow>
                <ReportRow title="Diet Suggestions">
                  <ul className="list-disc space-y-1 pl-4 text-sm">
                    {(treatment.diet || []).map(item => (
                      <li key={item}>{item}</li>
                    ))}
                    {!treatment.diet?.length && <li>Prioritize anti-inflammatory, nutrient-dense whole foods.</li>}
                  </ul>
                </ReportRow>
                <ReportRow title="NIT-based Approach">
                  <ul className="list-disc space-y-1 pl-4 text-sm">
                    {(treatment.nitApproach?.rootCauses || []).map(item => (
                      <li key={item}>{item}</li>
                    ))}
                    {!treatment.nitApproach?.rootCauses?.length && <li>Address terrain: digestion, detox, and immune tone.</li>}
                  </ul>
                  <p className="mt-3 text-sm font-semibold text-slate-700">Focus Areas</p>
                  <ul className="list-disc space-y-1 pl-4 text-sm">
                    {(treatment.nitApproach?.focusAreas || []).map(item => (
                      <li key={item}>{item}</li>
                    ))}
                    {!treatment.nitApproach?.focusAreas?.length && <li>Gentle detox, micronutrient replenishment, stress balance.</li>}
                  </ul>
                </ReportRow>
                <ReportRow title="Precautions & When to Seek Help">
                  <ul className="list-disc space-y-1 pl-4 text-sm">
                    {(treatment.precautions || []).map(item => (
                      <li key={item}>{item}</li>
                    ))}
                    {!treatment.precautions?.length && <li>Consult your clinician before changing medications or protocols.</li>}
                  </ul>
                  <p className="mt-2 text-sm text-rose-700">
                    {treatment.whenToSeekHelp ||
                      'Seek urgent care for severe pain, breathing issues, rapid deterioration, or new neurological symptoms.'}
                  </p>
                </ReportRow>
              </div>
              <div className="mt-6 flex flex-wrap justify-between gap-3">
                <button
                  type="button"
                  onClick={() => setActiveStep(3)}
                  className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-700 hover:border-slate-300"
                >
                  Previous
                </button>
                <button
                  type="button"
                  onClick={handleGenerateReport}
                  className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#0d7120] to-[#5fcf6a] px-6 py-3 text-sm font-semibold uppercase tracking-[0.22em] text-white shadow-lg shadow-[#0d7120]/30 transition hover:-translate-y-0.5"
                >
                  Generate report
                </button>
              </div>
            </div>
          </motion.div>
        )}

        {activeStep === 5 && report && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}>
            <Disclaimer message="This report lists conditions that may match your symptoms. It is informational and not a clinical diagnosis." />
            <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500">Session</p>
                  <p className="text-sm font-semibold text-slate-800">ID: {report.sessionId}</p>
                  <p className="text-sm text-slate-600">
                    Age {report.user?.age}, {report.user?.sex}
                  </p>
                </div>
                <button
                  type="button"
                  onClick={handlePrint}
                  className="inline-flex items-center gap-2 rounded-full border border-[#0d7120] px-5 py-2 text-sm font-semibold text-[#0d7120] transition hover:bg-[#e8f7ed]"
                >
                  Print / Save as PDF
                </button>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <ReportRow title="Selected Symptoms">
                  <ul className="list-disc space-y-1 pl-4 text-sm">
                    {(report.symptoms || []).map(sym => (
                      <li key={sym.symptomId}>{sym.name}</li>
                    ))}
                  </ul>
                </ReportRow>
                <ReportRow title="Conditions that may match">
                  <ul className="space-y-2 text-sm">
                    {(report.conditions || []).map(cond => (
                      <li key={cond.conditionId} className="flex items-center justify-between rounded-xl bg-slate-50 px-3 py-2">
                        <span>{cond.name}</span>
                        <span className="text-xs font-semibold text-[#0d7120]">
                          {cond.score}% · {cond.matchLevel}
                        </span>
                      </li>
                    ))}
                  </ul>
                </ReportRow>
                <ReportRow title="Treatment Overview">
                  <div className="space-y-3">
                    {(report.treatments || []).map(item => (
                      <div key={item.conditionId} className="rounded-xl bg-slate-50 px-3 py-2">
                        <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                        <p className="text-sm text-slate-700">{item.overview || 'Overview pending.'}</p>
                      </div>
                    ))}
                    {!report.treatments?.length && <p className="text-sm text-slate-600">No treatment snapshot yet.</p>}
                  </div>
                </ReportRow>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default SymptomChecker;
