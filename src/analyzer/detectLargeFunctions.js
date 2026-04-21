// src/analyzer/detectLargeFunctions.js
// ONE JOB: find functions that are too long and report them
// "Too long" means more than MAX_LINES lines

const { getAllFunctions } = require('./walker');

// This is your threshold — functions longer than this get flagged
// We put it in a constant so it's easy to change later
const MAX_LINES = 30;

// ============================================================
// MAIN FUNCTION: detectLargeFunctions
// Takes the AST, returns an object with:
//   - functions: info about every function found
//   - issues: only the ones that are too large
// ============================================================
function detectLargeFunctions(ast) {

  // Get every function node from the AST using your walker
  const functionNodes = getAllFunctions(ast);

  // This array will hold info about every function
  const functions = [];

  // This array will hold only the flagged issues
  const issues = [];

  // Loop through every function node found
  functionNodes.forEach(function(node) {

    // Get the function name
    // node.id exists for named functions: function add() {}
    // node.id is null for anonymous functions: const x = () => {}
    const name = node.id ? node.id.name : '(anonymous)';

    // Get line numbers from node.loc
    // Remember: you enabled locations:true in parser.js on Day 3
    const startLine = node.loc.start.line;
    const endLine = node.loc.end.line;

    // Calculate total lines
    // +1 because both start and end lines are included
    // Example: starts line 4, ends line 6 = 3 lines (4, 5, 6)
    const lineCount = endLine - startLine + 1;

    // Is this function too large?
    const isTooLarge = lineCount > MAX_LINES;

    // Build the function info object
    const functionInfo = {
      name: name,
      startLine: startLine,
      endLine: endLine,
      lineCount: lineCount,
      isTooLarge: isTooLarge
    };

    // Always add to functions array — we track every function
    functions.push(functionInfo);

    // Only add to issues if it's actually too large
    if (isTooLarge) {
      issues.push({
        // What kind of issue is this
        type: 'large-function',
        // Human readable message explaining the problem
        message: `Function "${name}" is ${lineCount} lines long (max: ${MAX_LINES})`,
        // Which line to look at to find the problem
        line: startLine,
        // How bad is it
        // warning = worth looking at
        // error = really should fix this
        severity: lineCount > 60 ? 'error' : 'warning'
      });
    }
  });

  // Return both arrays in one object
  return {
    functions: functions,
    issues: issues
  };
}

// Export the function
module.exports = { detectLargeFunctions };