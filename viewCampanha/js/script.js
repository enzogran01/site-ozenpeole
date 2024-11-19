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
        document.getElementById('login').classList.add("hidden");
        document.getElementById('cadastro').classList.add("hidden");
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
}
