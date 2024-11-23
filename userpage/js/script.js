// const { config } = require("dotenv");

window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('hidden');
    
    // Verifica se o usuário está logado
    const userName = localStorage.getItem('userName');
    const typeUser = localStorage.getItem('typeUser');

    const campButton = document.getElementById('modalCampButton');
    const dashButton = document.getElementById('mocalDashButton');

    if (userName) {
       const user = document.querySelector('#user');
       user.textContent = `${userName}`;
       user.classList.remove('hidden');
        
       if (typeUser === 'admin') {
           modalCampButton.classList.add('hidden');
           modalDashButton.classList.remove('hidden');
       }
       else {
           modalCampButton.classList.remove('hidden');
           modalDashButton.classList.add('hidden');
       }
        
       const campaignData = localStorage.getItem('campaignData');

       if (campaignData) {
           modalCampButton.href = '../viewCampanha/viewCampanha.html'
       }

    }

});

document.getElementById("sair").addEventListener("click", () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("campaignData")
    localStorage.removeItem("typeUser")
    localStorage.removeItem("formModal")
    
    document.getElementById('login').classList.remove("hidden");
    document.getElementById('cadastro').classList.remove("hidden");
    
    // Mostra novamente o botão de cadastro laranja na página inicial após logout
    const cadastroBtn = document.getElementById('cadastro-btn');
    if (cadastroBtn) {
        cadastroBtn.style.display = "block"; // Exibir o botão de cadastro de novo
    }

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

const configOption = document.getElementById('configOption')
const campaignOption = document.getElementById('campaignOption')
const logoutOption = document.getElementById('logoutOption')

const profileOption = document.getElementById('profileOption')
const passwordOption = document.getElementById('passwordOption')

const configElements = document.getElementById('configElements')
const passwordElements = document.getElementById('passwordElements')

configOption.addEventListener('click', () => {
    changeOptionClass(configOption, campaignOption, logoutOption)
})
campaignOption.addEventListener('click', () => {
    changeOptionClass(campaignOption, configOption, logoutOption)
})
logoutOption.addEventListener('click', () => {
    changeOptionClass(logoutOption, campaignOption, configOption)
})

profileOption.addEventListener('click', () => {
    changeMiniSectionState(configElements, passwordElements)
    changeOptionClass(profileOption, passwordOption)
})
passwordOption.addEventListener('click', () => {
    changeMiniSectionState(passwordElements, configElements)
    changeOptionClass(passwordOption, profileOption)
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
