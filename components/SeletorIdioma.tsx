"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";

const opcoes = [
  { locale: "pt-BR", sigla: "PT", nome: "Português" },
  { locale: "en", sigla: "EN", nome: "English" },
] as const;

export function SeletorIdioma() {
  const atual = useLocale();
  const t = useTranslations("idioma");

  return (
    <nav aria-label={t("rotulo")}>
      <ul className="flex rounded-md border border-linha p-0.5 text-xs font-bold">
        {opcoes.map(({ locale, sigla, nome }) => {
          const ativo = atual === locale;
          return (
            <li key={locale}>
              <Link
                href="/"
                locale={locale}
                hrefLang={locale}
                lang={locale}
                aria-current={ativo ? "page" : undefined}
                className={`block rounded px-2.5 py-1 transition-colors ${
                  ativo ? "bg-magenta text-fundo" : "text-suave hover:text-texto"
                }`}
              >
                <span aria-hidden="true">{sigla}</span>
                <span className="sr-only">{nome}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
