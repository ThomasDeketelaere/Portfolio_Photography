const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightbox-img");
const triggers = document.querySelectorAll(".lightbox-trigger");

triggers.forEach(img => {
    img.addEventListener("click", () => {
    openLightbox(img);
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
    lightboxImg.src = "";
});

function openLightbox(img) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightbox-img");

  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;

  // reset size
  lightboxImg.style.width = "auto";
  lightboxImg.style.height = "auto";

  // scale small images up to ~50% viewport minimum
  const temp = new Image();
  temp.src = img.src;
  temp.onload = () => {
    const aspect = temp.width / temp.height;
    if (aspect >= 1) { // landscape
      lightboxImg.style.width = "75vw"; 
    } else { // portrait
      lightboxImg.style.height = "75vh";
    }
  }

  lightbox.classList.add("active");
}
