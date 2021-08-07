(() => {
    'use strict';
    window.addEventListener('load', () => {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array
            .prototype
            .filter
            .call(forms, (form) => {
                form.addEventListener('submit', (event) => {
                    if (form.checkValidity() === false) {
                        event.preventDefault();
                        event.stopPropagation();
                    }
                    form
                        .classList
                        .add('was-validated');
                }, false);
            });
    }, false);
})();

$(document).ready(function () {
    $('#weight').mask("#0.000", { reverse: true });
})

$(document).ready(function () {
    $('#date').mask('00/00/0000', { clearIfNotMatch: true })
})