// script.js

function openModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.add('active');
    el.setAttribute('aria-hidden', 'false');
}

function closeModal(id) {
    const el = document.getElementById(id);
    if (!el) return;
    el.classList.remove('active');
    el.setAttribute('aria-hidden', 'true');
}

window.addEventListener('click', (event) => {
    if (event.target.classList && event.target.classList.contains('modal')) {
        event.target.classList.remove('active');
        event.target.setAttribute('aria-hidden', 'true');
    }
});

window.addEventListener('keydown', (e) => {
    const isEnter = e.key === 'Enter';
    const isSpace = e.key === ' ';
    if (!isEnter && !isSpace) return;

    const active = document.activeElement;
    if (active && active.dataset && active.dataset.modal) {
        e.preventDefault();
        openModal(active.dataset.modal);
    }
});

window.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    document.querySelectorAll('.modal.active').forEach(m => {
        m.classList.remove('active');
        m.setAttribute('aria-hidden', 'true');
    });
});

(function typing() {
    const el = document.getElementById('typing');
    if (!el) return;

    const text = 'iniciando sistema... carregando módulos... pronto para o desafio.';
    let i = 0;

    function tick() {
        el.textContent = text.slice(0, i++);
        if (i <= text.length) setTimeout(tick, 26);
    }
    tick();
})();

(function reveal() {
    const items = document.querySelectorAll(
        '.card, .leaderboard-box, .cta-box, .section-title, .lb-footnote, .muted-center, .section-head'
    );

    if (!('IntersectionObserver' in window)) {
        items.forEach(i => i.classList.add('reveal'));
        return;
    }

    const io = new IntersectionObserver((entries) => {
        entries.forEach(e => {
            if (e.isIntersecting) e.target.classList.add('reveal');
        });
    }, { threshold: 0.12 });

    items.forEach(i => io.observe(i));
})();

(function navActive() {
    const links = document.querySelectorAll('.nav-links a[data-nav]');
    if (!links.length) return;

    const sections = Array.from(links)
        .map(a => document.getElementById(a.dataset.nav))
        .filter(Boolean);

    if (!sections.length || !('IntersectionObserver' in window)) return;

    const byId = new Map(Array.from(links).map(a => [a.dataset.nav, a]));

    const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                links.forEach(a => a.classList.remove('active'));
                const a = byId.get(entry.target.id);
                if (a) a.classList.add('active');
            }
        });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0.01 });

    sections.forEach(s => io.observe(s));
})();

(function rankingSearch() {
    const input = document.getElementById('rankSearch');
    const reset = document.getElementById('resetSearch');
    const empty = document.getElementById('rankEmpty');

    if (!input) return;

    const rows = Array.from(document.querySelectorAll('.table-row'));

    function applyFilter() {
        const q = input.value.trim().toLowerCase();
        let visible = 0;

        rows.forEach(r => {
            const name = (r.dataset.team || '').toLowerCase();
            const match = name.includes(q);
            r.style.display = match ? 'grid' : 'none';
            if (match) visible++;
        });

        if (empty) empty.hidden = visible !== 0;
    }

    input.addEventListener('input', applyFilter);

    if (reset) {
        reset.addEventListener('click', () => {
            input.value = '';
            applyFilter();
            input.focus();
        });
    }
})();
