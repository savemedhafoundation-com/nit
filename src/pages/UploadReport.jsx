import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FileUploader from '@/components/report/FileUploader';
import ExplanationBlock from '@/components/report/ExplanationBlock';
import DisclaimerFooter from '@/components/report/DisclaimerFooter';
import { explainMedicalReport, uploadMedicalReport } from '@/services/api';

const UploadReport = () => {
  const navigate = useNavigate();
  const [selectedFile, setSelectedFile] = useState(null);
  const [rawText, setRawText] = useState('');
  const [metadata, setMetadata] = useState(null);
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [uploading, setUploading] = useState(false);
  const [explaining, setExplaining] = useState(false);
  const [error, setError] = useState('');
  const [note, setNote] = useState('');

  const handleUpload = async () => {
    setError('');
    setNote('');
    if (!selectedFile) {
      setError('Please select a PDF, JPG, or PNG report first.');
      return;
    }

    setUploading(true);
    try {
      const data = await uploadMedicalReport(selectedFile);
      setRawText(data.rawText || '');
      setMetadata(data.metadata || null);
      setNote('Text extracted. Review below, then generate explanation.');
    } catch (err) {
      const detail = err?.response?.data?.message || err?.message || 'Unable to extract text.';
      setError(detail);
    } finally {
      setUploading(false);
    }
  };

  const handleExplain = async () => {
    setError('');
    setNote('');
    if (!rawText.trim()) {
      setError('Upload a report and ensure text is available before generating.');
      return;
    }

    setExplaining(true);
    try {
      const payload = {
        rawText,
        age: age ? Number(age) : null,
        gender: gender || null,
      };

      const data = await explainMedicalReport(payload);
      navigate('/report-result', {
        state: {
          rawText,
          metadata,
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
      setExplaining(false);
    }
  };

  return (
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

            <div className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm lg:grid-cols-3">
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Age (optional)</span>
                <input
                  type="number"
                  min="0"
                  value={age}
                  onChange={e => setAge(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm shadow-inner focus:border-sky-400 focus:outline-none"
                  placeholder="e.g., 35"
                />
              </label>
              <label className="flex flex-col gap-2">
                <span className="text-sm font-semibold text-slate-700">Sex</span>
                <select
                  value={gender}
                  onChange={e => setGender(e.target.value)}
                  className="w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm shadow-inner focus:border-sky-400 focus:outline-none"
                >
                  <option value="">Select</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other / prefer not to say</option>
                </select>
              </label>
              <div className="flex items-end gap-3">
                <button
                  type="button"
                  onClick={handleUpload}
                  disabled={uploading}
                  className="flex-1 rounded-lg bg-sky-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-sky-700 focus:outline-none disabled:opacity-60"
                >
                  {uploading ? 'Extracting...' : 'Extract text'}
                </button>
                <button
                  type="button"
                  onClick={handleExplain}
                  disabled={explaining}
                  className="flex-1 rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow hover:bg-emerald-700 focus:outline-none disabled:opacity-60"
                >
                  {explaining ? 'Generating...' : 'Generate explanation'}
                </button>
              </div>
            </div>

            {note && <p className="text-sm font-semibold text-emerald-700">{note}</p>}
            {error && <p className="text-sm text-red-600">{error}</p>}

            <div className="space-y-3 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-slate-800">Normalized text preview</p>
                {metadata?.filename && (
                  <span className="text-xs text-slate-500">
                    {metadata.filename} • {Math.round((metadata.size || 0) / 1024)} KB
                  </span>
                )}
              </div>
              <pre className="max-h-64 overflow-y-auto whitespace-pre-wrap rounded-lg bg-slate-50 p-3 text-sm text-slate-700">
                {rawText || 'Text preview will appear here after upload.'}
              </pre>
            </div>
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
  );
};

export default UploadReport;
