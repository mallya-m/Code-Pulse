const fs = require('fs');
const acorn = require('acorn');

const code = fs.readFileSync('./sample.js','utf8');

console.log("Raw code read from file");
console.log(code);

const ast = acorn.parse(code, {
    ecmaVersion :2020,
    sourceType :'module'
});

console.log("\n AST (Abstract Syntax Tree)");
console.log(JSON.stringify(ast,null,2));

console.log("Top Level Node Types");

ast.body.forEach(function(node){
    console.log("Type:", node.type);
});