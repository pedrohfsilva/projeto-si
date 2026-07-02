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
  Workflow,
  X,
} from "lucide-react";

const nav = [
  { href: "/", label: "Visão Geral", icon: LayoutDashboard },
  { href: "/pedidos", label: "Pedidos", icon: Boxes },
  { href: "/fornecedores", label: "Fornecedores", icon: Truck },
  { href: "/rastreabilidade", label: "Rastreabilidade", icon: ScrollText },
  { href: "/roteamento", label: "Roteamento", icon: Workflow },
  { href: "/alertas", label: "Alertas", icon: BellRing },
  { href: "/portal-b2b", label: "Portal B2B", icon: ShieldCheck },
];

type Props = {
  mobileOpen?: boolean;
  onClose?: () => void;
};

export function Sidebar({ mobileOpen, onClose }: Props) {
  const pathname = usePathname();

  const content = (
    <>
      <div className="px-5 py-6 border-b border-surface-border">
        <div className="flex items-center justify-between">
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
          {onClose && (
            <button
              onClick={onClose}
              className="lg:hidden rounded-lg p-1.5 hover:bg-white/5"
            >
              <X size={18} className="text-slate-400" />
            </button>
          )}
        </div>
      </div>
      <nav className="flex-1 px-3 py-4 space-y-1">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              onClick={onClose}
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
    </>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="hidden lg:flex lg:w-64 xl:w-72 flex-col border-r border-surface-border bg-surface-soft/60 backdrop-blur">
        {content}
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-black/60" onClick={onClose} />
          <aside className="relative flex w-72 max-w-[80vw] h-full flex-col border-r border-surface-border bg-surface-soft backdrop-blur-xl">
            {content}
          </aside>
        </div>
      )}
    </>
  );
}
