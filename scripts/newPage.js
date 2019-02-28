const ins = require('./new');
const serverConfig = require('../../build/server');
let apis = ins.path.join(__dirname, '../src/constants/apis.js');
let pageDir = ins.path.join(__dirname, '../src/pages');
let routerFile = ins.path.join(__dirname, '../src/router/routerConf.js');

//追加router
 let routerContent = ins.fs.readFileSync(routerFile).toString();
if (routerContent.indexOf(ins.smallCamel) > -1) {
  ins.log(ins.chalk.yellow(ins.chalk.bgBlue('命名重复或者传入参数为空')));
  return;
}
let routerPath =`const ${ins.bigCamel} =Loadable({loader:() => import('../pages/${ins.smallCamel}'),loading: Loading})`;
routerContent = routerContent.replace(/(const routerConf)/g,`${routerPath}\n\n$1`)
.replace(/(= \[)/g,`$1\n{\npath:"${ins.smallCamel}",\n layout:null,\n component:${ins.bigCamel}\n},\n`);
ins.fs.writeFileSync(routerFile, routerContent);

//新建页面
let tplPageFile = ins.path.join(ins.tplDir, 'page.js');
let pageContent = ins.fs.readFileSync(tplPageFile, "utf-8").replace(/bigCamel/g, ins.bigCamel)
  .replace(/smallCamel/g, ins.smallCamel);
 ins.fs.mkdirSync(ins.path.join(pageDir, ins.smallCamel));
 ins.fs.mkdirSync(ins.path.join(pageDir,ins.smallCamel, "components"));
 ins.fs.writeFileSync(ins.path.join(pageDir, ins.smallCamel + '/index.js'), pageContent);

//新建action
let actionFile = ins.path.join(ins.tplDir, 'action.js');
let actionContent = ins.fs.readFileSync(actionFile, "utf-8").replace(/smallCamel/g, ins.smallCamel)
  .replace(/bigCamel/g, ins.bigCamel).replace(/TYPE/g, ins.smallCamel.toUpperCase());
ins.fs.writeFileSync(ins.path.join(pageDir, ins.smallCamel + '/action.js'), actionContent);

//新建reducers
let reducerFragPath = ins.path.join(pageDir, '/global/index.js');
let reducerFragContent = ins.fs.readFileSync(reducerFragPath, "utf-8");
let reducerImport = "import " + ins.smallCamel + " from '\..\/" + ins.smallCamel + "/reducer'";
reducerFragContent = reducerFragContent.replace(/(import .* from .*;)([\n]*const)/, "$1\n" + reducerImport + ";$2")
  .replace(/(};)/g, "\t,"+ins.smallCamel+ "$1\n\t");
 ins.fs.writeFileSync(reducerFragPath, reducerFragContent);

let reducerFile = ins.path.join(ins.tplDir, 'reducer.js');
let reducerContent = ins.fs.readFileSync(reducerFile, "utf-8").replace(/smallCamel/g, ins.smallCamel)
  .replace(/TYPE/g, ins.smallCamel.toUpperCase());
ins.fs.writeFileSync(ins.path.join(pageDir, ins.smallCamel + '/reducer.js'), reducerContent);

//新建actionType
let actionTypeStr =
  `import mirror from 'mirror-creator';
  export const ${ins.smallCamel}Type = mirror([
  'GET_${ins.smallCamel.toUpperCase()}_DATA',
],'${ins.smallCamel}/');`;
ins.fs.writeFileSync(ins.path.join(pageDir,ins.smallCamel+'/constant.js'), actionTypeStr);


//新建style
let styleStr =
  `.content{
  font-size:26px;
}`
ins.fs.writeFileSync(ins.path.join(pageDir, ins.smallCamel + '/style.scss'), styleStr);
ins.log(ins.chalk.yellow(ins.chalk.bgBlue(`新建页面成功访问地址:http://${serverConfig.host}:${serverConfig.port}/${ins.smallCamel}`)));





