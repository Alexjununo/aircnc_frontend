import React, { useState } from 'react';

import api from '../../services/api.js';

export default function Login({ history }) {
    const [email, setEmail] = useState('');

    const handleSubmit = async (event) => {
      event.preventDefault();
  
      const response = await api.post('/sessions', { email: email }),
        { _id } = response.data;
  
      localStorage.setItem('user', _id);

      history.push('/dashboard');
    }
    return (
        <>
          <p>
            Offer <strong>spots</strong> for programmers and find <strong>talent</strong> for your business
          </p>    
          <form onSubmit={handleSubmit}>
            <label htmlFor="email">EMAIL *</label>
            <input
              id="email"
              type="email"
              placeholder="Insert your email..."
              value={email}
              onChange={event => setEmail(event.target.value)}
              required
            />    
            <button className="btn" type="submit">Log In</button>
          </form>
        </>
    )
}