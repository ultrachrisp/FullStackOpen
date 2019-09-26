import React, { useState, useEffect } from 'react';
import Filter from './Filter';
import PersonForm from './PersonForm';
import Persons from './Persons';
import Notification from './Notification';
import personsService from '../service/persons';

const App = () => {
    const [ persons, setPersons] = useState([]);
    const [ newName, setNewName ] = useState('');
    const [ newNumber, setNewNumber ] = useState('');
    const [ filter, setFilter ] = useState('');
    const [ errorMessage, setErrorMessage ] = useState({type:'', msg:null});

    const hook = () => {
        personsService
            .getAll()
            .then(initialPersons => {
                setPersons(initialPersons);
            })
            .catch(error => console.log(error));
    };

    useEffect(hook, []);

    const showMessage = ({type, msg}) =>{
        setErrorMessage({type, msg});
        setTimeout(() => { setErrorMessage({msg:null}); }, 5000);
    };
    
    const addName = (evt) => {
        evt.preventDefault();
        
        const newEntry = {
            name: newName,
            number: newNumber
        };

        if(persons.some(elem => elem.name === newEntry.name)){

            if(window.confirm(`${newEntry.name} is already added to phonebook, replace the old number with a new one?`)){
                const targetPerson = persons.find(person => person.name === newEntry.name);
                personsService
                    .update(targetPerson.id, newEntry)
                    .then(response => {
                        setPersons(persons.map(person => person.id !== targetPerson.id? person: response));
                        setNewName('');
                        setNewNumber('');
                        showMessage({type:'confirm', msg:`Updated details for ${response.name}`});
                    });
            }
        } else {
            personsService
                .create(newEntry)
                .then(response => {
                    setPersons(persons.concat(response));
                    setNewName('');
                    setNewNumber('');
                    showMessage({type:'confirm', msg:`Successfully added ${response.name} to phonebookq`});
                });
        }
    };

    const deleteName = (evt) => {
        const targetPerson = persons.find(person => person.name === evt.target.value);

        if(window.confirm(`Delete ${evt.target.value}`)){
            personsService
                .remove(targetPerson.id)
                .then(returned => {
                    setPersons(persons.filter(person => person.id !== targetPerson.id));
                    showMessage({type:'confirm', msg:`Removed ${targetPerson.name} from phonebook`});
                })
                .catch(error => {
                    showMessage({type:'error', msg:`Information of ${targetPerson.name} has already been removed from server`});
                });
        }
    };

    const onFilterChange = (evt) => setFilter(evt.target.value);
    const onNameChange = (evt) => setNewName(evt.target.value);
    const onNumberChange = (evt) => setNewNumber(evt.target.value);

    return (
        <>
            <h2>Phonebook</h2>
            <Notification message={errorMessage} />
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
                filter={filter}
                action={deleteName} />
        </>
    );
};

export default App;
