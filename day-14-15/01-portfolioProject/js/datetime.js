// Function to display the current date and time in a specified format:

function displayCurrentDateTime() {
  const date = new Date();
  const timeElement = document.getElementById("datetime");

  if (!timeElement) {
    console.error("Nie znaleziono elementu o ID 'datetime'!");
    return;
  }

  const dayOfMonth = date.getDate();
  const month = getPolishMonthName(date.getMonth());
  const year = date.getFullYear();
  const formattedTime = formatTime(
    date.getHours(),
    date.getMinutes(),
    date.getSeconds()
  );

  timeElement.textContent = `${dayOfMonth} ${month} ${year} ${formattedTime}`;
}

// Function to get the name of the month in Polish based on the month index:

function getPolishMonthName(monthIndex) {
  const polishMonths = [
    "Stycznia",
    "Lutego",
    "Marca",
    "Kwietnia",
    "Maja",
    "Czerwca",
    "Lipca",
    "Sierpnia",
    "Września",
    "Października",
    "Listopada",
    "Grudnia",
  ];

  return polishMonths[monthIndex] || "Nieznany miesiąc!";
}

// Function to format the time in HH:MM:SS format:

function formatTime(hours, minutes, seconds) {
  return [hours, minutes, seconds]
    .map((unit) => unit.toString().padStart(2, "0"))
    .join(":");
}

document.addEventListener("DOMContentLoaded", () => {
  displayCurrentDateTime();
  setInterval(displayCurrentDateTime, 1000);
});
