import React from 'react';
import classes from './Information.module.scss';

const Information = ({address, phoneNumber, hours }) => {
    return (
        <div className={classes.info}>
            <div className={classes.item}>
                <h className={classes.infoText}>{address}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{phoneNumber}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{hours}</h>
            </div>
        </div>
    );
};

export default Information;