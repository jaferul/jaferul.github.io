var canvas = document.getElementById('gameCanvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

var hideBall = true;

var mouse = {
    x: 10,
    y: 10
}
let hitToolHeight = 150;
let hitToolWidth = 20;
let hitToolX = 200;
let hitToolY = 0.9 * innerHeight - hitToolWidth / 2;

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
        ballX = Math.random() * (innerWidth - ballRadius);
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

    c.clearRect(0, 0, innerWidth, innerHeight);

    c.font = "30px Arial";
    c.strokeText(`Score: ${score}`, (innerWidth - 200), 0.05 * (innerHeight - 50));
    c.fillText('Work in progress', 20, innerHeight - 50 );



    if(hideBall) {
        c.font = "30px Arial";
        c.strokeText("Click anywhere for new ball", innerWidth / 2 - c.measureText('Click anywhere for new ball').width / 2, innerHeight / 2);
        
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
    if(hitToolX + 150 > innerWidth) hitToolX = innerWidth - 150;

    if(ballX + 30 >= innerWidth || ballX - 30 <= 0)
        ballDx = -ballDx;
    
    if(ballY - 30 <= 0)
        ballDy = -ballDy;
    
    if(ballY>= hitToolY)
        hideBall = true;

}
animate();