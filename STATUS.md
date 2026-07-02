# Status do trabalho — Projeto SSC0120 (PolymerForge 3D / PolyLink)

> Snapshot do que está pronto, onde está e o que falta.
> Atualizado em: **2026-07-02**.

---

## 1. Visão geral

- **Empresa-cliente:** PolymerForge 3D (dossiê em `A-Polymerforge.pdf`).
- **Problema recortado:** falhas silenciosas nas integrações com fornecedores de polímero + ausência de rastreabilidade.
- **Solução proposta:** **PolyLink** — Plataforma de Integração e Rastreabilidade da Cadeia de Abastecimento.
- **Data de entrega:** 06/07/2026 (Moodle).

## 2. Onde cada coisa está

```
projeto-si/
├── entrega/                          ← TUDO QUE VAI PARA O MOODLE (~2,7 MB)
│   ├── README.md                     Índice + grupo + declaração de IA
│   ├── texto_sistematizado.docx      50% da nota — pronto
│   ├── infografico.pdf               10% da nota — pronto (1 página)
│   ├── infografico.png               Mesmo infográfico, imagem
│   ├── infografico.html              Fonte editável do infográfico
│   └── prototipo/                    30% da nota — Next.js, pronto
│                                     (node_modules foi removido para
│                                      manter a entrega leve; roda com
│                                      npm install && npm run dev)
│
├── suporte/                          Scripts auxiliares (NÃO enviar)
│   ├── gerar_texto_sistematizado.py  Regera o .docx com python-docx
│   └── pdf-tool/                     Puppeteer p/ gerar PDF/PNG do infográfico
│       ├── render.js                 HTML → PDF
│       ├── render-png.js             HTML → PNG
│       └── measure.js                Debug de altura da página
│
├── A-Polymerforge.pdf                Dossiê da empresa
├── descricao_projeto_sistemas_informacao.md   Descrição oficial do trabalho
├── README.md                         Índice geral do repo
└── STATUS.md                         Este arquivo
```

## 3. O que está pronto

| Item | % nota | Arquivo | Estado |
|---|---|---|---|
| Tema/cenário | 10% | — (entregue antes, ignorado) | ✅ fora do escopo desta execução |
| Texto sistematizado | 50% | `entrega/texto_sistematizado.docx` | ✅ pronto — TNR 12pt, ~15 pgs de conteúdo |
| Protótipo | 30% | `entrega/prototipo/` | ✅ pronto — Next.js, 8 telas, build passa |
| Infográfico | 10% | `entrega/infografico.pdf` + `.png` + `.html` | ✅ pronto — 1 página, design minimalista |
| Declaração de uso de IA | — | seção 5 do docx + README | ✅ pronto (exigida pela descrição do trabalho) |

### Detalhes do texto sistematizado (`entrega/texto_sistematizado.docx`)

Seções presentes, todas em Times New Roman 12pt, alinhamento justificado, espaçamento 1,5:

- Capa (com NUSPs de todos os integrantes)
- Sumário
- 1. Introdução (1.1 Contextualização, 1.2 Motivação, 1.3 Soluções existentes)
- 2. Solução Proposta (2.1 Funcionalidades, 2.2 Técnicas, 2.3 Organizacionais, 2.4 Humanas, 2.5 Processos)
- 3. Processamento da Informação (3.1 Entrada, 3.2 Processamento, 3.3 Informações geradas)
- 4. Valor Organizacional e Vantagem Competitiva (4.1 Cadeia de valor, 4.2 Vantagem competitiva)
- 5. Uso de Ferramentas de IA (declaração)
- 6. Referências Bibliográficas

Contagem: 4.559 palavras → ~15 pgs de conteúdo (dentro do intervalo 10–15).

### Detalhes do protótipo (`entrega/prototipo/`)

- **Stack:** Next.js 14 (App Router) + TypeScript + Tailwind + lucide-react + recharts.
- **Dados:** todos mockados em `lib/mock-data.ts`.
- **Rotas / telas:**
  - `/` — Visão geral operacional (KPIs, health score de fornecedores, alertas)
  - `/pedidos` — Fila unificada de pedidos com status real
  - `/fornecedores` — Cartões com score + SLA
  - `/rastreabilidade` — Timeline com todos os eventos de integração
  - `/roteamento` — Regras de fallback e preferência por material
  - `/alertas` — Central de alertas + políticas de severidade
  - `/portal-b2b` — Visão que o cliente vê
  - `/config` — Governança
- **Como rodar:**
  ```bash
  cd entrega/prototipo
  npm install --registry=https://registry.npmjs.org/
  npm run dev
  # abrir http://localhost:3000
  ```
  > O `--registry` é necessário porque o `.npmrc` do usuário aponta para um registry corporativo (Uber). Sem o flag, o `npm install` falha com 401.
- **Última verificação:** `npm run build` passa; todas as 8 rotas retornam HTTP 200 no dev server.

### Detalhes do infográfico

- Arquivo-fonte editável: `entrega/infografico.html`.
- Design: minimalista, fundo claro, um único acento azul, conteúdo resumido
  (1 página). **Não** contém a declaração de uso de IA — ela está no texto e no
  README, que é onde a descrição do trabalho exige.
- Dimensões: 1080×1589 px (altura ajustada ao conteúdo, sem espaço sobrando).
- Regerar PDF/PNG (macOS, com Google Chrome instalado):
  ```bash
  cd suporte/pdf-tool
  npm install --registry=https://registry.npmjs.org/
  node render.js       # gera entrega/infografico.pdf
  node render-png.js   # gera entrega/infografico.png
  ```

## 4. Declaração de uso de IA (para não esquecer)

Escrita no texto (seção 5 do docx) e no README da entrega. **Removida do
infográfico** (decisão de design; a declaração continua presente onde a
descrição do trabalho a exige). Resumida:

- **Protótipo:** Claude Code foi usado para codificar o Next.js a partir das telas e funcionalidades **definidas pelo grupo**.
- **Revisão de texto:** Claude Code refinou clareza e coesão dos textos **redigidos pelos integrantes**, sem alterar ideias.
- Concepção do problema, solução, arquitetura, escopo e análises foram do grupo.

## 5. Grupo

| Nome | NUSP |
|---|---|
| Pedro Henrique Ferreira Silva | 14677526 |
| Enzo Tonon Morente | 14568476 |
| Miller Matheus Lima Anacleto Rocha | 13727954 |
| Ayrton da Costa Ganen Filho | 14560190 |
| Matheus Rodrigues de Oliveira | 16822535 |

## 6. Próximos passos possíveis (se quiser evoluir)

Nada é obrigatório — o trabalho está completo. Estas são só ideias caso queira polir:

- [ ] Abrir o `.docx` no Word/LibreOffice e conferir a paginação real (a estimativa é ~15 pgs, mas depende da fonte instalada).
- [ ] Rodar o protótipo (`npm install && npm run dev`) e navegar entre as 8 telas para tirar screenshots que podem servir na apresentação.
- [ ] Se o professor exigir um único PDF do texto, exportar `texto_sistematizado.docx` → PDF pelo Word.
- [ ] Ajustar detalhes visuais do infográfico editando `entrega/infografico.html` e rerodando os scripts em `suporte/pdf-tool/`.
- [ ] Compactar `entrega/` em um `.zip` antes de subir no Moodle, se preferir enviar um arquivo só.

## 7. Comandos úteis para retomar em outra sessão

```bash
# ir para o projeto
cd ~/Desktop/USP/2026.1/projeto-si

# ver o que existe
ls entrega/
open entrega/texto_sistematizado.docx
open entrega/infografico.pdf

# rodar o protótipo
cd entrega/prototipo
npm install --registry=https://registry.npmjs.org/
npm run dev

# regerar o .docx do texto (só se editar o Python)
../../suporte/../.. # (ajustar caminho, ou usar o venv se ainda existir)
# python suporte/gerar_texto_sistematizado.py
```

> Obs.: o venv usado para gerar o docx ficou em
> `/private/tmp/claude-503/.../scratchpad/venv` e pode não sobreviver
> a um reboot. Se precisar regerar o texto, recrie o venv:
> ```bash
> python3 -m venv .venv
> .venv/bin/pip install --index-url https://pypi.org/simple/ python-docx pypdf
> .venv/bin/python suporte/gerar_texto_sistematizado.py
> ```
