import '../sass/global.scss';

//descriptions
export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({ children }) {
  return (
    <html lang="pt-BR">
      <body className="containerBody">
        {children}
      </body>
    </html>
  );
}