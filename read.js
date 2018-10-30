const xlsx = require('xlsx');
const fs = require('fs');

const read = xlsx.readFile('./data.xlsx');

const accessSheet = 'access';

const sheet = read.Sheets[accessSheet];

const nodes = xlsx.utils.sheet_to_json(sheet);

const device = nodes[0];
console.log(device);

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
    .join('\n');
}

// Graphviz command
let gv = `digraph { 
    ${drawNodes(nodes)}
 }`;

console.log(gv);

// Write to file
fs.writeFile('./gv.dot', gv, (err) => {
  if (err) {
    console.log('write file error');
  }
});
