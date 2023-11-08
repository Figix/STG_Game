import { context } from "./GameLoop.js"

const myColor = [
    'red',  
    'orange',
    'yellow',
]

class Enemy{
    constructor(originX,originY,vec_x,vec_y,HP, vecmel){
        this.pos_x = originX;
        this.pos_y = originY;
        this.vecmel = vecmel;
        this.vec_x = vec_x;
        this.vec_y = vec_y;
        this.HP = HP;
        this.color = myColor[this.HP-1];
        this.radius = this.HP*6;
    }
    move(){
        this.pos_x = this.pos_x + this.vec_x*this.vecmel;
        this.pos_y = this.pos_y + this.vec_y*this.vecmel;
    }
    draw()
    {
        context.beginPath();
            context.arc(this.pos_x, this.pos_y, this.radius, 0, 2*Math.PI);
            context.fillStyle = this.color;
            context.fill();
        context.closePath();
    }
    HPDown(){
        this.HP -= 1
        if(this.HP <= 0){
            this.HP = 0
            this.color = myColor[this.HP]
            return true;
        }
        this.radius = this.HP*6
        this.color = myColor[this.HP-1]
    }
}

class EnemyManager{
    constructor(){
        this.enemys = new Array(5);
        for(let i in this.enemys){
            this.enemys[i] = null;
        }
    }
    create(originX, originY, vecX, vecY, HP, vecmel){
        for(let q=0; q<this.enemys.length ; q++){
            if(!this.enemys[q]){
               this.enemys[q] = new Enemy(originX, originY, vecX, vecY, HP, vecmel);
               break;
            }
        }
    }
    delete(index){
        delete this.enemys[index];
    }

    outcheck(){
        let count = 0;
        for(let q in this.enemys){
            if(this.enemys[q].pos_x < 0-50 || this.enemys[q].pos_x > 50+640){
                this.delete(q);
            } else if(this.enemys[q].pos_y < 0-50 || this.enemys[q].pos_y > 50+480){
                this.delete(q);
            }
        }
    }

    
    reset(){
        for(let i in this.enemys){
            this.delete(i)
        }
    }
        
}

export{EnemyManager}

function rand(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}