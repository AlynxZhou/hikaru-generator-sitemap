const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
module.exports = (hikaru) => {
  const {getURLFn, getPathFn} = hikaru.utils
  const {File} = hikaru.types
  hikaru.generator.register('afterProcessing', (site) => {
    if (!site['siteConfig']['sitemap']['enable']) {
      return site
    }
    const tmpContent = fs.readFileSync(path.join(__dirname, 'sitemap.njk'), 'utf8')
    const content = nunjucks.renderString(tmpContent, {
      "posts": site["posts"],
      "getURL": getURLFn(site["siteConfig"]["baseURL"], site["siteConfig"]["rootDir"]),
      "getPath": getPathFn(site["siteConfig"]["rootDir"])
    })
    const file = new File(site['siteConfig']['docDir'])
    file["docPath"] = site["siteConfig"]["sitemap"]["path"] || "sitemap.xml"
    file['content'] = content
    site.put('files', file)
    return site
  })
}
