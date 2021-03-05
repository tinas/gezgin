const colors = jest.createMockFromModule('colors')

const unit = s => s

colors.yellow = colors.blue = colors.cyan = colors.green = unit

module.exports = colors
