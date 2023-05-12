import { Component } from "react";
import { nanoid } from 'nanoid'

import { ContactForm } from "./ContactForm/ContactForm";
import { Filter } from "./Filter/Filter";
import { ContactList } from "./ContactList/ContactList";

import css from './App.module.css'

export class App extends Component {
  state = {
    contacts: [ ],
    filter: ''
  }

  
  handleSubmit = (e) => {
    const form = e.currentTarget;
    e.preventDefault();
  
    const newContact = {
      id: nanoid(),
      name: form.elements.name.value,
      number: form.elements.number.value, 
    };

    if(this.state.contacts.find(({name}) => name === newContact.name)) {
      // console.log(this.state.contacts.find(({name}) => name === newContact.name))

      alert (`${newContact.name} is already in contacts`)

      
      // form.reset()
    } else {
      this.setState((prevState) => ({
        contacts: [...prevState.contacts, newContact]
      }))
      
    }

    form.reset()
  }

  handleChange = (e) => {
    const {value} = e.target;
    this.setState({filter: value});
  }

  handleDeleteButton = (id) => {
    this.setState((prevState) => {
      const updatedContacts = prevState.contacts.filter(contact => contact.id !== id);
      return { contacts:  updatedContacts}
    })
  }

  render () {
    return (
    <div className={css.container}>
  <h1 className={css.main_title}>Phonebook</h1>
  <ContactForm  
  handleSubmit={this.handleSubmit}
  />

  <h2 className={css.title}>Contacts</h2>
  <Filter  handleChange={this.handleChange}/>
  <ContactList 
  contacts={this.state.contacts} 
  filter={this.state.filter}
  handleDeleteButton={this.handleDeleteButton}/>
</div>
    )
  }
}
