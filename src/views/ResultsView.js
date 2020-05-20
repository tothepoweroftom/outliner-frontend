import React from 'react';
import {motion} from "framer-motion"
import ExtraWords from '../data/BackupData'
import * as RiTa from 'rita'

function ListItem(props) {
  // Correct! There is no need to specify the key here:
  return <li>{props.value}</li>;
}

function NumberList(props) {
  const labels = props.labels;
  const listItems = labels ? labels.map((label) =>
    // Correct! Key should be specified inside the array.
    <ListItem key={label}              value={label} />

  ):null;
  return (
    <ul>
      {listItems}
    </ul>
  );
}

const numbers = [1, 2, 3, 4, 5];

class ResultsView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null,
            labels: null, 
            bagofwords: null, 
            inventions: [], 
            inventionIndex: 0,
        };
    }
    componentDidMount() {
        this.setState({
            image: localStorage.image
                ? localStorage.image
                : null
        })
        this.setState({
            labels: localStorage.labels
                ? JSON.parse(localStorage.labels)
                : null
        })
        this.drawImageToCanvas()
    }

    getWords(){
      let labels;
      let bagofwords = {}
      if(this.state.labels) {
        // console.log(this.state.labels)
        labels =  this.state.labels.labels.map((label) => {
          console.log(label)
         let tags =  RiTa.getPosTags(label, true)
          console.log(tags)
          tags.forEach((tag)=>{
            if(bagofwords[tag]){
              bagofwords[tag].push({word: label, tag: tag})
            } else {
              bagofwords[tag] = []
              bagofwords[tag].push({word: label, tag: tag})
  
            }
          })
    
         })
// 
        if(this.state.labels.objects) {
          this.state.labels.objects.map((obj) => {
            console.log(obj.name)
           let tags =  RiTa.getPosTags(obj.name, true)
            console.log(tags)
            tags.forEach((tag)=>{
              if(bagofwords[tag]){
                bagofwords[tag].push({word: obj.name, tag: tag})
              } else {
                bagofwords[tag] = []
                bagofwords[tag].push({word: obj.name, tag: tag})
    
              }
            })
           })
        }
// OCR
        if(this.state.labels.ocr) {
          this.state.labels.ocr.forEach((obj, index) => {
            console.log(obj)
            if(index>0 && obj.length>5){
              let tags =  RiTa.getPosTags(obj, true)
                console.log(tags)
                tags.forEach((tag)=>{
                  if(bagofwords[tag]){
                    bagofwords[tag].push({word: obj, tag: tag})
                  } else {
                    bagofwords[tag] = []
                    bagofwords[tag].push({word: obj, tag: tag})
        
                  }
                })
            }
           })
          
        }
        console.log(bagofwords)
      }

      if(Object.keys(bagofwords).length>0){
        this.formInventions(bagofwords)
        this.setState({bagofwords: bagofwords})
      }


    }

    isVowel(word) {
      return /^[aeiou]$/.test(word[0].toLowerCase())?`an ${word}`:`a ${word}`;
  }

    formInventions(bagofwords) {
      console.log(bagofwords['n'])

      let inventions = []
      
      for(let i=0;i<15;i++){
        let sentence = `It's a `
        let randomNoun = bagofwords['n'][Math.floor(Math.random()*bagofwords['n'].length)].word
        randomNoun = randomNoun.toLowerCase()
        sentence += `${randomNoun} `

        let randomVerb = ExtraWords['vbz'][Math.floor(Math.random()*ExtraWords['vbz'].length)]
        sentence += `that ${randomVerb} `

        let randomAdjective = ExtraWords['jj'][Math.floor(Math.random()*ExtraWords['jj'].length)]
        randomAdjective = this.isVowel(randomAdjective)
        sentence += `${randomAdjective} `

        randomNoun = bagofwords['n'][Math.floor(Math.random()*bagofwords['n'].length)].word
        randomNoun = randomNoun.toLowerCase()
        sentence += `${randomNoun} `

        console.log(sentence)
        inventions.push(sentence)

      }

      this.setState({inventions: inventions})

    }

    drawImageToCanvas() {
        let targetWidth, targetHeight;
        if(window.innerWidth>768){
          targetWidth = window.innerWidth*0.5
          targetHeight = targetWidth*(0.75)
        } else {
          targetWidth = window.innerWidth*0.9
          targetHeight = window.innerHeight*0.5
        }
   

        var canvas = document.getElementById("photo-canvas");
        canvas.width = targetWidth * window.devicePixelRatio;
        canvas.height = targetHeight * window.devicePixelRatio;
        var ctx = canvas.getContext("2d");
        canvas.width = targetWidth * window.devicePixelRatio;
        canvas.height = targetHeight * window.devicePixelRatio;
        canvas.style.width = `${targetWidth}px`;
        canvas.style.height = `${targetHeight}px`;
        // ctx.canvas.height = window.innerHeight;

        var image = new Image();
        image.src = localStorage.image

        image.onload =  () => {
          console.log(image.width, image.height)

          let xFactor = image.width/canvas.width
          let yFactor = image.height/canvas.height

          ctx.drawImage(
            image, 0, 0, 
            image.width * window.devicePixelRatio * xFactor, 
            image.height * window.devicePixelRatio * yFactor
          );
            console.log(this.state.labels)
            this.getWords()


            // for(let i=0; i<this.state.labels.objects.length; i++){
            //   ctx.strokeStyle = "#FF0000";
            //   let vertices = this.state.labels.objects[i].vertices
            //   let name = this.state.labels.objects[i].name;
            //   let width = parseFloat(vertices[1].x) - parseFloat(vertices[0].x)
            //   let height = parseFloat(vertices[2].y) - parseFloat(vertices[0].y) 
            //   ctx.beginPath()

            //   ctx.arc(parseFloat(vertices[0].x)*xFactor + width*0.5*xFactor, parseFloat(vertices[0].y)*yFactor + height*0.5*yFactor, 10,0, 2 * Math.PI);
            //   ctx.fillStyle = "#00aaa0";

            //   ctx.fill()
            //   ctx.fillStyle = "#FFFFFFaa";
            //   ctx.fillRect(parseFloat(vertices[0].x)*xFactor + width*0.5*xFactor, parseFloat(vertices[0].y)*yFactor + height*0.5*yFactor - 30, 100, 30);
            //   ctx.fillStyle = "#000000";
            //   ctx.font = "20px Verdana";
            //   ctx.fillText(name, parseFloat(vertices[0].x)*xFactor + width*0.5*xFactor, parseFloat(vertices[0].y)*yFactor + height*0.5*yFactor - 10);

            //   ctx.fillStyle = "#FFFFFF40";


            // }
        

        };
        // canvas.

        
    }

    handleClick() {
      this.setState({inventionIndex: (this.state.inventionIndex+1)%this.state.inventions.length})
    }
    render() {
 
        return (
            <div className="results-container">
              
              <canvas id="photo-canvas"></canvas>

              
                <div className="labels" onClick={this.handleClick.bind(this)}>

                  {this.state.inventions[this.state.inventionIndex]}
               
                </div>
            </div>
        )
    }
}

export default ResultsView;