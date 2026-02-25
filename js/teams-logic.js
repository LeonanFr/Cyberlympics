(function () {
    const grid = document.getElementById('teamsGrid');
    const input = document.getElementById('searchAll');
    const reset = document.getElementById('resetTeams');
    const teamsEmpty = document.getElementById('teamsEmpty');
    const searchEmpty = document.getElementById('searchEmpty');

    if (!grid || !input) return;

    /*
     * A lista de times será preenchida via API.
     * Exemplo esperado de retorno:
     * [
     *   {
     *     name: "Nome do Time",
     *     members: [
     *       { name: "Aluno 1", sem: "4º" },
     *       { name: "Aluno 2", sem: "6º" }
     *     ]
     *   }
     * ]
     */
    let teams = [];

    function renderTeams(filter = '') {
        grid.innerHTML = '';
        const query = filter.toLowerCase();

        if (teams.length === 0) {
            grid.style.display = 'none';
            if (teamsEmpty) teamsEmpty.style.display = 'block';
            if (searchEmpty) searchEmpty.style.display = 'none';
            return;
        }

        const filtered = teams.filter(team => {
            const matchName = team.name.toLowerCase().includes(query);
            const matchMember = team.members.some(m =>
                m.name.toLowerCase().includes(query) ||
                m.sem.toLowerCase().includes(query)
            );
            return matchName || matchMember;
        });

        if (query.length > 0 && filtered.length === 0) {
            grid.style.display = 'none';
            if (teamsEmpty) teamsEmpty.style.display = 'none';
            if (searchEmpty) searchEmpty.style.display = 'block';
            return;
        }

        grid.style.display = 'grid';
        if (teamsEmpty) teamsEmpty.style.display = 'none';
        if (searchEmpty) searchEmpty.style.display = 'none';

        filtered.forEach(team => {
            const card = document.createElement('div');
            card.className = 'team-card';

            const membersHtml = team.members.map(m => `
                <div class="member-item">
                    <span class="m-name">${m.name}</span>
                    <span class="m-info">${m.sem} Semestre</span>
                </div>
            `).join('');

            card.innerHTML = `
                <div class="team-header">
                    <div class="team-icon"><i class="fa-solid fa-code"></i></div>
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

            grid.appendChild(card);
        });
    }

    input.addEventListener('input', (e) => renderTeams(e.target.value));

    if (reset) {
        reset.addEventListener('click', () => {
            input.value = '';
            renderTeams();
            input.focus();
        });
    }

    renderTeams();
})();

(function () {
    const tbody = document.getElementById('participantsTableBody');
    const search = document.getElementById('participantSearch');
    const empty = document.getElementById('participantsEmpty');
    const searchEmpty = document.getElementById('participantsSearchEmpty');
    const table = document.querySelector('#participantsTableBox table');

    if (!tbody || !search || !table) return;

    /*
     * A lista de participantes será preenchida via API.
     * Exemplo esperado de retorno:
     * [
     *   {
     *     name: "Nome do Aluno",
     *     matricula: "202312345",
     *     semester: 3
     *   }
     * ]
     */
    let participants = [];

    function renderParticipants(filter = '') {
        tbody.innerHTML = '';
        const query = filter.toLowerCase();

        if (participants.length === 0) {
            table.style.display = 'none';
            empty.style.display = 'block';
            searchEmpty.style.display = 'none';
            return;
        }

        const filtered = participants.filter(p =>
            p.name.toLowerCase().includes(query) ||
            p.matricula.includes(query) ||
            `${p.semester}`.includes(query)
        );

        if (query && filtered.length === 0) {
            table.style.display = 'none';
            empty.style.display = 'none';
            searchEmpty.style.display = 'block';
            return;
        }

        table.style.display = 'table';
        empty.style.display = 'none';
        searchEmpty.style.display = 'none';

        filtered.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.name}</td>
                <td>${p.matricula}</td>
                <td>${p.semester}º</td>
            `;
            tbody.appendChild(tr);
        });
    }

    search.addEventListener('input', e => renderParticipants(e.target.value));

    renderParticipants();
})();