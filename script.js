console.log("lets write js ");

function formatTime(seconds) {
  // const mins = Math.floor(seconds / 60);
  // const secs = seconds % 60;
  // Pad seconds with leading zero if less than 10
  // const formattedSecs = secs < 10 ? `0${secs}` : secs;
  // return `${mins}:${formattedSecs}`;
  seconds = Math.floor(seconds); // Remove decimal part
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  const formattedSecs = secs < 10 ? `0${secs}` : secs;
  return `${mins}:${formattedSecs}`;
}

async function getSongs() {
  let res = fetch("https://music-app-backend-production-1dd4.up.railway.app/api/songs")
    let songs = await res.json();
    return songs;

}

let songs = getSongs();

const PlayMusic = (track) => {
  // let audio = new Audio("/Songs/" + track)
 currentSong.src = `https://music-app-backend-production-1dd4.up.railway.app/songs/${encodeURIComponent(track)}`
  currentSong.play();
  play.src = "pauseicon/pause.png";
  document.querySelector(".songinfo").innerHTML = decodeURIComponent(track);
  document.querySelector(".songtime").innerHTML = "00:00/00:00";
};
let currentSong = new Audio();


async function main() {
  // gets the list of all songs
  songs = await getSongs();
  console.log(songs);

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li> <img src="music.svg/music-svgrepo-com.svg" alt="">
    <div class="info">

        <div>${decodeURIComponent(song.replaceAll("%20", " "))}</div>
        <div></div>
    </div>
    <div class="playnow">
        <span>Play Now</span>
        <img src="playnow.svg/play-circle-svgrepo-com.svg" alt="" class="invert">
    </div>
</li>`;
  }

  // attach an event listener to each song
  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      PlayMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  // attach an event listener to play next and previous
  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pauseicon/pause.png";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  // listen for timeupdate event
  currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${formatTime(
      currentSong.currentTime
    )}/${formatTime(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });
  // Add an event listener to seekbar
  document.querySelector(".seekbar").addEventListener("click", (e) => {
    let percent = (e.offsetX / e.target.getBoundingClientRect().width) * 100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = (currentSong.duration * percent) / 100;
  });

  // Add an event listener for hamburger
  document.querySelector(".hamburger").addEventListener("click", () => {
    document.querySelector(".left").style.left = "0";
    document.querySelector(".left").style.heigt = "100vh";
    document.querySelector(".footer").style.display = "none";
document.querySelector(".left").style.display = "fixed";


  });

  // Add an event listener for hamburger 
  document.querySelector(".cross").addEventListener("click", ()=>{
    document.querySelector(".left").style.left = "-100%"

  } )

  //  play the  first song
  // var audio = new Audio(songs[0]);
  // audio.play();

  audio.addEventListener("loadeddata", () => {
    let duration = audio.duration;
    console.log(duration);
  });
}

// Add event listner to previous
previous.addEventListener("click", () =>{
  console.log("previous clicked")
  console.log(currentSong.src)
  console.log(songs)
  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
  if((index-1)>=0) {
    PlayMusic(songs[index-1])

  }


})


// Add event listener for next
next.addEventListener("click",()=>{
  console.log("next clicked")
  currentSong.pause()

  let index = songs.indexOf(currentSong.src.split("/").slice(-1)[0])
  if((index+1) < songs.length) {
    PlayMusic(songs[index+1])

  }




} )


main();


