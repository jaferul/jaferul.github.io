let portalFramesCurrent = 0;
let portalFramesElapsed = 0;
let portalFramesMax = 3;
let portalScale = 3;
let portalHitbox = {
    position: {
        x: 700 + 30, // Adjust these coordinates based on your portal's position
        y: 700
    },
    width: 40,
    height: 192,
    portalLink: '',
};

const createPortal = (image, framesHold, xPosition, yPosition, portalLink='./index.html') => {
    // c.fillStyle = 'rgba(255, 0, 0, 0.5)'
    // c.fillRect(xPosition + 30, yPosition, 40 , image.height * portalScale)
    portalHitbox= {
        position: {
            x: xPosition + 30,
            y: yPosition
        },
        width: 40,
        height: image.height * portalScale,
        portalLink: portalLink,
    };

    portalFramesElapsed++;

    if (portalFramesElapsed % framesHold === 0) {
        if (portalFramesCurrent < portalFramesMax - 1) {
            portalFramesCurrent++;
        } else {
            portalFramesCurrent = 0;
        }
    }

    c.drawImage(
        image,
        portalFramesCurrent * (image.width / portalFramesMax),
        0,
        image.width / portalFramesMax,
        image.height / 2,
        xPosition,
        yPosition,
        (image.width / portalFramesMax) * portalScale,
        image.height * portalScale
    );
};