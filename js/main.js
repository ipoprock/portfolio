
document.addEventListener('DOMContentLoaded', () => {

  // Hero Slider
  const slides = document.querySelectorAll('.hero-slider .slide');
  const prevBtn = document.querySelector('.prev-slide');
  const nextBtn = document.querySelector('.next-slide');
  const dotsContainer = document.querySelector('.slider-dots');
  let currentSlide = 0;

  if (slides.length > 0) {
    const showSlide = (n) => {
      slides.forEach(slide => slide.classList.remove('active'));
      dots.forEach(dot => dot.classList.remove('active'));
      slides[n].classList.add('active');
      dots[n].classList.add('active');
    };

    const nextSlide = () => {
      currentSlide = (currentSlide + 1) % slides.length;
      showSlide(currentSlide);
    };

    const prevSlide = () => {
      currentSlide = (currentSlide - 1 + slides.length) % slides.length;
      showSlide(currentSlide);
    };

    // Create dots
    const dots = [];
    slides.forEach((_, i) => {
      const dot = document.createElement('div');
      dot.classList.add('dot');
      dot.addEventListener('click', () => showSlide(i));
      dotsContainer.appendChild(dot);
      dots.push(dot);
    });

    // Event Listeners
    nextBtn.addEventListener('click', nextSlide);
    prevBtn.addEventListener('click', prevSlide);

    // Auto slide
    setInterval(nextSlide, 5000);

    // Initial slide
    showSlide(currentSlide);
  }

  // Dynamic Project Loading
  const projectGrid = document.getElementById('project-grid');
  const searchInput = document.getElementById('search-input');
  const tagFilters = document.querySelectorAll('.tag-filter');

  if (projectGrid) {
    fetch('../data/projects.json')
      .then(response => response.json())
      .then(projects => {
        displayProjects(projects);

        searchInput.addEventListener('input', () => {
          const searchTerm = searchInput.value.toLowerCase();
          const filteredProjects = projects.filter(project => 
            project.title.toLowerCase().includes(searchTerm) || 
            project.description.toLowerCase().includes(searchTerm)
          );
          displayProjects(filteredProjects);
        });

        tagFilters.forEach(filter => {
          filter.addEventListener('click', () => {
            const selectedTag = filter.dataset.tag;
            tagFilters.forEach(f => f.classList.remove('active'));
            filter.classList.add('active');

            if (selectedTag === 'all') {
              displayProjects(projects);
            } else {
              const filteredProjects = projects.filter(project => project.tags.includes(selectedTag));
              displayProjects(filteredProjects);
            }
          });
        });
      });

    const displayProjects = (projects) => {
      projectGrid.innerHTML = '';
      projects.forEach(project => {
        const projectCard = document.createElement('a');
        projectCard.href = `project-${project.id}.html`;
        projectCard.classList.add('project-card');
        projectCard.innerHTML = `
          <img src="../${project.thumbnail}" alt="${project.title} Thumbnail" loading="lazy">
          <div class="project-card-overlay">
            <h3>${project.title}</h3>
            <p>${project.description || ''}</p>
          </div>
        `;
        projectGrid.appendChild(projectCard);
      });
    };
  }

  // Back to projects button
  const backToProjects = document.querySelector('.back-to-projects');
  if (backToProjects) {
    backToProjects.addEventListener('click', (e) => {
      e.preventDefault();
      window.location.href = 'index.html';
    });
  }

  // Per-letter animation for animated-heading
  const animatedHeadings = document.querySelectorAll('.animated-heading'); // Changed to querySelectorAll
  animatedHeadings.forEach(animatedHeading => { // Loop through each animated heading
    const letters = animatedHeading.querySelectorAll('span');
    letters.forEach(letter => {
      const defaultColor = animatedHeading.tagName === 'H1' ? 'white' : 'var(--primary-color)';
      // Set initial color for H2 spans to primary-color
      if (animatedHeading.tagName !== 'H1') {
        letter.style.color = defaultColor;
      }
      letter.addEventListener('mouseover', () => {
        letter.style.transform = 'scale(1.4)';
        letter.style.color = 'var(--secondary-color)'; // Change color on hover
      });
      letter.addEventListener('mouseout', () => {
        letter.style.transform = 'scale(1)';
        letter.style.color = defaultColor; // Reset color based on tag
      });
    });
  });

  // Parallax effect for profile picture
  const aboutImageContainer = document.querySelector('.about-image-container');
  const profilePic = document.querySelector('.profile-pic');

  if (aboutImageContainer && profilePic) {
    aboutImageContainer.addEventListener('mousemove', (e) => {
      const { clientX, clientY } = e;
      const { left, top, width, height } = aboutImageContainer.getBoundingClientRect();

      const centerX = left + width / 2;
      const centerY = top + height / 2;

      const offsetX = (clientX - centerX) / (width / 2); // -1 to 1
      const offsetY = (clientY - centerY) / (height / 2); // -1 to 1

      const rotateX = -offsetY * 5; // Adjust sensitivity
      const rotateY = offsetX * 5;  // Adjust sensitivity

      const translateX = offsetX * 10; // Adjust movement range
      const translateY = offsetY * 10; // Adjust movement range

      profilePic.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateX(${translateX}px) translateY(${translateY}px) scale(1.05)`;
    });

    aboutImageContainer.addEventListener('mouseleave', () => {
      profilePic.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateX(0px) translateY(0px) scale(1)';
    });
  }

});
