const program = require("commander");

const helpOptions = () => {
  program.option(
    "-d --dest <dest>",
    "a destination folder, 例如: -d /src/components"
  );
  program.option("-f --framework <framework>", "your framework,例如: -f vue");

  program.on("--help", () => {
    console.log("");
    console.log("Others:");
    console.log(" other options~");
    console.log(" -u user: gaofeng");
    console.log(" -r reqitstry: https://github.com/1571063049");
  });
};
module.exports = helpOptions;
