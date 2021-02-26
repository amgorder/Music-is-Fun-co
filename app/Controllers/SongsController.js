import songService from "../Services/SongsService.js";
import {ProxyState} from "../AppState.js"

//Private
/**Draws the Search results to the page */
function _drawResults() {
  let songs = ProxyState.songs
  let template = ""

  songs.forEach(s => template += s.Template)

  document.getElementById("songs").innerHTML = template;
 }

 function _drawActiveSong() {
  let activeElem = document.getElementById("active")

  let template = ""
  let activeSong = ProxyState.activeSong
  if(activeSong != null) {
    template += /*html*/`
    <div class="text-center">
      <h4>Now playing...</h4>
      <div>
        <img src="${activeSong.albumArt}">
        ${activeSong.ButtonBuilder}
        </div>
        <h3>${activeSong.title}</h3>
      
      <p>Album: ${activeSong.album} | Buy now: $${activeSong.price}</p>
      <div>
      <audio controls>
      <source src="${activeSong.preview}" type="audio/mp3">
    </audio>
      </div>
      
    </div>
    `
  
    activeElem.innerHTML = template
  } else {
    activeElem.innerHTML = ""
  }
  
 }

/**Draws the Users saved songs to the page */
function _drawPlaylist() {

 }

//Public
export default class SongsController {
  constructor() {
    ProxyState.on("songs", _drawResults)
    ProxyState.on("activeSong", _drawActiveSong)
    //TODO Don't forget to register your listeners and get your data
    _drawResults()
  }

  /**Takes in the form submission event and sends the query to the service */
  search(e) {
    //NOTE You dont need to change this method
    e.preventDefault();
    try {
      songService.getMusicByQuery(e.target.query.value);
    } catch (error) {
      console.error(error);
    }
  }

  setActiveSong(trackId) {
    songService.setActiveSong(trackId)
  }

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) { 
    songService.addSong(id)
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) { }
}
