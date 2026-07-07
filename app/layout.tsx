import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: "Novu — Project Management", template: "%s | Novu" },
  description: "Modern SaaS project management dashboard for engineering teams.",
};

// Auth routes render WITHOUT the sidebar/topbar shell
const AUTH_ROUTES = ["/login", "/signup", "/forgot-password"];

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} antialiased`}>
        <AppShell authRoutes={AUTH_ROUTES}>{children}</AppShell>
      </body>
    </html>
  );
}
