export const FormatDate = (date) => {
  const newDate = new Date(date);
  return newDate.toLocaleDateString('en-US');
};
