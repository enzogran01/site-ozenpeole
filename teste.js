//pega os elementos
const gptPergunta = document.getElementById('teste-gustavo');
const OPENAI_API_KEY = "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";

if(gptPergunta){
    gptPergunta.addEventListener("submit", async (e) =>{

        //block reload
        e.preventDefault();

        //receber valor
        let pergunta = document.getElementById('campo-pergunta').value;
        console.log(pergunta);

        await fetch('https://api.openai.com/v1/completions', {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
                "Autorization": `Bearer OPENAI_API_KEY,`
            },
            body: JSON.stringify({
                model: "text-davinci-003",
                prompt: pergunta,
                max_tokens: 2048,
                temperature: 0.5
            }),
        })
    });
}

