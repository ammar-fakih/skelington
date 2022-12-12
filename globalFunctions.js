export const FormatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US');
};

// Format SQL time to remove seconds, leading zeros, and AM/PM
export const FormatTimeRange = (start, end) => {
  const startArray = start.split(':');
  const endArray = end.split(':');
  const startHour = startArray[0];
  const startMinute = startArray[1];
  const endHour = endArray[0];
  const endMinute = endArray[1];

  // remove leading zeros
  const startHourNoZero = startHour.replace(/^0+/, '');
  const endHourNoZero = endHour.replace(/^0+/, '');

  // change 24-hour time to 12-hour time and add AM/PM
  const start12 =
    startHourNoZero > 12
      ? `${startHourNoZero - 12}:${startMinute}pm`
      : `${startHourNoZero}:${startMinute}am`;
  const end12 =
    endHourNoZero > 12
      ? `${endHourNoZero - 12}:${endMinute}pm`
      : `${endHourNoZero}:${endMinute}am`;

  return `${start12} - ${end12}`;
};
