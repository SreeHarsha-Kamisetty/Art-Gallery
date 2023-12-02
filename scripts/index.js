// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
const baseServerURL = `http://localhost:${
  import.meta.env.REACT_APP_JSON_SERVER_PORT
}`;
// --- do not touch  ↑↑↑↑↑↑↑↑↑↑↑↑ ----------

// ***** Constants / Variables ***** //
const artURL = `${baseServerURL}/arts`;
let mainSection = document.getElementById("data-list-wrapper");
let paginationWrapper = document.getElementById("pagination-wrapper");

// art
let artTitleInput = document.getElementById("art-title");
let artImageInput = document.getElementById("art-image");
let artartistInput = document.getElementById("art-artist");
let artYearInput = document.getElementById("art-year");
let artPaintBrushesInput = document.getElementById("art-paintbrushes");
let artPriceInput = document.getElementById("art-price");
let artMediumInput = document.getElementById("art-medium");
let artCreateBtn = document.getElementById("add-art");

// Update art
let updateArtIdInput = document.getElementById("update-art-id");
let updateArtTitleInput = document.getElementById("update-art-title");
let updateArtImageInput = document.getElementById("update-art-image");
let updateArtartistInput = document.getElementById("update-art-artist");
let updateArtYearInput = document.getElementById("update-art-year");
let updateArtPaintBrushesInput = document.getElementById(
  "update-art-paintbrushes"
);
let updateArtPriceInput = document.getElementById("update-art-price");
let updateArtMediumInput = document.getElementById("update-art-medium");
let updateArtBtn = document.getElementById("update-art");

//Update price
let updatePackageArtId = document.getElementById("update-package-art-id");
let updatePackageArtPackage = document.getElementById(
  "update-package-art-package"
);
let updatePackageArtBtn = document.getElementById("update-package-art");

//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterTemperaOnCanvas = document.getElementById("filter-Tempera-on-Canvas");
let filterOilOnCanvas = document.getElementById("filter-Oil-on-Canvas");

//Search by title/colour

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");

// Main code

async function loadpage() {
  let cardlist = document.createElement("div");
  cardlist.className = "card-list";
  let res = await fetch(`${artURL}?_page=1&_limit=5`)
  let data = await res.json()
  console.log(data)
  data.forEach(sample => {
    let cards = createCard(sample);
    cardlist.append(cards)
  })
  mainSection.append(cardlist)

}
loadpage();
let sample = {
  id: 1,
  title: "Starry Night",
  artist: "Vincent van Gogh",
  year: 1889,
  medium: "Oil on Canvas",
  price: 100000,
  details: {
    paintbrushes: ["Round", "Flat"],
    solvents: ["Turpentine", "Mineral Spirits"],
  },
  image: "./server-files/images/StarryNight.jpg",
};
function createCard(sample){
    let card = document.createElement("div");
    card.className = "card";
    card.dataset.id = sample.id;
    
    let img = document.createElement("div");
    img.setAttribute("class", "card-img");
    let imgsrc = document.createElement("img");
    imgsrc.setAttribute("src", sample.image);
    imgsrc.setAttribute("alt", "art");
    img.append(imgsrc);
    let body = document.createElement("div");
    body.setAttribute("class", "card-body");
    let title = document.createElement("h5");
    title.className = "card-title";
    title.innerText = `Art title : ${sample.title}`;
    let artist = document.createElement("p");
    artist.className = "card-artist";
    artist.innerText = sample.artist;
    let year = document.createElement("p");
    year.className = "card-year";
    year.innerText = `year : ${sample.year}`;
    let paintbrushes = document.createElement("p");
    paintbrushes.className = "card-paintbrushes";
    paintbrushes.innerText = `paintbrushes : ${sample.details.painbrushes}`;
    let price = document.createElement("p");
    price.className = "card-price";
    price.innerText = sample.price;
    let medium = document.createElement("p");
    medium.className = "card-medium";
    medium.innerText = sample.medium;
    let link = document.createElement("a");
    link.setAttribute("href", "#");
    link.setAttribute("class", "card-link");
    link.dataset.id = sample.id;
    link.innerText = "Edit";
    let button = document.createElement("button");
    button.dataset.id = sample.id;
    button.className = "card-button";
    button.innerText = "Delete";
    
    card.append(img);
    body.append(title, artist, year, paintbrushes, price, medium, link, button);
    card.append(body);
    return card;
}


// cardlist.append(card);
// mainSection.append(cardlist);
