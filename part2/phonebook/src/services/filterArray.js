const filterArray = (persons) => {
  //console.log(persons);
  const ids = persons.map((persons) => persons.id);
  return ids;
};

export default {
  filterArray,
};
