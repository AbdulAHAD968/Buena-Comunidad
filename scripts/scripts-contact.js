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

// <!-- FALLING STAR ANIMATION -->

    document.addEventListener("DOMContentLoaded", () => {
        
        // ERROR HANDLING, IF IN CASE CONTAINER IS MISSING
        const container = document.querySelector(".container");
        if(!container){
            console.error("Container not found!");
            return;
        }

        function MAKE_STARS(){
            const star = document.createElement("div");
            star.classList.add("falling-star");

            const size = Math.random() * 3 + 3;
            const startPosX = Math.random() * window.innerWidth;
            const duration = Math.random() * 3 + 6;

            star.style.width = `${size}px`;
            star.style.height = `${size}px`;
            star.style.left = `${startPosX}px`;
            star.style.animationDuration = `${duration}s`;

            container.appendChild(star);
            // console.log("Star created at X:", startPosX);

            setTimeout(() => {
                star.remove();
            }, duration * 2500);
        }

        function GEN_STARS() {
            setInterval(MAKE_STARS, 200);
        }

        GEN_STARS();
    });

// <!-- STOP RIGHT CLICK. -->
    document.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });

//NOTE - DISABLE ALL THE KEYBOARD SHORTCUTS [FOR NON TECHNICAL PEOPLE, TECHNICAL PEOPLE DO HAVE ACCESS USING ADVANCE TOOLS]
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
