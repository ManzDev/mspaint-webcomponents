import copy from "rollup-plugin-copy";

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
    })
  ]
}
