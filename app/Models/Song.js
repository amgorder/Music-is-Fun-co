export default class Song {
  constructor(data) {
    this.title = data.trackName || data.title;
    this.albumArt =
      data.albumArt || data.artworkUrl100.replace(/100x100/g, "300x300");
    this.artist = data.artistName || data.artist;
    this.album = data.collectionName || data.album;
    this.price = data.trackPrice || data.price;
    this.preview = data.previewUrl || data.preview;
    this._id = data.trackId || data._id || "";
    this.isOwned = data.isOwned
  }

  get Template() {
    return `
    <div class="card" onclick="app.songsController.setActiveSong('${this._id}')">
      <h2>${this.title}</h2>
    </div>
        `;
  }

  get playlistTemplate() {
    return `
    <div class="card" onclick="app.playlistsController.setActiveSong('${this.title}')">
    <h2>${this.title}</h2>
    </div>
        `;
  }

  get ButtonBuilder() {
    let template = ""
    if(!this.isOwned) {
      return `<button class="btn btn-lg btn-secondary position-absolute position-right" onclick="app.songsController.addSong(${this._id})">Add</button>`
    } else {
      return `<button class="btn btn-lg btn-primary position-absolute position-right" onclick="app.playlistsController.removeSong('${this._id}')">Remove</button>`
    }
  }
}
