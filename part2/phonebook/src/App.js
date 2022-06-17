import React from "react";
import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";

const App = () => {
  const [persons, setPersons] = useState([]);
  let personsIds = [];
  const [showFilter, setShowFilter] = useState();
  useEffect(() => {
    console.log("effect");
    personsService.getAll().then((response) => {
      setPersons(response.data);
      personsIds = Array.from(
        { length: response.data.length },
        (_, i) => i + 1
      );
      setShowFilter(personsIds);
    });
  }, []);

  console.log("showFilter", showFilter);
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        <Filter persons={persons} setShowFilter={setShowFilter} />
      </div>
      <h3>Add a new </h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
      />
      <h3>Numbers</h3>
      <Persons persons={persons} showFilter={showFilter} />
    </div>
  );
};

export default App;
