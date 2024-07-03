export default class displayMethod {
  options = {
    method: "GET",
    headers: {
      "x-rapidapi-key": "907d9c83bemsha2c0b609689f942p1458aajsn18cf817077df",
      "x-rapidapi-host": "free-to-play-games-database.p.rapidapi.com",
      "Content-Type": "application/json",
    },
  };

  async display(url) {
    const response = await fetch(url, this.options);
    const data = await response.json();
    return data;
  }
}
