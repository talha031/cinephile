import { getTrendingMovies, searchMovies, IMAGE_BASE_URL } from "./api.js"

const trendingMovies = document.getElementById("trendingMovies");
const searchInput = document.getElementById("searchInput");
const loader = document.getElementById("loader");

const genreMap = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  18: "Drama",
  27: "Horror",
  53: "Thriller"
};

async function loadHero() {
  loader.classList.remove("hidden");
  const movies = await getTrendingMovies();
  loader.classList.add("hidden");
  const featured = movies[Math.floor(Math.random() * movies.length)];

  renderHero(featured);
}
loadHero();

function renderHero(movie) {
  const hero = document.getElementById("hero");
  hero.innerHTML = `
    <div class="absolute inset-0 bg-cover bg-center"
      style="background-image: url(${IMAGE_BASE_URL}${movie.backdrop_path});">
    </div>
    <div class="absolute inset-0 bg-black/60"></div>
    <div class="relative z-10 h-full flex flex-col justify-end p-10">
      <h1 class="text-[#ffffff] mt-2 font-bold text-xl md:text-5xl max-w-xl mb-4">
        ${movie.title}
      </h1>

      <div class="flex gap-2 mb-3">
        ${movie.genre_ids?.slice(0, 3).map(id => `
          <span class="bg-[#cc0000] text-[#ffffff] text-xs px-2 py-1 rounded">
            ${genreMap[id] || "Movie"}
          </span>
        `).join("")}
      </div>

      <p class="text-[#aaaaaa] max-w-xl mb-4">
        ${movie.overview}
      </p>
      <div class=" flex gap-2 text-[#cc0000] mb-4">
       <i data-lucide="star"></i>
         ${movie.vote_average ? movie.vote_average.toFixed(1) : "0.0"}
      </div>
      <div class="flex gap-4">
        <button class="bg-[#cc0000] text-[#ffffff] px-6 py-2 rounded hover:bg-red-700">
          Watch Trailer
        </button>
        <button class="bg-gray-700 text-[#ffffff] px-6 py-2 rounded hover:bg-gray-600">
          More Info
        </button>
      </div>

    </div>
  `;
  lucide.createIcons();
}

function createMovieCard(movie) {

  return `
    <div
     onclick="window.location.href='details.html?id=${movie.id}'"
      class="min-w-[200px] bg-[#1e1e1e] rounded-lg overflow-hidden cursor-pointer hover:scale-105 transition duration-300 flex-shrink-0">
      <img src="${IMAGE_BASE_URL}${movie.poster_path}" alt="${movie.title}"
        class="w-full h-64 object-cover">
      <div class="p-3">
        <h3 class="text-[#aaaaaa] text-sm font-semibold truncate">
          ${movie.title}
        </h3>
        <div class="flex justify-between mt-2">
          <span class="text-gray-500 text-xs">
            ${movie.release_date?.split("-")[0] || "N/A"}
          </span>
          <span class=" flex gap-1 bg-red-600 text-[#ffffff] text-xs px-2 py-1 rounded">
             <i data-lucide="star" class="w-4 h-4"></i>
             ${movie.vote_average.toFixed(1)}
          </span>
        </div>
      </div>
    </div>
  `;
}

function renderMovies(movies) {
  trendingMovies.innerHTML =
    movies
      .map(createMovieCard)
      .join("");
  lucide.createIcons();
}

async function loadTrendingMovies() {
  loader.classList.remove("hidden");
  const movies = await getTrendingMovies();
  loader.classList.add("hidden");
  renderMovies(movies);
}
loadTrendingMovies();

searchInput.addEventListener(
  "input",
  async (e) => {

    const query = e.target.value.trim();
    loader.classList.remove("hidden");
    if (query === "") {

      loadTrendingMovies();
      return;
    }
    const movies = await searchMovies(query);
    loader.classList.add("hidden");
    renderMovies(movies);
  }
);
loadCollections();

function getRandomCollection(movies) {
  return movies[Math.floor(Math.random() * movies.length)];
}

async function loadCollections() {
  const movies = await getTrendingMovies();

  const collection1 = document.getElementById("collection1");
  const collection2 = document.getElementById("collection2");

  const featuredMovies = movies.slice(0, 8);

  const movie1 = getRandomCollection(featuredMovies);
  let movie2 = getRandomCollection(featuredMovies);

  while (movie2.id === movie1.id) {
    movie2 = getRandomCollection(featuredMovies);
  }
  collection1.innerHTML =
    createCollectionCard(featuredMovies[Math.floor(Math.random() * featuredMovies.length)]);

  collection2.innerHTML =
    createCollectionCard(featuredMovies[Math.floor(Math.random() * featuredMovies.length)]);
}

function createCollectionCard(movie) {
  return `
    <img
      src="${IMAGE_BASE_URL}${movie.backdrop_path}"
      alt="${movie.title}"
      class="absolute inset-0 w-full h-full object-cover" >
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent"></div>
    <div class="absolute bottom-5 left-5 right-5">
      <h3 class="text-[#ffffff] text-xl font-bold">
        ${movie.title}
      </h3>
      <p class="text-[#aaaaaa] text-sm mt-2 line-clamp-3">
        ${movie.overview}
      </p>
    </div>
  `;
}