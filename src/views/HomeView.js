import React from 'react';
import {motion} from "framer-motion"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";

import Navbar from '../components/Navbar'

export const HomeView = () => (

    <div className="container">
        <Navbar></Navbar>
        <div className="home-text-div">

        <h2>Hello there!</h2>
        <p>
        It’s time to bring more imagination to our reality. I can see things through a different lens, so use your camera to unlock new ideas about what we see.
        </p>
        </div>

        <Link to="/camera">

        <motion.button
        className="btn-black"
        style={{marginTop:"50px"}}
        initial={{scale:0.5}}
        
            animate={{
            scale: 1
        }}
            transition={{
            duration: 0.5
        }}>
            Start </motion.button>
                </Link>

    </div>

)