document.addEventListener('DOMContentLoaded', () => {

    /* ==========================================================================
       1. MENU HAMBÚRGUER MOBILE
       ========================================================================== */
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Alterna o ícone entre fa-bars e fa-xmark
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Fecha o menu mobile ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                const icon = hamburger.querySelector('i');
                if (icon) {
                    icon.classList.remove('fa-xmark');
                    icon.classList.add('fa-bars');
                }
            });
        });
    }

    /* ==========================================================================
       2. DESTAQUE DO LINK ATIVO AO ROLAR A PÁGINA (SCROLLSPY)
       ========================================================================== */
    const sections = document.querySelectorAll('section[id]');

    const scrollActive = () => {
        const scrollY = window.pageYOffset;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 100;
            const sectionId = current.getAttribute('id');
            const navLink = document.querySelector(`.nav-menu a[href*=${sectionId}]`);

            if (navLink) {
                if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                    navLink.classList.add('active');
                } else {
                    navLink.classList.remove('active');
                }
            }
        });
    };

    window.addEventListener('scroll', scrollActive);

    /* ==========================================================================
       3. VALIDAÇÃO DE FORMULÁRIO DE CONTATO
       ========================================================================== */
    const contactForm = document.getElementById('contact-form');
    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');
    const formFeedback = document.getElementById('form-feedback');

    // Função de auxílio para validar e-mail usando expressão regular
    const isValidEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    // Função para mostrar mensagem de erro individual
    const showError = (input, message) => {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-msg');
        input.classList.add('error');
        errorElement.textContent = message;
        errorElement.style.display = 'block';
    };

    // Função para limpar erro individual
    const clearError = (input) => {
        const formGroup = input.parentElement;
        const errorElement = formGroup.querySelector('.error-msg');
        input.classList.remove('error');
        errorElement.textContent = '';
        errorElement.style.display = 'none';
    };

    // Event listeners para limpar erros em tempo real
    [nameInput, emailInput, messageInput].forEach(input => {
        if (input) {
            input.addEventListener('input', () => clearError(input));
        }
    });

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            let isValid = true;

            // Validação do Nome
            if (nameInput.value.trim() === '') {
                showError(nameInput, 'Por favor, insira seu nome completo.');
                isValid = false;
            } else {
                clearError(nameInput);
            }

            // Validação do E-mail
            if (emailInput.value.trim() === '') {
                showError(emailInput, 'Por favor, insira seu e-mail.');
                isValid = false;
            } else if (!isValidEmail(emailInput.value.trim())) {
                showError(emailInput, 'Por favor, insira um e-mail válido.');
                isValid = false;
            } else {
                clearError(emailInput);
            }

            // Validação da Mensagem
            if (messageInput.value.trim() === '') {
                showError(messageInput, 'Por favor, escreva uma mensagem.');
                isValid = false;
            } else {
                clearError(messageInput);
            }

            // Se o formulário estiver válido
            if (isValid) {
                // Feedback visual ao usuário
                formFeedback.className = 'form-feedback success';
                formFeedback.textContent = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                
                // Reseta os campos do formulário
                contactForm.reset();

                // Remove a mensagem de sucesso após 5 segundos
                setTimeout(() => {
                    formFeedback.style.display = 'none';
                    formFeedback.className = 'form-feedback';
                }, 5000);
            }
        });
    }
});