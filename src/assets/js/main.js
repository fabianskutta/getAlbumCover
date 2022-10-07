import './../scss/main.scss';

const apiEndpoint = 'https://api.spotify.com/v1'
const authEndpoint = 'https://accounts.spotify.com/api/token'
const clientId = '3f974573800a4ff5b325de9795b8e603'
const clientSecret = 'ff188d2860ff44baa57acc79c121a3b9'

const authString = `${clientId}:${clientSecret}`
let authorization = btoa( authString )

const authToken = fetch( authEndpoint, {
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

    document.querySelector(".name").innerHTML = `<h2>${artist} - ${name}</h2><a href="${link}" target="_blank" class="btn btn-small btn-spotify"><i class="fab fa-spotify"></i> Open on Spotify</a>`;
    document.querySelector(".image").innerHTML = `<img src="${cover}" alt="">`;

})
};


document.querySelector('#albumSearchInput').addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        const input = document.querySelector('#albumSearchInput').value;
    searchAlbum(input)       
    }
});