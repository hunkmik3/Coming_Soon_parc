let currentSlideIndex = 1;

// Khởi tạo slide đầu tiên
document.addEventListener('DOMContentLoaded', function() {
    // Đảm bảo slide 1 được hiển thị mặc định
    const slide1 = document.getElementById('slide1');
    if (slide1) {
        slide1.classList.add('active');
    }
    showSlide(1);
});

// Hiển thị slide theo index với hiệu ứng
function showSlide(n) {
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');
    
    // Xác định slide hiện tại và slide tiếp theo
    let currentSlide = document.querySelector('.slide.active');
    let nextSlide;
    
    // Xử lý vòng lặp
    if (n > slides.length) {
        currentSlideIndex = 1;
    }
    if (n < 1) {
        currentSlideIndex = slides.length;
    }
    
    nextSlide = slides[currentSlideIndex - 1];
    
    // Nếu đã ở slide đúng thì không cần chuyển
    if (currentSlide === nextSlide) {
        return;
    }
    
    // Thêm hiệu ứng chuyển slide
    if (currentSlide) {
        currentSlide.classList.add('slide-out');
        currentSlide.classList.remove('active');
    }
    
    // Hiển thị slide mới với hiệu ứng
    nextSlide.classList.add('slide-in', 'active');
    
    // Loại bỏ active class từ tất cả dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentSlideIndex - 1].classList.add('active');
    
    // Dọn dẹp animation classes sau khi hoàn thành
    setTimeout(() => {
        slides.forEach(slide => {
            slide.classList.remove('slide-in', 'slide-out');
        });
    }, 800);
}

// Chuyển đến slide tiếp theo
function nextSlide() {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}

// Chuyển đến slide trước
function prevSlide() {
    currentSlideIndex--;
    showSlide(currentSlideIndex);
}

// Chuyển đến slide cụ thể
function currentSlide(n) {
    currentSlideIndex = n;
    showSlide(currentSlideIndex);
}

// Auto slide (tùy chọn) - ĐÃ TẮT
let autoSlideInterval;

function startAutoSlide() {
    // Tắt auto slide - chỉ chuyển khi người dùng tương tác
    // autoSlideInterval = setInterval(() => {
    //     nextSlide();
    // }, 5000);
}

function stopAutoSlide() {
    clearInterval(autoSlideInterval);
}

// Touch/swipe support cho mobile
let startX = 0;
let startY = 0;

document.addEventListener('touchstart', function(e) {
    startX = e.touches[0].clientX;
    startY = e.touches[0].clientY;
});

document.addEventListener('touchend', function(e) {
    if (!startX || !startY) {
        return;
    }
    
    let endX = e.changedTouches[0].clientX;
    let endY = e.changedTouches[0].clientY;
    
    let diffX = startX - endX;
    let diffY = startY - endY;
    
    // Chỉ xử lý swipe ngang nếu độ lệch ngang lớn hơn độ lệch dọc
    if (Math.abs(diffX) > Math.abs(diffY)) {
        if (Math.abs(diffX) > 50) { // Ngưỡng swipe tối thiểu
            if (diffX > 0) {
                // Swipe trái - chuyển slide tiếp theo
                nextSlide();
            } else {
                // Swipe phải - chuyển slide trước
                prevSlide();
            }
        }
    }
    
    startX = 0;
    startY = 0;
});

// Keyboard navigation
document.addEventListener('keydown', function(e) {
    switch(e.key) {
        case 'ArrowLeft':
            prevSlide();
            break;
        case 'ArrowRight':
            nextSlide();
            break;
        case ' ':
            e.preventDefault();
            nextSlide();
            break;
    }
});

// Pause auto slide khi hover (cho desktop) - ĐÃ TẮT
// document.addEventListener('mouseenter', stopAutoSlide);
// document.addEventListener('mouseleave', startAutoSlide);

// Không tự động bắt đầu auto slide
// setTimeout(startAutoSlide, 2000);

// Xử lý click nút OK và thư mời
document.addEventListener('DOMContentLoaded', function() {
    // Click nút OK ở slide 1 → chuyển sang slide 2
    const okButton = document.querySelector('.ok-button');
    if (okButton) {
        okButton.addEventListener('click', function() {
            currentSlide(2);
        });
    }
    
    // Click thư mời ở slide 2 → chuyển về slide 1
    const invitationSlide2 = document.querySelector('#slide2 .invitation');
    if (invitationSlide2) {
        invitationSlide2.addEventListener('click', function() {
            currentSlide(1);
        });
    }
});
