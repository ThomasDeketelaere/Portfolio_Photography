const galleryImages = document.querySelectorAll('img');

galleryImages.forEach(img => {
  img.addEventListener('contextmenu', e => e.preventDefault());
});

galleryImages.forEach(img => {
  img.setAttribute('draggable', 'false');
});
