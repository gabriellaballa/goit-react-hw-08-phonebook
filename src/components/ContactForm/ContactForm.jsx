import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { nanoid } from '@reduxjs/toolkit';
import { addContact } from '../../redux/contactSlice';
import css from './ContactForm.module.css';

const ContactForm = ({ onAddContact }) => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    number: '',
  });

  const handleInputChange = event => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = event => {
    event.preventDefault();

    const newContact = {
      id: nanoid(),
      name: formData.name.trim(),
      number: formData.number.trim(),
    };

    dispatch(addContact(newContact));
    setFormData({ name: '', number: '' });
  };

  return (
    <form className={css.addformula} onSubmit={handleSubmit}>
      <label>
        <span className={css.name}>Name:</span>
        <input
          className={css.input}
          type="text"
          name="name"
          required
          value={formData.name}
          onChange={handleInputChange}
        />
      </label>
      <label>
        <span className={css.num}>Phone Number:</span>

        <input
          className={css.input}
          type="tel"
          name="number"
          pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
          title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
          required
          value={formData.number}
          onChange={handleInputChange}
        />
      </label>

      <button className={css.addbtn} type="submit">
        Add Contact
      </button>
    </form>
  );
};

export default ContactForm;
