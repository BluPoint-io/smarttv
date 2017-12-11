export default class Keyboard {
  constructor(Events, currentDevice) {
    console.log('Keyboard İnitialized', Events, currentDevice);
    this.Events = Events;
    this.currentDevice = currentDevice;
    this.keyList = {
      left: 37,
      up: 38,
      right: 39,
      down: 40,
      enter: 13
    };

    this.attachKeyListeners();
  }

  attachKeyListeners() {
    window.addEventListener('keydown', (e) => {
      switch (e.keyCode) {
        case this.keyList.left:
          this.Events.triggerEvent('keyDown', ['left']);
          break;
        case this.keyList.up:
          this.Events.triggerEvent('keyDown', ['up']);
          break;
        case this.keyList.down:
          this.Events.triggerEvent('keyDown', ['down']);
          break;
        case this.keyList.right:
          this.Events.triggerEvent('keyDown', ['right']);
          break;
        case this.keyList.enter:
          this.Events.triggerEvent('keyDown', ['enter']);
          break;
        default:
          this.Events.triggerEvent('keyDown', [e.keyCode]);
          break;
      }
    });
  }

}
