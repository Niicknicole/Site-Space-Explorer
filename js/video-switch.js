document.addEventListener("DOMContentLoaded", () => {
  const videoToggle = document.getElementById('video-toggle');
  const videoOverlay = document.getElementById('videoOverlay');
  const bgVideo = document.getElementById('bgVideo');

  videoToggle.addEventListener('change', () => {
    if (videoToggle.checked) {
      videoOverlay.classList.add('active');
      bgVideo.play().catch(err => console.log('Autoplay bloqueado:', err));
    } else {
      videoOverlay.classList.remove('active');
      bgVideo.pause();
    }
  });
});
