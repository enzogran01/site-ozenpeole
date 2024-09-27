window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    loader.classList.add('loader-hidden');

    loader.addEventListener('transitioned', () => {
        document.body.removeChild('loader');
    })
})

function btnVoltar(voltar) {
    window.location.href="../inicio/formulario.html";
}



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




//teste função para ocultar as perguntas e mostrar uma de cada vez
//numero é uma variável que vai adicionando um numero, aí junta com a palavra pergunta para ficar 'pergunta' + numero que é o numero da pergunta
function proximaPergunta(numero) {
    // Esconde a pergunta atual
    document.getElementById('box-pergunta' + numero).style.display = 'none';
    
    // Mostra a próxima pergunta
    let proxima = numero + 1;
    let proximaPergunta = document.getElementById('box-pergunta' + proxima);
    
    if (proximaPergunta) {  
        proximaPergunta.style.display = 'block';
    }else{
        console.error("Pergunta não encontrada: pergunta" + numero);
        return; // Sai da função se a pergunta não for encontrada
    }
    }

    
//função para os botoes irem mudando também
function proximoBtn(numero){
    //pega o nome do botão, que é 'pergunta' e o numero da pergunta
    document.getElementById('pergunta' + numero).style.diplay = 'none';

    //mostra o próximo botão
    let proximo = numero + 1;
    let proximoBtn = document.getElementById('pergunta' + proximo);

    if (proximoBtn){
        proximoBtn.style.display = 'block';
    }
}

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
