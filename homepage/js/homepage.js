window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    
    // Verifica se o usuário está logado
    const userName = localStorage.getItem('userName');
    const typeUser = localStorage.getItem('typeUser');

    const modalCampButton = document.getElementById('modalCampButton');
    const modalDashButton = document.getElementById('modalDashButton');

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
        
        if (typeUser === 'admin') {
            modalCampButton.classList.add('hidden');
            modalDashButton.classList.remove('hidden');
        }
        else {
            modalCampButton.classList.remove('hidden');
            modalDashButton.classList.add('hidden');
        }

        const modal = document.getElementById('logonModal');
        const noModalButton = document.querySelector('#logonModal .options #btn-no');
        const yesButtonModal = document.querySelector('#logonModal .options #btn-yes');
        let form_modal_storage = localStorage.getItem("formModal")
        let isFormModal = form_modal_storage === "true";
        console.log(form_modal_storage)
        console.log(isFormModal)
        if (isFormModal) {
            modal.close();
        } else {
            if (typeUser === 'admin') {
                modal.close();
            } else {
                modal.showModal();
                localStorage.setItem("formModal", true)
            }

        }
        
        noModalButton.addEventListener('click', () => {
            modal.close();
        });
        
        yesButtonModal.addEventListener('click', () => {
            window.location.href = '../formulario/inicio/inicioForm.html'
            modal.close();
        });

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
                alert('viewcampanha')
                window.location.href = '../viewCampanha/viewCampanha.html'
                return;
            } else {
                alert('formulario')
                window.location.href = '../formulario/inicio/inicioForm.html'
                return;
            }
        })
    })
});



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
