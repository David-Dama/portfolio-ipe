const typingWords = [
    'disciplinado',
    'resolutivo',
    'calmado',
    'dedicado',
    'autoexigente',
    'curioso',
    'constante',
    'proactivo',
];

const typingTarget = document.querySelector('#typing-word');
const nav = document.querySelector('#primary-nav');
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = [...document.querySelectorAll('.nav-link')];
const sections = [...document.querySelectorAll('main section[id]')];
const revealItems = document.querySelectorAll('.reveal');
const contactForm = document.querySelector('.contact-form');

let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeWord() {
    const currentWord = typingWords[wordIndex];
    const nextText = deleting
        ? currentWord.slice(0, charIndex - 1)
        : currentWord.slice(0, charIndex + 1);

    typingTarget.textContent = nextText;
    charIndex = nextText.length;

    if (!deleting && charIndex === currentWord.length) {
        deleting = true;
        setTimeout(typeWord, 1150);
        return;
    }

    if (deleting && charIndex === 0) {
        deleting = false;
        wordIndex = (wordIndex + 1) % typingWords.length;
    }

    setTimeout(typeWord, deleting ? 55 : 95);
}

function closeMobileMenu() {
    nav.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
}

function setActiveNav() {
    const currentSection = sections.reduce((active, section) => {
        const rect = section.getBoundingClientRect();
        return rect.top <= 140 ? section : active;
    }, sections[0]);

    navLinks.forEach((link) => {
        const isActive = link.getAttribute('href') === `#${currentSection.id}`;
        link.classList.toggle('active', isActive);
        link.setAttribute('aria-current', isActive ? 'page' : 'false');
    });
}

menuToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(isOpen));
});

navLinks.forEach((link) => link.addEventListener('click', closeMobileMenu));
window.addEventListener('scroll', setActiveNav, { passive: true });

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.14 });

revealItems.forEach((item) => revealObserver.observe(item));

contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Formulario de muestra. Para contactar de verdad, escríbeme a davidlopezzurron@gmail.com.');
});

typeWord();
setActiveNav();