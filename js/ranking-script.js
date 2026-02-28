const API_BASE = 'https://copadesoftware-r000.onrender.com';
const RANKING_ENDPOINT = '/ranking';
const SSE_ENDPOINT = '/ranking/stream';

const loader = document.getElementById('rankLoader');
const emptyMessage = document.getElementById('rankEmpty');
const rankRowsContainer = document.getElementById('rankRows');

let currentRanking = [];
let previousRanking = [];

const RANK_ANIM_MS = 1200;
let isAnimating = false;
let pendingRanking = null;

function buildOverlayHTML(type) {
    if (type === 'up') {
        return `
      <div class="pacman-overlay">
        <div class="pacman"></div>
        <div class="dots"><div class="dot"></div></div>
      </div>
    `;
    }
    if (type === 'down') {
        return `
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
      </div>
    `;
    }
    return '';
}

function ensureShimmer(row) {
    let shimmer = row.querySelector('.rank-shimmer');
    if (!shimmer) {
        shimmer = document.createElement('span');
        shimmer.className = 'rank-shimmer';
        row.appendChild(shimmer);
    }
    row.classList.add('rank-shimmering');
}

function removeShimmer(row) {
    row.classList.remove('rank-shimmering');
    const shimmer = row.querySelector('.rank-shimmer');
    if (shimmer) shimmer.remove();
}

function buildRowEl(team, position, prevMap, rankUp, rankDown) {
    const row = document.createElement('div');
    row.className = 'table-row';
    row.dataset.teamId = String(team.teamId);
    row.style.setProperty('--rankDur', `${RANK_ANIM_MS}ms`);

    const crown = position === 1 ? '<i class="fa-solid fa-crown"></i> ' : '';
    const prev = prevMap[team.teamId];
    const prevTotal = prev ? prev.total : team.total;
    const changed = !!prev && prevTotal !== team.total;
    const dirClass = changed ? (team.total > prevTotal ? ' score-up' : ' score-down') : '';

    const isUp = rankUp.has(team.teamId);
    const isDown = rankDown.has(team.teamId);

    if (isUp) row.classList.add('rank-up');
    if (isDown) row.classList.add('rank-down');

    const overlayHTML = isUp ? buildOverlayHTML('up') : isDown ? buildOverlayHTML('down') : '';

    const scoreHTML = changed
        ? `<span class="col-score${dirClass}" data-old="${prevTotal}" data-new="${team.total}"><span class="score-text">${team.total}</span></span>`
        : `<span class="col-score"><span class="score-text">${team.total}</span></span>`;

    row.innerHTML = `
    ${overlayHTML}
    <span class="col-pos">${crown}${String(position).padStart(2, '0')}</span>
    <span class="col-name">${team.teamName || 'Time ' + team.teamId}</span>
    ${scoreHTML}
  `;
    return row;
}

function animateScoreCells() {
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
            const st = cell.querySelector('.score-text');
            if (st) st.textContent = newValue;
        }, 1500);

        setTimeout(() => {
            cell.classList.remove('hold');
            cell.classList.add('revert');
        }, 2500);

        setTimeout(() => {
            cell.classList.remove('revert', 'score-up', 'score-down');
            const st = cell.querySelector('.score-text');
            if (st) st.textContent = newValue;
        }, 3200);
    });
}

function flipAnimate(oldRects, rankUpSet) {
    rankRowsContainer.querySelectorAll('.table-row').forEach(el => {
        const id = el.dataset.teamId;
        const oldRect = oldRects.get(id);
        if (!oldRect) return;

        const newRect = el.getBoundingClientRect();
        const dy = Math.round(oldRect.top - newRect.top);

        if (Math.abs(dy) > 0.5) {
            const isUp = rankUpSet.has(Number(id));
            if (isUp) ensureShimmer(el);

            el.classList.remove('moving');
            el.style.transform = `translateY(${dy}px)`;
            void el.offsetWidth;
            el.classList.add('moving');
            el.style.transform = 'translateY(0)';

            setTimeout(() => {
                el.classList.remove('moving');
                el.style.transform = '';
                if (isUp) removeShimmer(el);
            }, RANK_ANIM_MS + 30);
        } else {
            removeShimmer(el);
        }
    });
}

function renderRanking(ranking) {
    if (!ranking || ranking.length === 0) {
        emptyMessage.style.display = 'flex';
        rankRowsContainer.innerHTML = '';
        previousRanking = [];
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

    const anyMove = previousRanking.length > 0 && (rankUp.size > 0 || rankDown.size > 0);
    if (anyMove) {
        isAnimating = true;
        setTimeout(() => {
            isAnimating = false;
        }, RANK_ANIM_MS + 140);
    }

    const oldRects = new Map();
    rankRowsContainer.querySelectorAll('.table-row').forEach(el => {
        oldRects.set(el.dataset.teamId, el.getBoundingClientRect());
    });

    const existing = new Map();
    rankRowsContainer.querySelectorAll('.table-row').forEach(el => {
        existing.set(Number(el.dataset.teamId), el);
    });

    const frag = document.createDocumentFragment();

    ranking.forEach((team, index) => {
        const position = index + 1;
        let row = existing.get(team.teamId);

        const prev = prevMap[team.teamId];
        const prevTotal = prev ? prev.total : team.total;
        const changed = !!prev && prevTotal !== team.total;
        const dirClass = changed ? (team.total > prevTotal ? ' score-up' : ' score-down') : '';
        const isUp = rankUp.has(team.teamId);
        const isDown = rankDown.has(team.teamId);

        if (!row) {
            row = buildRowEl(team, position, prevMap, rankUp, rankDown);
        } else {
            removeShimmer(row);

            row.classList.remove('rank-up', 'rank-down');
            if (isUp) row.classList.add('rank-up');
            if (isDown) row.classList.add('rank-down');
            row.style.setProperty('--rankDur', `${RANK_ANIM_MS}ms`);

            const crown = position === 1 ? '<i class="fa-solid fa-crown"></i> ' : '';
            const posEl = row.querySelector('.col-pos');
            if (posEl) posEl.innerHTML = `${crown}${String(position).padStart(2, '0')}`;

            const nameEl = row.querySelector('.col-name');
            if (nameEl) nameEl.textContent = team.teamName || ('Time ' + team.teamId);

            const overlay = row.querySelector('.pacman-overlay, .ghost-overlay');
            if (overlay) overlay.remove();
            if (isUp) row.insertAdjacentHTML('afterbegin', buildOverlayHTML('up'));
            if (isDown) row.insertAdjacentHTML('afterbegin', buildOverlayHTML('down'));

            const scoreWrap = row.querySelector('.col-score');
            if (scoreWrap) {
                if (changed) {
                    scoreWrap.className = `col-score${dirClass}`;
                    scoreWrap.setAttribute('data-old', String(prevTotal));
                    scoreWrap.setAttribute('data-new', String(team.total));
                    const st = scoreWrap.querySelector('.score-text');
                    if (st) st.textContent = String(team.total);
                } else {
                    scoreWrap.className = 'col-score';
                    scoreWrap.removeAttribute('data-old');
                    scoreWrap.removeAttribute('data-new');
                    const st = scoreWrap.querySelector('.score-text');
                    if (st) st.textContent = String(team.total);
                }
            }
        }

        frag.appendChild(row);
    });

    existing.forEach((el, teamId) => {
        if (!ranking.some(t => t.teamId === teamId)) el.remove();
    });

    rankRowsContainer.innerHTML = '';
    rankRowsContainer.appendChild(frag);

    flipAnimate(oldRects, rankUp);
    animateScoreCells();

    rankRowsContainer.querySelectorAll('.table-row.rank-up, .table-row.rank-down').forEach(row => {
        setTimeout(() => {
            const overlay = row.querySelector('.pacman-overlay, .ghost-overlay');
            if (overlay) overlay.remove();
            row.classList.remove('rank-up', 'rank-down');
        }, RANK_ANIM_MS + 80);
    });

    previousRanking = ranking.map(t => ({ ...t }));
}

function safeRender(ranking) {
    if (isAnimating) {
        pendingRanking = ranking;
        return;
    }
    renderRanking(ranking);
}

setInterval(() => {
    if (!isAnimating && pendingRanking) {
        const r = pendingRanking;
        pendingRanking = null;
        renderRanking(r);
    }
}, 120);

async function fetchInitialRanking() {
    try {
        const response = await fetch(API_BASE + RANKING_ENDPOINT);
        if (!response.ok) throw new Error();
        const json = await response.json();
        const ranking = json && json.success ? json.data : json;
        currentRanking = Array.isArray(ranking) ? ranking : [];
        renderRanking(currentRanking);
    } catch {
        emptyMessage.style.display = 'flex';
        rankRowsContainer.innerHTML = '';
        previousRanking = [];
    } finally {
        if (loader) loader.style.display = 'none';
    }
}

function setupSSE() {
    try {
        const eventSource = new EventSource(API_BASE + SSE_ENDPOINT);
        eventSource.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const ranking = Array.isArray(data) ? data : (data && data.data ? data.data : []);
                currentRanking = Array.isArray(ranking) ? ranking : [];
                safeRender(currentRanking);
            } catch { }
        };
        eventSource.onerror = () => { };
    } catch { }
}

document.addEventListener('DOMContentLoaded', () => {
    fetchInitialRanking();
    setupSSE();
});

const searchInput = document.getElementById('rankSearch');
const resetBtn = document.getElementById('resetSearch');

if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        const term = (e.target.value || '').toLowerCase();
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