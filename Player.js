import { context } from "./GameLoop.js"

var myColor = [
    'mediumorchid',
    'darkorchid',
    'blueviolet',
    'darkviolet',
    'mediumpurple',
    'slateblue',
    'purple',
    'darkmagenta',
    'darkslateblue',
    'indigo'
]

class Player{
    constructor(x,y,radius)
    {
        this.pos_x = x;
        this.pos_y = y;
        this.radius = radius;
        this.HP = 10;
        this.color = myColor[this.HP-1]
    }
    move(){
        if(rightPressed){
            this.pos_x+=5;
            if(this.pos_x > 640-this.radius){
                this.pos_x=640-this.radius;
            }
        } if(leftPressed){
            this.pos_x-=5;
            if(this.pos_x < 0+this.radius){
                this.pos_x=0+this.radius;
            }
        } if(upPressed){
            this.pos_y-=5;  //캔버스가 커질수록 아래로감
            if(this.pos_y < 0+this.radius){
                this.pos_y=0+this.radius;
            }
        } if(downPressed){
            this.pos_y+=5;  //캔버스가 작아질수록 위로감
            if(this.pos_y > 480-this.radius){
                this.pos_y=480-this.radius;
            }
        }
    }
    draw()
    {
        context.beginPath();
            context.arc(this.pos_x,this.pos_y,this.radius,0,2*Math.PI)
            context.fillStyle = this.color;
            context.fill()
        context.closePath();
        context.textAlign = "center"
        context.font = "normal bold 15px Arial" 
        context.fillStyle = "white";
        context.fillText(this.HP.toString(),this.pos_x,this.pos_y+5)
    }
    HPDown(dmg){
        this.HP -= dmg
        console.log(this.HP)
        if(this.HP <= 0){
            this.HP = 0
            this.color = myColor[this.HP]
            return true;
        }
        this.color = myColor[this.HP-1]
    }
    reset(){
        this.HP = 10
        this.pos_x = 320
        this.pos_y = 240
    }
}

export{Player}

var rightPressed = false;
var leftPressed = false;
var upPressed = false;
var downPressed = false;

// 먼저 눌린 키를 수신할 이벤트 리스너 필요
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// target.addEventListener(type, listener[, useCapture]);
// useCapture true 이면, Capturing 방식으로 이벤트가 전달되며, false 이며, Bubling 방식으로 이벤트가 전달된다. 기본값은 false이다.
// Capturing(부모 객체부터 자식 객체로), Bubbling(자식 객체에서 부모 객채로)
// Event객체의 event.preventDefault() 함수는 기본 이벤트 핸들러의 동작을 막는다.

// 키보드가 눌렸을 때 일어나는 함수 (매개변수: e [이 때 e는 이벤트를 의미함])
// 각 방향키의 keycode와 방향이 맞다면, 해당 변수들 true 
function keyDownHandler(e) {
	if(e.keyCode == 87) {       //w:87
        upPressed = true;
	}
	if(e.keyCode == 83) {       //s:83
        downPressed = true;
    }
    if(e.keyCode == 65) {       //a:65
        leftPressed = true;
    }
    if(e.keyCode == 68) {       //d:68
        rightPressed = true;
    }
}
 
 
// 키보드가 안 눌렸을 때 일어나는 함수 (매개변수: e)
// 각 방향키의 keycode와 방향이 맞다면, 해당 변수들 false > 초기화
function keyUpHandler(e) {
    if(e.keyCode == 87) {       //w:87
        upPressed = false;
	}
	if(e.keyCode == 83) {       //s:83
        downPressed = false;
    }
    if(e.keyCode == 65) {       //a:65
        leftPressed = false;
    }
    if(e.keyCode == 68) {       //d:68
        rightPressed = false;
    }
}