const API_BASE = 'https://copa-de-software.onrender.com';
const INSCRICOES_ABERTAS = true;

async function apiFetch(endpoint, options = {}) {
    const response = await fetch(`${API_BASE}${endpoint}`, {
        headers: { 'Content-Type': 'application/json' },
        ...options
    });
    const json = await response.json();
    if (!response.ok || (json && json.success === false)) {
        throw new Error(json.error || `Erro ${response.status}`);
    }
    return json.data;
}

(function controlarInscricao() {
    const closed = document.getElementById('signupClosed');
    const trio = document.getElementById('form-trio');
    const individual = document.getElementById('form-individual');
    const toggle = document.querySelector('.signup-toggle');

    if (!INSCRICOES_ABERTAS) {
        closed?.style.setProperty('display', 'block');
        trio?.style.setProperty('display', 'none');
        individual?.style.setProperty('display', 'none');
        toggle?.style.setProperty('display', 'none');
        return;
    }

    closed?.style.setProperty('display', 'none');
})();

window.switchForm = function (type) {
    const trio = document.getElementById('form-trio');
    const individual = document.getElementById('form-individual');
    const btns = document.querySelectorAll('.btn-toggle');
    const success = document.getElementById('successMessage');

    success && (success.style.display = 'none');
    document.querySelectorAll('.form-error').forEach(e => e.remove());

    if (type === 'trio') {
        trio.style.display = 'block';
        individual.style.display = 'none';
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    } else {
        trio.style.display = 'none';
        individual.style.display = 'block';
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
    }
};

function showFormError(form, message) {
    let error = form.querySelector('.form-error');
    if (!error) {
        error = document.createElement('div');
        error.className = 'form-error';
        const submitBtn = form.querySelector('button[type="submit"]');
        submitBtn.parentNode.insertBefore(error, submitBtn);
    }
    error.textContent = message;
}

document.getElementById('signupTrio')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const semestres = [
        formData.get('m1_sem'),
        formData.get('m2_sem'),
        formData.get('m3_sem')
    ].map(s => parseInt(s, 10));

    const matriculas = [
        formData.get('m1_mat')?.trim(),
        formData.get('m2_mat')?.trim(),
        formData.get('m3_mat')?.trim()
    ];

    if (new Set(semestres).size < 2) {
        showFormError(form, 'O time deve possuir participantes de pelo menos dois semestres diferentes.');
        return;
    }

    if (new Set(matriculas).size !== matriculas.length) {
        showFormError(form, 'Não é permitido repetir a mesma matrícula no time.');
        return;
    }

    const participants = [
        { matricula: matriculas[0], nome: formData.get('m1_name')?.trim(), semestre: semestres[0] },
        { matricula: matriculas[1], nome: formData.get('m2_name')?.trim(), semestre: semestres[1] },
        { matricula: matriculas[2], nome: formData.get('m3_name')?.trim(), semestre: semestres[2] }
    ];

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
        await apiFetch('/signup/team', { method: 'POST', body: JSON.stringify({ participants }) });
        form.style.display = 'none';
        document.getElementById('successMessage')?.style.setProperty('display', 'block');
    } catch (error) {
        console.error('Erro no signup de time:', error);
        showFormError(form, error.message || 'Erro ao realizar inscrição. Tente novamente.');
        submitBtn.disabled = false;
    }
});

document.getElementById('signupIndividual')?.addEventListener('submit', async function (e) {
    e.preventDefault();
    const form = e.target;
    const formData = new FormData(form);

    const payload = {
        matricula: formData.get('ind_mat')?.trim(),
        nome: formData.get('ind_name')?.trim(),
        semestre: parseInt(formData.get('ind_sem'), 10)
    };

    const submitBtn = form.querySelector('button[type="submit"]');
    submitBtn.disabled = true;

    try {
        await apiFetch('/signup/individual', { method: 'POST', body: JSON.stringify(payload) });
        form.style.display = 'none';
        document.getElementById('successMessage')?.style.setProperty('display', 'block');
    } catch (error) {
        console.error('Erro no signup individual:', error);
        showFormError(form, error.message || 'Erro ao realizar inscrição. Tente novamente.');
        submitBtn.disabled = false;
    }
});