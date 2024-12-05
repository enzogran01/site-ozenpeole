window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    
    // Verifica se o usuário está logado
    const userName = localStorage.getItem('userName');
    const userEmail = localStorage.getItem('userEmail');
    const userTelephone = localStorage.getItem('userTelephone');
    const typeUser = localStorage.getItem('typeUser');

    const modalCampButton = document.getElementById('modalCampButton');
    const modalDashButton = document.getElementById('modalDashButton');

    const dashboardOption = document.getElementById('dashboardOption')
    const campaignOption = document.getElementById('campaignOption')

    if (userName) {
       const user = document.querySelector('#user');
       user.textContent = `${userName}`;
       user.classList.remove('hidden');

       const userNameElement = document.getElementById('userNameElement')
       const userEmailElement = document.getElementById('userEmailElement')
       const userTelephoneElement = document.getElementById('userTelephoneElement')
       userNameElement.innerHTML = `${userName}`;
       userEmailElement.innerHTML = `${userEmail}`;
       userTelephoneElement.innerHTML = `${userTelephone}`;
        
       if (typeUser === 'admin') {
           modalCampButton.classList.add('hidden');
           modalDashButton.classList.remove('hidden');

           campaignOption.classList.remove('option') 
           campaignOption.classList.add('hidden')
           dashboardOption.classList.remove('hidden') 
           dashboardOption.classList.add('option') 
       }
       else {
           modalCampButton.classList.remove('hidden');
           modalDashButton.classList.add('hidden');

           campaignOption.classList.remove('hidden') 
           campaignOption.classList.add('option')
           dashboardOption.classList.remove('option') 
           dashboardOption.classList.add('hidden') 
       }

    } else {
        alert('Usuário não encontrado')
        window.location.href = '../homepage/homepage.html'
    }

    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:3000/getCampanhas/${userId}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    })
    .then((campanhas) => {
        console.log(campanhas)
        modalCampButton.addEventListener('click', () => {
            if (campanhas.length > 0) {
                window.location.href = '../viewCampanha/viewCampanha.html'
                return;
            } else {
                window.location.href = '../formulario/inicio/inicioForm.html'
                return;
            }
        })
    })
});

function logoff () {
    ['userName',  'typeUser', 'formModal', 'userId', 'userEmail', 'userTelephone', 'ativo'].forEach(item => localStorage.removeItem(item));
}

document.getElementById("sair").addEventListener("click", () => {
    logoff();
    window.location.href = "../homepage/homepage.html";
});

const userModal = document.getElementById('userModal');
const user = document.getElementById('user');

function openModalBelowElement () {
    const rect = user.getBoundingClientRect();

    userModal.style.top = `${rect.bottom + window.scrollY}px`;
    userModal.style.left = `${rect.left + window.scrollX}px`;

    userModal.showModal();
}

user.addEventListener('click', openModalBelowElement);

userModal.addEventListener('click', (event) => {
    const dialogRect = userModal.getBoundingClientRect();

    const isOutsideClick =
        event.clientX < dialogRect.left ||
        event.clientX > dialogRect.right ||
        event.clientY < dialogRect.top ||
        event.clientY > dialogRect.bottom;

    if (isOutsideClick) {
        userModal.close();
    }
});

//Opções do aside
const configOption = document.getElementById('configOption')
const campaignOption = document.getElementById('campaignOption')
const logoutOption = document.getElementById('logoutOption')

//Opções da parte de configuração
const profileOption = document.getElementById('profileOption')
const passwordOption = document.getElementById('passwordOption')
const resetPasswordOption = document.getElementById('resetPasswordOption')

const resetPasswordModal = document.getElementById('resetPasswordModal')
const firstArrowBack = document.getElementById('firstArrowBack')
const secondArrowBack = document.getElementById('secondArrowBack')
const firstResetPassword = document.getElementById('firstResetPassword')
const secondResetPassword = document.getElementById('secondResetPassword')
const advanceResetButton = document.getElementById('advanceResetButton')
const cancelResetButton = document.getElementById('cancelResetButton')

firstArrowBack.addEventListener('click', () => {
    resetPasswordModal.close();
})
secondArrowBack.addEventListener('click', () => {
    firstResetPassword.classList.remove('hidden')
    firstResetPassword.classList.add('reset-password-div')

    secondResetPassword.classList.remove('reset-password-div')
    secondResetPassword.classList.add('hidden')
})
cancelResetButton.addEventListener('click', () => {
    resetPasswordModal.close();

    firstResetPassword.classList.remove('hidden')
    firstResetPassword.classList.add('reset-password-div')

    secondResetPassword.classList.remove('reset-password-div')
    secondResetPassword.classList.add('hidden')
})

//Elementos da parte de configuração
const configElements = document.getElementById('configElements')
const passwordElements = document.getElementById('passwordElements')


configOption.addEventListener('click', () => {
    changeOptionClass(configOption, campaignOption, logoutOption)
})
campaignOption.addEventListener('click', () => {
    changeOptionClass(campaignOption, configOption, logoutOption)

    const userId = localStorage.getItem("userId");

    fetch(`http://localhost:3000/getCampanhas/${userId}`)
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    })
    .then((campanhas) => {
        console.log(campanhas)
        if (campanhas.length > 0) {
            window.location.href = '../viewCampanha/viewCampanha.html'
            return;
        } else {
            window.location.href = '../formulario/inicio/inicioForm.html'
            return;
        }
    })
})
dashboardOption.addEventListener('click', () => {
    window.location.href = '../admin/admin.html'
})
logoutOption.addEventListener('click', () => {
    changeOptionClass(logoutOption, campaignOption, configOption)

    localStorage.removeItem("userName")
    localStorage.removeItem("typeUser")
    localStorage.removeItem("formModal")

    window.location.href = "../homepage/homepage.html";
})

profileOption.addEventListener('click', () => {
    changeMiniSectionState(configElements, passwordElements)
    changeOptionClass(profileOption, passwordOption)
})
passwordOption.addEventListener('click', () => {
    changeMiniSectionState(passwordElements, configElements)
    changeOptionClass(passwordOption, profileOption)
})
resetPasswordOption.addEventListener('click', () => {
    resetPasswordModal.showModal();
})

function changeMiniSectionState (clickedSection, ...sections) {
    clickedSection.classList.remove('hidden')
    clickedSection.classList.add('shown-element')

    sections.forEach((section) => {
        section.classList.remove('shown-element')
        section.classList.add('hidden')
    })
}

function changeOptionClass (clickedOption, ...options) {
    clickedOption.classList.remove('option')
    clickedOption.classList.add('option-active')

    options.forEach((option) => {
        option.classList.remove('option-active')
        option.classList.add('option')
    })
}

// Modais / elementos confirmar senha
const delUserModal = document.getElementById('disableUserModal');
const confirmPasswordModal = document.getElementById('confirmPasswordModal');
const disableModal = document.getElementById('disableUserModal');
const confirmPasswordForm = document.getElementById('confirmPasswordForm')
const confirmEmailForm = document.getElementById('confirmEmailForm');
const changePasswordForm = document.getElementById('changePasswordForm');

// Botões confirmar senha
const disableButton = document.getElementById('disableButton');
const dontDelUserModal = document.getElementById('dontDelUserButton');
const delUserButton = document.getElementById('delUserButton');
const closeArrowBack = document.getElementById('closeArrowBack');
const confirmPasswordButton = document.getElementById('confirmPasswordButton')
const closeDelUserModal = document.getElementById('closeDelUserModal');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');
const newPasswordInput = document.getElementById('newPasswordInput')
const confirmNewPasswordInput = document.getElementById('confirmNewPasswordInput')
const revealPasswordOne = document.getElementById('revealPasswordOne')
const revealPasswordTwo = document.getElementById('revealPasswordTwo')

revealPasswordTwo.addEventListener('click', () => {
    confirmPasswordInput.type = confirmPasswordInput.type === "password" ? "text" : "password";
})
revealPasswordOne.addEventListener('click', () => {
    newPasswordInput.type = newPasswordInput.type === "password" ? "text" : "password";
    confirmNewPasswordInput.type = confirmNewPasswordInput.type === "password" ? "text" : "password";
})

disableButton.addEventListener('click', (e) => {
    e.preventDefault();
    confirmPasswordModal.showModal();
})

dontDelUserModal.addEventListener('click', () => {
    delUserModal.close()
})
closeDelUserModal.addEventListener('click', () => {
    delUserModal.close()
})
closeArrowBack.addEventListener('click', () => {
    confirmPasswordModal.close();
})

changePasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    if (newPasswordInput.value !== confirmNewPasswordInput.value) {
        alert('As senhas não coincidem. Por favor, revise')
        return;
    }

    const userId = localStorage.getItem('userId');
    const novaSenha = document.getElementById('newPasswordInput').value;

    fetch(`http://localhost:3000/mudarSenha/${userId}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ novaSenha }), // Envia a nova senha
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            alert('Senha atualizada');
            resetPasswordModal.close();
            firstResetPassword.classList.remove('hidden')
            firstResetPassword.classList.add('reset-password-div')
            secondResetPassword.classList.remove('reset-password-div')
            secondResetPassword.classList.add('hidden')
            newPasswordInput.value = ''; // Limpa o input de senha
        } else {
            alert(data.message);
        }
    })
        .catch((error) => {
            console.error('Erro ao atualizar a senha:', error);
            alert('Erro ao atualizar a senha. Tente novamente.');
        });
        
})

confirmPasswordForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId'); // Recupera o ID do usuário do localStorage
    const senha = document.getElementById('confirmPasswordInput').value; // Obtém o valor da senha

    fetch('http://localhost:3000/verificarSenha', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, senha: senha })
    })
    .then((response) => response.json())
    .then((data) => {
        if (data.success) {
            console.log('Senha confirmada com sucesso');
            
            confirmPasswordModal.close();
            delUserModal.showModal();

            confirmPasswordInput.value === '';
        } else {
            alert(data.message); // Exibe mensagem de erro
        }
    })
    .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Erro ao verificar senha');
    });

});

confirmEmailForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const userId = localStorage.getItem('userId');
    const email = document.getElementById('confirmEmailInput').value;

    fetch('http://localhost:3000/verificarEmail', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: userId, email: email })
    })
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        console.log('data: ' + data); // Verificar o que o backend retorna

        if (data.success) {
            console.log('Email confirmado com sucesso');

            // Mudar classes somente quando for sucesso
            firstResetPassword.classList.add('hidden');
            firstResetPassword.classList.remove('reset-password-div');

            secondResetPassword.classList.add('reset-password-div');
            secondResetPassword.classList.remove('hidden');

            confirmEmailInput.value = '';
        } else {
            alert(data.message || 'Email inválido'); // Exibe mensagem do backend ou mensagem padrão
        }
    })
    .catch((error) => {
        console.error('Erro na requisição:', error);
        alert('Email inválido');
    });
});

delUserButton.addEventListener('click', () => {

    const userId = localStorage.getItem('userId')

    fetch(`http://localhost:3000/desativarUsuario/${userId}`, {method: 'PATCH',})

    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro: ${response.statusText}`);
        }
        return response.text();
    })
    .then(message => {
        logoff();
        window.location.href = "../homepage/homepage.html";
    })
    .catch(error => {
        console.error('Erro ao desativar usuário:', error);
    });
})
