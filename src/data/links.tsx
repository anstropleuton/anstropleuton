import type { PageLink } from "../components/LayoutContext";

const homeLink = {
  link: "#/#",
  content: <span>Home</span>,
  tooltip: <span>Homepage.</span>,
} as PageLink;

const blogsLink = {
  link: "#/blogs",
  content: <span>Blogs</span>,
  tooltip: <span>My blogs.</span>,
} as PageLink;

export const links = [homeLink, blogsLink];
