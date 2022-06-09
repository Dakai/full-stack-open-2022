import { useState } from "react";

const randomValue = (array) => {
  let max = array.length;
  let value = Math.floor(Math.random() * max);
  //console.log("randomValue:", value);
  return value;
};

const Button = ({ setSelected, text, anecdotes }) => {
  //console.log("Button constructed");
  const newAnecdotes = [...anecdotes];
  //let random = randomValue(newAnecdotes);
  return (
    <button onClick={() => setSelected(randomValue(newAnecdotes))}>
      {text}
    </button>
  );
};

const MostVotes = ({ anecdotes, allVote }) => {
  //console.log("allvotes", allVote);
  const index = allVote.indexOf(Math.max.apply(null, allVote));
  return (
    <>
      <h1>Anecdote with the most votes</h1>
      {anecdotes[index]}
    </>
  );
};

const VoteButton = ({ selected, allVote, setVote }) => {
  //console.log("selected", selected);
  //const newAllVote = allVote.slice();
  const newAllVote = [...allVote];
  //const value = allVote[selected];
  newAllVote[selected] += 1;
  return <button onClick={() => setVote(newAllVote)}>vote</button>;
};

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];
  //const [allVote, setVote] = useState([0, 0, 0, 0, 0, 0]);
  const [allVote, setVote] = useState(new Array(anecdotes.length).fill(0));
  const [selected, setSelected] = useState(0);
  //console.log("App selected", selected);
  //console.log("selected anecdotes", anecdotes[selected]);
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p id="anecdotes-selected">{anecdotes[selected]}</p>{" "}
      <Button
        setSelected={setSelected}
        text="next anecdotes"
        anecdotes={anecdotes}
      />
      <VoteButton selected={selected} allVote={allVote} setVote={setVote} />
      <p>Has {allVote[selected]} votes</p>{" "}
      <MostVotes anecdotes={anecdotes} allVote={allVote} />
    </div>
  );
};

function setHeight() {
  document.getElementById("anecdotes-selected").style.height = "30px";
}
setInterval(setHeight, 100);

export default App;
