function btnVoltar(voltar) {
    window.location.href="../inicio/formulario.html";
}

document.getElementById('voltar').addEventListener('click', btnVoltar);


//configuração radios
function clickGeral(){
    //entrar no form
    let formGeral = document.getElementById("respostas");
    //querySelector para selecionar o radio

    // função para pegar as repostas
    function obterResposta(name){
        const pegandoValor = formGeral.querySelector(`input[name = "${name}"]:checked`);
        console.log(`Selecionado para "${name}":`, pegandoValor ? pegandoValor.value : 'Nenhum selecionado');
        return pegandoValor ? pegandoValor.value : '';

    }

    //joga cada resposta para a sua devida variável
        let idade = obterResposta('idade')
        let local = obterResposta('local')
        let social = obterResposta('social')
        let venda = obterResposta('venda')
        let preco = obterResposta('preco')
        let propaganda = obterResposta('propaganda')

    //joga todas as respostas para a variável "geral"
    let geral = {
        idade : idade,
        local : local,
        social : social,
        venda : venda,
        preco : preco,
        propaganda : propaganda

    };

    alert(`Suas respostas foram: \n Idade: ${idade}; \n Local: ${local}; \n Rede social: ${social}; \n Maioria das vendas: ${venda}; \n Faixa de preço: ${preco}; \n Já faz propaganda? ${propaganda};`);
}
// Adicione um listener para o evento de clique no botão
document.getElementById('btnGeral').addEventListener('click', clickGeral);



// if(resposta1Selecionada){
    //     //pegando o valor do radio
    //     let resposta1 = resposta1Selecionada.value;
    
    // //função está acabando com o dado na variável resposta1

    // console.log('Resposta selecionada: ' + resposta1);
    // alert(resposta1Selecionada.value);
    // }
    
    // else{
    //     console.log('Nenhuma resposta selecionada')
    // }
