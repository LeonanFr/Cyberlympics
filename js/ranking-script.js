const API_BASE = 'https://copadesoftware-r000.onrender.com';
const RANKING_ENDPOINT = '/ranking';
const SSE_ENDPOINT = '/ranking/stream';

const loader = document.getElementById('rankLoader');
const emptyMessage = document.getElementById('rankEmpty');
const rankRowsContainer = document.getElementById('rankRows');

let currentRanking = [];

function renderRanking(ranking) {
    if (!ranking || ranking.length === 0) {
        emptyMessage.style.display = 'flex';
        rankRowsContainer.innerHTML = '';
        return;
    }

    emptyMessage.style.display = 'none';

    const html = ranking.map((team, index) => {
        const position = index + 1;
        const crown = position === 1 ? '<i class="fa-solid fa-crown"></i> ' : '';

        return `
            <div class="table-row" data-team-id="${team.teamId}">
                <span class="col-pos">${crown}${position.toString().padStart(2, '0')}</span>
                <span class="col-name">${team.teamName || 'Time ' + team.teamId}</span>
                <span class="col-score">${team.total}</span>
            </div>
        `;
    }).join('');

    rankRowsContainer.innerHTML = html;
}

async function fetchInitialRanking() {
    try {
        const response = await fetch(API_BASE + RANKING_ENDPOINT);
        if (!response.ok) throw new Error();
        const json = await response.json();
        const ranking = json.success ? json.data : json;
        currentRanking = ranking;
        renderRanking(ranking);
    } catch (error) {
        emptyMessage.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Erro ao carregar ranking.';
        emptyMessage.style.display = 'flex';
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
        } catch { }
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

        const filtered = currentRanking.filter(team =>
            (team.teamName || '').toLowerCase().includes(term)
        );

        renderRanking(filtered);
        emptyMessage.style.display = filtered.length === 0 ? 'flex' : 'none';
    });
}

if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        if (!searchInput) return;
        searchInput.value = '';
        renderRanking(currentRanking);
        emptyMessage.style.display = 'none';
    });
}