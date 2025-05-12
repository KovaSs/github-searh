export const toShortFormatDate = (date: string) => {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
  return formattedDate;
}