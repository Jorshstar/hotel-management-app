// error-handler.ts

// Add a global error handler for images
window.addEventListener('error', function(event: ErrorEvent) {
  if (event.target instanceof HTMLImageElement) {
      const missingImage = event.target as HTMLImageElement;
      console.error('Image failed to load:', missingImage.src);
      // Replace the missing image with a fallback image
      missingImage.src = 'fallback-image.jpg';
  }
}, true);
