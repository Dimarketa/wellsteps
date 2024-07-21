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
});
