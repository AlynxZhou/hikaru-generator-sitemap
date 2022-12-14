import * as fs from "node:fs/promises";
import * as path from "node:path";

const pluginDir = path.dirname(new URL(import.meta.url).pathname);

const generateSitemap = async (hikaru) => {
  if (!hikaru.site["siteConfig"]["sitemap"]["enable"]) {
    return;
  }
  const {File} = hikaru.types;
  const filepath = path.join(pluginDir, "sitemap.njk");
  const content = await fs.readFile(filepath, "utf8");
  const fn = await hikaru.compiler.compile(filepath, content);
  hikaru.decorator.register("sitemap", fn, {
    "dirname": pluginDir, "pathSep": path.sep
  });
  hikaru.generator.register("sitemap", (site) => {
    return new File({
      "docDir": site["siteConfig"]["docDir"],
      "docPath": site["siteConfig"]["sitemap"]["path"] || "sitemap.xml",
      "layout": "sitemap"
    });
  });
};

export default generateSitemap;
