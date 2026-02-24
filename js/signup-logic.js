window.switchForm = function (type) {
    const trio = document.getElementById('form-trio');
    const individual = document.getElementById('form-individual');
    const btns = document.querySelectorAll('.btn-toggle');
    const success = document.getElementById('successMessage');

    if (success) success.style.display = 'none';

    if (type === 'trio') {
        if (trio) trio.style.display = 'block';
        if (individual) individual.style.display = 'none';
        btns[0].classList.add('active');
        btns[1].classList.remove('active');
    } else {
        if (trio) trio.style.display = 'none';
        if (individual) individual.style.display = 'block';
        btns[0].classList.remove('active');
        btns[1].classList.add('active');
    }
};

document.getElementById('signupTrio')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const trio = document.getElementById('form-trio');
    const success = document.getElementById('successMessage');
    if (trio) trio.style.display = 'none';
    if (success) success.style.display = 'block';
});

document.getElementById('signupIndividual')?.addEventListener('submit', function (e) {
    e.preventDefault();
    const individual = document.getElementById('form-individual');
    const success = document.getElementById('successMessage');
    if (individual) individual.style.display = 'none';
    if (success) success.style.display = 'block';
});