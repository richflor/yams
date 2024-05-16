// src/App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

const PickPastries = () => {

    const URL_API = import.meta.env.VITE_APP_TITLE;

    const [pastries, setPastries] = useState([]);

    useEffect(() => {
        // Fetch pastries from your backend
        axios.get(`${URL_API}/pastries`)
            .then(response => {
                setPastries(response.data);
            })
            .catch(error => {
                console.error('There was an error fetching the pastries!', error);
            });
    }, []);

    const handleIncrement = (index) => {
        setPastries(prevPastries => {
            const newPastries = [...prevPastries];
            if (newPastries[index].selected < newPastries[index].numberLeft) {
                newPastries[index].selected += 1;
            }
            return newPastries;
        });
    };

    const handleDecrement = (index) => {
        setPastries(prevPastries => {
            const newPastries = [...prevPastries];
            if (newPastries[index].selected > 0) {
                newPastries[index].selected -= 1;
            }
            return newPastries;
        });
    };

    return (
        <div>
            <h1>Pastry Dashboard</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Image</th>
                        <th>Quantity Left</th>
                        <th>Selected</th>
                    </tr>
                </thead>
                <tbody>
                    {pastries.map((pastry, index) => (
                        <tr key={index}>
                            <td>{pastry.name}</td>
                            <td><img src={pastry.image} alt={pastry.name} style={{ width: '50px' }} /></td>
                            <td>{pastry.numberLeft}</td>
                            <td>
                                <button onClick={() => handleDecrement(index)}>-</button>
                                <span>{pastry.selected || 0}</span>
                                <button onClick={() => handleIncrement(index)}>+</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PickPastries;
