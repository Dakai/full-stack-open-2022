import React from "react";
import personsService from "../services/persons";
import filterArrayService from "../services/filterArray";

const DeleteButton = ({
  id,
  setPersons,
  setShowFilter,
  name,
  setErrorMessage,
}) => {
  const handelDelete = () => {
    if (window.confirm(`Delete ${name}?`)) {
      personsService
        .remove(id)
        .then(() => {
          //console.log("response", response.data);
          personsService.getAll().then((response) => {
            setPersons(response.data);
            setShowFilter(filterArrayService.filterArray(response.data));
          });
        })
        .catch((error) => {
          setErrorMessage(`'${name}' was already removed from the server`);
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
    //console.log("id", id);
  };
  return (
    <>
      <button onClick={handelDelete} id={id}>
        delete
      </button>
    </>
  );
};

const Persons = ({
  persons,
  showFilter,
  setPersons,
  setShowFilter,
  setErrorMessage,
}) => {
  //console.log("persons", persons);
  //console.log("showFilter", showFilter);
  return (
    <ul>
      {persons.map((persons, i) => (
        <div key={i}>
          {showFilter.includes(persons.id) ? (
            <li key={i}>
              {persons.name} {persons.number}{" "}
              <DeleteButton
                name={persons.name}
                id={persons.id}
                setShowFilter={setShowFilter}
                setPersons={setPersons}
                setErrorMessage={setErrorMessage}
              />
            </li>
          ) : null}
        </div>
      ))}
    </ul>
  );
};

export default Persons;
