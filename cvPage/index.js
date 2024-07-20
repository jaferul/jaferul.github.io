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


const hero = new Sprite({
    position: {x: innerWidth / 2 - 300, y: 0},
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
    portalLink: '../index.html', 

};

const cvPortal = new Portal({
    framesHold: 9, 
    xPosition: 100, 
    yPosition: 0.78 * innerHeight, 
    portalHitbox: cvPortalHitbox,
    image: portalImage,
});

function updatePortalPositions() {
    cvPortalHitbox.position.x = 100;
    cvPortalHitbox.position.y = 0.78 * innerHeight;
    cvPortal.xPosition = 100;
    cvPortal.yPosition = 0.78 * innerHeight;

}

const contactDetails = document.createElement('div');
contactDetails.style = 'display: flex; flex-direction: column; gap: 16px; width: 100%; align-items: center; position: absolute; top: 30%; font-family: Cherry Swash; font-size: 16px;';
contactDetails.innerHTML = `
        <h1 style='font-size: 32px; font-weight: bold; margin: 0 0 16px 0'>Jafer Nusier</h1>
        <div>nusierj@gmail.com | +447706582024</div>
        <a style='color: black;' href='https://www.linkedin.com/in/jafer-nusier-6a67911b7' target='_blank'>www.linkedin.com/in/jafer-nusier-6a67911b7</a>
        <h2 style='font-size: 24px; font-weight: bold; margin: 0'>Skills</h2>
        <div style='max-width: 50%'>TypeScript · React.js · Next.js · Tailwind CSS · Cascading Style Sheets (CSS)· Embedded C · Git · GitHub · Jira · Figma (Software) · Google Tag Manager · Google Analytics · Content Management Systems (CMS) · Vercel · Netlify · MATLAB · Simulink · Diptrace · NI Multisim · SystemVerilog</div>
`;


const workExperienceText = `● Developed, optimised and maintained a commercial website using ReactJS, Typescript, CSS / SASS and Netlify<br>
● Built a new version of the website from scratch using NextJS, Typescript, Tailwind CSS, the Mantine components library and Vercel<br>
● Built the company’s business website from scratch using NextJS 14 with App Router, Typescript and Mantine<br>
● Developed responsive and reusable components and pages using modern React features, such as Hooks and Context, that adjust dynamically from mobile to desktop<br>
● Built unit tests using Jest<br>
● Developed accessibility features<br>
● Implemented white label websites for American Express and Careem (Uber) aligned with their design guidelines and user experience standards.<br>
● Used Sanity.io to implement Content Management Systems (CMS) and collaborated with the content enrichment team to create components customised to their needs<br>
● Used Git and Github for code management and JIRA and Asana for tickets and tasks management<br>
● Contributed to visual concepts and user interface elements using Figma<br>
● Implemented and maintained scripts for Google Tag Manager, Google Analytics and Zendesk while coaching colleagues from different departments<br>`;

const workExperience = document.createElement('div');
workExperience.style = 'display: flex; flex-direction: column; width: 100%; align-items: center; position: absolute; top: 21%; font-family: Cherry Swash; font-size: 16px;';
workExperience.innerHTML = `
        <h1 style='max-width: 50%; font-size: 24px; font-weight: bold;'>Frontend developer, Tickitto AI Ltd, London, UK — July 2022 - Present</h1>
        <div style='max-width: 50%; line-height: 1.4'>${workExperienceText}</div>
`;


const educationText = `
● Designed and built a binaural setup with a realistic head model and ears<br>
● Designed and built a circuit for sound sensing and digital processing<br>
● Developed Matlab software for recording data and recorded multiple datasets with the built
binaural setup<br>
● Developed Matlab software for a deterministic sound source localisation using the interaural cues
(ILDs and ITDs)<br>
● Developed Python software for applying image classification on raw audio signal for estimating
the sound source azimuth angle<br>`;

const education = document.createElement('div');
education.style = 'display: flex; flex-direction: column; width: 100%; align-items: center; position: absolute; top: 21%; font-family: Cherry Swash; font-size: 16px;';
education.innerHTML = `
        <h1 style='max-width: 50%; font-size: 24px; font-weight: bold;'>University College London — BEng Electrical and Electronic Engineering— Sep 2019 - July 2022</h1>
        <div style='max-width: 50%; line-height: 1.4'>● Dissertation: Binaural sound source localisation with image classification on raw audio signals (Score: 79)<br>● Related Modules: Java programming module, C programming module, Connected Systems, Networking Systems, Internet of Things, Robotics, Digital Signal Processing, Advanced Digital Design<br></div>
        <h2 style='max-width: 50%; font-size: 24px; font-weight: bold;'>Dissertation — Binaural sound source localisation with image classification on raw audio signals</h2>
        <div style='max-width: 50%; line-height: 1.4'>${educationText}</div>
`;

let displayedPage = contactDetails
document.body.appendChild(displayedPage);

function setDisplayedPage(page, button) {
    if (document.body.contains(displayedPage)) {
        document.body.removeChild(displayedPage);
    }
    
    switch(page) {
        case contactDetails:
            document.body.appendChild(contactDetails);
            break;
        case workExperience:
            document.body.appendChild(workExperience);
            break;
        case education:
            document.body.appendChild(education);
            break;
        default:
            break;
    }
    displayedPage = page;

    // box shadow for selected option button
    document.querySelectorAll('.optionsButtons').forEach(btn => {
        btn.style.boxShadow = 'none';
    });
    button.style.boxShadow = '0 0 15px 15px white';
}

const buttonContainer = document.createElement('div');
buttonContainer.style = 'position: absolute; top: 35%; left: 30px; display: flex; flex-direction: column; gap: 20px; z-index: 2;';
buttonContainer.innerHTML = `
    <button style='box-shadow: 0 0 15px 15px white;' class='optionsButtons' onclick='setDisplayedPage(contactDetails, this)'>Show Contact Details</button>
    <button class='optionsButtons' onclick='setDisplayedPage(workExperience, this)'>Show Work Experience</button>
    <button class='optionsButtons' onclick='setDisplayedPage(education, this)'>Show Education</button>
`;
document.body.appendChild(buttonContainer);

let groundSign = new Image();
groundSign.src = '../images/groundSign.png';

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, innerWidth, innerHeight);
    
    c.drawImage(backgroundImage, 0, 0, innerWidth, innerHeight);

    c.font = '32px Cherry Swash';
    c.fillStyle = 'black';
    c.fillText('Home', 100, 0.75 * innerHeight);

    c.beginPath();    
    hero.update();
    cvPortal.update();

}
animate();