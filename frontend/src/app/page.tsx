import Link from "next/link";

export default function Home() {
  return (
    <div className="h-[95vh] flex flex-col justify-center items-center text-bold text-green-700">
      <div className="text-[4rem] ">Welcome to CNote!</div>
      <div><Link href="/note" className="text-[2rem]">노트 편집기</Link></div>
      <div><Link href="/list" className="text-[2rem]">노트 목록</Link></div>
    </div>
  );
}
