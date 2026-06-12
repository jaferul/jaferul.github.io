var canvas = document.getElementById('cvPage');
var stage = document.getElementById('stage');

canvas.width = GAME_WIDTH;
canvas.height = GAME_HEIGHT;

var c = canvas.getContext('2d');

const BLOCK_SIZE = 32;
const PLATFORM_WIDTH_BLOCKS = 7;
const PLATFORM_WIDTH = PLATFORM_WIDTH_BLOCKS * BLOCK_SIZE;

const platforms = {
    contact: { x: 4 * BLOCK_SIZE, y: 4 * BLOCK_SIZE, label: 'Contact Details' },
    experience: { x: 1 * BLOCK_SIZE, y: 10 * BLOCK_SIZE, label: 'Experience' },
    education: { x: 4 * BLOCK_SIZE, y: 16 * BLOCK_SIZE, label: 'Education' },
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

let backgroundImage = new Image();
backgroundImage.src = '../images/scrollBackground.png';

let platformImage = new Image();
platformImage.src = '../images/platform.png';

let hangingSign = new Image();
hangingSign.src = '../images/hangingSign.png';

const homePortal = new Portal({
    framesHold: 9,
    xPosition: 0.03 * GAME_WIDTH,
    yPosition: GAME_HEIGHT - 200,
    image: portalImage,
    portalLink: '../index.html',
});

const contactDetails = document.createElement('div');
contactDetails.style = 'padding-left: 13%; animation: fadeIn 2s forwards; display: flex; flex-direction: column; gap: 1cqw; width: 100%; align-items: center; position: absolute; top: 21%; font-family: Cherry Swash; font-size: 1.25cqw;';
contactDetails.innerHTML = `
        <h1 style='font-size: 2.5cqw; font-weight: bold; margin: 0 0 0.5cqw 0'>Jafer Nusier</h1>
        <div>nusierj@gmail.com | +447706582024</div>
        <a style='color: black;' href='https://www.linkedin.com/in/jafer-nusier-6a67911b7' target='_blank'>www.linkedin.com/in/jafer-nusier-6a67911b7</a>
        <h2 style='font-size: 1.875cqw; font-weight: bold; margin: 0'>Skills</h2>
        <div style='max-width: 49%; font-size: 1cqw; line-height: 1.35'>
            <b>Front-end development:</b> JavaScript (ES5, ES6+), TypeScript, React.js, Next.js (v13, v14, Pages router, App router), Tailwind CSS, CSS / SASS, Styled Components, Mantine, shadcn/ui<br>
            <b>Backend:</b> Python, FastAPI, Pydantic, NodeJS<br>
            <b>State management and client-side libraries:</b> Relay, tRPC, Context<br>
            <b>Client-API communication:</b> REST, GraphQL, Prisma, Orval, Postman<br>
            <b>Build and deployment:</b> Vercel, Netlify, Turborepo, Docker<br>
            <b>Version control:</b> Git, GitHub<br>
            <b>Project management:</b> Jira, Asana<br>
            <b>Design and prototyping:</b> Figma, Miro<br>
            <b>Analytics and tracking:</b> Google Tag Manager, Google Analytics, Google Search Console, Zendesk, OneTrust<br>
            <b>Content Management Systems:</b> SanityIO, PayloadCMS<br>
            <b>Database:</b> MongoDB, Firestore<br>
            <b>Server-side templates:</b> Jinja<br>
            <b>Testing Tools:</b> Jest, React Testing Library, Cypress<br>
            <b>User Authentication:</b> NextAuth, Firebase Auth
        </div>
`;


const workExperienceText = `● Optimised and maintained the initial version of the company’s website using ReactJS, TypeScript, CSS/SASS and Netlify.<br>
● Led the full website revamp using NextJS, TypeScript, Tailwind CSS and Vercel, leveraging Mantine for custom component creation.<br>
● Integrated Sanity IO CMS for content management, including white label capabilities for partners such as American Express and Careem.<br>
● Managed and worked with a monorepo using Turborepo which enabled handling multiple standalone apps which shared the majority of design components into a single repository, while each one having their own deployment.<br>
● Led the implementation of the business website using NextJS 14 and App Router with full CMS customisability.<br>
● Built a custom internal CMS for the content team, automating manual content processes end-to-end — designed the frontend and developed API endpoints with Python, FastAPI and MongoDB.<br>
● Developed responsive and reusable components with dynamic adjustment from mobile to desktop sizes, incorporating W3C Accessibility Guidelines and comprehensive test suites and end to end testing using Jest and Cypress.<br>
● Worked in an agile environment utilising Git and GitHub for code management, and JIRA and Asana for task management.<br>
● Conducted SEO optimisation strategies using Google Search Console, improving site visibility and search performance by refining indexing, page descriptions and targeted keywords.<br>
● Implemented and maintained scripts for Google Tag Manager, Google Analytics, and Zendesk while contributing to visual concepts and user interface elements using Figma.<br>
`;


const workExperience = document.createElement('div');
workExperience.style = 'padding-left: 13%; animation: fadeIn 2s forwards; display: flex; flex-direction: column; width: 100%; align-items: center; position: absolute; top: 21%; font-family: Cherry Swash; font-size: 1cqw;';
workExperience.innerHTML = `
        <h1 style='max-width: 49%; font-size: 1.6cqw; font-weight: bold; margin: 0 0 1cqw 0'>Frontend developer, Tickitto AI Ltd, London, UK — July 2022 - Present</h1>
        <div style='max-width: 49%; line-height: 1.35'>${workExperienceText}</div>
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
education.style = 'padding-left: 13%; animation: fadeIn 2s forwards; display: flex; flex-direction: column; width: 100%; align-items: center; position: absolute; top: 21%; font-family: Cherry Swash; font-size: 1.05cqw;';
education.innerHTML = `
        <h1 style='max-width: 49%; font-size: 1.6cqw; font-weight: bold; margin: 0 0 1cqw 0'>University College London — BEng Electrical and Electronic Engineering— Sep 2019 - July 2022</h1>
        <div style='max-width: 49%; line-height: 1.35'>● Dissertation: Binaural sound source localisation with image classification on raw audio signals (Score: 79)<br>● Related Modules: Java programming module, C programming module, Connected Systems, Networking Systems, Internet of Things, Robotics, Digital Signal Processing, Advanced Digital Design<br></div>
        <h2 style='max-width: 49%; font-size: 1.6cqw; font-weight: bold; margin: 1cqw 0'>Dissertation — Binaural sound source localisation with image classification on raw audio signals</h2>
        <div style='max-width: 49%; line-height: 1.35'>${educationText}</div>
`;


const DUMMY_SCALE = 3;
const DUMMY_FRAME_SIZE = 48 * DUMMY_SCALE;

const HIT_FX_SIZE = 64 * DUMMY_SCALE;
const hitFXFrames = [];
for (let i = 1; i <= 5; i++) {
    const frame = new Image();
    frame.src = `../images/trainingDummy/hitFX${i}.png`;
    hitFXFrames.push(frame);
}

class Target {
    constructor({ platform, page }) {
        this.width = 31 * DUMMY_SCALE;
        this.height = 35 * DUMMY_SCALE;
        this.drawPosition = {
            x: platform.x + PLATFORM_WIDTH / 2 - DUMMY_FRAME_SIZE / 2,
            y: platform.y - DUMMY_FRAME_SIZE,
        };
        this.position = {
            x: this.drawPosition.x + 9 * DUMMY_SCALE,
            y: this.drawPosition.y + 13 * DUMMY_SCALE,
        };
        this.light = {
            x: platform.x + 24,
            y: platform.y - 12,
            radius: 9,
        };
        this.page = page;
        this.active = false;

        this.idleImage = new Image();
        this.idleImage.src = '../images/trainingDummy/idle.png';
        this.hitFrames = [];
        for (let i = 1; i <= 5; i++) {
            const frame = new Image();
            frame.src = `../images/trainingDummy/hit${i}.png`;
            this.hitFrames.push(frame);
        }
        this.hitFrameCurrent = -1; 
        this.framesElapsed = 0;
        this.framesHold = 6;
        this.fxFrameCurrent = -1;
        this.fxFramesElapsed = 0;
        this.fxFramesHold = 4;
    }

    hit() {
        if (this.hitFrameCurrent === -1) {
            this.hitFrameCurrent = 0;
            this.framesElapsed = 0;
            this.fxFrameCurrent = 0;
            this.fxFramesElapsed = 0;
        }
    }

    draw() {
        let image = this.idleImage;
        if (this.hitFrameCurrent >= 0) {
            image = this.hitFrames[this.hitFrameCurrent];
            this.framesElapsed++;
            if (this.framesElapsed % this.framesHold === 0) {
                this.hitFrameCurrent++;
                if (this.hitFrameCurrent >= this.hitFrames.length) {
                    this.hitFrameCurrent = -1;
                }
            }
        }

        c.save();
        c.imageSmoothingEnabled = false;
        c.translate(this.drawPosition.x + DUMMY_FRAME_SIZE, this.drawPosition.y);
        c.scale(-1, 1);
        c.drawImage(image, 0, 0, DUMMY_FRAME_SIZE, DUMMY_FRAME_SIZE);
        c.restore();

        if (this.fxFrameCurrent >= 0) {
            c.save();
            c.imageSmoothingEnabled = false;
            c.drawImage(
                hitFXFrames[this.fxFrameCurrent],
                this.position.x + this.width / 2 - HIT_FX_SIZE / 2,
                this.position.y + this.height / 2 - HIT_FX_SIZE / 2,
                HIT_FX_SIZE,
                HIT_FX_SIZE
            );
            c.restore();

            this.fxFramesElapsed++;
            if (this.fxFramesElapsed % this.fxFramesHold === 0) {
                this.fxFrameCurrent++;
                if (this.fxFrameCurrent >= hitFXFrames.length) {
                    this.fxFrameCurrent = -1;
                }
            }
        }

        c.save();
        c.beginPath();
        c.arc(this.light.x, this.light.y, this.light.radius, 0, Math.PI * 2);
        if (this.active) {
            c.shadowColor = 'rgb(255, 220, 120)';
            c.shadowBlur = 25;
            c.fillStyle = 'rgb(255, 220, 120)';
        } else {
            c.fillStyle = 'rgba(50, 50, 50, 0.85)';
        }
        c.fill();
        c.restore();
    }
}

const targets = [
    new Target({ platform: platforms.contact, page: contactDetails }),
    new Target({ platform: platforms.experience, page: workExperience }),
    new Target({ platform: platforms.education, page: education }),
];

let displayedPage = null;

function showSection(hitTarget) {
    if (displayedPage === hitTarget.page) return;

    targets.forEach((target) => {
        target.active = target === hitTarget;
    });

    if (displayedPage && stage.contains(displayedPage)) {
        stage.removeChild(displayedPage);
    }
    displayedPage = hitTarget.page;
    stage.appendChild(displayedPage);
}

showSection(targets[0]);

function getAttackBox() {
    const range = 90;
    return {
        position: {
            x: hero.flip ? hero.hitbox.position.x - range : hero.hitbox.position.x + hero.hitbox.width,
            y: hero.hitbox.position.y,
        },
        width: range,
        height: hero.hitbox.height,
    };
}

let attackHandled = false;

function checkAttackHits() {
    if (!hero.isAttacking) {
        attackHandled = false;
        return;
    }
    if (attackHandled) return;

    const attackBox = getAttackBox();
    let hitTarget = null;
    let hitTargetDistance = Infinity;
    targets.forEach((target) => {
        if (collision({ object1: attackBox, object2: target })) {
            const dx = target.position.x + target.width / 2 - (hero.hitbox.position.x + hero.hitbox.width / 2);
            const dy = target.position.y + target.height / 2 - (hero.hitbox.position.y + hero.hitbox.height / 2);
            const distance = dx * dx + dy * dy;
            if (distance < hitTargetDistance) {
                hitTargetDistance = distance;
                hitTarget = target;
            }
        }
    });

    if (hitTarget) {
        attackHandled = true;
        hitTarget.hit();
        showSection(hitTarget);
    }
}

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
    c.drawImage(backgroundImage, 0, 0, GAME_WIDTH, GAME_HEIGHT);

    c.font = '24px Cherry Swash';
    c.fillStyle = 'white';
    c.shadowColor = 'black';
    c.shadowBlur = 9;

    Object.values(platforms).forEach((platform) => {
        c.drawImage(platformImage, platform.x, platform.y, PLATFORM_WIDTH, BLOCK_SIZE);
        c.drawImage(hangingSign, platform.x - 20, platform.y, 260, 140);
        const labelWidth = c.measureText(platform.label).width;
        c.fillText(platform.label, platform.x + PLATFORM_WIDTH / 2 - labelWidth / 2, platform.y + 85);
    });

    c.shadowColor = 'transparent';
    c.shadowBlur = 0;

    targets.forEach((target) => target.draw());

    c.beginPath();
    hero.update();
    checkAttackHits();
    homePortal.update(hero.hitbox);

}
animate();
