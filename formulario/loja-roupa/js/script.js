function btnVoltar(voltar) {
    window.location.href="../inicio/formulario.html";
}

document.getElementById('voltar').addEventListener('click', btnVoltar);


//configuração radios
function obterResposta(){
    //entrar no form
    let form1 = document.getElementById("resposta1");
    //querySelector para selecionar o radio
    let resposta1Selecionada = form1.querySelector('input[name = "idade"]:checked');

    if(resposta1Selecionada){
        //pegando o valor do radio
        let resposta1 = resposta1Selecionada.value;
    
    //função está acabando com o dado na variável resposta1

    console.log('Resposta selecionada: ' + resposta1);
    alert(resposta1Selecionada.value);
    }
    
    else{
        console.log('Nenhuma resposta selecionada')
    }

}
// Adicione um listener para o evento de clique no botão
document.getElementById('confirmar1').addEventListener('click', obterResposta);