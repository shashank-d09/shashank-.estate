/* =========================================================
   SHASHANK ESTATE
   Complete Website JavaScript
   Works with:
   index.html
   about.html
   properties.html
   contact.html
   ========================================================= */


/* =========================================================
   1. WAIT FOR PAGE TO LOAD
   ========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* Run all website functions */
    mobileNavigation();
    propertyFilters();
    propertySearch();
    contactForm();
    smoothScrolling();
    scrollEffects();
    buttonInteractions();

});


/* =========================================================
   2. MOBILE NAVIGATION
   ========================================================= */

function mobileNavigation() {

    const menuToggle = document.getElementById("menuToggle");
    const navMenu = document.getElementById("navMenu");

    /* Stop if the elements don't exist on the page */
    if (!menuToggle || !navMenu) {
        return;
    }

    /* Open / close mobile menu */
    menuToggle.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        /* Change menu icon */
        if (navMenu.classList.contains("active")) {
            menuToggle.innerHTML = "✕";
            menuToggle.setAttribute("aria-label", "Close Menu");
        } else {
            menuToggle.innerHTML = "☰";
            menuToggle.setAttribute("aria-label", "Open Menu");
        }

    });


    /* Close menu when a navigation link is clicked */

    const navLinks = navMenu.querySelectorAll("a");

    navLinks.forEach(function (link) {

        link.addEventListener("click", function () {

            navMenu.classList.remove("active");

            menuToggle.innerHTML = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open Menu"
            );

        });

    });


    /* Close menu when clicking outside */

    document.addEventListener("click", function (event) {

        const clickedInsideMenu =
            navMenu.contains(event.target);

        const clickedMenuButton =
            menuToggle.contains(event.target);

        if (
            !clickedInsideMenu &&
            !clickedMenuButton &&
            navMenu.classList.contains("active")
        ) {

            navMenu.classList.remove("active");

            menuToggle.innerHTML = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open Menu"
            );

        }

    });

}


/* =========================================================
   3. PROPERTY CATEGORY FILTER
   ========================================================= */

function propertyFilters() {

    const filterButtons =
        document.querySelectorAll(".filter-btn");

    const propertyCards =
        document.querySelectorAll(".property-card");

    const noProperties =
        document.getElementById("noProperties");


    /* If property page elements don't exist */
    if (
        filterButtons.length === 0 ||
        propertyCards.length === 0
    ) {
        return;
    }


    filterButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            /* Remove active class */
            filterButtons.forEach(function (btn) {
                btn.classList.remove("active");
            });

            /* Add active class */
            button.classList.add("active");


            const selectedFilter =
                button.getAttribute("data-filter");

            let visibleCount = 0;


            propertyCards.forEach(function (card) {

                const category =
                    card.getAttribute("data-category");


                if (
                    selectedFilter === "all" ||
                    category === selectedFilter
                ) {

                    card.style.display = "";

                    visibleCount++;

                } else {

                    card.style.display = "none";

                }

            });


            /* Show no results message */

            if (noProperties) {

                if (visibleCount === 0) {

                    noProperties.style.display = "block";

                } else {

                    noProperties.style.display = "none";

                }

            }

        });

    });

}


/* =========================================================
   4. PROPERTY SEARCH
   ========================================================= */

function propertySearch() {

    const searchForm =
        document.getElementById("propertySearchForm");

    const propertyCards =
        document.querySelectorAll(".property-card");

    const noProperties =
        document.getElementById("noProperties");


    if (!searchForm || propertyCards.length === 0) {
        return;
    }


    searchForm.addEventListener("submit", function (event) {

        /* Prevent page reload */
        event.preventDefault();


        const type =
            document.getElementById("propertyType")?.value || "all";

        const location =
            document.getElementById("propertyLocation")?.value
            .trim()
            .toLowerCase() || "";

        const budget =
            document.getElementById("propertyBudget")?.value || "all";


        let visibleCount = 0;


        propertyCards.forEach(function (card) {

            const cardType =
                card.getAttribute("data-type")?.toLowerCase() || "";

            const cardLocation =
                card.getAttribute("data-location")?.toLowerCase() || "";

            const cardPrice =
                parseFloat(card.getAttribute("data-price")) || 0;


            /* Type condition */

            const typeMatch =
                type === "all" ||
                cardType === type;


            /* Location condition */

            const locationMatch =
                location === "" ||
                cardLocation.includes(location);


            /* Budget condition */

            let budgetMatch = true;


            if (budget === "under25") {

                budgetMatch = cardPrice < 25;

            }

            else if (budget === "25to50") {

                budgetMatch =
                    cardPrice >= 25 &&
                    cardPrice <= 50;

            }

            else if (budget === "50to100") {

                budgetMatch =
                    cardPrice > 50 &&
                    cardPrice <= 100;

            }

            else if (budget === "above100") {

                budgetMatch = cardPrice > 100;

            }


            /* Final result */

            if (
                typeMatch &&
                locationMatch &&
                budgetMatch
            ) {

                card.style.display = "";

                visibleCount++;

            } else {

                card.style.display = "none";

            }

        });


        /* Display result message */

        if (noProperties) {

            if (visibleCount === 0) {

                noProperties.style.display = "block";

            } else {

                noProperties.style.display = "none";

            }

        }


        /* Scroll to properties */

        const propertySection =
            document.querySelector(".properties-section");

        if (propertySection) {

            propertySection.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });

        }

    });

}


/* =========================================================
   5. SMOOTH SCROLLING
   ========================================================= */

function smoothScrolling() {

    const links =
        document.querySelectorAll('a[href^="#"]');


    links.forEach(function (link) {

        link.addEventListener("click", function (event) {

            const targetId =
                link.getAttribute("href");


            /* Ignore empty # links */

            if (
                !targetId ||
                targetId === "#"
            ) {
                return;
            }


            const target =
                document.querySelector(targetId);


            if (target) {

                event.preventDefault();


                target.scrollIntoView({
                    behavior: "smooth",
                    block: "start"
                });

            }

        });

    });

}


/* =========================================================
   6. CONTACT FORM VALIDATION
   ========================================================= */

function contactForm() {

    const form =
        document.getElementById("contactForm");

    if (!form) {
        return;
    }


    const formMessage =
        document.getElementById("formMessage");


    form.addEventListener("submit", function (event) {

        event.preventDefault();


        const name =
            document.getElementById("name")?.value.trim() || "";

        const phone =
            document.getElementById("phone")?.value.trim() || "";

        const email =
            document.getElementById("email")?.value.trim() || "";

        const message =
            document.getElementById("message")?.value.trim() || "";


        /* Basic email pattern */

        const emailPattern =
            /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


        /* Phone pattern */

        const phonePattern =
            /^[0-9+\-\s()]{10,}$/;


        /* Clear previous message */

        if (formMessage) {
            formMessage.textContent = "";
        }


        /* Name validation */

        if (name.length < 2) {

            showFormMessage(
                "Please enter your full name.",
                "error"
            );

            return;

        }


        /* Phone validation */

        if (!phonePattern.test(phone)) {

            showFormMessage(
                "Please enter a valid phone number.",
                "error"
            );

            return;

        }


        /* Email validation */

        if (!emailPattern.test(email)) {

            showFormMessage(
                "Please enter a valid email address.",
                "error"
            );

            return;

        }


        /* Message validation */

        if (message.length < 10) {

            showFormMessage(
                "Please enter a message of at least 10 characters.",
                "error"
            );

            return;

        }


        /* Successful validation */

        showFormMessage(
            "Thank you! Your enquiry has been received.",
            "success"
        );


        /* Reset form */

        form.reset();

    });


    function showFormMessage(text, type) {

        if (!formMessage) {
            return;
        }


        formMessage.textContent = text;


        if (type === "success") {

            formMessage.style.color = "#168b43";

        } else {

            formMessage.style.color = "#c0392b";

        }

    }

}


/* =========================================================
   7. BUTTON INTERACTIONS
   ========================================================= */

function buttonInteractions() {

    const buttons =
        document.querySelectorAll(".btn");


    buttons.forEach(function (button) {

        button.addEventListener("click", function () {

            /* Small visual feedback */

            button.style.transform = "scale(0.98)";


            setTimeout(function () {

                button.style.transform = "";

            }, 120);

        });

    });

}


/* =========================================================
   8. SCROLL EFFECTS
   ========================================================= */

function scrollEffects() {

    const header =
        document.querySelector(".header");


    if (!header) {
        return;
    }


    window.addEventListener("scroll", function () {

        if (window.scrollY > 80) {

            header.style.background =
                "rgba(10, 10, 10, 0.98)";

            header.style.boxShadow =
                "0 5px 25px rgba(0, 0, 0, 0.15)";

        } else {

            header.style.background =
                "rgba(10, 10, 10, 0.92)";

            header.style.boxShadow =
                "none";

        }

    });

}


/* =========================================================
   9. SIMPLE SCROLL ANIMATION
   ========================================================= */

const animationObserver =
    new IntersectionObserver(
        function (entries) {

            entries.forEach(function (entry) {

                if (entry.isIntersecting) {

                    entry.target.style.opacity = "1";

                    entry.target.style.transform =
                        "translateY(0)";

                    animationObserver.unobserve(
                        entry.target
                    );

                }

            });

        },
        {
            threshold: 0.15
        }
    );


/* Elements to animate */

document
    .querySelectorAll(
        ".property-card, .feature-card, .contact-card, .mission-card"
    )
    .forEach(function (element) {

        element.style.opacity = "0";

        element.style.transform =
            "translateY(25px)";

        element.style.transition =
            "opacity 0.6s ease, transform 0.6s ease";


        animationObserver.observe(element);

    });


/* =========================================================
   10. CLOSE MOBILE MENU ON RESIZE
   ========================================================= */

window.addEventListener("resize", function () {

    const navMenu =
        document.getElementById("navMenu");

    const menuToggle =
        document.getElementById("menuToggle");


    if (
        window.innerWidth > 768 &&
        navMenu
    ) {

        navMenu.classList.remove("active");

        if (menuToggle) {

            menuToggle.innerHTML = "☰";

            menuToggle.setAttribute(
                "aria-label",
                "Open Menu"
            );

        }

    }

});


/* =========================================================
   11. IMAGE ERROR HANDLING
   ========================================================= */

document
    .querySelectorAll("img")
    .forEach(function (image) {

        image.addEventListener("error", function () {

            /*
             * If an image is missing from the images folder,
             * prevent the broken-image appearance.
             */

            image.style.background = "#eeeeee";

            image.style.minHeight = "200px";

            image.alt = "Property image";

        });

    });


/* =========================================================
   END OF SHASHANK ESTATE SCRIPT
   ========================================================= */