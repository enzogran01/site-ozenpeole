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


// //configuração radios
// function obterResposta(){
//     //entrar no form
//     let form1 = document.getElementById("resposta1");
//     //querySelector para selecionar o radio
//     let resposta1Selecionada = form1.querySelector('input[name = "idade"]:checked');

//     if(resposta1Selecionada){
//         //pegando o valor do radio
//         let resposta1 = resposta1Selecionada.value;
    
//     //função está acabando com o dado na variável resposta1

//     console.log('Resposta selecionada: ' + resposta1);
//     alert(resposta1Selecionada.value);
//     }
    
//     else{
//         console.log('Nenhuma resposta selecionada')
//     }

// }
// // Adicione um listener para o evento de clique no botão
// document.getElementById('confirmar2').addEventListener('click', obterResposta);