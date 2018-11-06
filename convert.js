const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

/**
 * @description Read link from excel sheet, and filter data not available
 */
function readLinks() {
  // read output graphviz dot file path from nodejs argument
  const inputFileName = process.argv[2];
  const inputPath = path.join(__dirname, inputFileName);

  const read = xlsx.readFile(inputPath);
  const accessSheet = 'links';
  const sheet = read.Sheets[accessSheet];
  const links = xlsx.utils.sheet_to_json(sheet);

  // filter blank lines of link
  const filteredLinks = links.filter((link) => {
    return link['start'] != undefined && link['end'] != undefined;
  });
  return filteredLinks;
}

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
const filteredLinks = readLinks();

// Graphviz command
const gv = graph(filteredLinks);

// Write to graphviz dot file
fs.writeFile('./gv.dot', gv, (err) => {
  if (err) {
    console.log('write file error');
  }
});
