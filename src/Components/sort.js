export const SortData = (data) => {
  const sd = [...data];

  sd.sort((first, second) => {
    if (first.cases > second.cases) {
      return -1;
    } else {
      return 1;
    }
  });
  return sd;
};
