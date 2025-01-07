

function random(max){
    return Math.floor(Math.random() * max);
}


class SimpleShape{
    constructor(svgElt){
        this.svgElt=svgElt;
       
        const x0 = Math.floor(svgElt.width.baseVal.value/2);
        const y0 = Math.floor(svgElt.height.baseVal.value/2);
        this.coordinates = {};

        this.coordinates.x=x0+(-1)*Math.floor(Math.random() * 2)*random(Math.floor(x0/10));
        this.coordinates.y=y0+(-1)*Math.floor(Math.random() * 2)*random(Math.floor(y0/10));

        this.dx = (-1)*Math.floor(Math.random() * 2)*random(Math.floor(x0/10));
        this.dy = (-1)*Math.floor(Math.random() * 2)*random(Math.floor(y0/10));

        this.elt = document.createElementNS("http://www.w3.org/2000/svg","rect");
        this.elt.setAttribute("width",20);
        this.elt.setAttribute("height",20);
        this.elt.setAttribute("x",this.coordinates.x);
        this.elt.setAttribute("y",this.coordinates.y);
        this.elt.setAttribute("fill","red");

    }
    draw(){
        this.svgElt.appendChild(this.elt);
    }
    play(){
        if(this.animation == null) {
            this.animation = setInterval(()=>{this.animate()}, 1000);//arrowFunction : this pointe bien vers le contexte de l'objet Shape, pas sur la callback...
          }
    }
    stop(){
        if(this.animation != null) {
            clearInterval(this.animation);
            this.animation = null;
          }
    }
    animate(){
        //throw new Error("animate method is not implemented yet.");
        this.coordinates.x = this.coordinates.x + this.dx;
        this.coordinates.y = this.coordinates.y + this.dy;
        this.elt.setAttribute("x",this.coordinates.x);
        this.elt.setAttribute("y",this.coordinates.y);
    }
}


export {SimpleShape};