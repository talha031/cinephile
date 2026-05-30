import { API_KEY } from "./config.js";
export const BASE_URL = "https://api.themoviedb.org/3";
export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";


export async function getTrendingMovies() {
  try {
    const response = await fetch(
      `${BASE_URL}/trending/movie/week?api_key=${API_KEY}`
    );
    const data = await response.json();
// console.log(data.results[0]);    
    return data.results;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function searchMovies(query) {
  try {
    const response = await fetch(
      `${BASE_URL}/search/movie?api_key=${API_KEY}&query=${query}`
    );

    const data = await response.json();
    return data.results;

  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getMovieDetails(movieId) {

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`
  );

  return await response.json();
}
export async function getMovieCredits(movieId) {

  const response = await fetch(
    `${BASE_URL}/movie/${movieId}/credits?api_key=${API_KEY}`
  );

  return await response.json();
}

