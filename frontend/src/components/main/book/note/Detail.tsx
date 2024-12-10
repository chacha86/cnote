"use client";

import React, { useEffect, useState, useRef, useCallback, use } from "react";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import { Note } from "@/types/Book";
import MarkDownViewer from "./MarkDownViewer";
import NoteEditor from "./NoteEditor";
import Link from "next/link";

export default function DetailComponent({
  selectedNote,
  changeNote,
}: {
  selectedNote: Note;
  changeNote: (note: Note) => void;
}) {
  if (!selectedNote) {
    return <div>노트를 선택해주세요.</div>;
  }
  const [title, setTitle] = useState(selectedNote.title);
  const [code, setCode] = useState(selectedNote.content);
  const [mode, setMode] = useState(0); // 0: editor, 1: viewer
  const [cursor, setCursor] = useState({ lineNumber: 1, column: 1 });
  const [isPublished, setIsPublished] = useState(selectedNote.published);

  const contentRef = useRef(selectedNote.content);
  const titleRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef({ lineNumber: 1, column: 1 });
  const isChangedRef = useRef(false);
  const selectedNoteRef = useRef(selectedNote);

  useEffect(() => {
    setCode(selectedNote.content);
    setTitle(selectedNote.title);
    setIsPublished(selectedNote.published);
    contentRef.current = selectedNote.content;
    selectedNoteRef.current = selectedNote;
  }, [selectedNote]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.altKey && event.key === "q") {
        event.preventDefault();
        setCode(contentRef.current);
        setCursor(cursorRef.current);
        setMode((prevMode) => (prevMode === 0 ? 1 : 0));
      }

      if (event.ctrlKey && event.key === "s") {
        event.preventDefault();
        
        if (mode === 1) return;
        
        if (!isChangedRef.current) return;

        saveContent(contentRef.current);
        isChangedRef.current = false;

        event.stopPropagation();
      }

      if (event.key === "Escape") {
        event.preventDefault();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [mode]);
  const saveContent = (content: string) => {
    fetch(`http://localhost:8080/api/v1/notes/${selectedNoteRef.current.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: titleRef.current?.value,
        content: content,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        changeNote(res.data);
      });
  };
  const publishNote = (published: boolean) => {
    fetch(`http://localhost:8080/api/v1/notes/${selectedNoteRef.current.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        published: published,
      }),
    })
      .then((res) => res.json())
      .then((res) => {
        changeNote(res.data);
      });
  };

  
  const changeContent = (content: string) => {
    if(contentRef.current == content) {
      return;
    }
    isChangedRef.current = true;
    contentRef.current = content;
  };

  const changeCursor = (cursor: any) => {
    cursorRef.current = cursor;
  };

  return (
    <div className="p-2 w-[70%]">
      {mode === 0 ? (
        <div className="flex flex-col gap-4 h-[100%] w-[100%] p-3">
          <input
            ref={titleRef}
            type="text"
            className="input input-success input-lg"
            value={title}
            onChange={(e) => {
              console.log('sssssssssssssss');
              if (e.target.value.length > 200) {
                return;
              }
              setTitle(e.target.value);
              isChangedRef.current = true;
            }}
          />
          {
            <NoteEditor
              content={code}
              cursor={cursor}
              changeContent={changeContent}
              changeCursor={changeCursor}
            />
          }
        </div>
      ) : (
        <MarkDownViewer content={code} />
      )}
      <div className="absolute bottom-1 right-1">
        {isPublished ? (
          <>
            <div className="bg-gray-200 p-2 rounded-md font-bold text-[0.9rem] text-gray-500  bg-opacity-50">
              <Link href={`/n/${selectedNote.id}`}>게시된 노트</Link>
            </div>
            <button
              className="btn btn-error p-4 cursor-pointer bg-opacity-70"
              onClick={() => {
                publishNote(false);
              }}
            >
              게시 취소
            </button>
          </>
        ) : (
          <button
            className="btn btn-info p-4 cursor-pointer bg-opacity-70"
            onClick={() => {
              publishNote(true);
            }}
          >
            게시
          </button>
        )}
      </div>
    </div>
  );
}
