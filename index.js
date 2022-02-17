const fs = require("fs/promises");
const path = require("path");

module.exports = async (hikaru) => {
  if (!hikaru.site["siteConfig"]["sitemap"]["enable"]) {
    return;
  }
  const {File} = hikaru.types;
  const filepath = path.join(__dirname, "sitemap.njk");
  const content = await fs.readFile(filepath, "utf8");
  const fn = await hikaru.compiler.compile(filepath, content);
  hikaru.decorator.register("sitemap", fn, {
    "dirname": __dirname, "pathSep": path.sep
  });
  hikaru.generator.register("sitemap", (site) => {
    return new File({
      "docDir": site["siteConfig"]["docDir"],
      "docPath": site["siteConfig"]["sitemap"]["path"] || "sitemap.xml",
      "layout": "sitemap"
    });
  });
};
