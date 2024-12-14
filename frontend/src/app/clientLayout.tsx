'use client';
import { TestProvider } from "./context/memberContext";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <TestProvider>{children}</TestProvider>;
}
