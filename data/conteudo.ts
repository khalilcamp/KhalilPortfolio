export const perfil = {
  nome: "Khalil Camargo",
  email: "kacamargopacker@gmail.com",
  github: "https://github.com/khalilcamp",
  linkedin: "https://www.linkedin.com/in/khalil-camargo-packer-035ba91a5/",
  repositorio: "https://github.com/khalilcamp/portfolioreal",
};

export const experiencias = [
  {
    id: "hypeone",
    empresa: "HypeOne",
    stack: ["Java", "Spring Boot", "Quarkus", "PostgreSQL", "Docker", "Jenkins", "AWS"],
  },
  {
    id: "domatech",
    empresa: "Domatech",
    stack: ["React", "Next.js", "SCSS", "PHP"],
  },
  {
    id: "autonomo",
    empresa: "MEI",
    stack: ["Lua", "C++", "Node.js", "Electron", "React", "MySQL", "Linux"],
  },
] as const;

type Projeto = {
  id: "linkpet" | "contela" | "dynastes";
  nome: string;
  stack: string[];
  links: { tipo: "aoVivo" | "codigo" | "download"; href: string }[];
  imagem?: string;
};

export const projetos: Projeto[] = [
  {
    id: "linkpet",
    nome: "LinkPet",
    stack: ["Next.js", "React", "TypeScript", "Tailwind", "Spring Boot", "PostgreSQL", "Supabase"],
    links: [
      { tipo: "aoVivo", href: "https://linkpet.vercel.app" },
      { tipo: "codigo", href: "https://github.com/khalilcamp/linkpet" },
    ],
  },
  {
    id: "contela",
    nome: "Contela",
    stack: ["Next.js", "WebRTC", "Spring Boot", "WebSocket", "Electron", "GitHub Actions"],
    links: [
      { tipo: "aoVivo", href: "https://contela.pages.dev/" },
      { tipo: "download", href: "https://github.com/khalilcamp/contela/releases/latest" },
    ],
  },
  {
    id: "dynastes",
    nome: "Dynastes",
    stack: ["Java", "Quarkus", "GraalVM", "Docker", "MySQL", "Redis"],
    links: [],
  },
];

export const certificados = [
  { nome: "CS50: Introduction to Computer Science", emissor: "Harvard" },
  { nome: "Spring Boot Expert: JPA, REST, JWT, OAuth2, Docker & AWS", emissor: "Udemy" },
  { nome: "The Ultimate React Course: Next.js, Hooks, Context API & Redux", emissor: "Udemy" },
  { nome: "Bootcamp Spring Framework", emissor: "Santander" },
];
