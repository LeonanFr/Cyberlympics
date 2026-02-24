(function () {
    const canvas = document.createElement('canvas');
    canvas.id = 'matrix-canvas';
    document.body.prepend(canvas);

    const ctx = canvas.getContext('2d');
    let w, h;
    let columns = [];
    const fontSize = 16;
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()_+-=[]{}|;:,.<>?';

    function resize() {
        w = canvas.width = window.innerWidth;
        h = canvas.height = window.innerHeight;
        columns = Array(Math.floor(w / fontSize)).fill(0);
    }

    function draw() {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, w, h);

        ctx.fillStyle = '#0f0';
        ctx.font = fontSize + 'px monospace';

        for (let i = 0; i < columns.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            ctx.fillText(text, i * fontSize, columns[i] * fontSize);

            if (columns[i] * fontSize > h && Math.random() > 0.975) {
                columns[i] = 0;
            }
            columns[i]++;
        }
    }

    window.addEventListener('resize', resize);
    resize();
    setInterval(draw, 33);
})();