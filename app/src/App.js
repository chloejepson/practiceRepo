import logo from './logo.svg';
import React, { useState } from 'react';
import './App.css';

function MyForm() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  async function handleSubmit(e){
    console.log("here")
    e.preventDefault();
    const response = await fetch('http://localhost:5000/db');
    if(!response.ok){
      console.log("bad request")
    }
    let data = await response.json();
    console.log(data);
    // Add your custom logic here when the form is submitted
    alert(`Hello, ${firstName}!`);
  };

  return (
    <div>
      <div className="login-container">
      <form className="login-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={firstName}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={lastName}
            onChange={handleLastNameChange}
            required
          />
        </div>
        <div className="form-group">
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
    </div>
  );
}

function App() {
  return (
    <div className="App">
      <header className="App-header">
        < MyForm></MyForm>
      </header>
    </div>
  );
}

export default App;
