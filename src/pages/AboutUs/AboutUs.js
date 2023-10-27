import React from 'react';
import classes from './AboutUs.module.scss';
import AboutUsInfo from '../../components/AboutUsInfo/AboutUsInfo';
import Information from '../../components/Information/Information';

const AboutUs = () => {
    const aboutUsInfoProps = {
        imageUrl: require('../../assets/images/about.jpg'),
        headerText: "This is the header text",
        bodyText: "This is the body text I am passing as a prop"
    };

    return (
        <div className={classes.container}>
            <div className={classes.header}>
                ABOUT US
            </div>
            <AboutUsInfo {...aboutUsInfoProps} />
        </div>
    );
};

export default AboutUs;