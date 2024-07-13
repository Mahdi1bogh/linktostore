import { GeistSans } from 'geist/font/sans';
import './globals.css';
import { ThemeProvider } from '@/context/theme-provider';
import { CartProvider } from '@/context/CartContext';

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : 'http://localhost:3000';

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: 'LinkToStore',
  description: 'The fastest way to publish ur store online',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="bg-background w-full h-full text-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <CartProvider>
            <main className="h-full w-full">{children}</main>{' '}
          </CartProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
