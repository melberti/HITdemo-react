export function formatWithDay(dateToFormat) {
  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    dateToFormat,
  );
  //console.log(formatted); // Outputs: "Tuesday, February 3, 2026" 
  return formatted;
}
