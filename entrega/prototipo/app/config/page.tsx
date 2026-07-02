"use client";

import { AppShell } from "@/components/AppShell";
import { ChevronRight, Cog, Key, Link2, Shield, UserCog } from "lucide-react";

const secoes = [
  {
    icon: Link2,
    titulo: "Adapters de fornecedores",
    descricao:
      "Versão do adapter, contrato JSON esperado, política de retentativa e endpoints por fornecedor.",
  },
  {
    icon: Key,
    titulo: "Credenciais e chaves",
    descricao:
      "Rotação automática de tokens, cofre integrado ao IAM da empresa, expiração vigiada.",
  },
  {
    icon: Shield,
    titulo: "SLAs e políticas",
    descricao:
      "Janelas de confirmação, thresholds de health score e regras de compliance interna.",
  },
  {
    icon: UserCog,
    titulo: "Perfis e permissões",
    descricao:
      "Papéis (Compras, TI, Produção, Diretoria) e escopo de acesso a rastros e logs.",
  },
  {
    icon: Cog,
    titulo: "Integrações com IndustriaOS",
    descricao:
      "Sincronização de pedidos, materiais e status entre ERP e PolyLink.",
  },
];

export default function ConfigPage() {
  return (
    <AppShell
      title="Configurações"
      subtitle="Governança do PolyLink — controles operacionais para TI, compras e diretoria"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {secoes.map((s) => (
          <button
            key={s.titulo}
            className="card-p text-left flex items-start gap-4 hover:border-brand-500/40 transition"
          >
            <div className="grid h-10 w-10 place-content-center rounded-xl bg-brand-500/20 text-brand-200">
              <s.icon size={18} />
            </div>
            <div className="flex-1">
              <div className="text-sm font-semibold">{s.titulo}</div>
              <p className="mt-1 text-xs text-slate-400">{s.descricao}</p>
            </div>
            <ChevronRight size={16} className="text-slate-400 mt-2" />
          </button>
        ))}
      </div>

      <div className="card-p">
        <h2 className="text-sm font-semibold">Sobre este protótipo</h2>
        <p className="mt-2 text-xs text-slate-400 max-w-3xl">
          Este é o protótipo em alto nível do PolyLink — Plataforma de
          Integração e Rastreabilidade da Cadeia de Suprimentos, desenvolvido
          como entrega do projeto de Sistemas de Informação (SSC0120 — ICMC/USP).
          O objetivo é ilustrar o cenário de aplicação da solução na
          PolymerForge 3D, cobrindo os fluxos de dashboard operacional,
          gestão de pedidos, monitoramento de fornecedores, rastreabilidade
          fim a fim, roteamento inteligente, alertas, portal B2B e
          configuração administrativa. Todos os dados são mockados.
        </p>
      </div>
    </AppShell>
  );
}
