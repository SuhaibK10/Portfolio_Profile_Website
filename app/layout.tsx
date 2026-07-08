import type { Metadata } from "next";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { geistSans, geistMono, inter } from "@/lib/fonts";
import { SmoothScrollProvider }  from "@/components/providers/SmoothScrollProvider";
import { MotionProvider }        from "@/components/providers/MotionProvider";
import { Atmosphere }   from "@/components/Atmosphere";
import { MouseGlow }    from "@/components/MouseGlow";
import { Navbar }       from "@/components/Navbar";
import { AmbientPlayer } from "@/components/AmbientPlayer";
import { SiteFooter }   from "@/components/SiteFooter";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.suhaibkhan.in"),
  title: {
    default:  "Suhaib Khan",
    template: "%s · Suhaib Khan",
  },
  description:
    "Engineer, builder and systems thinker. Exploring AI, markets and how enduring things are made.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title:       "Suhaib Khan",
    description: "Engineer, builder and systems thinker. Exploring AI, markets and how enduring things are made.",
    siteName:    "Suhaib Khan",
    url:         "https://www.suhaibkhan.in",
    type:        "website",
  },
  twitter: {
    card:        "summary_large_image",
    title:       "Suhaib Khan",
    description: "Engineer, builder and systems thinker. Exploring AI, markets and how enduring things are made.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${inter.variable}`}
    >
      <body className="bg-background text-foreground font-body antialiased overflow-x-hidden">

        {/* Skip-to-content for keyboard / screen-reader users */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <SmoothScrollProvider>
          <MotionProvider>

            {/* z -10  fixed decorative background */}
            <Atmosphere />

            {/* z 20   neutral cursor spotlight (desktop only) */}
            <MouseGlow />

            {/* z 40   site navigation */}
            <Navbar />

            {/* z 50   ambient player — fixed bottom-right */}
            <AmbientPlayer className="fixed bottom-5 right-5 z-50" />

            <div id="main-content">
              {children}
            </div>

            <SiteFooter />

          </MotionProvider>
        </SmoothScrollProvider>

        {/* Vercel Analytics */}
        <Analytics />

        {/* Microsoft Clarity — replace xf4ao86itg with your project ID */}
        <Script id="ms-clarity" strategy="afterInteractive">
          {`(function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window,document,"clarity","script","xf4ao86itg");`}
        </Script>

      </body>
    </html>
  );
}
