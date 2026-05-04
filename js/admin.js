(function () {
    const API_BASE = 'https://copa-de-software.onrender.com';
    const ORCHESTRATOR_URL = 'https://orquestradoralgoritmos-sfjr.onrender.com';
    const ORCHESTRATOR_TOKEN = 'cWcG1T82qiJk';

    const loginSection = document.getElementById('loginSection');
    const adminPanel = document.getElementById('adminPanel');
    const loginForm = document.getElementById('loginForm');
    const loginError = document.getElementById('loginError');

    let checkinList = [];
    let participantsList = [];
    let currentParticipantSubTab = null;
    let quickRoundActive = false;
    let quickTeams = [];
    let selectedTeamIds = new Set();

    async function apiRequest(url, options = {}) {
        const token = localStorage.getItem('adminToken');
        const headers = { ...(options.headers || {}) };
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }

        const response = await fetch(API_BASE + url, {
            ...options,
            headers
        });

        if (response.status === 401) {
            localStorage.removeItem('adminToken');
            loginSection.style.display = 'flex';
            adminPanel.style.display = 'none';
            loginError.textContent = 'Sessão expirada. Faça login novamente';
            loginError.style.display = 'block';
            throw new Error('Sessão expirada');
        }

        return response;
    }

    const token = localStorage.getItem('adminToken');
    if (token) {
        loginSection.style.display = 'none';
        adminPanel.style.display = 'block';
        loadAllSections();
    }

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(API_BASE + '/admin/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || 'Erro no login');
            }

            localStorage.setItem('adminToken', json.data.token);
            loginSection.style.display = 'none';
            adminPanel.style.display = 'block';
            loadAllSections();
        } catch (err) {
            loginError.textContent = err.message;
            loginError.style.display = 'block';
        }
    });

    const tabBtns = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const tab = btn.dataset.tab;

            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            tabContents.forEach(content => content.classList.remove('active'));
            document.getElementById(`tab-${tab}`).classList.add('active');

            if (tab === 'teams') loadPendingTeams();
            if (tab === 'active-teams') loadActiveTeams();
            if (tab === 'participants') loadParticipantsAdmin();
            if (tab === 'teamnames') loadAvailableNames();
            if (tab === 'reserves') loadReserves();
            if (tab === 'score') loadTeamsForSelect();
            if (tab === 'relay') loadRelayTournaments();
            if (tab === 'checkin') loadCheckinData();
        });
    });

    document.querySelectorAll('#scoreSubTabs .sub-tab-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#scoreSubTabs .sub-tab-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            document.querySelectorAll('#tab-score .sub-content').forEach(c => c.classList.remove('active'));
            document.getElementById(`sub-${btn.dataset.subtab}`).classList.add('active');

            if (btn.dataset.subtab === 'quick' && !quickRoundActive) {
                loadQuickTeams();
            }
        });
    });

    function loadAllSections() {
        loadPendingTeams();
        loadActiveTeams();
        loadParticipantsAdmin();
        loadAvailableNames();
        loadReserves();
        loadTeamsForSelect();
        loadRelayTournaments();
        loadQuickTeams();
        loadCheckinData();
    }

    async function loadPendingTeams() {
        const loader = document.getElementById('pendingTeamsLoader');
        const empty = document.getElementById('pendingTeamsEmpty');
        const list = document.getElementById('pendingTeamsList');

        loader.style.display = 'flex';
        list.innerHTML = '';

        try {
            const response = await apiRequest('/teams?status=pending');
            if (!response.ok) throw new Error('Erro ao carregar times');
            const json = await response.json();
            const teams = json.success ? json.data : json;

            loader.style.display = 'none';

            if (!teams || teams.length === 0) {
                empty.style.display = 'block';
                return;
            }

            empty.style.display = 'none';

            teams.forEach(team => {
                const card = document.createElement('div');
                card.className = 'pending-team-card';

                const membersHtml = (team.participantData || []).map(m =>
                    `<p>${m.nome} (${m.matricula}) - ${m.semestre}º semestre</p>`
                ).join('') || '<p>Sem dados de participantes</p>';

                card.innerHTML = `
                    <div class="pending-team-header">
                        <h3>${team.name}</h3>
                        <div class="pending-team-actions">
                            <button class="btn-neon btn-small" data-id="${team.id}" data-action="approve">Aprovar</button>
                            <button class="btn-ghost btn-small" data-id="${team.id}" data-action="reject">Rejeitar</button>
                        </div>
                    </div>
                    <div class="pending-team-members">
                        ${membersHtml}
                    </div>
                `;

                list.appendChild(card);
            });

            document.querySelectorAll('[data-action="approve"]').forEach(btn => {
                btn.addEventListener('click', () => approveTeam(btn.dataset.id));
            });
            document.querySelectorAll('[data-action="reject"]').forEach(btn => {
                btn.addEventListener('click', () => rejectTeam(btn.dataset.id));
            });

        } catch (err) {
            loader.style.display = 'none';
            empty.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Erro ao carregar.';
            empty.style.display = 'block';
        }
    }

    async function approveTeam(teamId) {
        if (!confirm('Aprovar este time?')) return;
        try {
            const response = await apiRequest(`/admin/teams/${teamId}/approve`, { method: 'POST' });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao aprovar');
            }
            loadPendingTeams();
            loadActiveTeams();
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    }

    async function rejectTeam(teamId) {
        if (!confirm('Rejeitar este time?')) return;
        try {
            const response = await apiRequest(`/admin/teams/${teamId}/reject`, { method: 'POST' });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao rejeitar');
            }
            loadPendingTeams();
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    }

    document.getElementById('manualTeamForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const matriculas = [
            document.getElementById('mat1').value.trim(),
            document.getElementById('mat2').value.trim(),
            document.getElementById('mat3').value.trim()
        ];

        const resultDiv = document.getElementById('manualTeamResult');
        resultDiv.style.display = 'none';

        try {
            const response = await apiRequest('/admin/teams', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ matriculas })
            });

            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || 'Erro ao criar time');
            }

            resultDiv.className = 'form-alert';
            resultDiv.textContent = `Time criado com sucesso! Nome: ${json.data.name}`;
            resultDiv.style.display = 'block';
            document.getElementById('manualTeamForm').reset();
            loadPendingTeams();
        } catch (err) {
            resultDiv.className = 'form-error';
            resultDiv.textContent = err.message;
            resultDiv.style.display = 'block';
        }
    });

    async function loadActiveTeams() {
        const list = document.getElementById('activeTeamsList');
        list.innerHTML = '<div class="rank-loader" style="display:flex;"><p>Carregando...</p></div>';

        try {
            const response = await fetch(API_BASE + '/teams?status=approved');
            if (!response.ok) throw new Error('Erro ao carregar');
            const json = await response.json();
            const teams = json.success ? json.data : json;

            if (!teams || teams.length === 0) {
                list.innerHTML = '<p class="text-muted">Nenhum time aprovado.</p>';
                return;
            }

            list.innerHTML = '';

            teams.forEach(team => {
                const card = document.createElement('div');
                card.className = 'team-card';

                const header = document.createElement('div');
                header.className = 'team-header';

                const titleDiv = document.createElement('div');
                titleDiv.style.display = 'flex';
                titleDiv.style.alignItems = 'center';
                titleDiv.style.gap = '10px';
                titleDiv.innerHTML = `
                <div class="team-icon"><i class="fa-solid fa-code"></i></div>
                <h3>${team.name} (${team.code || 'sem código'})</h3>
            `;

                const cancelBtn = document.createElement('button');
                cancelBtn.className = 'btn-ghost btn-small';
                cancelBtn.textContent = 'Cancelar Time';
                cancelBtn.onclick = (e) => {
                    e.stopPropagation();
                    cancelTeam(team.id);
                };

                const expandIcon = document.createElement('i');
                expandIcon.className = 'fa-solid fa-chevron-down expand-icon';

                header.appendChild(titleDiv);
                header.appendChild(cancelBtn);
                header.appendChild(expandIcon);

                const body = document.createElement('div');
                body.className = 'team-body';

                if (team.participantData && team.participantData.length) {
                    body.innerHTML = team.participantData.map(m =>
                        `<div class="member-item">
                        <span class="m-name">${m.nome}</span>
                        <span class="m-info">${m.matricula} · ${m.semestre}º semestre</span>
                    </div>`
                    ).join('');
                } else {
                    body.innerHTML = '<p class="text-muted">Sem dados de participantes</p>';
                }

                card.addEventListener('click', (e) => {
                    if (e.target.closest('button')) return;
                    card.classList.toggle('expanded');
                    const icon = card.querySelector('.expand-icon');
                    if (icon) {
                        icon.style.transform = card.classList.contains('expanded') ? 'rotate(180deg)' : 'rotate(0)';
                    }
                });

                card.appendChild(header);
                card.appendChild(body);
                list.appendChild(card);
            });

        } catch (err) {
            list.innerHTML = `<p class="form-error">${err.message}</p>`;
        }
    }

    window.cancelTeam = async (teamId) => {
        if (!confirm('Tem certeza que deseja cancelar este time? Os participantes serão liberados.')) return;
        try {
            const response = await apiRequest(`/admin/teams/${teamId}/cancel`, { method: 'POST' });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao cancelar');
            }
            loadActiveTeams();
            loadPendingTeams();
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    };

    async function loadParticipantsAdmin() {
        const subTabsContainer = document.getElementById('participantSubTabs');
        const listContainer = document.getElementById('participantsListAdmin');

        subTabsContainer.innerHTML = '';
        listContainer.innerHTML = '<div class="rank-loader" style="display:flex;"><p>Carregando...</p></div>';

        try {
            const [teamsRes, partsRes] = await Promise.all([
                fetch(API_BASE + '/teams?status=approved'),
                fetch(API_BASE + '/participants')
            ]);

            if (!teamsRes.ok || !partsRes.ok) throw new Error('Erro ao carregar dados');

            const teamsJson = await teamsRes.json();
            const teams = teamsJson.success ? teamsJson.data : teamsJson;

            const partsJson = await partsRes.json();
            const participants = partsJson.success ? partsJson.data : partsJson;

            const matriculaToTeamId = new Map();
            if (teams) {
                teams.forEach(team => {
                    if (team.participantData) {
                        team.participantData.forEach(member => {
                            matriculaToTeamId.set(member.matricula, team.id);
                        });
                    }
                });
            }

            const teamMap = new Map();
            const noTeam = [];

            participants.forEach(p => {
                const teamId = matriculaToTeamId.get(p.matricula);
                if (teamId) {
                    if (!teamMap.has(teamId)) teamMap.set(teamId, []);
                    teamMap.get(teamId).push(p);
                } else {
                    noTeam.push(p);
                }
            });

            const subTabDefs = [];
            if (teams && teams.length) {
                teams.forEach(team => {
                    subTabDefs.push({
                        id: team.id,
                        label: team.name,
                        participants: teamMap.get(team.id) || []
                    });
                });
            }
            subTabDefs.push({ id: 'none', label: 'Sem Time', participants: noTeam });

            subTabsContainer.innerHTML = '';
            subTabDefs.forEach(def => {
                const btn = document.createElement('button');
                btn.className = 'sub-tab-btn';
                btn.dataset.tab = def.id;
                btn.textContent = def.label;
                btn.addEventListener('click', () => switchParticipantSubTab(def.id, subTabDefs));
                subTabsContainer.appendChild(btn);
            });

            const activeId = currentParticipantSubTab && subTabDefs.some(d => d.id === currentParticipantSubTab)
                ? currentParticipantSubTab
                : (subTabDefs[0]?.id || 'none');

            switchParticipantSubTab(activeId, subTabDefs);

        } catch (err) {
            subTabsContainer.innerHTML = '';
            listContainer.innerHTML = `<p class="form-error">${err.message}</p>`;
        }
    }

    function switchParticipantSubTab(tabId, subTabDefs) {
        currentParticipantSubTab = tabId;

        document.querySelectorAll('#participantSubTabs .sub-tab-btn').forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabId);
        });

        const def = subTabDefs.find(d => d.id === tabId);
        const listContainer = document.getElementById('participantsListAdmin');

        if (!def) {
            listContainer.innerHTML = '<p class="text-muted">Nenhum participante encontrado.</p>';
            return;
        }

        const participants = def.participants;
        if (!participants || participants.length === 0) {
            listContainer.innerHTML = '<p class="text-muted">Nenhum participante neste grupo.</p>';
            return;
        }

        listContainer.innerHTML = participants.map(p => `
            <div class="participant-admin-item">
                <span><strong>${p.nome}</strong> (${p.matricula}) - ${p.semestre}º</span>
                <div>
                    <button class="btn-ghost btn-small" onclick="editParticipant('${p.matricula}')">Editar</button>
                    <button class="btn-ghost btn-small" onclick="cancelParticipant('${p.matricula}')">Cancelar</button>
                </div>
            </div>
        `).join('');
    }

    window.editParticipant = (matricula) => {
        const novoNome = prompt('Novo nome:');
        if (!novoNome) return;
        const novoSemestre = prompt('Novo semestre (1-8):');
        if (!novoSemestre || isNaN(novoSemestre) || novoSemestre < 1 || novoSemestre > 8) {
            alert('Semestre inválido');
            return;
        }

        fetch(API_BASE + `/admin/participants/${matricula}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
            },
            body: JSON.stringify({ nome: novoNome, semestre: parseInt(novoSemestre) })
        })
            .then(res => res.json())
            .then(json => {
                if (!json.success) throw new Error(json.error);
                loadParticipantsAdmin();
            })
            .catch(err => alert('Erro: ' + err.message));
    };

    window.cancelParticipant = (matricula) => {
        if (!confirm(`Cancelar (remover) o participante ${matricula}?`)) return;

        fetch(API_BASE + `/admin/participants/${matricula}/cancel`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${localStorage.getItem('adminToken')}` }
        })
            .then(res => res.json())
            .then(json => {
                if (!json.success) throw new Error(json.error);
                loadParticipantsAdmin();
            })
            .catch(err => alert('Erro: ' + err.message));
    };

    async function loadAvailableNames() {
        const container = document.getElementById('availableNames');
        try {
            const response = await apiRequest('/admin/team-names/available');
            if (!response.ok) throw new Error('Erro ao carregar');
            const json = await response.json();
            const names = json.success ? json.data : json;

            if (!names || names.length === 0) {
                container.innerHTML = '<p class="text-muted">Nenhum nome disponível. Adicione novos nomes acima.</p>';
                return;
            }

            container.innerHTML = names.map(n => `<span class="name-tag">${n.name}</span>`).join('');
        } catch (err) {
            container.innerHTML = '<p class="form-error">Erro ao carregar.</p>';
        }
    }

    document.getElementById('teamNameForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const name = document.getElementById('teamName').value.trim();
        if (!name) return;

        try {
            const response = await apiRequest('/admin/team-names', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao adicionar');
            }
            document.getElementById('teamName').value = '';
            loadAvailableNames();
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    });

    async function loadReserves() {
        const container = document.getElementById('reservesList');
        container.innerHTML = '<div class="rank-loader">Carregando...</div>';

        try {
            const response = await apiRequest('/admin/reserves');
            if (!response.ok) throw new Error('Erro ao carregar reservas');
            const json = await response.json();
            const reserves = json.success ? json.data : json;

            if (!reserves || reserves.length === 0) {
                container.innerHTML = '<p class="text-muted">Nenhum participante na reserva.</p>';
                return;
            }

            const reservesWithParticipants = await Promise.all(reserves.map(async (r) => {
                try {
                    const resp = await apiRequest(`/admin/participants/id/${r.participantId}`);
                    if (!resp.ok) return { ...r, nome: 'Desconhecido', matricula: r.participantId };
                    const json = await resp.json();
                    const p = json.success ? json.data : json;
                    return { ...r, nome: p.nome, matricula: p.matricula, semestre: p.semestre };
                } catch {
                    return { ...r, nome: 'Desconhecido', matricula: r.participantId };
                }
            }));

            container.innerHTML = reservesWithParticipants.map(r => `
                <div class="reserve-item">
                    <span class="reserve-info"><strong>${r.nome}</strong> (${r.matricula})</span>
                    <span class="reserve-semester">${r.semestre}º semestre</span>
                </div>
            `).join('');

        } catch (err) {
            container.innerHTML = `<p class="form-error">${err.message}</p>`;
        }
    }

    async function loadTeamsForSelect() {
        const select = document.getElementById('teamSelect');
        if (!select) return;

        select.innerHTML = '<option value="">Carregando...</option>';

        try {
            const response = await fetch(API_BASE + '/teams?status=approved');
            if (!response.ok) throw new Error('Erro ao carregar times');
            const json = await response.json();
            const teams = json.success ? json.data : json;

            if (!teams || teams.length === 0) {
                select.innerHTML = '<option value="">Nenhum time aprovado</option>';
                return;
            }

            select.innerHTML = teams.map(t =>
                `<option value="${t.id}">${t.name} (${t.code || 'sem código'})</option>`
            ).join('');
        } catch (err) {
            select.innerHTML = '<option value="">Erro ao carregar</option>';
        }
    }

    async function loadQuickTeams() {
        try {
            const response = await fetch(API_BASE + '/teams?status=approved');
            if (!response.ok) throw new Error('Erro ao carregar times');
            const json = await response.json();
            quickTeams = json.success ? json.data : json || [];
            renderQuickGrid();
        } catch (err) {
            console.error(err);
        }
    }

    function renderQuickGrid() {
        const grid = document.getElementById('quickGrid');
        if (!grid) return;

        grid.innerHTML = quickTeams.map(team => `
            <div class="team-row ${selectedTeamIds.has(team.id) ? 'selected' : ''}" data-team-id="${team.id}">
                <div class="team-info">
                    <div class="acerto-indicator">
                        ${selectedTeamIds.has(team.id) ? '<i class="fa-solid fa-check"></i>' : ''}
                    </div>
                    <span class="team-name">${team.name}</span>
                    ${team.code ? `<span class="team-code">${team.code}</span>` : ''}
                </div>
                <span class="text-muted" style="font-size:0.8rem;">
                    ${selectedTeamIds.has(team.id) ? 'Acerto registrado' : 'Clique para marcar acerto'}
                </span>
            </div>
        `).join('');

        grid.querySelectorAll('.team-row').forEach(row => {
            row.addEventListener('click', () => toggleTeamSelection(row.dataset.teamId));
        });
    }

    function toggleTeamSelection(teamId) {
        if (selectedTeamIds.has(teamId)) {
            selectedTeamIds.delete(teamId);
        } else {
            selectedTeamIds.add(teamId);
        }
        renderQuickGrid();
    }

    document.getElementById('startRoundBtn').addEventListener('click', () => {
        const modality = document.getElementById('quickModality').value;
        const description = document.getElementById('quickDescription').value.trim();
        const value = parseInt(document.getElementById('quickValue').value);

        if (!description) {
            alert('Informe a descrição do round.');
            return;
        }
        if (isNaN(value) || value <= 0) {
            alert('Valor do acerto deve ser positivo.');
            return;
        }

        quickRoundActive = true;
        document.getElementById('quickGridContainer').style.display = 'block';
        document.getElementById('startRoundBtn').style.display = 'none';
        document.getElementById('resetConfigBtn').style.display = 'inline-block';
        document.getElementById('quickModality').disabled = true;
        document.getElementById('quickDescription').disabled = true;
        document.getElementById('quickValue').disabled = true;

        if (quickTeams.length === 0) {
            loadQuickTeams();
        }
    });

    document.getElementById('resetConfigBtn').addEventListener('click', () => {
        if (selectedTeamIds.size > 0 && !confirm('Existem seleções não enviadas. Deseja resetar mesmo assim?')) return;
        resetQuickConfig();
    });

    function resetQuickConfig() {
        quickRoundActive = false;
        selectedTeamIds.clear();
        document.getElementById('quickGridContainer').style.display = 'none';
        document.getElementById('startRoundBtn').style.display = 'inline-block';
        document.getElementById('resetConfigBtn').style.display = 'none';
        document.getElementById('quickModality').disabled = false;
        document.getElementById('quickDescription').disabled = false;
        document.getElementById('quickValue').disabled = false;
        document.getElementById('batchResult').style.display = 'none';
        document.getElementById('batchResult').textContent = '';
        renderQuickGrid();
    }

    document.getElementById('selectAllBtn').addEventListener('click', () => {
        quickTeams.forEach(t => selectedTeamIds.add(t.id));
        renderQuickGrid();
    });

    document.getElementById('deselectAllBtn').addEventListener('click', () => {
        selectedTeamIds.clear();
        renderQuickGrid();
    });

    document.getElementById('submitBatchBtn').addEventListener('click', async () => {
        if (selectedTeamIds.size === 0) {
            alert('Selecione pelo menos um time.');
            return;
        }

        const modality = document.getElementById('quickModality').value;
        const description = document.getElementById('quickDescription').value.trim();
        const value = parseInt(document.getElementById('quickValue').value);

        const scores = [];
        selectedTeamIds.forEach(teamId => {
            const team = quickTeams.find(t => t.id === teamId);
            scores.push({
                teamId: teamId,
                value: value,
                origin: 'match',
                modality: modality,
                description: `${modality} - ${description} - Acerto`
            });
        });

        const batchResult = document.getElementById('batchResult');
        batchResult.style.display = 'none';
        document.getElementById('submitBatchBtn').disabled = true;
        document.getElementById('submitBatchBtn').innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Enviando...';

        try {
            const response = await apiRequest('/admin/ranking/scores/batch', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ scores })
            });

            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao enviar pontuações');
            }

            const json = await response.json();
            batchResult.className = 'form-alert';
            batchResult.textContent = `Sucesso! ${json.data?.processed || scores.length} pontuações registradas.`;
            batchResult.style.display = 'block';

            selectedTeamIds.clear();
            renderQuickGrid();

        } catch (err) {
            batchResult.className = 'form-error';
            batchResult.textContent = `Erro: ${err.message}. Nenhuma pontuação foi salva.`;
            batchResult.style.display = 'block';
        } finally {
            document.getElementById('submitBatchBtn').disabled = false;
            document.getElementById('submitBatchBtn').innerHTML = '<i class="fa-solid fa-paper-plane"></i> Enviar Pontuações do Round';
        }
    });

    document.getElementById('drawIntermediary').addEventListener('click', () => runDraw(false));
    document.getElementById('drawFinal').addEventListener('click', () => runDraw(true));

    async function runDraw(isFinal) {
        const resultDiv = document.getElementById('drawResult');
        resultDiv.style.display = 'block';
        resultDiv.innerHTML = '<p>Executando sorteio...</p>';
        try {
            const response = await apiRequest(`/admin/draw?final=${isFinal}`, { method: 'POST' });
            const json = await response.json();
            if (!response.ok) {
                throw new Error(json.error || 'Erro no sorteio');
            }

            const data = json.data || {};
            const message = data.message || 'Sorteio concluído';
            const remaining = data.remaining || [];

            let html = `<p><strong>${message}</strong></p>`;
            if (remaining.length > 0) {
                html += '<p>Participantes remanescentes:</p><ul>';
                remaining.forEach(p => {
                    html += `<li>${p.nome} (${p.matricula}) - ${p.semestre}º semestre</li>`;
                });
                html += '</ul>';
            } else {
                html += '<p>Nenhum participante remanescente.</p>';
            }

            resultDiv.innerHTML = html;
        } catch (err) {
            resultDiv.innerHTML = `<p class="form-error">${err.message}</p>`;
        }
    }

    document.getElementById('scoreForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const data = {
            teamId: document.getElementById('teamSelect').value,
            value: parseInt(document.getElementById('scoreValue').value),
            origin: document.getElementById('scoreOrigin').value,
            modality: document.getElementById('scoreModality').value,
            description: document.getElementById('scoreDescription').value
        };

        if (!data.teamId) {
            alert('Selecione um time.');
            return;
        }

        try {
            const response = await apiRequest('/admin/ranking/score', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao adicionar');
            }
            alert('Pontuação adicionada com sucesso!');
            document.getElementById('scoreForm').reset();
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    });

    document.getElementById('recalculateRankingBtn').addEventListener('click', async () => {
        const btn = document.getElementById('recalculateRankingBtn');
        const msgDiv = document.getElementById('recalcMessage');
        btn.disabled = true;
        msgDiv.style.display = 'none';

        try {
            const response = await apiRequest('/admin/ranking/recalculate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });

            msgDiv.className = 'form-alert';
            msgDiv.textContent = response.message || 'Recálculo iniciado!';
            msgDiv.style.display = 'block';

        } catch (err) {
            msgDiv.className = 'form-error';
            msgDiv.textContent = '❌ Erro: ' + err.message;
            msgDiv.style.display = 'block';
        } finally {
            btn.disabled = false;
        }
    });

    async function loadRelayTournaments() {
        const list = document.getElementById('relayTournamentsList');
        list.innerHTML = '<div class="rank-loader" style="display:flex;"><p>Buscando dados...</p></div>';

        try {
            const response = await fetch(`${ORCHESTRATOR_URL}/api/tournaments`, {
                headers: { 'Authorization': `Bearer ${ORCHESTRATOR_TOKEN}` }
            });

            if (!response.ok) throw new Error('Falha ao conectar com o Orquestrador');
            const json = await response.json();
            const tournaments = json.success ? json.data : json;

            if (!tournaments || tournaments.length === 0) {
                list.innerHTML = '<p class="text-muted">Nenhum torneio encontrado no orquestrador.</p>';
                return;
            }

            list.innerHTML = '';
            tournaments.forEach(t => {
                const isActive = t.status === 'active';
                const card = document.createElement('div');
                card.className = 'relay-card';
                card.innerHTML = `
                <div class="relay-card-info">
                    <h3>${t.name}</h3>
                    <p>ID: <code>${t.id}</code></p>
                    <span class="badge ${isActive ? 'bg-green' : 'bg-red'}">${t.status}</span>
                </div>
                <div class="relay-card-actions">
                    <button class="btn-neon btn-start-relay" data-id="${t.id}" ${isActive ? 'disabled' : ''}>
                        <i class="fa-solid ${isActive ? 'fa-check' : 'fa-play'}"></i> 
                        ${isActive ? 'Em Andamento' : 'Iniciar Torneio'}
                    </button>
                </div>
            `;
                list.appendChild(card);
            });

            document.querySelectorAll('.btn-start-relay').forEach(btn => {
                if (!btn.disabled) {
                    btn.addEventListener('click', () => startRelayTournament(btn.dataset.id, btn));
                }
            });

        } catch (err) {
            list.innerHTML = `<p class="form-error">Erro: ${err.message}</p>`;
        }
    }

    async function startRelayTournament(id, btn) {
        if (!confirm('Deseja iniciar o cronômetro e liberar o acesso para este torneio agora?')) return;

        const originalContent = btn.innerHTML;
        btn.disabled = true;
        btn.innerHTML = '<i class="fa-solid fa-spinner fa-spin"></i> Processando...';

        try {
            const response = await fetch(`${ORCHESTRATOR_URL}/admin/tournament/start`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${ORCHESTRATOR_TOKEN}`
                },
                body: JSON.stringify({ tournamentId: id })
            });

            if (!response.ok) throw new Error(await response.text());

            alert('Torneio iniciado com sucesso!');
            loadRelayTournaments();
        } catch (err) {
            alert('Erro ao iniciar: ' + err.message);
            btn.disabled = false;
            btn.innerHTML = originalContent;
        }
    }

    // ========== CHECK‑IN ==========

    async function loadCheckinData() {
        const checkinLoader = document.getElementById('checkinListLoader');
        const checkinEmpty = document.getElementById('checkinListEmpty');
        const checkinListEl = document.getElementById('checkinList');
        const pendingLoader = document.getElementById('pendingCheckinLoader');
        const pendingSubTabs = document.getElementById('pendingCheckinSubTabs');
        const pendingListEl = document.getElementById('pendingCheckinList');

        checkinLoader.style.display = 'flex';
        checkinEmpty.style.display = 'none';
        checkinListEl.innerHTML = '';
        pendingLoader.style.display = 'flex';
        pendingSubTabs.innerHTML = '';
        pendingListEl.innerHTML = '';

        try {
            const [checkinRes, participantsRes, teamsRes] = await Promise.all([
                apiRequest('/admin/checkin'),
                fetch(API_BASE + '/participants'),
                fetch(API_BASE + '/teams?status=approved')
            ]);

            const checkinJson = await checkinRes.json();
            const checkins = checkinJson.success ? checkinJson.data : checkinJson;
            checkinList = checkins || [];

            const partsJson = await participantsRes.json();
            const participants = partsJson.success ? partsJson.data : partsJson;
            participantsList = participants || [];

            const teamsJson = await teamsRes.json();
            const teams = teamsJson.success ? teamsJson.data : teamsJson || [];

            checkinLoader.style.display = 'none';
            if (checkinList.length === 0) {
                checkinEmpty.style.display = 'block';
            } else {
                checkinListEl.innerHTML = checkinList.map(c => {
                    const isCompetidor = c.tipo === 'competidor';
                    return `
                    <div class="checkin-item">
                        <span class="checkin-info">
                            ${escapeHtml(c.nome)}
                            <span class="tipo-badge ${isCompetidor ? 'competidor' : 'ouvinte'}">
                                ${isCompetidor ? 'Competidor' : 'Ouvinte'}
                            </span>
                        </span>
                        <button class="btn-ghost btn-small" onclick="removeCheckin('${c.id}')">
                            <i class="fa-solid fa-trash"></i> Remover
                        </button>
                    </div>
                `;
                }).join('');
            }

            pendingLoader.style.display = 'none';

            const matriculaToTeamId = new Map();
            const teamMap = new Map();
            if (teams) {
                teams.forEach(team => {
                    teamMap.set(team.id, { name: team.name, members: [] });
                    if (team.participantData) {
                        team.participantData.forEach(m => {
                            matriculaToTeamId.set(m.matricula, team.id);
                        });
                    }
                });
            }

            const checkedParticipantIds = new Set(
                checkinList.filter(c => c.participantId).map(c => c.participantId)
            );

            const noTeamPending = [];
            participantsList.forEach(p => {
                if (checkedParticipantIds.has(p.id)) return;

                const teamId = matriculaToTeamId.get(p.matricula);
                if (teamId && teamMap.has(teamId)) {
                    teamMap.get(teamId).members.push(p);
                } else {
                    noTeamPending.push(p);
                }
            });

            const subTabDefs = [];
            teamMap.forEach((info, teamId) => {
                if (info.members.length > 0) {
                    subTabDefs.push({
                        id: teamId,
                        label: info.name,
                        participants: info.members
                    });
                }
            });
            if (noTeamPending.length > 0) {
                subTabDefs.push({ id: 'none', label: 'Sem Time', participants: noTeamPending });
            }

            if (subTabDefs.length === 0) {
                pendingSubTabs.innerHTML = '';
                pendingListEl.innerHTML = '<p class="text-muted">Todos os competidores já fizeram check-in.</p>';
            } else {
                pendingSubTabs.innerHTML = subTabDefs.map((def, idx) => {
                    const activeClass = idx === 0 ? ' active' : '';
                    return `<button class="sub-tab-btn${activeClass}" data-pending-tab="${def.id}">${def.label}</button>`;
                }).join('');

                renderPendingGroup(subTabDefs[0]);

                pendingSubTabs.querySelectorAll('.sub-tab-btn').forEach(btn => {
                    btn.addEventListener('click', () => {
                        pendingSubTabs.querySelectorAll('.sub-tab-btn').forEach(b => b.classList.remove('active'));
                        btn.classList.add('active');
                        const def = subTabDefs.find(d => d.id === btn.dataset.pendingTab);
                        if (def) renderPendingGroup(def);
                    });
                });
            }

        } catch (err) {
            checkinLoader.style.display = 'none';
            pendingLoader.style.display = 'none';
            checkinListEl.innerHTML = '<p class="form-error">Erro ao carregar check-ins.</p>';
            pendingListEl.innerHTML = '<p class="form-error">Erro ao carregar participantes.</p>';
        }
    }

    function renderPendingGroup(def) {
        const listEl = document.getElementById('pendingCheckinList');
        if (!def || def.participants.length === 0) {
            listEl.innerHTML = '<p class="text-muted">Nenhum pendente neste grupo.</p>';
            return;
        }
        listEl.innerHTML = def.participants.map(p => `
        <div class="checkin-pending-item">
            <span>${escapeHtml(p.nome)}</span>
            <button class="btn-neon btn-small" onclick="checkinParticipant('${p.id}')">
                <i class="fa-solid fa-check"></i> Check-in
            </button>
        </div>
    `).join('');
    }

    window.checkinParticipant = async (participantId) => {
        try {
            const response = await apiRequest(`/admin/checkin/participant/${participantId}`, { method: 'POST' });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao realizar check-in');
            }
            loadCheckinData();
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    };

    window.removeCheckin = async (checkinId) => {
        if (!confirm('Remover este check-in?')) return;
        try {
            const response = await apiRequest(`/admin/checkin/${checkinId}`, { method: 'DELETE' });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao remover check-in');
            }
            loadCheckinData();
        } catch (err) {
            alert('Erro: ' + err.message);
        }
    };

    document.getElementById('checkinManualForm').addEventListener('submit', async (e) => {
        e.preventDefault();
        const nomeInput = document.getElementById('checkinManualName');
        const nome = nomeInput.value.trim();
        const resultDiv = document.getElementById('checkinManualResult');

        if (!nome) return;

        resultDiv.style.display = 'none';

        try {
            const response = await apiRequest('/admin/checkin/manual', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome })
            });
            if (!response.ok) {
                const err = await response.json();
                throw new Error(err.error || 'Erro ao adicionar');
            }

            resultDiv.className = 'form-alert';
            resultDiv.textContent = 'Ouvinte/ajudante adicionado com sucesso!';
            resultDiv.style.display = 'block';
            nomeInput.value = '';
            loadCheckinData();
        } catch (err) {
            resultDiv.className = 'form-error';
            resultDiv.textContent = 'Erro: ' + err.message;
            resultDiv.style.display = 'block';
        }
    });

    if (typeof escapeHtml === 'undefined') {
        function escapeHtml(str) {
            if (!str) return '';
            return str.replace(/[&<>"']/g, m => ({
                '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
            })[m]);
        }
    }

    function gerarCSV() {
        if (!checkinList || checkinList.length === 0) {
            alert('Nenhum check-in registrado para exportar.');
            return;
        }
        const header = 'Nome,Tipo,Data/Hora';
        const rows = checkinList.map(c => {
            const nome = c.nome.replace(/"/g, '""');
            const tipo = c.tipo === 'competidor' ? 'Competidor' : 'Ouvinte/Ajudante';
            const data = c.createdAt ? new Date(c.createdAt).toLocaleString('pt-BR') : '';
            return `"${nome}","${tipo}","${data}"`;
        });
        const csvContent = [header, ...rows].join('\n');
        const blob = new Blob(['\uFEFF' + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = 'checkin_copa_software.csv';
        a.click();
        URL.revokeObjectURL(url);
    }

    document.getElementById('downloadCheckinCsv').addEventListener('click', gerarCSV);

    document.getElementById('refreshRelay').addEventListener('click', loadRelayTournaments);
})();