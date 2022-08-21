# gaofeng
a scaffold for vue similar as vue-cli but have a characteristic
如何安装？

> npm install gaofeng -g
#创建项目
目前支持Vue

vue项目模块已经帮你配置：

常用的目录结构（你可以在此基础上修改）
vue.config.js（其中配置了别名，你可以自行修改和配置更多）
axios（网络请求axios的安装以及二次封装）
vue-router（router的安装和配置，另外有路由的动态加载，后面详细说明）
vuex（vuex的安装和配置，另外有动态加载子模块，后面详细说明）
#创建项目

gaofeng create your_project_name
自动拉取项目模板、安装项目依赖、打开浏览器 http://localhost:8080/、自动启动项目

#项目开发
项目开发目前提供三个功能：

创建Vue组件
创建Vue页面，并配置路由
创建Vuex子模块
创建Vue组件：
gaofeng addcpn YourComponentName # 例如gaofeng add NavBar，默认会存放到src/components文件夹中
gaofeng addcpn YourComponentName -d src/pages/home # 也可以指定存放的具体文件夹
创建Vue页面，并配置路由
gaofeng addpage YourPageName # 例如gaofeng addpage Home，默认会放到src/pages/home/Home.vue中，并且会创建src/page/home/router.js
gaofeng addpage YourPageName -d src/views # 也可以指定文件夹，但需要手动集成路由
为什么会创建router.js文件：

router.js文件是路由的其中一个配置；
创建该文件中 src/router/index.js中会自动加载到路由的 routes配置中，不需要手动配置了（如果是自己配置的文件夹需要手动配置）
src/router/index.js中已经完成如下操作：

// 动态加载pages中所有的路由文件
const files = require.context('@/pages', true, /router\.js$/);
const routes = files.keys().map(key => {
  const page = require('@/pages' + key.replace('.', ''));
  return page.default;
})
创建Vuex子模块
gaofeng addstore YourVuexChildModuleName # 例如gaofeng addstore home，默认会放到src/store/modules/home/index.js和types.js
gaofeng addstore YourVuexChildModuleName -d src/vuex/modules # 也可以指定文件夹
创建完成后，不需要手动配置，已经动态将所有子模块集成进去：

// 动态加载modules
const modules = {}
const files = require.context('./', true, /index\.js$/);
files.keys().filter(key => {
  if (key === './index.js') return false;
  return true
}).map(key => {  
  // 获取名字
  const modulePath = key.replace('./modules/', '');
  const moduleName = modulePath.replace('/index.js', '');
  const module = require(`${key}`);

  modules[`${moduleName}`] = module.default;
})
Documentation
gaofeng: A CLI to help you quickly build and develop front-end projects
Can't think of other names, so just use gaofeng~

How to install？

npm install gaofeng -g
