"use client";

import { AppShell } from "@/components/AppShell";
import { SeverityBadge } from "@/components/StatusBadge";
import { alerts } from "@/lib/mock-data";
import { BellRing, MessageCircle, Timer } from "lucide-react";

const canais = [
  { nome: "Slack #ops-abastecimento", conectado: true },
  { nome: "E-mail compras@polymerforge.com", conectado: true },
  { nome: "SMS Diretoria Industrial", conectado: true },
  { nome: "Webhook para IndustriaOS", conectado: true },
];

const politicas = [
  {
    severidade: "P1",
    definicao: "Falha silenciosa confirmada ou ruptura iminente",
    tempo: "notificação < 1 min",
    canal: "Slack, e-mail e SMS gestor da célula",
  },
  {
    severidade: "P2",
    definicao: "Degradação de fornecedor com risco em janela de 4h",
    tempo: "notificação < 5 min",
    canal: "Slack e e-mail",
  },
  {
    severidade: "P3",
    definicao: "Mudança de schema ou anomalia detectada",
    tempo: "notificação < 15 min",
    canal: "Slack e dashboard",
  },
];

export default function AlertasPage() {
  return (
    <AppShell
      title="Central de alertas"
      subtitle="Notificação ativa para todos os envolvidos, com dono e prazo de resposta"
    >
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        <div className="card-p xl:col-span-2">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold">Alertas em aberto</h2>
            <div className="text-xs text-slate-400">
              MTTA (tempo médio para reconhecer): 2m38s
            </div>
          </div>
          <div className="mt-3 space-y-3">
            {alerts.map((a) => (
              <div
                key={a.id}
                className="rounded-xl border border-surface-border bg-black/20 p-4"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <SeverityBadge severity={a.severidade} />
                    <span className="text-xs text-slate-400 font-mono">
                      {a.id}
                    </span>
                  </div>
                  <span className="text-[11px] text-slate-400">{a.tempo}</span>
                </div>
                <div className="mt-2 text-sm font-semibold">{a.titulo}</div>
                <p className="mt-1 text-xs text-slate-400">{a.descricao}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <div className="text-slate-400">Responsável: {a.dono}</div>
                  <div className="flex items-center gap-2">
                    <button className="btn-ghost border border-surface-border">
                      Reconhecer
                    </button>
                    <button className="btn-primary">
                      <MessageCircle size={13} /> Abrir na thread
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          <div className="card-p">
            <h2 className="text-sm font-semibold">Canais conectados</h2>
            <ul className="mt-3 space-y-2 text-sm">
              {canais.map((c) => (
                <li
                  key={c.nome}
                  className="flex items-center justify-between rounded-lg border border-surface-border bg-black/20 px-3 py-2"
                >
                  <span>{c.nome}</span>
                  <span className="badge bg-emerald-500/15 text-emerald-300 border border-emerald-400/20">
                    conectado
                  </span>
                </li>
              ))}
            </ul>
          </div>
          <div className="card-p">
            <div className="flex items-center gap-2">
              <BellRing size={14} className="text-brand-300" />
              <h2 className="text-sm font-semibold">Cobertura de plantão</h2>
            </div>
            <p className="mt-1 text-xs text-slate-400">
              Escalação escalonada garante que nenhum alerta P1 fique sem
              reconhecimento por mais de 5 minutos.
            </p>
            <div className="mt-3 space-y-2 text-xs">
              <div className="flex items-center justify-between rounded-lg border border-surface-border bg-black/20 px-3 py-2">
                <span>1º nível — Marcela Andrade</span>
                <span className="text-slate-400">on-call</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-surface-border bg-black/20 px-3 py-2">
                <span>2º nível — Ricardo Mello</span>
                <span className="text-slate-400">standby</span>
              </div>
              <div className="flex items-center justify-between rounded-lg border border-surface-border bg-black/20 px-3 py-2">
                <span>3º nível — Diretoria Industrial</span>
                <span className="text-slate-400">escalação P1</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="card-p">
        <div className="flex items-center gap-2">
          <Timer size={14} className="text-brand-300" />
          <h2 className="text-sm font-semibold">Políticas de severidade</h2>
        </div>
        <div className="mt-3 grid grid-cols-1 md:grid-cols-3 gap-3">
          {politicas.map((p) => (
            <div
              key={p.severidade}
              className="rounded-xl border border-surface-border p-4 bg-black/20"
            >
              <SeverityBadge severity={p.severidade} />
              <div className="mt-2 text-sm font-medium">{p.definicao}</div>
              <div className="mt-2 text-xs text-slate-400">
                Meta: {p.tempo}
              </div>
              <div className="mt-1 text-xs text-slate-400">
                Canais: {p.canal}
              </div>
            </div>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
