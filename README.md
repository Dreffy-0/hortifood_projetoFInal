
# 📋 Projeto Hortifood – Backend (NestJS) + Frontend (React + Vite)

## ✅ Integrantes:

- Frederico Augusto Ferreira Araújo Ferraz – UC23100834
- Gabriel Viana de Carvalho – UC23100545
- Jeann Felipe Moreira Leite – UC23101904
- Gabriel Lemes de França Ribeiro – UC23200354
- Icaro Vinnicius Dias Monteiro – UC23102651

---

## ✅ Tecnologias Utilizadas:

- **Backend:** NestJS + TypeORM + SQLite + JWT + Bcrypt
- **Frontend:** React + TypeScript + Vite + Axios + React Router
- **Testes:** Arquivo `requisicoes.http`

---

## ✅ Instalação e Execução do Backend (API NestJS):

### Pré-requisitos:

- Node.js (recomenda-se versão 20 ou superior)
- Nest CLI:
```bash
npm install -g @nestjs/cli
```

---

### Passos:

1. Acesse a pasta `/backend`
2. Instale as dependências:

```bash
npm install
```

3. Rode o servidor:

```bash
npm run start:dev
```

4. A API ficará disponível em:

```
http://localhost:3000
```

---

### Teste dos Endpoints:

Utilize o arquivo **`requisicoes.http`** na raiz do backend.

Exemplos de rotas:

- POST `/clientes`
- POST `/auth/login`
- POST `/produtos`
- GET `/pedidos`
- GET `/avaliacoes`
- GET `/entregas`
- ...

---

## ✅ Instalação e Execução do Frontend (React + Vite + Tailwind):

### Pré-requisitos:

- Node.js
- NPM

---

### Passos:

1. Acesse a pasta `/frontend`
2. Instale as dependências:

```bash
npm install
```

3. Inicie o frontend:

```bash
npm run dev
```

4. Frontend disponível em:

```
http://localhost:5173
```

---

### Principais Rotas do Frontend:

| Tela              | Rota               |
|-------------------|--------------------|
| Login             | `/login`           |
| Dashboard         | `/dashboard`       |
| Lista de Produtos | `/produtos`        |
| Cadastro Produto  | `/cadastro-produto`|
| Lista de Clientes | `/clientes`        |
| Cadastro Cliente  | `/cadastro-cliente`|
| Pedidos           | `/pedidos`         |
| Avaliações        | `/avaliacoes`      |
| Entregas          | `/entregas`        |

---

## ✅ Observações Finais:

- Frontend já integrado com API nas rotas de Login, Cadastro de Cliente, Cadastro de Produto, Listagem de Clientes e Produtos.
- SQLite cria as tabelas automaticamente na primeira execução.
- Arquivo `requisicoes.http` disponível para facilitar testes.
- Possíveis melhorias: Validação de dados, Upload de imagens, Envio de emails, Paginação, Autorização com JWT em rotas protegidas.

---

## 🎥 link vídeo de apresentação: https://youtu.be/h9oC9QepG0A
