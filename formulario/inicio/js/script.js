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
        document.getElementById('cadastro').classList.add("hidden"); // Esconde o botão de cadastro

        const campButton = document.getElementById('modalCampButton');
        const dashButton = document.getElementById('mocalDashButton');

        if (typeUser === 'admin') {
            modalCampButton.classList.add('hidden');
            modalDashButton.classList.remove('hidden');
        }
        else {
            modalCampButton.classList.remove('hidden');
            modalDashButton.classList.add('hidden');
        }

    } else {
        alert('Login não encontrado.');
        window.location.href = "../../homepage/homepage.html"
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
        if (campanhas.length > 0) {
            window.location.href = '../../viewCampanha/viewCampanha.html'
            modalCampButton.href = '../viewCampanha/viewCampanha.html'
            return;
        }
    })
})

document.getElementById("sair").addEventListener("click", () => {
    ['userName',  'typeUser', 'formModal', 'userId'].forEach(item => localStorage.removeItem(item));
    window.location.href = '../homepage/homepage.html';
    
    document.getElementById('login').classList.remove("hidden");
    document.getElementById('cadastro').classList.remove("hidden");
    
    // Mostra novamente o botão de cadastro laranja na página inicial após logout
    const cadastroBtn = document.getElementById('cadastro-btn');
    if (cadastroBtn) {
        cadastroBtn.style.display = "block"; // Exibir o botão de cadastro de novo
    }

    window.location.href = "../../homepage/homepage.html";
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


// Adiciona um event listener ao botão para capturar o valor selecionado na dropdown
document.getElementById('confirmar').addEventListener('click', function () {
    //redireciona para o formulário
    window.location.href = "../form/form.html";
})
