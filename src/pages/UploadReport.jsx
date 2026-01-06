import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '@/components/report/FileUploader';
import ExplanationBlock from '@/components/report/ExplanationBlock';
import DisclaimerFooter from '@/components/report/DisclaimerFooter';
import { explainMedicalReport, uploadMedicalReport } from '@/services/api';
import BoostersParticles from '../components/BoostersParticles';

const UploadReport = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const handleExplain = async () => {
    setError('');
    setNote('');
    if (!selectedFile && !rawText.trim()) {
      setError('Please select a PDF, JPG, or PNG report first.');
      return;
    }

    setExplaining(true);
    let latestText = rawText;
    let latestMetadata = metadata;

    try {
      if (!latestText.trim()) {
        setUploading(true);
        const data = await uploadMedicalReport(selectedFile);
        latestText = data.rawText || '';
        latestMetadata = data.metadata || null;
        setRawText(latestText);
        setMetadata(latestMetadata);
        setNote('Text extracted automatically from your file.');
        setUploading(false);
      }

      if (!latestText.trim()) {
        throw new Error('Unable to extract text from the report. Please try another file.');
      }

      const payload = { rawText: latestText };

      const data = await explainMedicalReport(payload);
      navigate('/report-result', {
        state: {
          rawText: latestText,
          metadata: latestMetadata,
          ...data,
        },
      });
    } catch (err) {
      const detail =
        err?.response?.data?.message ||
        err?.response?.data?.error ||
        err?.message ||
        'Unable to generate explanation right now.';
      setError(detail);
    } finally {
      setUploading(false);
      setExplaining(false);
    }
  };

  return (
    <section className="bg-slate-900 text-slate-50">
      <BoostersParticles name={"YOUR REPORT EXPLAINER"} />
    <div className="bg-gradient-to-b from-slate-50 to-white">
      <div className="mx-auto max-w-6xl px-4 pb-16 pt-10">
        <div className="mb-8 flex flex-col gap-3">
          <p className="text-sm font-semibold tracking-wide text-sky-700">Medical Report Explainer</p>
          <h1 className="text-3xl font-bold text-slate-900">Upload your report to get a calm, safe summary</h1>
          <p className="max-w-3xl text-base text-slate-700">
            Files stay in memory only. We extract the text, flag low/high values, and share nutrition-first,
            Natural Immunotherapy aligned tips. No diagnoses or prescriptions.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3 space-y-6">
            <FileUploader
              onFileSelect={setSelectedFile}
              loading={uploading}
              error={error}
              helperText="We ignore headers/footers and focus on lab values."
            />

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <p className="text-sm text-slate-700">
                We will automatically extract text and detect patient name, age, and sex from the report before
                generating the explanation.
              </p>
              <div className="flex flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={handleExplain}
                  disabled={explaining || uploading}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none disabled:opacity-60"
                >
                  {uploading ? 'Extracting text...' : explaining ? 'Generating...' : 'Generate explanation'}
                </button>
              </div>
            </div>

            {note && <p className="text-sm font-semibold text-emerald-700">{note}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            {/* <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Normalized text preview</p>
                {metadata?.filename && (
                  <span className="text-xs text-slate-500">
                    {metadata.filename} • {Math.round((metadata.size || 0) / 1024)} KB
                  </span>
                )}
              </div>
              <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                {rawText || 'Text preview will appear here after we extract it from your report.'}
              </pre>
            </div> */}
          </div>

          <div className="lg:col-span-2 space-y-4">
            <ExplanationBlock
              title="How we keep it safe"
              text="We explain results in human language, flag normal vs abnormal ranges, and give education-only guidance rooted in Natural Immunotherapy (nutrition, hydration with জল, detox, rest). We never diagnose or prescribe."
            />
            <ExplanationBlock
              title="What you get"
              text="Structured JSON with parameters, status, supportive guidance, root-cause direction, next steps, and a mandatory disclaimer for legal safety."
            />
            <DisclaimerFooter />
          </div>
        </div>
      </div>
    </div>
    </section>
  );
};

export default UploadReport;
