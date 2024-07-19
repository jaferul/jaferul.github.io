class Sprite {
    constructor({ position, imageSrc, scale = 1, framesMax = 1, velocity, sprites = {}, flip = false, platformCollisionBlocks }) {
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
        this.platformCollisionBlocks = platformCollisionBlocks;
        this.gravity = 0.2;
        this.flip = flip;
        this.keys = {
            left: { pressed: false },
            right: { pressed: false },
            up: { pressed: false },
        };
        this.lastKey = undefined;
        this.numberOfJumps = 0;

        this.hitbox = {
            position: {
                x: this.position.x + 180,
                y: this.position.y + 100,
            },
            width: 50,
            height: 157,
        };

        for (const sprite in this.sprites) {
            this.sprites[sprite].image = new Image();
            this.sprites[sprite].image.src = this.sprites[sprite].imageSrc;
            this.sprites[sprite].image.framesMax = this.sprites[sprite].framesMax;
        }

        this.addEventListeners();
    }

    addEventListeners() {
        window.addEventListener('keydown', (e) => {
            switch (e.key) {
                case 'a':
                case 'ArrowLeft':
                    this.keys.left.pressed = true;
                    this.lastKey = 'left';
                    break;
                case 'd':
                case 'ArrowRight':
                    this.keys.right.pressed = true;
                    this.lastKey = 'right';
                    break;
                case 'w':
                case 'ArrowUp':
                    this.keys.up.pressed = true;
                    this.numberOfJumps++;
                    if(this.velocity.y === 0 || this.numberOfJumps <= 2)
                        this.velocity.y = -10;

                    this.keys.up.pressed = false;
                    break;
            }
        });

        window.addEventListener('keyup', (e) => {
            switch (e.key) {
                case 'a':
                case 'ArrowLeft':
                    this.keys.left.pressed = false;
                    break;
                case 'd':
                case 'ArrowRight':
                    this.keys.right.pressed = false;
                    break;
                case 'w':
                case 'ArrowUp':
                    this.keys.up.pressed = false;
                    break;
            }
        });
    }

    draw() {
        c.save();
        if (this.flip) {
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
        this.updateHitbox();
        this.draw();
        this.framesElapsed++;

        if (this.hitbox.position.x + this.velocity.x >= 0 && this.hitbox.position.x + this.velocity.x + this.hitbox.width <= innerWidth) {
            this.position.x += this.velocity.x;
        }

        if (this.framesElapsed % this.framesHold === 0) {
            this.framesCurrent = (this.framesCurrent + 1) % this.framesMax;
        }

        this.velocity.x = 0;
        this.image = this.sprites.idle.image;
        this.framesMax = this.sprites.idle.framesMax;

        if (this.keys.left.pressed && this.lastKey === 'left') {
            this.velocity.x = -10;
            this.image = this.sprites.run.image;
            this.framesMax = this.sprites.run.framesMax;
            this.flip = true;
        } else if (this.keys.right.pressed && this.lastKey === 'right') {
            this.velocity.x = 10;
            this.image = this.sprites.run.image;
            this.framesMax = this.sprites.run.framesMax;
            this.flip = false;
        }

        if (this.velocity.y < 0) {
            this.image = this.sprites.jump.image;
            this.framesMax = this.sprites.jump.framesMax;
        }

        if (this.velocity.y > 0) {
            this.image = this.sprites.fall.image;
            this.framesMax = this.sprites.fall.framesMax;
        }

        if (this.velocity.y === 0) {
            this.numberOfJumps = 0;
        }

        this.updateHitbox();
        this.checkForVerticalCollisions();
    }

    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + 180,
                y: this.position.y + 100,
            },
            width: 50,
            height: 157,
        };
    }

    applyGravity() {
        let onGround = this.hitbox.position.y + this.hitbox.height + this.velocity.y + 30 >= innerHeight;
        if (!onGround) {
            this.velocity.y += this.gravity;
            this.position.y += this.velocity.y;
        } else {
            this.velocity.y = 0;
        }
    }

    checkForVerticalCollisions() {
        if (typeof cvPortal !== 'undefined' && collision({ object1: this.hitbox, object2: cvPortal.portalHitbox })) {
            window.location.href = cvPortal.portalHitbox.portalLink;
        }

        if (typeof gamesPortal !== 'undefined' && collision({ object1: this.hitbox, object2: gamesPortal.portalHitbox })) {
            window.location.href = gamesPortal.portalHitbox.portalLink;
        }

        if (typeof animationsPortal !== 'undefined' && collision({ object1: this.hitbox, object2: animationsPortal.portalHitbox })) {
            window.location.href = animationsPortal.portalHitbox.portalLink;
        }

        this.applyGravity();

        // platform collision blocks
        for (let i = 0; i < this.platformCollisionBlocks.length; i++) {
            const platformCollisionBlock = this.platformCollisionBlocks[i];

            if (platformCollision({ object1: this.hitbox, object2: platformCollisionBlock })) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0;

                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height;
                    this.position.y = platformCollisionBlock.position.y - offset - 0.01;
                    break;
                }
            }
        }
    }
}
