let navList = [...document.querySelectorAll(".nav-item")];
if (!/html/.test(window.location.pathname)) {
  $(".nav-item").first().addClass("active");
} else {
  navList.map((el) => {
    let reg = new RegExp(window.location.pathname);
    if (reg.test(el.children[0].href)) {
      $(el).addClass("active");
    }
  });
}
