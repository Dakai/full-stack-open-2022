import React from "react";
import { useState, useEffect } from "react";
import Persons from "./components/Persons";
import Filter from "./components/Filter";
import PersonForm from "./components/PersonForm";
import personsService from "./services/persons";
import filterArrayService from "./services/filterArray";
import "./index.css";

const App = () => {
  const [persons, setPersons] = useState([]);
  const [showFilter, setShowFilter] = useState();
  const [errorMessage, setErrorMessage] = useState(null);
  const [notifyMessage, setNotifyMessage] = useState(null);

  const ErrorMessage = ({ message }) => {
    console.log(message);
    if (message === null) {
      return null;
    } else {
      return <div className="error">{message}</div>;
    }
  };

  const NotifyMessage = ({ message }) => {
    console.log(message);
    if (message === null) {
      return null;
    } else {
      return <div className="notify">{message}</div>;
    }
  };

  useEffect(() => {
    //console.log("effect");
    personsService.getAll().then((response) => {
      setPersons(response.data);
      setShowFilter(filterArrayService.filterArray(response.data));
      //console.log(FilterArray(response.data));
    });
  }, []);
  return (
    <div>
      <h2>Phonebook</h2>
      <ErrorMessage message={errorMessage} />
      <NotifyMessage message={notifyMessage} />
      <div>
        <Filter persons={persons} setShowFilter={setShowFilter} />
      </div>
      <h3>Add a new </h3>
      <PersonForm
        persons={persons}
        setPersons={setPersons}
        setShowFilter={setShowFilter}
        showFilter={showFilter}
        setNotifyMessage={setNotifyMessage}
      />
      <h3>Numbers</h3>
      <Persons
        setShowFilter={setShowFilter}
        persons={persons}
        showFilter={showFilter}
        setPersons={setPersons}
        setErrorMessage={setErrorMessage}
      />
    </div>
  );
};

export default App;
