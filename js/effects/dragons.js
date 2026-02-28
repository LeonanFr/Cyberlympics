(function () {
    const canvas = document.getElementById('dragons-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');

    function resize() {
        const container = canvas.parentElement;
        if (!container) return;
        const w = container.clientWidth;
        const h = container.clientHeight;
        canvas.width = w;
        canvas.height = h;
    }
    window.addEventListener('resize', resize);
    resize();

    const M = Math,
        Mc = M.cos,
        Ms = M.sin,
        ran = M.random,
        pi = M.PI;

    let dragons = [],
        shape = [],
        pfloat = 0;

    '! ((&(&*$($,&.)/-.0,4%3"7$;(@/EAA<?:<9;;88573729/7,6(8&;'.split('').forEach((a, i) => {
        shape[i] = a.charCodeAt(0) - 32;
    });

    function dragon(index) {
        const scale = 0.1 + index * (index / 2) / 144;
        let gx = ran() * canvas.width / scale,
            gy = canvas.height / scale,
            lim = 300,
            speed = 3 + ran() * 5,
            direction = pi,
            direction1 = direction,
            spine = [];

        return function () {
            if (gx < -lim || gx > canvas.width / scale + lim || gy < -lim || gy > canvas.height / scale + lim) {
                const dx = canvas.width / scale / 2 - gx,
                    dy = canvas.height / scale / 2 - gy;
                direction = direction1 = M.atan(dx / dy) + (dy < 0 ? pi : 0);
            } else {
                direction1 += ran() * 0.1 - 0.05;
                direction -= (direction - direction1) * 0.1;
            }

            gx += Ms(direction) * speed;
            gy += Mc(direction) * speed;

            for (let i = 0; i < 70; i++) {
                if (i) {
                    if (!pfloat) spine[i] = { x: gx, y: gy };
                    const p = spine[i - 1];
                    let dx = spine[i].x - p.x,
                        dy = spine[i].y - p.y,
                        d = M.sqrt(dx * dx + dy * dy),
                        perpendicular = M.atan(dy / dx) + pi / 2 + (dx < 0 ? pi : 0);

                    let mod;
                    if (d > 4) mod = 0.5;
                    else if (d > 2) mod = (d - 2) / 4;
                    else mod = 0;

                    spine[i].x -= dx * mod;
                    spine[i].y -= dy * mod;
                    spine[i].px = Mc(perpendicular);
                    spine[i].py = Ms(perpendicular);

                    if (i === 20) {
                        var wingPerpendicular = perpendicular;
                    }
                } else {
                    spine[i] = { x: gx, y: gy, px: 0, py: 0 };
                }
            }

            ctx.beginPath();
            ctx.moveTo(spine[0].x, spine[0].y);

            for (let i = 0; i < 154; i += 2) {
                let L, index;
                if (i < 77) {
                    index = i;
                    L = 1;
                } else {
                    index = 152 - i;
                    L = -1;
                }

                let x = shape[index];
                let spineNode = spine[shape[index + 1]];

                if (index >= 56) {
                    const wobbleIndex = 56 - index;
                    const wobble = Ms(wobbleIndex / 3 + pfloat * 0.1) * wobbleIndex * L;
                    x = 20 - index / 4 + wobble;
                    spineNode = spine[index * 2 - 83];
                } else if (index > 13) {
                    x = 4 + (x - 4) * (Ms((-x / 2 + pfloat) / 25 * speed / 4) + 2) * 2;
                    spineNode.px = Mc(wingPerpendicular);
                    spineNode.py = Ms(wingPerpendicular);
                }

                ctx.lineTo(
                    (spineNode.x + x * L * spineNode.px) * scale,
                    (spineNode.y + x * L * spineNode.py) * scale
                );
            }

            ctx.fillStyle = 'rgba(202, 7, 34, 0.8)';
            ctx.fill();
        };
    }

    for (let j = 0; j < 12; j++) {
        dragons[j] = dragon(j);
    }

    function loop() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        for (let j = 0; j < 12; j++) {
            dragons[j]();
        }
        pfloat++;
        requestAnimationFrame(loop);
    }

    loop();
})();