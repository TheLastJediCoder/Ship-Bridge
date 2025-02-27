"use client";

import { Container, ThemeProvider } from "@mui/material";
import "./globals.css";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v15-appRouter";
import theme from "./theme";
import ResponsiveAppBar from "./components/app-header";
import { SessionHandler } from "./components/session-handler";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <SessionHandler></SessionHandler>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <ResponsiveAppBar></ResponsiveAppBar>
            <Container>{children}</Container>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
