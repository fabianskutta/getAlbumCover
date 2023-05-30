import './../scss/main.scss';

const apiEndpoint = 'https://api.spotify.com/v1'
const authEndpoint = 'https://accounts.spotify.com/api/token'
const clientId = '4bde22b2e6254e639b6dcefef2b346a7'
const clientSecret = `MWRmYWE1OGJhNmYzNDllMWI1MTZmNDBlYzcxMzA4OTc=`;

const authString = `${clientId}:${atob(clientSecret)}`
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
    if (!data.albums.items.length == 0) {
    var name = data.albums.items[0].name
    var link = data.albums.items[0].external_urls.spotify
    var artist = data.albums.items[0].artists[0].name
    var cover = data.albums.items[0].images[0].url
    document.getElementById("albumSearchInput").style.setProperty('background-color', 'rgba(255, 255, 255, 0.102)');
    } else {
        var name = "not found"
    var link = "https://open.spotify.com/album/1DfRPvrLW4rxw1YyUIjX6r"
    var artist = "jousai"
    var cover = "https://i.scdn.co/image/ab67616d0000b2734d312ee39b486548dff9fd4b"
    document.getElementById("albumSearchInput").style.setProperty('background-color', 'rgba(255, 0, 0, 0.3)');
    }

    var download = "https://api.fabian.lol/download.php?url=" + cover.substring(cover.lastIndexOf('/') + 1) + "&name=" + name

    document.querySelector(".name").innerHTML = `<div class="name-h2"><h2>${artist} - ${name}</h2></div>
    <div class="name-btns"><a href="${download}" class="btn btn-small btn-primary"><i class="fas fa-download"></i> Download</a>
    <a href="${link}" target="_blank" class="btn btn-small btn-spotify"><i class="fab fa-spotify"></i> Open on Spotify</a></div>`;
    document.querySelector(".image").innerHTML = `<img id="spotifyCover" src="${cover}" crossOrigin="anonymous" alt="">`;
    setTimeout(function(){
        var rgb = getAverageRGB(document.getElementById('spotifyCover'));
        document.getElementsByTagName( 'html' )[0].style.setProperty('--accent2', 'rgb('+rgb.r+','+rgb.g+','+rgb.b+','+0.30+')');
    }, 200);
})
};


document.querySelector('#albumSearchInput').addEventListener('keydown', (event) => {
    if(event.key === 'Enter') {
        const input = document.querySelector('#albumSearchInput').value;
    searchAlbum(input)       
    }
});

let container = document.querySelector(".hero");
    container.addEventListener("animationend", changePosition, true);

    function changePosition(event) {
      let circle = event.target;

      circle.style.animationName = "none";
      var width = (window.innerWidth > 0) ? window.innerWidth : screen.width;
      
      requestAnimationFrame(() => {
        circle.style.animationName = "";
      });

      let circleStyle = getComputedStyle(circle);
      let finalX = circleStyle.getPropertyValue("--xB");
      let finalY = circleStyle.getPropertyValue("--yB");

      circle.style.setProperty("--xA", finalX);
      circle.style.setProperty("--yA", finalY);

      circle.style.setProperty("--xB", getRandomNumber(-100, width) + "px");
      circle.style.setProperty("--yB", getRandomNumber(-300, 200) + "px");
    }

    function getRandomNumber(low, high) {
      let r = Math.floor(Math.random() * (high - low + 1)) + low;
      return r;
    }






    function getAverageRGB(imgEl) {

        var blockSize = 5, // only visit every 5 pixels
            defaultRGB = {r:249,g:6,b:59}, // for non-supporting envs
            canvas = document.createElement('canvas'),
            context = canvas.getContext && canvas.getContext('2d'),
            data, width, height,
            i = -4,
            length,
            rgb = {r:0,g:0,b:0},
            count = 0;
            
        if (!context) {
            return defaultRGB;
        }
        
        height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
        width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;
        
        context.drawImage(imgEl, 0, 0);
        
        try {
            data = context.getImageData(0, 0, width, height);
        } catch(e) {
            return defaultRGB;
        }
        
        length = data.data.length;
        
        while ( (i += blockSize * 4) < length ) {
            ++count;
            rgb.r += data.data[i];
            rgb.g += data.data[i+1];
            rgb.b += data.data[i+2];
        }
        
        // ~~ used to floor values
        rgb.r = ~~(rgb.r/count);
        rgb.g = ~~(rgb.g/count);
        rgb.b = ~~(rgb.b/count);
        
        return rgb;
        
        }
        