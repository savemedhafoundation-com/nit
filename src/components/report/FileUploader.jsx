import { useCallback, useRef, useState } from 'react';

const ACCEPTED_TYPES = '.pdf,.jpg,.jpeg,.png';

const FileUploader = ({ onFileSelect, loading, error, helperText }) => {
  const inputRef = useRef(null);
  const [fileName, setFileName] = useState('');

  const handleFiles = useCallback(
    files => {
      const [file] = files || [];
      if (!file) return;
      setFileName(file.name);
      onFileSelect?.(file);
    },
    [onFileSelect]
  );

  const onDrop = useCallback(
    event => {
      event.preventDefault();
      if (event.dataTransfer?.files?.length) {
        handleFiles(event.dataTransfer.files);
      }
    },
    [handleFiles]
  );

  return (
    <div className="space-y-3">
      <div
        className={`relative flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed px-6 py-8 transition ${
          loading
            ? 'border-sky-200 bg-sky-50 text-sky-600'
            : 'border-slate-200 bg-white hover:border-sky-300 hover:bg-sky-50'
        }`}
        onClick={() => inputRef.current?.click()}
        onDragOver={e => e.preventDefault()}
        onDrop={onDrop}
      >
        <input
          ref={inputRef}
          type="file"
          accept={ACCEPTED_TYPES}
          className="hidden"
          onChange={e => handleFiles(e.target.files)}
          disabled={loading}
        />
        <div className="text-center">
          <p className="text-lg font-semibold text-slate-900">Upload lab PDF or image</p>
          <p className="mt-1 text-sm text-slate-600">
            Files stay in memory only. Supported: PDF, JPG, PNG. Max 8 MB.
          </p>
          {fileName && <p className="mt-2 text-sm font-medium text-sky-700">Selected: {fileName}</p>}
          {helperText && <p className="mt-2 text-xs text-slate-500">{helperText}</p>}
        </div>
      </div>
      {error && <p className="text-sm text-red-600">{error}</p>}
    </div>
  );
};

export default FileUploader;
