document.addEventListener('DOMContentLoaded', () => {
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Fade Sections using IntersectionObserver
  const fadeSections = document.querySelectorAll('.fade-section');
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.15
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  fadeSections.forEach(section => {
    observer.observe(section);
  });

  // Video Scrubbing on Scroll
  const video = document.getElementById('hero-video');
  const scrollContainer = document.querySelector('.video-scroll-container');
  const videoOverlay = document.querySelector('.video-overlay');
  
  video.addEventListener('loadedmetadata', () => {
    window.addEventListener('scroll', () => {
      const rect = scrollContainer.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      
      const scrollableDistance = containerHeight - window.innerHeight;
      let progress = -containerTop / scrollableDistance;
      
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      if (video.duration) {
        requestAnimationFrame(() => {
          video.currentTime = video.duration * progress;
          
          // Fade out the overlay text slightly faster as they scroll down
          if (progress > 0) {
            videoOverlay.style.opacity = Math.max(0, 1 - (progress * 2.5));
          } else {
            videoOverlay.style.opacity = 1;
          }
        });
      }
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });
});
