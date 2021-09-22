var genreBtn = document.getElementById("genreBtn");
var genre = document.getElementById("genreDropdown").value;
var apiKey = "HUTH1QtfQAfqpTYJWHo05rXbQdSw6LmKoEgwF53f";
var apiUrl ="https://api.watchmode.com/v1/list-titles/?apiKey=" + apiKey + "&genres=" + genreID;
var data = "";
var genreID = "";
var genreList = [
  {
    name: "Action",
    id: "1",
  },
  {
    name: "Comedy",
    id: "4",
  },
  {
    name: "Drama",
    id: "7",
  },
  {
    name: "Fantasy",
    id: "9",
  },
  {
    name: "Horror",
    id: "11",
  },
  {
    name: "Mystery",
    id: "13",
  },
  {
    name: "Romance",
    id: "14",
  },
  {
    name: "Thriller",
    id: "17",
  },
];

function searchGenre() {
  genre = document.getElementById("genreDropdown").value;
  console.log(genre);
  getGenreList();
  getGenre(genre);
}

function getGenreList() {
  fetch("https://api.watchmode.com/v1/genres/?apiKey=" + apiKey)
    .then(function (response) {
      console.log(response.status);
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });
  for (i = 0; i < genre.length; i++) {
    if (genre == genreList[i].name) {
      genreID = genreList[i].id;
      break;
    }
  }
}

function getGenre(genre) {
  fetch(
    "https://api.watchmode.com/v1/list-titles/?apiKey=" +
      apiKey +
      "&genres=" +
      genreID
  )
    .then(function (response) {
      console.log(response.status);
      if (response.status !== 200) {
        responseText.textContent = response.status;
      }
      return response.json();
    })
    .then(function (data) {
      console.log(data);
      displayGenre(data, false);
      localStorage.genreResults = JSON.stringify(data);
    })
    .catch((error) => {
      console.error("Error:", error);
    });
}

var displayGenre = function (data, historic) {
  var html = "";

  if (historic == true) {
    html += '<strong class="bold"><em>Previous Results</em></strong><br>';
  } else if (historic == false) {
    html += '<strong class="bold"><em>Search Results</em></strong><br>';
  }

  for (let i = 0; i < data.titles.length && i < 15; i++) {
    var movie = data.titles[i].title;
    html += movie + "<br>";
  }

  var genreResultsDiv = document.getElementById("genreResults");
  genreResultsDiv.innerHTML = html;
};

genreBtn.addEventListener("click", searchGenre);

function initGenreResults() {
  if (localStorage.genreResults) {
    data = JSON.parse(localStorage.genreResults);
    displayGenre(data, true);
  }
}
