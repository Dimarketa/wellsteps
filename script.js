document.addEventListener("DOMContentLoaded", (event) => {
  const therapistButton = document.querySelector("#inactive-btn");
  const patientButton = document.querySelector("#active-btn");
  const therapistSection = document.querySelector("#therapist-btn");
  const reclaimSection = document.querySelector("#reclaim-btn");

  const btn1 = therapistButton.addEventListener("click", function (event) {
    event.preventDefault();
    reclaimSection.style.display = "none";
    therapistSection.style.display = "block";
    therapistButton.id = "active-btn"; // Change ID to "active" to toggle the button state
  });

  const btn2 = patientButton.addEventListener("click", function (event) {
    //event.preventDefault();
    reclaimSection.style.display = "block";
    therapistSection.style.display = "none";
    therapistButton.id = "inactive-btn"; // Change ID back to "inactive" to toggle the button state
    patientButton.id = "active";
  });

  // let selectBtn = ['btn1', 'btn2'];
  // function caseInSwitch(val) {
  //   // Only change code below this line
  //   switch (val) {
  //     case 1:
  //       return selectBtn[0];
  //       break;
  //     case 2:
  //       return selectBtn[1];
  //     // Only change code above this line
  //   }
  // }
  // caseInSwitch(3);

  // Intersection Observer for animations
  const options = {
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target);
      }
    });
  }, options);

  // Select all elements to animate
  const elementsToAnimate = document.querySelectorAll(
    ".float-in, .zoom-in, .zoom-out"
  );
  elementsToAnimate.forEach((element) => {
    element.classList.add("hidden"); // Hide elements initially
    observer.observe(element);
  });

  // Mobile menu toggle
  const menuIcon = document.querySelector(".hamburger-menu");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (menuIcon && mobileMenu) {
    menuIcon.addEventListener("click", () => {
      mobileMenu.classList.toggle("visible");
    });
  }
});
