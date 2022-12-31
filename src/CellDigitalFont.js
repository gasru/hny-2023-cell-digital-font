class CellDigitalFont {
  /**
   * @param {globalThis.SpreadsheetApp.Sheet} sheet
   */
  constructor(sheet, x = 1, y = 1, color = 'black') {
    this.sheet = sheet;
    this.printRanges = [];
    this.x = x;
    this.y = y;
    this.color = color;
  }
  0() {
    const mask = [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ];
    return this._printCharRange(mask);
  }
  2() {
    const mask = [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 0, 1, 0],
      [0, 1, 0, 0],
      [1, 0, 0, 0],
      [1, 1, 1, 1],
    ];
    return this._printCharRange(mask);
  }
  3() {
    const mask = [
      [0, 1, 1, 0],
      [1, 0, 0, 1],
      [0, 0, 0, 1],
      [0, 1, 1, 0],
      [0, 0, 0, 1],
      [1, 0, 0, 1],
      [0, 1, 1, 0],
    ];
    return this._printCharRange(mask);
  }
  /**
   * @see {@link https://apps-script-snippets.contributor.pw/snippets/common_js/column_names_and_numbers/#numbers-to-column-name}
   *
   * @param {number} number Positive integer. A column number
   * @returns {string} The column name
   */
  _base26ABCfrom10(number) {
    let num = number;
    let sfx = '';
    while (num > 0) {
      const cd = (num - 1) % 26;
      sfx = String.fromCharCode(65 + cd) + sfx;
      num = Math.floor((num - cd) / 26);
    }
    return sfx;
  }
  /**
   *
   * @param {number[][]} mask
   * @returns {Coordinates}
   */
  _printCharRange(mask) {
    const printRanges = this._getPrintRange(mask, this.x, this.y);
    this.printRanges.push(...printRanges);
    return { x: mask[0].length, y: mask.length };
  }
  /**
   *
   * @param {number[][]} mask
   * @param {number} x
   * @param {number} y
   * @returns {string[]}
   */
  _getPrintRange(mask, x, y) {
    return mask
      .map((row, i) => row.map((cell, j) => (cell ? this._base26ABCfrom10(x + j) + (y + i) : '')))
      .flat()
      .filter((range) => range);
  }
  print() {
    this.sheet.getRangeList(this.printRanges).setBackground(this.color);
  }
  /**
   * @param {string} text
   */
  printLine(text) {
    String(text)
      .split('')
      .forEach((char) => {
        if (this['' + char]) {
          const pos = this['' + char]();
          this.x += 1 + pos.x;
        }
      });
    this.print();
  }
}
