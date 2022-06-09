import React from "react";

const Sum = ({ course }) => {
  const dataArray = [];
  course.parts.map((parts) => dataArray.push(parts.exercises));
  console.log(dataArray);
  const sum = dataArray.reduce((s, p) => {
    console.log("what the heck is s & p?", s, p);
    const updatedSum = s + p;
    console.log(updatedSum);
    return updatedSum;
  });
  return (
    <>
      <p>
        <b>total of {sum} exercises: </b>
      </p>
    </>
  );
};

export default Sum;
