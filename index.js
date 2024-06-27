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
    mapMatrix[Math.floor(0.3 * numberOfBlocksHeight)][i + Math.floor(0.6 * numberOfBlocksWidth)] = 1;
    mapMatrix[Math.floor(0.8 * numberOfBlocksHeight)][i + Math.floor(0.8 * numberOfBlocksWidth)] = 1;

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
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

    numberOfBlocksWidth = Math.floor(innerWidth / 32);
    numberOfBlocksHeight = Math.floor(innerHeight / 32);

    mapMatrix = Array.from({ length: numberOfBlocksHeight }, () => Array(numberOfBlocksWidth).fill(0));

    for(let i = 0; i < 7; i++) {
        mapMatrix[Math.floor(0.6 * numberOfBlocksHeight)][i + Math.floor(0.2 * numberOfBlocksWidth)] = 1;
        mapMatrix[Math.floor(0.3 * numberOfBlocksHeight)][i + Math.floor(0.6 * numberOfBlocksWidth)] = 1;
        mapMatrix[Math.floor(0.8 * numberOfBlocksHeight)][i + Math.floor(0.8 * numberOfBlocksWidth)] = 1;
    
    }

    const platformCollisionBlocks = []
    mapMatrix.forEach((row, y) => {
    row.forEach((symbol, x) => {
        if (symbol === 1) {
        platformCollisionBlocks.push(
            {
            position: {
                x: x * 32,
                y: y * 32,
            },
            height: 32,
            width: 32
            }
        )
        }
    })
    })

});

let runSpeed = 3;
const gravity = 0.2;
let flip = false;

const hero = new Sprite({
    position: {x: 0, y: 0},
    flip: flip,
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


const keys = {
    a: {
        pressed: false,
    },
    d: {
        pressed: false,
    },
    w: {
        pressed: false,
    },
}

let lastKey;
let numberOfJumps = 0;

let portalImage = new Image();
portalImage.src = './images/portal.png';

let backgroundImage = new Image();
backgroundImage.src = './images/background.png';

let platformImage = new Image();
platformImage.src = './images/platform.png';



function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    // Draw the background image
    c.drawImage(backgroundImage, 0, 0, innerWidth, innerHeight);

    c.drawImage(platformImage, Math.floor(0.2 * numberOfBlocksWidth) * 32, Math.floor(0.6 * numberOfBlocksHeight) * 32  , 224, 32);
    c.drawImage(platformImage, Math.floor(0.6 * numberOfBlocksWidth) * 32, Math.floor(0.3 * numberOfBlocksHeight) * 32  , 224, 32);
    c.drawImage(platformImage, Math.floor(0.8 * numberOfBlocksWidth) * 32, Math.floor(0.8 * numberOfBlocksHeight) * 32  , 224, 32);


    // platformCollisionBlocks.forEach((block) => {
    //     c.fillStyle = 'red';
    //     c.fillRect(block.position.x, block.position.y, block.width, block.height);
    // })

    c.beginPath();    

    hero.update();
    createPortal(portalImage, 9, 0.95 * innerWidth, 0.78 * innerHeight, 'cvPage/index.html');


    hero.velocity.x = 0;

    hero.image = hero.sprites.idle.image;
    hero.framesMax = hero.sprites.idle.framesMax;

    if(keys.a.pressed && lastKey === 'a') {
        hero.velocity.x = -10;
        hero.image = hero.sprites.run.image;
        hero.framesMax = hero.sprites.run.framesMax;
        flip = true;

    } else if(keys.d.pressed && lastKey === 'd') {
        hero.velocity.x = 10;
        hero.image = hero.sprites.run.image;
        hero.framesMax = hero.sprites.run.framesMax;
        flip = false;

    }

    if(hero.velocity.y < 0) {
        hero.image = hero.sprites.jump.image;
        hero.framesMax = hero.sprites.jump.framesMax;
    }

    if(hero.velocity.y > 0) {
        hero.image = hero.sprites.fall.image;
        hero.framesMax = hero.sprites.fall.framesMax;
    }

    if(hero.velocity.y === 0) {
        numberOfJumps = 0;
    }


}
animate();


window.addEventListener('keydown', (e) => {
    switch(e.key) {
        case 'a':
            keys.a.pressed = true;
            lastKey = 'a';
            break;
        case 'd':
            keys.d.pressed = true;
            lastKey = 'd';
            break;
        case 'w':
            if(hero.velocity.y === 0 || numberOfJumps < 2) {
                numberOfJumps++;
                hero.velocity.y = -10;
            }
            break;

    }
});

window.addEventListener('keyup', (e) => {
    switch(e.key) {
        case 'a':
            keys.a.pressed = false;
            break;
        case 'd':
            keys.d.pressed = false;
            break;
    }
});