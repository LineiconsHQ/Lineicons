import commonjs from "@rollup/plugin-commonjs";
import resolve from "@rollup/plugin-node-resolve";
import { terser } from "rollup-plugin-terser";

export default {
  input: "src/lineicons.js", // Entry point is the line-icon component
  output: {
    file: "dist/lineicons.js",
    format: "es",
  },
  plugins: [resolve(), commonjs(), terser()],
};
