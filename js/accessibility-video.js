document.querySelectorAll('.preview-image').forEach(previewImage => {
    const container = previewImage.closest('.video-container') || document;
    const videoWrapper = container.querySelector('.video-wrapper');
    const video = container.querySelector('.video-player');
    const closeBtn = container.querySelector('.close-video');
  
    // Show video on click or Enter key on image
    previewImage.addEventListener('click', openVideo);
    previewImage.addEventListener('keydown', e => {
      if (e.key === 'Enter') {
        e.preventDefault();
        openVideo();
      }
    });
  
    function openVideo() {
      previewImage.style.display = 'none';
      videoWrapper.style.display = 'block';
      video.focus();
      video.play();
    }
  
    // Play/Pause video on Enter or Space
    video.addEventListener('keydown', e => {
      if (e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        video.paused ? video.play() : video.pause();
      } else if (e.key === 'Enter') {
        e.preventDefault();
        video.paused ? video.play() : video.pause();
      } else if (e.key === 'Escape') {
        e.preventDefault();
        closeVideo();
      }
    });
  
    // Close button or Esc key
    closeBtn.addEventListener('click', closeVideo);
    closeBtn.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        closeVideo();
      }
    });
  
    function closeVideo() {
      video.pause();
      video.currentTime = 0;
      videoWrapper.style.display = 'none';
      previewImage.style.display = 'block';
      previewImage.focus(); // return focus for accessibility
    }
  });
  