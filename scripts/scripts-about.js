//<!-- SMOOTH SCROLLING -->
    const d = document;

    d.addEventListener("DOMContentLoaded", e => {
        scrollSpy();
    });

    function scrollSpy() {
        let $imgs = d.querySelectorAll("section[data-scroll-spy]");

        let observador = new IntersectionObserver(cb, { threshold: 0.5 });

        function cb(entries) {
            entries.forEach(entry => {
                const id = entry.target.getAttribute("id");

                if (entry.isIntersecting) {
                    d.querySelector(`a[data-scroll-spy][href='#${id}']`).classList.add("active");
                } else {
                    d.querySelector(`a[data-scroll-spy][href='#${id}']`).classList.remove("active");
                }
            });
        }

        $imgs.forEach(img => observador.observe(img));
    }

//FIXME - TOGGLE SECTION 
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


//NOTE - <!-- STOP RIGHT CLICK. -->
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