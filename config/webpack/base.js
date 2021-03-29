const { webpackConfig, config } = require('@rails/webpacker')
const { join } = require('path')

webpackConfig.module.rules.map(module => {
  if (module.type === 'asset/resource') {
    delete module.type
    delete module.generator
    module.use = [
      {
        loader: 'file-loader',
        options: {
          name(file) {
            if (file.includes(config.source_path)) {
              return 'media/[path][name]-[hash].[ext]'
            }
            return 'media/[folder]/[name]-[hash:8].[ext]'
          },
          context: join(config.source_path)
        }
      }
    ]
  }
  return module
})


module.exports = webpackConfig
