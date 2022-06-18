import React from "react";
import { useState } from "react";
import personsService from "../services/persons";
import filterArrayService from "../services/filterArray";

const PersonForm = ({ persons, setPersons, showFilter, setShowFilter }) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const ifIncluded = () => {
    const person = persons.find((person) => person.name === newName);
    return person;
  };
  /*
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
	*/
  const addName = (event) => {
    console.log(ifIncluded());
    if (!!newName) {
      //prevent adding a empty entry
      event.preventDefault();
      //console.log("button clicked", event.target);
      const nameObject = {
        name: newName,
        number: newNumber,
      };
      if (ifIncluded()) {
        if (
          window.confirm(
            `${newName} is already added to the Phonebook, repace the old number with the new one?`
          )
        ) {
          const id = ifIncluded().id;
          personsService.update(id, nameObject).then((response) => {
            personsService.getAll().then((response) => {
              setPersons(response.data);
              setShowFilter(filterArrayService.filterArray(response.data));
            });

            //setPersons(persons.concat(response.data));
            //setShowFilter(showFilter.concat(response.data.id));
          });
        }
        //alert(newName + "is already added to Phonebook");
      } else {
        //console.log("nameObject", nameObject);
        //setPersons(persons.concat(nameObject));
        //setShowFilter(showFilter.concat(idMax + 1));
        setNewName("");
        setNewNumber("");
        //console.log("persons", persons);

        personsService.create(nameObject).then((response) => {
          setPersons(persons.concat(response.data));
          setShowFilter(showFilter.concat(response.data.id));
        });
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
