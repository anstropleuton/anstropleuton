import { Navigate, Route, Routes, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Blogs, { Blog } from "./pages/Blogs/Blogs";
import FileExplorer from "./pages/FileExplorer/FileExplorer";
import Unknown from "./pages/Unknown/Unknown";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { oldProjectFiles } from "./data/oldProjectFiles";

function BlogRedirect() {
  const { slug } = useParams<{ slug: string }>();
  return <Navigate to={`/blogs/${slug}`} replace />;
}

export default function App() {
  return (
    <div
      id="app-root"
      className="flex font-ubuntu min-h-screen flex-col gap-8 overflow-x-clip bg-white text-black selection:bg-purple-500/50 dark:bg-black dark:text-white transition-colors"
    >
      <Header />
      <main className="mx-auto flex w-full max-w-6xl grow px-10 py-16 not-md:px-6">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/blogs/:slug" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogRedirect />} />
          <Route
            path="/old-projects/*"
            element={<FileExplorer dir={oldProjectFiles} />}
          />
          <Route path="*" element={<Unknown />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
