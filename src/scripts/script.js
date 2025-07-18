$(document).ready(function () {
  // MENU MOBILE
  $("#mobile_btn").on("click", function () {
    $("#mobile_menu").toggleClass("active");
    $("#mobile_btn").find("i").toggleClass("fa-x");
  });

  // DESTACAR ITEM DO MENU ATUAL
  const sections = $("section");
  const navItems = $(".nav-item");

  $(window).on("scroll", function () {
    const header = $("header");
    const scrollPosition = $(window).scrollTop() - header.outerHeight();

    let activeSectionIndex = 0;

    if (scrollPosition <= -64) {
      header.css("box-shadow", "none");
    } else {
      header.css("box-shadow", "5px 1px 5px rgba(0, 0, 0, 0.1)");
    }

    sections.each(function (index) {
      const section = $(this);
      const sectionTop = section.offset().top - 150;
      const sectionBottom = sectionTop + section.outerHeight();

      if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
        activeSectionIndex = index;
        return false; // Sair do loop
      }
    });
    navItems.removeClass("active");
    $(navItems[activeSectionIndex]).addClass("active");
  });

  // CORRIGIR ANCORAGEM (scroll suave com offset do header fixo)
  const headerHeight = $("header").outerHeight();

  $(".nav-item a[href^='#']").on("click", function (e) {
    e.preventDefault();

    const alvo = $($(this).attr("href"));
    if (alvo.length) {
      const headerHeight = $("header").outerHeight(); // pega na hora (para mobile também)
      const offset =
        $(window).width() <= 870 ? headerHeight + 10 : headerHeight - 1;

      $("html, body").animate(
        {
          scrollTop: alvo.offset().top - offset,
        },
        600
      );
    }

    // Fecha o menu mobile
    $("#mobile_menu").removeClass("active");
    $("#mobile_btn").find("i").removeClass("fa-x");
  });
});

VanillaTilt.init(document.querySelector(".card"), {
  max: 50,
  speed: 500,
});
