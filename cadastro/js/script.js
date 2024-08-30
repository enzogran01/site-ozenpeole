const form = document.getElementById('formulario');
const revealer = document.getElementById('revealer');

revealer.addEventListener('click', function reveal () {
    const passwordInput = document.getElementById('password');

    if (passwordInput.type === "password") {
        passwordInput.type =  "text";
    } else {
        passwordInput.type = "password";
    }
});
