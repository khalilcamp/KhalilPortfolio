"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";

const secoes = ["sobre", "experiencia", "projetos", "formacao"] as const;

export function Navegacao() {
  const t = useTranslations("nav");
  const [ativa, setAtiva] = useState<string>(secoes[0]);

  useEffect(() => {
    const observador = new IntersectionObserver(
      (entradas) => {
        const visivel = entradas.find((e) => e.isIntersecting);
        if (visivel) setAtiva(visivel.target.id);
      },
      { rootMargin: "-40% 0px -55% 0px" },
    );
    secoes.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observador.observe(el);
    });
    return () => observador.disconnect();
  }, []);

  return (
    <nav aria-label={t("rotulo")} className="hidden lg:block">
      <ul className="mt-14 space-y-1">
        {secoes.map((id) => {
          const atual = ativa === id;
          return (
            <li key={id}>
              <a
                href={`#${id}`}
                aria-current={atual ? "location" : undefined}
                className="group flex items-center gap-4 py-2"
              >
                <span
                  className={`h-px transition-all duration-300 motion-reduce:transition-none ${
                    atual ? "w-16 bg-magenta" : "w-8 bg-linha group-hover:w-16 group-hover:bg-suave"
                  }`}
                />
                <span
                  className={`text-sm font-bold transition-colors ${
                    atual ? "text-texto" : "text-suave group-hover:text-texto"
                  }`}
                >
                  {t(id)}
                </span>
              </a>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
