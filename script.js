document
  .querySelectorAll(".sharp button[selectable], .sharp [selectable] button")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.hasAttribute("selected")) {
        e.target.removeAttribute("selected");
      } else {
        e.target.setAttribute("selected", "");
      }
    });
  });

document
  .querySelectorAll(".sharp button-group[connected]:not([seperate]) button")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      if (e.target.hasAttribute("selected")) {
      } else {
        document
          .querySelectorAll(".sharp button-group[connected] button[selected]")
          .forEach((el) => el.removeAttribute("selected"));
        e.target.setAttribute("selected", "");
      }
    });
  });
