window.addEventListener('load', () => {
    let alerta = document.getElementById('alerta');
    let url = window.location.toString().substring(21);
    alerta.style.display = 'none';

    if(url == '/error'){
        alerta.style.display = 'block';
    }

});