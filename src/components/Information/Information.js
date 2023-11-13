import React from 'react';
import classes from './Information.module.scss';

const Information = ({address, phoneNumber, mon, tues, wed, thur, fri, sat, sun }) => {
    return (
        <div className={classes.info}>
            <div className={classes.item}>
                <h className={classes.infoText}>{address}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{phoneNumber}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{mon}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{tues}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{wed}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{thur}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{fri}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{sat}</h>
            </div>
            <div className={classes.item}>
                <h className={classes.infoText}>{sun}</h>
            </div>
        </div>
    );
};

export default Information;