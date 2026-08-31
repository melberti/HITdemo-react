export function formatWithLongDay(date) {

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


export function formatShortDate(date) {

  const dateToFormat = new Date(date);

  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    dateToFormat,
  );
  //console.log(formatted); // Outputs: "Tuesday, February 3, 2026" 
  return formatted;
}

export function formatWithDayShortMonth(date) {

  const dateToFormat = new Date(date);

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    dateToFormat,
  );
  //console.log(formatted); // Outputs: "Tuesday, Feb 3, 2026" 
  return formatted;
}

export function formatTime(time) {

  const toFormat = new Date(`1970-01-01T${time}`);
  return toFormat.toLocaleTimeString();
}
