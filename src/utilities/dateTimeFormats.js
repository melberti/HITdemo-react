function parseDateValue(value) {
  if (typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value)) {
    const [year, month, day] = value.split("-").map(Number);
    return new Date(year, month - 1, day);
  }

  return new Date(value);
}

export function formatWithLongDay(date) {

  const dateToFormat = parseDateValue(date);

  const options = {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    dateToFormat,
  );

  // Outputs: "Tuesday, February 3, 2026" 
  return formatted;
}


export function formatShortDate(date) {

  const dateToFormat = parseDateValue(date);

  const options = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric'
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    dateToFormat,
  );

  // Outputs: "Tuesday, February 3, 2026" 
  return formatted;
}

export function formatWithDayShortMonth(date) {

  const dateToFormat = parseDateValue(date);

  const options = {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    dateToFormat,
  );
  // Outputs: "Tue, Feb 3, 2026" 
  return formatted;
}

export function formatTime(time) {

  const timeToFormat = new Date(`1970-01-01T${time}`);

  const options = {
    hour: 'numeric',
    minute: '2-digit'
  };

  const formatted = new Intl.DateTimeFormat("en-US", options).format(
    timeToFormat,
  );
  // Outputs: "7:30 PM" 
  return formatted;
}

export function getTodayAsISO() {
  const today = new Date();

  return [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, "0"),
    String(today.getDate()).padStart(2, "0"),
  ].join("-");
}