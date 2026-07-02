import { OrderStatus, SupplierStatus } from "@/lib/mock-data";

const orderStyles: Record<OrderStatus, string> = {
  pendente: "bg-slate-500/15 text-slate-300 border border-slate-400/20",
  enviado: "bg-sky-500/15 text-sky-300 border border-sky-400/20",
  reconhecido: "bg-blue-500/15 text-blue-300 border border-blue-400/20",
  em_separacao: "bg-indigo-500/15 text-indigo-300 border border-indigo-400/20",
  em_transito: "bg-amber-500/15 text-amber-300 border border-amber-400/20",
  entregue: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20",
  falha: "bg-rose-500/15 text-rose-300 border border-rose-400/20",
  reroteado: "bg-fuchsia-500/15 text-fuchsia-300 border border-fuchsia-400/20",
};

const orderLabels: Record<OrderStatus, string> = {
  pendente: "Pendente",
  enviado: "Enviado ao fornecedor",
  reconhecido: "Confirmado",
  em_separacao: "Em separação",
  em_transito: "Em trânsito",
  entregue: "Entregue",
  falha: "Falha detectada",
  reroteado: "Reroteado",
};

export function OrderStatusBadge({ status }: { status: OrderStatus }) {
  return (
    <span className={`badge ${orderStyles[status]}`}>{orderLabels[status]}</span>
  );
}

const supplierStyles: Record<SupplierStatus, string> = {
  saudavel: "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20",
  degradado: "bg-amber-500/15 text-amber-300 border border-amber-400/20",
  critico: "bg-rose-500/15 text-rose-300 border border-rose-400/20",
  offline: "bg-slate-500/15 text-slate-300 border border-slate-400/20",
};

const supplierLabels: Record<SupplierStatus, string> = {
  saudavel: "Saudável",
  degradado: "Degradado",
  critico: "Crítico",
  offline: "Offline",
};

export function SupplierStatusBadge({ status }: { status: SupplierStatus }) {
  return (
    <span className={`badge ${supplierStyles[status]}`}>
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {supplierLabels[status]}
    </span>
  );
}

export function SeverityBadge({ severity }: { severity: string }) {
  const map: Record<string, string> = {
    P1: "bg-rose-500/15 text-rose-300 border border-rose-400/20",
    P2: "bg-amber-500/15 text-amber-300 border border-amber-400/20",
    P3: "bg-sky-500/15 text-sky-300 border border-sky-400/20",
  };
  return (
    <span className={`badge ${map[severity] ?? "bg-slate-500/15 text-slate-300 border border-slate-400/20"}`}>
      {severity}
    </span>
  );
}
