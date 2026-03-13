(function () {
    const API_BASE = 'https://copa-de-software.onrender.com';
    const RANKING_ENDPOINT = '/ranking';

    const loader = document.getElementById('previewLoader');
    const emptyMessage = document.getElementById('previewEmpty');
    const previewRows = document.getElementById('previewRows');

    async function loadPreviewRanking() {
        if (!loader || !emptyMessage || !previewRows) return;

        try {
            const response = await fetch(API_BASE + RANKING_ENDPOINT);
            if (!response.ok) throw new Error('Erro na rede');
            const json = await response.json();
            const ranking = json.success ? json.data : json;

            loader.style.display = 'none';

            if (!ranking || ranking.length === 0) {
                emptyMessage.style.display = 'flex';
                return;
            }

            const top = ranking.slice(0, 3);

            const html = top.map((team, index) => {
                const position = index + 1;
                const crown = position === 1 ? '<i class="fa-solid fa-crown"></i> ' : '';
                const posFormatted = position.toString().padStart(2, '0');
                const teamName = team.teamName || team.name || 'Time ' + team.teamId;

                return `
                    <div class="preview-row" data-team-id="${team.teamId}">
                        <span class="preview-pos">${crown}${posFormatted}</span>
                        <span class="preview-name">${teamName}</span>
                        <span class="preview-score">${team.total}</span>
                    </div>
                `;
            }).join('');

            previewRows.innerHTML = html;
            previewRows.style.display = 'block';
        } catch (error) {
            console.error('Erro ao carregar preview do ranking:', error);
            loader.style.display = 'none';
            emptyMessage.innerHTML = '<i class="fa-solid fa-triangle-exclamation"></i> Erro ao carregar.';
            emptyMessage.style.display = 'flex';
        }
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', loadPreviewRanking);
    } else {
        loadPreviewRanking();
    }
})();