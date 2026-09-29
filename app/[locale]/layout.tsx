import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Atkinson_Hyperlegible_Next, Bricolage_Grotesque } from "next/font/google";
import { hasLocale, NextIntlClientProvider, type Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { perfil } from "@/data/conteudo";
import "../globals.css";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  variable: "--fonte-display",
  display: "swap",
});

const texto = Atkinson_Hyperlegible_Next({
  subsets: ["latin"],
  variable: "--fonte-texto",
  display: "swap",
  adjustFontFallback: false,
});

const dominio = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale: locale as Locale, namespace: "meta" });

  return {
    metadataBase: new URL(dominio ? `https://${dominio}` : "http://localhost:3000"),
    title: `${perfil.nome}, ${t("cargo").toLowerCase()}`,
    description: t("resumo"),
    icons: { icon: "/favicon.svg" },
    alternates: {
      canonical: locale === routing.defaultLocale ? "/" : `/${locale}`,
      languages: { "pt-BR": "/", en: "/en", "x-default": "/" },
    },
    openGraph: {
      title: perfil.nome,
      description: t("resumo"),
      images: ["/eu.jpg"],
      locale: locale === "en" ? "en_US" : "pt_BR",
      type: "website",
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);

  return (
    <html lang={locale} className={`${display.variable} ${texto.variable}`}>
      <body>
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
      </body>
    </html>
  );
}
