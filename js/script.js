// Setup tabindex for videos and other focusable elements
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('video');
  const focusableElements = document.querySelectorAll(
    'a, button, input, select, textarea, [tabindex]:not(video)'
  );

  videos.forEach(video => {
    video.setAttribute('tabindex', '0');
  });

  let tabindexCounter = 1;
  focusableElements.forEach(element => {
    element.setAttribute('tabindex', tabindexCounter);
    tabindexCounter++;
  });
});

function toggleCollapsible() {
  const links = document.querySelectorAll(".toggleLink");
  links.forEach((link) => {
    link.addEventListener("click", tabToggle);
  });
}

function tabToggle(event) {
  event.preventDefault();
  event.stopPropagation();
  let tabs = document.querySelectorAll(".tabs-content");
  let toggleContents = document.querySelectorAll(".toggle-content");
  let $this = event.currentTarget,
    $thisTab = $this.closest(".tabs-content");
  $thisContent = $this.parentNode.nextElementSibling;
  toggleContents.forEach((element, index) => {
    element.style.maxHeight = "0";
  });

  if ($thisTab.classList.contains("is-active")) {
    $thisContent.style.maxHeight = "0";
    tabs.forEach((element, index) => {
      element.classList.remove("is-active");
    });
  } else {
    tabs.forEach((element, index) => {
      element.classList.remove("is-active");
    });
    $thisContent.style.display = "block";
    $thisTab.classList.add("is-active");
    $thisContent.style.maxHeight = $thisContent.scrollHeight + "px";
    $thisContent.style.display = "";
  }
}

toggleCollapsible();

function toggleTabHorizontal() {
  const tabButtons = document.querySelectorAll(".tabs .tab-buttons .tab-btn");
  const tabContents = document.querySelectorAll(".tabs .tabs-contents .tab");
  tabButtons.forEach((link) => {
    link.addEventListener("click", () => {
      const id = link.getAttribute("data-tab");
      const tabs = link.closest(".tabs");
      const tabContent = tabs.querySelector(`${id}`);

      tabButtons.forEach((element, index) => {
        element.classList.remove("active-btn");
      });
      tabContents.forEach((element, index) => {
        element.classList.remove("active-tab");
        element.style.display = "none";
      });
      link.classList.add("active-btn");
      tabContent.style.display = "block";
      setTimeout(() => {
        tabContent.classList.add("active-tab");
      }, 20);
    });
  });
}
toggleTabHorizontal();
const checkbox = document.getElementById("checkbox-dark-light");

if (checkbox) {
  checkbox.addEventListener("change", () => {
    document.body.classList.toggle("dark");
  });
}

class SVGCustom extends HTMLElement {
  constructor() {
    super();
    this.svgElement = this.querySelector("svg path");
    this.currentIndex = 0;
    this.interval;
    this.addEventListener("mouseenter", this.startAnimation);
    this.addEventListener("mouseleave", this.stopAnimation);
  }

  startAnimation() {
    this.interval = setInterval(() => {
      this.svgElement.setAttribute("d", paths[this.currentIndex]);
      this.currentIndex = (this.currentIndex + 1) % paths.length;
    }, 13);
  }

  stopAnimation() {
    clearInterval(this.interval);
    this.currentIndex = 0;
    this.svgElement.setAttribute("d", paths[0]);
  }
}

customElements.define("svg-custom", SVGCustom);

class SVGCustom2 extends SVGCustom {
  constructor() {
    super();
    this.svgElement = this.querySelector("svg path");
    this.currentIndex = 0;
    this.interval;
    this.addEventListener("mouseenter", this.startAnimation);
    this.addEventListener("mouseleave", this.stopAnimation);
  }

  startAnimation() {
    this.interval = setInterval(() => {
      this.svgElement.setAttribute("d", paths2[this.currentIndex]);
      this.currentIndex = (this.currentIndex + 1) % paths2.length;
    }, 13);
  }

  stopAnimation() {
    clearInterval(this.interval);
    this.currentIndex = 0;
    this.svgElement.setAttribute("d", paths2[0]);
  }
}

customElements.define("svg-custom-2", SVGCustom2);

class SVGCustom3 extends SVGCustom {
  constructor() {
    super();
    this.polygonElement = this.querySelector("svg polygon");
    this.currentIndex = 0;
    this.interval = null;
    this.number = +this.getAttribute("data-number");
    this.time = +this.getAttribute("data-time");
    this.arrStroke = this.number == 2 ? arrStroke3 : arrStroke;

    this.startAnimation = this.startAnimation.bind(this);
    this.stopAnimation = this.stopAnimation.bind(this);

    this.addEventListener("mouseenter", this.startAnimation);
    this.addEventListener("mouseleave", this.stopAnimation);
  }

  startAnimation() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.currentIndex < this.arrStroke.length) {
        this.polygonElement.style.strokeDashoffset =
          this.arrStroke[this.currentIndex].offset;
        this.polygonElement.style.strokeDasharray =
          this.arrStroke[this.currentIndex].array;
        this.currentIndex++;
      } else {
        clearInterval(this.interval);
      }
    }, this.time);
  }

  stopAnimation() {
    clearInterval(this.interval);
    this.interval = setInterval(() => {
      if (this.currentIndex > 0) {
        this.currentIndex--;
        this.polygonElement.style.strokeDashoffset =
          this.arrStroke[this.currentIndex].offset;
        this.polygonElement.style.strokeDasharray =
          this.arrStroke[this.currentIndex].array;
      } else {
        clearInterval(this.interval);
      }
    }, this.time);
  }
}

customElements.define("svg-custom-3", SVGCustom3);

function animateNumbers() {
  const items = document.querySelectorAll(
    "#section-14 .list-item .item .number"
  );
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          let target = +entry.target.textContent;
          let count = 0;
          entry.target.style.opacity = 1;

          let interval = setInterval(() => {
            count += Math.ceil(target / 50);
            if (count >= target) {
              entry.target.textContent = target;
              clearInterval(interval);
            } else {
              entry.target.textContent = count;
            }
          }, 20);
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  items.forEach((item) => observer.observe(item));
}

document.addEventListener("DOMContentLoaded", animateNumbers);

function toggleCollapsibleMenu() {
  const links = document.querySelectorAll(".nav_menu .menu .menu-item-link");
  const linksMenuLv2 = document.querySelectorAll(
    ".nav_menu .menu .menu-lv2 .menu-item-lv2 > a"
  );
  links.forEach((link) => {
    link.addEventListener("click", tabToggleMenu);
  });
  linksMenuLv2.forEach((link) => {
    link.addEventListener("click", tabToggleMenu2);
  });
}

function tabToggleMenu(event) {
  event.preventDefault();
  event.stopPropagation();
  let menuLv1 = document.querySelectorAll(".nav_menu .menu .menu-item");
  let menuLv2 = document.querySelectorAll(".nav_menu .menu .menu-lv2");
  let $this = event.currentTarget,
    $thisMenu = $this.closest(".nav_menu .menu .menu-item");
  $thisMenuLv2 = $this.nextElementSibling;

  menuLv2.forEach((element, index) => {
    element.style.maxHeight = "0";
  });

  if ($thisMenu.classList.contains("is-open")) {
    $thisMenuLv2.style.maxHeight = "0";
    menuLv1.forEach((element, index) => {
      element.classList.remove("is-open");
    });
  } else {
    menuLv1.forEach((element, index) => {
      element.classList.remove("is-open");
    });
    $thisMenuLv2.style.display = "block";
    $thisMenu.classList.add("is-open");
    $thisMenuLv2.style.maxHeight = $thisMenuLv2.scrollHeight + "px";
    $thisMenuLv2.style.display = "";
  }
}
function tabToggleMenu2(event) {
  event.preventDefault();
  event.stopPropagation();
  let menuLv2 = document.querySelectorAll(
    ".nav_menu .menu .menu-item .menu-item-lv2"
  );
  let menuLv3 = document.querySelectorAll(".nav_menu .menu .menu-lv3");
  let $this = event.currentTarget,
    $thisMenu2 = $this.closest(".nav_menu .menu .menu-item .menu-lv2");
  $thisMenu = $this.closest(".nav_menu .menu .menu-item .menu-item-lv2");
  $thisMenuLv3 = $this.nextElementSibling;

  menuLv3.forEach((element, index) => {
    element.style.maxHeight = "0";
  });
  if ($thisMenu.classList.contains("is-open")) {
    $thisMenuLv3.style.maxHeight = "0";
    menuLv2.forEach((element, index) => {
      element.classList.remove("is-open");
    });
  } else {
    menuLv2.forEach((element, index) => {
      element.classList.remove("is-open");
    });
    $thisMenuLv3.style.display = "block";
    $thisMenu.classList.add("is-open");
    $thisMenuLv3.style.maxHeight = $thisMenuLv3.scrollHeight + 19 + "px";
    $thisMenu2.style.maxHeight =
      $thisMenu2.scrollHeight + $thisMenuLv3.scrollHeight + 19 + "px";
    $thisMenuLv3.style.display = "";
  }
}

toggleCollapsibleMenu();

document.addEventListener("DOMContentLoaded", function () {
  document.querySelectorAll(".popup-video").forEach((el) => {
    el.addEventListener("click", function (event) {
      if (!event.ctrlKey) {
        event.preventDefault();
        let videoSrc = this.getAttribute("data-src"),
          modal = document.querySelector("[data-popup-video]"),
          modalContent = modal.querySelector(".popup-content"),
          video = this.nextElementSibling;

        let clonedVideo = video.cloneNode(true);
        clonedVideo.style.display = "block";
        clonedVideo.play();

        let wrapper = document.createElement("div");
        wrapper.classList.add("fluid-width-video-wrapper");
        wrapper.appendChild(clonedVideo);

        modalContent.innerHTML = "";
        modalContent.appendChild(wrapper);
        document.body.classList.add("video-show");
      }
    });
  });

  document.addEventListener("click", function (e) {
    let modal = document.querySelector("[data-popup-video]");
    let modalContent = modal.querySelector(".popup-content");

    if (
      (modal.contains(e.target) && !modalContent.contains(e.target)) ||
      e.target.closest(".popup-close") ||
      e.target.classList.contains("background-overlay")
    ) {
      document.body.classList.remove("video-show");
      modalContent.innerHTML = "";
    }
  });
});

function animateUnderline() {
  const items = document.querySelectorAll(".svg-lineunder-heading");
  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const svgPath = entry.target.querySelector("svg path");

          if (svgPath) {
            let interval = null;
            let currentIndex = 0;
            clearInterval(interval);
            interval = setInterval(() => {
              if (currentIndex < arrStroke2.length) {
                svgPath.style.strokeDashoffset =
                  arrStroke2[currentIndex].offset;
                svgPath.style.strokeDasharray = arrStroke2[currentIndex].array;
                currentIndex++;
              } else {
                clearInterval(interval);
              }
            }, 20);
          }

          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  items.forEach((item) => observer.observe(item));
}
document.addEventListener('DOMContentLoaded', () => {
  const previewImages = document.querySelectorAll('.preview-image');
  const videoWrappers = document.querySelectorAll('.video-wrapper');
  const videos = document.querySelectorAll('.video-player');
  const closeButtons = document.querySelectorAll('.close-video');

  // Open video on Enter or click
  previewImages.forEach((image, index) => {
    image.addEventListener('click', () => {
      videoWrappers[index].style.display = 'block';
      videos[index].focus();
    });

    image.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        videoWrappers[index].style.display = 'block';
        videos[index].focus();
      }
    });
  });

  // Play/Pause video on Enter or Space
  videos.forEach((video) => {
    video.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault(); // Prevent scrolling on Space
        if (video.paused) {
          video.play();
        } else {
          video.pause();
        }
      }
    });
  });

  // Close video on Esc
  closeButtons.forEach((button, index) => {
    button.addEventListener('click', () => {
      videoWrappers[index].style.display = 'none';
    });

    button.addEventListener('keydown', (event) => {
      if (event.key === 'Enter') {
        videoWrappers[index].style.display = 'none';
      }
    });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
      videoWrappers.forEach((wrapper) => {
        wrapper.style.display = 'none';
      });
    }
  });
});

