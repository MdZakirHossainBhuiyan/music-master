// const searchSong = async() => {
//     const searchText = document.getElementById('search-field').value;
//     const url = `https://api.lyrics.ovh/suggest/${searchText}`;
//     const response = await fetch(url);
//     const data = await response.json();
//     displaySongs(data.data);
// }

const searchSong = () => {
    const searchText = document.getElementById('search-field').value;
    const url = `https://api.lyrics.ovh/suggest/${searchText}`;
    fetch(url)
    .then(response => response.json())
    .then(data => displaySongs(data.data))
    .catch(error => displayError('Something went wrong! Please try again later!'))
}

const displayError = error => {
    const errorTag = document.getElementById('error-text');
    errorTag.innerText = error;
}

const displaySongs = songs => {
    const songContainer = document.getElementById('song-container');
    songContainer.innerHTML = '';
    songs.forEach(song =>{
        const songDiv = document.createElement('div');
        songDiv.className = 'single-result row align-items-center my-3 p-3';
        songDiv.innerHTML = `
            <div class="col-md-9">
                <h3 class="lyrics-name">${song.title}</h3>
                <p class="author lead">Album by <span>${song.artist.name}</span></p>
                <audio controls>
                    <source src="${song.preview}" type="audio/ogg">
                </audio>
            </div>
            <div class="col-md-3 text-md-right text-center">
                <button onclick="getLyrics('${song.artist.name}', '${song.title}')" class="btn btn-success">Get Lyrics</button>
            </div>
        `;

        songContainer.appendChild(songDiv);
    })
}

const getLyrics = async(artist, title) => {
    const url = `https://api.lyrics.ovh/v1/${artist}/${title}`;

    try{
        const response = await fetch(url);
        const data = await response.json();
        displayLyric(data.lyrics);
    }
    catch{
        displayError('Something went wrong! Please try again later!');
    }
};

const displayLyric = lyric => {
    const lyricDiv = document.getElementById('display-lyric');
    lyricDiv.innerText = lyric;
}

