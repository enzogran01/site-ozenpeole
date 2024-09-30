window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');
    loader.classList.add('loader-hidden');
    loader.addEventListener('transitionend', () => {
        document.body.removeChild(loader);
    });

    // Verifica se o usuário está logado
    const userName = localStorage.getItem('userName');
    
    if (userName) {
        // Mostra a mensagem de boas-vindas
        const welcomeMessage = document.querySelector('.welcome-message');
        welcomeMessage.textContent = `Boa  ${userName}!`;
        welcomeMessage.classList.remove('welcome-message-hidden');
        
        // Esconde os botões de login e cadastro
        const authButtons = document.getElementById('auth-buttons');
        if (authButtons) {
            authButtons.classList.add('hidden');
        }
    }
});
