import React from 'react';
import {motion} from "framer-motion"
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useRouteMatch
  } from "react-router-dom";
export const HomeView = () => (

    <div className="container">
        <h1>Welcome to Fab Alt Lens</h1>
        <h2>Use your camera to ask provocative questions</h2>
        <Link to="/camera">

        <motion.button

        style={{marginTop:"50px"}}

        
            animate={{
            scale: 2
        }}
            transition={{
            duration: 0.5
        }}>
            Start </motion.button>
                </Link>

    </div>

)