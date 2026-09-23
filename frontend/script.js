const API_URL = 'http://localhost:3000/api/usuarios';

const listaUsuarios = document.getElementById('listaUsuarios');
const form = document.getElementById('formUsuario');
const usuarioIdInput =  document.getElementById('usuarioID');
const nomeInput = document.getElementById('nome');
const emaiInput = document.getElementById('email');
const botaoSalvar = document.getElementById('botaoSalvar');
const mensagem = document.getElementById('mensagem');



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

            linha.innerHTML = `<td>${usuario.id}</td><td>${usuario.nome}</td><td>${usuario.email}</td>
            <td>
            <div class="options">
            <button onclick="editarUsuario(${usuario.id})">Editar</button>
            <button style="color:#fff; background-color:#ff6347" onclick="excluirUsuario(${usuario.id})">Excluir</button>
            </div>
            </td>`
            ;

            listaUsuarios.appendChild(linha);
           })
        }
            catch (erro) { 
                console.error('Error: ', erro);
            }
    };

form.addEventListener("submit", async (event) => { //inicia a leitura do botão salvar
    event.preventDefault(); // não deixa a página atualizar

    const nome = nomeInput.value; //leitura do valor em tela 
    const email = emaiInput.value; //leitura valor em tela 
    const id = usuarioIdInput.value; //leitura id

    const usuario = {
        nome,
        email
    };

    if(id) {
        await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)

    });

    } else {await fetch(API_URL, {
        method: "POST",
        headers:{
            "Content-Type": "application/json"
        },
        body: JSON.stringify(usuario)

    });

    }

        carregarUsuarios();

});

async function editarUsuario(id) {
    const resposta = await fetch(`${API_URL}/${id}`);
    const usuario = await resposta.json();
    usuarioIdInput.value = usuario.id;
    nomeInput.value = usuario.nome;
    emaiInput.value = usuario.email;
    botaoSalvar.innerHTML = "Salvar alterações";

}

async function excluirUsuario(id) {
    const confirmar = confirm("Deseja excluir mesmo este usuário?");
    if (!confirmar){
        return;
    }
    await fetch(`${API_URL}/${id}`, {
        method: "DELETE"    
        }); 
        mostrarMensagem("Usuário excluido com sucesso!");
        carregarUsuarios();     
};


function mostrarMensagem(texto){
    mensagem.innerHTML = `${texto}`;
    setTimeout(() => {mensagem.innerHTML = ""}, 3000);
}
    

    //Inicia já com nossa listagem
    carregarUsuarios();


