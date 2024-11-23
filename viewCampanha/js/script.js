window.addEventListener('DOMContentLoaded', () => { // Substituído por DOMContentLoaded para garantir que todos os elementos estejam carregados
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden'); // Verifica se o loader existe

    const userName = localStorage.getItem('userName');
    const typeUser = localStorage.getItem('typeUser');
    const modalCampButton = document.getElementById('modalCampButton');
    const modalDashButton = document.getElementById('modalDashButton');

    if (userName) {
        const user = document.querySelector('#user');
        user.textContent = userName;
        user.classList.remove('hidden');
    }

    const campaignData = localStorage.getItem('campaignData');
    if (campaignData) {
        modalCampButton.href = '../viewCampanha/viewCampanha.html';
    }

    if (typeUser === 'admin') {
        modalCampButton?.classList.add('hidden');
        modalDashButton?.classList.remove('hidden');
    } else {
        modalCampButton?.classList.remove('hidden');
        modalDashButton?.classList.add('hidden');
    }

    if (!campaignData) {
        console.error('Nenhuma campanha encontrada no LocalStorage!');
    }
});

document.getElementById('sair')?.addEventListener('click', () => {
    ['userName', 'campaignData', 'typeUser', 'formModal'].forEach(item => localStorage.removeItem(item));
    window.location.href = '../homepage/homepage.html';
});

const userModal = document.getElementById('userModal');
const user = document.getElementById('user');

function openModalBelowElement() {
    const rect = user.getBoundingClientRect();
    userModal.style.top = `${rect.bottom + window.scrollY}px`;
    userModal.style.left = `${rect.left + window.scrollX}px`;
    userModal.showModal();
}

user?.addEventListener('click', openModalBelowElement);

userModal?.addEventListener('click', (event) => {
    const dialogRect = userModal.getBoundingClientRect();
    const isOutsideClick = event.clientX < dialogRect.left ||
        event.clientX > dialogRect.right ||
        event.clientY < dialogRect.top ||
        event.clientY > dialogRect.bottom;

    if (isOutsideClick) {
        userModal.close();
    }
});

const campaignData = localStorage.getItem('campaignData');
console.log(campaignData);
if (campaignData) {
    const container = document.getElementById('campaignContainer');
    const regex = /\*Dia (\d+)\* - (.*?),\s*- (.*?),\s*- (.*?);/g;
    let match;

    while ((match = regex.exec(campaignData)) !== null) {
        const [_, day, description, caption, time] = match;

        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerHTML = `
            <h2>Dia ${day}</h2>
            <p><strong>Descrição da imagem:</strong> ${description}</p>
            <p><strong>Legenda:</strong> ${caption}</p>
            <p><strong>Horário da postagem:</strong> ${time}</p>
        `;
        container.appendChild(dayDiv);
    }
} else {
    const container = document.getElementById('campaignContainer');
    container.textContent = 'Nenhuma campanha encontrada.';
    console.error('Nenhuma campanha encontrada!');
    window.location.href = '../homepage/homepage.html';
}

const campButton = document.getElementById('campButton');
const delButton = document.getElementById('delButton');
const delCampModal = document.getElementById('delCampModal');
const closeDelCampModal = document.getElementById('closeDelCampModal');
const dontDelCampButton = document.getElementById('dontDelCampButton');
const delCampButton = document.getElementById('delCampButton');
const icons = document.querySelectorAll('#path');

campButton?.addEventListener('click', () => {
    removeButtonClass(delButton);
    changeIconColor(icons, icons[0]);
    campButton.classList.add('button-active');
});

delButton?.addEventListener('click', () => {
    removeButtonClass(campButton);
    changeIconColor(icons, icons[0]);
    delButton.classList.add('del-button-active');
    delCampModal.showModal();
});

closeDelCampModal?.addEventListener('click', () => {
    closeDeleteModal();
});

dontDelCampButton?.addEventListener('click', () => {
    closeDeleteModal();
});

delCampButton?.addEventListener('click', () => {
    localStorage.removeItem('campaignData');
    window.location.href = '../homepage/homepage.html';
});

function removeButtonClass(...elements) {
    elements.forEach(element => {
        element?.classList.remove(element.id === 'delButton' ? 'del-button-active' : 'button-active');
    });
}

function changeIconColor(icons, ...clickedIcons) {
    icons.forEach(icon => icon.setAttribute('stroke', '#000'));
    clickedIcons.forEach(icon => icon.setAttribute('stroke', '#fff'));
}

function closeDeleteModal() {
    delCampModal?.close();
    removeButtonClass(delButton);
    changeIconColor(icons, icons[0]);
    campButton?.classList.add('button-active');
}


