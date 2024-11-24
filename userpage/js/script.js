// const { config } = require("dotenv");

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    
    // Verifica se o usuário está logado
    const userName = localStorage.getItem('userName');
    const typeUser = localStorage.getItem('typeUser');

    const campButton = document.getElementById('modalCampButton');
    const dashButton = document.getElementById('mocalDashButton');

    const dashboardOption = document.getElementById('dashboardOption')
    const campaignOption = document.getElementById('campaignOption')

    if (userName) {
       const user = document.querySelector('#user');
       user.textContent = `${userName}`;
       user.classList.remove('hidden');
        
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
        
       const campaignData = localStorage.getItem('campaignData');

       if (campaignData) {
           modalCampButton.href = '../viewCampanha/viewCampanha.html'
       }

    } else {
        alert('Usuário não encontrado.')
        window.location.href = '../homepage/homepage.html'
    }

});

const campaignData = localStorage.getItem('campaignData');

document.getElementById("sair").addEventListener("click", () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("campaignData")
    localStorage.removeItem("typeUser")
    localStorage.removeItem("formModal")

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
const confirmResetButton = document.getElementById('confirmResetButton')

firstArrowBack.addEventListener('click', () => {
    resetPasswordModal.close();
})
secondArrowBack.addEventListener('click', () => {
    firstResetPassword.classList.remove('hidden')
    firstResetPassword.classList.add('reset-password-div')

    secondResetPassword.classList.remove('reset-password-div')
    secondResetPassword.classList.add('hidden')
})
advanceResetButton.addEventListener('click', () => {
    firstResetPassword.classList.remove('reset-password-div')
    firstResetPassword.classList.add('hidden')

    secondResetPassword.classList.remove('hidden')
    secondResetPassword.classList.add('reset-password-div')
})
confirmResetButton.addEventListener('click', () => {
    resetPasswordModal.close();

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

    if (campaignData) {
        window.location.href = '../viewCampanha/viewCampanha.html'
    } else {
        window.location.href = '../formulario/inicio/inicioForm.html'
    }
})
logoutOption.addEventListener('click', () => {
    changeOptionClass(logoutOption, campaignOption, configOption)

    localStorage.removeItem("userName")
    localStorage.removeItem("campaignData")
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

// const confirmEmailInputVal = document.getElementById('confirmEmailInput').value
// const newPasswordInputVal = document.getElementById('newPasswordInput').value
// const confirmNewPasswordInputVal = document.getElementById('confirmNewPasswordInput').value

// if (confirmEmailInputVal.trim()) {
//     advanceResetButton.disabled = false;
// } else {
//     advanceResetButton.disabled = true;
// }
