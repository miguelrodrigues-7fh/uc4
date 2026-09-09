        const msn = document.getElementById('sla');
        const orkut = document.getElementById('giratina');



async function dataConsumo() {
        try { 
            const resposta = await fetch('http://localhost:3000/api/mensagem');
            if (!resposta.ok) { 
                throw new Error(`Erro HTTP: ${resposta.status}`);
            }
           const data = await resposta.json();
            //const titulo = document.getElementById('sla')
           // titulo.innerHTML = data.mensagem;
           // const descri = document.getAnimations('giratina');
           // descri.innerHTML = data.description;
            orkut.innerHTML = (data.sub);
            msn.innerHTML = (data.mensagem);
        }
            catch (erro) { 
                console.error('Error: ', erro);
            }
    };
     dataConsumo();

    

