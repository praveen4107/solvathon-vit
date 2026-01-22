import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Admin - SOLVATHON'26",
  description: "Admin dashboard for SOLVATHON'26 registrations",
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning className="bg-neutral-950 text-white">
        {children}
      </body>
    </html>
  );
}
