import { useEffect, useMemo } from "react";
import Header from "./components/Header";
import Footer from "./components/Footer";
import LayoutProvider, {
  useLayout,
  type LayoutLink,
} from "./components/LayoutProvider";
import ThemeProvider from "./components/ThemeProvider";
import { BrowserRouter, Route, Routes } from "react-router";
import HomePage from "./pages/HomePage";

export default function App() {
  return (
    <ThemeProvider>
      <LayoutProvider>
        <MainLayout />
      </LayoutProvider>
    </ThemeProvider>
  );
}

function MainLayout() {
  const { setLinks } = useLayout();

  const links = useMemo<LayoutLink[]>(
    () => [
      {
        title: "Home",
        description: "Go to Home Page.",
        url: "/",
      },
      {
        title: "Projects",
        description: "Go to Projects Page.",
        url: "/projects/",
      },
      {
        title: "Blogs",
        description: "Go to Blogs Page.",
        url: "/blogs/",
      },
    ],
    [],
  );

  useEffect(() => {
    setLinks(links);
  }, [setLinks, links]);

  return (
    <div
      id="app"
      className="font-ubuntu flex min-h-screen flex-col bg-white text-black dark:bg-black dark:text-white selection:bg-purple-400 dark:selection:bg-purple-600"
    >
      <Header />
      <Main />
      <Footer />
    </div>
  );
}

function Main() {
  return (
    <div className="flex grow justify-center px-8">
      <div className="w-full max-w-7xl">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}
