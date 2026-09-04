

fetch('http://localhost:3000/api/mensagem')
    .then(response => response.json())
    .then(data => {
        const msn = document.getElementById('sla');
        const orkut = document.getElementById('giratina');
        orkut.innerHTML = (data.sub);
        msn.innerHTML = (data.mensagem);
    });
