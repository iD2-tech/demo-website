import classes from './Success.module.scss';
import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Success = () => {


    const [session, setSession] = useState({});
    const location = useLocation();
    const sessionId = location.search.replace('?session_id=', '');
    const [name, setName] = useState("");
    const [total, setTotal] = useState(0);
    const [items, setItems] = useState([]);
    var itemCount = 0;



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
        try {
            fetch(`http://localhost:3000/checkout/${sessionId}/line_items`)
                .then(data => data.json())
                .then(items => {
                    setItems(items);
                });
        } catch (error) {
            console.log(error);
        }


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

        <div className={classes.container}>
            <div className={classes.title}>
                <p>Thank you {name} for your order!</p>
            </div>
            <div className={classes.subtitle}>
                <p>Your order will be ready in 10-15 minutes</p>
            </div>
            <div className={classes.columnLabelContainer}>
                <div className={classes.quantityContainer}>
                    <p>QTY</p>
                </div>
                <div className={classes.itemContainer}>
                    <p>ITEM</p>
                </div>
                <div className={classes.priceContainer}>
                    <p>PRICE</p>
                </div>
            </div>
            <div className={classes.receiptContainer}>
                {items.map((product) => (
                    <div className={classes.receiptItem}>
                        <div className={classes.quantityContainer}>
                            <text>{product.quantity}</text>
                            <text className={classes.hidden}>{itemCount += product.quantity}</text>
                        </div>
                        <div className={classes.itemContainer}>
                            <p>{product.description}</p>
                        </div>

                        <div className={classes.priceContainer}>
                            <p> ${product.amount_total / 100} </p>
                        </div>
                    </div>
                ))}
            </div>
            <div className={classes.receiptEndContainer}>
                <div className={classes.receiptEndItem}>
                    <div className={classes.receiptEndLeft}>
                        <p>ITEM COUNT:</p>
                    </div>
                    <div className={classes.receiptEndRight}>
                        <p>{itemCount}</p>
                    </div>

                </div>
                <div className={classes.receiptEndItem}>
                <div className={classes.receiptEndLeft}>
                        <p>TOTAL:</p>
                    </div>
                    <div className={classes.receiptEndRight}>
                        <p>${total}</p>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Success