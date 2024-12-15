"use client";

import Link from "next/link";

export default function ListClientComponent({ id, children }: { id:number, children: React.ReactNode }) {
  return (
    <Link
      className="w-[15%] h-[15rem] p-3 border-2 rounded-md hover:bg-gray-300 hover:cursor-pointer"
      href={`/n/${id}`}
    >
      {children}
    </Link>
  );
}
