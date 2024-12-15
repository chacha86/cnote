import React, { useEffect, useRef } from "react";
import * as monaco from "monaco-editor";
import { Editor, OnMount } from "@monaco-editor/react";

function NoteEditor({
  content,
  cursor,
  changeContent,
  changeCursor
}: {
  content: string;
  cursor: {lineNumber:number, column:number};
  changeContent: (content: string | undefined) => void;
  changeCursor: (cursor: {lineNumber:number, column:number}) => void;
}) {

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);

  const handleEditorDidMount: OnMount = React.useCallback((editor) => {
    editorRef.current = editor;
    editor.onDidChangeCursorPosition((e) => {
      changeCursor(e.position);
    });
    editor.focus();
    editor.setPosition(cursor);
  }, [changeCursor, cursor]);

  useEffect(() => {

    if (editorRef.current && editorRef.current.getValue() !== content) {
      editorRef.current.setValue(content);
    }
  }, [content]);

  return (
    <Editor
      className="border-[1px] border-green-500 rounded-lg p-2"
      defaultLanguage="markdown"
      theme="vs"
      defaultValue={content}
      onChange={changeContent}
      onMount={handleEditorDidMount}
      options={{
        wordWrap: "on",
        lineNumbers: "on",
        renderWhitespace: "all",
        renderControlCharacters: true,
        automaticLayout: true,
        suggestOnTriggerCharacters: false,
        quickSuggestions: false,
        mouseWheelZoom: true,
        fontFamily: "Pretendard, monospace",
        fontSize: 16,
        placeholder: "여기에 내용을 입력하세요...",
        minimap: {
          enabled: false,
        },
      }}
    />
  );
}

export default React.memo(NoteEditor);
