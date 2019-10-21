const fs = require('fs')
const path = require('path')
const nunjucks = require('nunjucks')
module.exports = (hikaru) => {
  const {getURLFn, getPathFn} = hikaru.utils
  const {File} = hikaru.types
  hikaru.generator.register('sitemap', (site) => {
    if (!site['siteConfig']['sitemap']['enable']) {
      return
    }
    const tmpContent = fs.readFileSync(path.join(__dirname, 'sitemap.njk'), 'utf8')
    const content = nunjucks.renderString(tmpContent, {
      'posts': site['posts'],
      'getURL': getURLFn(site['siteConfig']['baseURL'], site['siteConfig']['rootDir']),
      'getPath': getPathFn(site['siteConfig']['rootDir'])
    })
    return new File({
      'docDir': site['siteConfig']['docDir'],
      'docPath': site['siteConfig']['sitemap']['path'] || 'sitemap.xml',
      'content': content
    })
  })
}
