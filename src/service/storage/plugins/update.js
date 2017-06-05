function updatePlugin() {
  /**
   *
   * @param _
   * @param key
   * @param optDefaultVal
   * @param updateFn
   */
  function update(_, key, optDefaultVal, updateFn) {
    if (arguments.length === 3) {
      updateFn = optDefaultVal;
      optDefaultVal = undefined;
    }
    const val = this.get(key, optDefaultVal);
    const retVal = updateFn(val);
    this.set(key, retVal !== undefined ? retVal : val);
  }

  return {
    update
  };

}

export default updatePlugin;
