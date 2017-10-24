import axios from 'axios';

class Network {
  constructor() {
    this.isOnline = navigator.onLine;
    this.setNetworkListener();
    this.request = axios;
    this.axios = this.request;
  }

  setNetworkListener() {
    window.addEventListener('online', this.updateNetworkStatus.bind(this));
    window.addEventListener('offline', this.updateNetworkStatus.bind(this));
  }

  updateNetworkStatus() {
    this.isOnline = navigator.onLine;
  }

}

export default Network;
