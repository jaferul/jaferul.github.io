function resizeCanvas(canvas) {
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight;
}

// Select the first canvas and its context
const canvas1 = document.getElementById('canvas1');
resizeCanvas(canvas1);
const ctx1 = canvas1.getContext('2d');

// Draw on the first canvas
var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;

window.addEventListener('mousemove', (e) => {
    mouse.x = e.x;
    mouse.y = e.y;

})
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});

class Circle {

    constructor(x, y, dx, dy, radius, colour) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.minRadius = radius;
        this.colour = colour;
    }


    draw() {

        ctx1.beginPath();
        ctx1.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        ctx1.strokeStyle = this.colour;
        ctx1.stroke();
        ctx1.fillStyle = this.colour;
        ctx1.fill();
    }
    update() {
        if(this.x + this.radius > innerWidth || this.x - this.radius < 0)
            this.dx = -this.dx

        if(this.y + this.radius > innerHeight || this.y - this.radius < 0)
            this.dy = -this.dy

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if(mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50 && this.radius < maxRadius)
            this.radius += 1;
        else if(this.radius > this.minRadius)
            this.radius -= 1;

        this.draw();

    }
}

    var circleArray = [];

    for(let i = 0; i < 4800; i++) {
        var x = Math.random() * (innerWidth - radius * 2) + radius;
        var dx = (Math.random() - 0.5) * 3;
        var y = Math.random() * (innerHeight - radius * 2) + radius;
        var dy = (Math.random() - 0.5) * 3;
        var radius = Math.random() * 4 + 1;
        circleArray.push(new Circle(x, y, dx, dy, radius, `rgb(${Math.random()*255}, ${Math.random()*255}, ${Math.random()*255})`));
    }

    function animate() {
        requestAnimationFrame(animate);
        ctx1.clearRect(0, 0, innerWidth, innerHeight);
        for(let i = 0; i < circleArray.length; i++)
            circleArray[i].update();
    }
    animate();

// Select the second canvas and its context
const canvas2 = document.getElementById('canvas2');
resizeCanvas(canvas2);
const ctx2 = canvas2.getContext('2d');

// Draw on the second canvas
ctx2.fillStyle = 'green';
ctx2.fillRect(20, 20, canvas2.width / 2 - 40, canvas2.height / 2 - 40);

// Resize canvases when the window is resized
window.addEventListener('resize', () => {
    resizeCanvas(canvas1);
    resizeCanvas(canvas2);

    // Redraw the first canvas
    ctx1.clearRect(0, 0, canvas1.width, canvas1.height);
    ctx1.fillStyle = 'red';
    ctx1.fillRect(10, 10, canvas1.width / 2 - 20, canvas1.height / 2 - 20);
    ctx1.fillStyle = 'blue';
    ctx1.fillRect(canvas1.width / 4, canvas1.height / 4, canvas1.width / 2, canvas1.height / 2);

    // Redraw the second canvas
    ctx2.clearRect(0, 0, canvas2.width, canvas2.height);
    ctx2.fillStyle = 'green';
    ctx2.fillRect(20, 20, canvas2.width / 2 - 40, canvas2.height / 2 - 40);
    ctx2.fillStyle = 'yellow';
    ctx2.fillRect(canvas2.width / 4, canvas2.height / 4, canvas2.width / 2, canvas2.height / 2);
});
