// for login form
document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector("form");
  const emailInput = document.getElementById("log-email");
  const passwordInput = document.getElementById("password");

  form.addEventListener("submit", function (event) {
    // Clear previous error messages
    clearErrors();

    // Validate email and password
    const emailValid = validateEmail(emailInput.value);
    const passwordValid = validatePassword(passwordInput.value);

    if (!emailValid || !passwordValid) {
      event.preventDefault();
      if (!emailValid) {
        showError(emailInput, "Please enter a valid email address.");
      }
      if (!passwordValid) {
        showError(passwordInput, "Please enter your password.");
      }
    }
  });

  function validateEmail(email) {
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailPattern.test(email);
  }

  function validatePassword(password) {
    return password.trim() !== "";
  }

  function showError(input, message) {
    const errorElement = document.createElement("div");
    errorElement.className = "error-message";
    errorElement.innerText = message;
    input.parentElement.appendChild(errorElement);
  }

  function clearErrors() {
    const errorMessages = document.querySelectorAll(".error-message");
    errorMessages.forEach(function (error) {
      error.remove();
    });
  }
});

// for register form
document.addEventListener("DOMContentLoaded", function () {
  const dateInput = document.getElementById("date");
  const datedrop = document.getElementById("datedrop");
  const yearSelect = document.getElementById("select-year");
  const monthSelect = document.getElementById("select-month");
  const dayContainers = [
    document.getElementById("rw1"),
    document.getElementById("rw2"),
    document.getElementById("rw3"),
    document.getElementById("rw4"),
    document.getElementById("rw5"),
  ];
  const form = document.querySelector("form");
  const emailInput = document.getElementById("reg-email");
  const passwordInput = document.getElementById("password");
  const confirmPasswordInput = document.getElementById("cpassword");

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  // Populate year and month dropdowns
  for (let year = 2024; year >= 1900; year--) {
    const option = document.createElement("option");
    option.value = year;
    option.textContent = year;
    yearSelect.appendChild(option);
  }

  months.forEach((month, index) => {
    const option = document.createElement("option");
    option.value = index + 1; // month values from 1 to 12
    option.textContent = month;
    monthSelect.appendChild(option);
  });

  dateInput.addEventListener("click", function () {
    datedrop.style.display = "block";
  });

  yearSelect.addEventListener("change", updateDays);
  monthSelect.addEventListener("change", updateDays);

  function updateDays() {
    const year = yearSelect.value;
    const month = monthSelect.value - 1; // Convert to 0-based index for JavaScript Date object
    if (!year || month < 0) return;

    const firstDayOfMonth = new Date(year, month, 1).getDay(); // Day of the week (0-6, where 0 is Sunday)
    const daysInMonth = new Date(year, month + 1, 0).getDate(); // Get the number of days in the month

    dayContainers.forEach((container) => (container.innerHTML = ""));

    let dayCount = 1;
    for (let row = 0; row < dayContainers.length; row++) {
      for (let col = 0; col < 7; col++) {
        const dayElement = document.createElement("p");
        if ((row === 0 && col < firstDayOfMonth) || dayCount > daysInMonth) {
          dayElement.textContent = ""; // Blank cells before the first day and after the last day
        } else {
          dayElement.textContent = dayCount;
          dayElement.classList.add("day-no");
          dayElement.addEventListener("click", function () {
            dateInput.value = `${year}/${String(month + 1).padStart(
              2,
              "0"
            )}/${String(dayCount).padStart(2, "0")}`;
            datedrop.style.display = "none";
          });
          dayCount++;
        }
        dayContainers[row].appendChild(dayElement);
      }
    }
  }

  document.addEventListener("click", function (event) {
    if (!datedrop.contains(event.target) && event.target !== dateInput) {
      datedrop.style.display = "none";
    }
  });

  form.addEventListener("submit", function (event) {
    // Check if all required fields are filled
    if (!validateForm()) {
      event.preventDefault(); // Prevent form submission if validation fails
    }
  });

  function validateForm() {
    let valid = true;
    const firstName = document.getElementById("fname").value.trim();
    const lastName = document.getElementById("lname").value.trim();
    const dateOfBirth = dateInput.value.trim();
    const email = emailInput.value.trim();
    const password = passwordInput.value.trim();
    const confirmPassword = confirmPasswordInput.value.trim();

    if (!firstName) {
      valid = false;
      alert("First Name is required");
    }

    if (!lastName) {
      valid = false;
      alert("Last Name is required");
    }

    if (!dateOfBirth) {
      valid = false;
      alert("Date of Birth is required");
    }

    if (!validateEmail(email)) {
      valid = false;
      alert("Invalid Email Address");
    }

    if (!password) {
      valid = false;
      alert("Password is required");
    }

    if (password !== confirmPassword) {
      valid = false;
      alert("Passwords do not match");
    }

    return valid;
  }

  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});

// forget form
document
  .getElementById("submit-btn")
  .addEventListener("click", function (event) {
    var emailField = document.getElementById("fp-email");
    var emailValue = emailField.value;

    // Simple email regex pattern
    var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (emailValue === "") {
      alert("Email Address cannot be empty");
      event.preventDefault(); // Prevent form submission
    } else if (!emailPattern.test(emailValue)) {
      alert("Please enter a valid email address");
      event.preventDefault(); // Prevent form submission
    }
  });
