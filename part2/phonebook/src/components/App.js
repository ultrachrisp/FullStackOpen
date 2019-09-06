import React, { useState } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';

const App = () => {
    const [ persons, setPersons] = useState([
        { name: 'Arto Hellas', number: '040-123456' },
        { name: 'Ada Lovelace', number: '39-44-5323523' },
        { name: 'Dan Abramov', number: '12-43-234345' },
        { name: 'Mary Poppendieck', number: '39-23-6423122' }
    ]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');

    const addName = (evt) => {
        evt.preventDefault();
        
        const newEntry = {
            name: newName,
            number: newNumber
        };

        if(persons.some(elem => elem.name === newEntry.name)){
            alert(`${newEntry.name} is already added to phonebook`);
        }
        else if(persons.some(elem => elem.number === newEntry.number)){
            alert(`${newEntry.number} is already added to phonebook`);
        } else {
            setPersons(persons.concat(newEntry));
            setNewName('');
            setNewNumber('');
        }
    };

    const onFilterChange = (evt) => setFilter(evt.target.value);
    const onNameChange = (evt) => setNewName(evt.target.value);
    const onNumberChange = (evt) => setNewNumber(evt.target.value);

    return (
        <>
            <h2>Phonebook</h2>
            <Filter
                filter={filter}
                onFilterChange={onFilterChange} />
            
            <h3>Add a new</h3>
            <PersonForm
                addName={addName}
                newName={newName}
                onNameChange={onNameChange}
                newNumber={newNumber}
                onNumberChange={onNumberChange}/>
            
            <h3>Numbers</h3>
            <Persons
                persons={persons}
                filter={filter} />
        </>
    );
};

export default App;
