import React from "react";

const Persons = ({ persons, showFilter }) => {
  //console.log("persons", persons);
  console.log("showFilter", showFilter);
  return (
    <ul>
      {persons.map((persons, i) => (
        <div key={i}>
          {showFilter.includes(persons.id) ? (
            <li key={i}>
              {persons.name} {persons.number}
            </li>
          ) : null}
        </div>
      ))}
    </ul>
  );
};

export default Persons;
