import SongsController from "./Controllers/SongsController.js";
import PlaylistsController from "./Controllers/PlaylistsController.js"

class App {
  songsController = new SongsController();

  playlistsController = new PlaylistsController()
}

window["app"] = new App();
