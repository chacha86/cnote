import NoteMain from "../components/main/NoteMain";

export default async function Home() {
  
  const res = await fetch("http://localhost:8080/api/v1/books");
  const result = await res.json();

  return (
    <>
     <NoteMain books={result.data}/>
    </>
  );
}
