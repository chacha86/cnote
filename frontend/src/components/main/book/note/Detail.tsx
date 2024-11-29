"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import Editor, { OnMount } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function DetailComponent() {
  const [value, setValue] = useState("");
  const [markdown, setMarkdown] = useState("");

  const [code, setCode] = useState("// 여기에 코드를 작성하세요");

  const handleEditorChange = (value: any) => {
    setCode(value);
    setMarkdown(value);
  };

  const handleEditorDidMount: OnMount = (editor, monaco) => {
    // Ctrl+S 단축키 추가
    editor.addCommand(
      monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, // Ctrl+S
      () => {
        console.log("Ctrl+S was pressed!");
        alert("Save triggered!");
      }
    );

    // editor.addCommand(monaco.KeyCode.Enter, () => {
    //     // 현재 커서 위치에서 줄바꿈 삽입
    //     const position = editor.getPosition(); // 현재 커서 위치
    //     const model = editor.getModel();

    //     if (position && model) {
    //       const range = new monaco.Range(
    //         position.lineNumber,
    //         position.column,
    //         position.lineNumber,
    //         position.column
    //       );
    //       const id = { major: 1, minor: 1 }; // 변경 식별자
    //       const text = `  \n`; // Markdown에서 줄바꿈은 공백 2개 + 개행문자

    //       // 줄바꿈 텍스트 삽입
    //       editor.executeEdits(JSON.stringify(id), [{ range, text, forceMoveMarkers: true }]);
    //     }
    //   });
  };
  const transformContent = (content: string) => content.replace(/\n/g, "<br/>"); // 줄바꿈 문자 처리
  return (
    <div className="p-2 w-[70%]">
      <div className="flex flex-col gap-4 h-[70vh] w-[60vw]">
        <input
          type="text"
          className="input input-success input-bordered input-lg"
        />
        {/* <textarea
          className="textarea textarea-success h-[60vh] w-[60vw] leading-normal"
          placeholder="내용 입력"
          value={markdown}
          onChange={handleTextareaChange}
        ></textarea> */}
        <Editor
          defaultLanguage="markdown" // 기본 언어
          defaultValue="// 여기에 코드를 작성하세요" // 기본 코드
          theme="vs" // 테마 설정 (vs-light, vs-dark 등)
          value={code} // 상태와 동기화된 코드
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
          }} // 코드 변경 핸들러
        />
        <div className="no-tailwind">
          <div className="not-tailwind">
            <ReactMarkdown
              remarkPlugins={[remarkGfm, remarkBreaks]}
              rehypePlugins={[rehypeRaw, rehypeSanitize]}
              components={{
                img: ({ node, ...props }) => {
                  if (props.src) {
                    return <img
                      {...props}
                      style={{ maxWidth: "800px", maxHeight: "600px" }}
                    />;
                  }
                },
                code({ node, inline, className, children, ...props }) {
                  const match = /language-(\w+)/.exec(className || "");
                  return !inline && match ? (
                    <SyntaxHighlighter
                      style={oneDark} // Prism.js 스타일
                      language={match[1]} // 언어 감지
                      PreTag="div"
                      {...props}
                    >
                      {String(children).replace(/\n$/, "")}
                    </SyntaxHighlighter>
                  ) : (
                    <code className={className} {...props}>
                      {children}
                    </code>
                  );
                },
              }}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>
      </div>
    </div>
  );
}
