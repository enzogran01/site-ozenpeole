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

const OPENAI_API_KEY = "LA-3da40301f1ec402c8446de9f8daee7348a4770a7990a485490876cd2349fe51d";
//click para recolher as informações das radios e armazenar nas variáveis

// function clickGeral(btnGeral)
document.getElementById('respostas').addEventListener('click', async () => {

        //entrar no form
        let formGeral = document.getElementById("respostas");

        // função para pegar as respostas
        function obterResposta(name){
            let pegandoValor = formGeral.querySelector(`input[name = "${name}"]:checked`);
            return pegandoValor ? pegandoValor.value : '';
        }

        //joga cada resposta para a sua devida variável
        let idade = obterResposta('idade');
        let local = obterResposta('local');
        let social = obterResposta('social');
        let venda = obterResposta('venda');
        let preco = obterResposta('preco');
        let propaganda = obterResposta('propaganda');

        try {
            const response = await fetch('http://localhost:3000/api/marketing-campaign', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ idade, local, social, venda, preco, propaganda })
            });
    
            const data = await response.json();
            document.getElementById('campaignOutput').innerText = data.response || "Erro ao gerar a campanha";
        } catch (error) {
            console.error("Erro na requisição fetch:", error);
        }
        

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

    return;
}


    //função para avançar a pergunta
function avanco(){
    if(perguntaAtual < totalPerguntas){
        perguntaAtual++;
        proximaPergunta();
    }
}

    function validarRadio() {
        const radios = document.getElementsByName('respostas');
        const mensagemErro = document.getElementById('mensagemErro');
        let radioSelecionado = false;

        // Verificar se algum radio foi selecionado
        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                radioSelecionado = true;
                break;
            }
        }

        if (!radioSelecionado) {
            mensagemErro.innerHTML = 'Por favor, selecione uma opção.';
            return false; // Impede o envio do formulário
        }

        return true; // Permite o envio do formulário
    }





//função para volta pergunta
function anterior(){
    if(perguntaAtual > 1){
        perguntaAtual--;
        proximaPergunta();
        document.getElementById('campanha').style.display = 'none';
    } 
    return;
}

//inicia a primeira pergunta
proximaPergunta();

//adiciona o click aos botões
document.getElementById('btnAvancar').addEventListener('click', avanco);
document.getElementById('btnAnterior').addEventListener('click', anterior);

 



//função para buscar as campanhas no banco de dados
function getCampanhas(){

    if (isValid) {
        const email = emailInput.value.trim();
        const password = passwordInput.value.trim();

        fetch('http://localhost:3000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => response.json())
        .then(data => {
            if (data.message === 'Login bem-sucedido!') {
                // armazena o nome do usuário no localStorage
                localStorage.setItem('userName', data.userName); // `userName` vem do servidor
                
                alert('Login realizado com sucesso!');
                window.location.href = '../homepage/homepage.html'; // redireciona para a homepage
            } else {
                alert(data.message); // exibe mensagem de erro
            }
        })
        .catch(error => {
            console.error('Erro ao fazer login:', error);
        });
    }
}


