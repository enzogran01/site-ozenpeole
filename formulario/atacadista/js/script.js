window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');

})

document.getElementById("sair").addEventListener("click", () => {
    localStorage.removeItem("userName")
    
    document.getElementById('login').classList.remove("hidden");
    document.getElementById('cadastro').classList.remove("hidden");
    
    // Mostra novamente o botão de cadastro laranja na página inicial após logout
    const cadastroBtn = document.getElementById('cadastro-btn');
    if (cadastroBtn) {
        cadastroBtn.style.display = "block"; // Exibir o botão de cadastro de novo
    }

    window.location.href = "../../homepage/homepage.html";
});

const userModal = document.getElementById('userModal');
const user = document.getElementById('user');

function openModalBelowElement () {
    const rect = user.getBoundingClientRect();

    userModal.style.top = `${rect.bottom + window.scrollY}px`;
    userModal.style.left = `${rect.left + window.scrollX}px`;

    userModal.showModal();
}

user.addEventListener('click', openModalBelowElement);

userModal.addEventListener('click', (event) => {
    const dialogRect = userModal.getBoundingClientRect();

    const isOutsideClick =
        event.clientX < dialogRect.left ||
        event.clientX > dialogRect.right ||
        event.clientY < dialogRect.top ||
        event.clientY > dialogRect.bottom;

    if (isOutsideClick) {
        userModal.close();
    }
});

function btnVoltar() {

    window.location.href="../inicio/formulario.html";
    
}


// function clickGeral(btnGeral)
document.getElementById('btnGeral').addEventListener('click', async () => {

    // entrar no form
    let formGeral = document.getElementById("respostas");

    // função para pegar as respostas
    function obterResposta(name){
        let pegandoValor = formGeral.querySelector(`input[name = "${name}"]:checked`);
        return pegandoValor ? pegandoValor.value : '';
    }

    // joga cada resposta para a sua devida variável
    let idade = obterResposta('idade');
    let local = obterResposta('local');
    let social = obterResposta('social');
    let venda = obterResposta('venda');
    let preco = obterResposta('preco');
    let propaganda = obterResposta('propaganda');

    try {
        const campaignOutput = document.getElementById('respostas');
        const response = await fetch ("https://api.groq.com/openai/v1/chat/completions", {
            method: 'POST',
            headers: {
                'Authorization': `Bearer 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`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                "model": "llama3-groq-70b-8192-tool-use-preview",
                "messages": [{
                  "role": "user",
                  "content": `responda em português brasileiro: Crie uma campanha de marketing para uma loja com o conteúdo para uma semana de postagens na rede social ${social}, especificando os dias de postagens e o horário, buscando o melhor engajamento, e considerando essos outros seguintes dados: Idade do público-alvo: ${idade}, Localização: ${local}, Tipo de venda: ${venda}, Ticket médio: ${preco}, Já faz marketing?: ${propaganda}. lembrando que é necessário a descrição da imagem da postagem, e a legenda necessária.`
                }]
              })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.choices[0].message.content);
            const campaignOutput = document.getElementById('respostas');
            campaignOutput.innerText = data.choices[0].message.content;
        } else {
            console.error("Erro na requisição fetch:", response.statusText);
            campaignOutput.innerText = "Erro ao gerar a campanha";
        }
    } catch (error) {
        console.error("Erro na requisição fetch:", error);
        campaignOutput.innerText = "Erro ao gerar a campanha";
    }
});


    let perguntaAtual = 1;

const totalPerguntas = 6;

    //fazendo aparecer a primeira pergunta
    for(let i = 1; i <= totalPerguntas; i++){
        document.getElementById(`box-pergunta${i}`).style.display = 'none';
     }
        
    //condição para o botão não funcionar quando já tiver na ultima página
    if(perguntaAtual === totalPerguntas){
        document.getElementById('btnGeral').style.display = 'none';
    }


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