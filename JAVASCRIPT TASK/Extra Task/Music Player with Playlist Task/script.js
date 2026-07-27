
const playlist = [
    {
        title: "Guitar Melody",
        artist: "SoundHelix",
        url: "https://codeskulptor-demos.commondatastorage.googleapis.com/GalaxyInvaders/theme_01.mp3",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300"
    },
    {
        title: "Piano Vibe",
        artist: "Robert Miles",
        url: "https://codeskulptor-demos.commondatastorage.googleapis.com/pang/paza-moduless.mp3",
        image: "https://images.unsplash.com/photo-1520523839897-bd0b52f945a0?w=300"
    },
    {
        title: "Relaxing Music",
        artist: "Hans Zimmer",
        url: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Kangaroo_MusiQue_-_The_Neverwritten_Role_Playing_Game.mp3",
        image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300"
    },
    {
        title: "Epic Adventure",
        artist: "Epic Music",
        url: "https://commondatastorage.googleapis.com/codeskulptor-demos/DDR_assets/Sevish_-__nbsp_.mp3",
        image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300"
    }

];

// all variables
const audio = document.getElementById('my-audio');
const songTitle = document.getElementById('song-title');
const songArtist = document.getElementById('song-artist');
const songImage = document.getElementById('song-image');

const playPauseButton = document.getElementById('play-pause-button');
const stopButton = document.getElementById('stop-button');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const shuffleButton = document.getElementById('shuffle-button');

const addTitleInput = document.getElementById('add-title');
const addArtistInput = document.getElementById('add-artist');
const addUrlInput = document.getElementById('add-url');
const addImageInput = document.getElementById('add-image');
const addSongButton = document.getElementById('add-song-button');

const playlistView = document.getElementById('playlistView');

let currentIndex = 0;

// Audio Events
audio.onplay = function () {
    playPauseButton.innerText = "Pause";
    console.log("Playing song");
};

audio.onpause = function () {
    playPauseButton.innerText = "Play";
    console.log("Paused song");
};

audio.onended = async function () {
    await nextSong(); // Auto play next when finished
};

// Load Song by Index
async function loadSong(index) {
    if (playlist.length === 0) return;
    currentIndex = index;

    const song = playlist[currentIndex];
    songTitle.innerText = song.title;
    songArtist.innerText = song.artist;
    songImage.src = song.image;
    audio.src = song.url;

    await playSong();
    await showPlaylist();
}


async function playSong() {
    if (playlist.length > 0) {
        audio.play();

    }
}

async function pauseSong() {
    audio.pause();
}


async function playPauseSong() {
    if (audio.paused) {
        await playSong();
        playPauseButton.innerText = "Pause";
    } else {
        await pauseSong();
        playPauseButton.innerText = "Play";
    }
}

async function stopSong() {
    audio.pause();
    audio.currentTime = 0;
}

async function nextSong() {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex + 1) % playlist.length;
    await loadSong(currentIndex);
    await playSong();
}

async function prevSong() {
    if (playlist.length === 0) return;
    currentIndex = (currentIndex - 1 + playlist.length) % playlist.length;
    await loadSong(currentIndex);
    await playSong();
}

// shuffle playlist
async function shuffleSongs() {
    if (playlist.length <= 1) return;
    for (let i = 0; i < playlist.length; i++) {
        const rand = Math.floor(Math.random() * playlist.length);
        const temp = playlist[i];
        playlist[i] = playlist[rand];
        playlist[rand] = temp;
    }
    await loadSong(0);
    await playSong();
}

async function showPlaylist() {
    playlistView.innerHTML = '';

    playlist.forEach((song, i) => {


        const activeClass = (i === currentIndex) ? 'active-song' : '';

        const li = document.createElement('li');
        li.className = activeClass;

        const span = document.createElement('span');

        span.innerText = `${i + 1}. ${song.title} - ${song.artist}`;

        const div = document.createElement('div');

        const selectBtn = document.createElement('button');

        selectBtn.innerText = 'Play';
        selectBtn.addEventListener('click', async function () {
            await loadSong(i);
            await playSong();
        });

        const removeBtn = document.createElement('button');

        removeBtn.innerText = 'Remove';
        removeBtn.addEventListener('click', async function () {
            await removeSong(i);
        });

        div.appendChild(selectBtn);
        div.appendChild(removeBtn);
        li.appendChild(span);
        li.appendChild(div);

        playlistView.appendChild(li);
    });
}

async function removeSong(index) {
    if (!confirm("Are you sure you want to remove this song?")) {
        return;
    }

    const playingRemovedSong = (index === currentIndex);

    playlist.splice(index, 1);

    if (playlist.length === 0) {
        await stopSong();
        songTitle.innerText = "No Song Playing";
        songArtist.innerText = "";
        songImage.src = "";
        audio.src = "";
        showPlaylist();
    } else {
        // remove prev song so decress currentindex by 1.
        if (index < currentIndex) {
            currentIndex--;
        }


        if (playingRemovedSong) {
            // if removed last song, play first song
            if (currentIndex >= playlist.length) {
                currentIndex = 0;
            }
            await loadSong(currentIndex);
        } else {
            await showPlaylist();
        }
    }
}

async function addSong() {
    const title = addTitleInput.value.trim();
    const artist = addArtistInput.value.trim();
    const url = addUrlInput.value.trim();
    const image = addImageInput.value.trim();

    if (!title || !artist || !url) {
        alert('Please fill in Title, Artist, and Audio URL!');
        return;
    }

    playlist.push({
        title: title,
        artist: artist,
        url: url,
        image: image
    });

    addTitleInput.value = '';
    addArtistInput.value = '';
    addUrlInput.value = '';
    addImageInput.value = '';

    await showPlaylist();
}

// Event listeners all
playPauseButton.addEventListener('click', playPauseSong);
stopButton.addEventListener('click', stopSong);
prevButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
shuffleButton.addEventListener('click', shuffleSongs);
addSongButton.addEventListener('click', addSong);

// Initial Load
document.addEventListener('DOMContentLoaded', async function () {
    await loadSong(0);
});
