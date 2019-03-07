import Logger from '../service/logger';

class Audio {

  /**
   * This class is for Audio operations. It works with Player
   *
   * @class Audio
   * @constructor
   */
  constructor() {
    Logger.addLog('Audio', 'create', 'Audio class initialized');
  }

  /**
   * Changes audio tracks with given order. It enables given index and disables other audio elements
   * Based on HTML5 video element audioTracks
   *
   * @param {Number} order - Language order to change
   * @method changeAudioWithOrder
   * @for Audio
   * @return {Boolean}
   */
  changeAudioWithOrder(order) {
    const audioTracks = this.videoElement.audioTracks;
    if (!audioTracks || !audioTracks.length) return false;
    for (let i = 0; i < audioTracks.length; i += 1) {
      if (order === i) {
        audioTracks[i].enabled = true;
        this.Events.triggerEvent('player_currentAudio', [i]);
      } else {
        audioTracks[i].enabled = false;
      }
    }
  }

  /**
   * It returns current audio order. It checks which audioTrack is enabled
   * Usefull for UI to understand which language is available
   * TODO It must return object. If video metadata is correct it returns language unicode and name
   *
   * @method getCurrentAudioWithOrder
   * @for Audio
   * @return {Number} order - It returns current audio index
   *
   */
  getCurrentAudioWithOrder() {
    const audioTracks = this.videoElement.audioTracks;
    if (typeof audioTracks !== 'undefined' && audioTracks.length > 0) {
      for (let i = 0; i < audioTracks.length; i += 1) {
        if (audioTracks[i].enabled) {
          this.Events.triggerEvent('player_currentAudio', [i]);
          this.videoElement.currentAudioElement = audioTracks[i];
          return i;
        }
      }
    } else {
      Logger.addLog('Audio', 'info', 'There is no multiple audio content');
    }
  }

}

export default Audio;
