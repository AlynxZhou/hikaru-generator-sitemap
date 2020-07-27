const path = require('path')

module.exports = async (hikaru) => {
  const {File} = hikaru.types
  const fn = await hikaru.compiler.compile(path.join(__dirname, 'sitemap.njk'))
  hikaru.decorator.register('sitemap', fn)
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
