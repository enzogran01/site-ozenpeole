function btnVoltar(voltar) {
    window.location.href="../inicio/formulario.html";
}

document.getElementById('voltar').addEventListener('click', btnVoltar);





//configuração radios
function clickGeral(btnGeral){
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

    let campanha = 
    idade +
    local +
    social +
    venda +
    preco +
    propaganda;

        // Exibe os valores (ou faça o que desejar com eles)
    console.log("Idade:", idade);
    console.log("Local:", local);
    console.log("Social:", social);
    console.log("Venda:", venda);
    console.log("Preço:", preco);
    console.log("Propaganda:", propaganda);


    alert(`Suas respostas foram: 
        \nIdade: ${idade}
        \nLocal: ${local}
        \nRede social: ${social}
        \nMaioria das vendas: ${venda}
        \nFaixa de preço: ${preco}
        \nJá faz propaganda? ${propaganda}
        \nCampanha: ${campanha}
        \nDados geral: ${geral}`);
}

// Adicione um listener para o evento de clique no botão
document.getElementById('btngeral').addEventListener('click', btnkGeral);
