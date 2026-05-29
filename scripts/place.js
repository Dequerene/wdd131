const currentYear = document.querySelector("#currentyear");
const lastModified = document.querySelector("#lastModified");
const windChill = document.querySelector("#wind-chill");

const temperature = 8;
const windSpeed = 10;

currentYear.textContent = new Date().getFullYear();
lastModified.textContent = `Last Modification: ${document.lastModified}`;

function calculateWindChill(temp, speed) {
  return 13.12 + 0.6215 * temp - 11.37 * speed ** 0.16 + 0.3965 * temp * speed ** 0.16;
}

if (temperature <= 10 && windSpeed > 4.8) {
  windChill.textContent = `${calculateWindChill(temperature, windSpeed).toFixed(1)} °C`;
} else {
  windChill.textContent = "N/A";
}