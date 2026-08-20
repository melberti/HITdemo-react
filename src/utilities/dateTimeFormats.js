export function formatWithDay(date) {

  const dateToFormat = new Date(date);

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

export function formatTime(time) {

  const toFormat = new Date(`1970-01-01T${time}`);
  return toFormat.toLocaleTimeString();
}
