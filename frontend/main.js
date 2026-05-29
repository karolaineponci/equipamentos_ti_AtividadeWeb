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
getEquipamentos();