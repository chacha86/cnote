"use client";
import NavBar from "@/components/NavBar";
export default function NonFixedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
        <NavBar css="" />
        {children}
    </div>
  );
}
