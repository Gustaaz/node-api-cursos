# 🚀 Course Management API

Uma API REST moderna e robusta para gerenciamento de cursos, construída com Node.js, Fastify, TypeScript e PostgreSQL.

## ✨ Características

- **Fastify**: Framework web rápido e eficiente
- **TypeScript**: Tipagem estática para maior confiabilidade
- **PostgreSQL**: Banco de dados relacional robusto
- **Drizzle ORM**: ORM moderno e type-safe
- **Swagger/OpenAPI**: Documentação automática da API
- **Docker**: Containerização para desenvolvimento
- **Validação**: Schema validation com Zod
- **Logging**: Sistema de logs estruturado com Pino

## 🏗️ Arquitetura

```
src/
├── database/
│   ├── client.ts      # Configuração do banco de dados
│   └── schema.ts      # Schemas das tabelas
├── routes/
│   ├── create-course.ts      # Criação de cursos
│   ├── get-courses.ts        # Listagem de cursos
│   └── get-course-by-id.ts  # Busca de curso por ID
└── server.ts                 # Servidor principal
```

## 🚀 Começando

### Pré-requisitos

- Node.js 18+ 
- Docker e Docker Compose
- PostgreSQL (opcional, pode usar Docker)

### Instalação

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd node-primeira-api
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   ```bash
   cp .env.example .env
   # Edite o arquivo .env com suas configurações
   ```

4. **Inicie o banco de dados**
   ```bash
   docker-compose up -d
   ```

5. **Execute as migrações**
   ```bash
   npm run db:migrate
   ```

6. **Inicie o servidor de desenvolvimento**
   ```bash
   npm run dev
   ```

## 📚 Scripts Disponíveis

| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor em modo desenvolvimento com hot-reload |
| `npm run db:generate` | Gera novas migrações baseadas no schema |
| `npm run db:migrate` | Executa as migrações pendentes |
| `npm run db:studio` | Abre o Drizzle Studio para visualizar dados |

## 🗄️ Banco de Dados

### Schema

#### Tabela `users`
- `id`: UUID (chave primária)
- `name`: Nome do usuário (texto, obrigatório)
- `email`: Email do usuário (texto, obrigatório, único)

#### Tabela `courses`
- `id`: UUID (chave primária)
- `title`: Título do curso (texto, obrigatório)
- `description`: Descrição do curso (texto, obrigatório)

### Migrações

O projeto utiliza Drizzle Kit para gerenciar migrações do banco de dados. As migrações são armazenadas na pasta `drizzle/`.

## 🌐 Endpoints da API

### Cursos

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/courses` | Lista todos os cursos |
| `GET` | `/courses/:id` | Busca um curso específico por ID |
| `POST` | `/courses` | Cria um novo curso |

### Documentação da API

- **Swagger UI**: http://localhost:3000/docs
- **OpenAPI Spec**: Disponível via Swagger

## 🐳 Docker

O projeto inclui configuração Docker para facilitar o desenvolvimento:

```yaml
services:
  db:
    image: postgres:17
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: postgres
      POSTGRES_DB: minha_base
    ports:
      - "5432:5432"
```

## 🛠️ Tecnologias Utilizadas

- **Runtime**: Node.js
- **Framework**: Fastify
- **Linguagem**: TypeScript
- **Banco de Dados**: PostgreSQL
- **ORM**: Drizzle ORM
- **Validação**: Zod
- **Documentação**: Swagger/OpenAPI
- **Logging**: Pino
- **Containerização**: Docker

## 📁 Estrutura do Projeto

```
node-primeira-api/
├── src/
│   ├── database/          # Configurações e schemas do banco
│   └── routes/            # Rotas da API
├── drizzle/               # Migrações e configurações do Drizzle
├── docker-compose.yml     # Configuração Docker
├── drizzle.config.ts      # Configuração do Drizzle Kit
├── server.ts              # Servidor principal
├── package.json           # Dependências e scripts
└── tsconfig.json          # Configuração TypeScript
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
DATABASE_URL=postgresql://postgres:postgres@localhost:5432/minha_base
PORT=3000
NODE_ENV=development
```

### TypeScript

O projeto está configurado com TypeScript para desenvolvimento moderno e type-safe.

## 🤝 Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request


**Desenvolvido usando Node.js e Fastify**
