

module.exports = function (api) {
  api.cache(true);
  return {
    presets: [
      // 1. Setup Expo with NativeWind
      ["babel-preset-expo", { jsxImportSource: "nativewind" }],
      // 2. NativeWind MUST be in presets for v4
      "nativewind/babel",
    ],
    plugins: [
      // 3. Reanimated plugin must be listed LAST in the plugins array
      "react-native-reanimated/plugin",
    ],
  };
};