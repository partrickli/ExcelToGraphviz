const xlsx = require('xlsx');
const fs = require('fs');

/**
 * draw a link between two node in a row of sheet
 */
function drawLink(link) {
  return `
    ${link['start']} -> ${link['end']}
  `;
}

/**
 *
 * @param {Array<string>} links
 */
function drawLinks(links) {
  return links
    .map((link) => {
      return drawLink(link);
    })
    .join('');
}

const read = xlsx.readFile('./nodes.xlsx');

const accessSheet = 'access';

const sheet = read.Sheets[accessSheet];

const nodes = xlsx.utils.sheet_to_json(sheet);
// Graphviz command
let gv = `digraph { 
    rankdir=LR
    ${drawLinks(nodes)}
}`;

// Write to file
fs.writeFile('./gv.dot', gv, (err) => {
  if (err) {
    console.log('write file error');
  }
});
