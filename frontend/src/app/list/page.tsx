import { Note } from "@/types/Book";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import rehypeSanitize from "rehype-sanitize";
import ReactMarkdown from "react-markdown";

export default async function List() {
  const res = await fetch("http://localhost:8080/api/v1/notes");
  if (!res.ok) {
    return <div>오류 발생</div>;
  }
  const result = await res.json();
  const publishedNotes = result.data;

  return (
    <>
      <div className="flex gap-4 flex-wrap p-4">
        {publishedNotes &&
          publishedNotes.map((note: Note) => {
            return (
              <div
                key={note.id}
                className="w-[15%] h-[15rem] p-3 border-2 rounded-md hover:bg-gray-300 hover:cursor-pointer"
              >
                <p className="p-2 h-[20%] border-b font-bold truncate">
                  {note.title}
                </p>
                <div className="p-2 h-[65%] border-b">
                  {note.content.slice(0, 100)
                    ? note.content.slice(0, 100) + "..."
                    : note.content}
                </div>
                <div className="p-2 h-[15%]">김무친</div>
              </div>
            );
          })}
      </div>
    </>
  );
}
