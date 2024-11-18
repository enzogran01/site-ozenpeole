const campaignData = localStorage.getItem('campaignData');

if (campaignData) {
    const container = document.getElementById('campaignContainer');

    // Regex ajustada para capturar dados do formato fornecido
    const regex = /\*Dia (\d+)\* - (.*?),\s*- (.*?),\s*- (.*?);/g;
    let match;

    // Loop para processar cada dia da campanha
    while ((match = regex.exec(campaignData)) !== null) {
        const day = match[1]; // Número do dia
        const description = match[2]; // Descrição da imagem
        const caption = match[3]; // Legenda
        const time = match[4]; // Horário da postagem

        // Cria uma div para o dia
        const dayDiv = document.createElement('div');
        dayDiv.classList.add('day');
        dayDiv.innerHTML = `
            <h2>Dia ${day}</h2>
            <p><strong>Descrição da imagem:</strong> ${description}</p>
            <p><strong>Legenda:</strong> ${caption}</p>
            <p><strong>Horário da postagem:</strong> ${time}</p>
        `;

        // Adiciona a div ao container
        container.appendChild(dayDiv);
    }
} else {
    // Exibe mensagem caso não haja dados no localStorage
    document.getElementById('campaignContainer').innerText = "Nenhuma campanha encontrada.";
}