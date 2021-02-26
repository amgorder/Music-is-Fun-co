import playlistService from "../Services/PlaylistsService.js";
import {ProxyState} from "../AppState.js"
import {sandBoxApi} from '../Services/AxiosService.js'
import Song from "../Models/Song.js";

//Private
/**Draws the Search results to the page */
function _drawPlaylist() {
  let playlist = ProxyState.playlist
  let template = ""

  playlist.forEach(s => template += s.playlistTemplate)

  document.getElementById("playlist").innerHTML = template;
 }

//Public
export default class PlaylistsController {
  constructor() {
    ProxyState.on("playlist", _drawPlaylist)
    //TODO Don't forget to register your listeners and get your data
    _drawPlaylist()
  }

  /**Takes in the form submission event and sends the query to the service */
  

  /**
   * Takes in a song id and sends it to the service in order to add it to the users playlist
   * @param {string} id
   */
  addSong(id) { 
    playlistService.addSong(id)
  }

  setActiveSong(trackName) {
      playlistService.setActiveSong(trackName)
  }

  /**
   * Takes in a song id to be removed from the users playlist and sends it to the server
   * @param {string} id
   */
  removeSong(id) {
      playlistService.removeSong(id)
   }
}
