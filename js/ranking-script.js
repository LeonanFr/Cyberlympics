(function () {
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

        if (empty) {
            if (q.length > 0 && visible === 0) {
                empty.hidden = false;
                empty.style.display = 'flex';
            } else {
                empty.hidden = true;
                empty.style.display = 'none';
            }
        }
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