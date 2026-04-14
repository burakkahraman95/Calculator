// NOTE: NO NEED TO EDIT THIS FILE. Leave as is!

// No need to edit this file -- these are just helper functions + variables provided for you!
// However, do read it to see what the names of the global functions and variables are.


"use strict";

// Note: This "use strict" start to the file will catch more mistakes with error messages


/*
   Declare our global variables. Note that these are used by main.js, as well.
*/
let expression = '';
let displayedExpression = '';
let result = null;
let receipt = 'CALCULATOR READY | START OF CALCULATIONS<br />';


/*
   "Returns" exactly 1 character: The final character of the given string
*/
function _getLastCharacter(string) {
    return string.substr(string.length - 1, string.length);
}

/*
   Opposite of _getLastCharacter: "Returns" everything EXCEPT for a certain
   number of final characters in a string, given by length:
      let a = 'abcdef';
      a = _removeLastCharacters(a, 2);
      console.log(a); // would show 'abcd';
*/
function _removeLastCharacters(string, length) {
    return string.substr(0, string.length - length);
}

/*
   Execut the JavaScript expression found in "expression".
   It will then invoke either "showError" or "addToReceipt".
*/
function execute() {
    let message = '';
    console.log('Executing:', expression);
    try {
        result = eval(expression); // Eval will run "expression" as JavaScript code
        console.log('Execution successful. Result:');
        console.log(result);
        addToReceipt(); 
    } catch (e) {
        console.log('Error occured:', e);
        showError(e.toString());
    }
}
