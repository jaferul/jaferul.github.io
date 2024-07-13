var canvas = document.getElementById('cvPage');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: 10,
    y: 10
}

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
});
window.addEventListener('resize', () => {
    canvas.width = innerWidth;
    canvas.height = innerHeight;

});


let runSpeed = 3;
const gravity = 0.2;
let flip = false;

const hero = new Sprite({
    position: {x: innerWidth / 2 - 300, y: 0},
    flip: flip,
    platformCollisionBlocks: [],
    imageSrc: '../images/attack1.png',
    scale: 2,
    framesMax: 8,
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
portalImage.src = '../images/portal.png';

let backgroundImage = new Image();
backgroundImage.src = '../images/scroll.png';

let platformImage = new Image();
platformImage.src = '../images/platform.png';

let cvPortalHitbox = {
    position: {
        x: 700 + 30, // Adjust these coordinates based on your portal's position
        y: 700
    },
    width: 40,
    height: 192,
    portalLink: 'cvPage/index.html',
};

const cvPortal = new Portal({
    framesHold: 9, 
    xPosition: 100, 
    yPosition: 0.78 * innerHeight, 
    portalLink: '../index.html', 
    portalHitbox: cvPortalHitbox,
    image: portalImage,
});

const text = `● Developed, optimised and maintained a commercial website using ReactJS, Typescript, CSS / SASS and Netlify\n
● Built a new version of the website from scratch using NextJS, Typescript, Tailwind CSS, the Mantine components library and Vercel\n
● Built the company’s business website from scratch using NextJS 14 with App Router, Typescript and Mantine\n
● Developed responsive and reusable components and pages using modern React features, such as Hooks and Context, that adjust dynamically from mobile to desktop\n
● Built unit tests using Jest\n
● Developed accessibility features\n
● Implemented white label websites for American Express and Careem (Uber) aligned with their design guidelines and user experience standards.\n
● Used Sanity.io to implement Content Management Systems (CMS) and collaborated with the content enrichment team to create components customised to their needs\n
● Used Git and Github for code management and JIRA and Asana for tickets and tasks management\n
● Contributed to visual concepts and user interface elements using Figma\n
● Implemented and maintained scripts for Google Tag Manager, Google Analytics and Zendesk while coaching colleagues from different departments\n`;

const typingSpeed = 3; // milliseconds per character

let index = 0;
let typedText = '';


function typeWriter() {
    if (index < text.length) {
        typedText += text.charAt(index);
        index++;
        setTimeout(typeWriter, typingSpeed);
    }
}

typeWriter();

function drawTextWithNewLines(context, text, x, y, lineHeight) {
    const lines = text.split('\n');
    lines.forEach((line, i) => {
        context.fillText(line, x, y + i * lineHeight);
    });
}

function drawTextWithWordWrapAndLineBreaks(context, text, x, y, maxWidth, lineHeight) {
    const paragraphs = text.split('\n'); // Split the text by new line character
    let currentY = y;

    paragraphs.forEach(paragraph => {
        const words = paragraph.split(' ');
        let line = '';
        let testLine = '';
        let testWidth = 0;

        words.forEach((word, i) => {
            testLine = line + word + ' ';
            testWidth = context.measureText(testLine).width;

            if (testWidth > maxWidth && i > 0) {
                context.fillText(line, x, currentY);
                line = word + ' ';
                currentY += lineHeight;
            } else {
                line = testLine;
            }
        });

        context.fillText(line, x, currentY);
        currentY += lineHeight; // Add an extra line height after each paragraph
    });
}

const maxWidth = 0.53 * innerWidth; // 50% of the screen width

let groundSign = new Image();
groundSign.src = '../images/groundSign.png';

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    // Draw the background image
    c.drawImage(backgroundImage, 0, 0, innerWidth, innerHeight);

    // platformCollisionBlocks.forEach((block) => {
    //     c.fillStyle = 'red';
    //     c.fillRect(block.position.x, block.position.y, block.width, block.height);
    // })
    c.font = '32px Cherry Swash';
    c.fillStyle = 'black';

    // drawTextWithNewLines(c, typedText, 0.25 * innerWidth, 0.25 * innerHeight, 20);

   c.fillText('Home', 100, 0.75 * innerHeight);

    c.font = '16px Cherry Swash';
    c.fillStyle = 'black';
    drawTextWithWordWrapAndLineBreaks(c, typedText, 0.25 * innerWidth, 0.23 * innerHeight, maxWidth, 20);

    c.beginPath();    

    hero.update();
    cvPortal.update();

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