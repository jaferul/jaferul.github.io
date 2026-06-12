const GAME_AREA_HEIGHT = 480;

var canvas = document.getElementById('gameCanvas');

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

var c = canvas.getContext('2d');

const hero = new Sprite({
    position: {x: GAME_WIDTH / 2 - 300, y: 0},
    platformCollisionBlocks: [],
    imageSrc: '../images/attack1.png',
    scale: 2,
    framesMax: 4,
    velocity: {x: 0, y: 10},
    sprites: {
        idle: {
            imageSrc: '../images/idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: '../images/run.png',
            framesMax: 8,
            image: new Image()
        },
        jump: {
            imageSrc: '../images/jump.png',
            framesMax: 2,
            image: new Image()
        },
        fall: {
            imageSrc: '../images/fall.png',
            framesMax: 2,
            image: new Image()
        },
        attack: {
            imageSrc: '../images/attack1.png',
            framesMax: 4,
            image: new Image()
        }
    }

});

let portalImage = new Image();
portalImage.src = '../images/portal.png';

const homePortal = new Portal({
    framesHold: 9,
    xPosition: 70,
    yPosition: GAME_HEIGHT - 200,
    image: portalImage,
    portalLink: '../index.html',
});

window.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouse.x = (e.clientX - rect.left) * (GAME_WIDTH / rect.width);
    mouse.y = (e.clientY - rect.top) * (GAME_HEIGHT / rect.height);
});

var hideBall = true;

var mouse = {
    x: 10,
    y: 10
}
let hitToolHeight = 150;
let hitToolWidth = 20;
let hitToolX = 200;
let hitToolY = 0.9 * GAME_AREA_HEIGHT - hitToolWidth / 2;

let ballX = 200;
let ballY = 200;
let ballDx = 7;
let ballDy = 7;
let ballRadius = 30;

let score = 0;
let speedIncrement = 0.5;

window.addEventListener('click', (e) => {
    if(hideBall) {
        hideBall = false;
        ballX = Math.random() * (GAME_WIDTH - ballRadius);
        ballY = 200;
        score = 0;
        ballDx = 7;
        ballDy = 7;
    }

})

function getDistance(x1, y1, x2, y2) {
    let xDistance = x2 - x1;
    let yDistance = y2 - y1;

    return Math.sqrt(Math.pow(xDistance, 2) + Math.pow(yDistance, 2));
};

let msPrev = window.performance.now()
const fps = 60
const msPerFrame = 1000 / fps

function animate() {
    requestAnimationFrame(animate);

    // Limit framerate to 60 fps
    const msNow = window.performance.now()
    const msPassed = msNow - msPrev

    if (msPassed < msPerFrame) return

    const excessTime = msPassed % msPerFrame
    msPrev = msNow - excessTime

    c.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    c.fillStyle = '#f0f0f0';
    c.fillRect(0, 0, GAME_WIDTH, GAME_AREA_HEIGHT);
    c.fillStyle = 'black';
    c.strokeStyle = 'black';

    c.font = "30px Arial";
    c.strokeText(`Score: ${score}`, (GAME_WIDTH - 200), 0.05 * (GAME_HEIGHT - 50));
    c.fillText('Work in progress', 20, GAME_AREA_HEIGHT - 20);



    if(hideBall) {
        c.font = "30px Arial";
        c.strokeText("Click anywhere for new ball", GAME_WIDTH / 2 - c.measureText('Click anywhere for new ball').width / 2, GAME_AREA_HEIGHT / 2);

    }

    c.beginPath();


    c.rect(hitToolX, hitToolY, hitToolHeight, hitToolWidth)
    c.stroke();
    hitToolX = mouse.x;

    if(!hideBall){
        c.beginPath();
        c.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, false);
        c.strokeStyle = 'blue'
        c.stroke();

        ballX += ballDx;
        ballY += ballDy;
        // Check collision with the hitTool
        if (ballY + ballRadius >= hitToolY && ballY - ballRadius <= hitToolY + hitToolWidth) {
            if (ballX + ballRadius >= hitToolX && ballX - ballRadius <= hitToolX + hitToolHeight) {
                // Ball is hitting the top of the hitTool
                if (ballY + ballRadius >= hitToolY && ballDy > 0) {
                    ballDy = -ballDy;
                    score++;
                    ballDx += (ballDx > 0 ? speedIncrement : -speedIncrement);
                    ballDy += (ballDy > 0 ? speedIncrement : -speedIncrement);
                }

                // Ball is hitting the left side of the hitTool
                if (ballX - ballRadius <= hitToolX && ballDx > 0) {
                    ballDx = -ballDx;
                    score++;
                    ballDx += (ballDx > 0 ? speedIncrement : -speedIncrement);
                    ballDy += (ballDy > 0 ? speedIncrement : -speedIncrement);
                }

                // Ball is hitting the right side of the hitTool
                if (ballX + ballRadius >= hitToolX + hitToolHeight && ballDx < 0) {
                    ballDx = -ballDx;
                    score++;
                    ballDx += (ballDx > 0 ? speedIncrement : -speedIncrement);
                    ballDy += (ballDy > 0 ? speedIncrement : -speedIncrement);
                }
            }
        }
    }

    if(hitToolX < 0) hitToolX = 0;
    if(hitToolX + 150 > GAME_WIDTH) hitToolX = GAME_WIDTH - 150;

    if(ballX + 30 >= GAME_WIDTH || ballX - 30 <= 0)
        ballDx = -ballDx;

    if(ballY - 30 <= 0)
        ballDy = -ballDy;

    if(ballY>= hitToolY)
        hideBall = true;

    c.fillStyle = 'black';
    c.fillRect(0, GAME_AREA_HEIGHT, GAME_WIDTH, GAME_HEIGHT - GAME_AREA_HEIGHT);

    hero.update();
    homePortal.update(hero.hitbox);

}
animate();
