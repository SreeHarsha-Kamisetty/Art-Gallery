// --- do not touch  ↓↓↓↓↓↓↓↓↓↓↓↓ ----------
// const baseServerURL = `http://localhost:${
//   import.meta.env.REACT_APP_JSON_SERVER_PORT
// }`;
const baseServerURL = 'https://656f0b456529ec1c623735b3.mockapi.io'
// const baseServerURL = process.env.REACT_APP_JSON_SERVER_PORT
//   ? `http://localhost:${process.env.REACT_APP_JSON_SERVER_PORT}`
//   : 'http://localhost:8080'; // Replace defaultPort with your default port number


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

artCreateBtn.addEventListener("click", (e) => {
  addArt();
  artTitleInput.value = "";
  artImageInput.value = "";
  artartistInput.value = "";
  artYearInput.value = "";
  artPaintBrushesInput.value = "";
  artPriceInput.value = "";
  artMediumInput.value = "";
});
async function addArt() {
  let res = await fetch(artURL, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: artTitleInput.value,
      artist: artartistInput.value,
      year: Number(artYearInput.value),
      medium: artMediumInput.value,
      price: Number(artPriceInput.value),
      details: {
        paintbrushes: [artPaintBrushesInput.value],
        solvents: ["Turpentine", "Mineral Spirits"],
      },
      image: artImageInput.value,
    }),
  });
  let data = await res.json();

  loadPage(1);
}
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

updateArtBtn.addEventListener("click", (e) => {
  let id = updateArtIdInput.value;
  updateArt(id);
});

async function updateArt(id) {
  let posturl = `${baseServerURL}/arts/${id}`;

  let res = await fetch(posturl, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      title: updateArtTitleInput.value,
      artist: updateArtartistInput.value,
      year: Number(updateArtYearInput.value),
      medium: updateArtMediumInput.value,
      price: Number(updateArtPriceInput.value),
      details: {
        paintbrushes: [updateArtPaintBrushesInput.value],
        solvents: ["Turpentine", "Mineral Spirits"],
      },
      image: updateArtImageInput.value,
    }),
  });
  let data = await res.json();

  loadPage(1);
}
//Update price
let updatePackageArtId = document.getElementById("update-package-art-id");
let updatePackageArtPackage = document.getElementById(
  "update-package-art-package"
);
let updatePackageArtBtn = document.getElementById("update-package-art");

updatePackageArtBtn.addEventListener("click", (e) => {
  let id = updatePackageArtId.value;
  updatePrice(id);
});

async function updatePrice(id) {
  let posturl = `${baseServerURL}/arts/${id}`;

  let res = await fetch(posturl, {
    method: "PUT",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify({
      price: Number(updatePackageArtPackage.value),
    }),
  });
  let data = await res.json();

  loadPage(1);
}
//sort and filter
let sortAtoZBtn = document.getElementById("sort-low-to-high");
let sortZtoABtn = document.getElementById("sort-high-to-low");
let filterTemperaOnCanvas = document.getElementById("filter-Tempera-on-Canvas");
let filterOilOnCanvas = document.getElementById("filter-Oil-on-Canvas");

sortAtoZBtn.addEventListener("click", (e) => {
  loadPage(1, "sortby=price&order=asc");
});
sortZtoABtn.addEventListener("click", (e) => {
  loadPage(1, "sortby=price&order=desc");
});
filterOilOnCanvas.addEventListener("click", (e) => {
  loadPage(1, "medium=Oil on Canvas");
});
filterTemperaOnCanvas.addEventListener("click", (e) => {
  loadPage(1, "medium=Tempera on Canvas");
});

//Search by title/colour

let searchBySelect = document.getElementById("search-by-select");
let searchByInput = document.getElementById("search-by-input");
let searchByButton = document.getElementById("search-by-button");
searchByButton.addEventListener('click',(e) =>{
  console.log(`The selected option is ${searchBySelect.value}`)
  console.log(`Selected artist is ${searchByInput.value}`)
  loadPage(1,`${searchBySelect.value}=${searchByInput.value}`);
})
//Arts Data
let artsData = [];
let queryParamString = null;
let pageNumber = 1;

let sample = {
  id: 1,
  title: "Starry Night",
  artist: "Vincent van Gogh",
  year: 1889,
  medium: "Oil on Canvas",
  price: "1000",
  details: {
    paintbrushes: ["Round", "Flat"],
    solvents: ["Turpentine", "Mineral Spirits"],
  },
  image: "./server-files/images/StarryNight.jpg",
};

async function loadPage(page, qparams = "") {
  let url = `${baseServerURL}/arts?page=${page}&limit=5&${qparams}`;
  let cardlist = document.createElement("div");
  cardlist.setAttribute("class", "card-list");
  mainSection.innerHTML = "";
  paginationWrapper.innerHTML = "";
  let res = await fetch(url);
  let data = await res.json();
  console.log(data)
  let totalcount = data.count;
  let data1 = data.items
  console.log(data1)
  let pagecount = Math.ceil(totalcount / 5);
  data1.forEach((item) => {
    let cards = createCard(item);
    cardlist.append(cards);
  });
  mainSection.append(cardlist);
  pagination(pagecount, qparams);
}

loadPage(1);
function pagination(pagecount, qparams) {
  for (let page = 1; page <= pagecount; page++) {
    let button = document.createElement("button");
    button.innerText = page;
    button.addEventListener("click", (e) => {
      mainSection.innerHTML = "";
      paginationWrapper.innerHTML = "";
      loadPage(button.innerText, qparams);
    });
    paginationWrapper.append(button);
  }
}
function createCard(sample) {
  let card = document.createElement("div");
  card.setAttribute("class", "card");
  card.setAttribute("data-id", sample.id);
  let img = document.createElement("div");
  img.setAttribute("class", "card-img");
  let imgsrc = document.createElement("img");
  imgsrc.setAttribute("src", sample.image);
  imgsrc.setAttribute("alt", "art");
  img.append(imgsrc);
  let body = document.createElement("div");
  body.setAttribute("class", "card-body");
  let title = document.createElement("h5");
  title.setAttribute("class", "card-title");
  title.innerText = `Art title : ${sample.title}`;
  let artist = document.createElement("p");
  artist.setAttribute("class", "card-artist");
  artist.innerText = sample.artist;
  let year = document.createElement("p");
  year.setAttribute("class", "card-year");
  year.innerText = `year : ${sample.year}`;
  let paintbrushes = document.createElement("p");
  paintbrushes.setAttribute("class", "card-paintbrushes");
  
  paintbrushes.innerText = `paintbrushes : ${sample.paintbrushes}`;
  let price = document.createElement("card-price");
  price.setAttribute("class", "card-price");
  price.innerText = sample.price;
  let medium = document.createElement("p");
  medium.setAttribute("class", "card-medium");
  medium.innerText = sample.medium;
  let link = document.createElement("a");
  link.setAttribute("href", "#");
  link.setAttribute("data-id", sample.id);
  link.setAttribute("class", "card-link");
  link.innerText = "Edit";
  link.addEventListener("click", (e) => {
    e.preventDefault();
    updateArtIdInput.value = sample.id;
    updateArtTitleInput.value = sample.title;
    updateArtImageInput.value = sample.image;
    updateArtPaintBrushesInput.value = sample.paintbrushes;
    updateArtartistInput.value = sample.artist;
    updateArtYearInput.value = sample.year;
    updateArtPriceInput.value = sample.price;
    updateArtMediumInput.value = sample.medium;

    updatePackageArtId.value = sample.id;
    updatePackageArtPackage.value = sample.price;
  });
  let del = document.createElement("button");
  del.setAttribute("data-id", sample.id);
  del.setAttribute("class", "card-button");
  del.innerText = "Delete";
  del.addEventListener("click", (e) => {
    let id = sample.id;
    deleteArt(id);
  });
  body.append(title, artist, year, paintbrushes, price, medium, link, del);
  card.append(img, body);
  return card;
}
async function deleteArt(id) {
  let posturl = `${baseServerURL}/arts/${id}`;

  let res = await fetch(posturl, {
    method: "DELETE",
    headers: {
      "Content-type": "application/json",
    },
  });
  let data = await res.json();
  console.log(data);
  loadPage(1);
}
// cardlist.append(card)
// mainSection.append(cardlist)
