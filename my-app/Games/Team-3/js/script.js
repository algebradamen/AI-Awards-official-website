// AI BUBBLE TECH WEBSITE - MAIN SCRIPT
// ==========================================

// Smooth scroll behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const href = this.getAttribute('href');
    if (href !== '#') {
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        updateActiveNav();
      }
    }
  });
});

// Update active navigation link
function updateActiveNav() {
  const sections = document.querySelectorAll('section, .hero');
  const navLinks = document.querySelectorAll('nav a[href^="#"]');
  
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });
  
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
}

// Listen for scroll
window.addEventListener('scroll', updateActiveNav);

// Scroll animations - reveal elements on scroll
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.animation = `${entry.target.dataset.animation || 'fade-in'} 0.8s ease-out forwards`;
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

// Observe all animated elements
document.querySelectorAll('[data-animation]').forEach(el => {
  el.style.opacity = '0';
  observer.observe(el);
});

// Bubble interaction - click to spawn floating bubbles
document.addEventListener('click', (e) => {
  if (e.target.classList.contains('bubble') || 
      e.target.classList.contains('card') ||
      e.target.closest('.bubble') ||
      e.target.closest('.card')) {
    spawnBubbleEffect(e.clientX, e.clientY);
  }
});

function spawnBubbleEffect(x, y) {
  const bubble = document.createElement('div');
  bubble.className = 'floating-bubble';
  bubble.style.position = 'fixed';
  bubble.style.left = x + 'px';
  bubble.style.top = y + 'px';
  bubble.style.width = '30px';
  bubble.style.height = '30px';
  bubble.style.borderRadius = '50%';
  bubble.style.pointerEvents = 'none';
  bubble.style.zIndex = '9999';
  
  const colors = ['#00D4FF', '#9D00FF', '#00FF41', '#FF006E'];
  const color = colors[Math.floor(Math.random() * colors.length)];
  
  bubble.style.background = `radial-gradient(circle, ${color}, transparent)`;
  bubble.style.boxShadow = `0 0 20px ${color}`;
  
  document.body.appendChild(bubble);
  
  let posX = x;
  let posY = y;
  let velX = (Math.random() - 0.5) * 8;
  let velY = (Math.random() - 0.5) * 8 - 2;
  let opacity = 1;
  
  const animate = () => {
    posX += velX;
    posY += velY;
    velY += 0.1; // Gravity
    opacity -= 0.02;
    
    bubble.style.left = posX + 'px';
    bubble.style.top = posY + 'px';
    bubble.style.opacity = opacity;
    
    if (opacity > 0) {
      requestAnimationFrame(animate);
    } else {
      bubble.remove();
    }
  };
  
  animate();
}

// Form submission handler
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    const formData = new FormData(contactForm);
    const data = Object.fromEntries(formData);
    
    // Show success message
    const submitBtn = contactForm.querySelector('[type="submit"]');
    const originalText = submitBtn.textContent;
    
    submitBtn.textContent = '✓ Message Sent!';
    submitBtn.style.background = 'linear-gradient(135deg, #00FF41, #00D4FF)';
    submitBtn.disabled = true;
    
    // Log the data (in a real app, send to backend)
    console.log('Contact Form Data:', data);
    
    // Reset after 2 seconds
    setTimeout(() => {
      contactForm.reset();
      submitBtn.textContent = originalText;
      submitBtn.style.background = '';
      submitBtn.disabled = false;
    }, 2000);
  });
}

// Animate team cards on hover
document.querySelectorAll('.team-card').forEach(card => {
  card.addEventListener('mouseenter', function() {
    this.closest('.card').style.boxShadow = 
      '0 0 30px #00D4FF, 0 0 60px #9D00FF, 0 0 90px #FF006E';
  });
  
  card.addEventListener('mouseleave', function() {
    this.closest('.card').style.boxShadow = 
      '0 0 20px #00D4FF, 0 0 40px rgba(0, 212, 255, 0.2), 0 15px 35px rgba(0, 212, 255, 0.15)';
  });
});

// Lazy load images
if ('IntersectionObserver' in window) {
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
        }
        imageObserver.unobserve(img);
      }
    });
  });
  
  document.querySelectorAll('img[data-src]').forEach(img => {
    imageObserver.observe(img);
  });
}

// Dynamic particle background effect
function createBackgroundParticles() {
  const canvas = document.createElement('canvas');
  canvas.id = 'particle-bg';
  canvas.style.position = 'fixed';
  canvas.style.top = '0';
  canvas.style.left = '0';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.zIndex = '-1';
  canvas.style.pointerEvents = 'none';
  
  // Only add to hero section for performance
  const hero = document.querySelector('.hero');
  if (hero) {
    hero.style.position = 'relative';
    hero.insertBefore(canvas, hero.firstChild);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    
    for (let i = 0; i < 30; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 0.5,
        speedX: (Math.random() - 0.5) * 0.5,
        speedY: (Math.random() - 0.5) * 0.5,
        opacity: Math.random() * 0.5 + 0.2,
        color: ['#00D4FF', '#9D00FF', '#00FF41', '#FF006E'][Math.floor(Math.random() * 4)]
      });
    }
    
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;
        
        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;
        
        ctx.fillStyle = p.color;
        ctx.globalAlpha = p.opacity;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });
      
      ctx.globalAlpha = 1;
      requestAnimationFrame(animate);
    }
    
    animate();
    
    window.addEventListener('resize', () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    });
  }
}

// Initialize particles on load
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', createBackgroundParticles);
} else {
  createBackgroundParticles();
}

// Mobile menu toggle (if navigation is added)
function initMobileMenu() {
  const nav = document.querySelector('nav');
  if (!nav) return;
  
  let menuOpen = false;
  const menuBtn = document.createElement('button');
  menuBtn.className = 'menu-toggle';
  menuBtn.style.display = 'none';
  menuBtn.style.background = 'none';
  menuBtn.style.border = 'none';
  menuBtn.style.color = '#00D4FF';
  menuBtn.style.fontSize = '1.5rem';
  menuBtn.style.cursor = 'pointer';
  menuBtn.innerHTML = '☰';
  
  const navUl = nav.querySelector('ul');
  if (navUl && window.innerWidth < 768) {
    nav.appendChild(menuBtn);
    menuBtn.style.display = 'block';
    navUl.style.display = 'none';
    
    menuBtn.addEventListener('click', () => {
      menuOpen = !menuOpen;
      navUl.style.display = menuOpen ? 'flex' : 'none';
      menuBtn.innerHTML = menuOpen ? '✕' : '☰';
    });
  }
}

initMobileMenu();

console.log('🚀 N.A.B.O Website Initialized - Ready to Innovate!');
