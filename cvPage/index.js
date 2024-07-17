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

    updatePortalPositions() 
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

function updatePortalPositions() {
    cvPortalHitbox.position.x = 100;
    cvPortalHitbox.position.y = 0.78 * innerHeight;
    cvPortal.xPosition = 100;
    cvPortal.yPosition = 0.78 * innerHeight;

}

const workExperienceText = `● Developed, optimised and maintained a commercial website using ReactJS, Typescript, CSS / SASS and Netlify\n
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

const educationText = `
● Designed and built a binaural setup with a realistic head model and ears\n
● Designed and built a circuit for sound sensing and digital processing\n
● Developed Matlab software for recording data and recorded multiple datasets with the built
binaural setup\n
● Developed Matlab software for a deterministic sound source localisation using the interaural cues
(ILDs and ITDs)\n
● Developed Python software for applying image classification on raw audio signal for estimating
the sound source azimuth angle\n`;
const skillsText = `TypeScript · React.js · Next.js · Tailwind CSS · Cascading Style Sheets (CSS)· Embedded C · Git · GitHub · Jira · Figma (Software) · Google Tag Manager · Google Analytics · Content Management Systems (CMS) · Vercel · Netlify · MATLAB · Simulink · Diptrace · NI Multisim · SystemVerilog`;

const typingSpeed = 3; // milliseconds per character
let index = 0;
let typedText = '';

let currentText = skillsText;

function typeWriter() {
    if (index < currentText.length) {
        typedText += currentText.charAt(index);
        index++;
        setTimeout(typeWriter, typingSpeed);
    }
}

function resetTypewriter(newText) {
    index = 0;
    typedText = '';
    currentText = newText;
    typeWriter();
}

resetTypewriter(currentText);

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

let displayedPage = 'contactDetails'

function setDisplayedPage(page) {
    displayedPage = page;
    switch (displayedPage) {
        case 'contactDetails':
            resetTypewriter(skillsText);
            break;
        case 'workExperience':
            resetTypewriter(workExperienceText);
            break;
        case 'education':
            resetTypewriter(educationText);
            break;
        default:
            resetTypewriter('');
            break;
    }
}

const maxWidth = 0.53 * innerWidth; 

let groundSign = new Image();
groundSign.src = '../images/groundSign.png';

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    // Draw the background image
    c.drawImage(backgroundImage, 0, 0, innerWidth, innerHeight);

    c.font = '32px Cherry Swash';
    c.fillStyle = 'black';
    c.fillText('Home', 100, 0.75 * innerHeight);

    switch(displayedPage) {
        case 'contactDetails':
            c.font = ' bold 32px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, 'Jafer Nusier', 0.5 * innerWidth - c.measureText('Jafer Nusier').width / 2, 0.35 * innerHeight, maxWidth, 25);

            c.font = '16px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, 'nusierj@gmail.com | +447706582024', 0.5 * innerWidth - c.measureText('nusierj@gmail.com | +447706582024').width / 2, 0.4 * innerHeight, maxWidth, 17);
            drawTextWithWordWrapAndLineBreaks(c, 'www.linkedin.com/in/jafer-nusier-6a67911b7', 0.5 * innerWidth - c.measureText('www.linkedin.com/in/jafer-nusier-6a67911b7').width / 2, 0.45 * innerHeight, maxWidth, 17);

            c.font = ' bold 24px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, 'Skills', 0.25 * innerWidth, 0.5 * innerHeight, maxWidth, 25);

            c.font = '16px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, typedText, 0.25 * innerWidth, 0.53 * innerHeight, maxWidth, 17);
            break;
        case 'workExperience':
            c.font = ' bold 24px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, 'Frontend developer, Tickitto AI Ltd, London, UK — July 2022 - Present', 0.25 * innerWidth, 0.25 * innerHeight, maxWidth, 25);

            c.font = '16px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, typedText, 0.25 * innerWidth, 0.3 * innerHeight, maxWidth, 17);
            break;
        case 'education':
            c.font = ' bold 24px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, 'University College London — BEng Electrical and Electronic Engineering— Sep 2019 - July 2022', 0.25 * innerWidth, 0.25 * innerHeight, maxWidth, 25);
            c.font = '16px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, `● Dissertation: Binaural sound source localisation with image classification on raw audio signals (Score: 79)\n● Related Modules: Java programming module, C programming module, Connected Systems, Networking Systems, Internet of Things, Robotics, Digital Signal Processing, Advanced Digital Design\n`, 0.25 * innerWidth, 0.3 * innerHeight, maxWidth, 25);
            c.font = ' bold 24px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, 'Dissertation — Binaural sound source localisation with image classification on raw audio signals', 0.25 * innerWidth, 0.45 * innerHeight, maxWidth, 25);
            
            
            c.font = '16px Cherry Swash';
            c.fillStyle = 'black';
            drawTextWithWordWrapAndLineBreaks(c, typedText, 0.25 * innerWidth, 0.5 * innerHeight, maxWidth, 17);

            break;
        default:
            break;
    };
   

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

// Create buttons
const buttonContainer = document.createElement('div');
buttonContainer.style = 'position: absolute; top: 35%; left: 30px; display: flex; flex-direction: column; gap: 20px;';

const button1 = document.createElement('button');
button1.innerText = 'Show Contact Details';
button1.style = 'box-shadow: 0 0 15px 15px white';

button1.onclick = () => {
    setDisplayedPage('contactDetails')
    button1.style = 'box-shadow: 0 0 15px 15px white';
    button2.style = 'box-shadow: none';
    button3.style = 'box-shadow: none';
};
buttonContainer.appendChild(button1);

const button2 = document.createElement('button');
button2.innerText = 'Show Work Experience';
button2.onclick = () => {
    setDisplayedPage('workExperience')
    button1.style = 'box-shadow: none';
    button2.style = 'box-shadow: 0 0 15px 15px white';
    button3.style = 'box-shadow: none';
};
buttonContainer.appendChild(button2);

const button3 = document.createElement('button');
button3.innerText = 'Show Education';
button3.onclick = () => {
    setDisplayedPage('education')
    button1.style = 'box-shadow: none';
    button2.style = 'box-shadow: none';
    button3.style = 'box-shadow: 0 0 15px 15px white';
};
buttonContainer.appendChild(button3);

document.body.appendChild(buttonContainer);

updatePortalPositions() 