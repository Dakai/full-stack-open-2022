import React from "react";

const Filter = ({ persons, setShowFilter }) => {
  //console.log("showFilter", showFilter);
  const handleFilterChange = (event) => {
    filterName(event.target.value);
    //console.log("event.target.value", event.target.value);
  };

  const filterName = (value) => {
    const arrayData = [];
    persons.map((person) => {
      if (person.name.toLowerCase().includes(value.toLowerCase())) {
        arrayData.push(person.id);
      }
      //console.log("value", value);
      //console.log(arrayData);
      return setShowFilter(arrayData);
    });
  };

  return (
    <>
      filter shown with:
      <input onChange={handleFilterChange} />
    </>
  );
};
export default Filter;
