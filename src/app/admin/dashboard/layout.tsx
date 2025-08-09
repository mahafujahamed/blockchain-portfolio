import Sidebar from "@/components/admin/Sidebar";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 p-6 bg-white dark:bg-zinc-900 text-zinc-900 dark:text-white">
        {children}
      </main>
    </div>
  );
}
