export const dummyFormattedDates = (helpers) => {
  const today = new Date();

  // Subtract 7 days from today's date
  const sevenDaysAgo = new Date(today);
  sevenDaysAgo.setDate(today.getDate() - 7);

  // Format the date to "MM/DD/YYYY"
  const formattedDatetype1 = `${(sevenDaysAgo.getMonth() + 1).toString().padStart(2, '0')}/${sevenDaysAgo.getDate().toString().padStart(2, '0')}/${sevenDaysAgo.getFullYear()}`;

  // Format the date to format "Tuesday, July 15, 2024"
  const formattedDateType2 = `${helpers.DAYS[sevenDaysAgo.getDay()]}, ${helpers.MONTHS[sevenDaysAgo.getMonth()]} ${sevenDaysAgo.getDate()}, ${sevenDaysAgo.getFullYear()}`;

  // Format the date to "July 2024"
  const formattedDateType3 = `${helpers.MONTHS[sevenDaysAgo.getMonth()]} ${sevenDaysAgo.getFullYear()}`;

  return {
    formattedDatetype1,
    formattedDateType2,
    formattedDateType3,
  };
};
