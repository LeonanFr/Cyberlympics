(function () {
    const API_BASE = 'https://copadesoftware-r000.onrender.com';
    const PARTICIPANTS_ENDPOINT = '/participants';

    const tbody = document.getElementById('participantsTableBody');
    const search = document.getElementById('participantSearch');
    const empty = document.getElementById('participantsEmpty');
    const searchEmpty = document.getElementById('participantsSearchEmpty');
    const table = document.querySelector('#participantsTableBox table');
    const paginationDiv = document.getElementById('participantsPagination');
    const prevBtn = document.getElementById('prevPage');
    const nextBtn = document.getElementById('nextPage');
    const pageInfo = document.getElementById('pageInfo');

    if (!tbody || !search || !table) return;

    let participants = [];
    let filteredParticipants = [];
    let currentPage = 1;
    const itemsPerPage = 10;

    async function fetchParticipants() {
        try {
            const response = await fetch(API_BASE + PARTICIPANTS_ENDPOINT);
            if (!response.ok) throw new Error();
            const json = await response.json();
            participants = json.success ? json.data : json;
            renderParticipants();
        } catch (error) {
            empty.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Erro ao carregar participantes.';
            empty.style.display = 'block';
        }
    }

    function renderParticipants(filter = '') {
        tbody.innerHTML = '';
        const query = filter.toLowerCase();

        if (!participants || participants.length === 0) {
            table.style.display = 'none';
            empty.style.display = 'block';
            searchEmpty.style.display = 'none';
            paginationDiv.style.display = 'none';
            return;
        }

        filteredParticipants = participants.filter(p =>
            p.nome.toLowerCase().includes(query) ||
            p.matricula.includes(query) ||
            p.semestre.toString().includes(query)
        );

        if (query && filteredParticipants.length === 0) {
            table.style.display = 'none';
            empty.style.display = 'none';
            searchEmpty.style.display = 'block';
            paginationDiv.style.display = 'none';
            return;
        }

        table.style.display = 'table';
        empty.style.display = 'none';
        searchEmpty.style.display = 'none';

        const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage) || 1;
        if (currentPage > totalPages) currentPage = totalPages;

        const start = (currentPage - 1) * itemsPerPage;
        const end = start + itemsPerPage;
        const pageData = filteredParticipants.slice(start, end);

        pageData.forEach(p => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${p.nome}</td>
                <td>${p.matricula}</td>
                <td>${p.semestre}º</td>
            `;
            tbody.appendChild(tr);
        });

        if (filteredParticipants.length > itemsPerPage) {
            paginationDiv.style.display = 'flex';
            pageInfo.innerText = `Página ${currentPage} de ${totalPages}`;
            prevBtn.disabled = currentPage === 1;
            nextBtn.disabled = currentPage === totalPages;
        } else {
            paginationDiv.style.display = 'none';
        }
    }

    search.addEventListener('input', (e) => {
        currentPage = 1;
        renderParticipants(e.target.value);
    });

    prevBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderParticipants(search.value);
        }
    });

    nextBtn.addEventListener('click', () => {
        const totalPages = Math.ceil(filteredParticipants.length / itemsPerPage);
        if (currentPage < totalPages) {
            currentPage++;
            renderParticipants(search.value);
        }
    });

    fetchParticipants();
})();