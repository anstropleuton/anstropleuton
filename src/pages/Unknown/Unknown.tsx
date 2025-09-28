import { useEffect } from "react";
import Formatted from "../../components/Formatted";
import useLayout from "../../components/useLayout";
import setPageTitle from "../../components/setPageTitle";
import { links } from "../../data/links";

export default function Unknown() {
  const { setLayout } = useLayout();
  useEffect(() => {
    setLayout({ links: links });

    return () => {
      setLayout({});
    };
  }, []);

  setPageTitle("404 - Page Not Found");

  return (
    <div className="mx-auto flex max-w-xl flex-col items-center justify-center text-center">
      <Formatted>
        <h1>404 Page not found.</h1>
        <p>
          I cannot find the page you are looking for... maybe you have mistyped
          the URL, the page has been removed, moved or is temporarily
          unavailable.
        </p>
      </Formatted>
    </div>
  );
}
