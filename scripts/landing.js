(function(){
  const stage = document.querySelector('.stage');
  const btn = document.querySelector('.open-btn');

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

  btn.addEventListener('click', nextStage);
  btn.addEventListener('keyup', function(e){
    if (e.key === 'Enter' || e.key === ' ') nextStage();
  });
})();


