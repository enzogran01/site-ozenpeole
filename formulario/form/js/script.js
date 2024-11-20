window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');

    const userName = localStorage.getItem('userName');
    const typeUser = localStorage.getItem('typeUser');

    if (userName) {
        // Mostra a mensagem de boas-vindas
        const user = document.querySelector('#user');
        user.textContent = `${userName}`;
        user.classList.remove('hidden');

        // Esconde os botões de login e cadastro
        document.getElementById('login').classList.add("hidden");
        document.getElementById('cadastro').classList.add("hidden"); // Esconde o botão de cadastro

        const campButton = document.getElementById('modalCampButton');
        const dashButton = document.getElementById('mocalDashButton');

        if (typeUser === 'admin') {
            modalCampButton.classList.add('hidden');
            modalDashButton.classList.remove('hidden');
        }
        else {
            modalCampButton.classList.remove('hidden');
            modalDashButton.classList.add('hidden');
        }

        const campaignData = localStorage.getItem('campaignData');
        
        if (campaignData) {
            modalCampButton.href = '../viewCampanha/viewCampanha.html'
        }
    // } else {
    //     alert('Login não encontrado.');
    //     window.location.href = "../../homepage/homepage.html"
    }
})

document.getElementById("sair").addEventListener("click", () => {
    localStorage.removeItem("userName")
    localStorage.removeItem("campaignData")
    localStorage.removeItem("typeUser")
    localStorage.removeItem("formModal")
    
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
        let radioValor = formGeral.querySelector(`input[name = "${name}"]:checked`);
        return radioValor ? radioValor.value : '';

        let textValor = formGeral.querySelector(`input[name="${name}"]`);
        return textValor ? textValor.value : '';
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
                  "content": `responda em português brasileiro: Crie uma campanha de marketing para uma loja com o conteúdo para uma semana de postagem na rede social ${social}, especificando os dias de postagens e o horário, buscando o melhor engajamento, e considerando essos outros seguintes dados: Idade do público-alvo: ${idade}, Localização da maioria dos seus clientes: ${local}, Tipo de venda mais utilizado pela loja: ${venda}, Ticket médio: ${preco}, A loja ${propaganda} algum tipo de marketing . Lembrando que é necessário a descrição da imagem da postagem, a legenda necessária e o horário da postagem. Me reponda OBRIGATÓRIAMENTE neste formato: *Dia 1* - descrição da imagem 1,  - legenda 1,  - horário da postagem 1, ; *Dia 2* - descrição da imagem 2,  - legenda 2,  - horário da postagem 2; *Dia 3* - descrição da imagem 3,  - legenda 3, - horário da postagem 3; *Dia 4* - descrição da imagem 4, - legenda 4, - horário da postagem 4; *Dia 5* - descrição da imagem 5, - legenda 5, - horário da postagem 5; *Dia 6* - descrição da imagem 6, - legenda 6, - horário da postagem 6; *Dia 7* - descrição da imagem 7,  - legenda 7, - horário da postagem 7;`
                }]
              })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.choices[0].message.content);
            
            const responseContent = data.choices[0].message.content;
            const campaignOutput = document.getElementById('respostas');
            campaignOutput.innerText = data.choices[0].message.content;

        // Salvar a campanha no LocalStorage para acessar na nova página
        localStorage.setItem('campaignData', responseContent);

        // Redirecionar para o arquivo viewCampanha.html
        window.location.href = "/../../viewCampanha/viewCampanha.html";

            // Expressão regular para capturar os dias e seus respectivos dados
        const regex = /\*Dia (\d+)\* - (.*?),\n  - (.*?),\n  - (.*?),/g;
        let match;

        // Variáveis para armazenar as informações dos 7 dias
        let dia1, desc1, leg1, hr1;
        let dia2, desc2, leg2, hr2;
        let dia3, desc3, leg3, hr3;
        let dia4, desc4, leg4, hr4;
        let dia5, desc5, leg5, hr5;
        let dia6, desc6, leg6, hr6;
        let dia7, desc7, leg7, hr7;

        // Loop para capturar todas as informações de cada dia
        while ((match = regex.exec(responseContent)) !== null) {
            const dia = match[1];            // Captura o número do dia
            const descricaoImagem = match[2]; // Captura a descrição da imagem
            const legenda = match[3];        // Captura a legenda da postagem
            const horario = match[4];        // Captura o horário da postagem

            // Atribuindo os valores às variáveis específicas
            if (dia === '1') {
                dia1 = "Dia 1";
                desc1 = descricaoImagem;
                leg1 = legenda;
                hr1 = horario;
            }
            if (dia === '2') {
                dia2 = "Dia 2";
                desc2 = descricaoImagem;
                leg2 = legenda;
                hr2 = horario;
            }
            if (dia === '3') {
                dia3 = "Dia 3";
                desc3 = descricaoImagem;
                leg3 = legenda;
                hr3 = horario;
            }
            if (dia === '4') {
                dia4 = "Dia 4";
                desc4 = descricaoImagem;
                leg4 = legenda;
                hr4 = horario;
            }
            if (dia === '5') {
                dia5 = "Dia 5";
                desc5 = descricaoImagem;
                leg5 = legenda;
                hr5 = horario;
            }
            if (dia === '6') {
                dia6 = "Dia 6";
                desc6 = descricaoImagem;
                leg6 = legenda;
                hr6 = horario;
            }
            if (dia === '7') {
                dia7 = "Dia 7";
                desc7 = descricaoImagem;
                leg7 = legenda;
                hr7 = horario;
            }
        }

        // Exibindo as variáveis no console para verificar
        console.log(dia1, desc1, leg1, hr1);
        console.log(dia2, desc2, leg2, hr2);
        console.log(dia3, desc3, leg3, hr3);
        console.log(dia4, desc4, leg4, hr4);
        console.log(dia5, desc5, leg5, hr5);
        console.log(dia6, desc6, leg6, hr6);
        console.log(dia7, desc7, leg7, hr7);
        
        
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
            document.getElementById('pBtnAvancar').style.display = 'none';
        }else{
            document.getElementById('btnAvancar').style.display = 'block';
            document.getElementById('pBtnAvancar').style.display = 'block';
        }

    //mostra o botão de pergunta anterios só quando aparece a segunda pergunta
    if(perguntaAtual === 1){
        document.getElementById('btnAnterior').style.display = 'none'
        document.getElementById('pBtnAnterior').style.display = 'none'
    }else{
        document.getElementById('btnAnterior').style.display = 'block'
        document.getElementById('pBtnAnterior').style.display = 'block'
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