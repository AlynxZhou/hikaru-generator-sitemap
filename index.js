const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
module.exports = (hikaru) => {
  const {getURLFn, getPathFn} = hikaru.utils
  const {File} = hikaru.types
  hikaru.generator.register('afterProcessing', (site) => {
    if (!site.get('siteConfig')['sitemap']['enable']) {
      return site
    }
    const tmpContent = fs.readFileSync(path.join(__dirname, 'sitemap.njk'), 'utf8')
    const content = nunjucks.renderString(tmpContent, {
      "posts": site.get("posts"),
      "getURL": getURLFn(site.get("siteConfig")["baseURL"], site.get("siteConfig")["rootDir"]),
      "getPath": getPathFn(site.get("siteConfig")["rootDir"])
    })
    const file = new File(site.get('docDir'))
    file["docPath"] = site.get("siteConfig")["sitemap"]["path"] || "sitemap.xml"
    file['content'] = content
    site.put('files', file)
    return site
  })
}
