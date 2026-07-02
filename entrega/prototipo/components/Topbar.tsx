import { Bell, Search, User2 } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
};

export function Topbar({ title, subtitle }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-surface/80 backdrop-blur">
      <div className="flex items-center justify-between px-6 py-4">
        <div>
          <h1 className="text-lg font-semibold tracking-tight">{title}</h1>
          {subtitle && (
            <p className="text-xs text-slate-400">{subtitle}</p>
          )}
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden md:flex items-center gap-2 rounded-lg border border-surface-border bg-black/20 px-3 py-1.5">
            <Search size={14} className="text-slate-400" />
            <input
              className="w-56 bg-transparent text-sm outline-none placeholder:text-slate-500"
              placeholder="Buscar pedido, fornecedor, material…"
            />
            <span className="kbd">⌘K</span>
          </div>
          <button className="relative rounded-lg border border-surface-border bg-black/20 p-2 hover:bg-white/5">
            <Bell size={16} />
            <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose-400" />
          </button>
          <div className="flex items-center gap-2 rounded-lg border border-surface-border bg-black/20 px-3 py-1.5">
            <div className="grid h-6 w-6 place-content-center rounded-full bg-brand-500/30">
              <User2 size={13} />
            </div>
            <div className="text-xs leading-tight">
              <div>Marcela Andrade</div>
              <div className="text-slate-400">Compras · gestora</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
