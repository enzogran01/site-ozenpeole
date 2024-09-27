window.addEventListener('load', () => {
    const loader = document.querySelector('.loader');

    loader.classList.add('loader-hidden');

    loader.addEventListener('transitionend', () => {
        document.body.removeChild(loader);
    });
});

// Verifica se o usuário está logado
const userName = localStorage.getItem('userName');
if (userName) {
    // Exibir "Bem-vindo, [userName]"
    const welcomeMessage = document.getElementById('welcome-message');
    welcomeMessage.textContent = `Bem-vindo, ${userName}!`;
    welcomeMessage.style.display = 'block'; // Exibe a mensagem
}

// Restante do código
document.querySelectorAll('.why-box-blue, .why-box-orange').forEach(box => {
    box.addEventListener('mouseenter', () => {
        document.querySelectorAll('.why-box-blue, .why-box-orange').forEach(otherBox => {
            if (otherBox !== box) {
                otherBox.classList.add('why-box-gray'); // Adiciona a classe 'why-box-gray'
                
                // Armazena a classe original no atributo 'data-original-class'
                if (!otherBox.dataset.originalClass) {
                    otherBox.dataset.originalClass = otherBox.classList.contains('why-box-blue') ? 'why-box-blue' : 'why-box-orange';
                }

                // Remove as classes originais
                otherBox.classList.remove('why-box-blue', 'why-box-orange');
            }
        });
    });

    box.addEventListener('mouseleave', () => {
        document.querySelectorAll('.why-box-gray').forEach(grayBox => {
            grayBox.classList.remove('why-box-gray'); // Remove a classe 'why-box-gray'
            
            // Restaura a classe original a partir do 'data-original-class'
            const originalClass = grayBox.dataset.originalClass;
            grayBox.classList.add(originalClass);

            // Remove o atributo 'data-original-class' após restaurar
            grayBox.removeAttribute('data-original-class');
        });
    });
});
