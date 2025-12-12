# Thera Consulting - Frontend Test

Aplicação web para gerenciamento de produtos desenvolvida com Next.js, TypeScript, Zustand e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 14** - Framework React com App Router
- **TypeScript** - Linguagem de programação
- **Zustand** - Gerenciamento de estado global
- **Tailwind CSS** - Framework de estilização
- **MSW** - Mock Service Worker para API mock
- **Jest** - Framework de testes
- **Testing Library** - Biblioteca de testes para React
- **JWT** - Autenticação com tokens

## 📋 Pré-requisitos

- Node.js 18+ instalado
- npm ou yarn

## 🛠️ Instalação e Configuração

### Instalação Local

1. **Clone o repositório** (ou navegue até o diretório do projeto):
   ```bash
   cd frontend-test
   ```

2. **Instale as dependências**:
   ```bash
   npm install
   ```

3. **Execute o projeto em modo desenvolvimento**:
   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**:
   - Abra [http://localhost:3002](http://localhost:3002) no navegador
   - Você será redirecionado para a tela de login em `/login`
   - Use as credenciais do backend ou crie uma nova conta
   - **Credenciais de teste** (após rodar seeders no backend):
     - Email: `admin@thera.com` / Senha: `admin123`
     - Email: `test@thera.com` / Senha: `test123`
   
   **Nota**: A aplicação está configurada para rodar na porta 3002 para evitar conflitos com outras aplicações. O backend deve estar rodando na porta 3001.

## 🧪 Executando os Testes

### Executar todos os testes:
```bash
npm test
```

### Executar testes em modo watch:
```bash
npm run test:watch
```

### Atualizar snapshots:
```bash
npm run test:snapshot
```

## 📚 Funcionalidades Implementadas

### Funcionalidades Obrigatórias

✅ **Autenticação**
- Tela de login e cadastro
- Integração com JWT do backend
- Proteção de rotas
- Logout

✅ **Listagem de Produtos**
- Exibe nome, categoria, preço, descrição e imagem
- Layout responsivo com grid adaptável
- Suporte a imagens externas (URLs de imagens da internet)
- Imagens renderizadas em tamanho adequado sem quebrar o layout

✅ **Formulário de Cadastro**
- Campos: Nome, Categoria, Preço, Descrição e URL da Imagem
- Máscara de formatação de preço (R$ 1.234,56) durante a digitação
- Remoção automática da máscara ao submeter (mantém formato numérico)
- Validação de formulário com feedback visual
- Campos com cores adequadas para melhor visibilidade
- Produto cadastrado é exibido imediatamente na lista

✅ **Filtros**
- Busca por nome
- Filtro por faixa de preço (mínimo e máximo)

✅ **Ordenação**
- Ordenação por nome, preço ou categoria
- Ordem crescente ou decrescente

### Extras Implementados

✅ **Paginação**
- Paginação automática da lista de produtos
- 5 itens por página (configurável)
- Integração com backend para paginação server-side
- Navegação entre páginas com botões Anterior/Próxima

✅ **Layout Responsivo**
- Design totalmente responsivo
- Adaptação para mobile, tablet e desktop
- Grid que se ajusta automaticamente

✅ **Teste de Snapshot**
- Teste de snapshot implementado para ProductList

✅ **Autenticação JWT**
- Tela de login e cadastro implementada
- Integração com backend JWT
- Proteção de rotas
- Logout funcional

✅ **Documentação**
- README completo com instruções
- Documentação das escolhas técnicas
- Instruções para rodar testes

✅ **Melhorias de UX**
- Máscara de formatação de preço em tempo real (R$ 1.234,56)
- Campos do formulário com cores adequadas (bg-white, text-gray-900)
- Suporte a imagens externas configurado no Next.js
- Imagens renderizadas com tamanho fixo (h-48) para manter layout consistente

## 🏗️ Estrutura do Projeto

```
frontend-test/
├── app/                    # App Router do Next.js
│   ├── layout.tsx         # Layout principal
│   ├── page.tsx           # Página inicial
│   └── globals.css        # Estilos globais
├── components/            # Componentes React
│   ├── ProductList.tsx    # Lista de produtos
│   ├── ProductCard.tsx    # Card de produto
│   ├── ProductForm.tsx    # Formulário de cadastro
│   ├── ProductFilters.tsx # Filtros e ordenação
│   └── Pagination.tsx     # Componente de paginação
├── store/                 # Zustand stores
│   └── productStore.ts    # Store de produtos
├── lib/                   # Utilitários e tipos
│   └── types.ts           # Tipos TypeScript
├── mocks/                 # Mock handlers (MSW)
└── __tests__/            # Testes
    └── ProductList.test.tsx
```

## 🎨 Escolhas Técnicas

### Next.js 14 com App Router
- Utilizado App Router para melhor performance e suporte a Server Components
- TypeScript para type safety
- Roteamento baseado em arquivos

### Zustand para Gerenciamento de Estado
- Biblioteca leve e simples
- Melhor performance que Redux
- Fácil integração com React
- Store centralizado para produtos, filtros e paginação

### Tailwind CSS
- Estilização utilitária e rápida
- Design system consistente
- Responsividade nativa
- Customização fácil

### MSW (Mock Service Worker)
- Preparado para mock de API (não implementado completamente neste projeto)
- Permite desenvolvimento sem backend
- Fácil migração para API real

## 🔧 Scripts Disponíveis

- `npm run dev` - Inicia servidor de desenvolvimento
- `npm run build` - Compila o projeto para produção
- `npm run start` - Inicia servidor de produção
- `npm run lint` - Executa o linter
- `npm test` - Executa testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:snapshot` - Atualiza snapshots

## 📝 Exemplo de Uso

### Cadastrar um Produto:
1. Preencha o formulário no lado direito da tela
2. Informe: Nome, Categoria, Preço, Descrição e (opcional) URL da Imagem
3. Clique em "Cadastrar Produto"
4. O produto aparecerá imediatamente na lista

### Filtrar Produtos:
1. Use o campo "Buscar por Nome" para filtrar por nome
2. Use "Preço Mínimo" e "Preço Máximo" para filtrar por faixa de preço
3. Os filtros são aplicados automaticamente

### Ordenar Produtos:
1. Selecione o campo de ordenação (Nome, Preço ou Categoria)
2. Escolha a ordem (Crescente ou Decrescente)
3. A lista será ordenada automaticamente

## 🎯 Critérios de Aceite Atendidos

✅ Listar produtos com todas as informações solicitadas
✅ Formulário de cadastro funcional
✅ Filtros por nome e faixa de preço
✅ Ordenação dos resultados
✅ Next.js + TypeScript
✅ Gerenciamento de estado global (Zustand)
✅ Mock API preparado (MSW)
✅ Tailwind CSS
✅ Paginação (extra)
✅ Layout responsivo (extra)
✅ Documentação (extra)
✅ Teste de snapshot (extra)

## 📄 Licença

Este projeto é público e está disponível para fins de avaliação técnica.

## 👤 Autor

**Samuel Alves Moutinho**

- 📧 Email: samuca.moutinho@gmail.com
- 🔗 GitHub: [@samoutinho](https://github.com/samoutinho)

Desenvolvido como parte do teste técnico para Thera Consulting.

