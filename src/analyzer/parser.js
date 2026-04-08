const fs = require('fs');
const acorn = require('acorn');
const { parse } = require('path');

function parseFile(filePath){
    let code;
    try{
        code = fs.readFileSync(filePath,'utf8');
    }catch(error){
        console.error(`Could not read file: ${filePath}`);
        console.error(`Reason: ${error.message}`);
        return null;
    }
    let ast ;
    try{
        ast = acorn.parse(code, {
            ecmaVersion:2020,
            sourceType:'module',
            locations:true
        });
    }catch(error){
        console.error(`Could not read file: ${filePath}`);
            console.error(`Reason: ${error.message}`);
            return null;
    }
    return{
        ast : ast ,
        code: code,
        filePath : filePath
    };
}

module.exports = {parseFile};


