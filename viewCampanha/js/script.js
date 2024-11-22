window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');

    const userName = localStorage.getItem('userName');
    const typeUser = localStorage.getItem('typeUser');

    if (userName) {
        // Mostra a mensagem de boas-vindas
        const user = document.querySelector('#user');
        user.textContent = `${userName}`;
        user.classList.remove('hidden');

        // Esconde os botões de login e cadastro
        // document.getElementById('login').classList.add("hidden");
        // document.getElementById('cadastro').classList.add("hidden");
    }

    const campaignData = localStorage.getItem('campaignData');

    if (campaignData) {
        modalCampButton.href = '../viewCampanha/viewCampanha.html'
    }

    if (typeUser === 'admin') {
        modalCampButton.classList.add('hidden');
        modalDashButton.classList.remove('hidden');
    }
    else {
        modalCampButton.classList.remove('hidden');
        modalDashButton.classList.add('hidden');
    }
    
});

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

const campaignData = localStorage.getItem('campaignData');

if (campaignData) {
    const container = document.getElementById('campaignContainer');

    // Regex ajustada para capturar dados do formato fornecido
    const regex = /\*Dia (\d+)\* - (.*?),\s*- (.*?),\s*- (.*?);/g;
    let match;

    // Loop para processar cada dia da campanha
    while ((match = regex.exec(campaignData)) !== null) {
        const day = match[1]; // Número do dia
        const description = match[2]; // Descrição da imagem
        const caption = match[3]; // Legenda
        const time = match[4]; // Horário da postagem

        // Cria uma div para o dia
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerHTML = `
            <h2>Dia ${day}</h2>
            <p><strong>Descrição da imagem:</strong> ${description}</p>
            <p><strong>Legenda:</strong> ${caption}</p>
            <p><strong>Horário da postagem:</strong> ${time}</p>
        `;

        // Adiciona a div ao container
        container.appendChild(dayDiv);
    }
} else {
    // Exibe mensagem caso não haja dados no localStorage
    document.getElementById('campaignContainer').innerText = "Nenhuma campanha encontrada.";

    alert('Nenhuma campanha encontrada');
    window.location.href = "../homepage/homepage.html"
}

const campButton = document.getElementById('campButton')
const delButton = document.getElementById('delButton')
const delCampModal = document.getElementById('delCampModal')

const closeDelCampModal = document.getElementById('closeDelCampModal')
const dontDelCampButton = document.getElementById('dontDelCampButton')
const delCampButton = document.getElementById('delCampButton')

let icons = document.querySelectorAll("#path");

campButton.addEventListener('click', () => {
    RemoveButtonClass(delButton)
    ChangeIconColor(icons, icons[0])
    campButton.classList.add('button-active')
})
delButton.addEventListener('click', () => {
    RemoveButtonClass(campButton)
    ChangeIconColor(icons, icons[0])
    delButton.classList.add('del-button-active')

    delCampModal.showModal();
})

closeDelCampModal.addEventListener('click', () => {
    delCampModal.close();
    RemoveButtonClass(delButton)
    ChangeIconColor(icons, icons[0])
    campButton.classList.add('button-active')
})
dontDelCampButton.addEventListener('click', () => {
    delCampModal.close();
    RemoveButtonClass(delButton)
    ChangeIconColor(icons, icons[0])
    campButton.classList.add('button-active')
})
delCampButton.addEventListener('click', () => {
    localStorage.removeItem("campaignData")

    window.location.href = "../homepage/homepage.html"
})

function RemoveButtonClass(...properties) {
    properties.forEach((property) => {
        if (property.id === "delButton") {
            property.classList.remove ("del-button-active")
        } else {
            property.classList.remove("button-active")
        }
    })
}

function ChangeIconColor(icons, ...clickedIcons) {
    icons.forEach((icon) => {
        icon.setAttribute("stroke", "#000")
    })

    clickedIcons.forEach((clickedIcon) => {
        clickedIcon.setAttribute("stroke", "#fff")
    })
}


