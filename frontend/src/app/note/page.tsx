import NoteMain from "@/components/main/NoteMain";
import { Suspense } from "react";

export default async function Note() {
  const res = await fetch("http://localhost:8080/api/v1/books");
  if (!res.ok) {
    return <div>오류 발생</div>;
  }
  const result = await res.json();
  const initBooks = result.data;

  return (
    <>
      <Suspense fallback={<div className="h-[90vh] w-[100%] flex justify-center items-center"><div><span className="loading loading-dots loading-lg"></span></div></div>}>
        <NoteMain initBooks={initBooks} initNotes={initBooks[0].notes} />
      </Suspense>
    </>
  );
}
