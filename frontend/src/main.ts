import './style.css';

const focusableElements = '[tabindex]:not([disabled]):not([tabindex="-1"])';

function getFocusableElements() {
  return [...document.querySelectorAll<HTMLElement>(focusableElements)];
}

const focusable = getFocusableElements();
let lastFocusedElement: HTMLElement = focusable[0];

function moveFocus(offset: number) {
  const currentIndex = focusable.indexOf(lastFocusedElement);
  const nextIndex = (currentIndex + offset + focusable.length) % focusable.length;
  focusable[nextIndex].focus();
}

function onKeydown(event: KeyboardEvent) {
  console.log(event.key);

  if (event.key === 'Escape') {
    // @ts-ignore
    if (document.getElementById("escape-button")?.disabled) return;
    history.back()
  }

  if (!(event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'j' || event.key === 'k')) return;
  const offset = event.key === 'ArrowUp' || event.key === 'j' ? -1 : 1;
  moveFocus(offset);


  event.preventDefault();
}

document.addEventListener("keydown", onKeydown);

document.getElementById("escape-button")?.addEventListener("click", () => history.back());
document.getElementById("enter-button")?.addEventListener("click", () => lastFocusedElement.click());

document.getElementById("up-button")?.addEventListener("click", () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowUp" })));
document.getElementById("down-button")?.addEventListener("click", () => document.dispatchEvent(new KeyboardEvent("keydown", { key: "ArrowDown" })));

[...document.getElementsByClassName("focus-watch")].map((e) => {
  e.addEventListener("focus", (e) => {
    lastFocusedElement = e.target as HTMLElement;

    // if link, preload
    if (e.target instanceof HTMLAnchorElement) {
      setTimeout(() => {
        if (lastFocusedElement === e.target) {
          // @ts-ignore
          const targetURL = e.target.getAttribute("href") ?? "";
          const link = document.createElement('link');
          link.rel = 'prefetch';
          link.as = 'document';
          link.href = targetURL;
          document.head.append(link);
        }
      }, 250);
    }
  });

  e.addEventListener("click", (e) => {
    // @ts-ignore
    if (e.target.tagName === "SUMMARY") {
      setTimeout(() => {
        // @ts-ignore
        e.target.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  })

  e.addEventListener("blur", (e) => {
    setTimeout(() => {
      if (!focusable.includes(document.activeElement as HTMLElement))
        // @ts-ignore
        e.target?.focus()
    }, 100);
  });
})

lastFocusedElement.dispatchEvent(new FocusEvent("focus"));