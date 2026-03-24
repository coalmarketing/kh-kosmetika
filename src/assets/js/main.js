// MENU HANDLE
const sidebar = document.getElementById("sidebar");
const overlay = document.getElementById("overlay");
const aside = document.querySelector("aside");
const toggles = document.querySelectorAll("[data-menu-toggle]");
function closeMenu() {
    sidebar.classList.add("translate-x-full");
    overlay.classList.add("opacity-0", "pointer-events-none");
    document.body.classList.remove("overflow-hidden");
}
function openMenu() {
    sidebar.classList.remove("translate-x-full");
    overlay.classList.remove("opacity-0", "pointer-events-none");
    document.body.classList.add("overflow-hidden");
}
function toggleMenu() {
    const isOpen = !sidebar.classList.contains("translate-x-full");
    isOpen ? closeMenu() : openMenu();
}
/* Toggle tlačítka */
toggles.forEach((btn) => {
    btn.addEventListener("click", toggleMenu);
});
/* Overlay */
overlay.addEventListener("click", closeMenu);
/* Odkazy v aside (kromě target="_blank") */
aside.addEventListener("click", (e) => {
    const link = e.target.closest("a");
    if (!link) return;
    // ignoruj odkazy target=_blank
    if (link.target === "_blank") return;
    closeMenu();
});
// END MENU HANDLE
// IMG REVEAL
const elements = document.querySelectorAll("main img");
const images = Array.from(elements).filter((img) => !img.closest(".btn"));

const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("revealed");
            }
        });
    },
    { threshold: 0.25 },
);

images.forEach((el) => observer.observe(el));
// END IMG REVEAL

// EMBLA CAROUSEL
import EmblaCarousel from "embla-carousel";

document.addEventListener("DOMContentLoaded", () => {
    const emblaNodes = document.querySelectorAll(".embla");

    emblaNodes.forEach((emblaNode) => {
        const parent = emblaNode.parentElement;
        const options = { loop: true, align: "center", containScroll: "trimSnaps" };
        const embla = EmblaCarousel(emblaNode, options);

        // --- LOGIKA PRO TEČKY (DOTS) ---
        const dotsNode = parent.querySelector(".embla__dots");
        let dotNodes = [];

        // Funkce pro vytvoření teček
        const setupDots = () => {
            if (!dotsNode) return;
            dotsNode.innerHTML = ""; // Vyčistit stávající
            const scrollSnaps = embla.scrollSnapList();

            dotNodes = scrollSnaps.map((_, index) => {
                const button = document.createElement("button");
                button.type = "button";
                button.classList.add("embla__dot");
                button.addEventListener("click", () => embla.scrollTo(index));
                dotsNode.appendChild(button);
                return button;
            });
        };

        // Funkce pro zvýraznění aktivní tečky
        const updateDots = () => {
            const selected = embla.selectedScrollSnap();
            dotNodes.forEach((dot, index) => {
                dot.classList.toggle("is-active", index === selected);
            });
        };

        // --- PŮVODNÍ UPDATE SLIDŮ ---
        const slides = emblaNode.querySelectorAll(".embla__slide");
        const updateSlides = () => {
            const selected = embla.selectedScrollSnap();
            slides.forEach((slide, index) => {
                slide.classList.toggle("is-active", index === selected);
            });
            updateDots(); // Zavoláme i update teček
        };

        // Eventy
        embla.on("init", () => { setupDots(); updateSlides(); });
        embla.on("select", updateSlides);
        embla.on("reInit", () => { setupDots(); updateSlides(); });

        // Šipky
        parent.querySelector(".embla-prev")?.addEventListener("click", () => embla.scrollPrev());
        parent.querySelector(".embla-next")?.addEventListener("click", () => embla.scrollNext());

        // Fix pro Alpine taby
        window.addEventListener('tab-changed', () => {
            setTimeout(() => embla.reInit(), 50);
        });

        // Prvotní inicializace (pokud init event už proběhl)
        setupDots();
        updateSlides();
    });
});
// END EMBLA CAROUSEL