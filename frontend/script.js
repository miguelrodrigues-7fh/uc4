const API_URL = 'http://localhost:3000/api/usuarios';

const listaUsuarios = document.getElementById('listaUsuarios');

const form = document.getElementById('formUsuario');
const nomeInput = document.getElementById('nome');
const emaiInput = document.getElementById('email');
const botaoSalvar = document.getElementById('botaoSalvar');

async function carregarUsuarios() {
        try { 
            const resposta = await fetch(API_URL);
            if (!resposta.ok) {
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }
           const data = await resposta.json();

           listaUsuarios.innerHTML = "";

           data.forEach(usuario => {
            const linha = document.createElement("tr");

            linha.innerHTML = `<td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td>`;

            listaUsuarios.appendChild(linha);
           })
        }
            catch (erro) { 
                console.error('Error: ', erro);
            }
    };

form.addEventListener("submit", async (event) => { //inicia a leitura do botão salvar
    event.preventDefault(); // não deixa a página atualizar

    const nome = nomeInput.value;
    const email = emaiInput.value;

    const usuario = {
        nome,
        email
    };

    await fetch(API_URL, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)

    });
        carregarUsuarios();

});


    //Inicia já com nossa listagem
    carregarUsuarios();


