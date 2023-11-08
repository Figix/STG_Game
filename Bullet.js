import { context } from "./GameLoop.js"

class Bullet{
    constructor(originX,originY,vec_x,vec_y,radius,vecmel,color){
        this.pos_x = originX;
        this.pos_y = originY;
        this.radius = radius;
        this.color = color;
        this.vecmel = vecmel;
        this.vec_x = vec_x;
        this.vec_y = vec_y;
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
}

class BulletManager{
    constructor(){
        this.bullets = new Array(4);
        for(let i in this.bullets){
            this.bullets[i] = null;
        }
    }
    create(originX, originY, vecX, vecY){
        for(let q=0; q<this.bullets.length ; q++){
            if(!this.bullets[q]){
               this.bullets[q] = new Bullet(originX, originY, vecX, vecY, 10, 5, 'silver');
               break;
            }
        }
    }
    delete(index){
        delete this.bullets[index];
    }

    outcheck(){
        let count = 0;
        for(let q in this.bullets){
            if(this.bullets[q].pos_x < 0 || this.bullets[q].pos_x > 640){
                this.delete(q);
            } else if(this.bullets[q].pos_y < 0 || this.bullets[q].pos_y > 480){
                this.delete(q);
            }
        }
    }
    reset(){
        for(let i in this.bullets){
            this.delete(i)
        }
    }    
}

export{BulletManager}