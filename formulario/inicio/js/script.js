window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    loader.classList.add('loader-hidden');

    loader.addEventListener('transitioned', () => {
        document.body.removeChild('loader');
    })
})

let selecione = document.querySelector("#selecione");
let atacadista = "atacadista.html";
let automobilistico = "automobilistico.html"
let varejista = "varejista.html";

// Adiciona um event listener ao botão para capturar o valor selecionado na dropdown
document.getElementById('confirmar').addEventListener('click', function() {
    // Captura o valor selecionado na dropdown
    let area = document.getElementById('comercios').value;

    // Exemplo de redirecionamento baseado no valor
    if (area == 'atacadista') {
        window.location.href = '../atacadista/atacadista.html';
    } 
    else if (area == 'automobilistico') {
        window.location.href = '../automobilistico/automobilistico.html';
    } 
    else if (area == 'varejista') {
        window.location.href = '../varejista/varejista.html';
    } 
});
