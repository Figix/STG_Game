var canvas = document.getElementById('game');
var context = canvas.getContext('2d');
export{context};

import { Player } from "./Player.js"
import { BulletManager } from "./Bullet.js"
import { EnemyManager } from "./Enemy.js"
import { GameManager,state } from "./Gamemanager.js"

var PL = new Player(320,240,20);
var BM = new BulletManager()
var EM = new EnemyManager()
var GM = new GameManager()

var loopcounter = 0;

var fps = 60;
var lastTime = Date.now();
var interval = 1000 / fps;

function loop() {
    var currentTime = Date.now();
    var deltaTime = currentTime - lastTime;

    // Update and render here
    update()
    rendering()

    lastTime = currentTime;

    interval = 1000 / fps - deltaTime;

    if (interval < 0) { //loop가 원하는 fps보다 낮은 fps가 나오면 음수가 나오기에 바로 실행할 수 될 수 있기에 0으로 초기화
        interval = 0;
    }

    setTimeout(loop, interval);
}

loop(); // 루프 시작

function update(){
    if(GM.GameState == state.inGame){
        allObjectmove()
        allObjectoutcheck()

        allisCollision()
        if(++loopcounter >= fps/2){
            Enemycreater()
            loopcounter=0;
        }
    }
    else{
        allreset()

        if(GM.reGame()){
            GM.zeroScore()
        }
    }
}
function rendering(){
    if(GM.GameState == state.inGame){
        reDrawCanvas();

        allObjectDraw();
    }
    else{
        GM.Draw()
    }
}

//Update functions
function allObjectmove(){
    PL.move();
    for(var i in BM.bullets){
        BM.bullets[i].move();
    }
    for(let i in EM.enemys){
        EM.enemys[i].move();
    }
}
function allObjectoutcheck(){
    BM.outcheck()
    EM.outcheck()
}
function Enemycreater(){
    let rndX, rndY;
    switch(rand(0,3)){
        case 0:
            rndX=rand(0,640)
            rndY=0
            break;
        case 1:
            rndX=640
            rndY=rand(0,480)
            break;
        case 2:
            rndX=rand(0,680)
            rndY=480
            break;
        case 3:
            rndX=0
            rndY=rand(0,480)
            break;
        default:
            break;
    }
    let dis = Math.sqrt(Math.pow((rndX-PL.pos_x), 2) + Math.pow(rndY-PL.pos_y, 2));
    let vec_x = (PL.pos_x-rndX) / dis;
    let vec_y = (PL.pos_y-rndY) / dis;
    EM.create(rndX, rndY, vec_x, vec_y, rand(1,3), rand(3,5)) //속도, 체력
}
function allreset(){
    PL.reset()
    BM.reset()
    EM.reset()
}

function allisCollision(){
    for(let i in EM.enemys){ //Player
        if(!EM.enemys[i]) {continue;}
        if(isCollision(EM.enemys[i].pos_x,EM.enemys[i].pos_y,EM.enemys[i].radius, 
            PL.pos_x,PL.pos_y,PL.radius)){
            if(PL.HPDown(EM.enemys[i].HP)){
                GM.toGameOver()
            }
            EM.delete(i) 
            continue;
        }
        if(!EM.enemys[i]) {continue;}
        for(let j in BM.bullets){
            if(!BM.bullets[j]) {continue;}
            if(isCollision(EM.enemys[i].pos_x,EM.enemys[i].pos_y,EM.enemys[i].radius, 
                BM.bullets[j].pos_x, BM.bullets[j].pos_y, BM.bullets[j].radius)) {
                BM.delete(j)
                if(EM.enemys[i].HPDown()){
                    EM.delete(i);
                    GM.upScore();
                }
            }
        }
    }
}

function isCollision(target1_pos_x,target1_pos_y,target1_radius,target2_pos_x,target2_pos_y,target2_radius){
    let dis = Math.pow(target1_pos_x-target2_pos_x, 2) + Math.pow(target1_pos_y-target2_pos_y, 2);
    //두 원의 좌표 2개를 잡아 거리를 잡음 이때 제곱근으로 나누는게 맞지만 제곱근 연산을 많이 먹어서 제곱근을 안하고 처리함
    let doubleR = Math.pow(target1_radius+target2_radius, 2);
    //두원의 반지름의 합산값 => 두원이 맞닿아 있을 때 최대치값
    if(dis < doubleR){ return true; }
    // 거리가 최대치값보다 낮다면 겹쳐있는 상태이다. 즉 충돌중인 상태
}

//Rendering functions
function reDrawCanvas(){
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);
}
function allObjectDraw(){
    PL.draw();
    for(let i in BM.bullets){
        BM.bullets[i].draw()
    }
    for(let i in EM.enemys){
        EM.enemys[i].draw();
    }
}
//event listner
canvas.onclick = function(event){
    let clickpos_x = event.clientX -context.canvas.offsetLeft;
    let clickpos_y = event.clientY -context.canvas.offsetTop;

    let dis = Math.sqrt(Math.pow((clickpos_x-PL.pos_x), 2) + Math.pow(clickpos_y-PL.pos_y, 2));
    //도착점-시작점으로 계산해서 총알의 벡터를 구함
    //피타고라스 정리를 통한 두 점의 거리를 계산한다.
    let vec_x = (clickpos_x-PL.pos_x) / dis;
    let vec_y = (clickpos_y-PL.pos_y) / dis;
    // 총알의 벡터/계산된 거리값 = 단위 벡터 이다. 1단위 벡터로 만들었기에 1만큼의 거리를 가는 동일 방향 벡터값을 얻었다.

    //메모리에 객체 넣기 완료
    // bullets.push(new bullet(char_player.pos_x, char_player.pos_y, vec_x, vec_y, 5, 5, 'pink'));
    BM.create(PL.pos_x, PL.pos_y, vec_x, vec_y)
}; 
//범위 지정 랜덤함수
function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}