class Portal {
    constructor({ image, framesHold, xPosition, yPosition, portalLink = '../index.html', portalHitbox }) {
        this.image = image;
        this.image.onload = () => {
            this.imageLoaded = true;
        };
        this.image.onerror = (e) => {
            console.error(`Failed to load image: ${e.message}`);
            this.imageLoaded = false;
        };

        this.portalFramesCurrent = 0;
        this.portalFramesElapsed = 0;
        this.portalFramesMax = 3;
        this.portalScale = 3;

        this.framesHold = framesHold;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.portalLink = portalLink;
        this.portalHitbox = portalHitbox;
        
    }

    draw() {
        if (this.imageLoaded) {
            c.save();
            // c.fillStyle = 'rgba(255, 0, 0, 0.5)'
            // c.fillRect(this.xPosition + 30, this.yPosition, 40 , this.image.height * this.portalScale)
            c.drawImage(
                this.image,
                this.portalFramesCurrent * (this.image.width / this.portalFramesMax),
                0,
                this.image.width / this.portalFramesMax,
                this.image.height / 2,
                this.xPosition,
                this.yPosition,
                (this.image.width / this.portalFramesMax) * this.portalScale,
                this.image.height * this.portalScale
            );
            c.restore();
        }
    }

    update() {
        this.draw();
        this.portalFramesElapsed++;

        if (this.portalFramesElapsed % this.framesHold === 0) {
            if (this.portalFramesCurrent < this.portalFramesMax - 1) {
                this.portalFramesCurrent++;
            } else {
                this.portalFramesCurrent = 0;
            }
        }

        this.portalHitbox= {
            position: {
                x: this.xPosition + 30,
                y: this.yPosition
            },
            width: 40,
            height: this.image.height * this.portalScale,
            portalLink: this.portalHitbox.portalLink,
        };
    }
}
