const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

let ArrayParticles = [];
//let Arraycircles = [];

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;


//ctx.fillStyle = 'white'

/*class circle {
    constructor(i,j){
        this.cx = (i+1)(canvas.width/5) + canvas.width/10;
        this.cy = (j+1)(canvas.width/5) + canvas.width/10;
        this.d = (canvas.width/5)*0.8
        this.rayon = d/2;
    }

    
}*/


class particle /* extends circle*/ {

    constructor(angle,cx,cy){
        this.angle = angle;
        this.facteur = 0;
       // this.angle2 = facteur*angle;
        this.angle2 = 0;
        this.rayon = 750.
        this.cx = cx;
        this.cy = cy;
       // this.x = this.cx + this.rayon*Math.cos(angle);
       // this.y = this.cy + this.rayon*Math.sin(angle);
       // this.Fx = this.cx + this.rayon*Math.cos(this.angle2);
       // this.Fy = this.cy + this.rayon*Math.sin(this.angle2);

        this.x = 0;
        this.y = 0;
        this.Fx = 0;
        this.Fy = 0;
        
    }

    

    draw() {
        ctx.strokeStyle = 'white'
        ctx.lineWidth = 1 ;
        ctx.beginPath();
        ctx.moveTo(this.x,this.y)
        ctx.lineTo(this.Fx,this.Fy);
        ctx.stroke()
    }

    update(){
        this.facteur += 0.01;
        this.angle2 = Math.sqrt(this.facteur*this.angle);
        this.x = this.cx + this.rayon*Math.cos(this.angle);
        this.y = this.cy + this.rayon*Math.sin(this.angle);
        this.Fx = this.cx + this.rayon*Math.cos(this.angle2);
        this.Fy = this.cy + this.rayon*Math.sin(this.angle2);
    }
    

}

   
    class circle {

        constructor(){
            this.cx = canvas.width/2;
            this.cy = canvas.height/2;
        }
        
        init(){
            for (let i = 0; i < 100; i++) {
                ArrayParticles.push(new particle((i*Math.PI*2)/100,this.cx,this.cy))
                
            }
        }

    }

/*function handelCircles(){
    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 5; j++) {
           Arraycircles.push(new circle(i,j))
        }        
    }
}

function handelParticles(){
    handelCircles()
    Arraycircles.forEach( circle => {
        circle.init()
        ArrayParticles.forEach(particle => {
            particle.draw();
        })
    
    })
}
*/

function handeleParticle(){
   // ArrayParticles =[];
    var circle1 = new circle();
    circle1.init();
    for (let i = 0; i < 100; i++) {
        ArrayParticles[i].update();
        ArrayParticles[i].draw() ;
     }
     
}

function animate(){
    ctx.clearRect(0,0,canvas.width,canvas.height);
    // ctx.fillStyle = 'rgba(0,0,0,0.1)';
    //ctx.fillRect(0,0,canvas.width,canvas.height);
    // handelParticles();
    //console.log(ArrayParticles.length);
    
    handeleParticle();
    requestAnimationFrame(animate);

}

animate();