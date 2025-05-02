import Providers from "@/components/shared/Providers";
import "./globals.css";

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ru">
      <head>
        <link rel="icon" href="/logo.png" />
      </head>
      <body
        className="antialiased"
        style={{ fontFamily: "var(--font-nunito)" }}
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
