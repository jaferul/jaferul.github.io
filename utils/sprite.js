class Sprite {
    constructor({position, imageSrc, scale = 1, framesMax = 1, velocity, sprites = {}, flip = false,  platformCollisionBlocks}) {
        this.position = position;
        this.width = 50;
        this.height = 50;
        this.image = new Image();
        this.image.src = imageSrc;
        this.scale = scale;
        this.framesMax = framesMax;
        this.framesCurrent = 0;
        this.framesElapsed = 0;
        this.framesHold = 7;
        this.velocity = velocity;
        this.sprites = sprites;
        this.flip = flip;
        this.platformCollisionBlocks = platformCollisionBlocks
        this.hitbox = {
            position: {
                x: this.position.x + 180,
                y: this.position.y + 100,
            },
            width: 50,
            height: 157,
        }
        for(const sprite in this.sprites) {
            sprites[sprite].image = new Image();
            sprites[sprite].image.src = sprites[sprite].imageSrc;
            sprites[sprite].image.framesMax = sprites[sprite].framesMax;

        }

    }

    draw() {
        c.save();
        if (flip) {
            c.translate(this.position.x + (this.image.width / this.framesMax) * this.scale, this.position.y);
            c.scale(-1, 1);
            c.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                0,
                0,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            );
        } else {
            c.drawImage(
                this.image,
                this.framesCurrent * (this.image.width / this.framesMax),
                0,
                this.image.width / this.framesMax,
                this.image.height,
                this.position.x,
                this.position.y,
                (this.image.width / this.framesMax) * this.scale,
                this.image.height * this.scale
            );
        }
        c.restore();
    }
    

    update() {
        // image width and height
        // c.fillStyle = 'rgba(0, 255, 0, 0.5)'
        // c.fillRect(this.position.x, this.position.y, this.image.width / this.framesMax * this.scale, this.image.height * this.scale)
        // hitbox width and height
        // c.fillStyle = 'rgba(255, 0, 0, 0.5)'
        // c.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width , this.hitbox.height)

        this.updateHitbox()
        this.draw()
        this.applyGravity();
        this.framesElapsed++;

        if(this.hitbox.position.x + this.velocity.x >= 0  && this.hitbox.position.x + this.velocity.x + this.hitbox.width <= innerWidth)
            this.position.x += this.velocity.x;

        if(this.framesElapsed % this.framesHold === 0){
            if(this.framesCurrent < this.framesMax - 1)
                this.framesCurrent++;
            else
                this.framesCurrent = 0;
        }
        this.updateHitbox()
        this.checkForVerticalCollisions()
        

    }
    updateHitbox() {
    this.hitbox = {
        position: {
            x: this.position.x + 180,
            y: this.position.y + 100,
        },
        width: 50,
        height: 157,
    }
}
    applyGravity() {
        let onGround  = this.hitbox.position.y + this.hitbox.height + this.velocity.y + 30 >= innerHeight
        if(!onGround) {
            this.velocity.y += gravity
            this.position.y += this.velocity.y
        }
    }
    checkForVerticalCollisions() {
        if(typeof cvPortal !== 'undefined' && collision({object1: this.hitbox, object2: cvPortal.portalHitbox})) 
            window.location.href = cvPortal.portalHitbox.portalLink;

        if(typeof gamesPortal !== 'undefined' && collision({object1: this.hitbox, object2: gamesPortal.portalHitbox})) 
            window.location.href = gamesPortal.portalHitbox.portalLink;

        if(typeof animationsPortal !== 'undefined' && collision({object1: this.hitbox, object2: animationsPortal.portalHitbox})) 
            window.location.href = animationsPortal.portalHitbox.portalLink;

        if(this.hitbox.position.y + this.hitbox.height + this.velocity.y + 30 >= innerHeight)
            this.velocity.y = 0

        
        // platform collision blocks
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
          const platformCollisionBlock = this.platformCollisionBlocks[i];
          if (
            platformCollision({
                object1: this.hitbox,
                object2: platformCollisionBlock,
            })
          ) {
            if (this.velocity.y > 0) {
              this.velocity.y = 0
    
              const offset =
                this.hitbox.position.y - this.position.y + this.hitbox.height
    
              this.position.y = platformCollisionBlock.position.y - offset - 0.01
              break
            }
          }
        }
      }

}