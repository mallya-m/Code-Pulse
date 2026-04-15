const walk = require('acorn-walk');

function walkNodes(ast, visitors) {
  walk.simple(ast, visitors);
}

function getAllFunctions(ast) {
  const functions = [];

  walk.simple(ast, {
    FunctionDeclaration(node) {
      functions.push(node);
    },
    FunctionExpression(node) {
      functions.push(node);
    },
    ArrowFunctionExpression(node) {
      functions.push(node);
    }
  });

  return functions;
}

function getAllVariables(ast) {
  const variables = [];

  walk.simple(ast, {
    VariableDeclarator(node) {
      variables.push(node);
    }
  });

  return variables;
}

function countNodeType(ast, nodeType) {
  let count = 0;

  const visitors = {
    [nodeType]() {
      count++;
    }
  };

  walk.simple(ast, visitors);

  return count;
}

module.exports = {
  walkNodes,
  getAllFunctions,
  getAllVariables,
  countNodeType
};