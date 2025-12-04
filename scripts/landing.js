(function(){
  const stage = document.querySelector('.stage');
  const btn = document.querySelector('.open-btn');
  const bgImg = document.querySelector('.bg');

  // Layers
  const closedEl = document.querySelector('.envelope .closed');

  // Durations (keep in sync with CSS variables)
  var DUR_OPEN = 900;      // --dur-open
  var DUR_TO_FINAL = 1000; // --dur-to-final
  var BUFFER = 150;        // small buffer for smoother switching

  // Preload images to avoid flicker
  const sources = [
    'assets/envelope-open.png'
  ];
  sources.forEach(function(src){ var i = new Image(); i.src = src; });

  var currentStage = 0; // 0: idle/closed, 1: open visible

  function nextStage(){
    if (currentStage >= 1) return;
    stage.classList.remove('idle');
    currentStage += 1;
    stage.classList.remove('stage1','stage2');
    stage.classList.add('stage' + currentStage);

    // Ẩn hẳn layer của stage trước sau khi chuyển xong
    if (currentStage === 1){
      window.setTimeout(function(){ if (closedEl) closedEl.style.display = 'none'; }, DUR_OPEN + BUFFER);
      // stage1 là bước cuối: nút sẽ ẩn bằng CSS
      btn.disabled = true;
    }
  }

  // Set mobile background based on screen size
  function setBackground(){
    let currentBg = document.querySelector('.bg');
    if (!currentBg) return;
    
    const isMobile = window.innerWidth <= 640;
    const currentTag = currentBg.tagName;
    
    if (isMobile) {
      // Mobile: sử dụng video thay vì hình ảnh
      if (currentTag === 'IMG') {
        // Tạo video element để thay thế img
        const video = document.createElement('video');
        video.className = 'bg';
        video.src = 'assets/render dọc.mp4';
        video.autoplay = true;
        video.loop = true;
        video.muted = true;
        video.playsInline = true;
        video.style.cssText = currentBg.style.cssText || '';
        
        // Thay thế img bằng video
        currentBg.parentNode.replaceChild(video, currentBg);
      } else if (currentTag === 'VIDEO') {
        // Nếu đã là video rồi thì chỉ cần đảm bảo src đúng
        const videoSrc = currentBg.getAttribute('src') || currentBg.src;
        if (!videoSrc.includes('render dọc.mp4')) {
          currentBg.src = 'assets/render dọc.mp4';
        }
      }
    } else {
      // Desktop: sử dụng hình ảnh
      if (currentTag === 'VIDEO') {
        // Tạo img element để thay thế video
        const img = document.createElement('img');
        img.className = 'bg';
        img.src = 'assets/bg.jpg';
        img.style.cssText = currentBg.style.cssText || '';
        
        // Thay thế video bằng img
        currentBg.parentNode.replaceChild(img, currentBg);
      } else if (currentTag === 'IMG') {
        currentBg.src = 'assets/bg.jpg';
      }
    }
  }
  
  // Set initial background
  setBackground();
  
  // Update background on resize
  window.addEventListener('resize', setBackground);

  btn.addEventListener('click', nextStage);
  btn.addEventListener('keyup', function(e){
    if (e.key === 'Enter' || e.key === ' ') nextStage();
  });
})();


