const xlsx = require('xlsx');
const fs = require('fs');

const read = xlsx.readFile('./data.xlsx');

const accessSheet = 'access';

const sheet = read.Sheets[accessSheet];

const nodes = xlsx.utils.sheet_to_json(sheet);

function drawDevice(device) {
  return `
    ${device['L1']} -> ${device['L2']}
  `;
}

/**
 *
 * @param {Array} nodes
 */
function drawNodes(nodes) {
  return nodes
    .map((d) => {
      return drawDevice(d);
    })
    .join('');
}

// Graphviz command
let gv = `digraph { 
    rankdir=LR
    ${drawNodes(nodes)}
 }`;

console.log(gv);

// Write to file
fs.writeFile('./gv.dot', gv, (err) => {
  if (err) {
    console.log('write file error');
  }
});
