/**
 * Creates a basic character
 *
 * @author Roman Bureacov
 */
class character {
    constructor(image) {
        Object.assign(this, { image });

        this.state = "idle";
        this.i = 0
    }

    move(dx) {
        if (dx < 0) {
            this.state = "move left";
        } else {
            this.state = "move right";
        }
    }

    swing() {
        this.state = "swing";
    }

    draw(context) {
        let x = 200;
        let y = 200;
        let w = 100;
        let h = 150;

        context.moveTo(100, 100);
        context.strokeStyle = "red";
        context.strokeRect(x, y, w*2, h*2);

        context.save();
        // if negative scale
        context.scale(-1, 1);
        context.drawImage(this.image, 0, 0, 100, 150, -x - w*2, y, w*2, h*2);

        // if positive scale
        //context.drawImage(this.image, 0, 0, 100, 150, x, y, w*2, h*2);
        context.restore();
    }

    update() {

    }
}