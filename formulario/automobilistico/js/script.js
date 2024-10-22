require('dotenv').config();
const apiKey = process.env.OPENAI_API_KEY; //api do chat gpt


window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    loader.classList.add('loader-hidden');

    loader.addEventListener('transitioned', () => {
        document.body.removeChild('loader');
    })
})

function btnVoltar() {

    window.location.href="../inicio/formulario.html";
    
}

//click para recolher as informações das radios e armazenar nas variáveis
function clickGeral(btnGeral){

    //entrar no form
    let formGeral = document.getElementById("respostas");

    // função para pegar as respostas
    function obterResposta(name){
        const pegandoValor = formGeral.querySelector(`input[name = "${name}"]:checked`);
        console.log(`Selecionado para "${name}":`, pegandoValor ? pegandoValor.value : 'Nenhum selecionado');
        return pegandoValor ? pegandoValor.value : '';
    }

    //joga cada resposta para a sua devida variável
    let idade = obterResposta('idade');
    let local = obterResposta('local');
    let social = obterResposta('social');
    let venda = obterResposta('venda');
    let preco = obterResposta('preco');
    let propaganda = obterResposta('propaganda');

    //joga todas as respostas para a variável "geral"
    let geral = {
        idade: idade,
        local: local,
        social: social,
        venda: venda,
        preco: preco,
        propaganda: propaganda
    };

    // Enviar os dados para o backend via fetch
    fetch('/generate-campaign', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(geral),
    })
    .then(response => response.json())
    .then(data => {
        // Exibir a campanha gerada no console e na interface
        console.log("Campanha Gerada:", data.campaign);
        document.getElementById('resultado').textContent = data.campaign;
    })
    .catch(error => {
        console.error('Erro ao gerar a campanha:', error);
    });

    //fazendo aparecer a primeira pergunta
    for(let i = 1; i <= totalPerguntas; i++){
        document.getElementById(`box-pergunta${i}`).style.display = 'none';
    }

    //condição para o botão não funcionar quando já tiver na ultima página
    if(perguntaAtual === totalPerguntas){
        document.getElementById('btnGeral').style.display = 'none';
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

//mostra o botão de pergunta anterios só quando aparece a segunda pergunta
if(perguntaAtual === 1){
    document.getElementById('btnAnterior').style.display = 'none'
}else{
    document.getElementById('btnAnterior').style.display = 'block'
}

//função para avançar a pergunta
function avancar(){
    if(perguntaAtual < totalPerguntas){
        perguntaAtual++;
        proximaPergunta();
        document.getElementById('btnAnterior').style.display = 'block';
    } 
}

//função para volta pergunta
function anterior(){
    if(perguntaAtual > 1){
        perguntaAtual--;
        proximaPergunta();
    } 
}

//inicia a primeira pergunta
proximaPergunta();

//adiciona o click aos botões
document.getElementById('btnAvancar').addEventListener('click', avancar);
document.getElementById('btnAnterior').addEventListener('click', anterior);

 