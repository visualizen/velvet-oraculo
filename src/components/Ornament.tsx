const Ornament = ({ className = "" }: { className?: string }) => (
  <div className={`flex items-center justify-center gap-3 text-primary ${className}`}>
    <span className="text-xs">❧</span>
    <span className="text-lg">✦</span>
    <span className="text-xs">❧</span>
  </div>
);

export default Ornament;
