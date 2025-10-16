(function(){
  const stage = document.querySelector('.stage');
  const btn = document.querySelector('.open-btn');
  const bgImg = document.querySelector('.bg');

  // Layers
  const closedEl = document.querySelector('.envelope .closed');
  const openEl = document.querySelector('.envelope .open');

  // Durations (keep in sync with CSS variables)
  var DUR_OPEN = 1700;      // --dur-open (match CSS)
  var BUFFER = 150;         // small buffer for smoother switching
  var hideClosedTimeout = null;

  // Preload images to avoid flicker
  const sources = [
    'assets/envelope-open.png'
  ];
  sources.forEach(function(src){ var i = new Image(); i.src = src; });

  var currentStage = 0; // 0: idle/closed, 1: open visible

  function applyStage(){
    stage.classList.remove('idle');
    stage.classList.remove('stage1','stage2');
    if (currentStage === 1){
      // Going to open → ensure closed is visible during transition, then hide after
      if (closedEl) closedEl.style.display = '';
      stage.classList.add('stage1');
      if (hideClosedTimeout) window.clearTimeout(hideClosedTimeout);
      hideClosedTimeout = window.setTimeout(function(){ if (closedEl) closedEl.style.display = 'none'; }, DUR_OPEN + BUFFER);
    } else {
      // Going back to closed → show closed layer immediately so it can animate in
      if (hideClosedTimeout) window.clearTimeout(hideClosedTimeout);
      if (closedEl) closedEl.style.display = '';
      // no stage1 class → CSS default shows closed and hides open with transitions
    }
  }

  function toggleStage(){
    currentStage = currentStage === 0 ? 1 : 0;
    applyStage();
  }

  // Set mobile background based on screen size
  function setBackground(){
    if (window.innerWidth <= 640) {
      bgImg.src = 'assets/bg_mobile.jpg';
    } else {
      bgImg.src = 'assets/bg.jpg';
    }
  }
  
  // Set initial background
  setBackground();
  
  // Update background on resize
  window.addEventListener('resize', setBackground);
  
  // Remove loading class when everything is ready
  document.body.classList.remove('loading');
  document.body.classList.add('loaded');

  // Toggle on every press (click or keyboard)
  btn.addEventListener('click', toggleStage);
  btn.addEventListener('keyup', function(e){
    if (e.key === 'Enter' || e.key === ' ') toggleStage();
  });
})();


