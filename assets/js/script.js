// Inicializamos los votos
let votes = {
    like: 0,
    dislike: 0
};

// Recuperamos los votos del localStorage si existen
const storedVotes = localStorage.getItem('votes');
if (storedVotes) {
    votes = JSON.parse(storedVotes);
}

// Variables de referencia en el DOM
const likeButton = document.getElementById('like-button');
const dislikeButton = document.getElementById('dislike-button');
const confirmationMessage = document.getElementById('confirmation-message');
const percentageLike = document.getElementById('percentage-like');
const percentageDislike = document.getElementById('percentage-dislike');
const backToVoteButton = document.getElementById('back-to-vote');

// Función para actualizar los porcentajes de votos
const updatePercentages = () => {
    const totalVotes = votes.like + votes.dislike;
    const likePercentage = totalVotes ? Math.round((votes.like / totalVotes) * 100) : 0;
    const dislikePercentage = totalVotes ? Math.round((votes.dislike / totalVotes) * 100) : 0;

    // Actualiza el texto de los porcentajes
    percentageLike.textContent = `${likePercentage}%`;
    percentageDislike.textContent = `${dislikePercentage}%`;

    // Actualiza la barra de progreso
    document.querySelector('.progress-bar-like').style.width = `${likePercentage}%`;
    document.querySelector('.progress-bar-dislike').style.width = `${dislikePercentage}%`;
};

// Actualizamos los porcentajes y las barras al cargar la página
updatePercentages();

// Función para manejar el voto
const vote = (type) => {
    // Guardamos el voto en el objeto y en localStorage
    votes[type]++;
    localStorage.setItem('votes', JSON.stringify(votes));
    
    // Actualizamos porcentajes y barras
    updatePercentages();
    
    // Ocultamos los botones de votar
    likeButton.style.display = 'none';
    dislikeButton.style.display = 'none';
    
    // Mostramos el mensaje de confirmación
    confirmationMessage.style.display = 'block';
};

// Evento para volver a votar
backToVoteButton.addEventListener('click', () => {
    confirmationMessage.style.display = 'none'; // Oculta el mensaje de confirmación
    
    // Volvemos a mostrar los botones de votar
    likeButton.style.display = 'inline-block';
    dislikeButton.style.display = 'inline-block';
});

// Eventos para los botones de voto
likeButton.addEventListener('click', () => vote('like'));
dislikeButton.addEventListener('click', () => vote('dislike'));
