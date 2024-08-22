import '@globalCss/global.css';

export default function RootLayout({children}) {
  return (
    <html lang="pt-BR">
      <title>LA FocA | Laboratório de Abordagens de Ensino Focadas no Aluno</title>
      <body>{children}</body>
    </html>
  );
}