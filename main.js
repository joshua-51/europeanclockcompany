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

  // Video Scrubbing on Scroll
  const video = document.getElementById('hero-video');
  const scrollContainer = document.querySelector('.video-scroll-container');
  
  // Make sure video is loaded enough to get its duration
  video.addEventListener('loadedmetadata', () => {
    // Scrub logic
    window.addEventListener('scroll', () => {
      // Get the bounding rectangle of the scroll container
      const rect = scrollContainer.getBoundingClientRect();
      const containerTop = rect.top;
      const containerHeight = rect.height;
      
      // Calculate scroll progress (0 to 1)
      // containerTop is 0 when the top of the container hits the top of the viewport
      // It becomes negative as we scroll down.
      // We want to track progress from when containerTop hits 0 until the bottom of the container hits the bottom of the viewport
      
      // The total scrollable distance for the container
      const scrollableDistance = containerHeight - window.innerHeight;
      
      let progress = -containerTop / scrollableDistance;
      
      // Clamp progress between 0 and 1
      if (progress < 0) progress = 0;
      if (progress > 1) progress = 1;
      
      // Update video current time
      if (video.duration) {
        // use requestAnimationFrame for smooth updating
        requestAnimationFrame(() => {
          video.currentTime = video.duration * progress;
        });
      }
    });
  });

  // Smooth scrolling for anchor links
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
