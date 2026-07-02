"use client";

import { AppShell } from "@/components/AppShell";
import { SupplierStatusBadge } from "@/components/StatusBadge";
import { suppliers } from "@/lib/mock-data";
import { Activity, Clock, PackageCheck, ShieldAlert } from "lucide-react";

function healthColor(score: number) {
  if (score >= 85) return "from-emerald-400 to-emerald-600";
  if (score >= 65) return "from-amber-400 to-amber-600";
  return "from-rose-400 to-rose-600";
}

export default function FornecedoresPage() {
  return (
    <AppShell
      title="Fornecedores homologados"
      subtitle="Score contínuo de confiabilidade, contratos de API e histórico de incidentes"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
        {suppliers.map((f) => (
          <div key={f.id} className="card-p flex flex-col gap-3">
            <div className="flex items-start justify-between">
              <div>
                <div className="text-xs font-mono text-slate-400">{f.id}</div>
                <div className="text-sm font-semibold leading-tight mt-0.5">
                  {f.nome}
                </div>
                <div className="text-xs text-slate-400">{f.cidade}</div>
              </div>
              <SupplierStatusBadge status={f.status} />
            </div>

            <div>
              <div className="flex items-baseline justify-between">
                <span className="text-xs text-slate-400">Health score</span>
                <span className="text-2xl font-semibold">{f.healthScore}</span>
              </div>
              <div className="mt-1 h-2 rounded-full bg-surface-border overflow-hidden">
                <div
                  className={`h-full bg-gradient-to-r ${healthColor(
                    f.healthScore
                  )}`}
                  style={{ width: `${f.healthScore}%` }}
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2 text-xs">
              <div className="rounded-lg border border-surface-border bg-black/20 px-2 py-2">
                <div className="flex items-center gap-1 text-slate-400">
                  <Activity size={12} /> Latência
                </div>
                <div className="mt-0.5 font-medium">{f.latenciaMs} ms</div>
              </div>
              <div className="rounded-lg border border-surface-border bg-black/20 px-2 py-2">
                <div className="flex items-center gap-1 text-slate-400">
                  <PackageCheck size={12} /> Sucesso
                </div>
                <div className="mt-0.5 font-medium">{f.taxaSucesso}%</div>
              </div>
              <div className="rounded-lg border border-surface-border bg-black/20 px-2 py-2">
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock size={12} /> SLA confirmação
                </div>
                <div className="mt-0.5 font-medium">{f.slaConfirmacaoH} h</div>
              </div>
              <div className="rounded-lg border border-surface-border bg-black/20 px-2 py-2">
                <div className="flex items-center gap-1 text-slate-400">
                  <ShieldAlert size={12} /> Incidentes 30d
                </div>
                <div
                  className={`mt-0.5 font-medium ${
                    f.incidentes30d >= 5 ? "text-rose-300" : "text-slate-100"
                  }`}
                >
                  {f.incidentes30d}
                </div>
              </div>
            </div>

            <div className="text-xs">
              <div className="text-slate-400 mb-1">Materiais suportados</div>
              <div className="flex flex-wrap gap-1">
                {f.materiais.map((m) => (
                  <span
                    key={m}
                    className="badge bg-white/[0.03] border border-surface-border text-slate-300"
                  >
                    {m}
                  </span>
                ))}
              </div>
            </div>

            <div className="mt-auto flex items-center justify-between text-[11px] text-slate-400">
              <span>Adapter API: {f.versaoApi}</span>
              <span>{f.ultimaAtualizacao}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="card-p">
        <h2 className="text-sm font-semibold">Como o score é calculado</h2>
        <p className="mt-1 text-xs text-slate-400">
          O health score combina, em janela móvel de 7 dias, quatro
          dimensões monitoradas pelo PolyLink em tempo real. Fornecedores com
          score abaixo de 60 são automaticamente rebaixados na ordem de
          prioridade de novos pedidos.
        </p>
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-xs">
          <div className="rounded-lg border border-surface-border p-3">
            <div className="text-slate-400">Taxa de sucesso</div>
            <div className="mt-1 font-medium">Peso 40%</div>
            <p className="mt-1 text-slate-500">
              Confirmações reais (não HTTP 200) sobre total de envios.
            </p>
          </div>
          <div className="rounded-lg border border-surface-border p-3">
            <div className="text-slate-400">Latência p95</div>
            <div className="mt-1 font-medium">Peso 20%</div>
            <p className="mt-1 text-slate-500">
              Tempo entre requisição e confirmação assíncrona do pedido.
            </p>
          </div>
          <div className="rounded-lg border border-surface-border p-3">
            <div className="text-slate-400">Aderência ao contrato</div>
            <div className="mt-1 font-medium">Peso 25%</div>
            <p className="mt-1 text-slate-500">
              Validação de schema em cada resposta contra o contrato ativo.
            </p>
          </div>
          <div className="rounded-lg border border-surface-border p-3">
            <div className="text-slate-400">Aderência ao SLA</div>
            <div className="mt-1 font-medium">Peso 15%</div>
            <p className="mt-1 text-slate-500">
              Cumprimento dos prazos acordados de entrega física do polímero.
            </p>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
