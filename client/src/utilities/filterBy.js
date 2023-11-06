export const filterBy = (string, filter ) => {
  return string.toLocaleLowerCase().includes(filter.toLocaleLowerCase());
}