import { useState, type ReactNode } from "react";
import { LayoutContext, type LayoutProps } from "./LayoutContext";

export default function LayoutProvider({ children }: { children: ReactNode }) {
  const [layout, setLayout] = useState<LayoutProps>({});

  return (
    <LayoutContext.Provider value={{ layout, setLayout }}>
      {children}
    </LayoutContext.Provider>
  );
}
