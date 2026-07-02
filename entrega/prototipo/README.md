# PolyLink — Protótipo (Next.js)

Protótipo de alto nível da solução **PolyLink — Plataforma de Integração e
Rastreabilidade da Cadeia de Suprimentos**, proposta para a empresa
PolymerForge 3D no projeto da disciplina **SSC0120 — Sistemas de
Informação (ICMC/USP)**.

## Executando

Requisitos: Node.js 18+.

```bash
npm install
npm run dev
```

O servidor sobe em `http://localhost:3000`.

## Telas incluídas

- `/` — Visão geral operacional (dashboard com KPIs, health score de fornecedores, alertas)
- `/pedidos` — Fila unificada de pedidos com status real de abastecimento
- `/fornecedores` — Cartões com score de confiabilidade e SLAs
- `/rastreabilidade` — Linha do tempo com todos os eventos de integração
- `/roteamento` — Regras de fallback e preferência por material
- `/alertas` — Central de alertas e políticas de severidade
- `/portal-b2b` — Visão exibida ao cliente final (montadora/oficina)
- `/config` — Governança e configurações do sistema

Todos os dados são **mockados** em `lib/mock-data.ts`.
