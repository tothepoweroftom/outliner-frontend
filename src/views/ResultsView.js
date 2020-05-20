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
        // //console.log(this.state.labels)
        labels =  this.state.labels.labels.map((label) => {
          //console.log(label)
         let tags =  RiTa.getPosTags(label, true)
          //console.log(tags)
          tags.forEach((tag)=>{
            if(bagofwords[tag]){
              if(!bagofwords[tag].includes(label)){
                bagofwords[tag].push( label)

              }            } else {
              bagofwords[tag] = []
              if(!bagofwords[tag].includes(label)){
                bagofwords[tag].push(label)

              }  
            }
          })
    
         })
// 
        if(this.state.labels.objects) {
          this.state.labels.objects.map((obj) => {
            //console.log(obj.name)
           let tags =  RiTa.getPosTags(obj.name, true)
            //console.log(tags)
            tags.forEach((tag)=>{
              if(bagofwords[tag]){
                if(!bagofwords[tag].includes(obj.name)){
                  bagofwords[tag].push(obj.name)

                }                
              } else {
                bagofwords[tag] = []
                if(!bagofwords[tag].includes(obj.name)){
                  bagofwords[tag].push(obj.name)

                }    
              }
            })
           })
        }
// OCR
        if(this.state.labels.ocr) {
          this.state.labels.ocr.forEach((obj, index) => {
            //console.log(obj)
            if(index>0 && obj.length>5){
              let tags =  RiTa.getPosTags(obj, true)
                ////console.log(tags)
                tags.forEach((tag)=>{
                  if(bagofwords[tag]){
                    if(!bagofwords[tag].includes(obj)){
                      bagofwords[tag].push(obj)

                    }
                  } else {
                    bagofwords[tag] = []
                    if(!bagofwords[tag].includes(obj)){
                      bagofwords[tag].push(obj)

                    }        
                  }
                })
            }
           })
          
        }
        // //console.log(bagofwords)
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
      //console.log(bagofwords['n'])

      let inventions = []
      
      for(let i=0;i<15;i++){
        let sentence = `It's a `

        let nounIndex = Math.floor(Math.random()*bagofwords['n'].length)
        let randomNoun = bagofwords['n'][nounIndex]
        randomNoun = randomNoun.toLowerCase()
        sentence += `${randomNoun} `

        let randomVerb = ExtraWords['vbz'][Math.floor(Math.random()*ExtraWords['vbz'].length)]
        sentence += `that ${randomVerb} `

        let randomAdjective = ExtraWords['jj'][Math.floor(Math.random()*ExtraWords['jj'].length)]
        randomAdjective = this.isVowel(randomAdjective)
        sentence += `${randomAdjective} `
        nounIndex = (nounIndex+1)%bagofwords['n'].length
        randomNoun = bagofwords['n'][nounIndex]
        randomNoun = randomNoun.toLowerCase()
        sentence += `${randomNoun} `

        // //console.log(sentence)
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
 
        var ctx = canvas.getContext("2d");
        canvas.width = targetWidth * window.devicePixelRatio;
        canvas.height = targetHeight * window.devicePixelRatio;
        canvas.style.width = `${targetWidth}px`;
        canvas.style.height = `${targetHeight}px`;
        // ctx.canvas.height = window.innerHeight;
        function scaleToFit(img){
            // get the scale
            var scale = Math.min(canvas.width / img.width, canvas.height / img.height);
            // get the top left position of the image
            var x = (canvas.width / 2) - (img.width / 2) * scale;
            var y = (canvas.height / 2) - (img.height / 2) * scale;
            ctx.drawImage(img, x, y, img.width * scale, img.height * scale);
        }
        var image = new Image();
        image.src = localStorage.baseImage

        image.onload =  () => {
          scaleToFit(image)
            this.getWords()
        };


        if(localStorage.image) {
          var image2 = new Image();
          image2.src = localStorage.image
  
          image2.onload =  () => {
            scaleToFit(image2)
              this.getWords()
          };
  
        }
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