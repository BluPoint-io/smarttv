import Recognizer from 'smarttv-device-recognizer';

export default class Keyboard {
  constructor(Events, currentDevice) {this.Events = Events;
    this.currentDevice = currentDevice;
    this.keyList = Recognizer.getKeyCodes(currentDevice.brandName);
    this.attachKeyListeners();
  }

  attachKeyListeners() {
    window.addEventListener('keydown', (e) => {
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
        default:
          this.Events.triggerEvent('keyDown', [e.keyCode]);
          break;
      }
    });
  }

}
