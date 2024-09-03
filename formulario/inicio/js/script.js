let selecione = document.querySelector("#selecione");
let materiais = "construcao.html";
let roupas = "loja-roupa.html"
let restaurante = "restaurante.html";
let informatica = "informatica.html"



// Adiciona um event listener ao botão para capturar o valor selecionado na dropdown
document.getElementById('confirmar').addEventListener('click', function() {
    // Captura o valor selecionado na dropdown
    let area = document.getElementById('comercios').value;

    // Exemplo de redirecionamento baseado no valor
    if (area == 'materiais') {
        window.location.href = '../construcao/construcao.html';
    } 
    else if (area == 'roupas') {
        window.location.href = '../loja-roupa/loja-roupa.html';
    } 
    else if (area == 'restaurante') {
        window.location.href = '../restaurante/restaurante.html';
    } 
    else if (area == 'informatica') {
        window.location.href = '../informatica/informatica.html';
    }
});