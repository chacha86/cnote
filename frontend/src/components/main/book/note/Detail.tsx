"use client";

import React, { useEffect, useState, useRef } from "react";
import ReactMarkdown from "react-markdown";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { Note } from "@/types/Book";
import { title } from "process";

export default function DetailComponent({
  mode,
  selectedNote,
  changeNote,
}: {
  mode: number;
  selectedNote: Note;
  changeNote: (note: Note) => void;
}) {
  if (!selectedNote) {
    return <div>노트를 선택해주세요.</div>;
  }
  const [title, setTitle] = useState(selectedNote.title);
  const [code, setCode] = useState(selectedNote.content);
  const [cursor, setCursor] = useState({ lineNumber: 1, column: 1 });

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const titleRef = useRef<HTMLInputElement>(null);
  const cursorRef = useRef({ lineNumber: 1, column: 1 });
  const containerRef = useRef<HTMLDivElement>(null);
  const selectedNoteRef = useRef(selectedNote);
  const highlighterRef = useRef<SyntaxHighlighter | null>(null);

  useEffect(() => {
    cursorRef.current = cursor;
  }, [cursor]);

  useEffect(() => {
    editorRef.current?.setValue(selectedNote.content);
    setCode(selectedNote.content);
    setTitle(selectedNote.title);
    selectedNoteRef.current = selectedNote;
    titleRef.current?.focus();
  }, [selectedNote]);

  const handleEditorChange = (value: any) => {
    setCode(value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    console.log("editorDidMount", editor);
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, // Ctrl+S
      () => {
        console.log(titleRef.current?.value);
        console.log(editorRef.current?.getValue());

        fetch(
          `http://localhost:8080/api/v1/notes/${selectedNoteRef.current.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              title: titleRef.current?.value,
              content: editorRef.current?.getValue(),
            }),
          }
        )
          .then((res) => res.json())
          .then((res) => {
            changeNote(res.data);
          });
      }
    );

    editor.onDidChangeCursorPosition((e) => {
      setCursor(e.position);
      // cursorRef.current = e.position;
      // console.log("Cursor moved to1:", e.position);
      // console.log("Cursor moved to2:", cursorRef.current);
    });
    editorRef.current = editor;
    editorRef.current.setValue(code);
    editorRef.current.focus();
    editorRef.current.setPosition(cursorRef.current);
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
              setTitle(e.target.value);
            }}
          />
          <Editor
            className="border-[1px] border-green-500 rounded-lg p-2"
            defaultLanguage="markdown" // 기본 언어
            theme="vs" // 테마 설정 (vs-light, vs-dark 등)
            // value={code} // 상태와 동기화된 코드
            onChange={handleEditorChange}
            onMount={handleEditorDidMount}
            options={{
              wordWrap: "on",
              lineNumbers: "on", // 줄 번호 표시
              renderWhitespace: "all", // 공백과 탭 표시
              renderControlCharacters: true, // 제어 문자 표시
              automaticLayout: true,
              suggestOnTriggerCharacters: false,
              quickSuggestions: false,
              mouseWheelZoom: true, // 자동 크기 조정 활성화
              fontFamily: "Pretendard, monospace",
              fontSize: 16,
              placeholder: "여기에 내용을 입력하세요...",
              minimap: {
                enabled: false, // 미니맵 비활성화
              },
            }} // 코드 변경 핸들러
          />
        </div>
      ) : (
        <div ref={containerRef} className="not-tailwind p-3">
          <ReactMarkdown
            remarkPlugins={[remarkGfm, remarkBreaks]}
            rehypePlugins={[rehypeRaw, rehypeSanitize]}
            components={{
              a: ({ href, children }) => {
                return (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    {children}
                  </a>
                );
              },
              img: ({ node, ...props }) => {
                if (props.src) {
                  return (
                    <img
                      {...props}
                      style={{ maxWidth: "800px", maxHeight: "600px" }}
                    />
                  );
                }
              },
              code(props) {
                const { children, className, node, ...rest } = props;
                const match = /language-(\w+)/.exec(className || "");
                return match ? (
                  <SyntaxHighlighter
                    {...rest}
                    PreTag="div"
                    children={String(children).replace(/\n$/, "")}
                    language={match[1]}
                    style={oneLight}
                    ref={highlighterRef}
                  />
                ) : (
                  <code
                    {...rest}
                    style={{
                      background: "#FBEFEF",
                      opacity: "0.7",
                      display: "inline-block",
                      padding: "0 5px",
                      fontSize: "1rem",
                      fontFamily: "Pretendard",
                      color: "#FA5858",
                      letterSpacing: "1px",
                    }}
                  >
                    {children}
                  </code>
                );
              },
            }}
          >
            {code}
          </ReactMarkdown>
        </div>
      )}
    </div>
  );
}
