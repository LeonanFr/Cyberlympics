const API_BASE = 'https://copadesoftware-r000.onrender.com';
const RANKING_ENDPOINT = '/ranking';
const SSE_ENDPOINT = '/ranking/stream';

const loader = document.getElementById('rankLoader');
const emptyMessage = document.getElementById('rankEmpty');
const rankRowsContainer = document.getElementById('rankRows');

let currentRanking = [];
let previousRanking = [];

const RANK_ANIM_MS = 1200;

function renderRanking(ranking) {
    if (!ranking || ranking.length === 0) {
        emptyMessage.style.display = 'flex';
        rankRowsContainer.innerHTML = '';
        return;
    }

    emptyMessage.style.display = 'none';

    const prevMap = Object.fromEntries(previousRanking.map(t => [t.teamId, t]));
    const rankUp = new Set();
    const rankDown = new Set();

    if (previousRanking.length > 0) {
        ranking.forEach((team, index) => {
            const prevIndex = previousRanking.findIndex(t => t.teamId === team.teamId);
            if (prevIndex > index) rankUp.add(team.teamId);
            if (prevIndex !== -1 && prevIndex < index) rankDown.add(team.teamId);
        });
    }

    const html = ranking.map((team, index) => {
        const position = index + 1;
        const crown = position === 1 ? '<i class="fa-solid fa-crown"></i> ' : '';
        const prev = prevMap[team.teamId];
        const prevTotal = prev ? prev.total : team.total;
        const changed = !!prev && prevTotal !== team.total;
        const dirClass = changed ? (team.total > prevTotal ? ' score-up' : ' score-down') : '';
        const isUp = rankUp.has(team.teamId);
        const isDown = rankDown.has(team.teamId);
        const rowClass = ['table-row', isUp ? 'rank-up' : '', isDown ? 'rank-down' : ''].filter(Boolean).join(' ');

        const overlayHTML = isUp ? `
<div class="pacman-overlay">
    <div class="pacman"></div>
    <div class="dots">
        <div class="dot"></div>
    </div>
</div>` : isDown ? `
<div class="ghost-overlay" style="--ghost-color: orange;">
    <div class="ghost inky">
        <div class="ghost__body">
            <svg viewBox="0 0 56 48">
                <polygon points="0 24,4 24,4 12,8 12,8 8,12 8,12 4,20 4,20 0,36 0,36 4,44 4,44 8,48 8,48 12,52 12,52 24,56 24,56 48,0 48"/>
            </svg>
        </div>
        <div class="ghost__eye--left">
            <svg viewBox="0 0 16 20">
                <polygon points="4 0,12 0,12 4,16 4,16 16,12 16,12 20,4 20,4 16,0 16,0 4,4 4"/>
            </svg>
        </div>
        <div class="ghost__eye--right">
            <svg viewBox="0 0 16 20">
                <polygon points="4 0,12 0,12 4,16 4,16 16,12 16,12 20,4 20,4 16,0 16,0 4,4 4"/>
            </svg>
        </div>
        <div class="ghost__feet"></div>
    </div>
</div>` : '';

        const scoreHTML = changed
            ? `<span class="col-score${dirClass}" data-old="${prevTotal}" data-new="${team.total}"><span class="score-text">${team.total}</span></span>`
            : `<span class="col-score"><span class="score-text">${team.total}</span></span>`;

        return `
<div class="${rowClass}" data-team-id="${team.teamId}" style="--rankDur:${RANK_ANIM_MS}ms">
    ${overlayHTML}
    <span class="col-pos">${crown}${position.toString().padStart(2, '0')}</span>
    <span class="col-name">${team.teamName || 'Time ' + team.teamId}</span>
    ${scoreHTML}
</div>
`;
    }).join('');

    rankRowsContainer.innerHTML = html;

    const changedCells = rankRowsContainer.querySelectorAll('.col-score[data-old][data-new]');
    changedCells.forEach(cell => {
        const newValue = cell.getAttribute('data-new') || '';
        cell.classList.remove('animating', 'hold', 'revert');
        void cell.offsetWidth;
        cell.classList.add('animating');

        setTimeout(() => {
            cell.removeAttribute('data-old');
            cell.classList.remove('animating');
            cell.classList.add('hold');
            cell.querySelector('.score-text').textContent = newValue;
        }, 1500);

        setTimeout(() => {
            cell.classList.remove('hold');
            cell.classList.add('revert');
        }, 2500);

        setTimeout(() => {
            cell.classList.remove('revert', 'score-up', 'score-down');
            cell.querySelector('.score-text').textContent = newValue;
        }, 3200);
    });

    rankRowsContainer.querySelectorAll('.table-row.rank-up, .table-row.rank-down').forEach(row => {
        setTimeout(() => {
            const overlay = row.querySelector('.pacman-overlay, .ghost-overlay');
            if (overlay) overlay.remove();
            row.classList.remove('rank-up', 'rank-down');
        }, RANK_ANIM_MS + 80);
    });

    previousRanking = ranking.map(t => ({ ...t }));
}

async function fetchInitialRanking() {
    try {
        const response = await fetch(API_BASE + RANKING_ENDPOINT);
        if (!response.ok) throw new Error('Erro na resposta da API');
        const json = await response.json();
        const ranking = json.success ? json.data : json;
        currentRanking = ranking;
        renderRanking(ranking);
    } catch (error) {
        console.error('Falha ao carregar ranking:', error);
        emptyMessage.style.display = 'flex';
        rankRowsContainer.innerHTML = '';
    } finally {
        loader.style.display = 'none';
    }
}

function setupSSE() {
    const eventSource = new EventSource(API_BASE + SSE_ENDPOINT);
    eventSource.onmessage = (event) => {
        try {
            const data = JSON.parse(event.data);
            const ranking = Array.isArray(data) ? data : (data.data || []);
            currentRanking = ranking;
            renderRanking(ranking);
        } catch (err) {
            console.error('Erro ao processar SSE:', err);
        }
    };

    eventSource.onerror = (err) => {
        console.error('Erro na conexão SSE:', err);
    };
}

document.addEventListener('DOMContentLoaded', () => {
    fetchInitialRanking();
    setupSSE();
});

const searchInput = document.getElementById('rankSearch');
const resetBtn = document.getElementById('resetSearch');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = e.target.value.toLowerCase();
        if (term === '') {
            renderRanking(currentRanking);
            return;
        }
        const filtered = currentRanking.filter(team => (team.teamName || '').toLowerCase().includes(term));
        renderRanking(filtered);
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (!searchInput) return;
        searchInput.value = '';
        renderRanking(currentRanking);
    });
}