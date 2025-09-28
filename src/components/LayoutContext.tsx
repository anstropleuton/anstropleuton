import { createContext, type ReactNode } from "react";

export interface SectionLink {
  link?: string;
  content?: ReactNode;
  tooltip?: ReactNode;
}

export interface PageLink {
  link?: string;
  content?: ReactNode;
  tooltip?: ReactNode;
}

export interface LayoutProps {
  sections?: SectionLink[];
  links?: PageLink[];
}

interface LayoutContextProps {
  layout: LayoutProps;
  setLayout: (layout: LayoutProps) => void;
}

export const LayoutContext = createContext<LayoutContextProps | undefined>(
  undefined,
);
