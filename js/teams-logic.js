(function () {
    const grid = document.getElementById('teamsGrid');
    const input = document.getElementById('searchAll');
    const reset = document.getElementById('resetTeams');
    const teamsEmpty = document.getElementById('teamsEmpty');
    const searchEmpty = document.getElementById('searchEmpty');

    if (!grid || !input) return;

    const mockTeams = [
        {
            name: "Bit Hunters",
            members: [
                { name: "João Silva", sem: "4º" },
                { name: "Maria Souza", sem: "2º" },
                { name: "Pedro Rocha", sem: "6º" }
            ]
        },
        {
            name: "Kernel Panic",
            members: [
                { name: "Lucas Lima", sem: "8º" },
                { name: "Ana Costa", sem: "8º" },
                { name: "Carlos Oliveira", sem: "7º" }
            ]
        }
    ];

    function renderTeams(filter = '') {
        grid.innerHTML = '';
        const query = filter.toLowerCase();

        if (mockTeams.length === 0) {
            grid.style.display = 'none';
            if (teamsEmpty) teamsEmpty.style.display = 'block';
            if (searchEmpty) searchEmpty.style.display = 'none';
            return;
        }

        const filtered = mockTeams.filter(team => {
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