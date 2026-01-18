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
        // matrix transformation to find the point.
        // what's odd is it feels like the context uses row vectors instead of column vectors.
        // normally this matrix operation (45-degree 2D rotation) would have yielded the 282 on the Y-coordinate
        // as if points were defined using column vectors, yet here it respects the row-vector format...
        // it is also very well possible that the transformation matrix is defined as row-major instead
        // of column-major...
        context.rotate(45 * Math.PI / 180);
        context.drawImage(this.image, 0, 0, 100, 150, 282.843, 0, w*2, h*2);
        context.restore();
    }

    update() {

    }
}