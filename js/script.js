const canvas = document.getElementById("ripple-canvas");

if (canvas) {

  const ctx = canvas.getContext("2d");

  let width = canvas.width = window.innerWidth;
  let height = canvas.height = window.innerHeight;

  const ripples = [];

  window.addEventListener("resize", () => {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  });

  class Ripple {
    constructor(x, y) {
      this.x = x;
      this.y = y;

      this.radius = 0;
      this.maxRadius = 180;

      this.alpha = 0.35;
      this.speed = 2.5;
    }

    update() {
      this.radius += this.speed;
      this.alpha -= 0.0035;
    }

    draw() {
      ctx.beginPath();

      ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

      ctx.strokeStyle = `rgba(109,181,202, ${this.alpha})`;
      ctx.lineWidth = 2;

      ctx.stroke();

      // inner glow
      ctx.beginPath();

      ctx.arc(this.x, this.y, this.radius * 0.6, 0, Math.PI * 2);

      ctx.strokeStyle = `rgba(255,114,53, ${this.alpha * 0.6})`;
      ctx.lineWidth = 1;

      ctx.stroke();
    }
  }

  window.addEventListener("mousemove", (e) => {
    ripples.push(new Ripple(e.clientX, e.clientY));
  });

  function animate() {

    ctx.clearRect(0, 0, width, height);

    for (let i = ripples.length - 1; i >= 0; i--) {

      ripples[i].update();
      ripples[i].draw();

      if (ripples[i].alpha <= 0) {
        ripples.splice(i, 1);
      }
    }

    requestAnimationFrame(animate);
  }

  animate();
}

/* ===== CLOCK ===== */

function updateClock() {

  const timeElement = document.getElementById('time');
  const dateElement = document.getElementById('date');

  if (!timeElement || !dateElement) return;

  const now = new Date();

  const hours = String(now.getHours()).padStart(2, '0');
  const minutes = String(now.getMinutes()).padStart(2, '0');
  const seconds = String(now.getSeconds()).padStart(2, '0');

  timeElement.innerText =
    `${hours}:${minutes}:${seconds}`;

  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  dateElement.innerText =
    now.toLocaleDateString('en-US', options);
}

updateClock();
setInterval(updateClock, 1000);