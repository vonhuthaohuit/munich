document.addEventListener("DOMContentLoaded", function () {
  const toggleBtn = document.getElementById("toggleBtn");
  const menuList = document.getElementById("menuList");
  let isOpen = true;

  toggleBtn.addEventListener("click", function () {
    isOpen = !isOpen;

    if (isOpen) {
      menuList.style.maxHeight = menuList.scrollHeight + "px";
      menuList.style.opacity = "1";
      menuList.style.visibility = "visible";
      menuList.classList.add("is-open");
    } else {
      menuList.style.maxHeight = "0";
      menuList.style.opacity = "0";
      menuList.style.visibility = "hidden";
      menuList.classList.remove("is-open");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const menuLinks = document.querySelectorAll(".menu__link");
  const sections = document.querySelectorAll(".content-page [id]");
  const borders = document.querySelectorAll(".line");
  const menuGroups = document.querySelectorAll(".group");

  menuLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.getBoundingClientRect().top + window.scrollY - 100,
          behavior: "smooth",
        });
      }
      console.log("window.scrollY", window.scrollY);
      resetAllLinks();
      resetAllHoverEffects();
      activateLink(link);
    });
  });

  function handleScroll() {
    const scrollPosition = window.scrollY;
    let activeSection = null;
    sections.forEach((section, index) => {
      const sectionTop = section.offsetTop - 150;
      const sectionBottom = sectionTop + section.offsetTop;

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSection = index;
      }
    });

    if (activeSection !== null) {
      resetAllLinks();
      resetAllHoverEffects();

      borders.forEach((border, index) => {
        border.style.backgroundColor =
          index === activeSection ? "var(--red-color)" : "transparent";
      });

      if (menuLinks[activeSection]) {
        activateLink(menuLinks[activeSection]);
      }
    }
  }

  function resetAllLinks() {
    menuLinks.forEach((menuLink) => {
      menuLink.classList.remove("active");
      menuLink.style.color = "var(--black)";
    });
  }

  function resetAllHoverEffects() {
    borders.forEach((border) => {
      border.style.backgroundColor = "transparent";
    });
  }

  function activateLink(link) {
    link.classList.add("active");
    link.style.color = "var(--red-color)";

    const parentGroup = link.closest(".group");
    if (parentGroup) {
      const border = parentGroup.querySelector(".line");
      if (border) {
        border.style.backgroundColor = "var(--red-color)";
      }
    }
  }

  menuGroups.forEach((group) => {
    const border = group.querySelector(".line");
    const link = group.querySelector(".menu__link");

    group.addEventListener("mouseenter", function () {
      if (!link.classList.contains("active")) {
        border.style.backgroundColor = "var(--red-color)";
      }
    });

    group.addEventListener("mouseleave", function () {
      if (!link.classList.contains("active")) {
        border.style.backgroundColor = "transparent";
      }
    });
  });

  window.addEventListener("scroll", handleScroll);

  handleScroll();
});
