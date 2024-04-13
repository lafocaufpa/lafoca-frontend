import '@globalCss/global.css';

export default function RootLayout({children}) {
  return (
    <html lang="pt-BR">
      <title>La Foca</title>
      <body>{children}</body>
    </html>
  );
}