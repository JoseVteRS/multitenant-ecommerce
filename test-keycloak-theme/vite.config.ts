import { readFile } from 'fs/promises';
import { join } from 'path';

// import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default async ({ mode }: { mode: string }) => {
  const environment = process.env.NODE_ENV ?? "development";
  const APP_CONFIG = (
    await readFile(join("src", "config", `config.${environment}.json`))
  ).toString("utf-8");

  return {
    mode,
    define: {
      APP_CONFIG,
      "process.env.NODE_ENV":
        (mode === "staging" && '"production"') || `"${mode}"`,
    },
    plugins: [react()],
  };
};
