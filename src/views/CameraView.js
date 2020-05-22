import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Camera from '../components/Camera'
import axios from 'axios'
import {useHistory} from "react-router-dom";
import Navbar from '../components/Navbar'
import "../components/loading-spinner.css"


const colorMap = {
    'r': '#D60000', 
    'b': '#2962FF',
    'y': '#FAF455'
}
function CameraView(props) {
    const history = useHistory();
    let [loading,
        setLoading] = React.useState(false)
    React.useEffect(() => {
        // Your code here
        props.colorCallback()
    }, []);
    function handleTakePhoto(dataUri) {
        // Do stuff with the photo...
        setLoading(true)
        console.log('takePhoto');
        // console.log(dataUri)
        let data = {
            "img": dataUri
        }
        var config = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
        axios
            // .post('http://0.0.0.0:8080/', data, config)
            .post('https://visionfa-idvgffrwca-ez.a.run.app/', data, config)
            .then(response => {
                console.log(response.data)
                localStorage.image = dataUri
                localStorage.baseImage = dataUri
                localStorage.labels = response.data.labels;
                // localStorage.ratio = history.push("/results");
                sendForAlpha(dataUri)

            })
    }

    function sendForAlpha(dataUri) {
        console.log("sending for alpha")
        let data = {
            "img": dataUri, 
            "color": props.color
        }
        var config = {
            headers: {
                'Access-Control-Allow-Origin': '*'
            }
        };
        axios
            // .post('http://0.0.0.0:8080/', data, config)
            .post('https://outliner-idvgffrwca-ez.a.run.app/', data, config)
            .then(response => {
                // console.log(response.data.image)
                localStorage.image = 'data:image/png;base64,' + response.data.image
                // localStorage.labels = response.data.labels;
                setLoading(false)

                history.push("/results");

            }).catch(()=>{
                setLoading(false)

                history.push("/results");
            })
    }

    if (loading) {
       
        return (
            <div style={{background: colorMap[props.color?props.color:'r']}} className="container loading">
                <div className="lds-ripple">
                    <div></div>
                    <div></div>
                </div>

                Reimagining...
            </div>
        )

    } else {

        return (
            <div className="container">
                <Navbar></Navbar>
                <Camera handlePhoto={handleTakePhoto}></Camera>
            </div>
        );
    }

}
export default CameraView;