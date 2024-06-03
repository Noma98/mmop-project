export const getYears = (startDate: string, endDate: string) => {
  const result = [] as number[];

  const startYear = new Date(startDate).getFullYear();
  const endYear = new Date(endDate).getFullYear();

  for (let year = startYear; year <= endYear; year++) {
    result.push(year);
  }
  return result;
};
export const getLatestYearArray = () => {
  const result = [];
  const thisYear = new Date().getFullYear();
  for (let year = thisYear; year > thisYear - 4; year--) {
    result.push(year);
  }
  return result;
};
