import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme.provider";
import { Toaster } from "@/components/ui/sonner";
import { languages } from "@/i18n/settings";
import { localization } from "@/lib/utils";
import { ChildProps } from "@/types";
import { ClerkProvider } from "@clerk/nextjs";
import { dir } from "i18next";
import type { Metadata } from "next";
import { Roboto, Space_Grotesk as SpaceGrotesk } from "next/font/google";

const roboto = Roboto({
  subsets: ["latin", "cyrillic"],
  weight: ["100", "300", "400", "500", "700", "900"],
  variable: "--font-roboto",
});

const spaceGrotesk = SpaceGrotesk({
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

export async function generateStaticParams() {
  return languages.map((lng) => ({ lng }));
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ungarov.academy'),
  title: 'Ungarov Academy | Dasturlash, Til kurslari, Iqro Arabia va Konsalting xizmatlarini birlashtirgan ta`lim ekotizimi',
  description:
    "Ungarov Academy — dasturlash (IT), chet tillari, arab tili (Iqro Arabia) va xalqaro ta'lim bo'yicha konsalting xizmatlarini bitta joyda jamlagan zamonaviy ta'lim platformasi. Amaliyotga asoslangan kurslar, professional ustozlar va real natija.",
  authors: [{ name: 'Ungarov Academy', url: 'https://ungarov.academy' }],
  icons: { icon: "/logo.svg" },
  openGraph: {
    title: 'Ungarov Academy | IT, Til va Xalqaro Ta`lim Ekotizimi',
    description:
      "Dasturlash, til kurslari, Iqro Arabia, arab tili va xalqaro ta'lim konsaltingi — Ungarov Academy'da bitta joyda.",
    type: 'website',
    url: 'https://ungarov.academy',
    locale: 'uz_UZ',
    images: '/og-image.png',
    countryName: 'Uzbekistan',
    siteName: 'Ungarov Academy',
    emails: 'info@ungarov.academy',
  },
  keywords:
    "Ungarov Academy, Ungarov, dasturlash kurslari, IT kurslari, frontend kurs, backend kurs, Next.js kurs, dasturlash oʻrganish, til kurslari, arab tili kursi, Iqro Arabia, Qurʼon oʻqishni oʻrganish, xalqaro taʼlim konsalting, chet elda oʻqish, universitet uchun hujjat tarjimasi, Umm Al-Qura universiteti, Toshkentda IT kurslari, Oʻzbekistonda dasturlash taʼlimi",
};

interface Props extends ChildProps {
  params: { lng: string };
}

function RootLayout({ children, params: { lng } }: Props) {
  const local = localization(lng);

  return (
    <ClerkProvider localization={local}>
      <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
        <body
          className={`${roboto.variable} ${spaceGrotesk.variable} custom-scrollbar overflow-x-hidden`}
          suppressHydrationWarning>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange>
            <Toaster position="top-center" />
            {children}
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}

export default RootLayout;