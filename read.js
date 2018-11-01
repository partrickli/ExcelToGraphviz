const xlsx = require('xlsx');
const fs = require('fs');

/**
 * draw a link between two node in a row of sheet
 */
function drawLink(link) {
  return `${link['start']} -> ${link['end']}`;
}

/**
 *
 */
function graph(links) {
  const nodesDraw = links
    .map((link) => {
      return drawLink(link);
    })
    .join('\n    ');
  return `digraph { 
    rankdir=LR
    ${nodesDraw}
  }`;
}

// Read links from excel
const read = xlsx.readFile('./data.xlsx');

const accessSheet = 'links';

const sheet = read.Sheets[accessSheet];

const links = xlsx.utils.sheet_to_json(sheet);

// Graphviz command
const gv = graph(links);

// Write to graphviz dot file
fs.writeFile('./gv.dot', gv, (err) => {
  if (err) {
    console.log('write file error');
  }
});
