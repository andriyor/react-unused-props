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

const getUnused = (componentName, paramsNode) => {
  const availableProps = paramsNode.flatMap((par) => par.properties.map((prop) => prop.key.name));
  const usedProps = Object.keys(obj[componentName].props);
  return difference(availableProps, usedProps);
};

for (const filePath of files) {
  const code = fs.readFileSync(filePath, 'utf8');
  const ast = parse(code, parseOptions);

  astray.walk(ast, {
    VariableDeclarator(node) {
      const componentName = node.id.name;
      if (usedComponents.includes(componentName)) {
        unused[componentName] = getUnused(componentName, node.init.params);
      }
    },
    FunctionDeclaration(node) {
      const componentName = node.id.name;
      if (usedComponents.includes(componentName)) {
        unused[componentName] = getUnused(componentName, node.params);
      }
    },
    ClassDeclaration(node) {
      const componentName = node.id.name;
      const availableClassProps = [];
      astray.walk(node, {
        MemberExpression(node) {
          if (node.object?.property?.name === 'props') {
            availableClassProps.push(node.property?.name);
          }
        },
      });
      const usedProps = Object.keys(obj[componentName].props);
      unused[componentName] = difference(availableClassProps, usedProps);
    },
  });
}
console.log(unused);
