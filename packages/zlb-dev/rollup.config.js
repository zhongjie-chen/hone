import resolve from "rollup-plugin-node-resolve";
import nodePolyfills from "rollup-plugin-node-polyfills";
import commonjs from "rollup-plugin-commonjs";
import typescript2 from "rollup-plugin-typescript2";
import externals from "rollup-plugin-node-externals";
import copy from "rollup-plugin-copy";
import pkg from "./package.json";

export default [
  {
    input: "src/main.ts",
    external: ["ms", "fs-extra", "glob", "archiver"],
    plugins: [
      // nodePolyfills(),
      typescript2(), // so Rollup can convert TypeScript to JavaScript
      resolve(),
      // externals(),
      commonjs(),
      copy({
        targets: [
          {
            src: "src/zlb-project-template",
            dest: "dist",
          },
        ],
      }),
    ],
    output: [
      { file: pkg.main, format: "cjs" },
      { file: pkg.module, format: "es" },
    ],
  },
];
