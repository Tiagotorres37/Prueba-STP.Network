// Configuración inicial para cada héroe
const heroesConfig = {
    IronMan: {
        votes: { like: 0, dislike: 0 },
        elements: {
            likeButton: document.getElementById('like-button'),
            dislikeButton: document.getElementById('dislike-button'),
            confirmationMessage: document.getElementById('confirmation-message'),
            percentageLike: document.getElementById('percentage-like'),
            percentageDislike: document.getElementById('percentage-dislike'),
            backToVoteButton: document.getElementById('back-to-vote')
        }
    },
    Superman: {
        votes: { like: 0, dislike: 0 },
        elements: {
            likeButton: document.getElementById('like-button-superman'),
            dislikeButton: document.getElementById('dislike-button-superman'),
            confirmationMessage: document.getElementById('confirmation-message-superman'),
            percentageLike: document.getElementById('percentage-like-superman'),
            percentageDislike: document.getElementById('percentage-dislike-superman'),
            backToVoteButton: document.getElementById('back-to-vote-superman')
        }
    },
    BatMan: {
        votes: { like: 0, dislike: 0 },
        elements: {
            likeButton: document.getElementById('like-button-BatMan'),
            dislikeButton: document.getElementById('dislike-button-BatMan'),
            confirmationMessage: document.getElementById('confirmation-message-BatMan'),
            percentageLike: document.getElementById('percentage-like-BatMan'),
            percentageDislike: document.getElementById('percentage-dislike-BatMan'),
            backToVoteButton: document.getElementById('back-to-vote-BatMan')
        }
    },
    Thor: {
        votes: { like: 0, dislike: 0 },
        elements: {
            likeButton: document.getElementById('like-button-Thor'),
            dislikeButton: document.getElementById('dislike-button-Thor'),
            confirmationMessage: document.getElementById('confirmation-message-Thor'),
            percentageLike: document.getElementById('percentage-like-Thor'),
            percentageDislike: document.getElementById('percentage-dislike-Thor'),
            backToVoteButton: document.getElementById('back-to-vote-Thor')
        }
    },
    SpiderMan: {
        votes: { like: 0, dislike: 0 },
        elements: {
            likeButton: document.getElementById('like-button-SpiderMan'),
            dislikeButton: document.getElementById('dislike-button-SpiderMan'),
            confirmationMessage: document.getElementById('confirmation-message-SpiderMan'),
            percentageLike: document.getElementById('percentage-like-SpiderMan'),
            percentageDislike: document.getElementById('percentage-dislike-SpiderMan'),
            backToVoteButton: document.getElementById('back-to-vote-SpiderMan')
        }
    }
};

// Cargar los votos guardados en localStorage para cada héroe
for (const hero in heroesConfig) {
    const storedVotes = localStorage.getItem(`votes-${hero}`);
    if (storedVotes) {
        heroesConfig[hero].votes = JSON.parse(storedVotes);
    }
    updatePercentages(hero);
}

// Función para actualizar los porcentajes de votos para cada héroe
function updatePercentages(hero) {
    const { votes, elements } = heroesConfig[hero];
    const totalVotes = votes.like + votes.dislike;
    const likePercentage = totalVotes ? Math.round((votes.like / totalVotes) * 100) : 0;
    const dislikePercentage = totalVotes ? Math.round((votes.dislike / totalVotes) * 100) : 0;

    elements.percentageLike.textContent = `${likePercentage}%`;
    elements.percentageDislike.textContent = `${dislikePercentage}%`;
}

// Función para manejar el voto de un héroe específico
function vote(hero, type) {
    const { votes, elements } = heroesConfig[hero];
    votes[type]++;
    localStorage.setItem(`votes-${hero}`, JSON.stringify(votes));
    updatePercentages(hero);

    // Ocultar los botones de votar y mostrar el mensaje de confirmación
    elements.likeButton.style.display = 'none';
    elements.dislikeButton.style.display = 'none';
    elements.confirmationMessage.style.display = 'block';
}

// Función para reiniciar el estado de los botones y mensajes
function resetVote(hero) {
    const { elements } = heroesConfig[hero];
    elements.confirmationMessage.style.display = 'none';
    elements.likeButton.style.display = 'inline-block';
    elements.dislikeButton.style.display = 'inline-block';
}

// Asignar eventos a los botones de cada héroe
for (const hero in heroesConfig) {
    const { elements } = heroesConfig[hero];
    elements.likeButton.addEventListener('click', () => vote(hero, 'like'));
    elements.dislikeButton.addEventListener('click', () => vote(hero, 'dislike'));
    elements.backToVoteButton.addEventListener('click', () => resetVote(hero));
}
