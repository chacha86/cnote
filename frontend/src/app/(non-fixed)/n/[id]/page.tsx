import { Suspense } from "react";
import DetailClientComponent from "./ClientComponent";
import { serverFetchWrapper } from "@/components/api/ServerFetchWrapper";

export default async function NoteDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const res = await serverFetchWrapper(
    `/api/v1/notes/${id}`
  );

  if (res === null || !res.ok) {
    return <div>오류 발생</div>;
  }

  const result = await res.json();
  const title = await result.data.title;
  const content = await result.data.content;

  return (
    <div className="flex justify-center">
      <div className="w-[800px]">
        <Suspense fallback={<div>로딩중...</div>}>
          <h1 className="font-bold text-[2rem] border-b-2 border-gray-500 py-2">
            {title}
          </h1>
          <DetailClientComponent content={content} />
        </Suspense>
      </div>
    </div>
  );
}

