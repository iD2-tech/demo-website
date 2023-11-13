import React from 'react';
import classes from './AboutUsInfo.module.scss';

const AboutUsInfo = ({ imageUrl, headerText, bodyText }) => {
    return (
        <div className={classes.about}>
            <div className={classes.imageContain}>
                <img src={imageUrl} className={classes.img} alt="About Us" />
            </div>
            <div className={classes.text}>
                <h className={classes.headerr}>{headerText}</h>
                <h className={classes.body}>{bodyText}</h>
            </div>
        </div>
    );
};

export default AboutUsInfo;
