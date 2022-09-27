import React from 'react'
import classes from '../components/AboutUs.module.scss';
import { MapContainer, TileLayer, useMap } from 'react-leaflet'
import {HiLocationMarker} from "react-icons/hi";
import {BsTelephoneFill} from "react-icons/bs";
import {AiOutlineClockCircle} from "react-icons/ai";


const AboutUs = () => {
  return (
    <div className={classes.container}>
        <div className = {classes.header}>
            About Us
        </div>

        <div className={classes.about}>
            <div className={classes.imageContain}>
                <img src={require('./images/phostaff.jpg')} className={classes.img} />
            </div>
            <div className={classes.text}>
                <h className={classes.headerr}>THIS IS WHAT YOU NEED TO KNOW ABOUT US !</h>
                <h className={classes.body}>yay how are you im fine im in korea right now and i don’t want to leave. some things i miss about the u.s. are shower curtains and big towels. my hair is long but all the towels here are so small. i also miss toru i heard he went to the er because he was chasing some rabbit and went into the bushes. the bushes seemed to have something poisonous because toru’s eyes got all swollen and he got sick. i called him and it seemed like he had no energy in him. that made me really sad. anyways, the food here is so good. i drank soju with my grandpa (dad’s side) for the first time today. he was so happy and i was too. but something about that also made me feel sad. not sure why. haha tomorrow i am going to soundberry festival which i am excited for because i get to see ash island, heize, etc. but im also missing the waterbomb festival askjakjs next year for sure im gonna go. im watching woo young woo right now and this is such a good drama everything is so wholesome and happy ahhhh i want to date too HAHAHA anyways this is the “about us” page lol.</h>
            </div>
        </div>

        <div className={classes.info}>
            <h className={classes.headerr1}>
                WONDERFUL PHO INFORMATION:
            </h>
                <div className={classes.item}>
                    <HiLocationMarker size={25}/>
                    <h className={classes.infoText}>4125 ST HELLO WORLD 98033</h>
                </div>
                <div className={classes.item}>
                    <BsTelephoneFill size={22}/>
                    <h className={classes.infoText}>111-222-3333</h>
                </div>
                <div className={classes.item}>
                    <AiOutlineClockCircle size={24}/>
                    <h className={classes.infoText}>10:00 AM - 6:00 PM</h>
                </div> 
        </div>
    </div>

  )
}

export default AboutUs