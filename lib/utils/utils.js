const path = require("path");
const fs = require("fs");

const ejs = require("ejs");

// 编译模板文件
const compile = (templateName, data = {}, option = {}) => {
  return new Promise((resolve, reject) => {
    const temlpatePosition = `../template/${templateName}`;
    const temlpatePath = path.resolve(__dirname, temlpatePosition);
    ejs.renderFile(temlpatePath, { data }, option, (err, result) => {
      if (err) {
        console.log(err);
        reject(err);
        return;
      }
      resolve(result);
    });
  });
};

// 写入文件
const writeToFile = (filePath, content) => {
  // 判断文件是否存在，如果不存在则生成对应文件
  fs.promises.writeFile(filePath, content);
};

// 判断文件是否存在: 递归
// source/components/categoty/gf
// 1.得从路径的后面文件名称往前判断上一个文件是否存在： gf -> categoty -> components -> source
// 2.如果
const createDirSync = (pathName) => {
  if (fs.existsSync(pathName)) {
    return true;
  } else if (createDirSync(path.dirname(pathName))) {
    //path.dirname(path) 获取pathName的上一级文件名称
    fs.mkdirSync(pathName);
    return true;
  }
};

module.exports = {
  compile,
  writeToFile,
  createDirSync,
};
