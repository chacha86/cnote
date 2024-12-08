import {Prism as SyntaxHighlighter} from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
export default function Component() {
  const codeString = "let a = 1;";
  return (
    <SyntaxHighlighter
      language={"javascript"}
      style={oneDark} // 언어 감지
      PreTag="div"
    >
      {codeString}
    </SyntaxHighlighter>
  );
}
