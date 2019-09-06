import React, { useState } from 'react';

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

    return (
        <>
            <h2>Phonebook</h2>
            <div> filter shown with:  <input value={filter} onChange={evt => setFilter(evt.target.value)} /></div>
            <h2>add a new</h2>
            <form onSubmit={addName}>
                <div> name: <input value={newName} onChange={evt => setNewName(evt.target.value)} /></div>
                <div> number: <input value={newNumber} onChange={evt => setNewNumber(evt.target.value)} /></div>
                <div><button type="submit">add</button></div>
            </form>
            <h2>Numbers</h2>
            { persons.map(person => (person.name.toLowerCase().includes(filter.toLowerCase()))? <div key={person.name}>{person.name} {person.number}</div> : '')
            }
        </>
    );
};

export default App;
