import Recognizer from 'smarttv-device-recognizer';

export default class Keyboard {
  constructor(Events, currentDevice) {
    this.Events = Events;
    this.currentDevice = currentDevice;
    this.keyList = Recognizer.getKeyCodes(currentDevice.brandName);
    this.attachKeyListeners();
  }

  attachKeyListeners() {
    window.addEventListener('keydown', (e) => {
      e.preventDefault();
      switch (e.keyCode) {
        case this.keyList.LEFT:
          this.Events.triggerEvent('keyDown', ['LEFT']);
          break;
        case this.keyList.UP:
          this.Events.triggerEvent('keyDown', ['UP']);
          break;
        case this.keyList.DOWN:
          this.Events.triggerEvent('keyDown', ['DOWN']);
          break;
        case this.keyList.RIGHT:
          this.Events.triggerEvent('keyDown', ['RIGHT']);
          break;
        case this.keyList.ENTER:
          this.Events.triggerEvent('keyDown', ['ENTER']);
          break;
        case this.keyList.RETURN:
          this.Events.triggerEvent('keyDown', ['BACK']);
          break;
        case this.keyList.GREEN:
          this.Events.triggerEvent('keyDown', ['GREEN']);
          break;
        case this.keyList.YELLOW:
          this.Events.triggerEvent('keyDown', ['YELLOW']);
          break;
        case this.keyList.BLUE:
          this.Events.triggerEvent('keyDown', ['BLUE']);
          break;
        case this.keyList.RED:
          this.Events.triggerEvent('keyDown', ['RED']);
          break;
        case this.keyList.PLAY:
          this.Events.triggerEvent('keyDown', ['PLAY']);
          break;
        case this.keyList.PAUSE:
          this.Events.triggerEvent('keyDown', ['PAUSE']);
          break;
        case this.keyList.STOP:
          this.Events.triggerEvent('keyDown', ['STOP']);
          break;
        case this.keyList.FF:
          this.Events.triggerEvent('keyDown', ['FF']);
          break;
        case this.keyList.ONE:
          this.Events.triggerEvent('keyDown', ['ONE']);
          break;
        case this.keyList.TWO:
          this.Events.triggerEvent('keyDown', ['TWO']);
          break;
        case this.keyList.THREE:
          this.Events.triggerEvent('keyDown', ['THREE']);
          break;
        case this.keyList.FOUR:
          this.Events.triggerEvent('keyDown', ['FOUR']);
          break;
        case this.keyList.FIVE:
          this.Events.triggerEvent('keyDown', ['FIVE']);
          break;
        case this.keyList.SIX:
          this.Events.triggerEvent('keyDown', ['SIX']);
          break;
        case this.keyList.SEVEN:
          this.Events.triggerEvent('keyDown', ['SEVEN']);
          break;
        case this.keyList.EIGHT:
          this.Events.triggerEvent('keyDown', ['EIGHT']);
          break;
        case this.keyList.NINE:
          this.Events.triggerEvent('keyDown', ['NINE']);
          break;
        default:
          this.Events.triggerEvent('keyDown', [e.keyCode]);
          break;
      }
    });
  }

}
