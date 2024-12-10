import * as monaco from "monaco-editor";

export function test({editor}: {editor: monaco.editor.IStandaloneCodeEditor}) {
  return editor.addCommand(
    monaco.KeyMod.CtrlCmd | monaco.KeyCode.KeyS, // Ctrl+S
    () => {
      console.log("ctrl + s");
      // fetch(
      //   `http://localhost:8080/api/v1/notes/${selectedNoteRef.current.id}`,
      //   {
      //     method: "PUT",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({
      //       title: titleRef.current?.value,
      //       content: editorRef.current?.getValue(),
      //     }),
      //   }
      // )
      //   .then((res) => res.json())
      //   .then((res) => {
      //     changeNote(res.data);
      //   });
    }
  );
}
