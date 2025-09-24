        const accessKey = "X_-7I-5xK-TxXAb9qWwPuNKMdsGDdTVnUbi_0_PE2UU";

        const searchForm = document.getElementById("search-form");
        const searchBox = document.getElementById("search-box");
        const searchResult = document.getElementById("search-result");
        const showMoreBtn = document.getElementById("show-more-btn");
        const loader = document.getElementById("loader");

        let keyword = "";
        let page = 1;

        async function searchImages() {
            keyword = searchBox.value;
            if (!keyword) return;
            
            // Show loader
            loader.style.display = "block";
            searchResult.innerHTML = "";
            
            const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;

            try {
                const response = await fetch(url);
                const data = await response.json();

                const results = data.results;

                if (page === 1) {
                    searchResult.innerHTML = "";
                }

                results.map((result) => {
                    const imageCard = document.createElement("div");
                    imageCard.classList.add("image-card");
                    
                    const image = document.createElement("img");
                    image.src = result.urls.small;
                    image.alt = result.alt_description || "Unsplash Image";
                    
                    const imageLink = document.createElement("a");
                    imageLink.href = result.links.html;
                    imageLink.target = "_blank";
                    imageLink.innerHTML = `<i class="fas fa-external-link-alt"></i> View on Unsplash`;
                    
                    imageCard.appendChild(image);
                    imageCard.appendChild(imageLink);
                    searchResult.appendChild(imageCard);
                });
                
                showMoreBtn.style.display = "block";
            } catch (error) {
                console.error("Error fetching images:", error);
                searchResult.innerHTML = "<p style='text-align: center; margin: 40px 0;'>Failed to load images. Please try again.</p>";
            } finally {
                // Hide loader
                loader.style.display = "none";
            }
        }

        searchForm.addEventListener("submit", (e) => {
            e.preventDefault();
            page = 1;
            searchImages();
        });

        showMoreBtn.addEventListener("click", () => {
            page++;
            searchImages();
        });


        

        // Toggle mobile menu
        const hamburger = document.querySelector('.hamburger');
        const navMenu = document.querySelector('.nav-menu');

        hamburger.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            
            // Change icon based on menu state
            const icon = hamburger.querySelector('i');
            if (navMenu.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Close menu when clicking on a nav link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                hamburger.querySelector('i').classList.remove('fa-times');
                hamburger.querySelector('i').classList.add('fa-bars');
            });
        });
