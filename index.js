var canvas = document.getElementById('main');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: 10,
    y: 10
}

let numberOfBlocksWidth = Math.floor(innerWidth / 32);
let numberOfBlocksHeight = Math.floor(innerHeight / 32);
let mapMatrix = Array.from({ length: numberOfBlocksWidth }, () => Array(numberOfBlocksHeight).fill(0));
for(let i = 0; i < 7; i++) {
    mapMatrix[Math.floor(0.6 * numberOfBlocksHeight)][i + Math.floor(0.2 * numberOfBlocksWidth)] = 1;
    mapMatrix[Math.floor(0.3 * numberOfBlocksHeight)][i + Math.floor(0.85 * numberOfBlocksWidth)] = 1;
    mapMatrix[Math.floor(0.3 * numberOfBlocksHeight)][i + Math.floor(0.025 * numberOfBlocksWidth)] = 1;
    mapMatrix[Math.floor(0.45 * numberOfBlocksHeight)][i + Math.floor(0.55 * numberOfBlocksWidth)] = 1;
}

const platformCollisionBlocks = [];
mapMatrix.forEach((row, y) => {
  row.forEach((symbol, x) => {
    if (symbol === 1) {
      const platformBlock = {
        position: {
          x: x * 32,
          y: y * 32,
        },
        height: 32,
        width: 32
      };
      platformCollisionBlocks.push(platformBlock);
    }
  });
});

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('keydown', (e) => {
    if(showControls && e.key === 'Escape')
        showControls = false
});
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    numberOfBlocksWidth = Math.floor(innerWidth / 32);
    numberOfBlocksHeight = Math.floor(innerHeight / 32);

    mapMatrix = Array.from({ length: numberOfBlocksHeight }, () => Array(numberOfBlocksWidth).fill(0));

    for(let i = 0; i < 7; i++) {
        mapMatrix[Math.floor(0.6 * numberOfBlocksHeight)][i + Math.floor(0.2 * numberOfBlocksWidth)] = 1;
        mapMatrix[Math.floor(0.3 * numberOfBlocksHeight)][i + Math.floor(0.85 * numberOfBlocksWidth)] = 1;
        mapMatrix[Math.floor(0.3 * numberOfBlocksHeight)][i + Math.floor(0.025 * numberOfBlocksWidth)] = 1;
        mapMatrix[Math.floor(0.45 * numberOfBlocksHeight)][i + Math.floor(0.55 * numberOfBlocksWidth)] = 1;
    }

    platformCollisionBlocks.length = 0;
    mapMatrix.forEach((row, y) => {
        row.forEach((symbol, x) => {
            if (symbol === 1) {
                platformCollisionBlocks.push({
                    position: {
                        x: x * 32,
                        y: y * 32,
                    },
                    height: 32,
                    width: 32
                });
            }
        });
    });

    updatePortalPositions();
});

const hero = new Sprite({
    position: {x: innerWidth / 2 - 300, y: 0},
    platformCollisionBlocks: platformCollisionBlocks,
    imageSrc: './images/attack1.png',
    scale: 2,
    framesMax: 8,
    velocity: {x: 0, y: 10},
    sprites: {
        idle: {
            imageSrc: './images/idle.png',
            framesMax: 4
        },
        run: {
            imageSrc: './images/run.png',
            framesMax: 8,
            image: new Image()
        },
        jump: {
            imageSrc: './images/jump.png',
            framesMax: 2,
            image: new Image()
        },
        fall: {
            imageSrc: './images/fall.png',
            framesMax: 2,
            image: new Image()
        }
    }

});

let portalImage = new Image();
portalImage.src = './images/portal.png';

let portalImage2 = new Image();
portalImage2.src = './images/portal.png';

let portalImage3 = new Image();
portalImage3.src = './images/portal.png';

let backgroundImage = new Image();
backgroundImage.src = './images/background.png';

let platformImage = new Image();
platformImage.src = './images/platform.png';


const cvPortal = new Portal({
    framesHold: 9, 
    xPosition: innerWidth - 200, 
    yPosition: innerHeight - 200, 
    image: portalImage,
    portalLink: 'cvPage/cvPage.html',
});

const gamesPortal = new Portal({
    framesHold: 9, 
    xPosition:  innerWidth - 200, 
    yPosition: Math.floor(0.3 * numberOfBlocksHeight) * 32 - 195, 
    image: portalImage2,
    portalLink: 'gamesPage/game.html',

});

const animationsPortal = new Portal({
    framesHold: 9, 
    xPosition: 70, 
    yPosition: Math.floor(0.3 * numberOfBlocksHeight) * 32 - 195, 
    image: portalImage3,
    portalLink: 'animationsPage/animations.html',

});

function updatePortalPositions() {

    cvPortal.xPosition = innerWidth - 200;
    cvPortal.yPosition = innerHeight - 200;

    gamesPortal.xPosition = innerWidth - 200;
    gamesPortal.yPosition = Math.floor(0.3 * numberOfBlocksHeight) * 32 - 195;

    animationsPortal.xPosition = 70;
    animationsPortal.yPosition = Math.floor(0.3 * numberOfBlocksHeight) * 32 - 195;
}

let hangingSign = new Image();
hangingSign.src = './images/hangingSign.png';

let groundSign = new Image();
groundSign.src = './images/groundSign.png';

let keyLight = new Image();
keyLight.src = './images/lightKey.png';


let msPrev = window.performance.now()
const fps = 60
const msPerFrame = 1000 / fps

let showControls = false;

function toggleShowControls () {
    showControls = !showControls
}

const showControlsButton = document.createElement('button');
showControlsButton.style = 'position: absolute; bottom: 60px; left: 10px; cursor: pointer; border-radius: 11px; height: 40px; width: 160px; background-color: white; font-size: 20px';
showControlsButton.textContent = 'Show Controls';
showControlsButton.onclick = () => toggleShowControls()

document.body.appendChild(showControlsButton);

const showControlsPanel = document.createElement('div');
showControlsPanel.style = 'position: absolute; bottom: 40%; left: 35%; width: 30%; display: none; flex-direction: column; gap: 12px; background-color: white; padding: 16px; border-radius: 11px';

showControlsPanel.innerHTML = `
    <button style='width: 30px; height: 30px; border-radius: 50px; background-color: inherit; align-self: end; cursor: pointer' onclick='toggleShowControls()'>X</button>
    <div class='keysRow'>
        <div class='controlKey'>A</div>
        <p>/</p>
        <div class='controlKey'>←</div>
        <p>Move Left</p>
    </div>
        <div class='keysRow'>
        <div class='controlKey'>W</div>
        <p>/</p>
        <div class='controlKey'>↑</div>
        <p>Jump</p>
    </div>
        <div class='keysRow'>
        <div class='controlKey'>D</div>
        <p>/</p>
        <div class='controlKey'>→</div>
        <p>Move Right</p>
    </div>
        <div class='keysRow'>
        <div class='controlKey'>W</div>
        <div class='controlKey'>W</div>
        <p>/</p>
        <div class='controlKey'>↑</div>
        <div class='controlKey'>↑</div>
        <p>Double Jump</p>
    </div>
 `;


document.body.appendChild(showControlsPanel);


function animate() {
    requestAnimationFrame(animate);

    // Limit framerate to 60 fps
    const msNow = window.performance.now()
    const msPassed = msNow - msPrev
  
    if (msPassed < msPerFrame) return
  
    const excessTime = msPassed % msPerFrame
    msPrev = msNow - excessTime
  
    c.clearRect(0, 0, innerWidth, innerHeight);
    // Draw the background image
    c.drawImage(backgroundImage, 0, 0, innerWidth, innerHeight);

    c.font = '32px Cherry Swash';
    c.fillStyle = 'white';
    c.shadowColor = "black";
    c.shadowBlur = 9;
    
    if(showControls){
        showControlsButton.textContent = 'Hide Controls'
        showControlsPanel.style.display = 'flex'

    } else {
        showControlsButton.textContent = 'Show Controls'
        showControlsPanel.style.display = 'none'
    }


    c.drawImage(platformImage, Math.floor(0.2 * numberOfBlocksWidth) * 32, Math.floor(0.6 * numberOfBlocksHeight) * 32  , 224, 32);
    c.drawImage(platformImage, Math.floor(0.85 * numberOfBlocksWidth) * 32, Math.floor(0.3 * numberOfBlocksHeight) * 32  , 224, 32);
    c.drawImage(platformImage,  Math.floor(0.025 * numberOfBlocksWidth) * 32, Math.floor(0.3 * numberOfBlocksHeight) * 32  , 224, 32);
    c.drawImage(platformImage, Math.floor(0.55 * numberOfBlocksWidth) * 32, Math.floor(0.45 * numberOfBlocksHeight) * 32  , 224, 32);

   // Draw the hanging sign with shadow for "Animations" text
   c.drawImage(hangingSign, Math.floor(0.025 * numberOfBlocksWidth) * 32 - 20,  Math.floor(0.3 * numberOfBlocksHeight) * 32, 260, 140); 
   c.fillText('Animations', Math.floor(0.025 * numberOfBlocksWidth) * 32 + 25, Math.floor(0.3 * numberOfBlocksHeight) * 32 + 85);
    

   c.drawImage(hangingSign,  Math.floor(0.85 * numberOfBlocksWidth) * 32 - 20,  Math.floor(0.3 * numberOfBlocksHeight) * 32, 260, 140); 
   c.fillText('Games', Math.floor(0.85 * numberOfBlocksWidth) * 32 + 60, Math.floor(0.3 * numberOfBlocksHeight) * 32 + 85);

   c.drawImage(groundSign,  innerWidth - 400,  innerHeight - 115, 260, 140); 
   c.fillText('See CV', innerWidth - 400 + 80, innerHeight - 115 + 60);

    // Reset shadow properties to avoid affecting other texts
    c.shadowColor = 'transparent';
    c.shadowBlur = 0;
    c.beginPath();    

    hero.update();
    cvPortal.update(hero.hitbox);
    gamesPortal.update(hero.hitbox);
    animationsPortal.update(hero.hitbox);


}

animate();