import NoteMain from "@/components/main/NoteMain";
import { Suspense, useContext } from "react";
import { serverFetchWrapper } from "@/components/api/ServerFetchWrapper";

export default async function Note() {
  
  const res = await serverFetchWrapper("http://localhost:8080/api/v1/books");
  
  if(res === null || !res.ok) {
    return <div>로그인이 필요합니다</div>;
  }
  console.log(res);
  
  const result = await res.json();
  console.log(result);
  const initBooks = result.data;
  return (
    <>
      <Suspense fallback={<div className="h-[90vh] w-[100%] flex justify-center items-center"><div><span className="loading loading-dots loading-lg"></span></div></div>}>
        <NoteMain initBooks={initBooks} initNotes={initBooks[0].notes} />
      </Suspense>
    </>
  );
}
