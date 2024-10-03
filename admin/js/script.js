const dashButton = document.querySelector('aside .options .option #dashButton');
const userButton = document.querySelector('aside .options .option #userButton');
const adminButton = document.querySelector('aside .options .option #adminButton');

let icons = document.querySelectorAll("#path");

function RemoveClass(...properties) {
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
    RemoveClass(userButton, adminButton)
    ChangeIconColor(icons, icons[0])
    dashButton.classList.add('button-active');
});

userButton.addEventListener('click', () => {
    RemoveClass(dashButton, adminButton)
    ChangeIconColor(icons, icons[1])
    userButton.classList.add('button-active');
});

adminButton.addEventListener('click', () => {
    RemoveClass(userButton, dashButton)
    ChangeIconColor(icons, icons[2], icons[3], icons[4])
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
