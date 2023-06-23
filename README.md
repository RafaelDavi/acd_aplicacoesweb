
# Aplicação Web de Listagem de Fornecedores

Esta é uma aplicação web desenvolvida para listar os fornecedores de uma empresa. A aplicação permite o cadastro de empresas e fornecedores, e oferece filtros para a pesquisa por nome e CPF/CNPJ dos fornecedores.

## Tecnologias Utilizadas

- Backend: Node.js (utilizando Express e Cors)
- Frontend: React.js (utilizando Axios e React Toastify)
- Banco de Dados: MySQL

## Funcionalidades e Regras

A aplicação possui as seguintes funcionalidades e regras:

- Cadastro de Empresa:
  - Estado
  - Nome
  - CNPJ

- Cadastro de Fornecedor:
  - Nome
  - CPF/CNPJ
  - Data/hora de cadastro
  - Telefone
  - RG (exigido apenas para fornecedores pessoa física)
  - Data de Nascimento (exigida apenas para fornecedores pessoa física)

- Regras de Cadastro:
  - Se o fornecedor for pessoa física, é necessário informar o RG e a data de nascimento.
  - Não é permitido o cadastro de fornecedores menores de 18 anos de idade.

- Listagem de Fornecedores:
  - A listagem de fornecedores permite a aplicação de filtros por nome e CPF/CNPJ.

## Banco de Dados

A aplicação utiliza as seguintes tabelas no banco de dados MySQL:

Tabela "empresa":
- Colunas: cnpj, nome, estado

Tabela "fornecedor":
- Colunas: cp, nome, telefone, rg, dataNascimento, dataCadastro

Tabela "empresa_fornecedor":
- Colunas: cnpj, cp, id

## Como Executar o Projeto

Para executar o projeto localmente, siga as etapas abaixo:

1. Certifique-se de ter o Node.js e o MySQL instalados em seu sistema.

2. Clone o repositório do projeto:

```
git clone <URL do repositório>
```

3. Navegue até a pasta do projeto:

```
cd nome-da-pasta-do-projeto
```

4. Instale as dependências do backend:

```
cd backend
npm install
```

5. Configure o banco de dados MySQL com as tabelas mencionadas acima.

6. Configure as informações de conexão com o banco de dados no arquivo `backend/config.js`.

7. Inicie o servidor backend:

```
npm start
```

8. Em outra janela do terminal, instale as dependências do frontend:

```
cd frontend
npm install
```

9. Inicie o servidor frontend:

```
npm start
```

10. Acesse a aplicação no seu navegador web através do endereço:

```
http://localhost:3000
```
