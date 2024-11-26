
//INICIA A CONFIGURAÇÃO DE VERIFICAÇÃO DE USUÁRIOS E LOAD DA PÁGINA

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

        const userId = localStorage.getItem("userId");

    // Buscar campanhas do servidor
    fetch(`http://localhost:3000/getCampanhas/${userId}`)
        .then((campanhas) => {
            if (campanhas) {
                // modalCampButton.href = '../viewCampanha/viewCampanha.html'
                alert('Já possui campanha')
                window.location.href = '../../viewCampanha/viewCampanha.html'
                return;
            }
        })
        
    } else {
        alert('Login não encontrado.');
        window.location.href = "../../homepage/homepage.html"
    }
})


document.getElementById("sair").addEventListener("click", () => {
    localStorage.removeItem("userName")
    // localStorage.removeItem("campaignData")
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

//TERMINA A CONFIG DE USUÁRIOS E LOAD





//INICIA MANIPULAÇÃO DE DADOS DO FORMULÁRIO

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
            let area = obterResposta('area');
            let idade = obterResposta('idade');
            let lojaLocal = obterResposta('lojaLocal');
            let local = obterResposta('local');
            let social = obterResposta('social');
            let venda = obterResposta('venda');
            let preco = obterResposta('preco');
            let propaganda = obterResposta('propaganda');

//TERMINA A MANIPULAÇÃO DOS DADOS COLOCANDO CADA UM EM SUA DEVIDA VARIÁVEL


//INICIA A PARTE DA CONFIGARAÇÃO DA REQUISIÇÃO PARA A IA

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
                  "content": `responda em português brasileiro: Crie uma campanha de marketing baseada nas teorias mais usadas atualmente, para uma empresa que é um/uma  ${area} com o conteúdo para uma semana de postagem na rede social ${social}, especificando os dias de postagens e o horário, buscando o melhor engajamento, e considerando esses outros seguintes dados: Idade do público-alvo: ${idade}, Localização da maioria dos seus clientes: ${local}, Localização da loja ${lojaLocal}, Maior parte das vendas feitas ${venda}, Ticket médio: ${preco}, A loja ${propaganda} algum tipo de marketing . Lembrando que é necessário a descrição da imagem da postagem, a legenda necessária e o horário da postagem. Me reponda OBRIGATÓRIAMENTE neste formato: Dia 1 - descrição da imagem 1  - legenda 1  - horário da postagem 1 ; Dia 2 - descrição da imagem 2  - legenda 2  - horário da postagem 2; Dia 3 - descrição da imagem 3  - legenda 3 - horário da postagem 3; Dia 4 - descrição da imagem 4 - legenda 4 - horário da postagem 4; Dia 5 - descrição da imagem 5 - legenda 5 - horário da postagem 5; Dia 6 - descrição da imagem 6 - legenda 6 - horário da postagem 6; Dia 7 - descrição da imagem 7  - legenda 7 - horário da postagem 7;`
                }]
              })
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data.choices[0].message.content);
            
            const responseContent = data.choices[0].message.content;
            const campaignOutput = document.getElementById('respostas');
            campaignOutput.innerText = data.choices[0].message.content;

            
        // // Salvar a campanha no LocalStorage para acessar na nova página
        // localStorage.setItem('campaignData', responseContent);

        // Redirecionar para o arquivo viewCampanha.html
        window.location.href = "/../../viewCampanha/viewCampanha.html";
        const regex = /\*Dia (\d+)\* - (.*?),\n  - (.*?),\n  - (.*?),/g;
        let match;

        const dias = responseContent.split('\n').filter(dia => dia.trim() !== '');
        // Loop para capturar todas as informações de cada dia
        const resultado = dias.map(linha => {
            const partes = linha.split(' - '); // Divide cada linha em partes
          
            // Extrair informações de cada parte
            const dia = partes[0].replace('*', '').trim();
            const descricao = partes[1].trim();
            const legenda = partes[2].replace(/"/g, '').trim(); // Remove as aspas
            const hora = partes[3].replace(';', '').trim();
          
            return { dia, descricao, legenda, hora };
          });

        fetch(`http://localhost:3001/salvarcampanha/${localStorage.getItem("userId")}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(resultado)
        })
        .then(function (response){
            data = response.json();
        })
         // Redirecionar após salvar
        setTimeout(() => {
        window.location.href = "/../../viewCampanha/viewCampanha.html";
        }, 100); // Pequeno atraso para garantir o armazenamento
       
    

//TERMINA A PARTE DA REQUISIÇÃO COM A RESPOSTA ARMAZENADA NO LOCAL STORAGE E REDIRECIONANDO PARA OUTRA PÁGINA




// ORGANIZA A RESPOSTA DA IA PARA FACILITAR A VISUALIZAÇÃO DO USUÁRIO

// Expressão regular para capturar os dias e seus respectivos dados, incluindo o título
} else {
    console.error("Erro na requisição fetch:", response.statusText);
    campaignOutput.innerText = "Erro ao gerar a campanha";
}
} catch (error) {
    console.error("Erro na requisição fetch:", error);
    campaignOutput.innerText = "Erro ao gerar a campanha";
}
});

// TERMINA A ORGANIZAÇÃO DE CAMPANHA E EXIBE NO CONSOLE TAMBÉM





//INICIA A CONFIGURAÇÃO DE BOTÕES DI FORMULÁRIO

    let perguntaAtual = 1;

    const totalPerguntas = 8;

    // Exibe a primeira pergunta ao carregar
mostrarPergunta(perguntaAtual);

// Função para mostrar a pergunta atual
function mostrarPergunta(indice) {
    const todasAsPerguntas = document.querySelectorAll('.box-pergunta');
    todasAsPerguntas.forEach((pergunta, idx) => {
        pergunta.classList.remove('active');
        if (idx + 1 === indice) {
            pergunta.classList.add('active');
        }
    });

    // Atualiza a visibilidade dos botões
    document.getElementById('btnAnterior').disabled = indice === 1;
    document.getElementById('btnAvancar').style.display = indice === totalPerguntas ? 'none' : 'block';
    document.getElementById('btnGeral').style.display = indice === totalPerguntas ? 'block' : 'none';
}

// Função para avançar a pergunta
function btnAvancar() {
    if (validarPerguntaAtual()) {
        if (perguntaAtual < totalPerguntas) {
            perguntaAtual++;
            mostrarPergunta(perguntaAtual);
        }
    } else {
        alert('Por favor, responda a pergunta antes de avançar.');
    }
}

// Função para voltar a pergunta
function btnAnterior() {
    if (perguntaAtual > 1) {
        perguntaAtual--;
        mostrarPergunta(perguntaAtual);
    }
}

// Função de validação da pergunta atual
function validarPerguntaAtual() {
    const perguntaAtiva = document.querySelector('.box-pergunta.active'); // Encontra a pergunta ativa
    const inputs = perguntaAtiva.querySelectorAll('input'); // Seleciona todos os inputs

    // Verifica se todos os inputs obrigatórios estão preenchidos ou selecionados
    return Array.from(inputs).every(input => {
        if (input.required) {  // Verifica se o input é obrigatório
            if (input.type === 'radio') {
                // Verifica se pelo menos um rádio do grupo está marcado
                const radios = perguntaAtiva.querySelectorAll(`input[name="${input.name}"]`);
                return Array.from(radios).some(radio => radio.checked);
            } else if (input.type === 'text') {
                // Verifica se o campo de texto obrigatório não está vazio
                return input.value.trim() !== '';
            }
            // Caso seja outro tipo de input obrigatório, verifica se não está vazio
            return input.value.trim() !== '';
        }
        return true;  // Para inputs não obrigatórios, consideramos válidos
    });
}

// Botão cancelar redireciona para a página inicial
document.getElementById('btnCancelar').addEventListener('click', () => {
    window.location.href = '../../homepage/homepage.html';
});

// Adiciona eventos aos botões
document.getElementById('btnAvancar').addEventListener('click', btnAvancar);
document.getElementById('btnAnterior').addEventListener('click', btnAnterior);

    // //inicia a primeira pergunta
    // proximaPergunta();

    // //condição para o botão não funcionar quando já tiver na ultima página
    // if(perguntaAtual === totalPerguntas){
    //     document.getElementById('btnAvancar').style.display = 'none';
    // }


    // // funcao para passar pergunta
    // function proximaPergunta(){
    //         // Esconde todas as perguntas
    //         for(let i = 1; i <= totalPerguntas; i++){
    //             document.getElementById(`box-pergunta${i}`).style.display = 'none';
    //         }
            
    //         // Tira o botão quando chegar na última pergunta
    //         if(perguntaAtual === totalPerguntas){
    //             document.getElementById('btnAvancar').style.display = 'none';
    //             document.getElementById('pBtnAvancar').style.display = 'none';
    //             document.getElementById('btnGeral').style.display = 'block';
    //         }else{
    //             document.getElementById('btnAvancar').style.display = 'block';
    //             document.getElementById('pBtnAvancar').style.display = 'block';
    //             document.getElementById('btnGeral').style.display = 'none'
    //         }
            
    //         // Mostra o botão de pergunta anterior só quando aparece a segunda pergunta
    //         if(perguntaAtual === 1){
    //             document.getElementById('btnAnterior').style.display = 'none';
    //             document.getElementById('pBtnAnterior').style.display = 'none';
    //         }else{
    //             document.getElementById('btnAnterior').style.display = 'block';
    //             document.getElementById('pBtnAnterior').style.display = 'block';
    //         }
            
            
    //         // Mostra a pergunta atual com base no id
    //         document.getElementById(`box-pergunta${perguntaAtual}`).style.display = 'block';
            
    //     }
    

    // // Função para avançar a pergunta
    // function btnAvancar(){
    //     if(perguntaAtual < totalPerguntas){
    //             perguntaAtual++;
    //             proximaPergunta();
    //     }
    // }

    // //função para volta pergunta
    // function btnAnterior(){
    //     if(perguntaAtual > 1){
    //         perguntaAtual--;
    //         proximaPergunta();
    //         document.getElementById('campanha').style.display = 'none';
    //     } 
    //     return;
    // }

    // //config do btn cancelar
    // const btnCancelar = document.getElementById('btnCancelar')

    // document.getElementById('btnCancelar').addEventListener('click', () => {
    //     window.href = '../../homepage/homepage.html'
    // })


    // //adiciona o click aos botões
    // document.getElementById('btnAvancar').addEventListener('click', btnAvancar);
    // document.getElementById('btnAnterior').addEventListener('click', btnAnterior);
    // btnCancelar.addEventListener('click', () => {
    //     window.location.href = '../../homepage/homepage.html'
    // })

//TERMINA A CONFIG DOS BOTÕES



//INICIA A CONFIGURAÇÃO DA FUNÇÃO PARA BUSCAR AS CAMPANHAS PELO LOGIN

    // //função para buscar as campanhas no banco de dados
    // function getCampanhas(){

    //     if (isValid) {
    //         const email = emailInput.value.trim();
    //         const password = passwordInput.value.trim();

    //         fetch('http://localhost:3000/login', {
    //             method: 'POST',
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify({ email, password })
    //         })
    //         .then(response => response.json())
    //         .then(data => {
    //             if (data.message === 'Login bem-sucedido!') {
    //                 // armazena o nome do usuário no localStorage
    //                 localStorage.setItem('userName', data.userName); // `userName` vem do servidor
                    
    //                 alert('Login realizado com sucesso!');
    //                 window.location.href = '../homepage/homepage.html'; // redireciona para a homepage
    //             } else {
    //                 alert(data.message); // exibe mensagem de erro
    //             }
    //         })
    //         .catch(error => {
    //             console.error('Erro ao fazer login:', error);
    //         });
    //     }
    // }

//TERMINA A CONFIGURAÇÃO DA FUNÇÃO DE PERGAR CAMPANHA PELO LOGIN








//"content": `responda em português brasileiro: Crie uma campanha de marketing baseada nas teorias mais usadas atualmente, para uma empresa que é um/uma ${area} com o conteúdo para uma semana de postagem na rede social ${social}, especificando os dias de postagens e o horário, buscando o melhor engajamento, e considerando esses outros seguintes dados: Idade do público-alvo: ${idade}, Localização da maioria dos seus clientes: ${local}, Localização do negócio ${lojaLocal}, Maior parte das vendas feitas ${venda}, Ticket médio: ${preco} e o negócio ${propaganda} fez algum tipo de marketing . Lembrando que é necessário a descrição da imagem da postagem, a legenda necessária e o horário da postagem. Me reponda OBRIGATORIAMENTE neste formato: -Título, *Dia 1* - descrição da imagem 1,  - legenda 1,  - horário da postagem 1, ; *Dia 2* - descrição da imagem 2,  - legenda 2,  - horário da postagem 2; *Dia 3* - descrição da imagem 3,  - legenda 3, - horário da postagem 3; *Dia 4* - descrição da imagem 4, - legenda 4, - horário da postagem 4; *Dia 5* - descrição da imagem 5, - legenda 5, - horário da postagem 5; *Dia 6* - descrição da imagem 6, - legenda 6, - horário da postagem 6; *Dia 7* - descrição da imagem 7,  - legenda 7, - horário da postagem 7;`
//"content": `responda em português brasileiro: Crie uma campanha de marketing baseada nas teorias mais usadas atualmente, para uma empresa que atua na área de ${area} com o conteúdo para uma semana de postagem na rede social ${social}, especificando os dias de postagens e o horário, buscando o melhor engajamento, e considerando esses outros seguintes dados: Idade do público-alvo: ${idade}, Localização da maioria dos seus clientes: ${local}, Localização da loja ${lojaLocal}, Maior parte das vendas feitas ${venda}, Ticket médio: ${preco}, A loja ${propaganda} algum tipo de marketing . Lembrando que é necessário a descrição da imagem da postagem, a legenda necessária e o horário da postagem. Me reponda OBRIGATÓRIAMENTE neste formato: *Dia 1* - descrição da imagem 1,  - legenda 1,  - horário da postagem 1, ; *Dia 2* - descrição da imagem 2,  - legenda 2,  - horário da postagem 2; *Dia 3* - descrição da imagem 3,  - legenda 3, - horário da postagem 3; *Dia 4* - descrição da imagem 4, - legenda 4, - horário da postagem 4; *Dia 5* - descrição da imagem 5, - legenda 5, - horário da postagem 5; *Dia 6* - descrição da imagem 6, - legenda 6, - horário da postagem 6; *Dia 7* - descrição da imagem 7,  - legenda 7, - horário da postagem 7;`