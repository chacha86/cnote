import { Editor, } from "@toast-ui/react-editor"
import React from "react";

const EditorWrapper = ({aaa, ...props}:{aaa:any}) => {
    return <Editor ref={aaa} {...props} />
}

export default EditorWrapper;