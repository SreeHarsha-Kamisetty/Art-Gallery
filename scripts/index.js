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