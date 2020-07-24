const path = require('path')

module.exports = (hikaru) => {
  const {File} = hikaru.types
  hikaru.decorator.register('sitemap', path.join(__dirname, 'sitemap.njk'))
  hikaru.generator.register('sitemap', (site) => {
    if (!site['siteConfig']['sitemap']['enable']) {
      return
    }
    return new File({
      'docDir': site['siteConfig']['docDir'],
      'docPath': site['siteConfig']['sitemap']['path'] || 'sitemap.xml',
      'layout': 'sitemap'
    })
  })
}
