# OrtoCheck

Ferramenta que verifica automaticamente a ortografia de todas as páginas de um site. Basta informar a URL — o OrtoCheck navega por todas as páginas internas, extrai o conteúdo textual e aponta os erros ortográficos encontrados, com sugestões de correção.

Projeto criado para automatizar um processo antigamente manual: revisar página por página a ortografia de sites no fim de um projeto de desenvolvimento.

## Como funciona

1. Você informa a URL do site e o idioma a ser verificado
2. O **crawler** navega pelo site, descobrindo todas as páginas internas
3. O **extractor** extrai o texto visível de cada página, ignorando código e scripts
4. O **checker** envia o texto para o [LanguageTool](https://languagetool.org) e recolhe os erros ortográficos encontrados
5. Um relatório é exibido, mostrando quais páginas têm erros e as sugestões de correção

## Tecnologias

**Backend**
- Node.js + TypeScript
- Express
- Playwright (crawler)
- LanguageTool API (verificação ortográfica)
- Server-Sent Events (progresso em tempo real)

**Frontend**
- React + TypeScript
- Vite
- Lucide React (ícones)

## Estrutura do projeto

```
ortocheck/
├── backend/
│   ├── src/
│   │   ├── crawler/       # Descobre e visita páginas do site
│   │   ├── extractor/     # Extrai texto limpo do HTML
│   │   ├── checker/       # Verifica ortografia via LanguageTool
│   │   ├── routes/        # Endpoint /check (SSE)
│   │   └── index.ts       # Servidor Express
│   └── package.json
└── frontend/
    ├── src/
    │   ├── pages/          # Home, Loading, Report
    │   ├── components/     # Header, LanguageSelect, etc.
    │   ├── utils/           # Validações
    │   └── App.tsx          # Orquestrador das telas
    └── package.json
```

## Como rodar localmente

### Pré-requisitos
- [Node.js](https://nodejs.org) 18 ou superior

### Backend

```bash
cd backend
npm install
npx playwright install chromium
npm run dev
```

O servidor sobe em `http://localhost:3001`.

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

A aplicação sobe em `http://localhost:5173`.

> **Importante:** backend e frontend precisam estar rodando ao mesmo tempo, em terminais separados.

## Configuração

O backend usa a API pública gratuita do LanguageTool por padrão. Para usar uma instância própria (self-hosted via Docker), crie um arquivo `.env` na pasta `backend`:

```
LANGUAGETOOL_URL=http://localhost:8010/v2/check
```

## Funcionalidades

- ✅ Crawling automático de páginas internas do mesmo domínio
- ✅ Extração de texto limpo (ignora scripts, estilos)
- ✅ Verificação ortográfica com suporte a múltiplos idiomas
- ✅ Progresso em tempo real durante a verificação
- ✅ Relatório com filtros (todas as páginas / com erros / sem erros)
- ✅ Detalhamento de erros por página, com sugestão de correção e contexto
- ✅ Reanálise rápida com os mesmos parâmetros
- ✅ Tratamento de erros (site inacessível, corretor indisponível, URL inválida)

## Limitações conhecidas

- A API pública do LanguageTool tem limite de 20 requisições por minuto, compartilhado entre todos os usuários da aplicação — pode deixar o processo lento em uso simultâneo
- O crawler processa até 20 páginas por site por padrão (configurável no backend)
- Textos muito longos por página são truncados em ~19.000 caracteres (limite da API gratuita)