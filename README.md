# Gerenciamento de Equipamentos de TI 💻⚙️

Trabalho avaliativo prático de Desenvolvimento Web. Um sistema CRUD completo para cadastrar, listar, filtrar, editar e deletar equipamentos de TI.

## 👥 Integrantes

- Karolaine Ponci

## 🚀 Como Rodar o Projeto

No terminal, dentro da pasta do projeto, execute os comandos:

```bash
# 1. Instalar as dependências
bun install

# 2. Rodar o servidor backend
bun run dev
```

O servidor vai rodar em:

```text
http://localhost:3000
```

Para visualizar a interface do sistema, basta abrir o arquivo `index.html` diretamente no navegador.

---

## 🛣️ Descrição das Rotas Implementadas

### `GET /equipamentos`

Retorna a lista de todos os equipamentos cadastrados e aceita filtros por nome, tipo e status.

### `GET /equipamentos/:id`

Busca um equipamento específico pelo ID para carregar os dados no formulário de edição.

### `POST /equipamentos`

Cria um novo equipamento com ID automático e valida se os campos obrigatórios foram enviados corretamente.

### `PUT /equipamentos/:id`

Encontra o equipamento pelo ID e atualiza suas propriedades com os novos dados enviados pelo formulário.

### `DELETE /equipamentos/:id`

Procura o equipamento pelo ID e o remove permanentemente do sistema utilizando `splice()`.

---

## 📋 Funcionalidades

- Cadastro de equipamentos
- Listagem de equipamentos
- Filtro por nome, tipo e status
- Edição de equipamentos
- Exclusão de equipamentos
- Validação de campos obrigatórios
- API REST utilizando Bun

## 🛠️ Tecnologias Utilizadas

- HTML5
- CSS3
- JavaScript
- Bun
- API REST
