// ===== 缴费弹窗功能 =====
const paymentModal = document.getElementById('paymentModal');
const paymentBtn = document.getElementById('paymentBtn');
const paymentBtn2 = document.getElementById('paymentBtn2');
const modalClose = document.getElementById('modalClose');
const modalOverlay = paymentModal.querySelector('.modal-overlay');

// 打开弹窗
function openPaymentModal() {
    paymentModal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭弹窗
function closePaymentModal() {
    paymentModal.classList.remove('active');
    document.body.style.overflow = '';
}

// 绑定事件
if (paymentBtn) {
    paymentBtn.addEventListener('click', openPaymentModal);
}

if (paymentBtn2) {
    paymentBtn2.addEventListener('click', openPaymentModal);
}

if (modalClose) {
    modalClose.addEventListener('click', closePaymentModal);
}

if (modalOverlay) {
    modalOverlay.addEventListener('click', closePaymentModal);
}

// ESC键关闭弹窗
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && paymentModal.classList.contains('active')) {
        closePaymentModal();
    }
});

// ===== 图片查看器功能 =====
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxClose = lightbox.querySelector('.lightbox-close');
const lightboxOverlay = lightbox.querySelector('.lightbox-overlay');
const galleryItems = document.querySelectorAll('.gallery-item');

// 打开图片查看器
function openLightbox(imgSrc) {
    lightboxImg.src = imgSrc;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
}

// 关闭图片查看器
function closeLightbox() {
    lightbox.classList.remove('active');
    document.body.style.overflow = '';
}

// 绑定图片点击事件
galleryItems.forEach(item => {
    const img = item.querySelector('img');
    if (img) {
        item.addEventListener('click', () => {
            openLightbox(img.src);
        });
    }
});

// 关闭按钮和遮罩层
if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
}

if (lightboxOverlay) {
    lightboxOverlay.addEventListener('click', closeLightbox);
}

// ESC键关闭
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('active')) {
        closeLightbox();
    }
});

// ===== 手风琴功能 =====
const accordionHeaders = document.querySelectorAll('.accordion-header');

accordionHeaders.forEach(header => {
    header.addEventListener('click', () => {
        const item = header.parentElement;
        const isActive = item.classList.contains('active');
        
        // 关闭其他打开的项
        document.querySelectorAll('.accordion-item').forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // 切换当前项
        item.classList.toggle('active', !isActive);
    });
});

// ===== 导航栏滚动效果 =====
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1)';
    }
});

// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = navbar.offsetHeight;
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// ===== 页面加载动画 =====
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // 图片懒加载检查
    const lazyImages = document.querySelectorAll('img[loading="lazy"]');
    lazyImages.forEach(img => {
        img.addEventListener('load', () => {
            img.classList.add('loaded');
        });
    });
});

// ===== 滚动动画 =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-visible');
        }
    });
}, observerOptions);

// 观察需要动画的元素
document.querySelectorAll('.about-card, .gallery-item, .accordion-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// 添加动画可见状态的样式
document.head.insertAdjacentHTML('beforeend', `
    <style>
        .animate-visible {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    </style>
`);

console.log('网站已加载完成');