const focusableElements = '[tabindex]:not([disabled]):not([tabindex="-1"])';

function getFocusableElements() {
    return [...document.querySelectorAll<HTMLElement>(focusableElements)];
}

const focusable = getFocusableElements();
// @ts-ignore
let lastFocusedElement: HTMLElement = focusable.includes(document.activeElement) ? document.activeElement : focusable[0];

console.log(lastFocusedElement)

function moveFocus(offset: number) {
    const currentIndex = focusable.indexOf(lastFocusedElement);
    const nextIndex = (currentIndex + offset + focusable.length) % focusable.length;
    focusable[nextIndex].focus();
}

function onKeydown(event: KeyboardEvent) {
    console.log(event.key);

    if (event.key === 'Escape') {
        // @ts-ignore
        if (document.getElementById("escape-button")?.disabled)
            return;

        event.preventDefault()
        event.stopPropagation()
        history.back()
    }

    // treat space as enter
    if (event.key === ' ') {
        event.preventDefault();
        lastFocusedElement.click();
    }

    if (!(event.key === 'ArrowUp' || event.key === 'ArrowDown' || event.key === 'j' || event.key === 'k'))
        return;

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
            // only preload if the user has focused on the link for 250ms
            setTimeout(() => {
                if (lastFocusedElement === e.target) {
                    // @ts-ignore
                    const targetURL = e.target.getAttribute("href") ?? "";
                    const link = document.createElement('link');
                    if (link.relList && link.relList.supports && link.relList.supports('prefetch')) {
                        [link.rel, link.as, link.href] = ['prefetch', 'document', targetURL];
                        document.head.append(link);
                    } else {
                        // @ts-ignore
                        fetch(e.target.getAttribute("href") ?? "", { credentials: "include" });
                    }
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

    e.addEventListener("blur", (e) => setTimeout(() => {
        if (!focusable.includes(document.activeElement as HTMLElement)) {
            // @ts-ignore
            e.target?.focus()
        }
    }, 100)
    );
});

lastFocusedElement.focus();
lastFocusedElement.scrollIntoView({ behavior: "smooth" });