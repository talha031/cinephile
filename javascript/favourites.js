import { getFavourites, saveFavourites } from "./storage.js";
const container = document.getElementById("favouritesContainer");
const emptyState = document.getElementById("emptyState");

function removeFavourite(id) {
  let favs = getFavourites();

  favs = favs.filter(movie => movie.id !== id);

  saveFavourites(favs);
  renderFavourites();
}
function updateCount(favs) {
  const countEl = document.getElementById("favCount");
  countEl.textContent = favs.length;
}
// render UI
function renderFavourites() {
  const favourites = getFavourites();
 updateCount(favourites);
  container.innerHTML = "";

  if (favourites.length === 0) {
    emptyState.classList.remove("hidden");
    container.classList.add("hidden");
    return;
  }

  emptyState.classList.add("hidden");
  container.classList.remove("hidden");

  favourites.forEach(movie => {
    const card = document.createElement("div");

   card.className =
  "w-[250px] h-[400px] bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg flex-shrink-0";

card.innerHTML = `
 <img src="${movie.poster}" class="w-full h-[320px] object-cover" />

  <div class="p-2">
    <h3 class="text-[#aaaaaa] text-sm font-semibold truncate">
      ${movie.title}
    </h3>

    <button
      class="mt-2 w-full bg-red-600 hover:bg-red-700 text-[#ffffff] text-xs py-1 rounded"
      data-id="${movie.id}"
    >
      Remove
    </button>
  </div>
`;

    card.querySelector("button").addEventListener("click", (e) => {
      const id = movie.id;
      removeFavourite(id);
    });

    container.appendChild(card);
  });
}
renderFavourites();