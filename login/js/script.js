window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
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
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login bem-sucedido!') {
                // Armazena o nome do administrador ou do usuário no localStorage
                localStorage.setItem('userName', data.userName); // `userName` vem do servidor
                localStorage.setItem('typeUser', data.status); // `userName` vem do servidor
                localStorage.setItem('formModal', false);
                
                if (data.status === 'admin') {
                    alert('Login de administrador realizado com sucesso!');

                    window.location.href = '../admin/admin.html'; // redireciona para a página de admin
                } else {
                    alert('Login de usuário realizado com sucesso!');
                    window.location.href = '../homepage/homepage.html'; // redireciona para a homepage
                }
            } else {
                alert(data.message); // exibe mensagem de erro
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
        // fetch('http://localhost:3000/login', {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json'
        //     },
        //     body: JSON.stringify({ email, password })
        // })
        // .then(response => response.json())
        // .then(data => {
        //     if (data.status === 'admin') {
        //         // login de administrador
        //         localStorage.setItem('userName', data.userName);
        //         alert('Login realizado como administrador!');
        //         window.location.href = '../admin/admin.html'; // vai pro admin html
        //     } else if (data.status === 'user') {
        //         // login de usuário comum bem-sucedido
        //         localStorage.setItem('userName', data.userName); // `userName` vem do servidor
        //         alert('Login realizado com sucesso!');
        //         window.location.href = '../homepage/homepage.html'; // vai pra a homepage
        //     } else {
        //         // credenciais incorretas
        //         alert(data.message);
        //     }
        // })
        // .catch(error => {
        //     console.error('Erro ao fazer login:', error);
        // });
     
    }
});
