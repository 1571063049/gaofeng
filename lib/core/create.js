const program = require("commander");

// 当如actions
const {
  createProjectAction,
  createComponentsAction,
  createPageAndRouteAction,
  createStoreAction,
} = require("./actions");

const createCommands = () => {
  program
    .command("create <project> [...others]")
    .description("clone a repository in a folder")
    .action(createProjectAction);

  program
    .command("addcpn <name>")
    .description("add vue component, 例如 addcpn Login [-d src/components]")
    .action((name) =>
      createComponentsAction(name, program.opts().dest || "src/components")
    );

  program
    .command("addpage <page>")
    .description(
      "add vue page with page vue and router config, 例如 addpage Login [-d src/pages]"
    )
    .action((page) =>
      createPageAndRouteAction(page, program.opts().dest || "src/pages")
    );

  program
    .command("addstore <store>")
    .description(
      "add vue store with store index.js and store types.js, 例如 addstore Login [-d src/store/modules]"
    )
    .action((store) =>
      createStoreAction(store, program.opts().dest || "src/store/modules")
    );
};

module.exports = createCommands;
