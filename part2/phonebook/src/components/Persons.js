import React from "react";
import personsService from "../services/persons";

const DeleteButton = (id) => {
  const handelDelete = () => {
    console.log("id", id);
    personsService.remove(id).then((response) => {
      console.log("response", response.data);
    });
  };
  return (
    <>
      <button onClick={handelDelete} id={id}>
        delete
      </button>
    </>
  );
};
const Persons = ({ persons, showFilter }) => {
  //console.log("persons", persons);
  console.log("showFilter", showFilter);
  return (
    <ul>
      {persons.map((persons, i) => (
        <div key={i}>
          {showFilter.includes(persons.id) ? (
            <li key={i}>
              {persons.name} {persons.number} <DeleteButton id={persons.id} />
            </li>
          ) : null}
        </div>
      ))}
    </ul>
  );
};

export default Persons;
