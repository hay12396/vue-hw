module.exports = {
  pages: {},
  pluginOptions: {
    browserExtension: {
      componentOptions: {
        background: {
          entry: 'src/background.js'
        },
        contentScripts: {
          entries: {
            'content-script': [
              'src/content-script.js'
            ]
          }
        }
      }
    }
  }
}
