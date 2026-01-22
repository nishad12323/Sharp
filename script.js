document
  .querySelectorAll(
    ".sharp button[toggle], .sharp [toggle] button, .sharp switch"
  )
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.hasAttribute("selected")) {
        button.removeAttribute("selected");
        document.getElementById(el.getAttribute("for")).style.display = "none";
      } else {
        button.setAttribute("selected", "");
        document.getElementById(button.getAttribute("for")).style.display =
          button.getAttribute("link-display") || "block";
      }
    });
  });

document
  .querySelectorAll(".sharp button-group[connected]:not([seperate]) button")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.hasAttribute("selected")) {
      } else {
        button.parentElement
          .querySelectorAll("button[selected]")
          .forEach((el) => {
            el.removeAttribute("selected");
            if (el.hasAttribute("for")) {
              document.getElementById(el.getAttribute("for")).style.display =
                "none";
            }
          });

        button.setAttribute("selected", "");

        document.getElementById(button.getAttribute("for")).style.display =
          button.getAttribute("link-display") || "block";
      }
    });
  });

document
  .querySelectorAll(".sharp segmented-button:not([multi-select]) sb-option")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.hasAttribute("selected")) {
      } else {
        button.parentElement
          .querySelectorAll("sb-option[selected]")
          .forEach((el) => {
            el.removeAttribute("selected");
            if (el.hasAttribute("for")) {
              document.getElementById(el.getAttribute("for")).style.display =
                "none";
            }
          });
        button.setAttribute("selected", "");
        document.getElementById(button.getAttribute("for")).style.display =
          button.getAttribute("link-display") || "block";
      }
    });
  });

document
  .querySelectorAll(".sharp segmented-button[multi-select] sb-option")
  .forEach((button) => {
    button.addEventListener("click", (e) => {
      if (button.hasAttribute("selected")) {
        button.removeAttribute("selected");
        document.getElementById(el.getAttribute("for")).style.display = "none";
      } else {
        button.setAttribute("selected", "");
        document.getElementById(button.getAttribute("for")).style.display =
          button.getAttribute("link-display") || "block";
      }
    });
  });

document
  .querySelectorAll(
    "button[for][link-start-display=none], sb-option[for][link-start-display=none]"
  )
  .forEach((button) => {
    document.getElementById(button.getAttribute("for")).style.display = "none";
  });

sharp = {
  Toast: function (text, button = null, secondary = false) {
    this.text = text;
    this.button = button;
    this.onButtonClick = (event) => {};
    this.toast = document.querySelector("toast");
    this.toast.innerHTML = "";
    this.toast.style.opacity = 100;
    this.toast.style.translate = "0 0";
    this.show = (duration) => {
      let p = document.createElement("p");
      p.textContent = text;
      this.toast.appendChild(p);
      if (button != null) {
        let b = document.createElement("button");
        b.textContent = button;
        b.addEventListener("click", (e) => {
          this.toast.style.opacity = 0;
          this.toast.style.translate = "0 10px";
          // setTimeout(() => {
          this.toast.style.visibility = "visible";
          // }, 100);
          this.onButtonClick(e);
        });
        this.toast.appendChild(b);
      }

      // this.toast.style.setProperty("--duration", duration);
      if (secondary) {
        this.toast.setAttribute("secondary", "");
      } else {
        this.toast.removeAttribute("secondary");
      }
      this.toast.style.visibility = "visible";
      this.toast.style.opacity = 1;
      this.toast.style.translate = "0 0";

      if (button == null) {
        setTimeout(() => {
          this.toast.style.opacity = 0;
          this.toast.style.translate = "0 10px";
          // setTimeout(() => {
          this.toast.style.display = "none";
          // }, 100);
        }, duration * 1000);
      }

      return this;
    };
  },
};

sharp.Toast.toast = document.createElement("toast");
document.body.appendChild(sharp.Toast.toast);

setTimeout(() => {
  x = new sharp.Toast("Simple toast.", "Close", 1);
  x.onButtonClick = (e) => {
    new sharp.Toast("You clicked the button!", null, 0).show(2);
  };
  x.show(2);
}, 1000);

document
  .querySelectorAll(".sharp progressbar:has(slider)")
  .forEach((progressbar) => {
    const slider = progressbar.querySelector("slider");
    if (!slider) return;

    // Set initial progress
    let progress = 40; // default percent
    progressbar.style.setProperty("--progress", progress + "%");

    let dragging = false;

    progressbar.addEventListener("pointerdown", (e) => {
      dragging = true;
      document.body.style.userSelect = "none";
      const barRect = progressbar.getBoundingClientRect();
      let x = e.clientX - barRect.left;
      x = Math.max(0, Math.min(x, barRect.width));
      progress = (x / barRect.width) * 100;
      progress = Math.max(0, Math.min(progress, 100));
      progressbar.style.setProperty("--progress", progress + "%");
    });

    document.addEventListener("pointermove", (e) => {
      if (!dragging) return;
      const barRect = progressbar.getBoundingClientRect();
      let x = e.clientX - barRect.left;
      x = Math.max(0, Math.min(x, barRect.width));
      progress = (x / barRect.width) * 100;
      progress = Math.max(0, Math.min(progress, 100));
      progressbar.style.setProperty("--progress", progress + "%");
    });

    document.addEventListener("pointerup", (e) => {
      if (dragging) {
        dragging = false;
        document.body.style.userSelect = "";
        // Optionally, emit a custom event here
      }
    });
  });

document.querySelectorAll("nav-item:has(+ nav-drawer)").forEach((navItem) => {
  navItem.addEventListener("mouseover", (e) => {
    if (
      navItem.nextElementSibling &&
      navItem.nextElementSibling.tagName.toLowerCase() == "nav-drawer" &&
      navItem.tagName.toLowerCase() == "nav-item"
    ) {
      document.querySelectorAll("nav-item + nav-drawer").forEach((drawer) => {
        drawer.style.display = "none";
      });
      navItem.nextElementSibling.style.animationName = "enter-from-nav";
      navItem.nextElementSibling.style.animationDuration = "0.1s";
      navItem.nextElementSibling.style.display = "flex";
    }
  });
});

// document
//   .querySelectorAll(".sharp nav-rail nav-item:not(nav-item:has(+ nav-drawer))")
//   .forEach((navItem) => {
//     navItem.addEventListener("mouseover", (e) => {
//       if (navItem.tagName.toLowerCase() == "nav-item") {
//         document.querySelectorAll("nav-item + nav-drawer").forEach((drawer) => {
//           drawer.style.animationName = "exit-to-nav";
//           drawer.style.animationDuration = "0.1s";
//           drawer.style.display = "none";
//         });
//       }
//     });
//   });

document.querySelectorAll("main, pane").forEach((parent) => {
  parent.addEventListener("mouseover", (e) => {
    document.querySelectorAll("nav-item + nav-drawer").forEach((drawer) => {
      drawer.style.animationName = "exit-to-nav";
      drawer.style.animationDuration = "0.1s";
      drawer.style.display = "none";
    });
  });
});
