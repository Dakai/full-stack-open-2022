import React from "react";
const Content = ({ course }) => {
  return (
    <>
      {course.parts.map((parts) => (
        <p key={parts.id}>
          {parts.name} &nbsp;
          {parts.exercises}
        </p>
      ))}
    </>
  );
};

export default Content;
