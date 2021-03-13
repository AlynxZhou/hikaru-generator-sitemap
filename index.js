const path = require("path");

module.exports = async (hikaru) => {
  if (!hikaru.site["siteConfig"]["sitemap"]["enable"]) {
    return;
  }
  const {File} = hikaru.types;
  const fn = await hikaru.compiler.compile(path.join(__dirname, "sitemap.njk"));
  hikaru.decorator.register("sitemap", fn);
  hikaru.generator.register("sitemap", (site) => {
    return new File({
      "docDir": site["siteConfig"]["docDir"],
      "docPath": site["siteConfig"]["sitemap"]["path"] || "sitemap.xml",
      "layout": "sitemap"
    });
  });
};
