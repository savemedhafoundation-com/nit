const RecommendationPanel = ({ title, items }) => (
  <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-sm">
    <p className="text-sm font-semibold text-slate-800">{title}</p>
    <ul className="mt-2 space-y-2 text-sm text-slate-700">
      {(items || []).map((item, idx) => (
        <li key={idx} className="flex gap-2">
          <span className="mt-1 h-2 w-2 rounded-full bg-sky-500" />
          <span className="leading-relaxed">{item}</span>
        </li>
      ))}
    </ul>
  </div>
);

export default RecommendationPanel;
