"use client";
import { useEffect, useState } from "react";
import Detail from "./book/note/Detail";
import { Book, Note } from "@/types/Book";
import BookList from "./book/BookList";
import NoteList from "./book/note/NoteList";


export default function MainComponent({ initBooks, initNotes }: { initBooks: Book[], initNotes: Note[] }) {
  const [books, setBooks] = useState<Book[]>(initBooks);
  const [notes, setNotes] = useState<Note[]>(initNotes);
  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
  const [selectedNote, setSelectedNote] = useState<Note>(books[0].notes[0]);
  const [mode, setMode] = useState(0); // 0: editor, 1: viewer

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "q") {
        event.preventDefault();
        console.log("Alt+Q was pressed!");

        setMode((prevMode) => (prevMode === 0 ? 1 : 0));
      }

      if (event.key === "Escape") {
        event.preventDefault();
      }
    };

    // 전역 키 이벤트 등록
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 제거
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const createDefaultBook = () => {
    fetch("http://localhost:8080/api/v1/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setBooks([...books, res.data]);
        changeBook(res.data);
      });
  };

  const changeNotes = (bookId: number) => {
    fetch(`http://localhost:8080/api/v1/books/${bookId}/notes`)
      .then((res) => res.json())
      .then((res) => {
        setNotes(res.data);
      });
  }

  const changeBook = (book: Book) => {
    setSelectedBook(book);
    changeNotes(book.id);
    if (notes.length == 0) return;
    setSelectedNote(book.notes[0]);
  };

  const changeNote = (note: Note) => {
    console.log(note);
    setSelectedNote({ ...note });
  };

  if (books.length === 0) {
    createDefaultBook();
  }

  return (
    <div className="flex h-[90vh]">
      <BookList
        books={books}
        createDefaultBook={createDefaultBook}
        selectedBook={selectedBook}
        changeBook={changeBook}
      />
      <NoteList
        parentBookId={selectedBook.id}
        initNotes={notes}
        selectedNote={selectedNote}
        changeNote={changeNote}
      />
      <Detail mode={mode} selectedNote={selectedNote} changeNote={changeNote}/>
    </div>
  );
}
