"use client";

import { AppShell } from "@/components/AppShell";
import { OrderStatusBadge } from "@/components/StatusBadge";
import { orders } from "@/lib/mock-data";
import {
  CheckCircle2,
  Info,
  Package,
  PackageOpen,
  Truck,
} from "lucide-react";

const estagios = [
  { chave: "recebido", label: "Pedido recebido" },
  { chave: "reconhecido", label: "Fornecedor confirmou insumo" },
  { chave: "em_transito", label: "Insumo em trânsito" },
  { chave: "producao", label: "Produção iniciada" },
  { chave: "entregue", label: "Peça a caminho do cliente" },
];

function estagioAtual(status: string) {
  switch (status) {
    case "pendente":
    case "enviado":
      return 0;
    case "reconhecido":
    case "em_separacao":
      return 1;
    case "em_transito":
      return 2;
    case "entregue":
      return 4;
    case "reroteado":
      return 1;
    case "falha":
      return -1;
    default:
      return 0;
  }
}

export default function PortalB2BPage() {
  const pedidosCliente = orders.filter((o) =>
    ["Montadora AutoNova SP", "AutoNova SP", "Oficina Turbo Center"].includes(
      o.cliente
    )
  );

  return (
    <AppShell
      title="Portal do Cliente (visão B2B)"
      subtitle="Como o portal exibe a verdade real do pedido, alimentado pelo PolyLink"
    >
      <div className="card-p bg-gradient-to-br from-brand-500/15 to-transparent">
        <div className="flex items-start gap-3">
          <div className="grid h-9 w-9 place-content-center rounded-xl bg-brand-500/30 text-brand-200">
            <Info size={16} />
          </div>
          <div>
            <h2 className="text-sm font-semibold">
              Status baseado em confirmação real
            </h2>
            <p className="mt-1 text-xs text-slate-300 max-w-3xl">
              Nenhum estágio aqui avança sem confirmação verificada do
              fornecedor. Se o insumo não chegou, o portal informa
              proativamente — o cliente jamais recebe "em produção" enquanto a
              matéria-prima está pendente.
            </p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {pedidosCliente.map((o) => {
          const estagio = estagioAtual(o.status);
          return (
            <div key={o.id} className="card-p">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <div className="text-xs text-slate-400">
                    Pedido{" "}
                    <span className="font-mono text-slate-300">{o.id}</span>
                  </div>
                  <div className="text-lg font-semibold">{o.peca}</div>
                  <div className="text-xs text-slate-400">
                    {o.material} · {o.quantidadeKg} kg · prazo {o.prazoEntrega}
                  </div>
                </div>
                <OrderStatusBadge status={o.status} />
              </div>

              {o.status === "falha" ? (
                <div className="mt-4 rounded-xl border border-rose-500/30 bg-rose-500/10 p-4 text-sm">
                  <div className="font-semibold text-rose-100">
                    Atraso previsto — em resolução
                  </div>
                  <p className="mt-1 text-xs text-rose-100/80">
                    Detectamos uma falha silenciosa no envio da matéria-prima e
                    estamos redirecionando o insumo para outro fornecedor
                    homologado. Notificaremos o novo prazo em até 30 min.
                  </p>
                </div>
              ) : (
                <div className="mt-6 overflow-x-auto">
                  <div className="grid grid-cols-5 gap-3 min-w-[400px]">
                  {estagios.map((e, i) => {
                    const done = i <= estagio;
                    const active = i === estagio;
                    return (
                      <div key={e.chave} className="flex flex-col items-center">
                        <div
                          className={`grid h-9 w-9 place-content-center rounded-full border ${
                            done
                              ? "bg-brand-500/20 border-brand-500/40 text-brand-100"
                              : "border-surface-border text-slate-500"
                          } ${active ? "ring-2 ring-brand-400/40" : ""}`}
                        >
                          {i === 0 && <Package size={14} />}
                          {i === 1 && <PackageOpen size={14} />}
                          {i === 2 && <Truck size={14} />}
                          {i === 3 && <PackageOpen size={14} />}
                          {i === 4 && <CheckCircle2 size={14} />}
                        </div>
                        <div
                          className={`mt-2 text-center text-[11px] ${
                            done ? "text-slate-200" : "text-slate-500"
                          }`}
                        >
                          {e.label}
                        </div>
                      </div>
                    );
                  })}
                </div>
                </div>
              )}

              {o.status === "reroteado" && (
                <div className="mt-4 rounded-xl border border-brand-500/30 bg-brand-500/10 p-4 text-xs">
                  <div className="font-semibold text-brand-100">
                    Fornecedor alterado automaticamente
                  </div>
                  <p className="mt-1 text-brand-50/80">
                    Para manter o prazo de 48 h, o insumo está sendo produzido
                    a partir de PolyBrasil Insumos S/A. Não há impacto na
                    especificação técnica.
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </AppShell>
  );
}
