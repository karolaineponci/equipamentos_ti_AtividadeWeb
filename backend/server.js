import express from 'express';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

/* AQUI VAI MEU CRUD DE EQUIPAMENTOS */
const equipamentos = [];

/* Adicionando objetos no vetor equipamentos */
const e1 = {
    id: 1,
    nome: 'Alienware',
    tipo: 'notebook',
    status: 'disponivel',
    descricao: 'Notebook para processamento elevado'
}
const e2 = {
    id: 2,
    nome: 'Chromebook 14',
    tipo: 'notebook',
    status: 'manutencao',
    descricao: 'Notebook leve e portátil'
}
const e3 = {
    id: 3,
    nome: 'Epson Power Lite W39',
    tipo: 'projetor',
    status: 'emprestado',
    descricao: 'Projetor para apresentações'
}

const e4 = {
    id: 4,
    nome: 'MacBook Pro M3',
    tipo: 'notebook',
    status: 'disponivel',
    descricao: 'Notebook Apple para desenvolvimento e design'
}

const e5 = {
    id: 5,
    nome: 'Dell OptiPlex 7090',
    tipo: 'desktop',
    status: 'disponivel',
    descricao: 'Desktop corporativo para escritório'
}

const e6 = {
    id: 6,
    nome: 'BenQ MW560',
    tipo: 'projetor',
    status: 'manutencao',
    descricao: 'Projetor portátil para salas pequenas'
}

const e7 = {
    id: 7,
    nome: 'iPad Pro 12.9',
    tipo: 'tablet',
    status: 'emprestado',
    descricao: 'Tablet para anotações e apresentações'
}

const e8 = {
    id: 8,
    nome: 'Samsung Galaxy Tab S9',
    tipo: 'tablet',
    status: 'disponivel',
    descricao: 'Tablet Android para consumo de conteúdo'
}

const e9 = {
    id: 9,
    nome: 'Monitor LG Ultrawide 34"',
    tipo: 'monitor',
    status: 'disponivel',
    descricao: 'Monitor ultrawide para multitarefa'
}

const e10 = {
    id: 10,
    nome: 'Lenovo ThinkCentre M90a',
    tipo: 'desktop',
    status: 'emprestado',
    descricao: 'All-in-one para videoconferências'
}

equipamentos.push(e1, e2, e3, e4, e5, e6, e7, e8, e9, e10);

/* Endpoint para listar todos os equipamentos */
app.get('/equipamentos', (req, res) => {
    const { status, tipo, busca} = req.query;
    let resultado = equipamentos;

    if(status) resultado = resultado.filter(e => e.status === status);
    if(tipo) resultado = resultado.filter(e => e.tipo === tipo);
    if(busca) resultado = resultado.filter(e => e.nome.toLowerCase().includes(busca.toLowerCase()));

    res.json(resultado);
}); 

/* 1. GET por ID */
app.get('/equipamentos/:id', (req, res) => {
    const idProcurado = parseInt(req.params.id);
    const equipamentoEncontrado = equipamentos.find(e => e.id === idProcurado);

    if (!equipamentoEncontrado) {
        return res.status(404).json({ mensagem: "Equipamento não encontrado." });
    }

    res.json(equipamentoEncontrado);
});

// tota  de criação (post /equipamentos)
app.post('/equipamentos', (req, res) => {
    const { nome, status, tipo, busca, descricao } = req.body;

    // Validação: Se não vier nome ou tipo, retorna status 400
    if (!nome || !tipo){
        return res.status(400).json({ mensagem: "Erro: Os campos 'nome' e 'tipo' são obrigatórios"});
    }

    // validação de status permitidos
    const statusPermitidos = ['disponivel', 'emprestado', 'manutencao'];
    if (!statusPermitidos.includes(status)){
        return res.status(400).json({ mensagem: "Erro: O statos deve ser 'disponivel', 'emprestado' ou 'manutencao' "});
    }

    const novoId = Math.max(0, ...equipamentos.map(e => e.id)) + 1;

    // criar novo objeto
    const novoEquipamento = {
        id: novoId,
        nome: nome,
        tipo: tipo,
        status: status,
        descricao: descricao || ""
    };

    //adiciona o objeto no array 
    equipamentos.push(novoEquipamento);

    //  responde com status 201 (Created) e com o objeto criado
    res.status(201).json(novoEquipamento);
});

//atualização de equipamentos
app.put('/equipamentos/:id', (req, res) => {
    const idProcurado = parseInt(req.params.id);
    const { nome, tipo, status, descricao } = req.body;

    //encontra o indice do eqipamento no array
    const index = equipamentos.findIndex(e => e.id === idProcurado);

    //se for -1, não existe
    if (index === -1){
        return res.status(404).json({ mensagem: "Equipamento não encontrado"})
    }

    //validação campos nome e tipo
    if (!nome || !tipo) {
        return res.status(400).json({ mensagem: "Erro: Os campos 'nome' e 'tipo' são obrigatórios." });
    }

    // validação de status
    const statusPermitidos = ['disponivel', 'emprestado', 'manutencao'];
    if (!statusPermitidos.includes(status)) {
        return res.status(400).json({ mensagem: "Erro: O status deve ser 'disponivel', 'emprestado' ou 'manutencao'." });
    }

    // atualiza o objeto
    equipamentos[index] = {
        id: idProcurado, //id original
        nome: nome,
        tipo: tipo,
        status: status,
        descricao: descricao || ""
    };

    //retorna objeto atualizado
    res.json(equipamentos[index]);
});


//delete para equipamentos
app.delete('/equipamentos/:id', (req, res) => {
    const idProcurado = parseInt(req.params.id);

     //encontra o indice do eqipamento no array (igual na atualização)
    const index = equipamentos.findIndex(e => e.id === idProcurado);
    if (index === -1) {
        return res.status(404).json({ mensagem: "Equipamento não encontrado para exclusão." });
    }

    //remover o elemento na posição encontrada
    equipamentos.splice(index, 1);

    // status 204 No Content (exclusão com sucesso)
    res.status(204).send();
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});