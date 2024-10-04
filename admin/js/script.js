window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    loader.addEventListener('transitionend', () => {
        document.body.removeChild(loader);
    });
});

const dashButton = document.querySelector('#dashButton');
const userButton = document.querySelector('#userButton');
const adminButton = document.querySelector('#adminButton');

const dashSection = document.querySelector('#dashboard');
const userSection = document.querySelector('#user-section');
const adminSection = document.querySelector('#admin-section');

let icons = document.querySelectorAll("#path");

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

// function changeSectionState(clickedSections, ...sections) {
//     clickedSections.forEach((clickedSection) => {
//         clickedSection.classList.add('dashboard')
//     })

//     sections.forEach((section) => {
//         section.classList.remove('dashboard')
//         section.classList.add('hidden')
//     })
// }

dashButton.addEventListener('click', () => {
    RemoveButtonClass(userButton, adminButton)
    ChangeIconColor(icons, icons[0])
    // changeSectionState(dashSection, userSection, adminSection)
    dashButton.classList.add('button-active');
});

userButton.addEventListener('click', () => {
    RemoveButtonClass(dashButton, adminButton)
    ChangeIconColor(icons, icons[1])
    // changeSectionState(userSection, dashSection, adminSection)
    userButton.classList.add('button-active');
});

adminButton.addEventListener('click', () => {
    RemoveButtonClass(userButton, dashButton)
    ChangeIconColor(icons, icons[2], icons[3], icons[4])
    // changeSectionState(adminSection, dashSection, userSection)
    adminButton.classList.add('button-active');
});

const GraphBar = document.getElementById('GraphBar');
const GraphPie = document.getElementById('GraphPie');

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
        labels: ['Red', 'Blue', 'Yellow', 'Green'],
        datasets: [{
            label: '# of Votes',
            data: [12, 19, 20, 15],
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
