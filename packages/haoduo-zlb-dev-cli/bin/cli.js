#!/usr/bin/env node
const { program } = require("commander");
const { genZip } = require("haoduo-zlb-dev");
console.log("bin run");

program.option("-d, --dir <dir>", "add the dist dir to the dest file", "dist");

program.parse();

console.log(`dir: ${program.opts().dir}`);

genZip(program.opts().dir);
