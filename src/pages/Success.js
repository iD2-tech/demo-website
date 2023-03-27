import classes from '../components/Success.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Success = () => {


    const [session, setSession] = useState({});
    const location = useLocation();
    const sessionId = location.search.replace('?session_id=', '');
    const [name, setName] = useState("");
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);



    useEffect(() => {
        async function fetchSession() {
            setSession(
                await fetch('/checkout-session?sessionId=' + sessionId).then((res) =>
                    res.json()
                )
            )
            localStorage.clear();
        }
        const url = new URL(window.location);
        const sessionId = url.searchParams.get('session_id');
        fetch(`http://localhost:3000/checkout/${sessionId}/line_items`)
            .then(data => data.json())
            .then(items => {
                setItems(items);
            });

        fetchSession();
        setFields();

    }, [session]);

    const setFields = () => {
        try {
            setName(session.customer_details.name);
            setTotal(session.amount_total / 100);
        } catch (error) {
            console.log("fail");
            console.log(items);
        }
    }



    return (

        <div>
            <text>{JSON.stringify(session, null, 2)}</text>
            <text>Thank you {name} for your order!</text>
            <text>Your total is ${total}</text>
            {items.map((product) => (
                <text>
                    {product.name}
                </text>
            ))}
        </div>
    )
}

export default Success