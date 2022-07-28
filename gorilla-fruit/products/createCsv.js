fs = require('fs');
const output = __dirname + '/productList.csv';
const jsonData = require('./productList.json');
const colSeparator = ",";
const rowSeparator = "\n";
const headers = ['Title', 'Description', 'Price', 'Count'];
const data = jsonData
  .reduce(
    (acc,el)=> {
        acc.push(`${[`"${el.title}"`,`"${el.description}"`,el.price,el.count].join(colSeparator)}`);
        return acc;
      },
    [headers.join(colSeparator)]
  );


fs.writeFile(output, data.join(rowSeparator), function (err) {
  if (err) return console.log(err);
  console.log('Done');
});
