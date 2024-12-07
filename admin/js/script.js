window.addEventListener('load', () => {

    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');

    const url = new URL(window.location.href)
    if (url.searchParams.has("usuarios")){
        userButton.click()
        RemoveButtonClass(dashButton, adminButton)
        ChangeIconColor(icons, icons[1])
        ChangeSectionState(userSection, dashSection, adminSection)
    }

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

                function maskEmail (email) {
                    const [localPart, domain] = email.split('@');
                    const maskedLocal = localPart.slice(0, 1) + '*'.repeat(localPart.length - 1);
                    return `${maskedLocal}@${domain}`;
                }

                const maskedEmail = maskEmail(user.nm_email);
                
                let row = `
                    <tr ${user.ativo ? '' : "style='opacity: 0.5;'"}>
                        <td>${user.id_usuario}</td>
                        <td>${user.nm_usuario}</td>
                        <td>${maskedEmail}</td>
                        <td class="user-actions">
                        <svg onclick = 'deactiveUser(${user.id_usuario})' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM3.41 22c0-3.87 3.85-7 8.59-7 .96 0 1.89.13 2.76.37" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 18c0 .32-.04.63-.12.93-.09.4-.25.79-.46 1.13A3.97 3.97 0 0 1 18 22a3.92 3.92 0 0 1-2.66-1.03c-.3-.26-.56-.57-.76-.91A3.92 3.92 0 0 1 14 18a3.995 3.995 0 0 1 4-4c1.18 0 2.25.51 2.97 1.33.64.71 1.03 1.65 1.03 2.67ZM19.49 17.98h-2.98" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
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

                function maskEmail (email) {
                    const [localPart, domain] = email.split('@');
                    const maskedLocal = localPart.slice(0, 1) + '*'.repeat(localPart.length - 1);
                    return `${maskedLocal}@${domain}`;
                }

                const maskedEmail = maskEmail(user.nm_email_adm);
                
                let row = `
                    <tr ${user.ativo_adm ? '' : "style='opacity: 0.5;'"}>
                        <td>${user.id_administrador}</td>
                        <td>${user.nm_administrador}</td>
                        <td>${maskedEmail}</td>
                        <td class="user-actions">
                        <svg onclick = 'deactiveAdmin(${user.id_administrador})' xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none"><path d="M12 12a5 5 0 1 0 0-10 5 5 0 0 0 0 10ZM3.41 22c0-3.87 3.85-7 8.59-7 .96 0 1.89.13 2.76.37" stroke="#000000" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M22 18c0 .32-.04.63-.12.93-.09.4-.25.79-.46 1.13A3.97 3.97 0 0 1 18 22a3.92 3.92 0 0 1-2.66-1.03c-.3-.26-.56-.57-.76-.91A3.92 3.92 0 0 1 14 18a3.995 3.995 0 0 1 4-4c1.18 0 2.25.51 2.97 1.33.64.71 1.03 1.65 1.03 2.67ZM19.49 17.98h-2.98" stroke="#000000" stroke-width="1.5" stroke-miterlimit="10" stroke-linecap="round" stroke-linejoin="round"></path></svg>
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

function deactiveUser (idUsuario) {
    fetch(`http://localhost:3001/desativarUsuario/${idUsuario}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(data => {
            console.log(data)
            if (data.status) {
                alert('Usuário desativado')
                location.reload();
                return;
            } else {
                alert('Erro ao desativar usuário')
                return;
            }
        })
        .catch(error => {
            console.error("Erro ao desativar usuário:", error);
        });
}

function deactiveAdmin (idAdmin) {
    fetch(`http://localhost:3001/desativarAdmin/${idAdmin}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            }
        })
        .then(data => {
            console.log(data)
            if (data.status) {
                alert('Administrador desativado')
                location.reload();
                return;
            } else {
                alert('Erro ao desativar administrador')
                return;
            }
        })
        .catch(error => {
            console.error("Erro ao desativar administrador:", error);
        });
}

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
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
});

userButton.addEventListener('click', () => {
    RemoveButtonClass(dashButton, adminButton)
    ChangeIconColor(icons, icons[1])
    ChangeSectionState(userSection, dashSection, adminSection)
    userButton.classList.add('button-active');
    const url = new URL(window.location.href)
    url.searchParams.set("usuarios", "ativo");
    window.history.pushState({}, "", url);
});

adminButton.addEventListener('click', () => {
    RemoveButtonClass(userButton, dashButton)
    ChangeIconColor(icons, icons[2], icons[3], icons[4])
    ChangeSectionState(adminSection, dashSection, userSection)
    adminButton.classList.add('button-active');
    const url = new URL(window.location.href);
    url.search = '';
    window.history.replaceState({}, '', url.toString());
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
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchAdmBox');
    filter = input.value.toUpperCase();
    table = document.getElementById('adminTable');
    tr = table.getElementsByTagName('tr');

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

document.getElementById('addUserForm').addEventListener('submit', function (event) {
    event.preventDefault(); // Impede o comportamento padrão de recarregar a página

    // Obtém os valores dos campos do formulário
    const name = document.getElementById('userName').value.trim();
    const email = document.getElementById('userEmail').value.trim();
    const password = document.getElementById('userPassword').value.trim();
    const telephone = document.getElementById('userTelephone').value.trim();

    // Dados do usuário a serem enviados ao servidor
    const userData = {
        name,
        email,
        password,
        telephone
    };

    // Envia os dados para o endpoint usando fetch
    fetch('http://localhost:3000/register', { // Substitua pelo URL correto do endpoint
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Usuário registrado com sucesso!');
            // Limpa o formulário
            document.getElementById('addUserForm').reset();
            addUserModal.close();
            location.reload();
            
          

        } else {
            alert(`Erro ao registrar usuário: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        alert('Ocorreu um erro ao registrar o usuário.');
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

const addAdminForm = document.getElementById('addAdminForm')

const adminNameInput = document.getElementById('adminName');
const adminEmailInput = document.getElementById('adminEmail');
const adminPasswordInput = document.getElementById('adminPassword');

addAdminForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const adminData = {
        nameadm: adminNameInput.value,
        emailadm: adminEmailInput.value,
        passwordadm: adminPasswordInput.value
    };

    fetch('http://localhost:3001/registerAdmin', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(adminData)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Admin registrado com sucesso!');
            // Limpa o formulário
            document.getElementById('addAdminForm').reset();
            addAdminModal.close();
            location.reload();
        } else {
            alert(`Erro ao registrar admin: ${data.message}`);
        }
    })
    .catch(error => {
        console.error('Erro ao enviar dados:', error);
        alert('Ocorreu um erro ao registrar o admin.');
    });
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
