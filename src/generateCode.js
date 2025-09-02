export function generateCode(html,css,js){
    return  `
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<base target="_self">
<style>${css}</style>
<script defer>
  document.addEventListener('DOMContentLoaded', function() {
    try {
      ${js}
    } catch (err) {
      console.error(err);
    }
  });
</script>
</head>
<body>
${html}
</body>
</html>`
}

const dhtml = `
<canvas class="particle-canvas" id="particleCanvas"></canvas>
<main>
    <section class="hero" id="home">
        <div class="floating-elements" id="floatingElements"></div>
    </section>     
</main>
`

const dcss = `
* {
      margin: 0;
      padding: 0;
      box-sizing: border-box;
  }

  body {
      background: linear-gradient(-45deg, #667eea, #764ba2, #f093fb, #f5576c);
      background-size: 400% 400%;
      animation: gradientShift 15s ease infinite;
      overflow-x: hidden;
  }

  @keyframes gradientShift {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
  }

  .hero {
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      color: white;
      position: relative;
  }

  .floating-elements {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
  }

  .floating-element {
      position: absolute;
      background: rgba(255, 255, 255, 0.1);
      border-radius: 50%;
      animation: float 6s ease-in-out infinite;
  }

  .particle-canvas {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: -1;
  }
`

const djs = `
class ParticleSystem {
    constructor() {
        this.canvas = document.getElementById('particleCanvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.mouse = { x: 0, y: 0 };
        
        this.resize();
        this.createParticles();
        this.animate();
        
        window.addEventListener('resize', () => this.resize());
        window.addEventListener('mousemove', (e) => {
            this.mouse.x = e.clientX;
            this.mouse.y = e.clientY;
        });
    }
    
    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }
    
    createParticles() {
        const particleCount = Math.min(100, Math.floor(window.innerWidth / 20));
        for (let i = 0; i < particleCount; i++) {
            this.particles.push({
                x: Math.random() * this.canvas.width,
                y: Math.random() * this.canvas.height,
                vx: (Math.random() - 0.5) * 2,
                vy: (Math.random() - 0.5) * 2,
                size: Math.random() * 3 + 1,
                opacity: Math.random() * 0.5 + 0.2
            });
        }
    }
    
    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.particles.forEach(particle => {
            const dx = this.mouse.x - particle.x;
            const dy = this.mouse.y - particle.y;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 150) {
                const force = (150 - distance) / 150;
                particle.vx += dx / distance * force * 0.1;
                particle.vy += dy / distance * force * 0.1;
            }
            
            particle.x += particle.vx;
            particle.y += particle.vy;
            
            if (particle.x < 0 || particle.x > this.canvas.width) particle.vx *= -1;
            if (particle.y < 0 || particle.y > this.canvas.height) particle.vy *= -1;
            
            particle.vx *= 0.99;
            particle.vy *= 0.99;
            
            this.ctx.beginPath();
            this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
            this.ctx.fillStyle = \`rgba(255, 255, 255, \${particle.opacity})\`;
            this.ctx.fill();
            
            this.particles.forEach(otherParticle => {
                const dx = particle.x - otherParticle.x;
                const dy = particle.y - otherParticle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(particle.x, particle.y);
                    this.ctx.lineTo(otherParticle.x, otherParticle.y);
                    this.ctx.strokeStyle = \`rgba(255, 255, 255, \${0.1 * (1 - distance / 100)})\`;
                    this.ctx.stroke();
                }
            });
        });
        
        requestAnimationFrame(() => this.animate());
    }
}

const particleSystem = new ParticleSystem();

function createFloatingElements() {
    const container = document.getElementById('floatingElements');
    const elementCount = 15;
    
    for (let i = 0; i < elementCount; i++) {
        const element = document.createElement('div');
        element.className = 'floating-element';
        element.style.width = Math.random() * 100 + 50 + 'px';
        element.style.height = element.style.width;
        element.style.left = Math.random() * 100 + '%';
        element.style.top = Math.random() * 100 + '%';
        element.style.animationDelay = Math.random() * 6 + 's';
        element.style.animationDuration = (Math.random() * 4 + 4) + 's';
        container.appendChild(element);
    }
}

createFloatingElements();

const ctaButton = document.getElementById('ctaButton');
ctaButton.addEventListener('click', function(e) {
    e.preventDefault();
    
    const circle = document.createElement('div');
    circle.style.position = 'absolute';
    circle.style.borderRadius = '50%';
    circle.style.background = 'rgba(255, 255, 255, 0.3)';
    circle.style.width = circle.style.height = '0px';
    circle.style.left = e.offsetX + 'px';
    circle.style.top = e.offsetY + 'px';
    circle.style.transform = 'translate(-50%, -50%)';
    circle.style.animation = 'expandFade 0.8s ease-out';
    circle.style.pointerEvents = 'none';
    
    this.style.position = 'relative';
    this.appendChild(circle);
    
    setTimeout(() => circle.remove(), 800);
    setTimeout(() => {
        document.getElementById('features').scrollIntoView({ behavior: 'smooth' });
    }, 300);
});
`


export const defaultcode =`
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Document</title>
<base target="_self">
<style>${dcss}</style>
<script defer>
  document.addEventListener('DOMContentLoaded', function() {
    try {
      ${djs}
    } catch (err) {
      console.error(err);
    }
  });
</script>
</head>
<body>
${dhtml}
</body>
</html>
`
export const defaultdata={
    html:dhtml,
    css:dcss,
    js:djs
}
