import NoteMain from "@/components/main/NoteMain";
import { Suspense, useContext } from "react";
import { cookies } from 'next/headers';

export default async function Note() {
  
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken');
  const refreshToken = cookieStore.get('refreshToken');
  
  if(accessToken===null || accessToken === undefined) {
    return <>
      <div>로그인이 필요합니다</div>
    </>;
  }

  if(refreshToken===null || refreshToken === undefined) {
    return <>
      <div>로그인이 필요합니다</div>
    </>;
  }

  const res = await fetch("http://localhost:8080/api/v1/books",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${accessToken.value}`,
      "Cookie": `refreshToken=${refreshToken.value}`
    },
  });
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
