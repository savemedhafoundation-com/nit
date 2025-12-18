const statusColor = status => {
  switch (status) {
    case 'low':
      return 'bg-amber-50 text-amber-800 border-amber-200';
    case 'high':
      return 'bg-rose-50 text-rose-800 border-rose-200';
    case 'normal':
      return 'bg-emerald-50 text-emerald-800 border-emerald-200';
    default:
      return 'bg-slate-50 text-slate-800 border-slate-200';
  }
};

const ParameterCard = ({ name, value, unit, status, referenceRange, panel }) => (
  <div className="flex flex-col gap-2 rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <div className="flex items-center justify-between gap-3">
      <div>
        <p className="text-sm uppercase tracking-wide text-slate-500">{panel || 'Panel'}</p>
        <p className="text-lg font-semibold text-slate-900">{name}</p>
      </div>
      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(status)}`}>
        {status ? status.toUpperCase() : 'UNKNOWN'}
      </span>
    </div>
    <div className="flex items-baseline gap-2 text-slate-800">
      <span className="text-2xl font-bold">{value ?? '—'}</span>
      {unit && <span className="text-sm text-slate-500">{unit}</span>}
    </div>
    {referenceRange && (
      <p className="text-sm text-slate-500">
        Reference: <span className="font-medium text-slate-700">{referenceRange}</span>
      </p>
    )}
  </div>
);

export default ParameterCard;
