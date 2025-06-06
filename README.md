# API CRUD - Desafio de Backend

Este projeto é uma API RESTful construída com Node.js, Express e TypeScript. Ele serve como backend para o desafio frontend, fornecendo endpoints para gerenciar uma lista de posts.

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

### Estrutura da Resposta

Todas as respostas da API seguem um formato padrão para garantir consistência. A classe `ApiResponse<T>` (localizada em `src/utils/ApiResponse.ts`) é usada para encapsular os dados de resposta.

A estrutura é a seguinte:

- **`success`** (boolean): Indica se a requisição foi bem-sucedida (`true`) ou resultou em erro (`false`).
- **`data`** (T | null): Contém os dados da resposta em caso de sucesso. Em caso de erro, este campo é `null`. O tipo `T` é genérico para se adaptar a diferentes tipos de dados.
- **`message`** (string | null): Fornece uma mensagem descritiva em caso de erro. Em caso de sucesso, este campo é `null`.

### Endpoints

| Método   | Caminho        | Descrição                                                                                                              | Corpo da Requisição                                                | Resposta da API (Sucesso)                                                                                               | Resposta da API (Erro)                                                                            |
| :------- | :------------- | :--------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------ |
| `GET`    | `/health`      | Verifica a saúde da API.                                                                                               | `N/A`                                                              | `200 OK` `{ "status": "ok", "message": "API is healthy" }`                                                              | `N/A`                                                                                             |
| `GET`    | `/careers/`    | Recupera uma lista de todos os posts. Suporta ordenação através do parâmetro de query `sortBy` (ex: `?sortBy=-title`). | `N/A`                                                              | `200 OK` `[{ "id": 1, "username": "string", "created_datetime": "string", "title": "string", "content": "string" }]`    | `400 Bad Request` `{ "success": false, "data": null, "message": "Invalid sort field: '...' " }`   |
| `GET`    | `/careers/:id` | Recupera um único post pelo seu ID único.                                                                              | `N/A`                                                              | `200 OK` `{ "id": 1, "username": "string", "created_datetime": "string", "title": "string", "content": "string" }`      | `404 Not Found` `{ "success": false, "data": null, "message": "Post with id = '...' not found" }` |
| `POST`   | `/careers/`    | Cria um novo post.                                                                                                     | `{ "username": "string", "title": "string", "content": "string" }` | `201 Created` `{ "id": 1, "username": "string", "created_datetime": "string", "title": "string", "content": "string" }` | `400 Bad Request` `{ "success": false, "data": null, "message": "Missing required fields: ..." }` |
| `PATCH`  | `/careers/:id` | Atualiza o título e o conteúdo de um post existente.                                                                   | `{ "title": "string", "content": "string" }`                       | `200 OK` `{ "id": 1, "username": "string", "created_datetime": "string", "title": "string", "content": "string" }`      | `404 Not Found` `{ "success": false, "data": null, "message": "Post with id = '...' not found" }` |
| `DELETE` | `/careers/:id` | Deleta um post pelo seu ID único.                                                                                      | `N/A`                                                              | `204 No Content`                                                                                                        | `404 Not Found` `{ "success": false, "data": null, "message": "Post with id = '...' not found" }` |

---

## Integração Contínua (CI)

Este projeto usa **GitHub Actions** para seu pipeline de CI. O fluxo de trabalho é definido em `.github/workflows/ci.yml`.

O pipeline de CI é acionado a cada `push` e `pull_request` para a branch `main`. Ele executa os seguintes passos:

1.  Faz o checkout do código do repositório.
2.  Configura duas versões do Node.js (18.x e 20.x) para garantir a compatibilidade.
3.  Instala todas as dependências usando `npm ci` para instalações rápidas e confiáveis.
4.  Executa todo o conjunto de testes com `npm test`.

Isso garante que todo o código mesclado na branch principal seja automaticamente testado e verificado.

## Deploy & Endpoints

A API está implantada na plataforma [Render](https://render.com) e pode ser acessada publicamente.

**URL Base do Deploy**: `https://crud-backend-pg3b.onrender.com`

Você pode testar os endpoints diretamente usando `curl` ou qualquer outra ferramenta de cliente HTTP.

### Exemplos com `curl`

Aqui estão alguns exemplos de como interagir com a API implantada.

#### 1. Verificar a Saúde da API

```bash
curl -X GET https://crud-backend-pg3b.onrender.com/health
```

#### 2. Obter Todos os Posts

```bash
curl -X GET https://crud-backend-pg3b.onrender.com/careers/
```

_Para ordenar, adicione `?sortBy=-created_datetime`_

```bash
curl -X GET "https://crud-backend-pg3b.onrender.com/careers/?sortBy=-created_datetime"
```

#### 3. Obter um Post por ID

Substitua `{id}` pelo ID desejado (ex: `1`).

```bash
curl -X GET https://crud-backend-pg3b.onrender.com/careers/1
```

#### 4. Criar um Novo Post

```bash
curl -X POST https://crud-backend-pg3b.onrender.com/careers/ \
-H "Content-Type: application/json" \
-d '{
  "username": "curious_dev",
  "title": "Testing with cURL",
  "content": "This post was created from the command line!"
}'
```

#### 5. Atualizar um Post

Substitua `{id}` pelo ID do post que deseja atualizar (ex: `1`).

```bash
curl -X PATCH https://crud-backend-pg3b.onrender.com/careers/1 \
-H "Content-Type: application/json" \
-d '{
  "title": "An Updated Title",
  "content": "The content has been updated."
}'
```

#### 6. Deletar um Post

Substitua `{id}` pelo ID do post que deseja deletar (ex: `1`).

```bash
curl -X DELETE https://crud-backend-pg3b.onrender.com/careers/1
```
