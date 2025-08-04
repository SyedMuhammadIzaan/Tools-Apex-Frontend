"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import AdminSidebar from "@/components/admin/admin-sidebar";
import AdminHeader from "@/components/admin/admin-header";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const isLoginPage = pathname === "/admin/users"; // or your admin login path

  useEffect(() => {
    // Check authentication only on client
    const checkAuth = () => {
      const auth = localStorage.getItem("adminAuth");
      if (!auth && !isLoginPage) {
        router.push("/admin/users");
        return;
      }
      setIsAuthenticated(!!auth || isLoginPage);
    };

    checkAuth();
  }, [router, pathname, isLoginPage]);

  // Still checking auth
  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Loading...</div>
      </div>
    );
  }

  // If this is login page, render without sidebar/header
  if (isLoginPage) {
    return <>{children}</>;
  }

  // If not authenticated, show loader while redirecting
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-yellow-400 text-xl">Redirecting...</div>
      </div>
    );
  }

  // Authenticated layout
  return (
    <div className="min-h-screen bg-gray-100">
      <AdminSidebar />
      <div className="lg:pl-64">
        <AdminHeader />
        <main className="p-6">{children}</main>
      </div>
    </div>
  );
}
