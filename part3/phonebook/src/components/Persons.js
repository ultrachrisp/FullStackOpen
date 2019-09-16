import React from 'react';

const Person = ({person, action}) => {
    const {name, number} = person;
    return (
        <div>
            <span key={name}>{name} {number}</span>
            <button value={name} onClick={action}>delete</button>
        </div>
    );
};

const Persons = ({persons, filter, action}) => {
    return (
        <>
            { persons.map(person =>
                          (person.name && person.name.toLowerCase().includes(filter.toLowerCase()))?
                          <Person key={person.name} person={person} action={action} />: '')}
        </>
    );
};

export default Persons;
