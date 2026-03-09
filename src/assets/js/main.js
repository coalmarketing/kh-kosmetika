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
    const emblaNode = document.querySelector(".embla");
    if (!emblaNode) return;

    const options = {
        loop: true,
        align: "center",
        containScroll: "trimSnaps"
    };

    // 1️⃣ vytvoř instanci
    const embla = EmblaCarousel(emblaNode, options);

    const slides = emblaNode.querySelectorAll(".embla__slide");

    // 2️⃣ funkce pro aktivní slide
    const updateSlides = () => {
        const selected = embla.selectedScrollSnap();

        slides.forEach((slide, index) => {
            slide.classList.toggle("is-active", index === selected);
        });
    };

    // 3️⃣ napoj eventy
    embla.on("select", updateSlides);
    embla.on("reInit", updateSlides);

    updateSlides();

    // 4️⃣ šipky
    document.querySelector(".embla-prev")
        ?.addEventListener("click", () => embla.scrollPrev());

    document.querySelector(".embla-next")
        ?.addEventListener("click", () => embla.scrollNext());
});
// END EMBLA CAROUSEL