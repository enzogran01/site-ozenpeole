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


    // alert(`Suas respostas foram: 
    //     \nIdade: ${idade}
    //     \nLocal: ${local}
    //     \nRede social: ${social}
    //     \nMaioria das vendas: ${venda}
    //     \nFaixa de preço: ${preco}
    //     \nJá faz propaganda? ${propaganda}
    //     \nCampanha: ${campanha}
    //     \nDados geral: ${geral}`);



        //função para exibir uma campanha de demonstração
        document.getElementById('campanha').style.display = 'block';
        for(let i = 1; i <= totalPerguntas; i++){
        document.getElementById(`box-pergunta${i}`).style.display = 'none';
    }
}

let perguntaAtual = 1;
const totalPerguntas = 6;

//função pra passar pergunta
function proximaPergunta(){
    //oculta todas as perguntas
    for(let i = 1; i <= totalPerguntas; i++){
        document.getElementById(`box-pergunta${i}`).style.display = 'none';
    }

    //tirar o botão quando chegar n aúltima pergunta
        if(perguntaAtual === totalPerguntas){
            document.getElementById('btnAvancar').style.display = 'none';
        }else{
            document.getElementById('btnAvancar').style.display = 'block';
        }

    //mostra o botão de pergunta anterios só quando aparece a segunda pergunta
    if(perguntaAtual === 1){
        document.getElementById('btnAnterior').style.display = 'none'
    }else{
        document.getElementById('btnAnterior').style.display = 'block'
    }

    //mostra o botão de confirmar só quando chega a última pergunta
    if(perguntaAtual != totalPerguntas){
        document.getElementById('btnGeral').style.display = 'none';
    }else{
        document.getElementById('btnGeral').style.display = 'block';
    }
    
    //mostra a pergunta atual com base no id
    document.getElementById(`box-pergunta${perguntaAtual}`).style.display = 'block';

    //atualiza os botões
    document.getElementById('btnAnterior').disabled = perguntaAtual === 1;
    document.getElementById('btnAvancar').disabled = perguntaAtual === totalPerguntas;
}

//função para avançar a pergunta
function avancar(){
    if(perguntaAtual < totalPerguntas){
        perguntaAtual++;
        proximaPergunta();
    } 
}

//função para volta pergunta
function anterior(){
    if(perguntaAtual > 1){
        perguntaAtual--;
        proximaPergunta();
        document.getElementById('campanha').style.display = 'none';
    } 
}

//inicia a primeira pergunta
proximaPergunta();

//adiciona o click aos botões
document.getElementById('btnAvancar').addEventListener('click', avancar);
document.getElementById('btnAnterior').addEventListener('click', anterior);

 

// //teste função para ocultar as perguntas e mostrar uma de cada vez
// //numero é uma variável que vai adicionando um numero, aí junta com a palavra pergunta para ficar 'pergunta' + numero que é o numero da pergunta
// function proximaPergunta() {
//     // Esconde a pergunta atual
//     document.getElementById('box-pergunta' + numero).style.display = 'none';
    
//     let numero = 1;
//     // Mostra a próxima pergunta
//     let proxima = numero + 1;
//     let proximaPergunta = document.getElementById('box-pergunta' + proxima);
//     let proximoBtn = document.getElementById('btnPergunta' + proxima);
    
//     if (proximaPergunta) {  
//         proximaPergunta.style.display = 'block';
//         proximoBtn.style.display = 'block';

//     }else{
//         console.error("Pergunta não encontrada: pergunta" + numero);
//         return; // Sai da função se a pergunta não for encontrada
//     }
//     }


// function voltaPergunta(numero) {
//     // Esconde a pergunta atual
//     document.getElementById('box-pergunta' + numero).style.display = 'none';
        
//     // Mostra a próxima pergunta
//     let volta = numero - 1;
//     let voltaPergunta = document.getElementById('box-pergunta' + volta);
//     let voltaBtn = document.getElementById('btnPergunta' + volta);
        
//     if (voltaPergunta) {  
//         voltaPergunta.style.display = 'block';
//         voltaBtn.style.display = 'block';
    
//     }else{
//         console.error("Pergunta não encontrada: pergunta" + numero);
//         return; // Sai da função se a pergunta não for encontrada
//     }
//     }