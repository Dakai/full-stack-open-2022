import React from "react";
import { useState } from "react";

const PersonForm = ({
  persons,
  setPersons,
  idMax,
  showFilter,
  setShowFilter,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const ifIncluded = (newName) => {
    const arrayData = [];
    persons.map((person) => {
      arrayData.push(person.name);
      return null;
    });
    if (arrayData.includes(newName)) {
      return true;
    }
  };
  const addName = (event) => {
    if (!!newName) {
      //prevent adding a empty entry
      event.preventDefault();
      //console.log("button clicked", event.target);
      const nameObject = {
        name: newName,
        number: newNumber,
        id: idMax + 1,
      };

      if (ifIncluded(newName)) {
        alert(newName + "is already added to Phonebook");
      } else {
        console.log("nameObject", nameObject);
        setPersons(persons.concat(nameObject));
        setShowFilter(showFilter.concat(idMax + 1));
        setNewName("");
        setNewNumber("");
        console.log("persons", persons);
      }
    }
  };

  return (
    <form onSubmit={addName}>
      <div>
        name:
        <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number:
        <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
};
export default PersonForm;
