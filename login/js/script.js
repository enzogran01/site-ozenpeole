window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');

    const userName = localStorage.getItem('userName')

    if (userName) {
        window.location.href = '../homepage/homepage.html'
    }
});

const form = document.getElementById('formulario');
const revealer = document.getElementById('revealer');
const emailInput = document.getElementById('email');
const passwordInput = document.getElementById('password');

// Mostrar/ocultar senha
revealer.addEventListener('click', function reveal() {
    passwordInput.type = passwordInput.type === "password" ? "text" : "password";
});

// Função para validar email
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    return emailRegex.test(email);
}

// Função para validar senha
function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_-])[0-9a-zA-Z$*&@#]{8,}$/;
    return passwordRegex.test(password);
}

// Função para adicionar/remover classes de erro
function toggleError(inputElement, isValid) {
    if (isValid) {
        inputElement.classList.remove('input-field-fail');
        inputElement.classList.add('input-field');
    } else {
        inputElement.classList.remove('input-field');
        inputElement.classList.add('input-field-fail');
    }
}


// Validação no envio do formulário
form.addEventListener('submit', function validate(e) {
    e.preventDefault(); // Impede o envio padrão do formulário

    let isValid = true;

    // Validação do Email
    if (emailInput.value.trim() === "" || !validateEmail(emailInput.value)) {
        toggleError(emailInput, false);
        isValid = false;
    } else {
        toggleError(emailInput, true);
    }

    // Validação da Senha
    if (passwordInput.value.trim() === "" || !validatePassword(passwordInput.value)) {
        toggleError(passwordInput, false);
        isValid = false;
    } else {
        toggleError(passwordInput, true);
    }

    // Se tudo estiver válido, faz a requisição
    if (isValid) {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();
    
        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
            .then(response => {
                if (response.status === 403) {
                    alert('Sua conta está desativada. Redirecionando para a página de cadastro.');
                    window.location.href = '../cadastro/cadastro.html';
                    return null; // Interrompe o fluxo para não continuar processando a resposta
                } else if (response.status === 200) {
                    return response.json(); // Processa a resposta somente se o status for 200
                } else {
                    return response.json().then(data => {
                        throw new Error(data.message); // Lança erro para mensagens personalizadas
                    });
                }
            })
            .then(data => {
                if (data) {
                    // Armazena os dados no localStorage
                    localStorage.setItem('userName', data.userName);
                    localStorage.setItem('userId', data.userId);
                    localStorage.setItem('typeUser', data.status);
                    localStorage.setItem('formModal', false);
    
                    if (data.status === 'admin') {
                        alert('Login de administrador realizado com sucesso!');
                        window.location.href = '../admin/admin.html';
                    } else {
                        alert('Login de usuário realizado com sucesso!');
                        window.location.href = '../homepage/homepage.html';
                    }
                }
            })
            .catch(error => {
                console.error('Erro ao fazer login:', error);
                alert(error.message); // Exibe mensagem de erro personalizada
            });
    }
    
});
