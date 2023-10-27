import React from 'react';
import classes from './VisitUs.module.scss';
import Information from '../../components/Information/Information';

const VisitUs = () => {
    const informationProps = {
        address: "415 Seneca St, Seattle, WA 98101",
        phoneNumber: "206-682-7535",
        hours: "Mon - Fri: 9AM - 8PM\nSat: 11AM - 8PM\nSun: Closed",
    };

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
