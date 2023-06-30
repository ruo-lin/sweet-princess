
//pineapple-draw
'use strict'
const canvas=document.querySelector('#draw');
const colorPick = document.getElementById('color');
const clear = document.getElementById('clear');
const ctx=canvas.getContext('2d');
colorPick.value = "black";
let color=colorPick.value;
let isDrawing=false;
let lastX=0;
let lastY=0;
ctx.lineJoin = 'round';
ctx.lineCap = 'round';
ctx.lineWidth = 15;

function draw(e){
if(!isDrawing)return;
ctx.strokeStyle=color;
ctx.beginPath();
ctx.moveTo(lastX,lastY);
ctx.lineTo(e.offsetX,e.offsetY);
ctx.stroke();
[lastX,lastY] = [e.offsetX,e.offsetY];     
}
        
canvas.addEventListener('mousedown',function(e){
isDrawing=true;
console.log(isDrawing);
[lastX,lastY] = [e.offsetX,e.offsetY]; 
});

canvas.addEventListener('mousemove',draw);
canvas.addEventListener('mouseup',function(){
isDrawing = false
});

canvas.addEventListener('mouseout',function(){
isDrawing = false
});

colorPick.addEventListener('change',(e)=>color=e.target.value);
clear.addEventListener('click',()=>ctx.clearRect(0,0,canvas.width,canvas.height));



//pineapple-music
function playSound(e) {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    console.log(audio);
    if (!audio) {
        return;
    } else {
        key.classList.add("playing");
        audio.currentTime = 0;
        audio.play();
    };
};
function removeTransition(e) {
    if (e.propertyName !== 'transform') {
        return;
    } else {
        e.target.classList.remove('playing');
    };
};
const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));
window.addEventListener('keydown', playSound);
