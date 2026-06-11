let reviewCount = Number(localStorage.getItem("reviewCount")) || 0;

reviewCount += 1;

localStorage.setItem("reviewCount", reviewCount);

document.querySelector("#reviewCount").textContent = reviewCount;
document.querySelector("#currentyear").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = `Last Modified: ${document.lastModified}`;