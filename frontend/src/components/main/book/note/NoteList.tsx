"use client";

import { Note } from "@/types/Book";
import React, { useEffect, useState } from "react";

export default function NoteComponent({
  parentBookId,
  initNotes,
  selectedNote,
  changeNote,
}: {
  parentBookId: number;
  initNotes: Note[];
  selectedNote: Note;
  changeNote: (note: Note) => void;
}) {
  console.log("NoteComponent");
  const [notes, setNotes] = useState<Note[]>(initNotes);
  const [localSelectedNote, setLocalSelectedNote] = useState<Note>(selectedNote);

  useEffect(() => {
    setNotes(initNotes);
  }, [initNotes]);

  useEffect(() => {
    if(selectedNote) {
      setNotes(notes.map((note) => note.id === selectedNote.id ? selectedNote : note));
    }
  }, [selectedNote]);

  const createDefaultNote = () => {
    fetch(`http://localhost:8080/api/v1/books/${parentBookId}/notes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data);
        setNotes([...notes, res.data]);
      });
  };

  return (
    <div className="min-w-[100px] border-r-2 w-[15%]">
      <div className="my-1 ml-1">
        <button className="px-3 rounded hover:bg-gray-300 bg-gray-200 border border-gray-400"
                onClick={createDefaultNote}>노트 추가</button>
      </div>
      <ul>
        {notes && notes.map((note) => {
          let isSelected = false;
          if(selectedNote) {
            isSelected = selectedNote.id === note.id;
          }
          return (
            <li
              key={note.id}
              className={`p-2 mb-1 border rounded shadow hover:bg-gray-200 hover:cursor-pointer ${
                isSelected ? "bg-gray-300" : ""
              }`}
              onClick={() => {
                changeNote(note);
              }}
            >
              {/* <p>{note.title.length > 20 ? note.title.slice(0, 17) + '...' : note.title}</p> */}
              <p className="truncate">{note.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
