var app = function(){
  selection = document.getElementById("search-query");
  selection.addEventListener('keyup', search);
}

var search = function(){
  var list = document.getElementById("albums");
  list.innerHTML = "";
  searchSelection = this.value;
  console.log(searchSelection);
  var url = "https://api.spotify.com/v1/search?q="+searchSelection+"&type=album"
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback){
  var request = new XMLHttpRequest();

  request.open("GET", url);
  request.addEventListener("load", callback);
  request.send();
}

var requestComplete = function(){
  if(this.status !== 200) return;

  var jsonString = this.responseText;
  var response = JSON.parse(jsonString);
  var albums = response.albums.items;

  populateList(albums);
}

var populateList = function(albums){
  var list = document.getElementById("albums");
  for (album of albums){
    var listItem = document.createElement("ul");
    var artist = document.createElement("li");
    var image = document.createElement("img");
    listItem.innerText = album.name;
    artist.innerText = album.artists[0].name;
    image.setAttribute("src", album.images[0].url)
    image.setAttribute("width", "150px")
    listItem.appendChild(artist);
    listItem.appendChild(image);
    list.appendChild(listItem);
  }
}

window.addEventListener('load', app);
