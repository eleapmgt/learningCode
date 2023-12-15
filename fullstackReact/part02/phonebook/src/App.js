import { useState, useEffect } from 'react'
import axios from 'axios'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'


const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [filter, setFilter] = useState('')
  const [notification, setNotification] = useState({
    message: null,
    isError: false
  })

  useEffect(() => {
    personService
      .getAll()
      .then(response => {
        setPersons(response.data)
      })
  }, []);

  const handleNameChange = (event) => {
    setNewName(event.target.value)
    }
  // Cette ligne de code crée une nouvelle fonction nommée handleNameChange qui prend un argument event. Cette fonction est appelée à chaque fois que la valeur de l'input est modifiée. L'événement contient une propriété appelée target qui fait référence à l'élément DOM qui a déclenché l'événement, dans ce cas, l'input. La valeur actuelle de l'input est stockée dans la propriété value de cet élément. La fonction handleNameChange utilise la fonction setNewName pour mettre à jour l'état newName avec la nouvelle valeur de l'input.

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleNotification = (message, isError) => {
    setNotification({ message, isError });
    setTimeout(() => {
      setNotification({ message: null, isError: false });
    }, 5000);
  };

  const addPerson = (event) => {
    // Cette ligne de code crée une nouvelle fonction nommée addPerson qui prend un argument event (un événement). Cette fonction est appelée lorsque le formulaire est soumis.
    event.preventDefault()
    // La première ligne de la fonction appelle la méthode preventDefault sur l'événement, ce qui empêche le formulaire de se soumettre automatiquement et de recharger la page.
    const personObject = {
      name: newName,
      number: newNumber,
      /*id: persons.length + 1*/
    }

    const existingPerson = persons.find((person) =>
      person.name === newName);

    if (existingPerson) {
      const confirmUpdate = window.confirm(
        `${newName} is already added to the phonebook. Do you want to update the phone number?`
      );

      if (confirmUpdate) {
        personService
          .update(existingPerson.id, personObject)
          .then((updatedPerson) => {
            personService.getAll()
              .then((response) => {
                setPersons(response.data);
                setNewName('');
                setNewNumber('');
                handleNotification(`Phone number for ${existingPerson.name} updated successfully.`, false);
              })
          })
          .catch(error => {
           handleNotification(`Information of ${existingPerson.name} has already been removed from server.`, true);
          });
      }
    } else {
      personService
        .create(personObject)
        .then(response => {
          setPersons(persons.concat(response.data));
          setNewName('');
          setNewNumber('');
          handleNotification(`${response.data.name} added successfully.`, false);
        })
        .catch(error => {
          console.log('Error adding person:', error);
          handleNotification(`Failed to add person.`, true);
        });
    };
  }

  const deletePerson = (id, name) => {
    if (window.confirm(`Delete ${name}?`)) {
      console.log('id', id);
      personService
        .remove(id)
        .then(() => {
          // Effectuer une nouvelle requête GET pour obtenir la liste mise à jour des personnes
          personService.getAll()
            .then(response => {
              setPersons(response.data);
            })
          })
        .catch(error => {
          console.log('Error fetching updated persons:', error);
          handleNotification(`Failed to delete ${name}.`, true);
        });
    }
  };


  const handleFilterChange = (event) => {
    setFilter(event.target.value)
  }

  const filteredPersons = persons.filter(person => person.name.toLowerCase().includes(filter.toLowerCase())).map(person => ({
    ...person,
    id: person.id.toString()
  }));


  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={notification.message} isError={notification.isError}/>
      <Filter value={filter} onChange={handleFilterChange}/>
      <h2>Add a new person</h2>
      <PersonForm
        newName={newName}
        newNumber={newNumber}
        handleNameChange={handleNameChange}
        handleNumberChange={handleNumberChange}
        addPerson={addPerson}/>
      <h2>Numbers</h2>
      <Persons filteredPersons={filteredPersons} deletePerson={deletePerson}/>
    </div>
  )
  // Cette partie de code modifie le formulaire pour qu'il soit soumis en appelant la fonction addPerson lorsque le bouton "add" est cliqué ou la touche "Entrée" est pressée.
  // La première ligne associe la fonction addPerson à l'événement onSubmit du formulaire. Cela signifie que lorsque le formulaire est soumis (par exemple, en cliquant sur le bouton "add"), la fonction addPerson est appelée.
  // La deuxième ligne crée un input avec une valeur égale à l'état newName et un événement onChange qui appelle la fonction handleNameChange chaque fois que la valeur de l'input est modifiée.
  // La troisième ligne crée un bouton "add" qui déclenche la soumission du formulaire lorsque l'utilisateur clique dessus.
}

export default App
