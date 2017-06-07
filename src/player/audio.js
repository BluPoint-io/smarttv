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
   */
  changeAudioWithOrder(order) {
    const _this = this;
    const audioTracks = _this.videoElement.audioTracks;
    if (typeof audioTracks !== 'undefined' && audioTracks.length > 0) {
      for (let i = 0; i < audioTracks.length; i += 1) {
        if (order === i) {
          audioTracks[i].enabled = true;
          _this.Events.triggerEvent('player_currentAudio', [i]);
        } else {
          audioTracks[i].enabled = false;
        }
      }
    }
  }

  /**
   * It returns current audio order. It checks which audioTrack is enabled
   * Usefull for UI to understand which language is available
   * TODO It must return object. If video metadata is correct it returns language unicode and name
   */
  getCurrentAudioWithOrder() {
    const _this = this;
    const audioTracks = _this.videoElement.audioTracks;
    if (typeof audioTracks !== 'undefined' && audioTracks.length > 0) {
      for (let i = 0; i < audioTracks.length; i += 1) {
        if (audioTracks[i].enabled) {
          _this.Events.triggerEvent('player_currentAudio', [i]);
          _this.videoElement.currentAudioElement = audioTracks[i];
          return i;
        }
      }
    } else {
      return Logger.addLog('Audio', 'info', 'There is no multiple audio content');
    }
  }

}

export default Audio;
