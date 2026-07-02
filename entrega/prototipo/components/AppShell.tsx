import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { Topbar } from "./Topbar";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export function AppShell({ title, subtitle, children }: Props) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 flex flex-col">
        <Topbar title={title} subtitle={subtitle} />
        <div className="p-6 space-y-6">{children}</div>
      </main>
    </div>
  );
}
