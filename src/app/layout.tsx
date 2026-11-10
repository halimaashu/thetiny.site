import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/Smoothscroll ";
import { ThemeProvider } from "next-themes";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "thetiny.site | Short Links You Can Count and Control",
    template: "%s | thetiny.site",
  },
  description:
    "Create free short links in seconds, track clicks, manage your links, and disable them whenever you want. Simple, fast, and easy URL shortening.",

  keywords: [
    "URL shortener",
    "Free link shortener",
    "Short links",
    "Link management",
    "Click tracking",
    "URL tracker",
  ],

  openGraph: {
    title: "thetiny.site | Short Links You Can Count and Control",
    description:
      "Create a free short link in seconds, see how many people click it, and disable it whenever you want.",
    siteName: "thetiny.site",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "thetiny.site | Short Links You Can Count and Control",
    description:
      "Create free short links, track clicks, and stay in control of every link.",
  },

  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col bg-background text-foreground">
        <SmoothScroll>
          <ThemeProvider>
          <header>
            <NavBar />
          </header>
          <main>{children}</main>
          <footer>
            <Footer />
          </footer>
          </ThemeProvider>
        </SmoothScroll>
      </body>
    </html>
  );
}
