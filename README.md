# Gerenciamento de Inventório

![Inventory Management](https://example.com/banner.png)

## Descrição

Este é um sistema de gerenciamento de inventário desenvolvido para ajudar a controlar e organizar funcionarios. O projeto foi desenvolvido utilizando Frontend e BackEnd

## Funcionalidades

- **Cadastro de Produtos**: Adicionar, editar e excluir produtos no inventário.
- **Controle de Estoque**: Visualizar quantidade de produtos disponíveis.
- **Relatórios**: Gerar relatórios de produtos em estoque.
- **Autenticação**: Sistema de login para diferentes níveis de acesso (administrador e usuário).

## Tecnologias Utilizadas

- **Backend**: Node.js, Postgres, Prisma, Postman
- **Frontend**: React, Redux, Nextjs, MUI, Tailwind, Recharts
- **Estilização**: CSS, TailwindCSS
- **Nextjs** - https://nextjs.org/docs/getting-started/installation
- **Redux Toolkit w/ Nextjs** - https://redux-toolkit.js.org/usage/nextjs
- **Redux Toolkit** Query - https://redux-toolkit.js.org/rtk-query/overview
- **Nextjs** and **Context Providers** - https://nextjs.org/docs/app/building-your-application/rendering/composition-patterns#using-context-providers
- **Tailwind** - https://tailwindcss.com/docs/configuration
- **Recharts** - https://recharts.org/en-US/api
- **MUI** - https://mui.com/x/react-data-grid/

## Estrutura do Projeto

    gerenciamento-de-inventorio/
    │
    ├── backend/
    │   ├── config/
    │   ├── controllers/
    │   ├── models/
    │   ├── routes/
    │   └── server.js
    │
    ├── frontend/
    │   ├── public/
    │   ├── src/
    │   │   ├── components/
    │   │   ├── pages/
    │   │   ├── redux/
    │   │   ├── App.js
    │   │   ├── index.js
    │   └── package.json
    │
    ├── .gitignore
    ├── README.md
    └── package.json

### Instalação

1. Clone o repositório:

```bash
git clone https://github.com/andriel300/gerenciamento-de-inventorio.git
cd gerenciamento-de-inventorio
```

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
