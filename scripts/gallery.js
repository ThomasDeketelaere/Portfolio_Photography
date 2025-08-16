// gallery.js
document.addEventListener('DOMContentLoaded', () => {
  const gallery = document.getElementById('gallery-grid');
  if (!gallery) return;

  function updateGalleryVisibility() {
    const galleryItems = Array.from(gallery.children);
    const galleryWidth = gallery.clientWidth;

    // approximate min width per item (matches your Tailwind minmax)
    const style = getComputedStyle(gallery);
    const gap = parseInt(style.columnGap || style.gap || 0, 10);
    const itemMinWidth = 400 + gap;
    const itemsPerRow = Math.max(Math.floor(galleryWidth / itemMinWidth), 1);

    // Determine max items based on itemsPerRow
    let maxVisible = itemsPerRow * 2; // default: 2 rows
    if (itemsPerRow === 3) maxVisible = 6;
    if (itemsPerRow === 4) maxVisible = 8;
    if (itemsPerRow === 5) maxVisible = 5; 
    if (itemsPerRow === 6) maxVisible = 6;

    const fullRowItems = Math.floor(maxVisible / itemsPerRow) * itemsPerRow;

    galleryItems.forEach((item, index) => {
      if (index < fullRowItems) {
        item.style.display = '';
      } else {
        item.style.display = 'none';
      }
    });
  }

  // Initial adjustment
  updateGalleryVisibility();

  // Adjust on window resize
  window.addEventListener('resize', updateGalleryVisibility);
});
