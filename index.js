'use strict';
//core modules
const http = require('http');
const fs = require('fs');
const url = require('url');
require('path');
// const slugify = require('slugify');
// own modules
const replaceFun = require('./modules/replaceTemplate');

//reading data
const dataJSON = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8');
const jsObject = JSON.parse(dataJSON);

// loding all req templates;
const overviewTemp = fs.readFileSync(`./overview.html`, 'utf-8');
const cardTemp = fs.readFileSync(`./templateCard.html`, 'utf-8');
const productTemp = fs.readFileSync(`./product.html`, 'utf-8');

// replace function;
// const replaceFun=(obj,cardTemp)=>{
//     let temp=cardTemp.replace(/{%PRODUCTNAME%}/g,obj.productName);
//     temp=temp.replace(/{%IMAGE%}/g,obj.image);
//     temp=temp.replace(/{%QUANTITY%}/g,obj.quantity);
//     temp=temp.replace(/{%PRICE%}/g,obj.price);
//     temp=temp.replace(/{%ID%}/g,obj.id);
//     temp=temp.replace(/{%FROM%}/g,obj.from);
//     temp=temp.replace(/{%NUTRIENTSNAME%}/g,obj.nutrients);
//     temp=temp.replace(/{%DESCRIPTION%}/g,obj.description);
//     if(!obj.organic)temp=temp.replace(/{%NOT-ORGANIC%}/g,'not-organic');

//     return temp;
// }

const server = http.createServer((req, res) => {
  // const a=url.parse(req.url,true);
  // console.log(a);
  const { query, pathname: pathName } = url.parse(req.url, true);

  /// Creating slug out of product name;
  // const slugs = jsObject.map((el) => slugify(el.productName, { lower: true }));
  // console.log(slugs);

  if (pathName === '/' || pathName === '/overview') {
    res.writeHead(200, { 'content-type': 'text/html' });
    // making all the object list in a string template;
    // el holds the data
    const realTemp = jsObject.map((el) => replaceFun(el, cardTemp)).join('');
    // realTemp is a string which contain all the elements all overview page accoring to json file
    const finalOP = overviewTemp.replace(/{%PRODUCT_CARD%}/, realTemp);
    res.end(finalOP);
  } else if (pathName === '/product') {
    res.writeHead(200, { 'content-type': 'text/html' });
    // load the templet
    const product = jsObject[query.id];
    // console.log(query.id);
    // console.log(product);
    const output = replaceFun(product, productTemp);
    // console.log(output);
    res.end(output);
  } 
  // else if (pathName === '/api') {
  //   res.writeHead(200, {
  //     'content-type': 'application/json',
  //   });
  //   res.end(dataJSON);
  // } 
  else {
    res.writeHead(404, {
      'content-type': 'text/html',
    });
    res.end('<h1>Page not found!</h1>');
  }
});

server.listen(8000, '127.0.0.1', () => {
  console.log('Server is taking requests!');
});
