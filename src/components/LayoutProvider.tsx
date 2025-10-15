import { createContext, useContext, useState, type ReactNode } from "react";

export interface LayoutSection {
  title: string;
  description: string;
  url: string;
}

export interface LayoutLink {
  title: string;
  description: string;
  url: string;
}

interface LayoutContextType {
  sections: LayoutSection[];
  setSections: (sections: LayoutSection[]) => void;
  links: LayoutLink[];
  setLinks: (links: LayoutLink[]) => void;
}

const LayoutContext = createContext<LayoutContextType>({
  sections: [],
  setSections: () => {},
  links: [],
  setLinks: () => {},
});

export function useLayout() {
  return useContext(LayoutContext);
}

export default function LayoutProvider({ children }: { children?: ReactNode }) {
  const [sections, setSections] = useState<LayoutSection[]>([]);
  const [links, setLinks] = useState<LayoutLink[]>([]);

  return (
    <LayoutContext value={{ sections, setSections, links, setLinks }}>
      {children}
    </LayoutContext>
  );
}
