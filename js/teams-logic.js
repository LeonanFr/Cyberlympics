(function () {
    const API_BASE = 'https://copa-de-software.onrender.com';
    const TEAMS_ENDPOINT = '/teams?status=approved';

    const desktopContainer = document.getElementById('teamsDesktop');
    const mobileContainer = document.getElementById('teamMobileCard');

    const input = document.getElementById('searchAll');
    const reset = document.getElementById('resetTeams');

    const teamsEmpty = document.getElementById('teamsEmpty');
    const searchEmpty = document.getElementById('searchEmpty');
    const loader = document.getElementById('teamsLoader');

    const prevBtn = document.getElementById('teamPrevCard');
    const nextBtn = document.getElementById('teamNextCard');
    const cardIndex = document.getElementById('teamCardIndex');

    if (!desktopContainer || !mobileContainer) return;

    let teams = [];
    let filteredTeams = [];
    let currentMobileIndex = 0;

    const mediaQuery = window.matchMedia('(max-width: 640px)');

    function isMobile() {
        return mediaQuery.matches;
    }

    async function fetchTeams() {
        try {
            const response = await fetch(API_BASE + TEAMS_ENDPOINT);
            if (!response.ok) throw new Error();

            const json = await response.json();
            teams = json.success ? json.data : json;

            loader.style.display = 'none';
            renderTeams();
        } catch (error) {
            loader.style.display = 'none';
            teamsEmpty.innerHTML =
                '<i class="fa-solid fa-triangle-exclamation"></i> Erro ao carregar times.';
            teamsEmpty.style.display = 'block';
        }
    }

    function renderTeams(filter = '') {
        const query = filter.toLowerCase();

        if (!teams || teams.length === 0) {
            teamsEmpty.style.display = 'block';
            searchEmpty.style.display = 'none';
            return;
        }

        filteredTeams = teams.filter(team => {
            const matchName = team.name.toLowerCase().includes(query);
            const matchMember =
                team.participantData?.some(m =>
                    m.nome.toLowerCase().includes(query) ||
                    m.semestre.toString().includes(query)
                ) || false;

            return matchName || matchMember;
        });

        if (query.length > 0 && filteredTeams.length === 0) {
            teamsEmpty.style.display = 'none';
            searchEmpty.style.display = 'block';
            clearContainers();
            return;
        }

        teamsEmpty.style.display = 'none';
        searchEmpty.style.display = 'none';

        currentMobileIndex = 0;
        updateView();
    }

    function updateView() {
        desktopContainer.innerHTML = '';
        mobileContainer.innerHTML = '';

        if (isMobile()) {
            renderMobile(currentMobileIndex);
        } else {
            renderDesktop();
        }
    }

    function clearContainers() {
        desktopContainer.innerHTML = '';
        mobileContainer.innerHTML = '';
    }

    function renderDesktop() {
        filteredTeams.forEach(team => {
            desktopContainer.appendChild(createTeamCard(team));
        });
    }

    function renderMobile(index) {
        if (!filteredTeams.length) return;

        const wasExpanded = mobileContainer.querySelector('.team-card')?.classList.contains('expanded');

        mobileContainer.innerHTML = '';

        if (index < 0) index = 0;
        if (index >= filteredTeams.length) index = filteredTeams.length - 1;

        currentMobileIndex = index;

        const team = filteredTeams[index];
        const card = createTeamCard(team);

        if (wasExpanded) card.classList.add('expanded');

        mobileContainer.appendChild(card);

        if (cardIndex) {
            cardIndex.textContent = `${index + 1} / ${filteredTeams.length}`;
        }

        if (prevBtn) {
            prevBtn.disabled = index === 0;
        }

        if (nextBtn) {
            nextBtn.disabled = index === filteredTeams.length - 1;
        }
    }

    function createTeamCard(team) {
        const card = document.createElement('div');
        card.className = 'team-card';

        const membersHtml =
            team.participantData?.map(m => `
                <div class="member-item">
                    <span class="m-name">${m.nome}</span>
                    <span class="m-info">${m.semestre}º Semestre</span>
                </div>
            `).join('') || '';

        card.innerHTML = `
            <div class="team-header">
                <div class="team-icon">
                    <i class="fa-solid fa-code"></i>
                </div>
                <h3>${team.name}</h3>
                <i class="fa-solid fa-chevron-down expand-icon"></i>
            </div>
            <div class="team-body">
                ${membersHtml}
            </div>
        `;

        card.addEventListener('click', () => {
            card.classList.toggle('expanded');
        });

        return card;
    }

    if (prevBtn) {
        prevBtn.addEventListener('click', () => {
            if (currentMobileIndex > 0) {
                currentMobileIndex--;
                renderMobile(currentMobileIndex);
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', () => {
            if (currentMobileIndex < filteredTeams.length - 1) {
                currentMobileIndex++;
                renderMobile(currentMobileIndex);
            }
        });
    }

    if (input) {
        input.addEventListener('input', e => {
            renderTeams(e.target.value);
        });
    }

    if (reset) {
        reset.addEventListener('click', () => {
            input.value = '';
            renderTeams();
            input.focus();
        });
    }

    mediaQuery.addEventListener('change', () => {
        updateView();
    });

    fetchTeams();
})();