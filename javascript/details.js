import { addToFavourites } from "./storage.js";
import { getMovieDetails, getMovieCredits, IMAGE_BASE_URL } from "./api.js";

const loader = document.getElementById("loader");
const params = new URLSearchParams(window.location.search);
const movieId = params.get("id");
console.log(movieId);
let currentMovieData = null;


async function init() {
  loader.classList.remove("hidden");
  const movie = await getMovieDetails(movieId);
  loader.classList.add("hidden");
  const credits = await getMovieCredits(movieId);
  currentMovieData = movie;
  renderHero(movie);
  renderCast(credits.cast);
}

init();

function renderHero(movie) {

  const hero = document.getElementById("movieHero");
  hero.innerHTML = `
  <div class="absolute inset-0 bg-cover bg-center"
    style=" background-image: linear-gradient(to bottom, rgba(0,0,0,0.3), rgba(0,0,0,0.9)),
     url(${IMAGE_BASE_URL}${movie.backdrop_path});
    ">
  </div>
  <div class="absolute inset-0 bg-red-900/10"></div>
  <div class="relative z-10  px-4 md:px-16 pt-24 pb-10 ">
    <div class="flex flex-col mt-2 lg:mt-10 md:flex-row items-center md:items-end gap-8 md:gap-14">
      <img
        src="${IMAGE_BASE_URL}${movie.poster_path}"
        class=" w-[200px] md:w-[300px] h-[300px] md:h-[440px] object-cover rounded-[8px] border border-red-900/30"
      >

      <div class="mb-6 max-w-2xl">
        <h1 class="text-lg md:text-3xl mt-3 font-black uppercase leading-none tracking-tight">
          ${movie.title}
        </h1>

        <div class=" flex items-center gap-5 mt-5 text-sm text-[#aaaaaa]">
          <span class=" flex gap-2 text-[#cc0000] font-semibold">
          <i data-lucide="star"></i>
             ${movie.vote_average.toFixed(1)} Rating
          </span>

          <span>
  ${movie.release_date ? movie.release_date.split("-")[0] : "N/A"}
</span>

          <span>
            ${movie.runtime} MIN
          </span>

          <span class="border border-gray-600 px-3 py-1 rounded-[8px] text-xs">
           ${movie.genres[0]?.name || "SCI-FI"}
          </span>
        </div>

        <div class="flex flex-col sm:flex-row gap-4 mt-8">

          <button class=" flex gap-2 bg-[#cc0000] hover:bg-red-700 transition px-6 py-3 rounded-[4px] font-medium">
<i data-lucide="play"></i>
             Watch Now
          </button>

         <button id="favBtn"
  class="flex gap-2 bg-[#1A1A1A] hover:bg-[#252525] transition px-6 py-3 rounded-[8px] border border-gray-700">
<i data-lucide="heart"></i>
   Add to Favourites
</button>


          <button
  class="flex items-center justify-center bg-[#1A1A1A] hover:bg-[#252525] transition w-12 h-12 rounded-[8px] border border-gray-700 shrink-0">
  <i data-lucide="share-2" class="w-5 h-5"></i>
</button>
        </div>

        <div class="mt-5 md:mt-10">
          <h2 class="text-xl md:text-2xl font-bold mb-2 md:mb-4">
            The Storyline
          </h2>
          <p
            class="text-[#aaaaaa] leading-relaxed text-sm md:text-lg break-words">
            ${movie.overview}
          </p>
        </div>
      </div>
    </div>
  </div>
  `;
  lucide.createIcons();
}

function renderCast(cast) {

  const container =
    document.getElementById("castContainer");

  container.innerHTML = cast
    .slice(0, 5)
    .map(actor => `
        <div class="text-center">
            <img
            src="${actor.profile_path
        ? IMAGE_BASE_URL + actor.profile_path
        : 'https://via.placeholder.com/100'
      }"
            class=" w-24 h-24 rounded-full object-cover border-2 border-red-600 shadow-lg mx-auto"
            >
            <h3 class="text-[#ffffff] text-sm mt-3 font-medium">
                ${actor.name}
            </h3>
            <p class="text-[#aaaaaa] text-xs">
                ${actor.character}
            </p>
        </div>
    `)
    .join("");
}
document.body.addEventListener("click", (e) => {

  if (e.target.id === "favBtn") {

    const movie = {
      id: currentMovieData.id,
      title: currentMovieData.title,
      poster:IMAGE_BASE_URL + currentMovieData.poster_path
    };
    addToFavourites(movie);
  }
});