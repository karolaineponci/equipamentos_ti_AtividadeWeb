const tbody = document.querySelector('#data');
const getEquipamentos = async () => {
    let url = 'http://localhost:3000/equipamentos?';

    // filtros
    const tipo = document.querySelector('#tipo').value;
    const status = document.querySelector('#status').value;
    const nome = document.querySelector('#nome').value;

    if (tipo !== '') url += 'tipo=' + tipo + '&';
    if (status !== '') url += 'status=' + status + '&';
    if (nome !== '') url += 'busca=' + nome + '&';

    const response = await fetch(url);
    const equipamentos = await response.json();
    
    // limpar o tbody
    tbody.innerHTML = '';

    // preencher o tbody com os equipamentos retornados do backend
    for (const e of equipamentos) {
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td>${e.id}</td>
            <td>${e.nome}</td>
            <td>${e.tipo}</td>
            <td>${e.status}</td>
            <td>${e.descricao}</td>
            <td>
                <button onclick="preencherFormulario(${e.id})" style="background-color: #28a745; margin-right: 5px; cursor: pointer;">Editar</button>
                <button onclick="deletarEquipamento(${e.id})" style="background-color: #dc3545; cursor: pointer;">Excluir</button>
            </td>
        `;
        tbody.appendChild(tr);
    }
}

// fução deletar equipamentos
const deletarEquipamento = async (id) => {
    const confirmou = confirm ("Deseja realmente excluir?");

    if (!confirmou) return;

    try {
        const response = await fetch(`http://localhost:3000/equipamentos/${id}`, {
            method: 'DELETE'
        });

        if (response.status === 204){
            alert("Equipamento excluído com sucesso!");

            getEquipamentos();
        }
        else{
            alert("Erro ao tentar excluir o equipamento.")
        }
    } catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar ao servidor.");
    }
}

// buscar e preencher formulario
const preencherFormulario = async (id) => {
    try {
        const response = await fetch(`http://localhost:3000/equipamentos/${id}`);

        if (response.ok) {
            const equipamento = await response.json();

            document.querySelector('#equipamento-id').value = equipamento.id;
            document.querySelector('#cadastro-nome').value = equipamento.nome;
            document.querySelector('#cadastro-tipo').value = equipamento.tipo;
            document.querySelector('#cadastro-status').value = equipamento.status;
            document.querySelector('#cadastro-descricao').value = equipamento.descricao;

            document.querySelector('#btn-salvar').innerText = "Atualizar";

            document.querySelector('#btn-cancelar').style.display = "inline-block";

            window.scrollTo({ top: 0, behavior: 'smooth' });
        }
        else{
            alert("Erro ao buscar dados do equipamento.");
        }
    }

    catch (error) {
        console.error("Erro na requisição:", error);
        alert("Não foi possível conectar ao servidor.");
    }
}

// limpar o formulário e resetar o modo de edição
const limparFormulario = () => {
   
    document.querySelector('#cadastro-form').reset();
    
    document.querySelector('#equipamento-id').value = '';
    
    document.querySelector('#btn-salvar').innerText = "Salvar";
    
    // Esconde novamente o botão cancelar
    document.querySelector('#btn-cancelar').style.display = "none";
}


getEquipamentos();