'use client';

import { ThemeProvider } from "next-themes";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="styrcon-light"
      themes={["styrcon-light", "styrcon-dark"]}
      enableSystem={false}
      disableTransitionOnChange={true}
      storageKey="styrcon-theme"
    >
      {children}
    </ThemeProvider>
  );
}