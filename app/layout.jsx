import '@globalCss/global.css';

export default function RootLayout({children}) {
  return (
    <html lang="pt-BR">
      <title>La Foca</title>
      {/* <link rel="stylesheet" href="odometer-theme-default.css" /> */}
      {/* <link rel="stylesheet" href="odometer-theme-default.css" ></link> */}
      <body>{children}</body>
    </html>
  );
}