const xlsx = require('xlsx');
const fs = require('fs');
const path = require('path');

// filter blank lines of link
function validate(link) {
  return link['start'] && link['end'] && link['end'] != '机房名称';
}

/**
 * @description Read link from excel sheet, and filter data not available
 */
function readLinks(filePath) {
  const workbook = xlsx.readFile(filePath);
  const sheets = workbook.SheetNames;
  const linksOfAllSheets = sheets.reduce((links, sheetName) => {
    const current = xlsx.utils.sheet_to_json(workbook.Sheets[sheetName]);
    return links.concat(current);
  }, []);
  return linksOfAllSheets.filter((link) => validate(link));
}

function excelFilePath() {
  const inputFileName = process.argv[2];
  const inputPath = path.join(__dirname, inputFileName);
  return inputPath;
}

/**
 * draw a link between two node in a row of sheet
 */
function drawLink(link) {
  let start = String(link['start'])
    .toUpperCase()
    .replace('-', '_');
  let end = String(link['end'])
    .toUpperCase()
    .replace('-', '_');
  return `${start} -> ${end}`;
}

/**
 *
 */
function graph(links) {
  const linksToDraw = links.map((link) => {
    return drawLink(link);
  });
  const removeDuplicated = Array.from(new Set(linksToDraw));
  return `digraph { 
    rankdir=LR
    ${removeDuplicated.join('\n    ')}
  }`;
}

// Read links from excel
const dataPath = excelFilePath();
const filteredLinks = readLinks(dataPath);
filteredLinks.forEach((link) => {
  console.log(link);
});
// Graphviz command
const gv = graph(filteredLinks);

// Write to graphviz dot file
fs.writeFile('./gv.dot', gv, (err) => {
  if (err) {
    console.log('write file error');
  }
});
