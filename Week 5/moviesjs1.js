document.addEventListener('DOMContentLoaded', () => {
    // Replace with your own API key from OMDb
    const API_KEY = "8ffe6406"; // Get from http://www.omdbapi.com/

    // Get elements from HTML
    const searchInput = document.getElementById("searchInput");
    const searchButton = document.getElementById("searchButton");
    const clearButton = document.getElementById("clearButton");
    const movieResults = document.getElementById("movieResults");
    const loading = document.getElementById("loading");
    const modal = document.getElementById("modal");
    const closeModal = document.getElementById("closeModal");
    const movieDetails = document.getElementById("movieDetails");

    // Debug: Verify elements are loaded
    console.log('DOM elements:', { searchInput, searchButton, clearButton, movieResults, loading, modal, closeModal, movieDetails });

    // Fetch movie search results
    const fetchMovies = async (movieName) => {
        try {
            loading.classList.remove("hidden");
            movieResults.innerHTML = "";
            const response = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`);
            const data = await response.json();

            if (data.Response === "True") {
                displayMovies(data.Search);
            } else {
                movieResults.innerHTML = `<p style="color: #dc3545; font-weight: bold;">No results found for "${movieName}"</p>`;
            }
        } catch (error) {
            console.error("Error fetching movies:", error);
            movieResults.innerHTML = `<p style="color: #dc3545; font-weight: bold;">Something went wrong! Try again later.</p>`;
        } finally {
            loading.classList.add("hidden");
        }
    };

    // Fetch detailed movie info
    const fetchMovieDetails = async (imdbID) => {
        try {
            const response = await fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=${API_KEY}`);
            const data = await response.json();
            if (data.Response === "True") {
                displayMovieDetails(data);
            }
        } catch (error) {
            console.error("Error fetching movie details:", error);
            movieDetails.innerHTML = `<p style="color: #dc3545;">Failed to load details.</p>`;
        }
    };

    // Display search results
    const displayMovies = (movies) => {
        movieResults.innerHTML = "";
        movies.forEach((movie) => {
            const movieCard = document.createElement("div");
            movieCard.classList.add("movie-card");
            movieCard.innerHTML = `
                <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/100'}" alt="${movie.Title}">
                <div class="movie-info">
                    <h2>${movie.Title}</h2>
                    <p>Year: ${movie.Year}</p>
                </div>
            `;
            movieCard.addEventListener("click", () => {
                console.log(`Movie card clicked: ${movie.imdbID}`);
                modal.classList.remove("hidden");
                fetchMovieDetails(movie.imdbID);
            });
            movieResults.appendChild(movieCard);
        });
    };

    // Display movie details in modal
    const displayMovieDetails = (movie) => {
        movieDetails.innerHTML = `
            <h2>${movie.Title} (${movie.Year})</h2>
            <img src="${movie.Poster !== "N/A" ? movie.Poster : 'https://via.placeholder.com/100'}" alt="${movie.Title}" style="width: 200px; border-radius: 5px;">
            <p><strong>Genre:</strong> ${movie.Genre}</p>
            <p><strong>Director:</strong> ${movie.Director}</p>
            <p><strong>Plot:</strong> ${movie.Plot}</p>
            <p><strong>Rating:</strong> ${movie.imdbRating}/10</p>
        `;
    };

    // Event listeners
    searchButton.addEventListener("click", () => {
        console.log('Search button clicked');
        const movieName = searchInput.value.trim();
        if (movieName) fetchMovies(movieName);
        else alert("Please enter a movie name!");
    });

    clearButton.addEventListener("click", () => {
        console.log('Clear button clicked');
        searchInput.value = "";
        movieResults.innerHTML = "";
    });

    searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            console.log('Enter key pressed');
            const movieName = searchInput.value.trim();
            if (movieName) fetchMovies(movieName);
            else alert("Please enter a movie name!");
        }
    });

    closeModal.addEventListener("click", () => {
        console.log('Close modal clicked');
        modal.classList.add("hidden");
        movieDetails.innerHTML = "";
    });

    modal.addEventListener("click", (event) => {
        if (event.target === modal) {
            console.log('Modal background clicked');
            modal.classList.add("hidden");
            movieDetails.innerHTML = "";
        }
    });
});