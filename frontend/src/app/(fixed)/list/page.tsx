import { Note } from "@/types/Book";
import ListClientComponent from "./ClientComponent";
import { serverFetchWrapper } from "@/components/api/ServerFetchWrapper";

export default async function List() {
  const res = await serverFetchWrapper("/api/v1/notes");
  
  if(res === null || !res.ok) {
    return <div>오류 발생</div>;
  }

  const result = await res.json();
  const publishedNotes = result.data;

  return (
    <>
      <div className="w-[100%] flex justify-center">
        <div className="w-[95%] flex gap-8 flex-wrap p-4">
          {publishedNotes &&
            publishedNotes.map((note: Note) => {
              return (
                <ListClientComponent id={note.id} key={note.id}>
                  <p className="p-2 h-[20%] border-b font-bold truncate">
                    {note.title}
                  </p>
                  <div className="p-2 h-[65%] border-b">
                    {note.content.slice(0, 100)
                      ? note.content.slice(0, 100) + "..."
                      : note.content}
                  </div>
                </ListClientComponent>
              );
            })}
        </div>
      </div>
    </>
  );
}
