(function () {
    const canvas = document.createElement("canvas");
    canvas.id = "sparkleCanvas";
    document.body.appendChild(canvas);

    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ["#ff5f5f", "#ffd55f", "#5fffa1", "#5fafff", "#ff5fff"];

    // Particle class
    class Particle {
        constructor(x, y) {
            this.x = x;
            this.y = y;
            this.size = Math.random() * 4 + 1;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            this.velocityX = Math.random() * 3 - 1.5;
            this.velocityY = Math.random() * 3 - 1.5;
            this.life = 50;
        }

        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = this.color;
            ctx.fill();
        }

        update() {
            this.x += this.velocityX;
            this.y += this.velocityY;
            this.size *= 0.95;
            this.life--;
        }
    }

    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        particles.forEach((particle, index) => {
            particle.update();
            particle.draw();

            if (particle.life <= 0 || particle.size <= 0.5) {
                particles.splice(index, 1);
            }
        });

        requestAnimationFrame(animate);
    }

    // Add particles on mouse move
    window.addEventListener("mousemove", (event) => {
        for (let i = 0; i < 5; i++) {
            particles.push(new Particle(event.clientX, event.clientY));
        }
    });

    // Handle canvas resize
    window.addEventListener("resize", () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });

    // Prevent conflict during scroll
    window.addEventListener("scroll", () => {
        setTimeout(() => {
            // Update particles while scrolling
            particles.forEach((particle) => {
                particle.update();
            });
        }, 50);
    });

    animate();
})();




