
const yearEl = document.getElementById('year');
const lastModEl = document.getElementById('last-modified');
if (yearEl) yearEl.textContent = new Date().getFullYear();
if (lastModEl) lastModEl.textContent = document.lastModified;

const UNITS = 'metric';

const tempEl = document.getElementById('temp');
const windEl = document.getElementById('wind');
const windChillEl = document.getElementById('windchill');

const tempM = document.getElementById('temp-m');
const windM = document.getElementById('wind-m');
const windChillM = document.getElementById('windchill-m');

const temperature = tempEl ? Number(tempEl.textContent) : 10; // °C
const windSpeed = windEl ? Number(windEl.textContent) : 5; // km/h

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