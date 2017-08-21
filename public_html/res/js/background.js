const BACK_FRAME_RATE = 60;
const STARS_PER_PX = 0.0005;
const MIN_STAR_SIZE = 1;
const MAX_STAR_SIZE = 5;
const MIN_STAR_SPEED = 0.1;
const MAX_STAR_SPEED = 0.5;
var STAR_COUNT;
var bkMgr;
window.onload = backgroundSetup;
function draw() {
    bkMgr.draw();
}
function backgroundSetup() {
    bkMgr = new BackgroundManager();
    window.setInterval(draw, 1000 / BACK_FRAME_RATE);
}
function randIn(min, max) {
    return min + (Math.random() * (max - min));
}
class BackgroundManager {
    constructor() {
        this.back = document.getElementById("backCanvas");
        if (this.back) {
            console.log("Successful background canvas load");
        }
        this.ctx = this.back.getContext("2d");
        this.back.width = document.body.scrollWidth;
        this.body = document.body,
                this.html = document.documentElement;
        this.height = Math.max(this.body.scrollHeight, this.body.offsetHeight,
                this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight);
        this.width = Math.max(this.body.scrollWidth, this.body.offsetWidth,
                this.html.clientWidth, this.html.scrollWidth, this.html.offsetWidth);
        this.back.height = this.height;
        this.back.width = this.width;
        this.back.style.width = this.width + "px";
        this.back.style.height = this.height + "px";
        STAR_COUNT = Math.round(document.body.offsetWidth * document.body.offsetHeight * STARS_PER_PX);
        this.stars = [];
        for (let i = 0; i < STAR_COUNT; i++) {
            this.stars.push(new Star(this));
        }
    }
    draw() {
        STAR_COUNT = document.body.width * document.body.height * STARS_PER_PX;
        if (this.stars.length < STAR_COUNT) {
            for (let i = this.stars.length; i < STAR_COUNT; i++) {
                this.stars.push(new Star(this));
            }
        }

        this.body = document.body,
                this.html = document.documentElement;
        this.back.style.width = "0px";
        this.back.style.height = "0px";
        this.height = Math.max(this.body.scrollHeight, this.body.offsetHeight,
                this.html.clientHeight, this.html.scrollHeight, this.html.offsetHeight);
        this.width = Math.max(this.body.scrollWidth, this.body.offsetWidth,
                this.html.clientWidth, this.html.scrollWidth, this.html.offsetWidth);
        this.back.height = this.height;
        this.back.width = this.width;
        this.back.style.width = this.width + "px";
        this.back.style.height = this.height + "px";
        for (let i = this.stars.length - 1; i >= 0; i--) {
            if (this.stars[i].y+this.stars[i].rad <= 0 & this.stars.length > STAR_COUNT) {
                this.stars.remove(i);
            }
            this.stars[i].draw();
        }
    }
}
class Star {
    constructor(bkMgr) {
        this.bkMgr = bkMgr;
        this.x = randIn(0, bkMgr.width);
        this.y = randIn(0, bkMgr.height);
        this.rad = randIn(MIN_STAR_SIZE, MAX_STAR_SIZE);
        this.dy = -1 * randIn(MIN_STAR_SPEED, MAX_STAR_SPEED);
    }

    draw() {
        this.update();
        this.render();
    }
    update() {
        this.y += this.dy;
        if (this.y+this.rad <= 0) {
            this.y = this.bkMgr.height+this.rad;
            this.x = randIn(0, this.bkMgr.width);
        }
    }
    render() {

        let grd = this.bkMgr.ctx.createRadialGradient(this.x, this.y, MIN_STAR_SIZE, this.x, this.y, this.rad);
        grd.addColorStop(0, "white");
        grd.addColorStop(1, "rgba(0,0,0,0)");

        // Fill with gradient
        this.bkMgr.ctx.beginPath();

        this.bkMgr.ctx.fillStyle = grd;
        this.bkMgr.ctx.arc(this.x, this.y, this.rad, 0, 2 * Math.PI);
        this.bkMgr.ctx.fill();
    }
}
