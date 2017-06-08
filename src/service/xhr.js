/**
 * Class representing Xhr
 * @class Xhr
 * @constructor
 * */
class Xhr {

  /**
   * getJSON of given url source with callbacks
   * @param {String} url
   * @param {Function} successHandler
   * @param {Function} errorHandler
   * @for Xhr
   * @method getJSON
   */
  public getJSON(url, successHandler, errorHandler) {
    let xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('get', url, true);
    xhr.onreadystatechange = function () {
      let status;
      let data;
      // https://xhr.spec.whatwg.org/#dom-xmlhttprequest-readystate
      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;
        if (status == 200) {
          data = JSON.parse(xhr.responseText);
          successHandler && successHandler(data);
        } else {
          errorHandler && errorHandler(status);
        }
      }
    };
    xhr.send();
  };

  /**
   * sendJSON of given url source with callbacks
   * @param {String} url
   * @param {Object} data
   * @param {Function} successHandler
   * @param {Function} errorHandler
   * @for Xhr
   * @method sendJSON
   */
  public sendJSON(url, data, successHandler, errorHandler){
    let xhr = typeof XMLHttpRequest != 'undefined'
      ? new XMLHttpRequest()
      : new ActiveXObject('Microsoft.XMLHTTP');
    xhr.open('post', url, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.onreadystatechange = function () {
      let status;
      if (xhr.readyState == 4) { // `DONE`
        status = xhr.status;
        if (status == 200) {
          successHandler && successHandler(JSON.parse(xhr.responseText));
        } else {
          errorHandler && errorHandler(status);
        }
      }
    };
    xhr.send(JSON.stringify(data));
  };

}

export default Xhr;
