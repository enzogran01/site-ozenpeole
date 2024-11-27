window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
});

const form = document.getElementById('formulario'); 
const revealer = document.getElementById('revealer');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phoneNum');
const passwordInput = document.getElementById('password');
const conditionsInput = document.getElementById('conditions');
const errorMessageDiv = document.getElementById('error-message');

// Inicialmente esconde a div de erros
errorMessageDiv.style.display = 'none';

// Mostrar/ocultar senha
revealer.addEventListener('click', function reveal() {
    if (passwordInput.type === "password") {
        passwordInput.type = "text";
    } else {
        passwordInput.type = "password";
    }
});

// Função para validar nome (apenas letras e espaços)
function validateName(name) {
    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
}

// Função para validar email (formato de email)
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i;
    return emailRegex.test(email);
}

// Função para validar senha (pelo menos 8 caracteres, 1 letra maiúscula, 1 letra minúscula, 1 símbolo)
function validatePassword(password) {
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[$*&@#_-])[0-9a-zA-Z$*&@#]{8,}$/;
    return passwordRegex.test(password);
}

// Função para validar número de telefone (apenas números, comprimento 11)
function validatePhone(phone) {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
}

// Função para adicionar/remover classes de erro e exibir mensagens na div de erros
function toggleError(inputElement, isValid, errorMessage) {
    if (isValid) {
        inputElement.classList.remove('input-field-fail');
        inputElement.classList.add('input-field');
    } else {
        inputElement.classList.remove('input-field');
        inputElement.classList.add('input-field-fail');
        const errorList = document.querySelector('#error-message ul');
        const errorItem = document.createElement('li');
        errorItem.textContent = errorMessage;
        errorList.appendChild(errorItem);
    }
}

// Limpar lista de erros
function clearErrors() {
    const errorList = document.querySelector('#error-message ul');
    errorList.innerHTML = '';  // Remove todas as mensagens de erro
}

// Validação no envio do formulário
form.addEventListener('submit', function validate(e) {
    e.preventDefault();
    
    // Limpar os erros anteriores
    clearErrors();
    
    // Variável que determina se houve erro
    let hasError = false;

    // Verificação dos campos
    let isValid = true;

    // Validação do Nome
    if (nameInput.value.trim() === "" || !validateName(nameInput.value)) {
        toggleError(nameInput, false, 'Nome inválido. Apenas letras e espaços são permitidos.');
        isValid = false;
        hasError = true;
    } else {
        toggleError(nameInput, true, '');
    }

    // Validação do Email
    if (emailInput.value.trim() === "" || !validateEmail(emailInput.value)) {
        toggleError(emailInput, false, 'Email inválido. Insira um formato de email válido.');
        isValid = false;
        hasError = true;
    } else {
        toggleError(emailInput, true, '');
    }

    // Validação da Senha
    if (passwordInput.value.trim() === "" || !validatePassword(passwordInput.value)) {
        toggleError(passwordInput, false, 'A senha deve ter no mínimo 8 caracteres, incluindo 1 letra maiúscula, 1 número e 1 símbolo.');
        isValid = false;
        hasError = true;
    } else {
        toggleError(passwordInput, true, '');
    }

    // Validação do Telefone
    if (phoneInput.value.trim() === "" || !validatePhone(phoneInput.value)) {
        toggleError(phoneInput, false, 'Número de telefone inválido. Deve conter 11 dígitos.');
        isValid = false;
        hasError = true;
    } else {
        toggleError(phoneInput, true, '');
    }

    // Validação dos Termos e Condições
    if (!conditionsInput.checked) {
        toggleError(conditionsInput, false, 'Você deve aceitar os Termos e Condições.');
        isValid = false;
        hasError = true;
    }

    // Exibe a div de erros somente se houver erros
    if (hasError) {
        errorMessageDiv.style.display = 'block';
    } else {
        errorMessageDiv.style.display = 'none'; // Esconde se estiver tudo ok
    }

    // Agora envia via fetch os dados do cadastro, se for válido
    if (isValid) {
        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            telephone: phoneInput.value
        };
    
        // Envia os dados para o servidor
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.json()) // Ajuste para lidar com JSON
        .then(data => {
          
            if (data.success) { 
                // Redireciona para a página de login
                window.location.href = '../login/login.html';
                alert(data.success); // Exibe a mensagem retornada pelo servidor dream on faggot
            }
        })
        
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
            alert('Erro ao registrar usuário');
        });
    }
    
});

