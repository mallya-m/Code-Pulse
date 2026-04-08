// This is the file Code-Pulse will analyze
// It has a mix of simple and complex code on purpose

function addNumbers(a, b) {
  return a + b;
}

function checkAge(age) {
  if (age >= 18) {
    if (age >= 65) {
      return "senior";
    } else {
      return "adult";
    }
  } else {
    return "minor";
  }
}

const unusedVariable = "I am never used";

const greeting = "hello";
console.log(greeting);