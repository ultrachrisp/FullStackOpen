import React from 'react';
import ReactDOM from 'react-dom';

const Header = ({course}) => <h1>{course}</h1>;
const Content = ({parts}) =>
      <>
          { parts.map(({name, exercises, id}) => <Part key={id} name={name} exercises={exercises} />) }
      </>;
const Part = ({name, exercises}) => <p>{name} {exercises}</p>;
const Total = ({parts}) => <b>Total of { parts.reduce((a, b) => (a + b.exercises), 0) } exercises</b>;

const App = () => {
    const courses = [
        {
            name: 'Half Stack application development',
            id: 1,
            parts: [
                {
                    name: 'Fundamentals of React',
                    id: 1,
                    exercises: 10
                },
                {
                    name: 'Using props to pass data',
                    id: 2,
                    exercises: 7
                },
                {
                    name: 'State of a component',
                    id: 3,
                    exercises: 14
                },
                {
                    name: 'Redux',
                    id: 4,
                    exercises: 11
                }]
        },{
            name: 'Node.js',
            id: 2,
            parts: [
                {
                    name: 'Routing',
                    exercises: 3,
                    id: 1
                },
                {
                    name: 'Middlewares',
                    exercises: 7,
                    id: 2
                }
            ]
        }];

    const content = courses.map(course => (
        <div key={course.id}>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </div>
    ));
    return content;
};

ReactDOM.render(<App />, document.getElementById('root'));
