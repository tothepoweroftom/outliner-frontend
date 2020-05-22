import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Camera from '../components/Camera'
import axios from 'axios'
import {useHistory} from "react-router-dom";
import "../components/loading-spinner.css"
import { motion } from 'framer-motion';
const colorMap = {
    'r': '#D60000', 
    'b': '#2962FF',
    'y': '#FAF455'
  }
function Reimaginings(props) {
    function handleClick() {
        props.handler()
    }

 
    if (props.overlay) {
    
        return (
            <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            transition={{duration: 0.15}}
                className="labels"
                onClick={handleClick}>
                <p
                    style={{
                    color: props.color
                        ? colorMap[props.color]
                        : colorMap["r"]
                }}
                    className="object-label">
                    {props.inventionsA[props.inventionIndex]}

                </p>
                <p className="lower-label">
                    {props.inventionsB[props.inventionIndex]}

                </p>
                <p className="lower-label">
                    ↺
                </p>

            </motion.div>
        )
    } else {

   

        return (
            <div
                className="labels"
                onClick={handleClick}>
                <p
                  
                    className="object-label">
                    Tap Here
                </p>
                <p className="lower-label">
                    to reimagine what you see.
                </p>
                <p className="lower-label">
                    ↺
                </p>

            </div>
        )
    }
}
export default Reimaginings;