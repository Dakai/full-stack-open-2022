import React from "react";
import { useState } from "react";
import personsService from "../services/persons";
import filterArrayService from "../services/filterArray";

const PersonForm = ({
  persons,
  setPersons,
  showFilter,
  setShowFilter,
  setNotifyMessage,
  setErrorMessage,
}) => {
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");

  const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };

  const ifIncluded = () => {
    const nametrim = newName.trim();
    const person = persons.find((person) => person.name === nametrim);
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
    //if (!!newName) {
    //prevent adding a empty entry
    event.preventDefault();
    const nametrim = newName.trim();
    const numbertrim = newNumber.trim();
    const nameObject = {
      name: nametrim,
      number: numbertrim,
    };
    if (ifIncluded()) {
      if (
        window.confirm(
          `${nametrim} is already added to the Phonebook, repace the old number with the new one?`
        )
      ) {
        const id = ifIncluded().id;
        //console.log(id);
        personsService
          .update(id, nameObject)
          .then((response) => {
            personsService.getAll().then((response) => {
              setPersons(response.data);
              setShowFilter(filterArrayService.filterArray(response.data));
              setNotifyMessage(`${nametrim} number updated`);
              setNewName("");
              setNewNumber("");
              setTimeout(() => {
                setNotifyMessage(null);
              }, 5000);
            });
          })
          .catch((error) => {
            console.log(error.response.data);
            setErrorMessage(JSON.stringify(error.response.data.error));
            setTimeout(() => {
              setErrorMessage(null);
            }, 5000);
          });
      }
      //alert(newName + "is already added to Phonebook");
    } else {
      //console.log("nameObject", nameObject);
      setNewName("");
      setNewNumber("");
      console.log("add new person & persons:", persons);
      personsService
        .create(nameObject)
        .then((response) => {
          console.log(response);
          setPersons(persons.concat(response.data));
          setShowFilter(showFilter.concat(response.data.id));
          setNotifyMessage(`Added ${nametrim}`);
          setTimeout(() => {
            setNotifyMessage(null);
          }, 5000);
        })
        .catch((error) => {
          console.log(error.response.data);
          setErrorMessage(JSON.stringify(error.response.data.error));
          setTimeout(() => {
            setErrorMessage(null);
          }, 5000);
        });
    }
    //}
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
