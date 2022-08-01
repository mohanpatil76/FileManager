// file , folder 
let fs = require("fs");
let path = require("path");

// let content = fs.readFileSync("gtree.js");
// console.log("content is "+content);
// viewFlat 
// nodejs 

function view(dirname, mode) {// main function

    if (mode == "tree") {
        viewTree(dirname, "");
        console.log("\ntree view implemented");
    } else if (mode == "flat") {
        viewFlat(dirname, "");
        console.log("\nflat view implemented");
    } else {
        console.log("Wrong mode");
    }
}

function viewTree(dirpath, indent) {
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop();
        console.log(indent + path.basename(dirpath) + "*");
    } else {
        // let strArr = dirpath.split("\\");
        // let toPrint = strArr.pop();
        console.log(indent, path.basename(dirpath));
        let content = listContent(dirpath);   // get all contents in dirpath in an array form
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // f10/f1.txt
            // let childPath = dirpath + "\\" + content[i];
            let childPath = path.join(dirpath, content[i]);   
            // console.log(childPath);
            viewTree(childPath, indent + "\t");    // recursion
        }
    }

}
function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile();
}
function listContent(dirpath) {
    return fs.readdirSync(dirpath); // returns an array with all the file names or objects in the directory.
}
function viewFlat(dirpath, toPrint) {
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        console.log(toPrint + "*");
    } else {
        console.log(toPrint);
        let content = listContent(dirpath);
        // recursion
        // console.log(content);
        for (let i = 0; i < content.length; i++) {
            // f10/f1.txt
            let childPath = path.join(dirpath, content[i]);

            viewFlat(childPath, toPrint + " \\ " + content[i]);
        }
    } 

}

module.exports = {
    viewFn : view
}