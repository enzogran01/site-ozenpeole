const dashButton = document.querySelector('aside .options .option #dashButton');
const userButton = document.querySelector('aside .options .option #userButton');
const adminButton = document.querySelector('aside .options .option #adminButton');

let icons = document.querySelectorAll("#path");

function RemoveClass(...properties){
    properties.forEach((property) => {
        property.classList.remove("button-active")
    })
}

function ChangeIconColor(icons, ...clickedIcons){
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
