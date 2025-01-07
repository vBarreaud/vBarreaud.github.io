
import {SimpleShape} from "./modules/example.js"


window.addEventListener("DOMContentLoaded",init)


const shapes = new Set();

function playAnimation(){
    for(const aShape of shapes){
        aShape.play();
    }
}
function stopAnimation(){
    for(const aShape of shapes){
        aShape.stop();
    }
}

function init(){
    const theSVG = document.getElementById("SVG_id");
    const thePlayPauseBtn = document.getElementById("playPauseBtn_id");
    thePlayPauseBtn.addEventListener(
        "click",
        function(evt){ //Attention, si on utilise une arrowFunction, on ne pourra pas utiliser "this"
            if(this.innerText=="Pause"){ //ici, "this" pointe sur le boutton.
                this.innerText="Play";
                stopAnimation();
            }else{
                this.innerText="Pause";
                playAnimation();
            }
        })
    
    for(let i=0;i<10;i++){
        const myShape = new SimpleShape(theSVG);
        shapes.add(myShape);
        myShape.draw();
    }
    

}