import Content from "./components/Content";
import Header from "./components/Header";
import Sum from "./components/Sum";

const App = () => {
  const course = [
    {
      id: 1,
      name: "Half Stack application development",
      parts: [
        {
          name: "Fundamentals of React",
          exercises: 10,
          id: 1,
        },
        {
          name: "Using props to pass data",
          exercises: 7,
          id: 2,
        },
        {
          name: "State of a component",
          exercises: 14,
          id: 3,
        },

        {
          name: "Redux",
          exercises: 11,
          id: 4,
        },
      ],
    },
    {
      name: "Node.js",
      id: 2,
      parts: [
        {
          name: "Routing",
          exercises: 3,
          id: 1,
        },
        {
          name: "Middlewares",
          exercises: 7,
          id: 2,
        },
      ],
    },
  ];
  return <Course course={course} />;
};
const Course = ({ course }) => {
  return (
    <>
      {course.map((course) => (
        <div>
          <Header course={course} />
          <Content course={course} />
          <Sum course={course} />
        </div>
      ))}
    </>
  );
};
export default App;
/*
		<>
      <Header course={course} />
      <Content course={course} />
      <Sum course={course} />
		</>
};

		*/
/*
const Header = ({ course }) => <h1>{course.name}</h1>;
*/
/*
const Sum = ({ course }) => {
  const dataArray = [];
  course.parts.map((parts) => dataArray.push(parts.exercises));
  console.log(dataArray);
  const sum = dataArray.reduce((s, p) => {
    console.log("what the fuck is s & p?", s, p);
    const updatedSum = s + p;
    console.log(updatedSum);
    return updatedSum;
  });
  return (
    <>
      <p>Total Exercise: {sum}</p>
    </>
  );
	*/
/*
	return (
		<>
			{course.parts.map((parts) => (
				<p key={parts.id}>{parts.exercises}</p>
			))}
		</>
	);

	/*
	console.log("course.parts", course.parts[0].exercises);
	const dataArray = {parts.map((data) => {
		{ data.exercises };
	}}
;
/*
	const sum = {course.parts.exercises.reduce((s, p) => {
		console.log(s, p);
		const updatedSum = s + p;
		return updatedSum;
	}, 0)};
	return (
		<>
			<p>Total Exercise: {sum}</p>
		</>
	);
	*/
