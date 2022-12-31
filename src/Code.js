/* global CellDigitalFont */

/**
 * Infinity picker of the Google brand color
 */
function* pickGoogleColor_() {
  const googleColors = ['#4285F4', '#DB4437', '#F4B400', '#0F9D58'];
  let id = 0;
  while (true) {
    if (id >= googleColors.length) id = 0;
    yield googleColors[id++];
  }
}

/**
 * Infinity picker of line function coordinates
 *
 * @param {Coordinates} start
 * @param {number} max
 */
function* pickCoordinates_(start = { x: 1, y: 1 }, max = 1) {
  const coord = { x: start.x, y: start.y };
  while (true) {
    yield coord;
    coord.x++;
    coord.y++;
    if (coord.x > max) {
      coord.x = start.x;
      coord.y = start.y;
    }
  }
}

/* exported run */
/**
 * run it!
 */
function run() {
  const sheet = SpreadsheetApp.getActiveSheet();
  const colorPicker = pickGoogleColor_();
  const coordsPicker = pickCoordinates_({ x: 2, y: 2 }, 7);

  const date = new Date().getTime();
  while (new Date().getTime() - date < 5 * 60 * 1000) {
    sheet.clearFormats();
    const coords = coordsPicker.next().value;
    const font = new CellDigitalFont(sheet, coords.x, coords.y, colorPicker.next().value);
    font.printLine(2023);
    Utilities.sleep(1500);
    SpreadsheetApp.flush();
  }
}

/* exported onOpen */
function onOpen() {
  SpreadsheetApp.getUi().createMenu('🎄 2023 🎄').addItem('Click me!', 'run').addToUi();
}
