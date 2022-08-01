// function organizeExecutor(){
//     console.log("organize command implemented");
// }
// module.exports={
//     organizeFn:organizeExecutor
// } 

let fs = require("fs");
let path = require("path");
let orgFilePath;
// we will not use nrml function, instead we will use "Sync methods"(mkdir, mkdirSync)
let types = {
    media: ["mp4", "mkv", "mp3"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex'],
    app: ['exe', 'dmg', 'pkg', "deb"],
    images: ['jpg', 'png']
}
 
function dirCreator(dirpath){   // create the directory if not present
    if(fs.existsSync(dirpath) == false){
        fs.mkdirSync(dirpath);
    }
}

function isFileorNOt(dirpath) {
    return fs.lstatSync(dirpath).isFile(); //----------------//
}

function listContent(dirpath) {
    return fs.readdirSync(dirpath);
}

//getting directory name for files according to their extensions
function getDirectoryName(dirpath){
    let strArr = dirpath.split(".");
    let ext = strArr.pop();

    for(let key in types)
    {
        // types[key].includes(ext);
        for(let i = 0; i < types[key].length; i++)
        {
            if(types[key][i] == ext)
            return key;
        }
    }
    return "others";
}

function copyFiletoFolder(dirpath, destFolder)
{
    let orgFileName = path.basename(dirpath);
    let destFilePath = path.join(destFolder, orgFileName);

    fs.copyFileSync(dirpath, destFilePath);
}

//traversing that which folder should go where
function OrganizedDir(dirpath){
    // console.log(dirpath);
    let isFile = isFileorNOt(dirpath);
    if (isFile == true) {
        let folderName = getDirectoryName(dirpath);
        let destfold = path.join(orgFilePath, folderName); // getting the path to copy the content

        // copying to destination folder
        copyFiletoFolder(dirpath, destfold);
        // console.log(dirpath, " -> ", folderName);
    } 
    else {
        // console.log("i ran");
        let content = listContent(dirpath);
        for (let i = 0; i < content.length; i++) {
            let childPath = path.join(dirpath, content[i]);
            OrganizedDir(childPath);
        }
    }
}

//creating directory
function OrganizeFn(dirpath){  // main function
    orgFilePath = path.join(dirpath, "organized_files");  // D:\Study\web\1_file_system\raw\poc\organized_files
    dirCreator(orgFilePath);
    for(let key in types){   // key = media, archives, documents, app
        let innerdirPath = path.join(orgFilePath, key);  // D:\Study\web\1_file_system\raw\poc\organized_files\"key"
        dirCreator(innerdirPath);
    }
// others
    let otherPath = path.join(orgFilePath, "others"); // D:\Study\web\1_file_system\raw\poc\organized_files\others
    dirCreator(otherPath);
    // console.log("i ran");
    OrganizedDir(dirpath);
}


module.exports={
    organizeFn:OrganizeFn
}