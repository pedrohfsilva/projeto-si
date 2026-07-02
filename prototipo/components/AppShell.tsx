"use client";

import { ReactNode, useState } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AppShell({ title, subtitle, children }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        mobileOpen={mobileOpen}
        onClose={() => setMobileOpen(false)}
      />
      <main className="flex-1 flex flex-col min-w-0">
        <Topbar
          title={title}
          subtitle={subtitle}
          onMenuToggle={() => setMobileOpen(true)}
        />
        <div className="p-4 sm:p-6 space-y-4 sm:space-y-6">{children}</div>
      </main>
    </div>
  );
}
