import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tailwindcss from "@tailwindcss/vite";
import { mdx } from "@cyco130/vite-plugin-mdx";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    mdx({
      providerImportSource: "@mdx-js/react",
    }),
    react(),
    tailwindcss(),
  ],
  resolve: {
    extensions: [".mjs", ".js", ".ts", ".tsx", ".jsx", ".mdx"],
  },
});
