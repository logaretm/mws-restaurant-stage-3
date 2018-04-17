module.exports = {

/**
 * @description optionall copies a prop to the target from the source.
 */
  addProp(prop, target, source) {
    if (source && source[prop]) {
      target[prop] = Casts.boolean(source[prop]);
    }

    return target;
  }
};
