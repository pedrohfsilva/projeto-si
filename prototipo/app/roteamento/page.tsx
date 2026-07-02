"use client";

import { AppShell } from "@/components/AppShell";
import { suppliers } from "@/lib/mock-data";
import { ArrowRight, Check, X, Settings2 } from "lucide-react";

const regras = [
  {
    id: "R-001",
    quando:
      "Health score < 60 OU 2 falhas silenciosas nas últimas 4h no fornecedor primário",
    entao: "Roteia para fornecedor secundário homologado com adapter ativo",
    prioridade: "Alta",
    ativa: true,
  },
  {
    id: "R-002",
    quando:
      "Latência p95 > 2s no fornecedor primário por 30 min consecutivos",
    entao: "Divide próximos pedidos 50/50 entre primário e secundário",
    prioridade: "Média",
    ativa: true,
  },
  {
    id: "R-003",
    quando:
      "Fornecedor mudou versão da API sem aviso (diff de schema detectado)",
    entao: "Congela envios para o fornecedor até revalidação do adapter",
    prioridade: "Crítica",
    ativa: true,
  },
];

const materiais = ["Nylon PA6 + FV", "TPU flexível", "PETG", "ABS"];

export default function RoteamentoPage() {
  return (
    <AppShell
      title="Roteamento inteligente"
      subtitle="Regras, prioridades e simulação de fallback entre fornecedores homologados"
    >
      <div className="card-p">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-semibold">Preferência de fornecedores por material</h2>
            <p className="text-xs text-slate-400">
              Ordem visualizada é a que o PolyLink utilizará em tempo real,
              recalculada a cada 60 s conforme health score.
            </p>
          </div>
          <button className="btn-ghost border border-surface-border">
            <Settings2 size={14} /> Editar preferências
          </button>
        </div>

        <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
          {materiais.map((mat, idx) => {
            const compat = suppliers.filter((s) =>
              s.materiais.includes(mat)
            );
            const ordenados = [...compat].sort(
              (a, b) => b.healthScore - a.healthScore
            );
            return (
              <div
                key={mat}
                className="rounded-xl border border-surface-border p-4 bg-black/20"
              >
                <div className="flex items-center justify-between">
                  <div className="text-sm font-medium">{mat}</div>
                  <span className="text-[11px] text-slate-400">
                    {ordenados.length} fornecedores
                  </span>
                </div>
                <div className="mt-3 space-y-2">
                  {ordenados.map((s, i) => (
                    <div
                      key={s.id}
                      className={`flex items-center justify-between rounded-lg border px-3 py-2 text-xs ${
                        i === 0
                          ? "border-brand-500/30 bg-brand-500/10"
                          : "border-surface-border bg-black/10"
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <span
                          className={`h-6 w-6 grid place-content-center rounded-full font-semibold ${
                            i === 0
                              ? "bg-brand-500/40 text-brand-100"
                              : "bg-white/[0.03] text-slate-300"
                          }`}
                        >
                          {i + 1}
                        </span>
                        <div>
                          <div className="font-medium text-slate-100">
                            {s.nome}
                          </div>
                          <div className="text-slate-400">{s.cidade}</div>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="tabular-nums">score {s.healthScore}</div>
                        <div className="text-slate-400">{s.latenciaMs} ms</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="card-p">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold">Regras ativas</h2>
          <button className="btn-primary">
            <Settings2 size={14} /> Nova regra
          </button>
        </div>
        <div className="mt-4 overflow-x-auto rounded-xl border border-surface-border">
          <table className="w-full text-sm">
            <thead className="bg-white/[0.02] text-xs uppercase tracking-wide text-slate-400">
              <tr>
                <th className="px-4 py-3 text-left">Regra</th>
                <th className="px-4 py-3 text-left">Quando</th>
                <th className="px-4 py-3 text-left">Então</th>
                <th className="px-4 py-3 text-left">Prioridade</th>
                <th className="px-4 py-3 text-left">Estado</th>
              </tr>
            </thead>
            <tbody>
              {regras.map((r) => (
                <tr key={r.id} className="table-row">
                  <td className="px-4 py-3 font-mono text-xs">{r.id}</td>
                  <td className="px-4 py-3 text-slate-200">{r.quando}</td>
                  <td className="px-4 py-3 text-slate-300">
                    <span className="flex items-start gap-1.5">
                      <ArrowRight size={12} className="mt-1 text-brand-300" />
                      <span>{r.entao}</span>
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        r.prioridade === "Crítica"
                          ? "bg-rose-500/15 text-rose-300 border border-rose-400/20"
                          : r.prioridade === "Alta"
                          ? "bg-amber-500/15 text-amber-300 border border-amber-400/20"
                          : "bg-sky-500/15 text-sky-300 border border-sky-400/20"
                      }`}
                    >
                      {r.prioridade}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span
                      className={`badge ${
                        r.ativa
                          ? "bg-emerald-500/15 text-emerald-300 border border-emerald-400/20"
                          : "bg-slate-500/15 text-slate-300 border border-slate-400/20"
                      }`}
                    >
                      {r.ativa ? (
                        <>
                          <Check size={12} /> Ativa
                        </>
                      ) : (
                        <>
                          <X size={12} /> Pausada
                        </>
                      )}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AppShell>
  );
}
