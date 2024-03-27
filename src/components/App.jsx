import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  fetchContacts,
  addContact,
  deleteContact,
} from '../redux/contactSlice';
import ContactForm from './ContactForm/ContactForm';
import ContactList from './ContactList/ContactList';

const App = () => {
  const contacts = useSelector(state => state.contacts.items);
  const isLoading = useSelector(state => state.contacts.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  const handleAddContact = newContact => {
    dispatch(addContact(newContact));
  };

  const handleDeleteContact = contactId => {
    dispatch(deleteContact(contactId));
  };

  return (
    <div>
      <h1>My Phonebook</h1>
      <div className="addformula">
        <ContactForm onAddContact={handleAddContact} />
      </div>

      <h2>Contacts:</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <ContactList
          contacts={contacts}
          onDeleteContact={handleDeleteContact}
        />
      )}
    </div>
  );
};

export default App;
