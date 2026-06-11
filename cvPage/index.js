var canvas = document.getElementById('cvPage');
var stage = document.getElementById('stage');

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

let backgroundImage = new Image();
backgroundImage.src = '../images/scrollBackground.png';

let platformImage = new Image();
platformImage.src = '../images/platform.png';

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
        <div style='max-width: 49%; font-size: 1.05cqw; line-height: 1.35'>
            <b>Front-end development:</b> JavaScript (ES5, ES6+), TypeScript, React.js, Next.js (v13, v14, Pages router, App router), Tailwind CSS, CSS / SASS, Styled Components, Mantine<br>
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


const workExperienceText = `● Optimised and maintained the initial company website using ReactJS, TypeScript, CSS/SASS and Netlify.<br>
● Led the full revamp using NextJS, TypeScript, Tailwind CSS and Vercel, leveraging Mantine for custom component creation.<br>
● Integrated Sanity IO CMS for content management, including white label capabilities for partners such as American Express and Careem.<br>
● Led implementation of the business website using NextJS 14 and App Router with full CMS customisability.<br>
● Built a custom internal CMS for the content team, automating manual content processes end-to-end — designed the frontend and developed API endpoints with Python, FastAPI and MongoDB.<br>
● Developed responsive, reusable components incorporating W3C Accessibility Guidelines with Jest and Cypress test suites.<br>
● Worked in an agile environment utilising Git and GitHub for code management, and JIRA and Asana for task management.<br>
● Managed a Turborepo monorepo handling multiple standalone apps sharing design components, each with independent deployment.<br>
● Used Git and Github for code management and JIRA and Asana for tickets and tasks management<br>
● Conducted SEO optimisation via Google Search Console, improving site visibility and search performance.<br>
● Implemented Google Tag Manager, Analytics, and Zendesk scripts; contributed to UI design in Figma.<br>`;


const workExperience = document.createElement('div');
workExperience.style = 'padding-left: 13%; animation: fadeIn 2s forwards; display: flex; flex-direction: column; width: 100%; align-items: center; position: absolute; top: 21%; font-family: Cherry Swash; font-size: 1.05cqw;';
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

let displayedPage = contactDetails
stage.appendChild(displayedPage);

function setDisplayedPage(page, button) {
    if (stage.contains(displayedPage)) {
        stage.removeChild(displayedPage);
    }

    switch(page) {
        case contactDetails:
            stage.appendChild(contactDetails);
            break;
        case workExperience:
            stage.appendChild(workExperience);
            break;
        case education:
            stage.appendChild(education);
            break;
        default:
            break;
    }
    displayedPage = page;

    document.querySelectorAll('.optionsButtons').forEach(btn => {
        btn.style.boxShadow = 'none';
        btn.style.backgroundColor =  'inherit';

    });
    button.style.boxShadow = '0 0 3.9cqw 1.56cqw rgb(245, 172, 70)';
    button.style.backgroundColor =  'rgba(245, 172, 70, 0.8)';

}

const buttonContainer = document.createElement('div');
buttonContainer.style = 'position: absolute; height: 100%; top: 9.3%; left: 6%; display: flex; flex-direction: column; z-index: 2; ';
buttonContainer.innerHTML = `
    <button style='background-color: rgba(245, 172, 70,0.8); box-shadow: 0 0 3.9cqw 1.56cqw rgb(245, 172, 70)' class='optionsButtons' onclick='setDisplayedPage(contactDetails, this)'>Contact Details</button>
    <button style='margin-top: 6cqh' class='optionsButtons' onclick='setDisplayedPage(workExperience, this)'>Experience</button>
    <button style='margin-top: 5.5cqh' class='optionsButtons' onclick='setDisplayedPage(education, this)'>Education</button>
`;
stage.appendChild(buttonContainer);

let groundSign = new Image();
groundSign.src = '../images/groundSign.png';

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

    c.font = '32px Cherry Swash';
    c.fillStyle = 'white';

    c.drawImage(groundSign,  0.05 * GAME_WIDTH,  GAME_HEIGHT - 160, 260, 140);
    c.fillText('Home', 0.05 * GAME_WIDTH + 80, GAME_HEIGHT - 160 + 60);

    c.beginPath();    
    hero.update();
    homePortal.update(hero.hitbox);

}
animate();