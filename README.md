# Atlas Admin — Microfrontend Architecture com React + Vite

Atlas Admin é um projeto desenvolvido para explorar arquiteturas frontend escaláveis utilizando **Microfrontends**, **Module Federation**, **Monorepo** e um **Design System compartilhado**.

A aplicação simula um painel administrativo dividido em domínios independentes, onde cada módulo pode ser desenvolvido, executado e implantado separadamente, enquanto um Shell central orquestra toda a aplicação.

O objetivo principal do projeto foi estudar padrões utilizados em aplicações frontend de larga escala, com foco em desacoplamento entre times, compartilhamento de componentes e deploy independente.

---

## Preview da arquitetura

```bash
mfe-react/
│
├── apps/
│   ├── shell/             # Aplicação host responsável pela orquestração
│   │
│   ├── mfe-customers/     # Microfrontend de clientes
│   │
│   ├── mfe-products/      # Microfrontend de produtos
│   │
│   └── mfe-dashboard/     # Microfrontend de dashboard
│
├── packages/
│   └── shared-ui/         # Biblioteca compartilhada de componentes
│
└── node_modules/
```

---

## Stack utilizada

- React 18
- TypeScript
- Vite 5
- Module Federation (`@originjs/vite-plugin-federation`)
- TailwindCSS
- shadcn/ui
- NPM Workspaces
- Lucide React
- tsup (build do package compartilhado)

---

## Arquitetura do projeto

A aplicação foi construída utilizando uma arquitetura baseada em **Microfrontends independentes**.

Cada domínio da aplicação possui seu próprio projeto, podendo ser executado e buildado separadamente.

### Microfrontends disponíveis

| Aplicação | Porta |
| --------- | ----- |
| Shell     | 3000  |
| Customers | 5001  |
| Products  | 5002  |
| Dashboard | 5003  |

---

## Shell Application

O Shell é responsável por orquestrar todos os microfrontends remotamente utilizando Module Federation.

Configuração:

```ts
federation({
  name: "shell",
  remotes: {
    customers: "http://localhost:5001/assets/remoteEntry.js",
    products: "http://localhost:5002/assets/remoteEntry.js",
    dashboard: "http://localhost:5003/assets/remoteEntry.js",
  },
  shared: ["react", "react-dom"],
});
```

O Shell não contém regras de negócio.

Sua única responsabilidade é:

- Navegação
- Carregamento remoto dos MFEs
- Tratamento de falhas
- Composição da aplicação

---

## Microfrontends independentes

Cada domínio possui build, execução e deploy independentes.

Exemplo:

```ts
federation({
  name: "customers",
  filename: "remoteEntry.js",
  exposes: {
    "./customers": "./src/features/customers/pages/customers-page.tsx",
  },
});
```

Cada microfrontend pode:

- Ser desenvolvido isoladamente
- Ser buildado isoladamente
- Ser deployado independentemente
- Ser atualizado sem rebuild global

---

## Shared UI Package

Foi criada uma biblioteca compartilhada entre todos os microfrontends.

Estrutura:

```bash
packages/shared-ui
```

Responsável por centralizar:

- Button
- Input
- Badge
- Table
- Utility functions
- Global theme

Exports:

```ts
export * from "./components/ui/button";
export * from "./components/ui/table";
export * from "./components/ui/input";
export * from "./components/ui/badge";
export * from "./lib/utils";
```

Uso:

```tsx
import { Button } from "@shared/ui";
```

---

## Shared Styling

Todos os microfrontends compartilham o mesmo Design System utilizando um CSS global compartilhado.

```tsx
// main.tsx
import "@shared/ui/styles/globals.css";
import "./index.css";
```

Isso garante que o CSS seja carregado tanto localmente quanto em produção.

O CSS compartilhado contém:

- Variáveis globais
- Theme colors
- Tailwind base
- Utility classes

---

## Build do Shared Package

O package compartilhado possui build independente utilizando **tsup**.

Configuração:

```json
{
  "scripts": {
    "build": "tsup src/index.ts --format esm --dts && cp src/styles/globals.css dist/globals.css"
  }
}
```

Isso gera:

```bash
packages/shared-ui/dist
```

```bash
dist/
  index.js
  index.d.ts
  globals.css
```

---

## Monorepo Architecture

O projeto utiliza **NPM Workspaces** para centralizar dependências e compartilhar packages internos.

```json
{
  "private": true,
  "workspaces": ["apps/*", "packages/*"]
}
```

Benefícios:

- Dependências centralizadas
- Instalação única
- Versionamento compartilhado
- Melhor organização entre aplicações

---

## Resiliência entre Microfrontends

O Shell possui tratamento de falha para garantir que a indisponibilidade de um microfrontend não comprometa toda a aplicação.

Foi implementado um carregador dinâmico responsável por tentar importar cada remote e tratar falhas de carregamento.

Implementação:

```tsx
export function RemoteLoader({ remote }: Props) {
  const [Component, setComponent] = useState<any>(null);
  const [error, setError] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        let module;

        if (remote === "customers") {
          module = await import("customers/customers");
        }

        if (remote === "products") {
          module = await import("products/products");
        }

        if (remote === "dashboard") {
          module = await import("dashboard/dashboard");
        }

        if (active) {
          setComponent(() => module?.default);
        }
      } catch {
        if (active) {
          setError(true);
        }
      }
    }

    load();

    return () => {
      active = false;
    };
  }, [remote]);

  if (error) {
    return <div>MFE não disponível no momento</div>;
  }

  if (!Component) {
    return <p>Loading...</p>;
  }

  return <Component />;
}
```

Se algum remote estiver indisponível:

```text
MFE não disponível no momento
```

Sem comprometer a aplicação inteira.

---

## Solução para CSS entre Microfrontends

Um dos principais desafios foi o carregamento de estilos dos remotes dentro do Shell.

Problema encontrado:

```text
Componentes renderizavam, porém estilos Tailwind não eram aplicados dentro do Shell
```

Causa:

```text
Vite extraía CSS em arquivos separados e o Module Federation não carregava automaticamente o CSS do remote
```

Solução aplicada:

```ts
// vite.config.ts
build: {
  target: "esnext",
  cssCodeSplit: false
}
```

---

## Como executar localmente

### Instalar dependências

Na raiz do projeto:

```bash
npm install
```

---

### Rodar microfrontends individualmente

Customers

```bash
cd apps/mfe-customers
npm run dev
```

Products

```bash
cd apps/mfe-products
npm run dev
```

Dashboard

```bash
cd apps/mfe-dashboard
npm run dev
```

Shell

```bash
cd apps/shell
npm run dev
```

---

## Rodar em modo de produção

Primeiro buildar cada remote.

### Customers

```bash
cd apps/mfe-customers
npm run build
npm run preview
```

### Products

```bash
cd apps/mfe-products
npm run build
npm run preview
```

### Dashboard

```bash
cd apps/mfe-dashboard
npm run build
npm run preview
```

Depois iniciar o Shell.

```bash
cd apps/shell
npm run dev
```

ou

```bash
npm run build
npm run preview
```

---

## Principais desafios técnicos resolvidos

### Compartilhamento de componentes entre aplicações

Problema:

```text
Cannot find module '@shared/ui'
```

Solução:

- Package exports
- Shared package build
- Workspaces internos

---

### Conflito de dependências Vite

Problema:

```text
PluginOption[] is not assignable
No overload matches this call
```

Solução:

Padronização da mesma versão do Vite em todos os workspaces.

---

### CSS não carregando no Shell

Problema:

```text
Classes Tailwind apareciam no HTML mas não no CSS
```

Solução:

```ts
cssCodeSplit: false;
```

---

### Build independente do Shared Package

Problema:

```text
Failed to resolve import '@shared/ui/styles/globals.css'
```

Solução:

Build próprio utilizando:

```bash
tsup + css copy
```

---

## Autor

**Fernando Gatto**

[GitHub](https://github.com/fernandogatto)
[LinkedIn](https://www.linkedin.com/in/fernando-gatto/)
