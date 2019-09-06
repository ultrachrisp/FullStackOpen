import React from 'react';

const Persons = ({persons, filter}) => {
    return (
        <>
            { persons.map(person =>
                          (person.name.toLowerCase().includes(filter.toLowerCase()))?
                          <div key={person.name}>{person.name} {person.number}</div> : '')}
        </>
    );
};

export default Persons;
