# Projeto de Teste para Desenvolvedor: Autenticação e Produtos

Este é um teste técnico simplificado para avaliar habilidades full-stack, com foco em operações CRUD básicas e integração frontend-backend.

## Visão Geral

O projeto inclui:

- Frontend React com sistema de autenticação pronto
- Backend Express com API REST
- Gerenciamento básico de produtos

## Início Rápido

1. Clone o repositório
2. Instale as dependências: `npm install`
3. Execute o projeto: `npm run dev:full`

## Estrutura do Projeto

- `/src` - Frontend React
- `/server` - Backend Express

## Sistema de Autenticação (Já Implementado)

- Login e registro de usuários
- Rotas protegidas
- Tokens JWT

## Tarefa: Implementar Gerenciamento de Produtos

### Requisitos Básicos:

1. **Lista de Produtos**

   - Exibir produtos em uma tabela ou grid
   - Mostrar: nome, preço e status

2. **Formulário de Produto**

   - Campos: nome, preço, status
   - Validação básica dos campos

3. **Operações**
   - Criar novo produto
   - Editar produto existente
   - Excluir produto

### API Endpoints

- `GET /api/products` - Listar produtos
- `POST /api/products` - Criar produto
- `PUT /api/products/:id` - Atualizar produto
- `DELETE /api/products/:id` - Excluir produto

Autenticação: Token Bearer no header Authorization

## Avaliação

Aspectos principais:

1. Funcionamento das operações CRUD
2. Integração frontend-backend
3. Usabilidade da interface
4. Organização do código
5. Tratamento básico de erros

## Entrega

1. Criar repositório público no GitHub
2. Implementar o módulo de produtos
3. Atualizar o README com instruções de execução
4. Enviar o link do repositório

Tempo estimado: até 2 dias

Boa sorte!
