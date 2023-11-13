import React from 'react';
import classes from './VisitUs.module.scss';
import Information from '../../components/Information/Information';
import globalInfo from '../../assets/data.json';

const VisitUs = () => {
    const informationProps = globalInfo;

    const hoursArray = informationProps.hours.split('\n').map((line, index) => (
        <p key={index}>{line}</p>
    ));

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                HOURS AND LOCATION
            </div>
            <Information {...informationProps} hours={hoursArray} />
        </div>
    );
};

export default VisitUs;
