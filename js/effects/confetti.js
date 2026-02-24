(function () {
    const colors = ['#00ff66', '#b026ff', '#00ccff', '#ffff00'];

    function createConfetti() {
        const confetti = document.createElement('div');
        confetti.classList.add('confetti');

        const piece = document.createElement('div');
        piece.classList.add('piece');

        const front = document.createElement('div');
        const back = document.createElement('div');
        front.classList.add('side');
        back.classList.add('side', 'back');

        const color = colors[Math.floor(Math.random() * colors.length)];
        front.style.background = color;
        back.style.background = color;

        piece.appendChild(front);
        piece.appendChild(back);
        confetti.appendChild(piece);

        confetti.style.left = Math.random() * window.innerWidth + 'px';

        const fallDuration = Math.random() * 3 + 2;
        const spinDuration = Math.random() * 2 + 1;

        confetti.style.animation = `fall ${fallDuration}s linear forwards`;
        piece.style.animation = `spin ${spinDuration}s linear infinite`;

        document.body.appendChild(confetti);

        setTimeout(() => {
            confetti.remove();
        }, fallDuration * 1000);
    }

    const btn = document.getElementById('btnInscricao');
    if (btn) {
        btn.addEventListener('mouseenter', () => {
            // VERIFICAÇÃO DE LIMITE: 
            // Só gera novos se não houver nenhum elemento .confetti no documento
            if (document.querySelector('.confetti')) return;

            for (let i = 0; i < 20; i++) {
                setTimeout(createConfetti, i * 40);
            }
        });
    }

    const style = document.createElement('style');
    style.textContent = `
        .confetti {
            position: fixed;
            top: -20px;
            width: 12px;
            height: 18px;
            z-index: 10001;
            pointer-events: none;
            perspective: 1000px;
        }
        .piece {
            width: 100%;
            height: 100%;
            transform-style: preserve-3d;
        }
        .side {
            position: absolute;
            width: 100%;
            height: 100%;
            backface-visibility: hidden;
            border-radius: 2px;
        }
        .back {
            transform: rotateY(180deg);
            filter: brightness(0.7);
        }
        @keyframes fall {
            0% { transform: translateY(0) rotate(0deg); opacity: 1; }
            100% { transform: translateY(105vh) rotate(360deg); opacity: 0; }
        }
        @keyframes spin {
            0% { transform: rotateX(0deg) rotateY(0deg); }
            100% { transform: rotateX(360deg) rotateY(360deg); }
        }
    `;
    document.head.appendChild(style);
})();