const { promisify } = require("util");
const path = require("path");

const download = promisify(require("download-git-repo")); // 从git下载包插件
const open = require("open");

const { spawn, exec } = require("../utils/telminal");
const { compile } = require("../utils/utils");
const { vueRepo } = require("../config/repo-config"); //仓库地址
const { writeToFile, createDirSync } = require("../utils/utils");

// 创建项目action
// callback -> promisify(函数) -> Promise -> async await
const createProjectAction = async (project) => {
  // 1.提示信息
  console.log("gaofeng helps you create your project, please wait a moment~");
  // 2. clone 项目
  await download(vueRepo, project, { clone: true });

  // 3. 执行npm install 安装依赖(执行终端指令)————适配npm
  const command = process.platform === "win32" ? "npm.cmd" : "npm";
  // await exec(command, ["install"], { cwd: `./${project}` });
  await spawn(command, ["install"], { cwd: `./${project}` });

  // 4。运行 npm run serve
  await spawn(command, ["run", "serve"], { cwd: `./${project}` });

  // 5. 打开浏览器
  open("http://localhost:8080/");
};

// 添加vue文件的action
const createComponentsAction = async (name, dest) => {
  // 1.获取模板文件.ejs并编译
  const result = await compile("vue-component.ejs", {
    name,
    lowerName: name.toLowerCase(),
  });

  // 2.写入文件的操作
  // 2.1文件变成.vue或.js文件
  const targetPath = path.resolve(dest, `${name}.vue`);
  // 2.2生成文件对应文件夹
  if (createDirSync(dest)) {
    writeToFile(targetPath, result);
  }
};

// 添加组件和路由(vue文件和route文件)的action
const createPageAndRouteAction = async (name, dest) => {
  const data = { name, lowerName: name.toLowerCase() };
  const pageResult = await compile("vue-component.ejs", data);
  const routeResult = await compile("vue-router.ejs", data);

  const targetPath = path.resolve(dest, name.toLowerCase());
  console.log(targetPath);
  if (createDirSync(targetPath)) {
    const pagePath = path.resolve(targetPath, `${name}.vue`);
    const routePath = path.resolve(targetPath, `route.js`);
    writeToFile(pagePath, pageResult);
    writeToFile(routePath, routeResult);
  }
};

// 添加store实例的action
const createStoreAction = async (name, dest) => {
  const data = { name, lowerName: name.toLowerCase() };
  const storeResult = await compile("vue-store.ejs", data);
  const typesResult = await compile("vue-types.ejs");

  const targetPath = path.resolve(dest, name.toLowerCase());
  if (createDirSync(targetPath)) {
    const storePath = path.resolve(targetPath, `index.js`);
    const typesPath = path.resolve(targetPath, `types.js`);
    writeToFile(typesPath, typesResult);
    writeToFile(storePath, storeResult);
  }
};

module.exports = {
  createProjectAction,
  createComponentsAction,
  createPageAndRouteAction,
  createStoreAction,
};
