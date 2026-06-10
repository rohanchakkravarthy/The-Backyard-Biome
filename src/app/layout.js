export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header>
          <h1> The Backyard Biome</h1>
        </header>
        {children}
      </body>
    </html>
  );
}