/* ==========================================
   ۱. مدیریت پخش / توقف موزیک کافه با کلیک روی لوگو
   ========================================== */
function toggleMusic() {
    const music = document.getElementById('cafe-music');
    const logo = document.querySelector('.logo');

    if (!music) return;

    if (music.paused) {
        music.play().then(() => {
            logo.classList.add('playing');
        }).catch((error) => {
            console.log("پخش خودکار با خطا مواجه شد. بررسی کنید فایل music.mp3 در پوشه پروژه باشد:", error);
        });
    } else {
        music.pause();
        logo.classList.remove('playing');
    }
}

/* ==========================================
   ۲. مدیریت جابجایی بین صفحات (خانه / منو)
   ========================================== */
function showPage(pageId) {
    document.querySelectorAll('.page-view').forEach(function(page) {
        page.classList.remove('active');
    });

    const targetPage = document.getElementById(pageId);
    if (targetPage) {
        targetPage.classList.add('active');
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });

    // بارگذاری نرم کارت‌ها هنگام باز شدن صفحه منو
    if (pageId === 'full-menu') {
        setTimeout(() => {
            document.querySelectorAll('.detailed-card').forEach(card => {
                const rect = card.getBoundingClientRect();
                if (rect.top < window.innerHeight && rect.bottom > 0) {
                    card.classList.add('is-visible');
                }
            });
        }, 120);
    }
}

/* ==========================================
   ۳. اسکرول به بخش ارتباط با ما (فوتر)
   ========================================== */
function scrollToContact() {
    const contactSection = document.getElementById('contact-us');
    if (contactSection) {
        contactSection.scrollIntoView({ behavior: 'smooth' });
    }
}

/* ==========================================
   ۴. فیلتر کردن آیتم‌های منوی کامل بر اساس دسته‌بندی
   ========================================== */
document.addEventListener('DOMContentLoaded', function() {
    const filterButtons = document.querySelectorAll('.cat-btn');
    const menuItems = document.querySelectorAll('.detailed-card');

    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');

            const filterValue = this.getAttribute('data-filter');

            menuItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.style.display = 'flex';
                    setTimeout(() => item.classList.add('is-visible'), 50);
                } else {
                    item.style.display = 'none';
                    item.classList.remove('is-visible');
                }
            });
        });
    });

    /* ==========================================
       ۵. انیمیشن نرم صفحه اصلی در بالا و پایین اسکرول کردن
       ========================================== */
    const homeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.15 });

    document.querySelectorAll('.fade-in-section').forEach(section => {
        homeObserver.observe(section);
    });

    /* ==========================================
       ۶. انیمیشن نرم و آرام زیگزاگی برای کارت‌های منوی کامل
       ========================================== */
    const zigzagObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
            } else {
                entry.target.classList.remove('is-visible');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.detailed-card').forEach(card => {
        zigzagObserver.observe(card);
    });
});