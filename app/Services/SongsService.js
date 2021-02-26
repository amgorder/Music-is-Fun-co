import { ProxyState } from "../AppState.js";
import Song from "../Models/Song.js";
import { sandBoxApi } from "./AxiosService.js";

class SongsService {
  /**
   * Takes in a search query and retrieves the results that will be put in the store
   * @param {string} query
   */
  getMusicByQuery(query) {
    //NOTE You will not need to change this method
    let url = "https://itunes.apple.com/search?callback=?&term=" + query;
    // @ts-ignore
    $.getJSON(url)
      .then(res => {
        ProxyState.songs = res.results.map(rawData => new Song(rawData));
        console.log(res.results)
      })
      .catch(err => {
        throw new Error(err);
      });
  }

  /**
   * Retrieves the saved list of songs from the sandbox
   */
  async getMySongs() {
    //TODO What are you going to do with this result
  }

  setActiveSong(trackId) {
    console.log(trackId)
    let currentTrack = ProxyState.songs.find(s => s._id == trackId)
    console.log("Current track:",currentTrack)
    if(!currentTrack) {
      return;
    }
    ProxyState.activeSong = new Song(currentTrack)

  }

  /**
   * Takes in a song id and sends it from the search results to the sandbox to be saved.
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  async addSong(id) {
    //TODO you only have an id, you will need to find it in the store before you can post it
    //TODO After posting it what should you do?

    console.log(ProxyState.activeSong._id)
    
    try {
      delete ProxyState.activeSong._id
      let res = await sandBoxApi.post("",ProxyState.activeSong)
      console.log(res)
      
      ProxyState.playlist = [...ProxyState.playlist, new Song(res.data)]
      
      console.log("hey")
    }catch(err) {
      console.error(err)
    }
  }

  /**
   * Sends a delete request to the sandbox to remove a song from the playlist
   * Afterwords it will update the store to reflect saved info
   * @param {string} id
   */
  removeSong(id) {
    //TODO Send the id to be deleted from the server then update the store
  }
}

const service = new SongsService();
export default service;
