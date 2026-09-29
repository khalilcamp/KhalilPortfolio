# Portfólio — Khalil Camargo

Site pessoal em português e inglês, feito com Next.js (App Router), TypeScript, Tailwind CSS e next-intl.

## Rodando

```bash
npm install
npm run dev
npm run build
```

## Editando o conteúdo

Os textos ficam em `messages/pt-BR.json` e `messages/en.json`. Links, stacks e certificados ficam em `data/conteudo.ts`.

Para adicionar o print de um projeto, coloque a imagem em `public/` e preencha o campo `imagem` do projeto em `data/conteudo.ts` (ex.: `imagem: "/linkpet.png"`, de preferência 1200×675).

## Idioma

Na primeira visita, quem tem o navegador em português vê `/` e o resto é redirecionado para `/en`. Depois que a pessoa escolhe PT ou EN no seletor, a escolha fica salva e passa a valer.
