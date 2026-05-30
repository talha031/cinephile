export function getFavourites() {
  return JSON.parse(localStorage.getItem("favourites")) || [];
}

export function saveFavourites(data) {
  localStorage.setItem("favourites", JSON.stringify(data));
}

export function addToFavourites(movie) {
  let favs = getFavourites();

  // check duplicate (important)
  let exists = favs.some(item => item.id === movie.id);

  if (exists) {
    alert("Already in favourites");
    return;
  }

  favs.push(movie);
  saveFavourites(favs);

  alert("Added to favourites");
}