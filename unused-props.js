const fs = require('fs');

const { fdir } = require('fdir');
const htmlTags = require('html-tags');
const { parse } = require('@typescript-eslint/typescript-estree');
const astray = require('astray');

const parseOptions = {
  loc: true,
  jsx: true,
};

const difference = (a, b) => [...a].filter((x) => !b.includes(x));

const filterObj = (obj, array) => Object.fromEntries(Object.entries(obj).filter(([key]) => !array.includes(key)));

const files = new fdir().glob(['**/!(*.test|*.spec).@(js|ts)?(x)']).withFullPaths().crawl('./src').sync();

const obj = JSON.parse(fs.readFileSync('./my-report.json'));
const filteredObj = filterObj(obj, htmlTags);
const usedComponents = Object.keys(filteredObj);

const unused = {};
for (const filePath of files) {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = parse(code, parseOptions);

  astray.walk(ast, {
    VariableDeclarator(node) {
      if (usedComponents.includes(node.id.name)) {
        const availableProps = node.init.params.flatMap((par) => par.properties.map((prop) => prop.key.name));
        const usedProps = Object.keys(obj[node.id.name].props);
        unused[node.id.name] = difference(availableProps, usedProps);
      }
    },
  });
}
console.log(unused);
