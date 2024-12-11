import NavBar from "@/components/NavBar";

export default function NonFixedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="dashboard-layout">
      <NavBar css="fixed z-50" />
      <div className="h-[95vh] w-[100%] absolute top-[10vh]">{children}</div>
    </div>
  );
}
