import { useState } from "react";
import { TestContext } from "./testContext";

export function TestProvider({ children }: { children: React.ReactNode }) {
    const [value, setValue] = useState(""); // 기본값
  
    return (
      <TestContext.Provider value={{ value, setValue }}>
        {children}
      </TestContext.Provider>
    );
  }