window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    loader.addEventListener('transitionend', () => {
        document.body.removeChild(loader);
    });

    // Verifica se o usuário está logado
    const userName = localStorage.getItem('userName');

    if (userName) {
        // Mostra a mensagem de boas-vindas
        const welcomeMessage = document.querySelector('.welcome-message');
        welcomeMessage.textContent = `${userName}`;
        welcomeMessage.classList.remove('welcome-message-hidden');

        // Esconde os botões de login e cadastro
        document.getElementById('login').classList.add("hidden");
        document.getElementById('cadastro').classList.add("hidden"); // Esconde o botão de cadastro
        document.getElementById('sair').classList.remove("hidden");
        
        // Esconde o botão de cadastro laranja na página inicial
        const cadastroBtn = document.getElementById('cadastro-btn');
        if (cadastroBtn) {
            cadastroBtn.style.display = "none"; // Esconder o botão de cadastro
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


const modal = document.querySelector('#modal');
const noModalButton = document.querySelector('#modal .options #btn-no');
const yesButtonModal = document.querySelector('#modal .options #btn-yes');
// const openModalButton = document.querySelector('#openDiag');

// openModalButton.addEventListener('click', () => {
//     modal.showModal();
// });
noModalButton.addEventListener('click', () => {
    modal.close();
});
yesButtonModal.addEventListener('click', () => {
    window.open('../formulario/inicio/formulario.html', '_blank');
    modal.close();
});
