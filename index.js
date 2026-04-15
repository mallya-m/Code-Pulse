// Code-Pulse - JavaScript Project Analyzer
// Day 4: Testing the AST walker

const { parseFile } = require('./src/analyzer/parser');
const {
  getAllFunctions,
  getAllVariables,
  countNodeType
} = require('./src/analyzer/walker');

// Parse sample.js
const result = parseFile('./sample.js');

if (result === null) {
  console.log("Parsing failed.");
  process.exit(1);
}

// Pull ast out of result into its own variable
// This is why 'ast' works below — it's declared right here
const ast = result.ast;

// ============================================================
// TEST 1: Find all functions
// ============================================================
console.log("=== ALL FUNCTIONS FOUND ===");

const functions = getAllFunctions(ast);

functions.forEach(function(funcNode) {
  const name = funcNode.id ? funcNode.id.name : '(anonymous)';
  const startLine = funcNode.loc.start.line;
  const endLine = funcNode.loc.end.line;
  const lineCount = endLine - startLine + 1;

  console.log(`Function: ${name}`);
  console.log(`  Starts at line: ${startLine}`);
  console.log(`  Ends at line: ${endLine}`);
  console.log(`  Total lines: ${lineCount}`);
  console.log('');
});

// ============================================================
// TEST 2: Find all variables
// ============================================================
console.log("=== ALL VARIABLES FOUND ===");

const variables = getAllVariables(ast);

variables.forEach(function(varNode) {
  const name = varNode.id.name;
  const hasValue = varNode.init !== null;
  console.log(`Variable: ${name} (has value: ${hasValue})`);
});

// ============================================================
// TEST 3: Count specific node types
// ============================================================
console.log("\n=== NODE TYPE COUNTS ===");

const ifCount = countNodeType(ast, 'IfStatement');
const returnCount = countNodeType(ast, 'ReturnStatement');
const varCount = countNodeType(ast, 'VariableDeclaration');

console.log(`IfStatements: ${ifCount}`);
console.log(`ReturnStatements: ${returnCount}`);
console.log(`VariableDeclarations: ${varCount}`);

// ============================================================
// BONUS: Shallow vs Deep difference
// ============================================================
console.log("\n=== SHALLOW (only top level) ===");
ast.body.forEach(function(node) {
  console.log(node.type);
});

console.log("\n=== DEEP (every node via walker) ===");
const walk = require('acorn-walk');
walk.simple(ast, {
  IfStatement(node) {
    console.log(`Found IfStatement at line ${node.loc.start.line}`);
  }
});
const walker = require('./src/analyzer/walker.js');

console.log("Loaded walker:", walker);
console.log("Keys:", Object.keys(walker));
console.log("Type of getAllFunctions:", typeof walker.getAllFunctions);