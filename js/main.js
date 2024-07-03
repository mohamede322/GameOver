import getGames from "./home.js";
import details from "./details.js";

const navLinks = document.querySelectorAll(".nav-link");
const myData = document.querySelector("#myData");
const detailsGame = document.querySelector("#detailsGame");
const mainHeader = document.querySelector(".main-header");
const detailsHeader = document.querySelector(".details-header");
const closeBtn = document.querySelector("#closeBtn");
const loader = document.querySelector(".loader-container");
let navbar = document.querySelector(".navbar");
let currentCat = "mmorpg";
let displayedGames = [];

closeBtn.addEventListener("click", () => {
  myData.classList.remove("d-none");
  mainHeader.classList.remove("d-none");
  detailsGame.classList.add("d-none");
  detailsHeader.classList.add("d-none");
  navbar.classList.remove("fixed-top");
  navbar.style.cssText = "transform:translateY(-32)";
});

navLinks.forEach((nav) => {
  nav.addEventListener("click", async () => {
    navLinks.forEach((nav) => nav.classList.remove("active"));
    nav.classList.add("active");
    currentCat = nav.getAttribute("aria-valuetext");
    displayData();
  });
});

async function getDetails(id) {
  myData.classList.add("d-none");
  mainHeader.classList.add("d-none");
  detailsGame.classList.remove("d-none");
  detailsHeader.classList.remove("d-none");
  loader.classList.remove("d-none");
  let currentGame = await details(id).finally(() => {
    loader.classList.add("d-none");
  });
  let gameDescription = currentGame.description;
  let gameTitle = currentGame.title;
  let gameImg = currentGame.thumbnail;
  let gamePlatform = currentGame.platform;
  let gameUrl = currentGame.game_url;
  let gameCategory = currentGame.genre;
  let gameStatus = currentGame.status;
  let gameReleaseDate = currentGame.release_date;
  detailsGame.innerHTML = `<div class="col-lg-4">
            <img src="${gameImg}" class="w-100" alt="..." />
          </div>
          <div class="col-lg-8">
            <div class="content text-light">
              <h1>Title: ${gameTitle}</h1>
              <p class="fw-semibold detailed-cat">
                Category:
                <span class="px-2 py-1 bg-info text-dark rounded-3"
                  >${gameCategory}</span
                >
              </p>
              <p class="fw-semibold detailed-plat">
                Platform:
                <span class="px-2 py-1 bg-info text-dark rounded-3"
                  >${gamePlatform}</span
                >
              </p>
              <p class="fw-semibold detailed-stat">
                Status:
                <span class="px-2 py-1 bg-info text-dark rounded-3">${gameStatus}</span>
              </p>
                    <p class="fw-semibold detailed-stat">
                Released:
                <span class="px-2 py-1 bg-info text-dark rounded-3">${gameReleaseDate}</span>
              </p>
              <p>
                ${gameDescription}
              </p>
              <a
                class="btn btn-outline-warning text-light"
                id="showGameBtn"
                href="${gameUrl}"
                target="_blank"
              >
                Show Game
              </a>
            </div>
          </div>`;
}

async function displayData() {
  loader.classList.remove("d-none");
  displayedGames = await getGames(currentCat).finally(() => {
    loader.classList.add("d-none");
  });
  let box = "";

  for (let i = 0; i < displayedGames.length; i++) {
    box += `<div class="col-lg-3 col-md-4 col-sm-6 gy-3">
            <div class="card bg-transparent text-light" id="${
              displayedGames[i].id
            }">
              <div class="card-body p-3">
                <img
                  src="${displayedGames[i].thumbnail}"
                  class="card-img-top mb-4"
                  alt="..."
                />

                <div
                  class="upper-text d-flex justify-content-between align-items-center mb-1"
                >
                  <h6 class="card-title">${displayedGames[i].title}</h6>
                  <p
                    class="mb-0 px-2 py-1 bg-primary text-light rounded-3 free fw-semibold"
                  >
                    Free
                  </p>
                </div>
                <p class="card-text text-center fw-semibold text-white-50 mb-1">
                ${displayedGames[i].short_description
                  .split(" ")
                  .splice(0, 10)
                  .join(" ")}...
                </p>
                <p class="text-center mb-1">Released: <span class="text-white-50 ">${
                  displayedGames[i].release_date
                }</span></p>
              </div>
              <div
                class="card-footer px-3 d-flex justify-content-between align-items-center"
              >
                <span class="p-1 rounded-2 fw-semibold">${
                  displayedGames[i].genre
                }</span>
                <span class="p-1 rounded-2 fw-semibold">${
                  displayedGames[i].platform
                }</span>
              </div>
            </div>
          </div>`;
  }
  myData.innerHTML = box;

  let cards = document.querySelectorAll(".card");
  cards.forEach((card) => {
    card.addEventListener("click", () => getDetails(card.id));
  });
}

document.addEventListener("scroll", () => {
  navbar.classList.remove("fixed-top");
  navbar.style.cssText = "transform:translateY(-32)";
  if (window.scrollY >= navbar.offsetTop - 32) {
    navbar.classList.add("fixed-top");
    navbar.style.cssText = "transform:translateY(0)";
  }
});

displayData();
