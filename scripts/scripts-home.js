// //-- //NOTE -  -->
// //-- CALLING SWIPER JS -->
//    <script src="https://unpkg.com/swiper/swiper-bundle.min.js">
    

//    //-- SWIPER ANIMATION USED JS LIBARARY HERE. NOTHING SPECIAL -->
    
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
    
//-- THEME TOGGLE -->
    
    function toggleTheme() {
        document.body.classList.toggle("dark-mode");
        document.querySelector(".theme-switch").classList.toggle("active");
    }
    
//-- FALLING STAR ANIMATION -->
    
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
    
//-- MENUE LIST //REVIEW -  -->
    
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
                window.location.href = '#located';
                break;
            }
            case 'About-Us':{
                window.location.href = 'about.html';
                break;
            }
            case 'contact':{
                window.location.href = 'contact.html';
                break;
            }
            default:{
                console.log('No action defined for:', action);
                break;
            }
        }
    }
    
//-- SEARCH FUNCTIONALITY. -->
    
    document.addEventListener('DOMContentLoaded', () => {
        const searchButton = document.querySelector('.search-button');
        const query_ip = document.querySelector('#searchQuery');
        const res_container = document.querySelector("#results");
        const distanceFilter = document.querySelector('#distanceFilter');
        const workTypeFilter = document.querySelector('#workTypeFilter');
        let debounceTimer;

        // DEBOUNCE FUNCTION TO LIMIT API CALLS
        const debounce = (func, delay) => {
            return (...args) => {
                clearTimeout(debounceTimer);
                debounceTimer = setTimeout(() => func.apply(this, args), delay);
            };
        };

        // AUTO COMPLETE SUGGESTIONS
        query_ip.addEventListener('input', debounce(async () => {
            const query = query_ip.value.trim();
            if(query.length < 3){
                return;
            }

            try{
                const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
                const data = await response.json();
                const suggestions = data.map(item => item.display_name);
                show_suggestion(suggestions);
            }
            catch(error){
                console.error("Error fetching autocomplete suggestions:", error);
            }
        }, 300));

        const show_suggestion = (suggestions) => {
            const sugg_container = document.querySelector('#suggestions');
            
            // BASICALLY ALTERING THE INNER HTML CONTENT...
            sugg_container.innerHTML = suggestions.map(suggestion => `
                <div class="suggestion-item" onclick="select_sugg('${suggestion}')">${suggestion}</div>
            `).join('');
        };

        window.select_sugg = (suggestion) => {
            query_ip.value = suggestion;
            document.querySelector('#suggestions').innerHTML = '';
        };

        // LIMIT SEARCH TO NGO'S ONLY [NOT WORKING WELL]
        searchButton.addEventListener('click', async () => {
            const query = query_ip.value.trim();
            const distance = distanceFilter.value;  // GET DISTANCE VAL 
            const workType = workTypeFilter.value;  // GET TYPE

            res_container.innerHTML = "<p>🔄 Searching...</p>";

            if(!query){
                alert('Please enter a location.');
                return;
            }

            try{
                // Step 1: Convert Location to Coordinates 
                const geoResponse = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${query}`);
                const geoData = await geoResponse.json();

                if(!geoData.length){
                    res_container.innerHTML = "<p>❌ Location not found. Try another name.</p>";
                    return;
                }

                // OBJECT TO STORE [LATITUDE, LONGITUDE]
                const { lat, lon } = geoData[0];

                // FETCH NEARBY NGO USING OVERPASS API.
                const overpassQuery = `
                    [out:json];
                    (
                        node(around:${distance * 1000},${lat},${lon})["office"="ngo"];
                        node(around:${distance * 1000},${lat},${lon})["social_facility"="ngo"];
                        node(around:${distance * 1000},${lat},${lon})["name"~"Edhi|Al-Khidmat|Chhipa|JDC|Akhuwat",i];
                        node(around:${distance * 1000},${lat},${lon})["amenity"="community_centre"]["community_centre"!="wedding_hall"]["community_centre"!="banquet"];
                    );
                    out;
                `;
                const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

                const ngoResponse = await fetch(overpassUrl);
                const ngoData = await ngoResponse.json();

                // DISPLAY RESULTS
                res_container.innerHTML = "<h2>Nearby NGOs</h2>";

                if(!ngoData.elements.length){
                    res_container.innerHTML += `<p>❌ No NGOs found within ${distance}km${workType ? ` in the ${workType} sector` : ''}.</p>`;
                    return;
                }

                // GENERATE LIST OFF ALL NGO'S
                ngoData.elements.forEach(ngo => {
                    const name = ngo.tags.name || "Unknown NGO";
                    const address = ngo.tags["addr:street"] || "Address not available";
                    const workType = ngo.tags["operator:type"] || "Not specified";
                    res_container.innerHTML += `
                        <div class="ngo-item">
                            <h3>🏢 ${name}</h3>
                            <p><strong>📍 Address:</strong> ${address}</p>
                            <p><strong>🌍 Coordinates:</strong> ${ngo.lat}, ${ngo.lon}</p>
                            <p><strong>💼 Work Type:</strong> ${workType}</p>
                            <a href="https://www.openstreetmap.org/?mlat=${ngo.lat}&mlon=${ngo.lon}#map=15/${ngo.lat}/${ngo.lon}" target="_blank">🗺 View on Map</a>
                        </div>
                    `;
                });
            }
            catch(error){
                console.error("Error fetching data:", error);
                res_container.innerHTML = "<p>❌ An error occurred while searching.</p>";
            }
        });

        // GEOLOCATION INTEGRATION
        document.querySelector('.geolocation-button').addEventListener('click', () => {
            if(!navigator.geolocation){
                alert("Geolocation is not supported by your browser.");
                return;
            }

            navigator.geolocation.getCurrentPosition(async (position) => {
                const lat = position.coords.latitude;
                const lon = position.coords.longitude;
                const distance = distanceFilter.value;
                const workType = workTypeFilter.value;

                res_container.innerHTML = "<p>🔄 Searching...</p>";

                try{
                    const overpassQuery = `
                        [out:json];
                        (
                            node(around:${distance * 1000},${lat},${lon})["office"="ngo"];
                            node(around:${distance * 1000},${lat},${lon})["social_facility"="ngo"];
                            node(around:${distance * 1000},${lat},${lon})["name"~"Edhi|Al-Khidmat|Chhipa|JDC|Akhuwat",i];
                            node(around:${distance * 1000},${lat},${lon})["amenity"="community_centre"]["community_centre"!="wedding_hall"]["community_centre"!="banquet"];
                        );
                        out;
                    `;
                    const overpassUrl = `https://overpass-api.de/api/interpreter?data=${encodeURIComponent(overpassQuery)}`;

                    const ngoResponse = await fetch(overpassUrl);
                    const ngoData = await ngoResponse.json();

                    // Display Results
                    res_container.innerHTML = "<h2>Nearby NGOs</h2>";

                    if(!ngoData.elements.length){
                        res_container.innerHTML += `<p>❌ No NGOs found within ${distance}km${workType ? ` in the ${workType} sector` : ''}.</p>`;
                        return;
                    }

                    // Generate List of NGOs
                    ngoData.elements.forEach(ngo => {
                        const name = ngo.tags.name || "Unknown NGO";
                        const address = ngo.tags["addr:street"] || "Address not available";
                        const workType = ngo.tags["operator:type"] || "Not specified";
                        res_container.innerHTML += `
                            <div class="ngo-item">
                                <h3>🏢 ${name}</h3>
                                <p><strong>📍 Address:</strong> ${address}</p>
                                <p><strong>🌍 Coordinates:</strong> ${ngo.lat}, ${ngo.lon}</p>
                                <p><strong>💼 Work Type:</strong> ${workType}</p>
                                <a href="https://www.openstreetmap.org/?mlat=${ngo.lat}&mlon=${ngo.lon}#map=15/${ngo.lat}/${ngo.lon}" target="_blank">🗺 View on Map</a>
                            </div>
                        `;
                    });
                }
                catch(error){
                    console.error("Error fetching data:", error);
                    res_container.innerHTML = "<p>❌ An error occurred while searching.</p>";
                }

            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Unable to retrieve your location.");
            });
        });
    });

//-- STOP RIGHT CLICK. -->
    
    document.addEventListener("contextmenu", function(event) {
        event.preventDefault();
    });
    
//-- DISABLE ALL THE KEYBOARD SHORTCUTS [FOR NON TECHNICAL PEOPLE, TECHNICAL PEOPLE DO HAVE ACCESS USING ADVANCE TOOLS] -->
    
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
    
