(function () {
    const phrases = [
        '"Que a Força esteja com você"',
        '"Vida longa e próspera"',
        '"Ao infinito e além!"',
        '"Eu voltarei"',
        '"Não existe colher"',
        '"Olá, mundo!"',
        '"Que a sorte esteja sempre a seu favor"',
        '"1.21 gigawatts!"',
        '"Luke, eu sou seu pai"',
        '"Por que tão sério?"',
        '"Elementar, meu caro Watson"',
        '"Bazinga!"',
        '"Meu precioso"'
    ];

    const el = document.getElementById('rotating-phrase');
    if (el) {
        setInterval(() => {
            const randomIndex = Math.floor(Math.random() * phrases.length);
            el.textContent = phrases[randomIndex];
        }, 4000);
    }
})();