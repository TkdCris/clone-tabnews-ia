import "./globals.css";

export const metadata = {
  title: "Poema",
  description: "Poema inicial",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}

