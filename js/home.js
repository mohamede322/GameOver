import displayMethod from "./ui-module.js";

export default async function getGames(category) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/games?category=${category}`;
  let res = new displayMethod();
  let data = await res.display(url);

  return data;
}
