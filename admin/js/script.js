window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');

    const adminName = localStorage.getItem('userName'); // Recupera o nome do administrador
    const typeUser = localStorage.getItem('typeUser');
    if (adminName && typeUser === 'admin') {

        fetch('http://localhost:3001/show-users', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição de contagem de usuários");
            }
            return response.json();
        })
        .then(data => {
            data.usuarios.forEach((user) => {
                
                let row = `
                    <tr>
                        <td>${user.id_usuario}</td>
                        <td>${user.nm_usuario}</td>
                        <td>${user.nm_email}</td>
                        <td class="user-actions">
                            <svg id="editUserSvg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2" stroke="#313638" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z" stroke="#313638" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94" stroke="#313638" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5" stroke="#313638" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </td>
                    </tr>
                `
                document.getElementById("userTable").innerHTML += row;
            })

    
        })
        fetch('http://localhost:3001/show-admins', {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição de contagem de admins");
            }
            return response.json();
        })
        .then(data => {
            data.administradores.forEach((user) => {
                
                let row = `
                    <tr>
                        <td>${user.id_administrador}</td>
                        <td>${user.nm_administrador}</td>
                        <td>${user.nm_email_adm}</td>
                        <td class="user-actions">
                            <svg id="editUserSvg" xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M11 2H9C4 2 2 4 2 9v6c0 5 2 7 7 7h6c5 0 7-2 7-7v-2" stroke="#313638" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M16.04 3.02 8.16 10.9c-.3.3-.6.89-.66 1.32l-.43 3.01c-.16 1.09.61 1.85 1.7 1.7l3.01-.43c.42-.06 1.01-.36 1.32-.66l7.88-7.88c1.36-1.36 2-2.94 0-4.94-2-2-3.58-1.36-4.94 0Z" stroke="#313638" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14.91 4.15a7.144 7.144 0 0 0 4.94 4.94" stroke="#313638" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M21 5.98c-3.33-.33-6.68-.5-10.02-.5-1.98 0-3.96.1-5.94.3L3 5.98M8.5 4.97l.22-1.31C8.88 2.71 9 2 10.69 2h2.62c1.69 0 1.82.75 1.97 1.67l.22 1.3M18.85 9.14l-.65 10.07C18.09 20.78 18 22 15.21 22H8.79C6 22 5.91 20.78 5.8 19.21L5.15 9.14M10.33 16.5h3.33M9.5 12.5h5" stroke="#313638" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                        </td>
                    </tr>
                `
                document.getElementById("adminTable").innerHTML += row;
            })

    
        })

        .catch(error => {
            console.error("Erro ao buscar admins", error);
        });

        document.getElementById('admin-name').textContent = adminName;
    } else {
        alert('Nome do administrador não encontrado. Faça login novamente.');
        window.location.href = '../homepage/homepage.html'; // Redireciona para a página de login
    }

    const modalCampButton = document.getElementById('modalCampButton');
    const modalDashButton = document.getElementById('modalDashButton');

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
    ['userName',  'typeUser', 'formModal', 'userId', 'userEmail', 'userTelephone', 'ativo'].forEach(item => localStorage.removeItem(item));

    window.location.href = "../homepage/homepage.html";
});

const dashButton = document.querySelector('#dashButton');
const userButton = document.querySelector('#userButton');
const adminButton = document.querySelector('#adminButton');

let dashSection = document.querySelector('#dashboard');
let userSection = document.querySelector('#user-section');
let adminSection = document.querySelector('#admin-section');

let icons = document.querySelectorAll("#path");


function ChangeSectionState(clickedSection, ...sections) {
    sections.forEach((section) => {
        console.log(section)
        section.classList.add('hidden')
        section.classList.remove('general-section')
    })
    clickedSection.classList.remove('hidden')
    clickedSection.classList.add('general-section')
}

function RemoveButtonClass(...properties) {
    properties.forEach((property) => {
        property.classList.remove("button-active")
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

dashButton.addEventListener('click', () => {
    RemoveButtonClass(userButton, adminButton)
    ChangeIconColor(icons, icons[0])
    ChangeSectionState(dashSection, userSection, adminSection)
    dashButton.classList.add('button-active');
});

userButton.addEventListener('click', () => {
    RemoveButtonClass(dashButton, adminButton)
    ChangeIconColor(icons, icons[1])
    ChangeSectionState(userSection, dashSection, adminSection)
    userButton.classList.add('button-active');
});

adminButton.addEventListener('click', () => {
    RemoveButtonClass(userButton, dashButton)
    ChangeIconColor(icons, icons[2], icons[3], icons[4])
    ChangeSectionState(adminSection, dashSection, userSection)
    adminButton.classList.add('button-active');
});

function searchInput() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchBox'); // Campo de busca
    filter = input.value.toUpperCase();          // Valor digitado, em maiúsculas
    table = document.getElementById('userTable'); // Tabela de usuários
    tr = table.getElementsByTagName('tr');       // Todas as linhas da tabela

    // Loop pelas linhas da tabela (exceto cabeçalhos)
    for (i = 1; i < tr.length; i++) { // Começa de 1 para pular o cabeçalho
        let showRow = false;

        // Verifica ID, Nome e Email (colunas 0, 1 e 2)
        for (let j = 0; j < 3; j++) { // Ajuste conforme as colunas relevantes
            td = tr[i].getElementsByTagName('td')[j];
            if (td) {
                txtValue = td.textContent || td.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    showRow = true;
                    break; // Para de verificar se uma coluna já correspondeu
                }
            }
        }

        // Exibe ou oculta a linha com base no resultado
        tr[i].style.display = showRow ? "" : "none";
    }
}

// function searchInput() {
//     let input, filter, table, tr, td, i, txtValue;
//     input = document.getElementById('searchBox');
//     filter = input.value.toUpperCase();
//     table = document.getElementById('userTable');
//     tr = table.getElementsByTagName('tr');
//     for (i = 0; i < tr.length; i++) {
//         td = tr[i].getElementsByTagName('td')[0];
//         if (td) {
//             txtValue = td.textContent || td.innerText;
//             if (txtValue.toUpperCase().indexOf(filter) > -1) {
//                 tr[i].style.display = "";
//             } else {
//                 tr[i].style.display = "none";
//             }
//         }
//     }
// }

function searchAdminInput () {
    let input, filter, tavle, tr, td, i, txtValue;
    input = document.getElementById('searchAdmBox');
    filter = input.value.toUpperCase();
    table = document.getElementById('adminTable');
    tr = table.getElementsByTagName('tr');
    for (i = 0; i < tr.length; i++) {
        td = tr[i].getElementsByTagName('td')[0];
        if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
    }
}

const addUserButton = document.getElementById('addUserButton');
const addUserModal = document.getElementById('addUserModal');
const closeUserButton = document.getElementById('closeUserModal');

addUserButton.addEventListener('click', () => {
    addUserModal.showModal();
})

closeUserButton.addEventListener('click', () => {
    addUserModal.close();
})

const addAdminModal = document.getElementById('addAdminModal');
const addAdminButton = document.getElementById('addAdminButton');
const closeAdminButton = document.getElementById('closeAdminModal');

addAdminButton.addEventListener('click', () => {
    addAdminModal.showModal();
})

closeAdminButton.addEventListener('click', () => {
    addAdminModal.close();
})



// const editUserModal = document.getElementById('editUserModal');
const editAllUsers = document.querySelectorAll('#editUserSvg');


document.addEventListener("DOMContentLoaded", function () {
    const userCountSpan = document.getElementById("userCount");
    const campaignCountSpan = document.getElementById("campaignCount");

    // Buscar número total de usuários
    fetch('http://localhost:3001/countUsers')
        .then(response => {
            if (!response.ok) {
                throw new Error("Erro na requisição de contagem de usuários");
            }
            return response.json();
        })
        .then(data => {
            userCountSpan.textContent = data.totalUsuarios;
        })
        .catch(error => {
            console.error("Erro ao buscar número de usuários:", error);
            userCountSpan.textContent = "Erro ao carregar.";
        });

        const totalCampanhasSpan = document.querySelector("#totalCampanhas");

        // Buscar o total de campanhas
        fetch("http://localhost:3000/countAllCampanhas")
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro na requisição: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                if (data.totalCampanhas !== undefined) {
                    totalCampanhasSpan.textContent = data.totalCampanhas / 7;
                } else {
                    totalCampanhasSpan.textContent = "Erro ao carregar";
                }
            })
            .catch((error) => {
                console.error("Erro ao buscar total de campanhas:", error);
                totalCampanhasSpan.textContent = "Erro ao carregar";
            });
});


// function openModalId(...id_modal){
//     id_modal.forEach((edit) => {
//         editUserModal.showModal();
//     })
// }

// openModalId(document.querySelectorAll('#editUserSvg'));

const GraphBar = document.getElementById('GraphBar');
const GraphPie = document.getElementById('GraphPie');

const userModal = document.getElementById('userModal');
const adminName = document.getElementById('admin-name');

function openModalBelowElement () {
    const rect = adminName.getBoundingClientRect();

    userModal.style.top = `${rect.bottom + window.scrollY}px`;
    userModal.style.left = `${rect.left + window.scrollX}px`;

    userModal.showModal();
}

adminName.addEventListener('click', openModalBelowElement);

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

const addUserForm = document.getElementById('addUserForm')

addUserForm.addEventListener('submit', (e) => {
    e.preventDefault();
})

new Chart(GraphBar, {
    type: 'bar',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [{
            label: 'Novos Acessos',
            data: [12, 19, 3, 5, 2, 3, 9, 10, 19, 14, 12, 19],
            borderWidth: 1
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

new Chart(GraphPie, {
    type: 'pie',
    data: {
        labels: ['Atacadista', 'Automobilístico', 'Varejista'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 20],
            borderWidth: 3
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});
