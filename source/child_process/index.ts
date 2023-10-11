#!/usr/bin/env /opt/nodejs/bin/ts-node-esm

import { exec as execution } from "child_process";
import { userInfo } from "os";
import { promisify } from "util";

export interface Process {
  name: string;
  pid: number;
  ppid: number;
}

// Check If A User Ran The File Using The Sudo Command
const sudo_user = userInfo().uid === 0 ? true : false;

// if (sudo_user) console.log("Susu Pepper");
// else console.log("Abaya");

const exec = promisify(execution);

export default async function getAllProcess() {
  const { stderr, stdout } = await exec("ps -e -o comm,pid,ppid | head -n 20");

  if (stderr) {
    console.log(stderr);
    return null;
  }

  const lines: Array<string> = stdout.trim().split("\n");
  lines.shift();

  const programs: Array<Process> = lines.map((line) => {
    const raw_program: Array<string> = line.trim().split(/\s+/);
    const program: Process = {
      name: raw_program[0] as string,
      pid: parseInt(raw_program[1]),
      ppid: parseInt(raw_program[2]),
    };
    return program;
  });

  return programs;
}
