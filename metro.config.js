const { getDefaultConfig } = require("expo/metro-config")
const path = require("path")

const config = getDefaultConfig(__dirname)

config.resolver.alias = {
  "@shared": path.resolve(__dirname, "src/shared"),
  "@ds": path.resolve(__dirname, "src/design-system"),
}

module.exports = config
