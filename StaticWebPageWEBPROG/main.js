import Player from "./player.js";
import Enemy from "./enemy.js";
import BulletController from "./bulletController.js";
import Star from "./star.js";

console.log("main.js loaded");

document.getElementById('loading_bar').style.opacity = '1';

document.addEventListener('DOMContentLoaded', function () {
    document.body.classList.add('page-loaded');
    document.getElementById('loading_bar').style.opacity = '1';
});

const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 

const bulletController = new BulletController(canvas);
const isMainPage = window.location.pathname.includes("main_page.html");

const player = isMainPage ? new Player(canvas.width / 2, canvas.height / 1.2, bulletController) : null;

const enemies = [];

const stars = [];

function GameLoop(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight; 

    setCommonStyle();
    ctx.fillStyle = "#141414"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    stars.forEach((star) => {
        if (isOffScreen(star)){
            const index = stars.indexOf(star);
            stars.splice(index, 1);
        }
        star.draw(ctx);
    });

    enemies.forEach((enemy) => {
        if (bulletController.collideWith(enemy)) {
            if (enemy.health <= 0) {
                const index = enemies.indexOf(enemy);
                enemies.splice(index, 1);
            }
        }else {
            enemy.draw(ctx);
        }
    });

    bulletController.draw(ctx);

    if (isMainPage){
        player.draw(ctx);
    }

}

function isOffScreen(star){
    return star.y <= -star.size;
}

function setCommonStyle(){
    ctx.shadowColor = "blue";
    ctx.shadowBlur = 20;
    ctx.lineJoin = "bevel";
    ctx.lineWidth = 5;
}
function spawnNewEnemyLeft(){
    enemies.push(new Enemy(0, Math.floor(Math.random() * canvas.height / 3) + 50, "black", 10, Math.floor(Math.random() * 5) + 1));
}

function spawnNewEnemyRight(){
    enemies.push(new Enemy(canvas.width, Math.floor(Math.random() * canvas.height / 3) + 50, "black", 10, -Math.floor(Math.random() * 5) + -1));
}

function spawnStars(){
    stars.push(new Star(Math.floor(Math.random() * window.innerWidth) + 1, window.innerHeight, Math.floor(Math.random() * 2) + 1, Math.floor(Math.random() * 10) + 1));
}

if (isMainPage){
    setInterval(spawnNewEnemyLeft, 3000);
    setInterval(spawnNewEnemyRight, 3000);
}

setInterval(spawnStars, 25);

setInterval(GameLoop, 1000 / 60);