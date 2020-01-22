const {
  override,
  fixBabelImports,
  addLessLoader,
  addDecoratorsLegacy
} = require('customize-cra')

module.exports = override(
  addDecoratorsLegacy(),
  addLessLoader({
    javascriptEnabled: true,
    // 自定义主题
    modifyVars: { '@brand-primary': '#1DA57A', '@brand-primary-tap': '#1DA57A' }
  }),
  fixBabelImports('import', {
    libraryName: 'antd-mobile',
    style: true
  })
)
