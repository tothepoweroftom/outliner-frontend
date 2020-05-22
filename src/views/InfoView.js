import React from 'react';
import {motion} from "framer-motion"
import {Link, useHistory} from "react-router-dom";

import close from '../assets/icon-Close.png'
function InfoView() {
    const history = useHistory();
    function navigateToHome() {
        history.goBack()
      }
    
    

    return(
        <div className="info container">
            <div className="navbar">
                <motion.div onClick={navigateToHome} whileTap={{scale:0.8}}>

                    <img src={close}></img>   
             
                </motion.div>
            </div>
            <div className="info-text-div">
            <p
                  style={{width: "50%", fontWeight:"bold"}}
                  className="object-label">
                  This is an experiment
              </p>
              <p style={{margin: "0px !important"}} className="lower-label">
                that reimagines possibilities about what it sees.
                </p>
                <p className="lower-label">
                It’s our imagnifying glass.
                </p>
                <p className="lower-label" style={{marginBottom: "0px !important"}}>
                It is infused by our selection of articles and essays around Design Fiction. 
                </p>
                <br/>

                <p style={{margin: "0px !important"}} className="lower-label">
                    <a target="_blank" href="https://fabalternatives.design">Part of Fabricating Alternatives</a>
                </p>
                <p  style={{margin: "0px !important"}} className="lower-label">
                    <a target="_blank" href="https://imaginationofthings.com">Created by Imagination of Things</a>
                </p>
            </div>

        

        </div>

    )

}

export default InfoView