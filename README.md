Hikaru Generator Sitemap
========================

Sitemap generator plugin for Hikaru.
------------------------------------

# Usage

First go to your site dir and add following to your `site-config.yaml`.

```yaml
sitemap:
  enable: true
  path: sitemap.xml
```

then run this command to install it.

```
$ npm i -s hikaru-generator-sitemap
```

If you want to skip some posts while generating, add `sitemap: false` to its front-matter.
