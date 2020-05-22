import React from 'react';
import logo from '../logo.svg';
import {Link} from 'react-router-dom'
import axios from 'axios'
import {useHistory} from "react-router-dom";
import "../components/loading-spinner.css"

function Navbar(props) {

    return (
        <div className="navbar">
            <Link to="/info">
            <button className="info-button">
                ?
            </button>
        </Link>
        </div>
    )


}

export default Navbar