import Logger from '../service/logger';

class Subtitle {
  /**
   * This class is for Subtitle operations. It works with Player
   *
   * @class Subtitle
   * @constructor
   */
  constructor(srt, Player, target) {
    this.Player = Player;
    this.srt = srt;
    this.target = document.querySelector(target);
    Logger.addLog('Player - Subtitle', 'create', 'Subtitle initialization started', this);
    this.setSRT(srt);
    this.Player.Events.addListener('player_onTimeUpdate', function () { this.tick(); });
    this.Player.Events.addListener('player_onEnded', function () { this.target.innerText = ''; });
  }

  /**
   * Set SRT subtitles
   *
   * example: https://www.npmjs.com/package/subtitles-parser
   * example: https://raw.githubusercontent.com/bazh/subtitles-parser/master/index.js
   * license: MIT
   *
   * @param {String} subtitles
   */
  setSRT(srt) {
    /**
     * Time to miliseconds
     *
     * @param {String} time value
     * @return {Number} miliseconds
     */
    const timeMs = function (val) {
      const regex = /(\d+):(\d{2}):(\d{2}),(\d{3})/;
      const parts = regex.exec(val);

      if (parts === null) {
        return 0;
      }

      for (let i = 1; i < 5; i++) {
        parts[i] = parseInt(parts[i], 10);
        if (isNaN(parts[i])) parts[i] = 0;
      }

      // hours + minutes + seconds + ms
      return parts[1] * 3600000 + parts[2] * 60000 + parts[3] * 1000 + parts[4];
    };

    /**
     * From Srt parser
     *
     * @param {String} data srt data
     * @param {Boolean} ms true = use miliseconds
     * @return {Object} items [{{String} id,
         * {String} startTime,
         * {String} endTime,
         * {String} text }]
     *
     */
    const fromSrt = function (data, ms) {
      const useMs = !!ms;

      data = data.replace(/\r/g, '');
      const regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
      data = data.split(regex);
      data.shift();

      const items = [];
      for (let i = 0; i < data.length; i += 4) {
        items.push({
          id: data[i].trim(), // {String}
          startTime: useMs ? timeMs(data[i + 1].trim()) : data[i + 1].trim(), // {String}
          endTime: useMs ? timeMs(data[i + 2].trim()) : data[i + 2].trim(), // {String}
          text: data[i + 3].trim() // {String}
        });
      }

      return items;
    };

    // RUN
    // this.subs = {};
    if (srt) {
      // var items = fromSrt(srt, true);
      this.subs = fromSrt(srt, true);
      this.setCurrentSubtitle();
    }

  }

  setCurrentSubtitle() {
    for (let i = 0; i < this.subs.length; i++) {
      // this.subs[items[i].startTime] = items[i];
      if (this.subs[i].startTime > Math.trunc(this.Player.videoElement.currentTime)) {
        this.currentSubIndex = i;
        this.currentSub = this.subs[i];
        break;
      }
    }
  }

  /**
   * Internal player timer
   * @private
   */
  tick() {
    if (this.Player.playerInfo.subtitleEnabled && this.Player.playerInfo.currentState === 'Playing') {
      if (typeof this.currentSub !== 'undefined') {
        if (Math.trunc(this.Player.videoElement.currentTime * 1000) > this.currentSub.startTime && Math.trunc(this.Player.videoElement.currentTime * 1000) < this.currentSub.endTime) {
          Logger.addLog('Subtitle TEXT', 'info', this.currentSub.text);
          this.target.innerText = this.currentSub.text;
        } else if (Math.trunc(this.Player.videoElement.currentTime * 1000) > this.currentSub.endTime) {
          this.currentSubIndex += 1;
          this.currentSub = this.subs[this.currentSubIndex];
          this.target.innerText = '';
          Logger.addLog('Subtitle  TEXT', 'info', 'EMPTY SUB');
        }
      }
    }
  }


}

export default Subtitle;
