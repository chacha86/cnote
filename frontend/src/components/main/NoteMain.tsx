'use client';
import { useEffect, useState } from "react";
import Book from "./book/Book";
import Note from "./book/note/Note";
import { create } from "domain";
import Detail from "./book/note/Detail";

interface Book {
  id: number;
  name: string;
  children?: Book[];
  notes: Note[];
}

interface Note {
  id: number;
  title: string;
  book: Book;
}

export default function MainComponent({books}: {books: Book[]}) {

  const [selectedBook, setSelectedBook] = useState<Book>(books[0]);
  const [selectedNote, setSelectedNote] = useState<Note>(books[0].notes[0]);

  const createFirstBook = () => {
    fetch("http://localhost:8080/api/v1/books", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ name: "New Book" }),
    })
      .then((res) => res.json())
      .then((res) => {
        setSelectedBook(res.data);
      });
  }

  const changeBook = (book: Book) => {
    console.log(book);
    setSelectedBook(book);
    setSelectedNote(book.notes[0]);
  }

  const changeNote = (note: Note) => {
    setSelectedNote(note);
  }

  if (books.length === 0) {
    createFirstBook();
  }

  return (
    <div className="flex h-[90vh]">
      <Book books={books} selectedBook={selectedBook} changeBook={changeBook}/>
      <Note notes={selectedBook.notes} selectedNote={selectedNote} changeNote={changeNote}/>
      <Detail />
    </div>
  );
}
