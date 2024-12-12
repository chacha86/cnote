import { createContext } from "react";

export const TestContext = createContext({
    value: "hihi", // 기본 테마
    setValue: (newValue:string) => {
        
    }, // 빈 함수
  });