import React from 'react';
import ReactDOM from 'react-dom';

const Header = (props) => (
    <h1>{props.course}</h1>
);

const Content = (props) => (
    <>
        {props.part.map((val, i) =>  (
            <Part text={val} exercise={props.exercise[i]}/>
    ))}
    </>
);

const Part = (props) => (
    <p>{props.text} {props.exercise}</p>
);

const Total = (props) => (
    <p>Number of exercises {props.exercise.reduce((a, b) => a + b, 0)}</p>
);

const App = () => {
    const part = ['Fundamentals of React', 'Using props to pass data', 'State of a component'],
          exercise = [10, 7, 14];

  return (
    <>
        <Header course='Half Stack application development'/>
        <Content part={part} exercise={exercise}/>
        <Total exercise={exercise}/>
    </>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
