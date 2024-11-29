"use client";

import { Note } from "@/types/Book";
import React, { useEffect, useState } from "react";

export default function NoteComponent({ notes, selectedNote, changeNote }: { notes: Note[], selectedNote: Note, changeNote: (note: Note) => void }) {
  
  return (
    <div className="border-r-2 w-[15%]">
      <ul>
        {notes.map((note) => {
          console.log(note);
          console.log(selectedNote.id);
          const isSelected = selectedNote.id === note.id;
          return (
            <li
              key={note.id}
              className={`p-2 mb-1 border rounded shadow hover:bg-gray-200 hover:cursor-pointer ${isSelected ? "bg-gray-300" : ""}`}
              onClick={() => {
                changeNote(note);
              }}
            >
              <p>{note.title}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
