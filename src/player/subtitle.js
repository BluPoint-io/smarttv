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
      let parts = regex.exec(val);

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
     * 							{String} startTime,
     * 							{String} endTime,
     * 							{String} text }]
     *
     */
    const fromSrt = function (data, ms) {
      let useMs = ms ? true : false;

      data = data.replace(/\r/g, '');
      const regex = /(\d+)\n(\d{2}:\d{2}:\d{2},\d{3}) --> (\d{2}:\d{2}:\d{2},\d{3})/g;
      data = data.split(regex);
      data.shift();

      let items = [];
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
    const { tizen, webapis, arSmartTV } = window;
    let ct;
    for (let i = 0; i < this.subs.length; i += 1) {
      if (tizen && webapis) {
        ct = webapis.avplay.getCurrentTime();
      } else if (arSmartTV) {
        ct = this.Player.objectPlayer.playPosition;
      } else {
        ct = this.Player.videoElement.currentTime * 1000;
      }
      if (this.subs[i].startTime > Math.trunc(ct)) {
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
        const { tizen, webapis, arSmartTV } = window;
        let cts;
        if (tizen && webapis) {
          cts = webapis.avplay.getCurrentTime();
        } else if (arSmartTV) {
          cts = this.Player.objectPlayer.playPosition;
        } else {
          cts = this.Player.videoElement.currentTime * 1000;
        }
        if (Math.trunc(cts) > this.currentSub.startTime && Math.trunc(cts) < this.currentSub.endTime) {
          this.target.style.opacity = 1;
          this.target.innerText = this.currentSub.text;
        } else if (Math.trunc(cts) > this.currentSub.endTime) {
          this.target.innerText = '';
          this.target.style.opacity = 0;
          this.currentSubIndex += 1;
          this.currentSub = this.subs[this.currentSubIndex];
        }
      }
    }
  }


}

export default Subtitle;
