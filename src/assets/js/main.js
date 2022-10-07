import './../scss/main.scss';

const apiEndpoint = 'https://api.spotify.com/v1'
const authEndpoint = 'https://accounts.spotify.com/api/token'
const clientId = '' <- // Your Client Id
const clientSecret = '' // <- Your Client Secret 

const authString = `${clientId}:${clientSecret}`
let authorization = btoa( authString )

const authToken = await fetch( authEndpoint, {
    method: 'post',
    body: 'grant_type=client_credentials',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${authorization}`
    }
} )
    .then(
        res => res.json()
    )
    .then(
        json => json.access_token
    )

const button = document.querySelector('#albumSearchBtn');

button.addEventListener('click', (event) => {
    const input = document.querySelector('#albumSearchInput').value;
    searchAlbum(input)
});

function searchAlbum(album) {
    fetch(`https://api.spotify.com/v1/search?q=${album}&type=album`, {
    method: "GET",
    headers: {
        Authorization: `Bearer ${authToken}`
  }
})
.then(response => response.json())
.then((data) => {
    var name = data.albums.items[0].name
    var link = data.albums.items[0].external_urls.spotify
    var artist = data.albums.items[0].artists[0].name
    var cover = data.albums.items[0].images[0].url

    var download = "https://api.fabian.lol//download.php?url=" + cover.substring(cover.lastIndexOf('/') + 1) + "&name=" + name

    document.querySelector(".name").innerHTML = `<h2>${artist} - ${name}</h2>
    <a href="${download}" class="btn btn-small btn-primary"><i class="fas fa-download"></i> Download</a>
    <a href="${link}" target="_blank" class="btn btn-small btn-spotify"><i class="fab fa-spotify"></i> Open on Spotify</a>`;
    document.querySelector(".image").innerHTML = `<img src="${cover}" alt="">`;

})
};


document.querySelector('#albumSearchInput').addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        const input = document.querySelector('#albumSearchInput').value;
    searchAlbum(input)       
    }
});
