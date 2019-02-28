const ins = require("./new");
let comDir = ins.path.join(__dirname, "../src/components");
if (!ins.bigCamel.length) {
  ins.log(ins.chalk.yellow(ins.chalk.bgBlue("命名重复或者传入参数为空")));
  return;
}
let tplComFile = ins.path.join(ins.tplDir, "com.js");
let comContent = ins.fs
  .readFileSync(tplComFile, "utf-8")
  .replace(/bigCamel/g, ins.bigCamel);
//新建文件即可
if (ins.argv._.length < 2) {
  ins.fs.writeFileSync(
    ins.path.join(ins.appDir, "components/" + ins.smallCamel + ".js"),
    comContent
  );
} else {
  //新建文件夹或者文件
  ins.fs.mkdirSync(ins.path.join(ins.appDir, "components/" + ins.smallCamel));
  ins.fs.writeFileSync(
    ins.path.join(ins.appDir, "components/" + ins.smallCamel + "/index.js"),
    comContent
  );
}
ins.log(ins.chalk.bgBlue(ins.chalk.white(`新建组件${ins.bigCamel}成功`)));
