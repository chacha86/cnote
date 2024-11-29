import React from "react";
import ReactMarkdown from "react-markdown";

const markdownContent = `
# Lists in Markdown

## Unordered List
- Item 1
- Item 2
  - Subitem 1
  - Subitem 2

## Ordered List
1. Step 1
2. Step 2
   1. Substep 1
   2. Substep 2
`;

const App: React.FC = () => {
  return (
    <div>
      <ReactMarkdown>{markdownContent}</ReactMarkdown>
    </div>
  );
};

export default App;