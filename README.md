# API CRUD - Desafio de Backend

Este projeto é uma API RESTful construída com Node.js, Express e TypeScript. Ele serve como backend para o desafio frontend da CodeLeap, fornecendo endpoints para gerenciar uma lista de posts.

A API inclui um conjunto completo de testes de integração e um pipeline de CI.

## Funcionalidades

- **Operações CRUD:** Funcionalidade completa de Criar, Ler, Atualizar e Deletar para os posts.
- **Banco de Dados em Memória:** Para evitar excesso de engenharia, é utilizado um array simples em memória para persistência de dados durante a execução.
- **Ordenação:** O endpoint principal de listagem suporta ordenação dinâmica.
- **Respostas Estruturadas:** Todas as respostas da API são encapsuladas em um objeto `ApiResponse` consistente (`{ success, data, message }`).
- **Tratamento de Erros:** Um manipulador de erros global fornece mensagens de erro claras e consistentes.
- **Testes:** Testes de integração abrangentes usando Jest e Supertest.
- **CI/CD:** Pipeline de Integração Contínua com GitHub Actions para executar testes automaticamente.

## Começando

### Pré-requisitos

- [Node.js](https://nodejs.org/) (v18.x ou posterior)

### Instalação

1.  Clone o repositório:

    ```bash
    git clone <url-do-repositorio>
    cd crud-api
    ```

2.  Instale as dependências:
    ```bash
    npm install
    ```

### Executando a Aplicação

- **Modo de Desenvolvimento:**
  Este comando inicia o servidor com `nodemon`, que reiniciará automaticamente quando alterações nos arquivos forem detectadas.

  ```bash
  npm run dev
  ```

  O servidor estará rodando em `http://localhost:3000`.

### Executando Testes

Para executar o conjunto completo de testes de integração, use o seguinte comando:

```bash
npm test
```

---

## Documentação da API

**URL Base**: `http://localhost:3000`

### Endpoints

| Método   | Caminho        | Descrição                                                                                                              | Corpo da Requisição                                                |
| :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `GET`    | `/health`      | Verifica a saúde da API.                                                                                               | `N/A`                                                              |
| `GET`    | `/careers/`    | Recupera uma lista de todos os posts. Suporta ordenação através do parâmetro de query `sortBy` (ex: `?sortBy=-title`). | `N/A`                                                              |
| `GET`    | `/careers/:id` | Recupera um único post pelo seu ID único.                                                                              | `N/A`                                                              |
| `POST`   | `/careers/`    | Cria um novo post.                                                                                                     | `{ "username": "string", "title": "string", "content": "string" }` |
| `PATCH`  | `/careers/:id` | Atualiza o título e o conteúdo de um post existente.                                                                   | `{ "title": "string", "content": "string" }`                       |
| `DELETE` | `/careers/:id` | Deleta um post pelo seu ID único.                                                                                      | `N/A`                                                              |

---

## Integração Contínua (CI)

Este projeto usa **GitHub Actions** para seu pipeline de CI. O fluxo de trabalho é definido em `.github/workflows/ci.yml`.

O pipeline de CI é acionado a cada `push` e `pull_request` para a branch `main`. Ele executa os seguintes passos:

1.  Faz o checkout do código do repositório.
2.  Configura duas versões do Node.js (18.x e 20.x) para garantir a compatibilidade.
3.  Instala todas as dependências usando `npm ci` para instalações rápidas e confiáveis.
4.  Executa todo o conjunto de testes com `npm test`.

Isso garante que todo o código mesclado na branch principal seja automaticamente testado e verificado.

## Deploy

### Render

Este projeto está configurado para deploy no [Render](https://render.com), uma plataforma de hospedagem na nuvem.
