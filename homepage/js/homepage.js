window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    // Verifica se o usuário está logado
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
        // document.getElementById('sair').classList.remove("hidden");
        
        // Esconde o botão de cadastro laranja na página inicial
        const cadastroBtn = document.getElementById('cadastro-btn');
        if (cadastroBtn) {
            cadastroBtn.style.display = "none"; // Esconder o botão de cadastro
        }

        const campButton = document.getElementById('modalCampButton');
        const dashButton = document.getElementById('mocalDashButton');

        if (typeUser === 'admin') {
            campButton.classList.add('hidden');
            dashButton.classList.remove('hidden');
        }
        else {
            campButton.classList.remove('hidden');
            dashButton.classList.add('hidden');
        }
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

    window.location.href = "./homepage.html";
});

document.querySelectorAll('.why-box-blue, .why-box-orange').forEach(box => {
    box.addEventListener('mouseenter', () => {
        document.querySelectorAll('.why-box-blue, .why-box-orange').forEach(otherBox => {
            if (otherBox !== box) {
                otherBox.classList.add('why-box-gray'); // Adiciona a classe 'why-box-gray'
                
                // Armazena a classe original no atributo 'data-original-class'
                if (!otherBox.dataset.originalClass) {
                    otherBox.dataset.originalClass = otherBox.classList.contains('why-box-blue') ? 'why-box-blue' : 'why-box-orange';
                }

                // Remove as classes originais
                otherBox.classList.remove('why-box-blue', 'why-box-orange');
            }
        });
    });

    box.addEventListener('mouseleave', () => {
        document.querySelectorAll('.why-box-gray').forEach(grayBox => {
            grayBox.classList.remove('why-box-gray'); // Remove a classe 'why-box-gray'
            
            // Restaura a classe original a partir do 'data-original-class'
            const originalClass = grayBox.dataset.originalClass;
            grayBox.classList.add(originalClass);

            // Remove o atributo 'data-original-class' após restaurar
            grayBox.removeAttribute('data-original-class');
        });
    });
});

const modal = document.getElementById('logonModal');
const noModalButton = document.querySelector('#logonModal .options #btn-no');
const yesButtonModal = document.querySelector('#logonModal .options #btn-yes');
const openModalButton = document.querySelector('#openDiag');

openModalButton.addEventListener('click', () => {
    modal.showModal();
});
noModalButton.addEventListener('click', () => {
    modal.close();
});
yesButtonModal.addEventListener('click', () => {
    window.open('../formulario/inicio/formulario.html', '_blank');
    modal.close();
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
