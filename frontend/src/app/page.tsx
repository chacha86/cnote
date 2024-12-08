import NoteMain from "../components/main/NoteMain";

export default async function Home() {
  
  const res = await fetch("http://localhost:8080/api/v1/books");
  if(!res.ok) {
    return <div>오류 발생</div>;
  }
  const result = await res.json();
  const initBooks = result.data;
  console.log(initBooks);

  return (
    <>
     <NoteMain initBooks={initBooks} initNotes={initBooks[0].notes}/>
    </>
  );
}
