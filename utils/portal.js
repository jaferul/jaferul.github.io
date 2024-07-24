class Portal {
    constructor({ image, framesHold, xPosition, yPosition, portalLink }) {
        this.image = image;
        this.portalFramesCurrent = 0;
        this.portalFramesElapsed = 0;
        this.portalFramesMax = 3;
        this.portalScale = 3;

        this.framesHold = framesHold;
        this.xPosition = xPosition;
        this.yPosition = yPosition;
        this.portalHitbox = {
            position: {
                x: this.xPosition + 30,  
                y: this.yPosition
            },
            width: 40,
            height: 192,
        };
        this.portalLink = portalLink;

        
    }

    draw() {
            c.save();
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

    update(heroHitbox) {
        if(heroHitbox && collision({ object1: this.portalHitbox, object2: heroHitbox}))
            window.location.href = this.portalLink;


        this.draw();
        this.portalFramesElapsed++;

        if (this.portalFramesElapsed % this.framesHold === 0) {
            if (this.portalFramesCurrent < this.portalFramesMax - 1) {
                this.portalFramesCurrent++;
            } else {
                this.portalFramesCurrent = 0;
            }
        }

    }
}
