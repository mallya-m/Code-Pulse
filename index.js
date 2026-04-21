// Code-Pulse - JavaScript Project Analyzer
// Day 5: Testing the large function detector

const { parseFile } = require('./src/analyzer/parser');
const { detectLargeFunctions } = require('./src/analyzer/detectLargeFunctions');

// Step 1: Parse the file
const result = parseFile('./sample.js');

if (result === null) {
  console.log("Parsing failed.");
  process.exit(1);
}

const ast = result.ast;

// Step 2: Run the large function detector
const largeFunctionResults = detectLargeFunctions(ast);

// Step 3: Print every function found
console.log("=== ALL FUNCTIONS ===\n");

largeFunctionResults.functions.forEach(function(func) {
  // Build a status tag — makes output easier to scan
  const status = func.isTooLarge ? "⚠ TOO LARGE" : "✓ OK";

  console.log(`${status} | ${func.name}`);
  console.log(`  Lines: ${func.lineCount} (line ${func.startLine} to ${func.endLine})`);
  console.log('');
});

// Step 4: Print only the issues
console.log("=== ISSUES FOUND ===\n");

if (largeFunctionResults.issues.length === 0) {
  console.log("No issues found.");
} else {
  largeFunctionResults.issues.forEach(function(issue) {
    console.log(`[${issue.severity.toUpperCase()}] ${issue.message}`);
    console.log(`  At line: ${issue.line}`);
    console.log(`  Issue type: ${issue.type}`);
    console.log('');
  });
}

// Step 5: Print a summary
console.log("=== SUMMARY ===\n");
console.log(`Total functions found: ${largeFunctionResults.functions.length}`);
console.log(`Functions with issues: ${largeFunctionResults.issues.length}`);