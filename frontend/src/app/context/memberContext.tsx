import { createContext, useContext, useMemo, useState } from "react";

interface MemberContextType {
  username: string;
  setUsername: (newName: string) => void;
}

export const MemberContext = createContext<MemberContextType|undefined>(undefined);

export function TestProvider({ children }: { children: React.ReactNode }) {
  const [username, setUsername] = useState("anonymous"); // 기본값
  
  const contextValue = useMemo(() => ({ username, setUsername }), [username]);

  return (
    <MemberContext.Provider value={contextValue}>
      {children}
    </MemberContext.Provider>
  );
}

export const useTestContext = () => {
  const context = useContext(MemberContext);
  if (!context) {
      throw new Error("useAppContext must be used within an TestProvider");
  }
  return context;
};