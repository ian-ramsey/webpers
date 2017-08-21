function randIn(min, max) {
    return min + (Math.random() * (max - min));
}
function getRandomColor(){
    let hexcodes = "0123456789abcdef";
    let color = "#";
    for(let i=0;i<6;i++){
        color+=hexcodes[Math.floor(randIn(0,6))];
    }
    return color;
}