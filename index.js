const BLOCK_SIZE = 32;
const PLATFORM_WIDTH_BLOCKS = 7;
const PLATFORM_WIDTH = PLATFORM_WIDTH_BLOCKS * BLOCK_SIZE;

var canvas = document.getElementById('main');

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

var c = canvas.getContext('2d');

const platforms = {
    topLeft: { x: 1 * BLOCK_SIZE, y: 7 * BLOCK_SIZE },
    topRight: { x: 32 * BLOCK_SIZE, y: 7 * BLOCK_SIZE },
    middle: { x: 22 * BLOCK_SIZE, y: 10 * BLOCK_SIZE },
    lowerLeft: { x: 8 * BLOCK_SIZE, y: 13 * BLOCK_SIZE },
};

const platformCollisionBlocks = [];
Object.values(platforms).forEach((platform) => {
    for (let i = 0; i < PLATFORM_WIDTH_BLOCKS; i++) {
        platformCollisionBlocks.push({
            position: {
                x: platform.x + i * BLOCK_SIZE,
                y: platform.y,
            },
            height: BLOCK_SIZE,
            width: BLOCK_SIZE,
        });
    }
});

const hero = new Sprite({
    position: {x: GAME_WIDTH / 2 - 300, y: 0},
    platformCollisionBlocks: platformCollisionBlocks,
    imageSrc: './images/attack1.png',
    scale: 2,
    framesMax: 4,
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
        },
        attack: {
            imageSrc: './images/attack1.png',
            framesMax: 4,
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
    xPosition: GAME_WIDTH - 200,
    yPosition: GAME_HEIGHT - 200,
    image: portalImage,
    portalLink: 'cvPage/cvPage.html',
});

const gamesPortal = new Portal({
    framesHold: 9,
    xPosition: GAME_WIDTH - 200,
    yPosition: platforms.topRight.y - 195,
    image: portalImage2,
    portalLink: 'gamesPage/game.html',

});

const animationsPortal = new Portal({
    framesHold: 9,
    xPosition: 70,
    yPosition: platforms.topLeft.y - 195,
    image: portalImage3,
    portalLink: 'animationsPage/animations.html',

});

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
    let showControlsModal = document.getElementById('showControlsModal')
    let showModalButton = document.getElementById('showModalButton')

    if(showControls){
        showModalButton.textContent = 'Hide Controls'
        showControlsModal.style.display = 'flex'

    } else {
        showModalButton.textContent = 'Show Controls'
        showControlsModal.style.display = 'none'
    }
}

window.addEventListener('keydown', (e) => {
    if(showControls && e.key === 'Escape')
        toggleShowControls();
});

function animate() {
    requestAnimationFrame(animate);

    // Limit framerate to 60 fps
    const msNow = window.performance.now()
    const msPassed = msNow - msPrev

    if (msPassed < msPerFrame) return

    const excessTime = msPassed % msPerFrame
    msPrev = msNow - excessTime

    c.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    // Draw the background image
    c.drawImage(backgroundImage, 0, 0, GAME_WIDTH, GAME_HEIGHT);

    c.font = '32px Cherry Swash';
    c.fillStyle = 'white';
    c.shadowColor = "black";
    c.shadowBlur = 9;

    Object.values(platforms).forEach((platform) => {
        c.drawImage(platformImage, platform.x, platform.y, PLATFORM_WIDTH, BLOCK_SIZE);
    });

   // Draw the hanging sign with shadow for "Animations" text
   c.drawImage(hangingSign, platforms.topLeft.x - 20, platforms.topLeft.y, 260, 140);
   c.fillText('Animations', platforms.topLeft.x + 25, platforms.topLeft.y + 85);


   c.drawImage(hangingSign, platforms.topRight.x - 20, platforms.topRight.y, 260, 140);
   c.fillText('Games', platforms.topRight.x + 60, platforms.topRight.y + 85);

   c.drawImage(groundSign, GAME_WIDTH - 400, GAME_HEIGHT - 115, 260, 140);
   c.fillText('See CV', GAME_WIDTH - 400 + 80, GAME_HEIGHT - 115 + 60);

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
