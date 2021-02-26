import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class PlaylistService {

    constructor() {
        this.getMySongs()
    }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    try {
        const res = await sandBoxApi.get("")
        ProxyState.playlist = res.data.map(p => new Song(p))
        console.log(ProxyState.playlist)
    }catch(err) {
        console.error(err)
    }
  }

  setActiveSong(trackName) {
      
    console.log(trackName)
    let currentTrack = ProxyState.playlist.find(s => s.title == trackName)
    currentTrack.isOwned = true;
    console.log("Current track:",currentTrack)
    
    if(!currentTrack) {
      return;
    }
    ProxyState.activeSong = currentTrack

  }
  

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?

    // console.log(ProxyState.activeSong)
    // try {
    //   let res = await sandBoxApi.post("",ProxyState.activeSong)
    //   console.log(res)
      
    //   ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]
      
    //   console.log("hey")
    // }catch(err) {
    //   console.error(err)
    // }
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
    try {
        await sandBoxApi.delete(id)
        this.getMySongs()
        ProxyState.activeSong = null
    }catch(err) {
        console.error(err)
    }
  }
}

const playlistService = new PlaylistService();
export default playlistService;
