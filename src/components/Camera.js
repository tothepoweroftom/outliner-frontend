import React from 'react';
import CameraPhoto, { FACING_MODES } from 'jslib-html5-camera-photo';
import {motion} from "framer-motion"

class Camera extends React.Component {
  constructor (props, context) {
    super(props, context);
    this.cameraPhoto = null;
    this.videoRef = React.createRef();
    this.state = {
      dataUri: ''
    }



  }

  componentDidMount () {
    // We need to instantiate CameraPhoto inside componentDidMount because we
    // need the refs.video to get the videoElement so the component has to be
    // mounted.
    this.cameraPhoto = new CameraPhoto(this.videoRef.current);
    let facingMode = FACING_MODES.ENVIRONMENT;
    let idealResolution = { width: 640, height: 480 };
    this.startCamera(facingMode, idealResolution);
  }

  startCamera (idealFacingMode, idealResolution) {
    this.cameraPhoto.startCamera(idealFacingMode, idealResolution)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }

  startCameraMaxResolution (idealFacingMode) {
    this.cameraPhoto.startCameraMaxResolution(idealFacingMode)
      .then(() => {
        console.log('camera is started !');
      })
      .catch((error) => {
        console.error('Camera not started!', error);
      });
  }

  takePhoto () {
    const config = {
      sizeFactor: 1
    };

    let dataUri = this.cameraPhoto.getDataUri(config);
    this.setState({ dataUri });
    this.props.handlePhoto(dataUri)

  }

  stopCamera () {
    this.cameraPhoto.stopCamera()
      .then(() => {
        console.log('Camera stoped!');
      })
      .catch((error) => {
        console.log('No camera to stop!:', error);
      });
  }

  render () {
    return (
      <div className="camera">
   


 

   
        <div id="video-container">
        <video
          ref={this.videoRef}
          playsInline={true}
          autoPlay={true}
        />
        </div>
        <div style={{height: "20px"}}>

        </div>
        <motion.button whileTap={{scale: 0.8}} className="shutter" onClick={ () => {
          this.takePhoto();
        }}> <svg xmlns="http://www.w3.org/2000/svg" width="42" height="34" viewBox="0 0 42 34">
        <path d="M 9.996 3.096 L 13.622 0.5 L 28.378 0.5 L 32.004 3.096 C 32.098 3.164 32.176 3.249 32.233 3.345 L 37.46 3.345 C 39.967 3.345 42 5.377 42 7.885 L 42 28.96 C 42 31.467 39.967 33.5 37.46 33.5 L 4.54 33.5 C 2.033 33.5 0 31.467 0 28.96 L 0 7.885 C 0 5.377 2.033 3.345 4.54 3.345 L 9.767 3.345 C 9.824 3.249 9.902 3.164 9.996 3.096 Z M 12.486 18.707 C 12.486 23.42 16.298 27.241 21 27.241 C 25.702 27.241 29.514 23.42 29.514 18.707 C 29.514 13.993 25.702 10.172 21 10.172 C 16.298 10.172 12.486 13.993 12.486 18.707 Z" fill="rgba(24, 24, 24, 1.00)"></path>
      </svg> </motion.button>

 
      </div>
    );
  }
}

export default Camera;