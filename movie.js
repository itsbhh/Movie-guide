document.addEventListener("DOMContentLoaded", function () {
    let movieNameRef = document.getElementById("movie-name");
    let searchBtn = document.getElementById("search-btn");
    let searchContainer = document.querySelector(".search-container");
    let result = document.getElementById("result");

    let getMovie = (movieTitle) => {
        let movieName = movieTitle || "3 Idiots";
        let apiKey = "c9947a67"; 

        let url = `https://www.omdbapi.com/?t=${movieName}&apikey=${apiKey}`;

        fetch(url)
            .then((resp) => resp.json())
            .then((data) => {
                if (data.Response == "True") {
                    // Update the result div content
                    result.innerHTML = `
                        <div class="info">
                            <img src="${data.Poster}" class="poster">
                            <div>
                                <h2>${data.Title}</h2>
                                <div class="rating">
                                    <i class="fas fa-star"></i> <!-- Font Awesome star icon -->
                                    <h4>${data.imdbRating}</h4>
                                </div>
                                <div class="details">
                                    <span>${data.Rated}</span>
                                    <span>${data.Year}</span>
                                    <span>${data.Runtime}</span>
                                </div>
                                <div class="genre">
                                    <div>${data.Genre.split(",").join("</div><div>")}</div>
                                </div>
                            </div>
                        </div>
                        <h3>Plot:</h3>
                        <p>${data.Plot}</p>
                        <h3>Cast:</h3>
                        <p>${data.Actors}</p>
                    `;
                    // Show the result div
                    result.style.display = "block";
                } else {
                    result.innerHTML = `<h3 class='msg'>${data.Error}</h3>`;
                    result.style.display = "block";
                }
            })
            .catch(() => {
                result.innerHTML = '<h3 class="msg">Error Occurred</h3>';
                result.style.display = "block";
            });
    };

    getMovie("3 Idiots");

    searchBtn.addEventListener("click", () => {
        let movieTitle = movieNameRef.value.trim();
        getMovie(movieTitle);
    });

    movieNameRef.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            let movieTitle = movieNameRef.value.trim();
            getMovie(movieTitle);
        }
    });
});

document.addEventListener("DOMContentLoaded", function () {
    const slides = document.querySelectorAll(".carousel-item"); 
    const indicators = document.querySelectorAll(".carousel-indicators li"); 

    function showSlide(index) {
        if (slides && slides.length > 0 && indicators && indicators.length > 0) {
            slides.forEach((slide) => {
                slide.classList.remove("active");
            });
            indicators.forEach((indicator) => {
                indicator.classList.remove("active");
            });
            slides[index].classList.add("active");
            indicators[index].classList.add("active");
        } else {
            console.error("Slides or indicators not found or empty.");
        }
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            showSlide(index);
            currentSlide = index;
        });
    });

    setInterval(nextSlide, 3000); 
});
