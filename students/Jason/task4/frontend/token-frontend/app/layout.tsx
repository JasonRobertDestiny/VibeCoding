export const metadata = {
  title: "Token Frontend",
  description: "Minimal Next.js + RainbowKit demo",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ fontFamily: 'system-ui, Segoe UI, Roboto, Helvetica, Arial' }}>{children}</body>
    </html>
  );
}

