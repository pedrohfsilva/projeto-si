"use client";

import { AppShell } from "@/components/AppShell";
import {
  impactCards,
  onTimeDelivery,
  healthTimeline,
  alerts,
  orders,
} from "@/lib/mock-data";
import { OrderStatusBadge, SeverityBadge } from "@/components/StatusBadge";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  LineChart,
  Line,
  Legend,
} from "recharts";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Sparkles,
} from "lucide-react";
import Link from "next/link";

export default function DashboardPage() {
  const emAndamento = orders.filter(
    (o) => o.status !== "entregue" && o.status !== "falha"
  );

  return (
    <AppShell
      title="Visão geral operacional"
      subtitle="Painel de controle da orquestração de abastecimento — PolymerForge 3D"
    >
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {impactCards.map((c) => (
          <div key={c.titulo} className="card-p">
            <div className="text-xs text-slate-400">{c.titulo}</div>
            <div className="mt-2 flex items-end justify-between">
              <div className="text-3xl font-semibold">{c.valor}</div>
              <span
                className={`badge ${
                  c.positivo
                    ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20"
                    : "bg-rose-500/15 text-rose-300 border border-rose-400/20"
                }`}
              >
                <ArrowUpRight size={12} />
                {c.variacao}
              </span>
            </div>
          </div>
        ))}
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card-p xl:col-span-2">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-semibold">
                Health score por fornecedor (7 dias)
              </h2>
              <p className="text-xs text-slate-400">
                Monitoramento contínuo de latência, taxa de sucesso e coerência
                de contrato.
              </p>
            </div>
            <div className="text-xs text-slate-400">Atualizado há 1 min</div>
          </div>
          <div className="mt-4 h-64">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={healthTimeline}>
                <CartesianGrid stroke="#1f2a44" strokeDasharray="3 3" />
                <XAxis dataKey="dia" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[0, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #1f2a44",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Legend wrapperStyle={{ fontSize: 11 }} />
                <Line
                  type="monotone"
                  dataKey="polybrasil"
                  stroke="#34d399"
                  strokeWidth={2}
                  name="PolyBrasil"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="chempolymers"
                  stroke="#fbbf24"
                  strokeWidth={2}
                  name="ChemPolymers"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="termoplast"
                  stroke="#60a5fa"
                  strokeWidth={2}
                  name="TermoPlast"
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="norpolimeros"
                  stroke="#f87171"
                  strokeWidth={2}
                  name="NorPolímeros"
                  dot={false}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="card-p">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Taxa de entrega no prazo</h2>
            <span className="badge bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
              <CheckCircle2 size={12} /> +23 p.p.
            </span>
          </div>
          <div className="mt-4 h-40">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={onTimeDelivery}>
                <defs>
                  <linearGradient id="areaBrand" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3465ff" stopOpacity={0.6} />
                    <stop offset="100%" stopColor="#3465ff" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#1f2a44" strokeDasharray="3 3" />
                <XAxis dataKey="mes" stroke="#64748b" fontSize={11} />
                <YAxis stroke="#64748b" fontSize={11} domain={[60, 100]} />
                <Tooltip
                  contentStyle={{
                    background: "#0f172a",
                    border: "1px solid #1f2a44",
                    borderRadius: 8,
                    fontSize: 12,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="taxa"
                  stroke="#598cff"
                  fill="url(#areaBrand)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Meta 2026: <strong className="text-slate-200">96%</strong>. Ritmo
            atual mantém a projeção com folga de 3 meses.
          </p>
        </div>
      </section>

      <section className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card-p xl:col-span-2">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Pedidos em andamento</h2>
            <Link
              href="/pedidos"
              className="text-xs text-brand-300 hover:text-brand-200"
            >
              ver todos →
            </Link>
          </div>
          <div className="overflow-hidden rounded-xl border border-surface-border">
            <table className="w-full text-sm">
              <thead className="bg-white/[0.02] text-xs uppercase tracking-wide text-slate-400">
                <tr>
                  <th className="px-4 py-2 text-left">Pedido</th>
                  <th className="px-4 py-2 text-left">Cliente</th>
                  <th className="px-4 py-2 text-left">Fornecedor</th>
                  <th className="px-4 py-2 text-left">Status</th>
                  <th className="px-4 py-2 text-left">Progresso</th>
                </tr>
              </thead>
              <tbody>
                {emAndamento.map((o) => (
                  <tr key={o.id} className="table-row">
                    <td className="px-4 py-2.5 font-mono text-xs">{o.id}</td>
                    <td className="px-4 py-2.5">{o.cliente}</td>
                    <td className="px-4 py-2.5 text-slate-300">
                      {o.fornecedor}
                    </td>
                    <td className="px-4 py-2.5">
                      <OrderStatusBadge status={o.status} />
                    </td>
                    <td className="px-4 py-2.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-24 rounded-full bg-surface-border overflow-hidden">
                          <div
                            className={`h-full ${
                              o.status === "falha"
                                ? "bg-rose-400"
                                : "bg-brand-400"
                            }`}
                            style={{ width: `${o.progresso}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-400">
                          {o.progresso}%
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="card-p">
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold">Alertas ativos</h2>
            <Link
              href="/alertas"
              className="text-xs text-brand-300 hover:text-brand-200"
            >
              central →
            </Link>
          </div>
          <div className="space-y-3">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-surface-border bg-black/20 p-3"
              >
                <div className="flex items-center justify-between">
                  <SeverityBadge severity={a.severidade} />
                  <span className="text-[11px] text-slate-400">{a.tempo}</span>
                </div>
                <div className="mt-1.5 text-sm font-medium leading-snug">
                  {a.titulo}
                </div>
                <p className="mt-1 text-xs text-slate-400">{a.descricao}</p>
                <div className="mt-2 flex items-center gap-1 text-[11px] text-slate-500">
                  <AlertTriangle size={12} /> Responsável: {a.dono}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="card-p">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-brand-500/20 text-brand-200">
            <Sparkles size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold">
              Recomendações automáticas do PolyLink
            </h2>
            <ul className="mt-3 space-y-2 text-sm text-slate-300">
              <li>
                • Reduzir o volume enviado ao fornecedor <strong>NorPolímeros</strong> em 60% e priorizar rotas alternativas para materiais TPU/PETG nos próximos 7 dias.
              </li>
              <li>
                • Renegociar SLA com <strong>ChemPolymers</strong> — histórico dos últimos 14 dias indica latência crescente que compromete a janela de 48 h.
              </li>
              <li>
                • Homologar <strong>PolyBrasil</strong> para nylon com fibra de carbono, ampliando margem de failover em pedidos de alto valor.
              </li>
            </ul>
          </div>
        </div>
      </section>
    </AppShell>
  );
}
