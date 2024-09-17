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

    // agora envia via fetch que basicamente faz requisições HTTP pro servidor web nesse caso dos dados do cadastro
    if (isValid) { // kinghost
        const userData = {
            name: nameInput.value,
            email: emailInput.value,
            password: passwordInput.value,
            telephone: phoneInput.value
        };

        // envia os dados pro servidor
        fetch('http://localhost:3000/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => response.text())
        .then(data => {
            alert(data); // mensagem de sucesso ou erro
        })
        .catch(error => {
            console.error('Erro ao registrar usuário:', error);
            alert('Erro ao registrar usuário');
        });
    }
});
