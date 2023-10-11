#!/usr/bin/env /opt/nodejs/bin/ts-node-esm

import { exec } from "child_process";
import { userInfo } from "os";

// Check If A User Ran The File Using The Sudo Command
const sudo_user = userInfo().uid === 0 ? true : false;

if (sudo_user) console.log("Susu Pepper");
else console.log("Abaya");

exec("ps -e -o comm,pid,ppid | head", (err, stdout, stderr) => {
  if (err) {
    console.log(err);
    return;
  }

  console.log(stdout);
  const lines: Array<string> = stdout.split("\n");
  const start = 1;
  const all = lines;
  all.shift();
  for (let index = 0; index < all.length; index++) {
    console.log(all[index]);
  }
});
