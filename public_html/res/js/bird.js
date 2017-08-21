/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
const BIRD_FRAME_RATE=60;
const BIRD_COUNT=100;
var bdMgr;
function birdDraw() {
    bdMgr.draw();
}
function birdSetup() {
    bdMgr = new BirdManager();
    window.setInterval(birdDraw, 1000 / BIRD_FRAME_RATE);
}


class BirdManager{
    constructor(){
      this.canvas = document.getElementById("birdCanvas");
      this.canvas.width=this.canvas.style.width;
      this.canvas.height=this.canvas.style.height;
      this.ctx = this.canvas.getContext("2d");
      this.birds = [];
      for(let i=0;i<BIRD_COUNT;i++){
          this.birds.push(new Bird(this));
      }
    }
    draw(){
        for(let i=0;i<this.birds.length;i++){
            this.birds[i].draw();
        }
    }
}
const BIRD_MAX_SIZE = 20;
const BIRD_MIN_SIZE = 15;
const HEADRAD_FRAC = 0.2;
class Bird{

    constructor(birdMgr){
        this.mgr = birdMgr;
        this.height=randIn(BIRD_MIN_SIZE,BIRD_MAX_SIZE);
        this.length=randIn(BIRD_MIN_SIZE,BIRD_MAX_SIZE);
        this.faceDir=(randIn(0,2));
        this.x=randIn(0,this.mgr.canvas.width);
        this.y=0;
        this.headX=this.x+this.HEADRAD_FRAC*this.length;
        this.headY=this.y+this.HEADRAD_FRAC*this.height;
        this.headRad=
        this.bodyClr = getRandomColor();
    }
    draw(){
        this.update();
        this.render();
    }
    update(){
        this.headX=this.x+this.HEADRAD_FRAC*this.length;
        this.headY=this.y+this.HEADRAD_FRAC*this.height;
    }
    render(){
        this.mgr.ctx.beginPath();
        this.mgr.ctx.arc(this.headX,this.headY,this.headRad,,)
    }
}
birdSetup();
