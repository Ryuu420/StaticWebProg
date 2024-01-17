export default class Enemy {
    constructor(x, y, color, health, speed){
        this.x = x;
        this.y = y;
        this.color = color;
        this.health = health;
        this.width = 50;
        this.height = 25;
        this.speed = speed;
    }

    draw(ctx){
        ctx.fillStyle = this.color;
        ctx.strokeStyle = "white";

        ctx.fillRect(this.x, this.y, this.width, this.height);
        ctx.strokeRect(this.x, this.y, this.width, this.height);

        /*
        ctx.fillStyle = "black";
        ctx.font = "25px Arial";
        ctx.fillText(
            this.health,
            this.x + this.width / 3.5,
            this.y + this.height / 1.5
        );
        */

        this.x += this.speed;
    }

    takeDamage(damage){
        this.health -= damage;
    }
}