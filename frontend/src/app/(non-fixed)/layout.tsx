  import NavBar from "@/components/NavBar";

  export default function NonFixedLayout({
    children,
  }: {
    children: React.ReactNode;
  }) {
    console.log("NonFixedLayout"); // 서버에서 1번. 클라에서 1번
    return (
      <div className="dashboard-layout">
          <NavBar css="fixed z-50" /> {/* 클라 대기, 클라에서 한번 렌더링. 하이드레이션으로 콘솔 한번 더 찍힘 */}
          <div className="h-[95vh] w-[100%] absolute top-[10vh]">{children}</div> {/* 서버에서 한번, 클라에서 한번*/}
      </div>
    );
  }
