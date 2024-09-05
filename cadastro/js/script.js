const form = document.getElementById('formulario');
const revealer = document.getElementById('revealer');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const phoneInput = document.getElementById('phoneNum');
const passwordInput = document.getElementById('password');
const conditionsInput = document.getElementById('conditions');

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
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Função para validar senha (pelo menos 1 maiúscula, 1 minúscula, 1 símbolo)
function validatePassword(password) {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\W).+$/;
    return passwordRegex.test(password);
}

// Função para validar número de telefone (apenas números, comprimento 11)
function validatePhone(phone) {
    const phoneRegex = /^\d{11}$/;
    return phoneRegex.test(phone);
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
    e.preventDefault();

    // Verificação dos campos
    let isValid = true;

    // Validação do Nome
    if (nameInput.value.trim() === "" || !validateName(nameInput.value)) {
        toggleError(nameInput, false);
        isValid = false;
    } else {
        toggleError(nameInput, true);
    }

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

    // Validação do Telefone
    if (phoneInput.value.trim() === "" || !validatePhone(phoneInput.value)) {
        toggleError(phoneInput, false);
        isValid = false;
    } else {
        toggleError(phoneInput, true);
    }

    // Validação dos Termos e Condições
    if (!conditionsInput.checked) {
        alert("Você deve aceitar os Termos e Condições.");
        isValid = false;
    }

    // Se tudo estiver válido, o formulário pode ser enviado
    if (isValid) {
        form.submit();
    }
});
