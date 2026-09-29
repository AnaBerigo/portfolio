// Restaura o tema escolhido antes da primeira renderização.
(() => {
  document.documentElement.classList.add("js");

  try {
    const theme = localStorage.getItem("ana-berigo-theme");

    if (theme === "light" || theme === "dark") {
      document.documentElement.dataset.theme = theme;
    }
  } catch {
    // O site continua funcionando quando o armazenamento está bloqueado.
  }
})();
