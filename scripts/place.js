// ===== Footer: Year + Last Modified =====
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('last-modified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;


// ===== Weather (static now; API later) =====
// Use metric for Mozambique (°C, km/h)
const UNITS = 'metric';


// Desktop card values (IDs: temp, wind, windchill)
const tempEl = document.getElementById('temp');
const windEl = document.getElementById('wind');
const windChillEl = document.getElementById('windchill');


// Mobile stacked values (IDs: temp-m, wind-m, windchill-m) — optional sync
const tempM = document.getElementById('temp-m');
const windM = document.getElementById('wind-m');
const windChillM = document.getElementById('windchill-m');


const temperature = tempEl ? Number(tempEl.textContent) : 10; // °C
const windSpeed = windEl ? Number(windEl.textContent) : 5; // km/h


// One-line return per rubric (Environment Canada metric formula)
function calculateWindChill(t, v) { return 13.12 + (0.6215 * t) - (11.37 * Math.pow(v, 0.16)) + (0.3965 * t * Math.pow(v, 0.16)); }


const canCompute = (UNITS === 'metric' && temperature <= 10 && windSpeed > 4.8) || (UNITS === 'imperial' && temperature <= 50 && windSpeed > 3);


if (canCompute) {
const wc = Math.round(calculateWindChill(temperature, windSpeed));
if (windChillEl) windChillEl.textContent = wc + '°C';
if (windChillM) windChillM.textContent = wc + '°C';
} else {
if (windChillEl) windChillEl.textContent = 'N/A';
if (windChillM) windChillM.textContent = 'N/A';
}