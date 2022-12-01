/* ************************************************************************************************
 *                                                                                                *
 * Please read the following tutorial before implementing tasks:                                   *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Object_initializer *
 * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object        *
 *                                                                                                *
 ************************************************************************************************ */


/**
 * Returns the rectangle object with width and height parameters and getArea() method
 *
 * @param {number} width
 * @param {number} height
 * @return {Object}
 *
 * @example
 *    const r = new Rectangle(10,20);
 *    console.log(r.width);       // => 10
 *    console.log(r.height);      // => 20
 *    console.log(r.getArea());   // => 200
 */
function Rectangle(width, height) {
  this.height = height;
  this.width = width;
  this.getArea = function getArea() {
    return this.height * this.width;
  };
}


/**
 * Returns the JSON representation of specified object
 *
 * @param {object} obj
 * @return {string}
 *
 * @example
 *    [1,2,3]   =>  '[1,2,3]'
 *    { width: 10, height : 20 } => '{"height":10,"width":20}'
 */
function getJSON(obj) {
  return JSON.stringify(obj);
}


/**
 * Returns the object of specified type from JSON representation
 *
 * @param {Object} proto
 * @param {string} json
 * @return {object}
 *
 * @example
 *    const r = fromJSON(Circle.prototype, '{"radius":10}');
 *
 */
function fromJSON(proto, json) {
  const object = Object.create(proto);
  const data = JSON.parse(json);
  Object.keys(data).forEach((el) => {
    object[el] = data[el];
  });
  return object;
}


/**
 * Css selectors builder
 *
 * Each complex selector can consists of type, id, class, attribute, pseudo-class
 * and pseudo-element selectors:
 *
 *    element#id.class[attr]:pseudoClass::pseudoElement
 *              \----/\----/\----------/
 *              Can be several occurrences
 *
 * All types of selectors can be combined using the combination ' ','+','~','>' .
 *
 * The task is to design a single class, independent classes or classes hierarchy
 * and implement the functionality to build the css selectors using the provided cssSelectorBuilder.
 * Each selector should have the stringify() method to output the string representation
 * according to css specification.
 *
 * Provided cssSelectorBuilder should be used as facade only to create your own classes,
 * for example the first method of cssSelectorBuilder can be like this:
 *   element: function(value) {
 *       return new MySuperBaseElementSelector(...)...
 *   },
 *
 * The design of class(es) is totally up to you, but try to make it as simple,
 * clear and readable as possible.
 *
 * @example
 *
 *  const builder = cssSelectorBuilder;
 *
 *  builder.id('main').class('container').class('editable').stringify()
 *    => '#main.container.editable'
 *
 *  builder.element('a').attr('href$=".png"').pseudoClass('focus').stringify()
 *    => 'a[href$=".png"]:focus'
 *
 *  builder.combine(
 *      builder.element('div').id('main').class('container').class('draggable'),
 *      '+',
 *      builder.combine(
 *          builder.element('table').id('data'),
 *          '~',
 *           builder.combine(
 *               builder.element('tr').pseudoClass('nth-of-type(even)'),
 *               ' ',
 *               builder.element('td').pseudoClass('nth-of-type(even)')
 *           )
 *      )
 *  ).stringify()
 *    => 'div#main.container.draggable + table#data ~ tr:nth-of-type(even)   td:nth-of-type(even)'
 *
 *  For more examples see unit tests.
 */

const cssSelectorBuilder = {
  str: '',
  element(value) {
    this.error(1);
    const obj = { ...cssSelectorBuilder };
    obj.i = 1;
    obj.str = this.str + value;
    return obj;
  },
  id(value) {
    this.error(2);
    const obj = { ...cssSelectorBuilder };
    obj.i = 2;
    obj.str = `${this.str}#${value}`;
    return obj;
  },
  class(value) {
    this.error(3);
    const obj = { ...cssSelectorBuilder };
    obj.i = 3;
    obj.str = `${this.str}.${value}`;
    return obj;
  },
  attr(value) {
    this.error(4);
    const obj = { ...cssSelectorBuilder };
    obj.i = 4;
    obj.str = `${this.str}[${value}]`;
    return obj;
  },
  pseudoClass(value) {
    this.error(5);
    const obj = { ...cssSelectorBuilder };
    obj.i = 5;
    obj.str = `${this.str}:${value}`;
    return obj;
  },
  pseudoElement(value) {
    this.error(6);
    const obj = { ...cssSelectorBuilder };
    obj.i = 6;
    obj.str = `${this.str}::${value}`;
    return obj;
  },
  combine(a, combinator, b) {
    const obj = { ...cssSelectorBuilder };
    obj.str = `${a.stringify()} ${combinator} ${b.stringify()}`;
    return obj;
  },
  stringify() {
    const { str } = this;
    this.str = '';
    return str;
  },
  error(num) {
    if (this.i > num) throw new Error('Selector parts should be arranged in the following order: element, id, class, attribute, pseudo-class, pseudo-element');
    if (this.i === num && (num === 1 || num === 2 || num === 6)) throw new Error('Element, id and pseudo-element should not occur more then one time inside the selector');
  },
};


module.exports = {
  Rectangle,
  getJSON,
  fromJSON,
  cssSelectorBuilder,
};
