function EventOverlay({ isPostponed, isCancelled }) {
  if (!isPostponed && !isCancelled) return null;

  const bannerColor = isCancelled ? "bg-red-600" : "bg-yellow-400";
  const textColor = isCancelled ? "text-white" : "neutral-800";
  const bannerText = isCancelled ? "Cancelled" : "Postponed";

  const className = `pointer-events-none absolute top-15 left-[75%] z-10 w-[220%] -translate-x-1/2 rotate-45 text-center text-[2rem] font-bold tracking-wide whitespace-nowrap shadow-md ${bannerColor} ${textColor}`;

  return <div className={className}>{bannerText.toUpperCase()}</div>;
}

export default EventOverlay;
