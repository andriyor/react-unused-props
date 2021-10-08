module.exports = {
  crawlFrom: "./src",
  includeSubComponents: true,
  processors: [
    ["count-components-and-props", { outputTo: "./my-report.json" }]
  ]
};
