const DisclaimerFooter = ({ text }) => (
  <div className="rounded-xl border border-slate-200 bg-slate-50 p-4 text-sm leading-relaxed text-slate-700">
    {text ||
      'This explanation is for educational purposes only and does not replace medical diagnosis or treatment.'}
  </div>
);

export default DisclaimerFooter;
