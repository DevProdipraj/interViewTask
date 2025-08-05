// navbar js 
class StickyNavbar {
  constructor() {
    this.navbar = document.getElementById("navbar");
    this.hamburger = document.getElementById("hamburger");
    this.navMenu = document.getElementById("navMenu");
    this.navLinks = document.querySelectorAll(".nav-link");
    this.scrollProgress = document.getElementById("scrollProgress");
    this.lastScrollTop = 0;

    this.init();
  }

  init() {
    // Handle scroll events
    window.addEventListener("scroll", () => {
      this.handleScroll();
      this.updateScrollProgress();
    });

    this.hamburger.addEventListener("click", () => {
      this.toggleMenu();
    });
    this.navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMenu();
      });
    });

    document.addEventListener("click", (e) => {
      if (
        !this.hamburger.contains(e.target) &&
        !this.navMenu.contains(e.target)
      ) {
        this.closeMenu();
      }
    });

    // Handle window resize
    window.addEventListener("resize", () => {
      if (window.innerWidth > 768) {
        this.closeMenu();
      }
    });

    // Handle escape key
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.closeMenu();
      }
    });
  }

  handleScroll() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const heroHeight = document.querySelector(".hero").offsetHeight;

    // Add/remove  class based on scroll
    if (scrollTop > 50) {
      this.navbar.classList.add("scrolled");
      this.navbar.classList.remove("transparent");
    } else {
      this.navbar.classList.remove("scrolled");
      if (scrollTop < heroHeight * 0.8) {
        this.navbar.classList.add("transparent");
      }
    }

    // Hide/show navbar on scroll
    if (scrollTop > this.lastScrollTop && scrollTop > 100) {
      this.navbar.style.transform = "translateY(-100%)";
    } else {
      this.navbar.style.transform = "translateY(0)";
    }

    this.lastScrollTop = scrollTop;
  }

  updateScrollProgress() {
    const scrollTop = window.pageYOffset;
    const docHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercent = (scrollTop / docHeight) * 100;
    this.scrollProgress.style.width = scrollPercent + "%";
  }

  toggleMenu() {
    this.hamburger.classList.toggle("active");
    this.navMenu.classList.toggle("active");

    if (this.navMenu.classList.contains("active")) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }

  closeMenu() {
    this.hamburger.classList.remove("active");
    this.navMenu.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Scroll animations
function handleScrollAnimations() {
  const elements = document.querySelectorAll(".fade-in");

  elements.forEach((element) => {
    const elementTop = element.getBoundingClientRect().top;
    const elementVisible = 150;

    if (elementTop < window.innerHeight - elementVisible) {
      element.classList.add("visible");
    }
  });
}

// Initialize everything when the page loads
document.addEventListener("DOMContentLoaded", () => {
  new StickyNavbar();

  // Trigger initial animation
  setTimeout(() => {
    document.querySelector(".fade-in").classList.add("visible");
  }, 500);

  // Handle scroll animations
  window.addEventListener("scroll", handleScrollAnimations);
  handleScrollAnimations();
});

document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute("href"));
    if (target) {
      const offsetTop = target.offsetTop - 70;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  });
});

// product slider

  class ProductSlider {
    constructor() {
      this.mainImage = document.getElementById("mainImage");
      this.thumbnails = document.querySelectorAll(".thumbnail");
      this.currentIndex = 0;

      this.init();
    }

    init() {
      this.thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener("click", () => {
          this.changeImage(index);
        });
      });

      document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
          this.previousImage();
        } else if (e.key === "ArrowRight") {
          this.nextImage();
        }
      });

   
    }

    changeImage(index) {
      if (index === this.currentIndex) return;

      this.thumbnails[this.currentIndex].classList.remove("active");
      this.mainImage.classList.remove("active");

      setTimeout(() => {
        const newImage = this.thumbnails[index].querySelector("img");
        this.mainImage.src = newImage.src;
        this.mainImage.alt = newImage.alt;

        this.currentIndex = index;
        this.thumbnails[index].classList.add("active");
        this.mainImage.classList.add("active");
      }, 150);
    }

    nextImage() {
      const nextIndex = (this.currentIndex + 1) % this.thumbnails.length;
      this.changeImage(nextIndex);
    }

    previousImage() {
      const prevIndex =
        (this.currentIndex - 1 + this.thumbnails.length) % this.thumbnails.length;
      this.changeImage(prevIndex);
    }
 
  }

  document.addEventListener("DOMContentLoaded", () => {
    new ProductSlider();
  });




// Add some   animations
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".rating-section, .product-title, .pricing-section, .description-section, .add-to-cart-btn, .payment-methods"
  );

  elements.forEach((element, index) => {
    element.style.opacity = "0";
    element.style.transform = "translateY(20px)";
    element.style.transition = "all 0.6s ease";

    setTimeout(() => {
      element.style.opacity = "1";
      element.style.transform = "translateY(0)";
    }, index * 100);
  });
});

