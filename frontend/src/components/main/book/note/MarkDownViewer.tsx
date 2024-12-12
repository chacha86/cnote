'use client';
import { useContext, useRef } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import remarkBreaks from "remark-breaks";
import rehypeSanitize from "rehype-sanitize";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  oneDark,
  oneLight,
} from "react-syntax-highlighter/dist/esm/styles/prism";
import { TestContext } from "@/app/context/testContext";

export default function MarkDownViewer({content}: {content: string}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const highlighterRef = useRef<SyntaxHighlighter | null>(null);
  return (
    <div ref={containerRef} className="not-tailwind h-[100%] p-3 overflow-auto">
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
        {content}
      </ReactMarkdown>
    </div>
  );
}
