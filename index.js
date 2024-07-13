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
    position: {x: innerWidth / 2 - 300, y: 0},
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

let portalImage2 = new Image();
portalImage2.src = './images/portal.png';

let portalImage3 = new Image();
portalImage3.src = './images/portal.png';

let backgroundImage = new Image();
backgroundImage.src = './images/background.png';

let platformImage = new Image();
platformImage.src = './images/platform.png';

let cvPortalHitbox = {
    position: {
        x: innerWidth - 200,  
        y: 0.8 * innerHeight
    },
    width: 40,
    height: 192,
    portalLink: 'cvPage/index.html',
};

const cvPortal = new Portal({
    framesHold: 9, 
    xPosition: innerWidth - 200, 
    yPosition: 0.8 * innerHeight, 
    portalLink: 'cvPage/index.html', 
    portalHitbox: cvPortalHitbox,
    image: portalImage,
});

let gamesPortalHitbox = {
    position: {
        x: innerWidth - 200,  
        y: Math.floor(0.3 * numberOfBlocksHeight) * 32 - 195
    },
    width: 40,
    height: 192,
    portalLink: 'gamesPages/index.html',
};

const gamesPortal = new Portal({
    framesHold: 9, 
    xPosition:  innerWidth - 200, 
    yPosition: Math.floor(0.3 * numberOfBlocksHeight) * 32 - 195, 
    portalLink: 'gamesPage/index.html', 
    portalHitbox: gamesPortalHitbox,
    image: portalImage2,
});

let animationsPortalHitbox = {
    position: {
        x: 70, 
        y: Math.floor(0.3 * numberOfBlocksHeight) * 32 - 195
    },
    width: 40,
    height: 192,
    portalLink: 'animationsPage/index.html',
};

const animationsPortal = new Portal({
    framesHold: 9, 
    xPosition: 70, 
    yPosition: Math.floor(0.3 * numberOfBlocksHeight) * 32 - 195, 
    portalLink: 'animationsPage/index.html', 
    portalHitbox: animationsPortalHitbox,
    image: portalImage3,
});


let hangingSign = new Image();
hangingSign.src = './images/hangingSign.png';

let groundSign = new Image();
groundSign.src = './images/groundSign.png';

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);

    // Draw the background image
    c.drawImage(backgroundImage, 0, 0, innerWidth, innerHeight);
    
    // Load the font
    c.font = '32px Cherry Swash';
    c.fillStyle = 'white';
    
    c.shadowColor = "black";
    c.shadowBlur = 9;
    // Draw the text
    c.fillText('W - Jump', 20, 0.75 * innerHeight);
    c.fillText('W x 2 - Double jump', 20, 0.8 * innerHeight);
    c.fillText('A - Move left', 20, 0.85 * innerHeight);
    c.fillText('D - Move right', 20, 0.9 * innerHeight);

    c.drawImage(platformImage, Math.floor(0.2 * numberOfBlocksWidth) * 32, Math.floor(0.6 * numberOfBlocksHeight) * 32  , 224, 32);
    c.drawImage(platformImage, Math.floor(0.85 * numberOfBlocksWidth) * 32, Math.floor(0.3 * numberOfBlocksHeight) * 32  , 224, 32);
    c.drawImage(platformImage,  Math.floor(0.025 * numberOfBlocksWidth) * 32, Math.floor(0.3 * numberOfBlocksHeight) * 32  , 224, 32);
    c.drawImage(platformImage, Math.floor(0.55 * numberOfBlocksWidth) * 32, Math.floor(0.45 * numberOfBlocksHeight) * 32  , 224, 32);


   // Draw the hanging sign with shadow for "Animations" text
   c.drawImage(hangingSign, Math.floor(0.025 * numberOfBlocksWidth) * 32 - 20,  Math.floor(0.3 * numberOfBlocksHeight) * 32, 260, 140); 
   c.fillText('Animations', Math.floor(0.025 * numberOfBlocksWidth) * 32 + 25, Math.floor(0.3 * numberOfBlocksHeight) * 32 + 85);
    

   c.drawImage(hangingSign,  Math.floor(0.85 * numberOfBlocksWidth) * 32 - 20,  Math.floor(0.3 * numberOfBlocksHeight) * 32, 260, 140); 
   c.fillText('Games', Math.floor(0.85 * numberOfBlocksWidth) * 32 + 60, Math.floor(0.3 * numberOfBlocksHeight) * 32 + 85);

   c.drawImage(groundSign,  innerWidth - 400,  0.8 * innerHeight, 260, 140); 
   c.fillText('See CV', innerWidth - 400 + 80, 0.8 * innerHeight + 60);

    // Reset shadow properties to avoid affecting other texts
    c.shadowColor = 'transparent';
    c.shadowBlur = 0;

    // platformCollisionBlocks.forEach((block) => {
    //     c.fillStyle = 'red';
    //     c.fillRect(block.position.x, block.position.y, block.width, block.height);
    // })

    c.beginPath();    

    hero.update();
    cvPortal.update();
    gamesPortal.update();
    animationsPortal.update();

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