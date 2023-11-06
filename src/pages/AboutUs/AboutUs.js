import React from 'react';
import classes from './AboutUs.module.scss';
import AboutUsInfo from '../../components/AboutUsInfo/AboutUsInfo';
import Information from '../../components/Information/Information';
import globalInfo from '../../assets/data.json';

const AboutUs = () => {
    const aboutUsInfoProps = globalInfo;

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                ABOUT US
            </div>
            <AboutUsInfo {...aboutUsInfoProps}/>
        </div>
    );
};

export default AboutUs;