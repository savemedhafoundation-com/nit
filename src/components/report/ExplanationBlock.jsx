const ExplanationBlock = ({ title, text }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-sm font-semibold text-slate-700">{title}</p>
    <p className="mt-2 text-sm leading-relaxed text-slate-700">{text}</p>
  </div>
);

export default ExplanationBlock;
