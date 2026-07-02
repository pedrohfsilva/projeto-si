"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Boxes,
  Truck,
  ShieldCheck,
  ScrollText,
  BellRing,
  Settings2,
  Workflow,
} from "lucide-react";

const nav = [
  { href: "/", label: "Visão Geral", icon: LayoutDashboard },
  { href: "/pedidos", label: "Pedidos", icon: Boxes },
  { href: "/fornecedores", label: "Fornecedores", icon: Truck },
  { href: "/rastreabilidade", label: "Rastreabilidade", icon: ScrollText },
  { href: "/roteamento", label: "Roteamento", icon: Workflow },
  { href: "/alertas", label: "Alertas", icon: BellRing },
  { href: "/portal-b2b", label: "Portal B2B", icon: ShieldCheck },
  { href: "/config", label: "Configurações", icon: Settings2 },
];

export function Sidebar() {
  const pathname = usePathname();
  return (
    <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col border-r border-surface-border bg-surface-soft/60 backdrop-blur">
      <div className="px-5 py-6 border-b border-surface-border">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-content-center rounded-xl bg-gradient-to-br from-brand-400 to-brand-700 shadow-lg">
            <span className="font-bold">PL</span>
          </div>
          <div>
            <div className="text-sm font-semibold tracking-wide">PolyLink</div>
            <div className="text-[11px] text-slate-400">
              Integração & Rastreabilidade
            </div>
          </div>
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition ${
                active
                  ? "bg-brand-500/15 text-brand-100 border border-brand-500/30"
                  : "text-slate-300 hover:bg-white/[0.04]"
              }`}
            >
              <Icon size={16} className={active ? "text-brand-300" : "text-slate-400"} />
              <span>{label}</span>
            </Link>
          );
        })}
      </nav>
      <div className="border-t border-surface-border p-4 text-[11px] text-slate-400">
        <div className="flex items-center justify-between">
          <span>Ambiente</span>
          <span className="badge bg-emerald-500/15 text-emerald-300 border border-emerald-500/20">
            Produção
          </span>
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span>Versão</span>
          <span className="font-mono text-slate-300">v1.4.2</span>
        </div>
      </div>
    </aside>
  );
}
