import { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ParameterCard from '@/components/report/ParameterCard';
import RecommendationPanel from '@/components/report/RecommendationPanel';
import DisclaimerFooter from '@/components/report/DisclaimerFooter';
import ExplanationBlock from '@/components/report/ExplanationBlock';

const ReportResult = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const structured = state?.structuredReport;
  const explanation = state?.explanation;

  useEffect(() => {
    if (!state) {
      navigate('/upload-report');
    }
  }, [state, navigate]);

  if (!structured || !explanation) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-16 text-center">
        <p className="text-lg font-semibold text-slate-800">No report data found.</p>
        <button
          type="button"
          onClick={() => navigate('/upload-report')}
          className="mt-4 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white hover:bg-sky-700"
        >
          Upload a report
        </button>
      </div>
    );
  }

  const abnormal = (structured.parameters || []).filter(p => p.status === 'low' || p.status === 'high');

  return (
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm font-semibold tracking-wide text-sky-700">Report Result</p>
          <h1 className="text-3xl font-bold text-slate-900">Personalized explanation</h1>
          <p className="text-base text-slate-700">
            Educational summary only. No diagnosis, no prescriptions. Hydration reminders use the word জল where
            relevant.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-4">
            <ExplanationBlock title="Summary" text={explanation.summary} />

            <div className="grid gap-4 md:grid-cols-2">
              {(structured.parameters || []).map(param => (
                <ParameterCard
                  key={param.name}
                  name={param.name}
                  value={param.value}
                  unit={param.unit}
                  status={param.status}
                  referenceRange={param.referenceRange}
                  panel={param.panel}
                />
              ))}
            </div>

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">Parameter notes</p>
              <div className="space-y-3">
                {(explanation.parameterExplanation || []).map(item => (
                  <div key={item.name} className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-semibold text-slate-900">{item.name}</p>
                      <span className="text-xs font-semibold uppercase text-slate-500">{item.status}</span>
                    </div>
                    <p className="mt-2 text-sm text-slate-700">{item.explanation}</p>
                    {item.guidance && <p className="mt-1 text-sm font-medium text-emerald-700">{item.guidance}</p>}
                  </div>
                ))}
                {!explanation.parameterExplanation?.length && (
                  <p className="text-sm text-slate-600">
                    No parameter-level notes were generated. Please re-upload if you expected results.
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <RecommendationPanel title="Root-cause direction" items={explanation.rootCauseDirection} />
            <RecommendationPanel title="Natural support guidance" items={explanation.naturalSupportGuidance} />
            <RecommendationPanel title="Next steps" items={explanation.nextSteps} />

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm font-semibold text-slate-800">At a glance</p>
              <ul className="mt-2 space-y-2 text-sm text-slate-700">
                <li>Detected parameters: {structured.parameters?.length || 0}</li>
                <li>Abnormal values: {abnormal.length}</li>
                {structured.patient?.gender && <li>Sex: {structured.patient.gender}</li>}
                {structured.patient?.age != null && <li>Age: {structured.patient.age}</li>}
                {state?.metadata?.filename && <li>Source: {state.metadata.filename}</li>}
              </ul>
            </div>

            <DisclaimerFooter text={explanation.disclaimer} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReportResult;
