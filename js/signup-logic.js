const INSCRICOES_ABERTAS = false;

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
    const error = document.getElementById('formError');

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

document.getElementById('signupTrio')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;
    const data = new FormData(form);

    const semestres = [
        data.get('m1_sem'),
        data.get('m2_sem'),
        data.get('m3_sem')
    ];

    const matriculas = [
        data.get('m1_mat')?.trim(),
        data.get('m2_mat')?.trim(),
        data.get('m3_mat')?.trim()
    ];

    const semSet = new Set(semestres);
    if (semSet.size === 1) {
        showFormError(form,
            'O time deve possuir participantes de pelo menos dois semestres diferentes.'
        );
        return;
    }

    const matSet = new Set(matriculas);
    if (matSet.size !== matriculas.length) {
        showFormError(form,
            'Não é permitido repetir a mesma matrícula no time.'
        );
        return;
    }

    form.style.display = 'none';
    document.getElementById('successMessage')?.style.setProperty('display', 'block');
});

document.getElementById('signupIndividual')?.addEventListener('submit', function (e) {
    e.preventDefault();

    const form = e.target;

    form.style.display = 'none';
    document.getElementById('successMessage')?.style.setProperty('display', 'block');
});