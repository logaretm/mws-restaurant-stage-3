module.exports = {
  /**
   * Casts a string value to boolean if its valid, used in string query params.
   *
   * @param {any} value The value to be casted.
   */
  boolean (value) {
    if (value === 'true' || value === 'false') {
      return value === 'true' ? true : false;
    }

    return value;
  }
}