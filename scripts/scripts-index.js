// <!-- SWIPER ANIMATION USED JS LIBARARY HERE. NOTHING SPECIAL -->

    var swiper = new Swiper(".mySwiper", {
        grabCursor: true,
        centeredSlides: true,
        slidesPerView: 2,
        spaceBetween: 20,
        loop: true,
        autoplay: {
            delay: 3500,
            disableOnInteraction: false,
        },
        coverflowEffect: {
            rotate: 50,
            stretch: 0,
            depth: 200,
            modifier: 1,
            slideShadows: false,
        },
        pagination: {
            el: ".swiper-pagination",
            clickable: true,
        },
        navigation: {
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
        },
        // Breakpoints for responsive design
        breakpoints: {
            // When window width is >= 320px
            320: {
                slidesPerView: 1,
                spaceBetween: 10,
            },
            // When window width is >= 768px
            768: {
                slidesPerView: 2,
                spaceBetween: 20,
            },
        },
    });

    document.querySelectorAll(".mySwiper .swiper-slide").forEach((slide) => {
        let glow = document.createElement("div");
        glow.classList.add("glow");
        slide.appendChild(glow);

        slide.addEventListener("mousemove", (event) => {
            let rect = slide.getBoundingClientRect();
            let x = event.clientX - rect.left;
            let y = event.clientY - rect.top;
            let centerX = rect.width / 2;
            let centerY = rect.height / 2;

            let rotateX = (centerY - y) / 15;
            let rotateY = (x - centerX) / 15;

            slide.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
            
            // Move glow with cursor
            glow.style.left = `${x}px`;
            glow.style.top = `${y}px`;
            glow.style.opacity = "1";
            glow.style.transform = "translate(-50%, -50%) scale(2)";
        });

        slide.addEventListener("mouseleave", () => {
            slide.style.transition = "transform 0.3s ease-out";
            slide.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)";

            // Hide glow smoothly
            glow.style.opacity = "0";
            glow.style.transform = "translate(-50%, -50%) scale(0)";
        });
    });


// <!-- TOGGLE SECTION -->

    const sidebarToggle = document.getElementById('sidebar-toggle');
    const sidebar = document.getElementById('sidebar');

    // HANDLE INSIDE CLICK (P(E))
    sidebarToggle.addEventListener('click', (event) => {
        event.stopPropagation(); // Prevents immediate closing when clicking the toggle button
        sidebar.classList.toggle('active');
    });

    // HANDLE OUTSIDE CLICK ( 1 - P(E))
    document.addEventListener('click', (event) => {
        if (!sidebar.contains(event.target) && !sidebarToggle.contains(event.target)) {
            sidebar.classList.remove('active');
        }
    });

// <!-- STOP RIGHT CLICK. -->
document.addEventListener("contextmenu", function(event) {
    event.preventDefault();
});


// <!-- DISABLE ALL THE KEYBOARD SHORTCUTS [FOR NON TECHNICAL PEOPLE, TECHNICAL PEOPLE DO HAVE ACCESS USING ADVANCE TOOLS] -->

    document.addEventListener("keydown", function(event) {
        if (event.ctrlKey && (event.key === "u" || event.key === "s" || event.key === "i" || event.key === "j")) {
            event.preventDefault();
        }
        if (event.key === "F12") {
            event.preventDefault();
        }
    });

    document.addEventListener("keydown", function(event) {
        if (
            (event.ctrlKey && event.shiftKey && (event.key === "I" || event.key === "J" || event.key === "C")) || // Ctrl+Shift+I/J/C
            (event.ctrlKey && event.key === "U") || // Ctrl+U
            (event.key === "F12") // F12
        ) {
            event.preventDefault();
        }
    });