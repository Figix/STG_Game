import { context } from "./GameLoop.js"

var GameStartimg = new Image()
var GameOverimg = new Image()

GameStartimg.src = "images/GameStart.png";
GameOverimg.src = "images/GameOver.png";

const state  = {
    GameStart : 1,
    inGame : 2,
    GameOver : 3,
}

class GameManager{
    constructor(){
        this.GameState = state.GameStart 
        this.Score = 0
        this.GameStartimg = new Image()
        this.GameOverimg = new Image()

        this.GameStartimg.src = "images/GameStart.png";
        this.GameOverimg.src = "images/GameOver.png";
    }
    toGameStart(){
        this.GameState =state.GameStart
    }

    toinGame(){
        this.GameState =state.inGame
    }
    toGameOver(){
        this.GameState=state.GameOver
    }
    upScore(){
        this.Score += 1
    }
    zeroScore(){
        this.Score = 0
    }

    Draw(){
        if(this.GameState == state.GameStart) {
            context.drawImage(this.GameStartimg,0,0)
        }
        if(this.GameState == state.GameOver) {
            context.drawImage(this.GameOverimg,0,0)
            context.textAlign = "center"
            context.font = "normal bold 40px Arial" 
            context.fillStyle = "white";
            context.fillText("Score : "+this.Score.toString(), 320, 40)
        }
    }
    reGame(){
        if(spacePressed){
            this.toinGame()
            this.zeroScore()
            return true
        }
    }   
}

export{GameManager, state}

var spacePressed = false;

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);
// target.addEventListener(type, listener[, useCapture]);
// useCapture true 이면, Capturing 방식으로 이벤트가 전달되며, false 이며, Bubling 방식으로 이벤트가 전달된다. 기본값은 false이다.
// Capturing(부모 객체부터 자식 객체로), Bubbling(자식 객체에서 부모 객채로)
// Event객체의 event.preventDefault() 함수는 기본 이벤트 핸들러의 동작을 막는다.

// 키보드가 눌렸을 때 일어나는 함수 (매개변수: e [이 때 e는 이벤트를 의미함])
// 각 방향키의 keycode와 방향이 맞다면, 해당 변수들 true 
function keyDownHandler(e) {
	if(e.keyCode == 32) {       //w:87
        spacePressed = true;
	}
}
function keyUpHandler(e) {
    if(e.keyCode == 32) {       //w:87
        spacePressed = false;
	}
}