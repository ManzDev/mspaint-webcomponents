import copy from "rollup-plugin-copy";
import replace from "@rollup/plugin-replace";

export default {
  input: "src/index.js",
  output: {
    format: "es",
    file: "dist/index.js"
  },
  plugins: [
    copy({
      targets: [
        { src: "src/index.html", dest: "dist" },
        { src: "src/assets/**/*", dest: "dist/assets" }
      ]
    }),
    replace({
      preventAssignment: true,
      "delimiters": ["", ""],
      "url(../assets/": "url(/mspaint-webcomponents/assets/"
    })
  ]
}
