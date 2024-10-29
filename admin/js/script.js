window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');

    const adminName = localStorage.getItem('userName'); // Recupera o nome do administrador
    const typeUser = localStorage.getItem('typeUser');

    if (adminName && typeUser === 'admin') {
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

const dashButton = document.querySelector('#dashButton');
const userButton = document.querySelector('#userButton');
const adminButton = document.querySelector('#adminButton');

let dashSection = document.querySelector('#dashboard');
let userSection = document.querySelector('#user-section');
let adminSection = document.querySelector('#admin-section');

let icons = document.querySelectorAll("#path");

function searchInput() {
    let input, filter, table, tr, td, i, txtValue;
    input = document.getElementById('searchBox');
    filter = input.value.toUpperCase();
    table = document.getElementById('userTable');
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
