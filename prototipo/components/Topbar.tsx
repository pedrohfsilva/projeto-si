import { Bell, Menu } from "lucide-react";

type Props = {
  title: string;
  subtitle?: string;
  onMenuToggle?: () => void;
};

export function Topbar({ title, subtitle, onMenuToggle }: Props) {
  return (
    <header className="sticky top-0 z-20 border-b border-surface-border bg-surface/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-3 sm:px-6 sm:py-4">
        <div className="flex items-center gap-3">
          {onMenuToggle && (
            <button
              onClick={onMenuToggle}
              className="lg:hidden rounded-lg border border-surface-border bg-black/20 p-2 hover:bg-white/5"
            >
              <Menu size={16} />
            </button>
          )}
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-semibold tracking-tight truncate">{title}</h1>
            {subtitle && (
              <p className="text-xs text-slate-400 hidden sm:block">{subtitle}</p>
            )}
          </div>
        </div>
        <button className="relative rounded-lg border border-surface-border bg-black/20 p-2 hover:bg-white/5 flex-shrink-0">
          <Bell size={16} />
          <span className="absolute -top-0.5 -right-0.5 h-2 w-2 rounded-full bg-rose-400" />
        </button>
      </div>
    </header>
  );
}
