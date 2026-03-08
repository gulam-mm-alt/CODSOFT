// Gallery View Functionality
document.addEventListener("DOMContentLoaded", function () {
  const galleryView = document.getElementById("gallery-view");
  const openGalleryLinks = document.querySelectorAll(".open-gallery");
  const closeGalleryBtn = document.querySelector(".close-gallery");
  const menuToggle = document.querySelector(".menu");
  const navMobile = document.querySelector(".nav-mobile");

  // Open gallery when clicking any "Start now" link
  openGalleryLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      galleryView.classList.add("active");
      document.body.style.overflow = "hidden"; // Prevent scrolling on body
    });
  });

  // Close gallery when clicking close button
  closeGalleryBtn.addEventListener("click", function () {
    galleryView.classList.remove("active");
    document.body.style.overflow = "auto"; // Re-enable body scrolling
  });

  // Close gallery when clicking outside (on the gallery-view itself)
  galleryView.addEventListener("click", function (e) {
    if (e.target === galleryView) {
      galleryView.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Escape key to close gallery
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && galleryView.classList.contains("active")) {
      galleryView.classList.remove("active");
      document.body.style.overflow = "auto";
    }
  });

  // Mobile menu toggle
  if (menuToggle) {
    menuToggle.addEventListener("click", function () {
      menuToggle.classList.toggle("active");
      navMobile.classList.toggle("active");
    });
  }

  // Close mobile menu when a link is clicked
  const navMobileLinks = document.querySelectorAll(".nav-mobile a");
  navMobileLinks.forEach((link) => {
    link.addEventListener("click", function () {
      menuToggle.classList.remove("active");
      navMobile.classList.remove("active");
    });
  });
});
