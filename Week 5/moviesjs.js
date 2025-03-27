// Replace with your own API key from OMDb
const API_KEY = "8ffe6406"; // Replace with your OMDb API Key

// Get elements from HTML
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const movieResults = document.getElementById("movieResults");

// Function to fetch movie data
const fetchMovies = async (movieName) => {
    try {
        const response = await fetch(`https://www.omdbapi.com/?s=${movieName}&apikey=${API_KEY}`);
        const data = await response.json();

        // Check if movies exist
        if (data.Response === "True") {
            displayMovies(data.Search);
        } else {
            movieResults.innerHTML = `<p style="color: red;">No results found</p>`;
        }
    } catch (error) {
        console.error("Error fetching movies:", error);
        movieResults.innerHTML = `<p style="color: red;">Something went wrong! Try again later.</p>`;
    }
};

// Function to display movie data
const displayMovies = (movies) => {
    movieResults.innerHTML = ""; // Clear previous results
    movies.forEach((movie) => {
        const movieCard = `
            <div class="movie-card">
                <img src="${movie.Poster}" alt="${movie.Title}">
                <div class="movie-info">
                    <h2>${movie.Title}</h2>
                    <p>Year: ${movie.Year}</p>
                </div>
            </div>
        `;
        movieResults.innerHTML += movieCard;
    });
};

// Event Listener for Search Button
searchButton.addEventListener("click", () => {
    const movieName = searchInput.value.trim();
    if (movieName) {
        fetchMovies(movieName);
    } else {
        alert("Please enter a movie name!");
    }
});
