/**
 * Creates a basic character
 *
 * @author Roman Bureacov
 */
class character {
    constructor(game, image) {
        Object.assign(this, { game, image });
        this.spritesheet = new Spritesheet(this.image, 3, 14);

        this.position = {x: 0, y: 0};
        this.scale = {x: 2, y: 2};
        this.state = "idle";
        this.facing = "right";
        this.dx = 0;

        this.setupAnimation();
    }

    setupAnimation() {
        this.animations = {
            "move right" : new Animator(
                this.spritesheet,
                [ [1, 0], [1, 1], [1, 2], [1, 3], [1, 4], [1, 5] ],
                0.25),
            "move left": new Animator(
                this.spritesheet,
                [ [1, 13], [1, 12], [1, 11], [1, 10], [1, 9], [1, 8] ],
                0.25
            ),
            "idle right": new Animator(
                this.spritesheet,
                [ [0, 0] ],
                1
                ),
            "idle left": new Animator(
                this.spritesheet,
                [ [0, 13] ],
                1
            ),
            "attack right": new Animator(
                this.spritesheet,
                [ [2, 0], [2, 1], [2, 2], [2, 3], [2, 4], [2, 5], [2, 6] ],
                0.25,
                false,
                () => this.state = "idle"
            ),
            "attack left": new Animator(
                this.spritesheet,
                [ [2, 13], [2, 12], [2, 11], [2, 10], [2, 9], [2, 8], [2, 7] ],
                0.25,
                false,
                () => this.state = "idle"
            ),
        };

        this.currentAnimation = this.animations[this.animationName()];
    }

    move(dx) {
        this.state = "move";
        this.dx = dx;
        this.facing = dx < 0 ? "left" : "right";
    }

    swing() {
        this.state = "attack";
    }

    draw(context) {
        let anim = this.animations[this.animationName()];

        // are we switching animations?
        if (anim !== this.currentAnimation) this.currentAnimation.reset();

        (this.currentAnimation = anim).draw(
            this.game.clockTick,
            context,
            this.position.x, this.position.y,
            this.scale.x, this.scale.y);
    }

    animationName() {
        return this.state + " " + this.facing;
    }

    update() {
        ({
            "attack" : () => {

            },
            "move" : () => {
                if (this.dx !== 0) {
                    this.position.x += this.dx;
                    this.dx = 0;
                } else this.state = "idle"
            }
        })[this.state]?.();
    }
}