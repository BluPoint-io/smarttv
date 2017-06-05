function defaultsPlugin() {
  let defaultValues = {};

  /**
   *
   * @param _
   * @param values
   */
  function defaults(_, values) {
    defaultValues = values;
  }

  /**
   *
   * @param superFn
   * @param key
   * @return {*}
   */
  function get(superFn, key) {
    const val = superFn();
    return (val !== undefined ? val : defaultValues[key]);
  }

  return {
    defaults,
    get
  };

}

export default defaultsPlugin;
