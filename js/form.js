document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('formContato');
    
    if (form) {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Validação básica
            const nome = document.getElementById('nome');
            const email = document.getElementById('email');
            const assunto = document.getElementById('assunto');
            const mensagem = document.getElementById('mensagem');
            
            let isValid = true;
            
            // Resetar erros
            document.querySelectorAll('.error').forEach(el => el.remove());
            
            // Validar nome
            if (nome.value.trim() === '') {
                showError(nome, 'Por favor, insira seu nome completo');
                isValid = false;
            }
            
            // Validar email
            if (email.value.trim() === '') {
                showError(email, 'Por favor, insira seu e-mail');
                isValid = false;
            } else if (!isValidEmail(email.value.trim())) {
                showError(email, 'Por favor, insira um e-mail válido');
                isValid = false;
            }
            
            // Validar assunto
            if (assunto.value === '' || assunto.value === null) {
                showError(assunto, 'Por favor, selecione um assunto');
                isValid = false;
            }
            
            // Validar mensagem
            if (mensagem.value.trim() === '') {
                showError(mensagem, 'Por favor, escreva sua mensagem');
                isValid = false;
            }
            
            // Se tudo estiver válido, enviar o formulário
            if (isValid) {
                // Mostrar mensagem de carregamento
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.textContent;
                submitBtn.disabled = true;
                submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
                
                // Enviar formulário via FormSubmit
                fetch(form.action, {
                    method: 'POST',
                    body: new FormData(form),
                    headers: {
                        'Accept': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) {
                        // Mostrar mensagem de sucesso
                        form.reset();
                        alert('Mensagem enviada com sucesso! Entraremos em contato em breve.');
                    } else {
                        throw new Error('Erro ao enviar mensagem');
                    }
                })
                .catch(error => {
                    alert('Ocorreu um erro ao enviar sua mensagem. Por favor, tente novamente mais tarde.');
                    console.error('Error:', error);
                })
                .finally(() => {
                    submitBtn.disabled = false;
                    submitBtn.textContent = originalText;
                });
            }
        });
        
        // Função para mostrar erros
        function showError(input, message) {
            const errorElement = document.createElement('div');
            errorElement.className = 'error';
            errorElement.style.color = 'var(--error)';
            errorElement.style.fontSize = '0.8rem';
            errorElement.style.marginTop = '0.3rem';
            errorElement.textContent = message;
            
            input.parentNode.appendChild(errorElement);
            input.style.borderColor = 'var(--error)';
            
            // Remover o estilo de erro quando o usuário começar a digitar
            input.addEventListener('input', function() {
                errorElement.remove();
                input.style.borderColor = '#ddd';
            });
        }
        
        // Função para validar email
        function isValidEmail(email) {
            const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return re.test(email);
        }
        
        // Máscara para telefone
        const telefone = document.getElementById('telefone');
        if (telefone) {
            telefone.addEventListener('input', function(e) {
                let value = e.target.value.replace(/\D/g, '');
                
                if (value.length > 11) {
                    value = value.substring(0, 11);
                }
                
                if (value.length > 0) {
                    value = `(${value.substring(0, 2)}) ${value.substring(2)}`;
                }
                
                if (value.length > 3) {
                    value = `${value.substring(0, 3)}) ${value.substring(3)}`;
                }
                
                if (value.length > 10) {
                    value = `${value.substring(0, 10)}-${value.substring(10)}`;
                }
                
                e.target.value = value;
            });
        }
    }
});
