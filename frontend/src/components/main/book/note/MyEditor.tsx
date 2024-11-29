"use client";
// import dynamic from "next/dynamic";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import React, { useState, useEffect, useRef, forwardRef } from "react";
import dynamic, { DynamicOptions } from "next/dynamic";
import { Editor, EditorProps } from "@toast-ui/react-editor";
import Prism from "prismjs";

const EditorWrapper = dynamic(() => import("./EditorWrapper"), {
  ssr: false, // 이 옵션은 서버 사이드 렌더링을 비활성화합니다.
});

const ForwardedEditor = forwardRef<Editor, EditorProps>((props, ref) => {
  return <EditorWrapper aaa={ref} {...props} />;
});

const CodeSyntaxHighlight = dynamic(
  () => import("@toast-ui/editor-plugin-code-syntax-highlight"),
  { ssr: false } // SSR 비활성화
);


export default function MyEditor({ content }: { content: string | undefined }) {
    console.log(Prism.languages);
  const editorRef = useRef<Editor | null>(null);
  useEffect(() => {
    editorRef?.current?.getInstance().setMarkdown(content);
  }, [content]);

  return (
    <div>
      <ForwardedEditor
        ref={editorRef}
        initialValue=""
        previewStyle="vertical"
        height="70vh"
        initialEditType="markdown"
        useCommandShortcut={true}
        plugins={[[CodeSyntaxHighlight, { highlighter: Prism }]]}
      />
    </div>
  );
}
