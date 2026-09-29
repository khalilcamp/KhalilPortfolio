import Image from "next/image";
import type { Locale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Navegacao } from "@/components/Navegacao";
import { SeletorIdioma } from "@/components/SeletorIdioma";
import { IconeEmail, IconeGithub, IconeLinkedin } from "@/components/Icones";
import { certificados, experiencias, perfil, projetos } from "@/data/conteudo";

function Stack({ itens, rotulo }: { itens: readonly string[]; rotulo: string }) {
  return (
    <ul className="mt-4 flex flex-wrap gap-x-2 gap-y-2" aria-label={rotulo}>
      {itens.map((item) => (
        <li key={item} className="rounded-md border border-linha px-2 py-0.5 text-xs text-suave">
          {item}
        </li>
      ))}
    </ul>
  );
}

function TituloSecao({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="sticky top-0 z-10 -mx-6 mb-6 bg-fundo/85 px-6 py-4 font-display text-lg font-bold text-texto backdrop-blur lg:sr-only">
      {children}
    </h2>
  );
}

export default async function Home({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale as Locale);
  const t = await getTranslations();

  return (
    <div className="mx-auto min-h-screen max-w-6xl px-6 md:px-12 lg:flex lg:justify-between lg:gap-16 lg:px-16">
      <header className="pt-16 lg:sticky lg:top-0 lg:flex lg:max-h-screen lg:w-[46%] lg:flex-col lg:justify-between lg:py-24">
        <div>
          <div className="mb-8 flex items-start justify-between">
            <Image
              src="/eu.jpg"
              alt={t("meta.foto")}
              width={88}
              height={88}
              priority
              className="rounded-full ring-2 ring-linha"
            />
            <SeletorIdioma />
          </div>
          <h1 className="nome-entrada font-display text-5xl leading-[0.95] font-extrabold tracking-tight text-texto sm:text-6xl">
            {perfil.nome}
          </h1>
          <p className="mt-4 font-display text-xl font-medium text-texto">{t("meta.cargo")}</p>
          <p className="mt-4 max-w-sm">{t("meta.resumo")}</p>
          <Navegacao />
        </div>

        <ul className="mt-10 flex items-center gap-6" aria-label={t("contato")}>
          <li>
            <a href={perfil.github} className="block text-suave transition-colors hover:text-magenta">
              <span className="sr-only">GitHub</span>
              <IconeGithub className="size-6" />
            </a>
          </li>
          <li>
            <a href={perfil.linkedin} className="block text-suave transition-colors hover:text-magenta">
              <span className="sr-only">LinkedIn</span>
              <IconeLinkedin className="size-6" />
            </a>
          </li>
          <li>
            <a
              href={`mailto:${perfil.email}`}
              className="flex items-center gap-2 text-sm text-suave transition-colors hover:text-magenta"
            >
              <IconeEmail className="size-6" />
              {perfil.email}
            </a>
          </li>
        </ul>
      </header>

      <main className="pt-20 lg:w-[54%] lg:py-24">
        <section id="sobre" aria-label={t("nav.sobre")} className="mb-24 scroll-mt-24 lg:mb-32">
          <TituloSecao>{t("nav.sobre")}</TituloSecao>
          <div className="max-w-prose space-y-4">
            {t.raw("sobre.paragrafos").map((paragrafo: string) => (
              <p key={paragrafo}>{paragrafo}</p>
            ))}
          </div>
        </section>

        <section id="experiencia" aria-label={t("nav.experiencia")} className="mb-24 scroll-mt-24 lg:mb-32">
          <TituloSecao>{t("nav.experiencia")}</TituloSecao>
          <ol className="space-y-14">
            {experiencias.map((exp) => {
              const destaques: string[] = t.raw(`experiencia.${exp.id}.destaques`);
              return (
                <li key={exp.id} className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
                  <p className="pt-1 text-xs font-bold tracking-wide text-suave">
                    {t(`experiencia.${exp.id}.periodo`)}
                  </p>
                  <div>
                    <h3 className="font-display text-lg leading-snug font-semibold text-texto">
                      {t(`experiencia.${exp.id}.cargo`)}{" "}
                      <span className="font-normal text-suave">{t("experiencia.na")}</span> {exp.empresa}
                    </h3>
                    <p className="mt-2 text-[0.95rem]">{t(`experiencia.${exp.id}.descricao`)}</p>
                    {destaques.length > 0 && (
                      <ul className="mt-3 space-y-1.5 text-[0.95rem]">
                        {destaques.map((d) => (
                          <li
                            key={d}
                            className="relative pl-4 before:absolute before:top-[0.7em] before:left-0 before:size-1.5 before:rounded-full before:bg-magenta"
                          >
                            {d}
                          </li>
                        ))}
                      </ul>
                    )}
                    <Stack itens={exp.stack} rotulo={t("tecnologias")} />
                  </div>
                </li>
              );
            })}
          </ol>
        </section>

        <section id="projetos" aria-label={t("nav.projetos")} className="mb-24 scroll-mt-24 lg:mb-32">
          <TituloSecao>{t("nav.projetos")}</TituloSecao>
          <ul className="space-y-20">
            {projetos.map((p) => (
              <li key={p.id}>
                {p.imagem ? (
                  <Image
                    src={p.imagem}
                    alt={t("projetos.tela", { nome: p.nome })}
                    width={1200}
                    height={675}
                    className="aspect-video w-full rounded-lg border border-linha object-cover"
                  />
                ) : (
                  <div className="print-reservado flex aspect-video w-full items-center justify-center rounded-lg border border-dashed border-linha">
                    <span className="rounded bg-fundo px-3 py-1 text-xs text-suave">
                      {t("projetos.printEmBreve", { nome: p.nome })}
                    </span>
                  </div>
                )}
                <h3 className="mt-6 font-display text-2xl font-bold text-texto">{p.nome}</h3>
                <p className="mt-1 font-display text-lg text-texto/90">{t(`projetos.${p.id}.resumo`)}</p>
                <p className="mt-3 max-w-prose text-[0.95rem]">{t(`projetos.${p.id}.detalhes`)}</p>
                <Stack itens={p.stack} rotulo={t("tecnologias")} />
                {p.links.length > 0 && (
                  <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-sm font-bold">
                    {p.links.map((l) => (
                      <li key={l.href}>
                        <a href={l.href} className="link">
                          {t(`projetos.links.${l.tipo}`)}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </section>

        <section id="formacao" aria-label={t("nav.formacao")} className="mb-24 scroll-mt-24">
          <TituloSecao>{t("nav.formacao")}</TituloSecao>
          <div className="grid gap-2 sm:grid-cols-[8.5rem_1fr] sm:gap-6">
            <p className="pt-1 text-xs font-bold tracking-wide text-suave">{t("formacao.periodo")}</p>
            <h3 className="font-display text-lg font-semibold text-texto">
              {t("formacao.curso")} <span className="font-normal text-suave">{t("experiencia.na")}</span>{" "}
              {t("formacao.instituicao")}
            </h3>
          </div>

          <h3 className="mt-12 font-display text-lg font-semibold text-texto">{t("formacao.certificados")}</h3>
          <ul className="mt-3 space-y-2 text-[0.95rem]">
            {certificados.map((c) => (
              <li key={c.nome}>
                <span className="text-texto">{c.nome}</span>, {c.emissor}
              </li>
            ))}
          </ul>

          <h3 className="mt-12 font-display text-lg font-semibold text-texto">{t("formacao.idiomas")}</h3>
          <p className="mt-3 text-[0.95rem]">{t("formacao.listaIdiomas")}</p>
        </section>

        <footer className="border-t border-linha py-10 text-sm">
          <p>
            {t("rodape.convite")}{" "}
            <a href={`mailto:${perfil.email}`} className="link">
              {t("rodape.email")}
            </a>
            .
          </p>
          <p className="mt-3">
            {t("rodape.feito")}{" "}
            <a href={perfil.repositorio} className="link">
              {t("rodape.codigo")}
            </a>
            .
          </p>
        </footer>
      </main>
    </div>
  );
}
