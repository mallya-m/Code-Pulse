const {parseFile} = require('./src/analyzer/parser');

const targetFile = './sample.js';

const result = parseFile(targetFile);

if(result === null){
    console.log("Parsing failed. Check the errors above.");
    process.exit(1);
}
console.log("File parsed successfully!");
console.log("File path:", result.filePath);
console.log("Code length:",result.code.length, "characters");
console.log("AST node type:", result.ast.type);
console.log("Top level nodes:", result.ast.body.length);

console.log("\nTop level node types:");
result.ast.body.forEach(function(node){
    console.log(" -", node.type, "(line" + node.loc.start.line + ")" );
});