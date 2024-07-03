import displayMethod from "./ui-module.js";

export default async function getDetails(id) {
  const url = `https://free-to-play-games-database.p.rapidapi.com/api/game?id=${id}`;
  let res = new displayMethod();
  let data = await res.display(url);

  return data;
}
