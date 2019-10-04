import React, { useState, useMemo } from 'react';

import camera from '../../assets/camera.svg';
import api from '../../services/api';
import './new.css';

export default function New({ history }) {
    const [ thumbnail, setThumbnail ] = useState(null),
        [company, setCompany] = useState(''),
        [ price, setPrice ] = useState(''),
        [ techs, setTechs ] = useState('');

    const preview = useMemo(() => {
        return thumbnail ? URL.createObjectURL(thumbnail) : null;
    }, [thumbnail])

    const handleSubmit = async (event) => {
        event.preventDefault();

        const data = new FormData(),
            user_id = localStorage.getItem('user');

        data.append('thumbnail', thumbnail);
        data.append('company', company);
        data.append('techs', techs);
        data.append('price', price);

        await api.post('/spots', data, {
            headers: { user_id }
        });

        history.push('/dashboard');
    }
    return (
        <form onSubmit={handleSubmit}>
            <label 
                id="thumbnail" 
                style={{ backgroundImage: `url(${preview})` }}
                className={thumbnail ? 'has-thumbnail' : ''}
            >
                <input type="file" onChange={event => setThumbnail(event.target.files[0])}/>
                <img src={camera} alt="Select img" />
            </label>
            <label htmlFor="company">COMPANY *</label>
            <input 
                id="company"
                type="text"
                placeholder="Your company..."
                value={company}
                onChange={event => setCompany(event.target.value)}
                required
            />
            <label htmlFor="techs">TECHNOLOGIES * <span>(comma separated)</span></label>
            <input 
                id="techs"
                type="text"
                placeholder="Your techs..."
                value={techs}
                onChange={event => setTechs(event.target.value)}
                required
            />
            <label htmlFor="price">RENTAL PRICE * <span>(leave blank for free)</span></label>
            <input 
                id="price"
                type="text"
                placeholder="Your price..."
                value={price}
                onChange={event => setPrice(event.target.value)}
            />
            <button className="btn" type="submit">Register company</button>
        </form>
    )
}