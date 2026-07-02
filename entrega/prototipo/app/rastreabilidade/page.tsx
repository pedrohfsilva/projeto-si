"use client";

import { AppShell } from "@/components/AppShell";
import { OrderStatusBadge } from "@/components/StatusBadge";
import { orders, transactionLog } from "@/lib/mock-data";
import {
  AlertOctagon,
  ArrowRightLeft,
  BellRing,
  CheckCircle2,
  Clock3,
  FileText,
  LucideIcon,
  RefreshCcw,
  Send,
} from "lucide-react";

const iconByTipo: Record<string, LucideIcon> = {
  requisicao: Send,
  resposta: FileText,
  callback: CheckCircle2,
  polling: Clock3,
  retentativa: RefreshCcw,
  alerta: BellRing,
  roteamento: ArrowRightLeft,
};

const statusColor: Record<string, string> = {
  ok: "text-emerald-300 bg-emerald-500/15 border-emerald-400/20",
  aviso: "text-amber-300 bg-amber-500/15 border-amber-400/20",
  erro: "text-rose-300 bg-rose-500/15 border-rose-400/20",
};

export default function RastreabilidadePage() {
  const pedido = orders.find((o) => o.status === "reroteado") ?? orders[0];

  return (
    <AppShell
      title="Rastreabilidade fim a fim"
      subtitle="Toda transação com fornecedores é registrada com payload, correlation ID e status real"
    >
      <div className="card-p">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <div className="text-xs text-slate-400">Pedido em análise</div>
            <div className="mt-1 text-lg font-semibold">
              {pedido.id}{" "}
              <span className="text-sm text-slate-400 font-normal">
                — {pedido.cliente}
              </span>
            </div>
            <div className="text-xs text-slate-400">
              {pedido.peca} · {pedido.material} · {pedido.quantidadeKg} kg
            </div>
          </div>
          <div className="flex items-center gap-3">
            <OrderStatusBadge status={pedido.status} />
            <button className="btn-ghost border border-surface-border">
              <RefreshCcw size={13} /> Atualizar
            </button>
            <button className="btn-primary">
              <FileText size={13} /> Exportar auditoria
            </button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg border border-surface-border p-3">
            <div className="text-slate-400">Correlation ID</div>
            <div className="mt-1 font-mono">req_2026-07-01_9c4f8b</div>
          </div>
          <div className="rounded-lg border border-surface-border p-3">
            <div className="text-slate-400">Rota original</div>
            <div className="mt-1">NorPolímeros · adapter v1.7</div>
          </div>
          <div className="rounded-lg border border-surface-border p-3">
            <div className="text-slate-400">Rota final</div>
            <div className="mt-1 text-brand-200">PolyBrasil · adapter v3.4</div>
          </div>
          <div className="rounded-lg border border-surface-border p-3">
            <div className="text-slate-400">Tempo total até confirmação</div>
            <div className="mt-1">1h 34min</div>
          </div>
        </div>
      </div>

      <div className="card-p">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Linha do tempo da integração</h2>
          <span className="text-xs text-slate-400">
            9 eventos registrados · logs completos disponíveis
          </span>
        </div>

        <ol className="mt-5 relative border-l border-surface-border ml-3">
          {transactionLog.map((ev, i) => {
            const Icon = iconByTipo[ev.tipo] ?? FileText;
            return (
              <li key={i} className="ml-4 pb-6 last:pb-0">
                <span className="absolute -left-[9px] mt-1 flex h-4 w-4 items-center justify-center rounded-full bg-surface-card border border-surface-border">
                  <Icon size={10} className="text-brand-300" />
                </span>
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-mono text-[11px] text-slate-400">
                    {ev.timestamp}
                  </span>
                  <span
                    className={`badge border ${statusColor[ev.status]}`}
                  >
                    {ev.status === "ok"
                      ? "sucesso"
                      : ev.status === "aviso"
                      ? "atenção"
                      : "erro"}
                  </span>
                  <span className="badge bg-white/[0.03] border border-surface-border text-slate-300 capitalize">
                    {ev.tipo}
                  </span>
                </div>
                <div className="mt-1 text-sm">{ev.descricao}</div>
                {ev.payload && (
                  <pre className="mt-2 overflow-x-auto rounded-lg border border-surface-border bg-black/40 p-2 text-[11px] text-slate-300 font-mono">
                    {ev.payload}
                  </pre>
                )}
              </li>
            );
          })}
        </ol>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="card-p">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-content-center rounded-lg bg-rose-500/20 text-rose-300">
              <AlertOctagon size={14} />
            </div>
            <div className="text-sm font-semibold">Falha silenciosa detectada</div>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            HTTP 200 sem número de rastreio no corpo — o polling assíncrono
            confirmou que o pedido nunca entrou na fila do fornecedor.
          </p>
        </div>
        <div className="card-p">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-content-center rounded-lg bg-emerald-500/20 text-emerald-300">
              <ArrowRightLeft size={14} />
            </div>
            <div className="text-sm font-semibold">
              Reroteamento sem intervenção
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            PolyLink migrou o pedido para PolyBrasil em 47 s, cumprindo o
            prazo original prometido ao cliente.
          </p>
        </div>
        <div className="card-p">
          <div className="flex items-center gap-2">
            <div className="grid h-8 w-8 place-content-center rounded-lg bg-brand-500/20 text-brand-200">
              <FileText size={14} />
            </div>
            <div className="text-sm font-semibold">
              Auditoria pronta para SLA
            </div>
          </div>
          <p className="mt-2 text-xs text-slate-400">
            Payloads e cabeçalhos preservados por 12 meses. Basta um clique
            para gerar dossiê contratual em caso de disputa com fornecedor.
          </p>
        </div>
      </div>
    </AppShell>
  );
}
