import React from "react";
import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import axios from "axios";
/*
const Persons = ({ persons, showFilter }) => {
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
*/

const App = () => {
  const [persons, setPersons] = useState([]);
  let personsIds = [];
  const [showFilter, setShowFilter] = useState();
  let idMax;
  useEffect(() => {
    console.log("effect");
    axios.get("http://localhost:3001/persons").then((response) => {
      console.log("promis fulfilled");
      console.log("response.data", response.data);
      setPersons(response.data);
      personsIds = Array.from(
        { length: response.data.length },
        (_, i) => i + 1
      );
      setShowFilter(personsIds);
      idMax = Math.max.apply(Math, personsIds);
    });
  }, []);

  console.log("showFilter", showFilter);
  /*
	const [persons, setPersons] = useState([
	{ name: "Arto Hellas", number: "040-123456", id: 1 },
	{ name: "Ada Lovelace", number: "39-44-5323523", id: 2 },
	{ name: "Dan Abramov", number: "12-43-234345", id: 3 },
	{ name: "Mary Poppendieck", number: "39-23-6423122", id: 4 },
	]);
	*/

  //const [newName, setNewName] = useState("");
  //const [newNumber, setNewNumber] = useState("");
  /*
	const initFilter = () => {
    const arrayData = [];
    persons.map((person) => {
      return arrayData.push(person.id);
    });
    return arrayData;
  };
	*/
  /*
	const handleNameChange = (event) => {
    setNewName(event.target.value);
  };

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value);
  };
  const handleFilterChange = (event) => {
    //setNewFilter(event.target.value);
    filterName(event.target.value);
    console.log("event.target.value", event.target.value);
    console.log("showFilter", showFilter);
  };

  const filterName = (value) => {
    const arrayData = [];
    persons.map((person) => {
      if (person.name.toLowerCase().includes(value.toLowerCase())) {
        arrayData.push(person.id);
      }
      console.log("value", value);
      //console.log(arrayData);
      return setshowFilter(arrayData);
    });
	};

	*/
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
  /*

  const ifNameIncluded = (newName) => {
    persons.map((person) => {
      if (person.name.includes(newName)) {
        alert(newName + "is already added to Phonebook");
        return true;
      }
    });
  };
  const addName = (event) => {
    event.preventDefault();
    //console.log("button clicked", event.target);
    const nameObject = {
      name: newName,
      number: newNumber,
    };

    if (ifIncluded(newName)) {
      alert(newName + "is already added to Phonebook");
    } else {
      //console.log("persons", persons);
      setPersons(persons.concat(nameObject));
      setNewName("");
      setNewNumber("");
    }
  };
	*/
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        {/*filter shown with:
				<input onChange={handleFilterChange} />*/}
        <Filter persons={persons} setShowFilter={setShowFilter} />
      </div>
      <h3>Add a new </h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        idMax={idMax}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
      />
      {/*<form onSubmit={addName}>
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
			</form>*/}
      {/*}<div>debug: {showFilter}</div>*/}
      <h3>Numbers</h3>
      <Persons persons={persons} showFilter={showFilter} />
    </div>
  );
};

export default App;
