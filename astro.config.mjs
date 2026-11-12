import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from "astro/config";

// A static site: `astro build` writes every page to `dist/`, with no adapter and no server.
export default defineConfig({
  vite: { plugins: [tailwindcss()] },
  devToolbar: { enabled: false },
});
