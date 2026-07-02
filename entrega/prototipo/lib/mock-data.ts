export type SupplierStatus = "saudavel" | "degradado" | "critico" | "offline";

export type Supplier = {
  id: string;
  nome: string;
  cidade: string;
  materiais: string[];
  healthScore: number;
  status: SupplierStatus;
  latenciaMs: number;
  taxaSucesso: number;
  slaConfirmacaoH: number;
  ultimaAtualizacao: string;
  versaoApi: string;
  incidentes30d: number;
};

export const suppliers: Supplier[] = [
  {
    id: "F-001",
    nome: "PolyBrasil Insumos S/A",
    cidade: "Campinas, SP",
    materiais: ["Polipropileno PP", "ABS", "Nylon PA6"],
    healthScore: 94,
    status: "saudavel",
    latenciaMs: 412,
    taxaSucesso: 99.2,
    slaConfirmacaoH: 3,
    ultimaAtualizacao: "há 2 min",
    versaoApi: "v3.4",
    incidentes30d: 0,
  },
  {
    id: "F-002",
    nome: "ChemPolymers do Sul Ltda",
    cidade: "Joinville, SC",
    materiais: ["Nylon PA6 + FV", "Nylon + Fibra de Carbono", "PETG"],
    healthScore: 71,
    status: "degradado",
    latenciaMs: 1840,
    taxaSucesso: 92.4,
    slaConfirmacaoH: 8,
    ultimaAtualizacao: "há 6 min",
    versaoApi: "v2.1",
    incidentes30d: 3,
  },
  {
    id: "F-003",
    nome: "TermoPlast Indústria",
    cidade: "São Paulo, SP",
    materiais: ["Polipropileno PP", "ABS", "PLA técnico"],
    healthScore: 88,
    status: "saudavel",
    latenciaMs: 620,
    taxaSucesso: 98.1,
    slaConfirmacaoH: 4,
    ultimaAtualizacao: "há 1 min",
    versaoApi: "v4.0",
    incidentes30d: 1,
  },
  {
    id: "F-004",
    nome: "NorPolímeros Distribuidora",
    cidade: "Belo Horizonte, MG",
    materiais: ["PETG", "TPU flexível", "ABS"],
    healthScore: 34,
    status: "critico",
    latenciaMs: 5620,
    taxaSucesso: 74.5,
    slaConfirmacaoH: 22,
    ultimaAtualizacao: "há 24 min",
    versaoApi: "v1.7",
    incidentes30d: 7,
  },
];

export type OrderStatus =
  | "pendente"
  | "enviado"
  | "reconhecido"
  | "em_separacao"
  | "em_transito"
  | "entregue"
  | "falha"
  | "reroteado";

export type Order = {
  id: string;
  cliente: string;
  peca: string;
  material: string;
  quantidadeKg: number;
  fornecedor: string;
  fornecedorId: string;
  status: OrderStatus;
  criadoEm: string;
  prazoEntrega: string;
  progresso: number;
  ultimaConfirmacaoFornecedor: string | null;
  observacao?: string;
  valor: number;
};

export const orders: Order[] = [
  {
    id: "PED-2026-00184",
    cliente: "Montadora AutoNova SP",
    peca: "Suporte lateral do painel — modelo A-72",
    material: "Nylon PA6 + FV",
    quantidadeKg: 12.5,
    fornecedor: "ChemPolymers do Sul Ltda",
    fornecedorId: "F-002",
    status: "reconhecido",
    criadoEm: "2026-07-01 09:12",
    prazoEntrega: "2026-07-03 12:00",
    progresso: 45,
    ultimaConfirmacaoFornecedor: "2026-07-01 09:47",
    valor: 4820.5,
  },
  {
    id: "PED-2026-00183",
    cliente: "Oficina Turbo Center",
    peca: "Cobertura de sensor MAP",
    material: "ABS",
    quantidadeKg: 3.2,
    fornecedor: "TermoPlast Indústria",
    fornecedorId: "F-003",
    status: "em_transito",
    criadoEm: "2026-06-30 15:41",
    prazoEntrega: "2026-07-02 18:00",
    progresso: 78,
    ultimaConfirmacaoFornecedor: "2026-07-01 07:20",
    valor: 1280.0,
  },
  {
    id: "PED-2026-00182",
    cliente: "Frota Municipal Piracicaba",
    peca: "Buchas de suspensão — kit x8",
    material: "TPU flexível",
    quantidadeKg: 6.0,
    fornecedor: "NorPolímeros Distribuidora",
    fornecedorId: "F-004",
    status: "falha",
    criadoEm: "2026-06-30 11:03",
    prazoEntrega: "2026-07-02 12:00",
    progresso: 0,
    ultimaConfirmacaoFornecedor: null,
    observacao:
      "Fornecedor retornou HTTP 200 sem número de pedido. Confirmação assíncrona falhou após 4 tentativas.",
    valor: 2140.0,
  },
  {
    id: "PED-2026-00181",
    cliente: "AutoNova SP",
    peca: "Difusor de ar — série X",
    material: "Nylon PA6 + FV",
    quantidadeKg: 8.4,
    fornecedor: "PolyBrasil Insumos S/A",
    fornecedorId: "F-001",
    status: "reroteado",
    criadoEm: "2026-06-30 08:22",
    prazoEntrega: "2026-07-02 09:00",
    progresso: 62,
    ultimaConfirmacaoFornecedor: "2026-06-30 09:01",
    observacao:
      "Roteado automaticamente após degradação da API do ChemPolymers (health score < 60).",
    valor: 3210.75,
  },
  {
    id: "PED-2026-00180",
    cliente: "Retífica Motor Forte",
    peca: "Cárter simulador de bancada",
    material: "Nylon + Fibra de Carbono",
    quantidadeKg: 15.0,
    fornecedor: "PolyBrasil Insumos S/A",
    fornecedorId: "F-001",
    status: "entregue",
    criadoEm: "2026-06-28 10:14",
    prazoEntrega: "2026-06-30 14:00",
    progresso: 100,
    ultimaConfirmacaoFornecedor: "2026-06-28 11:02",
    valor: 7890.0,
  },
  {
    id: "PED-2026-00179",
    cliente: "Oficina Turbo Center",
    peca: "Presilha do turbocompressor",
    material: "PETG",
    quantidadeKg: 1.5,
    fornecedor: "TermoPlast Indústria",
    fornecedorId: "F-003",
    status: "em_separacao",
    criadoEm: "2026-07-01 07:55",
    prazoEntrega: "2026-07-02 20:00",
    progresso: 30,
    ultimaConfirmacaoFornecedor: "2026-07-01 08:15",
    valor: 640.0,
  },
];

export type TransactionEvent = {
  timestamp: string;
  tipo:
    | "requisicao"
    | "resposta"
    | "retentativa"
    | "callback"
    | "polling"
    | "alerta"
    | "roteamento";
  descricao: string;
  status: "ok" | "aviso" | "erro";
  payload?: string;
};

export const transactionLog: TransactionEvent[] = [
  {
    timestamp: "2026-07-01 09:12:04",
    tipo: "requisicao",
    descricao: "POST /v2/orders → ChemPolymers",
    status: "ok",
    payload:
      '{"material":"NYLON_PA6_FV","quantidade_kg":12.5,"pedido_ref":"PED-2026-00184"}',
  },
  {
    timestamp: "2026-07-01 09:12:05",
    tipo: "resposta",
    descricao: "HTTP 200 recebido do fornecedor",
    status: "ok",
    payload:
      '{"status":"received","tracking_id":"CP-889231","expected_ack":"3h"}',
  },
  {
    timestamp: "2026-07-01 09:47:12",
    tipo: "callback",
    descricao: "Callback assíncrono do fornecedor — pedido reconhecido",
    status: "ok",
    payload:
      '{"tracking_id":"CP-889231","confirmed_at":"2026-07-01T12:47:00Z","eta":"2026-07-02T18:00:00Z"}',
  },
  {
    timestamp: "2026-07-01 09:04:22",
    tipo: "requisicao",
    descricao: "POST /orders/v1 → NorPolímeros",
    status: "aviso",
    payload:
      '{"material":"TPU","peso":6,"referencia":"PED-2026-00182"}',
  },
  {
    timestamp: "2026-07-01 09:04:23",
    tipo: "resposta",
    descricao: "HTTP 200 recebido, corpo sem ID de pedido",
    status: "aviso",
    payload: '{"result":"ok"}',
  },
  {
    timestamp: "2026-07-01 09:34:23",
    tipo: "polling",
    descricao: "Consulta periódica — sem correspondência no fornecedor",
    status: "erro",
    payload:
      '{"query":"referencia=PED-2026-00182","match":false,"attempt":1}',
  },
  {
    timestamp: "2026-07-01 10:04:23",
    tipo: "retentativa",
    descricao: "Nova tentativa de envio (backoff 30min)",
    status: "aviso",
    payload: '{"attempt":2,"strategy":"exponential"}',
  },
  {
    timestamp: "2026-07-01 10:34:24",
    tipo: "alerta",
    descricao:
      "Alerta P1 disparado: NorPolímeros — falha silenciosa confirmada",
    status: "erro",
    payload:
      '{"severity":"P1","channel":["slack","email","dashboard"],"owner":"compras@polymerforge.com"}',
  },
  {
    timestamp: "2026-07-01 10:35:11",
    tipo: "roteamento",
    descricao:
      "Roteamento automático → PolyBrasil (fornecedor alternativo homologado)",
    status: "ok",
    payload:
      '{"fallback_supplier":"F-001","reason":"health_score_below_threshold","original":"F-004"}',
  },
];

export const healthTimeline = [
  { dia: "24/06", polybrasil: 96, chempolymers: 88, termoplast: 92, norpolimeros: 62 },
  { dia: "25/06", polybrasil: 94, chempolymers: 84, termoplast: 90, norpolimeros: 58 },
  { dia: "26/06", polybrasil: 97, chempolymers: 82, termoplast: 93, norpolimeros: 55 },
  { dia: "27/06", polybrasil: 95, chempolymers: 78, termoplast: 91, norpolimeros: 49 },
  { dia: "28/06", polybrasil: 96, chempolymers: 74, termoplast: 92, norpolimeros: 44 },
  { dia: "29/06", polybrasil: 94, chempolymers: 72, termoplast: 90, norpolimeros: 38 },
  { dia: "30/06", polybrasil: 95, chempolymers: 71, termoplast: 88, norpolimeros: 34 },
];

export const onTimeDelivery = [
  { mes: "Jan/26", taxa: 74 },
  { mes: "Fev/26", taxa: 78 },
  { mes: "Mar/26", taxa: 83 },
  { mes: "Abr/26", taxa: 87 },
  { mes: "Mai/26", taxa: 91 },
  { mes: "Jun/26", taxa: 94 },
];

export const impactCards = [
  {
    titulo: "Rupturas evitadas (últimos 30 dias)",
    valor: "12",
    variacao: "+9 vs. mês anterior",
    positivo: true,
  },
  {
    titulo: "Falhas silenciosas detectadas",
    valor: "27",
    variacao: "todas notificadas < 30 min",
    positivo: true,
  },
  {
    titulo: "Taxa de entrega no prazo",
    valor: "94%",
    variacao: "+23 p.p. vs. jun/2024",
    positivo: true,
  },
  {
    titulo: "Paralisações de linha",
    valor: "0,4 / mês",
    variacao: "queda de 83%",
    positivo: true,
  },
];

export const alerts = [
  {
    id: "ALT-9821",
    severidade: "P1",
    titulo: "NorPolímeros — falha silenciosa em resposta de API",
    descricao:
      "Fornecedor retornou HTTP 200 sem número de rastreio. Roteamento automático executado.",
    tempo: "há 3 min",
    dono: "Compras · Marcela",
  },
  {
    id: "ALT-9820",
    severidade: "P2",
    titulo: "ChemPolymers — latência p95 acima de 1,5 s por 20 min",
    descricao:
      "Health score reduzido de 82 para 71. Recomenda-se priorizar rota alternativa em novos pedidos.",
    tempo: "há 34 min",
    dono: "Infra · Ricardo",
  },
  {
    id: "ALT-9819",
    severidade: "P3",
    titulo: "TermoPlast — mudança de schema detectada",
    descricao:
      'Campo "status_pedido" renomeado para "order_status". Adapter v4 acionado automaticamente.',
    tempo: "há 2 h",
    dono: "Integrações · Beatriz",
  },
];

export const kpiCadeiaValor = [
  {
    atividade: "Compras e abastecimento",
    antes: "Reativo, dependente de investigação manual",
    depois: "Roteamento automático + score de confiabilidade",
    ganho: "-42% ordens revistas manualmente",
  },
  {
    atividade: "Produção",
    antes: "Paradas frequentes por falta de matéria-prima",
    depois: "Programação só inicia após confirmação real",
    ganho: "-83% paralisações não planejadas",
  },
  {
    atividade: "Atendimento ao cliente",
    antes: "Status fictício exibido no Portal B2B",
    depois: "Portal alimentado por estado real do fornecedor",
    ganho: "NPS +21 pontos em 2 trimestres",
  },
  {
    atividade: "TI e integrações",
    antes: "Debug manual por logs incompletos",
    depois: "Rastro completo de payloads e retentativas",
    ganho: "MTTR reduzido de 6h para 22min",
  },
];
