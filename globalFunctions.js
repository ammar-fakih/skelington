export const FormatDate = (date, useYear = true) => {
  const newDate = new Date(date);
  const month = newDate.getMonth() + 1;
  const day = newDate.getDate();
  const year = newDate.getFullYear();
  return `${month}/${day}${useYear ? `, ${year}` : ''}`;
};

export const formatAMPM = (date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  var ampm = hours >= 12 ? 'pm' : 'am';
  hours = hours % 12;
  hours = hours ? hours : 12; // the hour '0' should be '12'
  minutes = minutes < 10 ? '0' + minutes : minutes;
  var strTime = hours + ':' + minutes + ' ' + ampm;
  return strTime;
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
