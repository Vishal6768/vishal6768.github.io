
// MOBILE NAVIGATION

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");

function closeMenu() {
    navLinks.classList.remove("active");
    menuBtn.setAttribute("aria-expanded", "false");
    menuBtn.textContent = "☰";
}

menuBtn.addEventListener("click", () => {

    const isOpen = navLinks.classList.toggle("active");

    menuBtn.setAttribute("aria-expanded", String(isOpen));

    menuBtn.textContent = isOpen ? "✕" : "☰";

});

navLinks.querySelectorAll("a").forEach(link => {

    link.addEventListener("click", closeMenu);

});

document.addEventListener("click", event => {

    if (
        !navLinks.contains(event.target) &&
        !menuBtn.contains(event.target)
    ) {
        closeMenu();
    }

});

document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeMenu();
    }

});


// EXPAND AND COLLAPSE SKILLS

const expandAll = document.getElementById("expandAll");
const collapseAll = document.getElementById("collapseAll");

const skillCategories = document.querySelectorAll(
    "#skills .skill-category"
);

expandAll.addEventListener("click", () => {

    skillCategories.forEach(category => {
        category.open = true;
    });

});

collapseAll.addEventListener("click", () => {

    skillCategories.forEach(category => {
        category.open = false;
    });

});


// BACK TO TOP BUTTON

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    backToTop.classList.toggle(
        "visible",
        window.scrollY > 500
    );

}, { passive: true });

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});


// COPY EMAIL

const copyEmail = document.getElementById("copyEmail");
const emailAddress = document.getElementById("emailAddress");
const copyStatus = document.getElementById("copyStatus");

let copyTimer;

copyEmail.addEventListener("click", async () => {

    const email = emailAddress.textContent.trim();

    clearTimeout(copyTimer);

    try {

        if (!navigator.clipboard) {
            throw new Error("Clipboard unavailable");
        }

        await navigator.clipboard.writeText(email);

        copyEmail.textContent = "Copied!";
        copyStatus.textContent = "Email address copied successfully.";

    } catch (error) {

        copyStatus.textContent =
            "Please select and copy the email address manually.";

    }

    copyTimer = setTimeout(() => {

        copyEmail.textContent = "Copy Email";
        copyStatus.textContent = "";

    }, 3000);

});


// ACTIVE NAVIGATION ON SCROLL

const sectionLinks = document.querySelectorAll(
    '.nav-links a[href^="#"]'
);

const sections = Array.from(sectionLinks)
    .map(link => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

function updateActiveNavigation() {

    let currentSection = "home";

    const scrollPosition = window.scrollY + 150;

    sections.forEach(section => {

        if (section.offsetTop <= scrollPosition) {
            currentSection = section.id;
        }

    });

    sectionLinks.forEach(link => {

        const isActive =
            link.getAttribute("href") === "#" + currentSection;

        link.classList.toggle("active", isActive);

        if (isActive) {
            link.setAttribute("aria-current", "location");
        } else {
            link.removeAttribute("aria-current");
        }

    });

}

window.addEventListener(
    "scroll",
    updateActiveNavigation,
    { passive: true }
);

window.addEventListener(
    "resize",
    updateActiveNavigation
);

updateActiveNavigation();


// AUTOMATIC COPYRIGHT YEAR

document.getElementById("year").textContent =
    new Date().getFullYear();
