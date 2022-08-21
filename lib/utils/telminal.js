// 执行终端的指令
const { spawn, exec } = require("child_process");

// child_process.spawn(command[, options][, callback])
// npm install
const commandSpwan = (...args) => {
  return new Promise((resolve, reject) => {
    const childProcess = spawn(...args);
    childProcess.stdout.pipe(process.stdout); //将子进程的输出添加到父进程中
    childProcess.stderr.pipe(process.stderr); //将子进程的错误添加到父进程中
    // 子进程执行完成
    childProcess.on("close", () => {
      resolve();
    });
  });
};

// child_process.exec(command[, options][, callback])
const commandExec = (...args) => {
  return new Promise((resolve, reject) => {
    exec(...args, (err, stdout, stderr) => {
      if (err) {
        reject(err);
        return;
      }
      console.log(stdout.replace("\n", ""));
      //   console.log(stderr);
      resolve();
    });
  });
};

module.exports = {
  spawn: commandSpwan,
  exec: commandExec,
};
