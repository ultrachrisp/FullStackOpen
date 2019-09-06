import React from 'react';

const Header = ({course}) => <h2>{course}</h2>;
const Content = ({parts}) => parts.map(({name, exercises, id}) => <Part key={id} name={name} exercises={exercises} />);
const Part = ({name, exercises}) => <p>{name} {exercises}</p>;
const Total = ({parts}) => <b>Total of { parts.reduce((a, b) => (a + b.exercises), 0) } exercises</b>;
const Course = ({course}) => {
    const {name, parts} = course;
      return (
          <>
              <Header course={name} />
              <Content parts={parts} />
              <Total parts={parts} />
          </>
      );
};

export default Course;
