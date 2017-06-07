/**
 * Class representing Logger
 * @class Logger
 */
class Logger {

  /**
   * addLog stands for console log it have to show console logs on TV Screen
   * TODO Design and create screens for console on real devices
   * TODO Implement real device logger system
   * @param from - Where triggered this log function
   * @param type - Type of log (info, error, create, progress, default)
   * @param message - Message of log
   * @param variable - Variable of log it can be Array, Object, string etc
   *
   * @method addLog
   * @static
   * @for Logger
   */
  static addLog(from, type, message, variable) {
    switch (type) {
      case 'create':
        console.log(`[${from}] %c -> { ${type} } \n\n ${message}${variable ? ' => ' : ''}`, 'color: #009b1c;', (variable || ''));
        break;
      case 'info':
        console.log(`[${from}] %c -> { ${type} } \n\n ${message}${variable ? ' => ' : ''}`, 'color: orange;', (variable || ''));
        break;
      case 'progress':
        console.log(`[${from}] %c -> { ${type} } \n\n ${message}${variable ? ' => ' : ''}`, 'color: #008adb;', (variable || ''));
        break;
      case 'error':
        console.log(`%c [${from}] -> { ${type} } \n\n ${message}${variable ? ' => ' : ''}`, 'color: red; font-weight: bold', (variable || ''));
        break;
      default:
        console.log(`[${from}] %c -> { ${type} } \n\n ${message}${variable ? ' => ' : ''}`, 'color: black;', (variable || ''));
    }
  }
}

export default Logger;
