fs = require('fs');
const sqlFile = __dirname + '/productList.sql';
const jsonData = require('./productList.json');

const sqlData = jsonData
  .reduce(
    (acc,el)=>{
      acc.products.push(`('${el.id}','${el.title}','${el.description}','${el.price}')`);
      acc.stocks.push(`('${el.id}','${el.count}')`);
      return acc;
    }, {products: [], stocks: []}
  );

const sql = `\
insert into products(id,title,description,price) values \n${sqlData.products.join(",\n")};
insert into stocks(product_id,count) values \n${sqlData.stocks.join(",\n")};\
`;

fs.writeFile(sqlFile, sql, function (err) {
  if (err) return console.log(err);
  console.log('Done');
});
