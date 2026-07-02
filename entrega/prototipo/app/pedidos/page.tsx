"use client";

import { AppShell } from "@/components/AppShell";
import { OrderStatusBadge } from "@/components/StatusBadge";
import { orders } from "@/lib/mock-data";
import { Filter, Plus } from "lucide-react";
import Link from "next/link";

export default function PedidosPage() {
  return (
    <AppShell
      title="Pedidos"
      subtitle="Fila unificada de pedidos internos, com estado real do abastecimento"
    >
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <button className="btn-ghost border border-surface-border">
            <Filter size={14} /> Filtrar
          </button>
          {["Todos", "Em andamento", "Reroteados", "Falhas", "Entregues"].map(
            (label, i) => (
              <button
                key={label}
                className={`btn text-xs ${
                  i === 0
                    ? "bg-brand-500/20 text-brand-100 border border-brand-500/30"
                    : "border border-surface-border text-slate-300 hover:bg-white/5"
                }`}
              >
                {label}
              </button>
            )
          )}
        </div>
        <button className="btn-primary">
          <Plus size={14} /> Novo pedido de abastecimento
        </button>
      </div>

      <div className="overflow-hidden card">
        <table className="w-full text-sm">
          <thead className="bg-white/[0.02] text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-4 py-3 text-left">Pedido</th>
              <th className="px-4 py-3 text-left">Cliente</th>
              <th className="px-4 py-3 text-left">Peça / Material</th>
              <th className="px-4 py-3 text-left">Kg</th>
              <th className="px-4 py-3 text-left">Fornecedor</th>
              <th className="px-4 py-3 text-left">Status real</th>
              <th className="px-4 py-3 text-left">Prazo</th>
              <th className="px-4 py-3 text-right">Valor</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((o) => (
              <tr key={o.id} className="table-row">
                <td className="px-4 py-3">
                  <Link
                    href={`/rastreabilidade?pedido=${o.id}`}
                    className="font-mono text-xs text-brand-300 hover:text-brand-200"
                  >
                    {o.id}
                  </Link>
                </td>
                <td className="px-4 py-3">{o.cliente}</td>
                <td className="px-4 py-3">
                  <div className="font-medium">{o.peca}</div>
                  <div className="text-xs text-slate-400">{o.material}</div>
                </td>
                <td className="px-4 py-3 tabular-nums">
                  {o.quantidadeKg.toFixed(1)}
                </td>
                <td className="px-4 py-3 text-slate-300">{o.fornecedor}</td>
                <td className="px-4 py-3">
                  <OrderStatusBadge status={o.status} />
                  {o.observacao && (
                    <div className="mt-1 text-[11px] text-slate-400 max-w-xs">
                      {o.observacao}
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 text-xs">
                  <div>{o.prazoEntrega}</div>
                  <div className="text-slate-400">
                    criado {o.criadoEm}
                  </div>
                </td>
                <td className="px-4 py-3 text-right tabular-nums">
                  R${" "}
                  {o.valor.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-p">
          <div className="text-xs text-slate-400">Total em janela de 48h</div>
          <div className="mt-1 text-2xl font-semibold">28 pedidos</div>
          <div className="text-xs text-slate-400">
            R$ 148.230 em abastecimento comprometido
          </div>
        </div>
        <div className="card-p">
          <div className="text-xs text-slate-400">Confirmação assíncrona</div>
          <div className="mt-1 text-2xl font-semibold">96% em ≤ 45 min</div>
          <div className="text-xs text-slate-400">
            SLA interno para reconhecimento após envio
          </div>
        </div>
        <div className="card-p">
          <div className="text-xs text-slate-400">Reroteamentos automáticos (7d)</div>
          <div className="mt-1 text-2xl font-semibold">9 pedidos</div>
          <div className="text-xs text-slate-400">
            0 exigiram intervenção manual
          </div>
        </div>
      </div>
    </AppShell>
  );
}
