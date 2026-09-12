function EventOverlay({ isPostponed, isCancelled }) {
  if (!isPostponed && !isCancelled) return null;

  const bannerColor = isCancelled ? "bg-red-700" : "bg-yellow-600";
  const textColor = isCancelled ? "text-white" : "text-neutral-200";
  const bannerText = isCancelled ? "Cancelled" : "Postponed";

  const className = `absolute top-[15%] left-[75%] z-10 w-[200%] -translate-x-1/2 rotate-45 text-center pl-0.5 text-[2rem] font-bold whitespace-nowrap shadow-md ${bannerColor} ${textColor}`;

  return <div className={className}>{bannerText.toUpperCase()}</div>;
}

export default EventOverlay;
