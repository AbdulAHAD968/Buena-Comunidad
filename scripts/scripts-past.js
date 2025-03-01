// <!-- THEME TOGGLE -->
    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        document.querySelector(".theme-switch").classList.toggle("active");
    }

// <!-- MENUE LIST //REVIEW -  -->

    const floatingButton = document.getElementById('floatingButton');
    const dropdownList = document.getElementById('dropdownList');

    floatingButton.addEventListener('click', () => {
        if (dropdownList.style.display === 'flex') {
            dropdownList.style.display = 'none';
        } else {
            dropdownList.style.display = 'flex';
        }
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', (event) => {
        if (!floatingButton.contains(event.target) && !dropdownList.contains(event.target)) {
            dropdownList.style.display = 'none';
        }
    });

    // Add actions to dropdown items
    const dropdownItems = document.querySelectorAll('.dropdown-item');
        dropdownItems.forEach(item => {
        item.addEventListener('click', () => {
            const action = item.getAttribute('data-action');
            handleAction(action);
            dropdownList.style.display = 'none';
        });
    });

    // Action handler function
    function handleAction(action) {
        switch (action) {
            case 'Home':{
                window.location.href = 'index.html';
                break;
            }
            case 'ngo-experiences':{
                window.location.href = 'past.html';
                break;
            }
            case 'find-ngos':{
                window.location.href = 'home.html';
                break;
            }
            case 'About-Us':{
                window.location.href = 'about.html';
                break;
            }
            case 'contact-us':{
                window.location.href = 'contact.html';
                break;
            }
            default:{
                console.log('No action defined for:', action);
                break;
            }
        }
    }

//    <!-- STOP RIGHT CLICK. -->
    document.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });


//    <!-- DISABLE ALL THE KEYBOARD SHORTCUTS [FOR NON TECHNICAL PEOPLE, TECHNICAL PEOPLE DO HAVE ACCESS USING ADVANCE TOOLS] -->
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