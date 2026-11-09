"use strict";

// Elementos da navegação e do tema.
const root = document.documentElement;
const menuButton = document.querySelector(".menu-toggle");
const menu = document.querySelector(".main-nav");
const themeButton = document.querySelector(".theme-toggle");
const themeColor = document.querySelector('meta[name="theme-color"]');
const mobileViewport = window.matchMedia("(max-width: 760px)");

// Menu mobile.
function setMenu(open, restoreFocus = false) {
  menu.classList.toggle("is-open", open);

  menuButton.setAttribute("aria-expanded", String(open));

  menuButton.setAttribute("aria-label", open ? "Fechar menu" : "Abrir menu");

  if (restoreFocus) {
    menuButton.focus();
  }
}

menuButton.hidden = false;

menuButton.addEventListener("click", () => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  setMenu(!isOpen);
});

menu.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => setMenu(false));
});

mobileViewport.addEventListener("change", () => {
  setMenu(false);
});

document.addEventListener("keydown", (event) => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";

  if (event.key === "Escape" && isOpen) {
    setMenu(false, true);
  }
});

document.addEventListener("click", (event) => {
  const isOpen = menuButton.getAttribute("aria-expanded") === "true";
  const clickedHeader = event.target.closest(".site-header");

  if (!clickedHeader && isOpen) {
    setMenu(false);
  }
});

// Tema claro e escuro.
function syncThemeButton() {
  const dark = root.dataset.theme === "dark";

  themeButton.setAttribute("aria-pressed", String(dark));

  themeButton.setAttribute(
    "aria-label",
    dark ? "Ativar tema claro" : "Ativar tema escuro",
  );

  themeColor.setAttribute("content", dark ? "#17161b" : "#faf9fc");
}

themeButton.hidden = false;
syncThemeButton();

themeButton.addEventListener("click", () => {
  root.dataset.theme = root.dataset.theme === "dark" ? "light" : "dark";

  try {
    localStorage.setItem("ana-berigo-theme", root.dataset.theme);
  } catch {
    // Salvar a preferência é opcional.
  }

  syncThemeButton();
});

// Ano do rodapé.
document.getElementById("current-year").textContent = String(
  new Date().getFullYear(),
);

// Destaque da seção atual.
const navLinks = [...menu.querySelectorAll("a")];

const trackedSections = navLinks.map((link) => {
  return document.querySelector(link.getAttribute("href"));
});

let scrollQueued = false;

function updateActiveLink() {
  let activeIndex = -1;

  trackedSections.forEach((section, index) => {
    if (section.getBoundingClientRect().top <= 190) {
      activeIndex = index;
    }
  });

  navLinks.forEach((link, index) => {
    if (index === activeIndex) {
      link.setAttribute("aria-current", "location");
    } else {
      link.removeAttribute("aria-current");
    }
  });

  scrollQueued = false;
}

window.addEventListener(
  "scroll",
  () => {
    if (!scrollQueued) {
      window.requestAnimationFrame(updateActiveLink);
      scrollQueued = true;
    }
  },
  { passive: true },
);

updateActiveLink();

// Informações exibidas nos detalhes dos projetos.
const projects = {
  atelieberigo: {
    name: "Ateliê Berigo",
    category: "Web · Catálogo digital · Projeto pessoal",

    description:
      "Site da minha marca de amigurumis e velas artesanais, com identidade visual própria e catálogo das linhas Berigurumis e Berigulumus.",

    technologies: ["Angular", "TypeScript", "HTML", "CSS"],

    image: "src/assets/images/img-projeto-atelieBerigo.png",

    alt: "Página inicial do Ateliê Berigo, com amigurumi e velas artesanais",

    context:
      "Criado para apresentar as peças do Ateliê Berigo, facilitar a descoberta dos produtos e orientar os clientes sobre personalizações e encomendas.",

    contribution:
      "Desenvolvimento em Angular e TypeScript, com componentes reutilizáveis, layout responsivo, navegação mobile, filtros por categoria e detalhes dos produtos. A interface traduz a identidade da marca em tons de terracota, marrom e off-white.",

    status:
      "Em desenvolvimento. O site está disponível para conhecer o estágio atual do projeto.",

    url: "https://atelie-berigo.vercel.app/",
  },

  unafritas: {
    name: "UnaFritas",
    category: "Web · Landing page · Projeto acadêmico",

    description:
      "Uma landing page para apresentar a UnaFritas e sua participação na Feira Gastronômica da UNAERP.",

    technologies: ["HTML", "CSS", "JavaScript"],

    image: "src/assets/images/img-projeto-unaFritas.png",

    alt: "Página da UnaFritas com apresentação da marca e cardápio",

    context:
      "A marca, inspirada nas batatas no cone de Amsterdam, foi criada para um TCC de Administração da UNAERP. O site apoia a divulgação do projeto e do evento.",

    contribution:
      "Desenvolvimento da landing page em HTML, CSS e JavaScript, reunindo apresentação da marca, informações do evento e cardápio em uma experiência visual própria.",

    status: "",
    url: "https://anaberigo.github.io/unaFritas/",
  },

  advocacia: {
    name: "Berigo Advocacia",
    category: "Web · Institucional · Estudo pessoal",

    description:
      "Um projeto de portfólio que explora a apresentação digital de um escritório de advocacia.",

    technologies: ["Angular", "TypeScript", "HTML", "SCSS"],

    image: "src/assets/images/img-projeto-BerigoAdvocacia.png",

    alt: "Layout do projeto Berigo Advocacia",

    context:
      "Um estudo de site institucional, desenvolvido para praticar Angular e uma comunicação visual adequada ao contexto de um escritório de advocacia.",

    contribution:
      "Prática de componentização, responsividade e estilização com SCSS. A proposta simula um site de escritório e faz parte do meu portfólio pessoal.",

    status:
      "Em desenvolvimento. A imagem apresenta o estágio atual do projeto.",

    url: null,
  },

  cookinghome: {
    name: "CookingHome",
    category: "Mobile · Aplicativo · TCC",

    description:
      "Um aplicativo de receitas que aproxima os ingredientes disponíveis das possibilidades na cozinha.",

    technologies: ["React Native", "Firebase"],

    image: "src/assets/images/img-projeto-cookingHome.png",

    alt: "Telas de perfil, busca e receitas do aplicativo CookingHome",

    context:
      "Desenvolvido como meu Trabalho de Conclusão de Curso em Ciência da Computação na UNIFOR-MG.",

    contribution:
      "Aplicativo em React Native com Firebase, que permite visualizar, criar e filtrar receitas a partir de ingredientes.",

    status:
      "Em manutenção. As telas estão disponíveis para conhecer a proposta; a demonstração pública está indisponível.",

    url: null,
  },
};

// Modal dos projetos.
const dialog = document.getElementById("project-dialog");
let projectTrigger = null;

function openProject(key, trigger) {
  const project = projects[key];

  if (!project) {
    return;
  }

  projectTrigger = trigger;

  const fields = {
    "dialog-title": project.name,
    "dialog-category": project.category,
    "dialog-description": project.description,
    "dialog-context": project.context,
    "dialog-contribution": project.contribution,
    "dialog-status": project.status,
  };

  Object.entries(fields).forEach(([id, value]) => {
    document.getElementById(id).textContent = value;
  });

  const image = document.getElementById("dialog-image");
  image.src = project.image;
  image.alt = project.alt;

  const tags = project.technologies.map((technology) => {
    const item = document.createElement("li");
    item.textContent = technology;
    return item;
  });

  document.getElementById("dialog-tags").replaceChildren(...tags);

  const link = document.getElementById("dialog-link");
  link.hidden = !project.url;

  if (project.url) {
    link.href = project.url;
  } else {
    link.removeAttribute("href");
  }

  document.getElementById("dialog-status").hidden = !project.status;

  dialog.showModal();
  document.body.classList.add("dialog-is-open");

  dialog.scrollTop = 0;
  dialog.querySelector(".dialog-preview").scrollTop = 0;

  document.getElementById("dialog-title").focus({
    preventScroll: true,
  });
}

if (typeof dialog.showModal === "function") {
  document.querySelectorAll(".project-open").forEach((button) => {
    button.hidden = false;

    button.addEventListener("click", () => {
      openProject(button.dataset.project, button);
    });
  });
}

dialog.querySelector(".dialog-close").addEventListener("click", () => {
  dialog.close();
});

// Fecha quando o clique ocorre fora da área do modal.
dialog.addEventListener("click", (event) => {
  if (event.target !== dialog) {
    return;
  }

  const rect = dialog.getBoundingClientRect();

  const clickedOutside =
    event.clientX < rect.left ||
    event.clientX > rect.right ||
    event.clientY < rect.top ||
    event.clientY > rect.bottom;

  if (clickedOutside) {
    dialog.close();
  }
});

// Também é executado ao fechar com Escape.
dialog.addEventListener("close", () => {
  document.body.classList.remove("dialog-is-open");

  projectTrigger?.focus({
    preventScroll: true,
  });
});
