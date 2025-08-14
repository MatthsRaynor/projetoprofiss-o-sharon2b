// Menu Mobile
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') 
        ? '<i class="fas fa-times"></i>' 
        : '<i class="fas fa-bars"></i>';
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
});

// Carrossel de Depoimentos
const carrosselInner = document.querySelector('.carrossel-inner');
const prevBtn = document.querySelector('.carrossel-prev');
const nextBtn = document.querySelector('.carrossel-next');
const depoimentos = document.querySelectorAll('.depoimento-card');
let currentIndex = 0;

function updateCarrossel() {
    const offset = -currentIndex * 100;
    carrosselInner.style.transform = `translateX(${offset}%)`;
}

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % depoimentos.length;
    updateCarrossel();
});

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + depoimentos.length) % depoimentos.length;
    updateCarrossel();
});

// FAQ Accordion
const faqPerguntas = document.querySelectorAll('.faq-pergunta');

faqPerguntas.forEach(pergunta => {
    pergunta.addEventListener('click', () => {
        const resposta = pergunta.nextElementSibling;
        const isActive = pergunta.classList.contains('active');
        
        // Fecha todas as respostas
        document.querySelectorAll('.faq-resposta').forEach(r => {
            r.classList.remove('active');
        });
        
        // Remove a classe active de todas as perguntas
        document.querySelectorAll('.faq-pergunta').forEach(p => {
            p.classList.remove('active');
        });
        
        // Se não estava ativo, abre a resposta clicada
        if (!isActive) {
            pergunta.classList.add('active');
            resposta.classList.add('active');
        }
    });
});

// Scroll suave para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            const offsetTop = targetElement.offsetTop - 70; // Ajuste para a navbar fixa
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de scroll
const fadeElements = document.querySelectorAll('.fade-in');

function checkScroll() {
    fadeElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (elementTop < windowHeight - 100) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Adiciona a classe fade-in para elementos que devem aparecer no scroll
document.querySelectorAll('.destaque-card, .sobre-texto, .sobre-imagem, .servico-card, .membro, .processo-etapa, .caso-card, .blog-card').forEach(el => {
    el.classList.add('fade-in');
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
});

window.addEventListener('scroll', checkScroll);
window.addEventListener('load', checkScroll);

// Navbar scroll effect
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'rgba(255, 255, 255, 0.98)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        navbar.style.background = 'var(--white)';
    }
});
