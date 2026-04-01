// ============================================================
//  script.js — Manal Chaib Photography Portfolio
// ============================================================

// ── Preloader ─────────────────────────────────────────────
const preloader = document.getElementById('preloader');
if (preloader) {
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
        }, 2000);
    });
}

// ── Custom cursor ─────────────────────────────────────────
const cursor = document.getElementById('cursor');
const cursorDot = document.getElementById('cursor-dot');

if (cursor && cursorDot) {
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;

    document.addEventListener('mousemove', e => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    // Smooth lag on the ring
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.12;
        cursorY += (mouseY - cursorY) * 0.12;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Hover expand
    document.querySelectorAll('a, button, .film-frame, .gallery-item, .filter-btn').forEach(el => {
        el.addEventListener('mouseenter', () => cursor.classList.add('hovering'));
        el.addEventListener('mouseleave', () => cursor.classList.remove('hovering'));
    });
}

// ── Nav scroll state ──────────────────────────────────────
const nav = document.getElementById('nav');
if (nav) {
    window.addEventListener('scroll', () => {
        nav.classList.toggle('scrolled', window.scrollY > 80);
    }, { passive: true });
}

// ── Reveal on scroll (IntersectionObserver) ───────────────
const reveals = document.querySelectorAll('.reveal');
const revealItems = document.querySelectorAll('.reveal-item');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

reveals.forEach(el => revealObserver.observe(el));

// Stagger project items
revealItems.forEach((el, i) => {
    el.style.setProperty('--i', i);
    revealObserver.observe(el);
});

// ── Light/dark section body class ─────────────────────────
const lightSections = document.querySelectorAll('.about-teaser');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            document.body.classList.add('light-section');
        } else {
            document.body.classList.remove('light-section');
        }
    });
}, { threshold: 0.3 });
lightSections.forEach(s => sectionObserver.observe(s));

// ── Folder Diagram Logic ──────────────────────────────────
const subFolders = document.querySelectorAll('.sub-folder');
const closeButtons = document.querySelectorAll('.close-folder');

subFolders.forEach(folder => {
    folder.addEventListener('click', () => {
        const targetId = folder.dataset.target;
        const targetView = document.getElementById(targetId);
        if (targetView) {
            targetView.classList.add('active');
            document.body.style.overflow = 'hidden';
        }
    });
});

closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        const parentView = btn.closest('.folder-view');
        if (parentView) {
            parentView.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});

document.addEventListener('DOMContentLoaded', () => {
    if (window.location.hash) {
        const hashId = window.location.hash.substring(1);
        const targetView = document.getElementById(hashId);
        if (targetView && targetView.classList.contains('folder-view')) {
            targetView.classList.add('active');
            document.body.style.overflow = 'hidden';
            history.replaceState(null, null, ' '); // Clean URL optionally
        }
    }
});

// ── Lightbox for Folder Views ──────────────────────────────
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');
const folderImages = document.querySelectorAll('.folder-img');

if (lightbox) {
    folderImages.forEach(img => {
        img.addEventListener('click', () => {
            if (lightboxImg) {
                lightboxImg.src = img.src;
                lightboxImg.alt = img.alt;
            }
            lightbox.classList.add('open');
        });
    });

    function closeLightbox() {
        lightbox.classList.remove('open');
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', e => {
        if (e.target === lightbox) closeLightbox();
    });
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape') {
            if(lightbox.classList.contains('open')) {
                closeLightbox();
            } else {
                // If lightbox is not open but a folder is, close the active folder
                const activeFolder = document.querySelector('.folder-view.active');
                if (activeFolder) {
                    activeFolder.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        }
    });
}

// ── Filmstrip drag-to-scroll ──────────────────────────────
const filmstrip = document.getElementById('filmstrip');
if (filmstrip) {
    let isDown = false, startX, scrollLeft;

    filmstrip.addEventListener('mousedown', e => {
        isDown = true;
        filmstrip.style.animationPlayState = 'paused';
        startX = e.pageX - filmstrip.offsetLeft;
        scrollLeft = filmstrip.scrollLeft;
    });
    filmstrip.addEventListener('mouseleave', () => {
        isDown = false;
        filmstrip.style.animationPlayState = 'running';
    });
    filmstrip.addEventListener('mouseup', () => {
        isDown = false;
        filmstrip.style.animationPlayState = 'running';
    });
    filmstrip.addEventListener('mousemove', e => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - filmstrip.offsetLeft;
        filmstrip.scrollLeft = scrollLeft - (x - startX) * 1.5;
    });
}
