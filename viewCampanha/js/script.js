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

        if (typeUser === 'admin') {
            modalCampButton?.classList.add('hidden');
            modalDashButton?.classList.remove('hidden');
        } else {
            modalCampButton?.classList.remove('hidden');
            modalDashButton?.classList.add('hidden');
        }
    } else {
        alert('Usuário não encontrado')
        window.location.href = '../homepage/homepage.html'
    }

    const userId = localStorage.getItem("userId");

    // Buscar campanhas do servidor
    fetch(`http://localhost:3000/getCampanhas/${userId}`)
        .then((campanhas) => {
            if (campanhas.value === true) {
                modalCampButton.href = '../viewCampanha/viewCampanha.html'
                return;
            } else {
                modalCampButton.href = '../formulario/inicio/inicioForm.html'
                return;
            }
        })
});

document.getElementById('sair')?.addEventListener('click', () => {
    ['userName',  'typeUser', 'formModal'].forEach(item => localStorage.removeItem(item));
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

document.addEventListener("DOMContentLoaded", function () {
    const userId = localStorage.getItem("userId");
    const campanhasContainer = document.querySelector("#campaignContainer");
    // Buscar campanhas do servidor
    fetch(`http://localhost:3000/getCampanhas/${userId}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then((campanhas) => {
            if (campanhas.length === 0) {
                alert('Não há campanhas registradas')
                window.location.href = '../homepage/homepage.html'
                campanhasContainer.innerHTML = "<p>Não há campanhas registradas.</p>";
                return;
            }
            // Montar o conteúdo dinamicamente
            campanhasContainer.innerHTML = campanhas.map(campanha => `
                <div class="day">
                    <h1 class="day-title">${campanha.dt_dia}</h1>
                    <p><strong>Descrição:</strong> ${campanha.ds_imagem}</p>
                    <p><strong>Legenda:</strong> ${campanha.ds_legenda}</p>
                    <p><strong>Hora:</strong> ${campanha.hr_postagem}</p>
                </div>
            `).join("");
        })
        .catch((error) => {
            console.error('Erro ao buscar campanhas:', error);
            campanhasContainer.innerHTML = "<p>Erro ao carregar campanhas.</p>";
        });
});

const campButton = document.getElementById('campButton');
const delButton = document.getElementById('delButton');
const delCampModal = document.getElementById('delCampModal');
const closeDelCampModal = document.getElementById('closeDelCampModal');
const dontDelCampButton = document.getElementById('dontDelCampButton');
const delCampButton = document.getElementById('delCampButton');
const icons = document.querySelectorAll('#path');

campButton.addEventListener('click', () => {
    removeButtonClass(delButton);
    changeIconColor(icons, icons[0]);
    campButton.classList.add('button-active');
});

delButton.addEventListener('click', () => {
    removeButtonClass(campButton);
    changeIconColor(icons, icons[0]);
    delButton.classList.add('del-button-active');
    delCampModal.showModal();
});

closeDelCampModal.addEventListener('click', () => {
    closeDeleteModal();
});

dontDelCampButton.addEventListener('click', () => {
    closeDeleteModal();
});

delCampButton.addEventListener('click', () => {

    
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


