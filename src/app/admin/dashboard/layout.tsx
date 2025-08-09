// src/app/admin/dashboard/layout.tsx
import Sidebar from "@/components/admin/Sidebar";
import AdminAuth from "@/components/AdminAuth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminAuth>
      <div className="min-h-screen bg-gray-50 p-6">
        <Sidebar />
        {children}
      </div>
    </AdminAuth>
  );
}
