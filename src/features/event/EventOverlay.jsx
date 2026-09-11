function EventOverlay({ isPostponed, isCancelled }) {
  if (!isPostponed && !isCancelled) return null;

  const bannerColor = isCancelled ? "bg-red-700" : "bg-yellow-600";
  const textColor = isCancelled ? "text-white" : "neutral-800";
  const bannerText = isCancelled ? "Cancelled" : "Postponed";

  const className = `pointer-events-none absolute top-13 left-[70%] z-10 w-[220%] -translate-x-1/2 rotate-45 text-center text-[2rem] font-bold  whitespace-nowrap shadow-md ${bannerColor} ${textColor}`;

  return <div className={className}>{bannerText.toUpperCase()}</div>;
}

export default EventOverlay;
